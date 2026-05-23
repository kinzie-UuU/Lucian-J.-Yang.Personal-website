(() => {
  const runtime = window.LucianRuntime;
  const worksRows = Array.from(document.querySelectorAll(".works-row"));
  const workGallery = document.querySelector("#work-gallery");
  const workGalleryTrack = document.querySelector("#work-gallery-track");
  const workGalleryTitle = document.querySelector("#work-gallery-title");
  const workGalleryIndex = document.querySelector("#work-gallery-index");
  const workGalleryDescription = document.querySelector("#work-gallery-description");
  const workGalleryClose = document.querySelector("#work-gallery-close");
  const workGalleryBack = document.querySelector("#work-gallery-back");
  const workDetail = document.querySelector("#work-detail");

  let galleryOpen = false;
  let galleryMode = "projects";
  let galleryCategory = "oem";
  let galleryStep = 0;
  let workDetailRevealRaf = 0;
  let projectDetailObserver = null;
  let gallerySourceItems = [];
  let galleryCurrentProject = null;
  let galleryReturnY = 0;

  let circularCleanup = null;
  let circularCurrentIndex = 0;
  const circularImageCache = new Map();
  let circularPrewarmStarted = false;

  const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";
  const isCircularGallery = () => workGallery?.classList.contains("is-circular");
  const isGalleryBrowsingMode = () => galleryMode === "projects" || galleryMode === "index";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const localizedValue = (value) => {
    const currentLang = getCurrentLang();
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLang] || value.en || value.zh || "";
    }
    return value || "";
  };

  const getAllWorkGalleryItems = () => Object.entries(workGalleryImages).flatMap(([categoryKey, items]) => (
    items.map((item, categoryIndex) => ({ ...item, categoryKey, categoryIndex }))
  ));

  const getCategoryWorkGalleryItems = (categoryKey) => (
    (workGalleryImages[categoryKey] || []).map((item, categoryIndex) => ({ ...item, categoryKey, categoryIndex }))
  );

  const getGalleryProjects = (categoryKey) => {
    const projectItems = window.workGalleryProjects?.[categoryKey];
    if (projectItems?.length) {
      return projectItems.map((project, projectIndex) => ({
        ...project,
        categoryKey,
        categoryIndex: projectIndex,
        projectIndex,
        isProject: true
      }));
    }

    const fallbackItems = getCategoryWorkGalleryItems(categoryKey);
    return fallbackItems.length ? [{
      isProject: true,
      categoryKey,
      categoryIndex: 0,
      projectIndex: 0,
      projectKey: categoryKey,
      title: galleryText[getCurrentLang()]?.categoryTitles?.[categoryKey] || categoryKey,
      src: fallbackItems[0].src,
      cover: fallbackItems[0].src,
      position: fallbackItems[0].position || "center",
      imageCount: fallbackItems.length,
      items: fallbackItems
    }] : [];
  };

  const getGalleryDisplayIndex = (item, fallbackIndex = 0) => {
    const displayIndex = Number.isFinite(item?.projectIndex)
      ? item.projectIndex
      : Number.isFinite(item?.categoryIndex)
        ? item.categoryIndex
        : fallbackIndex;
    return String(displayIndex + 1).padStart(2, "0");
  };

  const getGalleryItemTitle = (item, index) => {
    const currentLang = getCurrentLang();
    const rawTitle = localizedValue(item?.title);
    if (item?.isProject) return rawTitle || `${galleryText[currentLang].project} ${getGalleryDisplayIndex(item, index)}`;
    const itemCategory = item?.categoryKey || galleryCategory;
    const itemIndex = Number.isFinite(item?.categoryIndex) ? item.categoryIndex : index;
    if (currentLang === "zh") {
      if (item?.title && typeof item.title === "object" && item.title.zh) return rawTitle;
      const giftMatch = rawTitle.match(/^GIFT PROJECT\s+(\d+)/i);
      if (giftMatch) return `${galleryText.zh.giftTitle} ${giftMatch[1]}`;
      const categoryTitle = galleryText.zh.categoryTitles[itemCategory] || galleryText.zh.project;
      return `${categoryTitle} ${getGalleryDisplayIndex(item, index)}`;
    }
    return rawTitle || `${galleryText[currentLang].project} ${getGalleryDisplayIndex(item, index)}`;
  };

  const getGalleryCategoryDescription = (item) => {
    const currentLang = getCurrentLang();
    const itemCategory = item?.categoryKey || galleryCategory;
    if (item?.isProject) {
      const imageCount = item.imageCount || item.items?.length || 0;
      const imageLabel = currentLang === "zh" ? `${imageCount} 张图片` : `${imageCount} images`;
      const categoryDescription = galleryText[currentLang]?.categoryDescriptions?.[itemCategory]
        || galleryText.zh?.categoryDescriptions?.[itemCategory]
        || "";
      return imageCount ? `${categoryDescription} · ${imageLabel}` : categoryDescription;
    }
    return galleryText[currentLang]?.categoryDescriptions?.[itemCategory]
      || galleryText.zh?.categoryDescriptions?.[itemCategory]
      || "";
  };

  const updateGalleryHeader = (item, index, fallbackTitle = "") => {
    if (workGalleryTitle) {
      workGalleryTitle.textContent = item ? getGalleryItemTitle(item, index) : fallbackTitle || galleryText[getCurrentLang()].project;
    }
    if (workGalleryIndex) {
      workGalleryIndex.textContent = getGalleryDisplayIndex(item, index);
    }
    if (workGalleryDescription) {
      workGalleryDescription.textContent = getGalleryCategoryDescription(item);
    }
  };

  const updateGalleryChromeText = () => {
    const currentLang = getCurrentLang();
    if (workGalleryBack) workGalleryBack.textContent = galleryText[currentLang].back;
    if (workGalleryClose) {
      workGalleryClose.setAttribute("aria-label", galleryText[currentLang].close);
    }
  };

  const destroyCircularGallery = () => {
    if (!circularCleanup) return;
    circularCleanup();
    circularCleanup = null;
  };

  const teardownProjectDetailMotion = () => {
    if (!projectDetailObserver) return;
    projectDetailObserver.disconnect();
    projectDetailObserver = null;
  };

  const setupProjectDetailMotion = () => {
    teardownProjectDetailMotion();
    if (!workGallery || !workDetail) return;
    const panels = Array.from(workDetail.querySelectorAll("[data-project-panel]"));
    if (!panels.length) return;

    if (!("IntersectionObserver" in window)) {
      panels.forEach((panel) => panel.classList.add("is-visible"));
      return;
    }

    projectDetailObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, {
      root: workGallery,
      rootMargin: "-8% 0px -16%",
      threshold: [0.18, 0.42, 0.68]
    });

    panels.forEach((panel) => {
      projectDetailObserver.observe(panel);
    });
  };

  const initDomCircularGallery = (root, sourceItems) => {
    root.innerHTML = "";
    root.classList.add("is-dom-fallback", "is-waterfall");

    let raf = 0;
    let disposed = false;
    let isDown = false;
    let didDrag = false;
    let activeCard = null;
    let suppressNextClick = false;
    let startY = 0;
    let pointerDeltaY = 0;
    let scrollTarget = 0;
    let scrollCurrent = scrollTarget;
    let dragStartTarget = scrollTarget;
    let columns = [];
    let columnCount = 3;
    let metrics = { width: 1, height: 1, cardWidth: 320, gap: 30 };
    const startedAt = performance.now();

    const getLoopIndex = (index) => {
      const total = Math.max(1, sourceItems.length);
      return ((index % total) + total) % total;
    };

    const getColumnCount = () => {
      const width = root.clientWidth || window.innerWidth;
      if (width >= 760) return 3;
      return 2;
    };

    const getCardFromEvent = (event) => {
      const directCard = event.target.closest?.(".work-waterfall-card");
      if (directCard) return directCard;

      const pointStack = document.elementsFromPoint?.(event.clientX, event.clientY) || [];
      const pointCard = pointStack
        .map((element) => element.closest?.(".work-waterfall-card"))
        .find(Boolean);
      return pointCard || null;
    };

    const openCard = (card) => {
      if (!card || (galleryMode !== "projects" && galleryMode !== "index")) return;
      const index = Number.parseInt(card.dataset.index || "0", 10);
      if (galleryMode === "projects") {
        openProjectDetail(index);
        return;
      }
      openWorkDetail(index);
    };

    const makeCard = (item, index) => {
      const card = document.createElement("button");
      card.className = "work-waterfall-card";
      if (item.isProject) card.classList.add("is-project-card");
      card.type = "button";
      card.dataset.index = String(index);
      card.style.setProperty("--gallery-position", item.position || "center");
      const imageCount = item.imageCount || item.items?.length || 0;
      const imageCountLabel = getCurrentLang() === "zh" ? `${imageCount} 张图片` : `${imageCount} IMAGES`;
      card.innerHTML = `
        <span class="work-waterfall-image">
          <img src="${item.src}" alt="" draggable="false" decoding="async">
        </span>
        <span class="work-waterfall-title">${getGalleryItemTitle(item, index)}</span>
        ${item.isProject ? `<span class="work-waterfall-count">${imageCountLabel}</span>` : ""}
      `;
      card.addEventListener("click", (event) => {
        if (!isGalleryBrowsingMode()) return;
        if (didDrag || suppressNextClick) {
          suppressNextClick = false;
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        openCard(card);
      });
      card.addEventListener("keydown", (event) => {
        if (!isGalleryBrowsingMode() || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        event.stopPropagation();
        openCard(card);
      });
      return card;
    };

    const buildColumns = () => {
      columnCount = getColumnCount();
      root.innerHTML = "";
      const shell = document.createElement("div");
      shell.className = "work-waterfall";
      root.appendChild(shell);

      columns = Array.from({ length: columnCount }, (_, columnIndex) => {
        const box = document.createElement("div");
        box.className = "work-waterfall-column";
        box.style.setProperty("--column-index", String(columnIndex));
        const list = document.createElement("div");
        list.className = "work-waterfall-list";
        box.appendChild(list);
        shell.appendChild(box);
        return { box, list, height: 1, speed: 0.62 + (columnIndex % 3) * 0.1 };
      });

      const repeated = Array.from({ length: 4 }, () => sourceItems).flat();
      repeated.forEach((item, repeatedIndex) => {
        const realIndex = getLoopIndex(repeatedIndex);
        const column = columns[realIndex % columnCount];
        column.list.appendChild(makeCard(item, realIndex));
      });

      columns.forEach((column) => {
        column.height = Math.max(1, column.list.scrollHeight / 4);
      });
    };

    const resize = () => {
      const nextColumnCount = getColumnCount();
      metrics = {
        width: Math.max(1, root.clientWidth || window.innerWidth),
        height: Math.max(1, root.clientHeight || window.innerHeight),
        cardWidth: clamp((root.clientWidth || window.innerWidth) * 0.22, 260, 430),
        gap: clamp(24, (root.clientWidth || window.innerWidth) * 0.026, 48)
      };
      root.style.setProperty("--waterfall-card-width", `${metrics.cardWidth}px`);
      root.style.setProperty("--waterfall-gap", `${metrics.gap}px`);
      if (!columns.length || nextColumnCount !== columnCount) {
        buildColumns();
      } else {
        columns.forEach((column) => {
          column.height = Math.max(1, column.list.scrollHeight / 4);
        });
      }
    };

    const render = () => {
      if (disposed) return;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.055;
      const elapsed = (performance.now() - startedAt) / 1000;

      columns.forEach((column, columnIndex) => {
        const direction = columnIndex % 2 === 0 ? 1 : -1;
        const offset = columnIndex * column.height * 0.21;
        const raw = scrollCurrent * column.speed * direction + offset;
        const loop = ((raw % column.height) + column.height) % column.height;
        const driftX = Math.sin(elapsed * 0.24 + columnIndex * 1.7) * 10;
        const driftY = Math.sin(elapsed * 0.34 + columnIndex * 2.1) * 22;
        column.list.style.transform = `translate3d(${driftX.toFixed(2)}px, ${(-column.height + loop + driftY).toFixed(2)}px, 0)`;

        const cards = column.list.children;
        for (let index = 0; index < cards.length; index += 1) {
          const card = cards[index];
          const wave = Math.sin(elapsed * 0.52 + index * 0.74 + columnIndex * 1.25) * 5.2;
          const breathe = 1 + Math.sin(elapsed * 0.38 + index * 0.41) * 0.006;
          card.style.transform = `translate3d(0, ${wave.toFixed(2)}px, 0) scale(${breathe.toFixed(4)})`;
          const img = card.querySelector("img");
          if (img) {
            img.style.transform = `translate3d(0, ${(wave * -0.42).toFixed(2)}px, 0) scale(1.055)`;
          }
        }
      });

      raf = window.requestAnimationFrame(render);
    };

    const onWheel = (event) => {
      if (!isCircularGallery() || !isGalleryBrowsingMode()) return;
      event.preventDefault();
      event.stopPropagation();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      scrollTarget += delta * 0.68;
    };

    const onPointerDown = (event) => {
      if (!isGalleryBrowsingMode()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      isDown = true;
      didDrag = false;
      activeCard = getCardFromEvent(event);
      startY = event.clientY;
      pointerDeltaY = 0;
      dragStartTarget = scrollTarget;
      root.classList.add("is-dragging");
      root.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!isDown) return;
      const dy = event.clientY - startY;
      pointerDeltaY = dy;
      if (Math.abs(dy) > 14) {
        didDrag = true;
        scrollTarget = dragStartTarget - dy * 1.4;
      }
    };

    const onPointerUp = (event) => {
      if (!isDown) return;
      isDown = false;
      root.classList.remove("is-dragging");
      root.releasePointerCapture?.(event.pointerId);
      if (didDrag && Math.abs(pointerDeltaY) > 14) {
        activeCard = null;
        return;
      }

      const card = activeCard || getCardFromEvent(event);
      activeCard = null;
      if (!card) return;
      suppressNextClick = true;
      openCard(card);
    };

    const onClick = (event) => {
      if (!isGalleryBrowsingMode()) return;
      const card = getCardFromEvent(event);
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      if (suppressNextClick) {
        suppressNextClick = false;
        event.stopImmediatePropagation?.();
        return;
      }
      if (didDrag) return;
      openCard(card);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("click", onClick, true);
    raf = window.requestAnimationFrame(render);

    circularCleanup = () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel, { capture: true });
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("click", onClick, true);
      root.classList.remove("is-dom-fallback", "is-waterfall");
      root.innerHTML = "";
    };
  };

  const initCircularGallery = (items) => {
    destroyCircularGallery();
    const root = workGalleryTrack?.querySelector(".work-circular-root");
    if (!root) return;

    const sourceItems = items.length ? items : getAllWorkGalleryItems();
    if (!sourceItems.length) return;

    root.innerHTML = "";
    initDomCircularGallery(root, sourceItems);
  };

  const buildGalleryItems = (items, { defer = false } = {}) => {
    if (!workGalleryTrack) return;
    gallerySourceItems = items;
    destroyCircularGallery();
    workGallery?.classList.add("is-circular");
    workGalleryTrack.style.transform = "translate3d(0, 0, 0)";
    workGalleryTrack.innerHTML = `
      <div class="work-circular-root">
      </div>
    `;
    if (defer) {
      window.requestAnimationFrame(() => {
        if (!galleryOpen || !isGalleryBrowsingMode()) return;
        initCircularGallery(items);
      });
      return;
    }
    initCircularGallery(items);
  };

  const prewarmCircularGallery = () => {
    if (circularPrewarmStarted) return;
    circularPrewarmStarted = true;
    const runIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 650));

    runIdle(() => {
      const items = getAllWorkGalleryItems();
      items.forEach((item) => {
        if (!circularImageCache.has(item.src)) {
          const img = new Image();
          img.decoding = "async";
          img.src = item.src;
          circularImageCache.set(item.src, img);
          if (img.decode) img.decode().catch(() => {});
        }
      });
    }, { timeout: 1800 });
  };

  const renderWorkDetail = (item, index) => {
    if (!workDetail) return;
    const currentLang = getCurrentLang();
    const title = getGalleryItemTitle(item, index);
    const copy = galleryText[currentLang];
    const summary = localizedValue(item.summary) || copy.summary;
    const body = item.body ? item.body.map(localizedValue) : copy.body;
    const tags = item.tags ? item.tags.map(localizedValue) : copy.tags;
    workDetail.innerHTML = `
      <section class="work-detail-intro">
        <aside class="work-detail-side">
          <div>
            <p class="work-detail-kicker">${copy.project} ${getGalleryDisplayIndex(item, index)}</p>
            <h4 class="work-detail-name">${title}</h4>
            <div class="work-detail-tags">
              ${tags.map((tag) => `<span class="work-detail-tag">${tag}</span>`).join("")}
            </div>
          </div>
          <div class="work-detail-body">
            <p class="work-detail-copy">${summary}</p>
            ${body.map((line) => `<p>${line}</p>`).join("")}
          </div>
        </aside>
        <figure class="work-detail-hero" style="--gallery-position: ${item.position || "center"};">
          <img src="${item.src}" alt="" decoding="async">
        </figure>
      </section>
      <section class="work-detail-full">
        <figure class="work-detail-full-figure" style="--gallery-position: ${item.position || "center"};">
          <img src="${item.src}" alt="" decoding="async">
        </figure>
      </section>
    `;
    workGallery?.style.setProperty("--work-detail-reveal", "0");
  };

  const renderProjectDetail = (project, index) => {
    if (!workDetail || !project) return;
    const currentLang = getCurrentLang();
    const copy = galleryText[currentLang];
    const items = project.items || [];
    const cover = items[0] || project;
    const title = getGalleryItemTitle(project, index);
    const categoryTitle = copy.categoryTitles?.[project.categoryKey] || copy.project;
    const imageLabel = currentLang === "zh" ? `${items.length} 张图片` : `${items.length} IMAGES`;
    const summary = getGalleryCategoryDescription(project);
    const detailItems = items.length ? items : [cover];
    const getProjectFrameClass = (item) => (
      /\.png(?:[?#].*)?$/i.test(item?.src || "") ? " is-png-frame" : ""
    );
    workDetail.innerHTML = `
      <section class="work-project-case">
        <aside class="work-detail-side work-project-info">
          <div>
            <p class="work-detail-kicker">${categoryTitle} ${getGalleryDisplayIndex(project, index)}</p>
            <h4 class="work-detail-name">${title}</h4>
            <div class="work-detail-tags">
              <span class="work-detail-tag">${categoryTitle}</span>
              <span class="work-detail-tag">${imageLabel}</span>
            </div>
          </div>
          <div class="work-detail-body">
            <p class="work-detail-copy">${summary}</p>
            <p>${copy.summary}</p>
          </div>
        </aside>
        <div class="work-project-stream" aria-label="${title}">
            ${detailItems.map((item, itemIndex) => `
              <section class="work-detail-full work-project-panel${itemIndex === 0 ? " is-hero-panel" : ""}${itemIndex % 3 === 1 ? " is-split-panel" : ""}" data-project-panel style="--project-image-index: ${itemIndex};">
                <figure class="work-detail-full-figure${getProjectFrameClass(item)}" style="--gallery-position: ${item.position || "center"};">
                  <img
                    src="${item.src}"
                    alt=""
                    decoding="async"
                    loading="${itemIndex < 2 ? "eager" : "lazy"}"
                    ${itemIndex === 0 ? 'fetchpriority="high"' : 'fetchpriority="low"'}
                  >
                  <figcaption class="work-project-image-caption">${String(itemIndex + 1).padStart(2, "0")} / ${getGalleryItemTitle(item, itemIndex)}</figcaption>
                </figure>
              </section>
            `).join("")}
        </div>
      </section>
    `;
    workGallery?.style.setProperty("--work-detail-reveal", "0");
    setupProjectDetailMotion();
  };

  const updateWorkDetailReveal = () => {
    if (!workGallery || galleryMode !== "detail") return;
    const figure = workGallery.querySelector(".work-detail-full-figure");
    if (!figure) return;

    const galleryRect = workGallery.getBoundingClientRect();
    const figureRect = figure.getBoundingClientRect();
    const revealLine = galleryRect.top + galleryRect.height * 0.76;
    const revealDistance = Math.max(320, galleryRect.height * 0.5);
    const progress = Math.max(0, Math.min(1, (revealLine - figureRect.top) / revealDistance));
    workGallery.style.setProperty("--work-detail-reveal", progress.toFixed(4));
  };

  const queueWorkDetailReveal = () => {
    if (galleryMode !== "detail") return;
    if (workDetailRevealRaf) return;
    workDetailRevealRaf = window.requestAnimationFrame(() => {
      workDetailRevealRaf = 0;
      updateWorkDetailReveal();
    });
  };

  const openWorkDetail = (index) => {
    if (!workGallery) return;
    const items = gallerySourceItems.length ? gallerySourceItems : getAllWorkGalleryItems();
    const item = items[index] || items[0];
    galleryStep = Math.max(0, Math.min(items.length - 1, index));
    galleryMode = "detail";
    destroyCircularGallery();
    teardownProjectDetailMotion();
    renderWorkDetail(item, galleryStep);
    workGallery.classList.add("is-detail");
    workGallery.classList.remove("is-circular");
    updateGalleryChromeText();
    updateGalleryHeader(item, galleryStep);
    workGallery.scrollTo({ top: 0, behavior: "auto" });
    queueWorkDetailReveal();
    runtime?.playUiTone?.("click");
  };

  const openProjectDetail = (index) => {
    if (!workGallery) return;
    const projects = gallerySourceItems.length ? gallerySourceItems : getGalleryProjects(galleryCategory);
    const project = projects[index] || projects[0];
    if (!project) return;
    galleryStep = Math.max(0, Math.min(projects.length - 1, index));
    galleryCurrentProject = project;
    galleryMode = "project-detail";
    destroyCircularGallery();
    renderProjectDetail(project, galleryStep);
    workGallery.classList.add("is-detail", "is-project-detail");
    workGallery.classList.remove("is-circular");
    updateGalleryChromeText();
    updateGalleryHeader(project, galleryStep);
    workGallery.scrollTo({ top: 0, behavior: "auto" });
    runtime?.playUiTone?.("click");
  };

  const returnToGalleryIndex = () => {
    if (!workGallery) return;
    galleryMode = "projects";
    teardownProjectDetailMotion();
    workGallery.classList.remove("is-detail", "is-project-detail");
    if (workDetail) workDetail.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
    galleryCurrentProject = null;
    const projects = getGalleryProjects(galleryCategory);
    buildGalleryItems(projects);
    const activeProject = projects[galleryStep] || projects[0];
    updateGalleryHeader(activeProject, galleryStep);
  };

  const refreshLanguage = () => {
    updateGalleryChromeText();
    if (!workGallery || !galleryOpen) return;

    const items = gallerySourceItems.length ? gallerySourceItems : getGalleryProjects(galleryCategory);

    if (galleryMode === "detail") {
      const item = items[galleryStep] || items[0];
      teardownProjectDetailMotion();
      renderWorkDetail(item, galleryStep);
      updateGalleryHeader(item, galleryStep);
      return;
    }

    if (galleryMode === "project-detail") {
      const project = galleryCurrentProject || items[galleryStep] || items[0];
      renderProjectDetail(project, galleryStep);
      updateGalleryHeader(project, galleryStep);
      return;
    }

    buildGalleryItems(items);
    const activeItem = items[galleryStep];
    updateGalleryHeader(activeItem, galleryStep);
  };

  const showGallery = () => {
    runtime?.hideWorksPreview?.();
    galleryReturnY = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add("work-gallery-open");
    document.documentElement.classList.add("work-gallery-open");
    workGallery.setAttribute("aria-hidden", "false");
    workGallery.classList.remove("is-open");
    void workGallery.offsetWidth;
    workGallery.classList.add("is-open");
    galleryOpen = true;
    runtime?.playUiTone?.("click");
  };

  const openFromHeroCard = ({ projectKey, projectIndex = 0, cardName = "Project" } = {}) => {
    if (!workGallery || !workGalleryTrack || !projectKey) return;

    galleryCategory = projectKey;
    const projects = getGalleryProjects(projectKey);
    const initialIndex = Math.max(0, Math.min(projects.length - 1, projectIndex));

    galleryStep = initialIndex;
    galleryMode = "projects";
    galleryCurrentProject = null;
    teardownProjectDetailMotion();
    workGallery.classList.remove("is-detail");
    workGallery.classList.remove("is-project-detail");
    if (workDetail) workDetail.innerHTML = "";

    updateGalleryChromeText();
    updateGalleryHeader(projects[initialIndex] || projects[0], initialIndex, cardName);

    buildGalleryItems(projects, { defer: true });
    showGallery();
    workGallery.scrollTo({ top: 0, behavior: "auto" });
  };

  const getCategoryTitle = (category) => {
    const currentLang = getCurrentLang();
    return galleryText[currentLang]?.categoryTitles?.[category]
      || galleryText.zh?.categoryTitles?.[category]
      || "Project";
  };

  const openCategory = (category = "oem", title = getCategoryTitle(category)) => {
    if (!workGallery || !workGalleryTrack) return;
    const projects = getGalleryProjects(category);
    const initialIndex = 0;
    galleryCategory = category;
    galleryMode = "projects";
    galleryStep = initialIndex;
    galleryCurrentProject = null;
    teardownProjectDetailMotion();
    workGallery.classList.remove("is-detail");
    workGallery.classList.remove("is-project-detail");
    if (workDetail) workDetail.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
    updateGalleryChromeText();
    updateGalleryHeader(projects[initialIndex], initialIndex, title);
    buildGalleryItems(projects, { defer: true });
    showGallery();
  };

  const openWorkGallery = (row) => {
    const category = row.dataset.category || "oem";
    const title = row.querySelector(".works-row-name")?.textContent.trim() || getCategoryTitle(category);
    if (row.dataset.projectIndex) {
      openProject({ category, projectIndex: row.dataset.projectIndex, title });
      return;
    }
    openCategory(category, title);
  };

  const openProject = ({ category = "oem", projectIndex = 0, title = "" } = {}) => {
    const parsedIndex = Number.parseInt(projectIndex, 10);
    openFromHeroCard({
      projectKey: category,
      projectIndex: Number.isFinite(parsedIndex) ? parsedIndex : 0,
      cardName: title || getCategoryTitle(category),
    });
  };

  const close = () => {
    if (!workGallery) return;
    const restorePageScroll = () => {
      if (galleryReturnY <= 0) return;
      window.scrollTo(0, galleryReturnY);
      window.requestAnimationFrame(() => window.scrollTo(0, galleryReturnY));
    };

    if (!galleryOpen) {
      workGallery.classList.remove("is-open", "is-detail", "is-project-detail", "is-circular");
      workGallery.setAttribute("aria-hidden", "true");
      document.body.classList.remove("work-gallery-open");
      document.documentElement.classList.remove("work-gallery-open");
      if (workGalleryTrack) workGalleryTrack.innerHTML = "";
      restorePageScroll();
      return;
    }
    galleryOpen = false;
    galleryMode = "projects";
    galleryCurrentProject = null;
    teardownProjectDetailMotion();
    destroyCircularGallery();
    workGallery.classList.remove("is-open");
    workGallery.classList.remove("is-detail");
    workGallery.classList.remove("is-project-detail");
    workGallery.classList.remove("is-circular");
    workGallery.setAttribute("aria-hidden", "true");
    document.body.classList.remove("work-gallery-open");
    document.documentElement.classList.remove("work-gallery-open");
    if (workDetail) workDetail.innerHTML = "";
    if (workGalleryTrack) workGalleryTrack.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
    if (workGalleryDescription) workGalleryDescription.textContent = "";
    restorePageScroll();
  };

  worksRows.forEach((row) => {
    row.addEventListener("click", () => openWorkGallery(row));
    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openWorkGallery(row);
    });
  });

  workGalleryBack?.addEventListener("click", returnToGalleryIndex);
  workGalleryClose?.addEventListener("click", close);
  workGallery?.addEventListener("scroll", queueWorkDetailReveal, { passive: true });
  window.addEventListener("resize", () => {
    if (!galleryOpen) return;
    queueWorkDetailReveal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector("#wechat-qr-modal.is-open")) return;
    if (event.key === "Escape") close();
  });

  updateGalleryChromeText();
  prewarmCircularGallery();

  window.LucianWorkGallery = {
    close,
    openCategory,
    openProject,
    openFromHeroCard,
    refreshLanguage,
  };
})();
