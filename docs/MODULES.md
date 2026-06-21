# Feature Modules

This document maps each user-facing system to its owning files, runtime contracts, and focused QA. Update it when a feature gains or loses files, events, globals, DOM ids, data fields, or QA requirements.

## Detailed Module Docs

Use this file as the compact map. Use the per-module playbooks for implementation details, dependencies, and change checklists:

- `docs/modules/core-runtime.md`
- `docs/modules/entry.md`
- `docs/modules/hero.md`
- `docs/modules/about-portrait.md`
- `docs/modules/services.md`
- `docs/modules/works-gallery.md`
- `docs/modules/scroll-curtains.md`
- `docs/modules/navigation-header.md`
- `docs/modules/language-text-effects.md`
- `docs/modules/clients.md`
- `docs/modules/contact.md`

## Core Runtime

Owned files:

- `index.html`
- `three.min.js`
- `site-data.js`
- `script.js`
- `scripts/app-bootstrap.js`
- `scripts/runtime-bridge.js`
- `scripts/hero-state-runtime.js`
- `scripts/hero-sequence-runtime.js`

Responsibilities:

- Preserve page section structure and script/CSS load order.
- Initialize app state, reduced-motion detection, language controller, Hero state, and Hero sequence controller.
- Install `window.LucianRuntime` as the shared bridge for audio, language, gallery closing, cursor state, field pointer state, and Hero reset/resize helpers.

Contracts:

- `script.js` calls `window.initLucianApp?.()` and assigns `window.LucianApp`.
- `runtime-bridge.js` must load before modules that use `window.LucianRuntime`.
- `site-data.js` must load before language, Works, Services text rebuild, and Gallery modules.

QA:

- `node tools/check-project.js`
- `node --check script.js`
- `node --check site-data.js`
- Browser console has no site errors on initial load.

## Entry

Owned files:

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `scripts/entry-key-model.js`
- `scripts/entry-hero-experience.js`

Responsibilities:

- Render the entry screen, archive year marquee, progress text/bar, auto-enter, and scroll/touch entry.
- Bottom avatar dock expansion for main navigation.
- Dispatch the site-entered state and coordinate Entry-to-Hero curtains.

Contracts:

- DOM: `#entry-screen`, `#entry-progress`, `#entry-progress-fill`, `#entry-progress-bar`, `#entry-year-marquee-track`.
- Global: `window.LucianEntryKey`.
- Events: `entry-key-ready`, `lucian:site-entered`, `lucian:return-to-entry`.

QA:

- Entry progress line renders.
- Auto-enter works.
- Scroll/touch enter works.
- Bottom avatar dock expands without replaying Entry.

## Hero

Owned files:

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `scripts/entry-hero-experience.js`
- `images/works/aigc-video/莉栗说新年篇.mp4`

Responsibilities:

- Render CRT AIGC video broadcast, and layered wordmark.
- Manage Hero scroll progress and Hero-to-About black-curtain handoff.

Contracts:

- DOM: `#hero-stage`, `#hero-broadcast-scene`, `#hero-tv-video`.
- Asset: `images/works/aigc-video/莉栗说新年篇.mp4`.
- Event: `lucian:hero-about-handoff`.

QA:

- Liquid field is visible and responsive.
- CRT video loads and plays inside the screen.
- First wheel after Entry release scrolls Hero instead of being swallowed by the post-entry guard.
- Hero-to-About handoff lands correctly.
## About And Portrait

Owned files:

- `index.html`
- `styles/about.css`
- `scripts/portrait-motion.js`
- `scripts/about-curtain.js`
- `videos/portrait-scrub-60fps.mp4`
- `images/9999.png`

Responsibilities:

- Render portrait media, fallback image, About copy reveal, wheel-controlled portrait video scrub, and About-to-Services bridge.
- Clean up legacy bridge state on entry, page show/hide, and programmatic jumps.

Contracts:

- DOM: `#about`, `.portrait-about-wrapper`, `.portrait-canvas`, `#portrait-video`, `.about-curtain`.
- Globals: `window.LucianAboutMotion`, `window.LucianAboutScrollReveal`.
- Events consumed: `lucian:programmatic-section-jump`, `lucian:site-entered`.
- Event produced by the bridge: `lucian:about-services-bridge-complete`.

QA:

- Portrait fallback appears before video readiness.
- Wheel down scrubs the portrait from side to front; wheel up reverses from front to side without using pointer position.
- Natural scroll to Services runs the bridge once.
- Direct nav does not leave black-curtain residue.

## Services

Owned files:

- `index.html`
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `scripts/services-prismatic-burst.js`
- `scripts/services-time-tunnel-shader.js`
- `site-data.js`

Responsibilities:

- Render Services sticky title gate.
- Run PrismaticBurst entry canvas and local WebGL2 time-tunnel canvas.
- Own the locked automatic service inscription sequence, including held reading beats for each service message.
- Land on the Works transition copy screen after the Services sequence completes.

Contracts:

- DOM: `#services`, `.services-sticky`, `#services-prismatic-canvas`, `#services-time-canvas`, `.services-title-stage`, `.services-card-stage`.
- Data: service title/body text comes from `site-data.js` through i18n keys and the Services text rebuild path.
- Events consumed: `lucian:about-services-bridge-complete`, `lucian:programmatic-section-jump`, `lucian:site-entered`.
- Events produced: `lucian:services-sequence-start`, `lucian:services-sequence-complete`.
- Services owns playback/release suppression while its sequence is active.

QA:

- Title gate appears on direct nav.
- Natural About handoff starts Services autoplay after the bridge.
- PrismaticBurst yields to time tunnel.
- Six service messages play slowly enough to read, with held beats and no adjacent ghost carryover.
- Message 06 remains readable through its final hold before the sequence releases to Works.
- Sequence lands on Works transition copy.

## Works And Gallery

Owned files:

- `index.html`
- `styles/works.css`
- `styles/work-gallery.css`
- `scripts/works-hover-preview.js`
- `scripts/works-transition-motion.js`
- `scripts/work-gallery.js`
- `scripts/section-flow.js`
- `site-data.js`
- `images/works/`

Responsibilities:

- Render Works category rows, hover preview, Works transition copy, Gallery overlay, category browsing, and project detail pages.
- Keep gallery language refreshed when language changes.
- Support Works section state around scroll, Services completion, row/rail gallery entry, and non-bottom-nav access.

Contracts:

- DOM: `#works`, Works row data attributes, Gallery overlay root and Gallery back/close controls.
- Data: `worksData`, `workGalleryImages`, `workGalleryProjects`, `galleryText`.
- Global: `window.LucianWorkGallery`.
- Events consumed: `lucian:return-to-entry`, `lucian:programmatic-section-jump`, `lucian:site-entered`.

QA:

- Every Works row opens the expected gallery/category.
- Hover preview follows rows and does not obscure controls.
- Side rail opens category/project targets.
- Gallery open/close/detail/back work in both languages.
- No horizontal overflow on desktop or mobile.

## Scroll Curtains

Owned files:

- `index.html`
- `styles/shared-motion.css`
- `scripts/scroll-curtain-transitions.js`
- `scripts/vendor/gsap/gsap.min.js`
- `scripts/vendor/gsap/MorphSVGPlugin.min.js`

Responsibilities:

- Own the Works-to-Contact curtain and scroll lock during that handoff.
- Reset curtain state on return-to-entry and programmatic section jumps.

Contracts:

- GSAP and MorphSVG must load immediately before `scroll-curtain-transitions.js`.
- Events consumed: `lucian:return-to-entry`, `lucian:programmatic-section-jump`.

QA:

- Natural scroll from Works to Contact plays curtain.
- Bottom-nav jumps do not accidentally trigger natural curtain flow.
- Scroll lock releases after transition.

## Navigation And Header Controls

Owned files:

- `index.html`
- `styles/navigation.css`
- `scripts/section-flow.js`
- `scripts/bottom-nav-scroll-spy.js`
- `scripts/header-controls.js`
- `scripts/language-controls.js`
- `scripts/site-clock.js`
- `scripts/precision-cursor.js`

Responsibilities:

- Top meta controls: sound, language, fullscreen, Beijing clock.
- Bottom nav: avatar-triggered section jumps for About, Services, Works, and Contact, active state, paper transition behavior.
- Precision cursor and guide state during entry.

Contracts:

- DOM: `#sound-toggle`, `#fullscreen-toggle`, `.lang-button`, bottom nav anchors for About/Services/Works/Contact, `#precision-cursor`, `#precision-guides`.
- Runtime: uses `window.LucianRuntime`.
- Event produced by section flow: `lucian:programmatic-section-jump`.
- Events consumed by scroll spy: `lucian:programmatic-section-jump`, `lucian:site-entered`.

QA:

- Language switch updates visible copy and Gallery copy.
- Sound state persists and can resume after user gesture.
- Fullscreen button state reflects browser fullscreen.
- Bottom-nav paper transition settles under the browser smoke budget without leaving overlay nodes.
- Bottom nav active state follows the current four nav targets and programmatic jumps.

## Language And Text Effects

Owned files:

- `site-data.js`
- `scripts/static-text-runtime.js`
- `scripts/language-runtime.js`
- `scripts/language-controls.js`
- `scripts/flip-text.js`
- `scripts/scrambled-text.js`
- `scripts/scroll-type-effects.js`
- `scripts/reveal-effects.js`
- `styles/typography.css`
- `styles/shared-motion.css`

Responsibilities:

- Apply i18n text to `[data-i18n]` nodes.
- Refresh feature-specific copy after language changes.
- Run flip, scramble, scroll type, and reveal effects while respecting reduced motion.

Contracts:

- Data: `i18n` keys must exist for both `zh` and `en` when a visible node is translated.
- Globals: `window.LucianStaticText`, `window.LucianFlipText`, `window.LucianScrambledText`, `window.LucianAboutScrollReveal`.
- Language runtime refreshes Services, Gallery, Works flowing menu, reveal, and text effects.

QA:

- Switch `zh-CN` / `en` and inspect each section.
- Open Gallery, switch language, and confirm chrome/detail text refreshes.

## Clients

Owned files:

- `index.html`
- `styles/clients.css`
- `scripts/clients-marquee.js`
- `scripts/clients-title-interaction.js`

Responsibilities:

- Render selected-client credibility copy.
- Animate marquee and title character interaction.

Contracts:

- Uses reduced-motion preferences.
- Uses `window.LucianRuntime` for UI tone where available.

QA:

- Marquee loops without jumps.
- Reduced motion pauses or simplifies animation.
- Title interaction resets on pointer leave.

## Contact

Owned files:

- `index.html`
- `styles/contact.css`
- `scripts/contact-interactions.js`
- `images/wechat-qr.jpg`

Responsibilities:

- Render contact form, social links, QR modal, and toast.
- Build Gmail compose URL from form values.

Contracts:

- DOM: contact form fields, submit button, toast, WeChat trigger/modal/backdrop/close controls.
- External action: opens Gmail compose in a new tab/window.

QA:

- Required form behavior is sensible.
- Gmail URL contains expected subject/body.
- QR modal opens, closes by button/backdrop/Escape, and restores focus.
