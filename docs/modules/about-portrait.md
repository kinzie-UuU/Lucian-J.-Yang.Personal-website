# About And Portrait

## Purpose

About presents the portrait media and designer copy. It owns portrait reveal/scrub behavior and flows directly into Services as the next normal page section.

## Owned Files

- `index.html`
- `styles/about.css`
- `scripts/portrait-motion.js`
- `videos/portrait-scrub-60fps.mp4`
- `images/9999.png`

## DOM Contracts

- `#about`
- `.portrait-about-wrapper`
- `.portrait-canvas`
- `#portrait-video`
- `.portrait-image`
- About copy nodes using `data-i18n`

## Runtime Contracts

- Defines `window.LucianAboutMotion`.
- Defines `window.LucianAboutScrollReveal`.
- Consumes `lucian:programmatic-section-jump`.
- Consumes `lucian:site-entered`.

## Change Checklist

- Preserve the fallback image path when changing video behavior.
- If the video asset changes, confirm preload, duration, poster/fallback, and scrub range.
- If wheel or touch behavior changes, test reverse direction and escape from the section.

## QA

- Fallback image is visible before video readiness.
- Portrait scrub works down and up.
- About copy reveals once and remains readable.
- Natural scroll moves directly into Services.
