(() => {
  const heroSteps = window.LucianRuntime?.heroSteps;
  if (!heroSteps) return;

  window.addEventListener(
    "wheel",
    (event) => {
      const deltaY = event.deltaY;
      if (!heroSteps.isActive(deltaY)) return;
      event.preventDefault();

      const threshold = deltaY > 0
        ? heroSteps.wheelStepThreshold
        : heroSteps.wheelBackThreshold;
      if (Math.abs(deltaY) < threshold) return;

      heroSteps.step(deltaY > 0);
    },
    { passive: false }
  );

  let touchStart = null;

  heroSteps.stage?.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    { passive: true }
  );

  heroSteps.stage?.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      const dy = touch && touchStart ? touch.clientY - touchStart.y : 0;
      if (heroSteps.isActive(-dy)) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  heroSteps.stage?.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;

      if (Math.abs(dy) < heroSteps.touchStepThreshold || Math.abs(dy) < Math.abs(dx)) return;
      heroSteps.step(dy < 0);
    },
    { passive: true }
  );
})();
