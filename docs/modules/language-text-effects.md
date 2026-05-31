# Language And Text Effects

## Purpose

This system applies bilingual copy and runs text effects across sections. It coordinates static i18n, language controls, flip text, scrambled text, scroll type, and reveal refreshes.

## Owned Files

- `site-data.js`
- `scripts/static-text-runtime.js`
- `scripts/language-runtime.js`
- `scripts/language-controls.js`
- `scripts/flip-text.js`
- `scripts/scrambled-text.js`
- `scripts/scroll-type-effects.js`
- `scripts/reveal-effects.js`
- `styles/typography.css`
- `styles/shared-motion.css`

## DOM Contracts

- `[data-i18n]`
- `.lang-button`
- text-effect classes such as flip/scramble/scroll-type/reveal hooks

## Runtime Contracts

- `window.initLanguageRuntime`
- `window.LucianStaticText`
- `window.LucianFlipText`
- `window.LucianScrambledText`
- `window.LucianAboutScrollReveal`
- Language runtime refreshes Services, Gallery, Works flowing menu, and text effects after switching.

## Data Contracts

Every visible translated key should exist in both language branches. If a key is intentionally decorative or first-paint-only, document why it is hardcoded.

## Change Checklist

- Add/update both `zh` and `en` values.
- Check open Gallery language refresh.
- Check Services text rebuild if service keys change.
- Respect reduced-motion preferences.
- Avoid text effects on controls where they can harm readability or accessibility.

## QA

- Switch Chinese and English from the header.
- Inspect Entry, About, Services, Works, Gallery, Clients, Contact.
- Open Gallery, switch language, and confirm overlay text refreshes.
- Verify reduced-motion mode does not run distracting effects.
