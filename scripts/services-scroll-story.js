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
    const capabilityRail = document.createElement("div");
    capabilityRail.className = "services-capability-rail";
    capabilityRail.setAttribute("aria-hidden", "true");
    stage.appendChild(capabilityRail);

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const smooth = (value) => value * value * (3 - 2 * value);
    const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";
    let targetProgress = 0;
    let currentProgress = 0;
    let servicesInView = false;
    let panelGlyphs = [];
    let activePanelIndex = -1;
    let lastScrollY = window.scrollY;
    let lastScrollAt = performance.now();
    let displayActiveService = 0;
    let serviceVelocity = 0;

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
      capabilityRail.innerHTML = panels.map((panel, index) => {
        const title = i18n[currentLang]?.[panel.dataset.serviceTitle] || panel.querySelector(".service-text-title")?.textContent || "";
        return `<span class="services-capability-item" data-service-index="${index}"><b>${String(index + 1).padStart(2, "0")}</b>${title}</span>`;
      }).join("");
    };

    const updateCapabilityRail = (index) => {
      activePanelIndex = index;
      capabilityRail.querySelectorAll(".services-capability-item").forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === index);
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

    const renderGlyphsByAmount = (glyphs, amount, travel) => {
      glyphs.forEach((glyph, index) => {
        const delay = Math.min(index * 0.006, 0.16);
        const glyphAmount = smooth(clamp01((amount - delay) / 0.72));
        const blur = 16 * (1 - glyphAmount);
        const y = (1 - glyphAmount) * travel;
        glyph.style.opacity = glyphAmount.toFixed(3);
        glyph.style.filter = `blur(${blur.toFixed(2)}px)`;
        glyph.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const getLoopDelta = (index, active, length) => {
      let delta = index - active;
      const half = length / 2;
      if (delta > half) delta -= length;
      if (delta < -half) delta += length;
      return delta;
    };

    const setPanel = (panel, delta, index, galleryVisible, outro) => {
      const distance = Math.abs(delta);
      const focus = smooth(clamp01(1 - distance / 1.18));
      const visible = galleryVisible * smooth(clamp01(2.18 - distance));
      const outroFocus = outro * focus;
      const x = delta * 31 * (1 - outroFocus);
      const y = ((1 - galleryVisible) * 8 + Math.sin((index + 1) * 1.7) * 0.42) * (1 - outroFocus);
      const z = -90 + focus * 150 + outroFocus * 520;
      const scale = 0.84 + focus * 0.08 + outroFocus * 4.15;
      const rotate = 0;
      const opacity = visible * (0.56 + focus * 0.44);
      const contentOpacity = visible * (0.58 + focus * 0.42) * (1 - outroFocus * 0.92);

      panel.classList.toggle("is-active-service", focus > 0.72 && galleryVisible > 0.5);
      panel.style.setProperty("--service-panel-x", `${x.toFixed(2)}vw`);
      panel.style.setProperty("--service-panel-y", `${y.toFixed(2)}vh`);
      panel.style.setProperty("--service-panel-z", `${z.toFixed(2)}px`);
      panel.style.setProperty("--service-panel-scale", scale.toFixed(4));
      panel.style.setProperty("--service-card-rotate", `${rotate.toFixed(3)}deg`);
      panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));
      panel.style.setProperty("--service-content-opacity", contentOpacity.toFixed(3));
      panel.style.setProperty("--service-outro-focus", outroFocus.toFixed(3));

      if (panelGlyphs[index]) {
        renderGlyphsByAmount(panelGlyphs[index].title, contentOpacity, 12);
        renderGlyphsByAmount(panelGlyphs[index].body, contentOpacity, 10);
      }
    };

    const applyProgress = (progress, { snap = false } = {}) => {
      const open = smooth(clamp01(progress / 0.26));
      const inside = smooth(clamp01((progress - 0.04) / 0.18));
      const outro = smooth(clamp01((progress - 0.82) / 0.18));
      const earlyGallery = smooth(clamp01((progress - 0.02) / 0.12)) * 0.42;
      const galleryVisible = Math.max(inside, earlyGallery) * (1 - outro);
      const galleryProgress = smooth(clamp01((progress - 0.08) / 0.5));
      const rawActiveService = galleryProgress * Math.max(0, panels.length - 1);
      const nearestService = Math.min(panels.length - 1, Math.max(0, Math.round(rawActiveService)));
      const idleMs = performance.now() - lastScrollAt;
      const snapAmount = galleryVisible * (1 - outro) * 0.42 * smooth(clamp01((idleMs - 360) / 900));
      const targetActiveService = rawActiveService + (nearestService - rawActiveService) * snapAmount;
      if (snap) {
        displayActiveService = targetActiveService;
      } else {
        displayActiveService += (targetActiveService - displayActiveService) * 0.15;
      }

      section.style.setProperty("--services-progress", progress.toFixed(4));
      section.style.setProperty("--services-open", open.toFixed(4));
      section.style.setProperty("--services-inside", inside.toFixed(4));
      section.style.setProperty("--services-outro", outro.toFixed(4));
      section.style.setProperty("--services-gallery", galleryVisible.toFixed(4));
      section.style.setProperty("--services-slab-opacity", (inside * 0.96).toFixed(3));
      document.body.classList.remove("services-white-stage");
      if (entryGridScan) entryGridScan.setProgress(open, inside, progress, { snap });

      panels.forEach((panel, index) => {
        setPanel(panel, getLoopDelta(index, displayActiveService, panels.length), index, galleryVisible, outro);
      });
      const railIndex = progress < 0.08 || outro > 0.72
        ? -1
        : Math.min(panels.length - 1, Math.max(0, Math.round(displayActiveService)));
      updateCapabilityRail(railIndex);
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      servicesInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (Math.abs(window.scrollY - lastScrollY) > 0.5) {
        lastScrollY = window.scrollY;
        lastScrollAt = performance.now();
      }
      const nextProgress = runtime?.reducedMotion ? 1 : clamp01(-rect.top / travel);
      serviceVelocity += (nextProgress - targetProgress) * 0.62;
      serviceVelocity = Math.max(-0.028, Math.min(0.028, serviceVelocity));
      const jumped = Math.abs(nextProgress - targetProgress) > 0.16 || (nextProgress < 0.02 && currentProgress > 0.12);
      targetProgress = nextProgress;
      if (jumped) {
        currentProgress = targetProgress;
        applyProgress(currentProgress, { snap: true });
      }
    };

    const render = () => {
      if (document.body.classList.contains("nav-transition-active")) {
        requestAnimationFrame(render);
        return;
      }

      if (
        !servicesInView
        && Math.abs(targetProgress - currentProgress) < 0.0001
        && Math.abs(serviceVelocity) < 0.0001
      ) {
        requestAnimationFrame(render);
        return;
      }

      serviceVelocity *= 0.9;
      const inertialTarget = clamp01(targetProgress + serviceVelocity);
      currentProgress += (inertialTarget - currentProgress) * 0.15;
      if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;

      applyProgress(currentProgress);
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
