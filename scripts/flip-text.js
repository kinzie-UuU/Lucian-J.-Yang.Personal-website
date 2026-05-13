(() => {
  const splitWord = (word) => {
    const text = word.textContent || "";
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized) return;
    if (word.dataset.flipSource === normalized && word.querySelector(".flip-char")) return;

    const fragment = document.createDocumentFragment();
    let index = 0;

    Array.from(normalized).forEach((char) => {
      if (/\s/.test(char)) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }

      const span = document.createElement("span");
      span.className = "flip-char";
      span.textContent = char;
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--flip-index", String(index));
      fragment.appendChild(span);
      index += 1;
    });

    word.textContent = "";
    word.appendChild(fragment);
    word.classList.add("flip-word");
    word.dataset.flipSource = normalized;
    word.setAttribute("aria-label", normalized);
  };

  const refresh = () => {
    document.querySelectorAll(".js-flip-text").forEach((root) => {
      if (root.matches("[data-i18n]")) {
        splitWord(root);
      }
      root.querySelectorAll("[data-i18n]").forEach(splitWord);
    });
  };

  window.LucianFlipText = { refresh };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      refresh();
    }, { once: true });
  } else {
    refresh();
  }
})();
