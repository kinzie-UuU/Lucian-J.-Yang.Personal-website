(() => {
  const entryScreen = document.querySelector("#entry-screen");
  if (!entryScreen) return;

  const marqueeTrack = document.getElementById("entry-year-marquee-track");
  const progressEl = document.getElementById("entry-progress");
  const progressFill = document.getElementById("entry-progress-fill");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const marqueeDuration = Math.max(0, Number.parseInt(marqueeTrack?.dataset.marqueeMs || "3000", 10));
  const entryDelay = Math.max(600, Number.parseInt(entryScreen.dataset.autoEnterDelay || "2400", 10));
  const marqueeResolvers = [];

  let disposed = false;
  let entryReadyDispatched = false;
  let entryMarqueeComplete = !marqueeTrack || reducedMotion;
  let entryMarqueeTimer = 0;
  let progressRaf = 0;
  let progressRun = 0;

  const setProgress = (pct) => {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressEl) progressEl.textContent = `[${clamped}%]`;
    if (progressFill) progressFill.style.width = `${clamped}%`;
  };

  const completeEntryMarquee = () => {
    if (entryMarqueeComplete) return;
    entryMarqueeComplete = true;
    window.clearTimeout(entryMarqueeTimer);
    document.body.classList.add("entry-marquee-complete");
    while (marqueeResolvers.length) marqueeResolvers.shift()?.();
  };

  const waitForEntryMarquee = () => (
    entryMarqueeComplete
      ? Promise.resolve()
      : new Promise((resolve) => marqueeResolvers.push(resolve))
  );

  const resetEntryMarquee = () => {
    window.clearTimeout(entryMarqueeTimer);
    if (!marqueeTrack || reducedMotion) {
      entryMarqueeComplete = true;
      document.body.classList.add("entry-marquee-complete");
      return;
    }

    entryMarqueeComplete = false;
    document.body.classList.remove("entry-marquee-complete");
    marqueeTrack.classList.remove("is-running");
    void marqueeTrack.offsetWidth;
    marqueeTrack.classList.add("is-running");
    entryMarqueeTimer = window.setTimeout(completeEntryMarquee, marqueeDuration + 360);
  };

  const signalEntryReady = () => {
    if (entryReadyDispatched) return;
    entryReadyDispatched = true;
    waitForEntryMarquee().then(() => {
      if (disposed) return;
      document.body.classList.add("entry-key-ready");
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("entry-key-ready"));
      });
    });
  };

  const cancelProgress = () => {
    progressRun += 1;
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = 0;
  };

  const playProgress = () => {
    if (disposed) return;
    cancelProgress();
    entryReadyDispatched = false;
    document.body.classList.remove("entry-key-ready");
    setProgress(0);
    resetEntryMarquee();

    const run = ++progressRun;
    const startedAt = performance.now();

    const tick = () => {
      if (disposed || run !== progressRun) return;
      if (document.body.classList.contains("has-entered")) {
        progressRaf = 0;
        return;
      }

      const pct = ((performance.now() - startedAt) / entryDelay) * 100;
      setProgress(pct);

      if (pct < 100) {
        progressRaf = requestAnimationFrame(tick);
        return;
      }

      progressRaf = 0;
      signalEntryReady();
    };

    progressRaf = requestAnimationFrame(tick);

    // Fallback: RAF can be paused in background tabs. Fire signalEntryReady
    // via setTimeout so the entry always completes even if the user opens the
    // page while the tab is not in the foreground.
    window.setTimeout(() => {
      if (disposed || run !== progressRun) return;
      setProgress(100);
      signalEntryReady();
    }, entryDelay + marqueeDuration + 500);
  };

  marqueeTrack?.addEventListener("animationend", completeEntryMarquee);

  window.LucianEntryKey = {
    replay: playProgress,
    reset: playProgress,
    unlock() {
      setProgress(100);
      completeEntryMarquee();
    },
    isReady() {
      return true;
    },
  };

  playProgress();

  window.addEventListener("pagehide", () => {
    disposed = true;
    cancelProgress();
    window.clearTimeout(entryMarqueeTimer);
  }, { once: true });
})();