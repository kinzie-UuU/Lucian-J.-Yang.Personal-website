(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const homeLinks = Array.from(document.querySelectorAll('a[href="#top"]'));
  const heroFocusEnter = document.querySelector("#hero-focus-enter");

  homeLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!runtime.isEntered()) return;
      runtime.releaseOrderedLayout();
      runtime.resetCurrentHeroCard();
    });
  });

  heroFocusEnter?.addEventListener("click", () => {
    document.querySelector("#works")?.scrollIntoView({
      behavior: runtime.reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
})();

