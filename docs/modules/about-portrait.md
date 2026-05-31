# About And Portrait

## Purpose

About presents the portrait media and designer copy, then bridges into Services. It owns portrait reveal/scrub behavior and cooperates with Services for the timed About-to-Services handoff.

## Owned Files

- `index.html`
- `styles/about.css`
- `scripts/portrait-motion.js`
- `scripts/about-curtain.js`
- `videos/portrait-scrub-60fps.mp4`
- `images/9999.png`

## DOM Contracts

- `#about`
- `.portrait-about-wrapper`
- `.portrait-canvas`
- `#portrait-video`
- `.portrait-image`
- `.about-curtain`
- About copy nodes using `data-i18n`

## Runtime Contracts

- Defines `window.LucianAboutMotion`.
- Defines `window.LucianAboutScrollReveal`.
- Consumes `lucian:programmatic-section-jump`.
- Consumes `lucian:site-entered`.
- Produces `lucian:about-services-bridge-complete`.

## Change Checklist

- Preserve the fallback image path when changing video behavior.
- If the video asset changes, confirm preload, duration, poster/fallback, and scrub range.
- If wheel or touch behavior changes, test reverse direction and escape from the section.
- If bridge timing changes, coordinate with Services autoplay.
- Clear temporary bridge state on `pageshow`, `pagehide`, and programmatic jumps.

## QA

- Fallback image is visible before video readiness.
- Portrait scrub works down and up.
- About copy reveals once and remains readable.
- Natural scroll into Services runs the bridge once.
- Direct nav to Services does not leave About curtain residue.
