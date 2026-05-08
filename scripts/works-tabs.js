(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const worksTabs = Array.from(document.querySelectorAll(".works-tab"));

  worksTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      runtime.selectWorkTab(tab.dataset.workTarget);
    });
  });
})();

