# Module Map

## CSS Load Order

| Order | File | Purpose |
|---:|---|---|
| 1 | `styles/fonts.css` | Local font faces |
| 2 | `styles.css` | Tokens, reset, global states |
| 3 | `styles/liquid-glass.css` | Fixed liquid glass field |
| 4 | `styles/cursor.css` | Precision cursor |
| 5 | `styles/typography.css` | Shared typography |
| 6 | `styles/home.css` | Entry, Hero, key/model/water/curtain |
| 7 | `styles/about.css` | Portrait reveal and About curtain |
| 8 | `styles/services.css` | Services sticky narrative |
| 9 | `styles/works.css` | Works rows and works transition |
| 10 | `styles/clients.css` | Clients section |
| 11 | `styles/work-gallery.css` | Gallery overlay |
| 12 | `styles/contact.css` | Contact |
| 13 | `styles/navigation.css` | Top controls, bottom nav, Works rail |
| 14 | `styles/responsive.css` | Responsive overrides |
| 15 | `styles/shared-motion.css` | Reveal and scroll curtain helpers |

## JS Load Order

This list mirrors the current `index.html` order.

| Order | File | Purpose |
|---:|---|---|
| 0 | `three.min.js` | Local Three.js dependency |
| 1 | `site-data.js` | Copy/data |
| 2 | `scripts/audio-feedback.js` | Audio and background music |
| 3 | `scripts/hero-wireframe.js` | Hero SVG wireframe |
| 4 | `scripts/hero-water-surface.js` | Hero WebGL water |
| 5 | `scripts/hero-curtain.js` | Hero-to-About curtain trigger |
| 6 | `scripts/hero-state-runtime.js` | Hero state |
| 7 | `scripts/hero-sequence-runtime.js` | Hero sequence reset/init |
| 8 | `scripts/runtime-bridge.js` | Shared runtime bridge |
| 9 | `scripts/app-bootstrap.js` | App startup |
| 10 | `scripts/static-text-runtime.js` | Static i18n text |
| 11 | `scripts/language-runtime.js` | Language orchestration |
| 12 | `scripts/flip-text.js` | Flip text |
| 13 | `script.js` | Calls app init |
| 14 | `scripts/liquid-glass-field.js` | Full-viewport liquid field |
| 15 | `scripts/hero-glb-model.js` | Hero GLB lion model |
| 16 | `scripts/services-scroll-story.js` | Services scroll story |
| 17 | `scripts/work-gallery.js` | Work gallery |
| 18 | `scripts/works-side-rail.js` | Works side rail |
| 19 | `scripts/scrambled-text.js` | Scrambled text |
| 20 | `scripts/header-controls.js` | Sound/fullscreen/top controls |
| 21 | `scripts/language-controls.js` | Language buttons |
| 22 | `scripts/contact-interactions.js` | Contact form/modal |
| 23 | `scripts/scroll-type-effects.js` | Scroll type |
| 24 | `scripts/reveal-effects.js` | Reveals |
| 25 | `scripts/precision-cursor.js` | Precision cursor |
| 26 | `scripts/works-hover-preview.js` | Works hover preview |
| 27 | `scripts/works-transition-motion.js` | Works transition motion |
| 28 | `scripts/section-flow.js` | Section jumps, hash handling, active nav, bottom-nav paper transition |
| 29 | `scripts/site-clock.js` | Beijing clock |
| 30 | `scripts/bottom-nav-scroll-spy.js` | Section flow refresh bridge |
| 31 | `scripts/clients-marquee.js` | Client marquee |
| 32 | `scripts/clients-title-interaction.js` | Client title interaction |
| 33 | `scripts/portrait-motion.js` | About portrait reveal/scrub |
| 34 | `scripts/about-curtain.js` | Passive About-to-Services visual marker |
| 35 | `scripts/hero-ripples.js` | Hero ripple effects |
| 36 | `scripts/vendor/gsap/gsap.min.js` | GSAP runtime |
| 37 | `scripts/vendor/gsap/MorphSVGPlugin.min.js` | GSAP MorphSVG plugin |
| 38 | `scripts/scroll-curtain-transitions.js` | Services-to-Works and Works-to-Contact curtains |
| 39 | `scripts/entry-key-model.js` | 3D key model and progress |
| 40 | `scripts/entry.js` | Entry interaction and replay |

## Page System to File Mapping

- Entry: `index.html`, `styles/home.css`, `scripts/entry-key-model.js`, `scripts/entry.js`, `models/entry-key.glb`.
- Hero: `index.html`, `styles/home.css`, `styles/liquid-glass.css`, `scripts/hero-*.js`, `scripts/liquid-glass-field.js`, `models/lion_head/`.
- About/Portrait: `index.html`, `styles/about.css`, `scripts/portrait-motion.js`, `scripts/about-curtain.js`, `videos/Video 8.mp4`, `images/9999.png`.
- Services: `index.html`, `styles/services.css`, `scripts/services-scroll-story.js`, `site-data.js`.
- Works: `index.html`, `styles/works.css`, `scripts/works-hover-preview.js`, `scripts/works-transition-motion.js`, `scripts/works-side-rail.js`, `scripts/section-flow.js`, `site-data.js`.
- Scroll curtains: `index.html`, `styles/shared-motion.css`, `scripts/scroll-curtain-transitions.js`, GSAP vendor files; natural mouse-wheel handoffs are separate from bottom-nav click transitions.
- Gallery: `index.html`, `styles/work-gallery.css`, `scripts/work-gallery.js`, `site-data.js`, `images/works/`.
- Clients: `index.html`, `styles/clients.css`, `scripts/clients-marquee.js`, `scripts/clients-title-interaction.js`.
- Contact: `index.html`, `styles/contact.css`, `scripts/contact-interactions.js`, `images/wechat-qr.jpg`.
- Navigation: `index.html`, `styles/navigation.css`, `scripts/section-flow.js`, `scripts/bottom-nav-scroll-spy.js`, `scripts/works-side-rail.js`, `scripts/header-controls.js`.

## High-Risk Edit Zones

- `index.html` structure and script order.
- `site-data.js` data schema and asset references.
- `scripts/work-gallery.js`.
- Hero WebGL/model/liquid scripts.
- Services scroll and section-flow scripts.
- `styles/home.css`, `styles/services.css`, `styles/work-gallery.css`, `styles/navigation.css`.
- `three.min.js` and vendor files.

## Safer Edit Zones

- `docs/` and `tools/`.
- Copy-only edits in `site-data.js` with both languages updated.
- Section-local CSS in the matching module.
- Small accessibility labels that preserve existing class/id contracts.
