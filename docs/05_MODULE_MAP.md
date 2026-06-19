# Module Map

## CSS Load Order

| Order | File | Purpose |
|---:|---|---|
| 1 | `styles/fonts.css` | Local font faces |
| 2 | `styles.css` | Tokens, reset, global states |
| 3 | `styles/liquid-glass.css` | Fixed liquid glass field |
| 4 | `styles/cursor.css` | Precision cursor |
| 5 | `styles/typography.css` | Shared typography |
| 6 | `styles/home.css` | Entry and Hero base layout, key/model/water surfaces |
| 7 | `styles/entry-hero-experience.css` | Entry key collapse, Hero reveal curtains, and Hero-to-About black curtain |
| 8 | `styles/about.css` | Portrait reveal and About curtain |
| 9 | `styles/services.css` | Services sticky narrative |
| 10 | `styles/works.css` | Works rows and works transition |
| 11 | `styles/clients.css` | Clients section |
| 12 | `styles/work-gallery.css` | Gallery overlay |
| 13 | `styles/contact.css` | Contact |
| 14 | `styles/navigation.css` | Top controls and bottom nav |
| 15 | `styles/responsive.css` | Responsive overrides |
| 16 | `styles/shared-motion.css` | Reveal and scroll curtain helpers |

## JS Load Order

This list mirrors the current `index.html` order.

| Order | File | Purpose |
|---:|---|---|
| 0 | `three.min.js` | Local Three.js dependency |
| 1 | `site-data.js` | Copy/data |
| 2 | `scripts/audio-feedback.js` | Audio and background music |
| 3 | `scripts/hero-wireframe.js` | Hero SVG wireframe |
| 4 | `scripts/hero-water-surface.js` | Hero WebGL water |
| 5 | `scripts/hero-state-runtime.js` | Hero state |
| 6 | `scripts/hero-sequence-runtime.js` | Hero sequence reset/init |
| 7 | `scripts/runtime-bridge.js` | Shared runtime bridge |
| 8 | `scripts/app-bootstrap.js` | App startup |
| 9 | `scripts/static-text-runtime.js` | Static i18n text |
| 10 | `scripts/language-runtime.js` | Language orchestration |
| 11 | `scripts/flip-text.js` | Flip text |
| 12 | `script.js` | Calls app init |
| 13 | `scripts/liquid-glass-field.js` | Full-viewport liquid field |
| 14 | `scripts/hero-glb-model.js` | Hero GLB lion model |
| 15 | `scripts/services-scroll-story.js` | Services title gate, bridge preview/autoplay guard, About handoff cleanup, locked automatic service sequence, start/complete events, and flat in-tunnel inscription |
| 16 | `scripts/services-prismatic-burst.js` | Services black-water PrismaticBurst entry canvas and progress bridge |
| 17 | `scripts/services-time-tunnel-shader.js` | Services local WebGL2 time-tunnel layer |
| 18 | `scripts/work-gallery.js` | Work gallery |
| 20 | `scripts/scrambled-text.js` | Scrambled text |
| 21 | `scripts/header-controls.js` | Sound/fullscreen/top controls |
| 22 | `scripts/language-controls.js` | Language buttons |
| 23 | `scripts/contact-interactions.js` | Contact form/modal |
| 24 | `scripts/scroll-type-effects.js` | Scroll type |
| 25 | `scripts/reveal-effects.js` | Reveals |
| 26 | `scripts/precision-cursor.js` | Precision cursor |
| 27 | `scripts/works-hover-preview.js` | Works hover preview |
| 28 | `scripts/works-transition-motion.js` | Works transition motion |
| 29 | `scripts/section-flow.js` | Section jumps, hash handling, active nav, three-item bottom-nav paper transition |
| 30 | `scripts/site-clock.js` | Beijing clock |
| 31 | `scripts/bottom-nav-scroll-spy.js` | Section flow refresh bridge |
| 32 | `scripts/clients-marquee.js` | Client marquee |
| 33 | `scripts/clients-title-interaction.js` | Client title interaction |
| 34 | `scripts/portrait-motion.js` | About portrait reveal/scrub |
| 35 | `scripts/about-curtain.js` | Hero-style About-to-Services timed bridge with black curtain marker, real Services stage preview, input lock, completion event, and Services playback/release suppression |
| 36 | `scripts/hero-ripples.js` | Hero ripple effects |
| 37 | `scripts/vendor/gsap/gsap.min.js` | GSAP runtime |
| 38 | `scripts/vendor/gsap/MorphSVGPlugin.min.js` | GSAP MorphSVG plugin |
| 39 | `scripts/scroll-curtain-transitions.js` | Works-to-Contact curtain |
| 40 | `scripts/entry-key-model.js` | 3D key model and progress |
| 41 | `scripts/entry-hero-experience.js` | Entry interactions/replay, Hero reveal curtains, and Hero-to-About black-curtain handoff |

## Page System to File Mapping

- Entry: `index.html`, `styles/home.css`, `styles/entry-hero-experience.css`, `scripts/entry-key-model.js`, `scripts/entry-hero-experience.js`, `models/entry-key.glb`.
- Hero: `index.html`, `styles/home.css`, `styles/entry-hero-experience.css`, `styles/liquid-glass.css`, `scripts/hero-*.js`, `scripts/entry-hero-experience.js`, `scripts/liquid-glass-field.js`, `models/lion_head/`.
- About/Portrait: `index.html`, `styles/about.css`, `scripts/portrait-motion.js`, `scripts/about-curtain.js`, `videos/Video 8.mp4`, `images/9999.png`.
- Services: `index.html`, `styles/services.css`, `scripts/about-curtain.js`, `scripts/services-scroll-story.js`, `scripts/services-prismatic-burst.js`, `scripts/services-time-tunnel-shader.js`, `site-data.js`; current rebuild has a Hero-style timed About-to-Services bridge that previews the real Services stage instead of injecting a duplicate title, black-water PrismaticBurst title gate that yields to a local WebGL2 time-tunnel layer, natural-scroll autoplay after the bridge, direct-nav suppression at the title gate, slower automatic six-step flat in-tunnel service inscriptions without adjacent ghost carryover, residue lines, or auxiliary progress rail, Services-owned suppression so About does not re-trigger after playback, and a final jump to the Works transition copy screen.
- Works: `index.html`, `styles/works.css`, `scripts/works-hover-preview.js`, `scripts/works-transition-motion.js`, `scripts/section-flow.js`, `site-data.js`.
- Scroll curtains: `index.html`, `styles/shared-motion.css`, `scripts/scroll-curtain-transitions.js`, GSAP vendor files; natural mouse-wheel handoffs are separate from bottom-nav click transitions.
- Gallery: `index.html`, `styles/work-gallery.css`, `scripts/work-gallery.js`, `site-data.js`, `images/works/`.
- Clients: `index.html`, `styles/clients.css`, `scripts/clients-marquee.js`, `scripts/clients-title-interaction.js`.
- Contact: `index.html`, `styles/contact.css`, `scripts/contact-interactions.js`, `images/wechat-qr.jpg`.
- Navigation: `index.html`, `styles/navigation.css`, `scripts/section-flow.js`, `scripts/bottom-nav-scroll-spy.js`, `scripts/header-controls.js`; current bottom nav is an avatar dock that expands to About, Services, Works, and Contact; Works also uses scroll/Services completion and Works rows.

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
