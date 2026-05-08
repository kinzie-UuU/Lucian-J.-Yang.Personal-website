# Lucian J. Yang Website Handoff

## Current Status

The site is being split gradually to preserve the current visual design and interaction behavior.

Completed and already pushed before this handoff:

- `site-data.js`
  - Holds `i18n`, `worksData`, `workGalleryImages`, and `galleryText`.
- `scripts/entry.js`
  - Handles the OPEN interaction, entry transition, entry field canvas, entry dielines, wheel/touch entry, and return-to-entry avatar behavior.
- `scripts/hero-steps.js`
  - Handles hero wheel/touch step input for the water intro and 5 card sequence.
- `scripts/hero-ripples.js`
  - Handles hero surface click and pointer ripple effects.

Current local batch covered by this handoff:

- `scripts/hero-card-config.js`
  - Holds hero card presets, step thresholds, and cluster layout constants.
- `scripts/hero-card-layout.js`
  - Holds card layout helpers:
    - `setCardPosition`
    - `createHeroCardState`
    - `resetHeroCardClasses`
    - `resetHeroCardPositions`
    - `getHeroMotionFrame`
    - `getHeroProgressState`
    - `applyHeroProgressVars`
- `scripts/site-clock.js`
  - Handles the Beijing time/date display in the top meta area.

## Validation Already Done

For the current local batch:

- `node --check` passed for:
  - `script.js`
  - `site-data.js`
  - `scripts/entry.js`
  - `scripts/hero-steps.js`
  - `scripts/hero-ripples.js`
  - `scripts/hero-card-config.js`
  - `scripts/hero-card-layout.js`
  - `scripts/site-clock.js`
- In the in-app browser:
  - OPEN enters the site normally.
  - Hero cards scroll forward and backward normally.
  - Returning to entry via the pixel avatar works.
  - Top Beijing time/date updates normally.
  - Page console has no site `warn` or `error` logs.

## Important Rules For Next Work

- Do not commit or push unless the user explicitly confirms.
- Keep splitting in small visual-safe steps.
- Avoid changing animation constants, transform math, CSS timing, or visual parameters during module moves.
- After each split, run syntax checks and browser validation.
- Treat `animateCards`, `initWaterSurface`, and services WebGL/scroll effects as high-risk areas.

## Recommended Next Steps

1. Ask the user to visually confirm the current local/GitHub version if they have not already.
2. Continue JS splitting before CSS splitting.
3. Prefer lower-risk modules before touching the hero visual core:
   - Header controls: language buttons, sound toggle, fullscreen toggle.
   - WeChat modal/contact interactions.
   - Works hover preview.
   - Works gallery, in a careful separate batch.
4. Delay these high-risk splits until later:
   - `animateCards` target-position calculations.
   - `initWaterSurface` WebGL water surface.
   - Services scroll story/WebGL renderer.
5. Start CSS splitting only after JS modules are more stable.

## Current Remaining Large Blocks In `script.js`

- Hero card animation body in `animateCards`.
- Hero WebGL water surface in `initWaterSurface`.
- Hero wireframe renderer.
- Works hover preview and gallery.
- Services grid scan and services scroll story.
- Contact, WeChat modal, language switching, sound/fullscreen controls.
- Shared utilities: audio helpers, reveal observer, cursor behavior, scrambled text.

## Visual QA Checklist

Before every commit:

- Reload `index.html`.
- Click OPEN and watch the entry-to-water transition.
- Scroll through the water intro and 5 cards.
- Scroll backward from card 1 to water.
- Click the pixel avatar and confirm it returns to entry.
- Check top time/date text.
- Confirm browser console has no site `warn` or `error` logs.
