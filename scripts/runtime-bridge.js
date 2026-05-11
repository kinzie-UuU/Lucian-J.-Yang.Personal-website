window.initLucianRuntimeBridge = ({
  reducedMotion,
  entryScreen,
  heroStage,
  precisionCursor,
  precisionGuides,
  fieldPointer,
  getAudioContext,
  playUiTone,
  playWaterDrop,
  getLanguageController,
  getHeroFocusController,
  getHeroActionsController,
  getHeroSequenceController,
  getHeroState,
}) => {
  const setCursorVisible = (visible) => {
    if (!precisionCursor) return;
    const allowed = visible && entryScreen;
    const showGuides = allowed && !document.body.classList.contains("has-entered");
    precisionCursor.classList.toggle("is-visible", allowed);
    precisionGuides?.classList.toggle("is-visible", showGuides);
    document.body.classList.toggle("cursor-active", showGuides);
    if (document.body.classList.contains("has-entered")) {
      document.body.classList.remove("cursor-active");
    }
  };

  const updatePrecisionCursor = (clientX, clientY) => {
    if (!precisionCursor) return;
    precisionCursor.style.left = `${clientX}px`;
    precisionCursor.style.top = `${clientY}px`;
    document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
  };

  const runtime = {
    reducedMotion,
    playUiTone,
    getAudioContext,
    suspendAudioContext() {
      return window.LucianAudio?.suspendAudioContext?.() || Promise.resolve(null);
    },
    setSoundEnabled(value) {
      window.LucianAudio?.setSoundEnabled?.(value);
    },
    isSoundEnabled() {
      return window.LucianAudio?.isSoundEnabled?.() || false;
    },
    getCurrentLang() {
      return getLanguageController?.()?.getCurrentLang?.() || "zh";
    },
    switchLanguage(lang) {
      getLanguageController?.()?.switchLanguage?.(lang);
    },
    selectWorkTab(workKey) {
      getHeroFocusController?.()?.select?.(workKey);
      playUiTone("click");
    },
    activateHeroCard(card, options = {}) {
      getHeroActionsController?.()?.activateHeroCard?.(card, options);
    },
    enterHeroProject(card, event) {
      getHeroActionsController?.()?.enterHeroProject?.(card, event);
    },
    closeWorkGallery() {
      window.LucianWorkGallery?.close?.();
    },
    releaseOrderedLayout() {
      getHeroActionsController?.()?.releaseOrderedLayout?.();
    },
    resetCurrentHeroCard() {
      getHeroActionsController?.()?.resetCurrentHeroCard?.();
    },
    setCursorVisible,
    updatePrecisionCursor,
    get entryScreen() {
      return entryScreen;
    },
    get heroStage() {
      return heroStage;
    },
    setFieldPointer(value = {}) {
      if (typeof value.x === "number") fieldPointer.x = value.x;
      if (typeof value.y === "number") fieldPointer.y = value.y;
      if (typeof value.active === "boolean") fieldPointer.active = value.active;
    },
    clearHeroPointerState() {
      getHeroActionsController?.()?.clearHeroPointerState?.(fieldPointer);
    },
    clearFieldPointer() {
      fieldPointer.active = false;
    },
    forceScrollTop() {
      getHeroSequenceController?.()?.forceScrollTop?.();
    },
    resetHeroSequenceState(options) {
      getHeroSequenceController?.()?.resetHeroSequenceState?.(options);
    },
    resizeStage() {
      getHeroSequenceController?.()?.resizeStage?.();
    },
    initCards() {
      getHeroSequenceController?.()?.initCards?.();
    },
    setEntered(value) {
      const heroState = getHeroState?.();
      if (heroState) heroState.hasEntered = value;
    },
    isEntered() {
      return getHeroState?.()?.hasEntered || false;
    },
  };

  window.LucianRuntime = runtime;

  const installHeroRipples = () => {
    runtime.heroRipples = {
      get stage() {
        return heroStage;
      },
      reducedMotion,
      playWaterDrop,
    };
  };

  const installHeroSteps = (heroStepController) => {
    runtime.heroSteps = {
      get stage() {
        return heroStage;
      },
      isActive: (...args) => heroStepController?.isActive?.(...args) || false,
      step: (...args) => heroStepController?.step?.(...args) || false,
      wheelStepThreshold: HERO_WHEEL_STEP_THRESHOLD,
      wheelBackThreshold: HERO_WHEEL_BACK_THRESHOLD,
      touchStepThreshold: HERO_TOUCH_STEP_THRESHOLD,
    };
  };

  const installAudioUnlock = () => {
    window.addEventListener(
      "pointerdown",
      () => {
        if (window.LucianAudio?.isSoundEnabled?.()) {
          getAudioContext().catch(() => null);
        }
      },
      { once: true, passive: true }
    );
  };

  return {
    runtime,
    setCursorVisible,
    updatePrecisionCursor,
    installHeroRipples,
    installHeroSteps,
    installAudioUnlock,
  };
};
