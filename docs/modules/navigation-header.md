# Navigation And Header

## Purpose

Navigation and header controls provide site-level controls: sound, language, fullscreen, Beijing clock, bottom navigation, active nav state, Works rail access, and precision cursor behavior during entry.

## Owned Files

- `index.html`
- `styles/navigation.css`
- `scripts/section-flow.js`
- `scripts/bottom-nav-scroll-spy.js`
- `scripts/header-controls.js`
- `scripts/language-controls.js`
- `scripts/site-clock.js`
- `scripts/precision-cursor.js`
- `scripts/works-side-rail.js`

## DOM Contracts

- `#sound-toggle`
- `#fullscreen-toggle`
- `.lang-button`
- bottom nav anchors
- `#precision-cursor`
- `#precision-guides`
- Works side rail controls

## Runtime Contracts

- Uses `window.LucianRuntime` for sound, language, cursor, and gallery helpers.
- `section-flow.js` produces `lucian:programmatic-section-jump`.
- Bottom-nav programmatic jumps briefly re-settle their scroll target so Services/Works scroll systems cannot steal the first click during handoff states.
- The About bottom-nav target lands inside the readable About scene, not the pre-reveal gate.
- Scroll spy consumes `lucian:programmatic-section-jump` and `lucian:site-entered`.
- Works side rail can call `window.LucianWorkGallery`.

## Change Checklist

- Keep bottom-nav targets aligned with actual section ids.
- Update Architecture and Module docs if Works is added back to or removed from bottom nav.
- If language controls change, verify language runtime still owns actual switching.
- If fullscreen behavior changes, keep ARIA pressed/labels accurate.
- If sound behavior changes, check user-gesture audio unlock.

## QA

- Bottom nav jumps to the intended sections.
- Active state follows scroll and programmatic jumps.
- Sound toggle persists and resumes correctly.
- Fullscreen state reflects browser state.
- Clock updates.
- Cursor appears only in intended entry/fine-pointer contexts.
