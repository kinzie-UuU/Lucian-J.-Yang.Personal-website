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

  const initAutoFlip = () => {
    const targets = document.querySelectorAll(".contact-title.js-flip-text");
    if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add("is-flipping");
        window.setTimeout(() => target.classList.remove("is-flipping"), 1800);
      });
    }, { threshold: 0.55 });

    targets.forEach((target) => observer.observe(target));
  };

  window.LucianFlipText = { refresh };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      refresh();
      initAutoFlip();
    }, { once: true });
  } else {
    refresh();
    initAutoFlip();
  }
})();
