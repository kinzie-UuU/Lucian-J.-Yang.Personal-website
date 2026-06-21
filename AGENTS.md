# AGENTS.md

## Project Overview

This is Lucian J. Yang's personal packaging-design portfolio. It is a pure static site with `index.html` as the only page entry. The site directly loads modular CSS, plain browser JavaScript, local images, GLB/GLTF models, video, audio, and fonts.

Do not migrate it to React, Vue, Next, Vite, or any other framework. There is no package manager, bundler, or install step.

## Current Stack

- HTML: `index.html`
- CSS: `styles.css` plus modules under `styles/`
- JavaScript: ordered plain `<script>` tags with `window.*` runtime bridges
- Data: `site-data.js`
- 3D/WebGL: local `three.min.js`, raw WebGL canvases, local model files under `models/`
- Vendor: local GSAP files under `scripts/vendor/gsap/` for scroll curtain morphing
- Assets: `images/`, `models/`, `videos/`, `audio/`, `fonts/`
- Tools: `tools/check-project.js`, `tools/runtime-smoke-check.js`, `tools/local-proxy-server.js`

## Local Run

Prefer a local static server:

```bash
python -m http.server 4180
```

Open:

```text
http://127.0.0.1:4180/index.html
```

The Node local proxy is also available:

```bash
node tools/local-proxy-server.js
```

## Checks

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

After JS edits, run `node --check` on every touched `scripts/*.js` file.

For fuller browser smoke QA:

```bash
node tools/runtime-smoke-check.js
```

## Current Page Systems

- Top meta header: identity, Beijing clock, language switch, sound, fullscreen, contact arrow.
- Entry: `#entry-screen`, archive year marquee, progress text/bar, auto-enter, scroll/touch enter, Hero return from avatar.
- Hero: dark CRT AIGC video broadcast, wordmark layer, Hero-to-About curtain.
- About/Portrait: portrait video/fallback, scroll reveal, video scrub, About-to-Services curtain.
- Services: natural scroll-driven sticky title gate, About handoff cleanup at Services takeover, local WebGL2 black-water PrismaticBurst entry canvas, local WebGL2 time-tunnel canvas, flat in-tunnel service inscription stage.
- Works: five category rows, hover preview, bottom-nav Works entry, gallery entry.
- Scroll curtains: Works-to-Contact handoff; Services owns the timed sequence that lands on the Works transition copy screen.
- Gallery: overlay, category/project browsing, detail page, back/close.
- Contact: Gmail compose form, social links, WeChat QR modal, toast.
- Clients: selected-client marquee and credibility copy.
- Bottom nav: collapsed avatar dock that expands on hover/click to About / Services / Works / Contact. Works is also reached through natural scroll and Services completion.

## CSS Modules

- `styles/fonts.css`: local font declarations.
- `styles.css`: global tokens, reset, body/page states.
- `styles/cursor.css`: precision cursor.
- `styles/typography.css`: shared type and section styles.
- `styles/home.css`: Entry and Hero base layout.
- `styles/entry-hero-experience.css`: Entry-to-Hero reveal and Hero-to-About black curtain.
- `styles/about.css`: About/Portrait.
- `styles/services.css`: Services.
- `styles/works.css`: Works and transition.
- `styles/clients.css`: Clients.
- `styles/work-gallery.css`: Gallery.
- `styles/contact.css`: Contact.
- `styles/navigation.css`: top controls and bottom nav.
- `styles/responsive.css`: cross-section responsive corrections.
- `styles/shared-motion.css`: reveal helpers and scroll curtain styles.

## Visual Rules

- Do not use text shadows anywhere in this project. Typography should rely on color, contrast, size, weight, spacing, and background treatment instead of `text-shadow`.

## JS Load Order

Keep the order in `index.html` unless the dependency chain is re-audited. Key order:

1. `three.min.js`
2. `site-data.js`
3. Hero curtain/state/sequence scripts
4. `runtime-bridge.js`
5. `app-bootstrap.js`
6. language/static text/effect helpers
7. `script.js`
8. Hero visual/runtime scripts
9. Services scripts
10. Gallery and Works navigation
11. UI controls, contact, reveal, cursor, Works hover/transition, clock/nav, clients
12. portrait/about curtain
13. GSAP vendor and `scroll-curtain-transitions.js`
14. `entry-key-model.js`
15. `entry-hero-experience.js`

## High-Risk Areas

- `index.html` structure, IDs, and script order.
- `site-data.js` data schema and image paths.
- `scripts/work-gallery.js`.
- Hero CRT/video/entry scripts.
- Curtain scripts: `entry-hero-experience.js`, `about-curtain.js`, `scroll-curtain-transitions.js`.
- Services WebGL/scroll scripts.
- Large visual CSS modules: `home.css`, `about.css`, `services.css`, `work-gallery.css`, `navigation.css`, `shared-motion.css`.
- `three.min.js` and minified vendor files.

## Safer Areas

- `docs/`
- `tools/`
- Small copy changes in `site-data.js`
- Small section-local CSS changes in the matching module
- Small accessibility labels that preserve DOM contracts

## Collaboration Rules

- Start by checking `git status --short`.
- Do not revert or delete changes you did not make unless explicitly requested.
- Do not commit or push unless explicitly requested.
- Change one system at a time.
- Before edits, say which files will be touched and which high-risk areas will not be touched.
- If a code change affects structure, behavior, dependencies, asset paths, or QA standards, update the relevant docs.
- Do not put temporary verification files in the project root.

## Minimum QA After Code Changes

- `node tools/check-project.js` passes.
- Touched JS files pass `node --check`.
- Page opens through a local server.
- Entry key enters and replays.
- Console has no site errors.
- If Hero changed, verify CRT video/scroll.
- If Services changed, verify the PrismaticBurst entry canvas, time-tunnel canvas, flat in-tunnel service inscription stage, and scroll story.
- If Works/Gallery changed, verify Works rows, side rail, Gallery open/close/detail/back.
- If copy/language changed, verify `zh-CN` / `en` switching and open Gallery text refresh.
- If layout changed, verify desktop/mobile horizontal overflow.
