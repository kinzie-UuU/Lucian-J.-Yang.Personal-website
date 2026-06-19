(() => {
  const flow = window.LucianSectionFlow;
  if (!flow) return;

  const dock = document.getElementById("bottom-nav-dock");
  const avatar = document.getElementById("bottom-nav-avatar");
  const navItems = Array.from(document.querySelectorAll(".bottom-nav-item"));

  const setDockOpen = (open) => {
    if (!dock || !avatar) return;
    dock.classList.toggle("is-open", open);
    avatar.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const jumpToHero = () => {
    setDockOpen(false);
    avatar?.blur();
    flow.jumpToHero?.({ source: "bottom-nav-avatar" });
  };

  avatar?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    jumpToHero();
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => setDockOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!dock || !dock.classList.contains("is-open")) return;
    if (event.target instanceof Node && dock.contains(event.target)) return;
    setDockOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDockOpen(false);
  });

  const refresh = () => flow.refresh?.();

  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", refresh);
  window.addEventListener("lucian:site-entered", refresh);
  window.addEventListener("pageshow", refresh);
  refresh();
})();