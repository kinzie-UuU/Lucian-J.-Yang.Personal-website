(() => {
  const runtime = window.LucianRuntime;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const navItems = Array.from(document.querySelectorAll(".bottom-nav-item"));
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]:not([href="#"])'));
  const heroStage = document.querySelector(".hero-stage");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = new Map(
    ["about", "services", "works-transition", "works", "clients", "contact"]
      .map((id) => [id, document.getElementById(id)])
      .filter(([, element]) => Boolean(element))
  );

  let navTransition = null;
  let navTransitionLabel = null;
  let transitionActive = false;
  let transitionToken = 0;
  let transitionTimers = [];
  let activeSection = "about";
  let ticking = false;
  let pendingHashTarget = window.location.hash?.slice(1) || "";
  let pendingHashTimers = [];
  let clearHashPendingTimer = 0;

  const transitionTiming = {
    cover: 120,
    reveal: 220,
    buffer: 0,
  };

  const transitionCopy = {
    about: "ABOUT",
    services: "SERVICES",
    works: "FEATURED",
    contact: "CONTACT",
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const getTopSafeArea = () => {
    const parsed = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-top-safe"));
    return Number.isFinite(parsed) ? parsed : 64;
  };

  const topFor = (id) => {
    const target = sections.get(id);
    if (!target) return 0;
    const vh = Math.max(1, window.innerHeight);
    const safe = getTopSafeArea();

    if (id === "about") {
      const scrollable = Math.max(0, target.scrollHeight - vh);
      return Math.max(0, target.offsetTop + scrollable * 0.18);
    }

    if (id === "services") {
      return Math.max(0, target.offsetTop);
    }

    if (id === "works") {
      return Math.max(0, target.offsetTop - safe + vh * 0.06);
    }

    if (id === "contact" || id === "clients") {
      return Math.max(0, target.offsetTop - safe + vh * 0.08);
    }

    return Math.max(0, target.offsetTop - safe);
  };

  const rect = (id) => sections.get(id)?.getBoundingClientRect() || null;
  const isHeroTopSurfaceActive = () => {
    if (!heroStage) return false;
    const r = heroStage.getBoundingClientRect();
    const probeY = Math.max(32, getTopSafeArea() * 0.5);
    return r.top <= probeY && r.bottom >= probeY;
  };

  const intersects = (id, topRatio = 0.66, bottomRatio = 0.18) => {
    const r = rect(id);
    if (!r) return false;
    const vh = Math.max(1, window.innerHeight);
    return r.top <= vh * topRatio && r.bottom >= vh * bottomRatio;
  };

  const detectActiveSection = () => {
    if (isHeroTopSurfaceActive()) return "hero";

    const vh = Math.max(1, window.innerHeight);
    const contact = rect("contact");
    if (contact && contact.top <= vh * 0.58 && contact.bottom > getTopSafeArea()) return "contact";
    if (intersects("works", 0.72, 0.1) || intersects("works-transition", 0.66, 0.14)) return "works";
    if (intersects("services", 0.7, 0.16)) return "services";
    if (intersects("about", 0.72, 0.12)) return "about";

    const probeY = window.scrollY + vh * 0.42;
    let active = null;
    sectionIds.forEach((id) => {
      const target = sections.get(id);
      if (target && target.offsetTop <= probeY) active = id;
    });
    return active || "about";
  };

  const clearTransitionTimers = () => {
    transitionTimers.forEach((timer) => window.clearTimeout(timer));
    transitionTimers = [];
  };

  const getTransitionOverlay = () => {
    if (navTransition) return navTransition;

    navTransition = document.createElement("div");
    navTransition.className = "nav-paper-transition";
    navTransition.setAttribute("aria-hidden", "true");
    navTransition.hidden = true;

    const sheet = document.createElement("div");
    sheet.className = "nav-paper-sheet";
    navTransitionLabel = document.createElement("span");
    navTransitionLabel.className = "nav-paper-label";
    sheet.append(navTransitionLabel);
    navTransition.append(sheet);
    document.body.append(navTransition);

    return navTransition;
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

  const setTransitionText = (id) => {
    if (navTransitionLabel) navTransitionLabel.textContent = transitionCopy[id] || id.toUpperCase();
  };

  const finishTransition = () => {
    navTransition?.classList.add("is-leaving");
    navTransition?.classList.remove("is-active");
  };

  const setActiveNavTarget = (id) => {
    activeSection = id;
    setStageClasses(activeSection);
    navItems.forEach((item) => {
      item.classList.toggle("is-active", item.getAttribute("href") === `#${activeSection}`);
    });
    return activeSection;
  };

  const performJump = (id, { updateHash = true, behavior = "auto", source = "section-flow" } = {}) => {
    const target = sections.get(id);
    if (!target) return false;

    runtime?.closeWorkGallery?.();

    const top = Math.round(topFor(id));
    document.documentElement.classList.add("nav-jump-instant");
    window.scrollTo({ top, left: 0, behavior });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;

    if (updateHash && window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }

    setActiveNavTarget(id);

    window.dispatchEvent(new CustomEvent("lucian:programmatic-section-jump", {
      detail: { targetId: id, source },
    }));

    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("nav-jump-instant");
      setActiveNavTarget(id);
      window.LucianServicesStory?.refresh?.();
      window.LucianWorksFlowingMenu?.refresh?.();
    });

    return true;
  };

  const jumpToSection = (id, options = {}) => {
    if (!sections.has(id)) return false;

    const {
      updateHash = true,
      behavior = "auto",
      source = "section-flow",
      withTransition = false,
    } = options;

    transitionToken += 1;
    clearTransitionTimers();
    if (transitionActive) resetTransitionLayers({ removeNodes: true, clearTimers: false });

    if (!withTransition || reducedMotion) {
      return performJump(id, { updateHash, behavior, source });
    }

    transitionActive = true;
    const token = ++transitionToken;
    const overlay = getTransitionOverlay();
    setTransitionText(id);
    overlay.hidden = false;
    document.body.classList.add("nav-transition-active");
    overlay.classList.remove("is-leaving", "is-active");

    window.requestAnimationFrame(() => {
      if (token !== transitionToken) return;
      overlay.classList.add("is-active");
    });

    transitionTimers.push(window.setTimeout(() => {
      if (token !== transitionToken) return;
      performJump(id, { updateHash, behavior: "auto", source });
      window.requestAnimationFrame(() => {
        if (token !== transitionToken) return;
        finishTransition();
      });
    }, transitionTiming.cover));

    transitionTimers.push(window.setTimeout(() => {
      if (token !== transitionToken) return;
      resetTransitionLayers({ removeNodes: true, clearTimers: false });
    }, transitionTiming.cover + transitionTiming.reveal + transitionTiming.buffer));

    return true;
  };

  const setStageClasses = (active) => {
    const warmActive = ["clients", "contact"].some((id) => intersects(id, 0.58, 0.08));
    const darkActive = !isHeroTopSurfaceActive()
      && (["about", "services", "works"].includes(active) || intersects("works-transition", 0.68, 0.08));
    document.documentElement.classList.toggle("is-warm-stage", warmActive);
    document.documentElement.classList.toggle("is-dark-stage", darkActive && !warmActive);
    document.body.classList.toggle("is-warm-stage", warmActive);
    document.body.classList.toggle("is-dark-stage", darkActive && !warmActive);
  };

  const updateActiveNav = () => {
    return setActiveNavTarget(detectActiveSection());
  };

  const refresh = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      updateActiveNav();
      window.LucianServicesStory?.refresh?.();
    });
  };

  const handleAnchorClick = (event) => {
    const anchor = event.currentTarget;
    const id = anchor.getAttribute("href")?.slice(1);
    if (!id || !sections.has(id)) return;
    event.preventDefault();
    runtime?.playUiTone?.("click");
    jumpToSection(id, {
      updateHash: true,
      source: anchor.classList.contains("bottom-nav-item") ? "bottom-nav" : "anchor",
      withTransition: anchor.classList.contains("bottom-nav-item"),
    });
  };

  const clearPendingHashTimers = () => {
    pendingHashTimers.forEach((timer) => window.clearTimeout(timer));
    pendingHashTimers = [];
    window.clearTimeout(clearHashPendingTimer);
  };

  const setHashJumpPending = (pending) => {
    document.documentElement.classList.toggle("section-hash-jump-pending", pending);
    document.body.classList.toggle("section-hash-jump-pending", pending);
  };

  const clearHashJumpPendingSoon = (delay = 0) => {
    window.clearTimeout(clearHashPendingTimer);
    clearHashPendingTimer = window.setTimeout(() => {
      if (pendingHashTarget) return;
      setHashJumpPending(false);
    }, delay);
  };

  const targetIsSettled = (id) => {
    const target = sections.get(id);
    if (!target) return true;
    return Math.abs(window.scrollY - topFor(id)) < Math.max(12, window.innerHeight * 0.04);
  };

  const handlePendingHash = (forcedId = "") => {
    const id = forcedId || pendingHashTarget || window.location.hash?.slice(1);
    if (!id || !sections.has(id)) return;
    if (targetIsSettled(id)) {
      pendingHashTarget = "";
      clearHashJumpPendingSoon(360);
      return;
    }
    jumpToSection(id, { updateHash: false, source: "initial-hash" });
    clearHashPendingTimer = window.setTimeout(() => {
      if (!targetIsSettled(id)) return;
      pendingHashTarget = "";
      setHashJumpPending(false);
    }, 420);
  };

  const schedulePendingHash = () => {
    const id = window.location.hash?.slice(1) || pendingHashTarget;
    if (!id || !sections.has(id)) return;
    pendingHashTarget = id;
    setHashJumpPending(true);
    clearPendingHashTimers();
    [120, 820, 1700, 2600].forEach((delay) => {
      pendingHashTimers.push(window.setTimeout(() => handlePendingHash(id), delay));
    });
    clearHashJumpPendingSoon(3200);
  };

  const handleReturnToEntry = () => {
    clearPendingHashTimers();
    pendingHashTarget = "";
    setHashJumpPending(false);
    resetTransitionLayers({ removeNodes: true });
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    navItems.forEach((item) => item.classList.remove("is-active"));
    document.documentElement.classList.remove("is-warm-stage", "is-dark-stage");
    document.body.classList.remove("is-warm-stage", "is-dark-stage");
  };

  anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

  window.LucianSectionFlow = {
    jumpToSection,
    refresh,
    getActiveSection() {
      return activeSection;
    },
  };
  document.documentElement.dataset.sectionFlow = "ready";

  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("hashchange", () => {
    const id = window.location.hash?.slice(1);
    if (id && sections.has(id)) jumpToSection(id, { updateHash: false, source: "hashchange" });
  });
  window.addEventListener("lucian:site-entered", schedulePendingHash);
  window.addEventListener("lucian:return-to-entry", handleReturnToEntry);
  window.addEventListener("pageshow", () => {
    resetTransitionLayers({ removeNodes: true });
    pendingHashTarget = window.location.hash?.slice(1) || pendingHashTarget;
    refresh();
    if (document.body.classList.contains("has-entered")) {
      schedulePendingHash();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetTransitionLayers({ removeNodes: true });
  });

  updateActiveNav();
  if (document.body.classList.contains("has-entered")) {
    schedulePendingHash();
  }
})();
