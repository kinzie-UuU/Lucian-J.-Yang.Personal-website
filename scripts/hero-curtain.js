/**
 * Hero → About curtain — sticky lock + jelly snap.
 *
 * .hero-section reserves 160vh; .hero-stage is sticky (100vh) and stays
 * pinned across the spacer. Once the user has scrolled ~25vh into the
 * spacer (≈ the second wheel tick on a typical mouse), the whole black
 * curtain snaps up in one shot via the CSS jelly transition. Continuing
 * to scroll releases the sticky and reveals the portrait section beneath.
 */
(() => {
  const stage = document.querySelector(".hero-stage");
  const heroSection = document.querySelector(".hero-section");
  if (!stage || !heroSection) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raised = false;

  // Threshold in viewport heights — fire the curtain shortly after the
  // user starts scrolling past hero. With hero-section's spacer at 22vh,
  // a 10vh trigger leaves 12vh for the user to keep scrolling while the
  // curtain finishes its 1.32s rise — by the time sticky releases, the
  // portrait section is at the viewport top with no gap.
  const TRIGGER = 0.10;
  // Hysteresis — only reset once user has scrolled clearly back above the
  // trigger, so micro-jitter at the threshold doesn't replay the snap.
  const RESET = 0.02;

  const update = () => {
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const past = (-rect.top) / vh;

    if (reducedMotion) {
      stage.classList.toggle("is-curtain-down", past > 0.05);
      return;
    }

    if (!raised && past > TRIGGER) {
      raised = true;
      stage.classList.add("is-curtain-down");
    } else if (raised && past < RESET) {
      raised = false;
      stage.classList.remove("is-curtain-down");
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("pagehide", () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", update);
  }, { once: true });
})();
