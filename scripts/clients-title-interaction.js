(() => {
  const runtime = window.LucianRuntime;
  const band = document.querySelector(".clients-title-band");
  const title = band?.querySelector(".clients-title-lockup");
  const floatLayer = band?.querySelector("#clients-title-float");
  if (!band || !title || !floatLayer || runtime?.reducedMotion) return;

  const floatWords = [
    "packaging",
    "brand",
    "design",
    "gift box",
    "OEM",
    "series",
    "structure",
    "visual",
    "retail",
    "proposal",
    "material",
    "finish",
  ];
  const maxVisible = 7;
  let visibleCount = 0;

  const wrapTextNode = (node) => {
    const text = node.textContent.replace(/\s+/g, " ");
    if (!text.trim()) return null;

    const fragment = document.createDocumentFragment();
    Array.from(text).forEach((char) => {
      const span = document.createElement("span");
      span.className = "clients-title-char";
      span.textContent = char === " " ? "\u00a0" : char;
      fragment.appendChild(span);
    });
    return fragment;
  };

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return wrapTextNode(node);
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const clone = node.cloneNode(false);
    Array.from(node.childNodes).forEach((child) => {
      const processed = processNode(child);
      if (processed) clone.appendChild(processed);
    });
    return clone;
  };

  const prepareTitle = () => {
    const fragment = document.createDocumentFragment();
    Array.from(title.childNodes).forEach((node) => {
      const processed = processNode(node);
      if (processed) fragment.appendChild(processed);
    });
    title.replaceChildren(fragment);
  };

  const createFloatWord = () => {
    if (visibleCount >= maxVisible) return;

    const bandRect = band.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    if (bandRect.width < 20 || bandRect.height < 20) return;

    const safe = {
      left: titleRect.left - bandRect.left - titleRect.width * 0.12,
      right: titleRect.right - bandRect.left + titleRect.width * 0.12,
      top: titleRect.top - bandRect.top - titleRect.height * 0.22,
      bottom: titleRect.bottom - bandRect.top + titleRect.height * 0.22,
    };
    const padding = Math.min(82, Math.max(22, bandRect.width * 0.08));
    let x = padding;
    let y = padding;

    for (let attempt = 0; attempt < 14; attempt += 1) {
      x = Math.random() * Math.max(1, bandRect.width - padding * 2) + padding;
      y = Math.random() * Math.max(1, bandRect.height - padding * 2) + padding;
      const isInsideTitle = x > safe.left && x < safe.right && y > safe.top && y < safe.bottom;
      if (!isInsideTitle) break;
    }

    const item = document.createElement("span");
    item.className = "clients-title-float-item";
    item.textContent = floatWords[Math.floor(Math.random() * floatWords.length)];
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.setProperty("--float-rotate", `${((Math.random() - 0.5) * 10).toFixed(2)}deg`);
    item.style.setProperty("--float-drift-x", `${((Math.random() - 0.5) * 18).toFixed(2)}px`);
    floatLayer.appendChild(item);
    visibleCount += 1;

    window.setTimeout(() => {
      item.remove();
      visibleCount = Math.max(0, visibleCount - 1);
    }, 5900);
  };

  const updateCharacters = (event) => {
    const chars = title.querySelectorAll(".clients-title-char");
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;
      const dx = event.clientX - charX;
      const dy = event.clientY - charY;
      const distance = Math.hypot(dx, dy);
      const radius = 82;

      if (distance > radius || distance === 0) {
        char.style.transform = "";
        char.style.filter = "";
        char.style.color = "";
        return;
      }

      const power = (radius - distance) / radius;
      const moveX = (dx / distance) * power * -18;
      const moveY = (dy / distance) * power * -18;
      char.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) scale(${(1 + power * 0.18).toFixed(3)})`;
      char.style.filter = `blur(${(power * 2.2).toFixed(2)}px)`;
      char.style.color = "#ff6268";
    });
  };

  const resetCharacters = () => {
    title.querySelectorAll(".clients-title-char").forEach((char) => {
      char.style.transform = "";
      char.style.filter = "";
      char.style.color = "";
    });
  };

  prepareTitle();
  for (let index = 0; index < 4; index += 1) {
    window.setTimeout(createFloatWord, index * 720);
  }
  window.setInterval(createFloatWord, 1250);
  band.addEventListener("pointermove", updateCharacters, { passive: true });
  band.addEventListener("pointerleave", resetCharacters, { passive: true });
})();
