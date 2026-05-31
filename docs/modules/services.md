# Services

## Purpose

Services is a controlled scroll story. It starts with a title gate, runs a PrismaticBurst entry canvas, yields to a local WebGL2 time tunnel, displays six service inscriptions, then lands on the Works transition copy screen.

## Owned Files

- `index.html`
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `scripts/services-prismatic-burst.js`
- `scripts/services-time-tunnel-shader.js`
- `site-data.js`

## DOM Contracts

- `#services`
- `.services-sticky`
- `#services-prismatic-canvas`
- `#services-time-canvas`
- `.services-title-stage`
- `.services-card-stage`
- `.services-text-track`
- `.service-text-panel`

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
- Canvas layers must resize and clean up on `pagehide`.
- If service count changes, update text rebuild logic, timing, and QA notes.
- If final landing changes, update Works/section-flow docs.

## QA

- Title gate appears on direct nav.
- PrismaticBurst renders and transitions out.
- Time tunnel renders.
- Service inscriptions are readable and do not ghost.
- Sequence completes and lands on Works transition copy.
