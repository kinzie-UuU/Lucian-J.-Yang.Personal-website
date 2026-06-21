(() => {
  const section = document.querySelector("#works-infinite");
  const canvas = document.querySelector("#works-infinite-canvas");
  const titleEl = document.querySelector("#works-infinite-title");
  const descriptionEl = document.querySelector("#works-infinite-description");
  const indexEl = document.querySelector("#works-infinite-index");

  if (!section || !canvas || !window.THREE) return;

  const categoryKeys = ["oem", "gift", "brand", "aigc", "aigc-video"];
  const categoryLabels = {
    zh: {
      oem: "品牌包装",
      gift: "礼品福利",
      brand: "品牌字体",
      aigc: "AIGC流",
      "aigc-video": "视频创作",
    },
    en: {
      oem: "Brand Packaging",
      gift: "Gifting",
      brand: "Brand Type",
      aigc: "AIGC Flow",
      "aigc-video": "Video",
    },
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const mod = (value, length) => ((value % length) + length) % length;
  const lerp = (from, to, amount) => from + (to - from) * amount;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getLangKey = () => (document.documentElement.lang || "").toLowerCase().startsWith("en") ? "en" : "zh";
  const getCategoryLabel = (category) => categoryLabels[getLangKey()]?.[category] || categoryLabels.zh[category] || category;
  const getCategoryDescription = (category) => {
    const lang = getLangKey();
    return window.galleryText?.[lang]?.categoryDescriptions?.[category]
      || window.galleryText?.zh?.categoryDescriptions?.[category]
      || "";
  };

  const makeCategoryPools = () => categoryKeys.map((categoryKey, categoryIndex) => ({
      categoryKey,
      categoryIndex,
      items: (window.workGalleryImages?.[categoryKey] || [])
        .filter((item) => item?.src)
        .map((item, imageIndex) => ({
          ...item,
          categoryKey,
          categoryIndex,
          imageIndex,
        })),
    })).filter((pool) => pool.items.length);

  const categoryPools = makeCategoryPools();
  const fallbackItems = categoryPools.flatMap((pool) => pool.items);
  if (!fallbackItems.length) return;

  const createFallback = () => {
    section.classList.add("is-fallback");
    const fallback = document.createElement("div");
    fallback.className = "works-infinite-fallback";
    fallbackItems.slice(0, 12).forEach((item) => {
      const img = document.createElement("img");
      img.alt = item.title || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = item.src;
      fallback.appendChild(img);
    });
    section.querySelector(".works-infinite-stage")?.prepend(fallback);
  };

  const whitePixel = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  whitePixel.needsUpdate = true;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile(),
      powerPreference: "high-performance",
    });
  } catch (error) {
    createFallback();
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 120);
  camera.position.set(0, 0, 0);

  const loader = new THREE.TextureLoader();
  const textureCache = new Map();

  const createMaterial = () => new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    uniforms: {
      map: { value: whitePixel },
      opacity: { value: 0 },
      time: { value: 0 },
      wave: { value: 0 },
      hover: { value: 0 },
      texelSize: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float time;
      uniform float wave;
      uniform float hover;

      void main() {
        vUv = uv;
        vec3 p = position;
        float cloth = sin((p.x * 2.6) + time * 0.85) * 0.05 * wave;
        float ripple = sin((p.y * 5.2) + time * 2.1) * 0.035 * hover;
        p.z += cloth + ripple;
        p.x += sin((p.y + time * 0.22) * 2.0) * 0.055 * wave;
        p.y += cos((p.x + time * 0.16) * 2.4) * 0.04 * wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D map;
      uniform float opacity;
      uniform float hover;
      uniform vec2 texelSize;

      void main() {
        vec4 sharp = texture2D(map, vUv);
        vec4 blur = sharp * 0.44;
        blur += texture2D(map, vUv + vec2(texelSize.x * 2.0, 0.0)) * 0.14;
        blur += texture2D(map, vUv - vec2(texelSize.x * 2.0, 0.0)) * 0.14;
        blur += texture2D(map, vUv + vec2(0.0, texelSize.y * 2.0)) * 0.14;
        blur += texture2D(map, vUv - vec2(0.0, texelSize.y * 2.0)) * 0.14;
        vec4 color = mix(blur, sharp, 0.82 + hover * 0.18);
        color.rgb = mix(color.rgb * 0.62, color.rgb, opacity);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

  const getTexture = (item, material) => {
    if (textureCache.has(item.src)) return textureCache.get(item.src);

    const record = { texture: whitePixel, aspect: item.size === "wide" ? 1.52 : 0.92, loaded: false };
    textureCache.set(item.src, record);
    loader.load(
      item.src,
      (texture) => {
        if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy?.() || 1);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        record.texture = texture;
        record.aspect = texture.image?.width && texture.image?.height
          ? texture.image.width / texture.image.height
          : record.aspect;
        record.loaded = true;
        if (material) {
          material.uniforms.map.value = texture;
          material.uniforms.texelSize.value.set(1 / (texture.image?.width || 1), 1 / (texture.image?.height || 1));
        }
      },
      undefined,
      () => {
        textureCache.delete(item.src);
      }
    );
    return record;
  };

  const poolCount = isMobile() ? 6 : 10;
  const depthRange = isMobile() ? 34 : 50;
  const planes = Array.from({ length: poolCount }, (_, slot) => {
    const material = createMaterial();
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 34, 18), material);
    mesh.userData = { slot, itemIndex: -1, categoryKey: "", depth: 0, hover: 0 };
    scene.add(mesh);
    return mesh;
  });

  let width = 1;
  let height = 1;
  let scrollPosition = 0;
  let manualOffset = 0;
  let velocity = 0;
  let lastTime = performance.now();
  let lastInteraction = performance.now();
  let lastPageY = window.scrollY;
  let activeCategory = "";
  let isPointerDown = false;
  let lastPointerY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let hoverMesh = null;
  let rafId = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const markInteraction = () => {
    lastInteraction = performance.now();
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.6);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const positionFor = (poolIndex, depth) => {
    const horizontalAngle = (poolIndex * 2.618) % (Math.PI * 2);
    const verticalAngle = (poolIndex * 1.618 + Math.PI / 3) % (Math.PI * 2);
    const horizontalRadius = (poolIndex % 3) * 1.2;
    const verticalRadius = ((poolIndex + 1) % 4) * 0.8;
    const maxX = isMobile() ? 4.1 : 8;
    const maxY = isMobile() ? 4.8 : 8;
    const focus = Math.exp(-Math.pow((depth - 0.22) / 0.2, 2));
    const scatter = 1 - focus;
    return {
      x: ((Math.sin(horizontalAngle) * horizontalRadius * maxX) / 3) * scatter,
      y: (((Math.cos(verticalAngle) * verticalRadius * maxY) / 4) * scatter) + focus * 0.18,
      tilt: Math.sin(horizontalAngle * 0.7) * 0.16 * scatter,
    };
  };

  const updateCopy = (category) => {
    if (!category || activeCategory === category) return;
    activeCategory = category;
    if (titleEl) titleEl.textContent = getCategoryLabel(category);
    if (descriptionEl) descriptionEl.textContent = getCategoryDescription(category);
    if (indexEl) {
      const categoryIndex = Math.max(0, categoryKeys.indexOf(category));
      indexEl.textContent = `${String(categoryIndex + 1).padStart(2, "0")} / ${String(categoryKeys.length).padStart(2, "0")}`;
    }
  };

  const refreshLanguage = () => {
    if (!activeCategory) {
      updateCopy(categoryPools[0]?.categoryKey || "oem");
      return;
    }
    if (titleEl) titleEl.textContent = getCategoryLabel(activeCategory);
    if (descriptionEl) descriptionEl.textContent = getCategoryDescription(activeCategory);
  };

  const getSectionProgress = () => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - (window.innerHeight || 1));
    return clamp(-rect.top / travel, 0, 1);
  };

  const updateHover = () => {
    if (!pointerX && !pointerY) return;
    pointer.x = (pointerX / width) * 2 - 1;
    pointer.y = -(pointerY / height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(planes, false);
    hoverMesh = hits[0]?.object || null;
  };

  const render = (now) => {
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    const idleMs = now - lastInteraction;
    const autoSpeed = prefersReducedMotion ? 0 : (isMobile() ? 0.16 : 0.24);
    const auto = idleMs > 3000 ? autoSpeed : 0;
    const sectionProgress = getSectionProgress();
    const categoryPosition = Math.min(categoryPools.length - 0.0001, sectionProgress * categoryPools.length);
    const activePoolIndex = clamp(Math.floor(categoryPosition), 0, categoryPools.length - 1);
    const activePool = categoryPools[activePoolIndex] || categoryPools[0];
    const localProgress = categoryPosition - activePoolIndex;
    const activeItems = activePool.items;
    manualOffset = mod(manualOffset + (velocity + auto) * dt, activeItems.length);
    scrollPosition = mod(localProgress * activeItems.length + manualOffset, activeItems.length);
    velocity *= Math.exp(-dt * 2.7);

    const baseIndex = Math.floor(scrollPosition);
    const progress = scrollPosition - baseIndex;

    updateHover();
    planes.forEach((mesh, poolIndex) => {
      let depthSlot = poolIndex - progress;
      let itemOffset = poolIndex;
      if (depthSlot < 0) {
        depthSlot += poolCount;
        itemOffset += poolCount;
      }

      const itemIndex = mod(baseIndex + itemOffset, activeItems.length);
      const item = activeItems[itemIndex];
      const depth = clamp(depthSlot / (poolCount - 1), 0, 1);
      const worldZ = -3.8 - depth * depthRange;
      const pos = positionFor(poolIndex, depth);
      const focus = Math.exp(-Math.pow((depth - 0.22) / 0.25, 2));
      const nearFade = clamp(depth / 0.08, 0, 1);
      const farFade = clamp((0.88 - depth) / 0.2, 0, 1);
      const opacity = clamp(focus * nearFade * farFade, 0, 1);
      const material = mesh.material;

      const itemKey = `${activePool.categoryKey}:${itemIndex}`;
      if (mesh.userData.itemKey !== itemKey) {
        const textureRecord = getTexture(item, material);
        mesh.userData.itemIndex = itemIndex;
        mesh.userData.itemKey = itemKey;
        mesh.userData.categoryKey = item.categoryKey;
        material.uniforms.map.value = textureRecord.texture;
        material.uniforms.texelSize.value.set(
          1 / (textureRecord.texture.image?.width || 1),
          1 / (textureRecord.texture.image?.height || 1)
        );
      }

      const textureRecord = getTexture(item, material);
      const aspect = textureRecord.aspect || (item.size === "wide" ? 1.52 : 0.92);
      const baseScale = isMobile() ? 1.95 : 2.25;
      mesh.position.set(pos.x, pos.y, worldZ);
      mesh.rotation.set(pos.tilt * 0.18, -pos.tilt * 0.28, pos.tilt * 0.12);
      mesh.scale.set(baseScale * aspect, baseScale, 1);
      mesh.userData.depth = depth;
      mesh.userData.hover = lerp(mesh.userData.hover, hoverMesh === mesh ? 1 : 0, 1 - Math.exp(-dt * 8));
      material.uniforms.time.value = now * 0.001;
      material.uniforms.opacity.value = textureRecord.loaded ? opacity : 0;
      material.uniforms.wave.value = (isMobile() ? 0.42 : 0.62) * (0.3 + Math.abs(velocity) * 0.24);
      material.uniforms.hover.value = mesh.userData.hover;

    });

    updateCopy(activePool.categoryKey);
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(render);
  };

  const sectionVisibility = () => {
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight || 1;
    const visible = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
    return clamp(visible / Math.min(viewportH, rect.height || viewportH), 0, 1);
  };

  const onWheel = (event) => {
    if (sectionVisibility() < 0.12) return;
    velocity += clamp(event.deltaY * 0.006, -2.4, 2.4);
    markInteraction();
  };

  const onScroll = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastPageY;
    lastPageY = currentY;
    if (sectionVisibility() < 0.18 || Math.abs(delta) < 0.5) return;
    velocity += clamp(delta * 0.0034, -1.8, 1.8);
    markInteraction();
  };

  const onKeyDown = (event) => {
    if (sectionVisibility() < 0.45) return;
    if (!["ArrowDown", "ArrowRight", "PageDown", " ", "ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) return;
    const direction = ["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key) ? -1 : 1;
    velocity += direction * (isMobile() ? 0.9 : 1.25);
    markInteraction();
  };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    if (!isPointerDown) return;
    const delta = lastPointerY - event.clientY;
    lastPointerY = event.clientY;
    velocity += clamp(delta * 0.018, -1.4, 1.4);
    markInteraction();
  };

  const onPointerDown = (event) => {
    isPointerDown = true;
    lastPointerY = event.clientY;
    canvas.classList.add("is-dragging");
    canvas.setPointerCapture?.(event.pointerId);
    markInteraction();
  };

  const onPointerUp = (event) => {
    isPointerDown = false;
    canvas.classList.remove("is-dragging");
    canvas.releasePointerCapture?.(event.pointerId);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", () => {
    hoverMesh = null;
  });

  window.LucianWorkInfiniteGallery = {
    refreshLanguage,
  };

  resize();
  updateCopy(categoryPools[0].categoryKey);
  rafId = window.requestAnimationFrame(render);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(rafId);
    renderer.dispose();
    planes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
  }, { once: true });
})();
