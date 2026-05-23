# AI Agent Instructions

## Project Identity

This is Lucian J. Yang's pure static personal packaging-design portfolio. It is a hand-built HTML/CSS/JavaScript site with complex entry, scroll, canvas, WebGL, GLB model, gallery, bilingual copy, and contact systems.

## Technical Boundaries

- Keep the site static.
- Use plain HTML, CSS, and JavaScript.
- Keep ordered script loading.
- Keep local `three.min.js`.
- Do not add external dependencies unless explicitly approved. Existing local GSAP vendor files are part of the current site.
- Do not convert to React, Vue, Vite, Next, or any framework.

## Forbidden Actions

- Do not reorder scripts casually.
- Do not edit `three.min.js` or minified vendor files casually.
- Do not rename or move assets in `images/`, `models/`, `videos/`, `audio/`, or `fonts/`.
- Do not delete files unless explicitly requested.
- Do not refactor multiple systems at once.
- Do not change animation constants or transform math without a specific plan and QA.
- Do not commit or push unless explicitly requested.

## Must Read Before Code Changes

- `index.html`
- `PROJECT_STRUCTURE.md`
- `docs/00_PROJECT_AUDIT.md`
- `docs/03_TECH_DESIGN.md`
- `docs/05_MODULE_MAP.md`
- The relevant CSS and JS files for the system being changed.

## Planning Rule

Before modifying code, explain:

- What system is being changed.
- Which files will be touched.
- What will not be touched.
- What QA will be run.

## Documentation Sync Rule

Every code change must include a documentation impact check.

Before finishing any task, determine whether the change affects page structure, module responsibility, load order, dependency contracts, data schema, interaction behavior, resource paths, QA standards, local run commands, or project scope.

If it does, update the related docs in the same task:

- `PROJECT_STRUCTURE.md`
- `docs/00_PROJECT_AUDIT.md`
- `docs/02_PRD.md`
- `docs/03_TECH_DESIGN.md`
- `docs/05_MODULE_MAP.md`
- `docs/06_QA_CHECKLIST.md`
- `docs/07_BUILD_PLAN.md`

If no documentation update is needed, say why in the final response.

## One-System Rule

Each change should target only one system:

- Entry
- Hero
- About / Portrait
- Services
- Works / Gallery
- Clients
- Contact
- Navigation / top meta
- Language / copy
- Global QA/tooling
- Documentation

## Main System Boundaries

- Entry: `entry.js`, `entry-key-model.js`, entry markup, entry styles in `home.css`, `models/entry-key.glb`.
- Hero: `hero-*` scripts, `liquid-glass-field.js`, hero markup, hero styles in `home.css`, `models/lion_head/`.
- About: `portrait-motion.js`, `about-curtain.js`, about markup, `about.css`.
- Services: `services-scroll-story.js`, `section-flow.js`, service markup, `services.css`.
- Works/Gallery: `work-gallery.js`, `works-side-rail.js`, `works-hover-preview.js`, `works-transition-motion.js`, works markup, `works.css`, `work-gallery.css`.
- Scroll curtains: `scroll-curtain-transitions.js`, `styles/shared-motion.css`, GSAP vendor load order, related transition markup.
- Contact: `contact-interactions.js`, contact markup, `contact.css`.

## File Modification Rules

- Prefer the smallest scoped file change.
- Preserve UTF-8 encoding.
- Preserve existing class/id contracts unless the task explicitly changes them.
- If markup adds visible text, update `site-data.js` when it should be bilingual.
- Do not introduce generated artifacts into the project root.

## CSS Rules

- Edit the section CSS file matching the system.
- Use existing tokens and color language first.
- Add global tokens only when reused by multiple systems.
- Do not put unrelated overrides in `responsive.css`.
- Check mobile text fit for any type/layout change.

## JS Rules

- Do not create new global names unless needed.
- Prefer existing `window.LucianRuntime` helpers.
- Preserve script order and module initialization assumptions.
- Run `node --check` on every touched JS file.
- For gallery, hero, services, entry, and curtain changes, browser QA is required.

## Copy Rules

- Prefer `site-data.js`.
- Update both `zh` and `en`.
- Keep tone professional and restrained.
- Do not invent unsupported claims, metrics, awards, or client outcomes.
- Mark unknowns as `[TBD]`.

## Resource Rules

- Do not rename images, models, videos, audio, or fonts.
- Do not change asset paths unless explicitly fixing a verified broken reference.
- Large new assets require explicit approval.

## Self-Check After Every Change

- Documentation impact decision has been made.
- Required docs were updated, or the final response explains why docs were not needed.
- `node tools/check-project.js`
- JS syntax checks for touched files.
- No missing CSS or JS references.
- Page opens locally.
- Entry key enters and replays if Entry was touched.
- Hero water/liquid/model work if Hero was touched.
- Services canvases work if Services was touched.
- Works gallery opens if Works/Gallery was touched.
- Language switching works if copy/i18n was touched.
- Console has no site error.

## Output Format

When reporting work, include files changed, behavior changed, documentation updated, checks run, known risks or unverified items, and next recommended action.
