# Project Structure

This is a pure static personal packaging-design portfolio. It keeps `index.html` as the only page entry and loads modular CSS, plain browser JavaScript, local models, images, video, audio, and fonts directly. There is no package manager, framework, bundler, or build step.

## Root Files

- `index.html`: page markup plus ordered stylesheet/script references.
- `styles.css`: global tokens, reset, document/body states, and shared base rules.
- `script.js`: one-line application entry that calls `window.initLucianApp()`.
- `site-data.js`: bilingual text, work taxonomy, gallery image data, project data, and gallery copy.
- `three.min.js`: local Three.js dependency.

## Asset Directories

- `images/`: portrait image, QR code, favicons, work images, and image README files.
- `models/`: entry key GLB and Hero lion-head GLTF/bin/textures.
- `videos/`: About portrait video.
- `audio/`: background music.
- `fonts/`: local web fonts.

## CSS Modules

- `styles/fonts.css`: font-face declarations.
- `styles.css`: global tokens/base document states.
- `styles/liquid-glass.css`: fixed full-viewport liquid glass field.
- `styles/cursor.css`: precision cursor.
- `styles/typography.css`: shared text effects and section typography.
- `styles/home.css`: entry screen, 3D key entry transition, Hero stage, water, GLB model, Hero curtain.
- `styles/about.css`: portrait reveal, About copy, About-to-Services curtain.
- `styles/services.css`: Services title gate, portal canvas sizing, time-tunnel stage, automatic sequence, and responsive service inscription styles.
- `styles/works.css`: works rows, works transition, hover preview, clients link.
- `styles/clients.css`: clients title and marquee.
- `styles/work-gallery.css`: gallery overlay, category/project browsing, details.
- `styles/contact.css`: contact grid, Gmail form, social links, QR modal.
- `styles/navigation.css`: top controls, bottom nav, Works side rail.
- `styles/responsive.css`: cross-section responsive corrections.
- `styles/shared-motion.css`: reveal helpers and scroll curtain transition styles.

## JS Modules

- Bootstrap/runtime: `app-bootstrap.js`, `runtime-bridge.js`, `script.js`.
- Entry: `entry.js`, `entry-key-model.js`.
- Hero: `hero-wireframe.js`, `hero-water-surface.js`, `hero-curtain.js`, `hero-state-runtime.js`, `hero-sequence-runtime.js`, `liquid-glass-field.js`, `hero-glb-model.js`, `hero-ripples.js`.
- About: `portrait-motion.js`, `about-curtain.js`.
- Services/section flow: `services-scroll-story.js`, `section-flow.js`; Services owns the timed sequence that lands on the Works transition copy screen, while `scroll-curtain-transitions.js` owns Works-to-Contact.
- Works/gallery: `work-gallery.js`, `works-side-rail.js`, `works-hover-preview.js`, `works-transition-motion.js`.
- Navigation/UI: `section-flow.js` for the three-item bottom-nav paper transitions/hash jumps, `header-controls.js`, `bottom-nav-scroll-spy.js`, `site-clock.js`, `precision-cursor.js`.
- Language/text/motion: `static-text-runtime.js`, `language-runtime.js`, `language-controls.js`, `flip-text.js`, `scrambled-text.js`, `scroll-type-effects.js`, `reveal-effects.js`.
- Clients/contact/audio: `clients-marquee.js`, `clients-title-interaction.js`, `contact-interactions.js`, `audio-feedback.js`.
- Vendor: `scripts/vendor/gsap/gsap.min.js`, `scripts/vendor/gsap/MorphSVGPlugin.min.js` for scroll curtain morphing.

## Audit Notes

- Keep script order in `index.html` unless the dependency chain is re-audited.
- Keep `three.min.js` as a local dependency and do not hand-edit it.
- Do not rename or move existing assets without checking `site-data.js`, `index.html`, and CSS references.
- After structural edits, run `node tools/check-project.js`, JS syntax checks for touched files, and browser smoke QA when interaction or layout changes.
