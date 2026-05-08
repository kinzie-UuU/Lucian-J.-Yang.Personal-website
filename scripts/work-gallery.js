(() => {
  const runtime = window.LucianRuntime;
  const worksRows = Array.from(document.querySelectorAll(".works-row"));
  const workGallery = document.querySelector("#work-gallery");
  const workGalleryTrack = document.querySelector("#work-gallery-track");
  const workGalleryTitle = document.querySelector("#work-gallery-title");
  const workGalleryIndex = document.querySelector("#work-gallery-index");
  const workGalleryClose = document.querySelector("#work-gallery-close");
  const workGalleryBack = document.querySelector("#work-gallery-back");
  const workGalleryProgressFill = document.querySelector("#work-gallery-progress-fill");
  const workDetail = document.querySelector("#work-detail");

  let galleryTargetX = 0;
  let galleryCurrentX = 0;
  let galleryMaxX = 0;
  let galleryRaf = 0;
  let galleryOpen = false;
  let galleryMode = "index";
  let galleryCategory = "oem";
  let galleryStep = 0;
  let galleryWheelLocked = false;
  let galleryPositions = [0];
  let workDetailRevealRaf = 0;

  const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";

  const localizedValue = (value) => {
    const currentLang = getCurrentLang();
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLang] || value.en || value.zh || "";
    }
    return value || "";
  };

  const getGalleryItemTitle = (item, index) => {
    const currentLang = getCurrentLang();
    const rawTitle = localizedValue(item?.title);
    if (currentLang === "zh") {
      if (item?.title && typeof item.title === "object" && item.title.zh) return rawTitle;
      const giftMatch = rawTitle.match(/^GIFT PROJECT\s+(\d+)/i);
      if (giftMatch) return `${galleryText.zh.giftTitle} ${giftMatch[1]}`;
      const categoryTitle = galleryText.zh.categoryTitles[galleryCategory] || galleryText.zh.project;
      return `${categoryTitle} ${String(index + 1).padStart(2, "0")}`;
    }
    return rawTitle || `${galleryText[currentLang].project} ${String(index + 1).padStart(2, "0")}`;
  };

  const updateGalleryChromeText = () => {
    const currentLang = getCurrentLang();
    if (workGalleryBack) workGalleryBack.textContent = galleryText[currentLang].back;
    if (workGalleryClose) {
      workGalleryClose.textContent = galleryText[currentLang].close;
      workGalleryClose.setAttribute("aria-label", galleryText[currentLang].close);
    }
  };

  const clampGalleryX = (value) => Math.max(0, Math.min(galleryMaxX, value));

  const measureGallery = () => {
    if (!workGalleryTrack || !workGallery) return;
    galleryMaxX = Math.max(0, workGalleryTrack.scrollWidth - workGallery.clientWidth);
    const items = Array.from(workGalleryTrack.children);
    const firstLeft = items[0]?.offsetLeft || 0;
    galleryPositions = items.map((item) => clampGalleryX(item.offsetLeft - firstLeft));
    if (!galleryPositions.length) galleryPositions = [0];
    galleryStep = Math.max(0, Math.min(galleryPositions.length - 1, galleryStep));
    galleryTargetX = clampGalleryX(galleryTargetX);
    galleryCurrentX = clampGalleryX(galleryCurrentX);
  };

  const renderGallery = () => {
    galleryRaf = 0;
    galleryCurrentX += (galleryTargetX - galleryCurrentX) * 0.16;
    if (Math.abs(galleryTargetX - galleryCurrentX) < 0.12) galleryCurrentX = galleryTargetX;
    if (workGalleryTrack) {
      workGalleryTrack.style.transform = `translate3d(${-galleryCurrentX}px, 0, 0)`;
    }
    if (workGalleryProgressFill) {
      const progress = galleryMaxX ? galleryCurrentX / galleryMaxX : 0;
      workGalleryProgressFill.style.transform = `scaleX(${Math.max(0.04, progress).toFixed(4)})`;
    }
    if (galleryCurrentX !== galleryTargetX) {
      galleryRaf = window.requestAnimationFrame(renderGallery);
    }
  };

  const queueGalleryRender = () => {
    if (!galleryRaf) galleryRaf = window.requestAnimationFrame(renderGallery);
  };

  const buildGalleryItems = (items) => {
    if (!workGalleryTrack) return;
    workGalleryTrack.innerHTML = items.map((item, index) => `
      <article class="work-gallery-item ${item.size === "small" ? "is-small" : ""}" role="button" tabindex="0" data-project-index="${index}">
        <p class="work-gallery-caption">${getGalleryItemTitle(item, index)}</p>
        <div class="work-gallery-frame" style="--gallery-bg: ${item.bg || "#d8d0c0"}; --gallery-position: ${item.position || "center"};">
          <img src="${item.src}" alt="" decoding="async">
        </div>
      </article>
    `).join("");
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
            <p class="work-detail-kicker">${copy.project} ${String(index + 1).padStart(2, "0")}</p>
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
    if (workDetailRevealRaf) return;
    workDetailRevealRaf = window.requestAnimationFrame(() => {
      workDetailRevealRaf = 0;
      updateWorkDetailReveal();
    });
  };

  const openWorkDetail = (index) => {
    if (!workGallery) return;
    const items = workGalleryImages[galleryCategory] || workGalleryImages.oem;
    const item = items[index] || items[0];
    galleryStep = Math.max(0, Math.min(items.length - 1, index));
    galleryMode = "detail";
    renderWorkDetail(item, galleryStep);
    workGallery.classList.add("is-detail");
    updateGalleryChromeText();
    if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(item, galleryStep);
    if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
    workGallery.scrollTo({ top: 0, behavior: "auto" });
    queueWorkDetailReveal();
    runtime?.playUiTone?.("click");
  };

  const returnToGalleryIndex = () => {
    if (!workGallery) return;
    galleryMode = "index";
    workGallery.classList.remove("is-detail");
    if (workDetail) workDetail.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
    const activeItem = workGalleryTrack?.children[galleryStep];
    if (workGalleryTitle) {
      workGalleryTitle.textContent = activeItem?.querySelector(".work-gallery-caption")?.textContent || galleryText[getCurrentLang()].project;
    }
    queueGalleryRender();
  };

  const refreshLanguage = () => {
    updateGalleryChromeText();
    if (!workGallery || !galleryOpen) return;

    const items = workGalleryImages[galleryCategory] || workGalleryImages.oem;

    if (galleryMode === "detail") {
      const item = items[galleryStep] || items[0];
      renderWorkDetail(item, galleryStep);
      if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(item, galleryStep);
      if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
      return;
    }

    buildGalleryItems(items);
    const activeItem = workGalleryTrack?.children[galleryStep];
    if (workGalleryTitle) {
      workGalleryTitle.textContent = activeItem?.querySelector(".work-gallery-caption")?.textContent || galleryText[getCurrentLang()].project;
    }
    measureGallery();
    queueGalleryRender();
  };

  const showGallery = () => {
    runtime?.hideWorksPreview?.();
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
    const items = workGalleryImages[projectKey] || workGalleryImages.oem;

    buildGalleryItems(items);
    galleryTargetX = 0;
    galleryCurrentX = 0;
    galleryStep = projectIndex;
    galleryWheelLocked = false;
    galleryMode = "detail";
    renderWorkDetail(items[projectIndex] || items[0], projectIndex);
    workGallery.classList.add("is-detail");

    updateGalleryChromeText();
    if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(items[projectIndex] || items[0], projectIndex) || cardName;
    if (workGalleryIndex) workGalleryIndex.textContent = String(projectIndex + 1).padStart(2, "0");

    showGallery();
    workGallery.scrollTo({ top: 0, behavior: "auto" });
    queueWorkDetailReveal();

    window.setTimeout(() => {
      measureGallery();
      queueGalleryRender();
    }, 40);
  };

  const openWorkGallery = (row) => {
    if (!workGallery || !workGalleryTrack) return;
    const category = row.dataset.category || "oem";
    const index = row.querySelector(".works-row-index")?.textContent.trim() || "";
    const title = row.querySelector(".works-row-name")?.textContent.trim() || "Project";
    galleryCategory = category;
    galleryMode = "index";
    buildGalleryItems(workGalleryImages[category] || workGalleryImages.oem);
    galleryTargetX = 0;
    galleryCurrentX = 0;
    galleryStep = 0;
    galleryWheelLocked = false;
    workGallery.classList.remove("is-detail");
    if (workDetail) workDetail.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
    updateGalleryChromeText();
    if (workGalleryTitle) workGalleryTitle.textContent = title;
    if (workGalleryIndex) workGalleryIndex.textContent = index;

    showGallery();
    window.setTimeout(() => {
      measureGallery();
      queueGalleryRender();
    }, 40);
  };

  const close = () => {
    if (!workGallery || !galleryOpen) return;
    galleryOpen = false;
    galleryMode = "index";
    workGallery.classList.remove("is-open");
    workGallery.classList.remove("is-detail");
    workGallery.setAttribute("aria-hidden", "true");
    document.body.classList.remove("work-gallery-open");
    document.documentElement.classList.remove("work-gallery-open");
    if (workDetail) workDetail.innerHTML = "";
    workGallery.style.setProperty("--work-detail-reveal", "0");
  };

  const handleWorkGalleryWheel = (event) => {
    if (!galleryOpen) return;
    if (galleryMode === "detail") return;
    event.preventDefault();
    event.stopPropagation();
    measureGallery();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 8 || galleryWheelLocked) return;
    galleryWheelLocked = true;
    galleryStep += delta > 0 ? 1 : -1;
    galleryStep = Math.max(0, Math.min(galleryPositions.length - 1, galleryStep));
    galleryTargetX = galleryPositions[galleryStep] || 0;
    const activeItem = workGalleryTrack?.children[galleryStep];
    if (workGalleryTitle && activeItem) {
      workGalleryTitle.textContent = activeItem.querySelector(".work-gallery-caption")?.textContent || workGalleryTitle.textContent;
    }
    if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
    queueGalleryRender();
    window.setTimeout(() => {
      galleryWheelLocked = false;
    }, 260);
  };

  worksRows.forEach((row) => {
    row.addEventListener("click", () => openWorkGallery(row));
    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openWorkGallery(row);
    });
  });

  workGalleryTrack?.addEventListener("click", (event) => {
    const item = event.target.closest(".work-gallery-item");
    if (!item) return;
    openWorkDetail(Number(item.dataset.projectIndex || 0));
  });

  workGalleryTrack?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target.closest(".work-gallery-item");
    if (!item) return;
    event.preventDefault();
    openWorkDetail(Number(item.dataset.projectIndex || 0));
  });

  workGalleryBack?.addEventListener("click", returnToGalleryIndex);
  workGalleryClose?.addEventListener("click", close);
  workGallery?.addEventListener("scroll", queueWorkDetailReveal, { passive: true });
  window.addEventListener("wheel", handleWorkGalleryWheel, { passive: false, capture: true });
  window.addEventListener("resize", () => {
    if (!galleryOpen) return;
    measureGallery();
    queueGalleryRender();
    queueWorkDetailReveal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector("#wechat-qr-modal.is-open")) return;
    if (event.key === "Escape") close();
  });

  updateGalleryChromeText();

  window.LucianWorkGallery = {
    close,
    openFromHeroCard,
    refreshLanguage,
  };
})();
