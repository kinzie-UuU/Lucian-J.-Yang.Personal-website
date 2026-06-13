(() => {
  const canvas = document.querySelector("#entry-key-canvas");
  const THREE = window.THREE;
  if (!canvas || !THREE) return;

  const modelUrl = canvas.dataset.modelSrc;
  if (!modelUrl) return;

  let entryReadyDispatched = false;
  const signalEntryReady = () => {
    if (entryReadyDispatched) return;
    entryReadyDispatched = true;
    document.body.classList.add("entry-key-ready");
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("entry-key-ready"));
    });
  };

  const fallbackEnter = () => {
    document.getElementById("entry-progress")?.replaceChildren("[100%]");
    const fill = document.getElementById("entry-progress-fill");
    if (fill) fill.style.width = "100%";
    signalEntryReady();
  };

  /* ─── GLB parser (adapted from hero-glb-model.js) ─── */
  const componentTypes = {
    5120: { Ctor: Int8Array, size: 1, reader: "getInt8" },
    5121: { Ctor: Uint8Array, size: 1, reader: "getUint8" },
    5122: { Ctor: Int16Array, size: 2, reader: "getInt16" },
    5123: { Ctor: Uint16Array, size: 2, reader: "getUint16" },
    5125: { Ctor: Uint32Array, size: 4, reader: "getUint32" },
    5126: { Ctor: Float32Array, size: 4, reader: "getFloat32" },
  };
  const accessorSizes = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };

  const parseGlb = (buffer) => {
    const view = new DataView(buffer);
    if (view.getUint32(0, true) !== 0x46546c67) throw new Error("Invalid GLB");
    let json = null, bin = null, offset = 12;
    while (offset < buffer.byteLength) {
      const length = view.getUint32(offset, true);
      const type = view.getUint32(offset + 4, true);
      const start = offset + 8;
      if (type === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(buffer.slice(start, start + length)));
      else if (type === 0x004e4942) bin = buffer.slice(start, start + length);
      offset = start + length;
    }
    if (!json || !bin) throw new Error("GLB missing chunks");
    return { json, buffers: [bin] };
  };

  const readAccessor = (json, buffers, index) => {
    const acc = json.accessors[index];
    const bv = json.bufferViews[acc.bufferView];
    const comp = componentTypes[acc.componentType];
    const itemSize = accessorSizes[acc.type];
    const buf = buffers[bv.buffer || 0];
    const start = (bv.byteOffset || 0) + (acc.byteOffset || 0);
    const stride = bv.byteStride || itemSize * comp.size;
    const count = acc.count * itemSize;
    if (stride === itemSize * comp.size) return new comp.Ctor(buf, start, count);
    const out = new comp.Ctor(count);
    const dv = new DataView(buf);
    for (let r = 0; r < acc.count; r++) {
      for (let c = 0; c < itemSize; c++) {
        out[r * itemSize + c] = dv[comp.reader](start + r * stride + c * comp.size, true);
      }
    }
    return out;
  };

  /* ─── Build model ─── */
  const buildModel = (json, buffers) => {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xbda874),
      roughness: 0.3,
      metalness: 0.88,
      envMapIntensity: 1.4,
      side: THREE.DoubleSide,
    });

    const root = new THREE.Group();
    const makeMesh = (meshIndex) => {
      const meshDef = json.meshes[meshIndex];
      const group = new THREE.Group();
      meshDef.primitives.forEach((prim) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(readAccessor(json, buffers, prim.attributes.POSITION), 3));
        if (prim.attributes.NORMAL !== undefined) {
          geo.setAttribute("normal", new THREE.BufferAttribute(readAccessor(json, buffers, prim.attributes.NORMAL), 3));
        } else {
          geo.computeVertexNormals();
        }
        if (prim.attributes.TEXCOORD_0 !== undefined) {
          geo.setAttribute("uv", new THREE.BufferAttribute(readAccessor(json, buffers, prim.attributes.TEXCOORD_0), 2));
        }
        if (prim.indices !== undefined) {
          geo.setIndex(new THREE.BufferAttribute(readAccessor(json, buffers, prim.indices), 1));
        }
        geo.computeBoundingSphere();
        group.add(new THREE.Mesh(geo, material));
      });
      return group;
    };

    const applyTransform = (obj, node) => {
      if (node.matrix) {
        const m = new THREE.Matrix4().fromArray(node.matrix);
        m.decompose(obj.position, obj.quaternion, obj.scale);
        return;
      }
      if (node.translation) obj.position.fromArray(node.translation);
      if (node.rotation) obj.quaternion.fromArray(node.rotation);
      if (node.scale) obj.scale.fromArray(node.scale);
    };

    const makeNode = (i) => {
      const node = json.nodes[i] || {};
      const obj = node.mesh !== undefined ? makeMesh(node.mesh) : new THREE.Group();
      applyTransform(obj, node);
      (node.children || []).forEach((c) => obj.add(makeNode(c)));
      return obj;
    };

    const scene = json.scenes?.[json.scene || 0] || json.scenes?.[0];
    (scene?.nodes || [0]).forEach((i) => root.add(makeNode(i)));
    root.updateMatrixWorld(true);

    // Normalize to unit box
    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const wrapper = new THREE.Group();
    root.position.sub(center);
    wrapper.add(root);
    wrapper.scale.setScalar(1.62 / maxDim);
    return wrapper;
  };

  /* ─── Studio environment (procedural) ─── */
  const makeEnvironment = () => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x111111);
    const light1 = new THREE.DirectionalLight(0xffead0, 3);
    light1.position.set(3, 4, 2);
    envScene.add(light1);
    const light2 = new THREE.DirectionalLight(0xd0e8ff, 1.5);
    light2.position.set(-2, 2, -3);
    envScene.add(light2);
    envScene.add(new THREE.AmbientLight(0x404040, 0.5));
    const envMap = pmrem.fromScene(envScene, 0.04).texture;
    pmrem.dispose();
    return envMap;
  };

  /* ─── Scene setup ─── */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 3.6);

  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.warn("[entry-key-model] WebGL unavailable:", error.message);
    fallbackEnter();
    return;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (renderer.outputColorSpace !== undefined) renderer.outputColorSpace = "srgb";
  else if (renderer.outputEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Lighting
  scene.add(new THREE.AmbientLight(0x53605d, 0.5));
  const keyLight = new THREE.DirectionalLight(0xffead0, 2.4);
  keyLight.position.set(3, 4, 3);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xd0e8ff, 0.8);
  fillLight.position.set(-2, 1, -2);
  scene.add(fillLight);
  scene.add(new THREE.HemisphereLight(0xd9d2c0, 0x07100e, 0.6));

  // Environment map
  scene.environment = makeEnvironment();

  /* ─── Load and animate ─── */
  let model = null;
  let raf = 0;
  let progressRaf = 0;
  let progressRun = 0;
  let animationStartedAt = performance.now();
  let modelLoaded = false;
  let disposed = false;
  const FRONT_ROTATION_X = 0.04;
  const FRONT_ROTATION_Y = 1.08;
  const FRONT_ROTATION_Z = 0;
  const ENTRY_FULL_TURN = Math.PI * 2;
  const UNLOCK_POSE_MS = 940;
  let entryProgress = 0;
  let unlockStartedAt = 0;
  let unlockStartRotationX = 0;
  let unlockStartRotationY = 0;
  let unlockStartPositionY = 0;
  let unlockStartPositionZ = 0;
  let modelBaseScale = 0;
  let unlockBaseScale = 1;

  const delay = parseInt(canvas.dataset.autoEnterDelay || "2400", 10);
  const progressEl = document.getElementById("entry-progress");
  const progressFill = document.getElementById("entry-progress-fill");

  const setProgress = (pct) => {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressEl) progressEl.textContent = `[${clamped}%]`;
    if (progressFill) progressFill.style.width = `${clamped}%`;
  };

  const cancelProgress = () => {
    progressRun += 1;
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = 0;
  };

  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  const easeInOutCubic = (value) => (
    value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2
  );

  const startUnlockPose = () => {
    if (!model || unlockStartedAt) return;
    unlockStartedAt = performance.now();
    unlockStartRotationX = model.rotation.x;
    unlockStartRotationY = model.rotation.y;
    unlockStartPositionY = model.position.y;
    unlockStartPositionZ = model.position.z;
    unlockBaseScale = model.scale.x || modelBaseScale || 1;
    startAnimation();
  };

  const animate = () => {
    raf = 0;
    if (disposed || document.body.classList.contains("has-entered")) return;
    raf = requestAnimationFrame(animate);

    const now = performance.now();
    const elapsed = (now - animationStartedAt) * 0.001;
    const w = canvas.clientWidth || 280;
    const h = canvas.clientHeight || 280;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    if (model) {
      if (unlockStartedAt) {
        const progress = Math.min(1, (now - unlockStartedAt) / UNLOCK_POSE_MS);
        const alignPose = easeOutCubic(Math.min(1, progress / 0.22));
        const insert = Math.min(1, progress / 0.72);
        model.rotation.y = unlockStartRotationY + (FRONT_ROTATION_Y - unlockStartRotationY) * alignPose;
        model.rotation.x = unlockStartRotationX + (FRONT_ROTATION_X - unlockStartRotationX) * alignPose;
        model.rotation.z = FRONT_ROTATION_Z;
        model.position.y = unlockStartPositionY * (1 - alignPose);
        model.position.z = unlockStartPositionZ - 0.18 * easeOutCubic(insert);
        model.scale.setScalar(unlockBaseScale * (1 - alignPose * 0.035));
      } else {
        const turn = easeInOutCubic(entryProgress) * ENTRY_FULL_TURN;
        model.rotation.y = FRONT_ROTATION_Y;
        model.rotation.x = FRONT_ROTATION_X;
        model.rotation.z = FRONT_ROTATION_Z + turn;
        model.position.y = Math.sin(elapsed * 1.15) * 0.018;
        model.position.z = 0;
      }
    }

    renderer.render(scene, camera);
  };

  const startAnimation = () => {
    if (disposed || raf || !modelLoaded) return;
    animationStartedAt = performance.now();
    raf = requestAnimationFrame(animate);
  };

  const playProgress = () => {
    if (disposed) return;
    cancelProgress();
    entryReadyDispatched = false;
    document.body.classList.remove("entry-key-ready");
    setProgress(0);
    entryProgress = 0;
    unlockStartedAt = 0;
    if (model) {
      model.position.z = 0;
      model.rotation.z = FRONT_ROTATION_Z;
      if (modelBaseScale) model.scale.setScalar(modelBaseScale);
    }
    if (modelLoaded) startAnimation();

    const run = ++progressRun;
    const progressStart = performance.now();

    const updateProgress = () => {
      if (disposed || run !== progressRun) return;
      if (document.body.classList.contains("has-entered")) {
        progressRaf = 0;
        return;
      }

      const elapsed = performance.now() - progressStart;
      entryProgress = Math.min(elapsed / delay, 1);
      const pct = Math.min(Math.round(entryProgress * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        progressRaf = requestAnimationFrame(updateProgress);
        return;
      }

      progressRaf = 0;
      signalEntryReady();
    };

    progressRaf = requestAnimationFrame(updateProgress);
  };

  window.LucianEntryKey = {
    replay: playProgress,
    reset: playProgress,
    unlock: startUnlockPose,
    isReady() {
      return modelLoaded;
    },
  };

  const init = async () => {
    const response = await fetch(modelUrl);
    if (!response.ok) throw new Error(`Key model fetch failed: ${response.status}`);
    const { json, buffers } = parseGlb(await response.arrayBuffer());
    model = buildModel(json, buffers);
    modelBaseScale = model.scale.x || 1;
    scene.add(model);
    modelLoaded = true;

    // Signal that the decorative model can fade in without unblocking entry timing.
    document.body.classList.add("entry-key-model-ready");

    // Start render loop
    startAnimation();
  };

  playProgress();

  init().catch((err) => {
    console.warn("[entry-key-model] Failed:", err.message);
    fallbackEnter();
  });

  // Cleanup on page hide
  window.addEventListener("pagehide", () => {
    disposed = true;
    cancelProgress();
    if (raf) cancelAnimationFrame(raf);
    renderer.dispose();
  }, { once: true });
})();
