# Portfolio Engine Dialog Flow

This file defines how the top-level agent should conduct a portfolio-website conversation.

Goal:

- keep the conversation natural
- avoid overwhelming the user
- ask only the questions that materially change the output
- choose the smallest useful set of skills
- produce a distinctive site strategy without forcing the user into designer jargon

## Core Principle

The user should not need to know the taxonomy or the skill system.

They should be able to speak naturally, such as:

- "I need a personal website."
- "I am a brand designer."
- "I want it to feel premium but not boring."
- "I like Antoine but do not want it too developer-looking."

The agent is responsible for:

- translating raw user language into design variables
- detecting missing information
- asking targeted follow-up questions
- selecting the right portfolio family stack

## Conversation Stages

## Stage 1: Capture the first signal

Detect from the user's first message:

- role
- goal
- desired tone
- any named references
- any negative constraints

If enough is already clear, do not ask broad discovery questions.

## Stage 2: Ask only high-impact clarifiers

Prefer short, practical questions.

Ask only when the answer would materially affect:

- portfolio family selection
- interaction intensity
- content architecture
- technical direction

Prioritize these gaps:

1. who the audience is
2. whether the site is for leads, hiring, or expression
3. whether the content assets are strong or weak
4. whether strong interaction is truly desired
5. whether there are hard technical limits

## Stage 3: Translate answers into internal variables

Map the conversation into:

- user role
- business goal
- target audience
- content strength
- visual preference
- interaction preference
- technical constraints
- avoid patterns

Do not expose raw schema unless useful.

## Stage 4: Choose the skill stack

The agent should select:

- one primary portfolio family skill
- up to two secondary supporting skills
- one boundary filter if needed
- one role branch if needed

Example:

- primary: `portfolio-strategic-authority`
- secondary: `portfolio-premium-restraint`
- secondary: `portfolio-hybrid-solo-studio`
- filter: `portfolio-frontier-boundary-filter`
- branch: `packaging-portfolio-branch`

## Stage 5: Produce the strategy

Output should not feel like an abstract workshop note.

It should feel like a clear design direction the user can react to immediately.

## Stage 6: Iterate

After the first strategy:

- refine direction
- tighten the chosen family stack
- update the homepage and section logic
- only then move toward implementation or code generation

## Question Priority

Use this order when asking follow-up questions:

1. Who needs to understand the site fastest?
2. Is this site mainly for leads, hiring, reputation, or self-expression?
3. Do you already have strong project images and detailed case studies?
4. Do you want the interaction to feel subtle, noticeable, or signature-level?
5. Is there any technical line we should not cross, like WebGL or heavy animation?

## Good Question Style

Prefer:

- "Who do you need this site to convince first?"
- "Do you want the site to help you get clients, or mainly show your point of view?"
- "Are your project visuals already strong enough to carry large sections?"
- "Should the interaction stay subtle, or do you want one strong signature move?"

Avoid:

- long multi-part questionnaires
- taxonomy-heavy language
- vague questions like "Tell me more about your style"

## Minimal Conversation Mode

If the user is impatient or already gives clear signals:

- make reasonable assumptions
- state them
- proceed

Only ask a question if it changes the outcome in a meaningful way.

## High-Touch Conversation Mode

If the user is exploratory, unsure, or wants to discover a direction:

- ask 2-4 focused design questions
- compare 2-3 possible family stacks
- explain tradeoffs clearly

## Agent Output Modes

The agent should be able to switch among:

### Mode A: Strategy only

Use when the user is still deciding the direction.

### Mode B: Strategy + homepage structure

Use when the user wants a more concrete website concept.

### Mode C: Strategy + implementation direction

Use when the user is ready for front-end or Figma generation.

### Mode D: Strategy + code prompt

Use when the user wants to hand the result to a coding model directly.

## Decision Heuristics

### If the user is selling judgment

Bias toward:

- `portfolio-strategic-authority`
- `portfolio-premium-restraint`

### If the user is a solo multi-capability practice

Bias toward:

- `portfolio-hybrid-solo-studio`

### If the user has many projects

Bias toward:

- `portfolio-archive-credibility`

### If the user strongly names Antoine-like references

Add selectively:

- `portfolio-pure-frontend-interaction`

But run:

- `portfolio-frontier-boundary-filter`

### If the user is a packaging designer

Apply:

- `packaging-portfolio-branch`

## Conversation Failure Cases

Watch for these problems:

- user asks for "cool" but actually needs leads
- user wants heavy interaction but has weak content
- user references creative-developer sites while not wanting developer identity
- user asks for premium minimal but also too many sections and effects

The agent should resolve contradictions rather than echo them blindly.

