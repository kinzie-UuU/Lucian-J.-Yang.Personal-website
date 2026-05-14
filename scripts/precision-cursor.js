(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const cursor = document.querySelector("#precision-cursor");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const targetSelector = [
    "a[href]",
    "button:not([disabled])",
    "input",
    "textarea",
    "select",
    "[role='button']",
    ".cursor-target",
    ".hero-card",
    ".work-card",
    ".work-gallery-close",
    ".work-gallery-back",
    ".contact-social-icon",
    ".top-meta-contact-arrow",
    ".bottom-nav-item",
  ].join(",");

  const cursorState = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    visible: false,
    activeTarget: null,
    animationFrame: 0,
    corners: [],
    cornerPoints: [
      { x: -14, y: -14 },
      { x: 4, y: -14 },
      { x: 4, y: 4 },
      { x: -14, y: 4 },
    ],
    targetPoints: [
      { x: -14, y: -14 },
      { x: 4, y: -14 },
      { x: 4, y: 4 },
      { x: -14, y: 4 },
    ],
  };

  const isTargetCursorEnabled = () => finePointer && !prefersReducedMotion && !!cursor;
  const isEntryTransitioning = () =>
    document.body.classList.contains("is-unfolding") ||
    document.body.classList.contains("is-entering");

  const storePointerPosition = (event) => {
    cursorState.x = event.clientX;
    cursorState.y = event.clientY;
    runtime.updatePrecisionCursor(event.clientX, event.clientY);
  };

  const ensureTargetCursorMarkup = () => {
    if (!cursor || cursor.querySelector(".target-cursor-shell")) return;

    const shell = document.createElement("span");
    shell.className = "target-cursor-shell";
    shell.setAttribute("aria-hidden", "true");
    shell.innerHTML = [
      '<span class="target-cursor-dot"></span>',
      '<span class="target-cursor-corner corner-tl"></span>',
      '<span class="target-cursor-corner corner-tr"></span>',
      '<span class="target-cursor-corner corner-br"></span>',
      '<span class="target-cursor-corner corner-bl"></span>',
    ].join("");
    cursor.appendChild(shell);
    cursorState.corners = Array.from(shell.querySelectorAll(".target-cursor-corner"));
  };

  const setCornerTransforms = () => {
    cursorState.corners.forEach((corner, index) => {
      const point = cursorState.cornerPoints[index];
      corner.style.transform = `translate(${point.x}px, ${point.y}px)`;
    });
  };

  const resetTargetPoints = () => {
    cursorState.targetPoints = [
      { x: -14, y: -14 },
      { x: 4, y: -14 },
      { x: 4, y: 4 },
      { x: -14, y: 4 },
    ];
  };

  const updateTargetPoints = (target) => {
    const rect = target.getBoundingClientRect();
    const borderWidth = 2;
    const cornerSize = 10;

    cursorState.targetPoints = [
      { x: rect.left - borderWidth - cursorState.x, y: rect.top - borderWidth - cursorState.y },
      { x: rect.right + borderWidth - cornerSize - cursorState.x, y: rect.top - borderWidth - cursorState.y },
      { x: rect.right + borderWidth - cornerSize - cursorState.x, y: rect.bottom + borderWidth - cornerSize - cursorState.y },
      { x: rect.left - borderWidth - cursorState.x, y: rect.bottom + borderWidth - cornerSize - cursorState.y },
    ];
  };

  const setActiveTarget = (target) => {
    if (!cursor || cursorState.activeTarget === target) return;

    cursorState.activeTarget = target;
    cursor.classList.toggle("is-targeting", !!target);
    if (target) {
      updateTargetPoints(target);
    } else {
      resetTargetPoints();
    }
  };

  const tickTargetCursor = () => {
    cursorState.animationFrame = 0;
    if (!cursor || !cursorState.visible) return;

    if (cursorState.activeTarget) {
      updateTargetPoints(cursorState.activeTarget);
    }

    const strength = cursorState.activeTarget ? 0.28 : 0.22;
    let moving = false;
    cursorState.cornerPoints = cursorState.cornerPoints.map((point, index) => {
      const target = cursorState.targetPoints[index];
      const next = {
        x: point.x + (target.x - point.x) * strength,
        y: point.y + (target.y - point.y) * strength,
      };
      if (Math.abs(next.x - target.x) > 0.1 || Math.abs(next.y - target.y) > 0.1) {
        moving = true;
      }
      return next;
    });
    setCornerTransforms();

    if (moving || cursorState.activeTarget) {
      cursorState.animationFrame = requestAnimationFrame(tickTargetCursor);
    }
  };

  const queueTargetCursorTick = () => {
    if (cursorState.animationFrame || !cursorState.visible) return;
    cursorState.animationFrame = requestAnimationFrame(tickTargetCursor);
  };

  const findTarget = (element) => {
    if (!element || !document.body.classList.contains("has-entered")) return null;
    return element.closest?.(targetSelector) || null;
  };

  const updateTargetFromPoint = (event) => {
    if (!isTargetCursorEnabled() || document.body.classList.contains("work-gallery-open")) {
      setActiveTarget(null);
      return;
    }

    const target = findTarget(event.target);
    setActiveTarget(target);
    queueTargetCursorTick();
  };

  const hideDuringEntryTransition = () => {
    runtime.setCursorVisible(false);
    cursorState.visible = false;
    setActiveTarget(null);
    runtime.clearFieldPointer();
  };

  const showEnteredCursorFromLastPoint = () => {
    if (!isTargetCursorEnabled() || !document.body.classList.contains("has-entered") || isEntryTransitioning()) return;

    runtime.updatePrecisionCursor(cursorState.x, cursorState.y);
    runtime.setCursorVisible(true);
    cursorState.visible = true;

    const element = document.elementFromPoint(cursorState.x, cursorState.y);
    setActiveTarget(findTarget(element));
    queueTargetCursorTick();
  };

  if (isTargetCursorEnabled()) {
    ensureTargetCursorMarkup();
    setCornerTransforms();
  }

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      runtime.setCursorVisible(false);
      runtime.clearFieldPointer();
      return;
    }

    storePointerPosition(event);
    if (isEntryTransitioning()) {
      hideDuringEntryTransition();
      return;
    }

    if (document.body.classList.contains("has-entered")) {
      runtime.setCursorVisible(true);
      cursorState.visible = true;
      updateTargetFromPoint(event);
    }
    const entryRect = runtime.entryScreen?.getBoundingClientRect();
    const insideEntry = !!entryRect &&
      entryRect.bottom > 0 &&
      event.clientX >= entryRect.left &&
      event.clientX <= entryRect.right &&
      event.clientY >= entryRect.top &&
      event.clientY <= entryRect.bottom;
    if (!document.body.classList.contains("has-entered")) {
      runtime.setCursorVisible(insideEntry);
    }

    const heroStage = runtime.heroStage;
    if (!heroStage) return;

    const rect = heroStage.getBoundingClientRect();
    const insideHero =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (insideHero) {
      runtime.setFieldPointer({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      });
    } else {
      runtime.clearHeroPointerState();
    }
  });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") {
      storePointerPosition(event);
      if (isEntryTransitioning()) {
        hideDuringEntryTransition();
      } else if (document.body.classList.contains("has-entered")) {
        showEnteredCursorFromLastPoint();
      }
    }
    cursor?.classList.add("is-pressing");
  });

  window.addEventListener("pointerup", () => {
    cursor?.classList.remove("is-pressing");
  });

  window.addEventListener("scroll", () => {
    if (!cursorState.activeTarget) return;
    const element = document.elementFromPoint(cursorState.x, cursorState.y);
    setActiveTarget(findTarget(element));
    queueTargetCursorTick();
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    runtime.setCursorVisible(false);
    cursorState.visible = false;
    setActiveTarget(null);
    runtime.clearFieldPointer();
  });

  const bodyClassObserver = new MutationObserver(() => {
    if (isEntryTransitioning()) {
      hideDuringEntryTransition();
      return;
    }

    if (document.body.classList.contains("has-entered")) {
      requestAnimationFrame(showEnteredCursorFromLastPoint);
    }
  });

  bodyClassObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();
