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
  let navTransitionLabel = null;
  let transitionTimers = [];
  let transitionActive = false;
  let transitionToken = 0;
  const transitionTiming = {
    scroll: 48,
    leave: 150,
    cleanup: 300,
  };

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
    navTransition.className = "nav-paper-transition";
    navTransition.setAttribute("aria-hidden", "true");
    const sheet = document.createElement("div");
    navTransitionLabel = document.createElement("span");
    sheet.className = "nav-paper-sheet";
    navTransitionLabel.className = "nav-paper-label";
    ["h1", "h2", "v1", "v2"].forEach((line) => {
      const marker = document.createElement("i");
      marker.className = `nav-paper-line nav-paper-line--${line}`;
      sheet.append(marker);
    });
    navTransition.hidden = true;
    sheet.append(navTransitionLabel);
    navTransition.append(sheet);
    document.body.append(navTransition);
    return navTransition;
  };

  const setTransitionText = (target) => {
    if (navTransitionLabel) navTransitionLabel.textContent = transitionCopy[target.id] || target.id.toUpperCase();
  };

  const resetTransitionLayers = ({ removeNodes = false, clearTimers = true } = {}) => {
    if (clearTimers) clearTransitionTimers();
    navTransition?.classList.remove("is-active", "is-leaving");
    if (navTransition) navTransition.hidden = true;
    document.body.classList.remove("nav-transition-active");
    transitionActive = false;

    if (removeNodes) {
      navTransition?.remove();
      navTransition = null;
      navTransitionLabel = null;
    }
  };

  const finishTransition = () => {
    navTransition?.classList.add("is-leaving");
    navTransition?.classList.remove("is-active");
    document.body.classList.remove("nav-transition-active");
    transitionActive = false;
  };

  const jumpToTop = (top) => {
    document.documentElement.classList.add("nav-jump-instant");
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("nav-jump-instant");
    });
  };

  const scrollToTarget = (target, { forceInstant = false, withTransition = true } = {}) => {
    if (!withTransition) {
      transitionToken += 1;
      resetTransitionLayers({ removeNodes: true });
    } else if (transitionActive) {
      transitionToken += 1;
      resetTransitionLayers({ removeNodes: true });
    }
    runtime?.closeWorkGallery?.();
    clearTransitionTimers();

    const runScroll = () => {
      const top = getReadableTop(target);
      const longAnimatedSection = target.id === "services" || target.id === "works";
      const instant = forceInstant || withTransition || longAnimatedSection || runtime?.reducedMotion;

      if (instant) {
        jumpToTop(top);
      } else {
        window.scrollTo({ top, left: 0, behavior: "smooth" });
      }

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
    document.body.classList.add("nav-transition-active");
    overlay.classList.remove("is-leaving");
    overlay.classList.remove("is-active");
    window.requestAnimationFrame(() => {
      if (token !== transitionToken) return;
      overlay.classList.add("is-active");
    });

    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      runScroll();
    }, transitionTiming.scroll));
    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      finishTransition();
    }, transitionTiming.leave));

    transitionTimers.push(setTimeout(() => {
      if (token !== transitionToken) return;
      resetTransitionLayers({ removeNodes: true, clearTimers: false });
    }, transitionTiming.cleanup));
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
      const isBottomNavItem = item.classList.contains("bottom-nav-item");
      scrollToTarget(target, isBottomNavItem
        ? { forceInstant: true, withTransition: true }
        : undefined);
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
