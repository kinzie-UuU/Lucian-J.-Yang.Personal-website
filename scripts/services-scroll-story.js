(() => {
  const runtime = window.LucianRuntime;

  const initServicesScrollStory = () => {
    const section = document.querySelector(".services-scroll-story");
    if (!section) return;

    const stage = section.querySelector(".services-sticky");
    const entryGrid = section.querySelector("#services-entry-gridscan");
    const entryTitle = section.querySelector(".services-entry-title");
    const panels = Array.from(section.querySelectorAll(".service-text-panel"));
    if (!stage || !entryTitle || !panels.length) return;
    const entryGridScan = window.initServicesEntryGridScan?.(entryGrid);
    const panelShaders = window.initServicePanelShaders?.(panels);

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const smooth = (value) => value * value * (3 - 2 * value);
    const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";
    let targetProgress = 0;
    let currentProgress = 0;
    let servicesInView = false;
    let panelGlyphs = [];

    const splitGlyphs = (node, text) => {
      node.textContent = "";
      return Array.from(text).map((char) => {
        const span = document.createElement("span");
        span.className = "service-glyph";
        span.textContent = char;
        node.appendChild(span);
        return span;
      });
    };

    const updateEntryTitle = () => {
      const currentLang = getCurrentLang();
      const title = i18n[currentLang]?.services_title || entryTitle.getAttribute("aria-label") || "";
      const parts = currentLang === "zh" ? ["\u4e3a\u4f55", "\u9009\u62e9\u6211"] : ["Why Work", "With Me"];
      entryTitle.setAttribute("aria-label", title);
      entryTitle.textContent = "";
      parts.forEach((part) => {
        const span = document.createElement("span");
        span.textContent = part;
        entryTitle.appendChild(span);
      });
    };

    const rebuildText = () => {
      const currentLang = getCurrentLang();
      updateEntryTitle();
      panelGlyphs = panels.map((panel) => {
        const titleNode = panel.querySelector(".service-text-title");
        const bodyNode = panel.querySelector(".service-text-body");
        const title = i18n[currentLang]?.[panel.dataset.serviceTitle] || titleNode.textContent;
        const body = i18n[currentLang]?.[panel.dataset.serviceText] || bodyNode.textContent;
        return {
          title: splitGlyphs(titleNode, title),
          body: splitGlyphs(bodyNode, body),
        };
      });
    };

    const renderGlyphs = (glyphs, phase, stagger, travel) => {
      glyphs.forEach((glyph, index) => {
        if (phase <= -0.02 || phase >= 1.02) {
          glyph.style.opacity = "0";
          glyph.style.filter = "blur(22px)";
          glyph.style.transform = `translate3d(0, ${travel}px, 0)`;
          return;
        }

        const glyphDelay = Math.min(index * stagger, 0.14);
        const enter = smooth(clamp01((phase - glyphDelay) / 0.38));
        const exit = smooth(clamp01((phase - 0.8 - glyphDelay * 0.08) / 0.24));
        const amount = enter * (1 - exit);
        const blur = 14 * (1 - amount) + exit * 8;
        const y = (1 - enter) * travel * 0.72 - exit * travel * 0.55;
        glyph.style.opacity = amount.toFixed(3);
        glyph.style.filter = `blur(${blur.toFixed(2)}px)`;
        glyph.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const setPanel = (panel, local, index) => {
      const enter = smooth(clamp01((local + 0.12) / 0.78));
      const exit = smooth(clamp01((local - 0.66) / 0.46));
      const inRange = local >= -0.14 && local <= 1.08 ? 1 : 0;
      const y = local < 0.62
        ? 104 - enter * 104
        : -exit * 132;
      const clarity = smooth(clamp01((local - 0.34) / 0.24)) * (1 - smooth(clamp01((local - 0.76) / 0.24)));
      const z = -130 + clarity * 230 - exit * 52;
      const scale = local < 0.62
        ? 0.52 + enter * 0.44 + clarity * 0.34
        : 1.3 - exit * 0.9;
      const direction = index % 2 === 0 ? 1 : -1;
      const rotate = local < 0.62
        ? direction * (-5.2 + enter * 4.8)
        : direction * (-0.4 + exit * 4.8);
      const opacity = Math.min(enter * 1.12, 1) * (1 - exit) * inRange;
      const contentOpacity = smooth(clamp01((local - 0.3) / 0.26)) * (1 - smooth(clamp01((local - 0.76) / 0.22)));

      panel.style.setProperty("--service-panel-y", `${y.toFixed(2)}vh`);
      panel.style.setProperty("--service-panel-z", `${z.toFixed(2)}px`);
      panel.style.setProperty("--service-panel-scale", scale.toFixed(4));
      panel.style.setProperty("--service-card-rotate", `${rotate.toFixed(3)}deg`);
      panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));
      panel.style.setProperty("--service-content-opacity", contentOpacity.toFixed(3));

      if (panelGlyphs[index]) {
        renderGlyphs(panelGlyphs[index].title, local + 0.04, 0.004, 14);
        renderGlyphs(panelGlyphs[index].body, local - 0.02, 0.0012, 12);
      }
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      servicesInView = rect.top < window.innerHeight && rect.bottom > 0;
      targetProgress = runtime?.reducedMotion ? 1 : clamp01(-rect.top / travel);
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.105;
      if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;

      const progress = currentProgress;
      const open = smooth(clamp01(progress / 0.22));
      const inside = smooth(clamp01((progress - 0.13) / 0.22));
      const outro = smooth(clamp01((progress - 0.82) / 0.18));

      section.style.setProperty("--services-progress", progress.toFixed(4));
      section.style.setProperty("--services-open", open.toFixed(4));
      section.style.setProperty("--services-inside", inside.toFixed(4));
      section.style.setProperty("--services-outro", outro.toFixed(4));
      section.style.setProperty("--services-slab-opacity", (inside * 0.96).toFixed(3));
      document.body.classList.toggle("services-white-stage", servicesInView && inside > 0.58 && outro < 0.55);
      if (entryGridScan) entryGridScan.setProgress(open, inside, progress);

      panels.forEach((panel, index) => {
        const start = 0.19 + index * 0.085;
        const step = 0.19;
        const local = (progress - start) / step;
        setPanel(panel, local, index);
      });

      requestAnimationFrame(render);
    };

    rebuildText();
    window.rebuildServicesStoryText = () => {
      rebuildText();
      readProgress();
    };

    readProgress();
    render();
    window.addEventListener("scroll", readProgress, { passive: true });
    window.addEventListener("resize", readProgress);
  };

  initServicesScrollStory();
})();
