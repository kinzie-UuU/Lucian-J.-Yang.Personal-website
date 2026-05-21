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
- [ ] Progress text and bottom progress bar advance.
- [ ] Auto-enter fires when key progress reaches 100%.
- [ ] Scroll/touch on entry can also enter the site.
- [ ] Entry curtain transition completes and `body.has-entered` is applied.
- [ ] Pixel avatar returns to entry.
- [ ] Returning to entry closes Works rail and gallery state.
- [ ] Entry key replay starts again and auto-enters again.

## Hero

- [ ] Water canvas is visible and nonblank.
- [ ] Liquid glass field is visible after entry and does not block interaction.
- [ ] Hero lion model loads from `/models/lion_head/lion_head_2k.gltf`.
- [ ] Hero wordmark and model are visible and centered on desktop/mobile.
- [ ] Pointer movement can nudge/orbit the lion without breaking the layout.
- [ ] Hero-to-About black curtain triggers on scroll.

## About / Portrait

- [ ] Portrait video or fallback image displays.
- [ ] Portrait reveal progresses from dark/blurred to visible.
- [ ] Video scrub follows scroll without obvious jumps.
- [ ] About text becomes readable after portrait reveal.
- [ ] Toolkit tags wrap without overflow.
- [ ] About-to-Services curtain triggers near the end of the section.

## Services

- [ ] Services section appears after About.
- [ ] `#services-entry-gridscan` canvas displays.
- [ ] Service panel shader canvases initialize.
- [ ] Scroll story progresses through services.
- [ ] Service copy rebuilds after language switch.
- [ ] Services-to-Works scroll curtain does not leave scroll locked.

## Works / Gallery

- [ ] Works list shows five rows.
- [ ] Hover preview does not block clicking.
- [ ] Keyboard activation opens a works row.
- [ ] Mouse/touch click opens a works row.
- [ ] Works side rail opens, closes, and launches categories.
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
- [ ] Bottom nav fits four items.
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
