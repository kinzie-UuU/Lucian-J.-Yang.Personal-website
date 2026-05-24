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
  let centeredRevealAnchorY = 0;
  let centeredRevealTarget = 0;
  let centeredTouchY = 0;
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const CENTERED_REVEAL_DONE = 0.86;
  const CENTERED_REVEAL_MIN = 0.1;
  const CENTERED_REVEAL_DELTA_SCALE = 2600;
  const CENTERED_REVEAL_MAX_STEP = 0.16;
  const VIDEO_FRAME_DURATION = 1 / 24;
  const portraitEnterFromProgress = (progress) => {
    const enterRaw = clamp01(progress / 0.14);
    return enterRaw * enterRaw * (3 - 2 * enterRaw);
  };

  const setCenteredRevealClass = (active) => {
    document.documentElement.classList.toggle("about-centered-reveal-active", active);
    document.body.classList.toggle("about-centered-reveal-active", active);
  };

  const sectionTop = () => {
    const currentY = window.scrollY || window.pageYOffset || 0;
    const rect = section.getBoundingClientRect();
    return Math.max(0, Math.round(currentY + rect.top));
  };

  const lockToCenteredAnchor = () => {
    if (!centeredRevealActive) return;
    window.scrollTo({ top: centeredRevealAnchorY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = centeredRevealAnchorY;
    document.body.scrollTop = centeredRevealAnchorY;
  };

  const syncCenteredVideo = () => {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const rawVideoProgress = clamp01((centeredRevealTarget - 0.34) / 0.52);
    targetVideoTime = video.duration * smootherStep(rawVideoProgress);
  };

  const releaseCenteredReveal = ({ force = false } = {}) => {
    if (!centeredRevealActive && !force) return;
    centeredRevealActive = false;
    setCenteredRevealClass(false);
    targetEnter = Math.max(targetEnter, currentEnter, CENTERED_REVEAL_DONE);
    targetTextEnter = 0;
    targetProgressValue = 0;
  };

  const isCenteredRevealInRange = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.32 && rect.bottom > vh * 0.34;
  };

  const releaseCenteredRevealBack = () => {
    if (!centeredRevealActive) return;
    centeredRevealActive = false;
    setCenteredRevealClass(false);
    const previousY = Math.max(0, centeredRevealAnchorY - window.innerHeight * 0.28);
    targetEnter = CENTERED_REVEAL_MIN;
    targetTextEnter = 0;
    targetProgressValue = 0;
    window.scrollTo({ top: previousY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = previousY;
    document.body.scrollTop = previousY;
  };

  const activateCenteredReveal = ({ anchorY = sectionTop(), enter = currentEnter } = {}) => {
    centeredRevealActive = true;
    centeredRevealAnchorY = Math.max(0, Math.round(anchorY));
    centeredRevealTarget = clamp01(enter);
    targetEnter = centeredRevealTarget;
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    currentTextEnter = 0;
    currentProgressValue = 0;
    currentExit = 0;
    setCenteredRevealClass(true);
    lockToCenteredAnchor();
    syncCenteredVideo();
    renderAboutReveal();
  };

  const advanceCenteredReveal = (delta) => {
    if (!centeredRevealActive) return;
    if (!Number.isFinite(delta) || Math.abs(delta) < 0.01) return;
    const direction = delta >= 0 ? 1 : -1;
    const rawStep = delta / CENTERED_REVEAL_DELTA_SCALE;
    const step = Math.max(-CENTERED_REVEAL_MAX_STEP, Math.min(CENTERED_REVEAL_MAX_STEP, rawStep));
    centeredRevealTarget = clamp01(centeredRevealTarget + step);
    if (direction > 0) centeredRevealTarget = Math.max(centeredRevealTarget, currentEnter);
    else centeredRevealTarget = Math.min(centeredRevealTarget, currentEnter);
    centeredRevealTarget = Math.max(CENTERED_REVEAL_MIN, centeredRevealTarget);
    targetEnter = centeredRevealTarget;
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    syncCenteredVideo();
    lockToCenteredAnchor();
    if (
      direction < 0
      && centeredRevealTarget <= CENTERED_REVEAL_MIN + 0.001
      && currentEnter <= CENTERED_REVEAL_MIN + 0.04
    ) {
      releaseCenteredRevealBack();
    }
  };

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
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return 0;
    return Math.max(0, Math.min(video.duration, time));
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
    smoothedVideoTime += (targetVideoTime - smoothedVideoTime) * 0.12;
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
      targetEnter = Math.max(targetEnter, centeredRevealTarget);
      targetTextEnter = 0;
      targetProgressValue = 0;
      targetExit = 0;
      if (Math.abs(window.scrollY - centeredRevealAnchorY) > 2) lockToCenteredAnchor();
      if (centeredRevealTarget >= CENTERED_REVEAL_DONE && currentEnter >= CENTERED_REVEAL_DONE - 0.04) {
        releaseCenteredReveal();
      }
    }

    const enterEase = centeredRevealActive ? 0.17 : 0.22;
    currentEnter += (targetEnter - currentEnter) * enterEase;
    currentTextEnter += (targetTextEnter - currentTextEnter) * 0.11;
    currentProgressValue += (targetProgressValue - currentProgressValue) * 0.07;
    currentExit += (targetExit - currentExit) * 0.085;

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

    if (
      progress <= 0.08
      && currentEnter < CENTERED_REVEAL_DONE + 0.08
      && rect.top <= window.innerHeight * 0.18
      && rect.top >= -window.innerHeight * 0.18
      && !document.body.classList.contains("about-services-handoff-active")
    ) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: Math.max(CENTERED_REVEAL_MIN, currentEnter),
      });
      return;
    }

    // The portrait reads from both the section timeline and the visual moment
    // where About enters the viewport. Copy still waits for section progress.
    const visualEnter = smootherStep(clamp01((window.innerHeight - rect.top) / (window.innerHeight * 0.62)));
    targetEnter = Math.max(portraitEnterFromProgress(progress), visualEnter);

    // Text reveal starts after the portrait has clearly appeared.
    targetTextEnter = smootherStep(clamp01((progress - 0.2) / 0.3));

    targetProgressValue = progress;

    // Exit starts later and takes longer, so the About scene breathes before
    // the copied Hero-style curtain hands off to Services.
    targetExit = smootherStep(clamp01((progress - 0.82) / 0.22));

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      // Video scrub overlaps the portrait reveal tail so the face turn feels
      // connected instead of waiting for a separate later phase.
      const rawVideoProgress = clamp01((progress - 0.12) / 0.58);
      const videoProgress = smootherStep(rawVideoProgress);
      targetVideoTime = video.duration * videoProgress;
    }
  };

  if (video) {
    video.pause();
    const markVideoReady = () => {
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
    if (!centeredRevealActive) return;
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(event.deltaY || 0);
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
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(delta * 3.2);
  }, { passive: false, capture: true });

  window.addEventListener("keydown", (event) => {
    if (!centeredRevealActive || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const direction = ["ArrowUp", "PageUp", "Home"].includes(event.key) ? -1 : 1;
    advanceCenteredReveal(direction * 720);
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

