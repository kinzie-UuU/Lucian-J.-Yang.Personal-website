# Clients

## Purpose

Clients provides credibility content through a selected-client marquee and a title interaction layer.

## Owned Files

- `index.html`
- `styles/clients.css`
- `scripts/clients-marquee.js`
- `scripts/clients-title-interaction.js`

## Runtime Contracts

- Uses reduced-motion media query.
- Uses `window.LucianRuntime` where available for interaction feedback.
- Should refresh or restart animation on resize when needed.

## Change Checklist

- Keep marquee content readable at desktop and mobile sizes.
- Check reduced-motion behavior after animation edits.
- Avoid layout shifts when marquee restarts.
- Keep title interaction decorative; it should not block reading or navigation.

## QA

- Marquee loops smoothly.
- Resize does not break spacing.
- Reduced motion simplifies or pauses animation.
- Title interaction resets on pointer leave.
