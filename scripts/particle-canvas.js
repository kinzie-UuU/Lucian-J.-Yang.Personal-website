(() => {
  const initParticleCanvas = (canvas, mode = "light") => {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const particles = [];
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      particles.length = 0;
      const count = mode === "dark-iridescent" ? 78 : 56;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * (mode === "dark-iridescent" ? 0.18 : 0.22),
          vy: (Math.random() - 0.5) * (mode === "dark-iridescent" ? 0.18 : 0.22),
          r: Math.random() * (mode === "dark-iridescent" ? 2.8 : 2.2) + 1,
          hue: Math.random() * 360,
        });
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((particle) => {
        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy) || 1;
          const threshold = mode === "dark-iridescent" ? 220 : 180;
          if (distance < threshold) {
            const force = mode === "dark-iridescent" ? 0.018 : 0.012;
            particle.vx -= (dx / distance) * force;
            particle.vy -= (dy / distance) * force;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= mode === "dark-iridescent" ? 0.982 : 0.985;
        particle.vy *= mode === "dark-iridescent" ? 0.982 : 0.985;

        if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
        particle.x = Math.max(0, Math.min(rect.width, particle.x));
        particle.y = Math.max(0, Math.min(rect.height, particle.y));

        context.beginPath();
        if (mode === "dark-iridescent") {
          const alpha = 0.2 + Math.abs(Math.sin((particle.x + particle.y) * 0.004)) * 0.18;
          context.fillStyle = `hsla(${particle.hue}, 70%, 68%, ${alpha})`;
        } else if (mode === "dark") {
          context.fillStyle = "rgba(255,255,255,0.10)";
        } else {
          context.fillStyle = "rgba(255,255,255,0.62)";
        }
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();

        if (mode === "dark-iridescent") {
          context.beginPath();
          context.fillStyle = "rgba(8, 8, 10, 0.84)";
          context.arc(particle.x, particle.y, particle.r * 0.52, 0, Math.PI * 2);
          context.fill();
        }
      });

      window.requestAnimationFrame(render);
    };

    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });

    canvas.addEventListener("pointerleave", () => {
      pointer.active = false;
    });

    window.addEventListener("resize", resize);
    resize();
    window.requestAnimationFrame(render);
  };

  window.initParticleCanvas = initParticleCanvas;
})();
