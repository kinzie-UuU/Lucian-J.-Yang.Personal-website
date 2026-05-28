(() => {
  const section = document.querySelector(".portrait-about-wrapper");
  if (!section) return;
  const video = section.querySelector(".portrait-video");

  let ticking = false;
  let targetVideoTime = 0;
  let targetEnter = 0;
  let targetTextEnter = 0;
  let targetProgressValue = 0;
  let targetExit = 0;
  let currentEnter = 0;
  let currentTextEnter = 0;
  let currentProgressValue = 0;
  let currentExit = 0;
  let scrubRaf = null;
  let aboutRevealUnits = [];
  let centeredRevealActive = false;
  let centeredRevealArmed = false;
  let centeredRevealCompleted = false;
  let centeredTurnLocked = false;
  let centeredRevealAnchorY = 0;
  let centeredRevealTarget = 0;
  let centeredRevealArmRaf = null;
  let centeredTouchY = 0;
  let scrollTurnProgress = 0;
  let centeredRevealBackSuppressed = false;
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const inverseSmootherStep = (value) => {
    const target = clamp01(value);
    let low = 0;
    let high = 1;
    for (let i = 0; i < 12; i += 1) {
      const mid = (low + high) / 2;
      if (smootherStep(mid) < target) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  };
  const CENTERED_REVEAL_DONE = 1;
  const CENTERED_REVEAL_MIN = 0;
  const CENTERED_REVEAL_DELTA_SCALE = 4400;
  const CENTERED_REVEAL_MAX_STEP = 0.078;
  const CENTERED_REVEAL_WHEEL_MIN_STEP = 0.056;
  const CENTERED_TURN_START = 0.06;
  const CENTERED_AUTO_COMPLETE_PROGRESS = 0.28;
  const VIDEO_FRAME_DURATION = 1 / 60;
  const PORTRAIT_SCRUB_SECONDS = 3;
  const portraitEnterFromProgress = (progress) => {
    const enterRaw = clamp01(progress / 0.14);
    return enterRaw * enterRaw * (3 - 2 * enterRaw);
  };

  const setPortraitVideoTarget = (fallbackProgress = scrollTurnProgress) => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return;
    if (
      centeredRevealActive
      && !centeredRevealArmed
      && centeredRevealTarget <= CENTERED_TURN_START
    ) {
      targetVideoTime = 0;
      return;
    }
    targetVideoTime = duration * clamp01(fallbackProgress);
  };

  const setCenteredRevealClass = (active) => {
    document.documentElement.classList.toggle("about-centered-reveal-active", active);
    document.body.classList.toggle("about-centered-reveal-active", active);
  };

  const setPortraitRevealState = ({ armed = false, complete = false } = {}) => {
    section.classList.toggle("is-portrait-reveal-armed", armed);
    section.classList.toggle("is-portrait-reveal-complete", complete);
  };

  const cancelCenteredRevealArm = () => {
    if (centeredRevealArmRaf !== null) {
      cancelAnimationFrame(centeredRevealArmRaf);
      centeredRevealArmRaf = null;
    }
    centeredRevealArmed = false;
  };

  const sectionTop = () => {
    const currentY = window.scrollY || window.pageYOffset || 0;
    const rect = section.getBoundingClientRect();
    return Math.max(0, Math.round(currentY + rect.top));
  };

  const effectiveVideoDuration = () => {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return 0;
    return Math.min(video.duration, PORTRAIT_SCRUB_SECONDS);
  };

  const centeredRevealProgress = () => (
    smootherStep(clamp01(centeredRevealTarget / CENTERED_TURN_START))
  );

  const centeredTurnProgress = () => (
    smootherStep(clamp01((centeredRevealTarget - CENTERED_TURN_START) / (CENTERED_REVEAL_DONE - CENTERED_TURN_START)))
  );

  const visibleCenteredRevealTarget = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return centeredRevealTarget;
    const visibleTurn = clamp01(smoothedVideoTime / duration);
    return CENTERED_TURN_START + inverseSmootherStep(visibleTurn) * (CENTERED_REVEAL_DONE - CENTERED_TURN_START);
  };

  const lockToCenteredAnchor = () => {
    if (!centeredRevealActive) return;
    window.scrollTo({ top: centeredRevealAnchorY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = centeredRevealAnchorY;
    document.body.scrollTop = centeredRevealAnchorY;
  };

  const syncCenteredPortrait = () => {
    if (!centeredRevealArmed) {
      targetEnter = CENTERED_REVEAL_MIN;
      scrollTurnProgress = 0;
      setPortraitVideoTarget(0);
      return;
    }
    targetEnter = centeredRevealProgress();
    if (centeredTurnLocked) {
      targetEnter = 1;
      scrollTurnProgress = 1;
      setPortraitVideoTarget(1);
      return;
    }

    scrollTurnProgress = centeredTurnProgress();
    setPortraitVideoTarget(scrollTurnProgress);
  };

  const resetVideoToFirstFrame = () => {
    centeredTurnLocked = false;
    targetVideoTime = 0;
    smoothedVideoTime = 0;
    deferredSeekTime = null;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.seeking) {
      deferredSeekTime = 0;
      return;
    }
    if (Math.abs(video.currentTime) > seekThreshold()) video.currentTime = 0;
  };

  const lockVideoToFinalFrame = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return;
    centeredTurnLocked = true;
    targetVideoTime = duration;
    smoothedVideoTime = duration;
    deferredSeekTime = null;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.seeking) {
      deferredSeekTime = duration;
      return;
    }
    if (Math.abs(video.currentTime - duration) > seekThreshold()) video.currentTime = duration;
  };

  const releaseCenteredReveal = ({ force = false } = {}) => {
    if (!centeredRevealActive && !force) return;
    cancelCenteredRevealArm();
    centeredRevealActive = false;
    if (!force) centeredRevealCompleted = true;
    setCenteredRevealClass(false);
    setPortraitRevealState({
      armed: false,
      complete: !force,
    });
    if (!force) {
      lockVideoToFinalFrame();
    } else {
      centeredTurnLocked = false;
      setPortraitVideoTarget(scrollTurnProgress);
    }
    targetEnter = Math.max(targetEnter, currentEnter, 1);
    targetTextEnter = 0;
    targetProgressValue = 0;
  };

  const isCenteredRevealInRange = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.54 && rect.bottom > vh * 0.34;
  };

  const isCenteredRevealNearTop = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top > -vh * 0.14 && rect.top < vh * 0.18;
  };

  const isCenteredRevealEntryGate = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return (
      rect.top <= vh * 0.48
      && rect.top > -vh * 0.78
      && rect.bottom > vh * 0.34
      && !document.body.classList.contains("about-services-handoff-active")
    );
  };

  const releaseCenteredRevealBack = () => {
    if (!centeredRevealActive) return;
    cancelCenteredRevealArm();
    centeredRevealActive = false;
    centeredRevealCompleted = false;
    centeredRevealBackSuppressed = true;
    setCenteredRevealClass(false);
    setPortraitRevealState();
    const previousY = Math.max(0, centeredRevealAnchorY - window.innerHeight * 0.56);
    targetEnter = CENTERED_REVEAL_MIN;
    targetTextEnter = 0;
    targetProgressValue = 0;
    resetVideoToFirstFrame();
    window.scrollTo({ top: previousY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = previousY;
    document.body.scrollTop = previousY;
  };

  const armCenteredRevealAfterAnchor = () => {
    cancelCenteredRevealArm();
    centeredRevealArmRaf = requestAnimationFrame(() => {
      lockToCenteredAnchor();
      centeredRevealArmRaf = requestAnimationFrame(() => {
        lockToCenteredAnchor();
        centeredRevealArmRaf = null;
        if (!centeredRevealActive) return;
        centeredRevealArmed = true;
        setPortraitRevealState({ armed: true });
        syncCenteredPortrait();
        renderAboutReveal();
      });
    });
  };

  const activateCenteredReveal = ({ anchorY = sectionTop(), enter = currentEnter } = {}) => {
    cancelCenteredRevealArm();
    centeredRevealActive = true;
    centeredRevealCompleted = false;
    const measuredAnchorY = sectionTop();
    centeredRevealAnchorY = Math.max(0, Math.round(Number.isFinite(measuredAnchorY) ? measuredAnchorY : anchorY));
    centeredRevealTarget = clamp01(enter);
    const initialPortraitEnter = centeredRevealTarget > CENTERED_TURN_START
      ? centeredRevealProgress()
      : CENTERED_REVEAL_MIN;
    const initialTurnProgress = centeredRevealTarget > CENTERED_TURN_START
      ? centeredTurnProgress()
      : 0;
    targetEnter = initialPortraitEnter;
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    currentEnter = initialPortraitEnter;
    currentTextEnter = 0;
    currentProgressValue = 0;
    currentExit = 0;
    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));
    setPortraitRevealState();
    setCenteredRevealClass(true);
    lockToCenteredAnchor();
    if (centeredRevealTarget <= CENTERED_TURN_START) resetVideoToFirstFrame();
    scrollTurnProgress = initialTurnProgress;
    setPortraitVideoTarget(scrollTurnProgress);
    smoothedVideoTime = targetVideoTime;
    armCenteredRevealAfterAnchor();
    renderAboutReveal();
  };

  const advanceCenteredReveal = (delta, { source = "wheel", allowBeforeArmed = false } = {}) => {
    if (!centeredRevealActive) return;
    if (!Number.isFinite(delta) || Math.abs(delta) < 0.01) return;
    if (!centeredRevealArmed && !allowBeforeArmed) {
      lockToCenteredAnchor();
      return;
    }
    const direction = delta >= 0 ? 1 : -1;
    if (centeredTurnLocked && direction < 0) {
      centeredTurnLocked = false;
      smoothedVideoTime = clampVideoTime(targetVideoTime);
    }
    const rawStep = delta / CENTERED_REVEAL_DELTA_SCALE;
    const stepDirection = rawStep >= 0 ? 1 : -1;
    const minimumStep = source === "wheel" && Math.abs(delta) >= 40
      ? CENTERED_REVEAL_WHEEL_MIN_STEP
      : 0;
    const stepMagnitude = Math.min(
      CENTERED_REVEAL_MAX_STEP,
      Math.max(Math.abs(rawStep), minimumStep),
    );
    const step = stepDirection * stepMagnitude;
    const visibleTarget = visibleCenteredRevealTarget();
    const baseTarget = centeredRevealArmed
      ? (direction < 0
        ? Math.min(centeredRevealTarget, visibleTarget)
        : Math.max(centeredRevealTarget, visibleTarget))
      : centeredRevealTarget;
    const nextTarget = clamp01(baseTarget + step);
    centeredRevealTarget = centeredTurnLocked ? CENTERED_REVEAL_DONE : nextTarget;
    centeredRevealTarget = Math.max(CENTERED_REVEAL_MIN, centeredRevealTarget);
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    syncCenteredPortrait();
    lockToCenteredAnchor();
    if (
      direction < 0
      && centeredRevealTarget <= CENTERED_REVEAL_MIN + 0.001
      && currentEnter <= CENTERED_REVEAL_MIN + 0.04
    ) {
      releaseCenteredRevealBack();
    }
  };

  const portraitVideoReadyToRelease = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return true;
    return smoothedVideoTime >= duration * 0.96;
  };

  const centeredRevealReadyToResume = () => (
    centeredTurnLocked || (centeredTurnProgress() >= 0.995 && portraitVideoReadyToRelease())
  );

  const centeredRevealReadyToExitBack = () => (
    centeredRevealActive
    && centeredRevealArmed
    && centeredRevealTarget <= CENTERED_REVEAL_MIN + 0.001
    && currentEnter <= CENTERED_REVEAL_MIN + 0.04
  );

  const shouldLetNaturalScrollResume = (delta = 0) => (
    centeredRevealActive
    && centeredRevealArmed
    && delta > 0
    && centeredRevealReadyToResume()
  );

  const refreshAboutReveal = () => {
    const leftSelectors = [
      ".about-left .section-kicker",
      ".about-heading",
      ".about-role",
    ];
    const rightSelectors = [
      ".about-right .about-lead",
      ".about-right .about-detail",
      ".about-skills-label",
      ".about-skills-list span",
    ];

    const collect = (selectors, side) => selectors.flatMap((selector) => (
      Array.from(section.querySelectorAll(selector)).map((node) => ({ node, side }))
    ));

    const nextUnits = [
      ...collect(leftSelectors, "left"),
      ...collect(rightSelectors, "right"),
    ];

    const sideCounts = nextUnits.reduce((counts, unit) => {
      counts[unit.side] += 1;
      return counts;
    }, { left: 0, right: 0 });

    const sideIndexes = { left: 0, right: 0 };
    aboutRevealUnits = nextUnits.map((unit) => {
      const index = sideIndexes[unit.side]++;
      const count = Math.max(1, sideCounts[unit.side]);
      const isBlockRole = unit.node.classList.contains("about-role");
      const isHeading = unit.node.classList.contains("about-heading");
      unit.node.classList.add("about-scroll-reveal-unit");
      unit.node.style.setProperty("--about-reveal-index", String(index));
      return {
        ...unit,
        index,
        count,
        canTransform: !isBlockRole && !isHeading,
      };
    });
  };

  const renderAboutReveal = () => {
    if (!aboutRevealUnits.length) return;

    if (window.LucianRuntime?.reducedMotion) {
      aboutRevealUnits.forEach(({ node }) => {
        node.style.opacity = "1";
        node.style.filter = "none";
        node.style.transform = "";
      });
      return;
    }

    const sceneProgress = clamp01(currentTextEnter * 1.16);
    const exitFade = clamp01(currentExit * 1.12);

    aboutRevealUnits.forEach(({ node, side, index, count, canTransform }) => {
      const order = count <= 1 ? 0 : index / (count - 1);
      const sideDelay = side === "right" ? 0.08 : 0;
      const delay = sideDelay + order * (side === "right" ? 0.42 : 0.34);
      const windowSize = side === "right" ? 0.34 : 0.3;
      const enter = smootherStep(clamp01((sceneProgress - delay) / windowSize));
      const visible = Math.max(0, enter * (1 - exitFade));
      const baseOpacity = side === "right" ? 0.025 : 0.018;
      const opacity = Math.max(0, baseOpacity + visible * (1 - baseOpacity) - exitFade * 0.62);
      const blur = (1 - visible) * (side === "right" ? 8 : 10) + exitFade * 5;
      const y = (1 - visible) * (side === "right" ? 14 : 20) - exitFade * 12;
      const rotate = (1 - visible) * (side === "right" ? 3 : -5);

      node.style.opacity = opacity.toFixed(3);
      node.style.filter = `blur(${blur.toFixed(2)}px)`;
      if (canTransform) {
        node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
      }
    });
  };

  let smoothedVideoTime = 0;
  let deferredSeekTime = null;
  const seekThreshold = () => Math.max(0.012, VIDEO_FRAME_DURATION * 0.45);
  const clampVideoTime = (time) => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return 0;
    return Math.max(0, Math.min(duration, time));
  };
  const commitVideoSeek = (time) => {
    if (!video) return;
    const nextTime = clampVideoTime(time);
    if (video.seeking) {
      deferredSeekTime = nextTime;
      return;
    }
    deferredSeekTime = null;
    video.currentTime = nextTime;
  };

  const scrubVideo = () => {
    scrubRaf = requestAnimationFrame(scrubVideo);
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    // Critically-damped chase — same easing model as the CSS variables.
    // No dead zone, no stepped jumps; the face turn reads as silk.
    smoothedVideoTime += (targetVideoTime - smoothedVideoTime) * 0.16;
    // Only seek by meaningful frame-sized deltas, and never stack seeks while
    // the decoder is still landing on the previous frame.
    if (Math.abs(smoothedVideoTime - video.currentTime) > seekThreshold()) {
      commitVideoSeek(smoothedVideoTime);
    }
  };

  const renderMotion = () => {
    if (centeredRevealActive) {
      if (!isCenteredRevealInRange()) {
        releaseCenteredReveal({ force: true });
        requestAnimationFrame(renderMotion);
        return;
      }
      targetTextEnter = 0;
      targetProgressValue = 0;
      targetExit = 0;
      if (Math.abs(window.scrollY - centeredRevealAnchorY) > 2) lockToCenteredAnchor();
      if (!centeredRevealArmed) {
        targetEnter = centeredRevealTarget > CENTERED_TURN_START
          ? centeredRevealProgress()
          : CENTERED_REVEAL_MIN;
        setPortraitVideoTarget(scrollTurnProgress);
      } else {
        syncCenteredPortrait();
      }
      if (centeredRevealArmed && centeredRevealTarget >= CENTERED_REVEAL_DONE && currentEnter >= 0.96 && centeredRevealReadyToResume()) {
        lockVideoToFinalFrame();
        releaseCenteredReveal();
      }
    }

    const enterEase = centeredRevealActive ? 0.17 : 0.22;
    currentEnter += (targetEnter - currentEnter) * enterEase;
    currentTextEnter += (targetTextEnter - currentTextEnter) * 0.11;
    currentProgressValue += (targetProgressValue - currentProgressValue) * 0.07;
    currentExit += (targetExit - currentExit) * 0.085;

    if (centeredRevealReadyToExitBack()) {
      releaseCenteredRevealBack();
    }

    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));
    renderAboutReveal();

    requestAnimationFrame(renderMotion);
  };

  const update = () => {
    ticking = false;
    if (document.body.classList.contains("hero-about-handoff-active")) return;
    if (centeredRevealActive) {
      lockToCenteredAnchor();
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    // progress: 0 = section just entered, 1 = section fully scrolled through
    const progress = clamp01(-rect.top / scrollable);

    if (!centeredRevealCompleted && !centeredRevealBackSuppressed && isCenteredRevealEntryGate()) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: CENTERED_REVEAL_MIN,
      });
      return;
    }

    if (centeredRevealBackSuppressed && rect.top > window.innerHeight * 0.52) {
      centeredRevealBackSuppressed = false;
    }

    if (progress > CENTERED_AUTO_COMPLETE_PROGRESS) {
      centeredRevealCompleted = true;
    }

    // The portrait reads from both the section timeline and the visual moment
    // where About enters the viewport. Copy still waits for section progress.
    const visualEnter = smootherStep(clamp01((window.innerHeight - rect.top) / (window.innerHeight * 0.62)));
    targetEnter = Math.max(portraitEnterFromProgress(progress), visualEnter);

    // Text reveal starts after the portrait has clearly appeared.
    targetTextEnter = smootherStep(clamp01((progress - 0.2) / 0.3));

    targetProgressValue = progress;

    // About now scrolls naturally into Services; keep the portrait and copy
    // present instead of fading them into a handoff ghost.
    targetExit = 0;

    const duration = effectiveVideoDuration();
    if (duration > 0) {
      if (centeredTurnLocked) {
        lockVideoToFinalFrame();
        return;
      }
      // Video scrub overlaps the portrait reveal tail so the face turn feels
      // connected instead of waiting for a separate later phase.
      const rawVideoProgress = clamp01((progress - 0.08) / 0.76);
      scrollTurnProgress = smootherStep(rawVideoProgress);
      setPortraitVideoTarget(scrollTurnProgress);
    }
  };

  if (video) {
    video.pause();
    const markVideoReady = () => {
      resetVideoToFirstFrame();
      section.classList.add("is-portrait-video-ready");
      update();
    };
    video.addEventListener("seeked", () => {
      if (deferredSeekTime === null || !Number.isFinite(deferredSeekTime)) return;
      const nextTime = deferredSeekTime;
      deferredSeekTime = null;
      if (Math.abs(nextTime - video.currentTime) > seekThreshold()) {
        commitVideoSeek(nextTime);
      }
    });
    video.addEventListener("loadedmetadata", () => {
      markVideoReady();
    }, { once: true });
    video.addEventListener("canplay", () => {
      section.classList.add("is-portrait-video-ready");
    }, { once: true });
    if (video.readyState >= 1) markVideoReady();
    scrubVideo();
  }

  window.LucianAboutMotion = {
    startCenteredReveal: ({ anchorY = sectionTop(), initialEnter = 0.12 } = {}) => {
      activateCenteredReveal({
        anchorY,
        enter: initialEnter,
      });
      currentEnter = Math.min(currentEnter, centeredRevealTarget);
    },
    primeEntry: (progress = 0.08) => {
      const entry = portraitEnterFromProgress(progress);
      targetEnter = Math.max(targetEnter, entry);
      targetProgressValue = Math.max(targetProgressValue, progress);
      currentEnter = Math.max(currentEnter, entry);
      currentProgressValue = Math.max(currentProgressValue, progress);
      section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
      section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
      renderAboutReveal();
    },
    refresh: () => {
      window.requestAnimationFrame(() => {
        refreshAboutReveal();
        update();
        renderAboutReveal();
      });
    },
  };

  window.LucianAboutScrollReveal = {
    refresh: () => {
      window.requestAnimationFrame(() => {
        refreshAboutReveal();
        renderAboutReveal();
      });
    },
  };

  refreshAboutReveal();
  renderMotion();

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 && centeredRevealBackSuppressed) {
      centeredRevealBackSuppressed = false;
    }
    if (
      !centeredRevealActive
      && !centeredRevealCompleted
      && !centeredRevealBackSuppressed
      && event.deltaY > 0
      && isCenteredRevealEntryGate()
    ) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: CENTERED_REVEAL_MIN,
      });
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!centeredRevealActive && centeredRevealCompleted && event.deltaY < 0 && isCenteredRevealNearTop()) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: CENTERED_REVEAL_DONE,
      });
      centeredTurnLocked = false;
      advanceCenteredReveal(event.deltaY || 0, {
        allowBeforeArmed: true,
        source: "wheel",
      });
    }
    if (!centeredRevealActive) return;
    if (shouldLetNaturalScrollResume(event.deltaY || 0)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(event.deltaY || 0, { source: "wheel" });
  }, { passive: false, capture: true });

  window.addEventListener("touchstart", (event) => {
    if (!centeredRevealActive) return;
    centeredTouchY = event.touches[0]?.clientY || 0;
  }, { passive: true, capture: true });

  window.addEventListener("touchmove", (event) => {
    if (!centeredRevealActive) return;
    const y = event.touches[0]?.clientY || centeredTouchY;
    const delta = centeredTouchY - y;
    centeredTouchY = y;
    if (shouldLetNaturalScrollResume(delta * 3.2)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(delta * 3.2, { source: "touch" });
  }, { passive: false, capture: true });

  window.addEventListener("keydown", (event) => {
    if (!centeredRevealActive || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    const direction = ["ArrowUp", "PageUp", "Home"].includes(event.key) ? -1 : 1;
    if (shouldLetNaturalScrollResume(direction * 720)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(direction * 720, { source: "keyboard" });
  }, { capture: true });

  window.addEventListener("lucian:programmatic-section-jump", () => {
    releaseCenteredReveal({ force: true });
  });

  update();
  window.addEventListener("pagehide", () => {
    if (scrubRaf) cancelAnimationFrame(scrubRaf);
    setCenteredRevealClass(false);
  }, { once: true });
})();

