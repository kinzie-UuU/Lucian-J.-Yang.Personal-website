(() => {
  const section = document.querySelector(".hero-section");
  const stage = document.querySelector("#hero-stage");
  const cube = document.querySelector("#hero-cube");

  if (!section || !stage || !cube) return;

  const sequenceEnd = 0.86;
  const tailStart = 0.9;
  const faceHold = 0.1;
  const verticalFaceCutoff = 88;
  const stops = [
    { rx: 0, ry: 0 },
    { rx: 0, ry: -90 },
    { rx: 0, ry: -180 },
    { rx: 0, ry: -270 },
    { rx: -90, ry: -360 },
    { rx: 90, ry: -360 },
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;
  let targetRawProgress = 0;
  let targetProgress = 0;
  let displayRawProgress = 0;
  let displayProgress = 0;
  let lastFrameTime = 0;

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const smoothStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const easeFaceTurn = (t) => {
    if (t <= faceHold) return 0;
    if (t >= 1 - faceHold) return 1;
    return smoothStep((t - faceHold) / (1 - faceHold * 2));
  };

  const getRawProgress = () => {
    const top = section.offsetTop;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp((window.scrollY - top) / travel);
  };

  const getProgress = () => clamp(getRawProgress() / sequenceEnd);

  const setCubeTransform = (progress) => {
    const scaled = progress * (stops.length - 1);
    const index = Math.min(Math.floor(scaled), stops.length - 2);
    const local = easeFaceTurn(scaled - index);
    const from = stops[index];
    const to = stops[index + 1];
    const rx = from.rx + (to.rx - from.rx) * local;
    const ry = from.ry + (to.ry - from.ry) * local;

    cube.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
    const isVerticalFace = Math.abs(rx) >= verticalFaceCutoff;
    cube.dataset.cubeAxis = isVerticalFace ? "vertical" : "side";
    stage.dataset.cubeAxis = cube.dataset.cubeAxis;
    if (isVerticalFace) {
      cube.dataset.cubeVerticalFace = rx >= 0 ? "top" : "bottom";
      stage.dataset.cubeVerticalFace = cube.dataset.cubeVerticalFace;
    } else {
      delete cube.dataset.cubeVerticalFace;
      delete stage.dataset.cubeVerticalFace;
    }
  };

  const updateStageVars = (progress, rawProgress) => {
    const tailFade = clamp((1 - rawProgress) / (1 - tailStart));
    stage.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
    stage.style.setProperty("--hero-intro-progress", "1");
    stage.style.setProperty("--hero-water-progress", "1");
    stage.style.setProperty("--hero-tail-fade", tailFade.toFixed(4));
  };

  const syncTargetProgress = () => {
    targetRawProgress = getRawProgress();
    targetProgress = getProgress();
  };

  const update = (time = performance.now()) => {
    ticking = false;
    const delta = lastFrameTime ? Math.min(48, time - lastFrameTime) : 16;
    lastFrameTime = time;

    const damping = reducedMotion ? 1 : 1 - Math.exp(-delta / 105);
    displayProgress += (targetProgress - displayProgress) * damping;
    displayRawProgress += (targetRawProgress - displayRawProgress) * damping;

    const progressGap = Math.abs(targetProgress - displayProgress);
    const rawGap = Math.abs(targetRawProgress - displayRawProgress);
    if (progressGap < 0.0008 && rawGap < 0.0008) {
      displayProgress = targetProgress;
      displayRawProgress = targetRawProgress;
    }

    setCubeTransform(displayProgress);
    updateStageVars(displayProgress, displayRawProgress);

    if (Math.abs(targetProgress - displayProgress) > 0.0008 || Math.abs(targetRawProgress - displayRawProgress) > 0.0008) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  const requestUpdate = () => {
    syncTargetProgress();
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("pageshow", requestUpdate);
  syncTargetProgress();
  displayRawProgress = targetRawProgress;
  displayProgress = targetProgress;
  requestUpdate();
})();
