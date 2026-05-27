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

  const clearFieldPointer = () => {
    fieldPointer.active = false;
  };

  const runtime = {
    reducedMotion,
    playUiTone,
    playUnlockTone(options) {
      return window.LucianAudio?.playUnlockTone?.(options) || Promise.resolve(false);
    },
    getAudioContext,
    suspendAudioContext() {
      return window.LucianAudio?.suspendAudioContext?.() || Promise.resolve(null);
    },
    startBackgroundMusic(options) {
      return window.LucianAudio?.startBackgroundMusic?.(options) || Promise.resolve(false);
    },
    resumeBackgroundMusic(options) {
      return window.LucianAudio?.resumeBackgroundMusic?.(options) || Promise.resolve(false);
    },
    pauseBackgroundMusic(options) {
      return window.LucianAudio?.pauseBackgroundMusic?.(options) || Promise.resolve(null);
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
    closeWorkGallery() {
      window.LucianWorkGallery?.close?.();
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
    clearHeroPointerState: clearFieldPointer,
    clearFieldPointer,
    forceScrollTop() {
      getHeroSequenceController?.()?.forceScrollTop?.();
    },
    resetHeroSequenceState(options) {
      getHeroSequenceController?.()?.resetHeroSequenceState?.(options);
    },
    resizeStage() {
      getHeroSequenceController?.()?.resizeStage?.();
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

  const installAudioUnlock = () => {
    window.addEventListener(
      "pointerdown",
      () => {
        if (window.LucianAudio?.isSoundEnabled?.()) {
          getAudioContext().catch(() => null);
          window.LucianAudio?.resumeBackgroundMusic?.().catch(() => null);
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
    installAudioUnlock,
  };
};
