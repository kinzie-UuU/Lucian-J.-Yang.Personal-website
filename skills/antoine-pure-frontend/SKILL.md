---
name: antoine-pure-frontend
description: Use when the user wants a portfolio, landing page, or interactive website inspired by Antoine Wodniack, Nod Coding, or similarly pure front-end interaction work. This skill focuses on hand-authored SVG or DOM-driven motion, pseudo-3D depth from 2D primitives, strong monochrome composition, restrained copy, and physical-feeling interaction without relying on heavy 3D engines.
---

# Antoine Pure Frontend

Use this skill when the goal is not just to make a site "cool", but to make it feel like **pure front-end craft**:

- pseudo-3D from 2D elements
- SVG, DOM, CSS transform, and hand-authored motion
- strong monochrome or limited-palette art direction
- tactile, physical-feeling interactions
- minimal dependence on heavy 3D frameworks

This skill is especially appropriate for:

- personal portfolios
- creative developer sites
- studio sites with an experimental front page
- websites where interaction itself is part of the identity

Read `references/antoine-notes.md` when you need the distilled research notes and source links.

## Core Thesis

Antoine-style work does **not** start from frameworks or "effects".

It starts from:

1. a clear graphic language
2. a spatial illusion built from flat primitives
3. a small number of hand-crafted interaction rules

The result should feel:

- precise
- graphic
- physical
- authored
- technically legible

## What "Pure Frontend Interaction" Means Here

Aim for interaction that can be explained in terms of:

- `SVG` path deformation
- `DOM` layout and layering
- `transform`, `transform-origin`, `perspective`, `translate3d`, `rotateX`, `rotateZ`, `scale`
- scroll position mapped to motion
- pointer distance mapped to displacement or highlight
- velocity, damping, easing, and decay written by hand

Default assumption:

- avoid heavy real-time 3D engines unless truly necessary
- prefer pseudo-3D over true 3D
- prefer authored math over plugin spectacle

## Visual Principles

### 1. One dominant graphic rule

Each page or section should have one strong visual logic:

- grid field
- line field
- layered planes
- ring or orbit
- isometric sheet
- typographic wall

Do not mix many unrelated visual languages in one viewport.

### 2. Pseudo-3D, not fake "3D look"

Use flat elements to imply depth:

- scale by depth
- opacity by depth
- overlap and masking
- converging perspective
- parallax tied to pointer or scroll
- line-density changes across depth

The page should feel spatial without needing a 3D scene graph.

### 3. Monochrome or tightly limited palette

Default to:

- black / off-white / gray
- one accent color only if it has structural meaning
- bright color appears as signal, not decoration

The color system should support hierarchy, not compete with interaction.

### 4. Typography as structure

Use type to define tension and scale:

- large, graphic headlines
- small metadata lines
- spaced-out labels
- deliberate contrast between display type and utilitarian UI text

Avoid copy-heavy heroes. The first screen should read like a poster or apparatus.

## Interaction Principles

### 1. Motion must have cause

Every visible movement should come from one of these:

- pointer proximity
- scroll progress
- drag state
- release / decay
- focus / activation

If motion exists without an understandable trigger, remove it.

### 2. Physical feeling through simple math

Prefer:

- spring-like interpolation
- easing with decay
- inertia on release
- delayed follow-through
- localized disturbance

Common patterns:

- hover brightens and lifts one plane while surrounding planes dim
- drag rotates a flat plane in perspective space
- release overshoots slightly, then settles
- nearby grid lines ripple outward from a cursor point

### 3. One hero interaction, one support interaction

Per page, usually ship:

- one dominant interaction in the first viewport
- one secondary interaction later in the page

Do not make every section equally aggressive.

## Antoine-Style Section Patterns

### Pattern A: Interactive field

Best for first viewports.

Ingredients:

- a large field of lines, cards, or flat planes
- one active item
- global depth transform
- hover or pointer influence

Use this instead of a conventional hero.

### Pattern B: Typographic depth corridor

Best for "about" or timeline sections.

Ingredients:

- strong perspective
- flat text blocks or images placed on depth planes
- scrolling changes depth and alignment
- occasional drag or snap-to-front behavior

### Pattern C: Ring / orbit selection

Best for showcasing projects or categories.

Ingredients:

- arranged items on a circular or curved path
- one item emphasized
- scale/opacity reveal depth
- scroll or wheel rotates the system

### Pattern D: Disturbance grid

Best for menus, contact, and transition zones.

Ingredients:

- visible grid or line system
- pointer proximity causes disturbance
- state change affects nearby geometry

Use sparingly. It should feel intentional, not like a background effect pack.

## Implementation Defaults

### DOM first

Keep:

- text as real text
- images as real images
- buttons and links as real controls

Do not flatten the whole experience into canvas unless the section truly requires raster rendering.

### SVG when the geometry matters

Use SVG for:

- line fields
- path deformation
- masks
- rings, wireframes, and geometric overlays

If the interaction depends on the exact shape of lines, SVG is usually the right layer.

### CSS transforms for plane illusion

Use CSS transforms for:

- card fields
- pseudo-3D stacks
- drag-to-tilt
- perspective scenes built from layered DOM nodes

### JavaScript for motion state, not visual clutter

JS should mostly:

- store interaction state
- compute displacement or interpolation
- update transforms or SVG attributes

Avoid unnecessary abstraction when a small state machine is enough.

## What To Avoid

- generic SaaS hero blocks
- stacked cards as default layout
- many independent hover animations fighting each other
- heavy 3D scenes with no design reason
- decorative particles that do not affect structure
- gradients used as a substitute for composition
- long explanations in the first viewport
- shiny effects without physical logic

## Litmus Checks

Before calling the page "done", check:

1. Can the main interaction be described in one sentence?
2. Does the first viewport still feel strong if most copy is removed?
3. Is the depth illusion built from flat elements, not from visual noise?
4. Does hover/scroll/drag feel authored rather than template-driven?
5. If the accent color disappears, does the page still feel strong?
6. Would a front-end developer recognize the craft in the implementation?

## Workflow

When applying this skill:

1. Write a **visual thesis** in one sentence.
2. Write an **interaction thesis** with 2-3 motion rules only.
3. Decide whether the hero is:
   - field
   - corridor
   - orbit
   - disturbance grid
4. Keep the first viewport mostly visual.
5. Build with DOM/SVG/CSS transforms first.
6. Only add heavier tooling if the concept truly breaks without it.

## Suggested Visual Thesis Template

Use this structure:

`[mood] + [graphic rule] + [depth behavior] + [interaction character]`

Example:

`A restrained black editorial field of floating project planes, using pseudo-3D depth and slow inertial motion to feel like a physical archive.`

## Suggested Interaction Thesis Template

Use 2-3 bullet rules:

- pointer proximity slightly disturbs nearby geometry
- one active plane rises and brightens while others dim
- drag and release produce a short inertial settle

