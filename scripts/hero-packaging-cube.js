(() => {
  const section = document.querySelector(".hero-section");
  const stage = document.querySelector("#hero-stage");
  const cube = document.querySelector("#hero-cube");
  const percent = document.querySelector("#hero-cube-percent");
  const fill = document.querySelector("#hero-cube-progress-fill");
  const sceneName = document.querySelector("#hero-cube-scene-name");
  const captionNum = document.querySelector("#hero-cube-caption-num");
  const captionName = document.querySelector("#hero-cube-caption-name");
  const dots = Array.from(document.querySelectorAll(".hero-cube-dot"));

  if (!section || !stage || !cube) return;

  const stops = [
    { rx: 90, ry: 0 },
    { rx: 0, ry: 0 },
    { rx: 0, ry: -90 },
    { rx: 0, ry: -180 },
    { rx: 0, ry: -270 },
    { rx: -90, ry: -360 },
  ];
  const names = ["STRUCTURE", "FRONT PANEL", "SIDE VIEW", "BACK PANEL", "BRAND FACE", "BOTTOM"];
  let currentStop = -1;
  let ticking = false;

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const getProgress = () => {
    const top = section.offsetTop;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp((window.scrollY - top) / travel);
  };

  const sectionIndexFromProgress = (progress) => (
    Math.min(stops.length - 1, Math.floor(progress * stops.length))
  );

  const setCubeTransform = (progress) => {
    const scaled = progress * (stops.length - 1);
    const index = Math.min(Math.floor(scaled), stops.length - 2);
    const local = easeInOut(scaled - index);
    const from = stops[index];
    const to = stops[index + 1];
    const rx = from.rx + (to.rx - from.rx) * local;
    const ry = from.ry + (to.ry - from.ry) * local;

    cube.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
  };

  const setHud = (progress) => {
    const pct = Math.round(progress * 100);
    const index = sectionIndexFromProgress(progress);
    const label = names[index] || names[0];

    if (percent) percent.textContent = `${String(pct).padStart(3, "0")}%`;
    if (fill) fill.style.width = `${pct}%`;

    if (index === currentStop) return;
    currentStop = index;

    if (sceneName) sceneName.textContent = label;
    if (captionNum) captionNum.textContent = String(index + 1).padStart(2, "0");
    if (captionName) captionName.textContent = label;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  };

  const updateStageVars = (progress) => {
    const rect = section.getBoundingClientRect();
    const tailFade = clamp((rect.bottom - window.innerHeight) / (window.innerHeight * 0.7));
    stage.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
    stage.style.setProperty("--hero-intro-progress", "1");
    stage.style.setProperty("--hero-water-progress", "1");
    stage.style.setProperty("--hero-tail-fade", tailFade.toFixed(4));
  };

  const update = () => {
    ticking = false;
    const progress = getProgress();
    setCubeTransform(progress);
    setHud(progress);
    updateStageVars(progress);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.dataset.cubeStop || "0", 10);
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const top = section.offsetTop + travel * clamp(index / (stops.length - 1));
      window.scrollTo({
        top,
        behavior: window.LucianRuntime?.reducedMotion ? "auto" : "smooth",
      });
    });
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("pageshow", requestUpdate);
  requestUpdate();
})();
