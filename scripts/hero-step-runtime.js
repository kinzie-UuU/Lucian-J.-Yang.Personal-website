window.initHeroStepRuntime = ({
  heroSection,
  getState,
  setHeroStep,
  setHeroIntroBudget,
}) => {
  let wheelLocked = false;

  const isActive = (deltaY = 0) => {
    const {
      orderedMode,
      heroStep,
      heroStepTarget,
      heroIntroBudget,
    } = getState();

    if (!document.body.classList.contains("has-entered")) return false;
    if (orderedMode) return false;

    const rect = heroSection?.getBoundingClientRect();
    if (!rect) return false;

    const isInPinnedHero = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;
    if (!isInPinnedHero) return false;

    if (deltaY > 0) {
      return heroStep < HERO_CARD_COUNT || heroStepTarget < HERO_CARD_COUNT - HERO_RELEASE_EASING_GAP;
    }

    if (deltaY < 0) {
      const isNearPinnedTop = rect.top >= -window.innerHeight * 0.12;
      return isNearPinnedTop && (heroStep > 0 || heroIntroBudget < HERO_INTRO_TICKS);
    }

    return heroStep < HERO_CARD_COUNT || heroStep > 0 || heroIntroBudget < HERO_INTRO_TICKS;
  };

  const lock = (duration) => {
    wheelLocked = true;
    window.setTimeout(() => {
      wheelLocked = false;
    }, duration);
  };

  const step = (isForward) => {
    const {
      heroStep,
      heroIntroBudget,
    } = getState();

    if (!isActive(isForward ? 1 : -1)) return false;
    if (isForward && heroStep >= HERO_CARD_COUNT) return false;
    if (!isForward && heroStep <= 0 && heroIntroBudget >= HERO_INTRO_TICKS) return false;
    if (wheelLocked) return true;

    if (isForward) {
      if (heroIntroBudget > 0) {
        setHeroIntroBudget(heroIntroBudget - 1);
        lock(320);
      } else {
        setHeroStep(Math.min(HERO_CARD_COUNT, heroStep + 1));
        lock(480);
      }
    } else {
      if (heroStep > 0) {
        setHeroStep(Math.max(0, heroStep - 1));
      } else {
        setHeroIntroBudget(Math.min(HERO_INTRO_TICKS, heroIntroBudget + 1));
      }
      lock(380);
    }

    return true;
  };

  return {
    isActive,
    step,
    resetLock() {
      wheelLocked = false;
    },
    wheelStepThreshold: HERO_WHEEL_STEP_THRESHOLD,
    wheelBackThreshold: HERO_WHEEL_BACK_THRESHOLD,
    touchStepThreshold: HERO_TOUCH_STEP_THRESHOLD,
  };
};
