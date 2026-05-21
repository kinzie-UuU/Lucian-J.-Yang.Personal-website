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

  const reducedMotion = runtime.reducedMotion;
  const entryScreen = document.querySelector("#entry-screen");

  let entryTransitionLocked = false;
  let entryTransitionReleaseTimer = 0;

  const lockEntryTransitionScroll = (locked) => {
    entryTransitionLocked = locked;
    document.body.classList.toggle("is-entry-scroll-locked", locked);
    window.clearTimeout(entryTransitionReleaseTimer);
    if (locked) forceScrollTop();
  };

  const releaseEntryTransitionScroll = () => {
    lockEntryTransitionScroll(false);
    forceScrollTop();
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

  // ── entry-to-site transition ───────────────────────────────────────
  const enterSite = () => {
    if (runtime.isEntered()) return;
    resetHeroSequenceState({ resetScroll: true });
    runtime.setEntered(true);
    lockEntryTransitionScroll(true);
    playUiTone("click");
    startBackgroundMusic?.({ fade: true });

    if (reducedMotion) {
      document.body.classList.add("has-entered");
      requestAnimationFrame(() => {
        forceScrollTop();
        resizeStage();
        resetHeroSequenceState({ resetScroll: false });
        releaseEntryTransitionScroll();
      });
      return;
    }

    // Phase 1: key turns + flashes (480ms via CSS animation)
    runtime.setCursorVisible(false);
    document.body.classList.add("is-unfolding");

    // Phase 2: curtains retract, hero eases in from "behind" them
    window.setTimeout(() => {
      document.body.classList.remove("is-unfolding");
      document.body.classList.add("is-entering");
    }, 380);

    // Phase 3: complete entry (380ms key turn + 900ms curtain transition)
    window.setTimeout(completeEntryTransition, 1280);
  };

  // ── user-initiated entry (scroll / touch swipe) ────────────────────
  entryScreen?.addEventListener("wheel", (event) => {
    if (runtime.isEntered() || Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    enterSite();
  }, { passive: false });

  let entryScrollTouchY = 0;
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

  // ── pixel avatar: reset to entry ───────────────────────────────────
  document.getElementById("pixel-avatar")?.addEventListener("click", () => {
    if (!document.body.classList.contains("has-entered")) return;
    runtime.closeWorkGallery?.();
    window.dispatchEvent(new CustomEvent("lucian:return-to-entry"));
    document.body.classList.remove("has-entered", "is-entering", "is-unfolding", "is-entry-scroll-locked");
    runtime.setEntered(false);
    entryTransitionLocked = false;
    window.clearTimeout(entryTransitionReleaseTimer);
    resetHeroSequenceState({ resetScroll: true });
    requestAnimationFrame(forceScrollTop);
    entryScreen?.style.removeProperty("display");
    window.LucianEntryKey?.replay?.();
  });

  // ── lock scroll during transition ──────────────────────────────────
  window.addEventListener("wheel", (event) => {
    if (!entryTransitionLocked) return;
    event.preventDefault();
    forceScrollTop();
    scheduleEntryTransitionRelease(260);
  }, { passive: false, capture: true });

  window.addEventListener("touchmove", (event) => {
    if (!entryTransitionLocked) return;
    event.preventDefault();
    forceScrollTop();
    scheduleEntryTransitionRelease(260);
  }, { passive: false, capture: true });

  window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("has-entered")) return;
    resetHeroSequenceState({ resetScroll: true });
  });

  // ── auto-enter when 3D key progress reaches 100% ───────────────────
  window.addEventListener("entry-key-ready", () => {
    if (!runtime.isEntered()) enterSite();
  });
})();
