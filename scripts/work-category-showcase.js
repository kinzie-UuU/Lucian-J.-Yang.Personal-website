(() => {
  const track = document.querySelector("#works-category-track");
  if (!track) return;

  const categories = ["gift", "brand", "aigc", "aigc-video"];
  const labels = {
    zh: {
      gift: "礼品福利",
      brand: "品牌字体",
      aigc: "AIGC流",
      "aigc-video": "视频创作",
    },
    en: {
      gift: "Gifting",
      brand: "Brand Type",
      aigc: "AIGC Flow",
      "aigc-video": "Video",
    },
  };

  const getLangKey = () => (
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ? "en" : "zh"
  );

  const getLabel = (category) => labels[getLangKey()]?.[category] || labels.zh[category] || category;

  const getDescription = (category) => {
    const lang = getLangKey();
    return window.galleryText?.[lang]?.categoryDescriptions?.[category]
      || window.galleryText?.zh?.categoryDescriptions?.[category]
      || "";
  };

  const createPreviewImage = (item, index) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    figure.className = "works-category-image";
    figure.style.setProperty("--image-index", index);
    img.src = item.src;
    img.alt = item.title || "";
    img.loading = "lazy";
    img.decoding = "async";
    figure.appendChild(img);
    return figure;
  };

  const render = () => {
    const lang = getLangKey();
    track.innerHTML = "";

    categories.forEach((category, categoryIndex) => {
      const items = (window.workGalleryImages?.[category] || []).filter((item) => item?.src).slice(0, 3);
      if (!items.length) return;

      const article = document.createElement("article");
      const meta = document.createElement("div");
      const index = document.createElement("p");
      const title = document.createElement("h3");
      const description = document.createElement("p");
      const images = document.createElement("div");

      article.className = "works-category-card";
      article.dataset.category = category;
      meta.className = "works-category-meta";
      index.className = "works-category-index";
      title.className = "works-category-name";
      description.className = "works-category-description";
      images.className = "works-category-images";

      index.textContent = String(categoryIndex + 1).padStart(2, "0");
      title.textContent = getLabel(category);
      description.textContent = getDescription(category);
      items.forEach((item, imageIndex) => images.appendChild(createPreviewImage(item, imageIndex)));

      meta.append(index, title, description);
      article.append(meta, images);
      track.appendChild(article);
    });

    const heading = document.querySelector(".works-category-title");
    if (heading) heading.textContent = lang === "en" ? "Other Directions" : "其余方向";
  };

  render();
  window.LucianWorkCategoryShowcase = {
    refreshLanguage: render,
  };
})();
