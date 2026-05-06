# Portfolio Style Engine

This folder is a portable skill system for generating distinctive portfolio and studio websites.

Design goals:

- portable
- modular
- composable
- usable for Kinzie
- usable for general designers, studios, and individual creators

The system is split into:

1. one orchestrator skill
2. several reusable sub-skills
3. role branches
4. boundary / rejection skills

## Layout

- `portfolio-style-engine/`
  top-level orchestrator
- `portfolio-strategic-authority/`
  strategy-forward, proposition-led portfolio logic
- `portfolio-premium-restraint/`
  calm, premium, editorial minimal portfolio logic
- `portfolio-hybrid-solo-studio/`
  one-person or small-practice authority logic
- `portfolio-archive-credibility/`
  archive-first trust and breadth logic
- `portfolio-concept-coherence/`
  concept system / metaphor-led site logic
- `portfolio-pure-frontend-interaction/`
  SVG / DOM / pseudo-3D interaction language
- `portfolio-frontier-boundary-filter/`
  reject mismatched immersive / tech-first patterns
- `packaging-portfolio-branch/`
  packaging-designer-specific role branch
- `PORTFOLIO_ENGINE_DIALOG_FLOW.md`
  how the agent should ask questions and decide what to ask
- `PORTFOLIO_ENGINE_OUTPUT_TEMPLATE.md`
  the preferred structured output for strategy generation
- `TEST-CASES.md`
  validation cases for checking whether the engine picks the right family stack
- `KINZIE-RUN-01.md`
  one realistic validation run using Kinzie as the input case
- `STATUS.md`
  human-facing progress/status file for the whole system
- `ANALYSIS-LOG.md`
  human-facing analysis and architectural decision log
- `PORTABLE-SETUP.md`
  explains how to move, reuse, and maintain the whole system cleanly

## Intended Use

The top-level skill should:

1. ask for missing information
2. classify the user's position
3. choose the right sub-skills
4. reject unfit directions
5. output a complete site strategy

This folder is meant to be movable as a unit.
