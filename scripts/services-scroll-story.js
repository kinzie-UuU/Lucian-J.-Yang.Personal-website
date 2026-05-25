(() => {
  const section = document.querySelector(".services-scroll-story");
  const sticky = section?.querySelector(".services-sticky");
  const titleNode = section?.querySelector(".services-entry-title");
  const panels = Array.from(section?.querySelectorAll(".service-text-panel") || []);
  if (!section || !sticky || !panels.length) return;

  const runtime = window.LucianRuntime;
  const reducedMotion = runtime?.reducedMotion
    || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const BRIDGE_SEQUENCE_START_PROGRESS = 0.045;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);

  let ticking = false;
  let mode = "scroll";
  let sequenceFrame = 0;
  let sequenceStart = 0;
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
    delete titleNode.dataset.typeSource;
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
    const tunnelProgress = smooth(clamp01((progress - 0.02) / 0.3));
    const tunnelEnter = smooth(clamp01(progress / 0.06));
    const tunnelExit = smooth(clamp01((progress - 0.28) / 0.1));
    const timeProgress = smooth(clamp01((progress - 0.16) / 0.18));
    const cardProgress = smooth(clamp01((progress - 0.36) / 0.12));
    const stationProgress = smooth(clamp01((progress - 0.44) / 0.46));
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

    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const travel = Math.max(1, rect.height - vh);
    writeProgress(clamp01(-rect.top / travel));
  };

  const sectionTop = () => Math.max(0, Math.round((window.scrollY || window.pageYOffset || 0) + section.getBoundingClientRect().top));
  const setSequenceClass = (playing) => {
    document.documentElement.classList.toggle("services-sequence-playing", playing);
    document.body.classList.toggle("services-sequence-playing", playing);
  };

  const setReleaseClass = (releasing) => {
    document.documentElement.classList.toggle("services-sequence-releasing", releasing);
    document.body.classList.toggle("services-sequence-releasing", releasing);
  };

  const resetSequence = () => {
    window.cancelAnimationFrame(sequenceFrame);
    window.clearTimeout(bridgeAutoplayTimer);
    bridgeAutoplayTimer = 0;
    sequenceFrame = 0;
    sequenceStart = 0;
    mode = "scroll";
    setSequenceClass(false);
    setReleaseClass(false);
    readProgress();
  };

  const startSequence = ({ fromBridge = false } = {}) => {
    if (reducedMotion) return;
    mode = "scroll";
    clearAboutHandoff();
    setSequenceClass(false);
    setReleaseClass(false);
    window.dispatchEvent(new CustomEvent("lucian:services-scroll-start", {
      detail: { fromBridge },
    }));
    if (fromBridge) writeProgress(BRIDGE_SEQUENCE_START_PROGRESS);
    window.cancelAnimationFrame(sequenceFrame);
    sequenceFrame = window.requestAnimationFrame(readProgress);
  };

  const scheduleBridgeAutoplay = (event) => {
    if (reducedMotion || event.detail?.programmatic) return;
    if (performance.now() < suppressBridgeAutoplayUntil) return;
    window.clearTimeout(bridgeAutoplayTimer);
    bridgeAutoplayTimer = window.setTimeout(() => {
      bridgeAutoplayTimer = 0;
      startSequence({ fromBridge: true });
    }, 180);
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
      });
      return;
    }
    requestUpdate();
  });
  window.addEventListener("lucian:site-entered", requestUpdate);
  window.addEventListener("lucian:about-services-bridge-complete", scheduleBridgeAutoplay);
  window.addEventListener("wheel", (event) => {
    if (reducedMotion) return;
    requestUpdate();
  }, { passive: true });
  window.addEventListener("touchmove", () => {
    if (reducedMotion) return;
    requestUpdate();
  }, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (reducedMotion) return;
    const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
    if (!forwardKeys.includes(event.key)) return;
    requestUpdate();
  }, { capture: true });
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(sequenceFrame);
    window.clearTimeout(bridgeAutoplayTimer);
    setSequenceClass(false);
    setReleaseClass(false);
  }, { once: true });
})();
