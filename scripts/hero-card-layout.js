var setCardPosition = (card, config) => {
  const w = config.w;
  const h = config.h;
  const z = config.z || 0;
  const r = config.r || 0;
  const ry = config.ry || 0;
  const rx = config.rx || 0;
  const x = config.x;
  const y = config.y;
  const scale = config.scale ?? 1;
  const opacity = config.opacity ?? 1;
  card.style.width = `${w}px`;
  card.style.height = `${h}px`;
  card.style.opacity = String(opacity);
  card.style.zIndex = `${Math.round(160 + z)}`;
  card.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, ${z}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${r}deg) scale(${scale})`;
};

var createHeroCardState = (card, index, stageMotion) => {
  const preset = cardPresets[index % cardPresets.length];
  const layout = heroClusterLayout[index % heroClusterLayout.length];
  const width = Math.round(Math.min(320, Math.max(220, preset.w * 1.18)));
  const height = Math.round(width * (4 / 3));
  const centerX = stageMotion.width * 0.5;
  const centerY = stageMotion.height * 0.5;

  return {
    card,
    index,
    width,
    height,
    x: centerX,
    y: centerY,
    targetX: centerX,
    targetY: centerY,
    rotation: layout.rot,
    scale: layout.scale,
    opacity: 0,
    depth: layout.depth,
    layout,
    phase: layout.phase,
    captureX: centerX,
    captureY: centerY,
  };
};

var resetHeroCardClasses = (heroCards) => {
  heroCards.forEach((card) => {
    card.classList.remove("is-active", "is-dimmed", "is-ordered", "is-scroll-current");
  });
};

var resetHeroCardPositions = (heroCardStates, stageMotion) => {
  heroCardStates.forEach((state) => {
    state.x = stageMotion.width * 0.5;
    state.y = stageMotion.height * 0.5;
    state.targetX = state.x;
    state.targetY = state.y;
    state.opacity = 0;
    setCardPosition(state.card, {
      x: state.x,
      y: state.y,
      w: state.width,
      h: state.height,
      z: state.depth,
      r: state.rotation,
      scale: state.scale,
      opacity: 0,
    });
  });
};

var getHeroMotionFrame = ({ timestamp, stageMotion, fieldPointer, heroSection }) => {
  const elapsed = (timestamp - stageMotion.startAt) * 0.001;
  const width = stageMotion.width;
  const height = stageMotion.height;
  const minSide = Math.min(width, height);
  const centerX = width * 0.5;
  const centerY = height * 0.50;
  const pointerX = fieldPointer.x * width;
  const pointerY = fieldPointer.y * height;
  const swayX = Math.sin(elapsed * 0.22) * width * 0.014;
  const swayY = Math.cos(elapsed * 0.18) * height * 0.012;
  const heroRect = heroSection?.getBoundingClientRect();

  return {
    elapsed,
    width,
    height,
    minSide,
    centerX,
    centerY,
    pointerX,
    pointerY,
    swayX,
    swayY,
    heroRect,
  };
};

var getHeroProgressState = ({ heroStepTarget, heroStep, heroIntroBudget, heroRect, stageHeight }) => {
  const scrollProgress = HERO_CARD_COUNT > 1
    ? Math.max(0, Math.min(1, (heroStepTarget - 1) / (HERO_CARD_COUNT - 1)))
    : 0;
  const introProgress = Math.min(1, heroStepTarget);
  const waterProgress = heroStep > 0
    ? 1
    : (HERO_INTRO_TICKS - heroIntroBudget) / HERO_INTRO_TICKS;
  const tailFade = heroRect
    ? Math.min(1, Math.max(0, (heroRect.bottom - stageHeight) / (stageHeight * 0.7)))
    : 1;

  return {
    scrollProgress,
    introProgress,
    waterProgress,
    tailFade,
  };
};

var applyHeroProgressVars = (heroStage, progress) => {
  if (!heroStage) return;
  heroStage.style.setProperty("--hero-scroll-progress", progress.scrollProgress.toFixed(4));
  heroStage.style.setProperty("--hero-intro-progress", progress.introProgress.toFixed(4));
  heroStage.style.setProperty("--hero-water-progress", progress.waterProgress.toFixed(4));
  heroStage.style.setProperty("--hero-tail-fade", progress.tailFade.toFixed(4));
};
