# Module Map

## CSS Load Order

| Order | File | Purpose |
|---:|---|---|
| 1 | `styles/fonts.css` | Font faces |
| 2 | `styles.css` | Tokens and base styles |
| 3 | `styles/liquid-glass.css` | Full-screen Hero liquid field |
| 4 | `styles/cursor.css` | Precision cursor |
| 5 | `styles/typography.css` | Shared typography |
| 6 | `styles/home.css` | Entry, Hero, and model stage |
| 7 | `styles/about.css` | About / portrait |
| 8 | `styles/services.css` | Services |
| 9 | `styles/works.css` | Works and transition |
| 10 | `styles/clients.css` | Clients |
| 11 | `styles/work-gallery.css` | Gallery overlay |
| 12 | `styles/contact.css` | Contact |
| 13 | `styles/navigation.css` | Top and bottom navigation |
| 14 | `styles/responsive.css` | Responsive overrides |
| 15 | `styles/shared-motion.css` | Reveal and scroll motion |

## JS Load Order

| Order | File | Purpose |
|---:|---|---|
| 0 | `three.min.js` | Local Three.js dependency |
| 1 | `site-data.js` | Copy/data |
| 2 | `scripts/audio-feedback.js` | Audio |
| 3 | `scripts/hero-wireframe.js` | Hero SVG wireframe |
| 4 | `scripts/hero-water-surface.js` | Hero WebGL water |
| 5 | `scripts/hero-state-runtime.js` | Hero state object |
| 6 | `scripts/hero-sequence-runtime.js` | Hero sequence reset/init |
| 7 | `scripts/runtime-bridge.js` | Shared runtime bridge |
| 8 | `scripts/app-bootstrap.js` | App startup |
| 9 | `scripts/static-text-runtime.js` | Static i18n text |
| 10 | `scripts/language-runtime.js` | Language orchestration |
| 11 | `scripts/flip-text.js` | Flip text |
| 12 | `scripts/particle-canvas.js` | Particle helper |
| 13 | `script.js` | Calls app init |
| 14 | `scripts/liquid-glass-field.js` | Full-screen Hero liquid field |
| 15 | `scripts/hero-glb-model.js` | Hero GLB lion model |
| 16 | `scripts/services-entry-grid-scan.js` | Services Three.js grid scan |
| 17 | `scripts/service-panel-shaders.js` | Service panel shaders |
| 18 | `scripts/services-scroll-story.js` | Services scroll story |
| 19 | `scripts/work-gallery.js` | Work gallery |
| 20 | `scripts/works-side-rail.js` | Works side rail |
| 21 | `scripts/scrambled-text.js` | Scrambled text |
| 22 | `scripts/header-controls.js` | Sound/fullscreen |
| 23 | `scripts/language-controls.js` | Language buttons |
| 24 | `scripts/contact-interactions.js` | Contact form/modal |
| 25 | `scripts/scroll-type-effects.js` | Scroll type |
| 26 | `scripts/reveal-effects.js` | Reveals |
| 27 | `scripts/precision-cursor.js` | Precision cursor |
| 28 | `scripts/works-hover-preview.js` | Works hover preview |
| 29 | `scripts/works-transition-motion.js` | Works transition motion |
| 30 | `scripts/site-clock.js` | Beijing clock |
| 31 | `scripts/bottom-nav-scroll-spy.js` | Bottom nav scroll spy |
| 32 | `scripts/clients-marquee.js` | Client marquee |
| 33 | `scripts/clients-title-interaction.js` | Client title interaction |
| 34 | `scripts/portrait-motion.js` | About portrait motion |
| 35 | `scripts/hero-ripples.js` | Hero ripple effects |
| 36 | `scripts/entry.js` | Entry interaction |

## Page System to File Mapping

- Entry: `index.html`, `styles/home.css`, `scripts/entry.js`, `scripts/app-bootstrap.js`.
- Hero: `index.html`, `styles/home.css`, `styles/liquid-glass.css`, `scripts/hero-water-surface.js`, `scripts/liquid-glass-field.js`, `scripts/hero-glb-model.js`, `scripts/hero-ripples.js`, `scripts/hero-wireframe.js`, `scripts/runtime-bridge.js`.
- About: `index.html`, `styles/about.css`, `scripts/portrait-motion.js`, `videos/Video 8.mp4`.
- Services: `index.html`, `styles/services.css`, `scripts/services-*.js`, `scripts/service-panel-shaders.js`, `three.min.js`.
- Works: `index.html`, `styles/works.css`, `scripts/works-hover-preview.js`, `scripts/works-transition-motion.js`, `site-data.js`.
- Gallery: `index.html`, `styles/work-gallery.css`, `scripts/work-gallery.js`, `site-data.js`, `images/works/`.
- Clients: `index.html`, `styles/clients.css`, `scripts/clients-marquee.js`, `scripts/clients-title-interaction.js`.
- Contact: `index.html`, `styles/contact.css`, `scripts/contact-interactions.js`, `images/wechat-qr.jpg`.
- Navigation: `index.html`, `styles/navigation.css`, `scripts/bottom-nav-scroll-spy.js`, `scripts/works-side-rail.js`, `scripts/header-controls.js`.

## If Changing Hero

Read first:

- `styles/home.css`
- `styles/liquid-glass.css`
- `scripts/hero-water-surface.js`
- `scripts/liquid-glass-field.js`
- `scripts/hero-glb-model.js`
- `scripts/hero-sequence-runtime.js`
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
- `three.min.js` only as an external dependency, not for editing

## If Changing Copy

Start with `site-data.js`. Also inspect visible fallback text in `index.html` for first-render consistency.

## Forbidden Casual Edit Zones

- `three.min.js`
- Asset directories
- `index.html` script order
- `scripts/work-gallery.js`
- Hero WebGL/model/liquid modules
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
