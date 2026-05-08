(() => {
  const initHeroWireframe = (svg, options = {}) => {
    if (!svg || options.reducedMotion) return null;
    const ns = "http://www.w3.org/2000/svg";
    const pointer = { x: 0.5, y: 0.52, active: false, boost: 0.72 };
    const horizonLines = [];
    const depthLines = [];
    let width = 0;
    let height = 0;

    const createLine = (depth = false) => {
      const path = document.createElementNS(ns, "path");
      path.setAttribute("class", depth ? "hero-wireframe-line is-depth" : "hero-wireframe-line");
      svg.appendChild(path);
      return path;
    };

    const ensureLines = (store, count, depth = false) => {
      while (store.length < count) {
        store.push(createLine(depth));
      }
      while (store.length > count) {
        store.pop()?.remove();
      }
    };

    const buildHorizontalPath = (index, count, time) => {
      const horizon = height * 0.16;
      const progress = index / (count - 1 || 1);
      const depthEase = progress ** 1.66;
      const baseY = horizon + depthEase * (height * 0.98);
      const centerPull = (pointer.x - 0.5) * width * 0.18;
      const pointerDx = width * pointer.x - width * 0.5;
      const pointerDy = height * pointer.y - baseY;
      const distance = Math.hypot(pointerDx * 0.82, pointerDy) || 1;
      const localInfluence = Math.max(0, 1 - distance / 360);
      const wave = Math.sin(time * 0.0012 + progress * 9.2) * (8 + progress * 28);
      const lift = localInfluence * (24 + pointer.boost * 34);
      const leftX = -width * 0.08 + progress * width * 0.08;
      const rightX = width * 1.08 - progress * width * 0.08;
      const controlOffsetX = width * (0.18 + progress * 0.12);

      return [
        `M ${leftX.toFixed(2)} ${baseY.toFixed(2)}`,
        `C ${(leftX + controlOffsetX + centerPull * 0.25).toFixed(2)} ${(baseY + wave * 0.8 - lift).toFixed(2)}`,
        `${(rightX - controlOffsetX + centerPull * 0.75).toFixed(2)} ${(baseY - wave * 0.6 - lift * 0.8).toFixed(2)}`,
        `${rightX.toFixed(2)} ${baseY.toFixed(2)}`,
      ].join(" ");
    };

    const buildDepthPath = (index, count, time) => {
      const horizonY = height * 0.16;
      const vanishingX = width * (0.5 + (pointer.x - 0.5) * 0.14);
      const progress = index / (count - 1 || 1);
      const startX = -width * 0.18 + progress * width * 1.36;
      const bottomY = height * 1.03;
      const dx = startX - width * pointer.x;
      const dy = bottomY - height * pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const influence = Math.max(0, 1 - distance / 420);
      const drift = Math.sin(time * 0.001 + progress * 5.6) * 10;
      const bend = influence * (16 + pointer.boost * 16);

      return [
        `M ${startX.toFixed(2)} ${bottomY.toFixed(2)}`,
        `Q ${(startX * 0.78 + vanishingX * 0.22 + drift).toFixed(2)} ${(height * 0.58 - bend).toFixed(2)}`,
        `${vanishingX.toFixed(2)} ${horizonY.toFixed(2)}`,
      ].join(" ");
    };

    const render = (time = 0) => {
      const horizontalCount = 20;
      const depthCount = 11;
      ensureLines(horizonLines, horizontalCount);
      ensureLines(depthLines, depthCount, true);
      pointer.boost += ((pointer.active ? 1 : 0.72) - pointer.boost) * 0.06;

      for (let i = 0; i < horizontalCount; i += 1) {
        const path = horizonLines[i];
        path.setAttribute("d", buildHorizontalPath(i, horizontalCount, time));
        path.style.opacity = String(0.06 + (i / horizontalCount) * 0.18);
      }

      for (let i = 0; i < depthCount; i += 1) {
        const path = depthLines[i];
        path.setAttribute("d", buildDepthPath(i, depthCount, time));
        path.style.opacity = String(0.04 + (i / depthCount) * 0.08);
      }

      window.requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = svg.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    };

    svg.addEventListener("pointermove", (event) => {
      const rect = svg.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    });

    svg.addEventListener("pointerleave", () => {
      pointer.active = false;
      pointer.x = 0.5;
      pointer.y = 0.52;
    });

    window.addEventListener("resize", resize);
    resize();
    render();

    return {
      focusTimer: null,
      focusFromCard(card) {
        const rect = card.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        pointer.x = (rect.left + rect.width * 0.5 - svgRect.left) / svgRect.width;
        pointer.y = (rect.top + rect.height * 0.5 - svgRect.top) / svgRect.height;
        pointer.active = true;
        window.clearTimeout(this.focusTimer);
        this.focusTimer = window.setTimeout(() => {
          pointer.active = false;
        }, 420);
      },
    };
  };

  window.initHeroWireframe = initHeroWireframe;
})();
