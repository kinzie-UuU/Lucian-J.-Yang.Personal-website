## 2026-04-19 最新更新（Three.js 入口盒子）

### 入口盒子 Three.js 重构
- CSS 3D 盒子已完全替换为 Three.js WebGL 渲染（`#box3d-canvas`）
- Three.js r128 UMD 已下载到本地（`three.min.js`，603KB），不依赖 CDN，支持 `file://` 协议
- 盒子为正方形比例（bx=1, by=1, bz=1）
- 材质已改为**白牛皮纸效果**：
  - 颜色：暖白/米白系（`#f2ece0` ~ `#f5f0e6`），各面略有色差模拟纸纤维方向感
  - 粗糙度：0.88–0.98，零金属感
  - 内壁：略深暖灰（`#d8d0c0`）
  - 灯光：暖白自然光（key `#fff5e8` / fill `#ffe8cc` / rim `#fff0e0`）
- 盖子动画：hover 微开（-0.62 rad），点击/进入后全开（-2.05 rad），lerp 平滑过渡
- 盒子整体有轻微 idle 摇摆（y/x 轴 sin 波动）

### 当前已知待做
- 首屏 hero 区域的"展开刀版图效果"尚未实现（下一步）
- 入口盒子可考虑加 canvas 噪点纹理进一步强化纸张质感

---

## 2026-04-26 Contact / Clients Layout Refinement

### Completed
- Services story progress indicator moved from bottom center to the right side as a vertical progress line.
- Contact social icons were moved lower and simplified into a quieter bare-icon row:
  - larger vertical breathing room under the contact copy
  - wider icon spacing
  - lighter default opacity
  - subtle hover lift only
- The previous `DESIGN.DESIGN.` sliced scroll visual was moved out of Contact, then replaced entirely in the Clients section.
- Clients section now uses a simple title band above the client list:
  - text: `PACKAGING BRAND DESIGN`
  - no cut/slice mask
  - no vertical separator
  - centered single-line layout on desktop
  - mobile can wrap naturally
- Removed the obsolete `contact-kinzie` sliced-scroll HTML/CSS/JS hooks so the clients area no longer has a large empty sticky-scroll gap.

### Main Files Changed
- `index.html`
- `styles.css`
- `script.js`
- `PROGRESS.md`

### Current State
- Clients section structure is now:
  - `clients-title-band`
  - `合作客户` kicker
  - clients marquee
- The old client-top cutline/large DESIGN animation is gone.
- The title band may still need final visual tuning in-browser for exact font scale and vertical placement.

### Suggested Next Checks
- Review the clients title band at desktop width around 1440px and ultrawide widths to confirm the text is fully visible.
- Review mobile behavior to decide whether `PACKAGING BRAND DESIGN` should wrap into two lines or use a smaller single line.
- If the title still feels heavy, reduce `.clients-title-band span` max font size slightly.

## 2026-04-19 本轮收尾（最新状态）

### 顶栏 `.top-meta` 胶囊
- 已恢复顶栏，结构：`HOME | 杨钦鹏 | 时间 | 日期`，固定居中悬浮在顶部
- HOME 文字呼吸灯效果：纯文字颜色 pulse（teal 暗→亮循环），无色块、无背景、无边框
- 胶囊整体去掉了白色描边 border
- 顶栏在进入前（entry screen）隐藏，点击盒子进入后才显示（`body:not(.has-entered) .top-meta { opacity:0 }`）

### 各区块文案已更新
- About：新中文文案，横向双栏布局（左标题 / 右正文）
- Services：从 3 项扩展为 5 项，新文案已写入 i18n zh/en
- Clients 跑马灯：更新为真实客户名（顾家家居 / 追觅科技 / 信维通信）
- Contact：新文案 + `.contact-collab` 副标题

### 脚本修复
- script.js 中的弯引号（`"` `"`）导致整个脚本 SyntaxError，已全部替换为直引号
- 修复后：入口盒子点击、鼠标十字线、i18n 切换全部恢复正常

### 底部胶囊导航 `.bottom-nav`
- 已实现，固定在视口底部居中
- 进入前隐藏（`body:not(.has-entered):not(.is-entering)`），进入后显示

### 当前已知待做
- About 横向布局在小屏下的断点还可以再细调
- 顶栏和底栏的过渡动画（fade-in after has-entered）可以加 transition 让出现更顺滑
- 各区块文案英文版还需要对齐润色

---

## 2026-04-19 Skills System & Entry Box

### Entry Box
- SVG gradients changed from teal/cyan to warm cream palette matching dieline panels
- `.entry-hint` text color changed to cyan `rgba(93, 198, 191, 0.80)`
- Box is now CLOSED by default — all flaps start at `scaleY(0)` / `scaleX(0)`
- Only back flap opens on hover; left/right/front flaps permanently `opacity: 0`
- Dead animation rules for invisible flaps removed from `is-entering` and `is-unfolding` blocks

### Bottom Pill Nav (pending)
- Plan exists at `C:\Users\Yang\.claude\plans\proud-seeking-wreath.md`
- Remove `.hero-stage-intro` text block (index.html lines 121–127)
- Replace `.top-meta-bar` + `<header>` with fixed bottom frosted-glass pill nav
- Not yet implemented — pick up from plan next session

### Skills Installed
Location: `.agents/skills/` (symlinked to `.claude/skills/`)

**Anthropic official:**
- `frontend-design` — bold aesthetic, no AI slop

**Leonxlnx/taste-skill (8 skills):**
- `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`
- `redesign-existing-projects`, `stitch-design-taste`, `gpt-taste`, `full-output-enforcement`

**ibelick/ui-skills (4 skills):**
- `baseline-ui`, `fixing-accessibility`, `fixing-metadata`, `fixing-motion-performance`

**petekp/agent-skills (55 skills, key ones):**
- `typography`, `interaction-design`, `aesthetic-guide`, `de-slop`
- `tuning-panel`, `simplicity-audit`, `dead-code-sweep`, `fixer`, `manual-testing`

### Auto-Skill CLAUDE.md
- Created `CLAUDE.md` at project root
- Triggers mapped: design/UI → frontend-design + design-taste-frontend; animation → fixing-motion-performance; typography/排版 → typography + interaction-design; aesthetic/调性 → aesthetic-guide + de-slop; redesign → redesign-existing-projects + high-end-visual-design; accessibility → fixing-accessibility

---

## 2026-04-19 Current Build Status

### What Was Confirmed This Round

- The hero card field was rolled back from the later "orbit cluster" experiments to the earlier, wider horizontal drifting composition.
- The current first-screen direction is:
  - broad horizontal spread
  - cards drifting from left to right
  - darker editorial atmosphere
  - Antoine-like pseudo-depth through geometry, opacity, and spacing
- The card field was nudged upward after rollback so the composition sits closer to the visual center instead of collapsing toward the lower half.

### Typography And Section Layout

- Chinese typography received a dedicated `zh-CN` ruleset in [styles.css](F:\projects\personal-website\styles.css).
- Major Chinese headings were reduced in size, narrowed in line width, and centered with stricter optical control.
- The About and Services blocks were separated more clearly:
  - About section now behaves like a centered editorial statement
  - Services section starts later with more breathing room
  - a divider and larger spacing were added so the two sections no longer visually collide as one oversized block

### Interaction State

- Entry flow already includes the packaging-box opening sequence before entering the drifting works screen.
- The first-screen works field is still the main validation area for the skill system:
  - composition
  - pacing
  - optical centering
  - card hover / click readability
- The user confirmed that the older wide drifting layout was closer to the right answer than the later clustered version.

### Current Known Problems

- The works composition still needs one more centering pass. The user is still seeing a right/down bias on entry in some iterations.
- Some Chinese text blocks still feel too bold or too heavy compared with the intended refined editorial tone.
- The broad drifting card field needs smoother looping and cleaner balance so it feels continuous rather than reset-based.
- The first white editorial sections below the hero still need further visual polish for hierarchy, centering, and typographic softness.

### Files To Check First Next Time

1. [PROGRESS.md](F:\projects\personal-website\PROGRESS.md)
2. [styles.css](F:\projects\personal-website\styles.css)
3. [script.js](F:\projects\personal-website\script.js)
4. [design-skill-kit/README.md](F:\projects\personal-website\design-skill-kit\README.md)
5. [skills/antoine-pure-frontend/SKILL.md](F:\projects\personal-website\skills\antoine-pure-frontend\SKILL.md)

### Recommended Next Step

- First fix the optical centering and pacing of the hero drifting field.
- Then continue refining the Chinese editorial sections, especially heading weight, width, and alignment.
- Keep using this project as the live validation case for the design skill system instead of treating it as a one-off page.

## 2026-04-19 Portfolio Audit Track

- Strict mode selected for the Muzli 100-site portfolio study.
- Research scaffold created at:
  - [research/portfolio-100-audit/README.md](F:\projects\personal-website\research\portfolio-100-audit\README.md)
  - [research/portfolio-100-audit\AUDIT-TEMPLATE.md](F:\projects\personal-website\research\portfolio-100-audit\AUDIT-TEMPLATE.md)
  - [research/portfolio-100-audit\TRACKER.md](F:\projects\personal-website\research\portfolio-100-audit\TRACKER.md)
  - [research/portfolio-100-audit\TAXONOMY-WORKING-NOTES.md](F:\projects\personal-website\research\portfolio-100-audit\TAXONOMY-WORKING-NOTES.md)
  - [research/portfolio-100-audit\WEBSITE_STYLE_ENGINE_SPEC.md](F:\projects\personal-website\research\portfolio-100-audit\WEBSITE_STYLE_ENGINE_SPEC.md)
- Next step:
  - audit Muzli list in batches of 20
  - record first-screen logic, interaction thesis, material language, and skill relevance for each site
  - first-pass batch file completed for sites 1-20
  - first-pass batch file completed for sites 21-40
  - first-pass batch file completed for sites 41-60
  - first-pass batch file completed for sites 61-80
  - first-pass batch file completed for sites 81-100
  - first formal taxonomy created from the 100-site audit
  - portable portfolio skill-system folder created with orchestrator, sub-skills, role branch, and agent architecture
  - engine dialog flow and output template added so the skill-system can behave more like a working agent
  - validation layer added with general test cases and a first Kinzie-specific engine run
  - human-facing status file and analysis log added at the skill-system root to track progress and architectural decisions cleanly
  - portable setup guide added so the whole portfolio skill-system can be moved and reused with a clear notion of core vs research files

# Kinzie Website Progress

最后更新时间：2026-04-18
项目路径：`F:\projects\personal-website`

## 当前目标

做一个“动静结合”的设计师个人网站 / 工作室网站。

当前明确方向：
- 首页是全屏黑色沉浸式主视觉
- 中间是可点击的作品卡片，作为作品快捷入口
- 顶部是黑色磨砂玻璃质感导航
- 整体参考：
  - `http://www.hotchkiss.co.jp/`
  - `https://3tfilms.com/?lang=zh`
  - 用户给的 Kinzie Atelier 参考图

## 已完成

### 1. 基础结构
- 已建立首页主结构：
  - 顶部 meta 信息条
  - 顶部主导航
  - 全屏 hero 动态卡片区
  - hero 下方文案区
  - works / about / why choose / clients / contact 区块
- 当前主要文件：
  - [index.html](F:\projects\personal-website\index.html)
  - [styles.css](F:\projects\personal-website\styles.css)
  - [script.js](F:\projects\personal-website\script.js)

### 2. 顶部信息区
- 已加入顶部小信息条：
  - `LIVE`
  - `杨钦鹏`
  - 北京时间
  - 日期
- 时间会自动刷新

### 3. 顶部导航
- 左侧品牌名已改为 `Kinzie`
- 右侧有：
  - 关于我们
  - 为何选择
  - 作品集
  - 联系
  - 中英文切换
- 顶栏已经改成全宽铺开，不再是中间一小条

### 4. 首页 hero 动态卡片
- 已做出大面积黑色首屏主视觉
- 卡片已支持：
  - hover 高亮
  - 只保留单个激活卡片
  - 点击后滚动到作品区
  - 轻微声音反馈
- 卡片运动逻辑已改成更明显的“从左往右漂”
- 鼠标移入 hero 区域会暂停漂移
- 移出后继续运动

### 5. 下方文案区
- 已改成居中排版
- 已加入手写体 `quietly, precisely.`
- 已改成深色背景，并加入粒子效果基础版本

### 6. 粒子与氛围
- `hero-copy` 区域已有粒子 canvas
- clients 区域已有粒子 canvas
- 当前粒子是可用版本，但还没有完全达到“五彩斑斓的黑”的最终质感

### 7. 设计工具整理
- 已新建本地设计工具箱文档：
  - [design-skill-kit/README.md](F:\projects\personal-website\design-skill-kit\README.md)
- 说明了当前可直接调用的 UI / 设计 skills：
  - `stitch-ued-guide`
  - `stitch-animate`
  - `stitch-html-components`
  - `stitch-ideate`
  - `stitch-orchestrator`

### 8. 官方前端 / 设计 skill 已安装
- 已安装到本机 Codex skills 目录：
  - `frontend-skill`
  - `figma-use`
  - `figma-generate-design`
  - `figma-implement-design`
- 当前这一轮首页重构，已按 `frontend-skill` 的思路执行：
  - 把首屏当作“海报”而不是普通网页
  - 让品牌和主标题进入首屏
  - 让作品卡片退到氛围和入口层级
  - 让顶栏更像压在画面上的玻璃材质

### 9. 首页首屏已重构一轮
- `index.html` 已重新整理，清掉了原先的乱码与损坏标签
- `script.js` 已重写，清掉了中英文文案乱码
- 首页新增：
  - hero 海报式文案层
  - 首屏左下主标题与操作按钮
  - 右下信息面板
- 当前首页层级已经比之前更接近“设计师工作室网站”的构图

### 10. 已新增 Antoine 风格研究 skill
- 新增本地 skill：
  - [skills/antoine-pure-frontend/SKILL.md](F:\projects\personal-website\skills\antoine-pure-frontend\SKILL.md)
- 新增研究笔记：
  - [skills/antoine-pure-frontend/references/antoine-notes.md](F:\projects\personal-website\skills\antoine-pure-frontend\references\antoine-notes.md)
- 这个 skill 的作用：
  - 提炼 Antoine Wodniack / Nod Coding / In Pieces 这一类“纯前端交互”的共性
  - 后续做 Kinzie 首页时，可以直接按它的方法论来设计

### 11. Antoine 方向首屏已试做一版
- 首屏继续保持“无文案主视觉”
- 已加入一层 SVG 线框场：
  - 文件位置：[index.html](F:\projects\personal-website\index.html) 中的 `#hero-wireframe`
  - 动画逻辑：[script.js](F:\projects\personal-website\script.js) 中的 `initHeroWireframe`
- 当前目标是让首屏更接近“纯前端交互空间装置”而不是普通背景

## 当前问题

### 1. 顶栏磨砂玻璃质感还可以继续向参考图靠
用户最新反馈重点：
- “这里有缝隙，直接下面这个图到顶把？”
- “上面磨砂那块，磨砂颗粒度要有。整体透明感。”

当前状态：
- 首屏与顶栏之间的缝隙已经尝试去掉
- 顶栏已加入基础透明层和细颗粒噪点
- 这一轮又进一步改成了更轻、更透明、更薄的版本
- 但还没有人工目测确认是否已经达到用户预期

还需要继续优化的点：
- 透明感更强，但不能发灰
- 黑色磨砂玻璃要有细腻颗粒，不是普通半透明黑条
- 顶栏和背景之间的融合要更自然
- 更接近 3TFILMS 那种“压在画面上”的悬浮感

### 2. 首页首屏仍在打磨阶段
虽然这一轮已经完成“海报式重构”，但还没到“最终精致版”。

还需要继续收的点：
- 卡片亮起方式要更高级
- 卡片 hover 状态不应突兀发白
- 卡片的层次、辉光、边缘反射仍可优化
- 整体黑色氛围的质感还可以更细
- 首屏左下标题与右下信息面板，还可以继续微调比例和留白

### 3. 文案和编码问题
- 之前有过中文乱码问题
- 当前 `index.html` 与 `script.js` 的主要乱码已清理
- 后续还需要做的是“文案升级”，不是“乱码修复”

## 最建议的下一步

下次继续时，优先按这个顺序：

1. 只优化顶栏黑色磨砂玻璃
   目标：
   - 更透明
   - 更细颗粒
   - 更像参考图
   - 更像一层压在视频/画面上的高级雾面玻璃

2. 再收 hero 首屏卡片和海报文案的质感
   目标：
   - 让 hover 亮起更克制
   - 避免某张卡片“过白、过突兀”
   - 加强整体漂移感和作品入口感
   - 检查左下大标题和右下信息块的比例是否还要再精简

3. 最后统一文案和编码
   目标：
   - 修 script.js 里的异常中文
   - 统一中英文字段
   - 为后续替换正式文案做准备

## 用户偏好总结

### 视觉偏好
- 不要普通企业站
- 要“大气”
- 要留白
- 要更精致
- 要动态和静态结合
- 要暗色沉浸式首页
- 要有黑色磨砂玻璃感
- 要高级，不要廉价发亮

### 交互偏好
- 首页卡片要像“作品快捷入口”
- 鼠标悬停应有反馈
- 可以有轻微声音
- 粒子效果要有，但不能廉价

### 结构偏好
- 左上：Kinzie，后期可换 Logo
- 右上：关于我们 / 为何选择 / 作品集 / 联系 / 中英文
- 首屏：全屏动态作品卡片区
- 下面：关于介绍 / 价值观 / 合作客户

## 下次接手时先看

1. [PROGRESS.md](F:\projects\personal-website\PROGRESS.md)
2. [design-skill-kit/README.md](F:\projects\personal-website\design-skill-kit\README.md)
3. [styles.css](F:\projects\personal-website\styles.css)
4. [script.js](F:\projects\personal-website\script.js)

## 一句话接手说明

这个项目已经完成了首页的大方向和基础交互，现在的核心任务不是重做结构，而是继续把“顶栏黑色磨砂玻璃”和“首屏动态卡片质感”打磨到参考图级别。
## 2026-04-19 本轮补充

- 顶部 meta 条和主导航之间继续拉开间距，主导航的黑色磨砂玻璃层加重了透明感、模糊感和细颗粒感。
- 首屏卡片整体漂移速度已上调，现在“从左到右”的移动更明显；鼠标进入首屏区域会暂停，移出后恢复。
- 首屏 SVG 线框不再只是横向波纹，已经补上纵深透视线，整体更像空间地面。
- 当前激活卡片会带动线框焦点移动，卡片与地面之间已经有初步联动关系。
- 下一轮最值得继续收的还是两件事：
  1. 把顶部磨砂玻璃做得更像真正压在画面上的黑玻璃，而不是普通半透明导航。
  2. 把首屏卡片的亮起方式继续收敛，让明暗切换更高级、更克制。
## 2026-04-24 续作记录

### 本轮处理
- 新增 `clean-copy.js`，在页面加载与语言切换后覆盖干净的中英文文案，避免旧 mojibake 文本在 UI 中露出。
- 覆盖 hero focus 面板的五类项目文案：OEM、礼品渠道、系列包装、品牌辅助、AIGC 流程辅助。
- 覆盖客户跑马灯、联系区复制提示、底部导航与关键 section 文案。
- 首屏卡片场重新微调：视觉中心略上移，横向/纵向半径收窄，漂移速度降低，缓动更慢，入口时不再那么偏右偏下。
- 顶部 `.top-meta` 改成更薄、更透明的黑色磨砂玻璃，并加入细颗粒层与淡入过渡。
- hero 卡片 hover 亮度收敛，避免某张卡突然过白、过跳。
- 声音按钮改成“横线=关闭 / 波浪=开启”，开启后波浪图标带轻微起伏动画；关闭时交互声音真正静音。
- 亮色模式进一步改成温柔暖纸感：背景、顶栏、导航、HOME 脉冲与声音开启态都从冷青色转向暖米色/浅金棕。
- 联系区继续调整：微信图标改为正确的双气泡 WeChat 形态，三枚社交图标改成本色（Instagram 渐变、X 黑白、WeChat 绿），邮箱/微信从大胶囊条改成两列信息块，移动端自动堆叠。
- 交互继续优化：联系信息改为点击复制并显示“点击复制/已复制”；底部导航加入滑动指示块；黑白模式切换加入短暂曝光过渡；声音按钮从横线到波浪做压缩/展开形变。
- 入口 Three.js 盒子换色：黑模式为烟熏石墨盒体 + 暖纸内衬，白模式为柔和暖纸材质，并跟随主题切换。

### 已验证
- `node --check script.js`
- `node --check clean-copy.js`

### 下次建议
- 用真实浏览器肉眼确认入口盒子展开后的首屏构图。
- 如果效果满意，再把 `clean-copy.js` 的干净文案正式合并回 `script.js` / `index.html`，彻底移除历史乱码占位。
## 2026-04-25 接手记录

- 已从 `index.html` 移除 `clean-copy.js` 引用。主文案已在 `script.js` / `index.html` 内保持干净中文，继续加载 `clean-copy.js` 反而会把 UI 覆盖成乱码。
- 已把中文与英文模式下的 `meta_name` 统一为 `KINZIE`，避免切回中文后顶部品牌名变成人名。
- 已继续微调顶部 `.top-meta` 黑色磨砂玻璃：透明度更高、颗粒更细、阴影更轻，目标是更像压在画面上的薄雾玻璃，而不是普通黑色导航条。
- 已收敛 `.hero-card` hover / active 的亮度和泛光，避免卡片突然发白；默认态也略微加深，保持首屏整体黑色质感。
- 已验证：`node --check script.js`、`node --check clean-copy.js`，并扫描 `index.html` / `script.js` / `styles.css` 未发现常见 mojibake 特征。

下一步建议：用真实浏览器打开 `index.html` 肉眼确认首屏进入动画、顶部玻璃压屏效果和卡片 hover 亮度。如果视觉满意，可以删除未引用的 `clean-copy.js` 临时文件。
## 2026-04-25 Entry Screen Interaction Polish

### Current Entry Direction
- Entry screen now centers the small cross-grid exactly on the GO circle center.
- The grid is denser and the plus marks are smaller, with a circular clear area around the GO control so the center stays visually clean.
- GO remains a circular abstract-face control: smaller separated GO letters act like glasses/eyes, and `Enter` sits below as the mouth cue.
- Hover color has been unified around the teal system color `#49c4b0`, including the inner orb, GO glow, and canvas glow.

### Click Feedback
- Clicking outside the central GO circle generates a small folding carton dieline.
- The dieline is now a correct carton-style structure: glue flap, four body panels, top/bottom flaps, dust flaps, fold lines, and cut lines.
- Dieline feedback is smaller than the central circle and fades out with a softer line-by-line exit instead of a hard disappearance.
- The previous colored/mosaic dieline fill was removed; only linework remains.

### Center Wave
- The earlier whole-screen shake was removed.
- Hovering GO or clicking outside now creates a center-out wave using grid nodes, so the movement reads as a radial pulse instead of vibration.

### KINZIE Reveal
- Clicking GO starts with a mosaic/cut state where the clear white KINZIE word is hidden.
- Large, restrained mosaic blocks and subtle cut slices appear first.
- The final stage runs the KINZIE encoding/scramble, then resolves to the clean wordmark.
- The effect uses restrained teal, cream, and muted yellow-green; the overly strong scanline/glitch treatment was removed.

### Cleanup Done
- Removed the unused `--entry-wave-progress` CSS variable.
- Restored and wired the bottom navigation slider so it no longer shows the old zero-width border artifact.

### Files Touched In This Pass
- `index.html`
- `styles.css`
- `script.js`
- `PROGRESS.md`

---

## 2026-04-25 GO Entry Restoration

### Restoration Notes
- Restored the project back onto the earlier full-site baseline after an incorrect broad rewrite attempt.
- Re-applied the documented GO entry direction on top of that baseline instead of replacing the whole site structure.
- Current entry markup now includes:
  - `#entry-field-canvas`
  - `#entry-wave-layer`
  - `#entry-dieline-layer`
  - `.entry-go-word`
  - `#entry-code-word`
- The old `#box3d-canvas` entry is no longer present in `index.html`; the remaining Three.js setup in `script.js` safely no-ops because that canvas is absent.

### Restored Behavior
- GO circular control is back as the entry trigger.
- Hover uses teal glow and center-out wave feedback.
- Clicking outside the GO control creates folding-carton dieline linework.
- Clicking GO runs the KINZIE mosaic/scramble reveal before entering the site.

### Verification
- `node --check script.js`

---

## 2026-04-25 本轮视觉细修日志

### Hero / 首屏视觉
- 竹子从单张平面图的感觉调整为多层景深表现：主图、前后叠影、Z 轴偏移、轻微 `rotateY` 摆动和更柔和的投影共同制造立体感。
- 右侧作品宣传从“盒子开盖/盒体”方向改回“卡片图片形式螺旋宣传”：`.hero-card` 去掉明显盒盖和侧面体块，改成更像宣传卡片的图像层、细高光和轻边缘。
- 滚动驱动的卡片轨道加入 `rotateY` / `rotateX`，卡片沿螺旋路径运动时有更明显的 3D 朝向变化。

### Entry / GO 入口
- 移除了 `CLICK / SCROLL` 上方那条横线。
- GO 外层白色圆圈、外层脉冲圈和背景遮罩露出的淡圆弧已逐步去掉；中间保持 GO、Enter、像素点和 hover 扩散。
- 波纹反馈经过几轮调试：先增强扩散，再尝试像素马赛克簇；因性能偏卡，最终回退为单个轻量小方块。
- 鼠标滑入 GO 中心时的波纹单独增强：使用 `.entry-wave.is-strong`，普通空白点击波纹保持轻。
- 点击入口空白处的刀版线结构恢复可见；之前问题来自末尾 CSS 把 `.entry-dieline-layer` 在未进入状态下 `display:none`。
- 刀版线仍然只在中间 GO 圆圈之外触发，中间区域保持干净。

### Top Meta / 顶部信息栏
- 顶部 meta 重新统一排版：名字、时间、日期、语言按钮统一高度、字号、字重、基线和数字宽度。
- 语言 active 状态去掉过大的高亮块，避免中/EN 高低不一。
- 字重进一步从偏粗的 `650` 降到更细的 `540` / `560`，颜色略收淡，减少小字号发糊。
- 主题（日/月）图标调整为更轻的线性视觉：图标尺寸微增，stroke 降到 `1.05`。
- 声音图标单独从 `13px` 调到 `15px`，避免三条竖线视觉上过小。

### Files Touched
- `index.html`
- `styles.css`
- `script.js`
- `PROGRESS.md`

### Verification
- `node --check script.js`

### Next Notes

---

## 2026-04-25 Material Handoff / Current Pause Point

### Assets Added
- Background/main visual candidate: `images/666.png`
- Source video: `videos/source.mp4.mp4`
- Transparent WebM generated: `videos/source-transparent.webm`
  - VP9 WebM
  - 1440x1440
  - 9.04s
  - `ffprobe` showed `alpha_mode=1`
  - White keying command used roughly: `colorkey=0xffffff:0.16:0.08,format=yuva420p`

### Latest User Intent
- Use `images/666.png` as the central first-screen subject.
- Put `videos/source-transparent.webm` above it.
- Do not continue implementing yet; user asked to save progress first.

### Current Implementation State
- `index.html` still contains `#hero-bamboo-canvas`.
- `script.js` still calls `initHeroBamboo(document.getElementById("hero-bamboo-canvas"))`.
- `styles.css` still contains `.hero-bamboo-canvas` styles.
- The next implementation should probably replace/disable the Three.js bamboo canvas and create a new centered media stack:
  - base image: `images/666.png`
  - overlay video: `videos/source-transparent.webm`

### Recent Interaction State To Remember
- Entry GO page bamboo canvas was removed from markup and init, so the entry screen should no longer show the external bamboo.
- Hero card spiral logic is still under discussion; user wants the scroll-driven cards locked to the first-screen stage and rotating around the central subject.
- Transparent WebM was generated successfully, but visual edge/key quality has not yet been reviewed in-browser.

### Next Notes
- 继续看真实浏览器里的入口页细节：GO 周围是否还残留不需要的圆弧/遮罩边缘。
- 顶部 meta 在真实分辨率下再检查一次中文名、时间、日期、语言按钮和两个图标的视觉重量。
- 如果螺旋卡片仍像半透明盒子，下一轮应继续弱化伪 3D 盒面，强化“图片卡片/宣传页”质感。
---

## 2026-04-25 Hero Kinetic Mark Backup

### Saved State
- Preserved the current upright glossy black metal Three.js hero object before trying new directions.
- Backup folder: `hero-kinetic-mark-backup/`
- Saved full-file snapshots:
  - `hero-kinetic-mark-backup/index.current-metal-mark.html`
  - `hero-kinetic-mark-backup/styles.current-metal-mark.css`
  - `hero-kinetic-mark-backup/script.current-metal-mark.js`
  - `hero-kinetic-mark-backup/README.md`

### Current Hero Object Hooks
- HTML: `.hero-kinetic-mark` and `#hero-kinetic-canvas`
- CSS: `.hero-kinetic-mark`, `.hero-kinetic-canvas`
- JS: `initHeroKineticMark(canvas)`

### Interaction State
- The object is meant to stand upright.
- Animation should only rotate left/right, not tumble vertically or roll continuously.
- User wants this version saved so the center subject can be changed freely and restored later.

### Verification
- `node --check script.js`
## 2026-04-26 作品画廊与项目详情页进度

### 已完成
- 在作品列表中补齐第 06 项：`包装升级与打样协同`，对应类别 key 为 `delivery`。
- 创建作品图片目录：`images/works/oem/`、`images/works/gift/`、`images/works/series/`、`images/works/brand/`、`images/works/aigc/`、`images/works/delivery/`。
- `Gift` 类别已接入用户放入的 6 张图片：`0000.png`、`000000.png`、`1-1.png`、`1.png`、`3.png`、`333.png`。
- 点击作品分类后打开全屏浅色作品层，保留“眨眼睁开”开场动画。
- 作品层第一层为横向项目带：滚轮按项目逐张前进/后退。
- 修复作品层打开后看不到鼠标的问题：打开作品层时恢复系统鼠标并隐藏自定义准星光标。
- 修复横向画廊反向滚动不稳定的问题：滚轮监听提升到 `window` 捕获层，并锁住 `html/body` 滚动。
- 新增项目详情页状态：点击单个项目图进入详情页；左侧展示项目名、简洁说明、标签与设计内容介绍；右侧展示圆角大图；继续向下滚动进入全屏圆角效果图页面。
- 顶部提供 `BACK` 返回横向项目带，`CLOSE` 关闭整个作品层。
- 调整从 About 到 Contact 的滚动手感：全局 scroll snap 从 `mandatory` 改为 `proximity`，内容区取消强制 `scroll-snap-stop: always`。
- Contact 区新增 `KINZIE` 切片滚动合成字标，并移除多余青绿色装饰线。
- Contact 字标区最新方向已调整为 `DESIGN.DESIGN.` 横向重复大字，左右铺满并溢出全屏。
- `BRAND / PACKAGING / 1994 / TYPOGRAPHY / DESIGN` 小字改为压在黑色切割条内部，黑条覆盖在大字上形成真正的遮罩切割关系。
- 小字排版已进一步细化：重复散排、上下错落、字号更小、字重更细，且限制在黑条内部不外漏。

### 主要改动文件
- `index.html`
- `styles.css`
- `script.js`
- `images/works/`

### 当前验证
- `node --check personal-website/script.js` 已通过。

### 下一步建议
- 将真实项目图分别放入 6 个类别目录后，把 `script.js` 中 `workGalleryImages` 的其他类别也替换为真实图片路径。
- 为每个项目补充更准确的 `summary`、`body`、`tags` 字段，让详情页文案不再使用默认占位说明。
- 检查 Gift 6 张大图在详情页中的裁切位置，必要时逐项调整 `position`。

---
## 2026-04-26 Services Scroll Diagnosis

### Completed
- Removed the leftover `.services-split-piece` corner fragments from the Services scroll sequence:
  - deleted the 4 empty HTML spans
  - deleted the matching CSS block
  - this fixes the faint four-corner boxes visible around service text pages
- Diagnosed why the Services scroll pages feel choppy:
  - each title/body is split into many `.service-glyph` spans
  - every frame writes opacity, transform, and `filter: blur()` to many glyphs
  - `filter: blur()` is especially expensive on large Chinese typography
  - `currentProgress += (targetProgress - currentProgress) * 0.075` creates a lagging catch-up feel
  - each panel has a short scroll window, so mouse-wheel steps can jump too much state at once

### Suggested Next Optimization
- Replace per-character animation with whole-panel or line-level animation.
- Avoid animating `filter: blur()` continuously; use opacity/transform as the main motion.
- Increase progress interpolation from `0.075` to roughly `0.16-0.22`.
- Lengthen each service panel's scroll window so transitions feel less stepped.
- Keep the right-side progress indicator, but make the content animation lighter.

### Main Files Changed
- `index.html`
- `styles.css`
- `PROGRESS.md`

---

## 2026-04-26 Contact Form / Services Photo Refinement

### Completed
- Added a minimalist contact form below the Contact headline:
  - fields: name, company, email/phone, project needs
  - small send button using `mailto:` with the filled content
  - social icons moved below the form
  - form labels support zh/en i18n
- Refined the contact form styling:
  - removed the unnecessary top guide line
  - reduced send button scale to a quieter small pill
  - kept the input treatment as simple underline fields
- Added `images/为何选择我.jpg` into the Services entry card.
- Adjusted the Services entry card proportion:
  - desktop uses a wider cinematic ratio
  - mobile uses a more stable 4:3 ratio
  - photo visibility restored after testing a more muted treatment
- Smoothed the work detail blink opening animation by increasing duration and adding intermediate keyframes.
- Fixed gallery/detail language behavior so Chinese is default and English follows the global language switch.
- Kept the custom precision cursor visible on gallery and detail pages.

### Main Files Changed
- `index.html`
- `styles.css`
- `script.js`
- `PROGRESS.md`

### Current State
- Contact section now flows: headline -> contact form -> social icons.
- Services entry card now uses the provided photo while preserving the scroll-open motion.
- Work gallery/detail overlays now follow the site language state and keep the cursor effect.

---
