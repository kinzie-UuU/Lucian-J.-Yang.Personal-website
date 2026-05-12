(() => {
  const runtime = window.LucianRuntime;
  const band = document.querySelector(".clients-title-band");
  const title = band?.querySelector(".clients-title-lockup");
  const floatLayer = band?.querySelector("#clients-title-float");
  if (!band || !title || runtime?.reducedMotion) return;
  floatLayer?.replaceChildren();

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
  band.addEventListener("pointermove", updateCharacters, { passive: true });
  band.addEventListener("pointerleave", resetCharacters, { passive: true });
})();
