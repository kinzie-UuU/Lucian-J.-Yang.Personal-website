(() => {
  const section = document.querySelector(".services-scroll-story");
  const sticky = section?.querySelector(".services-sticky");
  const titleNode = section?.querySelector(".services-entry-title");
  const panels = Array.from(section?.querySelectorAll(".service-text-panel") || []);
  if (!section || !sticky || !panels.length) return;

  const runtime = window.LucianRuntime;
  const reducedMotion = runtime?.reducedMotion
    || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const AUTO_DURATION = 46000;
  const MANUAL_SEQUENCE_START_PROGRESS = 0.11;
  const BRIDGE_SEQUENCE_START_PROGRESS = 0.08;
  const SERVICES_TITLE_HOLD_PROGRESS = 0.03;
  const PRISMATIC_WINDOW_START = 0.00;
  const PRISMATIC_WINDOW_END = 0.06;
  const PRISMATIC_EXPAND_END = 0.12;
  const SERVICE_STATION_START = 0.10;
  const SERVICE_STATION_END = 0.78;
  const SERVICE_STATION_DWELL_EDGE = 0.18;
  const SERVICE_OUTRO_START = 0.965;
  const SEQUENCE_SCROLL_HOLD_PROGRESS = 0.82;
  const SEQUENCE_SCROLL_RELEASE_START = 0.965;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  const scrollProgressFromSequenceProgress = (progress) => {
    const value = clamp01(progress);
    if (value <= SEQUENCE_SCROLL_HOLD_PROGRESS) return value;
    if (value < SEQUENCE_SCROLL_RELEASE_START) return SEQUENCE_SCROLL_HOLD_PROGRESS;
    const release = smooth(clamp01((value - SEQUENCE_SCROLL_RELEASE_START) / (1 - SEQUENCE_SCROLL_RELEASE_START)));
    return SEQUENCE_SCROLL_HOLD_PROGRESS + release * (1 - SEQUENCE_SCROLL_HOLD_PROGRESS);
  };

  const stationPositionFromProgress = (progress, stationCount) => {
    const count = Math.max(0, stationCount);
    if (!count) return 0;
    const scaled = clamp01(progress) * count;
    if (scaled >= count) return count;
    const index = Math.floor(scaled);
    const local = scaled - index;
    const holdStart = SERVICE_STATION_DWELL_EDGE;
    const holdEnd = 1 - SERVICE_STATION_DWELL_EDGE;
    if (local <= holdStart) return index;
    if (local >= holdEnd) return Math.min(count, index + 1);
    return index + smooth((local - holdStart) / (holdEnd - holdStart));
  };

  let ticking = false;
  let mode = "gate";
  let sequenceFrame = 0;
  let sequenceStart = 0;
  let sequenceStartY = 0;
  let sequenceEndY = 0;
  let bridgeAutoplayTimer = 0;
  let suppressBridgeAutoplayUntil = 0;
  let touchStartY = 0;
  let lastScrollY = window.scrollY || window.pageYOffset || 0;
  let rebuildingTitle = false;
  let titleRebuildFrame = 0;

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

  const titleIsSplit = () => (
    titleNode?.querySelectorAll(".services-title-part").length === 2
  );

  const rebuildTitleText = () => {
    if (!titleNode || rebuildingTitle) return;
    rebuildingTitle = true;
    const isEnglish = currentLang() === "en";
    const label = textFor("services_title") || (isEnglish ? "Why Work With Me" : "\u4e3a\u4f55\u9009\u62e9\u6211");
    const [leftText, rightText] = isEnglish ? ["Why Work", "With Me"] : ["\u4e3a\u4f55", "\u9009\u62e9\u6211"];
    const left = document.createElement("span");
    const right = document.createElement("span");

    left.className = "services-title-part services-title-part--left";
    right.className = "services-title-part services-title-part--right";
    left.textContent = leftText;
    right.textContent = rightText;
    titleNode.classList.remove("js-scroll-type-disabled", "scroll-type-text");
    titleNode.removeAttribute("data-i18n");
    titleNode.replaceChildren(left, right);
    titleNode.setAttribute("aria-label", label);
    delete titleNode.dataset.typeSource;
    titleNode.style.removeProperty("--glyph-count");
    rebuildingTitle = false;
  };

  const scheduleTitleRebuild = () => {
    if (rebuildingTitle || titleIsSplit() || titleRebuildFrame) return;
    titleRebuildFrame = window.requestAnimationFrame(() => {
      titleRebuildFrame = 0;
      if (!titleIsSplit()) rebuildTitleText();
    });
  };

  const titleObserver = titleNode && "MutationObserver" in window
    ? new MutationObserver(scheduleTitleRebuild)
    : null;
  titleObserver?.observe(titleNode, {
    attributes: true,
    attributeFilter: ["data-i18n"],
    childList: true,
    characterData: true,
    subtree: true,
  });

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
    const storyProgress = clamp01((progress - SERVICES_TITLE_HOLD_PROGRESS) / (1 - SERVICES_TITLE_HOLD_PROGRESS));
    const postPortalProgress = clamp01((progress - PRISMATIC_EXPAND_END) / (1 - PRISMATIC_EXPAND_END));
    const portalReveal = smooth(clamp01((progress - PRISMATIC_WINDOW_START) / (PRISMATIC_WINDOW_END - PRISMATIC_WINDOW_START)));
    const portalExpand = smooth(clamp01((progress - PRISMATIC_WINDOW_END) / (PRISMATIC_EXPAND_END - PRISMATIC_WINDOW_END)));
    const portalProgress = clamp01(portalReveal * 0.42 + portalExpand * 0.58);
    const portalScale = 1 + portalExpand * 0.08;
    const portalWidth = 30 + portalExpand * 70;
    const portalHeight = 22 + portalExpand * 78;
    const portalRadius = 10 * (1 - portalExpand);
    const portalGlow = 18 + portalExpand * 46;
    const portalAura = (0.45 + portalReveal * 0.55) * 42;
    const portalStrokeOpacity = 0.06 * (1 - portalExpand);
    const titleProgress = smooth(clamp01((progress - 0.06) / 0.12));
    const tunnelProgress = smooth(clamp01((progress - PRISMATIC_WINDOW_START) / (PRISMATIC_EXPAND_END - PRISMATIC_WINDOW_START)));
    const tunnelEnter = portalReveal;
    const tunnelExit = smooth(clamp01(postPortalProgress / 0.12));
    const timeProgress = smooth(clamp01((postPortalProgress - 0.04) / 0.14));
    const cardProgress = smooth(clamp01((postPortalProgress - 0.02) / 0.14));
    const stationProgress = smooth(clamp01((postPortalProgress - SERVICE_STATION_START) / (SERVICE_STATION_END - SERVICE_STATION_START)));
    const outro = smooth(clamp01((postPortalProgress - SERVICE_OUTRO_START) / (1 - SERVICE_OUTRO_START)));
    const titleOpacity = reducedMotion ? 1 : clamp01(1 - smooth(clamp01((progress - 0.07) / 0.12)));
    const cardOpacity = reducedMotion ? 1 : clamp01(cardProgress * (1 - outro));
    const tunnelOpacity = reducedMotion ? 0 : clamp01((0.9 + portalReveal * 0.1) * (1 - tunnelExit * 0.26) * (1 - cardProgress * 0.34));
    const timeOpacity = reducedMotion ? 0 : clamp01(timeProgress * (1 - cardProgress * 0.04) * (1 - outro));
    const blackoutOpacity = reducedMotion ? 0 : clamp01(tunnelExit * (1 - cardProgress * 0.58) * (1 - outro * 0.85));
    const stationCount = Math.max(1, panels.length - 1);
    const stationPosition = stationPositionFromProgress(stationProgress, stationCount);

    section.style.setProperty("--services-portal-reveal", portalReveal.toFixed(4));
    section.style.setProperty("--services-portal-expand", portalExpand.toFixed(4));
    section.style.setProperty("--services-portal-progress", portalProgress.toFixed(4));
    section.style.setProperty("--services-portal-scale", portalScale.toFixed(4));
    section.style.setProperty("--services-portal-width", `${portalWidth.toFixed(3)}vw`);
    section.style.setProperty("--services-portal-height", `${portalHeight.toFixed(3)}svh`);
    section.style.setProperty("--services-portal-radius", `${portalRadius.toFixed(3)}px`);
    section.style.setProperty("--services-portal-glow", `${portalGlow.toFixed(3)}px`);
    section.style.setProperty("--services-portal-aura", `${portalAura.toFixed(3)}px`);
    section.style.setProperty("--services-portal-stroke-opacity", portalStrokeOpacity.toFixed(4));
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
      const panelProgress = reducedMotion ? 1 : smooth(clamp01(1 - distance / 1.02));
      const engraveProgress = reducedMotion ? 1 : panelProgress;
      const panelBlur = reducedMotion ? 0 : Math.min(10, distance * 2.8 + (1 - panelProgress) * 1.4 + outro * 8);
      const panelY = reducedMotion ? 0 : signedDistance * 8.4;
      const panelScale = reducedMotion ? 1 : 0.9 + panelProgress * 0.1;
      const panelDepth = reducedMotion ? 1 : clamp01(1 - distance / 1.42);
      panel.style.setProperty("--service-panel-progress", panelProgress.toFixed(4));
      panel.style.setProperty("--service-panel-offset", signedDistance.toFixed(4));
      panel.style.setProperty("--service-panel-y", `${panelY.toFixed(3)}svh`);
      panel.style.setProperty("--service-panel-scale", panelScale.toFixed(4));
      panel.style.setProperty("--service-panel-engrave", engraveProgress.toFixed(4));
      panel.style.setProperty("--service-panel-blur", `${panelBlur.toFixed(3)}px`);
      panel.style.setProperty("--service-panel-depth", panelDepth.toFixed(4));
      panel.style.zIndex = String(Math.round(panelDepth * 100));
    });

    window.LucianServicesPrismatic?.setProgress?.({
      progress: storyProgress,
      tunnelProgress,
      timeProgress,
      cardProgress,
      stationProgress,
      outro,
    });
    window.LucianServicesTimeTunnel?.setProgress?.({
      progress: storyProgress,
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
    if (mode === "playing") return;

    lastScrollY = currentScrollY();

    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const travel = Math.max(1, rect.height - vh);
    if (mode === "released" && rect.top > vh * 0.2) {
      mode = "gate";
      setReleaseClass(false);
    }
    writeProgress(clamp01(-rect.top / travel));
  };

  const sectionTop = () => Math.max(0, Math.round((window.scrollY || window.pageYOffset || 0) + section.getBoundingClientRect().top));
  const worksTransitionTop = () => {
    const transition = document.querySelector("#works-transition");
    const sectionEnd = Math.max(0, Math.round(sectionTop() + section.offsetHeight));
    if (transition) return Math.max(sectionEnd, Math.round(transition.offsetTop));
    return sectionEnd;
  };
  const currentScrollY = () => window.scrollY || window.pageYOffset || 0;

  const isInGateZone = () => {
    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight || 1);
    return rect.top < vh * 0.18 && rect.bottom > vh * 0.14;
  };

  const scrollToSequenceProgress = (progress) => {
    if (!sequenceEndY || sequenceEndY <= sequenceStartY) return;
    const top = Math.round(sequenceStartY + (sequenceEndY - sequenceStartY) * clamp01(progress));
    const root = document.scrollingElement || document.documentElement;
    if (root) root.scrollTop = top;
    window.scrollTo(0, top);
  };

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
    sequenceStartY = 0;
    sequenceEndY = 0;
    mode = "gate";
    setSequenceClass(false);
    setReleaseClass(false);
    readProgress();
  };

  const finishSequence = () => {
    window.cancelAnimationFrame(sequenceFrame);
    sequenceFrame = 0;
    mode = "released";
    clearAboutHandoff();
    setSequenceClass(false);
    setReleaseClass(true);
    writeProgress(1);
    scrollToSequenceProgress(1);
    window.dispatchEvent(new CustomEvent("lucian:services-sequence-complete", {
      detail: { targetY: sequenceEndY },
    }));
    window.requestAnimationFrame(() => setReleaseClass(false));
  };

  const runSequence = (now) => {
    if (mode !== "playing") return;
    const progress = clamp01((now - sequenceStart) / AUTO_DURATION);
    clearAboutHandoff();
    writeProgress(progress);
    scrollToSequenceProgress(scrollProgressFromSequenceProgress(progress));
    if (progress >= 1) {
      finishSequence();
      return;
    }
    sequenceFrame = window.requestAnimationFrame(runSequence);
  };

  const startSequence = ({ fromBridge = false } = {}) => {
    if (reducedMotion || mode === "playing") return;
    if (!fromBridge && !isInGateZone()) return;
    mode = "playing";
    clearAboutHandoff();
    setSequenceClass(true);
    setReleaseClass(false);
    sequenceStartY = Math.max(currentScrollY(), sectionTop());
    sequenceEndY = Math.max(sequenceStartY + 1, worksTransitionTop());
    const initialProgress = fromBridge
      ? BRIDGE_SEQUENCE_START_PROGRESS
      : MANUAL_SEQUENCE_START_PROGRESS;
    writeProgress(initialProgress);
    scrollToSequenceProgress(initialProgress);
    window.dispatchEvent(new CustomEvent("lucian:services-sequence-start", {
      detail: { fromBridge },
    }));
    window.cancelAnimationFrame(sequenceFrame);
    sequenceStart = performance.now() - AUTO_DURATION * initialProgress;
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
    }, 180);
  };

  const cancelSequenceToUserScroll = () => {
    if (mode !== "playing") return;
    window.cancelAnimationFrame(sequenceFrame);
    sequenceFrame = 0;
    sequenceStart = 0;
    sequenceStartY = 0;
    sequenceEndY = 0;
    mode = "gate";
    setSequenceClass(false);
    setReleaseClass(false);
    readProgress();
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
  window.requestAnimationFrame(rebuildServicesStoryText);
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
  window.addEventListener("lucian:site-entered", () => {
    rebuildServicesStoryText();
    requestUpdate();
  });
  window.addEventListener("lucian:about-services-bridge-complete", scheduleBridgeAutoplay);
  window.addEventListener("wheel", (event) => {
    if (reducedMotion) return;
    if (mode === "playing") {
      if (event.deltaY < -4) {
        cancelSequenceToUserScroll();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    requestUpdate();
  }, { passive: false, capture: true });
  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches?.[0]?.clientY || 0;
  }, { passive: true, capture: true });
  window.addEventListener("touchmove", (event) => {
    if (reducedMotion) return;
    const currentY = event.touches?.[0]?.clientY || touchStartY;
    const delta = touchStartY - currentY;
    touchStartY = currentY;
    if (mode === "playing") {
      if (delta < -8) {
        cancelSequenceToUserScroll();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    requestUpdate();
  }, { passive: false, capture: true });
  window.addEventListener("keydown", (event) => {
    if (reducedMotion) return;
    const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
    const backKeys = ["ArrowUp", "PageUp", "Home"];
    if (mode === "playing") {
      if (backKeys.includes(event.key)) {
        cancelSequenceToUserScroll();
        return;
      }
      if (forwardKeys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (!forwardKeys.includes(event.key) && !backKeys.includes(event.key)) return;
    requestUpdate();
  }, { capture: true });
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(sequenceFrame);
    window.cancelAnimationFrame(titleRebuildFrame);
    window.clearTimeout(bridgeAutoplayTimer);
    titleObserver?.disconnect();
    setSequenceClass(false);
    setReleaseClass(false);
  }, { once: true });
})();
