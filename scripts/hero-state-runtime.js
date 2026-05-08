window.initHeroStateRuntime = ({ introTicks }) => ({
  currentHeroCard: null,
  flowPaused: false,
  focusTimeout: null,
  orderedMode: false,
  hasEntered: false,
  selectionStartedAt: 0,
  selectedCardIndex: -1,
  heroStep: 0,
  heroStepTarget: 0,
  heroIntroBudget: introTicks,
});
