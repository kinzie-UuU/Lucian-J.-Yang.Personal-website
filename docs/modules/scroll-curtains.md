# Scroll Curtains

## Purpose

Scroll curtains handle cinematic section handoffs that need temporary scroll locking. The current standalone curtain module owns Works-to-Contact and uses local GSAP/MorphSVG vendor files.

## Owned Files

- `index.html`
- `styles/shared-motion.css`
- `scripts/scroll-curtain-transitions.js`
- `scripts/vendor/gsap/gsap.min.js`
- `scripts/vendor/gsap/MorphSVGPlugin.min.js`

## Runtime Contracts

- GSAP and MorphSVG must load before `scroll-curtain-transitions.js`.
- Consumes `lucian:return-to-entry`.
- Consumes `lucian:programmatic-section-jump`.
- Must release scroll lock after transition completion.

## Change Checklist

- Keep natural scroll transitions separate from bottom-nav programmatic jumps.
- Reset state on entry replay.
- Reset state on programmatic section jump.
- Avoid changing vendor files unless intentionally upgrading them.
- If adding a new curtain, document producer, trigger zone, lock owner, and release condition.

## QA

- Natural Works-to-Contact scroll triggers the curtain.
- Programmatic jumps do not trigger the natural curtain unexpectedly.
- Scroll is locked only during the transition.
- Contact is usable after release.
