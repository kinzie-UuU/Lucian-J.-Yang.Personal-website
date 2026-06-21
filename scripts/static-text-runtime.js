window.LucianStaticText = {
  update(currentLang, { langButtons = [] } = {}) {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const value = window.i18n?.[currentLang]?.[key];
      if (!value) return;

      const pillLabel = node.querySelector?.(".label-stack");
      if (pillLabel) {
        pillLabel.querySelectorAll(".pill-label").forEach((span) => {
          span.textContent = value;
        });
        node.setAttribute("aria-label", value);
      } else {
        node.textContent = value;
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === currentLang);
      if (button.dataset.lang === "zh") button.textContent = "\u4e2d";
      if (button.dataset.lang === "en") button.textContent = "EN";
    });
  },
};
