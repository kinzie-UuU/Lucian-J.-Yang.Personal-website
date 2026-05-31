# Hero

## Purpose

Hero is the main visual stage after entry. It combines WebGL water, pointer ripples, SVG wireframe, fixed liquid field, a GLTF lion-head model, layered wordmark, and the Hero-to-About handoff.

## Owned Files

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `styles/liquid-glass.css`
- `scripts/hero-wireframe.js`
- `scripts/hero-water-surface.js`
- `scripts/hero-glb-model.js`
- `scripts/hero-ripples.js`
- `scripts/liquid-glass-field.js`
- `scripts/entry-hero-experience.js`
- `models/lion_head/`

## DOM Contracts

- `#hero-stage`
- `#hero-kinetic-canvas`
- `#hero-ripple-canvas`
- `#hero-wireframe`
- `#hero-model-scene`
- `#hero-model-canvas`
- `data-model-src="/models/lion_head/lion_head_2k.gltf"`

## Runtime Contracts

- `window.initHeroWireframe`
- `window.initHeroWaterSurface`
- `window.LucianHeroModel`
- `window.LucianLiquidField`
- consumes `window.LucianRuntime.heroRipples`
- produces `lucian:hero-about-handoff`

## Change Checklist

- Keep Three.js available before model/liquid scripts run.
- Keep model textures and buffers relative to the GLTF.
- Check reduced-motion behavior for animated surfaces.
- If Hero scroll math changes, check About landing and curtain timing.
- If pointer behavior changes, verify water, ripples, model drag, and liquid field do not fight each other.

## QA

- Water canvas is nonblank.
- Ripple canvas responds to pointer/click.
- Liquid field renders and resizes.
- Lion model loads, renders, and responds to interaction.
- Hero-to-About transition covers, lands, and releases scroll.
