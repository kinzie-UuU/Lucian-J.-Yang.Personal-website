(() => {
  const section = document.querySelector(".services-scroll-story");
  const sticky = section?.querySelector(".services-sticky");
  const titleNode = section?.querySelector(".services-entry-title");
  const panels = Array.from(section?.querySelectorAll(".service-text-panel") || []);
  if (!section || !sticky || !panels.length) return;

  const runtime = window.LucianRuntime;
  const reducedMotion = runtime?.reducedMotion
    || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const AUTO_DURATION = 30000;
  const SETTLE_GUARD = 520;
  const BRIDGE_AUTOPLAY_DELAY = 180;
  const BRIDGE_SEQUENCE_START_PROGRESS = 0.045;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);

  let ticking = false;
  let mode = "gate";
  let sequenceFrame = 0;
  let sequenceStart = 0;
  let settleGuardUntil = 0;
  let releaseGuardUntil = 0;
  let releaseFrame = 0;
  let releaseTargetY = 0;
  let touchStartY = 0;
  let bridgeAutoplayTimer = 0;
  let suppressBridgeAutoplayUntil = 0;

  const clearAboutHandoff = () => {
    document.querySelector(".portrait-canvas")?.classList.remove("is-about-curtain-down");
    document.documentElement.classList.remove(
      "about-services-handoff-active",
      "about-services-bridge-active",
      "about-services-bridge-visual-visible",
      "about-services-bridge-title-visible",
      "about-services-bridge-releasing"
    );
    document.body.classList.remove(
      "about-services-handoff-active",
      "about-services-bridge-active",
      "about-services-bridge-visual-visible",
      "about-services-bridge-title-visible",
      "about-services-bridge-releasing"
    );
  };

  const currentLang = () => (
    document.documentElement.lang === "en"
      || window.LucianRuntime?.getCurrentLang?.() === "en"
      || window.LucianLanguageRuntime?.getCurrentLang?.() === "en"
  ) ? "en" : "zh";

  const textFor = (key) => window.i18n?.[currentLang()]?.[key] || "";

  const rebuildTitleText = () => {
    if (!titleNode) return;
    const isEnglish = currentLang() === "en";
    const label = textFor("services_title") || (isEnglish ? "Why Work With Me" : "为何选择我");

    titleNode.textContent = label;
    titleNode.setAttribute("aria-label", label);
  };

  const rebuildServicesStoryText = () => {
    rebuildTitleText();

    panels.forEach((panel) => {
      const title = panel.querySelector(".service-text-title");
      const body = panel.querySelector(".service-text-body");
      const titleText = textFor(panel.dataset.serviceTitle);
      const bodyText = textFor(panel.dataset.serviceText);
      if (title && titleText) title.textContent = titleText;
      if (body && bodyText) body.textContent = bodyText;
    });
  };

  const writeProgress = (progress) => {
    const titleProgress = smooth(clamp01(progress / 0.18));
    const tunnelProgress = smooth(clamp01((progress - 0.02) / 0.2));
    const tunnelEnter = smooth(clamp01(progress / 0.06));
    const tunnelExit = smooth(clamp01((progress - 0.07) / 0.09));
    const timeProgress = smooth(clamp01((progress - 0.14) / 0.12));
    const cardProgress = smooth(clamp01((progress - 0.28) / 0.12));
    const stationProgress = smooth(clamp01((progress - 0.34) / 0.56));
    const outro = smooth(clamp01((progress - 0.94) / 0.06));
    const titleOpacity = reducedMotion ? 1 : clamp01(1 - smooth(clamp01((progress - 0.02) / 0.1)));
    const cardOpacity = reducedMotion ? 1 : clamp01(cardProgress * (1 - outro));
    const tunnelOpacity = reducedMotion ? 0 : clamp01(tunnelEnter * (1 - tunnelExit) * (1 - cardProgress * 0.34));
    const timeOpacity = reducedMotion ? 0 : clamp01(timeProgress * (1 - cardProgress * 0.04) * (1 - outro));
    const blackoutOpacity = reducedMotion ? 0 : clamp01(tunnelExit * (1 - cardProgress * 0.58) * (1 - outro * 0.85));
    const stationCount = Math.max(1, panels.length - 1);
    const stationPosition = stationProgress * stationCount;

    section.style.setProperty("--services-title-opacity", titleOpacity.toFixed(4));
    section.style.setProperty("--services-title-y", `${(-6 * titleProgress).toFixed(3)}svh`);
    section.style.setProperty("--services-title-scale", (1 + titleProgress * 0.035).toFixed(4));
    section.style.setProperty("--services-title-blur", `${(titleProgress * 10).toFixed(3)}px`);
    section.style.setProperty("--services-tunnel-progress", tunnelProgress.toFixed(4));
    section.style.setProperty("--services-tunnel-opacity", tunnelOpacity.toFixed(4));
    section.style.setProperty("--services-time-opacity", timeOpacity.toFixed(4));
    section.style.setProperty("--services-blackout-opacity", blackoutOpacity.toFixed(4));
    section.style.setProperty("--services-card-progress", cardProgress.toFixed(4));
    section.style.setProperty("--services-card-opacity", cardOpacity.toFixed(4));
    section.style.setProperty("--services-card-y", `${(2.6 * (1 - cardProgress)).toFixed(3)}svh`);
    section.style.setProperty("--services-card-scale", (0.985 + cardProgress * 0.015).toFixed(4));
    section.style.setProperty("--services-card-blur", `${((1 - cardProgress) * 8).toFixed(3)}px`);
    section.style.setProperty("--services-outro", outro.toFixed(4));

    panels.forEach((panel, index) => {
      const signedDistance = index - stationPosition;
      const distance = Math.abs(signedDistance);
      const panelProgress = reducedMotion ? 1 : smooth(clamp01(1 - distance / 0.62));
      const engraveProgress = reducedMotion ? 1 : panelProgress;
      const panelBlur = reducedMotion ? 0 : Math.min(12, distance * 5.8 + (1 - panelProgress) * 2.6 + outro * 8);
      const panelY = reducedMotion ? 0 : signedDistance * -5.6 + (1 - panelProgress) * 3.8;
      const panelScale = reducedMotion ? 1 : 0.82 + panelProgress * 0.18;
      panel.style.setProperty("--service-panel-progress", panelProgress.toFixed(4));
      panel.style.setProperty("--service-panel-offset", signedDistance.toFixed(4));
      panel.style.setProperty("--service-panel-y", `${panelY.toFixed(3)}svh`);
      panel.style.setProperty("--service-panel-scale", panelScale.toFixed(4));
      panel.style.setProperty("--service-panel-engrave", engraveProgress.toFixed(4));
      panel.style.setProperty("--service-panel-blur", `${panelBlur.toFixed(3)}px`);
    });

    window.LucianServicesPrismatic?.setProgress?.({
      progress,
      tunnelProgress,
      timeProgress,
      cardProgress,
      stationProgress,
      outro,
    });
    window.LucianServicesTimeTunnel?.setProgress?.({
      progress,
      tunnelProgress,
      timeProgress,
      cardProgress,
      stationProgress,
      outro,
    });
  };

  const readProgress = () => {
    if (reducedMotion) {
      writeProgress(1);
      return;
    }

    if (document.body.classList.contains("about-services-bridge-active")) return;

    if (mode === "playing") {
      settleToGate();
      return;
    }

    if (mode === "released" && releaseTargetY && performance.now() < releaseGuardUntil) {
      settleToRelease();
      writeProgress(1);
      return;
    }

    if (mode === "gate") {
      if (isBeforeServices()) {
        writeProgress(0);
        return;
      }
      if (isPastReleasedZone()) {
        mode = "released";
      } else {
        writeProgress(0);
        return;
      }
    }

    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const travel = Math.max(1, rect.height - vh);
    writeProgress(clamp01(-rect.top / travel));
  };

  const sectionTop = () => Math.max(0, Math.round((window.scrollY || window.pageYOffset || 0) + section.getBoundingClientRect().top));
  const releaseTop = () => {
    const vh = Math.max(1, window.innerHeight || 1);
    return Math.max(0, Math.round(sectionTop() + section.offsetHeight - vh + 2));
  };
  const worksTransitionTop = () => {
    const transition = document.querySelector("#works-transition");
    if (!transition) return releaseTop();
    return Math.max(0, Math.round(transition.offsetTop));
  };

  function settleToGate() {
    const top = sectionTop();
    if (Math.abs((window.scrollY || window.pageYOffset || 0) - top) <= 2) return;
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  }

  const isInGateZone = () => {
    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight || 1);
    return rect.top < vh * 0.18 && rect.bottom > vh * 0.72;
  };

  const isBeforeServices = () => {
    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight || 1);
    return rect.bottom > vh && rect.top > -vh * 0.08;
  };

  const isPastReleasedZone = () => {
    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight || 1);
    return rect.top < -vh * 1.2;
  };

  const setSequenceClass = (playing) => {
    document.documentElement.classList.toggle("services-sequence-playing", playing);
    document.body.classList.toggle("services-sequence-playing", playing);
  };

  const setReleaseClass = (releasing) => {
    document.documentElement.classList.toggle("services-sequence-releasing", releasing);
    document.body.classList.toggle("services-sequence-releasing", releasing);
  };

  const settleToRelease = () => {
    if (!releaseTargetY) return;
    document.querySelector("#works-transition")?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "auto",
    });
    window.scrollTo({ top: releaseTargetY, left: 0, behavior: "auto" });
    window.scrollTo(0, releaseTargetY);
    document.documentElement.scrollTop = releaseTargetY;
    document.body.scrollTop = releaseTargetY;
  };

  const guardReleasePosition = () => {
    if (!releaseTargetY || performance.now() >= releaseGuardUntil) {
      releaseFrame = 0;
      releaseGuardUntil = 0;
      releaseTargetY = 0;
      setReleaseClass(false);
      return;
    }
    settleToRelease();
    writeProgress(1);
    releaseFrame = window.requestAnimationFrame(guardReleasePosition);
  };

  const resetSequence = () => {
    window.cancelAnimationFrame(sequenceFrame);
    window.cancelAnimationFrame(releaseFrame);
    window.clearTimeout(bridgeAutoplayTimer);
    bridgeAutoplayTimer = 0;
    sequenceFrame = 0;
    sequenceStart = 0;
    releaseFrame = 0;
    releaseGuardUntil = 0;
    releaseTargetY = 0;
    mode = "gate";
    settleGuardUntil = 0;
    setSequenceClass(false);
    setReleaseClass(false);
    writeProgress(0);
  };

  const finishSequence = () => {
    window.cancelAnimationFrame(sequenceFrame);
    sequenceFrame = 0;
    mode = "released";
    clearAboutHandoff();
    writeProgress(1);
    const target = worksTransitionTop();
    releaseTargetY = target;
    releaseGuardUntil = performance.now() + 5200;
    setSequenceClass(false);
    setReleaseClass(true);
    settleToRelease();
    window.cancelAnimationFrame(releaseFrame);
    releaseFrame = window.requestAnimationFrame(guardReleasePosition);
    window.dispatchEvent(new CustomEvent("lucian:services-sequence-complete", {
      detail: { targetY: target },
    }));
  };

  const runSequence = (now) => {
    if (mode !== "playing") return;
    const elapsed = Math.max(0, now - sequenceStart);
    const progress = clamp01(elapsed / AUTO_DURATION);
    clearAboutHandoff();
    settleToGate();
    writeProgress(progress);
    if (progress >= 1) {
      finishSequence();
      return;
    }
    sequenceFrame = window.requestAnimationFrame(runSequence);
  };

  const startSequence = ({ fromBridge = false } = {}) => {
    if (reducedMotion || mode === "playing") return;
    if (mode === "released") return;
    if (!isInGateZone()) return;
    mode = "playing";
    clearAboutHandoff();
    setSequenceClass(true);
    window.dispatchEvent(new CustomEvent("lucian:services-sequence-start", {
      detail: { fromBridge },
    }));
    settleGuardUntil = performance.now() + SETTLE_GUARD;
    settleToGate();
    writeProgress(fromBridge ? BRIDGE_SEQUENCE_START_PROGRESS : 0);
    window.cancelAnimationFrame(sequenceFrame);
    sequenceStart = performance.now() - (fromBridge ? AUTO_DURATION * BRIDGE_SEQUENCE_START_PROGRESS : 0);
    sequenceFrame = window.requestAnimationFrame(runSequence);
  };

  const scheduleBridgeAutoplay = (event) => {
    if (reducedMotion || mode !== "gate" || event.detail?.programmatic) return;
    if (performance.now() < suppressBridgeAutoplayUntil) return;
    window.clearTimeout(bridgeAutoplayTimer);
    bridgeAutoplayTimer = window.setTimeout(() => {
      bridgeAutoplayTimer = 0;
      if (mode !== "gate" || !isInGateZone()) return;
      startSequence({ fromBridge: true });
    }, BRIDGE_AUTOPLAY_DELAY);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      readProgress();
    });
  };

  window.rebuildServicesStoryText = () => {
    rebuildServicesStoryText();
    requestUpdate();
  };

  window.LucianServicesStory = {
    previewBridge: (progress = BRIDGE_SEQUENCE_START_PROGRESS) => {
      if (reducedMotion || mode === "playing") return;
      writeProgress(clamp01(progress));
    },
    refresh: requestUpdate,
    reset: resetSequence,
    start: startSequence,
  };

  rebuildServicesStoryText();
  readProgress();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", (event) => {
    if (event.detail?.targetId === "services") {
      suppressBridgeAutoplayUntil = performance.now() + 1600;
      window.clearTimeout(bridgeAutoplayTimer);
      bridgeAutoplayTimer = 0;
      window.requestAnimationFrame(() => {
        resetSequence();
        settleToGate();
      });
      return;
    }
    requestUpdate();
  });
  window.addEventListener("lucian:site-entered", requestUpdate);
  window.addEventListener("lucian:about-services-bridge-complete", scheduleBridgeAutoplay);
  window.addEventListener("wheel", (event) => {
    if (reducedMotion) return;
    if (mode === "playing") {
      event.preventDefault();
      event.stopPropagation();
      if (performance.now() < settleGuardUntil) window.requestAnimationFrame(settleToGate);
      return;
    }
    if (mode !== "gate" || event.deltaY <= 0 || !isInGateZone()) return;
    event.preventDefault();
    event.stopPropagation();
    startSequence();
  }, { passive: false, capture: true });
  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches?.[0]?.clientY || 0;
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (reducedMotion) return;
    const currentY = event.touches?.[0]?.clientY || touchStartY;
    const movingDownPage = touchStartY - currentY > 10;
    if (mode === "playing") {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (mode !== "gate" || !movingDownPage || !isInGateZone()) return;
    event.preventDefault();
    event.stopPropagation();
    startSequence();
  }, { passive: false, capture: true });
  window.addEventListener("keydown", (event) => {
    if (reducedMotion) return;
    const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
    if (!forwardKeys.includes(event.key)) return;
    if (mode === "playing") {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (mode !== "gate" || !isInGateZone()) return;
    event.preventDefault();
    event.stopPropagation();
    startSequence();
  }, { capture: true });
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(sequenceFrame);
    window.cancelAnimationFrame(releaseFrame);
    window.clearTimeout(bridgeAutoplayTimer);
    setSequenceClass(false);
    setReleaseClass(false);
  }, { once: true });
})();
