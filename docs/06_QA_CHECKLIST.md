# QA Checklist

## Basic Open

- [ ] Start a local static server with `python -m http.server 4180`.
- [ ] Open `http://127.0.0.1:4180/index.html`.
- [ ] If port `4180` is already in use, start another local port such as `python -m http.server 4181` and open `http://127.0.0.1:4181/index.html`.
- [ ] Confirm the chosen port only affects local runtime and does not require project code changes.
- [ ] Page loads without a blank screen.
- [ ] Fonts load acceptably.
- [ ] No missing image/video icons are visible.
- [ ] Browser console has no site `error`.

## Entry

- [ ] OPEN trigger is visible.
- [ ] Clicking/tapping OPEN enters the site.
- [ ] Entry transition completes.
- [ ] `body.has-entered` is applied after entry.
- [ ] Pixel avatar can return to entry.

## Hero

- [ ] Water canvas is visible.
- [ ] Ripple/water surface does not appear blank.
- [ ] Hero cards render.
- [ ] Wheel/touch moves through the hero card sequence.
- [ ] One `.hero-card.is-scroll-current` appears during card sequence.
- [ ] Hero focus panel updates for active card.
- [ ] Hero "Enter Works" path reaches Works/Gallery as expected.

## About

- [ ] Portrait video or fallback image displays.
- [ ] About text is readable.
- [ ] Toolkit tags wrap without overflow.
- [ ] Scroll motion does not hide key copy.

## Services

- [ ] Services entry card appears.
- [ ] `#services-entry-gridscan` canvas displays.
- [ ] Service panel shader canvases initialize.
- [ ] Scroll story progresses through services.
- [ ] Service copy rebuilds after language switch.

## Works / Gallery

- [ ] Works list shows five rows.
- [ ] Hover preview does not block clicking.
- [ ] Keyboard activation opens a works row.
- [ ] Mouse/touch click opens a works row.
- [ ] Gallery opens with items.
- [ ] Gallery back button works.
- [ ] Gallery close button works.
- [ ] Detail view opens and returns.
- [ ] Gallery labels update after language switch.

## Clients

- [ ] Clients section appears between Works and Contact.
- [ ] Works hidden link reaches Clients.
- [ ] Client marquee moves unless reduced motion is active.
- [ ] Clients text is readable on warm background.
- [ ] Clients is not shown in bottom navigation.

## Contact

- [ ] Contact section appears after Clients.
- [ ] Top-right arrow reaches Contact.
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
- [ ] Hero focus text updates.
- [ ] Services text updates.
- [ ] Clients intro updates.
- [ ] Contact copy updates.
- [ ] Open gallery copy updates.

## Mobile

- [ ] Entry is usable.
- [ ] Bottom nav fits.
- [ ] Top controls do not overlap.
- [ ] Hero card sequence remains usable.
- [ ] About text does not overflow.
- [ ] Services story remains scrollable.
- [ ] Works rows are readable.
- [ ] Gallery is usable.
- [ ] Clients marquee/text does not overflow.
- [ ] Contact form stacks cleanly.

## Checks

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Run `node --check` for touched `scripts/*.js` files after every JS edit.
