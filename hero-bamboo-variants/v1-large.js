// ── Hero Bamboo v1 — 大版本（原始尺寸）──────────────────────────────────────
// 竹茎粗、节段多、叶片长、花瓶高（y=-1.80 到 -0.48）
// 相机：FOV 28, z=14.0
// 用法：把函数体替换 script.js 里的 initHeroBamboo

const initHeroBamboo = (canvas) => {
  if (!canvas || reducedMotion || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 14.0);

  const positions = [], colors = [];
  const cStem  = new THREE.Color(0x3aaa8e);
  const cNode  = new THREE.Color(0xc8ede0);
  const cLeafA = new THREE.Color(0x5ecfb2);
  const cLeafB = new THREE.Color(0xa8e8d0);

  const addStalk = (bx, by, lean, segN, r0) => {
    for (let s = 0; s < segN; s++) {
      const t = s / segN;
      const cy = by + s * 0.28;
      const cx = bx + lean * t * 0.18;
      const r  = r0 * (1 - t * 0.35);
      const h  = 0.22;
      for (let i = 0; i < 28; i++) {
        const theta = Math.random() * Math.PI * 2;
        const yy = cy + (Math.random() - 0.5) * h;
        positions.push(cx + Math.cos(theta) * r, yy, Math.sin(theta) * r);
        const mix = cStem.clone().lerp(cLeafA, Math.random() * 0.3);
        colors.push(mix.r, mix.g, mix.b);
      }
      for (let i = 0; i < 20; i++) {
        const theta = (i / 20) * Math.PI * 2;
        positions.push(cx + Math.cos(theta) * (r + 0.012), cy + h * 0.5, Math.sin(theta) * (r + 0.012));
        colors.push(cNode.r, cNode.g, cNode.b);
      }
    }
  };

  const addLeaf = (ox, oy, dx, dy, len, spread) => {
    for (let i = 0; i < 38; i++) {
      const t = Math.random();
      const sp = (Math.random() - 0.5) * spread * (1 - t * 0.8);
      const nx = -dy, ny = dx;
      positions.push(ox + dx * len * t + nx * sp, oy + dy * len * t + ny * sp, (Math.random() - 0.5) * 0.04);
      const mix = cLeafA.clone().lerp(cLeafB, t * 0.7);
      colors.push(mix.r, mix.g, mix.b);
    }
  };

  [
    [ 0.00, -0.50,  0.0, 7, 0.030],
    [-0.10, -0.50, -0.6, 6, 0.026],
    [ 0.10, -0.50,  0.5, 6, 0.026],
    [-0.18, -0.50, -1.1, 5, 0.022],
    [ 0.18, -0.50,  1.0, 5, 0.022],
  ].forEach(([bx, by, lean, segN, r0]) => addStalk(bx, by, lean, segN, r0));

  const L = 0.52, S = 0.10;
  [
    [ 0.00,  0.60, -0.82,  0.57, L, S],
    [ 0.00,  0.90,  0.78,  0.63, L, S],
    [ 0.00,  1.10, -0.60,  0.80, L*0.8, S],
    [ 0.00,  1.30,  0.50,  0.87, L*0.7, S*0.8],
    [-0.14,  0.40, -0.90,  0.44, L*0.9, S],
    [-0.14,  0.68, -0.70,  0.71, L*0.85, S],
    [-0.20,  0.90, -0.50,  0.87, L*0.7, S*0.8],
    [ 0.14,  0.38,  0.88,  0.47, L*0.9, S],
    [ 0.14,  0.65,  0.72,  0.69, L*0.85, S],
    [ 0.20,  0.86,  0.55,  0.84, L*0.7, S*0.8],
    [-0.26,  0.22, -0.95,  0.31, L*0.8, S*0.9],
    [-0.26,  0.50, -0.80,  0.60, L*0.75, S*0.8],
    [ 0.26,  0.20,  0.94,  0.34, L*0.8, S*0.9],
    [ 0.26,  0.48,  0.82,  0.57, L*0.75, S*0.8],
    [-0.05,  1.50, -0.45,  0.89, L*0.6, S*0.7],
    [ 0.05,  1.50,  0.40,  0.92, L*0.6, S*0.7],
  ].forEach(([ox, oy, dx, dy, len, spread]) => addLeaf(ox, oy, dx, dy, len, spread));

  const vaseProfile = [
    [-1.80, 0.22, 0.10], [-1.65, 0.26, 0.12], [-1.50, 0.28, 0.13],
    [-1.35, 0.24, 0.11], [-1.20, 0.18, 0.09], [-1.05, 0.14, 0.07],
    [-0.90, 0.16, 0.08], [-0.75, 0.20, 0.10], [-0.60, 0.24, 0.12],
    [-0.48, 0.26, 0.13],
  ];
  const cVase = new THREE.Color(0x4ab8a0);
  vaseProfile.forEach(([cy, rx, rz]) => {
    for (let i = 0; i < 28; i++) {
      const theta = (i / 28) * Math.PI * 2;
      positions.push(Math.cos(theta) * rx, cy, Math.sin(theta) * rz);
      const mix = cVase.clone().lerp(cNode, Math.random() * 0.4);
      colors.push(mix.r, mix.g, mix.b);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.016, vertexColors: true, transparent: true,
    opacity: 0.82, sizeAttenuation: true, depthWrite: false,
  });

  const plant = new THREE.Points(geo, mat);
  plant.position.y = 0.2;
  scene.add(plant);

  let mx = 0, my = 0;
  const onPointer = (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  let raf;
  const animate = (t) => {
    raf = requestAnimationFrame(animate);
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    plant.rotation.y = t * 0.00010 + mx * 0.06 + sp * 0.35;
    plant.rotation.x += (my * 0.03 + sp * 0.05 - plant.rotation.x) * 0.04;
    mat.opacity = 0.82 - sp * 0.30;
    renderer.render(scene, camera);
  };
  animate(0);

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};
