(() => {
  const runtime = window.LucianRuntime;
  const navItems = document.querySelectorAll(".bottom-nav-item");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  const updateActiveNav = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let active = null;

    for (const section of sections) {
      if (section.offsetTop <= scrollY) active = section.id;
    }

    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      item.classList.toggle("is-active", href === `#${active}`);
    });
  };

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const targetId = item.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      runtime?.closeWorkGallery?.();

      window.requestAnimationFrame(() => {
        const aboutTextProgress = 0.32;
        const scrollable = Math.max(0, target.scrollHeight - window.innerHeight);
        const servicesPaddingTop = target.id === "services"
          ? parseFloat(window.getComputedStyle(target).paddingTop || "0") || 0
          : 0;
        const top = target.id === "about"
          ? target.offsetTop + scrollable * aboutTextProgress
          : target.id === "services"
            ? target.offsetTop + servicesPaddingTop
            : target.offsetTop;

        window.scrollTo({
          top,
          behavior: runtime?.reducedMotion ? "auto" : "smooth",
        });
      });
    });
  });

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();
})();
