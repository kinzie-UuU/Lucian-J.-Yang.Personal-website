(() => {
  const heroRipplesRuntime = window.LucianRuntime?.heroRipples;
  if (!heroRipplesRuntime) return;

  // Hero stage click ripple effect
  const heroRipples = [];

  const createHeroRipple = (clientX, clientY, isClick = false) => {
    if (!heroRipplesRuntime.stage || heroRipplesRuntime.reducedMotion) return;
    const rect = heroRipplesRuntime.stage.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const startedAt = performance.now();

    heroRipples.push({
      x,
      y,
      startedAt,
      duration: isClick ? 1800 : 900,
      maxRadius: Math.min(rect.width, rect.height) * (isClick ? 0.18 : 0.06),
      isClick,
      // organic variation seed per ripple
      seed: Math.random() * Math.PI * 2,
    });

    if (heroRipples.length > 3) heroRipples.shift();
    if (isClick) heroRipplesRuntime.playWaterDrop();
  };

  heroRipplesRuntime.stage?.addEventListener("click", (event) => {
    if (!document.body.classList.contains("has-entered")) return;
    createHeroRipple(event.clientX, event.clientY, true);
  });

  // Mouse movement ripple effect (throttled)
  let lastRippleTime = 0;
  const RIPPLE_THROTTLE = 300;

  heroRipplesRuntime.stage?.addEventListener("pointermove", (event) => {
    if (!document.body.classList.contains("has-entered")) return;

    const now = performance.now();
    if (now - lastRippleTime < RIPPLE_THROTTLE) return;

    lastRippleTime = now;
    createHeroRipple(event.clientX, event.clientY);
  });

  // Ripple rendering on hero-kinetic-canvas overlay
  const renderHeroRipples = () => {
    const canvas = document.getElementById("hero-ripple-canvas");
    if (!canvas || !heroRipplesRuntime.stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = heroRipplesRuntime.stage.getBoundingClientRect();
    const pr = Math.min(window.devicePixelRatio, 2);

    if (canvas.width !== rect.width * pr || canvas.height !== rect.height * pr) {
      canvas.width = rect.width * pr;
      canvas.height = rect.height * pr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(pr, pr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const now = performance.now();
    for (let i = heroRipples.length - 1; i >= 0; i--) {
      const ripple = heroRipples[i];
      const elapsed = now - ripple.startedAt;
      const progress = Math.min(elapsed / ripple.duration, 1);

      if (progress >= 1) {
        heroRipples.splice(i, 1);
        continue;
      }

      const eased = 1 - (1 - progress) ** 2;
      const radius = ripple.maxRadius * eased;
      const opacity = (1 - progress) * (ripple.isClick ? 0.5 : 0.35);

      // Ultra-soft organic ripple: draw as continuous wavy path
      ctx.save();
      ctx.shadowBlur = 16;
      ctx.shadowColor = `rgba(153, 242, 230, ${opacity * 0.4})`;

      const segments = 24; // more segments = smoother wave
      const angleStep = (Math.PI * 2) / segments;

      // outer wave ring
      ctx.beginPath();
      for (let j = 0; j <= segments; j++) {
        const angle = j * angleStep + ripple.seed;
        // layered wave: multiple frequencies for natural irregularity
        const wave1 = Math.sin(angle * 3 + ripple.seed * 2) * 0.06;
        const wave2 = Math.sin(angle * 5 - ripple.seed) * 0.03;
        const wave3 = Math.sin(angle * 7 + progress * Math.PI * 2) * 0.02;
        const r = radius * (1 + wave1 + wave2 + wave3);
        const px = ripple.x + Math.cos(angle) * r;
        const py = ripple.y + Math.sin(angle) * r;
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      // gradient stroke: fade from center to edge
      const grad = ctx.createRadialGradient(ripple.x, ripple.y, radius * 0.8, ripple.x, ripple.y, radius * 1.1);
      grad.addColorStop(0, `rgba(200, 245, 237, 0)`);
      grad.addColorStop(0.5, `rgba(200, 245, 237, ${opacity * 0.7})`);
      grad.addColorStop(1, `rgba(200, 245, 237, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = ripple.isClick ? 1.8 : 1.0;
      ctx.stroke();

      ctx.restore();

      // Inner ring (only for click ripples, softer)
      if (ripple.isClick && progress < 0.6) {
        const innerRadius = radius * 0.5;
        const innerOpacity = (1 - progress / 0.6) * 0.25;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(153, 242, 230, ${innerOpacity * 0.4})`;

        // inner wave ring (same organic style as outer)
        ctx.beginPath();
        const innerSegs = 20;
        const innerStep = (Math.PI * 2) / innerSegs;
        for (let k = 0; k <= innerSegs; k++) {
          const angle = k * innerStep + ripple.seed * 1.5;
          const wave1 = Math.sin(angle * 4 - ripple.seed) * 0.05;
          const wave2 = Math.sin(angle * 6 + progress * Math.PI) * 0.025;
          const r = innerRadius * (1 + wave1 + wave2);
          const px = ripple.x + Math.cos(angle) * r;
          const py = ripple.y + Math.sin(angle) * r;
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();

        const innerGrad = ctx.createRadialGradient(
          ripple.x, ripple.y, innerRadius * 0.75,
          ripple.x, ripple.y, innerRadius * 1.1
        );
        innerGrad.addColorStop(0, `rgba(173, 235, 224, 0)`);
        innerGrad.addColorStop(0.5, `rgba(173, 235, 224, ${innerOpacity * 0.9})`);
        innerGrad.addColorStop(1, `rgba(173, 235, 224, 0)`);
        ctx.strokeStyle = innerGrad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }
    }

    requestAnimationFrame(renderHeroRipples);
  };

  if (heroRipplesRuntime.stage && !heroRipplesRuntime.reducedMotion) {
    requestAnimationFrame(renderHeroRipples);
  }
})();
