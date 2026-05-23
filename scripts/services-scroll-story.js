(() => {
  const section = document.querySelector(".services-scroll-story");
  const sticky = section?.querySelector(".services-sticky");
  const panels = Array.from(section?.querySelectorAll(".service-text-panel") || []);
  const progressBar = section?.querySelector(".services-story-progress span");
  if (!section || !sticky || !panels.length) return;

  const runtime = window.LucianRuntime;
  const reducedMotion = runtime?.reducedMotion
    || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  const pad = (value) => String(value).padStart(2, "0");

  let rail = null;
  let ticking = false;
  let activeIndex = -1;

  const currentLang = () => (
    document.documentElement.lang === "en"
      || window.LucianLanguageRuntime?.getCurrentLang?.() === "en"
  ) ? "en" : "zh";

  const textFor = (key) => window.i18n?.[currentLang()]?.[key] || "";

  const rebuildServicesStoryText = () => {
    panels.forEach((panel) => {
      const title = panel.querySelector(".service-text-title");
      const body = panel.querySelector(".service-text-body");
      const titleText = textFor(panel.dataset.serviceTitle);
      const bodyText = textFor(panel.dataset.serviceText);
      if (title && titleText) title.textContent = titleText;
      if (body && bodyText) body.textContent = bodyText;
    });

    if (rail) {
      rail.querySelectorAll(".services-capability-item").forEach((item, index) => {
        const titleText = textFor(panels[index]?.dataset.serviceTitle);
        const label = item.querySelector("span");
        if (label && titleText) label.textContent = titleText;
      });
    }
  };

  const buildRail = () => {
    rail?.remove();
    rail = document.createElement("nav");
    rail.className = "services-capability-rail";
    rail.setAttribute("aria-label", "Services progress");
    rail.setAttribute("aria-hidden", "true");

    panels.forEach((panel, index) => {
      const item = document.createElement("span");
      const number = document.createElement("b");
      const label = document.createElement("span");
      item.className = "services-capability-item";
      number.textContent = pad(index + 1);
      label.textContent = textFor(panel.dataset.serviceTitle) || panel.querySelector(".service-text-title")?.textContent?.trim() || "";
      item.append(number, label);
      rail.appendChild(item);
    });

    sticky.appendChild(rail);
  };

  const setActiveIndex = (nextIndex) => {
    if (nextIndex === activeIndex) return;
    activeIndex = nextIndex;
    panels.forEach((panel, index) => {
      panel.classList.toggle("is-active-service", index === activeIndex);
    });
    rail?.querySelectorAll(".services-capability-item").forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
    });
  };

  const writeProgress = (progress) => {
    const entryProgress = smooth(clamp01(progress / 0.2));
    const stationProgress = smooth(clamp01((progress - 0.16) / 0.68));
    const outro = smooth(clamp01((progress - 0.82) / 0.18));
    const stationCount = Math.max(1, panels.length - 1);
    const stationPosition = stationProgress * stationCount;
    const nearestIndex = Math.min(panels.length - 1, Math.max(0, Math.round(stationPosition)));

    section.style.setProperty("--services-progress", progress.toFixed(4));
    section.style.setProperty("--services-entry-progress", entryProgress.toFixed(4));
    section.style.setProperty("--services-station-progress", stationProgress.toFixed(4));
    section.style.setProperty("--services-active-index", (nearestIndex / stationCount).toFixed(4));
    section.style.setProperty("--services-outro", outro.toFixed(4));
    section.style.setProperty("--services-rail-progress", stationProgress.toFixed(4));
    if (progressBar) progressBar.style.width = `${(stationProgress * 100).toFixed(2)}%`;

    panels.forEach((panel, index) => {
      const distance = Math.abs(stationPosition - index);
      const panelProgress = reducedMotion ? 1 : clamp01(1 - distance / 0.78);
      panel.style.setProperty("--service-panel-progress", panelProgress.toFixed(4));
    });

    setActiveIndex(nearestIndex);
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.18;
    document.body.classList.toggle("services-story-active", inView);
    document.documentElement.classList.toggle("services-story-active", inView);
  };

  const readProgress = () => {
    if (reducedMotion) {
      writeProgress(1);
      return;
    }

    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const travel = Math.max(1, rect.height - vh);
    writeProgress(clamp01(-rect.top / travel));
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      readProgress();
    });
  };

  window.rebuildServicesStoryText = () => {
    rebuildServicesStoryText();
    requestUpdate();
  };

  window.LucianServicesStory = {
    holdEntryStart: requestUpdate,
    releaseEntryHold: requestUpdate,
    refresh: requestUpdate,
  };

  buildRail();
  rebuildServicesStoryText();
  readProgress();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", requestUpdate);
  window.addEventListener("lucian:site-entered", requestUpdate);
  window.addEventListener("pagehide", () => {
    document.body.classList.remove("services-story-active");
    document.documentElement.classList.remove("services-story-active");
  }, { once: true });
})();
