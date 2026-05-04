# Portfolio Style Engine Test Cases

This file is used to validate whether the portfolio-style engine selects the right skill stack and output direction.

The goal is not to produce final websites here.

The goal is to test:

- intake quality
- family selection
- rejection quality
- role matching
- output usefulness

## Test Case 01: Packaging Designer

### Input

- user role: packaging designer + brand designer
- business goal: client leads and authority
- audience: brand teams, marketing leads, procurement, collaborators
- content assets:
  - many packaging projects
  - some branding and type work
  - medium-to-high image quality
  - few full case studies
- visual preference:
  - premium
  - restrained
  - structured
  - dark but not gloomy
- interaction preference:
  - medium
  - wants one signature move, not a whole demo reel
- technical constraints:
  - prefer DOM / SVG / CSS
  - avoid heavy WebGL

### Expected Selection

- Primary:
  - `portfolio-strategic-authority`
- Secondary:
  - `portfolio-premium-restraint`
  - `portfolio-hybrid-solo-studio`
- Filter:
  - `portfolio-frontier-boundary-filter`
- Branch:
  - `packaging-portfolio-branch`

### Expected Rejections

- fully creative-developer identity
- heavy immersive-tech first screen
- game-like navigation

### Success Condition

The output should feel like:

- a premium design professional
- strong judgment under constraints
- not a generic brand designer
- not a creative developer showcase

## Test Case 02: Creative Developer

### Input

- user role: creative developer
- business goal: reputation, hiring, selective client work
- audience: design peers, studios, recruiters
- content assets:
  - medium number of projects
  - strong technical demos
  - medium writing quality
- visual preference:
  - bold
  - authored
  - experimental
- interaction preference:
  - high
  - wants signature-level interaction
- technical constraints:
  - WebGL allowed
  - GSAP allowed

### Expected Selection

- Primary:
  - `portfolio-pure-frontend-interaction`
- Secondary:
  - `portfolio-concept-coherence`
  - `portfolio-premium-restraint` or `portfolio-hybrid-solo-studio` depending on tone
- Filter:
  - only light filtering

### Expected Rejections

- overly corporate strategic-authority language
- generic agency structure if it weakens identity

### Success Condition

The output should prove medium control and authorial technical craft without collapsing into unusable spectacle.

## Test Case 03: Boutique Branding Studio

### Input

- user role: small branding studio
- business goal: premium leads
- audience: founders, brand teams, collaborators
- content assets:
  - strong visual work
  - 6-10 projects
  - limited long-form writing
- visual preference:
  - premium
  - conceptually sharp
  - editorial
- interaction preference:
  - subtle to medium
- technical constraints:
  - WebGL discouraged

### Expected Selection

- Primary:
  - `portfolio-strategic-authority`
- Secondary:
  - `portfolio-concept-coherence`
  - `portfolio-premium-restraint`
- Filter:
  - `portfolio-frontier-boundary-filter`

### Expected Rejections

- developer-coded interaction identity
- archive-heavy structure if the project count is still small

### Success Condition

The result should feel:

- expensive
- coherent
- memorable
- commercially readable

## Test Case 04: Photographer / Film Director

### Input

- user role: photographer / film director
- business goal: reputation and selected client work
- audience: brands, commissioners, agencies
- content assets:
  - very strong imagery
  - limited need for explanatory copy
- visual preference:
  - minimal
  - cinematic
  - low noise
- interaction preference:
  - subtle
- technical constraints:
  - keep performance clean

### Expected Selection

- Primary:
  - `portfolio-premium-restraint`
- Secondary:
  - `portfolio-archive-credibility` or image-led production logic
- Filter:
  - avoid unnecessary tech spectacle

### Expected Rejections

- proposition-heavy strategy-first copy
- interaction systems stronger than the media itself

### Success Condition

The output should let the work carry the emotion while the site carries confidence and order.

## Test Case 05: Small Multidisciplinary Solo Practice

### Input

- user role: independent designer working across brand, digital, and art direction
- business goal: attract better-fit clients
- audience: founders, collaborators, hiring managers
- content assets:
  - moderate number of projects
  - mixed image quality
  - limited long-form writing
- visual preference:
  - warm premium
  - clear
  - not too minimal
- interaction preference:
  - medium
- technical constraints:
  - prefers simple maintainable build

### Expected Selection

- Primary:
  - `portfolio-hybrid-solo-studio`
- Secondary:
  - `portfolio-premium-restraint`
  - `portfolio-strategic-authority`
- Filter:
  - reject overly immersive systems

### Expected Rejections

- giant archive structures if the practice is still compact
- high-maintenance technical hero systems

### Success Condition

The result should feel like a sharp one-person studio, not a vague freelancer page and not a fake agency.

