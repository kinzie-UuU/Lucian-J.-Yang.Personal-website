// ── Hero Bamboo v3 — 3D 立体版（茎/叶/瓶全部有 Z 轴深度）────────────────────
// 茎向前后左右散开，叶片用叉积算真实 3D 展开方向，花瓶圆形截面
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

  // 3D 竹茎：bx/bz = 根部 XZ，by = 根部 Y，leanX/leanZ = XZ 倾斜，segN 节，r0 初始半径
  const addStalk = (bx, bz, by, leanX, leanZ, segN, r0) => {
    for (let s = 0; s < segN; s++) {
      const t = s / segN;
      const cy = by + s * 0.16;
      const cx = bx + leanX * t * 0.12;
      const cz = bz + leanZ * t * 0.12;
      const r  = r0 * (1 - t * 0.35);
      const h  = 0.13;
      for (let i = 0; i < 12; i++) {
        const theta = Math.random() * Math.PI * 2;
        const yy = cy + (Math.random() - 0.5) * h;
        positions.push(cx + Math.cos(theta) * r, yy, cz + Math.sin(theta) * r);
        const mix = cStem.clone().lerp(cLeafA, Math.random() * 0.3);
        colors.push(mix.r, mix.g, mix.b);
      }
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        positions.push(cx + Math.cos(theta) * (r + 0.005), cy + h * 0.5, cz + Math.sin(theta) * (r + 0.005));
        colors.push(cNode.r, cNode.g, cNode.b);
      }
    }
  };

  // 3D 叶片：ox/oy/oz = 起点，dx/dy/dz = 方向，叉积求垂直展开方向
  const addLeaf = (ox, oy, oz, dx, dy, dz, len, spread) => {
    const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
    const ax = dx/d, ay = dy/d, az = dz/d;
    let px, py, pz;
    if (Math.abs(ay) < 0.9) { px = az; py = 0; pz = -ax; }
    else { px = 1; py = 0; pz = 0; }
    const pl = Math.sqrt(px*px + py*py + pz*pz);
    px /= pl; py /= pl; pz /= pl;
    for (let i = 0; i < 18; i++) {
      const t = Math.random();
      const sp = (Math.random() - 0.5) * spread * (1 - t * 0.8);
      positions.push(ox + ax*len*t + px*sp, oy + ay*len*t + py*sp, oz + az*len*t + pz*sp);
      const mix = cLeafA.clone().lerp(cLeafB, t * 0.7);
      colors.push(mix.r, mix.g, mix.b);
    }
  };

  // [bx, bz, by, leanX, leanZ, segN, r0]
  [
    [ 0.00,  0.00, -0.28,  0.0,  0.0,  5, 0.009],
    [-0.05,  0.04, -0.28, -0.5,  0.3,  4, 0.008],
    [ 0.05, -0.04, -0.28,  0.4, -0.4,  4, 0.008],
    [-0.08, -0.05, -0.28, -0.9, -0.5,  3, 0.007],
    [ 0.08,  0.06, -0.28,  0.8,  0.6,  3, 0.007],
  ].forEach(([bx, bz, by, leanX, leanZ, segN, r0]) => addStalk(bx, bz, by, leanX, leanZ, segN, r0));

  const L = 0.30, S = 0.055;
  [
    [ 0.00,  0.30,  0.00, -0.70,  0.50,  0.50, L,     S    ],
    [ 0.00,  0.46,  0.00,  0.65,  0.55, -0.50, L,     S    ],
    [ 0.00,  0.58,  0.00, -0.50,  0.70,  0.50, L*0.8, S    ],
    [ 0.00,  0.68,  0.00,  0.40,  0.80, -0.45, L*0.7, S*0.8],
    [-0.06,  0.20,  0.05, -0.80,  0.40,  0.45, L*0.9, S    ],
    [-0.06,  0.36,  0.05, -0.60,  0.65,  0.45, L*0.85,S    ],
    [-0.08,  0.50,  0.05, -0.40,  0.80,  0.45, L*0.7, S*0.8],
    [ 0.06,  0.18, -0.05,  0.75,  0.45, -0.50, L*0.9, S    ],
    [ 0.06,  0.34, -0.05,  0.60,  0.60, -0.50, L*0.85,S    ],
    [ 0.08,  0.48, -0.05,  0.45,  0.75, -0.50, L*0.7, S*0.8],
    [-0.10,  0.10, -0.06, -0.85,  0.30, -0.45, L*0.8, S*0.9],
    [-0.10,  0.26, -0.06, -0.70,  0.55, -0.45, L*0.75,S*0.8],
    [ 0.10,  0.08,  0.07,  0.80,  0.35,  0.50, L*0.8, S*0.9],
    [ 0.10,  0.24,  0.07,  0.70,  0.50,  0.50, L*0.75,S*0.8],
    [-0.02,  0.76,  0.03, -0.40,  0.80,  0.45, L*0.6, S*0.7],
    [ 0.02,  0.76, -0.03,  0.35,  0.85, -0.40, L*0.6, S*0.7],
  ].forEach(([ox, oy, oz, dx, dy, dz, len, spread]) => addLeaf(ox, oy, oz, dx, dy, dz, len, spread));

  // 花瓶：圆形截面 [cy, r]
  const vaseProfile = [
    [-0.90, 0.11], [-0.80, 0.13], [-0.70, 0.14],
    [-0.60, 0.12], [-0.50, 0.09], [-0.38, 0.10],
    [-0.28, 0.12],
  ];
  const cVase = new THREE.Color(0x4ab8a0);
  vaseProfile.forEach(([cy, r]) => {
    for (let i = 0; i < 18; i++) {
      const theta = (i / 18) * Math.PI * 2;
      positions.push(Math.cos(theta) * r, cy, Math.sin(theta) * r);
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
