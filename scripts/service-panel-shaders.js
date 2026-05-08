(() => {
  const initServicePanelShaders = (panels) => {
    if (!panels?.length || window.LucianRuntime?.reducedMotion) return null;

    const palettes = [
      [[0.18, 0.18, 0.2], [0.92, 0.34, 0.18], [1.0, 0.78, 0.32]],
      [[0.22, 0.08, 0.08], [0.95, 0.22, 0.18], [1.0, 0.64, 0.42]],
      [[0.28, 0.24, 0.2], [0.72, 0.48, 0.22], [0.9, 0.76, 0.46]],
      [[0.08, 0.16, 0.14], [0.2, 0.62, 0.45], [0.74, 1.0, 0.7]],
      [[0.48, 0.32, 0.16], [1.0, 0.62, 0.24], [1.0, 0.88, 0.52]],
      [[0.1, 0.1, 0.16], [0.42, 0.24, 0.95], [0.9, 0.58, 1.0]],
    ];

    const vertexSource = `#version 300 es
      precision highp float;
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `#version 300 es
      precision highp float;
      out vec4 O;
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 colorLow;
      uniform vec3 colorMid;
      uniform vec3 colorHigh;
      #define FC gl_FragCoord.xy
      #define R resolution
      #define T time
      #define S smoothstep

      float rnd(vec2 p) {
        p = fract(p * vec2(12.9898, 78.233));
        p += dot(p, p + 34.56);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 u = S(i, i + 1.0, p);
        vec2 k = vec2(1.0, 0.0);
        float a = rnd(i);
        float b = rnd(i + k);
        float c = rnd(i + k.yx);
        float d = rnd(i + k.xx);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float snoise(vec3 p) {
        float t = T * 0.5;
        for (int i = 0; i < 3; i++) {
          p += cos(p.zyx * 3.0 + vec3(0.0, t, 1.6)) / 3.0;
          p += sin(p.zyx + t + vec3(t, 1.6, 0.0)) / 2.0;
          p += sin(p.zyx + t * 2.0 + vec3(0.0, 1.6, t)) / 6.0;
          p *= 1.75;
        }
        p += fract(sin(p + vec3(13.0, 7.0, 3.0)) * 5e5) * 0.04;
        return fract(noise(p.xy) * noise(p.yz));
      }

      vec2 layeredNoise(vec3 p) {
        return vec2(snoise(p - sin(T * 0.1)), snoise(p * 4.0));
      }

      void main() {
        vec2 uv = FC / R;
        vec2 flowUv = vec2(uv.x * 1.16, uv.y * 0.92);
        vec2 cn = layeredNoise(flowUv.xyx + vec3(T * 0.015, -T * 0.018, T * 0.01));
        vec3 col = vec3(0.0);
        col = mix(col, colorLow, cn.x);
        col = mix(col, mix(colorMid, colorHigh, cn.y), cn.y);
        col = S(0.0, 1.0, col);
        col = tanh(col * col * col);
        col = sqrt(max(col, vec3(0.0)));

        vec2 c = FC / R;
        c *= 1.0 - c.yx;
        float vig = c.x * c.y * 25.0;
        vig = pow(max(vig, 0.0), 0.42);
        float grain = rnd(FC + T * 92.0) - 0.5;
        col = col * vig * 0.74 + grain * 0.014;
        O = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    const compile = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const renderers = panels.map((panel, index) => {
      const canvas = document.createElement("canvas");
      canvas.className = "service-panel-shader";
      canvas.setAttribute("aria-hidden", "true");
      panel.prepend(canvas);

      const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
      if (!gl) return null;

      const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
      if (!vertex || !fragment) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn(gl.getProgramInfoLog(program));
        return null;
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const palette = palettes[index % palettes.length];
      return {
        canvas,
        gl,
        program,
        buffer,
        resolution: gl.getUniformLocation(program, "resolution"),
        time: gl.getUniformLocation(program, "time"),
        colorLow: gl.getUniformLocation(program, "colorLow"),
        colorMid: gl.getUniformLocation(program, "colorMid"),
        colorHigh: gl.getUniformLocation(program, "colorHigh"),
        palette,
      };
    }).filter(Boolean);

    if (!renderers.length) return null;

    const resize = () => {
      renderers.forEach(({ canvas, gl }) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      });
    };

    let raf = 0;
    const render = (now) => {
      resize();
      renderers.forEach((item, index) => {
        const { canvas, gl, program, resolution, time, colorLow, colorMid, colorHigh, palette } = item;
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, item.buffer);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform1f(time, now * 0.001 + index * 12.5);
        gl.uniform3fv(colorLow, palette[0]);
        gl.uniform3fv(colorMid, palette[1]);
        gl.uniform3fv(colorHigh, palette[2]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      });
      raf = requestAnimationFrame(render);
    };

    resize();
    raf = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return {
      destroy() {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        renderers.forEach(({ canvas, gl, program, buffer }) => {
          gl.deleteBuffer(buffer);
          gl.deleteProgram(program);
          canvas.remove();
        });
      },
    };
  };

  window.initServicePanelShaders = initServicePanelShaders;
})();
