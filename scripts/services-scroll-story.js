(() => {
  const section = document.querySelector(".services-scroll-story");
  const accordionItems = Array.from(section?.querySelectorAll(".services-accordion-item") || []);
  if (!section || !accordionItems.length) return;

  let accordionActiveIndex = -1;

  const currentLang = () => (
    document.documentElement.lang === "en"
      || window.LucianRuntime?.getCurrentLang?.() === "en"
      || window.LucianLanguageRuntime?.getCurrentLang?.() === "en"
  ) ? "en" : "zh";

  const textFor = (key) => window.i18n?.[currentLang()]?.[key] || "";

  const setAccordionActive = (index) => {
    const nextIndex = Math.max(0, Math.min(accordionItems.length - 1, Math.round(index)));
    if (nextIndex === accordionActiveIndex) return;
    accordionActiveIndex = nextIndex;
    accordionItems.forEach((item, itemIndex) => {
      const isActive = itemIndex === nextIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  };

  const rebuildServicesStoryText = () => {
    accordionItems.forEach((item) => {
      const label = item.querySelector(".services-accordion-label");
      const kicker = item.querySelector(".services-accordion-kicker");
      const cardTitle = item.querySelector(".services-accordion-title");
      const cardBody = item.querySelector(".services-accordion-body");
      const titleText = textFor(item.dataset.serviceTitle);
      const bodyText = textFor(item.dataset.serviceText);
      const itemIndex = Number(item.dataset.accordionIndex || 0);

      if (label && titleText) label.textContent = titleText;
      if (kicker) kicker.textContent = `${String(itemIndex + 1).padStart(2, "0")} / ${String(accordionItems.length).padStart(2, "0")}`;
      if (cardTitle && titleText) cardTitle.textContent = titleText;
      if (cardBody && bodyText) cardBody.textContent = bodyText;
      if (titleText) item.setAttribute("aria-label", titleText);
    });
  };

  window.rebuildServicesStoryText = rebuildServicesStoryText;
  window.LucianServicesStory = {
    refresh: rebuildServicesStoryText,
    reset: () => setAccordionActive(0),
    start: () => setAccordionActive(0),
  };

  rebuildServicesStoryText();
  setAccordionActive(0);

  accordionItems.forEach((item, index) => {
    item.addEventListener("pointerenter", () => setAccordionActive(index));
    item.addEventListener("focus", () => setAccordionActive(index));
    item.addEventListener("click", () => setAccordionActive(index));
  });

  window.addEventListener("lucian:site-entered", rebuildServicesStoryText);
})();
