(() => {
  const transition = document.querySelector(".service-work-transition");
  const worksSection = document.querySelector(".works-section");
  if (!transition || !worksSection) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  const range = (value, start, end) => smooth(clamp01((value - start) / (end - start)));
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
    const transitionSpan = Math.max(vh, transitionRect.height + vh);
    const progress = clamp01((vh - transitionRect.top) / transitionSpan);

    const enter = range(progress, 0.04, 0.3);
    const copy = range(progress, 0.3, 0.47);
    const line2 = range(progress, 0.36, 0.54);
    const note = range(progress, 0.42, 0.62);
    const exit = range(progress, 0.62, 0.78);
    const axisReveal = range(progress, 0.42, 0.54) * (1 - range(progress, 0.86, 1));
    const axisDrop = range(progress, 0.46, 0.82);
    const headerEnter = range(progress, 0.8, 0.95)
      || smooth(clamp01((vh * 0.86 - worksRect.top) / (vh * 0.52)));
    const listEnter = smooth(clamp01((vh * 0.56 - worksRect.top) / (vh * 0.58)));

    setProgress(transition, "--works-enter", enter);
    setProgress(transition, "--works-copy-reveal", copy);
    setProgress(transition, "--works-line-1", copy);
    setProgress(transition, "--works-line-2", line2);
    setProgress(transition, "--works-note-reveal", note);
    setProgress(transition, "--works-axis-reveal", axisReveal);
    setProgress(transition, "--works-axis-drop", axisDrop);
    setProgress(transition, "--works-exit", exit);
    setProgress(transition, "--works-handoff", exit);
    setProgress(worksSection, "--works-header-enter", headerEnter);
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
