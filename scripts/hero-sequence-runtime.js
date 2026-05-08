window.initHeroSequenceRuntime = ({
  heroState,
  heroCards,
  heroStage,
  heroFocusPanel,
  heroCardStates,
  fieldPointer,
  introTicks,
  getHeroStepController,
}) => {
  const stageMotion = {
    width: 0,
    height: 0,
    startAt: performance.now(),
  };

  const resizeStage = () => {
    if (!heroStage) return;
    const rect = heroStage.getBoundingClientRect();
    stageMotion.width = rect.width;
    stageMotion.height = rect.height;
  };

  const initCards = () => {
    heroCardStates.length = 0;
    heroCards.forEach((card, index) => {
      const state = createHeroCardState(card, index, stageMotion);
      heroCardStates.push(state);
      card.dataset.index = String(index);
    });
  };

  const forceScrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const resetHeroSequenceState = ({ resetScroll = false, resetCards = true } = {}) => {
    if (resetScroll) forceScrollTop();

    heroState.heroStep = 0;
    heroState.heroStepTarget = 0;
    heroState.heroIntroBudget = introTicks;
    getHeroStepController?.()?.resetLock?.();
    heroState.orderedMode = false;
    heroState.selectedCardIndex = -1;
    heroState.selectionStartedAt = 0;
    heroState.currentHeroCard = null;
    fieldPointer.active = false;
    window.clearTimeout(heroState.focusTimeout);

    document.documentElement.classList.remove("snap-active");
    heroFocusPanel?.classList.remove("is-visible");
    heroStage?.style.setProperty("--hero-scroll-progress", "0");
    heroStage?.style.setProperty("--hero-intro-progress", "0");
    heroStage?.style.setProperty("--hero-water-progress", "0");
    heroStage?.style.setProperty("--hero-tail-fade", "1");

    resetHeroCardClasses(heroCards);

    if (!resetCards) return;

    resizeStage();
    initCards();
    resetHeroCardPositions(heroCardStates, stageMotion);
  };

  return {
    stageMotion,
    resizeStage,
    initCards,
    forceScrollTop,
    resetHeroSequenceState,
  };
};
