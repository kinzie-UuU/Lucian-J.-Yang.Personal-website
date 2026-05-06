# Personal Website — Agent Instructions

## Communication Rules

遵守以下六条输出规则：

1. **直接给结论** — 不要前置铺垫
2. **不要复述问题** — 不要说"好的"、"明白了"、"让我来"这类引导词
3. **区分大小事项** — 简单的事情一句话回答，复杂的问题再展开说
4. **陈述客观事实和方案** — 不要用"很棒的问题"、"非常聪明"这类捧场话
5. **不要在回答末尾加多余的总结**
6. **不确定的事情停下来先问** — 不要瞎猜

## Coding Guidelines (Karpathy Rules)

### 1. Think Before Coding
- 明确说出假设，不确定就问
- 多种方案存在时列出来，不要默默选一个
- 有更简单的方法就说出来
- 不清楚就停下来，说明哪里困惑

### 2. Simplicity First
- 只写解决问题的最少代码，不写推测性功能
- 单次使用的代码不做抽象
- 不写没被要求的"灵活性"或"可配置性"
- 不为不可能的场景写错误处理
- 200 行能用 50 行写完就重写

### 3. Surgical Changes
- 只改必须改的，不"顺便优化"相邻代码
- 不重构没坏的东西
- 匹配现有风格，即使你会用不同方式
- 发现无关死代码提一句，不要删
- 你的改动导致的孤儿代码（未使用的 import/变量/函数）才删除
- 测试：每一行改动都应该直接对应用户请求

### 4. Goal-Driven Execution
把任务转化为可验证目标：
- "添加验证" → "写无效输入的测试，然后让它通过"
- "修 bug" → "写能复现的测试，然后让它通过"
- "重构 X" → "确保重构前后测试都通过"

多步骤任务先说简短计划：
```
1. [步骤] → 验证: [检查点]
2. [步骤] → 验证: [检查点]
3. [步骤] → 验证: [检查点]
```

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

**Tech Stack:**
- Vanilla HTML/CSS/JS — no framework, no build step
- Three.js r128 (local `three.min.js`) for WebGL shader
- Canvas 2D for particle systems and ripples
- Web Audio API for sound effects

**Design Language:**
- Color palette: teal/cyan water theme
  - Primary: `#00ccbd` (bright teal)
  - Deep: `#003d38` (dark teal)
  - Peak: `#99f2e6` (light cyan)
  - Background: `#03201e` (near-black with teal tint)
- Typography: system fonts, clean hierarchy
- Motion: scroll-driven, physics-based interactions

**Current State (2026-04-26):**
- ✅ Entry screen: GO button + ripple expansion + KINZIE scramble
- ✅ State machine: `is-unfolding` → `is-entering` → `has-entered`
- ✅ Top bar: `.top-meta` with pixel avatar logo
- ✅ Bottom nav: `.bottom-nav` fixed pill
- ✅ i18n: Chinese/English via `data-i18n` + `script.js`
- ✅ Hero section:
  - WebGL water surface shader (fragment shader with noise + click ripples)
  - Canvas 2D: 3 floating orbs (420 particles each, 3D rotation, mouse flee)
  - Canvas 2D: organic ripples on mouse move (24-segment waves, multi-frequency)
  - 12 project cards in scroll-driven orbit around center
  - Vertical centering fixed (recalculate after `has-entered` CSS switch)
  - Orb decoration: 3 soft wave rings (32 segments, 0.025 amplitude)
- ✅ About / Services / Clients / Contact sections (structure only, no animations yet)

**Next Up:**
- About section: stagger animations + text scramble on hover
- Services section: book flip animation + sound
- Works section: horizontal scroll gallery + category cards
- Contact section: form + send animation
- Clients section: infinite marquee

**Key Architectural Decisions:**
1. **Hero height trap:** `hero-stage` switches from `min-height: 100vh` to `height: 100vh` when `has-entered` is added. Must recalculate stage dimensions in `requestAnimationFrame` after class change to get correct card centering.
2. **Canvas layering:** WebGL (background) + Canvas 2D (particles/ripples) + DOM (cards). Separate layers for performance.
3. **Organic motion:** All circular elements use multi-frequency sine waves (not perfect circles) for natural feel. Ripples: 24+ segments, 3-layer wave. Orb rings: 32 segments, 0.025 amplitude.
4. **Scroll-driven cards:** `heroClusterLayout` oy values calibrated to average ~0 (balanced vertical distribution). Cards move along elliptical orbit as user scrolls.

**Memory Location:**
- Project state: `C:/Users/Yang/.claude/projects/f--projects/memory/project_personal_website.md`
- Skill: `C:/Users/Yang/.claude/skills/scroll-driven-hero-stage.md` (Hero system pattern, reusable)
