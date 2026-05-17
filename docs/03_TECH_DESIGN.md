# Technical Design

## Current Tech Stack

- Static HTML: `index.html`.
- CSS modules loaded directly by `<link>`.
- Plain JavaScript files loaded by ordered `<script>` tags.
- Global runtime coordination through `window.*` objects.
- Local Three.js file: `three.min.js`.
- Static images, video, and fonts.
- No package manager, bundler, framework, or build step is required.

## File Structure

- Root: `index.html`, `styles.css`, `script.js`, `site-data.js`, `three.min.js`, project docs.
- `styles/`: feature CSS modules.
- `scripts/`: behavior modules and runtime bridges.
- `images/`: portrait, QR, trails, work images, README files.
- `videos/`: portrait/about video.
- `fonts/`: local font families.

## `index.html` Loading Structure

- Head loads favicon, a small boot script, CSS, then `three.min.js`.
- Body contains all page markup and overlays.
- Footer loads data and script modules in dependency order.
- `script.js` only calls `window.initLucianApp?.()`.

## CSS Module Responsibilities

- Global tokens/base: `styles.css`.
- Page systems: `home.css`, `about.css`, `services.css`, `works.css`, `clients.css`, `contact.css`.
- Overlays/navigation/effects: `work-gallery.css`, `navigation.css`, `cursor.css`, `shared-motion.css`, `typography.css`.
- Responsive corrections: `responsive.css`.

## JS Module Responsibilities

- Startup: `app-bootstrap.js`, `runtime-bridge.js`, root `script.js`.
- Data/language: `site-data.js`, `static-text-runtime.js`, `language-runtime.js`, `language-controls.js`.
- Entry: `entry.js`.
- Hero: `hero-*` files.
- Services: `services-*`, `service-panel-shaders.js`.
- Works/gallery: `work-gallery.js`, `works-hover-preview.js`, `works-transition-motion.js`.
- Contact: `contact-interactions.js`.
- Navigation/UI: `bottom-nav-scroll-spy.js`, `works-side-rail.js`, `header-controls.js`, `precision-cursor.js`, `site-clock.js`.
- Text/motion: `scrambled-text.js`, `flip-text.js`, `scroll-type-effects.js`, `reveal-effects.js`, `portrait-motion.js`, `clients-marquee.js`, `clients-title-interaction.js`.

## `site-data.js` Responsibilities

- `i18n`: Chinese/English static copy and UI labels.
- `worksData`: category labels, descriptions, focus/value metadata.
- `workGalleryImages`: gallery source image/project data.
- `galleryText`: gallery chrome, category descriptions, detail copy.

All copy/data changes should start here unless the visible text is intentionally hardcoded in markup.

## Three.js Usage

- `three.min.js` is a local dependency.
- `scripts/services-entry-grid-scan.js` uses Three.js for the services entry grid scan.
- Other WebGL effects use raw WebGL contexts and shaders.
- Load order must keep `three.min.js` before any Three.js-dependent code.

## Resource Directories

- `images/works/`: work gallery images grouped by category/project.
- `images/trails/`: services image-trail assets.
- `images/9999.png`: about/portrait poster or fallback.
- `images/wechat-qr.jpg`: WeChat QR modal image.
- `images/头像.png`: pixel avatar.
- `videos/Video 8.mp4`: portrait/about video; referenced in HTML as `videos/Video%208.mp4`.
- `fonts/`: local font files used by `styles/fonts.css`.

## Module Dependencies

- `site-data.js` must load before language, hero focus, gallery, and services text rebuilds.
- Hero config/layout/state/action/sequence modules must load before app bootstrap.
- `runtime-bridge.js` must install `window.LucianRuntime` before most UI modules run.
- Services entry grid scan and service panel shaders must load before `services-scroll-story.js`.
- Gallery module depends on `worksData`, `workGalleryImages`, `galleryText`, DOM rows, and runtime bridge.
- Language runtime calls static text, flip text, scrambled text, services rebuild, hero focus refresh, and gallery language refresh.

## High-Risk Modules

- `work-gallery.js`
- `hero-water-surface.js`
- `liquid-glass-field.js`
- `hero-glb-model.js`
- `hero-sequence-runtime.js`
- `runtime-bridge.js`
- `app-bootstrap.js`
- `services-scroll-story.js`
- `services-entry-grid-scan.js`
- `service-panel-shaders.js`
- `index.html` script order

## Safer Modules

- `site-clock.js`
- `language-controls.js`
- Small copy additions in `site-data.js`
- Small isolated styling in the matching section CSS file
- `docs/`
- `tools/`

## Future Refactor Suggestions

- Add a non-mutating validation script set before any deeper refactor.
- Split `work-gallery.js` only after writing a gallery-specific QA checklist.
- Consider extracting gallery data generation/normalization, but do not change runtime shape without tests.
- Consider documenting runtime globals with JSDoc comments.
- Consider moving repeated color tokens into `styles.css`, but avoid broad CSS churn.

## Local Run

Use a local static server instead of opening `index.html` directly.

Recommended command:

```bash
python -m http.server 4180
```

Default URL:

```text
http://127.0.0.1:4180/index.html
```

If port `4180` is already in use, choose another local port, for example:

```bash
python -m http.server 4181
```

```text
http://127.0.0.1:4181/index.html
```

The port only affects local runtime on the current computer. Different computers, such as a company machine and a home machine, may use different ports without changing project code.

## Check Commands

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
node --check scripts/app-bootstrap.js
```

For a full JS syntax sweep, run `node --check` on every `scripts/*.js` file.
