(() => {
  const initServicesEntryGridScan = (canvas) => {
    if (!canvas || typeof THREE === "undefined") return null;

    const card = canvas.closest(".services-entry-card") || canvas;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x020908, 1);

    const uniforms = {
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iTime: { value: 0 },
      uOpen: { value: 0 },
      uInside: { value: 0 },
      uProgress: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 iResolution;
        uniform float iTime;
        uniform float uOpen;
        uniform float uInside;
        uniform float uProgress;
        uniform vec2 uPointer;
        varying vec2 vUv;

        float smoother01(float a, float b, float x) {
          float t = clamp((x - a) / max(1e-5, b - a), 0.0, 1.0);
          return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
        }

        float gridMask(vec2 uv, float thickness) {
          vec2 f = fract(uv);
          vec2 a = min(f, 1.0 - f);
          vec2 w = max(fwidth(uv), vec2(0.0008));
          vec2 line = 1.0 - smoothstep(thickness * w, thickness * w + w * 1.45, a);
          return max(line.x, line.y);
        }

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        void main() {
          vec2 fragCoord = vUv * iResolution.xy;
          vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
          float open = smoothstep(0.0, 1.0, uOpen);
          float inside = smoothstep(0.0, 1.0, uInside);

          vec3 ro = vec3(0.0, 0.0, -0.54 - open * 0.24);
          vec3 rd = normalize(vec3(p * 0.86, 2.18 + open * 0.44));

          float tilt = uPointer.y * mix(0.12, 0.26, open);
          float yaw = uPointer.x * mix(0.1, 0.24, open);
          float cR = cos(tilt), sR = sin(tilt);
          rd.yz = mat2(cR, -sR, sR, cR) * rd.yz;
          float cY = cos(yaw), sY = sin(yaw);
          rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;
          rd.xy += uPointer * (0.04 + open * 0.08) * rd.z;

          float minT = 1e20;
          vec2 gridUV = vec2(0.0);
          vec3 hit = vec3(0.0);
          float hitSide = 0.0;

          for (int i = 0; i < 4; i++) {
            float isY = float(i < 2);
            float wall = mix(-0.56, 0.56, float(i)) * isY + mix(-1.02, 1.02, float(i - 2)) * (1.0 - isY);
            float num = wall - (isY * ro.y + (1.0 - isY) * ro.x);
            float den = isY * rd.y + (1.0 - isY) * rd.x;
            float t = num / den;
            vec3 h = ro + rd * t;
            bool use = t > 0.0 && t < minT && h.z > 0.0 && h.z < 6.4;
            minT = use ? t : minT;
            hit = use ? h : hit;
            gridUV = use ? mix(h.xz, h.yz, 1.0 - isY) / mix(0.105, 0.082, open) : gridUV;
            hitSide = use ? isY : hitSide;
          }

          float dist = length(hit - ro);
          float travel = iTime * (0.34 + open * 1.55) + uProgress * 4.8;
          gridUV.y -= travel;
          gridUV += vec2(
            sin(gridUV.y * 2.7 + iTime * 1.8),
            cos(gridUV.x * 2.3 - iTime * 1.6)
          ) * 0.012;

          float lines = gridMask(gridUV, 1.0);
          float redBlue = gridMask(gridUV + vec2(0.035, -0.018), 0.92);
          float fade = exp(-dist * 0.74) * smoothstep(6.4, 0.1, hit.z);
          float centerVoid = smoothstep(0.18, 1.8, hit.z);

          float cycle = mod(iTime + uProgress * 1.35, 3.8);
          float phase = cycle < 1.9 ? cycle / 1.9 : 1.0 - (cycle - 1.9) / 1.9;
          phase = mix(phase, fract(iTime * 0.52 + uProgress * 1.4), open * 0.55);
          float scanZ = phase * 5.8;
          float dz = abs(hit.z - scanZ);
          float scan = exp(-0.5 * dz * dz / (0.22 * 0.22));
          float aura = exp(-0.5 * dz * dz / (0.62 * 0.62)) * 0.32;
          float taper = smoother01(0.02, 0.22, phase) * (1.0 - smoother01(0.82, 1.0, phase));

          vec3 base = vec3(0.02, 0.075, 0.068);
          vec3 lineCol = vec3(0.286, 0.768, 0.690) * lines;
          vec3 fringe = vec3(0.15, 0.86, 0.76) * redBlue * 0.42 + vec3(0.72, 1.0, 0.92) * lines * 0.16;
          vec3 scanCol = vec3(0.286, 0.768, 0.690) * (scan * 0.72 + aura * 0.96) * taper;
          vec3 color = base * centerVoid + (lineCol + fringe + scanCol) * fade;
          color += vec3(hash(fragCoord + iTime * 96.0) - 0.5) * 0.018;

          float alpha = clamp((0.44 + lines * 0.74 + scan * 0.48 + aura * 0.3) * fade + 0.14 * centerVoid, 0.0, 0.98);
          gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      extensions: {
        derivatives: true,
      },
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let targetOpen = 0;
    let currentOpen = 0;
    let targetInside = 0;
    let currentInside = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let raf = 0;
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(width, height, renderer.getPixelRatio());
    };

    const onPointerLeave = () => {
      pointerTarget.set(0, 0);
    };

    const tick = (now) => {
      if (document.hidden || document.body.classList.contains("nav-transition-active")) {
        raf = requestAnimationFrame(tick);
        return;
      }

      currentOpen += (targetOpen - currentOpen) * 0.075;
      currentInside += (targetInside - currentInside) * 0.075;
      currentProgress += (targetProgress - currentProgress) * 0.08;
      pointerCurrent.lerp(pointerTarget, 0.12);

      uniforms.iTime.value = now / 1000;
      uniforms.uOpen.value = currentOpen;
      uniforms.uInside.value = currentInside;
      uniforms.uProgress.value = currentProgress;
      uniforms.uPointer.value.copy(pointerCurrent);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);
    card.addEventListener("pointerleave", onPointerLeave);
    resize();
    raf = requestAnimationFrame(tick);

    return {
      setProgress(open, inside, progress, options = {}) {
        targetOpen = Math.min(1, Math.max(0, open));
        targetInside = Math.min(1, Math.max(0, inside));
        targetProgress = Math.min(1, Math.max(0, progress));
        if (options.snap) {
          currentOpen = targetOpen;
          currentInside = targetInside;
          currentProgress = targetProgress;
          pointerTarget.set(0, 0);
          pointerCurrent.set(0, 0);
          resize();
        }
      },
      destroy() {
        if (raf) cancelAnimationFrame(raf);
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("blur", onPointerLeave);
        document.removeEventListener("mouseleave", onPointerLeave);
        card.removeEventListener("pointerleave", onPointerLeave);
        material.dispose();
        quad.geometry.dispose();
        renderer.dispose();
      },
    };
  };

  window.initServicesEntryGridScan = initServicesEntryGridScan;
})();
