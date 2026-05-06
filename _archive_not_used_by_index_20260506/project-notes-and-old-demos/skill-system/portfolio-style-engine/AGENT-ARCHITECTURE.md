# Agent Architecture

This file describes how an agent should use the skill system.

## Top-Level Agent Behavior

The agent should:

1. gather missing inputs
2. classify the user's identity and goal
3. choose one primary family
4. choose up to two secondary families
5. run the boundary filter
6. apply any role branch
7. output a structured strategy

## Suggested Calling Order

1. `portfolio-style-engine`
2. one of:
   - `portfolio-strategic-authority`
   - `portfolio-premium-restraint`
   - `portfolio-hybrid-solo-studio`
   - `portfolio-archive-credibility`
   - `portfolio-concept-coherence`
3. optional:
   - `portfolio-pure-frontend-interaction`
4. always consider:
   - `portfolio-frontier-boundary-filter`
5. role branch if relevant:
   - `packaging-portfolio-branch`

## Design Rule

The system should not call every skill every time.

It should choose only the smallest set that produces a coherent answer.

