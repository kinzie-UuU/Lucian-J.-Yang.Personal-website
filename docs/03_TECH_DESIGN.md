# Technical Design

## Current Tech Stack

- Static HTML: `index.html`.
- CSS modules loaded directly with `<link>`.
- Plain browser JavaScript loaded by ordered `<script>` tags.
- Runtime coordination through `window.*` globals.
- Local Three.js: `three.min.js`.
- Local GSAP vendor files for SVG morph curtain transitions.
- Static images, models, video, audio, and fonts.
- No framework, package manager, bundler, or build step.

## File Structure

- Root: `index.html`, `styles.css`, `script.js`, `site-data.js`, `three.min.js`, project docs.
- `styles/`: feature CSS modules.
- `scripts/`: runtime modules and vendor JS.
- `images/`: portrait, QR, favicons, work images, README files.
- `models/`: entry key and Hero lion-head model assets.
- `videos/`: portrait/about video.
- `audio/`: background music.
- `fonts/`: local font families.

## `index.html` Loading Structure

- Head loads favicons, a small boot script, CSS, then `three.min.js`.
- Body contains page sections, gallery overlay, QR modal, Works side rail, and bottom nav.
- Footer loads data and script modules in dependency order.
- `script.js` only calls `window.initLucianApp?.()`.

## Runtime Systems

- Entry uses `models/entry-key.glb`, progress text/bar, auto-enter, scroll/touch enter, horizontal stage curtains, and avatar replay.
- Hero uses WebGL water, SVG wireframe, fixed liquid field, GLB lion-head model, Hero wordmark layers, pointer orbiting, ripples, and Hero-to-About curtain.
- About uses portrait video/image reveal, scroll-scrubbed video time, text reveal, and About-to-Services curtain.
- Services uses Three.js grid scan, WebGL service panel shaders, and sticky scroll story.
- Works/Gallery uses category rows, Works side rail, hover preview, gallery overlay, detail view, and language refresh.
- Scroll curtains use GSAP + MorphSVG for Services-to-Works and Works-to-Contact visual handoffs.
- Contact uses Gmail compose form fields, social links, QR modal, and toast.

## `site-data.js` Responsibilities

- `i18n`: Chinese/English static copy and UI labels.
- `worksData`: category labels, descriptions, focus/value metadata.
- `workGalleryImages`: gallery source image/project data.
- `workGalleryProjects`: project groupings.
- `galleryText`: gallery chrome, category descriptions, detail copy.

Visible copy changes should start here unless a text node is intentionally hardcoded for first paint or decorative use.

## Dependencies and Load Constraints

- `three.min.js` must load before Three.js-dependent scripts.
- `site-data.js` must load before language, gallery, services text rebuild, and works UI modules.
- `runtime-bridge.js` must install `window.LucianRuntime` before most UI modules run.
- `services-scroll-story.js` owns only lightweight Services progress; `section-flow.js` owns hash jumps and active nav after Works transition motion loads.
- GSAP and MorphSVG must load before `scroll-curtain-transitions.js`.
- Entry key model and entry interaction load last so the rest of the runtime exists before entry completes or replays.

## High-Risk Modules

- `index.html` script order and DOM contracts.
- `site-data.js` data schema and asset paths.
- `scripts/work-gallery.js`.
- `scripts/hero-water-surface.js`.
- `scripts/liquid-glass-field.js`.
- `scripts/hero-glb-model.js`.
- `scripts/hero-curtain.js`, `scripts/about-curtain.js`, `scripts/scroll-curtain-transitions.js`.
- `scripts/runtime-bridge.js`, `scripts/app-bootstrap.js`.
- `scripts/services-scroll-story.js`, `scripts/section-flow.js`.
- `styles/home.css`, `styles/about.css`, `styles/services.css`, `styles/work-gallery.css`, `styles/navigation.css`, `styles/shared-motion.css`.

## Safer Modules

- `docs/`.
- `tools/`.
- `site-clock.js`.
- `language-controls.js`.
- Small copy additions in `site-data.js`.
- Small isolated styling in the matching section CSS file.

## Local Run

Use a local static server instead of opening `index.html` directly.

```bash
python -m http.server 4180
```

```text
http://127.0.0.1:4180/index.html
```

The project also has a Node local proxy:

```bash
node tools/local-proxy-server.js
```

## Check Commands

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Run `node --check` on every touched `scripts/*.js` file. Use `node tools/runtime-smoke-check.js` for a fuller headless browser smoke check.
