(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const {
    playUiTone,
    startBackgroundMusic,
    forceScrollTop,
    resetHeroSequenceState,
    resizeStage,
  } = runtime;

  const entryScreen = document.querySelector("#entry-screen");
  const heroStage = document.querySelector(".hero-stage");
  const heroSection = document.querySelector(".hero-section");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  const reducedMotion = runtime.reducedMotion
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ENTRY_UNFOLD_MS = 940;
  const ENTRY_CURTAIN_PREPAINT_MS = 160;
  const ENTRY_CURTAIN_MS = 2000;
  const ENTRY_CURTAIN_HOLD_MS = 180;

  const HERO_HANDOFF_RESET = 0.02;
  const HERO_HANDOFF_MS = 1450;
  const HERO_HANDOFF_RELEASE_MS = 180;
  const HERO_RETURN_TRIGGER = 1.5;
  const HERO_RETURN_MS = 1450;
  const HERO_INPUT_DIRECTION_HOLD_MS = 1400;
  const DEEP_LINK_TARGETS = new Set(["about", "services", "works", "contact"]);

  let entryTransitionLocked = false;
  let entryTransitionReleaseTimer = 0;
  let siteEnteredDispatched = false;
  let entryScrollTouchY = 0;

  let heroCurtainRaised = false;
  let heroHandoffActive = false;
  let heroHandoffComplete = false;
  let heroHandoffReturning = false;
  let heroForwardHandoffLocked = false;
  let heroHandoffTimer = 0;
  let heroHandoffReleaseTimer = 0;
  let heroHandoffReturnTimer = 0;
  let heroHandoffSettleRaf = 0;
  let heroHandoffSettleUntil = 0;
  let heroReturnTopRaf = 0;
  let heroReturnTopUntil = 0;
  let heroInstantTopReleaseTimer = 0;
  let heroWasReadyForHandoff = false;
  let heroInputDirection = 1;
  let heroInputDirectionUntil = 0;
  let heroTouchY = 0;
  let postEntryGuardUntil = 0;
  let postEntryGuardTimer = 0;
  let settleGuardUntil = 0;
  let settleTargetY = 0;
  let postForwardReturnGuardUntil = 0;

  const readInitialDeepLinkTarget = () => {
    const id = (window.location.hash || "").slice(1).split("?")[0];
    return DEEP_LINK_TARGETS.has(id) ? id : "";
  };

  const initialDeepLinkTarget = readInitialDeepLinkTarget();

  const setClass = (target, className, active) => {
    target.classList.toggle(className, active);
  };

  const dispatchSiteEntered = () => {
    if (siteEnteredDispatched || !document.body.classList.contains("has-entered")) return;
    siteEnteredDispatched = true;
    window.dispatchEvent(new CustomEvent("lucian:site-entered"));
  };

  const lockEntryTransitionScroll = (locked) => {
    entryTransitionLocked = locked;
    setClass(document.body, "is-entry-scroll-locked", locked);
    window.clearTimeout(entryTransitionReleaseTimer);
    if (locked) forceScrollTop();
  };

  const releaseEntryTransitionScroll = () => {
    lockEntryTransitionScroll(false);
    forceScrollTop();
    window.requestAnimationFrame(dispatchSiteEntered);
  };

  const scheduleEntryTransitionRelease = (delay = 260) => {
    window.clearTimeout(entryTransitionReleaseTimer);
    if (!document.body.classList.contains("has-entered")) return;
    entryTransitionReleaseTimer = window.setTimeout(releaseEntryTransitionScroll, delay);
  };

  const completeEntryTransition = () => {
    document.body.classList.remove("is-entering");
    document.body.classList.add("has-entered");
    forceScrollTop();
    requestAnimationFrame(() => {
      forceScrollTop();
      resizeStage();
      resetHeroSequenceState({ resetScroll: false });
      scheduleEntryTransitionRelease(420);
    });
  };

  const quickEnterFromDeepLink = () => {
    if (!initialDeepLinkTarget || runtime.isEntered()) return false;

    runtime.setEntered(true);
    entryTransitionLocked = false;
    window.clearTimeout(entryTransitionReleaseTimer);
    document.body.classList.remove(
      "is-entering",
      "is-unfolding",
      "is-entry-curtain-ready",
      "is-entry-scroll-locked",
      "is-key-unlocking",
      "is-entry-replaying"
    );
    document.body.classList.add("has-entered", "is-deep-link-entry");
    entryScreen?.style.removeProperty("display");
    runtime.setCursorVisible(false);

    requestAnimationFrame(() => {
      resizeStage();
      resetHeroSequenceState({ resetScroll: false });
      dispatchSiteEntered();
      window.LucianSectionFlow?.jumpToSection?.(initialDeepLinkTarget, {
        updateHash: false,
        source: "initial-hash",
      });
      window.setTimeout(() => {
        document.body.classList.remove("is-deep-link-entry");
      }, 520);
    });

    return true;
  };

  const enterSite = () => {
    if (runtime.isEntered()) return;
    if (quickEnterFromDeepLink()) return;

    resetHeroSequenceState({ resetScroll: true });
    runtime.setEntered(true);
    lockEntryTransitionScroll(true);
    document.body.classList.add("is-key-unlocking");
    window.LucianEntryKey?.unlock?.();
    if (runtime.playUnlockTone) runtime.playUnlockTone({ delayMs: 520 }).catch(() => false);
    else playUiTone("click");
    startBackgroundMusic?.({ fade: true });

    if (reducedMotion) {
      document.body.classList.add("has-entered");
      document.body.classList.remove("is-key-unlocking");
      requestAnimationFrame(() => {
        forceScrollTop();
        resizeStage();
        resetHeroSequenceState({ resetScroll: false });
        releaseEntryTransitionScroll();
      });
      return;
    }

    runtime.setCursorVisible(false);
    document.body.classList.add("is-unfolding");

    window.setTimeout(() => {
      document.body.classList.remove("is-unfolding");
      document.body.classList.remove("is-key-unlocking");
      document.body.classList.add("is-entry-curtain-ready");

      window.setTimeout(() => {
        document.body.classList.remove("is-entry-curtain-ready");
        document.body.classList.add("is-entering");
        window.setTimeout(completeEntryTransition, ENTRY_CURTAIN_MS + ENTRY_CURTAIN_HOLD_MS);
      }, ENTRY_CURTAIN_PREPAINT_MS);
    }, ENTRY_UNFOLD_MS);
  };


  const setHandoffClass = (active) => {
    setClass(document.documentElement, "hero-about-handoff-active", active);
    setClass(document.body, "hero-about-handoff-active", active);
  };

  const setSettledClass = (settled) => {
    setClass(document.documentElement, "hero-about-handoff-settled", settled);
    setClass(document.body, "hero-about-handoff-settled", settled);
  };

  const setReleaseClass = (releasing) => {
    setClass(document.documentElement, "hero-about-handoff-releasing", releasing);
    setClass(document.body, "hero-about-handoff-releasing", releasing);
  };

  const setReturningClass = (returning) => {
    setClass(document.documentElement, "hero-about-handoff-returning", returning);
    setClass(document.body, "hero-about-handoff-returning", returning);
  };

  const readHeroPast = () => {
    if (!heroSection) return 0;
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return (-rect.top) / vh;
  };

  const isHeroHandoffZone = () => {
    if (!heroSection) return false;
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.08 && rect.bottom > vh * 0.35;
  };

  const targetAboutEntryTop = () => {
    if (!aboutSection) return 0;
    const currentY = window.scrollY || window.pageYOffset || 0;
    const rect = aboutSection.getBoundingClientRect();
    const measuredTop = Math.max(0, Math.round(currentY + rect.top));
    if (measuredTop > 2) return measuredTop;

    const offsetTop = Math.round(aboutSection.offsetTop || 0);
    if (offsetTop > 2) return offsetTop;

    if (heroSection) {
      const heroBottom = Math.round((heroSection.offsetTop || 0) + (heroSection.offsetHeight || 0));
      if (heroBottom > 2) return heroBottom;
    }

    const vhFallback = Math.round((window.innerHeight || 1) * 1.32);
    return Math.max(measuredTop, vhFallback);
  };

  const isBlockedByProgrammaticTransition = () => (
    document.body.classList.contains("nav-transition-active")
    || document.body.classList.contains("scroll-curtain-active")
    || document.body.classList.contains("about-services-handoff-active")
    || document.body.classList.contains("section-hash-jump-pending")
    || document.body.classList.contains("work-gallery-open")
  );

  const isHeroReadyForHandoff = () => (
    document.body.classList.contains("has-entered")
    && !document.body.classList.contains("is-entering")
    && !document.body.classList.contains("is-unfolding")
    && !document.body.classList.contains("is-entry-scroll-locked")
  );

  const startPostEntryGuard = () => {
    window.clearTimeout(postEntryGuardTimer);
    postEntryGuardUntil = performance.now() + 820;
    postEntryGuardTimer = window.setTimeout(() => {
      postEntryGuardTimer = 0;
      updateHeroAboutHandoff();
    }, 840);
  };

  const isPostEntryGuardActive = () => performance.now() < postEntryGuardUntil;
  const isSettleGuardActive = () => performance.now() < settleGuardUntil;

  const rememberHeroInputDirection = (direction) => {
    if (!Number.isFinite(direction) || Math.abs(direction) < 4) return;
    heroInputDirection = direction > 0 ? 1 : -1;
    heroInputDirectionUntil = performance.now() + HERO_INPUT_DIRECTION_HOLD_MS;
  };

  const isHeroInputScrollingUp = () => (
    performance.now() < heroInputDirectionUntil
    && heroInputDirection < 0
  );

  const rememberHeroWheelDirection = (event) => {
    rememberHeroInputDirection(event.deltaY);
  };

  const rememberHeroTouchStart = (event) => {
    heroTouchY = event.touches[0]?.clientY || heroTouchY;
  };

  const rememberHeroTouchDirection = (event) => {
    const y = event.touches[0]?.clientY || heroTouchY;
    const delta = heroTouchY - y;
    heroTouchY = y;
    rememberHeroInputDirection(delta);
  };

  const rememberHeroKeyDirection = (event) => {
    if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
      rememberHeroInputDirection(-1);
    } else if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
      rememberHeroInputDirection(1);
    }
  };

  const releaseSettleGuardForForwardInput = () => {
    const hasRecentInput = performance.now() < heroInputDirectionUntil;
    if (!heroHandoffComplete || !isSettleGuardActive() || !hasRecentInput || isHeroInputScrollingUp()) return false;
    settleGuardUntil = 0;
    stopAboutEntrySettleLock();
    return true;
  };

  const shouldStartHeroHandoffFromInput = (direction = 1) => (
    direction > 0
    && !heroCurtainRaised
    && !heroHandoffActive
    && !heroHandoffComplete
    && !heroHandoffReturning
    && isHeroReadyForHandoff()
    && isHeroHandoffZone()
    && !isBlockedByProgrammaticTransition()
  );

  const shouldStartHeroReturnFromInput = (direction = -1) => (
    direction < 0
    && heroHandoffComplete
    && !heroHandoffActive
    && !heroHandoffReturning
    && isHeroReadyForHandoff()
    && readHeroPast() < HERO_RETURN_TRIGGER
    && !isBlockedByProgrammaticTransition()
  );

  const lockHeroInstantTop = () => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.add("nav-jump-instant");
    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
  };

  const unlockHeroInstantTop = () => {
    const root = document.documentElement;
    const body = document.body;
    root.style.removeProperty("scroll-behavior");
    body.style.removeProperty("scroll-behavior");
    root.classList.remove("nav-jump-instant");
  };

  const settleHeroStart = ({ holdMs = 120 } = {}) => {
    window.clearTimeout(heroInstantTopReleaseTimer);
    lockHeroInstantTop();
    forceScrollTop();

    requestAnimationFrame(() => {
      forceScrollTop();
      requestAnimationFrame(() => {
        forceScrollTop();
      });
    });

    heroInstantTopReleaseTimer = window.setTimeout(() => {
      unlockHeroInstantTop();
    }, holdMs);
  };

  const settleAboutEntry = () => {
    if (!settleTargetY) return;
    window.scrollTo({ top: settleTargetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = settleTargetY;
    document.body.scrollTop = settleTargetY;
  };

  const stopAboutEntrySettleLock = () => {
    if (heroHandoffSettleRaf) cancelAnimationFrame(heroHandoffSettleRaf);
    heroHandoffSettleRaf = 0;
    heroHandoffSettleUntil = 0;
    if (heroHandoffComplete && !heroHandoffReturning) {
      settleTargetY = Math.round(window.scrollY || window.pageYOffset || settleTargetY || 0);
    }
  };

  const stopHeroReturnTopLock = ({ unlock = true } = {}) => {
    if (heroReturnTopRaf) cancelAnimationFrame(heroReturnTopRaf);
    heroReturnTopRaf = 0;
    heroReturnTopUntil = 0;
    if (unlock) {
      window.clearTimeout(heroInstantTopReleaseTimer);
      unlockHeroInstantTop();
    }
  };

  const startAboutEntrySettleLock = (duration = HERO_HANDOFF_RELEASE_MS + 520) => {
    stopAboutEntrySettleLock();
    heroHandoffSettleUntil = performance.now() + duration;

    const keepSettled = () => {
      settleAboutEntry();
      if (performance.now() >= heroHandoffSettleUntil) {
        stopAboutEntrySettleLock();
        return;
      }
      heroHandoffSettleRaf = requestAnimationFrame(keepSettled);
    };

    keepSettled();
  };

  const startHeroReturnTopLock = (duration = HERO_RETURN_MS + 620) => {
    stopHeroReturnTopLock({ unlock: false });
    window.clearTimeout(heroInstantTopReleaseTimer);
    lockHeroInstantTop();
    heroReturnTopUntil = performance.now() + duration;

    const keepAtTop = () => {
      forceScrollTop();
      if (performance.now() >= heroReturnTopUntil) {
        stopHeroReturnTopLock();
        return;
      }
      heroReturnTopRaf = requestAnimationFrame(keepAtTop);
    };

    keepAtTop();
  };

  const syncHeroReadyState = () => {
    const ready = isHeroReadyForHandoff();
    if (ready && !heroWasReadyForHandoff) startPostEntryGuard();
    heroWasReadyForHandoff = ready;
    return ready;
  };

  const finishHeroAboutHandoff = () => {
    const targetY = settleTargetY || targetAboutEntryTop();
    settleTargetY = targetY;
    setReleaseClass(true);
    settleGuardUntil = performance.now() + HERO_HANDOFF_RELEASE_MS + 360;
    window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = targetY;
    document.body.scrollTop = targetY;
    startAboutEntrySettleLock();

    const completeRelease = () => {
      const safeTargetY = targetY > 2
        ? targetY
        : Math.round((window.innerHeight || 1) * 1.32);
      settleTargetY = safeTargetY;
      window.scrollTo({ top: safeTargetY, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = safeTargetY;
      document.body.scrollTop = safeTargetY;
      settleAboutEntry();
      heroStage?.classList.remove("is-curtain-down");
      setHandoffClass(false);
      setSettledClass(true);
      heroHandoffActive = false;
      heroHandoffComplete = true;
      heroForwardHandoffLocked = false;
      postForwardReturnGuardUntil = performance.now() + HERO_HANDOFF_RELEASE_MS + 900;
      window.requestAnimationFrame(() => {
        setReleaseClass(false);
      });
      window.dispatchEvent(new CustomEvent("lucian:hero-about-handoff", {
        detail: { complete: true, targetY: safeTargetY },
      }));
    };

    const primeAboutEntry = () => {
      if (window.LucianAboutMotion?.startCenteredReveal) {
        window.LucianAboutMotion.startCenteredReveal({
          anchorY: targetY,
          initialEnter: 0.12,
        });
      } else {
        window.LucianAboutMotion?.primeEntry?.(0.04);
      }
    };

    window.requestAnimationFrame(() => {
      primeAboutEntry();
      window.requestAnimationFrame(() => {
        window.clearTimeout(heroHandoffReleaseTimer);
        if (reducedMotion) {
          completeRelease();
          return;
        }
        heroHandoffReleaseTimer = window.setTimeout(completeRelease, HERO_HANDOFF_RELEASE_MS);
      });
    });
  };

  const startHeroAboutHandoff = () => {
    if (
      !heroStage
      || heroHandoffActive
      || heroHandoffComplete
      || heroHandoffReturning
      || isBlockedByProgrammaticTransition()
    ) return;
    heroHandoffActive = true;
    heroCurtainRaised = true;
    heroForwardHandoffLocked = true;
    settleTargetY = targetAboutEntryTop();
    setHandoffClass(true);
    setSettledClass(false);
    setReleaseClass(false);
    heroStage.classList.add("is-curtain-down");
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReleaseTimer);

    if (reducedMotion) {
      finishHeroAboutHandoff();
      return;
    }

    heroHandoffTimer = window.setTimeout(finishHeroAboutHandoff, HERO_HANDOFF_MS);
  };

  function resetHeroAboutHandoff({ force = false } = {}) {
    if (!force && heroForwardHandoffLocked) return;
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReturnTimer);
    heroForwardHandoffLocked = false;
    heroHandoffActive = false;
    heroHandoffComplete = false;
    heroHandoffReturning = false;
    heroCurtainRaised = false;
    settleGuardUntil = 0;
    settleTargetY = 0;
    postForwardReturnGuardUntil = 0;
    window.clearTimeout(heroHandoffReleaseTimer);
    stopAboutEntrySettleLock();
    stopHeroReturnTopLock();
    setHandoffClass(false);
    setReleaseClass(false);
    setReturningClass(false);
    setSettledClass(false);
    heroStage?.classList.remove("is-curtain-down");
  }

  const finishHeroAboutReturn = () => {
    settleHeroStart();
    heroHandoffReturning = false;
    heroHandoffComplete = false;
    heroCurtainRaised = false;
    postForwardReturnGuardUntil = 0;
    setReturningClass(false);
    setHandoffClass(false);
    setReleaseClass(false);
    setSettledClass(false);
    heroStage?.classList.remove("is-curtain-down");
    startHeroReturnTopLock(760);
    updateHeroAboutHandoff();
  };

  const startHeroAboutReturn = () => {
    if (heroHandoffActive || heroHandoffReturning || isBlockedByProgrammaticTransition()) return;
    const heroCurtain = heroStage?.querySelector(".hero-curtain");
    heroHandoffReturning = true;
    heroCurtainRaised = true;
    setHandoffClass(true);
    setReturningClass(true);
    if (heroCurtain) {
      heroCurtain.style.transition = "none";
      heroCurtain.style.transform = "translate3d(0, 0, 0)";
      heroCurtain.getBoundingClientRect();
    }
    heroStage?.classList.add("is-curtain-down");
    window.clearTimeout(heroHandoffReturnTimer);
    window.clearTimeout(heroHandoffReleaseTimer);
    startHeroReturnTopLock();

    if (reducedMotion) {
      heroCurtain?.style.removeProperty("transition");
      heroCurtain?.style.removeProperty("transform");
      finishHeroAboutReturn();
      return;
    }

    requestAnimationFrame(() => {
      setSettledClass(false);
      requestAnimationFrame(() => {
        heroHandoffReleaseTimer = window.setTimeout(() => {
          heroCurtain?.style.removeProperty("transition");
          heroCurtain?.style.removeProperty("transform");
          heroStage?.classList.remove("is-curtain-down");
          heroHandoffReturnTimer = window.setTimeout(finishHeroAboutReturn, HERO_RETURN_MS);
        }, HERO_HANDOFF_RELEASE_MS);
      });
    });
  };

  const updateHeroAboutHandoff = () => {
    if (!heroStage || !heroSection || !aboutSection || !syncHeroReadyState()) return;
    if (isSettleGuardActive()) {
      if (releaseSettleGuardForForwardInput()) {
        return;
      }
      if (Math.abs(window.scrollY - settleTargetY) > 2) settleAboutEntry();
      return;
    }
    if (isBlockedByProgrammaticTransition() && !heroHandoffActive && !heroHandoffReturning) return;
    const past = readHeroPast();

    if (isPostEntryGuardActive()) {
      if (!heroCurtainRaised && past > HERO_HANDOFF_RESET) settleHeroStart();
      return;
    }

    if (reducedMotion) {
      if (!heroHandoffActive && heroHandoffComplete && past < HERO_HANDOFF_RESET) resetHeroAboutHandoff();
      return;
    }

    const scrollingUp = isHeroInputScrollingUp();
    const currentY = window.scrollY || window.pageYOffset || 0;
    const returnDriftThreshold = Math.max(80, (window.innerHeight || 1) * 0.22);
    const hasScrolledAboveAboutEntry = Boolean(
      heroHandoffComplete
      && settleTargetY
      && performance.now() > postForwardReturnGuardUntil
      && currentY < settleTargetY - returnDriftThreshold
    );
    if (
      heroHandoffComplete
      && !heroHandoffReturning
      && (scrollingUp || hasScrolledAboveAboutEntry)
      && past < HERO_RETURN_TRIGGER
    ) {
      startHeroAboutReturn();
      return;
    }

    const canStartHandoff = isHeroHandoffZone() && !scrollingUp;
    if (!heroCurtainRaised && !heroHandoffComplete && !heroHandoffActive && canStartHandoff && past > HERO_HANDOFF_RESET) {
      settleHeroStart();
    } else if (!canStartHandoff && !heroHandoffActive && !heroHandoffReturning) {
      setHandoffClass(false);
    } else if (!heroHandoffActive && heroHandoffComplete && settleTargetY > 2 && past < HERO_HANDOFF_RESET) {
      settleAboutEntry();
    } else if (!heroHandoffActive && heroHandoffComplete && past < HERO_HANDOFF_RESET) {
      resetHeroAboutHandoff();
    }
  };

  let heroHandoffTicking = false;
  const onHeroScroll = () => {
    if (heroHandoffTicking) return;
    heroHandoffTicking = true;
    requestAnimationFrame(() => {
      updateHeroAboutHandoff();
      heroHandoffTicking = false;
    });
  };

  const handleProgrammaticSectionJump = (event) => {
    if (event.detail?.targetId !== "hero") return;
    resetHeroAboutHandoff({ force: true });
    settleHeroStart({ holdMs: 900 });
  };

  const blockEntryScroll = (event) => {
    if (!entryTransitionLocked) return;
    event.preventDefault();
    forceScrollTop();
    scheduleEntryTransitionRelease(260);
  };

  const blockInputDuringHeroHandoff = (event) => {
    const direction = event.type === "wheel"
      ? event.deltaY
      : heroInputDirection;
    if (shouldStartHeroHandoffFromInput(direction)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      startHeroAboutHandoff();
      return;
    }
    if (shouldStartHeroReturnFromInput(direction)) {
      event.preventDefault();
      event.stopPropagation();
      startHeroAboutReturn();
      return;
    }
    if (isPostEntryGuardActive() && isHeroReadyForHandoff()) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      return;
    }
    if (!heroHandoffActive && !heroHandoffReturning && !isSettleGuardActive()) return;
    if (releaseSettleGuardForForwardInput()) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
    else if (!heroHandoffActive) requestAnimationFrame(settleHeroStart);
  };

  const blockKeysDuringHeroHandoff = (event) => {
    const blockedKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if (shouldStartHeroHandoffFromInput(["ArrowDown", "PageDown", "End", " "].includes(event.key) ? 1 : -1)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      startHeroAboutHandoff();
      return;
    }
    if (shouldStartHeroReturnFromInput(["ArrowUp", "PageUp", "Home"].includes(event.key) ? -1 : 1)) {
      event.preventDefault();
      event.stopPropagation();
      startHeroAboutReturn();
      return;
    }
    if (isPostEntryGuardActive() && isHeroReadyForHandoff() && blockedKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      return;
    }
    if (
      (!heroHandoffActive && !heroHandoffReturning && !isSettleGuardActive())
      || !blockedKeys.includes(event.key)
    ) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
  };

  entryScreen?.addEventListener("wheel", (event) => {
    if (runtime.isEntered() || Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    enterSite();
  }, { passive: false });

  entryScreen?.addEventListener("touchstart", (event) => {
    entryScrollTouchY = event.touches[0]?.clientY || 0;
  }, { passive: true });

  entryScreen?.addEventListener("touchmove", (event) => {
    if (runtime.isEntered()) return;
    const y = event.touches[0]?.clientY || entryScrollTouchY;
    const delta = entryScrollTouchY - y;
    if (Math.abs(delta) < 10) return;
    event.preventDefault();
    enterSite();
  }, { passive: false });
  window.addEventListener("wheel", rememberHeroWheelDirection, { passive: true, capture: true });
  window.addEventListener("touchstart", rememberHeroTouchStart, { passive: true, capture: true });
  window.addEventListener("touchmove", rememberHeroTouchDirection, { passive: true, capture: true });
  window.addEventListener("keydown", rememberHeroKeyDirection, { capture: true });
  window.addEventListener("wheel", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("wheel", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("touchmove", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeysDuringHeroHandoff, { capture: true });
  window.addEventListener("scroll", onHeroScroll, { passive: true });
  window.addEventListener("resize", updateHeroAboutHandoff);
  window.addEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);

  window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("has-entered")) return;
    resetHeroSequenceState({ resetScroll: true });
  });

  window.addEventListener("entry-key-ready", () => {
    if (!runtime.isEntered()) enterSite();
  });

  if (initialDeepLinkTarget && !runtime.isEntered()) {
    requestAnimationFrame(quickEnterFromDeepLink);
  } else if (document.body.classList.contains("entry-key-ready") && !runtime.isEntered()) {
    requestAnimationFrame(enterSite);
  }

  updateHeroAboutHandoff();
  new MutationObserver(syncHeroReadyState).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("pagehide", () => {
    window.clearTimeout(entryTransitionReleaseTimer);
    window.clearTimeout(postEntryGuardTimer);
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReleaseTimer);
    window.clearTimeout(heroHandoffReturnTimer);
    stopAboutEntrySettleLock();
    stopHeroReturnTopLock();
    setHandoffClass(false);
    setReleaseClass(false);
    setReturningClass(false);
    window.removeEventListener("wheel", rememberHeroWheelDirection, { capture: true });
    window.removeEventListener("touchstart", rememberHeroTouchStart, { capture: true });
    window.removeEventListener("touchmove", rememberHeroTouchDirection, { capture: true });
    window.removeEventListener("keydown", rememberHeroKeyDirection, { capture: true });
    window.removeEventListener("scroll", onHeroScroll);
    window.removeEventListener("resize", updateHeroAboutHandoff);
    window.removeEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);
  }, { once: true });
})();
