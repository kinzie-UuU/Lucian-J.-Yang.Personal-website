# Build and Iteration Plan

## Current Project State

The site is a working pure static portfolio with modular CSS/JS, 3D key entry, Hero water/liquid/GLB model systems, portrait reveal, services scroll story, works/gallery browsing, client trust section, contact flow, and bilingual data. It has no framework, no package manager, and no build step.

## P0: Stabilize Baseline

Allowed files:

- `docs/`
- `tools/`
- Small non-runtime README/checklist updates

Work:

- Keep audit, PRD, technical design, module map, QA checklist, and agent rules current.
- Use `tools/check-project.js` before future visual/code work.
- Use `tools/runtime-smoke-check.js` for broader browser smoke QA when interaction/layout changes.
- Record known QA gaps.

Acceptance:

- Docs describe current code accurately.
- `node tools/check-project.js` passes.
- No business code changes required.

## P1: Visual and Interaction Optimization

Allowed files:

- One section CSS file at a time.
- Matching small markup only when required.
- Matching interaction script only when required.
- `site-data.js` for copy paired with visual changes.

Work:

- Improve spacing, readability, and mobile fit.
- Keep one page system per change.
- Preserve animation constants unless explicitly targeted.
- Treat Entry, Hero, About, Services, Works/Gallery, Contact, Clients, Navigation, and Scroll Curtains as separate systems.

Acceptance:

- Target section passes desktop and mobile visual QA.
- No unrelated section regressions.
- Console has no site errors.

## P2: Performance Optimization

Allowed files:

- `tools/`
- Docs
- Carefully scoped runtime files after measurement

Work:

- Identify heavy model, image, WebGL, canvas, and video costs.
- Add non-mutating checks first.
- Optimize initialization, reduced-motion paths, and asset usage only after profiling.

Acceptance:

- No visual feature is removed unintentionally.
- Entry, Hero, Services, Works Gallery, Contact, and navigation still pass QA.
- No framework or package-manager introduction.

## P3: Content Optimization

Allowed files:

- `site-data.js`
- Limited `index.html` fallback text
- Docs

Work:

- Curate project titles and category descriptions.
- Improve bilingual copy consistency.
- Add case-study structure only after confirming content.

Acceptance:

- Both languages updated.
- No unsupported claims.
- Gallery data still references existing assets.

## P4: File Structure Optimization

Allowed files:

- To be decided only after P0-P3 stability.

Work:

- Consider splitting large files such as `work-gallery.js` only with a detailed migration plan.
- Consider documenting globals and adding more tooling.
- Avoid framework conversion.

Acceptance:

- Behavior parity proven by browser QA.
- Script order and global contracts remain documented.

## Not Recommended Now

- Framework migration.
- Bundler setup.
- Rewriting gallery architecture.
- Renaming assets.
- Editing `three.min.js` or minified vendor files.
- Broad CSS redesign across many sections.
- Changing multiple animation systems in one pass.

## Risk List

- Script order dependency is fragile.
- Gallery data and image paths are large and easy to break.
- Hero and Services effects are visually coupled to CSS, JS, WebGL, and DOM geometry.
- Curtain timing depends on scroll geometry and sticky section heights.
- Browser APIs for clipboard/fullscreen/media can vary.
- Mobile overflow risk is high because of large display typography and canvases.
- Chinese/English data must preserve UTF-8.
- Contact compose behavior depends on browser/account context.
