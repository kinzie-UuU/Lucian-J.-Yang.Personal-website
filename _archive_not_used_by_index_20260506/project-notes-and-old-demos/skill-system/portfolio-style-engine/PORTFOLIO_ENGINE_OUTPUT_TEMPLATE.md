# Portfolio Engine Output Template

This file defines the preferred output structure for the portfolio-style engine.

The goal is to make outputs:

- readable
- reusable
- easy to react to
- easy to pass into implementation

## Required Output Structure

## 1. Positioning Judgement

State:

- who the user is
- what the website is really for
- who needs to understand it first
- what kind of website character is most appropriate

Suggested structure:

```md
## Positioning Judgement

- Identity:
- Website mission:
- Primary audience:
- Most appropriate site character:
- This site should not become:
```

## 2. Skill Stack Selection

State:

- primary skill family
- secondary skill families
- boundary filter
- role branch

Suggested structure:

```md
## Skill Stack Selection

- Primary:
- Secondary:
- Boundary filter:
- Role branch:
```

## 3. Rejected Directions

This is mandatory.

State:

- what directions were rejected
- why
- what risk each rejection avoids

Suggested structure:

```md
## Rejected Directions

1. 
   - Why rejected:
   - Risk avoided:
```

## 4. Website Strategy

State:

- one-sentence website thesis
- strategic direction
- differentiation angle
- what the first 10 seconds should communicate

Suggested structure:

```md
## Website Strategy

- Core statement:
- Strategic direction:
- Differentiation angle:
- First 10 seconds must communicate:
```

## 5. Visual Language System

State:

- color logic
- typography logic
- spatial logic
- material logic
- motion temperament

Suggested structure:

```md
## Visual Language System

- Color:
- Typography:
- Spatial language:
- Material language:
- Motion temperament:
- Avoid:
```

## 6. Homepage Structure

Describe the homepage by sections, not just vague ideas.

Suggested structure:

```md
## Homepage Structure

1. First screen
   - Job:
   - Visual focus:
   - Interaction:

2. Selected works
   - Job:
   - Visual focus:
   - Interaction:

3. Method / About
   - Job:
   - Visual focus:
   - Interaction:

4. Contact / CTA
   - Job:
   - Visual focus:
   - Interaction:
```

## 7. Site Architecture

State:

- page list
- each page's purpose
- whether case studies are deep or shallow

Suggested structure:

```md
## Site Architecture

- Home:
- Works:
- Project page:
- About / Method:
- Contact:
```

## 8. Interaction System

State:

- homepage signature interaction
- hover behavior
- scroll behavior
- transition behavior
- where interaction should stay quiet

Suggested structure:

```md
## Interaction System

- Signature move:
- Hover grammar:
- Scroll grammar:
- Transition grammar:
- Quiet zones:
```

## 9. Technical Direction

State:

- preferred rendering strategy
- recommended animation method
- whether WebGL is allowed
- performance priority

Suggested structure:

```md
## Technical Direction

- Rendering:
- Animation:
- WebGL:
- Performance rule:
- Implementation note:
```

## 10. Content Rules

State:

- headline rules
- body copy rules
- project description rules
- CTA rules

Suggested structure:

```md
## Content Rules

- Headlines:
- Body copy:
- Project descriptions:
- CTA:
```

## 11. Risk Check

This is mandatory.

Suggested structure:

```md
## Risk Check

- Overdesign risk:
- Identity mismatch risk:
- Clarity risk:
- Implementation risk:
```

## 12. Implementation Prompt

Include one prompt that can be handed to a code model.

Suggested structure:

```md
## Implementation Prompt

[A compact but concrete prompt for a coding model]
```

## Output Quality Rules

- Prefer direct design language over abstract hype.
- Do not describe every possible option.
- Choose a direction.
- Explain tradeoffs clearly.
- Keep the output actionable.
- Avoid mood-board vagueness.

