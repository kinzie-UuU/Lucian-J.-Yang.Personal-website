window.initHeroSequenceRuntime = ({
  heroState,
  heroStage,
  fieldPointer,
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

  const forceScrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const resetHeroSequenceState = ({ resetScroll = false } = {}) => {
    if (resetScroll) forceScrollTop();

    heroState.hasEntered = Boolean(heroState.hasEntered);
    fieldPointer.active = false;

    document.documentElement.classList.remove("snap-active");
    heroStage?.style.setProperty("--hero-scroll-progress", "0");
    heroStage?.style.setProperty("--hero-intro-progress", "0");
    heroStage?.style.setProperty("--hero-water-progress", "0");
    heroStage?.style.setProperty("--hero-tail-fade", "1");

    resizeStage();
  };

  return {
    stageMotion,
    resizeStage,
    forceScrollTop,
    resetHeroSequenceState,
  };
};
