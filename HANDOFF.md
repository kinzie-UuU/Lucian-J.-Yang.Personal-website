# Lucian J. Yang Website Handoff

## Current Status

The site is being split gradually to preserve the current visual design and interaction behavior.

Completed and already pushed before this handoff:

- `site-data.js`
  - Holds `i18n`, `worksData`, `workGalleryImages`, and `galleryText`.
- `scripts/entry.js`
  - Handles the OPEN interaction, entry transition, entry field canvas, entry dielines, wheel/touch entry, and return-to-entry avatar behavior.
- `scripts/hero-steps.js`
  - Handles hero wheel/touch input listeners for the water intro and 5 card sequence.
- `scripts/hero-step-runtime.js`
  - Handles hero step active-state checks, wheel lock/debounce, and forward/back step mutation through state setters from `script.js`.
- `scripts/hero-state-runtime.js`
  - Holds the mutable hero runtime scalars: current card, ordered mode, selected card index, selection start time, entry state, hero step target, and intro budget.
  - `script.js` still owns the behavior functions, but those functions now read/write `heroState` instead of separate local `let` bindings.
- `scripts/hero-actions-runtime.js`
  - Handles hero card activation, ordered-layout state capture/release, current-card reset, hero pointer-state clearing, and hero-card-to-gallery project entry.
  - `script.js` now forwards runtime hero action calls to this controller.
- `scripts/hero-sequence-runtime.js`
  - Handles hero stage sizing, hero card state initialization, forced top scroll, and full hero sequence reset.
  - `script.js` now forwards reset/resize/init runtime calls to this controller, keeping startup order in `script.js` but moving the behavior body out.
- `scripts/runtime-bridge.js`
  - Handles the shared `window.LucianRuntime` bridge for split modules.
  - Owns cursor visibility/update helpers, audio forwarding, language/action/sequence forwarding, hero ripples bridge, hero steps bridge, and first-pointer audio unlock.
  - `script.js` now only passes controller getters into the bridge and installs the hero ripples/steps hooks at the original points in startup order.
- `scripts/app-bootstrap.js`
  - Handles the final app bootstrap: controller creation, DOM reference collection, startup ordering, water/step/card-animation initialization, and `window.LucianApp` state return.
  - The root `script.js` is now only the one-line app entry call.
  - This marks the JS split as complete for the current static-script architecture.
- `scripts/hero-focus-runtime.js`
  - Handles hero focus panel text, selected work key, and works tab active state.
  - Exposes the focus panel element back to `script.js` so the hero card animation module can keep using the same visibility behavior.
- `scripts/hero-water-surface.js`
  - Handles the hero WebGL water surface, ripple simulation shader, render shader, title texture, pointer input, resize handling, and pagehide cleanup.
  - Moved as-is from `script.js` except the scroll progress is injected through `getScrollProgress()`.
- `scripts/static-text-runtime.js`
  - Handles static `[data-i18n]` text refresh, pill label refresh, document `lang`, and top language button active labels.
- `scripts/language-runtime.js`
  - Handles the current language state and language-switch orchestration.
  - Coordinates scrambled text restore/init, static text refresh, services story rebuild, hero focus refresh, and open gallery language refresh.
- `scripts/hero-ripples.js`
  - Handles hero surface click and pointer ripple effects.

Current local batch covered by this handoff:

- `scripts/hero-card-config.js`
  - Holds hero card presets, step thresholds, and cluster layout constants.
- `scripts/hero-card-layout.js`
  - Holds card layout helpers:
    - `setCardPosition`
    - `createHeroCardState`
    - `resetHeroCardClasses`
    - `resetHeroCardPositions`
    - `getHeroMotionFrame`
    - `getHeroProgressState`
    - `applyHeroProgressVars`
- `scripts/site-clock.js`
  - Handles the Beijing time/date display in the top meta area.
- `scripts/header-controls.js`
  - Handles the top sound toggle, stored sound preference, and fullscreen toggle.
  - Uses the runtime audio bridge exposed from `script.js`.
- `scripts/contact-interactions.js`
  - Handles contact hover-to-copy, contact form mailto composition, contact toast, and WeChat QR modal open/close.
  - `script.js` keeps the work-gallery Escape handler, but now checks `#wechat-qr-modal.is-open` before closing the gallery.
- `scripts/works-hover-preview.js`
  - Handles works row hover preview, preview image/fallback styles, preview follow motion, and row button/tabindex setup.
  - Exposes `window.LucianRuntime.hideWorksPreview()` for gallery-opening flows.
- `scripts/bottom-nav-scroll-spy.js`
  - Handles bottom nav active-section highlighting on scroll/resize and bottom-nav click scrolling.
- `scripts/language-controls.js`
  - Handles top language button click binding.
  - `script.js` still owns `switchLanguage()` because it coordinates static text, scrambled text, hero focus, works tabs, open gallery text, and services story text.
- `scripts/clients-marquee.js`
  - Clones the clients marquee track for seamless looping.
- `scripts/works-statement-motion.js`
  - Handles the works statement scroll-linked `--works-enter` CSS variable.
- `scripts/portrait-motion.js`
  - Handles portrait/about sticky scroll motion CSS variables and video scrubbing.
  - Moved as-is from the tail of `script.js`; animation constants and scrub math were not changed.
- `scripts/reveal-effects.js`
  - Handles `.reveal` intersection visibility and `[data-reveal]` child stagger reveal.
  - Service item reveal sound is intentionally disabled.
- `scripts/site-navigation.js`
  - Handles home/top link ordered-layout release and hero focus panel "Enter Works" scroll.
  - Uses runtime helpers instead of owning hero/gallery state directly.
- `scripts/works-tabs.js`
  - Handles works tab click binding.
  - Calls `window.LucianRuntime.selectWorkTab()` so selected-work state and focus-panel updates stay in `script.js`.
- `scripts/hero-card-events.js`
  - Handles hero card pointer/focus/click event binding.
  - Calls runtime methods for activation and project entry so hero step state and gallery opening stay in `script.js`.
- `scripts/precision-cursor.js`
  - Handles global pointer movement for the precision cursor and hero field pointer state.
  - Uses runtime helpers so `animateCards` can keep reading the original `fieldPointer` object in `script.js`.
- `scripts/scroll-type-effects.js`
  - Handles scroll-linked typography splitting, scroll scene CSS variables, scroll/touch/wheel direction tracking, and MutationObserver re-sync after DOM text changes.
  - Uses `window.LucianRuntime.reducedMotion` as its only runtime dependency.
- `scripts/audio-feedback.js`
  - Owns sound enabled state, the AudioContext, click tone, water-drop tone, and audio throttling/debounce.
  - Hover, reveal, packaging snap, and box-open sounds are intentionally not active.
- `scripts/scrambled-text.js`
  - Handles `.js-scrambled-text` splitting, pointer scrambling, cleanup, and re-init after language changes.
- `scripts/hero-wireframe.js`
  - Handles the hero SVG wireframe renderer and card-focus pointer pulse.
  - `script.js` still owns when it initializes, preserving the original startup order.
- `scripts/work-gallery.js`
  - Handles works row open, gallery item rendering, horizontal wheel stepping, detail view, back/close buttons, Escape close, resize/scroll reveal updates, and language refresh for open galleries.
  - `script.js` now only bridges hero-card project entry, bottom-nav gallery close, and language-change refresh through `window.LucianWorkGallery`.
- `scripts/services-image-trail.js`
  - Handles the services section pointer-driven image trail.
  - Moved as-is from `script.js`; motion thresholds and transforms were not changed.
- `scripts/particle-canvas.js`
  - Holds the reusable clients particle canvas helper.
  - It remains inactive, matching the previous commented-out initialization.
- `scripts/services-entry-grid-scan.js`
  - Handles the services entry Three.js grid-scan canvas and exposes `window.initServicesEntryGridScan()`.
- `scripts/service-panel-shaders.js`
  - Handles per-panel WebGL shader backgrounds and exposes `window.initServicePanelShaders()`.
- `scripts/services-scroll-story.js`
  - Handles the services sticky scroll story, service glyph splitting, language rebuild, panel transforms, and progress handoff to the grid scan.
  - Uses `window.LucianRuntime.getCurrentLang()` instead of direct `currentLang`, so it can live outside `script.js`.
- `scripts/hero-card-animation.js`
  - Handles the active hero card animation loop, card positioning, scroll-current state, ordered-card focus reveal, and hero progress CSS variables.
  - `script.js` still owns hero state and passes getters/setters into the module. The old inline `animateCards` body has been removed after validation.

## Audio Tuning Notes

Current local audio changes:

- Hover sounds are intentionally disabled.
  - `playUiTone("hover")` returns immediately.
  - The entry OPEN hover handler no longer calls `playUiTone("hover")`.
  - Hero card activation no longer plays hover sound.
- Scroll/reveal sounds are intentionally disabled.
  - `scripts/reveal-effects.js` no longer calls `playPackagingSnap()` for service item reveals.
- Click sound was simplified.
  - `playUiTone("click")` is now one short low-volume sine tone instead of two layered oscillators.
  - Tone throttle was increased to reduce double-click / multi-trigger stacking.
- Packaging snap was removed from active use.
  - `playPackagingSnap()` and `playBoxOpenTone()` were removed because they added noisy, layered snap artifacts.
- Water click sound was softened.
  - Lower volume, lower frequency range, longer debounce.
- Audio state was split into `scripts/audio-feedback.js`.
  - `script.js` now only forwards runtime audio calls to `window.LucianAudio`.

## Validation Already Done

For the current local batch:

- `node --check` passed for:
  - `script.js`
  - `site-data.js`
  - `scripts/entry.js`
  - `scripts/hero-steps.js`
  - `scripts/hero-step-runtime.js`
  - `scripts/hero-state-runtime.js`
  - `scripts/hero-actions-runtime.js`
  - `scripts/hero-sequence-runtime.js`
  - `scripts/runtime-bridge.js`
  - `scripts/app-bootstrap.js`
  - `scripts/hero-focus-runtime.js`
  - `scripts/hero-water-surface.js`
  - `scripts/static-text-runtime.js`
  - `scripts/language-runtime.js`
  - `scripts/hero-ripples.js`
  - `scripts/hero-card-config.js`
  - `scripts/hero-card-layout.js`
  - `scripts/site-clock.js`
  - `scripts/header-controls.js`
  - `scripts/contact-interactions.js`
  - `scripts/works-hover-preview.js`
  - `scripts/works-statement-motion.js`
  - `scripts/bottom-nav-scroll-spy.js`
  - `scripts/language-controls.js`
  - `scripts/clients-marquee.js`
  - `scripts/portrait-motion.js`
  - `scripts/reveal-effects.js`
  - `scripts/site-navigation.js`
  - `scripts/works-tabs.js`
  - `scripts/hero-card-events.js`
  - `scripts/precision-cursor.js`
  - `scripts/scroll-type-effects.js`
  - `scripts/audio-feedback.js`
  - `scripts/scrambled-text.js`
  - `scripts/hero-wireframe.js`
- In the in-app browser:
  - OPEN enters the site normally.
  - Sound toggle switches `aria-pressed` and restores correctly.
  - Fullscreen toggle initializes with the correct inactive state.
  - Language buttons switch `html lang` between `en` and `zh-CN`.
  - Bottom nav click binding loads without console errors.
  - Clients marquee clones the track without console errors.
  - Portrait/about motion module sets portrait CSS variables and marks the video ready without console errors.
  - Reveal effects module marks About reveal nodes/children without console errors.
  - Site navigation module loads without console errors.
  - Hero card event module loads without console errors.
  - Works tab module loads without console errors. Note: current DOM snapshot did not include `.works-tab` controls, so click behavior was not exercised in this pass.
  - Precision cursor module updates cursor position style after pointer movement without console errors.
  - Scroll type module updates section `--scene-*` CSS variables without console errors.
  - Audio tuning syntax checks pass and page console has no `warn` or `error` logs.
  - Audio module browser smoke passed: sound toggle flips from mute to enable and back; final state restored to sound on. Actual sound quality still needs human listening confirmation.
  - Scrambled text split browser smoke passed through EN/ZH language switching.
  - Hero wireframe split browser smoke passed page reload plus language/sound controls.
  - Work gallery split browser smoke passed: keyboard open from the OEM works row, generated 3 gallery items, opened detail, returned to index, closed, and opened with English labels after language switch. Mouse click on the works row was unreliable in the in-app browser viewport, but keyboard activation validated the module event path.
  - Services image trail split syntax check passed, and final page/gallery smoke had no browser `warn` or `error` logs.
  - Services entry grid scan and panel shader splits passed syntax checks and browser smoke: 1 entry grid canvas, 6 service panel shader canvases, gallery path still works, and no page `warn` or `error` logs.
  - Services scroll story split passed browser smoke: 235 service glyph nodes generated, EN/ZH service title rebuild works, gallery path still works, and no page `warn` or `error` logs.
  - Hero card animation module passed syntax checks and browser smoke: OPEN works, targeted hero wheel input produces one `.hero-card.is-scroll-current`, cards receive transform styles, water canvas is present, and no page `warn` or `error` logs.
  - Old inline `animateCards` rollback body was removed; full syntax checks still pass, hero cards still receive transform styles, the water canvas remains present, and page console has no `warn` or `error` logs.
  - Hero step runtime split passed browser smoke: OPEN enters the site, wheel input produces one `.hero-card.is-scroll-current`, hero progress styles update, and page console has no `warn` or `error` logs.
  - Works path still works after the hero step runtime split: 5 works rows are present, the first row opens a gallery with 3 items, and page console has no `warn` or `error` logs.
  - Static text runtime split passed browser smoke: EN sets `html lang="en"` and updates the first works row to `Packaging Design`; ZH restores `html lang="zh-CN"` and `包装设计`; page console has no `warn` or `error` logs.
  - Hero focus runtime split passed browser smoke: focus panel text updates on language change, works row gallery opening still works, OPEN still enters the site, wheel input still produces one `.hero-card.is-scroll-current`, and page console has no `warn` or `error` logs.
  - Hero water surface split passed browser smoke: the water canvas remains present and sized (`width=899`, `height=1064` in the test viewport), OPEN still enters the site, wheel input still produces one `.hero-card.is-scroll-current`, hero progress styles update, works gallery still opens with 3 items, and page console has no site `warn` or `error` logs.
  - Language runtime split passed browser smoke: EN sets `html lang="en"`, updates works/focus/gallery copy to English, ZH restores `html lang="zh-CN"` and Chinese works copy, hero OPEN/wheel/card transform still works, and page console has no site `warn` or `error` logs.
  - Hero state runtime split passed browser smoke: OPEN enters the site, wheel input produces one `.hero-card.is-scroll-current`, water canvas remains present, card transforms still update, works gallery still opens with 3 items, EN/ZH language switching still works, and page console has no site `warn` or `error` logs.
  - Hero actions runtime split passed regression smoke: OPEN enters, wheel input produces one current hero card, water canvas remains present, works gallery still opens with 3 items, and page console has no site `warn` or `error` logs.
  - Services visual regression fixed: `scripts/services-entry-grid-scan.js` and `scripts/service-panel-shaders.js` must load before `scripts/services-scroll-story.js`. Browser smoke after reload shows `#services-entry-gridscan` sized at `778x583`, 6 `.service-panel-shader` canvases, 235 service glyphs, and no site `warn` or `error` logs.
  - Hero sequence runtime split passed browser smoke: OPEN enters, a hero card becomes `.is-scroll-current`, the water canvas remains present, services grid/shaders/glyphs still initialize, works rows are present, and keyboard-opening the first works row still opens a gallery with 3 items. Page console has no site `warn` or `error` logs.
  - Runtime bridge split passed browser smoke: OPEN enters, `body.has-entered` is set, one hero card becomes `.is-scroll-current`, the water canvas remains present, works has 5 rows and opens a 3-item gallery, services grid/shaders/glyphs still initialize, and page console has no site `warn` or `error` logs.
  - Final app bootstrap split passed browser smoke: root `script.js` is one line, `scripts/app-bootstrap.js` owns startup, OPEN enters, one hero card becomes `.is-scroll-current`, the water canvas remains present, works has 5 rows and opens a 3-item gallery, services grid/shaders/glyphs still initialize, and page console has no site `warn` or `error` logs.
  - Contact module loads with no page console `warn` or `error` logs.
  - Works page loads with no page console `warn` or `error` logs after the hover-preview split.
  - Hero cards scroll forward and backward normally.
  - Returning to entry via the pixel avatar works.
  - Top Beijing time/date updates normally.
  - Page console has no site `warn` or `error` logs.
- Not fully browser-click validated in this batch:
  - WeChat modal open/close from the contact viewport. The in-app browser click landed outside the offscreen contact control, and `javascript:` smoke testing is blocked by browser safety policy.
  - Contact form submit, intentionally not triggered because it navigates to a `mailto:` URL.
  - Works hover preview visible state. CUA mouse movement did not reliably fire the browser `mouseenter` path, though the module loads cleanly and row/image state checks show no console errors.
  - Scroll type glyph generation was not observed in the current `#works` DOM state, but scene variables update and the module has no console errors.
  - Sound toggle browser-click verification was blocked by a stale open work-gallery overlay in the in-app browser session; code path is unchanged except for the quieter sound functions.

## Important Rules For Next Work

- Do not commit or push unless the user explicitly confirms.
- Keep splitting in small visual-safe steps.
- Avoid changing animation constants, transform math, CSS timing, or visual parameters during module moves.
- After each split, run syntax checks and browser validation.
- Treat hero animation state bridges and services WebGL/scroll effects as high-risk areas.

## Recommended Next Steps

1. Ask the user to visually confirm the current local/GitHub version if they have not already.
2. Continue JS splitting before CSS splitting.
3. Continue expanding the hero runtime in small verified batches:
   - Remaining hero behavior functions and runtime bridge cleanup.
4. Delay these high-risk splits until later:
   - Services scroll story/WebGL renderer.
5. Start CSS splitting only after JS modules are more stable.

## Current Remaining Large Blocks In `script.js`

- Hero behavior functions and runtime bridges for active-card handling, ordered layout, sequence reset, ripples, and card/gallery events.
- Shared utility cleanup and any remaining tightly-coupled helpers.
- Tail cleanup note: `script.js` still has one stale portrait comment line with encoding noise at EOF. It is harmless, but can be removed later with a safe line-ending/encoding-preserving cleanup.

## Visual QA Checklist

Before every commit:

- Reload `index.html`.
- Click OPEN and watch the entry-to-water transition.
- Scroll through the water intro and 5 cards.
- Scroll backward from card 1 to water.
- Click the pixel avatar and confirm it returns to entry.
- Check top time/date text.
- Confirm browser console has no site `warn` or `error` logs.
