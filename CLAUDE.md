# Personal Website — Agent Instructions

## Auto-Skill Activation

Apply the relevant skill rules automatically based on what the user is asking. Do not wait for a slash command.

### Design & UI work
**Triggers:** user mentions design, UI, visual, style, color, look, feel, 设计, 视觉, 样式, 颜色, 好看, 界面

**Apply rules from:**
- `.agents/skills/frontend-design/SKILL.md` — bold aesthetic direction, no generic AI slop
- `.agents/skills/design-taste-frontend/SKILL.md` — metric-based design rules (variance 8, motion 6, density 4)

### Animation & performance
**Triggers:** user mentions animation, transition, scroll, jank, stutter, performance, 动画, 过渡, 卡顿, 性能

**Apply rules from:**
- `.agents/skills/fixing-motion-performance/SKILL.md` — compositor-only properties, no layout thrash

### Accessibility
**Triggers:** user mentions accessibility, keyboard, screen reader, ARIA, contrast, 无障碍, 键盘

**Apply rules from:**
- `.agents/skills/fixing-accessibility/SKILL.md` — WCAG-aligned, minimal targeted fixes

### Typography & layout
**Triggers:** user mentions typography, font, typeface, spacing, line height, hierarchy, readability, text, heading, body, 排版, 字体, 字号, 行距, 间距, 层级, 可读性, 标题, 文字, 不好看, 太挤, 太松

**Apply rules from:**
- `.agents/skills/typography/SKILL.md` — professional type scales, font pairing, vertical rhythm, fluid typography
- `.agents/skills/interaction-design/SKILL.md` — layout hierarchy and spatial composition

### Aesthetic direction
**Triggers:** user mentions aesthetic, vibe, mood, style direction, look and feel, 风格, 氛围, 调性, 感觉, 高级感, 质感

**Apply rules from:**
- `.agents/skills/aesthetic-guide/SKILL.md` — research and commit to a specific aesthetic direction
- `.agents/skills/de-slop/SKILL.md` — remove generic AI patterns

### Redesign requests
**Triggers:** user asks to redesign, overhaul, refresh, rethink, 重新设计, 改版, 重做

**Apply rules from:**
- `.agents/skills/redesign-existing-projects/SKILL.md`
- `.agents/skills/high-end-visual-design/SKILL.md`

---

## Project Context

- Vanilla HTML/CSS/JS — no framework, no build step
- Design language: dark, premium, editorial — warm cream tones (#e8e0cc, #d4c9ae) on near-black (#0d0e12)
- Existing animation system: CSS keyframes + body class state machine (`is-unfolding` → `dieline-full` → `is-entering` → `has-entered`)
- Entry box: SVG with warm cream gradients, only back flap opens on hover
- Bottom pill nav: fixed, frosted glass, centered at bottom viewport
- i18n: Chinese (zh) / English (en) via `data-i18n` attributes + `script.js`
