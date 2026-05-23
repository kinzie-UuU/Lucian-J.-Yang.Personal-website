(() => {
  const section = document.querySelector(".services-scroll-story");
  const canvas = document.querySelector("#services-lion-canvas");
  const THREE = window.THREE;
  if (!section || !canvas || !THREE) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const state = {
    cinemaIn: 0,
    lionReveal: 0,
    tunnel: 0,
    outro: 0,
  };
  const current = { ...state };

  window.LucianServicesLion = {
    setProgress(next = {}) {
      state.cinemaIn = clamp01(next.cinemaIn ?? state.cinemaIn);
      state.lionReveal = clamp01(next.lionReveal ?? state.lionReveal);
      state.tunnel = clamp01(next.tunnel ?? state.tunnel);
      state.outro = clamp01(next.outro ?? state.outro);
    },
  };

  if (reducedMotion) {
    section.classList.add("services-lion-fallback");
    return;
  }

  let renderer = null;
  let scene = null;
  let camera = null;
  let model = null;
  let baseScale = 1;
  let baseRotation = null;
  let raf = 0;
  let startedAt = 0;
  let visible = false;
  const materials = [];

  const isVisible = () => {
    const rect = section.getBoundingClientRect();
    return rect.top < window.innerHeight * 1.05 && rect.bottom > -window.innerHeight * 0.12;
  };

  const resize = () => {
    if (!renderer || !camera) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, rect.width < 760 ? 1.15 : 1.55);
    const width = Math.max(2, Math.round(rect.width * dpr));
    const height = Math.max(2, Math.round(rect.height * dpr));
    if (canvas.width === width && canvas.height === height) return;
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(1, rect.height);
    camera.fov = rect.width < 760 ? 40 : 32;
    camera.updateProjectionMatrix();
  };

  const applySilhouetteMaterial = (root) => {
    root.traverse((child) => {
      if (!child.isMesh) return;
      const material = new THREE.MeshStandardMaterial({
        color: 0x03100e,
        emissive: 0x041614,
        emissiveIntensity: 0.08,
        metalness: 0.08,
        roughness: 0.9,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      materials.push(material);
      child.material = material;
      child.castShadow = false;
      child.receiveShadow = false;
    });
  };

  const render = (time = 0) => {
    raf = 0;
    visible = isVisible();
    if (!visible || document.hidden || document.body.classList.contains("nav-transition-active")) return;
    if (!startedAt) startedAt = time;

    current.cinemaIn += (state.cinemaIn - current.cinemaIn) * 0.08;
    current.lionReveal += (state.lionReveal - current.lionReveal) * 0.085;
    current.tunnel += (state.tunnel - current.tunnel) * 0.075;
    current.outro += (state.outro - current.outro) * 0.1;

    resize();
    const t = (time - startedAt) * 0.001;
    const reveal = current.lionReveal * (1 - current.outro);
    const tunnelPush = current.tunnel;
    const scale = baseScale * (0.96 + tunnelPush * 0.18 - current.outro * 0.24);

    model.visible = reveal > 0.01;
    model.position.set(0.08, 0.62 + Math.sin(t * 0.82) * 0.014, -0.18 - tunnelPush * 0.18);
    model.scale.setScalar(scale);
    model.rotation.set(
      baseRotation.x + Math.sin(t * 0.31) * 0.018,
      baseRotation.y + Math.PI * 0.02 + Math.sin(t * 0.38) * 0.05 + tunnelPush * 0.12,
      baseRotation.z
    );

    materials.forEach((material) => {
      material.opacity = 0.04 + reveal * 0.18;
      material.emissiveIntensity = 0.04 + reveal * 0.12 + tunnelPush * 0.05;
    });

    camera.position.set(0.12, 1.78, 5.2 - tunnelPush * 0.62);
    camera.lookAt(0, 0.75, 0);
    renderer.render(scene, camera);
    raf = window.requestAnimationFrame(render);
  };

  const requestRender = () => {
    if (!raf && isVisible()) raf = window.requestAnimationFrame(render);
  };

  const init = () => {
    const heroModel = window.LucianHeroModel?.model;
    if (!heroModel) return false;

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    if ("outputEncoding" in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    if ("toneMapping" in renderer && THREE.ACESFilmicToneMapping) renderer.toneMapping = THREE.ACESFilmicToneMapping;
    if ("toneMappingExposure" in renderer) renderer.toneMappingExposure = 0.5;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0.12, 1.78, 5.2);
    scene.add(new THREE.AmbientLight(0x001211, 0.08));

    const rim = new THREE.SpotLight(0x8ff5df, 1.28, 9, 0.34, 0.92, 1.2);
    rim.position.set(-3.6, 2.6, 2.6);
    scene.add(rim);

    const back = new THREE.PointLight(0x5dc6bf, 0.72, 6.4);
    back.position.set(1.8, 1.1, -2.2);
    scene.add(back);

    model = heroModel.clone(true);
    baseScale = model.scale.x || 1;
    baseRotation = model.rotation.clone();
    applySilhouetteMaterial(model);
    scene.add(model);
    section.classList.add("services-lion-ready");
    resize();
    requestRender();
    return true;
  };

  const tryInit = (attempt = 0) => {
    if (init()) return;
    if (attempt > 120) {
      section.classList.add("services-lion-fallback");
      return;
    }
    window.setTimeout(() => tryInit(attempt + 1), 80);
  };

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", () => {
    resize();
    requestRender();
  }, { passive: true });
  window.addEventListener("lucian:return-to-entry", requestRender);
  tryInit();
})();
