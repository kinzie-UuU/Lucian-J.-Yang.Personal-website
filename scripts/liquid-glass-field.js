(() => {
  const THREE = window.THREE;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!THREE || reducedMotion) return;
  const stage = document.querySelector("#hero-stage");
  if (!stage) return;

  const initHeroFluidOrbit = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "liquid-glass-field";
    canvas.className = "liquid-glass-field";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);

    const glState = getWebGLContext(canvas);
    if (!glState) {
      canvas.remove();
      return false;
    }

    const { gl, ext, isWebGL2 } = glState;
    const config = {
      textureDownsample: 1,
      densityDissipation: 0.962,
      velocityDissipation: 0.986,
      pressureDissipation: 0.86,
      pressureIterations: 26,
      curl: 5,
      pointerRadius: 0.00165,
      orbitRadius: 0.0026,
      distortionPower: 0.105,
    };

    let textureWidth = 1;
    let textureHeight = 1;
    let density;
    let velocity;
    let divergence;
    let curl;
    let pressure;
    let imageTexture;
    let imageRatio = 1;
    let raf = 0;
    let lastTime = performance.now();
    let frame = 0;
    let disposed = false;
    let width = 1;
    let height = 1;

    const pointer = {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      seeded: false,
      energy: 0,
    };

    function getWebGLContext(target) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        premultipliedAlpha: false,
      };

      let context = target.getContext("webgl2", params);
      const hasWebGL2 = Boolean(context);
      if (!context) context = target.getContext("webgl", params) || target.getContext("experimental-webgl", params);
      if (!context) return null;

      let halfFloat = null;
      let linearFiltering = null;
      if (hasWebGL2) {
        context.getExtension("EXT_color_buffer_float");
        linearFiltering = context.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = context.getExtension("OES_texture_half_float");
        linearFiltering = context.getExtension("OES_texture_half_float_linear");
        if (!halfFloat) return null;
      }

      const halfFloatType = hasWebGL2 ? context.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      const formatRGBA = hasWebGL2
        ? getSupportedFormat(context, context.RGBA16F, context.RGBA, halfFloatType)
        : getSupportedFormat(context, context.RGBA, context.RGBA, halfFloatType);
      const formatRG = hasWebGL2
        ? getSupportedFormat(context, context.RG16F, context.RG, halfFloatType)
        : formatRGBA;
      const formatR = hasWebGL2
        ? getSupportedFormat(context, context.R16F, context.RED, halfFloatType)
        : formatRGBA;

      if (!formatRGBA || !formatRG || !formatR) return null;
      context.clearColor(0, 0, 0, 0);

      return {
        gl: context,
        isWebGL2: hasWebGL2,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatType,
          supportLinearFiltering: Boolean(linearFiltering),
        },
      };
    }

    function getSupportedFormat(context, internalFormat, format, type) {
      if (!supportRenderTextureFormat(context, internalFormat, format, type)) {
        if (isWebGL2 && internalFormat === context.R16F) {
          return getSupportedFormat(context, context.RG16F, context.RG, type);
        }
        if (isWebGL2 && internalFormat === context.RG16F) {
          return getSupportedFormat(context, context.RGBA16F, context.RGBA, type);
        }
        return null;
      }

      return { internalFormat, format };
    }

    function supportRenderTextureFormat(context, internalFormat, format, type) {
      const texture = context.createTexture();
      const fbo = context.createFramebuffer();
      context.bindTexture(context.TEXTURE_2D, texture);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
      context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
      context.texImage2D(context.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      context.bindFramebuffer(context.FRAMEBUFFER, fbo);
      context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, texture, 0);
      const status = context.checkFramebufferStatus(context.FRAMEBUFFER);
      context.deleteTexture(texture);
      context.deleteFramebuffer(fbo);
      return status === context.FRAMEBUFFER_COMPLETE;
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(error || "Liquid shader compile failed.");
      }
      return shader;
    };

    class GLProgram {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.bindAttribLocation(this.program, 0, "aPosition");
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(this.program) || "Liquid program link failed.");
        }

        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i += 1) {
          const name = gl.getActiveUniform(this.program, i).name;
          this.uniforms[name] = gl.getUniformLocation(this.program, name);
        }
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    const clearShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `);

    const displayShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uOutput;
      uniform sampler2D uVelocity;
      uniform sampler2D uImage;
      uniform float ratio;
      uniform float imageRatio;
      uniform float disturbPower;
      uniform float opacity;

      vec2 imageUv () {
        vec2 uv = vUv - 0.5;
        if (ratio > imageRatio) {
          uv.x *= ratio / imageRatio;
        } else {
          uv.y *= imageRatio / ratio;
        }
        return uv + 0.5;
      }

      vec4 sampleImage(vec2 uv, vec2 direction, float offset) {
        vec2 chroma = direction * offset * disturbPower * 0.08;
        float r = texture2D(uImage, uv + chroma).r;
        float g = texture2D(uImage, uv).g;
        float b = texture2D(uImage, uv - chroma).b;
        float a = texture2D(uImage, uv).a;
        return vec4(r, g, b, a);
      }

      void main () {
        float offset = texture2D(uOutput, vUv).r;
        vec2 velocity = texture2D(uVelocity, vUv).xy + vec2(0.0001);
        vec2 direction = normalize(velocity);
        vec2 uv = imageUv();
        uv -= direction * offset * disturbPower;

        vec4 image = sampleImage(uv, direction, offset);
        float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
        float flow = smoothstep(0.010, 0.22, offset);
        float membrane = smoothstep(0.001, 0.18, image.a) * (0.68 + flow * 0.32);
        gl_FragColor = vec4(image.rgb, image.a * membrane * inside * opacity);
      }
    `);

    const splatShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
      }
    `);

    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      vec2 sampleVelocity (in vec2 uv) {
        vec2 multiplier = vec2(1.0);
        if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
        if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
        if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
        if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
        return multiplier * texture2D(uVelocity, uv).xy;
      }

      void main () {
        float L = sampleVelocity(vL).x;
        float R = sampleVelocity(vR).x;
        float T = sampleVelocity(vT).y;
        float B = sampleVelocity(vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

    const curlShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
      }
    `);

    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
        force *= 1.0 / length(force + 0.00001) * curl * C;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `);

    const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      vec2 boundary (in vec2 uv) {
        return min(max(uv, 0.0), 1.0);
      }

      void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + T + B - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `);

    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      vec2 boundary (in vec2 uv) {
        return min(max(uv, 0.0), 1.0);
      }

      void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    const clearProgram = new GLProgram(baseVertexShader, clearShader);
    const displayProgram = new GLProgram(baseVertexShader, displayShader);
    const splatProgram = new GLProgram(baseVertexShader, splatShader);
    const advectionProgram = new GLProgram(baseVertexShader, advectionShader);
    const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    const curlProgram = new GLProgram(baseVertexShader, curlShader);
    const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    const gradientSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (destination) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    const createFBO = (texId, fboWidth, fboHeight, internalFormat, format, type, param) => {
      gl.activeTexture(gl.TEXTURE0 + texId);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, fboWidth, fboHeight, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, fboWidth, fboHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { texture, fbo, texId, width: fboWidth, height: fboHeight };
    };

    const createDoubleFBO = (texId, fboWidth, fboHeight, internalFormat, format, type, param) => {
      let fboA = createFBO(texId, fboWidth, fboHeight, internalFormat, format, type, param);
      let fboB = createFBO(texId + 1, fboWidth, fboHeight, internalFormat, format, type, param);

      return {
        get read() {
          return fboA;
        },
        get write() {
          return fboB;
        },
        swap() {
          const temp = fboA;
          fboA = fboB;
          fboB = temp;
        },
      };
    };

    const initFramebuffers = () => {
      textureWidth = Math.max(2, gl.drawingBufferWidth >> config.textureDownsample);
      textureHeight = Math.max(2, gl.drawingBufferHeight >> config.textureDownsample);
      const texType = ext.halfFloatType;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      density = createDoubleFBO(2, textureWidth, textureHeight, ext.formatRGBA.internalFormat, ext.formatRGBA.format, texType, filtering);
      velocity = createDoubleFBO(0, textureWidth, textureHeight, ext.formatRG.internalFormat, ext.formatRG.format, texType, filtering);
      divergence = createFBO(4, textureWidth, textureHeight, ext.formatR.internalFormat, ext.formatR.format, texType, gl.NEAREST);
      curl = createFBO(5, textureWidth, textureHeight, ext.formatR.internalFormat, ext.formatR.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(6, textureWidth, textureHeight, ext.formatR.internalFormat, ext.formatR.format, texType, gl.NEAREST);
    };

    const uploadLiquidImageTexture = () => {
      if (!imageTexture) imageTexture = gl.createTexture();

      const ratio = width / Math.max(height, 1);
      const textureWidthCanvas = 1024;
      const textureHeightCanvas = Math.max(512, Math.round(textureWidthCanvas / Math.max(ratio, 0.1)));
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = textureWidthCanvas;
      textureCanvas.height = textureHeightCanvas;
      const ctx = textureCanvas.getContext("2d");
      const cx = textureWidthCanvas * 0.50;
      const cy = textureHeightCanvas * 0.50;
      const rx = textureWidthCanvas * 0.42;
      const ry = textureHeightCanvas * 0.48;

      ctx.clearRect(0, 0, textureWidthCanvas, textureHeightCanvas);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.fillStyle = "rgba(236, 238, 235, 0.018)";
      ctx.fillRect(0, 0, textureWidthCanvas, textureHeightCanvas);

      const wash = ctx.createLinearGradient(0, 0, textureWidthCanvas, textureHeightCanvas);
      wash.addColorStop(0, "rgba(246, 248, 244, 0.070)");
      wash.addColorStop(0.28, "rgba(210, 214, 210, 0.036)");
      wash.addColorStop(0.55, "rgba(255, 244, 232, 0.030)");
      wash.addColorStop(0.78, "rgba(216, 220, 216, 0.040)");
      wash.addColorStop(1, "rgba(250, 252, 248, 0.066)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, textureWidthCanvas, textureHeightCanvas);

      const film = ctx.createRadialGradient(
        textureWidthCanvas * 0.52,
        textureHeightCanvas * 0.48,
        textureHeightCanvas * 0.10,
        textureWidthCanvas * 0.52,
        textureHeightCanvas * 0.48,
        textureWidthCanvas * 0.72
      );
      film.addColorStop(0, "rgba(250, 252, 248, 0.092)");
      film.addColorStop(0.46, "rgba(222, 224, 220, 0.050)");
      film.addColorStop(1, "rgba(138, 136, 128, 0.026)");
      ctx.fillStyle = film;
      ctx.fillRect(0, 0, textureWidthCanvas, textureHeightCanvas);
      ctx.globalCompositeOperation = "lighter";

      const strokeEllipse = ({ rotation = 0, width: strokeWidth, color, blur = 0, start = 0, end = Math.PI * 2, x = 0, y = 0, scaleX = 1, scaleY = 1 }) => {
        ctx.save();
        ctx.translate(cx + x, cy + y);
        ctx.rotate(rotation);
        ctx.filter = blur ? `blur(${blur}px)` : "none";
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * scaleX, ry * scaleY, 0, start, end);
        ctx.stroke();
        ctx.restore();
      };

      const strokeCurve = ({ points, width: strokeWidth, color, blur = 0 }) => {
        ctx.save();
        ctx.filter = blur ? `blur(${blur}px)` : "none";
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.moveTo(points[0][0] * textureWidthCanvas, points[0][1] * textureHeightCanvas);
        for (let i = 1; i < points.length; i += 3) {
          ctx.bezierCurveTo(
            points[i][0] * textureWidthCanvas,
            points[i][1] * textureHeightCanvas,
            points[i + 1][0] * textureWidthCanvas,
            points[i + 1][1] * textureHeightCanvas,
            points[i + 2][0] * textureWidthCanvas,
            points[i + 2][1] * textureHeightCanvas
          );
        }
        ctx.stroke();
        ctx.restore();
      };

      strokeCurve({
        width: 36,
        blur: 18,
        color: "rgba(236, 240, 236, 0.18)",
        points: [[-0.08, 0.26], [0.18, 0.10], [0.46, 0.05], [0.72, 0.18], [0.98, 0.30], [1.10, 0.58], [0.82, 0.86]],
      });
      strokeCurve({
        width: 34,
        blur: 16,
        color: "rgba(250, 252, 248, 0.14)",
        points: [[-0.10, 0.03], [0.16, 0.20], [0.34, 0.28], [0.52, 0.20], [0.74, 0.10], [0.90, 0.18], [1.12, 0.36]],
      });
      strokeCurve({
        width: 26,
        blur: 12,
        color: "rgba(255, 238, 224, 0.14)",
        points: [[1.08, 0.12], [0.86, 0.34], [0.86, 0.56], [0.68, 0.78], [0.50, 1.02], [0.20, 0.92], [-0.06, 0.72]],
      });
      strokeCurve({
        width: 16,
        blur: 6,
        color: "rgba(252, 254, 250, 0.24)",
        points: [[0.00, 0.62], [0.22, 0.48], [0.40, 0.42], [0.58, 0.50], [0.76, 0.60], [0.92, 0.38], [1.05, 0.24]],
      });
      strokeCurve({
        width: 10,
        blur: 3,
        color: "rgba(238, 242, 238, 0.22)",
        points: [[0.06, 0.18], [0.24, 0.30], [0.38, 0.22], [0.54, 0.15], [0.74, 0.08], [0.88, 0.18], [1.02, 0.42]],
      });
      strokeCurve({
        width: 9,
        blur: 4,
        color: "rgba(255, 244, 232, 0.13)",
        points: [[-0.06, 0.84], [0.16, 0.72], [0.30, 0.86], [0.46, 0.78], [0.62, 0.70], [0.80, 0.82], [1.06, 0.72]],
      });
      strokeCurve({
        width: 18,
        blur: 9,
        color: "rgba(236, 240, 236, 0.14)",
        points: [[0.12, -0.08], [0.04, 0.18], [0.14, 0.34], [0.30, 0.48], [0.46, 0.62], [0.44, 0.84], [0.24, 1.08]],
      });
      strokeCurve({
        width: 22,
        blur: 11,
        color: "rgba(218, 222, 218, 0.13)",
        points: [[0.92, -0.06], [0.72, 0.18], [0.80, 0.36], [0.96, 0.50], [1.12, 0.66], [0.86, 0.86], [0.70, 1.06]],
      });
      strokeEllipse({ rotation: 0.02, width: 24, color: "rgba(230, 234, 230, 0.16)", blur: 10, start: -3.20, end: 0.12, scaleX: 0.92, scaleY: 0.84 });
      strokeEllipse({ rotation: 0.18, width: 18, color: "rgba(255, 238, 224, 0.13)", blur: 8, start: -0.30, end: 2.15, scaleX: 0.78, scaleY: 0.90 });
      strokeEllipse({ rotation: -0.42, width: 16, color: "rgba(238, 242, 238, 0.12)", blur: 8, start: 1.80, end: 5.42, x: -textureWidthCanvas * 0.34, y: -textureHeightCanvas * 0.22, scaleX: 0.82, scaleY: 0.50 });
      strokeEllipse({ rotation: 0.50, width: 18, color: "rgba(255, 244, 232, 0.10)", blur: 9, start: -1.28, end: 2.80, x: textureWidthCanvas * 0.34, y: textureHeightCanvas * 0.24, scaleX: 0.88, scaleY: 0.54 });

      imageRatio = textureCanvas.width / textureCanvas.height;
      gl.activeTexture(gl.TEXTURE8);
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    };

    const resize = () => {
      width = Math.max(1, Math.round(window.innerWidth || document.documentElement.clientWidth || 1));
      height = Math.max(1, Math.round(window.innerHeight || document.documentElement.clientHeight || 1));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const nextWidth = Math.max(1, Math.floor(width * dpr));
      const nextHeight = Math.max(1, Math.floor(height * dpr));

      if (canvas.width === nextWidth && canvas.height === nextHeight) return;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      initFramebuffers();
      uploadLiquidImageTexture();
    };

    const splat = (x, y, dx, dy, intensity, radius = config.pointerRadius) => {
      const px = x * (canvas.width / Math.max(width, 1));
      const py = y * (canvas.height / Math.max(height, 1));
      const aspect = canvas.width / Math.max(canvas.height, 1);

      gl.viewport(0, 0, textureWidth, textureHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.texId);
      gl.uniform1f(splatProgram.uniforms.aspectRatio, aspect);
      gl.uniform2f(splatProgram.uniforms.point, px / canvas.width, 1 - py / canvas.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, radius);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.texId);
      gl.uniform3f(splatProgram.uniforms.color, intensity, 0, 0);
      gl.uniform1f(splatProgram.uniforms.radius, radius * 1.35);
      blit(density.write.fbo);
      density.swap();
    };

    const seedOrbit = (time) => {
      const compact = width < 760;
      const speed = compact ? 1.18 : 1.38;
      const edge = compact ? 0.04 : 0.025;
      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const routes = [
        { cx: 0.18, cy: 0.18, rx: 0.30, ry: 0.20, skew: 0.08, phase: 0.00, rate: 0.34, radius: 0.86, energy: 0.040 },
        { cx: 0.78, cy: 0.20, rx: 0.28, ry: 0.24, skew: -0.10, phase: 1.42, rate: -0.38, radius: 0.82, energy: 0.038 },
        { cx: 0.24, cy: 0.72, rx: 0.34, ry: 0.22, skew: -0.06, phase: 2.68, rate: -0.32, radius: 0.90, energy: 0.042 },
        { cx: 0.76, cy: 0.76, rx: 0.30, ry: 0.22, skew: 0.10, phase: 3.72, rate: 0.36, radius: 0.90, energy: 0.043 },
        { cx: 0.50, cy: 0.46, rx: 0.50, ry: 0.36, skew: 0.04, phase: 4.60, rate: 0.26, radius: 1.04, energy: 0.035 },
        { cx: 0.50, cy: 0.10, rx: 0.46, ry: 0.16, skew: 0.12, phase: 5.30, rate: -0.30, radius: 0.80, energy: 0.033 },
        { cx: 0.50, cy: 0.90, rx: 0.46, ry: 0.15, skew: -0.12, phase: 0.84, rate: 0.28, radius: 0.84, energy: 0.034 },
      ];

      const activeRoutes = compact ? routes.slice(0, 5) : routes;
      activeRoutes.forEach((route, index) => {
        const phase = time * route.rate + route.phase + Math.sin(time * 0.11 + index) * 0.22;
        const cos = Math.cos(phase);
        const sin = Math.sin(phase);
        const rx = width * route.rx;
        const ry = height * route.ry;
        const x = clamp(width * route.cx + cos * rx + sin * height * route.skew, width * edge, width * (1 - edge));
        const y = clamp(height * route.cy + sin * ry + Math.cos(phase * 0.62 + index) * height * 0.055, height * edge, height * (1 - edge));
        const dx = (-sin * rx + cos * height * route.skew) * speed;
        const dy = cos * ry * speed;
        const intensity = route.energy + Math.sin(phase + index * 0.4) * 0.007;
        splat(x, y, dx, dy, intensity, config.orbitRadius * route.radius);
      });

      if (frame % 9 === 0) {
        const phase = -time * 0.24 + 1.4;
        const x = width * (0.50 + Math.sin(phase * 0.73) * 0.46);
        const y = height * (0.50 + Math.cos(phase) * 0.42);
        splat(
          clamp(x, width * edge, width * (1 - edge)),
          clamp(y, height * edge, height * (1 - edge)),
          Math.cos(phase * 1.2) * width * 0.68,
          -Math.sin(phase) * height * 0.58,
          0.030,
          config.orbitRadius * 1.28
        );
      }
    };

    const updatePointer = (event) => {
      if (event.pointerType === "touch") return;
      if (
        event.clientX < 0 ||
        event.clientX > width ||
        event.clientY < 0 ||
        event.clientY > height
      ) {
        pointer.energy *= 0.86;
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      if (!pointer.seeded) {
        pointer.x = x;
        pointer.y = y;
        pointer.lastX = x;
        pointer.lastY = y;
        pointer.seeded = true;
        return;
      }

      const dx = (x - pointer.x) * 5.2;
      const dy = (y - pointer.y) * 5.2;
      const speed = Math.hypot(dx, dy);
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.energy = Math.min(1, pointer.energy + speed / 4100);
      if (speed > 0.8) {
        splat(x, y, dx, dy, 0.052, config.pointerRadius);
      }
    };

    const step = (dt, time) => {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, textureWidth, textureHeight);

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.texId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read.texId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.velocityDissipation);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.texId);
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.texId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt * 8);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.densityDissipation);
      blit(density.write.fbo);
      density.swap();

      seedOrbit(time);

      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.texId);
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.texId);
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.texId);
      gl.uniform1f(vorticityProgram.uniforms.curl, config.curl);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.texId);
      blit(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.texId);
      gl.uniform1f(clearProgram.uniforms.value, config.pressureDissipation);
      blit(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.texId);
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.texId);
      for (let i = 0; i < config.pressureIterations; i += 1) {
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gradientSubtractProgram.bind();
      gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.texId);
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.texId);
      blit(velocity.write.fbo);
      velocity.swap();
    };

    const render = () => {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      displayProgram.bind();
      gl.uniform1i(displayProgram.uniforms.uOutput, density.read.texId);
      gl.uniform1i(displayProgram.uniforms.uVelocity, velocity.read.texId);
      gl.activeTexture(gl.TEXTURE8);
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.uniform1i(displayProgram.uniforms.uImage, 8);
      gl.uniform1f(displayProgram.uniforms.ratio, canvas.width / Math.max(canvas.height, 1));
      gl.uniform1f(displayProgram.uniforms.imageRatio, imageRatio);
      gl.uniform1f(displayProgram.uniforms.disturbPower, config.distortionPower);
      gl.uniform1f(displayProgram.uniforms.opacity, 0.70);
      blit(null);
    };

    const animate = (time) => {
      if (disposed) return;
      raf = window.requestAnimationFrame(animate);
      resize();

      const dt = Math.min(0.016, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      pointer.energy *= Math.pow(0.86, dt * 60);
      frame += 1;
      step(dt, time * 0.001);
      render();
      document.body.classList.toggle("liquid-glass-moving", pointer.energy > 0.025);
    };

    try {
      resize();
      for (let i = 0; i < 24; i += 1) seedOrbit(i * 0.14);
    } catch (error) {
      console.warn("Liquid fluid field unavailable:", error);
      canvas.remove();
      return false;
    }

    document.body.classList.add("liquid-glass-ready");
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    raf = window.requestAnimationFrame(animate);

    const cleanup = () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      canvas.remove();
      document.body.classList.remove("liquid-glass-ready", "liquid-glass-moving");
    };
    window.addEventListener("pagehide", cleanup, { once: true });

    window.LucianLiquidField = {
      mode: "fluid-orbit",
      source: "output-texture-distortion",
      coverage: "global-viewport",
    };

    return true;
  };

  initHeroFluidOrbit();
})();
