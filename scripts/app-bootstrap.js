window.initLucianApp = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let languageController = null;
  let heroSequenceController = null;
  let runtimeBridge = null;
  const heroState = window.initHeroStateRuntime?.() || {
    hasEntered: false,
  };
  const fieldPointer = { x: 0.5, y: 0.5, active: false };
  const precisionCursor = document.querySelector("#precision-cursor");
  const precisionGuides = document.querySelector("#precision-guides");
  const langButtons = Array.from(document.querySelectorAll(".lang-button"));
  const heroStage = document.querySelector("#hero-stage");
  const entryScreen = document.querySelector("#entry-screen");

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const getAudioContext = () => window.LucianAudio?.getAudioContext?.() || Promise.resolve(null);
  const playUiTone = (type = "hover") => window.LucianAudio?.playUiTone?.(type);
  const playWaterDrop = () => window.LucianAudio?.playWaterDrop?.();

  runtimeBridge = window.initLucianRuntimeBridge?.({
    reducedMotion,
    entryScreen,
    heroStage,
    precisionCursor,
    precisionGuides,
    fieldPointer,
    getAudioContext,
    playUiTone,
    playWaterDrop,
    getLanguageController() {
      return languageController;
    },
    getHeroSequenceController() {
      return heroSequenceController;
    },
    getHeroState() {
      return heroState;
    },
  }) || null;

  runtimeBridge?.installHeroRipples?.();
  runtimeBridge?.installAudioUnlock?.();

  window.addEventListener("resize", () => {
    heroSequenceController?.resizeStage?.();
  });

  languageController = window.initLanguageRuntime?.({
    initialLang: "zh",
    langButtons,
  }) || null;
  languageController?.switchLanguage?.("zh");

  heroSequenceController = window.initHeroSequenceRuntime?.({
    heroState,
    heroStage,
    fieldPointer,
  }) || null;
  heroSequenceController?.resizeStage?.();
  heroSequenceController?.resetHeroSequenceState?.({ resetScroll: true });

  return {
    heroState,
    fieldPointer,
    runtimeBridge,
    get languageController() {
      return languageController;
    },
    get heroSequenceController() {
      return heroSequenceController;
    },
  };
};
