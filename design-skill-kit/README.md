# Kinzie Design Skill Kit

这个目录是给 `personal-website` 项目准备的本地设计工具箱，用来整理当前已经可用的官方 UI / 设计相关 skills。

这些 skill 已经安装在本机的 `C:\Users\Yang\.codex\skills\` 里，不需要重新下载，也不需要额外新建插件仓库就能调用。

## 当前可直接调动的核心 skills

### 1. `stitch-ued-guide`
- 作用：提供 UI 视觉术语、版式命名、风格词汇、颜色结构公式。
- 适合现在：我们在讨论“黑色磨砂玻璃”“留白”“全屏 hero”“作品卡片漂移”这种视觉语言时，最适合先拿它统一描述。
- 对 Kinzie 的价值：可以把你的口头感觉，转换成更精确的设计语言。

### 2. `stitch-animate`
- 作用：给已有页面加有目的的动效层，不是重做页面。
- 适合现在：你一直在提“漂动”“悬浮”“鼠标停住暂停”“更有气场”，这类就是它最擅长的。
- 对 Kinzie 的价值：把首页从“会动”提升到“动得高级”。

### 3. `stitch-html-components`
- 作用：把设计转换成干净的 HTML + CSS 结构。
- 适合现在：你当前项目就是纯静态网站方向，这个 skill 的思路和我们的技术路线最接近。
- 对 Kinzie 的价值：后面如果我们重构某一屏，可以按更规范的静态站结构来整理。

### 4. `stitch-ideate`
- 作用：做设计方向研究、参考分析、视觉提案收束。
- 适合现在：你给了多个参考站点，也在不断修正“高级感”“玻璃感”“动态强度”，这个 skill 适合拿来整理成更清晰的视觉策略。
- 对 Kinzie 的价值：帮助我们把“参考很多，但方向还在收”的阶段整理成明确方案。

### 5. `stitch-orchestrator`
- 作用：如果明确说“用 Stitch 来设计”，它会串起设计 spec、prompt、screen generation、variants、design system 等流程。
- 适合现在：暂时不是第一优先，因为你现在主要还是在现有代码里直接迭代。
- 对 Kinzie 的价值：后面如果你想把某个页面整页重新生成，我们可以切到这条工作流。

## 对这个项目最推荐的调用顺序

1. 先用 `stitch-ued-guide`
   把你想要的视觉语言说准，比如：
   - black frosted glass overlay
   - cinematic dark editorial
   - floating project index cards
   - full-bleed hero stage
   - restrained luxury typography

2. 再用 `stitch-animate`
   专门优化：
   - 卡片整体左到右漂移
   - hover 停止
   - 顶栏磨砂高光变化
   - section reveal 节奏

3. 需要大改结构时，再参考 `stitch-html-components`
   重点看：
   - 语义结构
   - 全屏 hero 组织方式
   - tokens / base / components 的拆法

4. 如果你要整页重新探索风格，再用 `stitch-ideate`

## 现在最适合 Kinzie 的实际用法

不是去“装更多 skill”，而是直接把现有 skill 用起来：

- `stitch-ued-guide` 负责定义设计语言
- `stitch-animate` 负责强化动效质感
- 我继续在当前代码里落地实现

## 下一步建议

下一轮我建议直接按这个思路做：

1. 先把顶栏磨砂玻璃做得更接近你发的 3TFILMS 参考
2. 再把首屏黑色背景的颗粒、辉光、透明层次做细
3. 最后统一卡片 hover 的亮起方式，让它更像“作品入口”而不是普通漂浮方块

