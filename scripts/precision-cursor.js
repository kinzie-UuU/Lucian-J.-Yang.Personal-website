(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      runtime.setCursorVisible(false);
      runtime.clearFieldPointer();
      return;
    }

    runtime.updatePrecisionCursor(event.clientX, event.clientY);
    const entryRect = runtime.entryScreen?.getBoundingClientRect();
    const insideEntry = !!entryRect &&
      entryRect.bottom > 0 &&
      event.clientX >= entryRect.left &&
      event.clientX <= entryRect.right &&
      event.clientY >= entryRect.top &&
      event.clientY <= entryRect.bottom;
    runtime.setCursorVisible(insideEntry);

    const heroStage = runtime.heroStage;
    if (!heroStage) return;

    const rect = heroStage.getBoundingClientRect();
    const insideHero =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (insideHero) {
      runtime.setFieldPointer({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      });
    } else {
      runtime.clearHeroPointerState();
    }
  });

  document.addEventListener("pointerleave", () => {
    runtime.setCursorVisible(false);
    runtime.clearFieldPointer();
  });
})();

