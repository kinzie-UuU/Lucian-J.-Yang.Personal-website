window.initHeroFocusRuntime = ({ getCurrentLang }) => {
  const worksTabs = Array.from(document.querySelectorAll(".works-tab"));
  const panel = document.querySelector("#hero-focus-panel");
  const kicker = document.querySelector("#hero-focus-kicker");
  const title = document.querySelector("#hero-focus-title");
  const desc = document.querySelector("#hero-focus-desc");
  const metaA = document.querySelector("#hero-focus-meta-a");
  const metaB = document.querySelector("#hero-focus-meta-b");
  const enter = document.querySelector("#hero-focus-enter");
  let selectedWorkKey = "oem";

  const refresh = (workKey = selectedWorkKey) => {
    const lang = getCurrentLang();
    const data = window.worksData?.[workKey];
    if (!data) return;

    selectedWorkKey = workKey;
    if (kicker) kicker.textContent = window.i18n?.[lang]?.focus_kicker || "";
    if (title) title.textContent = data.title[lang];
    if (desc) desc.textContent = data.description[lang];
    if (metaA) metaA.textContent = data.focus[lang];
    if (metaB) metaB.textContent = data.value[lang];
    if (enter) enter.textContent = window.i18n?.[lang]?.hero_action_works || "";

    worksTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.workTarget === selectedWorkKey);
    });
  };

  refresh(selectedWorkKey);

  return {
    panel,
    refresh,
    select(workKey) {
      refresh(workKey);
    },
    getSelectedWorkKey() {
      return selectedWorkKey;
    },
  };
};
