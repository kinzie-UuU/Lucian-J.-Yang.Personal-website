(() => {
  const transition = document.querySelector(".service-work-transition");
  const worksSection = document.querySelector(".works-section");
  const servicesSection = document.querySelector(".services-scroll-story");
  if (!transition || !worksSection) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  const setProgress = (el, name, value) => {
    if (!el) return;
    el.style.setProperty(name, value.toFixed(4));
  };

  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = Math.max(1, window.innerHeight);
    const transitionRect = transition.getBoundingClientRect();
    const worksRect = worksSection.getBoundingClientRect();

    const enter = smooth(clamp01((vh * 0.92 - transitionRect.top) / (vh * 0.88)));
    const copy = smooth(clamp01((vh * 0.76 - transitionRect.top) / (vh * 0.92)));
    const line2 = smooth(clamp01((copy - 0.18) / 0.82));
    const note = smooth(clamp01((copy - 0.34) / 0.66));
    const exit = smooth(clamp01((vh * 0.16 - transitionRect.top) / (vh * 0.72)));
    const servicesOutro = smooth(clamp01((vh * 0.98 - transitionRect.top) / (vh * 0.92)));
    const listEnter = smooth(clamp01((vh * 0.94 - worksRect.top) / (vh * 0.62)));

    setProgress(transition, "--works-enter", enter);
    setProgress(transition, "--works-copy-reveal", copy);
    setProgress(transition, "--works-line-1", copy);
    setProgress(transition, "--works-line-2", line2);
    setProgress(transition, "--works-note-reveal", note);
    setProgress(transition, "--works-exit", exit);
    setProgress(transition, "--works-handoff", exit);
    setProgress(servicesSection, "--services-outro", servicesOutro);
    setProgress(worksSection, "--works-list-enter", listEnter);
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
  window.addEventListener("lucian:site-entered", requestUpdate);
})();
