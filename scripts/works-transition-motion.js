(() => {
  const transition = document.querySelector(".service-work-transition");
  const worksSection = document.querySelector(".works-section");
  const servicesSection = document.querySelector(".services-scroll-story");
  if (!transition) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * value * (value * (value * 6 - 15) + 10);
  const setProgress = (el, name, value) => {
    if (!el) return;
    el.style.setProperty(name, value.toFixed(4));
  };
  const mix = (from, to, amount) => Math.round(from + (to - from) * amount);
  const mixProgressColor = (amount) => {
    const t = smooth(clamp01((amount - 0.08) / 0.84));
    return `rgb(${mix(255, 73, t)} ${mix(98, 196, t)} ${mix(104, 176, t)})`;
  };
  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = Math.max(1, window.innerHeight);
    const transitionRect = transition.getBoundingClientRect();
    const worksRect = worksSection?.getBoundingClientRect();

    const enter = smooth(clamp01((vh * 0.98 - transitionRect.top) / (vh * 0.92)));
    const settle = smooth(clamp01((vh * 0.58 - transitionRect.top) / (vh * 0.78)));
    const exit = smooth(clamp01((vh * 0.02 - transitionRect.top) / (vh * 0.68)));
    const serviceOutro = smooth(clamp01((vh * 1.05 - transitionRect.top) / (vh * 0.78)));
    const gearFocus = smooth(clamp01((vh * 0.9 - transitionRect.top) / (vh * 0.84)));
    const handoff = smooth(clamp01((vh * 0.42 - transitionRect.top) / (vh * 0.86)));
    const listEnter = worksRect ? smooth(clamp01((vh * 1.02 - worksRect.top) / (vh * 0.86))) : 0;

    setProgress(transition, "--works-enter", enter);
    setProgress(transition, "--works-settle", settle);
    setProgress(transition, "--works-exit", exit);
    setProgress(transition, "--works-gear", gearFocus);
    setProgress(transition, "--works-handoff", handoff);
    transition.style.setProperty("--works-progress-color", mixProgressColor(settle));
    setProgress(servicesSection, "--service-to-works-outro", serviceOutro);
    setProgress(worksSection, "--works-list-enter", listEnter);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();
