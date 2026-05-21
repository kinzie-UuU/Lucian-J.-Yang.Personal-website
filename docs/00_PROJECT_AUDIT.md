# Project Audit

## Current Project Type

This is a pure static personal portfolio website. It uses one `index.html` entry, modular CSS files, plain browser JavaScript loaded by ordered `<script>` tags, local Three.js, local GSAP vendor files, and static assets under `images/`, `models/`, `videos/`, `audio/`, and `fonts/`.

It is not a React, Vue, Vite, Next, or bundled app. Runtime state is coordinated through globals such as `window.LucianRuntime`, `window.LucianWorkGallery`, `window.i18n`, `window.worksData`, and script-specific init functions.

## Page Structure Map

- Top meta header: identity, Beijing clock, language buttons, fullscreen, sound, contact arrow.
- Entry screen: `#entry-screen`, 3D key canvas, progress text/bar, atmosphere layers.
- Hero: `.hero-section`, `#hero-stage`, WebGL water, SVG wireframe, fixed liquid field, GLB lion-head model, Hero wordmark, Hero curtain.
- About: `#about`, portrait video/image, darkroom-style reveal, bio copy, toolkit tags, About curtain.
- Services: `#services`, sticky scroll story, entry grid-scan canvas, service panel shaders.
- Services-to-Works curtain: `#curtain-services-works`.
- Works transition: `#works-transition`, scroll-linked statement/progress visual.
- Works: `#works`, five category rows, hover preview, clients link.
- Works-to-Contact curtain: `#curtain-works-contact`.
- Work gallery overlay: `#work-gallery`, category/project gallery, detail view, back/close/progress chrome.
- Contact: `#contact`, contact copy, Gmail compose form, social links, WeChat QR modal, toast.
- Clients: `#clients`, title band, selected-client marquee, intro copy.
- Works side rail: `#works-side-rail`, avatar replay and category quick-open.
- Bottom navigation: `.bottom-nav`, four anchors: About, Services, Works, Contact.

## CSS Responsibility Map

- `styles/home.css`: entry screen, 3D key entry, Hero stage, lion model, water surface, Hero curtain.
- `styles/about.css`: portrait reveal, About text, About-to-Services curtain.
- `styles/services.css`: services sticky scroll story, entry grid scan, panel shaders.
- `styles/works.css`: works transition, category rows, hover preview.
- `styles/shared-motion.css`: reveal helpers and scroll curtain transition styles.
- Other CSS modules keep their section-specific responsibilities as named.

## JS Responsibility Map

- Entry: `scripts/entry-key-model.js`, `scripts/entry.js`.
- Hero: `hero-state-runtime.js`, `hero-sequence-runtime.js`, `hero-water-surface.js`, `hero-curtain.js`, `liquid-glass-field.js`, `hero-glb-model.js`, `hero-ripples.js`, `hero-wireframe.js`.
- About: `portrait-motion.js`, `about-curtain.js`.
- Scroll curtains: `scroll-curtain-transitions.js` plus GSAP vendor files.
- Services: `services-scroll-story.js`, `services-entry-grid-scan.js`, `service-panel-shaders.js`.
- Works/gallery: `work-gallery.js`, `works-side-rail.js`, `works-hover-preview.js`, `works-transition-motion.js`.
- UI/language/effects: runtime bridge, app bootstrap, language/static text modules, header controls, bottom nav, cursor, reveal/text effects, clients, contact, audio.

## Load Order Analysis

CSS order in `index.html` is intentional: fonts, global styles, feature modules in page order, then responsive/shared motion corrections.

JavaScript order is intentional:

1. `three.min.js` loads in the head.
2. `site-data.js` loads before any data-driven UI.
3. Hero water/curtain/state/sequence load before runtime bridge and app bootstrap.
4. Services helpers load before `services-scroll-story.js`.
5. Gallery and UI modules load after bootstrap/runtime bridge.
6. Portrait/About, GSAP, scroll curtains, entry key, and entry interaction load near the end.

Do not reorder scripts unless the dependency chain is re-audited.

## High-Risk Files

- `index.html`: load order, page section order, IDs, global DOM contracts.
- `site-data.js`: i18n/data/gallery file; text and asset references are coupled to runtime.
- `scripts/work-gallery.js`: gallery modes, detail views, language refresh, body state.
- Hero WebGL/model/liquid scripts.
- Curtain scripts and `styles/shared-motion.css`.
- Services WebGL/scroll scripts.
- Large visual CSS systems: `styles/home.css`, `styles/about.css`, `styles/services.css`, `styles/work-gallery.css`, `styles/navigation.css`.
- `three.min.js` and vendor JS: local dependencies; do not hand-edit.

## Most Likely Failure Points

1. Changing script order breaks global init dependencies.
2. Removing or renaming section IDs breaks nav, scroll spy, reveal, gallery, and curtain triggers.
3. Editing `site-data.js` with the wrong encoding corrupts Chinese text.
4. Gallery data references images that do not exist or are renamed.
5. Three.js/GSAP vendor files are missing or loaded too late.
6. Entry replay can desync if `body.has-entered` and progress/key state are not coordinated.
7. Hero and About curtains depend on scroll geometry and sticky section heights.
8. Services sticky scroll can regress because layout, shaders, and progress variables are coupled.
9. Mobile text/model/water layers can overflow because of large display typography and canvases.
10. WeChat modal, work gallery, and Works rail overlay states can conflict if Escape/body states change.

## Next Recommendations

- Keep this version as the static baseline and do not convert frameworks.
- Run `node tools/check-project.js` before visual QA.
- For future code changes, modify one page system at a time and keep browser QA tied to that system.
- Keep docs synchronized after significant visual, runtime, asset, or QA changes.
