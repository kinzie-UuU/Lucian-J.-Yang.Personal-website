# Module Map

## CSS Load Order

| Order | File | Purpose |
|---:|---|---|
| 1 | `styles/fonts.css` | Local font faces |
| 2 | `styles.css` | Tokens, reset, global states |
| 4 | `styles/cursor.css` | Precision cursor |
| 5 | `styles/typography.css` | Shared typography |
| 6 | `styles/home.css` | Entry and Hero base layout, CRT broadcast, and wordmark |
| 7 | `styles/entry-hero-experience.css` | Entry key collapse, Hero reveal curtains, and Hero-to-About black curtain |
| 8 | `styles/about.css` | Portrait reveal and About curtain |
| 9 | `styles/services.css` | Services natural section and accordion |
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
| 3 | `scripts/hero-state-runtime.js` | Hero state |
| 4 | `scripts/hero-sequence-runtime.js` | Hero sequence reset/init |
| 5 | `scripts/runtime-bridge.js` | Shared runtime bridge |
| 6 | `scripts/app-bootstrap.js` | App startup |
| 7 | `scripts/static-text-runtime.js` | Static i18n text |
| 8 | `scripts/language-runtime.js` | Language orchestration |
| 9 | `scripts/flip-text.js` | Flip text |
| 10 | `script.js` | Calls app init |
| 12 | `scripts/services-scroll-story.js` | Services i18n text rebuild and accordion activation |
| 15 | `scripts/work-gallery.js` | Work gallery |
| 16 | `scripts/scrambled-text.js` | Scrambled text |
| 17 | `scripts/header-controls.js` | Sound/fullscreen/top controls |
| 18 | `scripts/language-controls.js` | Language buttons |
| 19 | `scripts/contact-interactions.js` | Contact form/modal |
| 20 | `scripts/scroll-type-effects.js` | Scroll type |
| 21 | `scripts/reveal-effects.js` | Reveals |
| 22 | `scripts/precision-cursor.js` | Precision cursor |
| 23 | `scripts/works-hover-preview.js` | Works hover preview |
| 25 | `scripts/section-flow.js` | Section jumps, hash handling, active nav, three-item bottom-nav paper transition |
| 26 | `scripts/site-clock.js` | Beijing clock |
| 27 | `scripts/bottom-nav-scroll-spy.js` | Section flow refresh bridge |
| 28 | `scripts/clients-marquee.js` | Client marquee |
| 29 | `scripts/clients-title-interaction.js` | Client title interaction |
| 30 | `scripts/portrait-motion.js` | About portrait reveal/scrub |
| 32 | `scripts/vendor/gsap/gsap.min.js` | GSAP runtime |
| 33 | `scripts/vendor/gsap/MorphSVGPlugin.min.js` | GSAP MorphSVG plugin |
| 34 | `scripts/scroll-curtain-transitions.js` | Works-to-Contact curtain |
| 35 | `scripts/entry-key-model.js` | Entry archive marquee and progress loader |
| 36 | `scripts/entry-hero-experience.js` | Entry interactions/replay, Hero reveal curtains, and Hero-to-About black-curtain handoff |

## Page System to File Mapping

- Entry: `index.html`, `styles/home.css`, `styles/entry-hero-experience.css`, `scripts/entry-key-model.js`, `scripts/entry-hero-experience.js`.
- Hero: `index.html`, `styles/home.css`, `styles/entry-hero-experience.css`, `scripts/hero-state-runtime.js`, `scripts/hero-sequence-runtime.js`, `scripts/hero-tv-controls.js`, `scripts/entry-hero-experience.js`, `images/works/aigc-video/莉栗说新年篇.mp4`.
- About/Portrait: `index.html`, `styles/about.css`, `scripts/portrait-motion.js`, `videos/portrait-scrub-60fps.mp4`, `images/9999.webp`.
- Services: `index.html`, `styles/services.css`, `scripts/services-scroll-story.js`, `site-data.js`; current rebuild connects directly after About as a normal page section with a left "Why Work With Me" statement block and right interactive service cards.
- Works: `index.html`, `styles/works.css`, `scripts/works-hover-preview.js`, `scripts/section-flow.js`, `site-data.js`.
- Scroll curtains: `index.html`, `styles/shared-motion.css`, `scripts/scroll-curtain-transitions.js`, GSAP vendor files; natural mouse-wheel handoffs are separate from bottom-nav click transitions.
- Gallery: `index.html`, `styles/work-gallery.css`, `scripts/work-gallery.js`, `site-data.js`, `images/works/`.
- Clients: `index.html`, `styles/clients.css`, `scripts/clients-marquee.js`, `scripts/clients-title-interaction.js`.
- Contact: `index.html`, `styles/contact.css`, `scripts/contact-interactions.js`, `images/wechat-qr.jpg`.
- Navigation: `index.html`, `styles/navigation.css`, `scripts/section-flow.js`, `scripts/bottom-nav-scroll-spy.js`, `scripts/header-controls.js`; current bottom nav is an avatar dock that expands to About, Services, Works, and Contact; Works also uses natural scroll and Works rows.

## High-Risk Edit Zones

- `index.html` structure and script order.
- `site-data.js` data schema and asset references.
- `scripts/work-gallery.js`.
- Hero CRT/video/entry scripts.
- Services and section-flow scripts.
- `styles/home.css`, `styles/services.css`, `styles/work-gallery.css`, `styles/navigation.css`.
- `three.min.js` and vendor files.

## Safer Edit Zones

- `docs/` and `tools/`.
- Copy-only edits in `site-data.js` with both languages updated.
- Section-local CSS in the matching module.
- Small accessibility labels that preserve existing class/id contracts.
