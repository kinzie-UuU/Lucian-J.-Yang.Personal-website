# Hero Cube

Reusable scroll-driven packaging cube module.

## Files

- `hero-cube.css` contains all cube styling and the vertical-face seam workaround.
- `hero-cube.js` drives the cube rotation from the surrounding `.hero-section` scroll progress.
- `hero-cube.html` is the markup snippet currently used in `index.html`.

## Required Host Elements

The module expects:

- `.hero-section` as the scroll section.
- `#hero-stage` as the visual stage where progress variables are written.
- `#hero-cube` inside `.hero-cube-scene`.

Include the CSS after the page-level hero CSS, and include the JS after the base hero/runtime scripts.
