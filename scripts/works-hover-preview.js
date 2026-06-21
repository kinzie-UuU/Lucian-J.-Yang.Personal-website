(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const worksPreview = document.querySelector("#works-hover-preview");
  const worksPreviewImg = document.querySelector("#works-preview-img");
  const worksRows = Array.from(document.querySelectorAll(".works-row"));

  const hideWorksPreview = () => {
    worksPreview?.classList.remove("is-visible");
    worksPreviewImg?.classList.remove("is-waving");
  };

  runtime.hideWorksPreview = hideWorksPreview;

  const getDistance = (x1, y1, x2, y2) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  };

  const getClosestVerticalEdge = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const topDistance = getDistance(x, y, rect.width / 2, 0);
    const bottomDistance = getDistance(x, y, rect.width / 2, rect.height);
    return topDistance < bottomDistance ? "top" : "bottom";
  };

  const getRowText = (row) => row.querySelector(".works-row-name")?.textContent?.trim() || "";

  const getRowImage = (row) => {
    if (row.dataset.featuredSrc) return row.dataset.featuredSrc;

    const category = row.dataset.category || "oem";
    const projectIndex = Number.parseInt(row.dataset.projectIndex || "", 10);
    const project = Number.isFinite(projectIndex)
      ? window.workGalleryProjects?.[category]?.[projectIndex]
      : null;
    if (project?.cover || project?.src) return project.cover || project.src;

    const imagePool = window.workGalleryImages?.[category] || [];
    return imagePool[0]?.src || "";
  };

  const buildFlowingMenu = (row) => {
    const existing = row.querySelector(".works-flowing-menu");
    if (existing) return existing;

    const text = getRowText(row);
    const image = getRowImage(row);
    const overlay = document.createElement("span");
    const inner = document.createElement("span");
    const contentWidthEstimate = Math.max(220, text.length * 32 + 240);
    const repetitions = Math.min(5, Math.max(3, Math.ceil(window.innerWidth / contentWidthEstimate) + 2));

    overlay.className = "works-flowing-menu";
    overlay.setAttribute("aria-hidden", "true");
    inner.className = "works-flowing-menu-inner";

    for (let index = 0; index < repetitions; index += 1) {
      const part = document.createElement("span");
      const label = document.createElement("span");
      const media = document.createElement("span");

      part.className = "works-flowing-menu-part";
      label.className = "works-flowing-menu-text";
      media.className = "works-flowing-menu-img";
      label.textContent = text;
      if (image) media.style.backgroundImage = `url("${image}")`;

      part.append(label, media);
      inner.appendChild(part);
    }

    overlay.appendChild(inner);
    row.appendChild(overlay);
    row.style.setProperty("--flowing-menu-distance", `${contentWidthEstimate}px`);
    return overlay;
  };

  const resetFlowingMenuText = (row) => {
    row.querySelector(".works-flowing-menu")?.remove();
    row.style.removeProperty("--flowing-menu-distance");
  };

  const showFlowingMenu = (row, edge) => {
    const overlay = buildFlowingMenu(row);
    const inner = overlay.querySelector(".works-flowing-menu-inner");
    if (!inner) return;

    overlay.style.transition = "none";
    inner.style.transition = "none";
    overlay.style.transform = edge === "top" ? "translate3d(0, -101%, 0)" : "translate3d(0, 101%, 0)";
    inner.style.transform = edge === "top" ? "translate3d(0, 101%, 0)" : "translate3d(0, -101%, 0)";

    window.requestAnimationFrame(() => {
      row.classList.add("is-flowing");
      overlay.style.transition = "";
      inner.style.transition = "";
      overlay.style.transform = "translate3d(0, 0, 0)";
      inner.style.transform = "translate3d(0, 0, 0)";
    });
  };

  const hideFlowingMenu = (row, edge) => {
    const overlay = row.querySelector(".works-flowing-menu");
    const inner = row.querySelector(".works-flowing-menu-inner");
    if (!overlay || !inner) return;
    row.classList.remove("is-flowing");
    overlay.style.transform = edge === "top" ? "translate3d(0, -101%, 0)" : "translate3d(0, 101%, 0)";
    inner.style.transform = edge === "top" ? "translate3d(0, 101%, 0)" : "translate3d(0, -101%, 0)";
  };

  window.LucianWorksFlowingMenu = {
    refresh() {
      worksRows.forEach(resetFlowingMenuText);
    },
  };

  worksRows.forEach((row) => {
    row.removeAttribute("role");
    if (!row.hasAttribute("tabindex")) row.setAttribute("tabindex", "0");

    row.addEventListener("mouseenter", (event) => {
      hideWorksPreview();
      showFlowingMenu(row, getClosestVerticalEdge(event, row));
    });

    row.addEventListener("mouseleave", (event) => {
      hideFlowingMenu(row, getClosestVerticalEdge(event, row));
    });

    row.addEventListener("focus", () => {
      hideWorksPreview();
      showFlowingMenu(row, "bottom");
    });

    row.addEventListener("blur", () => {
      hideFlowingMenu(row, "bottom");
    });
  });
})();
