# Project Structure

This project is now split into small CSS and JS modules while keeping `index.html` as the static page entry.

## Root Files

- `index.html`: page markup and ordered stylesheet/script references.
- `styles.css`: global tokens, reset, base body/page rules, and shared global states.
- `script.js`: one-line application entry that calls `window.initLucianApp()`.
- `site-data.js`: text, works data, gallery image data, and gallery copy.
- `three.min.js`: local Three.js dependency used by `scripts/services-entry-grid-scan.js`.
- `HANDOFF.md`: implementation history, validation notes, and high-risk areas.

## CSS Modules

- `styles/fonts.css`: font-face declarations and font variables.
- `styles/cursor.css`: precision cursor and cursor-related states.
- `styles/typography.css`: shared text effects and typographic utilities.
- `styles/home.css`: entry, hero, water surface, hero cards, and home-section visuals.
- `styles/about.css`: about and portrait sections.
- `styles/services.css`: services entry, panels, scroll story, and services effects.
- `styles/works.css`: works rows, works statements, and works section visuals.
- `styles/clients.css`: client marquee/title section and particle/client effects.
- `styles/work-gallery.css`: gallery overlay, horizontal gallery, and detail page.
- `styles/contact.css`: contact form, social links, and QR modal.
- `styles/navigation.css`: header controls and bottom navigation.
- `styles/responsive.css`: current responsive overrides.
- `styles/shared-motion.css`: shared reveal and motion helpers.

## JS Modules

The JS split is complete for the current static-script architecture. `script.js` only starts the app; behavior lives under `scripts/`.

Key groups:

- App/bootstrap/runtime bridge: `app-bootstrap.js`, `runtime-bridge.js`, `hero-state-runtime.js`.
- Entry and hero: `entry.js`, `hero-steps.js`, `hero-step-runtime.js`, `hero-actions-runtime.js`, `hero-sequence-runtime.js`, `hero-card-*`, `hero-water-surface.js`, `hero-ripples.js`, `hero-wireframe.js`, `hero-focus-runtime.js`.
- Services: `services-entry-grid-scan.js`, `service-panel-shaders.js`, `services-scroll-story.js`, `services-image-trail.js`.
- Works/gallery: `work-gallery.js`, `works-hover-preview.js`, `works-transition-motion.js`.
- Site UI: `header-controls.js`, `language-controls.js`, `language-runtime.js`, `static-text-runtime.js`, `bottom-nav-scroll-spy.js`, `site-navigation.js`, `site-clock.js`, `precision-cursor.js`.
- Effects and supporting modules: `audio-feedback.js`, `scrambled-text.js`, `scroll-type-effects.js`, `reveal-effects.js`, `clients-marquee.js`, `clients-title-interaction.js`, `portrait-motion.js`, `particle-canvas.js`.

## Audit Notes

- Keep `three.min.js`; it is an active local dependency.
- Keep the script order in `index.html` unless a dependency is intentionally changed.
- After structural edits, run missing-reference checks plus JS/CSS syntax checks before visual QA.
- Temporary verification files should not be written into the project root.
