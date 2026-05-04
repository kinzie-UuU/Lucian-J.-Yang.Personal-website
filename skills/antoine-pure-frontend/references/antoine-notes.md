# Antoine Notes

## Why Antoine's work feels "pure"

The common thread across the portfolio, Nod Coding, and the commentary around his work is not just style. It is the **implementation posture**:

- strong interaction built from core web primitives
- pseudo-3D made from 2D geometry
- SVG and DOM kept as first-class render layers
- physical behavior authored by hand
- minimal dependence on heavy 3D frameworks

This creates a feeling of technical honesty:

- text remains text
- images remain images
- geometry remains inspectable
- motion feels computed, not pasted on

## Distilled Patterns

### 1. SVG as a live geometry surface

Use SVG when line deformation or geometry control matters:

- wave grids
- masks
- perspective line fields
- rings, curves, and wireframe structures

The important lesson is not "use SVG everywhere". It is:

`When the interaction is about geometry, make geometry a first-class layer.`

### 2. Pseudo-3D through flat planes

Depth often comes from:

- CSS `perspective`
- layered DOM nodes
- scale and opacity falloff
- overlap
- careful transform origin
- scroll-linked or pointer-linked reorientation

This is different from real 3D. It is more graphic, more editable, and usually more web-native.

### 3. Hand-authored physics feeling

The motion typically reads as:

- spring-like
- inertial
- damped
- slightly delayed

That feeling can come from simple formulas:

- lerp
- velocity
- friction
- overshoot and settle
- distance-based falloff

### 4. Strong composition before components

The work usually feels designed as a poster or apparatus, not as a UI kit.

Common traits:

- bold first impression
- limited palette
- clear negative space
- one dominant interaction in view
- supporting UI kept quiet

### 5. Graphic consistency

Even when sections differ, they still feel related because they share:

- the same spatial fiction
- the same line logic
- the same motion temperament
- the same typographic authority

## How To Apply This To Kinzie

For `Kinzie`, the Antoine-inspired move is **not** to copy his exact visuals.

The useful transfer is:

- make the homepage a field of project planes
- keep the top chrome quiet and material-driven
- remove explanatory hero clutter
- let interaction reveal quality
- build depth from flat cards, line overlays, and motion damping

Recommended translation:

`A dark archive of floating packaging studies with restrained pseudo-3D depth, sparse chrome, and tactile front-end interaction.`

## Source Links

- Antoine portfolio: https://wodniack.dev
- Antoine CodePen: https://codepen.io/wodniack
- Nod Coding: https://nodcoding.com
- In Pieces: http://species-in-pieces.com
- Antoine Awwwards profile: https://www.awwwards.com/antoinewodniack

## Notes From Source Review

### wodniack.dev

Observed themes:

- monochrome-first composition
- strong typographic presence
- graphic spatial illusion
- interaction that feels hand-authored rather than plugin-driven

### codepen.io/wodniack

Used as evidence of:

- experimental SVG or geometry-driven interaction
- front-end craft shown at prototype scale
- a tendency to expose the technical construction rather than hide it

### nodcoding.com

Useful for:

- confirming the same authorial habits carry into another project
- interaction as identity, not as garnish
- strong depth fiction built from flat web layers

### species-in-pieces.com

Useful historical reference:

- CSS and shape-driven storytelling can feel profound without heavy 3D
- the emotional strength comes from composition + interaction logic

### awwwards.com/antoinewodniack

Useful as validation that the work is recognized specifically for:

- creative development craft
- front-end execution quality
- authored interaction language

