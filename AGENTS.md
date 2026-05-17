# AGENTS.md

## 项目概览

这是 Lucian J. Yang 的个人包装设计作品网站。项目是纯静态站点，以 `index.html` 为唯一页面入口，直接加载模块化 CSS、普通浏览器 JavaScript、静态图片、视频、音频与本地字体。

项目重点不是传统内容页，而是一个带强交互的作品体验：入口 3D 钥匙自动旋转进场、Hero 水面与 GLB 狮头模型、全屏液态场、服务滚动叙事、作品分类与画廊、客户展示、联系表单与微信二维码弹层。

不要把它迁移成 React、Vue、Next、Vite 或其它框架；当前架构有意保持静态、无构建步骤、无包管理器。

## 当前技术栈

- HTML：`index.html`
- CSS：根样式 `styles.css` 加 `styles/` 下的分区模块
- JavaScript：普通 `<script>` 顺序加载，使用 `window.*` 全局桥接
- 数据：`site-data.js`
- 3D / WebGL：本地 `three.min.js`，以及若干原生 WebGL canvas
- 资源：`images/`、`videos/`、`audio/`、`fonts/`
- 工具脚本：`tools/check-project.js`、`tools/runtime-smoke-check.js`、`tools/local-proxy-server.js`

没有 `package.json`，没有 bundler，也没有安装依赖流程。

## 本地运行

优先用本地静态服务器访问，不建议直接用 `file://` 打开。

```bash
python -m http.server 4180
```

然后打开：

```text
http://127.0.0.1:4180/index.html
```

项目里也有一个 Node 静态代理：

```bash
node tools/local-proxy-server.js
```

默认会尝试 `http://127.0.0.1:4180/index.html`，端口占用时会向后寻找可用端口。

## 常用检查命令

```bash
node tools/check-project.js
node --check script.js
node --check site-data.js
```

修改 JS 后，对 touched 文件逐个运行：

```bash
node --check scripts/某个文件.js
```

较完整的浏览器冒烟检查：

```bash
node tools/runtime-smoke-check.js
```

这个脚本会启动本地 server 和 Chrome/Edge headless，检查入口、背景音乐、Hero 狮头模型、底部导航、Works 侧栏、Gallery、桌面/移动端横向溢出和控制台错误。它依赖本机 Chrome 或 Edge，以及支持全局 `WebSocket` 的 Node 版本。

## 页面结构

`index.html` 内的主要结构：

- 顶部元信息栏：身份、北京时间、语言切换、声音、全屏、联系入口
- `#entry-screen`：3D 钥匙入口、加载进度文字、底部进度条
- `.hero-section` / `#hero-stage`：Hero 水面、涟漪、wireframe、全屏液态场、GLB 狮头模型
- `#about`：头像视频/图片、设计师介绍、工具标签
- `#services`：服务滚动叙事、Three.js grid scan、服务 panel shader
- `#works-transition`：服务到作品之间的滚动转场
- `#works`：五类作品入口、hover preview
- `#work-gallery`：作品画廊 overlay、环形/WebGL 或 DOM fallback、详情页、返回/关闭
- `#contact`：联系文案、Gmail compose 表单、社交链接、微信二维码 modal、toast
- `#clients`：客户展示与 marquee
- `#works-side-rail`：作品侧边导航，可直接进入某个类别或项目
- `.bottom-nav`：底部主导航，指向 About / Services / Works / Contact

## CSS 结构

CSS 在 `index.html` 中按顺序加载。不要随意调换顺序。

- `styles/fonts.css`：本地字体声明
- `styles.css`：全局 token、reset、body/page 状态、基础变量
- `styles/cursor.css`：精密光标
- `styles/typography.css`：共享文字效果和排版
- `styles/liquid-glass.css`：Hero 全屏液态场样式
- `styles/home.css`：入口、Hero、水面、GLB 模型等首页视觉
- `styles/about.css`：About / portrait 区域
- `styles/services.css`：服务区、scroll story、panel
- `styles/works.css`：Works 列表、转场、hover preview
- `styles/clients.css`：客户区域与 marquee
- `styles/work-gallery.css`：画廊 overlay、详情页、gallery chrome
- `styles/contact.css`：联系区、表单、社交链接、微信二维码弹层
- `styles/navigation.css`：顶部控制、底部导航、nav 转场、Works side rail
- `styles/responsive.css`：跨区响应式修正
- `styles/shared-motion.css`：reveal、scroll motion 等共享动效

样式设计语言偏深色、纸张质感、细线、包装结构感、低调但有触感。避免大范围换色、重排版或把局部修正塞进不对应的 CSS 模块。

## JS 结构与真实加载顺序

当前 `script.js` 只有一行：

```js
window.LucianApp = window.initLucianApp?.() || null;
```

实际启动逻辑在 `scripts/app-bootstrap.js`，共享运行时桥接在 `scripts/runtime-bridge.js`。

`index.html` 当前脚本顺序以文件自身为准，核心顺序如下：

1. `three.min.js`
2. `site-data.js`
3. `scripts/audio-feedback.js`
4. `scripts/hero-wireframe.js`
5. `scripts/hero-water-surface.js`
6. `scripts/hero-state-runtime.js`
7. `scripts/hero-sequence-runtime.js`
8. `scripts/runtime-bridge.js`
9. `scripts/app-bootstrap.js`
10. `scripts/static-text-runtime.js`
11. `scripts/language-runtime.js`
12. `scripts/flip-text.js`
13. `scripts/particle-canvas.js`
14. `script.js`
15. `scripts/liquid-glass-field.js`
16. `scripts/hero-glb-model.js`
17. `scripts/services-entry-grid-scan.js`
18. `scripts/service-panel-shaders.js`
19. `scripts/services-scroll-story.js`
20. `scripts/work-gallery.js`
21. `scripts/works-side-rail.js`
22. `scripts/scrambled-text.js`
23. `scripts/header-controls.js`
24. `scripts/language-controls.js`
25. `scripts/contact-interactions.js`
26. `scripts/scroll-type-effects.js`
27. `scripts/reveal-effects.js`
28. `scripts/precision-cursor.js`
29. `scripts/works-hover-preview.js`
30. `scripts/works-transition-motion.js`
31. `scripts/site-clock.js`
32. `scripts/bottom-nav-scroll-spy.js`
33. `scripts/clients-marquee.js`
34. `scripts/clients-title-interaction.js`
35. `scripts/portrait-motion.js`
36. `scripts/hero-ripples.js`
37. `scripts/entry.js`

脚本顺序是项目最脆的部分之一。新增、删除或移动脚本前，先确认依赖链和浏览器行为。

## 关键 JS 模块职责

- `app-bootstrap.js`：创建 app、初始化 runtime bridge、语言、Hero 状态、Hero 水面与 wireframe
- `runtime-bridge.js`：建立 `window.LucianRuntime`，转发音频、语言、Hero 状态、Gallery 关闭、光标等跨模块能力
- `audio-feedback.js`：点击声、水滴声、背景音乐 `audio/liquid-light-loop.mp3`、声音开关状态
- `entry.js`：进入网站过渡、滚动/触摸触发、返回入口、滚动锁定
- `entry-key-model.js`：3D 钥匙 GLB 加载、旋转动画、进度同步、自动进入
- `hero-state-runtime.js`：Hero 运行态
- `hero-sequence-runtime.js`：Hero stage 尺寸、强制回顶、序列 reset
- `hero-water-surface.js`：Hero WebGL 水面
- `liquid-glass-field.js`：Hero 全屏液态扰动场
- `hero-glb-model.js`：Hero 狮头 GLB 模型加载、灯光和指针转向
- `hero-ripples.js`：Hero 点击/指针涟漪
- `hero-wireframe.js`：Hero SVG wireframe
- `services-entry-grid-scan.js`：Services 入口 Three.js grid scan
- `service-panel-shaders.js`：Services panel WebGL shader
- `services-scroll-story.js`：Services sticky scroll story 与文案重建
- `work-gallery.js`：作品画廊、项目详情、语言刷新、Gallery 开关和 WebGL/DOM 展示
- `works-side-rail.js`：左侧 Works 导航和分类/项目快速进入
- `works-hover-preview.js`：Works 行 hover preview
- `works-transition-motion.js`：Services 到 Works 的滚动转场变量
- `bottom-nav-scroll-spy.js`：底部导航、锚点滚动、纸张转场、active section
- `header-controls.js`：声音、全屏、顶部控制状态
- `language-runtime.js`：中英文切换编排
- `static-text-runtime.js`：`[data-i18n]` 静态文本刷新
- `language-controls.js`：语言按钮绑定
- `contact-interactions.js`：联系表单、复制、微信 QR modal
- `scroll-type-effects.js`、`scrambled-text.js`、`flip-text.js`、`reveal-effects.js`：文字和 reveal 动效
- `clients-marquee.js`、`clients-title-interaction.js`：客户区 marquee 和标题交互
- `portrait-motion.js`：About portrait sticky motion 和视频 scrub
- `precision-cursor.js`：全局精密光标与 Hero field pointer

## 数据与文案

`site-data.js` 是主要数据源，包含：

- `i18n`：中英文 UI 和页面文案
- `worksData`：作品分类、Hero/Works 元数据
- `workGalleryImages`：画廊图片条目
- `workGalleryProjects`：画廊项目聚合
- `galleryText`：画廊 chrome、详情、分类说明

可见文案优先从 `site-data.js` 改。新增用户可见文本时，通常要同时补 `zh` 和 `en`，并确认 `language-runtime.js` 或 `static-text-runtime.js` 能刷新到对应 DOM。

注意：在某些 PowerShell 输出里，中文可能显示成乱码，这是终端编码问题。编辑文件时要保持 UTF-8，不要因为终端显示异常就机械“修复”大量中文。

## 资源目录

- `images/头像.png`：头像资源
- `images/9999.png`：About portrait poster / fallback
- `images/wechat-qr.jpg`：微信二维码
- `images/works/`：作品图片，当前有 `oem`、`gift`、`brand`、`aigc`、`aigc-video`
- `videos/Video 8.mp4`：About 视频，HTML 中使用 `videos/Video%208.mp4`
- `audio/liquid-light-loop.mp3`：背景音乐
- `fonts/`：Satoshi、MiSans、Cabinet Grotesk、Trench Slab、Outfit、Playfair Display 等本地字体

不要随意重命名、移动或删除资源文件。Gallery 数据和 HTML/CSS 引用高度依赖当前路径。

## 高风险区域

改动这些地方前，要先读相关文件并规划 QA：

- `index.html` 的结构、ID 和脚本顺序
- `site-data.js` 的数据结构、图片路径和双语文案
- `scripts/work-gallery.js`
- `scripts/hero-water-surface.js`
- `scripts/liquid-glass-field.js`
- `scripts/hero-glb-model.js`
- `scripts/hero-sequence-runtime.js`
- `scripts/runtime-bridge.js`
- `scripts/app-bootstrap.js`
- `scripts/services-scroll-story.js`
- `scripts/services-entry-grid-scan.js`
- `scripts/service-panel-shaders.js`
- `styles/home.css`
- `styles/liquid-glass.css`
- `styles/services.css`
- `styles/work-gallery.css`
- `styles/navigation.css`
- `three.min.js`，这个文件只当依赖，不手改

## 相对安全的改动区域

- `docs/`
- `tools/`
- 小范围文案改动，优先在 `site-data.js`
- 和某个页面系统严格对应的局部 CSS
- 小范围可访问性标签或按钮状态修正

即便是安全区域，也要检查引用和视觉影响。

## 协作规则

- 开始前先看 `git status --short`。当前仓库可能已有用户或其它代理留下的未提交改动。
- 不要回滚、删除或重排自己没改的内容。
- 不要 commit / push，除非用户明确要求。
- 每次只改一个系统，例如 Entry、Hero、Services、Works/Gallery、Contact、Navigation、Language/Copy、Global QA/Tooling。
- 修改前先说明会碰哪些文件，以及不会碰哪些高风险区域。
- 修改 JS 后运行 touched 文件的 `node --check`。
- 修改资源引用、HTML 结构、脚本顺序、数据 schema、交互行为或 QA 标准时，同步更新相关文档。
- 临时验证文件不要写到项目根目录；如需临时文件，使用被忽略的 `_tmp_*` 或系统临时目录。

## 针对不同任务的入口文件

修改 Hero：

- 先读 `index.html` Hero markup
- `styles/home.css`
- `styles/liquid-glass.css`
- `scripts/app-bootstrap.js`
- `scripts/runtime-bridge.js`
- `scripts/hero-state-runtime.js`
- `scripts/hero-sequence-runtime.js`
- `scripts/hero-water-surface.js`
- `scripts/liquid-glass-field.js`
- `scripts/hero-glb-model.js`
- `scripts/hero-ripples.js`
- `scripts/hero-wireframe.js`

修改 Services：

- 先读 `index.html` Services markup
- `styles/services.css`
- `scripts/services-scroll-story.js`
- `scripts/services-entry-grid-scan.js`
- `scripts/service-panel-shaders.js`
- `three.min.js` 只确认加载，不编辑

修改 Works / Gallery：

- 先读 `index.html` Works 和 Gallery markup
- `site-data.js`
- `styles/works.css`
- `styles/work-gallery.css`
- `styles/navigation.css` 中的 Works side rail
- `scripts/work-gallery.js`
- `scripts/works-side-rail.js`
- `scripts/works-hover-preview.js`
- `scripts/works-transition-motion.js`

修改语言 / 文案：

- 先读 `site-data.js`
- `scripts/language-runtime.js`
- `scripts/static-text-runtime.js`
- `scripts/language-controls.js`
- 必要时检查 `index.html` 里的 fallback 文案和 `data-i18n`

修改 Contact：

- 先读 `index.html` Contact markup
- `styles/contact.css`
- `scripts/contact-interactions.js`
- `images/wechat-qr.jpg`

修改导航：

- 先读 `index.html` 顶部控制与底部导航 markup
- `styles/navigation.css`
- `scripts/header-controls.js`
- `scripts/bottom-nav-scroll-spy.js`
- `scripts/works-side-rail.js`

## 最低交付自检

完成代码改动后，至少确认：

- `node tools/check-project.js` 通过
- touched JS 文件 `node --check` 通过
- 本地页面能打开
- 钥匙旋转 + 自动进入或滚动进入网站
- 控制台没有站点 error
- 如果碰了 Hero，检查 Hero 水面/液态场/狮头模型/滚动
- 如果碰了 Services，检查 grid scan、panel shader、scroll story
- 如果碰了 Works/Gallery，检查 Works 行、侧栏、Gallery 打开/关闭/详情返回
- 如果碰了语言或文案，检查 `zh-CN` / `en` 切换和打开中的 Gallery 文案刷新
- 如果碰了布局，检查桌面和移动端没有横向溢出

## 现有文档

- `PROJECT_STRUCTURE.md`：项目结构说明，但可能有旧模块名残留
- `HANDOFF.md`：历史拆分和验证记录，内容很多，适合追踪背景
- `docs/00_PROJECT_AUDIT.md`：项目审计
- `docs/02_PRD.md`：产品需求
- `docs/03_TECH_DESIGN.md`：技术设计
- `docs/05_MODULE_MAP.md`：模块映射，但需和当前 `index.html` 交叉验证
- `docs/06_QA_CHECKLIST.md`：人工 QA 清单
- `docs/07_BUILD_PLAN.md`：后续构建计划

如果文档与实际文件冲突，以当前 `index.html`、`rg --files` 和真实源码为准，再决定是否同步更新文档。
