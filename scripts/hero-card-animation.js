(() => {
  const initHeroCardAnimation = (options) => {
    const {
      stageMotion,
      fieldPointer,
      heroSection,
      heroStage,
      heroFocusPanel,
      heroCardStates,
      getState,
      setHeroStepTarget,
    } = options;

    const animateCards = (timestamp) => {
      if (!stageMotion.width || !stageMotion.height) {
        window.requestAnimationFrame(animateCards);
        return;
      }

      const stateValues = getState();
      const {
        heroStep,
        heroStepTarget,
        heroIntroBudget,
        orderedMode,
        selectedCardIndex,
        selectionStartedAt,
        currentHeroCard,
      } = stateValues;
      const frame = getHeroMotionFrame({ timestamp, stageMotion, fieldPointer, heroSection });
      const { elapsed, width, height, minSide, centerX, centerY, pointerX, pointerY, swayX, swayY, heroRect } = frame;
      const hasEntered = document.body.classList.contains("has-entered");
      const scrollDriven = hasEntered && !orderedMode;

      const nextHeroStepTarget = heroStepTarget + (heroStep - heroStepTarget) * 0.072;
      setHeroStepTarget(nextHeroStepTarget);

      const progressState = getHeroProgressState({
        heroStepTarget: nextHeroStepTarget,
        heroStep,
        heroIntroBudget,
        heroRect,
        stageHeight: stageMotion.height,
      });
      const { scrollProgress, introProgress, tailFade } = progressState;

      if (hasEntered) {
        const heroComplete = heroStep >= HERO_CARD_COUNT;
        if (document.documentElement.classList.contains("snap-active") !== heroComplete) {
          document.documentElement.classList.toggle("snap-active", heroComplete);
        }
      }

      applyHeroProgressVars(heroStage, progressState);

      if (hasEntered && heroRect && heroRect.bottom < -stageMotion.height * 0.25 && !orderedMode) {
        window.requestAnimationFrame(animateCards);
        return;
      }

      const targets = heroCardStates.map((cardState, index) => {
        const { layout } = cardState;
        if (orderedMode && index === selectedCardIndex) {
          const progress = Math.min(1, (timestamp - selectionStartedAt) / 920);
          const eased = 1 - (1 - progress) ** 3;
          const spiralRadius = (1 - eased) * minSide * 0.16;
          const spin = progress * Math.PI * 5.2 + layout.phase;
          const x = cardState.captureX + (centerX - cardState.captureX) * eased + Math.cos(spin) * spiralRadius * 0.58;
          const y = cardState.captureY + (centerY - 10 - cardState.captureY) * eased + Math.sin(spin) * spiralRadius * 0.34;
          const rotation = layout.rot + progress * 640;
          const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
          return {
            x,
            y,
            rotation,
            ry: Math.sin(spin) * 34,
            rx: -8 + Math.cos(spin) * 6,
            scale: 1.08 - eased * 0.34,
            depth: 180,
            opacity,
          };
        }

        if (scrollDriven) {
          const cardCount = HERO_CARD_COUNT;
          if (index >= HERO_CARD_COUNT) {
            return { x: centerX, y: centerY + height, rotation: 0, ry: 0, rx: 0, scale: 0, depth: 0, opacity: 0, current: false };
          }
          const travel = scrollProgress * (cardCount - 1);
          const delta = index - travel;
          const pointerShiftX = fieldPointer.active ? (fieldPointer.x - 0.5) * minSide * 0.04 : 0;
          const pointerShiftY = fieldPointer.active ? (fieldPointer.y - 0.5) * minSide * 0.03 : 0;
          const activationProgress = Math.max(0, 1 - Math.abs(delta) / 2.0);
          const isCurrent = Math.abs(delta) < 0.5;
          const spreadX = width * 0.26;
          const spreadY = height * 0.18;
          const rawX = centerX + delta * spreadX;
          const rawY = centerY + delta * spreadY;
          const visibleBand = Math.max(0, 1 - Math.max(0, Math.abs(delta) - 2.5) / 1.5);
          const scale = 0.32 + activationProgress * 1.08;
          const ryTilt = -delta * 14;
          const rotTilt = delta * 2.5;
          const parallaxStrength = 1 - activationProgress * 0.7;
          const x = rawX + pointerShiftX * (0.2 + activationProgress * 0.3) * parallaxStrength;
          const y = rawY + pointerShiftY * (0.2 + activationProgress * 0.2) * parallaxStrength;

          return {
            x,
            y,
            rotation: rotTilt + pointerShiftX * 0.010,
            ry: Math.max(-55, Math.min(55, ryTilt)) + pointerShiftX * 0.018,
            rx: -2 + activationProgress * 2 - pointerShiftY * 0.008,
            scale,
            depth: 10 + activationProgress * 180,
            opacity: Math.min(0.97, Math.max(0, tailFade * introProgress * visibleBand * (0.15 + activationProgress * 0.55 + (isCurrent ? 0.27 : 0)))),
            current: isCurrent,
          };
        }

        const radiusX = width * (orderedMode ? 0.38 : 0.34);
        const radiusY = height * (orderedMode ? 0.30 : 0.26);
        const xDrift = Math.sin(elapsed * 0.36 + layout.phase) * 18;
        const yDrift = Math.cos(elapsed * 0.42 + layout.phase) * 14;
        let x = centerX + swayX + layout.ox * radiusX + xDrift;
        let y = centerY + swayY + layout.oy * radiusY + yDrift;

        if (fieldPointer.active) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy) || 1;
          const influenceRadius = minSide * 0.24;
          if (distance < influenceRadius) {
            const repel = ((influenceRadius - distance) / influenceRadius) ** 1.65;
            x += (dx / distance) * repel * 84;
            y += (dy / distance) * repel * 64;
          }
        }

        if (orderedMode) {
          const spread = index < selectedCardIndex ? -1 : 1;
          x += spread * minSide * 0.16;
        }

        return {
          x,
          y,
          rotation: layout.rot + Math.sin(elapsed * 0.38 + layout.phase) * 4.2,
          ry: Math.sin(elapsed * 0.34 + layout.phase) * 14,
          rx: Math.cos(elapsed * 0.28 + layout.phase) * 4,
          scale: orderedMode ? layout.scale * 0.92 : layout.scale,
          depth: orderedMode ? layout.depth - 24 : layout.depth,
          opacity: heroStep === 0 ? 0 : (orderedMode ? 0 : 0.76),
        };
      });

      if (!scrollDriven) {
        for (let pass = 0; pass < 2; pass += 1) {
          for (let i = 0; i < heroCardStates.length; i += 1) {
            for (let j = i + 1; j < heroCardStates.length; j += 1) {
              if (orderedMode && (i === selectedCardIndex || j === selectedCardIndex)) continue;
              const a = targets[i];
              const b = targets[j];
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const distance = Math.hypot(dx, dy) || 1;
              const minDistance = (heroCardStates[i].width + heroCardStates[j].width) * 0.34;
              if (distance < minDistance) {
                const push = (minDistance - distance) * 0.5;
                const nx = dx / distance;
                const ny = dy / distance;
                a.x -= nx * push;
                a.y -= ny * push * 0.86;
                b.x += nx * push;
                b.y += ny * push * 0.86;
              }
            }
          }
        }
      }

      heroCardStates.forEach((cardState, index) => {
        const target = targets[index];
        cardState.targetX = target.x;
        cardState.targetY = target.y;
        cardState.x += (target.x - cardState.x) * (orderedMode ? 0.09 : 0.075);
        cardState.y += (target.y - cardState.y) * (orderedMode ? 0.09 : 0.075);
        cardState.rotation += (target.rotation - cardState.rotation) * 0.08;
        cardState.scale += (target.scale - cardState.scale) * 0.08;
        cardState.opacity += (target.opacity - cardState.opacity) * 0.08;
        cardState.depth += (target.depth - cardState.depth) * 0.08;

        cardState.card.classList.toggle("is-dimmed", orderedMode && index !== selectedCardIndex);
        cardState.card.classList.toggle("is-active", !orderedMode && currentHeroCard === cardState.card);
        cardState.card.classList.toggle("is-scroll-current", scrollDriven && Boolean(target.current));

        setCardPosition(cardState.card, {
          x: cardState.x,
          y: cardState.y,
          w: cardState.width,
          h: cardState.height,
          z: cardState.depth,
          r: cardState.rotation,
          ry: target.ry || 0,
          rx: target.rx || 0,
          scale: cardState.scale,
          opacity: Math.max(0, Math.min(1, cardState.opacity)),
        });
      });

      if (orderedMode) {
        const progress = Math.min(1, (timestamp - selectionStartedAt) / 920);
        heroFocusPanel.classList.toggle("is-visible", progress > 0.52);
      }

      window.requestAnimationFrame(animateCards);
    };

    window.requestAnimationFrame(animateCards);
  };

  window.initHeroCardAnimation = initHeroCardAnimation;
})();
