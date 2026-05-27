# Documentation Maintenance

Use this document to keep project docs alive as the site evolves.

## When To Update Docs

Update docs in the same change when you modify:

- section structure, ids, classes used by JavaScript, or data attributes
- script or stylesheet load order
- `window.*` APIs
- custom events
- `site-data.js` schemas
- asset paths or model/video/audio dependencies
- scroll locking, section handoffs, or transition ownership
- QA requirements for a feature
- high-risk module boundaries

Small copy edits that do not change schema usually do not need docs, but bilingual or gallery schema changes do.

## Which Doc To Update

- Architecture changed: update `ARCHITECTURE.md`.
- Feature ownership changed: update `MODULES.md`.
- DOM ids, events, globals, script order, or data schemas changed: update `RUNTIME_CONTRACTS.md`.
- Process or QA expectations changed: update this file and `docs/README.md` if needed.
- Historical planning changed: update numbered docs only if they are still being used for active planning.

## Change Workflow

1. Check `git status --short` and preserve unrelated user changes.
2. Identify the feature system being changed.
3. Make the code change in the smallest relevant area.
4. Update the matching docs from the list above.
5. Run the baseline checks.
6. Run focused browser QA for the affected feature.
7. In the final note, mention both code and doc updates.

## Module Doc Template

When adding a new module entry to `MODULES.md`, use this shape:

```markdown
## Feature Name

Owned files:

- `index.html`
- `styles/example.css`
- `scripts/example.js`

Responsibilities:

- What the user sees or does.
- What runtime state the module owns.

Contracts:

- DOM ids/classes/data attributes.
- `window.*` APIs.
- custom events produced/consumed.
- data or asset assumptions.

QA:

- The smallest focused checks that prove the feature still works.
```

## Runtime Contract Template

When adding a custom event, document it like this:

```markdown
- `lucian:example-event`
  - Producer: `scripts/example.js`.
  - Consumers: `scripts/other-example.js`.
  - Detail: `{ sectionId, reason }`.
  - Firing rule: once per controlled section jump.
```

When adding a global API, document it like this:

```markdown
- `window.LucianExample`
  - Defined in: `scripts/example.js`.
  - Used by: `scripts/consumer.js`.
  - Methods: `open()`, `close()`, `refreshLanguage()`.
  - Load-order note: consumer must load after definition or use optional chaining.
```

## QA Notes

The baseline automated checks are necessary but not enough for visual systems. Always add focused manual QA for the edited feature:

- Entry: key render, enter, replay.
- Hero: water, liquid, lion model, scroll and handoff.
- About: portrait fallback/video scrub and Services bridge.
- Services: PrismaticBurst portal, time tunnel, flat in-tunnel service inscriptions, scroll story.
- Works/Gallery: rows, side rail, gallery open/close/detail/back.
- Copy/language: `zh-CN` / `en` switching and open Gallery refresh.
- Layout: desktop/mobile horizontal overflow.

## Documentation Style

- Prefer current, factual descriptions over plans.
- Name exact files and contracts.
- Keep implementation notes close to the module that owns them.
- Keep historical context in numbered docs and current operating rules in the long-lived docs.
- Avoid documenting temporary debugging states unless they affect future maintenance.
