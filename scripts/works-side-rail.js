(() => {
  const rail = document.querySelector("#works-side-rail");
  const toggle = document.querySelector("#works-side-rail-toggle");
  const panel = document.querySelector("#works-side-rail-panel");
  const closeButton = rail?.querySelector(".works-side-rail-close");
  const items = Array.from(document.querySelectorAll(".works-side-rail-item"));

  if (!rail || !toggle || !panel || !items.length) return;

  const setOpen = (open) => {
    rail.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close works menu" : "Open works menu");
    panel.inert = !open;
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    if (closeButton) closeButton.tabIndex = open ? 0 : -1;
    items.forEach((item) => {
      item.tabIndex = open ? 0 : -1;
    });
    if (open) window.LucianRuntime?.playUiTone?.("click");
  };

  const close = ({ restoreFocus = false } = {}) => {
    setOpen(false);
    if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => {
    setOpen(!rail.classList.contains("is-open"));
  });

  closeButton?.addEventListener("click", () => {
    close({ restoreFocus: true });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.dataset.category;
      const projectIndex = item.dataset.projectIndex;
      const title = item.querySelector(".works-side-rail-name")?.textContent.trim();
      close();

      if (category) {
        if (projectIndex !== undefined && window.LucianWorkGallery?.openProject) {
          window.LucianWorkGallery.openProject({ category, projectIndex, title });
        } else {
          window.LucianWorkGallery?.openCategory?.(category, title);
        }
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!rail.classList.contains("is-open") || rail.contains(event.target)) return;
    close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !rail.classList.contains("is-open")) return;
    event.preventDefault();
    close({ restoreFocus: true });
  });

  window.addEventListener("lucian:return-to-entry", () => {
    close();
  });

  setOpen(false);
})();
