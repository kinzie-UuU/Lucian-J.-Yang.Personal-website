# Core Runtime

## Purpose

The core runtime makes the static page behave like a coordinated application while staying framework-free. It initializes global state, language, Hero runtime state, shared audio/cursor helpers, and the bridge used by later feature scripts.

## Owned Files

- `index.html`
- `three.min.js`
- `site-data.js`
- `script.js`
- `scripts/app-bootstrap.js`
- `scripts/runtime-bridge.js`
- `scripts/hero-state-runtime.js`
- `scripts/hero-sequence-runtime.js`

## Load Dependencies

- `three.min.js` must load before Three.js-dependent modules.
- `site-data.js` must load before language, Services, Works, and Gallery consumers.
- `runtime-bridge.js` must load before `app-bootstrap.js`.
- `script.js` must load after `app-bootstrap.js`, because it calls `window.initLucianApp?.()`.

## Runtime APIs

- `window.initLucianApp`
- `window.LucianApp`
- `window.initLucianRuntimeBridge`
- `window.LucianRuntime`
- `window.initHeroStateRuntime`
- `window.initHeroSequenceRuntime`

`window.LucianRuntime` is the shared bridge for sound, language, gallery closing, precision cursor state, field pointer state, Hero reset, Hero resize, and entered-state helpers.

## Change Checklist

- Keep `index.html` as the single page entry.
- Preserve script order unless all dependent globals are re-audited.
- Add new shared APIs to `docs/RUNTIME_CONTRACTS.md`.
- Avoid making feature modules depend on globals that load later.
- Prefer optional chaining for cross-feature calls.

## QA

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

Then open the page through a local server and confirm the console has no site errors on first load.
