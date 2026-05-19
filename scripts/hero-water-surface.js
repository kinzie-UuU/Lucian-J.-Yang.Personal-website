(() => {
window.initHeroWaterSurface = (canvas, { reducedMotion = false, getScrollProgress = () => 0 } = {}) => {
  if (!canvas || reducedMotion) return;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  // 閳光偓閳光偓 shared quad 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const quadVert = `
    attribute vec2 a_pos;
    varying vec2 v_uv;
    void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // 閳光偓閳光偓 Pass 1: wave-equation simulation (ping-pong FBO) 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const simFrag = `
    precision highp float;
    uniform sampler2D u_prev;
    uniform vec2  u_res;
    uniform vec2  u_mouse;
    uniform vec2  u_last_mouse;
    uniform vec2  u_velocity;
    uniform float u_viscosity;
    uniform float u_speed;
    uniform float u_size;
    uniform int   u_frame;
    varying vec2 v_uv;

    float sdLine(vec2 p, vec2 a, vec2 b) {
      float vel = clamp(length(u_velocity), 0.5, 1.5);
      vec2 pa = p - a, ba = b - a;
      float len2 = dot(ba, ba);
      if (len2 < 0.000001) return length(pa) / vel;
      float h = clamp(dot(pa,ba)/len2, 0.0, 1.0);
      return length(pa - ba*h) / vel;
    }

    void main() {
      vec2 spd = vec2(u_speed) / u_res;
      vec4 self = texture2D(u_prev, v_uv);

      float top    = texture2D(u_prev, v_uv - spd.yx).r;
      float right  = texture2D(u_prev, v_uv + spd.xy).r;
      float bottom = texture2D(u_prev, v_uv + spd.yx).r;
      float left   = texture2D(u_prev, v_uv - spd.xy).r;

      float velocity = clamp(length(u_velocity), 0.1, 1.0);
      float shade = smoothstep(0.02 * u_size * velocity, 0.0,
                               sdLine(v_uv, u_last_mouse, u_mouse));
      float d = shade * u_viscosity;
      d += -(self.g - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
      d *= 0.99;
      d *= float(u_frame > 5);
      d = d * 0.5 + 0.5;

      gl_FragColor = vec4(d, self.r, 0.0, 1.0);
    }
  `;

  // 閳光偓閳光偓 Pass 2: render water surface 閳?black base, teal from ripple energy, unified displacement 閳光偓閳光偓
  const renderFrag = `
    precision highp float;
    uniform sampler2D u_ripple;
    uniform sampler2D u_title;
    uniform vec2  u_sim_res;
    uniform float u_scroll;
    uniform float u_disp;
    uniform float u_light;
    uniform float u_shadow;
    varying vec2 v_uv;

    const float bias  = 0.2;
    const float scale = 10.0;
    const float power = 10.1;

    vec4 blurRipple(vec2 uv) {
      vec2 off = vec2(1.333) / u_sim_res;
      vec4 c = vec4(0.0);
      c += texture2D(u_ripple, uv) * 0.294;
      c += texture2D(u_ripple, uv + off) * 0.353;
      c += texture2D(u_ripple, uv - off) * 0.353;
      return c;
    }

    float bumpMap(vec2 uv, float h) {
      return 1.0 - blurRipple(uv).r * h;
    }

    vec4 renderPass(vec2 uv, inout float distortion) {
      vec3 surfacePos = vec3(uv, 0.0);
      vec3 ray = normalize(vec3(uv, 1.0));
      vec3 lightPos = vec3(2.0, 3.0, -3.0);
      vec3 normal = vec3(0.0, 0.0, -1.0);
      vec2 sd = vec2(0.005, 0.0);

      float fx = bumpMap(uv + sd.xy, 0.2);
      float fy = bumpMap(uv + sd.yx, 0.2);
      float f  = bumpMap(uv, 0.2);
      distortion = f;

      fx = (fx - f) / sd.x;
      fy = (fy - f) / sd.x;
      normal = normalize(normal + vec3(fx, fy, 0.0) * 0.2);

      float shade = bias + scale * pow(1.0 + dot(normalize(surfacePos - vec3(uv, -3.0)), normal), power);
      vec3 lightV = lightPos - surfacePos;
      float lightDist = max(length(lightV), 0.001);
      lightV /= lightDist;

      vec3 lightColor = vec3(1.0 - u_light / 20.0);
      float brightness = 1.0 - u_light / 40.0;
      float falloff = 0.1;
      float attenuation = (0.75 + u_light / 40.0) / (1.0 + lightDist * lightDist * falloff);
      float diffuse  = max(dot(normal, lightV), 0.0);
      float specular = pow(max(dot(reflect(-lightV, normal), -ray), 0.0), 15.0) * 0.1;

      float metalness = 1.0 - blurRipple(uv).r;
      metalness *= metalness;

      vec3 texCol = vec3(0.5) * brightness;
      vec3 color = (texCol * (diffuse * vec3(0.9) * 2.0 + 0.5)
                  + lightColor * specular * f * 2.0 * metalness) * attenuation * 2.0;
      return vec4(color, 1.0);
    }

    void main() {
      float distortion;
      vec4 reflections = renderPass(v_uv, distortion);

      float rippleVal = blurRipple(v_uv).r;
      // wave energy: deviation from neutral 0.5 閳?0 at rest, 1 at peak
      float energy = clamp(abs(rippleVal - 0.5) * 3.2, 0.0, 1.0);

      float ripple = 0.16 + distortion * 0.1 - 0.1 + reflections.r * 0.7;

      // base: transparent water floor — light gray with subtle depth
      vec3 baseNear = vec3(0.88, 0.87, 0.85);
      vec3 baseFar = vec3(0.92, 0.91, 0.89);
      vec3 base = mix(baseNear, baseFar, smoothstep(0.14, 0.94, v_uv.y));

      // transparent water palette: subtle silver/white highlights on waves
      vec3 tealDim    = vec3(0.82, 0.81, 0.79);
      vec3 tealMid    = vec3(0.90, 0.89, 0.87);
      vec3 tealBright = vec3(0.96, 0.95, 0.93);
      vec3 tealPeak   = vec3(1.00, 0.99, 0.97);

      vec3 tealCol = mix(tealDim,    tealMid,    smoothstep(0.0,  0.35, energy));
      tealCol      = mix(tealCol,    tealBright, smoothstep(0.35, 0.72, energy));
      tealCol      = mix(tealCol,    tealPeak,   smoothstep(0.72, 1.00, energy));

      vec3 col = mix(base, tealCol, energy * 0.86);

      // specular reflection: subtle white highlight
      col += reflections.rgb * vec3(0.72, 0.70, 0.68) * energy;
      col += vec3(0.04, 0.03, 0.02) * smoothstep(0.18, 0.92, v_uv.y) * 0.34;

      float lights = max(0.0, ripple - 0.5);
      col += lights * (u_light / 10.0) * vec3(0.92, 0.90, 0.86);
      float shadow = max(0.0, 1.0 - (ripple + 0.5));
      col -= shadow * (u_shadow / 10.0);

      // title: wide-kernel blur of ripple height 閳?smooth 2D displacement
      // height deviation from 0.5 is unipolar (no sign flip) 閳?text floats with waves, no oscillation
      vec2 px = vec2(1.0) / u_sim_res;
      float h00 = texture2D(u_ripple, v_uv).r;
      float h10 = texture2D(u_ripple, v_uv + vec2( px.x * 8.0, 0.0)).r;
      float hm1 = texture2D(u_ripple, v_uv + vec2(-px.x * 8.0, 0.0)).r;
      float h01 = texture2D(u_ripple, v_uv + vec2(0.0,  px.y * 8.0)).r;
      float h0m = texture2D(u_ripple, v_uv + vec2(0.0, -px.y * 8.0)).r;
      // wide gaussian: smooth height avoids high-freq oscillation
      float hSmooth = h00 * 0.36 + (h10 + hm1 + h01 + h0m) * 0.16;
      // deviation from neutral 0.5 drives displacement magnitude and direction
      float hDev = hSmooth - 0.5;
      // direction: tilt toward the wave 閳?use local gradient of the smooth field
      float gx = h10 - hm1;
      float gy = h01 - h0m;
      vec2 titleUv = clamp(v_uv + vec2(gx, gy) * hDev * (u_disp * 0.4), 0.001, 0.999);
      vec4 title = texture2D(u_title, titleUv);
      col = mix(col, title.rgb, title.a * 0.22);

      float vign = 1.0 - smoothstep(0.35, 1.1, length(v_uv - 0.5) * 1.6);
      col *= vign * 0.92 + 0.08;

      float alpha = (1.0 - u_scroll * 0.82) * 0.72;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
    }
  `;

  // 閳光偓閳光偓 compile helper 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(sh));
    }
    return sh;
  };
  const makeProgram = (fSrc) => {
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, quadVert));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fSrc));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(p));
    }
    return p;
  };

  const simProg    = makeProgram(simFrag);
  const renderProg = makeProgram(renderFrag);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const simAPos    = gl.getAttribLocation(simProg,    "a_pos");
  const renderAPos = gl.getAttribLocation(renderProg, "a_pos");

  const bindQuad = (loc) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  };

  // 閳光偓閳光偓 FBO helpers 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const makeFBO = (w, h) => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // init to neutral 0.5 (=0x80) 閳?wave equation resting state is r=0.5, g=0.5
    const init = new Uint8Array(w * h * 4).fill(0x80);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, init);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex, fb };
  };

  let simW = 0, simH = 0;
  let fboA, fboB;
  let read, write;

  const resizeFBOs = (w, h) => {
    if (fboA) { gl.deleteTexture(fboA.tex); gl.deleteFramebuffer(fboA.fb); }
    if (fboB) { gl.deleteTexture(fboB.tex); gl.deleteFramebuffer(fboB.fb); }
    fboA = makeFBO(w, h);
    fboB = makeFBO(w, h);
    simW = w; simH = h;
    // update read/write references to the new FBOs
    read = fboA; write = fboB;
  };

  // 閳光偓閳光偓 title texture 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const titleTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, titleTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const titleCanvas2d = document.createElement("canvas");
  const updateTitleTexture = () => {
    const w = canvas.clientWidth  * Math.min(window.devicePixelRatio, 2);
    const h = canvas.clientHeight * Math.min(window.devicePixelRatio, 2);
    if (w < 4 || h < 4) return; // canvas not yet laid out
    titleCanvas2d.width  = w;
    titleCanvas2d.height = h;
    const ctx2d = titleCanvas2d.getContext("2d");
    ctx2d.clearRect(0, 0, w, h);
    const fontSize = Math.round(w * 0.052);
    ctx2d.font = `700 ${fontSize}px "Trench Slab", "Cabinet Grotesk", "Satoshi", system-ui, sans-serif`;
    ctx2d.fillStyle = "rgba(255,255,255,0.14)";
    ctx2d.textAlign = "center";
    ctx2d.textBaseline = "middle";
    ctx2d.fillText("LUCIAN J. YANG", w / 2, h * 0.32);
    gl.bindTexture(gl.TEXTURE_2D, titleTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, titleCanvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  };

  // 閳光偓閳光偓 resize 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  // Sim runs at half resolution for performance; render pass upscales via LINEAR
  const SIM_SCALE = 0.5;
  const resize = () => {
    const pr = Math.min(window.devicePixelRatio, 2);
    const w  = Math.round(canvas.clientWidth  * pr);
    const h  = Math.round(canvas.clientHeight * pr);
    if (w < 4 || h < 4) { requestAnimationFrame(resize); return; }
    canvas.width  = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    resizeFBOs(Math.round(w * SIM_SCALE), Math.round(h * SIM_SCALE));
    updateTitleTexture();
  };
  window.addEventListener("resize", resize);
  resize();

  document.fonts?.load?.('700 160px "Trench Slab"').then(() => {
    updateTitleTexture();
  }).catch(() => {});

  // 閳光偓閳光偓 cache uniform locations 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  const uSim = {
    prev:       gl.getUniformLocation(simProg, "u_prev"),
    res:        gl.getUniformLocation(simProg, "u_res"),
    mouse:      gl.getUniformLocation(simProg, "u_mouse"),
    lastMouse:  gl.getUniformLocation(simProg, "u_last_mouse"),
    velocity:   gl.getUniformLocation(simProg, "u_velocity"),
    viscosity:  gl.getUniformLocation(simProg, "u_viscosity"),
    speed:      gl.getUniformLocation(simProg, "u_speed"),
    size:       gl.getUniformLocation(simProg, "u_size"),
    frame:      gl.getUniformLocation(simProg, "u_frame"),
  };
  const uRender = {
    ripple:   gl.getUniformLocation(renderProg, "u_ripple"),
    title:    gl.getUniformLocation(renderProg, "u_title"),
    simRes:   gl.getUniformLocation(renderProg, "u_sim_res"),
    scroll:   gl.getUniformLocation(renderProg, "u_scroll"),
    disp:     gl.getUniformLocation(renderProg, "u_disp"),
    light:    gl.getUniformLocation(renderProg, "u_light"),
    shadow:   gl.getUniformLocation(renderProg, "u_shadow"),
  };

  // 閳光偓閳光偓 mouse state 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  let mx = -1.0, my = -0.5, lmx = -1.1, lmy = -0.6;
  let velX = 0, velY = 0;
  let pointerSeeded = false;
  const clamp01 = (value) => Math.max(0, Math.min(1, value));

  const onPointer = (e) => {
    const rect = canvas.getBoundingClientRect();
    const surfaceMargin = 48;
    if (
      rect.width < 4 ||
      rect.height < 4 ||
      e.clientX < rect.left - surfaceMargin ||
      e.clientX > rect.right + surfaceMargin ||
      e.clientY < rect.top - surfaceMargin ||
      e.clientY > rect.bottom + surfaceMargin
    ) {
      pointerSeeded = false;
      return;
    }

    const nx = clamp01((e.clientX - rect.left) / rect.width);
    const ny = clamp01(1.0 - ((e.clientY - rect.top) / rect.height));
    if (!pointerSeeded) {
      // first move: seed both positions to avoid a teleport-line across the canvas
      mx = nx; my = ny; lmx = nx; lmy = ny;
      pointerSeeded = true;
      return;
    }
    lmx = mx; lmy = my;
    mx = nx; my = ny;
    velX = (mx - lmx) * rect.width / 16;
    velY = (my - lmy) * rect.height / 16;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // 閳光偓閳光偓 render loop 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓
  let frame = 0;
  let raf;

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const sp = getScrollProgress();

    // auto-resize when canvas becomes visible after has-entered
    const pr = Math.min(window.devicePixelRatio, 2);
    const cw = Math.round(canvas.clientWidth * pr);
    const ch = Math.round(canvas.clientHeight * pr);
    if (cw > 4 && ch > 4 && (cw !== canvas.width || ch !== canvas.height)) {
      canvas.width = cw; canvas.height = ch;
      gl.viewport(0, 0, cw, ch);
      resizeFBOs(Math.round(cw * SIM_SCALE), Math.round(ch * SIM_SCALE));
      updateTitleTexture();
    }

    // 閳光偓閳光偓 sim pass 閳光偓閳光偓
    gl.bindFramebuffer(gl.FRAMEBUFFER, write.fb);
    gl.viewport(0, 0, simW, simH);
    gl.useProgram(simProg);
    bindQuad(simAPos);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.tex);
    gl.uniform1i(uSim.prev,      0);
    gl.uniform2f(uSim.res,       simW, simH);
    gl.uniform2f(uSim.mouse,     mx,   my);
    gl.uniform2f(uSim.lastMouse, lmx,  lmy);
    gl.uniform2f(uSim.velocity,  velX, velY);
    gl.uniform1f(uSim.viscosity, 9.0);
    gl.uniform1f(uSim.speed,     4.0);
    gl.uniform1f(uSim.size,      1.25);
    gl.uniform1i(uSim.frame,     frame);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const tmp = read; read = write; write = tmp;
    velX *= 0.88;
    velY *= 0.88;

    // 閳光偓閳光偓 render pass 閳光偓閳光偓
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(renderProg);
    bindQuad(renderAPos);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.tex);
    gl.uniform1i(uRender.ripple,  0);
    gl.uniform2f(uRender.simRes,  simW, simH);
    gl.uniform1f(uRender.scroll,  sp);
    gl.uniform1f(uRender.disp,    24.0);
    gl.uniform1f(uRender.light,   7.0);
    gl.uniform1f(uRender.shadow,  4.0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, titleTex);
    gl.uniform1i(uRender.title, 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    frame++;
  };
  animate();

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};


})();

