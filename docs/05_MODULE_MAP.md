# Module Map

## CSS Load Order

| Order | File | Purpose |
|---:|---|---|
| 1 | `styles/fonts.css` | Font faces |
| 2 | `styles.css` | Tokens and base styles |
| 3 | `styles/cursor.css` | Precision cursor |
| 4 | `styles/typography.css` | Shared typography |
| 5 | `styles/home.css` | Entry and Hero |
| 6 | `styles/about.css` | About / portrait |
| 7 | `styles/services.css` | Services |
| 8 | `styles/works.css` | Works and transition |
| 9 | `styles/clients.css` | Clients |
| 10 | `styles/work-gallery.css` | Gallery overlay |
| 11 | `styles/contact.css` | Contact |
| 12 | `styles/navigation.css` | Top and bottom navigation |
| 13 | `styles/responsive.css` | Responsive overrides |
| 14 | `styles/shared-motion.css` | Reveal and scroll motion |

## JS Load Order

| Order | File | Purpose |
|---:|---|---|
| 0 | `three.min.js` | Local Three.js dependency |
| 1 | `site-data.js` | Copy/data |
| 2 | `scripts/hero-card-config.js` | Hero constants |
| 3 | `scripts/hero-card-layout.js` | Hero layout helpers |
| 4 | `scripts/audio-feedback.js` | Audio |
| 5 | `scripts/hero-wireframe.js` | Hero SVG wireframe |
| 6 | `scripts/hero-focus-runtime.js` | Hero focus copy |
| 7 | `scripts/hero-water-surface.js` | Hero WebGL water |
| 8 | `scripts/hero-state-runtime.js` | Hero state object |
| 9 | `scripts/hero-actions-runtime.js` | Hero actions |
| 10 | `scripts/hero-card-animation.js` | Hero card animation |
| 11 | `scripts/hero-step-runtime.js` | Hero step runtime |
| 12 | `scripts/hero-sequence-runtime.js` | Hero sequence reset/init |
| 13 | `scripts/runtime-bridge.js` | Shared runtime bridge |
| 14 | `scripts/app-bootstrap.js` | App startup |
| 15 | `scripts/static-text-runtime.js` | Static i18n text |
| 16 | `scripts/language-runtime.js` | Language orchestration |
| 17 | `scripts/flip-text.js` | Flip text |
| 18 | `scripts/particle-canvas.js` | Particle helper |
| 19 | `script.js` | Calls app init |
| 20 | `scripts/services-entry-grid-scan.js` | Services Three.js grid scan |
| 21 | `scripts/service-panel-shaders.js` | Service panel shaders |
| 22 | `scripts/services-scroll-story.js` | Services scroll story |
| 23 | `scripts/work-gallery.js` | Work gallery |
| 24 | `scripts/scrambled-text.js` | Scrambled text |
| 25 | `scripts/header-controls.js` | Sound/fullscreen |
| 26 | `scripts/language-controls.js` | Language buttons |
| 27 | `scripts/contact-interactions.js` | Contact form/modal |
| 28 | `scripts/scroll-type-effects.js` | Scroll type |
| 29 | `scripts/reveal-effects.js` | Reveals |
| 30 | `scripts/site-navigation.js` | Top/focus navigation |
| 31 | `scripts/precision-cursor.js` | Precision cursor |
| 32 | `scripts/services-image-trail.js` | Services image trail |
| 33 | `scripts/hero-card-events.js` | Hero card events |
| 34 | `scripts/works-hover-preview.js` | Works hover preview |
| 35 | `scripts/works-transition-motion.js` | Works transition motion |
| 36 | `scripts/site-clock.js` | Beijing clock |
| 37 | `scripts/bottom-nav-scroll-spy.js` | Bottom nav scroll spy |
| 38 | `scripts/clients-marquee.js` | Client marquee |
| 39 | `scripts/clients-title-interaction.js` | Client title interaction |
| 40 | `scripts/portrait-motion.js` | About portrait motion |
| 41 | `scripts/hero-ripples.js` | Hero ripple effects |
| 42 | `scripts/hero-steps.js` | Hero wheel/touch input |
| 43 | `scripts/entry.js` | Entry interaction |

## Page System to File Mapping

- Entry: `index.html`, `styles/home.css`, `scripts/entry.js`, `scripts/app-bootstrap.js`.
- Hero: `index.html`, `styles/home.css`, `scripts/hero-*.js`, `scripts/runtime-bridge.js`.
- About: `index.html`, `styles/about.css`, `scripts/portrait-motion.js`, `videos/Video 8.mp4`.
- Services: `index.html`, `styles/services.css`, `scripts/services-*.js`, `scripts/service-panel-shaders.js`, `three.min.js`.
- Works: `index.html`, `styles/works.css`, `scripts/works-hover-preview.js`, `scripts/works-transition-motion.js`, `site-data.js`.
- Gallery: `index.html`, `styles/work-gallery.css`, `scripts/work-gallery.js`, `site-data.js`, `images/works/`.
- Clients: `index.html`, `styles/clients.css`, `scripts/clients-marquee.js`, `scripts/clients-title-interaction.js`.
- Contact: `index.html`, `styles/contact.css`, `scripts/contact-interactions.js`, `images/wechat-qr.jpg`.
- Navigation: `index.html`, `styles/navigation.css`, `scripts/bottom-nav-scroll-spy.js`, `scripts/site-navigation.js`, `scripts/header-controls.js`.

## If Changing Hero

Read first:

- `styles/home.css`
- `scripts/hero-card-config.js`
- `scripts/hero-card-layout.js`
- `scripts/hero-card-animation.js`
- `scripts/hero-water-surface.js`
- `scripts/hero-step-runtime.js`
- `scripts/hero-sequence-runtime.js`
- `scripts/hero-actions-runtime.js`
- `scripts/hero-focus-runtime.js`
- `scripts/runtime-bridge.js`
- Hero markup in `index.html`

## If Changing Works

Read first:

- Works markup in `index.html`
- `styles/works.css`
- `styles/work-gallery.css`
- `scripts/work-gallery.js`
- `scripts/works-hover-preview.js`
- `scripts/works-transition-motion.js`
- `site-data.js`

## If Changing Services

Read first:

- Services markup in `index.html`
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `scripts/services-entry-grid-scan.js`
- `scripts/service-panel-shaders.js`
- `scripts/services-image-trail.js`
- `three.min.js` only as an external dependency, not for editing

## If Changing Copy

Start with `site-data.js`. Also inspect visible fallback text in `index.html` for first-render consistency.

## Forbidden Casual Edit Zones

- `three.min.js`
- Asset directories
- `index.html` script order
- `scripts/work-gallery.js`
- Hero WebGL/card/step modules
- Services WebGL/scroll modules

## Safer Edit Zones

- `docs/`
- `tools/`
- Copy keys in `site-data.js`
- Section-local CSS in matching module files
- Small accessibility labels in `index.html`

## Future Refactor Suggestions

- Add checks before refactors.
- Document runtime globals in code comments or docs.
- Split `work-gallery.js` only after preserving gallery behavior with explicit QA.
- Avoid CSS splitting churn until JS and docs are stable.
