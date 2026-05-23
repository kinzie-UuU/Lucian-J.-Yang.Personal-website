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
  const slowFastSoft = (() => {
    const x1 = 0.62;
    const y1 = 0;
    const x2 = 0.24;
    const y2 = 1;
    const sample = (a, b, value) => (
      3 * a * (1 - value) * (1 - value) * value
      + 3 * b * (1 - value) * value * value
      + value * value * value
    );

    return (progress) => {
      let lower = 0;
      let upper = 1;
      let t = progress;

      for (let index = 0; index < 8; index += 1) {
        t = (lower + upper) / 2;
        if (sample(x1, x2, t) < progress) lower = t;
        else upper = t;
      }

      return sample(y1, y2, t);
    };
  })();

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
    const sourceSelector = root.dataset.source || "";
    const settleTargetSelector = root.dataset.settleTarget || "";
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    const source = sourceSelector ? document.querySelector(sourceSelector) : null;
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
      kind: root.dataset.kind || "curtain",
      source,
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
      previews: [],
      lastTop: null,
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
    document.documentElement.classList.remove("scroll-curtain-locking");
    document.body.classList.remove("scroll-curtain-locking");
    if (!locked) return;
    locked = false;
    targetLockY = null;
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

  const reset = (config, { keepTop = false } = {}) => {
    config.timeline?.kill();
    config.timeline = null;
    config.maskPath.setAttribute("d", config.closedPath);
    config.curveState.amount = 0;
    if (config.visualPath) config.visualPath.setAttribute("d", makeSheetPath(1024, 1024));
    if (config.visualSvg && gsap) gsap.set(config.visualSvg, { clearProps: "transform" });
    config.previews.forEach((preview) => preview.remove());
    config.previews = [];
    config.root.classList.remove("is-active");
    if (!keepTop) config.lastTop = null;
  };

  const renderCurve = (config) => {
    if (!config.visualPath) return;

    const amount = Math.max(0, Math.min(1, config.curveState.amount));
    const edge = 1024 + (config.curveEdge - 1024) * amount;
    const center = 1024 + (config.curveCenter - 1024) * amount;
    config.visualPath.setAttribute("d", makeSheetPath(edge, center));
  };

  const preparePageClone = (element, { alignToViewport = false } = {}) => {
    const preview = document.createElement("div");
    preview.className = "scroll-curtain-transition__page-preview";
    preview.setAttribute("aria-hidden", "true");
    if ("inert" in preview) preview.inert = true;

    const clone = element.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add("is-visible");
    clone.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    clone.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-revealed"));
    clone.querySelectorAll("video").forEach((video) => {
      video.pause?.();
      video.removeAttribute("autoplay");
    });
    clone.style.pointerEvents = "none";

    if (alignToViewport) {
      const rect = element.getBoundingClientRect();
      clone.style.transform = `translate3d(0, ${rect.top.toFixed(2)}px, 0)`;
    }

    preview.append(clone);
    return preview;
  };

  const playPageReveal = (config) => {
    const source = config.source || document.querySelector(".works-section");
    if (!source || !config.target) return false;

    const currentPreview = preparePageClone(source, { alignToViewport: true });
    const nextPreview = preparePageClone(config.target);
    nextPreview.classList.add("scroll-curtain-transition__page-preview--next");
    if (config.target.id === "contact") {
      nextPreview.classList.add("scroll-curtain-transition__page-preview--contact");
    }

    config.root.append(currentPreview, nextPreview);
    config.previews = [currentPreview, nextPreview];

    const contactRevealDelay = Math.max(0.56, config.durationOut * 0.86);
    const contactRevealHold = { progress: 0 };

    config.timeline
      .set(currentPreview, {
        y: 0,
        scale: 1,
        opacity: 1,
        force3D: true,
      }, 0)
      .set(nextPreview, {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 1,
        force3D: true,
      }, 0)
      .to(currentPreview, {
        y: "-30vh",
        scale: 0.8,
        opacity: 0.4,
        duration: config.durationIn,
        ease: slowFastSoft,
        force3D: true,
      }, 0)
      .to(nextPreview, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: config.durationOut,
        ease: slowFastSoft,
        force3D: true,
      }, 0)
      .call(() => {
        nextPreview.classList.add("is-copy-visible");
      }, null, contactRevealDelay)
      .to(contactRevealHold, {
        progress: 1,
        duration: 1.06,
        ease: "none",
      }, contactRevealDelay);

    return true;
  };

  const resetAll = ({ restore = true } = {}) => {
    configs.forEach((config) => {
      config.played = false;
      reset(config);
    });
    document.body.classList.remove("scroll-curtain-active");
    window.cancelAnimationFrame(settleFrame);
    settling = false;
    unlockScroll({ restore });
  };

  const play = (config) => {
    if (!supported || config.timeline || locked) return false;

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
        config.previews.forEach((preview) => preview.remove());
        config.previews = [];
        config.root.classList.remove("is-active");

        if (!configs.some((item) => item.root.classList.contains("is-active"))) {
          document.body.classList.remove("scroll-curtain-active");
        }
        if (!config.settleTarget) {
          unlockScroll({ restore: false });
        }
        requestUpdate();
      },
    });

    if (config.kind === "page-reveal" && playPageReveal(config)) {
      // Codrops-style page handoff: old view recedes while the next view
      // reveals upward through clip-path.
    } else if (config.clipDriven) {
      config.timeline
        .set(config.visualSvg, { yPercent: 0 }, 0)
        .to(config.curveState, {
          amount: 1,
          duration: config.durationIn,
          ease: slowFastSoft,
          onUpdate: () => renderCurve(config),
        }, 0)
        .to(config.visualSvg, {
          duration: config.durationOut,
          yPercent: -108,
          ease: slowFastSoft,
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
          ease: slowFastSoft,
        }, 0)
        .to(config.surface, {
          duration: config.durationIn + 0.18,
          yPercent: 0,
          borderTopLeftRadius: "20%",
          borderTopRightRadius: "20%",
          ease: slowFastSoft,
        }, 0)
        .to(config.maskPath, {
          duration: config.durationOut,
          morphSVG: config.endShape,
          ease: slowFastSoft,
        }, config.overlap)
        .to(config.surface, {
          duration: config.durationOut,
          yPercent: -108,
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          ease: slowFastSoft,
        }, config.overlap + 0.26);
    }

    if (config.settleTarget) {
      config.timeline.call(() => {
        settleScroll(config, () => {
          unlockScroll({ restore: false });
          requestUpdate();
        });
      }, null, settleAt);
    }

    return true;
  };

  const update = () => {
    ticking = false;
    if (!document.body.classList.contains("has-entered") || settling) return;

    const vh = window.innerHeight || document.documentElement.clientHeight || 1;

    configs.forEach((config) => {
      const rect = config.target.getBoundingClientRect();
      const previousTop = config.lastTop;
      const triggerY = vh * config.trigger;
      const backY = vh * config.backLimit;
      const enteredWindow = rect.top < triggerY && rect.top > backY;
      const crossedWindow = previousTop !== null
        && previousTop >= triggerY
        && rect.top <= triggerY
        && rect.top > -vh * 1.35;
      config.lastTop = rect.top;

      if (!config.played && (enteredWindow || crossedWindow)) {
        if (play(config)) config.played = true;
        return;
      }

      if (rect.top > vh * config.reset) {
        config.played = false;
        reset(config, { keepTop: true });
      }
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const handleProgrammaticSectionJump = (event) => {
    const targetId = event.detail?.targetId;
    if (!targetId) return;
    resetAll({ restore: false });

    configs.forEach((config) => {
      if (config.target?.id !== targetId) return;
      config.played = true;
      reset(config);
    });
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
    window.addEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);
    requestUpdate();
  } catch (error) {
    supported = false;
    resetAll();
    console.warn("[scroll-curtain-transitions] Disabled:", error.message);
  }
})();
