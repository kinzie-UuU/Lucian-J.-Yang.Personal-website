(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const langButtons = Array.from(document.querySelectorAll(".lang-button"));

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.switchLanguage(button.dataset.lang);
      runtime.playUiTone("click");
    });
  });
})();

