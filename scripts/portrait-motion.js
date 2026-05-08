(() => {
  const section = document.querySelector(".portrait-about-wrapper");
  if (!section) return;
  const video = section.querySelector(".portrait-video");

  let ticking = false;
  let targetVideoTime = 0;
  let targetEnter = 0;
  let targetTextEnter = 0;
  let targetProgressValue = 0;
  let targetExit = 0;
  let currentEnter = 0;
  let currentTextEnter = 0;
  let currentProgressValue = 0;
  let currentExit = 0;
  let scrubRaf = null;
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));

  const scrubVideo = () => {
    scrubRaf = requestAnimationFrame(scrubVideo);
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const delta = targetVideoTime - video.currentTime;
    if (Math.abs(delta) < 0.006) return;
    const step = Math.sign(delta) * Math.min(Math.abs(delta) * 0.14, 0.045);
    video.currentTime += step;
  };

  const renderMotion = () => {
    currentEnter += (targetEnter - currentEnter) * 0.085;
    currentTextEnter += (targetTextEnter - currentTextEnter) * 0.075;
    currentProgressValue += (targetProgressValue - currentProgressValue) * 0.07;
    currentExit += (targetExit - currentExit) * 0.085;

    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));

    requestAnimationFrame(renderMotion);
  };

  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    // enter: starts before the sticky portrait locks, so the scene can drift in.
    const enter = clamp01((window.innerHeight - rect.top) / (window.innerHeight * 1.35));

    // progress: 0 = section just entered, 1 = section fully scrolled through
    const progress = clamp01(-rect.top / scrollable);

    // exit starts before the sticky stage releases, so the next scene can catch it.
    const exit = smootherStep(clamp01((progress - 0.78) / 0.18));

    targetEnter = smootherStep(enter);
    targetTextEnter = smootherStep(clamp01((progress - 0.08) / 0.34));
    targetProgressValue = progress;
    targetExit = exit;

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const rawVideoProgress = Math.max(0, Math.min(1, progress / 0.9));
      const videoProgress = smootherStep(rawVideoProgress);
      targetVideoTime = video.duration * videoProgress;
    }
  };

  if (video) {
    video.pause();
    video.addEventListener("loadedmetadata", () => {
      section.classList.add("is-portrait-video-ready");
      update();
    }, { once: true });
    video.addEventListener("canplay", () => {
      section.classList.add("is-portrait-video-ready");
    }, { once: true });
    scrubVideo();
  }

  renderMotion();

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
  window.addEventListener("pagehide", () => {
    if (scrubRaf) cancelAnimationFrame(scrubRaf);
  }, { once: true });
})();

