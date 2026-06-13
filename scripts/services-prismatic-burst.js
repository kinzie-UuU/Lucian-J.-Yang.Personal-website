(() => {
  const section = document.querySelector(".services-scroll-story");
  const canvas = document.getElementById("services-prismatic-canvas");
  if (!section || !canvas) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const TARGET_FRAME_MS = 1000 / 42;
  const config = {
    animationType: "rotate3d",
    intensity: 1.84,
    speed: 0.5,
    distort: 1,
    offset: { x: 0, y: 0 },
    hoverDampness: 0.25,
    rayCount: 24,
    colors: ["#061314", "#1edfd2", "#b8fff8", "#ffffff"],
  };

  const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

  const fragmentShader = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const toPx = (value) => {
    if (value == null) return 0;
    if (typeof value === "number") return value;
    const parsed = parseFloat(String(value).trim().replace("px", ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  };
  const hexToRgb01 = (hex) => {
    let h = String(hex || "").trim();
    if (h.startsWith("#")) h = h.slice(1);
    if (h.length === 3) h = h.split("").map((part) => part + part).join("");
    const intValue = parseInt(h, 16);
    if (Number.isNaN(intValue) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
    return [
      ((intValue >> 16) & 255) / 255,
      ((intValue >> 8) & 255) / 255,
      (intValue & 255) / 255,
    ];
  };

  let gl = null;
  let program = null;
  let buffer = null;
  let gradientTexture = null;
  let frameId = 0;
  let initialized = false;
  let initFailed = false;
  let visible = false;
  let last = performance.now();
  let lastRenderedAt = 0;
  let elapsed = 0;
  let lastState = { tunnelProgress: 0, cardProgress: 0 };
  const mouseTarget = [0.5, 0.5];
  const mouseSmooth = [0.5, 0.5];

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || "Services prismatic shader failed.";
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  };

  const createProgram = () => {
    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const nextProgram = gl.createProgram();
    gl.attachShader(nextProgram, vertex);
    gl.attachShader(nextProgram, fragment);
    gl.linkProgram(nextProgram);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(nextProgram) || "Services prismatic program failed.";
      gl.deleteProgram(nextProgram);
      throw new Error(message);
    }
    return nextProgram;
  };

  const makeGradient = () => {
    const colors = Array.isArray(config.colors) ? config.colors.slice(0, 64) : [];
    const count = Math.max(1, colors.length);
    const data = new Uint8Array(count * 4);
    (colors.length ? colors : ["#ffffff"]).forEach((color, index) => {
      const [r, g, b] = hexToRgb01(color);
      data[index * 4] = Math.round(r * 255);
      data[index * 4 + 1] = Math.round(g * 255);
      data[index * 4 + 2] = Math.round(b * 255);
      data[index * 4 + 3] = 255;
    });
    gradientTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, gradientTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, count, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  };

  const resize = () => {
    if (!gl) return;
    const rect = canvas.getBoundingClientRect();
    const viewportWidth = window.innerWidth || 1;
    const maxDpr = viewportWidth < 720 ? 0.86 : 1.12;
    const dpr = Math.max(0.72, Math.min(window.devicePixelRatio || 1, maxDpr));
    const width = Math.max(1, Math.round((rect.width || viewportWidth) * dpr));
    const height = Math.max(1, Math.round((rect.height || window.innerHeight || 1) * dpr));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };

  const render = (now) => {
    if (!gl || !program) return;
    resize();
    const dt = Math.max(0, now - last) * 0.001;
    last = now;
    if (!prefersReducedMotion) elapsed += dt;

    const damp = 0.02 + clamp01(config.hoverDampness) * 0.5;
    const alpha = 1 - Math.exp(-dt / damp);
    mouseSmooth[0] += (mouseTarget[0] - mouseSmooth[0]) * alpha;
    mouseSmooth[1] += (mouseTarget[1] - mouseSmooth[1]) * alpha;

    const tunnelProgress = clamp01(lastState.tunnelProgress || 0);
    const cardProgress = clamp01(lastState.cardProgress || 0);
    const animType = config.animationType === "rotate" ? 0 : config.animationType === "hover" ? 2 : 1;
    const offsetX = toPx(config.offset.x) + (tunnelProgress - 0.5) * canvas.width * 0.03;
    const offsetY = toPx(config.offset.y);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, gradientTexture);
    gl.uniform2f(program.uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform1f(program.uniforms.uTime, elapsed);
    gl.uniform1f(program.uniforms.uIntensity, config.intensity * (0.72 + tunnelProgress * 0.42) * (1 - cardProgress * 0.25));
    gl.uniform1f(program.uniforms.uSpeed, config.speed);
    gl.uniform1i(program.uniforms.uAnimType, animType);
    gl.uniform2f(program.uniforms.uMouse, mouseSmooth[0], mouseSmooth[1]);
    gl.uniform1i(program.uniforms.uColorCount, config.colors.length);
    gl.uniform1f(program.uniforms.uDistort, config.distort + tunnelProgress * 0.24);
    gl.uniform2f(program.uniforms.uOffset, offsetX, offsetY);
    gl.uniform1i(program.uniforms.uGradient, 0);
    gl.uniform1f(program.uniforms.uNoiseAmount, 0.8);
    gl.uniform1i(program.uniforms.uRayCount, config.rayCount);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  const loop = (now) => {
    if (document.hidden) {
      stop();
      return;
    }
    if (lastRenderedAt && now - lastRenderedAt < TARGET_FRAME_MS) {
      frameId = window.requestAnimationFrame(loop);
      return;
    }
    lastRenderedAt = now;
    render(now);
    if (visible && !prefersReducedMotion && lastState.cardProgress < 0.95) {
      frameId = window.requestAnimationFrame(loop);
    }
  };

  const start = () => {
    if (frameId || prefersReducedMotion) return;
    if (!ensureInit()) return;
    last = performance.now();
    frameId = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!frameId) return;
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const setProgress = (state = {}) => {
    lastState = {
      tunnelProgress: clamp01(state.tunnelProgress || 0),
      cardProgress: clamp01(state.cardProgress || 0),
    };
    if (!initialized && (visible || lastState.tunnelProgress > 0.02)) ensureInit();
    if (visible && lastState.cardProgress < 0.95) start();
    else stop();
    if (initialized) render(performance.now());
  };

  const init = () => {
    gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.dataset.prismaticEngine = "webgl2-unavailable";
      return;
    }
    program = createProgram();
    program.uniforms = {
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uIntensity: gl.getUniformLocation(program, "uIntensity"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uAnimType: gl.getUniformLocation(program, "uAnimType"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uColorCount: gl.getUniformLocation(program, "uColorCount"),
      uDistort: gl.getUniformLocation(program, "uDistort"),
      uOffset: gl.getUniformLocation(program, "uOffset"),
      uGradient: gl.getUniformLocation(program, "uGradient"),
      uNoiseAmount: gl.getUniformLocation(program, "uNoiseAmount"),
      uRayCount: gl.getUniformLocation(program, "uRayCount"),
    };
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 0,
      1, -1, 1, 0,
      -1, 1, 0, 1,
      -1, 1, 0, 1,
      1, -1, 1, 0,
      1, 1, 1, 1,
    ]), gl.STATIC_DRAW);
    const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
    const position = gl.getAttribLocation(program, "position");
    const uv = gl.getAttribLocation(program, "uv");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(uv);
    gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);
    makeGradient();
    canvas.dataset.prismaticEngine = "webgl2-prismatic-burst";
    resize();
    render(performance.now());
  };

  const ensureInit = () => {
    if (initialized) return true;
    if (initFailed || prefersReducedMotion) return false;
    try {
      init();
      initialized = true;
      return true;
    } catch (error) {
      initFailed = true;
      canvas.dataset.prismaticEngine = "webgl2-init-failed";
      console.error(error);
      return false;
    }
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseTarget[0] = clamp01((event.clientX - rect.left) / Math.max(rect.width, 1));
    mouseTarget[1] = clamp01((event.clientY - rect.top) / Math.max(rect.height, 1));
  }, { passive: true });

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) {
      ensureInit();
      start();
    }
    else stop();
  }, { rootMargin: "48% 0px", threshold: 0.01 });
  observer.observe(section);

  window.LucianServicesPrismatic = {
    getEngine: () => canvas.dataset.prismaticEngine || null,
    refresh: () => {
      if (!ensureInit()) return;
      resize();
      render(performance.now());
    },
    setProgress,
    stop,
  };

  window.addEventListener("resize", () => {
    if (!initialized) return;
    resize();
    render(performance.now());
  }, { passive: true });

  window.addEventListener("pagehide", () => {
    stop();
    observer.disconnect();
    if (gl && gradientTexture) gl.deleteTexture(gradientTexture);
    if (gl && buffer) gl.deleteBuffer(buffer);
    if (gl && program) gl.deleteProgram(program);
  }, { once: true });
})();
