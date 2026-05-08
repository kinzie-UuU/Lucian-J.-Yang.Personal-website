(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const {
    reducedMotion,
    playUiTone,
    forceScrollTop,
    resetHeroSequenceState,
    resizeStage,
    initCards,
  } = runtime;

  const entryScreen = document.querySelector("#entry-screen");
  const entryGo = document.querySelector("#entry-go");
  const entryFieldCanvas = document.querySelector("#entry-field-canvas");
  const entryCodeWord = document.querySelector("#entry-code-word");
  const entryDielineLayer = document.querySelector("#entry-dieline-layer");

  let entryTransitionLocked = false;
  let entryTransitionReleaseTimer = 0;

const lockEntryTransitionScroll = (locked) => {
  entryTransitionLocked = locked;
  document.body.classList.toggle("is-entry-scroll-locked", locked);
  window.clearTimeout(entryTransitionReleaseTimer);
  if (locked) forceScrollTop();
};

const releaseEntryTransitionScroll = () => {
  lockEntryTransitionScroll(false);
  forceScrollTop();
};

const scheduleEntryTransitionRelease = (delay = 260) => {
  window.clearTimeout(entryTransitionReleaseTimer);
  if (!document.body.classList.contains("has-entered")) return;
  entryTransitionReleaseTimer = window.setTimeout(releaseEntryTransitionScroll, delay);
};


const entryWaves = []; // canvas-drawn waves, no DOM nodes

const initEntryField = (canvas) => {
  if (!canvas || reducedMotion) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const pointer = { x: 0.5, y: 0.5, active: false, hover: false };
  let width = 0;
  let height = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const render = (time = 0) => {
    const cx = width * 0.5 + (pointer.active ? (pointer.x - 0.5) * 26 : 0);
    const cy = height * 0.5 + (pointer.active ? (pointer.y - 0.5) * 18 : 0);
    const maxRadius = Math.min(width, height) * 0.46;
    const hoverBoost = pointer.hover ? 1 : 0;

    context.clearRect(0, 0, width, height);
    context.save();
    context.globalCompositeOperation = "lighter";

    // center glow — softer, wider falloff
    const glowR = Math.min(width, height) * (0.38 + hoverBoost * 0.08);
    const glow = context.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    glow.addColorStop(0, `rgba(73, 196, 176, ${0.032 + hoverBoost * 0.068})`);
    glow.addColorStop(0.5, `rgba(73, 196, 176, ${0.012 + hoverBoost * 0.028})`);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const drawOrganicRing = (radius, alpha, tint = "73, 196, 176", offset = 0) => {
      const segments = 92;
      const gapEvery = 11;
      context.save();
      context.strokeStyle = `rgba(${tint}, ${alpha})`;
      context.lineWidth = 0.82;
      context.lineCap = "round";
      for (let start = 0; start < segments; start += gapEvery) {
        context.beginPath();
        for (let i = start; i < Math.min(start + gapEvery - 2, segments); i += 1) {
          const t = i / segments;
          const angle = t * Math.PI * 2;
          const wobble =
            Math.sin(angle * 2.3 + time * 0.00022 + offset) * radius * 0.022 +
            Math.sin(angle * 5.1 - time * 0.00016 + offset * 1.7) * radius * 0.012 +
            Math.sin(angle * 9 + offset) * radius * 0.006;
          const r = radius + wobble;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r * (0.986 + Math.sin(offset) * 0.008);
          if (i === start) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }
      context.restore();
    };

    // single slow pulse — breathes, doesn't ripple
    const period = 3800;
    const phase = (time % period) / period;
    const eased = 1 - (1 - phase) ** 2.4;
    const pulseR = maxRadius * (0.22 + eased * 0.68);
    const pulseAlpha = (1 - phase) ** 1.35 * (0.09 + hoverBoost * 0.055);
    drawOrganicRing(pulseR, pulseAlpha, "73, 196, 176", 0.3);
    drawOrganicRing(pulseR * 1.018, pulseAlpha * 0.32, "210, 235, 226", 1.25);

    // offset second ring — half period behind, barely visible
    const phase2 = ((time + period * 0.5) % period) / period;
    const eased2 = 1 - (1 - phase2) ** 2.4;
    const pulseR2 = maxRadius * (0.22 + eased2 * 0.68);
    const pulseAlpha2 = (1 - phase2) ** 1.35 * 0.036;
    drawOrganicRing(pulseR2, pulseAlpha2, "200, 220, 210", 2.1);

    context.restore();

    // canvas wave particles — irregular scatter matching original DOM effect
    const now = performance.now();
    for (let wi = entryWaves.length - 1; wi >= 0; wi--) {
      const w = entryWaves[wi];
      const age = (now - w.startedAt) / w.duration;
      if (age >= 1) { entryWaves.splice(wi, 1); continue; }
      context.save();
      context.globalCompositeOperation = "lighter";
      for (let pi = 0; pi < w.particles.length; pi++) {
        const p = w.particles[pi];
        const pAge = Math.max(0, (now - p.startedAt) / p.duration);
        if (pAge >= 1) continue;
        const eased = 1 - (1 - pAge) ** 2.2;
        const travel = p.travel * eased;
        const px = w.cx + p.dx * travel;
        const py = w.cy + p.dy * travel;
        const alpha = (1 - pAge) ** 1.5 * 0.48 * w.strength;
        const sz = p.size * (0.5 + eased * 0.8);
        context.globalAlpha = alpha;
        context.fillStyle = p.warm ? "rgba(210, 235, 220, 1)" : "rgba(73, 196, 176, 1)";
        context.beginPath();
        context.rect(px - sz * 0.5, py - sz * 0.5, sz, sz);
        context.fill();
      }
      context.restore();
    }

    window.requestAnimationFrame(render);
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    pointer.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.x = 0.5;
    pointer.y = 0.5;
  });

  entryGo?.addEventListener("pointerenter", () => {
    pointer.hover = true;
    createEntryWave(1.25);
    playUiTone("hover");
  });

  entryGo?.addEventListener("pointerleave", () => {
    pointer.hover = false;
  });

  const updateEntryCalibration = (event) => {
    if (!entryGo) return;
    const rect = entryGo.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
    const y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    entryGo.style.setProperty("--entry-calibration-x", `${Math.max(-1, Math.min(1, x)) * 4}px`);
    entryGo.style.setProperty("--entry-calibration-y", `${Math.max(-1, Math.min(1, y)) * 3}px`);
    entryGo.style.setProperty("--entry-calibration-light", "1");
  };

  const resetEntryCalibration = () => {
    if (!entryGo) return;
    entryGo.style.setProperty("--entry-calibration-x", "0px");
    entryGo.style.setProperty("--entry-calibration-y", "0px");
    entryGo.style.setProperty("--entry-calibration-light", "0");
  };

  entryGo?.addEventListener("pointermove", updateEntryCalibration);
  entryGo?.addEventListener("touchmove", (event) => {
    const touch = event.touches?.[0];
    if (touch) updateEntryCalibration(touch);
  }, { passive: true });
  entryGo?.addEventListener("pointerleave", resetEntryCalibration);

  window.addEventListener("resize", resize);
  resize();
  window.requestAnimationFrame(render);
};


const playEntryCodeReveal = () => {
  if (!entryCodeWord) return;

  const target = "LUCIAN J. YANG";
  const glyphSets = ["L1|", "UVY", "C<(", "I1L|", "A4@", "NMW/", " ", "J7]", ".:", " ", "YV/", "A4@", "NMW/", "G6&"];
  const duration = 760;
  entryCodeWord.dataset.ghost = target;
  entryCodeWord.textContent = target;
  entryCodeWord.classList.remove("is-resolved", "is-scrambling");
  entryCodeWord.classList.add("is-mosaic");

  const scramble = (startedAt) => {
    const elapsed = performance.now() - startedAt;
    const rawProgress = Math.min(elapsed / duration, 1);
    const output = target
      .split("")
      .map((letter, index) => {
        const local = Math.min(Math.max((rawProgress - index * 0.075) / 0.58, 0), 1);
        if (local > 0.92) return letter;
        const set = glyphSets[index] || letter;
        return set[Math.floor((1 - local) * set.length + elapsed / 92 + index) % set.length];
      })
      .join("");

    entryCodeWord.textContent = output;

    if (rawProgress < 1) {
      window.requestAnimationFrame(() => scramble(startedAt));
      return;
    }

    entryCodeWord.textContent = target;
    entryCodeWord.classList.remove("is-scrambling");
    entryCodeWord.classList.add("is-resolved");
  };

  window.setTimeout(() => {
    entryCodeWord.classList.remove("is-mosaic");
    entryCodeWord.classList.add("is-scrambling");
    scramble(performance.now());
  }, 560);
};

const createEntryWave = (strength = 1) => {
  if (runtime.isEntered() || reducedMotion) return;
  const rect = entryScreen?.getBoundingClientRect();
  if (!rect) return;
  const cx = rect.width * 0.5;
  const cy = rect.height * 0.5;
  const maxDist = Math.hypot(rect.width, rect.height) * 0.52;
  const gridX = rect.width <= 760 ? 46 : 54;
  const gridY = rect.width <= 760 ? 40 : 48;
  const startedAt = performance.now();
  const particles = [];

  for (let x = -rect.width * 0.5; x <= rect.width * 0.5; x += gridX) {
    for (let y = -rect.height * 0.5; y <= rect.height * 0.5; y += gridY) {
      const dist = Math.hypot(x, y);
      if (dist < 72 || dist > maxDist || Math.random() > 0.56) continue;
      const nx = x / dist;
      const ny = y / dist;
      const delay = dist * (0.82 - strength * 0.12) + Math.random() * 46;
      particles.push({
        dx: nx,
        dy: ny,
        travel: dist + Math.random() * gridX * 0.6,
        size: 1.8 + Math.random() * 2.2,
        warm: Math.random() < 0.28,
        startedAt: startedAt + delay,
        duration: 900 + Math.random() * 600,
      });
    }
  }

  entryWaves.push({ cx, cy, strength, startedAt, duration: 2200, particles });
  if (entryWaves.length > 4) entryWaves.splice(0, entryWaves.length - 4);
};

const isInsideEntryCore = (event) => {
  if (!entryGo) return false;
  if (event.target?.closest?.("#entry-go")) return true;
  const rect = entryGo.getBoundingClientRect();
  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.5;
  return Math.hypot(event.clientX - centerX, event.clientY - centerY) <= Math.max(rect.width, rect.height) * 0.72;
};

const createEntryDieline = (clientX, clientY) => {
  if (!entryDielineLayer || !entryScreen || runtime.isEntered()) return;
  const rect = entryScreen.getBoundingClientRect();
  const originX = Math.min(Math.max(clientX - rect.left, 86), rect.width - 86);
  const originY = Math.min(Math.max(clientY - rect.top, 62), rect.height - 62);
  const fragment = document.createElement("div");
  let lineIndex = 0;

  fragment.className = "entry-dieline";
  fragment.style.setProperty("--dieline-x", `${originX}px`);
  fragment.style.setProperty("--dieline-y", `${originY}px`);

  const addSegment = (x1, y1, x2, y2, type = "cut") => {
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const line = document.createElement("i");
    line.className = `entry-dieline-line is-${type}`;
    line.style.setProperty("--line-x", x1.toFixed(2));
    line.style.setProperty("--line-y", y1.toFixed(2));
    line.style.setProperty("--line-length", length.toFixed(2));
    line.style.setProperty("--line-angle", angle.toFixed(2));
    line.style.setProperty("--line-delay", String(lineIndex * 20 + Math.random() * 60));
    line.style.setProperty("--line-exit-shift", String((lineIndex % 2 === 0 ? 1 : -1) * (4 + Math.random() * 5)));
    line.style.setProperty("--line-opacity", type === "cut" ? "0.56" : type === "fold" ? "0.42" : "0.34");
    fragment.appendChild(line);
    lineIndex += 1;
  };

  const addPolyline = (points, type = "cut") => {
    for (let index = 0; index < points.length - 1; index += 1) {
      addSegment(points[index][0], points[index][1], points[index + 1][0], points[index + 1][1], type);
    }
  };

  const addOpenFlap = (left, right, top, outerY, inset = 8) => {
    addPolyline([[left, top], [left + inset, outerY], [right - inset, outerY], [right, top]]);
  };

  const glueX = -125;
  const bodyLeft = -103;
  const bodyTop = -42;
  const bodyBottom = 42;
  const sideA = -61;
  const frontRight = 9;
  const sideB = 51;
  const bodyRight = 121;

  addSegment(glueX, -34, bodyLeft, bodyTop);
  addSegment(glueX, 34, glueX, -34);
  addSegment(bodyLeft, bodyBottom, glueX, 34);
  addSegment(bodyRight, bodyTop, bodyRight, bodyBottom);
  addOpenFlap(sideA, frontRight, bodyTop, -86, 10);
  addOpenFlap(sideB, bodyRight, bodyTop, -86, 10);
  addOpenFlap(bodyLeft, sideA, bodyTop, -72, 7);
  addOpenFlap(frontRight, sideB, bodyTop, -72, 7);
  addOpenFlap(sideA, frontRight, bodyBottom, 86, 10);
  addOpenFlap(sideB, bodyRight, bodyBottom, 86, 10);
  addOpenFlap(bodyLeft, sideA, bodyBottom, 72, 7);
  addOpenFlap(frontRight, sideB, bodyBottom, 72, 7);
  addSegment(bodyLeft, bodyTop, bodyLeft, bodyBottom, "fold");
  addSegment(sideA, bodyTop, sideA, bodyBottom, "fold");
  addSegment(frontRight, bodyTop, frontRight, bodyBottom, "fold");
  addSegment(sideB, bodyTop, sideB, bodyBottom, "fold");
  addSegment(bodyLeft, bodyTop, bodyRight, bodyTop, "fold");
  addSegment(bodyLeft, bodyBottom, bodyRight, bodyBottom, "fold");
  addSegment(sideA, -86, frontRight, -86, "mark");
  addSegment(sideB, -86, bodyRight, -86, "mark");
  addSegment(sideA, 86, frontRight, 86, "mark");
  addSegment(sideB, 86, bodyRight, 86, "mark");
  addSegment(glueX - 16, -36, glueX - 2, -36, "mark");
  addSegment(glueX - 16, 36, glueX - 2, 36, "mark");

  entryDielineLayer.appendChild(fragment);
  while (entryDielineLayer.children.length > 5) entryDielineLayer.firstElementChild?.remove();
  window.setTimeout(() => fragment.remove(), 3900);
};

// Frozen: entry-to-site transition ------------------------------------------
const enterSite = () => {
  if (runtime.isEntered()) return;
  resetHeroSequenceState({ resetScroll: true, resetCards: true });
  runtime.setEntered(true);
  lockEntryTransitionScroll(true);
  playUiTone("click");

  if (reducedMotion) {
    document.body.classList.add("has-entered");
    requestAnimationFrame(() => {
      forceScrollTop();
      resizeStage();
      initCards();
      resetHeroSequenceState({ resetScroll: false, resetCards: true });
      releaseEntryTransitionScroll();
    });
    return;
  }

  // Phase 1: lid swings open
  document.body.classList.add("is-unfolding");
  playEntryCodeReveal();

  // Phase 2: screen exits
  window.setTimeout(() => {
    document.body.classList.remove("is-unfolding");
    document.body.classList.add("is-entering");
  }, 1900);

  // Phase 3: complete entry
  window.setTimeout(() => {
    document.body.classList.remove("is-entering");
    document.body.classList.add("has-entered");
    forceScrollTop();
    // Re-measure stage after CSS switches to sticky/100vh
    requestAnimationFrame(() => {
      forceScrollTop();
      resizeStage();
      initCards();
      resetHeroSequenceState({ resetScroll: false, resetCards: true });
      scheduleEntryTransitionRelease(420);
    });
  }, 2860);
};

entryGo?.addEventListener("click", enterSite);

entryScreen?.addEventListener("wheel", (event) => {
  if (runtime.isEntered() || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  createEntryWave(Math.min(1.6, Math.abs(event.deltaY) / 80));
  enterSite();
}, { passive: false });

let entryScrollTouchY = 0;
entryScreen?.addEventListener("touchstart", (event) => {
  entryScrollTouchY = event.touches[0]?.clientY || 0;
}, { passive: true });

entryScreen?.addEventListener("touchmove", (event) => {
  if (runtime.isEntered()) return;
  const y = event.touches[0]?.clientY || entryScrollTouchY;
  const delta = entryScrollTouchY - y;
  if (Math.abs(delta) < 10) return;
  event.preventDefault();
  createEntryWave(Math.min(1.6, Math.abs(delta) / 70));
  enterSite();
}, { passive: false });

document.getElementById("pixel-avatar")?.addEventListener("click", () => {
  if (!document.body.classList.contains("has-entered")) return;
  // reset to entry state
  document.body.classList.remove("has-entered", "is-entering", "is-unfolding", "is-entry-scroll-locked");
  runtime.setEntered(false);
  entryTransitionLocked = false;
  resetHeroSequenceState({ resetScroll: true, resetCards: true });
  requestAnimationFrame(forceScrollTop);
  entryScreen?.style.removeProperty("display");
});

window.addEventListener("wheel", (event) => {
  if (!entryTransitionLocked) return;
  event.preventDefault();
  forceScrollTop();
  scheduleEntryTransitionRelease(260);
}, { passive: false, capture: true });

window.addEventListener("touchmove", (event) => {
  if (!entryTransitionLocked) return;
  event.preventDefault();
  forceScrollTop();
  scheduleEntryTransitionRelease(260);
}, { passive: false, capture: true });

window.addEventListener("pageshow", () => {
  if (document.body.classList.contains("has-entered")) return;
  resetHeroSequenceState({ resetScroll: true, resetCards: true });
});

entryScreen?.addEventListener("click", (event) => {
  if (runtime.isEntered() || document.body.classList.contains("is-unfolding") || document.body.classList.contains("is-entering")) return;
  if (isInsideEntryCore(event)) return;
  createEntryWave(1);
  createEntryDieline(event.clientX, event.clientY);
});



  initEntryField(entryFieldCanvas);
})();
