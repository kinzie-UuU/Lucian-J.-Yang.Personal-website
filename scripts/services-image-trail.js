(() => {
  const initServicesImageTrail = () => {
    const stage = document.querySelector(".services-scroll-story .services-sticky");
    const layer = stage?.querySelector(".services-image-trail");
    const entryCard = stage?.querySelector(".services-entry-card");
    const images = Array.from(layer?.querySelectorAll(".content__img") || []);
    if (!stage || !layer || !images.length || window.LucianRuntime?.reducedMotion) return;

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const threshold = 74;
    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cacheMousePos = { x: 0, y: 0 };
    let imageIndex = -1;
    let zIndex = 1;
    let raf = 0;
    let hasStarted = false;
    let idleFrames = 0;

    const getLocalPos = (event) => {
      const rect = stage.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const isInsideEntryCard = (event) => {
      if (!entryCard) return false;
      const rect = entryCard.getBoundingClientRect();
      const gutter = 18;
      return (
        event.clientX >= rect.left - gutter &&
        event.clientX <= rect.right + gutter &&
        event.clientY >= rect.top - gutter &&
        event.clientY <= rect.bottom + gutter
      );
    };

    const stageInView = () => {
      const rect = stage.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const showNextImage = () => {
      imageIndex = (imageIndex + 1) % images.length;
      zIndex = zIndex > 80 ? 2 : zIndex + 1;

      const image = images[imageIndex];
      const inner = image.querySelector(".content__img-inner");
      const rect = image.getBoundingClientRect();
      const width = rect.width || 160;
      const height = rect.height || 144;
      const dx = mousePos.x - cacheMousePos.x;
      const dy = mousePos.y - cacheMousePos.y;
      const rotation = clamp(dx * 0.045, -9, 9);
      const driftX = clamp(dx * 0.64, -84, 84);
      const driftY = clamp(dy * 0.64, -84, 84);
      const startX = cacheMousePos.x - width / 2;
      const startY = cacheMousePos.y - height / 2;
      const endX = mousePos.x - width / 2;
      const endY = mousePos.y - height / 2;

      window.clearTimeout(image._trailFadeTimer);
      window.clearTimeout(image._trailDoneTimer);
      image.style.transition = "none";
      image.style.zIndex = String(zIndex);
      image.style.opacity = "0.88";
      image.style.filter = "blur(8px) saturate(0.7) brightness(0.72)";
      image.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(0.62) rotate(${rotation - 5}deg)`;
      if (inner) {
        inner.style.transition = "none";
        inner.style.transform = "scale(1.2)";
        inner.style.filter = "brightness(1.24) contrast(1.08)";
      }

      window.requestAnimationFrame(() => {
        image.style.transition = "transform 560ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease, filter 520ms ease";
        image.style.opacity = "0.84";
        image.style.filter = "blur(0) saturate(0.94) brightness(0.92)";
        image.style.transform = `translate3d(${endX}px, ${endY}px, 0) scale(1) rotate(${rotation}deg)`;
        if (inner) {
          inner.style.transition = "transform 560ms cubic-bezier(0.16, 1, 0.3, 1), filter 520ms ease";
          inner.style.transform = "scale(1.04)";
          inner.style.filter = "brightness(1) contrast(1.04)";
        }
      });

      image._trailFadeTimer = window.setTimeout(() => {
        image.style.opacity = "0";
        image.style.filter = "blur(8px) saturate(0.72) brightness(0.72)";
        image.style.transform = `translate3d(${endX + driftX}px, ${endY + driftY}px, 0) scale(0.3) rotate(${rotation + driftX * 0.04}deg)`;
        if (inner) inner.style.transform = "scale(1.16)";
      }, 380);

      image._trailDoneTimer = window.setTimeout(() => {
        image.style.transform = "translate3d(-999px, -999px, 0) scale(0.7)";
      }, 960);
    };

    const render = () => {
      raf = 0;
      if (!stageInView()) {
        hasStarted = false;
        return;
      }

      cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.12);
      cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.12);

      const distance = Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);
      if (distance > threshold) {
        showNextImage();
        lastMousePos = { ...mousePos };
        idleFrames = 0;
      } else {
        idleFrames += 1;
      }

      if (idleFrames > 28) {
        hasStarted = false;
        return;
      }

      raf = window.requestAnimationFrame(render);
    };

    stage.addEventListener("pointermove", (event) => {
      mousePos = getLocalPos(event);
      if (isInsideEntryCard(event)) {
        lastMousePos = { ...mousePos };
        return;
      }

      if (!hasStarted) {
        hasStarted = true;
        idleFrames = 0;
        cacheMousePos = { ...mousePos };
        lastMousePos = { ...mousePos };
        if (!raf) raf = window.requestAnimationFrame(render);
      } else {
        idleFrames = 0;
      }
    });

    stage.addEventListener("pointerleave", () => {
      hasStarted = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    });
  };

  initServicesImageTrail();
})();
