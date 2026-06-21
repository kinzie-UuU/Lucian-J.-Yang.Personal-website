# Services

## Purpose

Services is a controlled scroll story. It starts with a title gate, displays six service inscriptions beside an interactive image accordion, then lands on the Works transition copy screen.

## Owned Files

- `index.html`
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `site-data.js`

## DOM Contracts

- `#services`
- `.services-sticky`
- `.services-title-stage`
- `.services-card-stage`
- `.services-text-track`
- `.service-text-panel`
- `.services-accordion`
- `.services-accordion-item`

## Runtime Contracts

- Consumes `lucian:about-services-bridge-complete`.
- Consumes `lucian:programmatic-section-jump`.
- Consumes `lucian:site-entered`.
- Produces `lucian:services-sequence-start`.
- Produces `lucian:services-sequence-complete`.
- Owns playback/release suppression while active.

## Data Contracts

Service titles and body copy are driven by `site-data.js` i18n keys. Keep both languages complete when adding, removing, or renaming service messages.

## Change Checklist

- Direct navigation should land on the title gate without accidental autoplay.
- Natural About handoff should schedule autoplay only after the bridge completes.
- Scroll locking must release after the sequence.
- Image accordion labels must stay aligned with service i18n keys.
- If service count changes, update text rebuild logic, timing, and QA notes.
- If final landing changes, update Works/section-flow docs.

## QA

- Title gate appears on direct nav.
- Service inscriptions are readable and do not ghost.
- Image accordion renders, hover/focus activation works, and mobile horizontal overflow remains controlled.
- Sequence completes and lands on Works transition copy.
