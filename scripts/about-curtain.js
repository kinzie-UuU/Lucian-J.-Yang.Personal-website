/**
 * About -> Services visual handoff.
 *
 * Mirrors the Hero -> About handoff: once the user pushes past About, the
 * black sheet covers the viewport, input is briefly locked, the real Services
 * stage fades in behind it, and the page lands on the Services title gate.
 */
(() => {
  const stage = document.querySelector(".portrait-canvas");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  const servicesSection = document.querySelector("#services");
  if (!stage || !aboutSection || !servicesSection) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CURTAIN_DURATION = 1650;
  const VISUAL_REVEAL_DELAY = 260;
  const TITLE_REVEAL_DELAY = 740;
  const BRIDGE_PREVIEW_PROGRESS = 0.045;
  const SEQUENCE_START_DELAY = 180;
  const SETTLE_GUARD_DURATION = 760;
  const RESET_DISTANCE = 0.9;

  let ticking = false;
  let bridgeActive = false;
  let bridgeComplete = false;
  let bridgeTimer = 0;
  let visualTimer = 0;
  let titleTimer = 0;
  let settleGuardUntil = 0;
  let settleTargetY = 0;
  let programmaticUntil = 0;
  let servicesStoryUntil = 0;

  const previewServicesStage = (progress = 0) => {
    window.LucianServicesStory?.previewBridge?.(progress);
  };

  const setBridgeClasses = (active, { visualVisible = false, titleVisible = false, releasing = false } = {}) => {
    document.documentElement.classList.toggle("about-services-bridge-active", active);
    document.body.classList.toggle("about-services-bridge-active", active);
    document.documentElement.classList.toggle("about-services-bridge-visual-visible", active && visualVisible);
    document.body.classList.toggle("about-services-bridge-visual-visible", active && visualVisible);
    document.documentElement.classList.toggle("about-services-bridge-title-visible", active && titleVisible);
    document.body.classList.toggle("about-services-bridge-title-visible", active && titleVisible);
    document.documentElement.classList.toggle("about-services-bridge-releasing", active && releasing);
    document.body.classList.toggle("about-services-bridge-releasing", active && releasing);
  };

  const setHandoffClass = (active) => {
    document.documentElement.classList.toggle("about-services-handoff-active", active);
    document.body.classList.toggle("about-services-handoff-active", active);
  };

  const dispatchBridgeComplete = () => {
    window.dispatchEvent(new CustomEvent("lucian:about-services-bridge-complete", {
      detail: {
        targetId: "services",
        programmatic: performance.now() < programmaticUntil,
      },
    }));
  };

  const servicesTop = () => Math.max(0, Math.round(
    (window.scrollY || window.pageYOffset || 0) + servicesSection.getBoundingClientRect().top
  ));

  const settleToServices = () => {
    const top = settleTargetY || servicesTop();
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  };

  const clearTimers = () => {
    window.clearTimeout(bridgeTimer);
    window.clearTimeout(visualTimer);
    window.clearTimeout(titleTimer);
    bridgeTimer = 0;
    visualTimer = 0;
    titleTimer = 0;
  };

  const resetBridge = () => {
    clearTimers();
    bridgeActive = false;
    bridgeComplete = false;
    settleGuardUntil = 0;
    settleTargetY = 0;
    stage.classList.remove("is-about-curtain-down");
    setHandoffClass(false);
    setBridgeClasses(false);
    previewServicesStage(0);
  };

  const finishBridge = () => {
    settleTargetY = servicesTop();
    settleGuardUntil = performance.now() + SETTLE_GUARD_DURATION;
    settleToServices();

    window.requestAnimationFrame(() => {
      setHandoffClass(false);
      setBridgeClasses(true, { visualVisible: true, titleVisible: true, releasing: true });
      bridgeActive = false;
      bridgeComplete = true;
      window.setTimeout(() => {
        if (!bridgeComplete) return;
        setBridgeClasses(false);
      }, 620);
      dispatchBridgeComplete();
      window.setTimeout(() => {
        window.LucianServicesStory?.start?.({ fromBridge: true });
      }, SEQUENCE_START_DELAY);
    });
  };

  const startBridge = () => {
    if (
      bridgeActive
      || bridgeComplete
      || performance.now() < programmaticUntil
      || performance.now() < servicesStoryUntil
      || document.body.classList.contains("services-sequence-playing")
      || document.body.classList.contains("services-sequence-releasing")
      || document.body.classList.contains("nav-transition-active")
      || document.body.classList.contains("work-gallery-open")
    ) return;

    bridgeActive = true;
    setHandoffClass(true);
    setBridgeClasses(true);
    previewServicesStage(0);
    stage.classList.add("is-about-curtain-down");
    clearTimers();

    if (reducedMotion) {
      previewServicesStage(BRIDGE_PREVIEW_PROGRESS);
      setBridgeClasses(true, { visualVisible: true, titleVisible: true });
      finishBridge();
      return;
    }

    visualTimer = window.setTimeout(() => {
      if (!bridgeActive) return;
      previewServicesStage(BRIDGE_PREVIEW_PROGRESS);
      setBridgeClasses(true, { visualVisible: true });
    }, VISUAL_REVEAL_DELAY);
    titleTimer = window.setTimeout(() => {
      if (!bridgeActive) return;
      previewServicesStage(BRIDGE_PREVIEW_PROGRESS);
      setBridgeClasses(true, { visualVisible: true, titleVisible: true });
    }, TITLE_REVEAL_DELAY);
    bridgeTimer = window.setTimeout(finishBridge, CURTAIN_DURATION);
  };

  const update = () => {
    ticking = false;

    if (settleGuardUntil && performance.now() < settleGuardUntil) {
      if (Math.abs((window.scrollY || window.pageYOffset || 0) - settleTargetY) > 2) settleToServices();
      return;
    }

    if (bridgeActive) return;
    const aboutRect = aboutSection.getBoundingClientRect();
    const servicesRect = servicesSection.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const sectionsReady = aboutSection.offsetHeight > vh * 0.8 && servicesSection.offsetHeight > vh * 0.8;

    if (!sectionsReady) {
      if (!bridgeComplete) previewServicesStage(0);
      return;
    }

    const canStartBridge = (
      aboutRect.bottom < vh * 0.68
      && aboutRect.bottom > -vh * 0.12
      && servicesRect.top < vh * 1.02
      && servicesRect.top > -vh * 0.22
      && !document.body.classList.contains("services-sequence-playing")
      && !document.body.classList.contains("services-sequence-releasing")
      && !document.body.classList.contains("nav-transition-active")
      && !document.body.classList.contains("work-gallery-open")
      && performance.now() >= programmaticUntil
      && performance.now() >= servicesStoryUntil
    );

    if (canStartBridge) startBridge();
    else if (bridgeComplete && servicesRect.top > vh * RESET_DISTANCE) resetBridge();
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", () => {
    programmaticUntil = performance.now() + 1400;
    if (bridgeActive) resetBridge();
    requestUpdate();
  });
  window.addEventListener("lucian:services-sequence-start", () => {
    servicesStoryUntil = performance.now() + 34000;
    if (bridgeActive) resetBridge();
  });
  window.addEventListener("lucian:services-sequence-complete", () => {
    servicesStoryUntil = performance.now() + 10000;
    if (bridgeActive) resetBridge();
  });
  window.addEventListener("lucian:language-changed", () => {
    requestUpdate();
  });
  window.addEventListener("pagehide", () => {
    resetBridge();
  }, { once: true });

  const blockInputDuringBridge = (event) => {
    if (!bridgeActive && !(settleGuardUntil && performance.now() < settleGuardUntil)) return;
    event.preventDefault();
    event.stopPropagation();
    if (settleGuardUntil) requestAnimationFrame(settleToServices);
  };

  const blockKeysDuringBridge = (event) => {
    if ((!bridgeActive && !(settleGuardUntil && performance.now() < settleGuardUntil)) || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (settleGuardUntil) requestAnimationFrame(settleToServices);
  };

  window.addEventListener("wheel", blockInputDuringBridge, { passive: false, capture: true });
  window.addEventListener("touchmove", blockInputDuringBridge, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeysDuringBridge, { capture: true });
})();
