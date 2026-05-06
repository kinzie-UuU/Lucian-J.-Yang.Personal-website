# Website Style Engine Spec

Version: v0.1  
Status: working draft  
Scope: portfolio and studio website strategy generation system

## Purpose

This document defines the structure of a future skill system that can generate high-quality portfolio or studio website strategies based on a curated reference library.

The goal is not to imitate a specific website.

The goal is to:

- extract reusable design and interaction logic from high-quality references
- decide which patterns fit a user's real positioning
- reject patterns that are visually attractive but strategically wrong
- output a complete website strategy and implementation direction

This spec exists alongside the 100-site audit and should evolve as the audit becomes more complete.

## Core Thesis

We are not building a "cool website generator".

We are building:

1. a reference-site knowledge layer
2. a design taxonomy layer
3. a decision engine
4. a generation contract

Without those four layers, the system will produce style collage instead of strategic design.

## Non-Goals

This system should not:

- directly clone reference websites
- produce Awwwards-style spectacle by default
- assume that more animation means better design
- confuse a packaging designer with a creative developer
- prefer technical intensity over message clarity

## System Layers

## 1. Reference Library

Each reference website must be stored as a structured record, not just a link.

Minimum fields:

- basic info
- identity statement
- business orientation
- visual language
- interaction language
- technical mode
- fit rules
- evidence notes
- confidence level

The 100-site audit in this project is intended to populate this layer.

## 2. Taxonomy Layer

The reference library should be compressed into reusable families of website behavior.

Working taxonomy dimensions:

- visual thesis
- interaction thesis
- content architecture
- material system
- case presentation

Expected outcome:

- a small number of stable, reusable portfolio families
- fewer than the number of raw references
- enough abstraction to generate decisions without copying sites

## 3. Decision Engine

The system must decide what is appropriate before it generates anything.

It should answer:

- who is the user
- what is the site for
- who is the audience
- how much experimentation is appropriate
- what visual family fits
- what interaction family fits
- what must be rejected

This is the real "skill" layer.

## 4. Generation Contract

Every generation run should produce a consistent structure:

1. positioning judgement
2. reference recall and rejection
3. site strategy
4. visual language system
5. information architecture
6. interaction system
7. technical implementation guidance
8. content rules
9. risk check
10. code-model prompts

## Guiding Principles

### 1. Strategy before aesthetics

Visual distinction is valuable only if it supports the user's real positioning.

### 2. Interaction must earn its place

Every strong interaction should support:

- orientation
- emphasis
- sequencing
- memory
- conversion

If it serves none of these, it is likely decorative noise.

### 3. Design feeling should come from system, not ornament

Premium feeling should come from:

- structure
- rhythm
- typography
- spacing
- material consistency
- disciplined motion

Not from random effects.

### 4. Role-specific logic matters

A creative developer, a packaging designer, a branding studio, and an immersive lab should not receive the same website logic.

## Input Schema

The first version should stay relatively compact.

Required inputs:

- `project_type`
- `user_role`
- `business_goal`
- `target_audience`
- `content_assets`
- `visual_preference`
- `interaction_preference`
- `technical_constraints`
- `brand_keywords`
- `avoid_keywords`

Suggested schema:

```yaml
project_type: personal_portfolio | studio_website | campaign_site | case_showcase
user_role: ""
business_goal: ""
target_audience: []
content_assets:
  project_count: 0
  project_depth: low | medium | high
  photo_quality: low | medium | high
  writing_materials: low | medium | high
  case_studies_available: true | false
visual_preference:
  tone: []
  style_keywords: []
interaction_preference:
  level: low | medium | high
  preferred_modes: []
technical_constraints:
  framework: nextjs | react | framer | static_html | unknown
  webgl_allowed: true | false
  animation_lib: gsap | framer_motion | css_only | unknown
  performance_priority: high | medium | low
brand_keywords: []
avoid_keywords: []
```

## Output Schema

Suggested structure:

```yaml
positioning_judgement:
  user_identity: ""
  website_mission: ""
  primary_conversion_goal: ""
  recommended_site_character: ""

reference_retrieval:
  suitable_patterns: []
  rejected_patterns: []
  why_take: []
  why_reject: []

strategy:
  core_statement: ""
  strategic_direction: ""
  tone_summary: ""
  differentiation_angle: ""

visual_language:
  color_logic: ""
  typography_logic: ""
  shape_language: ""
  spatial_language: ""
  texture_language: ""
  motion_temperament: ""

information_architecture:
  sitemap: []
  page_blocks: []

interaction_system:
  homepage_interactions: []
  project_page_interactions: []
  navigation_interactions: []
  hover_feedback: []
  transition_rules: []

technical_plan:
  rendering_strategy: ""
  animation_strategy: ""
  performance_notes: []
  build_notes: []

content_rules:
  headline_rules: []
  copy_rules: []
  project_case_rules: []

risk_check:
  overdesign_risks: []
  mismatch_risks: []
  clarity_risks: []
  implementation_risks: []

code_prompt:
  homepage_prompt: ""
  fullsite_prompt: ""
```

## Reference Record Schema

Each reference website should eventually map to a structure like this:

```yaml
id: site_000
name: ""
url: ""
type: personal | studio | agency | experimental | campaign
owner_identity: ""
industry_fit: []

identity_statement: ""
business_orientation: low | medium | high
conversion_clarity: low | medium | high
audience_type: []

visual_language:
  palette: []
  typography: []
  shapes: []
  space: []
  texture: []

interaction_language:
  scroll_behavior: []
  hover_behavior: []
  motion_types: []
  navigation_style: []

technical_mode:
  dom_first: true | false
  svg_first: true | false
  canvas_used: true | false
  webgl_used: true | false
  likely_stack: []
  complexity_level: low | medium | high

fit_rules:
  suitable_for: []
  not_suitable_for: []
  borrowable_parts: []
  danger_points: []

evidence_notes: []
confidence: high | medium | low
```

## Decision Rules

## Group A: Identity Match

### A1. Packaging designer role

If `user_role = packaging_designer`:

- do not default to creative-developer identity signals
- interaction should express judgment, structure, materiality, sequence, or constraint
- prioritize layered reveal, packaging logic, comparison logic, and decision framing
- reduce overt technical spectacle

### A2. Lead generation

If `business_goal = lead_generation`:

- contact paths must stay visible or easy to reach
- navigation must remain legible
- homepage may be strong, but not at the cost of identity clarity
- reject experiments that obscure service understanding

### A3. Client audience

If `target_audience` includes clients:

- every project should show problem, judgment, and result
- image-only display is not enough
- the user must understand what the designer actually provides

### A4. Peer audience

If the audience is mostly peers:

- experimentation may increase
- interaction intensity may increase
- but site structure still cannot collapse into chaos

## Group B: Content Assets

### B1. Low project count

If `project_count < 6`:

- prefer concise site architecture
- emphasize selection quality and viewpoint
- do not stretch content just to simulate scale

### B2. No full case studies

If `case_studies_available = false`:

- use selected works + method fragments + capability framing
- do not force long-form project storytelling

### B3. Weak imagery

If `photo_quality = low`:

- rely more on typography, rhythm, and system clarity
- reduce dependency on giant image-led layouts

## Group C: Interaction Intensity

### C1. Low interaction preference

If `interaction_preference.level = low`:

- motion should remain mostly micro and atmospheric
- avoid drag systems, physics-heavy scenes, or large deformation fields

### C2. High interaction preference

If `interaction_preference.level = high` and `business_goal != lead_generation`:

- a stronger homepage signature interaction is allowed
- but the entire site must not become a demo reel

### C3. Premium minimal tone

If `visual_preference.tone` includes premium or minimal:

- tighten the palette
- reduce motion frequency
- increase spacing discipline
- avoid playful clutter

## Group D: Technical Constraints

### D1. No WebGL

If `webgl_allowed = false`:

- prefer DOM, SVG, CSS transforms, and light JS math
- pseudo-3D should be simulated through layout and transform logic

### D2. High performance priority

If `performance_priority = high`:

- do not recommend full-screen shader reliance
- avoid always-on heavy animation
- concentrate motion around high-value points

### D3. Static HTML path

If `framework = static_html`:

- keep architecture flat
- prefer portable motion logic
- avoid state-heavy or tool-dependent structures

## Packaging Designer Branch

This branch is especially important for Kinzie-like positioning.

The homepage should not say:

- "I love creativity"
- "Packaging designer / brand designer"
- "Creative professional"

It should communicate:

- decision quality under constraints
- packaging logic across OEM, gifting, and brand upgrade contexts
- ability to balance aesthetics, process, cost, and delivery
- AI as acceleration, not as replacement for judgment

Preferred interaction grammar:

- layered reveal
- sequence comparison
- material or structure switching
- packaging logic expressed as movement
- filtering or sorting as a visible act of judgment

Avoid:

- over-gamified worlds
- over-developer-coded identity
- unreadable experimental navigation
- interaction that does not connect to packaging logic

## Risk Model

Each run should include explicit rejection logic.

The system must explain:

- what was rejected
- why it was rejected
- what identity mismatch it avoids
- what usability or maintenance risk it prevents

This is important because restraint is part of design intelligence.

## Suggested Future Skill Packaging

This spec likely should not become one giant skill only.

A better final architecture may be:

- `portfolio-style-engine`
  top-level orchestrator
- `portfolio-reference-retriever`
  reference recall
- `portfolio-decision-engine`
  strategic filtering
- `portfolio-output-contractor`
  structured output formatting
- `packaging-portfolio-branch`
  specialized role logic for Kinzie-like users

## Implementation Notes

The audit and the engine should inform each other:

- the audit populates the reference layer
- the spec guides what fields to record in the audit
- later, real test generations should be compared against the rules here

This means the spec is not final yet.

It should stay editable until:

- at least a meaningful subset of the 100 sites is audited
- the taxonomy becomes stable
- the packaging branch has been validated against real outputs

## Next Steps

1. Audit the Muzli list in batches and populate the reference layer
2. Refine taxonomy families from real evidence
3. Convert the best parts of this spec into one or more formal skills
4. Test the engine specifically on Kinzie
5. Only then connect it to code-generation workflows

