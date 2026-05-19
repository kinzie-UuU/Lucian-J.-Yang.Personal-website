(() => {
  const stage = document.querySelector("#hero-stage");
  const host = document.querySelector("#hero-model-scene");
  const canvas = document.querySelector("#hero-model-canvas");
  const modelUrl = host?.dataset.modelSrc;
  const THREE = window.THREE;

  if (!stage || !host || !canvas || !modelUrl || !THREE) return;

  const componentTypes = {
    5120: { Ctor: Int8Array, size: 1, reader: "getInt8" },
    5121: { Ctor: Uint8Array, size: 1, reader: "getUint8" },
    5122: { Ctor: Int16Array, size: 2, reader: "getInt16" },
    5123: { Ctor: Uint16Array, size: 2, reader: "getUint16" },
    5125: { Ctor: Uint32Array, size: 4, reader: "getUint32" },
    5126: { Ctor: Float32Array, size: 4, reader: "getFloat32" },
  };
  const accessorSizes = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT4: 16,
  };
  const modelYaw = {
    base: 0,
    min: -0.44,
    max: 0.44,
    idleAmplitude: 0.026,
    dragSensitivity: 0.0048,
  };
  const modelPitch = {
    base: 0.04,
    min: 0.015,
    max: 0.075,
    idleAmplitude: 0.004,
    dragSensitivity: 0.0022,
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const resolveAssetUrl = (uri) => new URL(uri, new URL(modelUrl, window.location.href)).href;
  const trimLionPedestal = /lion_head/i.test(modelUrl);

  const createDisjointSet = (count) => {
    const parent = Array.from({ length: count }, (_, index) => index);
    const find = (value) => {
      let cursor = value;
      while (parent[cursor] !== cursor) {
        parent[cursor] = parent[parent[cursor]];
        cursor = parent[cursor];
      }
      return cursor;
    };

    return {
      find,
      union(a, b) {
        const rootA = find(a);
        const rootB = find(b);
        if (rootA !== rootB) parent[rootB] = rootA;
      },
    };
  };

  const copyAttribute = (source, itemSize, remap) => {
    if (!source) return null;
    const output = new source.constructor(remap.size * itemSize);
    remap.forEach((nextIndex, oldIndex) => {
      for (let axis = 0; axis < itemSize; axis += 1) {
        output[nextIndex * itemSize + axis] = source[oldIndex * itemSize + axis];
      }
    });
    return output;
  };

  const removeLowPedestalFaces = ({ position, normal, uv, index }) => {
    if (!trimLionPedestal || !index || index.length < 3) {
      return { position, normal, uv, index, removedFaces: 0 };
    }

    const vertexCount = position.length / 3;
    const set = createDisjointSet(vertexCount);
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];

    for (let vertex = 0; vertex < vertexCount; vertex += 1) {
      for (let axis = 0; axis < 3; axis += 1) {
        const value = position[vertex * 3 + axis];
        min[axis] = Math.min(min[axis], value);
        max[axis] = Math.max(max[axis], value);
      }
    }

    for (let item = 0; item < index.length; item += 3) {
      set.union(index[item], index[item + 1]);
      set.union(index[item + 1], index[item + 2]);
    }

    const components = new Map();
    for (let vertex = 0; vertex < vertexCount; vertex += 1) {
      const root = set.find(vertex);
      let component = components.get(root);
      if (!component) {
        component = {
          count: 0,
          min: [Infinity, Infinity, Infinity],
          max: [-Infinity, -Infinity, -Infinity],
        };
        components.set(root, component);
      }

      component.count += 1;
      for (let axis = 0; axis < 3; axis += 1) {
        const value = position[vertex * 3 + axis];
        component.min[axis] = Math.min(component.min[axis], value);
        component.max[axis] = Math.max(component.max[axis], value);
      }
    }

    const rangeX = Math.max(max[0] - min[0], 0.001);
    const rangeY = Math.max(max[1] - min[1], 0.001);
    const rangeZ = Math.max(max[2] - min[2], 0.001);
    const pedestalTop = min[1] + rangeY * 0.096;
    const pedestalRoots = new Set();

    components.forEach((component, root) => {
      const spanX = component.max[0] - component.min[0];
      const spanZ = component.max[2] - component.min[2];
      const isLow = component.max[1] <= pedestalTop;
      const isBroad = spanX >= rangeX * 0.48 || spanZ >= rangeZ * 0.48 || component.count > 96;
      if (isLow && isBroad) pedestalRoots.add(root);
    });

    if (!pedestalRoots.size) {
      return { position, normal, uv, index, removedFaces: 0 };
    }

    const keptIndices = [];
    let removedFaces = 0;
    for (let item = 0; item < index.length; item += 3) {
      const a = index[item];
      const b = index[item + 1];
      const c = index[item + 2];
      const isPedestalFace = pedestalRoots.has(set.find(a))
        && pedestalRoots.has(set.find(b))
        && pedestalRoots.has(set.find(c));

      if (isPedestalFace) {
        removedFaces += 1;
      } else {
        keptIndices.push(a, b, c);
      }
    }

    if (!removedFaces || keptIndices.length < 3) {
      return { position, normal, uv, index, removedFaces: 0 };
    }

    const remap = new Map();
    const compactIndices = keptIndices.map((oldIndex) => {
      if (!remap.has(oldIndex)) remap.set(oldIndex, remap.size);
      return remap.get(oldIndex);
    });
    const IndexCtor = remap.size > 65535 ? Uint32Array : Uint16Array;

    return {
      position: copyAttribute(position, 3, remap),
      normal: copyAttribute(normal, 3, remap),
      uv: copyAttribute(uv, 2, remap),
      index: new IndexCtor(compactIndices),
      removedFaces,
    };
  };

  const parseGlb = (buffer) => {
    const view = new DataView(buffer);
    if (view.getUint32(0, true) !== 0x46546c67) {
      throw new Error("Invalid GLB header.");
    }

    let json = null;
    let bin = null;
    let offset = 12;
    while (offset < buffer.byteLength) {
      const length = view.getUint32(offset, true);
      const type = view.getUint32(offset + 4, true);
      const chunkStart = offset + 8;
      if (type === 0x4e4f534a) {
        json = JSON.parse(new TextDecoder().decode(buffer.slice(chunkStart, chunkStart + length)));
      } else if (type === 0x004e4942) {
        bin = buffer.slice(chunkStart, chunkStart + length);
      }
      offset = chunkStart + length;
    }
    if (!json || !bin) throw new Error("GLB is missing JSON or BIN chunks.");
    return { json, buffers: [bin] };
  };

  const loadGltf = async () => {
    const response = await fetch(modelUrl);
    if (!response.ok) throw new Error(`Failed to load model: ${response.status}`);

    if (/\.glb($|\?)/i.test(modelUrl)) {
      return parseGlb(await response.arrayBuffer());
    }

    const json = await response.json();
    const buffers = await Promise.all((json.buffers || []).map(async (bufferDef) => {
      if (!bufferDef.uri) throw new Error("External .gltf buffer URI is missing.");
      const bufferResponse = await fetch(resolveAssetUrl(bufferDef.uri));
      if (!bufferResponse.ok) throw new Error(`Failed to load buffer: ${bufferDef.uri}`);
      return bufferResponse.arrayBuffer();
    }));
    return { json, buffers };
  };

  const readAccessor = (json, buffers, index) => {
    const accessor = json.accessors[index];
    const view = json.bufferViews[accessor.bufferView];
    const component = componentTypes[accessor.componentType];
    const itemSize = accessorSizes[accessor.type];
    const buffer = buffers[view.buffer || 0];
    const accessorOffset = accessor.byteOffset || 0;
    const viewOffset = view.byteOffset || 0;
    const stride = view.byteStride || itemSize * component.size;
    const start = viewOffset + accessorOffset;
    const count = accessor.count * itemSize;

    if (!buffer || !component || !itemSize) {
      throw new Error(`Unsupported accessor: ${index}`);
    }

    if (stride === itemSize * component.size) {
      return new component.Ctor(buffer, start, count);
    }

    const output = new component.Ctor(count);
    const data = new DataView(buffer);
    for (let row = 0; row < accessor.count; row += 1) {
      for (let col = 0; col < itemSize; col += 1) {
        output[row * itemSize + col] = data[component.reader](
          start + row * stride + col * component.size,
          true
        );
      }
    }
    return output;
  };

  const loadTexture = (json, buffers, textureInfo, { color = false } = {}) => new Promise((resolve) => {
    const textureDef = json.textures?.[textureInfo?.index];
    const imageDef = json.images?.[textureDef?.source];
    if (!imageDef) {
      resolve(null);
      return;
    }

    let url = null;
    let revokeUrl = false;
    if (imageDef.uri) {
      url = resolveAssetUrl(imageDef.uri);
    } else {
      const view = json.bufferViews?.[imageDef.bufferView];
      const buffer = buffers[view?.buffer || 0];
      if (!view || !buffer) {
        resolve(null);
        return;
      }
      const blob = new Blob([
        buffer.slice(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength),
      ], { type: imageDef.mimeType || "image/png" });
      url = URL.createObjectURL(blob);
      revokeUrl = true;
    }

    new THREE.TextureLoader().load(url, (texture) => {
      texture.flipY = false;
      if (color) {
        if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
        if ("encoding" in texture && THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
      }
      if (revokeUrl) URL.revokeObjectURL(url);
      resolve(texture);
    }, undefined, () => {
      if (revokeUrl) URL.revokeObjectURL(url);
      resolve(null);
    });
  });

  const makeMaterial = async (json, buffers, materialDef = {}) => {
    const pbr = materialDef.pbrMetallicRoughness || {};
    const factor = pbr.baseColorFactor || [1, 1, 1, 1];
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(factor[0], factor[1], factor[2]).multiplyScalar(0.9),
      roughness: pbr.roughnessFactor ?? 0.18,
      metalness: Math.max(pbr.metallicFactor ?? 0, 0.94),
      transparent: materialDef.alphaMode === "BLEND" || factor[3] < 1,
      opacity: factor[3] ?? 1,
      side: materialDef.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    });

    if (pbr.baseColorTexture) {
      const map = await loadTexture(json, buffers, pbr.baseColorTexture, { color: true });
      if (map) {
        material.map = map;
        material.color = new THREE.Color(0x1a2a2e);
      }
    } else {
      material.color = new THREE.Color(0x1a2a2e);
    }

    if (materialDef.normalTexture) {
      const normalMap = await loadTexture(json, buffers, materialDef.normalTexture);
      if (normalMap) {
        material.normalMap = normalMap;
        material.normalScale = new THREE.Vector2(0.72, 0.72);
      }
    }

    if (pbr.metallicRoughnessTexture) {
      const packedMap = await loadTexture(json, buffers, pbr.metallicRoughnessTexture);
      if (packedMap) {
        material.roughnessMap = packedMap;
        material.aoMap = packedMap;
        material.aoMapIntensity = 0.72;
        material.roughness = 0.42;
        material.metalness = 0.9;
      }
    }

    if (materialDef.occlusionTexture) {
      const aoMap = await loadTexture(json, buffers, materialDef.occlusionTexture);
      if (aoMap) {
        material.aoMap = aoMap;
        material.aoMapIntensity = materialDef.occlusionTexture.strength ?? 0.72;
      }
    }

    if (materialDef.emissiveFactor) {
      material.emissive = new THREE.Color(
        materialDef.emissiveFactor[0],
        materialDef.emissiveFactor[1],
        materialDef.emissiveFactor[2]
      );
      material.emissiveIntensity = 1.2;
    }

    if (materialDef.emissiveTexture) {
      const emissiveMap = await loadTexture(json, buffers, materialDef.emissiveTexture, { color: true });
      if (emissiveMap) material.emissiveMap = emissiveMap;
    }

    material.envMapIntensity = 1.6;
    material.needsUpdate = true;
    return material;
  };

  const buildModel = async (json, buffers) => {
    const materials = await Promise.all((json.materials || [{}]).map((material) => (
      makeMaterial(json, buffers, material)
    )));
    const root = new THREE.Group();
    let pedestalFacesRemoved = 0;

    const makeMesh = (meshIndex) => {
      const meshDef = json.meshes[meshIndex];
      const group = new THREE.Group();

      meshDef.primitives.forEach((primitive) => {
        const geometry = new THREE.BufferGeometry();
        const position = readAccessor(json, buffers, primitive.attributes.POSITION);
        const normal = primitive.attributes.NORMAL !== undefined
          ? readAccessor(json, buffers, primitive.attributes.NORMAL)
          : null;
        const uv = primitive.attributes.TEXCOORD_0 !== undefined
          ? readAccessor(json, buffers, primitive.attributes.TEXCOORD_0)
          : null;
        const index = primitive.indices !== undefined
          ? readAccessor(json, buffers, primitive.indices)
          : null;
        const primitiveData = removeLowPedestalFaces({ position, normal, uv, index });

        pedestalFacesRemoved += primitiveData.removedFaces;
        geometry.setAttribute("position", new THREE.BufferAttribute(primitiveData.position, 3));

        if (primitiveData.normal) {
          geometry.setAttribute("normal", new THREE.BufferAttribute(primitiveData.normal, 3));
        } else {
          geometry.computeVertexNormals();
        }

        if (primitiveData.uv) {
          geometry.setAttribute("uv", new THREE.BufferAttribute(primitiveData.uv, 2));
          geometry.setAttribute("uv2", new THREE.BufferAttribute(primitiveData.uv.slice(0), 2));
        }

        if (primitiveData.index) {
          geometry.setIndex(new THREE.BufferAttribute(primitiveData.index, 1));
        }

        geometry.computeBoundingSphere();
        const mesh = new THREE.Mesh(geometry, materials[primitive.material] || materials[0]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
      });

      return group;
    };

    const applyNodeTransform = (object, node) => {
      if (node.matrix) {
        const matrix = new THREE.Matrix4().fromArray(node.matrix);
        matrix.decompose(object.position, object.quaternion, object.scale);
        return;
      }
      if (node.translation) object.position.fromArray(node.translation);
      if (node.rotation) object.quaternion.fromArray(node.rotation);
      if (node.scale) object.scale.fromArray(node.scale);
    };

    const makeNode = (nodeIndex) => {
      const node = json.nodes[nodeIndex] || {};
      const object = node.mesh !== undefined ? makeMesh(node.mesh) : new THREE.Group();
      applyNodeTransform(object, node);
      (node.children || []).forEach((childIndex) => object.add(makeNode(childIndex)));
      return object;
    };

    const sceneDef = json.scenes?.[json.scene || 0] || json.scenes?.[0];
    (sceneDef?.nodes || [0]).forEach((nodeIndex) => root.add(makeNode(nodeIndex)));
    root.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const normalizer = new THREE.Group();
    root.position.sub(center);
    normalizer.add(root);
    normalizer.scale.setScalar(1.8 / maxDim);
    normalizer.rotation.set(modelPitch.base, modelYaw.base, -0.03);
    normalizer.userData.pedestalFacesRemoved = pedestalFacesRemoved;
    return { object: normalizer, size, scale: normalizer.scale.x, pedestalFacesRemoved };
  };

  const createOrbitControls = (element) => {
    const target = { x: 0, y: 0, distance: 5.2 };
    const current = { x: 0, y: 0, distance: 5.2 };
    const hover = { x: 0, y: 0, active: false };
    let activePointerId = null;
    let lastX = 0;
    let lastY = 0;

    const endDrag = (event) => {
      if (activePointerId !== event.pointerId) return;
      activePointerId = null;
      document.body.classList.remove("hero-model-orbiting");
      try {
        element.releasePointerCapture(event.pointerId);
      } catch {}
    };

    element.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      activePointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      document.body.classList.add("hero-model-orbiting");
      element.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    element.addEventListener("pointermove", (event) => {
      if (activePointerId !== event.pointerId) {
        const rect = element.getBoundingClientRect();
        const nx = clamp(((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2, -1, 1);
        const ny = clamp(((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2, -1, 1);
        const rightHoverRange = (modelYaw.max - modelYaw.base) * 0.34;
        const leftHoverRange = (modelYaw.base - modelYaw.min) * 0.34;
        hover.y = nx >= 0 ? nx * rightHoverRange : nx * leftHoverRange;
        hover.x = clamp(ny * 0.018, modelPitch.min - modelPitch.base, modelPitch.max - modelPitch.base);
        hover.active = true;
        return;
      }
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      target.y = clamp(
        target.y + dx * modelYaw.dragSensitivity,
        modelYaw.min - modelYaw.base,
        modelYaw.max - modelYaw.base
      );
      target.x = clamp(
        target.x + dy * modelPitch.dragSensitivity,
        modelPitch.min - modelPitch.base,
        modelPitch.max - modelPitch.base
      );
      event.preventDefault();
    });

    // Let page scroll pass through without zooming the sculpture in depth.

    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);
    element.addEventListener("lostpointercapture", () => {
      activePointerId = null;
      document.body.classList.remove("hero-model-orbiting");
    });
    element.addEventListener("pointerleave", () => {
      hover.active = false;
      hover.x = 0;
      hover.y = 0;
    });

    element.addEventListener("dblclick", () => {
      target.x = 0;
      target.y = 0;
      target.distance = 5.2;
    });

    return {
      update() {
        if (activePointerId === null) {
          target.x += (0 - target.x) * 0.018;
          target.y += (0 - target.y) * 0.018;
        }
        const hoverX = activePointerId === null && hover.active ? hover.x : 0;
        const hoverY = activePointerId === null && hover.active ? hover.y : 0;
        current.x += (target.x + hoverX - current.x) * 0.22;
        current.y += (target.y + hoverY - current.y) * 0.22;
        current.distance += (target.distance - current.distance) * 0.12;
        return current;
      },
      get isInteracting() {
        return activePointerId !== null;
      },
    };
  };

  const makeStudioEnvironment = () => {
    const faces = ["px", "nx", "py", "ny", "pz", "nz"].map((face) => {
      const envCanvas = document.createElement("canvas");
      envCanvas.width = 64;
      envCanvas.height = 64;
      const ctx = envCanvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 64, 64);
      gradient.addColorStop(0, face === "py" ? "#ffffff" : "#e8e6e2");
      gradient.addColorStop(0.42, "#d4d0c8");
      gradient.addColorStop(1, face === "nx" || face === "pz" ? "#f8f6f2" : "#c8c4bc");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fillRect(face === "px" ? 42 : 10, 8, 10, 48);
      return envCanvas;
    });
    const texture = new THREE.CubeTexture(faces);
    texture.needsUpdate = true;
    if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    if ("encoding" in texture && THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
    return texture;
  };

  const init = async () => {
    const scene = new THREE.Scene();
    scene.environment = makeStudioEnvironment();

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0.12, 1.8, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    if (renderer.shadowMap) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap || renderer.shadowMap.type;
    }
    if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    if ("outputEncoding" in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    if ("toneMapping" in renderer && THREE.ACESFilmicToneMapping) renderer.toneMapping = THREE.ACESFilmicToneMapping;
    if ("toneMappingExposure" in renderer) renderer.toneMappingExposure = 1.3;

    scene.add(new THREE.AmbientLight(0xe8e4de, 0.6));
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd4d0c8, 0.9));

    const key = new THREE.DirectionalLight(0xfff8f0, 2.8);
    key.position.set(4.4, 5.2, 3.6);
    key.castShadow = true;
    if (key.shadow?.mapSize) {
      key.shadow.mapSize.width = 2048;
      key.shadow.mapSize.height = 2048;
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 12;
      key.shadow.camera.left = -4;
      key.shadow.camera.right = 4;
      key.shadow.camera.top = 4;
      key.shadow.camera.bottom = -4;
    }
    scene.add(key);

    const rim = new THREE.SpotLight(0xd0e8ff, 1.8, 8.5, 0.42, 0.88, 1.2);
    rim.position.set(-3.9, 3.4, 4.7);
    rim.castShadow = true;
    scene.add(rim);

    const back = new THREE.PointLight(0xc8d8e8, 0.9, 7.5);
    back.position.set(0.6, 1.8, -3.6);
    scene.add(back);

    const { json, buffers } = await loadGltf();
    const { object: model, size, scale, pedestalFacesRemoved } = await buildModel(json, buffers);
    const controls = createOrbitControls(canvas);
    scene.add(model);
    document.body.classList.add("hero-model-ready");
    window.LucianHeroModel = {
      camera,
      model,
      renderer,
      controls,
      source: modelUrl,
      size: { x: size.x, y: size.y, z: size.z },
      scale,
      pedestalFacesRemoved,
      motion: {
        yaw: modelYaw,
        pitch: modelPitch,
      },
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(2, Math.round(rect.width * dpr));
      const height = Math.max(2, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setPixelRatio(dpr);
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / Math.max(rect.height, 1);
        camera.fov = rect.width < 720 ? 38 : 32;
        camera.updateProjectionMatrix();
      }
    };

    let animationStart = null;
    const animate = (time = 0) => {
      resize();
      if (animationStart === null) animationStart = time;
      const t = Math.max(0, (time - animationStart) * 0.001);
      const orbit = controls.update();
      const mobileLift = host.getBoundingClientRect().width < 720 ? 0.08 : 0;
      const idleFade = Math.min(1, t * 0.42);
      const autoYaw = controls.isInteracting ? 0 : Math.sin(t * 0.52) * modelYaw.idleAmplitude * idleFade;

      model.position.y = 0.64 + mobileLift + Math.sin(t * 1.1) * 0.028;
      camera.position.y = (host.getBoundingClientRect().width < 720 ? 1.9 : 1.8) + mobileLift;
      camera.position.z = orbit.distance + (host.getBoundingClientRect().width < 720 ? 0.7 : 0);
      camera.lookAt(0, model.position.y + 0.08, 0);
      model.rotation.y = clamp(modelYaw.base + autoYaw + orbit.y, modelYaw.min, modelYaw.max);
      const autoPitch = Math.sin(t * 0.38) * modelPitch.idleAmplitude * idleFade;
      model.rotation.x = clamp(modelPitch.base + autoPitch + orbit.x, modelPitch.min, modelPitch.max);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize, { passive: true });
    animate();
  };

  init().catch((error) => {
    console.error("Hero GLTF model failed:", error);
    document.body.classList.add("hero-model-error");
  });
})();
