(() => {
  const section = document.querySelector(".services-scroll-story");
  const canvas = document.getElementById("services-time-canvas");
  if (!section || !canvas) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const resolutionScale = 0.5;
  let gl = null;
  let program = null;
  let buffer = null;
  let frameId = 0;
  let isVisible = false;
  let startTime = performance.now();
  let lastState = {
    progress: 0,
    tunnelProgress: 0,
    timeProgress: 0,
    cardProgress: 0,
    stationProgress: 0,
    outro: 0,
  };

  const vertexSource = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  const fragmentSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 wheel;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+wheel.y/1e3)
#define N normalize
#define S smoothstep
#define MN min(R.x,R.y)
#define LP vec3(-2,8,-2)
#define EDGESIZE 42e-4
#define hue(a) (.5+.5*sin(3.14*(a)+vec3(1,2,3)))
// Spline setup for camera path.
// Reference: https://www.shadertoy.com/view/4s3SRN
vec3 cp[14];
void initCam() {
	const float a=2.*.96, b=2.*a;
	cp[0] =vec3(0);
	cp[1] =vec3(0,0,b);
	cp[2] =vec3(a,0,b);
	cp[3] =vec3(a,0,a);
	cp[4] =vec3(a,-a*1.2,a);
	cp[5] =vec3(-a,-a,a);
	cp[6] =vec3(-a,0,a);
	cp[7] =vec3(-a,0,0);
	cp[8] =vec3(0);
	cp[9] =vec3(0,0,-b);
	cp[10]=vec3(0,a,-b);
	cp[11]=vec3(-a,a,-b);
	cp[12]=vec3(-a,0,-b);
	cp[13]=vec3(-a,0,0);
}
vec3 catmull(vec3 a, vec3 b, vec3 c, vec3 d, float t){
	return (((-a+b*3.-c*3.+d)*t*t*t + (a*2.- b*5.+c*4.-d)*t*t + (-a+c)*t + b*2.)*.5);
}
vec3 camPath(float t){
	const int n=14;
	const float k=float(n);
	t=fract(t/k)*k;
	float sn=floor(t), st=t-sn;
	if (sn==.0) return catmull(cp[n-1], cp[0], cp[1], cp[2], st);
	for (int i=1; i<n-2; i++) {
		if (sn==float(i)) return catmull(cp[i-1], cp[i], cp[i+1], cp[i+2], st);
	}
	if (sn==k-2.) return catmull(cp[n-3], cp[n-2], cp[n-1], cp[0], st);
	if (sn==k-1.) return catmull(cp[n-2], cp[n-1], cp[0], cp[1], st);
	return vec3(0);
}
float rnd(vec3 p) {
	p=fract(p*vec3(12.9898,78.233,156.345));
	p+=dot(p,p+34.56);
	return fract(p.x*p.y*p.z);
}
float smin(float a, float b, float k) {
	k*=log(2.);
	float x=b-a;
	return a+x/(1.-exp2(x/k));
}
float box(vec3 p, float s) {
	p=abs(p)-s;
	return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z));
}
#define ZERO (time*.0)
float map(vec3 p) {
	float e=length(vec2(fract(p.z)-.5,p.y-1.))-.1;
	p.xz=mod(p.xz+1.,2.)-1.;
	float d=box(p,1.), f=1.;
	for(float i=ZERO; i<5.; i++) {
		vec3 a=mod(p*f,2.)-1., r=abs(1.-3.*abs(a));
		f*=2.25;
		float
		da=max(r.x,r.y),
		db=max(r.y,r.z),
		dc=max(r.z,r.x);
		d=max(d,(min(da,min(db,dc))-1.)/f);
	}
	return smin(d,e,1e-2)+2e-3;
}
vec3 norm(vec3 p) {
	float h=1e-3; vec2 k=vec2(-1,1);
	return N(
		k.xyy*map(p+k.xyy*h)+
		k.yxy*map(p+k.yxy*h)+
		k.yyx*map(p+k.yyx*h)+
		k.xxx*map(p+k.xxx*h)
	);
}
bool march(inout vec3 p, vec3 rd, out float dd, out float edge, out float i) {
	bool near=false;
	// low quality on the outside
	float maxd=abs(p.y)>1.?130.:800.;
	for (; i++<maxd;) {
		float d=map(p);
		if (abs(d)<1e-3) return true;
		if (d>100.) return false;
		if (near && d>EDGESIZE) edge=1.;
		if (d<EDGESIZE) near=true;
		p+=rd*d*.5;
		dd*=d*.5;
	}
  return false;
}
float calcAO(vec3 p, vec3 n) {
	float occ=.0, sca=1.;
	for (float i=.0; i<5.; i++) {
		float
		h=.01+i*.05,
		d=map(p+h*n);
		occ+=(h-d)*sca;
		sca*=.95;
		if (occ>.35) break;
	}
	return clamp(1.-3.*occ,.0,1.);
}
float getao(vec3 p, vec3 n, float dist) {
	return clamp(map(p+n*dist)/dist,.0,1.);
}
vec3 dir(vec2 uv, vec3 ro, vec3 t, float z) {
	vec3 up=vec3(0,1,0),
	f=N(t-ro),
	r=N(cross(up,f)),
	u=cross(f,r),
	c=f*z,
	i=c+uv.x*r+uv.y*u,
	d=N(i);
	return d;
}
vec3 render(vec2 uv) {
	initCam();
	float speed=T*.25;
	vec3 col=vec3(0),
	p=camPath(-speed+.5), ro=p,
	ta=camPath(-speed),
	rd=dir(uv,p,ta,.6);
	float dd=1., i=0., edge=0.;
	if (march(p,rd,dd,edge,i)) {
		float x=mix(.8,1.,rnd(p)), lf=S(80.,30.,length(p.z));
		vec3 n=norm(p)*x, lp=vec3(LP.x,LP.y+lf,LP.z), l=N(lp-p);
		float ao=calcAO(p,n), amb=.8+.2*n.y, ld=distance(lp,p),
		ldd=distance(ro,p), dif=clamp(dot(l,n),.0,1.),
		atten=1./(1.+ldd*.5+ldd*ldd*.25);
		if (abs(p.y)<.992) {
			ao*=(n.y*.5+.55);
			col+=S(-.1,1.,amb*ao)+dif*ao*atten;
			col+=atten*pow(clamp(dot(N(ro-p),n),.0,1.),.8);
		} else col+=dif*ao;
		col+=clamp(dot(-rd,l),.0,1.)*ao*atten;
		col*=vec3(1,.65,.5)+.3*amb*ao*atten;
		col*=tanh(ao*ao);
		// outlines
		float fog=1.-clamp(dd/200.,.0,1.), eo=getao(p,n,EDGESIZE);;
		if(eo<.9) edge=max(edge,max(1.,fog));
		eo=getao(p,n,-EDGESIZE);
		if(eo<.9) edge=max(edge,max(1.,fog));
		float fres=pow(clamp(1.+dot(rd,n),.0,1.),5.);
		// dark
		col*=S(2.,.0,edge)*(1.-fres);
		// light
		vec3 dp=abs(p-ro);
    float ll=.3/tan(length(dp))+T;
		dp=(.5+.5*cos(.78*T-vec3(0,-2,3)*fract(ll)-.5));
		dp=p.y>1.01?vec3(1):.02/dp.bgg;
		col=mix(col,fres*dp,S(.5,3.,edge));
		// fog
		col=S(-.5,2.,col);
	}
	// shine
	float k=max(.3,1.-distance(LP,ro));
	col+=hue(k*k*1.57+1.5)*k*.6;
	// color grading
	float farFade=S(.0,18.,distance(p,ro));
	col=mix(col,vec3(.0,.012,.015),farFade*.72);
	col+=S(-1.,2.,clamp(i/300.,.0,1.))*k*vec3(.28,.55,.52);
	col=S(-.14,.82,col*1.08);
	col=tanh(col*col*col);
	col=sqrt(col);
	// vignette
	vec2 c=FC/R;
	c*=1.-c.yx;
	float vig=c.x*c.y*25.;
	vig=pow(vig,.25);
	col*=vig;
	col=mix(col,col*col,S(1.,-1.,clamp(vig,.0,1.)));
	return col*vec3(.62,.92,.9);
}
void main() {
	vec2 uv=(FC-.5*R)/MN;
	vec3 col=render(uv);
	O=vec4(col,1);
}`;

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || "Services time tunnel shader failed.";
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  };

  const createProgram = () => {
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    const nextProgram = gl.createProgram();
    gl.attachShader(nextProgram, vertexShader);
    gl.attachShader(nextProgram, fragmentShader);
    gl.linkProgram(nextProgram);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(nextProgram) || "Services time tunnel program failed.";
      gl.deleteProgram(nextProgram);
      throw new Error(message);
    }
    return nextProgram;
  };

  const resize = () => {
    if (!gl) return;
    const rect = canvas.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const cssWidth = rect.width || sectionRect.width || window.innerWidth || 1;
    const cssHeight = rect.height || Math.min(Math.max(sectionRect.height, window.innerHeight || 1), window.innerHeight || 1);
    const dpr = Math.max(1, resolutionScale * (window.devicePixelRatio || 1));
    const width = Math.max(1, Math.round(cssWidth * dpr));
    const height = Math.max(1, Math.round(cssHeight * dpr));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };

  const render = (now) => {
    if (!gl || !program) return;
    resize();
    const elapsed = (now - startTime) * 0.001;
    const wheelY = lastState.timeProgress * 1800 + lastState.stationProgress * 900 + lastState.progress * 650;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform1f(program.uniforms.time, elapsed);
    gl.uniform2f(program.uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(program.uniforms.wheel, 0, wheelY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const loop = (now) => {
    render(now);
    if (isVisible && lastState.timeProgress > 0.02 && !prefersReducedMotion) {
      frameId = window.requestAnimationFrame(loop);
    }
  };

  const start = () => {
    if (frameId || prefersReducedMotion || lastState.timeProgress <= 0.02) return;
    frameId = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!frameId) return;
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const setProgress = (state = {}) => {
    lastState = {
      progress: Math.min(1, Math.max(0, state.progress || 0)),
      tunnelProgress: Math.min(1, Math.max(0, state.tunnelProgress || 0)),
      timeProgress: Math.min(1, Math.max(0, state.timeProgress || 0)),
      cardProgress: Math.min(1, Math.max(0, state.cardProgress || 0)),
      stationProgress: Math.min(1, Math.max(0, state.stationProgress || 0)),
      outro: Math.min(1, Math.max(0, state.outro || 0)),
    };
    resize();
    if (isVisible && lastState.timeProgress > 0.02) start();
    else {
      stop();
      render(performance.now());
    }
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
      canvas.dataset.timeTunnelEngine = "webgl2-unavailable";
      return;
    }

    program = createProgram();
    program.uniforms = {
      time: gl.getUniformLocation(program, "time"),
      resolution: gl.getUniformLocation(program, "resolution"),
      wheel: gl.getUniformLocation(program, "wheel"),
    };

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    canvas.dataset.timeTunnelEngine = "webgl2-elevator-original";
    resize();
    render(performance.now());
    window.requestAnimationFrame(() => {
      resize();
      render(performance.now());
    });
  };

  try {
    init();
  } catch (error) {
    canvas.dataset.timeTunnelEngine = "webgl2-init-failed";
    console.error(error);
  }

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = Boolean(entry?.isIntersecting);
    if (isVisible) start();
    else stop();
  }, { threshold: 0.04 });
  observer.observe(section);

  window.LucianServicesTimeTunnel = {
    getEngine: () => canvas.dataset.timeTunnelEngine || null,
    refresh: () => {
      resize();
      render(performance.now());
    },
    setProgress,
    stop,
  };

  window.addEventListener("resize", () => {
    resize();
    render(performance.now());
  }, { passive: true });

  window.addEventListener("pagehide", () => {
    stop();
    observer.disconnect();
  }, { once: true });
})();
