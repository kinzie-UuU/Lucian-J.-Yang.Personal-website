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
  const ENTRY_REPLAY_TOP_LOCK_MS = 5200;

  const HERO_HANDOFF_TRIGGER = 0.10;
  const HERO_HANDOFF_RESET = 0.02;
  const HERO_HANDOFF_MS = 1550;

  let entryTransitionLocked = false;
  let entryTransitionReleaseTimer = 0;
  let siteEnteredDispatched = false;
  let entryReplayTopRaf = 0;
  let entryReplayTopUntil = 0;
  let entryScrollTouchY = 0;

  let heroCurtainRaised = false;
  let heroHandoffActive = false;
  let heroHandoffComplete = false;
  let heroHandoffTimer = 0;
  let heroWasReadyForHandoff = false;
  let postEntryGuardUntil = 0;
  let postEntryGuardTimer = 0;
  let settleGuardUntil = 0;
  let settleTargetY = 0;

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

  const stopEntryReplayTopLock = () => {
    if (entryReplayTopRaf) cancelAnimationFrame(entryReplayTopRaf);
    entryReplayTopRaf = 0;
    entryReplayTopUntil = 0;
    document.body.classList.remove("is-entry-replaying");
  };

  const startEntryReplayTopLock = (duration = ENTRY_REPLAY_TOP_LOCK_MS) => {
    stopEntryReplayTopLock();
    entryReplayTopUntil = performance.now() + duration;
    document.body.classList.add("is-entry-replaying");

    const keepAtTop = () => {
      forceScrollTop();
      if (document.body.classList.contains("has-entered") || performance.now() >= entryReplayTopUntil) {
        stopEntryReplayTopLock();
        return;
      }
      entryReplayTopRaf = requestAnimationFrame(keepAtTop);
    };

    keepAtTop();
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
    stopEntryReplayTopLock();
    forceScrollTop();
    requestAnimationFrame(() => {
      forceScrollTop();
      resizeStage();
      resetHeroSequenceState({ resetScroll: false });
      scheduleEntryTransitionRelease(420);
    });
  };

  const enterSite = () => {
    if (runtime.isEntered()) return;
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
      stopEntryReplayTopLock();
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

  const resetToEntry = () => {
    if (!document.body.classList.contains("has-entered")) return;
    runtime.closeWorkGallery?.();
    window.dispatchEvent(new CustomEvent("lucian:return-to-entry"));
    entryScreen?.style.removeProperty("display");
    document.body.classList.remove(
      "has-entered",
      "is-entering",
      "is-unfolding",
      "is-entry-curtain-ready",
      "is-entry-scroll-locked",
      "is-key-unlocking"
    );
    runtime.setEntered(false);
    entryTransitionLocked = false;
    siteEnteredDispatched = false;
    window.clearTimeout(entryTransitionReleaseTimer);
    window.clearTimeout(postEntryGuardTimer);
    postEntryGuardTimer = 0;
    postEntryGuardUntil = 0;
    resetHeroAboutHandoff();
    resetHeroSequenceState({ resetScroll: true });
    startEntryReplayTopLock();
    window.LucianEntryKey?.replay?.();
  };

  const setHandoffClass = (active) => {
    setClass(document.documentElement, "hero-about-handoff-active", active);
    setClass(document.body, "hero-about-handoff-active", active);
  };

  const setSettledClass = (settled) => {
    setClass(document.documentElement, "hero-about-handoff-settled", settled);
    setClass(document.body, "hero-about-handoff-settled", settled);
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
    return Math.max(0, Math.round(currentY + rect.top));
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

  const settleHeroStart = () => {
    forceScrollTop();
  };

  const settleAboutEntry = () => {
    if (!settleTargetY) return;
    window.scrollTo({ top: settleTargetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = settleTargetY;
    document.body.scrollTop = settleTargetY;
  };

  const syncHeroReadyState = () => {
    const ready = isHeroReadyForHandoff();
    if (ready && !heroWasReadyForHandoff) startPostEntryGuard();
    heroWasReadyForHandoff = ready;
    return ready;
  };

  const finishHeroAboutHandoff = () => {
    const targetY = targetAboutEntryTop();
    settleTargetY = targetY;
    settleGuardUntil = performance.now() + 720;
    window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = targetY;
    document.body.scrollTop = targetY;

    window.requestAnimationFrame(() => {
      if (window.LucianAboutMotion?.startCenteredReveal) {
        window.LucianAboutMotion.startCenteredReveal({
          anchorY: targetY,
          initialEnter: 0.12,
        });
        settleGuardUntil = 0;
      } else {
        window.LucianAboutMotion?.primeEntry?.(0.04);
      }
      setHandoffClass(false);
      setSettledClass(true);
      heroHandoffActive = false;
      heroHandoffComplete = true;
      window.dispatchEvent(new CustomEvent("lucian:hero-about-handoff", {
        detail: { complete: true, targetY },
      }));
    });
  };

  const startHeroAboutHandoff = () => {
    if (!heroStage || heroHandoffActive || heroHandoffComplete || isBlockedByProgrammaticTransition()) return;
    heroHandoffActive = true;
    heroCurtainRaised = true;
    setHandoffClass(true);
    setSettledClass(false);
    heroStage.classList.add("is-curtain-down");
    window.clearTimeout(heroHandoffTimer);

    if (reducedMotion) {
      finishHeroAboutHandoff();
      return;
    }

    heroHandoffTimer = window.setTimeout(finishHeroAboutHandoff, HERO_HANDOFF_MS);
  };

  function resetHeroAboutHandoff() {
    window.clearTimeout(heroHandoffTimer);
    heroHandoffActive = false;
    heroHandoffComplete = false;
    heroCurtainRaised = false;
    settleGuardUntil = 0;
    settleTargetY = 0;
    setHandoffClass(false);
    setSettledClass(false);
    heroStage?.classList.remove("is-curtain-down");
  }

  const updateHeroAboutHandoff = () => {
    if (!heroStage || !heroSection || !aboutSection || !syncHeroReadyState()) return;
    if (isSettleGuardActive()) {
      if (Math.abs(window.scrollY - settleTargetY) > 2) settleAboutEntry();
      return;
    }
    if (isPostEntryGuardActive()) {
      return;
    }
    if (isBlockedByProgrammaticTransition() && !heroHandoffActive) return;
    const past = readHeroPast();

    if (reducedMotion) {
      if (past > 0.05) startHeroAboutHandoff();
      else if (past < HERO_HANDOFF_RESET) resetHeroAboutHandoff();
      return;
    }

    const canStartHandoff = isHeroHandoffZone();
    if (!heroCurtainRaised && past > HERO_HANDOFF_TRIGGER && canStartHandoff) {
      startHeroAboutHandoff();
    } else if (!canStartHandoff && !heroHandoffActive) {
      setHandoffClass(false);
    } else if ((heroCurtainRaised || heroHandoffComplete || heroHandoffActive) && past < HERO_HANDOFF_RESET) {
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

  const blockEntryScroll = (event) => {
    if (!entryTransitionLocked) return;
    event.preventDefault();
    forceScrollTop();
    scheduleEntryTransitionRelease(260);
  };

  const blockInputDuringHeroHandoff = (event) => {
    if (!heroHandoffActive && !isSettleGuardActive()) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
    else if (!heroHandoffActive) requestAnimationFrame(settleHeroStart);
  };

  const blockKeysDuringHeroHandoff = (event) => {
    const blockedKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if ((!heroHandoffActive && !isSettleGuardActive()) || !blockedKeys.includes(event.key)) return;
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

  document.getElementById("pixel-avatar")?.addEventListener("click", resetToEntry);

  window.addEventListener("wheel", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("wheel", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("touchmove", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeysDuringHeroHandoff, { capture: true });
  window.addEventListener("scroll", onHeroScroll, { passive: true });
  window.addEventListener("resize", updateHeroAboutHandoff);

  window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("has-entered")) return;
    resetHeroSequenceState({ resetScroll: true });
  });

  window.addEventListener("entry-key-ready", () => {
    if (!runtime.isEntered()) enterSite();
  });

  if (document.body.classList.contains("entry-key-ready") && !runtime.isEntered()) {
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
    setHandoffClass(false);
    window.removeEventListener("scroll", onHeroScroll);
    window.removeEventListener("resize", updateHeroAboutHandoff);
  }, { once: true });
})();
