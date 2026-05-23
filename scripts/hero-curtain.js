/**
 * Hero -> About curtain handoff.
 *
 * The Hero remains a full-screen sticky scene. Once the user starts scrolling
 * past it, the black sheet covers the viewport, input is briefly locked, and
 * the page lands on the About visual entry point instead of making the user
 * scroll through the Hero spacer manually.
 */
(() => {
  const stage = document.querySelector(".hero-stage");
  const heroSection = document.querySelector(".hero-section");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  if (!stage || !heroSection || !aboutSection) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TRIGGER = 0.10;
  const RESET = 0.02;
  const CURTAIN_DURATION = 1550;

  let raised = false;
  let handoffActive = false;
  let handoffComplete = false;
  let handoffTimer = 0;
  let wasReadyForHandoff = false;
  let postEntryGuardUntil = 0;
  let settleGuardUntil = 0;
  let settleTargetY = 0;

  const setHandoffClass = (active) => {
    document.documentElement.classList.toggle("hero-about-handoff-active", active);
    document.body.classList.toggle("hero-about-handoff-active", active);
  };

  const setSettledClass = (settled) => {
    document.documentElement.classList.toggle("hero-about-handoff-settled", settled);
    document.body.classList.toggle("hero-about-handoff-settled", settled);
  };

  const readHeroPast = () => {
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return (-rect.top) / vh;
  };

  const isHeroHandoffZone = () => {
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.08 && rect.bottom > vh * 0.35;
  };

  const targetAboutEntryTop = () => {
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
    postEntryGuardUntil = performance.now() + 820;
  };

  const isPostEntryGuardActive = () => performance.now() < postEntryGuardUntil;
  const isSettleGuardActive = () => performance.now() < settleGuardUntil;

  const settleHeroStart = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const settleAboutEntry = () => {
    if (!settleTargetY) return;
    window.scrollTo({ top: settleTargetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = settleTargetY;
    document.body.scrollTop = settleTargetY;
  };

  const syncReadyState = () => {
    const ready = isHeroReadyForHandoff();
    if (ready && !wasReadyForHandoff) startPostEntryGuard();
    wasReadyForHandoff = ready;
    return ready;
  };

  const finishHandoff = () => {
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
      handoffActive = false;
      handoffComplete = true;
      window.dispatchEvent(new CustomEvent("lucian:hero-about-handoff", {
        detail: { complete: true, targetY },
      }));
    });
  };

  const startHandoff = () => {
    if (handoffActive || handoffComplete || isBlockedByProgrammaticTransition()) return;
    handoffActive = true;
    raised = true;
    setHandoffClass(true);
    setSettledClass(false);
    stage.classList.add("is-curtain-down");
    window.clearTimeout(handoffTimer);

    if (reducedMotion) {
      finishHandoff();
      return;
    }

    handoffTimer = window.setTimeout(finishHandoff, CURTAIN_DURATION);
  };

  const resetHandoff = () => {
    window.clearTimeout(handoffTimer);
    handoffActive = false;
    handoffComplete = false;
    raised = false;
    settleGuardUntil = 0;
    settleTargetY = 0;
    setHandoffClass(false);
    setSettledClass(false);
    stage.classList.remove("is-curtain-down");
  };

  const update = () => {
    if (!syncReadyState()) return;
    if (isSettleGuardActive()) {
      if (Math.abs(window.scrollY - settleTargetY) > 2) settleAboutEntry();
      return;
    }
    if (isPostEntryGuardActive()) {
      if (isBlockedByProgrammaticTransition()) return;
      if (readHeroPast() > RESET) settleHeroStart();
      return;
    }
    if (isBlockedByProgrammaticTransition() && !handoffActive) return;
    const past = readHeroPast();

    if (reducedMotion) {
      if (past > 0.05) startHandoff();
      else if (past < RESET) resetHandoff();
      return;
    }

    const canStartHandoff = isHeroHandoffZone();

    if (!raised && past > TRIGGER && canStartHandoff) startHandoff();
    else if (!canStartHandoff && !handoffActive) setHandoffClass(false);
    else if ((raised || handoffComplete || handoffActive) && past < RESET) resetHandoff();
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

  const blockInputDuringHandoff = (event) => {
    if (!handoffActive && !isPostEntryGuardActive() && !isSettleGuardActive()) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
    else if (!handoffActive) requestAnimationFrame(settleHeroStart);
  };

  const blockKeysDuringHandoff = (event) => {
    if ((!handoffActive && !isSettleGuardActive()) || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
  };

  update();
  new MutationObserver(syncReadyState).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("wheel", blockInputDuringHandoff, { passive: false, capture: true });
  window.addEventListener("touchmove", blockInputDuringHandoff, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeysDuringHandoff, { capture: true });
  window.addEventListener("pagehide", () => {
    window.clearTimeout(handoffTimer);
    setHandoffClass(false);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", update);
  }, { once: true });
})();
