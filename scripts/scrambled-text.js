(() => {
  const scrambleTextChars = ".:·_";
  const scrambleTextRadius = 112;
  const scrambleTextDuration = 780;
  const scrambleTextSpeed = 0.48;
  let cleanups = [];

  const restore = () => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
  };

  const splitNode = (node) => {
    const children = Array.from(node.childNodes).map((child) => child.cloneNode(true));
    const sourceText = node.textContent || "";
    if (!sourceText.trim()) return [];

    node.replaceChildren();
    node.classList.add("scrambled-text");

    const chars = [];
    const appendText = (target, text) => {
      Array.from(text).forEach((char) => {
        if (/\s/.test(char)) {
          target.appendChild(document.createTextNode(char));
          return;
        }

        const span = document.createElement("span");
        span.className = "scramble-char";
        span.textContent = char;
        span.dataset.content = char;
        span.dataset.scrambleUntil = "0";
        target.appendChild(span);
        chars.push(span);
      });
    };

    const rebuild = (sourceNode, target) => {
      if (sourceNode.nodeType === Node.TEXT_NODE) {
        appendText(target, sourceNode.textContent || "");
        return;
      }

      if (sourceNode.nodeType !== Node.ELEMENT_NODE) return;

      const clone = sourceNode.cloneNode(false);
      target.appendChild(clone);
      sourceNode.childNodes.forEach((child) => rebuild(child, clone));
    };

    children.forEach((child) => rebuild(child, node));

    return chars;
  };

  const init = () => {
    restore();
    if (window.LucianRuntime?.reducedMotion) return;

    document.querySelectorAll(".js-scrambled-text").forEach((node) => {
      const source = node.innerHTML;
      const chars = splitNode(node);
      if (!chars.length) return;

      let raf = 0;

      const render = () => {
        raf = 0;
        const now = performance.now();
        let hasActive = false;

        chars.forEach((charNode) => {
          const endAt = Number(charNode.dataset.scrambleUntil || 0);
          if (endAt > now) {
            hasActive = true;
            charNode.textContent = scrambleTextChars[Math.floor(Math.random() * scrambleTextChars.length)];
            return;
          }
          charNode.textContent = charNode.dataset.content || "";
        });

        if (hasActive) {
          const delay = Math.max(1, 1000 / (24 + scrambleTextSpeed * 48));
          window.setTimeout(() => {
            if (!raf) raf = requestAnimationFrame(render);
          }, delay);
        }
      };

      const handleMove = (event) => {
        const now = performance.now();
        chars.forEach((charNode) => {
          const rect = charNode.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);

          if (distance >= scrambleTextRadius) return;
          const strength = 1 - distance / scrambleTextRadius;
          const endAt = now + scrambleTextDuration * strength;
          charNode.dataset.scrambleUntil = String(Math.max(Number(charNode.dataset.scrambleUntil || 0), endAt));
        });

        if (!raf) raf = requestAnimationFrame(render);
      };

      node.addEventListener("pointermove", handleMove);
      cleanups.push(() => {
        if (raf) cancelAnimationFrame(raf);
        node.removeEventListener("pointermove", handleMove);
        node.classList.remove("scrambled-text");
        node.innerHTML = source;
      });
    });
  };

  window.LucianScrambledText = { init, restore };
  init();
})();
