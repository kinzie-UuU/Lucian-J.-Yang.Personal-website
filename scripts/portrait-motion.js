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
  let aboutRevealUnits = [];
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));

  const refreshAboutReveal = () => {
    const leftSelectors = [
      ".about-left .section-kicker",
      ".about-heading .scramble-char",
      ".about-role",
    ];
    const rightSelectors = [
      ".about-right .about-lead .scramble-char",
      ".about-right .about-detail .scramble-char",
      ".about-skills-label",
      ".about-skills-list span",
    ];

    const collect = (selectors, side) => selectors.flatMap((selector) => (
      Array.from(section.querySelectorAll(selector)).map((node) => ({ node, side }))
    ));

    const nextUnits = [
      ...collect(leftSelectors, "left"),
      ...collect(rightSelectors, "right"),
    ];

    const sideCounts = nextUnits.reduce((counts, unit) => {
      counts[unit.side] += 1;
      return counts;
    }, { left: 0, right: 0 });

    const sideIndexes = { left: 0, right: 0 };
    aboutRevealUnits = nextUnits.map((unit) => {
      const index = sideIndexes[unit.side]++;
      const count = Math.max(1, sideCounts[unit.side]);
      const isBlockRole = unit.node.classList.contains("about-role");
      unit.node.classList.add("about-scroll-reveal-unit");
      unit.node.style.setProperty("--about-reveal-index", String(index));
      return {
        ...unit,
        index,
        count,
        canTransform: !isBlockRole,
      };
    });
  };

  const renderAboutReveal = () => {
    if (!aboutRevealUnits.length) return;

    if (window.LucianRuntime?.reducedMotion) {
      aboutRevealUnits.forEach(({ node }) => {
        node.style.opacity = "1";
        node.style.filter = "none";
        node.style.transform = "";
      });
      return;
    }

    const sceneProgress = clamp01(currentTextEnter * 1.16);
    const exitFade = clamp01(currentExit * 1.12);

    aboutRevealUnits.forEach(({ node, side, index, count, canTransform }) => {
      const order = count <= 1 ? 0 : index / (count - 1);
      const sideDelay = side === "right" ? 0.08 : 0;
      const delay = sideDelay + order * (side === "right" ? 0.42 : 0.34);
      const windowSize = side === "right" ? 0.34 : 0.3;
      const enter = smootherStep(clamp01((sceneProgress - delay) / windowSize));
      const visible = Math.max(0, enter * (1 - exitFade));
      const baseOpacity = side === "right" ? 0.12 : 0.08;
      const opacity = Math.max(0, baseOpacity + visible * (1 - baseOpacity) - exitFade * 0.62);
      const blur = (1 - visible) * (side === "right" ? 8 : 10) + exitFade * 5;
      const y = (1 - visible) * (side === "right" ? 14 : 20) - exitFade * 12;
      const rotate = (1 - visible) * (side === "right" ? 3 : -5);

      node.style.opacity = opacity.toFixed(3);
      node.style.filter = `blur(${blur.toFixed(2)}px)`;
      if (canTransform) {
        node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
      }
    });
  };

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
    renderAboutReveal();

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

  window.LucianAboutScrollReveal = {
    refresh: () => {
      window.requestAnimationFrame(() => {
        refreshAboutReveal();
        renderAboutReveal();
      });
    },
  };

  refreshAboutReveal();
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

