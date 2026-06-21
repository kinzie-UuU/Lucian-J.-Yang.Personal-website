(() => {
  const flow = window.LucianSectionFlow;
  if (!flow) return;

  const dock = document.getElementById("bottom-nav-dock");
  const avatar = document.getElementById("bottom-nav-avatar");
  const directory = document.getElementById("bottom-nav-directory");
  const navItems = Array.from(document.querySelectorAll(".bottom-nav-item"));

  const setDockOpen = (open) => {
    if (!dock) return;
    dock.classList.toggle("is-open", open);
    directory?.setAttribute("aria-expanded", open ? "true" : "false");
    directory?.setAttribute("aria-label", open ? "Close directory" : "Open directory");
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

  directory?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDockOpen(!dock?.classList.contains("is-open"));
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