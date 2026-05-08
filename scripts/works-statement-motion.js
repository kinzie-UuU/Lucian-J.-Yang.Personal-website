(() => {
  const section = document.querySelector(".works-section");
  if (!section) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * value * (value * (value * 6 - 15) + 10);
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const raw = (window.innerHeight * 1.42 - rect.top) / (window.innerHeight * 0.92);
    section.style.setProperty("--works-enter", smooth(clamp01(raw)).toFixed(4));
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();

