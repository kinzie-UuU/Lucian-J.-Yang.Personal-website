(() => {
  const flow = window.LucianSectionFlow;
  if (!flow) return;

  const refresh = () => flow.refresh?.();

  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", refresh);
  window.addEventListener("lucian:site-entered", refresh);
  window.addEventListener("pageshow", refresh);
  refresh();
})();
