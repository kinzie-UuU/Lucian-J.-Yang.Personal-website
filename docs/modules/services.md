# Services

## Purpose

Services is a normal page section connected directly after About. It shows a left statement block and a right interactive gradient accordion whose active card contains the service index, title, and body copy.

## Owned Files

- `index.html`
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `site-data.js`

## DOM Contracts

- `#services`
- `.services-card-stage`
- `.services-overview`
- `.services-accordion`
- `.services-accordion-item`
- `.services-accordion-content`

## Runtime Contracts

- Consumes `lucian:programmatic-section-jump`.
- Consumes `lucian:site-entered`.
- Does not own scroll locking, autoplay, or About-to-Services transition playback.

## Data Contracts

Service titles and body copy are driven by `site-data.js` i18n keys. Keep both languages complete when adding, removing, or renaming service messages.

## Change Checklist

- Direct navigation should land on the services-system stage without accidental autoplay.
- About should scroll directly into Services with no bridge transition or scroll lock.
- The services overview and accordion card content must stay aligned with service i18n keys.
- If service count changes, update text rebuild logic, timing, and QA notes.
- If final landing changes, update Works/section-flow docs.

## QA

- About and Services appear as adjacent natural sections.
- Services overview carries the packaging statement in the left block.
- Gradient accordion renders, active cards show index/title/body, hover/focus activation works, and mobile horizontal overflow remains controlled.
