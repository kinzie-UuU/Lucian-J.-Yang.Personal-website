/**
 * About -> Services curtain.
 *
 * This intentionally mirrors scripts/hero-curtain.js: the sticky About
 * canvas owns a pure black sheet that rises from below near the end of
 * the About scroll travel. No morph, no color treatment, no scroll hijack.
 */
(() => {
  const stage = document.querySelector(".portrait-canvas");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  if (!stage || !aboutSection) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raised = false;

  const TRIGGER = 0.86;
  const RESET = 0.74;

  const update = () => {
    const rect = aboutSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const travel = Math.max(1, rect.height - vh);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));

    if (reducedMotion) {
      stage.classList.toggle("is-about-curtain-down", progress > 0.82);
      return;
    }

    if (!raised && progress > TRIGGER) {
      raised = true;
      stage.classList.add("is-about-curtain-down");
    } else if (raised && progress < RESET) {
      raised = false;
      stage.classList.remove("is-about-curtain-down");
    }
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
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("pagehide", () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", update);
  }, { once: true });
})();
