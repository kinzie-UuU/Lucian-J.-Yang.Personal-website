---
name: portfolio-style-engine
description: Orchestrate the generation of distinctive portfolio or studio website strategies for designers, creatives, and small studios. Use when the user wants a highly designed personal website, studio website, portfolio website, or creative showcase and needs the system to choose among multiple visual and interaction directions based on identity, audience, business goal, content assets, and technical constraints. This skill should classify the user, ask for missing essentials, call the relevant sub-skills in this portfolio system, reject mismatched patterns, and output a structured website strategy rather than a random aesthetic collage.
---

# Portfolio Style Engine

Use this as the top-level orchestrator for portfolio and studio website generation.

This skill should not act like a single visual style.

It should:

1. identify the user's professional type
2. identify the website's job
3. detect content strengths and weaknesses
4. choose the right portfolio family
5. reject visually attractive but strategically wrong patterns
6. produce a structured plan

## Required Inputs

Collect or infer:

- user role
- business goal
- target audience
- content assets
- visual preference
- interaction intensity
- technical constraints
- avoid patterns

If information is missing, ask only for what materially changes the direction.

## Selection Workflow

1. Start from identity, not aesthetics.
2. Choose one primary portfolio family.
3. Choose up to two secondary supporting families.
4. Apply boundary filtering.
5. If relevant, apply a role branch such as `packaging-portfolio-branch`.
6. Output a strategy with:
   - positioning judgement
   - family selection and rejection
   - visual language
   - information architecture
   - interaction system
   - technical direction
   - content rules
   - risk check

## Available Child Skills

- `portfolio-strategic-authority`
- `portfolio-premium-restraint`
- `portfolio-hybrid-solo-studio`
- `portfolio-archive-credibility`
- `portfolio-concept-coherence`
- `portfolio-pure-frontend-interaction`
- `portfolio-frontier-boundary-filter`
- `packaging-portfolio-branch`

## Hard Rules

- Do not directly imitate a reference site.
- Do not merge too many portfolio families.
- Do not use strong interaction unless it supports identity or navigation.
- Do not choose creative-developer identity logic for non-developer users.
- For client-facing sites, clarity must beat spectacle.

## Output Contract

Always return:

1. project positioning
2. selected portfolio family stack
3. rejected directions
4. homepage strategy
5. section architecture
6. interaction grammar
7. implementation guidance
8. content guidelines
9. risk notes

