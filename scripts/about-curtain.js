/**
 * About -> Services curtain.
 *
 * The sticky About canvas owns a pure black sheet that rises from below near
 * the end of the About scroll travel. Once the sheet fully covers the viewport,
 * it hands the page to the Services entry frame and releases scrolling.
 */
(() => {
  const stage = document.querySelector(".portrait-canvas");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  const servicesSection = document.querySelector("#services");
  if (!stage || !aboutSection || !servicesSection) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raised = false;
  let handoffActive = false;
  let handoffComplete = false;
  let handoffTimer = 0;

  const TRIGGER = 0.86;
  const RESET = 0.74;
  const DURATION = 1650;

  const readProgress = () => {
    const rect = aboutSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const travel = Math.max(1, rect.height - vh);
    return Math.min(1, Math.max(0, -rect.top / travel));
  };

  const setLock = (locked) => {
    document.documentElement.classList.toggle("about-services-handoff-active", locked);
    document.body.classList.toggle("about-services-handoff-active", locked);
  };

  const targetServicesTop = () => Math.max(
    0,
    Math.round((window.scrollY || window.pageYOffset || 0) + servicesSection.getBoundingClientRect().top)
  );

  const isBlockedByProgrammaticTransition = () => (
    document.body.classList.contains("nav-transition-active")
    || document.body.classList.contains("scroll-curtain-active")
    || document.body.classList.contains("work-gallery-open")
  );

  const finishHandoff = () => {
    window.scrollTo(0, targetServicesTop());
    window.requestAnimationFrame(() => {
      window.LucianServicesStory?.holdEntryStart?.();
      setLock(false);
      handoffActive = false;
      handoffComplete = true;
    });
  };

  const startHandoff = () => {
    if (handoffActive || handoffComplete || isBlockedByProgrammaticTransition()) return;
    handoffActive = true;
    raised = true;
    setLock(true);
    stage.classList.add("is-about-curtain-down");
    window.clearTimeout(handoffTimer);
    handoffTimer = window.setTimeout(finishHandoff, DURATION);
  };

  const resetHandoff = () => {
    window.clearTimeout(handoffTimer);
    handoffActive = false;
    handoffComplete = false;
    raised = false;
    setLock(false);
    stage.classList.remove("is-about-curtain-down");
  };

  const update = () => {
    const progress = readProgress();

    if (reducedMotion) {
      if (progress > TRIGGER) {
        stage.classList.add("is-about-curtain-down");
        window.scrollTo(0, targetServicesTop());
        window.LucianServicesStory?.holdEntryStart?.();
      } else if (progress < RESET) {
        resetHandoff();
      }
      return;
    }

    if (isBlockedByProgrammaticTransition()) return;

    if (progress > TRIGGER) startHandoff();
    else if ((raised || handoffComplete || handoffActive) && progress < RESET) resetHandoff();
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  update();
  window.addEventListener("wheel", (event) => {
    if (!handoffActive) return;
    event.preventDefault();
    event.stopPropagation();
  }, { passive: false, capture: true });
  window.addEventListener("touchmove", (event) => {
    if (!handoffActive) return;
    event.preventDefault();
    event.stopPropagation();
  }, { passive: false, capture: true });
  window.addEventListener("keydown", (event) => {
    if (!handoffActive || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
  }, { capture: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("pagehide", () => {
    window.clearTimeout(handoffTimer);
    setLock(false);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", update);
  }, { once: true });
})();
