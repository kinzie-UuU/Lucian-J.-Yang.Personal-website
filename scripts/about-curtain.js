/**
 * About -> Services visual handoff.
 *
 * This is now a passive visual marker only. It no longer locks input, scrolls
 * the page, or starts the Services story; the shared section flow owns jumps.
 */
(() => {
  const stage = document.querySelector(".portrait-canvas");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  const servicesSection = document.querySelector("#services");
  if (!stage || !aboutSection || !servicesSection) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const aboutRect = aboutSection.getBoundingClientRect();
    const servicesRect = servicesSection.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const active = (
      aboutRect.bottom < vh * 0.76
      && aboutRect.bottom > -vh * 0.18
      && servicesRect.top < vh * 0.98
      && !document.body.classList.contains("nav-transition-active")
      && !document.body.classList.contains("work-gallery-open")
    );

    stage.classList.toggle("is-about-curtain-down", active);
    document.documentElement.classList.toggle("about-services-handoff-active", active);
    document.body.classList.toggle("about-services-handoff-active", active);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", requestUpdate);
  window.addEventListener("pagehide", () => {
    stage.classList.remove("is-about-curtain-down");
    document.documentElement.classList.remove("about-services-handoff-active");
    document.body.classList.remove("about-services-handoff-active");
  }, { once: true });
})();
