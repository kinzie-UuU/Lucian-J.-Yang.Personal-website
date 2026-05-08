(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const worksPreview = document.querySelector("#works-hover-preview");
  const worksPreviewImg = document.querySelector("#works-preview-img");
  const worksRows = Array.from(document.querySelectorAll(".works-row"));

  const categoryColors = {
    oem: ["#2a2420", "#3d3028", "#4a3a30", "#352a22"],
    gift: ["#2e2228", "#3a2a32", "#4a3040", "#2a1e28"],
    brand: ["#222820", "#2c3228", "#343c2e", "#1e2418"],
    aigc: ["#1a1c22", "#20222c", "#242830", "#1c1e26"],
    "aigc-video": ["#161820", "#202436", "#283048", "#12141d"],
  };

  const categoryPatterns = {
    oem: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
    gift: "repeating-linear-gradient(-45deg, rgba(255,200,180,0.06) 0px, rgba(255,200,180,0.06) 1px, transparent 1px, transparent 10px)",
    brand: "repeating-linear-gradient(0deg, rgba(180,200,120,0.05) 0px, rgba(180,200,120,0.05) 1px, transparent 1px, transparent 11px)",
    aigc: "repeating-linear-gradient(135deg, rgba(140,160,220,0.06) 0px, rgba(140,160,220,0.06) 1px, transparent 1px, transparent 9px)",
    "aigc-video": "repeating-linear-gradient(120deg, rgba(150,180,255,0.07) 0px, rgba(150,180,255,0.07) 1px, transparent 1px, transparent 8px)",
  };

  let previewRaf = null;
  let previewTarget = { x: 0, y: 0 };
  let previewCurrent = { x: 0, y: 0 };

  const animatePreview = () => {
    previewCurrent.x += (previewTarget.x - previewCurrent.x) * 0.12;
    previewCurrent.y += (previewTarget.y - previewCurrent.y) * 0.12;
    if (worksPreview) {
      worksPreview.style.transform = `translate(${previewCurrent.x}px, ${previewCurrent.y}px)`;
    }
    previewRaf = requestAnimationFrame(animatePreview);
  };

  const hideWorksPreview = () => {
    worksPreview?.classList.remove("is-visible");
    worksPreviewImg?.classList.remove("is-waving");
    if (previewRaf) {
      cancelAnimationFrame(previewRaf);
      previewRaf = null;
    }
  };

  runtime.hideWorksPreview = hideWorksPreview;

  worksRows.forEach((row) => {
    const cat = row.dataset.category;
    const colors = categoryColors[cat] || categoryColors.oem;
    const pattern = categoryPatterns[cat] || categoryPatterns.oem;
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");

    row.addEventListener("mouseenter", () => {
      if (worksPreviewImg) {
        const imagePool = workGalleryImages?.[cat] || [];
        const imageItem = imagePool[0];
        worksPreviewImg.classList.remove("is-image-preview", "is-waving");
        if (imageItem?.src) {
          worksPreviewImg.style.setProperty("--preview-image", `url("${imageItem.src}")`);
          worksPreviewImg.style.setProperty("--preview-position", imageItem.position || "center");
          worksPreviewImg.style.removeProperty("--preview-fallback");
          worksPreviewImg.classList.add("is-image-preview");
          if (!runtime.reducedMotion) {
            void worksPreviewImg.offsetWidth;
            worksPreviewImg.classList.add("is-waving");
          }
        } else {
          const bg = colors[0];
          worksPreviewImg.style.setProperty("--preview-image", "none");
          worksPreviewImg.style.setProperty("--preview-position", "center");
          worksPreviewImg.style.setProperty("--preview-fallback", `${pattern}, ${bg}`);
        }
      }

      worksPreview?.classList.add("is-visible");
      const rect = row.getBoundingClientRect();
      previewTarget.x = rect.left + rect.width * 0.67 - 120;
      previewTarget.y = rect.top + rect.height * 0.32;
      if (!previewRaf) previewRaf = requestAnimationFrame(animatePreview);
    });

    row.addEventListener("mousemove", (event) => {
      const rect = row.getBoundingClientRect();
      const anchorX = rect.left + rect.width * 0.67 - 120;
      const anchorY = rect.top + rect.height * 0.32;
      const driftX = (event.clientX - (rect.left + rect.width * 0.5)) * 0.38;
      const driftY = (event.clientY - (rect.top + rect.height * 0.5)) * 0.42;
      previewTarget.x = anchorX + driftX;
      previewTarget.y = anchorY + driftY;
    });

    row.addEventListener("mouseleave", hideWorksPreview);
  });
})();

