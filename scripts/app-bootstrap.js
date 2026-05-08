window.initLucianApp = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let heroWireframeController = null;
  let languageController = null;
  let heroStepController = null;
  let heroFocusController = null;
  let heroActionsController = null;
  let heroSequenceController = null;
  let runtimeBridge = null;
  const heroState = window.initHeroStateRuntime?.({ introTicks: HERO_INTRO_TICKS }) || {
    currentHeroCard: null,
    flowPaused: false,
    focusTimeout: null,
    orderedMode: false,
    hasEntered: false,
    selectionStartedAt: 0,
    selectedCardIndex: -1,
    heroStep: 0,
    heroStepTarget: 0,
    heroIntroBudget: HERO_INTRO_TICKS,
  };
  const heroCardStates = [];
  const fieldPointer = { x: 0.5, y: 0.5, active: false };
  const precisionCursor = document.querySelector("#precision-cursor");
  const precisionGuides = document.querySelector("#precision-guides");
  const langButtons = Array.from(document.querySelectorAll(".lang-button"));
  const heroCards = Array.from(document.querySelectorAll(".hero-card"));
  const heroSection = document.querySelector(".hero-section");
  const heroStage = document.querySelector("#hero-stage");
  const heroWireframe = document.querySelector("#hero-wireframe");
  const particleCanvas = document.querySelector("#clients-particles");
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
    getHeroFocusController() {
      return heroFocusController;
    },
    getHeroActionsController() {
      return heroActionsController;
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
    if (heroState.orderedMode && heroState.currentHeroCard) {
      heroActionsController?.applyOrderedLayout?.(heroState.currentHeroCard);
    }
  });

  languageController = window.initLanguageRuntime?.({
    initialLang: "zh",
    langButtons,
    onChange() {
      heroFocusController?.refresh?.();
    },
  }) || null;
  heroFocusController = window.initHeroFocusRuntime?.({
    getCurrentLang() {
      return languageController?.getCurrentLang?.() || "zh";
    },
  }) || null;
  heroActionsController = window.initHeroActionsRuntime?.({
    heroState,
    heroCards,
    heroCardStates,
    heroFocusPanel: heroFocusController?.panel,
    getHeroWireframeController() {
      return heroWireframeController;
    },
  }) || null;
  languageController?.switchLanguage?.("zh");
  heroSequenceController = window.initHeroSequenceRuntime?.({
    heroState,
    heroCards,
    heroStage,
    heroFocusPanel: heroFocusController?.panel,
    heroCardStates,
    fieldPointer,
    introTicks: HERO_INTRO_TICKS,
    getHeroStepController() {
      return heroStepController;
    },
  }) || null;
  heroSequenceController?.resizeStage?.();
  heroSequenceController?.initCards?.();
  heroSequenceController?.resetHeroSequenceState?.({ resetScroll: true, resetCards: true });
  heroWireframeController = window.initHeroWireframe?.(heroWireframe, { reducedMotion }) || null;
  window.initHeroWaterSurface?.(document.getElementById("hero-kinetic-canvas"), {
    reducedMotion,
    getScrollProgress() {
      return parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    },
  });
  heroStepController = window.initHeroStepRuntime?.({
    heroSection,
    getState() {
      return {
        orderedMode: heroState.orderedMode,
        heroStep: heroState.heroStep,
        heroStepTarget: heroState.heroStepTarget,
        heroIntroBudget: heroState.heroIntroBudget,
      };
    },
    setHeroStep(value) {
      heroState.heroStep = value;
    },
    setHeroIntroBudget(value) {
      heroState.heroIntroBudget = value;
    },
  }) || null;
  runtimeBridge?.installHeroSteps?.(heroStepController);
  // window.initParticleCanvas?.(particleCanvas, "light");
  window.initHeroCardAnimation?.({
    stageMotion: heroSequenceController?.stageMotion,
    fieldPointer,
    heroSection,
    heroStage,
    heroFocusPanel: heroFocusController?.panel,
    heroCardStates,
    getState() {
      return {
        heroStep: heroState.heroStep,
        heroStepTarget: heroState.heroStepTarget,
        heroIntroBudget: heroState.heroIntroBudget,
        orderedMode: heroState.orderedMode,
        selectedCardIndex: heroState.selectedCardIndex,
        selectionStartedAt: heroState.selectionStartedAt,
        currentHeroCard: heroState.currentHeroCard,
      };
    },
    setHeroStepTarget(value) {
      heroState.heroStepTarget = value;
    },
  });

  return {
    heroState,
    fieldPointer,
    runtimeBridge,
    get languageController() {
      return languageController;
    },
    get heroStepController() {
      return heroStepController;
    },
    get heroFocusController() {
      return heroFocusController;
    },
    get heroActionsController() {
      return heroActionsController;
    },
    get heroSequenceController() {
      return heroSequenceController;
    },
    particleCanvas,
  };
};
