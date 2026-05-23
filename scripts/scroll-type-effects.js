(() => {
  const runtime = window.LucianRuntime;
  if (!runtime || runtime.reducedMotion) return;

  const SCROLL_TYPE_SELECTOR = [
    ".js-scroll-type-disabled",
  ].join(",");

  const SCROLL_TYPE_SCOPE_SELECTOR = [
    "#services",
    "#works",
    "#contact",
    ".clients-section",
    ".work-gallery",
  ].join(",");

  const shouldUseScrollTypeEffect = (node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (!node.closest(SCROLL_TYPE_SCOPE_SELECTOR)) return false;
    if (node.closest("svg, canvas, input, textarea, select, option, script, style")) return false;
    if (node.matches(".toggle-icon, .site-svg-filters *, .entry-code-pixels *, .entry-dieline *")) return false;

    const text = node.textContent?.replace(/\s+/g, " ").trim() || "";
    return text.length > 0;
  };

  const splitScrollTypeText = (node) => {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;
    if (node.dataset.typeSource === text && node.querySelector(".scroll-type-glyph")) return;

    const fragment = document.createDocumentFragment();
    let glyphIndex = 0;

    Array.from(text).forEach((char) => {
      if (/\s/.test(char)) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }

      const glyph = document.createElement("span");
      glyph.className = "scroll-type-glyph";
      glyph.textContent = char;
      glyph.style.setProperty("--glyph-index", String(glyphIndex));
      fragment.appendChild(glyph);
      glyphIndex += 1;
    });

    node.textContent = "";
    node.appendChild(fragment);
    node.dataset.typeSource = text;
    node.style.setProperty("--glyph-count", String(Math.max(glyphIndex, 1)));
  };

  let scrollTypeLastY = window.scrollY;
  let scrollTypeDirection = 1;
  let scrollTypeRaf = 0;
  let scrollTypeItems = [];
  let scrollSceneItems = [];

  const collectScrollTypeItems = () => {
    scrollTypeItems = Array.from(document.querySelectorAll(".scroll-type-glyph")).map((glyph) => ({
      glyph,
      parent: glyph.closest(".scroll-type-text"),
      index: Number(glyph.style.getPropertyValue("--glyph-index") || 0),
    }));
  };

  const syncScrollTypeText = (root = document) => {
    root.querySelectorAll?.(SCROLL_TYPE_SELECTOR).forEach((node) => {
      if (!shouldUseScrollTypeEffect(node)) {
        node.classList.remove("scroll-type-text");
        delete node.dataset.typeSource;
        return;
      }
      node.classList.add("scroll-type-text");
      splitScrollTypeText(node);
    });
    collectScrollTypeItems();
  };

  const collectScrollScenes = () => {
    scrollSceneItems = Array.from(document.querySelectorAll("#about, #works, #contact, .clients-section"));
  };

  const updateScrollScenes = () => {
    const vh = window.innerHeight || 1;

    scrollSceneItems.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height * 0.5;
      const distance = Math.abs(center - vh * 0.5);
      const range = Math.max(vh * 0.62, rect.height * 0.42);
      const rawActive = 1 - Math.min(1, distance / range);
      const active = rawActive * rawActive * (3 - 2 * rawActive);
      const direction = center > vh * 0.5 ? 1 : -1;
      const y = (1 - active) * 28 * direction;
      const blur = 0;
      const scale = 0.992 + active * 0.008;

      section.style.setProperty("--scene-active", active.toFixed(4));
      section.style.setProperty("--scene-y", `${y.toFixed(2)}px`);
      section.style.setProperty("--scene-blur", `${blur.toFixed(2)}px`);
      section.style.setProperty("--scene-scale", scale.toFixed(4));
    });
  };

  const updateScrollTypeItems = () => {
    scrollTypeRaf = 0;
    updateScrollScenes();
    const vh = window.innerHeight || 1;
    const focusLine = vh * 0.48;
    const focusRange = Math.max(260, vh * 0.42);
    const measured = scrollTypeItems.map((item) => ({
      ...item,
      rect: item.glyph.getBoundingClientRect(),
      parentRect: item.parent?.getBoundingClientRect(),
    }));

    measured.forEach(({ glyph, parent, index, rect, parentRect }) => {
      if (!parent) return;
      const isHeroDisplay = parent.matches(".about-heading, .contact-headline");
      const isParagraph = parent.matches(".about-lead, .about-detail");
      const center = rect.top + rect.height * 0.5;
      const distance = Math.abs(center - focusLine);
      const raw = 1 - Math.min(1, distance / focusRange);
      const viewportFocus = raw * raw * (3 - 2 * raw);
      const count = Number(parent.style.getPropertyValue("--glyph-count") || 1);
      const glyphOrder = count <= 1 ? 0 : index / (count - 1);
      const parentPhase = Math.max(-0.2, Math.min(1.2, (focusLine - parentRect.top) / Math.max(parentRect.height, 1)));
      const directionBias = scrollTypeDirection < 0 ? -0.035 : 0.035;
      const scanPhase = parentPhase + directionBias;
      const smooth = (value) => value * value * (3 - 2 * value);
      const enterWindow = isParagraph ? 0.32 : 0.26;
      const exitStart = isParagraph ? 0.9 : 0.82;
      const exitWindow = isParagraph ? 0.28 : 0.22;
      const enter = smooth(Math.max(0, Math.min(1, (scanPhase - glyphOrder * 0.38) / enterWindow)));
      const exit = smooth(Math.max(0, Math.min(1, (scanPhase - exitStart - glyphOrder * 0.12) / exitWindow)));
      const amount = Math.max(0, Math.min(1, enter * (1 - exit)));
      const focus = Math.max(viewportFocus * 0.58, amount);
      const baseMaxBlur = isHeroDisplay ? 11 : isWorksStatementTitle ? 3.6 : isParagraph ? 2.6 : 6;
      const exitBlur = isHeroDisplay ? 7 : isWorksStatementTitle ? 1.8 : isParagraph ? 1.4 : 4;
      const maxY = isHeroDisplay ? 14 : isWorksStatementTitle ? 5 : isParagraph ? 3.5 : 7;
      const enteringFromBelow = center > focusLine ? 1 : -1;
      const y = ((1 - enter) * maxY - exit * maxY * 0.7) * enteringFromBelow * scrollTypeDirection;
      const blur = 0;
      const minOpacity = isHeroDisplay ? 0.08 : isWorksStatementTitle ? 0.34 : isParagraph ? 0.22 : 0.06;
      const opacity = Math.max(minOpacity, 0.12 + amount * 0.82 + viewportFocus * 0.12 - exit * 0.16);

      glyph.style.setProperty("--type-focus", focus.toFixed(4));
      glyph.style.setProperty("--type-blur", `${blur.toFixed(2)}px`);
      glyph.style.setProperty("--type-y", `${y.toFixed(2)}px`);
      glyph.style.setProperty("--type-opacity", opacity.toFixed(3));
    });
  };

  const requestScrollTypeUpdate = (direction = 0) => {
    if (direction) {
      scrollTypeDirection = direction > 0 ? 1 : -1;
      document.body.classList.toggle("scrolling-up", direction < 0);
      document.body.classList.toggle("scrolling-down", direction >= 0);
    }
    if (!scrollTypeRaf) scrollTypeRaf = window.requestAnimationFrame(updateScrollTypeItems);
  };

  const pulseScrollType = (direction) => {
    requestScrollTypeUpdate(direction);
  };

  syncScrollTypeText();
  collectScrollScenes();
  requestScrollTypeUpdate(1);

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - scrollTypeLastY;
      scrollTypeLastY = y;
      if (Math.abs(delta) < 2) return;
      pulseScrollType(delta);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    collectScrollTypeItems();
    collectScrollScenes();
    requestScrollTypeUpdate();
  }, { passive: true });

  window.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) < 1) return;
      pulseScrollType(event.deltaY);
    },
    { passive: true }
  );

  let scrollTypeTouchY = 0;
  window.addEventListener(
    "touchstart",
    (event) => {
      scrollTypeTouchY = event.touches[0]?.clientY || 0;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchmove",
    (event) => {
      const y = event.touches[0]?.clientY || scrollTypeTouchY;
      const delta = scrollTypeTouchY - y;
      scrollTypeTouchY = y;
      if (Math.abs(delta) < 2) return;
      pulseScrollType(delta);
    },
    { passive: true }
  );

  const scrollTypeObserver = new MutationObserver((mutations) => {
    let shouldSync = false;
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        return;
      }
      shouldSync = shouldSync || Array.from(mutation.addedNodes).some((node) => (
        node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE
      ));
    });

    if (shouldSync) {
      window.requestAnimationFrame(() => {
        syncScrollTypeText();
        requestScrollTypeUpdate();
      });
    }
  });

  scrollTypeObserver.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
})();
