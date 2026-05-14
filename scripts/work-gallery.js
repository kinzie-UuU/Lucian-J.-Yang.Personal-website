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

  let circularCleanup = null;
  let circularCurrentIndex = 0;
  const circularImageCache = new Map();
  const circularTextTextureCache = new Map();
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
    return;

    if (window.location.protocol === "file:") {
      initDomCircularGallery(root, sourceItems);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "work-circular-canvas";
    canvas.setAttribute("aria-label", galleryText[getCurrentLang()].project);
    root.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: false
    });

    if (!gl) {
      root.innerHTML = `<p class="work-circular-fallback">${galleryText[getCurrentLang()].project}</p>`;
      return;
    }

    const vertexSource = `
      precision mediump float;
      attribute vec2 aPosition;
      attribute vec2 aUv;
      uniform mat4 uMatrix;
      uniform vec2 uPlaneSize;
      uniform float uTime;
      uniform float uSpeed;
      uniform float uWave;
      varying vec2 vUv;
      void main() {
        vUv = aUv;
        vec3 p = vec3(aPosition * uPlaneSize, 0.0);
        float ripple = sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5;
        p.z += ripple * (uWave + abs(uSpeed) * 0.42);
        gl_Position = uMatrix * vec4(p, 1.0);
      }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform vec2 uImageSize;
      uniform vec2 uPlaneSize;
      uniform float uBorderRadius;
      uniform float uAlpha;
      uniform float uIsText;
      varying vec2 vUv;

      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p) - b;
        return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
      }

      void main() {
        if (uIsText > 0.5) {
          vec4 text = texture2D(uTexture, vUv);
          if (text.a < 0.08) discard;
          gl_FragColor = vec4(text.rgb, text.a * uAlpha);
          return;
        }

        vec2 ratio = vec2(
          min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
          min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
        );
        vec2 uv = vec2(
          vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
          vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );
        vec4 color = texture2D(uTexture, uv);
        float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
        float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
        gl_FragColor = vec4(color.rgb, color.a * alpha * uAlpha);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Work gallery shader failed.");
      }
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Work gallery program failed.");
    }
    gl.useProgram(program);

    const locations = {
      position: gl.getAttribLocation(program, "aPosition"),
      uv: gl.getAttribLocation(program, "aUv"),
      matrix: gl.getUniformLocation(program, "uMatrix"),
      planeSize: gl.getUniformLocation(program, "uPlaneSize"),
      imageSize: gl.getUniformLocation(program, "uImageSize"),
      time: gl.getUniformLocation(program, "uTime"),
      speed: gl.getUniformLocation(program, "uSpeed"),
      wave: gl.getUniformLocation(program, "uWave"),
      borderRadius: gl.getUniformLocation(program, "uBorderRadius"),
      alpha: gl.getUniformLocation(program, "uAlpha"),
      isText: gl.getUniformLocation(program, "uIsText"),
      texture: gl.getUniformLocation(program, "uTexture")
    };

    const createPlaneGeometry = (columns = 36, rows = 48) => {
      const vertices = [];
      const indices = [];
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= columns; x++) {
          const u = x / columns;
          const v = y / rows;
          vertices.push(u - 0.5, 0.5 - v, u, v);
        }
      }
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const a = y * (columns + 1) + x;
          const b = a + 1;
          const c = a + columns + 1;
          const d = c + 1;
          indices.push(a, c, b, b, c, d);
        }
      }
      return {
        vertices: new Float32Array(vertices),
        indices: new Uint16Array(indices),
        count: indices.length
      };
    };

    const geometry = createPlaneGeometry();
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(locations.uv);
    gl.vertexAttribPointer(locations.uv, 2, gl.FLOAT, false, 16, 8);

    const createTexture = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([36, 34, 30, 255]));
      return texture;
    };

    const uploadLoadedImage = (entry, img) => {
      try {
        entry.imageSize = [img.naturalWidth || 1, img.naturalHeight || 1];
        gl.bindTexture(gl.TEXTURE_2D, entry.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        entry.loaded = true;
      } catch (error) {
        entry.loaded = false;
      }
    };

    const uploadImageTexture = (entry) => {
      const cachedImage = circularImageCache.get(entry.item.src);
      if (cachedImage?.complete && cachedImage.naturalWidth) {
        uploadLoadedImage(entry, cachedImage);
        return;
      }

      const img = cachedImage || new Image();
      img.onload = () => {
        circularImageCache.set(entry.item.src, img);
        media
          .filter((mediaEntry) => mediaEntry.item.src === entry.item.src)
          .forEach((mediaEntry) => uploadLoadedImage(mediaEntry, img));
      };
      img.onerror = () => {
        entry.loaded = false;
      };
      circularImageCache.set(entry.item.src, img);
      img.src = entry.item.src;
    };

    const createTextTexture = (text) => {
      const cacheKey = `${getCurrentLang()}::${text}`;
      const cached = circularTextTextureCache.get(cacheKey);
      if (cached) {
        const texture = createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cached.canvas);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        return { texture, size: cached.size };
      }

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const textCanvas = document.createElement("canvas");
      const context = textCanvas.getContext("2d");
      const fontSize = 26 * ratio;
      context.font = `800 ${fontSize}px Arial, "Microsoft YaHei", sans-serif`;
      const metrics = context.measureText(text);
      textCanvas.width = Math.ceil(metrics.width + 42 * ratio);
      textCanvas.height = Math.ceil(52 * ratio);
      context.font = `700 ${fontSize}px Arial, "Microsoft YaHei", sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "rgba(244, 242, 237, 0.92)";
      context.clearRect(0, 0, textCanvas.width, textCanvas.height);
      context.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
      const texture = createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      circularTextTextureCache.set(cacheKey, { canvas: textCanvas, size: [textCanvas.width, textCanvas.height] });
      return { texture, size: [textCanvas.width, textCanvas.height] };
    };

    const identity = () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    const multiply = (a, b) => {
      const out = new Float32Array(16);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          out[j * 4 + i] =
            a[0 * 4 + i] * b[j * 4 + 0] +
            a[1 * 4 + i] * b[j * 4 + 1] +
            a[2 * 4 + i] * b[j * 4 + 2] +
            a[3 * 4 + i] * b[j * 4 + 3];
        }
      }
      return out;
    };
    const perspective = (fov, aspect, near, far) => {
      const f = 1 / Math.tan(fov / 2);
      const nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0
      ]);
    };
    const translate = (x, y, z) => {
      const out = identity();
      out[12] = x;
      out[13] = y;
      out[14] = z;
      return out;
    };
    const rotateX = (angle) => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    };
    const rotateY = (angle) => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    };
    const rotateZ = (angle) => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    };

    const transformPoint = (matrix, point) => {
      const [x, y, z, w] = point;
      return [
        matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w,
        matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w,
        matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w,
        matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w
      ];
    };

    const sourceLoop = sourceItems.concat(sourceItems);
    const media = sourceLoop.map((item, index) => {
      const itemIndex = index % sourceItems.length;
      const title = getGalleryItemTitle(item, itemIndex);
      const titleTexture = createTextTexture(title);
      const entry = {
        index,
        item,
        itemIndex,
        title,
        texture: createTexture(),
        titleTexture: titleTexture.texture,
        titleTextureSize: titleTexture.size,
        imageSize: [1, 1],
        loaded: false,
        hit: null
      };
      return entry;
    });
    media.forEach(uploadImageTexture);

    let screen = { width: 1, height: 1, dpr: 1, aspect: 1 };
    let metrics = { worldWidth: 12, worldHeight: 8, cardWidth: 2, cardHeight: 3, spacing: 3, bend: 3 };
    let scrollTarget = sourceItems.length + galleryStep;
    let scrollCurrent = scrollTarget;
    let scrollLast = scrollTarget;
    let raf = 0;
    let snapTimeout = 0;
    let disposed = false;
    let isDown = false;
    let didDrag = false;
    let openingDetail = false;
    let dragStartX = 0;
    let dragStartTarget = 0;
    let lastChromeIndex = -1;
    const cameraZ = 12;
    const startedAt = performance.now();

    const resize = () => {
      screen = {
        width: Math.max(1, root.clientWidth || window.innerWidth),
        height: Math.max(1, root.clientHeight || window.innerHeight),
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        aspect: 1
      };
      screen.aspect = screen.width / screen.height;
      canvas.width = Math.round(screen.width * screen.dpr);
      canvas.height = Math.round(screen.height * screen.dpr);
      canvas.style.width = `${screen.width}px`;
      canvas.style.height = `${screen.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const fov = 45 * Math.PI / 180;
      const worldHeight = 2 * Math.tan(fov / 2) * cameraZ;
      const worldWidth = worldHeight * screen.aspect;
      const cardHeight = clamp(worldHeight * 0.3, 2.35, 3.05);
      const cardWidth = cardHeight * 0.78;
      metrics = {
        worldWidth,
        worldHeight,
        cardWidth,
        cardHeight,
        spacing: cardWidth + 1.7,
        bend: clamp(worldHeight * 0.16, 1.25, 2.05)
      };
    };

    const normalizeScroll = () => {
      if (scrollTarget < sourceItems.length * 0.55) {
        scrollTarget += sourceItems.length;
        scrollCurrent += sourceItems.length;
      } else if (scrollTarget > sourceItems.length * 2.45) {
        scrollTarget -= sourceItems.length;
        scrollCurrent -= sourceItems.length;
      }
    };

    const syncChrome = () => {
      const nextIndex = ((Math.round(scrollCurrent) % sourceItems.length) + sourceItems.length) % sourceItems.length;
      if (nextIndex === lastChromeIndex) return;
      lastChromeIndex = nextIndex;
      circularCurrentIndex = nextIndex;
      const activeItem = sourceItems[circularCurrentIndex] || sourceItems[0];
      updateGalleryHeader(activeItem, circularCurrentIndex);
    };

    const snapToNearest = () => {
      scrollTarget = Math.round(scrollTarget);
    };

    const scheduleSnap = () => {
      window.clearTimeout(snapTimeout);
      snapTimeout = window.setTimeout(snapToNearest, 180);
    };

    const drawPlane = ({ matrix, texture, planeSize, imageSize, alpha, borderRadius, isText, wave, speed, time }) => {
      gl.uniformMatrix4fv(locations.matrix, false, matrix);
      gl.uniform2fv(locations.planeSize, planeSize);
      gl.uniform2fv(locations.imageSize, imageSize);
      gl.uniform1f(locations.time, time);
      gl.uniform1f(locations.speed, speed);
      gl.uniform1f(locations.wave, wave);
      gl.uniform1f(locations.borderRadius, borderRadius);
      gl.uniform1f(locations.alpha, alpha);
      gl.uniform1f(locations.isText, isText ? 1 : 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(locations.texture, 0);
      gl.drawElements(gl.TRIANGLES, geometry.count, gl.UNSIGNED_SHORT, 0);
    };

    const getLayoutForEntry = (entry, elapsed, speed) => {
      const relative = entry.index - scrollCurrent;
      const x = relative * metrics.spacing;
      const half = metrics.worldWidth / 2;
      const distance = Math.min(1.15, Math.abs(x) / half);
      const effectiveX = Math.min(Math.abs(x), half);
      const bend = metrics.bend;
      const radius = (half * half + bend * bend) / (2 * bend);
      const arc = radius - Math.sqrt(Math.max(0, radius * radius - effectiveX * effectiveX));
      const y = -arc + metrics.worldHeight * 0.04;
      const z = 0;
      const rz = (x < 0 ? -1 : 1) * Math.asin(Math.min(0.92, effectiveX / radius)) * 0.58;
      const ry = 0;
      const rx = 0;
      const alpha = clamp(1 - Math.max(0, distance - 0.92) * 1.7, 0.34, 1);
      const wave = 0.045;
      return { x, y, z, rx, ry, rz, distance, alpha, wave };
    };

    const getMatrix = (layout, offsetY = 0, offsetZ = 0) => {
      const projection = perspective(45 * Math.PI / 180, screen.aspect, 0.1, 80);
      const view = translate(0, 0, -cameraZ);
      const model = multiply(
        translate(layout.x, layout.y + offsetY, layout.z + offsetZ),
        multiply(rotateZ(layout.rz), multiply(rotateY(layout.ry), rotateX(layout.rx)))
      );
      return multiply(projection, multiply(view, model));
    };

    const updateHit = (entry, matrix, layout) => {
      const w = metrics.cardWidth / 2;
      const h = metrics.cardHeight / 2;
      const points = [
        [-w, -h, 0, 1],
        [w, -h, 0, 1],
        [w, h, 0, 1],
        [-w, h, 0, 1]
      ].map((point) => {
        const p = transformPoint(matrix, point);
        const ndcX = p[0] / p[3];
        const ndcY = p[1] / p[3];
        return {
          x: (ndcX * 0.5 + 0.5) * screen.width,
          y: (-ndcY * 0.5 + 0.5) * screen.height
        };
      });
      entry.hit = {
        itemIndex: entry.itemIndex,
        distance: layout.distance,
        left: Math.min(...points.map((point) => point.x)),
        right: Math.max(...points.map((point) => point.x)),
        top: Math.min(...points.map((point) => point.y)),
        bottom: Math.max(...points.map((point) => point.y))
      };
    };

    const render = () => {
      if (disposed) return;
      normalizeScroll();
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.028;
      if (Math.abs(scrollTarget - scrollCurrent) < 0.001) scrollCurrent = scrollTarget;

      const elapsed = (performance.now() - startedAt) / 1000;
      const speed = scrollCurrent - scrollLast;
      scrollLast = scrollCurrent;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);

      const visible = media
        .map((entry) => ({ entry, layout: getLayoutForEntry(entry, elapsed, speed) }))
        .filter(({ layout }) => Math.abs(layout.x) < metrics.worldWidth * 0.72 + metrics.cardWidth)
        .sort((a, b) => b.layout.distance - a.layout.distance);

      visible.forEach(({ entry, layout }) => {
        const matrix = getMatrix(layout);
        updateHit(entry, matrix, layout);
        drawPlane({
          matrix,
          texture: entry.texture,
          planeSize: [metrics.cardWidth, metrics.cardHeight],
          imageSize: entry.imageSize,
          alpha: entry.loaded ? layout.alpha : 0,
          borderRadius: 0.045,
          isText: false,
          wave: layout.wave,
          speed,
          time: elapsed + entry.index * 0.18
        });
      });

      visible.forEach(({ entry, layout }) => {
        const textAspect = entry.titleTextureSize[0] / Math.max(1, entry.titleTextureSize[1]);
        const textHeight = metrics.cardHeight * 0.105;
        drawPlane({
          matrix: getMatrix(layout, -metrics.cardHeight * 0.62, 0.01),
          texture: entry.titleTexture,
          planeSize: [textHeight * textAspect, textHeight],
          imageSize: entry.titleTextureSize,
          alpha: layout.alpha,
          borderRadius: 0,
          isText: true,
          wave: 0,
          speed: 0,
          time: elapsed
        });
      });

      syncChrome();
      raf = window.requestAnimationFrame(render);
    };

    const onWheel = (event) => {
      if (!isCircularGallery() || !isGalleryBrowsingMode()) return;
      event.preventDefault();
      event.stopPropagation();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      scrollTarget += (delta > 0 ? 1 : -1) * 0.34;
      scheduleSnap();
    };

    const getHitFromEvent = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return media
        .map((entry) => entry.hit)
        .filter(Boolean)
        .filter((hit) => x >= hit.left && x <= hit.right && y >= hit.top && y <= hit.bottom)
        .sort((a, b) => a.distance - b.distance)[0] || null;
    };

    const openHitDetail = (hit) => {
      if (!hit || openingDetail || !isGalleryBrowsingMode()) return;
      openingDetail = true;
      if (galleryMode === "projects") {
        openProjectDetail(hit.itemIndex);
        return;
      }
      openWorkDetail(hit.itemIndex);
    };

    const onPointerDown = (event) => {
      if (!isCircularGallery() || !isGalleryBrowsingMode()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      isDown = true;
      didDrag = false;
      dragStartX = event.clientX;
      dragStartTarget = scrollTarget;
      window.clearTimeout(snapTimeout);
      root.classList.add("is-dragging");
    };

    const onPointerMove = (event) => {
      if (!isDown) return;
      const distance = (dragStartX - event.clientX) * 0.006;
      if (Math.abs(event.clientX - dragStartX) > 6) didDrag = true;
      scrollTarget = dragStartTarget + distance;
    };

    const onPointerUp = (event) => {
      if (!isDown) return;
      isDown = false;
      root.classList.remove("is-dragging");
      snapToNearest();
      if (!didDrag && isGalleryBrowsingMode()) {
        openHitDetail(getHitFromEvent(event));
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    raf = window.requestAnimationFrame(render);

    circularCleanup = () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(snapTimeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel, { capture: true });
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.innerHTML = "";
    };
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
      items.forEach((item, index) => {
        if (!circularImageCache.has(item.src)) {
          const img = new Image();
          img.decoding = "async";
          img.src = item.src;
          circularImageCache.set(item.src, img);
          if (img.decode) img.decode().catch(() => {});
        }

        const title = getGalleryItemTitle(item, index);
        const cacheKey = `${getCurrentLang()}::${title}`;
        if (circularTextTextureCache.has(cacheKey)) return;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const textCanvas = document.createElement("canvas");
        const context = textCanvas.getContext("2d");
        if (!context) return;
        const fontSize = 26 * ratio;
        context.font = `700 ${fontSize}px Arial, "Microsoft YaHei", sans-serif`;
        const metrics = context.measureText(title);
        textCanvas.width = Math.ceil(metrics.width + 42 * ratio);
        textCanvas.height = Math.ceil(52 * ratio);
        context.font = `700 ${fontSize}px Arial, "Microsoft YaHei", sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(244, 242, 237, 0.92)";
        context.clearRect(0, 0, textCanvas.width, textCanvas.height);
        context.fillText(title, textCanvas.width / 2, textCanvas.height / 2);
        circularTextTextureCache.set(cacheKey, { canvas: textCanvas, size: [textCanvas.width, textCanvas.height] });
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
    if (!workGallery || !galleryOpen) return;
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
    workGallery.style.setProperty("--work-detail-reveal", "0");
    if (workGalleryDescription) workGalleryDescription.textContent = "";
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
