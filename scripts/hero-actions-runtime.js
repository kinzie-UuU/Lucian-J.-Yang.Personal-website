window.initHeroActionsRuntime = ({
  heroState,
  heroCards,
  heroCardStates,
  heroFocusPanel,
  getHeroWireframeController,
}) => {
  const setActiveHeroCard = (card) => {
    heroState.currentHeroCard = card;
    heroCards.forEach((item) => {
      item.classList.toggle("is-active", item === card && !heroState.orderedMode);
      item.classList.toggle("is-dimmed", heroState.orderedMode && item !== card);
    });

    const wireframeController = getHeroWireframeController?.();
    if (card && wireframeController?.focusFromCard) {
      wireframeController.focusFromCard(card);
    }
  };

  const applyOrderedLayout = (activeCard) => {
    heroState.orderedMode = true;
    heroState.selectedCardIndex = Number(activeCard.dataset.index || -1);
    const selectedState = heroCardStates[heroState.selectedCardIndex];
    if (selectedState) {
      selectedState.captureX = selectedState.x;
      selectedState.captureY = selectedState.y;
    }
    heroState.selectionStartedAt = performance.now();
    heroFocusPanel?.classList.remove("is-visible");
    window.clearTimeout(heroState.focusTimeout);
  };

  const releaseOrderedLayout = () => {
    heroState.orderedMode = false;
    heroState.selectedCardIndex = -1;
    heroState.selectionStartedAt = 0;
    heroCards.forEach((card) => {
      card.classList.remove("is-ordered", "is-dimmed", "is-active");
    });
    heroFocusPanel?.classList.remove("is-visible");
  };

  const resetCurrentHeroCard = () => {
    heroState.currentHeroCard = null;
    window.clearTimeout(heroState.focusTimeout);
  };

  const clearHeroPointerState = (fieldPointer) => {
    fieldPointer.active = false;
    if (!heroState.orderedMode) {
      heroState.currentHeroCard = null;
      heroCards.forEach((card) => card.classList.remove("is-active"));
    }
  };

  const enterProject = (card) => {
    const projectKey = card.dataset.projectKey || card.dataset.work;
    const projectIndex = parseInt(card.dataset.projectIndex || "0", 10);
    const cardName = card.querySelector(".hero-card-name")?.textContent.trim() || "Project";

    window.LucianWorkGallery?.openFromHeroCard?.({ projectKey, projectIndex, cardName });
  };

  return {
    setActiveHeroCard,
    applyOrderedLayout,
    releaseOrderedLayout,
    resetCurrentHeroCard,
    clearHeroPointerState,
    activateHeroCard(card) {
      if (heroState.heroStep === 0 || heroState.orderedMode) return;
      setActiveHeroCard(card);
    },
    enterHeroProject(card, event) {
      if (heroState.heroStep === 0) {
        event?.preventDefault();
        event?.stopPropagation();
        return;
      }
      enterProject(card);
    },
  };
};
