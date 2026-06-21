# Architecture

## System Shape

This project is a single-page static portfolio. `index.html` is the only page entry and directly loads local CSS, JavaScript, fonts, images, video, audio, and 3D assets. There is no framework, package manager, bundler, transpiler, or install step.

The architecture is intentionally simple at the platform level and more complex at the interaction level:

- HTML provides stable section structure, ids, data attributes, overlays, and controls.
- CSS modules own global tokens, section layout, responsive corrections, and animation surfaces.
- Plain browser JavaScript modules attach behavior through ordered `<script>` tags and `window.*` bridges.
- `site-data.js` is the source of truth for bilingual copy, works taxonomy, gallery images, gallery projects, and gallery chrome.
- Local assets under `images/`, `models/`, `videos/`, `audio/`, and `fonts/` are loaded directly by browser paths.

## Runtime Layers

1. Vendor base
   - `three.min.js` loads in the head before any Three.js-dependent module.
   - GSAP and MorphSVG load near the end, immediately before `scroll-curtain-transitions.js`.

2. Data and bootstrap
   - `site-data.js` exposes content globals.
   - `runtime-bridge.js` creates `window.LucianRuntime`.
   - `app-bootstrap.js` initializes core runtime state, language, and Hero sequence state.
   - `script.js` calls `window.initLucianApp?.()` and stores the return value on `window.LucianApp`.

3. Section and visual systems
   - Entry, Hero, About, Services, Works, Gallery, Clients, Contact, Navigation, and shared motion scripts load after the core runtime in dependency order.
   - Later modules may call earlier `window.*` APIs, but should guard optional APIs with `?.`.

4. Transition systems
   - Entry-to-Hero and Hero-to-About are owned by `entry-hero-experience.js`.
   - About flows directly into Services as adjacent page sections.
   - Services flows directly into Works through normal page scrolling.
   - Works-to-Contact is owned by `scroll-curtain-transitions.js` with GSAP/MorphSVG.

## Page Sections

The DOM is organized as a single scroll story:

- `#entry-screen`: entry gate, 3D key, progress, auto-enter, scroll/touch enter.
- `.hero-section` and `#hero-stage`: Hero CRT video broadcast, wordmark, Hero-to-About handoff.
- `#about`: portrait video/image scrub and About text reveal.
- `#services`: services statement block and interactive gradient accordion.
- `#works`: featured work rows, hover preview, infinite gallery, and gallery entry.
- Gallery overlay: category browsing, project detail, back/close controls.
- Clients: selected-client marquee and title interaction.
- `#contact`: Gmail compose form, social links, WeChat QR modal, toast.
- Bottom navigation: collapsed avatar dock that expands to four primary anchors for About, Services, Works, and Contact, with active state and paper transition behavior. Works is also reached through natural scroll and Works rows.

## CSS Architecture

CSS is loaded in modules, but it is still global CSS. Selectors must preserve existing DOM contracts.

- `styles/fonts.css`: local font declarations.
- `styles.css`: tokens, reset, body states, base elements.
- `styles/cursor.css`: precision cursor.
- `styles/typography.css`: shared type and section styles.
- `styles/home.css`: Entry and Hero base layout.
- `styles/entry-hero-experience.css`: Entry reveal and Hero-to-About curtains.
- `styles/about.css`: About and portrait.
- `styles/services.css`: Services.
- `styles/works.css`: Works and transition.
- `styles/clients.css`: Clients.
- `styles/work-gallery.css`: Gallery.
- `styles/contact.css`: Contact.
- `styles/navigation.css`: top controls and bottom avatar dock navigation.
- `styles/responsive.css`: cross-section responsive corrections.
- `styles/shared-motion.css`: reveal helpers and scroll curtains.

Do not use `text-shadow` in this project.

## JavaScript Architecture

JavaScript modules are plain scripts, not ES modules. They communicate through:

- `window.init*` initializer functions.
- `window.Lucian*` runtime objects.
- DOM state classes on `body`, sections, and component roots.
- CSS custom properties for progress/state.
- Custom events such as `lucian:site-entered` and `lucian:programmatic-section-jump`.

Because script tags are ordered, changing load order is a structural change. Re-audit dependent globals and run smoke QA before moving scripts.

## Data Architecture

`site-data.js` owns content data:

- `i18n`: static bilingual copy and UI labels.
- `worksData`: Works category labels, descriptions, and metadata.
- `workGalleryImages`: image-level gallery data.
- `workGalleryProjects`: project groupings and detail data.
- `galleryText`: gallery chrome, category labels, and detail copy.

Visible copy should start in `site-data.js` unless it must be hardcoded for first paint, decoration, or a nontranslated technical label.

## Asset Architecture

All runtime assets are local:

- `images/`: favicons, portrait fallback, QR, works images, and related READMEs.
- `models/`: entry key GLB assets.
- `videos/`: portrait/about video.
- `audio/`: site sound/music.
- `fonts/`: local web fonts.

When moving or renaming assets, check references in `index.html`, CSS `url(...)`, `site-data.js`, and model-relative texture paths.

## QA Baseline

After code changes:

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Run `node --check` for every touched `scripts/*.js` file. Use a local server for browser QA:

```bash
python -m http.server 4180
```

Open `http://127.0.0.1:4180/index.html`.
