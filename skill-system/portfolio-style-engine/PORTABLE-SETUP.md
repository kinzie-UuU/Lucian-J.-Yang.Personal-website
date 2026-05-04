# Portable Setup

This file explains how to move, reuse, and maintain the `portfolio-style-engine` system.

Goal:

- keep the system portable
- keep the structure clean
- make it easy to understand what is essential
- separate working skill files from research support files

## Recommended Folder Rule

Treat `skill-system/portfolio-style-engine/` as the portable system root.

If you move the system, move this whole folder as one unit first.

Do not move child skill folders one by one unless you are intentionally splitting the system.

## What Is Core

These files and folders are the core of the current system:

- `INDEX.md`
- `portfolio-style-engine/`
- `portfolio-strategic-authority/`
- `portfolio-premium-restraint/`
- `portfolio-hybrid-solo-studio/`
- `portfolio-archive-credibility/`
- `portfolio-concept-coherence/`
- `portfolio-pure-frontend-interaction/`
- `portfolio-frontier-boundary-filter/`
- `packaging-portfolio-branch/`
- `AGENT-ARCHITECTURE.md`
- `INPUT-CHECKLIST.md`
- `PORTFOLIO_ENGINE_DIALOG_FLOW.md`
- `PORTFOLIO_ENGINE_OUTPUT_TEMPLATE.md`
- `STATUS.md`
- `ANALYSIS-LOG.md`

If you want the smallest still-usable version, keep at least the files above.

## What Is Validation Support

These files are not required for the bare minimum system, but they are highly recommended:

- `TEST-CASES.md`
- `KINZIE-RUN-01.md`

They help validate whether the system still behaves correctly after changes.

## What Is Research Support

The following files live outside this folder and are best treated as the research foundation:

- `research/portfolio-100-audit/WEBSITE_STYLE_ENGINE_SPEC.md`
- `research/portfolio-100-audit/PORTFOLIO_TAXONOMY.md`
- `research/portfolio-100-audit/BATCH-01-SITES-01-20.md`
- `research/portfolio-100-audit/BATCH-02-SITES-21-40.md`
- `research/portfolio-100-audit/BATCH-03-SITES-41-60.md`
- `research/portfolio-100-audit/BATCH-04-SITES-61-80.md`
- `research/portfolio-100-audit/BATCH-05-SITES-81-100.md`

You do not need to move these every time if you only want the operational skill system.

But you should preserve them somewhere if you want:

- traceability
- future taxonomy updates
- evidence for design decisions

## Portable Tiers

## Tier 1: Operational Only

Move:

- the whole `portfolio-style-engine/` folder

Use when:

- you want the skill system to run
- you do not need the full research archive in the destination

## Tier 2: Operational + Validation

Move:

- the whole `portfolio-style-engine/` folder
- keep `TEST-CASES.md` and `KINZIE-RUN-01.md` inside it

Use when:

- you want to continue evolving the system safely

## Tier 3: Full Research Package

Move:

- the whole `portfolio-style-engine/` folder
- the entire `research/portfolio-100-audit/` folder

Use when:

- you want the full evidence base
- you want to continue refining taxonomy or writing new child skills

## Recommended Practical Setup

For regular reuse, I recommend:

1. keep `portfolio-style-engine/` as the portable runtime system
2. keep `research/portfolio-100-audit/` as the evidence and refinement layer
3. do not duplicate files between them

This avoids drift and keeps responsibilities clear.

## If You Want To Install It Later As Real Codex Skills

If the long-term goal is to convert these into installable Codex skills:

- each child folder already has its own `SKILL.md`
- the root-level files can remain as project-side support files

Recommended future path:

1. keep this folder as the master working version
2. when stable, copy only the finished child skill folders into the actual Codex skills directory
3. keep support files and research files in the project, not in the final install target

This prevents the final install location from becoming cluttered.

## Current Maturity Reading

Current maturity level:

- structurally strong
- research-backed
- partially validated
- not yet fully productized

Meaning:

- good enough to guide real work now
- not yet frozen as a final universal skill pack

## Recommended Next Step After Portability

The best next move is not more file organization.

It is:

- apply the system to a real website task
- refine the weak skills based on real outputs
- then decide what to harden for installation

