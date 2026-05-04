# 四个问题修复方案 DEMO

## 问题一：水面状态下点击不应进入卡片

**现状：**
- 当 `heroStep = 0`（水面intro状态），卡片虽然不可见，但仍可点击
- 精准光标 + 线框网格（heroWireframe）在水面状态下仍然显示

**修复方案：**
```javascript
// script.js line ~714
heroCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // 新增：水面状态下禁止点击
    if (heroStep === 0) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (orderedMode) return;
    enterProject(card);
  });
  
  card.addEventListener("pointerenter", () => {
    // 新增：水面状态下禁止hover
    if (heroStep === 0 || orderedMode) return;
    setActiveHeroCard(card);
    playUiTone("hover");
  });
});
```

```css
/* styles.css 新增 */
.hero-card {
  pointer-events: auto;
}

/* 水面状态下完全禁用卡片交互 */
body:not(.has-entered) .hero-card,
.hero-stage[data-hero-step="0"] .hero-card {
  pointer-events: none;
}
```

**线框网格处理：**
```javascript
// script.js line ~1613 initHeroWireframe 函数内
// 新增：只在 heroStep >= 1 时显示线框
const updateWireframeVisibility = () => {
  if (heroWireframeController?.svg) {
    heroWireframeController.svg.style.opacity = heroStep >= 1 ? '1' : '0';
    heroWireframeController.svg.style.pointerEvents = heroStep >= 1 ? 'auto' : 'none';
  }
};

// 在 renderHeroMotion 函数中调用
// line ~1549 附近添加
updateWireframeVisibility();
```

---

## 问题二：鼠标移动时在水面上出现涟漪

**现状：**
- 只有点击时才出现涟漪
- 用户希望鼠标移动时也能在水面上产生涟漪效果

**修复方案：**
```javascript
// script.js line ~2740 附近，heroStage click listener 之后添加

// 节流函数
let lastRippleTime = 0;
const RIPPLE_THROTTLE = 300; // 每300ms最多一次涟漪

heroStage?.addEventListener("pointermove", (event) => {
  if (!document.body.classList.contains("has-entered")) return;
  if (event.target.closest(".hero-card")) return;
  
  const now = performance.now();
  if (now - lastRippleTime < RIPPLE_THROTTLE) return;
  
  lastRippleTime = now;
  createHeroRipple(event.clientX, event.clientY);
});
```

**效果：**
- 鼠标在水面上移动时，每300ms产生一次涟漪
- 不会在卡片上产生涟漪（保持卡片hover交互）
- 性能友好，不会过度触发

---

## 问题三：水滴音效不工作

**现状：**
- `playWaterDrop()` 被调用，但 AudioContext 状态可能是 "suspended" 而非 "running"
- 初始化使用 `{ once: true }` 导致只在第一次 pointerdown 时尝试启动

**修复方案：**
```javascript
// script.js line ~471 playWaterDrop 函数修改
const playWaterDrop = async () => {
  if (!soundEnabled) return;
  
  const context = await getAudioContext().catch(() => null);
  if (!context) return;
  
  // 新增：如果 context 是 suspended，尝试 resume
  if (context.state === "suspended") {
    await context.resume().catch(() => null);
  }
  
  // 再次检查状态
  if (context.state !== "running") return;
  
  // 原有音效代码...
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);
  
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  osc.connect(gain);
  gain.connect(context.destination);
  
  osc.start(now);
  osc.stop(now + 0.08);
};
```

```javascript
// script.js line ~2809 AudioContext 初始化修改
// 移除 { once: true }，改为每次交互都尝试 resume
window.addEventListener("pointerdown", () => {
  if (soundEnabled) {
    getAudioContext().then(ctx => {
      if (ctx.state === "suspended") ctx.resume();
    }).catch(() => null);
  }
}, { passive: true }); // 移除 once: true
```

---

## 问题四：卡片点击直接进入该项目详情页

**现状：**
- 点击卡片进入类别画廊（category gallery），显示该类别的所有项目
- 用户期望：6张卡片代表6个最佳项目，点击直接进入该项目的详情页

**修复方案：**

### Step 1: HTML 添加项目映射数据
```html
<!-- index.html line ~133 开始，为每张卡片添加 data-project-key 和 data-project-index -->

<!-- Card 1: OEM System One -->
<button class="hero-card" type="button" 
  data-work="oem" 
  data-project-key="oem" 
  data-project-index="0">
  
<!-- Card 2: Gift Seasonal Box -->
<button class="hero-card" type="button" 
  data-work="gift" 
  data-project-key="gift" 
  data-project-index="0">
  
<!-- Card 3: Series Holiday Edition -->
<button class="hero-card" type="button" 
  data-work="series" 
  data-project-key="series" 
  data-project-index="0">
  
<!-- Card 4: Brand Type Study -->
<button class="hero-card" type="button" 
  data-work="brand" 
  data-project-key="brand" 
  data-project-index="0">
  
<!-- Card 5: AIGC Prompt Drafts -->
<button class="hero-card hero-card-dark" type="button" 
  data-work="aigc" 
  data-tone="dark"
  data-project-key="aigc" 
  data-project-index="0">
  
<!-- Card 6: Gift Tea Moon -->
<button class="hero-card" type="button" 
  data-work="gift" 
  data-project-key="gift" 
  data-project-index="2">
```

**映射逻辑：**
- Card 1 (System One) → oem[0] "STRUCTURE STUDY"
- Card 2 (Seasonal Box) → gift[0] "GIFT PROJECT 01"
- Card 3 (Holiday Edition) → series[0] "SERIES RHYTHM"
- Card 4 (Type Study) → brand[0] "TYPE FIELD"
- Card 5 (Prompt Drafts) → aigc[0] "PROMPT BOARD"
- Card 6 (Tea Moon) → gift[2] "GIFT PROJECT 03"

### Step 2: 修改 enterProject 函数
```javascript
// script.js line ~656 enterProject 函数完全重写
const enterProject = (card) => {
  const projectKey = card.dataset.projectKey || card.dataset.work;
  const projectIndex = parseInt(card.dataset.projectIndex || "0", 10);
  const cardName = card.querySelector(".hero-card-name")?.textContent.trim() || "Project";
  
  if (!workGallery || !workGalleryTrack) return;
  
  // 设置类别
  galleryCategory = projectKey;
  
  // 构建画廊项目列表（用于左右切换）
  const items = workGalleryImages[projectKey] || workGalleryImages.oem;
  buildGalleryItems(items);
  
  // 直接进入详情模式
  galleryMode = "detail";
  galleryStep = projectIndex;
  galleryTargetX = 0;
  galleryCurrentX = 0;
  galleryWheelLocked = false;
  
  // 渲染详情页
  renderWorkDetail(items[projectIndex] || items[0], projectIndex);
  
  // 设置 UI 状态
  workGallery.classList.add("is-detail");
  if (workDetail) workDetail.innerHTML = ""; // renderWorkDetail 会填充
  if (workGalleryTitle) workGalleryTitle.textContent = items[projectIndex]?.title || cardName;
  if (workGalleryIndex) workGalleryIndex.textContent = String(projectIndex + 1).padStart(2, "0");
  if (worksPreview) worksPreview.classList.remove("is-visible");
  
  // 打开画廊
  document.body.classList.add("work-gallery-open");
  document.documentElement.classList.add("work-gallery-open");
  workGallery.setAttribute("aria-hidden", "false");
  workGallery.classList.remove("is-open");
  void workGallery.offsetWidth;
  workGallery.classList.add("is-open");
  workGallery.scrollTo({ top: 0, behavior: "auto" });
  
  galleryOpen = true;
  playUiTone("click");
};
```

**效果：**
- 点击 Card 1 → 直接打开 "STRUCTURE STUDY" 详情页
- 点击 Card 6 → 直接打开 "GIFT PROJECT 03" 详情页
- 用户可以在详情页内用滚轮左右切换同类别的其他项目
- 不再经过类别画廊的中间步骤

---

## 文件改动清单

| 文件 | 改动行数估计 | 改动内容 |
|------|------------|---------|
| `script.js` | ~80 行 | 问题1: 卡片点击/hover守卫 + 线框可见性；问题2: pointermove涟漪；问题3: AudioContext resume；问题4: enterProject重写 |
| `styles.css` | ~10 行 | 问题1: 水面状态下 pointer-events: none |
| `index.html` | ~12 行 | 问题4: 6张卡片添加 data-project-key 和 data-project-index |

---

## 测试验证点

1. **问题一验证：**
   - 刷新页面，点击 GO 之前，鼠标移动到水面中心 → 不应出现卡片hover效果
   - 点击水面任意位置 → 不应进入卡片，只产生涟漪
   - 线框网格在水面状态下不可见

2. **问题二验证：**
   - 点击 GO 进入后，鼠标在水面上缓慢移动 → 每300ms产生一次涟漪
   - 鼠标移动到卡片上 → 不产生涟漪，保持卡片hover交互

3. **问题三验证：**
   - 打开浏览器控制台，刷新页面
   - 点击 GO 进入，鼠标点击水面 → 应听到水滴音效（1100Hz → 420Hz，80ms）
   - 如果第一次没声音，再点击一次 → 应该有声音（context resume生效）

4. **问题四验证：**
   - 滚动到 heroStep=1，点击第一张卡片（System One）→ 直接打开 "STRUCTURE STUDY" 详情页
   - 点击第六张卡片（Tea Moon）→ 直接打开 "GIFT PROJECT 03" 详情页
   - 在详情页内滚轮向右 → 切换到同类别下一个项目
   - 点击返回按钮 → 回到 hero 滚动区域

---

## 实施建议

1. 先在本地创建备份：`cp script.js script.js.backup`
2. 按顺序修改：问题3（音效）→ 问题1（交互守卫）→ 问题2（移动涟漪）→ 问题4（直接详情）
3. 每修复一个问题，立即在浏览器测试验证
4. 全部完成后，完整走一遍用户流程：GO → 滚动 → hover卡片 → 点击进入详情 → 左右切换 → 返回

---

**预计修复时间：** 15-20 分钟
**风险评估：** 低（改动集中在交互逻辑，不涉及布局和样式重构）
