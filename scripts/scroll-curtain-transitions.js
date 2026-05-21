(() => {
  const roots = Array.from(document.querySelectorAll(".scroll-curtain-transition"));
  const gsap = window.gsap;
  const MorphSVGPlugin = window.MorphSVGPlugin;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (!roots.length || reducedMotion) return;

  const parseNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const svgNamespace = "http://www.w3.org/2000/svg";
  const easeOutExpo = (value) => (value >= 1 ? 1 : 1 - Math.pow(2, -10 * value));

  const makeSheetPath = (edgeY, centerY) => {
    const edge = edgeY.toFixed(2);
    const center = centerY.toFixed(2);
    return `M0 1024V${edge}C240 ${center} 480 ${center} 720 ${center}C960 ${center} 1200 ${center} 1440 ${edge}V1024H0Z`;
  };

  const createVisualSheet = (root, surface) => {
    const color = surface.style.getPropertyValue("--curtain-color").trim() || "#000";
    root.style.setProperty("--curtain-color", color);

    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "scroll-curtain-transition__visual");
    svg.setAttribute("viewBox", "0 0 1440 1024");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("class", "scroll-curtain-transition__visual-path");
    path.setAttribute("d", makeSheetPath(1024, 1024));
    svg.append(path);
    root.append(svg);
    root.classList.add("is-svg-driven");

    return { svg, path };
  };

  const configs = roots.map((root) => {
    const targetSelector = root.dataset.target || "";
    const settleTargetSelector = root.dataset.settleTarget || "";
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    const settleTarget = settleTargetSelector ? document.querySelector(settleTargetSelector) : null;
    const maskPath = root.querySelector(".scroll-curtain-transition__mask-path");
    const startShape = root.querySelector(".scroll-curtain-transition__shape-start");
    const endShape = root.querySelector(".scroll-curtain-transition__shape-end");
    const surface = root.querySelector(".scroll-curtain-transition__surface");
    const clipDriven = Boolean(root.dataset.curveEdge && root.dataset.curveCenter);
    const visual = clipDriven && surface ? createVisualSheet(root, surface) : null;

    return {
      root,
      surface,
      visualSvg: visual?.svg || null,
      visualPath: visual?.path || null,
      target,
      maskPath,
      startShape,
      endShape,
      clipDriven,
      curveState: { amount: 0 },
      curveEdge: parseNumber(root.dataset.curveEdge, 150),
      curveCenter: parseNumber(root.dataset.curveCenter, 54),
      closedPath: maskPath?.getAttribute("d") || "",
      durationIn: parseNumber(root.dataset.durationIn, 0.7),
      durationOut: parseNumber(root.dataset.durationOut, 0.92),
      overlap: parseNumber(root.dataset.overlap, 0.56),
      trigger: parseNumber(root.dataset.trigger, 0.72),
      reset: parseNumber(root.dataset.reset, 1.05),
      backLimit: parseNumber(root.dataset.backLimit, -0.52),
      settleTarget,
      settleOffset: parseNumber(root.dataset.settleOffset, 0),
      settleDuration: parseNumber(root.dataset.settleDuration, 920),
      played: false,
      timeline: null,
    };
  }).filter((config) => (
    config.target
    && config.surface
    && config.maskPath
    && config.startShape
    && config.endShape
    && config.closedPath
  ));

  if (!configs.length) return;

  let supported = false;
  let ticking = false;
  let locked = false;
  let lockedY = 0;
  let settling = false;
  let settleFrame = 0;
  let targetLockY = null;

  const lockScroll = () => {
    if (locked) return;
    locked = true;
    lockedY = window.scrollY || window.pageYOffset || 0;
    targetLockY = null;
    document.documentElement.classList.add("scroll-curtain-locking");
    document.body.classList.add("scroll-curtain-locking");
  };

  const unlockScroll = ({ restore = true } = {}) => {
    if (!locked) return;
    locked = false;
    targetLockY = null;
    document.documentElement.classList.remove("scroll-curtain-locking");
    document.body.classList.remove("scroll-curtain-locking");
    if (restore) window.scrollTo(0, lockedY);
  };

  const getScrollTopFor = (target, offset = 0) => {
    const rect = target.getBoundingClientRect();
    return Math.max(0, Math.round((window.scrollY || window.pageYOffset || 0) + rect.top + offset));
  };

  const settleScroll = (config, onComplete) => {
    if (!config.settleTarget) {
      onComplete();
      return;
    }

    window.cancelAnimationFrame(settleFrame);
    settling = true;

    const startY = window.scrollY || window.pageYOffset || 0;
    const targetY = getScrollTopFor(config.settleTarget, config.settleOffset);
    targetLockY = targetY;
    const distance = targetY - startY;
    const duration = Math.max(120, config.settleDuration);
    const startedAt = performance.now();

    const renderSettle = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = easeOutExpo(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        settleFrame = window.requestAnimationFrame(renderSettle);
        return;
      }

      settling = false;
      window.scrollTo(0, targetY);
      onComplete();
    };

    settleFrame = window.requestAnimationFrame(renderSettle);
  };

  const reset = (config) => {
    config.timeline?.kill();
    config.timeline = null;
    config.maskPath.setAttribute("d", config.closedPath);
    config.curveState.amount = 0;
    if (config.visualPath) config.visualPath.setAttribute("d", makeSheetPath(1024, 1024));
    if (config.visualSvg && gsap) gsap.set(config.visualSvg, { clearProps: "transform" });
    config.root.classList.remove("is-active");
  };

  const renderCurve = (config) => {
    if (!config.visualPath) return;

    const amount = Math.max(0, Math.min(1, config.curveState.amount));
    const edge = 1024 + (config.curveEdge - 1024) * amount;
    const center = 1024 + (config.curveCenter - 1024) * amount;
    config.visualPath.setAttribute("d", makeSheetPath(edge, center));
  };

  const resetAll = () => {
    configs.forEach((config) => {
      config.played = false;
      reset(config);
    });
    document.body.classList.remove("scroll-curtain-active");
    window.cancelAnimationFrame(settleFrame);
    settling = false;
    unlockScroll();
  };

  const play = (config) => {
    if (!supported || config.timeline || locked) return;

    reset(config);
    lockScroll();
    config.root.classList.add("is-active");
    document.body.classList.add("scroll-curtain-active");

    const settleAt = config.settleTarget
      ? Math.max(0.24, config.overlap + 0.1)
      : null;

    config.timeline = gsap.timeline({
      defaults: { overwrite: true },
      onComplete: () => {
        config.timeline = null;
        config.root.classList.remove("is-active");

        if (!configs.some((item) => item.root.classList.contains("is-active"))) {
          document.body.classList.remove("scroll-curtain-active");
        }
        if (!config.settleTarget) {
          unlockScroll({ restore: false });
        }
      },
    });

    if (config.clipDriven) {
      config.timeline
        .set(config.visualSvg, { yPercent: 0 }, 0)
        .to(config.curveState, {
          amount: 1,
          duration: config.durationIn,
          ease: "power2.inOut",
          onUpdate: () => renderCurve(config),
        }, 0)
        .to(config.visualSvg, {
          duration: config.durationOut,
          yPercent: -108,
          ease: "power2.inOut",
        }, config.overlap + 0.26);
    } else {
      config.timeline
        .set(config.surface, {
          yPercent: 108,
          borderTopLeftRadius: "48%",
          borderTopRightRadius: "48%",
        }, 0)
        .to(config.maskPath, {
          duration: config.durationIn,
          morphSVG: config.startShape,
          ease: "power2.inOut",
        }, 0)
        .to(config.surface, {
          duration: config.durationIn + 0.18,
          yPercent: 0,
          borderTopLeftRadius: "20%",
          borderTopRightRadius: "20%",
          ease: "power2.inOut",
        }, 0)
        .to(config.maskPath, {
          duration: config.durationOut,
          morphSVG: config.endShape,
          ease: "power2.inOut",
        }, config.overlap)
        .to(config.surface, {
          duration: config.durationOut,
          yPercent: -108,
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          ease: "power2.inOut",
        }, config.overlap + 0.26);
    }

    if (config.settleTarget) {
      config.timeline.call(() => {
        settleScroll(config, () => unlockScroll({ restore: false }));
      }, null, settleAt);
    }
  };

  const update = () => {
    ticking = false;
    if (!document.body.classList.contains("has-entered") || settling) return;

    const vh = window.innerHeight || document.documentElement.clientHeight || 1;

    configs.forEach((config) => {
      const rect = config.target.getBoundingClientRect();

      if (!config.played && rect.top < vh * config.trigger && rect.top > vh * config.backLimit) {
        config.played = true;
        play(config);
        return;
      }

      if (rect.top > vh * config.reset) {
        config.played = false;
        reset(config);
      }
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const keepScrollLocked = (event) => {
    if (!locked) return;
    event.preventDefault();
    if (!settling) window.scrollTo(0, targetLockY ?? lockedY);
  };

  try {
    supported = Boolean(gsap);
    if (!supported) {
      roots.forEach((root) => root.classList.remove("is-active"));
      return;
    }

    if (MorphSVGPlugin) gsap.registerPlugin(MorphSVGPlugin);
    resetAll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("wheel", keepScrollLocked, { passive: false, capture: true });
    window.addEventListener("touchmove", keepScrollLocked, { passive: false, capture: true });
    window.addEventListener("lucian:return-to-entry", resetAll);
    requestUpdate();
  } catch (error) {
    supported = false;
    resetAll();
    console.warn("[scroll-curtain-transitions] Disabled:", error.message);
  }
})();
