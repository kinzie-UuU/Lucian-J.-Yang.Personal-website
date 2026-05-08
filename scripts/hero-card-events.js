(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const heroCards = Array.from(document.querySelectorAll(".hero-card"));

  heroCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      runtime.activateHeroCard(card, { sound: true });
    });

    card.addEventListener("focus", () => {
      runtime.activateHeroCard(card);
    });

    card.addEventListener("click", (event) => {
      runtime.enterHeroProject(card, event);
    });
  });
})();

