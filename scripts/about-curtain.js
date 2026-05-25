/**
 * About -> Services compatibility cleanup.
 *
 * The About and Services sections now meet through natural page scrolling.
 * Keep this lightweight bridge only to clear legacy handoff classes that may
 * be left behind by cached pages, navigation restores, or older sessions.
 */
(() => {
  const stage = document.querySelector(".portrait-canvas");
  const root = document.documentElement;
  const body = document.body;

  if (!root || !body) return;

  const bridgeClasses = [
    "about-services-handoff-active",
    "about-services-bridge-active",
    "about-services-bridge-visual-visible",
    "about-services-bridge-title-visible",
    "about-services-bridge-releasing",
  ];

  const clearLegacyBridgeState = () => {
    stage?.classList.remove("is-about-curtain-down");
    root.classList.remove(...bridgeClasses);
    body.classList.remove(...bridgeClasses);
  };

  clearLegacyBridgeState();

  window.addEventListener("pageshow", clearLegacyBridgeState);
  window.addEventListener("lucian:programmatic-section-jump", clearLegacyBridgeState);
  window.addEventListener("lucian:site-entered", clearLegacyBridgeState);
  window.addEventListener("pagehide", clearLegacyBridgeState, { once: true });
})();
