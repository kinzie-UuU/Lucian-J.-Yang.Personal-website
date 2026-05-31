# Documentation Index

This folder is the long-lived operating manual for the Lucian J. Yang static portfolio. Keep it aligned with the code as the site changes.

## Start Here

- `ARCHITECTURE.md`: system architecture, runtime layers, loading model, and section flow.
- `MODULES.md`: feature-by-feature ownership map with files, contracts, and QA notes.
- `modules/`: per-feature maintenance playbooks for Core, Entry, Hero, About, Services, Works/Gallery, Navigation, and other runtime systems.
- `RUNTIME_CONTRACTS.md`: DOM ids, global bridges, events, script order, data contracts, and asset rules.
- `MAINTENANCE.md`: how to update documentation when changing code.

## Supporting Project Docs

The numbered documents are useful historical and planning references:

- `00_PROJECT_AUDIT.md`: project audit notes.
- `01_RESEARCH.md`: research notes.
- `02_PRD.md`: product requirements.
- `03_TECH_DESIGN.md`: earlier technical design summary.
- `04_AGENTS.md`: agent-facing instructions.
- `05_MODULE_MAP.md`: earlier load-order and page-system map.
- `06_QA_CHECKLIST.md`: QA checklist.
- `07_BUILD_PLAN.md`: build plan.

When the code changes, prefer updating the long-lived docs first. The numbered docs can remain as project history unless a current workflow depends on them.

## Documentation Rules

- Keep the no-framework constraint explicit: this project is static HTML, modular CSS, and ordered plain browser JavaScript.
- Document ownership by feature system, not only by file name.
- Keep `MODULES.md` as the map and update the matching `modules/*.md` playbook when feature behavior changes.
- Record cross-module contracts when adding ids, classes, `window.*` bridges, custom events, asset paths, or script-order dependencies.
- For copy, language, or gallery data changes, update the data contract notes if the schema changes.
- For visual or scroll-flow work, update the relevant module QA notes.
