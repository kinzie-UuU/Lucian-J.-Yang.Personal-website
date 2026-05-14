# AI Agent Instructions

## Project Identity

This is Lucian J. Yang's pure static personal packaging-design portfolio. It is a hand-built HTML/CSS/JavaScript site with complex interaction, scroll, canvas, WebGL, gallery, and bilingual copy systems.

## Project Goal

Preserve the current visual identity and interaction behavior while enabling careful, sustainable iteration.

## Technical Boundaries

- Keep the site static.
- Use plain HTML, CSS, and JavaScript.
- Keep ordered script loading.
- Keep local `three.min.js`.
- Do not add dependencies unless explicitly approved.

## Forbidden Actions

- Do not convert to React, Vue, Vite, Next, or any framework.
- Do not reorder scripts casually.
- Do not edit `three.min.js`.
- Do not rename or move assets in `images/`, `videos/`, or `fonts/`.
- Do not delete files.
- Do not refactor multiple systems at once.
- Do not change animation constants or transform math without a specific plan and QA.
- Do not commit or push unless explicitly requested.

## Must Read Before Code Changes

- `index.html`
- `PROJECT_STRUCTURE.md`
- `HANDOFF.md`
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

Before finishing any task, the agent must determine whether the change affects:

- page structure
- module responsibility
- CSS / JS load order
- CSS / JS file dependency
- data schema in site-data.js
- interaction behavior
- resource paths
- QA checklist
- local run or check commands
- project scope / non-goals

If the change affects any item above, update the related docs in the same task:

- `docs/02_PRD.md`
- `docs/03_TECH_DESIGN.md`
- `docs/05_MODULE_MAP.md`
- `docs/06_QA_CHECKLIST.md`
- `docs/07_BUILD_PLAN.md`

If no documentation update is needed, the final response must explicitly state:

“Documentation update: not required, because this change does not affect structure, behavior, dependencies, data schema, resource paths, QA standards, or run/check commands.”

## One-System Rule

Each change should target only one system:

- Entry
- Hero
- About
- Services
- Works / Gallery
- Clients
- Contact
- Navigation / top meta
- Language / copy
- Global QA/tooling

## Six Main System Boundaries

- Entry: `entry.js`, entry markup, entry styles in `home.css`.
- Hero: `hero-*` scripts, hero markup, hero styles in `home.css`.
- About: `portrait-motion.js`, about markup, `about.css`.
- Services: `services-*`, `service-panel-shaders.js`, service markup, `services.css`.
- Works: `work-gallery.js`, `works-hover-preview.js`, `works-transition-motion.js`, works markup, `works.css`, `work-gallery.css`.
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
- For gallery, hero, and services changes, browser QA is required.

## Copy Rules

- Prefer `site-data.js`.
- Update both `zh` and `en`.
- Keep tone professional and restrained.
- Do not invent unsupported claims, metrics, awards, or client outcomes.
- Mark unknowns as `【待确认】`.

## Resource Rules

- Do not rename images, videos, or fonts.
- Do not change asset paths unless explicitly fixing a verified broken reference.
- Large new assets require explicit approval.

## Self-Check After Every Change

- Documentation impact decision has been made.
- Required docs were updated, or the final response explains why docs were not needed.
- `node tools/check-project.js`
- JS syntax checks for touched files.
- No missing CSS or JS references.
- Page opens locally.
- OPEN enters.
- Hero scroll/cards work if hero was touched.
- Services canvases work if services was touched.
- Works gallery opens if works/gallery was touched.
- Language switching works if copy/i18n was touched.
- Console has no site error.

## Output Format

When reporting work, include:

- Files changed.
- What behavior changed.
- Documentation updated: yes/no.
- If yes, list updated docs.
- If no, explain why.
- Checks run.
- Known risks or unverified items.
- Next recommended action.
