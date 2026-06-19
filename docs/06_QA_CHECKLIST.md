# QA Checklist

## Basic Open

- [ ] Start a local static server with `python -m http.server 4180`.
- [ ] Open `http://127.0.0.1:4180/index.html`.
- [ ] Page loads without a blank screen.
- [ ] Fonts load acceptably.
- [ ] No missing image/video/model icons or network 404s are visible.
- [ ] Browser console has no site `error`.

## Entry

- [ ] 3D key canvas is visible.
- [ ] No extra lock-core target, ring, or UI marker is visible behind the key.
- [ ] Progress text and bottom progress bar advance.
- [ ] Key remains front-facing while completing one clean screen-plane turn during loading.
- [ ] Auto-enter fires when key progress reaches 100%.
- [ ] Unlock moment shows a slight key insertion and clean fade into the curtain.
- [ ] With a user scroll/touch/click gesture and sound enabled, the unlock click lands near the key insertion.
- [ ] Scroll/touch on entry can also enter the site.
- [ ] Entry curtain transition completes and `body.has-entered` is applied.
- [ ] Bottom avatar dock expands on hover/click without replaying Entry.
- [ ] Returning to entry closes gallery state.
- [ ] Entry key replay starts again and auto-enters again.

## Hero

- [ ] Water canvas is visible and nonblank.
- [ ] Liquid glass field is visible after entry and does not block interaction.
- [ ] Hero lion model loads from `/models/lion_head/lion_head_2k.gltf`.
- [ ] Hero wordmark and model are visible and centered on desktop/mobile.
- [ ] Pointer movement can nudge/orbit the lion without breaking the layout.
- [ ] Hero-to-About and About-to-Hero both lock the current stage first; downward/upward wheel, touch, or key input starts the black curtain, then lands on the target stage.

## About / Portrait

- [ ] Portrait video or fallback image displays.
- [ ] Portrait reveal progresses from dark/blurred to visible.
- [ ] Video scrub follows scroll without obvious jumps.
- [ ] About text becomes readable after portrait reveal.
- [ ] Toolkit tags wrap without overflow.
- [ ] About-to-Services curtain triggers near the end of the section.

## Services

- [ ] Services section appears after About.
- [ ] PrismaticBurst entry canvas is visible during the Services title/portal stage.
- [ ] Time-tunnel canvas takes over after the portal stage.
- [ ] Flat in-tunnel service inscriptions stay readable through the automatic sequence.
- [ ] Scroll story progresses through Services and releases scroll afterward.
- [ ] Service copy rebuilds after language switch.
- [ ] Services automatic sequence lands on Works transition copy without scroll lock.

## Works / Gallery

- [ ] Works list shows five rows.
- [ ] Hover preview does not block clicking.
- [ ] Keyboard activation opens a works row.
- [ ] Mouse/touch click opens a works row.
- [ ] Bottom-nav Works reaches the Works section; Works rows launch categories.
- [ ] Gallery opens with items.
- [ ] Gallery back button works.
- [ ] Gallery close button works.
- [ ] Detail view opens and returns.
- [ ] Gallery labels update after language switch.

## Clients

- [ ] Clients section appears after Contact in the current document flow.
- [ ] Client marquee moves unless reduced motion is active.
- [ ] Clients text is readable.
- [ ] Clients is not shown in bottom navigation.

## Contact

- [ ] Contact section appears after Works/Gallery overlay markup.
- [ ] Top-right arrow reaches Contact.
- [ ] Bottom nav Contact reaches Contact.
- [ ] Bottom nav dock expands to show About, Services, Works, Contact.
- [ ] Works is reachable through the bottom nav, Services completion, natural scroll, and Works rows.
- [ ] Contact form fields are usable.
- [ ] Submit opens Gmail compose or expected compose target.
- [ ] WeChat QR trigger opens modal.
- [ ] QR modal closes via close button/backdrop/Escape.
- [ ] Contact toast appears when expected.

## Language

- [ ] Chinese button sets `html lang="zh-CN"`.
- [ ] English button sets `html lang="en"`.
- [ ] Bottom nav labels update.
- [ ] Works rows update.
- [ ] Services text updates.
- [ ] Clients intro updates.
- [ ] Contact copy updates.
- [ ] Open gallery copy updates.

## Mobile

- [ ] Entry is usable.
- [ ] Expanded bottom nav fits four items.
- [ ] Top controls do not overlap.
- [ ] Hero model/water/wordmark fit without horizontal overflow.
- [ ] About text does not overflow.
- [ ] Services story remains scrollable.
- [ ] Works rows are readable.
- [ ] Gallery is usable.
- [ ] Clients marquee/text does not overflow.
- [ ] Contact form stacks cleanly.

## Automated Checks

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Run `node --check` for every touched `scripts/*.js` file after JS edits.

For broader browser smoke QA:

```bash
node tools/runtime-smoke-check.js
```
