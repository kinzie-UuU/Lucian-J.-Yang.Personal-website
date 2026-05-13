(() => {
  const runtime = window.LucianRuntime;
  const navItems = document.querySelectorAll(".bottom-nav-item");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  let navTransition = null;
  let navTransitionCopy = null;
  let navTransitionLabel = null;
  let transitionTimers = [];
  let transitionActive = false;

  const transitionCopy = {
    about: "ABOUT",
    services: "SERVICES",
    works: "WORKS",
    contact: "CONTACT",
  };

  const getTopSafeArea = () => {
    const rootValue = getComputedStyle(document.documentElement).getPropertyValue("--site-top-safe");
    const parsed = parseFloat(rootValue);
    return Number.isFinite(parsed) ? parsed : 64;
  };

  const getReadableTop = (target) => {
    const viewport = Math.max(1, window.innerHeight);
    const scrollable = Math.max(0, target.scrollHeight - viewport);

    if (target.id === "about") {
      return target.offsetTop + scrollable * 0.32;
    }

    if (target.id === "services") {
      return target.offsetTop + viewport * 0.28;
    }

    if (target.id === "works") {
      return Math.max(0, target.offsetTop - getTopSafeArea() + viewport * 0.12);
    }

    if (target.id === "contact") {
      return Math.max(0, target.offsetTop - getTopSafeArea() + viewport * 0.12);
    }

    return Math.max(0, target.offsetTop - getTopSafeArea());
  };

  const getTransitionOverlay = () => {
    if (navTransition) return navTransition;

    navTransition = document.createElement("div");
    navTransition.className = "nav-water-transition";
    navTransition.setAttribute("aria-hidden", "true");
    const membrane = document.createElement("div");
    navTransitionCopy = document.createElement("div");
    navTransitionLabel = document.createElement("span");
    membrane.className = "nav-water-membrane";
    navTransitionCopy.className = "nav-water-copy";
    navTransitionLabel.className = "nav-water-label";
    navTransitionCopy.append(navTransitionLabel);
    navTransition.append(membrane);
    document.body.append(navTransition, navTransitionCopy);
    return navTransition;
  };

  const setTransitionText = (target) => {
    if (navTransitionLabel) navTransitionLabel.textContent = transitionCopy[target.id] || target.id.toUpperCase();
  };

  const scrollToTarget = (target, { forceInstant = false, withTransition = true } = {}) => {
    if (transitionActive && withTransition) return;
    runtime?.closeWorkGallery?.();
    transitionTimers.forEach((timer) => clearTimeout(timer));
    transitionTimers = [];

    const runScroll = () => {
      const top = getReadableTop(target);
      const longAnimatedSection = target.id === "services" || target.id === "works";

      window.scrollTo({
        top,
        behavior: forceInstant || withTransition || longAnimatedSection || runtime?.reducedMotion ? "auto" : "smooth",
      });

      updateActiveNav();
    };

    if (!withTransition || runtime?.reducedMotion) {
      runScroll();
      return;
    }

    transitionActive = true;
    const overlay = getTransitionOverlay();
    setTransitionText(target);
    document.body.classList.add("nav-transition-active");
    overlay.classList.remove("is-leaving");
    navTransitionCopy?.classList.remove("is-leaving");
    overlay.classList.remove("is-active");
    navTransitionCopy?.classList.remove("is-active");
    window.requestAnimationFrame(() => {
      overlay.classList.add("is-active");
      navTransitionCopy?.classList.add("is-active");
      if (navTransitionCopy) navTransitionCopy.style.opacity = "1";
    });

    transitionTimers.push(setTimeout(runScroll, 180));
    transitionTimers.push(setTimeout(() => {
      overlay.classList.add("is-leaving");
      navTransitionCopy?.classList.add("is-leaving");
      overlay.classList.remove("is-active");
      navTransitionCopy?.classList.remove("is-active");
      if (navTransitionCopy) navTransitionCopy.style.opacity = "0";
      document.body.classList.remove("nav-transition-active");
      transitionActive = false;
    }, 560));

    transitionTimers.push(setTimeout(() => {
      overlay.classList.remove("is-leaving");
      navTransitionCopy?.classList.remove("is-leaving");
      transitionTimers = [];
    }, 820));
  };

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

  anchorLinks.forEach((item) => {
    item.addEventListener("click", (event) => {
      const targetId = item.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
    });
  });

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();
})();
