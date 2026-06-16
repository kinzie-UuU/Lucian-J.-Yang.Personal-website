(() => {
  const runtime = window.LucianRuntime;
  const cursor = document.querySelector("#precision-cursor");
  if (!runtime || !cursor) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const enabled = finePointer && !prefersReducedMotion;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let frame = 0;
  let visible = false;

  const isEntryTransitioning = () => (
    document.body.classList.contains("is-unfolding")
    || document.body.classList.contains("is-entering")
  );

  const hideCursor = () => {
    if (!visible) return;
    visible = false;
    runtime.setCursorVisible(false);
    runtime.clearFieldPointer();
  };

  const updateHeroPointer = () => {
    const heroStage = runtime.heroStage;
    if (!heroStage || !document.body.classList.contains("has-entered")) {
      runtime.clearHeroPointerState();
      return;
    }

    const rect = heroStage.getBoundingClientRect();
    const insideHero =
      x >= rect.left
      && x <= rect.right
      && y >= rect.top
      && y <= rect.bottom;

    if (!insideHero) {
      runtime.clearHeroPointerState();
      return;
    }

    runtime.setFieldPointer({
      x: (x - rect.left) / rect.width,
      y: (y - rect.top) / rect.height,
      active: true,
    });
  };

  const flushPointer = () => {
    frame = 0;
    if (!enabled || isEntryTransitioning()) {
      hideCursor();
      return;
    }

    runtime.updatePrecisionCursor(x, y);
    const shouldShow = document.body.classList.contains("has-entered");
    if (shouldShow !== visible) {
      visible = shouldShow;
      runtime.setCursorVisible(shouldShow);
    }

    updateHeroPointer();
  };

  const requestPointerFlush = () => {
    if (frame) return;
    frame = requestAnimationFrame(flushPointer);
  };

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      hideCursor();
      return;
    }

    x = event.clientX;
    y = event.clientY;
    requestPointerFlush();
  }, { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    x = event.clientX;
    y = event.clientY;
    cursor.classList.add("is-pressing");
    requestPointerFlush();
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    cursor.classList.remove("is-pressing");
  }, { passive: true });

  document.addEventListener("pointerleave", hideCursor);

  window.addEventListener("scroll", () => {
    if (!visible) return;
    requestPointerFlush();
  }, { passive: true });

  const bodyClassObserver = new MutationObserver(requestPointerFlush);
  bodyClassObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();
