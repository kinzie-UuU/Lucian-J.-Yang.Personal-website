# Project Audit

## Current Project Type

This is a pure static personal portfolio website. It uses one `index.html` entry, modular CSS files, plain browser JavaScript modules loaded by ordered `<script>` tags, one local `three.min.js` dependency, and static assets under `images/`, `videos/`, and `fonts/`.

It is not a React, Vue, Vite, Next, or bundled app. Runtime state is coordinated through globals such as `window.LucianRuntime`, `window.LucianWorkGallery`, `window.i18n`, `window.worksData`, and init functions exposed by individual scripts.

## Page Structure Map

- Top meta header: `.top-meta`, pixel avatar, identity, Beijing clock, language buttons, fullscreen, sound, contact arrow.
- Entry screen: `#entry-screen`, OPEN trigger, entry canvas, packaging seal/dieline/wave layers.
- Hero: `.hero-section`, `#hero-stage`, water/ripple canvases, SVG wireframe, five hero cards, focus panel.
- About: `#about`, portrait video/image, large type, bio copy, toolkit tags.
- Services: `#services`, sticky scroll story, entry grid-scan canvas, service panels, service image trail.
- Works transition: `#works-transition`, scroll-linked statement and progress gear.
- Works: `#works`, five category rows, hover preview, hidden clients link.
- Work gallery overlay: `#work-gallery`, circular/waterfall gallery, detail view, back/close/progress chrome.
- Clients: `#clients`, title band, selected-client marquee, intro copy.
- Contact: `#contact`, contact copy, Gmail compose form, social links, WeChat QR modal, toast.
- Bottom navigation: `.bottom-nav`, currently three primary anchors: About, Services, Works.

## CSS File Responsibility Map

- `styles/fonts.css`: font-face declarations and font family variables.
- `styles.css`: root tokens, base document styles, global body/page states, shared selection and accent primitives.
- `styles/cursor.css`: precision cursor, target corners, cursor visibility states.
- `styles/typography.css`: shared section heads, kicker text, hero/about/contact text typography.
- `styles/home.css`: entry screen, hero stage, hero cards, water surface, home-specific effects.
- `styles/about.css`: portrait/about sticky section, portrait video, about copy, skills tags, scroll type glyphs.
- `styles/services.css`: services sticky scroll story, entry card, service panels, service rail, image trail.
- `styles/works.css`: works transition, works list rows, hover preview, works-to-clients link.
- `styles/clients.css`: clients title band, marquee/logoloop, warm clients surface.
- `styles/work-gallery.css`: gallery overlay, circular gallery, waterfall fallback, detail view, gallery chrome.
- `styles/contact.css`: contact paper/grid layout, form, social links, WeChat modal, toast, warm contact surface.
- `styles/navigation.css`: bottom pill nav, nav transition overlay, top meta controls, warm-stage nav styling.
- `styles/responsive.css`: cross-section responsive overrides.
- `styles/shared-motion.css`: reveal states and scroll-scene transforms shared across sections.

## JS File Responsibility Map

- Bootstrap/runtime: `script.js`, `scripts/app-bootstrap.js`, `scripts/runtime-bridge.js`.
- Data/language/static text: `site-data.js`, `scripts/static-text-runtime.js`, `scripts/language-runtime.js`, `scripts/language-controls.js`.
- Entry: `scripts/entry.js`.
- Hero state/model/liquid: `hero-state-runtime.js`, `hero-sequence-runtime.js`, `hero-water-surface.js`, `liquid-glass-field.js`, `hero-glb-model.js`, `hero-ripples.js`, `hero-wireframe.js`.
- Services: `services-scroll-story.js`, `services-entry-grid-scan.js`, `service-panel-shaders.js`.
- Works/gallery: `work-gallery.js`, `works-hover-preview.js`, `works-transition-motion.js`.
- Site UI: `bottom-nav-scroll-spy.js`, `works-side-rail.js`, `site-clock.js`, `header-controls.js`, `precision-cursor.js`.
- Text/motion/effects: `scrambled-text.js`, `flip-text.js`, `scroll-type-effects.js`, `reveal-effects.js`, `clients-marquee.js`, `clients-title-interaction.js`, `portrait-motion.js`, `audio-feedback.js`, `particle-canvas.js`.

## CSS / JS Load Order Analysis

CSS order in `index.html` is intentional:

1. Fonts load first.
2. Global tokens/base styles load next.
3. Feature CSS modules load in page-system order: cursor, typography, home, about, services, works, clients, gallery, contact, navigation.
4. `responsive.css` and `shared-motion.css` load last as broad correction layers.

JavaScript order is also intentional:

1. `three.min.js` loads in the head before any Three.js-dependent script.
2. `site-data.js` loads before any module reads copy, work taxonomy, gallery items, or i18n.
3. Hero configuration/layout/audio/focus/water/state/action/animation/step/sequence modules load before the runtime bridge and app bootstrap.
4. `runtime-bridge.js`, `app-bootstrap.js`, static text, language, flip text, particle helpers, then `script.js` start the app.
5. Services WebGL helpers load before `services-scroll-story.js`; this order is explicitly called out in `HANDOFF.md` as a fixed regression point.
6. Gallery and UI modules load after bootstrap so `window.LucianRuntime` exists.
7. Entry and hero input scripts load at the end after runtime installation.

Do not reorder scripts unless the dependency chain is re-audited.

## High-Risk Files

- `index.html`: owns load order, page section order, IDs, and global DOM contracts.
- `site-data.js`: large i18n/data/gallery file; text and asset references are coupled to runtime.
- `scripts/work-gallery.js`: largest runtime file; owns gallery modes, circular/waterfall rendering, detail views, language refresh, and body state.
- `scripts/hero-water-surface.js`: WebGL water shader and canvas sizing.
- `scripts/hero-glb-model.js` and `scripts/liquid-glass-field.js`: Hero model orientation and full-screen liquid response.
- `scripts/runtime-bridge.js` and `scripts/app-bootstrap.js`: global runtime wiring.
- `scripts/services-scroll-story.js`, `scripts/services-entry-grid-scan.js`, `scripts/service-panel-shaders.js`: sticky scroll and Three.js/WebGL services visuals.
- `styles/home.css`, `styles/services.css`, `styles/work-gallery.css`, `styles/navigation.css`: large visual systems with many state selectors.
- `three.min.js`: local dependency; never hand-edit.

## Files Not Recommended For Casual Edits

- `three.min.js`.
- Any file in `images/`, `videos/`, or `fonts/` unless the task is explicitly asset management.
- `scripts/work-gallery.js` without a gallery-specific test pass.
- Hero water/card/step runtime files without hero scroll testing.
- Services WebGL/scroll files without services visual testing.
- `index.html` script order.

## Safer Modification Areas

- `docs/` and `tools/`.
- Copy-only changes in `site-data.js`, if UTF-8 encoding is preserved and both languages are updated.
- Small scoped CSS changes inside the matching section CSS file.
- Localized UI labels in `index.html`, only when the corresponding `data-i18n` key is updated or verified.
- QA/check scripts that do not add dependencies or alter build/runtime behavior.

## 10 Most Likely Failure Points

1. Changing script order breaks global init dependencies.
2. Removing or renaming section IDs breaks nav, scroll spy, reveal, and gallery entry paths.
3. Editing `site-data.js` with the wrong encoding corrupts Chinese text.
4. Gallery data references images that do not exist or are renamed.
5. `three.min.js` missing or loaded after services scripts breaks services grid scan.
6. Hero scroll/card state can desync if animation constants or runtime bridges change.
7. Services sticky scroll can regress because layout, shaders, and progress variables are coupled.
8. Mobile text can overflow in oversized hero/contact/clients headings.
9. WeChat modal and work gallery Escape handlers can conflict if overlay state changes.
10. `file://` loading works now, but browser/security behavior around clipboard, fullscreen, and media can vary.

## Next Recommendations

- Keep this version as the static baseline and do not convert frameworks.
- Run `node tools/check-project.js` before visual QA.
- For future code changes, modify one page system at a time and keep browser QA tied to that system.
- Add a small document update after each significant visual or runtime change.
- 【待确认】Final production hosting target, expected browser support, analytics needs, and whether Contact should use Gmail compose long term.
