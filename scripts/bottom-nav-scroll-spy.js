(() => {
  const runtime = window.LucianRuntime;
  const navItems = document.querySelectorAll(".bottom-nav-item");
  const sectionIds = ["about", "services", "works", "contact"];
  const warmSectionIds = ["clients", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const warmSections = warmSectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const contactSection = document.getElementById("contact");
  const clientsSection = document.getElementById("clients");
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  let navTransition = null;
  let navTransitionCopy = null;
  let navTransitionLabel = null;
  let transitionTimers = [];
  let transitionActive = false;
  let transitionToken = 0;

  const clearTransitionTimers = () => {
    transitionTimers.forEach((timer) => clearTimeout(timer));
    transitionTimers = [];
  };

  const transitionCopy = {
    about: "ABOUT",
    services: "SERVICES",
    works: "WORKS",
    clients: "CLIENTS",
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

    if (target.id === "clients") {
      return Math.max(0, target.offsetTop - getTopSafeArea() + viewport * 0.08);
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
    navTransition.hidden = true;
    navTransitionCopy.hidden = true;
    navTransitionCopy.append(navTransitionLabel);
    navTransition.append(membrane);
    document.body.append(navTransition, navTransitionCopy);
    return navTransition;
  };

  const setTransitionText = (target) => {
    if (navTransitionLabel) navTransitionLabel.textContent = transitionCopy[target.id] || target.id.toUpperCase();
  };

  const resetTransitionLayers = ({ removeNodes = false, clearTimers = true } = {}) => {
    if (clearTimers) clearTransitionTimers();
    navTransition?.classList.remove("is-active", "is-leaving");
    navTransitionCopy?.classList.remove("is-active", "is-leaving");
    navTransitionCopy?.style.removeProperty("opacity");
    if (navTransition) navTransition.hidden = true;
    if (navTransitionCopy) navTransitionCopy.hidden = true;
    document.body.classList.remove("nav-transition-active");
    transitionActive = false;

    if (removeNodes) {
      navTransition?.remove();
      navTransitionCopy?.remove();
      navTransition = null;
      navTransitionCopy = null;
      navTransitionLabel = null;
    }
  };

  const finishTransition = () => {
    navTransition?.classList.add("is-leaving");
    navTransitionCopy?.classList.add("is-leaving");
    navTransition?.classList.remove("is-active");
    navTransitionCopy?.classList.remove("is-active");
    navTransitionCopy?.style.removeProperty("opacity");
    document.body.classList.remove("nav-transition-active");
    transitionActive = false;
  };

  const scrollToTarget = (target, { forceInstant = false, withTransition = true } = {}) => {
    if (transitionActive && withTransition) {
      transitionToken += 1;
      resetTransitionLayers({ removeNodes: true });
    }
    runtime?.closeWorkGallery?.();
    clearTransitionTimers();

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
    const token = ++transitionToken;
    const overlay = getTransitionOverlay();
    setTransitionText(target);
    overlay.hidden = false;
    if (navTransitionCopy) navTransitionCopy.hidden = false;
    document.body.classList.add("nav-transition-active");
    overlay.classList.remove("is-leaving");
    navTransitionCopy?.classList.remove("is-leaving");
    overlay.classList.remove("is-active");
    navTransitionCopy?.classList.remove("is-active");
    window.requestAnimationFrame(() => {
      if (token !== transitionToken) return;
      overlay.classList.add("is-active");
      navTransitionCopy?.classList.add("is-active");
    });

    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      runScroll();
    }, 180));
    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      finishTransition();
    }, 560));

    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      overlay.classList.remove("is-leaving");
      navTransitionCopy?.classList.remove("is-leaving");
      navTransitionCopy?.style.removeProperty("opacity");
      resetTransitionLayers({ clearTimers: false });
    }, 820));

    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      resetTransitionLayers({ removeNodes: true, clearTimers: false });
    }, 1400));
  };

  const updateActiveNav = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    const warmY = window.scrollY + window.innerHeight * 0.34;
    let active = null;

    for (const section of sections) {
      if (section.offsetTop <= scrollY) active = section.id;
    }

    const isSectionInView = (section) => (
      section.offsetTop <= warmY
      && section.offsetTop + section.offsetHeight > window.scrollY + getTopSafeArea()
    );

    if (
      contactSection
      && contactSection.getBoundingClientRect().top <= window.innerHeight * 0.58
      && contactSection.getBoundingClientRect().bottom > getTopSafeArea()
    ) {
      active = "contact";
    }

    const warmActive = warmSections.some(isSectionInView);
    const clientsActive = clientsSection ? isSectionInView(clientsSection) : false;

    if (clientsActive) active = null;
    document.body.classList.toggle("is-warm-stage", warmActive);

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
  window.addEventListener("pageshow", () => resetTransitionLayers({ removeNodes: true }));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetTransitionLayers({ removeNodes: true });
  });
  updateActiveNav();
})();
