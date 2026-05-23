(() => {
  const runtime = window.LucianRuntime;

  const initServicesScrollStory = () => {
    const section = document.querySelector(".services-scroll-story");
    if (!section) return;

    const stage = section.querySelector(".services-sticky");
    const worksSection = document.getElementById("works");
    const entryGrid = section.querySelector("#services-entry-gridscan");
    const tunnelGrid = section.querySelector("#services-tunnel-grid");
    const entryTitle = section.querySelector(".services-entry-title");
    const panels = Array.from(section.querySelectorAll(".service-text-panel"));
    if (!stage || !entryTitle || !panels.length) return;
    let entryGridScan = null;
    let tunnelGridScan = null;
    let panelShaders = null;

    try {
      entryGridScan = window.initServicesEntryGridScan?.(entryGrid) || null;
    } catch (error) {
      console.warn("[services-scroll-story] Grid scan disabled:", error.message);
    }

    try {
      tunnelGridScan = window.initServicesEntryGridScan?.(tunnelGrid) || null;
    } catch (error) {
      console.warn("[services-scroll-story] Tunnel scan disabled:", error.message);
    }

    try {
      panelShaders = window.initServicePanelShaders?.(panels) || null;
    } catch (error) {
      console.warn("[services-scroll-story] Panel shaders disabled:", error.message);
    }
    const capabilityRail = document.createElement("div");
    capabilityRail.className = "services-capability-rail";
    capabilityRail.setAttribute("aria-hidden", "true");
    stage.appendChild(capabilityRail);

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const smooth = (value) => value * value * (3 - 2 * value);
    const slowFastSoft = (() => {
      const x1 = 0.62;
      const y1 = 0;
      const x2 = 0.24;
      const y2 = 1;
      const sample = (a, b, value) => (
        3 * a * (1 - value) * (1 - value) * value
        + 3 * b * (1 - value) * value * value
        + value * value * value
      );

      return (progress) => {
        let lower = 0;
        let upper = 1;
        let t = progress;

        for (let index = 0; index < 8; index += 1) {
          t = (lower + upper) / 2;
          if (sample(x1, x2, t) < progress) lower = t;
          else upper = t;
        }

        return sample(y1, y2, t);
      };
    })();
    const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";
    let targetProgress = 0;
    let currentProgress = 0;
    let servicesInView = false;
    let entrySettlePlayed = false;
    let entrySettling = false;
    let entryHolding = false;
    let entryHoldArmed = false;
    let entryHoldArmFrame = 0;
    let entrySettleFrame = 0;
    let entryLockY = 0;
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

    const getStationDelta = (index, active) => {
      const delta = index - active;
      return Math.max(-2.4, Math.min(2.4, delta));
    };

    const setPanel = (panel, delta, index, contentVisible, outro) => {
      const distance = Math.abs(delta);
      const focus = smooth(clamp01(1 - distance / 1.08));
      const nearby = smooth(clamp01(1.7 - distance));
      const visible = contentVisible * nearby * (1 - outro);
      const outroFocus = outro * focus;
      const x = delta * 18 * (1 - outroFocus);
      const y = ((1 - contentVisible) * 6 + delta * 2.4) * (1 - outroFocus);
      const z = -540 * distance + focus * 240 + outroFocus * 560;
      const scale = 0.68 + focus * 0.32 + outroFocus * 3.6;
      const rotate = 0;
      const opacity = visible * (0.56 + focus * 0.44);
      const contentOpacity = visible * (0.58 + focus * 0.42) * (1 - outroFocus * 0.92);

      panel.classList.toggle("is-active-service", focus > 0.52 && contentVisible > 0.22);
      panel.style.setProperty("--service-panel-x", `${x.toFixed(2)}vw`);
      panel.style.setProperty("--service-panel-y", `${y.toFixed(2)}vh`);
      panel.style.setProperty("--service-panel-z", `${z.toFixed(2)}px`);
      panel.style.setProperty("--service-panel-scale", scale.toFixed(4));
      panel.style.setProperty("--service-card-rotate", `${rotate.toFixed(3)}deg`);
      panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));
      panel.style.setProperty("--service-content-opacity", contentOpacity.toFixed(3));
      panel.style.setProperty("--service-outro-focus", outroFocus.toFixed(3));
      panel.style.setProperty("--service-panel-focus", focus.toFixed(3));
      panel.style.setProperty("--service-panel-distance", distance.toFixed(3));

      if (panelGlyphs[index]) {
        renderGlyphsByAmount(panelGlyphs[index].title, contentOpacity, 12);
        renderGlyphsByAmount(panelGlyphs[index].body, contentOpacity, 10);
      }
    };

    const applyProgress = (progress, { snap = false } = {}) => {
      const entryPresence = section.classList.contains("is-entry-present") ? 1 : 0;
      const entryOpen = smooth(clamp01((progress - 0.16) / 0.18));
      const contentVisible = smooth(clamp01((progress - 0.34) / 0.16));
      const contentProgress = smooth(clamp01((progress - 0.34) / 0.44));
      const outro = smooth(clamp01((progress - 0.78) / 0.22));
      const visibleContent = contentVisible * (1 - outro);
      const cinemaIn = smooth(clamp01((progress - 0.04) / 0.22));
      const lionReveal = smooth(clamp01((progress - 0.1) / 0.28)) * (1 - outro);
      const tunnelProgress = smooth(clamp01((progress - 0.24) / 0.22)) * (1 - outro);
      const cinemaOut = outro;
      const rawActiveService = contentProgress * Math.max(0, panels.length - 1);
      const nearestService = Math.min(panels.length - 1, Math.max(0, Math.round(rawActiveService)));
      const idleMs = performance.now() - lastScrollAt;
      const snapAmount = visibleContent * 0.42 * smooth(clamp01((idleMs - 360) / 900));
      const targetActiveService = rawActiveService + (nearestService - rawActiveService) * snapAmount;
      if (snap) {
        displayActiveService = targetActiveService;
      } else {
        displayActiveService += (targetActiveService - displayActiveService) * 0.28;
      }

      section.style.setProperty("--services-progress", progress.toFixed(4));
      section.style.setProperty("--services-open", entryOpen.toFixed(4));
      section.style.setProperty("--services-inside", visibleContent.toFixed(4));
      section.style.setProperty("--services-outro", outro.toFixed(4));
      section.style.setProperty("--services-gallery", visibleContent.toFixed(4));
      section.style.setProperty("--services-slab-opacity", (visibleContent * 0.96).toFixed(3));
      section.style.setProperty("--services-entry-visible", (entryPresence * (1 - entryOpen)).toFixed(4));
      section.style.setProperty("--services-entry-open", entryOpen.toFixed(4));
      section.style.setProperty("--services-content-visible", visibleContent.toFixed(4));
      section.style.setProperty("--services-content-progress", contentProgress.toFixed(4));
      section.style.setProperty("--services-cinema-in", cinemaIn.toFixed(4));
      section.style.setProperty("--services-lion-reveal", lionReveal.toFixed(4));
      section.style.setProperty("--services-tunnel-progress", tunnelProgress.toFixed(4));
      section.style.setProperty("--services-station-progress", contentProgress.toFixed(4));
      section.style.setProperty("--services-cinema-out", cinemaOut.toFixed(4));
      section.style.setProperty("--services-active-station", (targetActiveService / Math.max(1, panels.length - 1)).toFixed(4));
      const entryOpacity = entryPresence * (1 - entryOpen);
      section.style.setProperty("--services-entry-opacity", entryOpacity.toFixed(4));
      section.style.setProperty("--services-entry-grid-opacity", (entryOpacity * (0.98 + entryOpen * 0.02)).toFixed(4));
      section.style.setProperty("--services-entry-blur", `${((1 - entryPresence) * 12 + entryOpen * 3).toFixed(2)}px`);
      document.body.classList.remove("services-white-stage");
      if (entryGridScan) entryGridScan.setProgress(entryOpen, visibleContent, progress, { snap });
      if (tunnelGridScan) tunnelGridScan.setProgress(cinemaIn, tunnelProgress, progress, { snap });
      window.LucianServicesLion?.setProgress({
        cinemaIn,
        lionReveal,
        tunnel: tunnelProgress,
        outro: cinemaOut,
      });

      panels.forEach((panel, index) => {
        setPanel(panel, getStationDelta(index, displayActiveService), index, visibleContent, outro);
      });
      const railIndex = visibleContent < 0.5 || outro > 0.72
        ? -1
        : Math.min(panels.length - 1, Math.max(0, Math.round(displayActiveService)));
      updateCapabilityRail(railIndex);
    };

    const setEntryPresence = (visible) => {
      section.classList.toggle("is-entry-present", visible);
      if (!visible) {
        section.style.setProperty("--services-entry-opacity", "0");
        section.style.setProperty("--services-entry-grid-opacity", "0");
        section.style.setProperty("--services-entry-blur", "12px");
        section.style.setProperty("--services-entry-visible", "0");
        return;
      }

      section.style.setProperty("--services-entry-opacity", "1");
      section.style.setProperty("--services-entry-grid-opacity", "0.98");
      section.style.setProperty("--services-entry-blur", "0px");
      section.style.setProperty("--services-entry-visible", "1");
    };

    const unlockEntrySettle = () => {
      document.documentElement.classList.remove("services-entry-locking");
      document.body.classList.remove("services-entry-locking");
      entrySettling = false;
    };

    const armEntryHoldRelease = () => {
      window.cancelAnimationFrame(entryHoldArmFrame);
      entryHoldArmed = false;
      entryHoldArmFrame = window.requestAnimationFrame(() => {
        entryHoldArmFrame = window.requestAnimationFrame(() => {
          entryHoldArmed = true;
        });
      });
    };

    const holdEntryStart = () => {
      window.cancelAnimationFrame(entrySettleFrame);
      entrySettling = false;
      entrySettlePlayed = true;
      entryHolding = true;
      entryLockY = window.scrollY || window.pageYOffset || 0;
      targetProgress = 0;
      currentProgress = 0;
      serviceVelocity = 0;
      displayActiveService = 0;
      unlockEntrySettle();
      setEntryPresence(true);
      applyProgress(0, { snap: true });
      armEntryHoldRelease();
    };

    const releaseEntryHold = ({ read = true } = {}) => {
      if (!entryHolding || !entryHoldArmed || entrySettling) return;
      entryHolding = false;
      entryHoldArmed = false;
      if (read) readProgress();
    };

    const settleEntryStage = () => {
      if (entrySettling || entrySettlePlayed || runtime?.reducedMotion) return;

      entrySettling = true;
      entrySettlePlayed = true;
      entryLockY = window.scrollY || window.pageYOffset || 0;
      document.documentElement.classList.add("services-entry-locking");
      document.body.classList.add("services-entry-locking");

      const startY = entryLockY;
      const targetY = Math.max(0, Math.round(startY + section.getBoundingClientRect().top));
      const distance = targetY - startY;
      const duration = 560;
      const startedAt = performance.now();

      window.cancelAnimationFrame(entrySettleFrame);
      const renderSettle = (now) => {
        const amount = clamp01((now - startedAt) / duration);
        const eased = slowFastSoft(amount);
        window.scrollTo(0, startY + distance * eased);

        if (amount < 1) {
          entrySettleFrame = window.requestAnimationFrame(renderSettle);
          return;
        }

        window.scrollTo(0, targetY);
        holdEntryStart();
      };

      entrySettleFrame = window.requestAnimationFrame(renderSettle);
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      servicesInView = rect.top < window.innerHeight && rect.bottom > 0;
      const worksRect = worksSection?.getBoundingClientRect();
      const worksIncoming = worksRect && worksRect.top < window.innerHeight && worksRect.bottom > 0;
      const cinemaActive = (
        servicesInView && rect.top < window.innerHeight * 0.94 && rect.bottom > -window.innerHeight * 0.12
      ) || worksIncoming;
      document.documentElement.classList.toggle("services-cinema-active", cinemaActive);
      document.body.classList.toggle("services-cinema-active", cinemaActive);
      if (Math.abs(window.scrollY - lastScrollY) > 0.5) {
        lastScrollY = window.scrollY;
        lastScrollAt = performance.now();
      }
      if (rect.top > window.innerHeight * 0.92) {
        entrySettlePlayed = false;
        entryHolding = false;
        setEntryPresence(false);
      } else if (rect.top <= 2 && rect.bottom > window.innerHeight * 0.5) {
        entrySettlePlayed = true;
        setEntryPresence(true);
      } else if (
        !entrySettlePlayed
        && rect.top < window.innerHeight * 0.72
        && rect.top > window.innerHeight * 0.04
        && lastScrollY >= window.scrollY - 0.5
        && document.body.classList.contains("has-entered")
        && !document.body.classList.contains("scroll-curtain-active")
        && !document.body.classList.contains("nav-transition-active")
      ) {
        settleEntryStage();
        return;
      }

      const nextProgress = entryHolding
        ? 0
        : runtime?.reducedMotion ? 1 : clamp01(-rect.top / travel);
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

    window.LucianServicesStory = {
      holdEntryStart,
      releaseEntryHold,
      refresh: readProgress,
    };

    const safeRebuildText = () => {
      try {
        rebuildText();
      } catch (error) {
        console.warn("[services-scroll-story] Text rebuild skipped:", error.message);
      }
    };

    safeRebuildText();
    window.rebuildServicesStoryText = () => {
      safeRebuildText();
      readProgress();
    };

    const onScroll = () => {
      if (entryHolding && entryHoldArmed && Math.abs((window.scrollY || window.pageYOffset || 0) - entryLockY) > 2) {
        releaseEntryHold({ read: false });
      }
      readProgress();
    };

    const releaseHeldEntryFromInput = () => {
      releaseEntryHold();
    };

    readProgress();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readProgress);
    window.addEventListener("wheel", (event) => {
      if (!entrySettling) return;
      event.preventDefault();
    }, { passive: false, capture: true });
    window.addEventListener("wheel", () => {
      releaseHeldEntryFromInput();
    }, { passive: true, capture: true });
    window.addEventListener("touchmove", (event) => {
      if (!entrySettling) return;
      event.preventDefault();
    }, { passive: false, capture: true });
    window.addEventListener("touchmove", () => {
      releaseHeldEntryFromInput();
    }, { passive: true, capture: true });
    window.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
      releaseHeldEntryFromInput();
    }, { capture: true });
  };

  initServicesScrollStory();
})();
