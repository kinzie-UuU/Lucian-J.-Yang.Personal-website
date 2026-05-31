# Entry

## Purpose

Entry is the site's opening gate. It renders the 3D key model, progress readout, auto-enter path, scroll/touch enter path, and replay path back from the avatar control.

## Owned Files

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `scripts/entry-key-model.js`
- `scripts/entry-hero-experience.js`
- `models/entry-key.glb`

## DOM Contracts

- `#entry-screen`
- `#entry-key-canvas`
- `#entry-progress`
- `#entry-progress-fill`
- `#entry-progress-bar`
- `data-model-src="/models/entry-key.glb"`
- `data-auto-enter-delay`

## Runtime Contracts

- Defines `window.LucianEntryKey`.
- Produces `entry-key-ready` when the model is ready.
- Produces `lucian:site-entered` when the entry transition completes.
- Produces `lucian:return-to-entry` on replay/reset.

## Change Checklist

- Keep entry ids stable unless all consumers are updated.
- Check both auto-enter and user-triggered enter.
- If model path changes, update HTML and asset QA.
- If entry timing changes, check Hero reveal and scroll release.
- If replay changes, check systems that reset on `lucian:return-to-entry`.

## QA

- Key model renders.
- Progress reaches completion.
- Auto-enter works.
- Wheel/touch enter works.
- Replay returns to entry and then enters Hero cleanly.
