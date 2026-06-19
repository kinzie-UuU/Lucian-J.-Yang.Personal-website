# Runtime Contracts

This site works because ordered scripts, stable DOM ids, CSS states, and `window.*` bridges agree with each other. Treat this document as the contract checklist for structural or behavioral edits.

## No-Framework Contract

- Keep `index.html` as the only page entry.
- Do not add React, Vue, Next, Vite, or another build system.
- Do not introduce a package-manager install step.
- Load local CSS and JavaScript directly from HTML.

## Script Order Contract

Critical order:

1. `three.min.js`
2. `site-data.js`
3. Hero water/curtain/state/sequence initializers
4. `runtime-bridge.js`
5. `app-bootstrap.js`
6. language/static text/effect helpers
7. `script.js`
8. liquid field and Hero model
9. Services scripts
10. Gallery and Works navigation
11. UI controls, contact, reveal, cursor, Works hover/transition, clock/nav, clients
12. portrait/about curtain/ripples
13. GSAP vendor and `scroll-curtain-transitions.js`
14. `entry-key-model.js`
15. `entry-hero-experience.js`

Changing this order requires checking every `window.init*`, `window.Lucian*`, custom event, and DOM-ready assumption touched by the moved files.

## CSS Order Contract

Global/token files load before section modules. `responsive.css` and `shared-motion.css` load near the end so they can correct cross-section layout and shared animation behavior. Do not move a module later only to win specificity unless the dependency is documented.

## Stable DOM Contracts

High-value ids and selectors used across modules:

- Entry: `#entry-screen`, `#entry-key-canvas`, `#entry-progress`, `#entry-progress-fill`, `#entry-progress-bar`.
- Hero: `#hero-stage`, `#hero-kinetic-canvas`, `#hero-ripple-canvas`, `#hero-wireframe`, `#hero-model-scene`, `#hero-model-canvas`.
- About: `#about`, `#portrait-video`, `.portrait-about-wrapper`, `.portrait-canvas`, `.about-curtain`.
- Services: `#services`, `#services-prismatic-canvas`, `#services-time-canvas`, `.services-title-stage`, `.services-card-stage`, `.service-text-panel`.
- Works/Gallery: `#works`, Works row data attributes, Gallery overlay root and Gallery back/close controls.
- Navigation/Header: `#sound-toggle`, `#fullscreen-toggle`, `.lang-button`, bottom avatar dock plus anchors for About/Services/Works/Contact, `#precision-cursor`, `#precision-guides`.

If an id/class/data attribute is used by JavaScript, changing it is a behavior change, not a styling-only change.

## Global Runtime APIs

Core globals:

- `window.initLucianApp`
- `window.LucianApp`
- `window.initLucianRuntimeBridge`
- `window.LucianRuntime`
- `window.initHeroStateRuntime`
- `window.initHeroSequenceRuntime`
- `window.initLanguageRuntime`

Feature globals:

- `window.LucianAudio`
- `window.LucianEntryKey`
- `window.LucianHeroModel`
- `window.LucianLiquidField`
- `window.LucianAboutMotion`
- `window.LucianAboutScrollReveal`
- `window.LucianWorkGallery`
- `window.LucianStaticText`
- `window.LucianFlipText`
- `window.LucianScrambledText`

Initializer-style globals should be defined before the file that calls them. Feature globals should guard optional dependencies with `?.` when called from other modules.

Entry-specific feature contracts:

- `window.LucianEntryKey.unlock()`: starts the 940ms key unlock pose. The key should already be loaded and progressing toward its front-facing pose; callers should treat this as a fire-and-forget visual cue.
- `window.LucianAudio.playUnlockTone({ delayMs })`: schedules the short lock-opening tone on the active Web Audio clock and resolves to `true` when scheduled. It may resolve/return `false` when sound is disabled, the browser has not unlocked audio, or the call is throttled.
- `window.LucianRuntime.playUnlockTone(options)`: runtime bridge wrapper for the audio method above. Entry uses `{ delayMs: 520 }` so the click lands near the key insertion.

## Shared Event Contracts

Known custom events:

- `entry-key-ready`: entry key model reports readiness.
- `lucian:site-entered`: entry has completed and the page is in the entered state.
- `lucian:return-to-entry`: legacy reset signal; dependent systems reset if a future flow dispatches it.
- `lucian:hero-about-handoff`: Hero hands off into About.
- `lucian:about-services-bridge-complete`: About-to-Services bridge finished; Services may schedule autoplay.
- `lucian:services-sequence-start`: Services automatic sequence begins.
- `lucian:services-sequence-complete`: Services automatic sequence finishes and lands on the Works transition copy screen.
- `lucian:programmatic-section-jump`: section flow performed a controlled jump; scroll-driven systems should reset or refresh.

When adding an event, document the producer, consumers, detail payload, and whether it may fire more than once per visit.

## Body And State Class Contract

Several modules coordinate through body or section state classes. Before renaming or removing state classes, search across HTML, CSS, and JS.

Common state purposes:

- entered vs entry state
- input/scroll lock state
- active handoff/curtain state
- Services playback/release suppression
- Gallery open state
- cursor visibility state

Do not use a class for both styling and hidden state unless both uses are documented.

## Data Contract

`site-data.js` is evaluated by browser scripts and by `tools/check-project.js`.

Rules:

- Keep it valid JavaScript.
- Keep both language branches complete for translated visible copy.
- Keep image paths local and rooted in existing asset folders.
- If `worksData`, `workGalleryImages`, `workGalleryProjects`, or `galleryText` schema changes, update `MODULES.md` and any consuming script notes.
- Do not rename gallery categories without checking Works rows, Gallery filters, side rail targets, and language refresh.

## Asset Contract

Asset references can come from:

- HTML attributes such as `src`, `poster`, `href`, `data-model-src`.
- CSS `url(...)`.
- `site-data.js` string fields.
- GLTF files that reference buffers/textures relative to the model file.

After asset path changes, run:

```bash
node tools/check-project.js
```

For model changes, also open the page through a local server and inspect the relevant canvas/model.

## Scroll Ownership Contract

Only one system should own scroll locking or forced scroll position at a time.

- Entry owns scroll blocking before the site is entered.
- Hero owns Hero-to-About handoff locking.
- Hero-to-About uses `hero-about-handoff-active`, `hero-about-handoff-releasing`, and `hero-about-handoff-settled`; the releasing state keeps the screen covered after About has been primed so intermediate Hero/About geometry is not exposed.
- About owns the timed bridge into Services.
- Services owns its automatic sequence and release.
- Works-to-Contact curtain owns its transition lock.
- `section-flow.js` owns programmatic jumps and announces them with `lucian:programmatic-section-jump`. The current bottom nav is an avatar dock that expands to About, Services, Works, and Contact; Works access is also handled by scroll, Services completion, and Works rows.

If a new flow needs to lock scroll, document what releases it and what resets it on `pagehide`, `pageshow`, `lucian:return-to-entry`, and `lucian:programmatic-section-jump`.

## QA Contract

Minimum checks after code changes:

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Also run `node --check` on every touched `scripts/*.js` file.

Browser QA must use a local server:

```bash
python -m http.server 4180
```

Open `http://127.0.0.1:4180/index.html`.
