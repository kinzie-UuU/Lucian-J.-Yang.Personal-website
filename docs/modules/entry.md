# Entry

## Purpose

Entry is the site's opening gate. It renders the vertical archive year marquee, progress readout/bar, auto-enter path, scroll/touch enter path, and Hero return path from the avatar control.

## Owned Files

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `scripts/entry-key-model.js`
- `scripts/entry-hero-experience.js`

## DOM Contracts

- `#entry-screen`
- `#entry-progress`
- `#entry-progress-fill`
- `#entry-progress-bar`
- `#entry-year-marquee-track`
- `data-auto-enter-delay`

## Runtime Contracts

- Defines `window.LucianEntryKey` as a lightweight loader compatibility API.
- Produces `entry-key-ready` after progress completes and the archive year marquee has stopped on `2026`.
- Produces `lucian:site-entered` when the entry transition completes.
- Entry replay from avatar has been removed; `lucian:return-to-entry` is kept only as a legacy reset signal for listeners.

## Change Checklist

- Keep entry ids stable unless all consumers are updated.
- Check both auto-enter and user-triggered enter.
- If entry timing changes, check Hero reveal and scroll release.
- If Entry reset is reintroduced, check systems that reset on `lucian:return-to-entry`.

## QA

- Progress line reaches completion.
- Archive year marquee scrolls from `2017` to `2026` before auto-enter.
- Auto-enter works.
- Wheel/touch enter works.
- Bottom avatar dock expands without replaying Entry.
