const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const i18n = {
  zh: {
    nav_about: "关于",
    nav_services: "服务",
    nav_works: "作品",
    nav_contact: "联系",
    hero_kicker: "Packaging Direction / Visual Judgment / OEM System",
    hero_title: "不是把包装做漂亮，而是把包装做对。",
    hero_text: "Lucian J. Yang 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    hero_script: "quietly, precisely.",
    hero_action_works: "进入作品选集",
    hero_action_about: "查看服务",
    hero_note: "首页不是说明文档，而是进入作品现场的入口。先浏览，再判断，再进入项目。",
    works_kicker: "作品",
    works_statement_title: "不是把包装做漂亮，而是把包装做对。",
    works_statement_body: "Lucian J. Yang 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    works_title: "点击作品，进入更集中、更明确的判断现场。",
    works_text: "这里不是把项目平铺成截图，而是把真实合作中最常见的场景，整理成可浏览、可比较、可进入的作品入口。",
    work_tab_oem: "OEM / 贴牌包装",
    work_tab_gift: "礼品 / 福利渠道",
    work_tab_series: "系列包装 / 礼盒",
    work_tab_brand: "品牌 / 字体辅助",
    work_tab_aigc: "AIGC 流程辅助",
    works_col_project: "项目",
    works_col_type: "类型",
    works_col_year: "年份",
    work_row_1_name: "多 SKU 贴牌包装系统",
    work_row_2_name: "节日礼品渠道包装",
    work_row_3_name: "系列礼盒视觉系统",
    work_row_4_name: "品牌字体与识别辅助",
    work_row_5_name: "AIGC 辅助提案流程",
    metric_focus: "重点",
    metric_value: "价值",
    about_kicker: "关于",
    about_title: "我是谁",
    about_text_1: "我是一名以包装设计为主的设计师，主要方向是 OEM / 贴牌包装，以及礼品与福利渠道设计。\n\n我关注的，不只是包装是否好看，而是它在真实条件下是否成立：是否适合渠道，是否符合预算，是否匹配工艺，是否能在生产与交付中保持完整。",
    about_text_2: "对我来说，设计不是先讨论风格，而是先判断什么该做、什么该省、什么最适合当前条件。\n\nAIGC 是我提高效率与比较方案的工具，但真正有价值的，仍然是判断本身。",
    services_kicker: "服务",
    services_title: "为何选择我",
    services_intro: "我提供的，不只是包装设计本身，而是在价格、工艺、交付与渠道约束下，更合适的方案判断。",
    service_title_1: "包装主导",
    service_text_1: "以 OEM / 贴牌包装为主，也覆盖礼品、福利渠道、系列包装与礼盒设计。",
    service_title_2: "判断力",
    service_text_2: "我更关注什么方案真正适合当前价格带、工艺条件与渠道场景，而不只是哪个方案看起来更炫。",
    service_title_3: "落地能力",
    service_text_3: "从材质、工艺、打样到供应商协同，我会同时考虑设计与执行之间的关系。",
    service_title_4: "效率意识",
    service_text_4: "AIGC 可以提高前期测试、方案比较与提案效率，但不会替代判断。",
    service_title_5: "综合表达",
    service_text_5: "在需要时，我也会结合品牌、字体与视觉系统，补强包装识别与整体完成度。",
    service_title_6: "交付协同",
    service_text_6: "我会把设计文件、打样反馈与供应商沟通整理清楚，让方案更顺畅地进入执行。",
    clients_kicker: "合作客户",
    clients_title: "合作客户",
    contact_kicker: "联系",
    contact_title: "联系",
    contact_text: "如果你正在寻找一位既懂包装表达，也重视真实落地与成本约束的设计师，欢迎联系我。",
    contact_collab: "OEM / 贴牌包装 · 礼品与福利渠道设计 · 系列包装 · 节庆礼盒 · 包装升级 · 包装提案与方向判断支持",
    focus_kicker: "当前项目",
    meta_name: "杨钦鹏",
  },
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_works: "Works",
    nav_contact: "Contact",
    hero_kicker: "Packaging Direction / Visual Judgment / OEM System",
    hero_title: "Not just making packaging beautiful, but making it right.",
    hero_text: "Lucian J. Yang focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    hero_script: "quietly, precisely.",
    hero_action_works: "Enter Works",
    hero_action_about: "View Services",
    hero_note: "The homepage is not a document. It is an entrance into the work itself: browse first, judge second, then enter the project.",
    works_kicker: "Works",
    works_statement_title: "Not just making packaging beautiful, but making it right.",
    works_statement_body: "Lucian J. Yang focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    works_title: "Click a project and enter a more focused field of judgment.",
    works_text: "These works show not just results, but the judgment behind them. What matters is whether they hold up in real price bands, channel conditions, process constraints, and production realities.",
    work_tab_oem: "OEM Packaging",
    work_tab_gift: "Gift Channel",
    work_tab_series: "Series Packaging",
    work_tab_brand: "Brand Support",
    work_tab_aigc: "AIGC Workflow",
    work_tab_delivery: "Delivery Support",
    works_col_project: "Project",
    works_col_type: "Type",
    works_col_year: "Year",
    work_row_1_name: "Multi-SKU OEM Packaging System",
    work_row_2_name: "Seasonal Gift Channel Packaging",
    work_row_3_name: "Series Gift Box Visual System",
    work_row_4_name: "Brand Typography & Identity Support",
    work_row_5_name: "AIGC-Assisted Proposal Workflow",
    work_row_6_name: "Packaging Upgrade & Sampling",
    metric_focus: "Focus",
    metric_value: "Value",
    about_kicker: "About",
    about_title: "Who I Am",
    about_text_1: "I am a designer focused on packaging, primarily OEM / private label packaging and gifting & welfare channel design.\n\nMy focus is not just whether packaging looks good, but whether it holds up under real conditions — right for the channel, within budget, matched to process, and intact through production and delivery.",
    about_text_2: "For me, design does not start with style. It starts with judgment: what should be done, what should be cut, what fits the current conditions.\n\nAIGC is a tool for efficiency and comparison. The real value is still the judgment itself.",
    services_kicker: "Services",
    services_title: "Why Work With Me",
    services_intro: "What I offer is not just packaging design, but better judgment on what fits — within price, process, delivery, and channel constraints.",
    service_title_1: "Packaging-Led",
    service_text_1: "Primarily OEM / private label packaging, also covering gifting, welfare channels, series packaging, and gift box design.",
    service_title_2: "Judgment",
    service_text_2: "I focus on what actually fits the price band, process conditions, and channel context — not just what looks impressive.",
    service_title_3: "Execution Depth",
    service_text_3: "From materials and process to sampling and supplier coordination, I consider the relationship between design and delivery.",
    service_title_4: "Efficiency Awareness",
    service_text_4: "AIGC improves early-stage testing, option comparison, and proposal speed — but does not replace judgment.",
    service_title_5: "Integrated Expression",
    service_text_5: "When needed, I bring in brand, type, and visual systems to strengthen packaging recognition and overall completeness.",
    service_title_6: "Delivery Alignment",
    service_text_6: "I keep files, sampling feedback, and supplier communication clear so the direction can move smoothly into production.",
    clients_kicker: "Clients",
    clients_title: "Clients",
    contact_kicker: "Contact",
    contact_title: "Contact",
    contact_text: "If you are looking for a designer who understands packaging expression and takes real-world execution and cost constraints seriously, get in touch.",
    contact_collab: "OEM / Private Label · Gifting & Welfare Channels · Series Packaging · Seasonal Gift Boxes · Packaging Upgrade · Proposal & Direction Support",
    focus_kicker: "Active Project",
    meta_name: "Lucian J. Yang",
  },
};

Object.assign(i18n.zh, {
  contact_form_name: "\u59d3\u540d",
  contact_form_company: "\u516c\u53f8",
  contact_form_contact: "\u90ae\u7bb1/\u7535\u8bdd",
  contact_form_message: "\u9700\u6c42\u4fe1\u606f",
  contact_form_send: "\u53d1\u9001",
});

Object.assign(i18n.en, {
  contact_form_name: "Name",
  contact_form_company: "Company",
  contact_form_contact: "Email / Phone",
  contact_form_message: "Project Needs",
  contact_form_send: "Send",
});

Object.assign(i18n.zh, {
  works_col_project: "\u7c7b\u522b",
  works_col_type: "\u65b9\u5411",
  work_tab_oem: "OEM / \u54c1\u724c\u5305\u88c5",
  work_tab_gift: "\u793c\u54c1\u798f\u5229\u6e20\u9053",
  work_tab_brand: "\u54c1\u724c\u5b57\u4f53\u8f85\u52a9",
  work_tab_aigc: "AIGC \u6d41\u7a0b / SOP",
  work_tab_aigc_video: "\u77ed\u89c6\u9891 / \u5546\u4e1a\u7247\u521b\u4f5c",
  work_row_1_name: "\u5305\u88c5\u8bbe\u8ba1",
  work_row_2_name: "\u8282\u793c\u5305\u88c5\u8bbe\u8ba1",
  work_row_3_name: "\u54c1\u724c\u4e0e\u5b57\u4f53\u8bbe\u8ba1",
  work_row_4_name: "AIGC\u5de5\u4f5c\u6d41",
  work_row_5_name: "AIGC\u89c6\u9891",
});

Object.assign(i18n.en, {
  works_col_project: "Category",
  works_col_type: "Direction",
  work_tab_oem: "OEM / Brand Packaging",
  work_tab_gift: "Gifting / Welfare Channel",
  work_tab_brand: "Brand & Type Support",
  work_tab_aigc: "AIGC Workflow / SOP",
  work_tab_aigc_video: "Short Video / Commercial Film",
  work_row_1_name: "Packaging Design",
  work_row_2_name: "Gift Packaging Design",
  work_row_3_name: "Brand & Typography Design",
  work_row_4_name: "AIGC Workflow",
  work_row_5_name: "AIGC Video",
});

const worksData = {
  oem: {
    label: { zh: "OEM Packaging", en: "OEM Packaging" },
    title: { zh: "OEM / 贴牌包装", en: "OEM Packaging" },
    description: {
      zh: "在多 SKU、明确价格带与高执行要求下，建立稳定、清晰并且可延展的包装系统。",
      en: "Packaging systems built for multi-SKU, strict pricing bands, and execution-heavy production conditions.",
    },
    focus: { zh: "结构 / 识别 / 交付", en: "Structure / Recognition / Delivery" },
    value: { zh: "让包装在现实条件中真正成立", en: "Make packaging genuinely work in real conditions" },
  },
  gift: {
    label: { zh: "Gift Channel", en: "Gift Channel" },
    title: { zh: "礼品 / 福利渠道", en: "Gift Channel" },
    description: {
      zh: "在礼赠感、预算、内容编排与交付节点之间做平衡，而不是只制造节日气氛。",
      en: "Balance gifting tone, budget, content structure, and delivery milestones instead of relying on mood alone.",
    },
    focus: { zh: "礼赠感 / 节奏 / 渠道", en: "Gift Tone / Timing / Channel" },
    value: { zh: "让礼盒在预算和节点中依然成立", en: "Make gift packaging hold together under budget and seasonal deadlines" },
  },
  series: {
    label: { zh: "Series Packaging", en: "Series Packaging" },
    title: { zh: "系列包装 / 礼盒", en: "Series Packaging" },
    description: {
      zh: "统一系统中的差异表达，让节点性与系列感同时存在。",
      en: "Keep both series consistency and item-level distinction inside one structured system.",
    },
    focus: { zh: "系统 / 节点 / 延展", en: "System / Node / Extension" },
    value: { zh: "建立能延展的系列秩序", en: "Build an extensible packaging order" },
  },
  brand: {
    label: { zh: "Brand Support", en: "Brand Support" },
    title: { zh: "品牌 / 字体辅助", en: "Brand Support" },
    description: {
      zh: "让字体、识别与视觉规则服务包装主轴，而不是喧宾夺主。",
      en: "Let typography and identity support the packaging axis instead of taking over.",
    },
    focus: { zh: "字体 / 识别 / 节制", en: "Typography / Identity / Restraint" },
    value: { zh: "补强表达，但不制造噪音", en: "Strengthen expression without adding noise" },
  },
  aigc: {
    label: { zh: "AIGC Workflow", en: "AIGC Workflow" },
    title: { zh: "AIGC 流程辅助", en: "AIGC Workflow" },
    description: {
      zh: "更快生成比较样本与方向草案，但最终保留什么仍由判断决定。",
      en: "Generate comparative drafts faster, while judgment still decides what deserves to remain.",
    },
    focus: { zh: "流程 / 比较 / 筛选", en: "Workflow / Comparison / Selection" },
    value: { zh: "提效，不替代判断", en: "Accelerate the process without replacing judgment" },
  },
};

Object.assign(worksData, {
  "aigc-video": {
    label: { zh: "AIGC Video", en: "AIGC Video" },
    title: { zh: "AIGC\u89c6\u9891", en: "AIGC Video" },
    description: {
      zh: "\u4ee5 AIGC \u5de5\u5177\u8f85\u52a9\u77ed\u89c6\u9891\u3001\u5546\u4e1a\u7247\u548c\u63d0\u6848\u52a8\u6001\u5185\u5bb9\u521b\u4f5c\u3002",
      en: "AIGC-assisted short video, commercial film, and motion content for proposals.",
    },
    focus: { zh: "\u77ed\u89c6\u9891 / \u5546\u4e1a\u7247 / \u52a8\u6001\u63d0\u6848", en: "Short Video / Commercial Film / Motion Pitch" },
    value: { zh: "\u628a\u6982\u5ff5\u66f4\u5feb\u53d8\u6210\u53ef\u89c2\u770b\u7684\u52a8\u6001\u8868\u8fbe", en: "Turn concepts into watchable motion faster" },
  },
});

const cardPresets = [
  { x: -0.46, y: -0.12, w: 200, h: 268, r: -9, d: -120 },
  { x: -0.31, y: -0.04, w: 212, h: 284, r: -6, d: -56 },
  { x: -0.17, y: -0.16, w: 196, h: 262, r: -4, d: 18 },
  { x: -0.03, y: -0.18, w: 190, h: 254, r:  5, d: 44 },
  { x:  0.13, y: -0.05, w: 222, h: 296, r:  7, d: 110 },
  { x:  0.28, y: -0.12, w: 188, h: 252, r: -6, d: 176 },
  { x:  0.38, y:  0.04, w: 180, h: 240, r: -4, d: 132 },
  { x: -0.24, y:  0.08, w: 194, h: 260, r:  7, d: -12 },
  { x: -0.06, y:  0.06, w: 214, h: 286, r: -9, d: -74 },
  { x:  0.11, y:  0.06, w: 190, h: 254, r:  4, d: 28 },
  { x:  0.26, y:  0.05, w: 206, h: 276, r: -5, d: 104 },
  { x:  0.42, y:  0.02, w: 184, h: 246, r:  6, d: 188 },
];

let currentLang = "zh";
let audioContext = null;
let lastToneAt = 0;
let heroWireframeController = null;
let currentHeroCard = null;
let flowPaused = false;
let focusTimeout = null;
let orderedMode = false;
let selectedWorkKey = "oem";
let hasEntered = false;
let selectionStartedAt = 0;
let selectedCardIndex = -1;

// Hero wheel-step system
// step 0 = water intro (2 wheel ticks held here)
// step 1-6 = card focus steps
const HERO_CARD_COUNT = 6;
const HERO_INTRO_TICKS = 2;
let heroStep = 0;           // 0..HERO_CARD_COUNT
let heroStepTarget = 0;     // lerp target (float)
let heroWheelLocked = false;// debounce between steps
const heroCardStates = [];
const fieldPointer = { x: 0.5, y: 0.5, active: false };
const precisionCursor = document.querySelector("#precision-cursor");
const precisionGuides = document.querySelector("#precision-guides");
const heroClusterLayout = [
  { ox: -0.52, oy: -0.23, scale: 0.88, rot: -12, depth: -24, phase: 0.1 },
  { ox: -0.32, oy: -0.31, scale: 0.86, rot: -6, depth: -8,  phase: 0.6 },
  { ox: -0.10, oy: -0.29, scale: 0.84, rot:  5, depth:  8,  phase: 1.1 },
  { ox:  0.14, oy: -0.23, scale: 0.86, rot:  9, depth: 22,  phase: 1.7 },
  { ox:  0.38, oy: -0.15, scale: 0.92, rot:  7, depth: 52,  phase: 2.1 },
  { ox:  0.52, oy:  0.07, scale: 0.84, rot: -8, depth: 18,  phase: 2.6 },
  { ox:  0.36, oy:  0.27, scale: 0.86, rot:  4, depth: -2,  phase: 3.1 },
  { ox:  0.12, oy:  0.35, scale: 0.90, rot: -9, depth: -18, phase: 3.7 },
  { ox: -0.16, oy:  0.31, scale: 0.82, rot:  8, depth: -34, phase: 4.2 },
  { ox: -0.40, oy:  0.17, scale: 1.04, rot:  0, depth: 66,  phase: 4.8 },
  { ox: -0.24, oy: -0.07, scale: 0.82, rot: -4, depth: 28,  phase: 5.4 },
  { ox:  0.22, oy:  0.09, scale: 0.78, rot: 11, depth: -12, phase: 5.9 },
];

const revealNodes = document.querySelectorAll(".reveal");
const langButtons = Array.from(document.querySelectorAll(".lang-button"));
const heroCards = Array.from(document.querySelectorAll(".hero-card"));
const worksTabs = Array.from(document.querySelectorAll(".works-tab"));
const heroSection = document.querySelector(".hero-section");
const heroStage = document.querySelector("#hero-stage");
const heroWireframe = document.querySelector("#hero-wireframe");
const worksPanel = document.querySelector("#works-panel");
const worksLabel = document.querySelector("#works-label");
const worksTitle = document.querySelector("#works-title");
const worksDescription = document.querySelector("#works-description");
const metricFocus = document.querySelector("#metric-focus");
const metricValue = document.querySelector("#metric-value");
const visualStage = document.querySelector("#visual-stage");
const particleCanvas = document.querySelector("#clients-particles");
const heroCopyCanvas = document.querySelector("#hero-copy-particles");
const beijingTimeNode = document.querySelector("#beijing-time");
const beijingDateNode = document.querySelector("#beijing-date");
const heroFocusPanel = document.querySelector("#hero-focus-panel");
const heroFocusKicker = document.querySelector("#hero-focus-kicker");
const heroFocusTitle = document.querySelector("#hero-focus-title");
const heroFocusDesc = document.querySelector("#hero-focus-desc");
const heroFocusMetaA = document.querySelector("#hero-focus-meta-a");
const heroFocusMetaB = document.querySelector("#hero-focus-meta-b");
const heroFocusEnter = document.querySelector("#hero-focus-enter");
const entryScreen = document.querySelector("#entry-screen");
const entryGo = document.querySelector("#entry-go");
const entryFieldCanvas = document.querySelector("#entry-field-canvas");
const entryCodeWord = document.querySelector("#entry-code-word");
const entryDielineLayer = document.querySelector("#entry-dieline-layer");
const entryWaveLayer = document.querySelector("#entry-wave-layer");
const homeLinks = Array.from(document.querySelectorAll('a[href="#top"]'));
const themeToggle = document.querySelector("#theme-toggle");
const soundToggle = document.querySelector("#sound-toggle");
const SOUND_STORAGE_KEY = "lucianYangSoundEnabled";

const readStoredBoolean = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return fallback;
    return value === "1";
  } catch {
    return fallback;
  }
};

const writeStoredBoolean = (key, value) => {
  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // Ignore storage failures and keep the in-memory preference.
  }
};

let soundEnabled = readStoredBoolean(SOUND_STORAGE_KEY, true);

const applySoundState = () => {
  document.body.classList.toggle("sound-muted", !soundEnabled);
  soundToggle?.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle?.setAttribute(
    "aria-label",
    soundEnabled ? "Mute interface sounds" : "Enable interface sounds"
  );
};

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

soundToggle?.addEventListener("click", async () => {
  soundEnabled = !soundEnabled;
  applySoundState();
  writeStoredBoolean(SOUND_STORAGE_KEY, soundEnabled);

  if (soundEnabled) {
    await getAudioContext().catch(() => null);
    playUiTone("click");
    return;
  }

  if (audioContext?.state === "running") {
    await audioContext.suspend().catch(() => null);
  }
});

applySoundState();

const SCROLL_TYPE_SELECTOR = [
  ".works-statement-title",
  ".works-statement-body",
  ".contact-headline",
].join(",");

const SCROLL_TYPE_SCOPE_SELECTOR = [
  "#services",
  "#works",
  "#contact",
  ".clients-section",
  ".work-gallery",
].join(",");

const shouldUseScrollTypeEffect = (node) => {
  if (!(node instanceof HTMLElement)) return false;
  if (!node.closest(SCROLL_TYPE_SCOPE_SELECTOR)) return false;
  if (node.closest("svg, canvas, input, textarea, select, option, script, style")) return false;
  if (node.matches(".toggle-icon, .site-svg-filters *, .entry-code-pixels *, .entry-dieline *")) return false;

  const text = node.textContent?.replace(/\s+/g, " ").trim() || "";
  return text.length > 0;
};

const splitScrollTypeText = (node) => {
  const text = node.textContent.replace(/\s+/g, " ").trim();
  if (!text) return;
  if (node.dataset.typeSource === text && node.querySelector(".scroll-type-glyph")) return;

  const fragment = document.createDocumentFragment();
  let glyphIndex = 0;

  Array.from(text).forEach((char) => {
    if (/\s/.test(char)) {
      fragment.appendChild(document.createTextNode(" "));
      return;
    }

    const glyph = document.createElement("span");
    glyph.className = "scroll-type-glyph";
    glyph.textContent = char;
    glyph.style.setProperty("--glyph-index", String(glyphIndex));
    fragment.appendChild(glyph);
    glyphIndex += 1;
  });

  node.textContent = "";
  node.appendChild(fragment);
  node.dataset.typeSource = text;
  node.style.setProperty("--glyph-count", String(Math.max(glyphIndex, 1)));
};

const syncScrollTypeText = (root = document) => {
  root.querySelectorAll?.(SCROLL_TYPE_SELECTOR).forEach((node) => {
    if (!shouldUseScrollTypeEffect(node)) {
      node.classList.remove("scroll-type-text");
      delete node.dataset.typeSource;
      return;
    }
    node.classList.add("scroll-type-text");
    splitScrollTypeText(node);
  });
  collectScrollTypeItems();
};

let scrollTypeLastY = window.scrollY;
let scrollTypeDirection = 1;
let scrollTypeRaf = 0;
let scrollTypeItems = [];
let scrollSceneItems = [];

const collectScrollTypeItems = () => {
  scrollTypeItems = Array.from(document.querySelectorAll(".scroll-type-glyph")).map((glyph) => ({
    glyph,
    parent: glyph.closest(".scroll-type-text"),
    index: Number(glyph.style.getPropertyValue("--glyph-index") || 0),
  }));
};

const collectScrollScenes = () => {
  scrollSceneItems = Array.from(document.querySelectorAll("#about, #works, #contact, .clients-section"));
};

const updateScrollScenes = () => {
  const vh = window.innerHeight || 1;

  scrollSceneItems.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - vh * 0.5);
    const range = Math.max(vh * 0.62, rect.height * 0.42);
    const rawActive = 1 - Math.min(1, distance / range);
    const active = rawActive * rawActive * (3 - 2 * rawActive);
    const direction = center > vh * 0.5 ? 1 : -1;
    const y = (1 - active) * 28 * direction;
    const blur = 0;
    const scale = 0.992 + active * 0.008;

    section.style.setProperty("--scene-active", active.toFixed(4));
    section.style.setProperty("--scene-y", `${y.toFixed(2)}px`);
    section.style.setProperty("--scene-blur", `${blur.toFixed(2)}px`);
    section.style.setProperty("--scene-scale", scale.toFixed(4));
  });
};

const updateScrollTypeItems = () => {
  scrollTypeRaf = 0;
  updateScrollScenes();
  const vh = window.innerHeight || 1;
  const focusLine = vh * 0.48;
  const focusRange = Math.max(260, vh * 0.42);
  const measured = scrollTypeItems.map((item) => ({
    ...item,
    rect: item.glyph.getBoundingClientRect(),
    parentRect: item.parent?.getBoundingClientRect(),
  }));

  measured.forEach(({ glyph, parent, index, rect, parentRect }) => {
    if (!parent) return;
    const isHeroDisplay = parent.matches(".about-heading, .contact-headline");
    const isWorksStatementTitle = parent.matches(".works-statement-title");
    const isParagraph = parent.matches(".about-lead, .about-detail, .works-statement-body");
    const localFocusRange = isWorksStatementTitle || parent.matches(".works-statement-body")
      ? Math.max(420, vh * 0.7)
      : focusRange;
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - focusLine);
    const raw = 1 - Math.min(1, distance / localFocusRange);
    const viewportFocus = raw * raw * (3 - 2 * raw);
    const count = Number(parent.style.getPropertyValue("--glyph-count") || 1);
    const glyphOrder = count <= 1 ? 0 : index / (count - 1);
    const parentPhase = Math.max(-0.2, Math.min(1.2, (focusLine - parentRect.top) / Math.max(parentRect.height, 1)));
    const directionBias = scrollTypeDirection < 0 ? -0.035 : 0.035;
    const scanPhase = parentPhase + directionBias;
    const smooth = (value) => value * value * (3 - 2 * value);
    const enterWindow = isWorksStatementTitle ? 0.34 : isParagraph ? 0.32 : 0.26;
    const exitStart = isWorksStatementTitle ? 0.92 : isParagraph ? 0.9 : 0.82;
    const exitWindow = isWorksStatementTitle ? 0.3 : isParagraph ? 0.28 : 0.22;
    const enter = smooth(Math.max(0, Math.min(1, (scanPhase - glyphOrder * 0.38) / enterWindow)));
    const exit = smooth(Math.max(0, Math.min(1, (scanPhase - exitStart - glyphOrder * 0.12) / exitWindow)));
    const amount = Math.max(0, Math.min(1, enter * (1 - exit)));
    const focus = Math.max(viewportFocus * 0.58, amount);
    const baseMaxBlur = isHeroDisplay ? 11 : isWorksStatementTitle ? 3.6 : isParagraph ? 2.6 : 6;
    const exitBlur = isHeroDisplay ? 7 : isWorksStatementTitle ? 1.8 : isParagraph ? 1.4 : 4;
    const maxY = isHeroDisplay ? 14 : isWorksStatementTitle ? 5 : isParagraph ? 3.5 : 7;
    const enteringFromBelow = center > focusLine ? 1 : -1;
    const y = ((1 - enter) * maxY - exit * maxY * 0.7) * enteringFromBelow * scrollTypeDirection;
    const blur = 0;
    const minOpacity = isHeroDisplay ? 0.08 : isWorksStatementTitle ? 0.34 : isParagraph ? 0.22 : 0.06;
    const opacity = Math.max(minOpacity, 0.12 + amount * 0.82 + viewportFocus * 0.12 - exit * 0.16);

    glyph.style.setProperty("--type-focus", focus.toFixed(4));
    glyph.style.setProperty("--type-blur", `${blur.toFixed(2)}px`);
    glyph.style.setProperty("--type-y", `${y.toFixed(2)}px`);
    glyph.style.setProperty("--type-opacity", opacity.toFixed(3));
  });
};

const requestScrollTypeUpdate = (direction = 0) => {
  if (direction) {
    scrollTypeDirection = direction > 0 ? 1 : -1;
    document.body.classList.toggle("scrolling-up", direction < 0);
    document.body.classList.toggle("scrolling-down", direction >= 0);
  }
  if (!scrollTypeRaf) scrollTypeRaf = window.requestAnimationFrame(updateScrollTypeItems);
};

const pulseScrollType = (direction) => {
  requestScrollTypeUpdate(direction);
};

if (!reducedMotion) {
  syncScrollTypeText();
  collectScrollScenes();
  requestScrollTypeUpdate(1);

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - scrollTypeLastY;
      scrollTypeLastY = y;
      if (Math.abs(delta) < 2) return;
      pulseScrollType(delta);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    collectScrollTypeItems();
    collectScrollScenes();
    requestScrollTypeUpdate();
  }, { passive: true });

  window.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) < 1) return;
      pulseScrollType(event.deltaY);
    },
    { passive: true }
  );

  let scrollTypeTouchY = 0;
  window.addEventListener(
    "touchstart",
    (event) => {
      scrollTypeTouchY = event.touches[0]?.clientY || 0;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchmove",
    (event) => {
      const y = event.touches[0]?.clientY || scrollTypeTouchY;
      const delta = scrollTypeTouchY - y;
      scrollTypeTouchY = y;
      if (Math.abs(delta) < 2) return;
      pulseScrollType(delta);
    },
    { passive: true }
  );

  const scrollTypeObserver = new MutationObserver((mutations) => {
    let shouldSync = false;
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        return;
      }
      shouldSync = shouldSync || Array.from(mutation.addedNodes).some((node) => (
        node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE
      ));
    });

    if (shouldSync) {
      window.requestAnimationFrame(() => {
        syncScrollTypeText();
        requestScrollTypeUpdate();
      });
    }
  });

  scrollTypeObserver.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

// Contact: hover-to-copy
const copyItems = document.querySelectorAll(".contact-copy-item");
const contactForm = document.querySelector("#contact-form");

copyItems.forEach((item) => {
  let hoverTimer = null;
  item.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      const text = item.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        item.classList.add("copied");
        setTimeout(() => item.classList.remove("copied"), 1600);
      });
    }, 400);
  });
  item.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = currentLang === "zh" ? "\u5305\u88c5\u8bbe\u8ba1\u9700\u6c42\u54a8\u8be2" : "Packaging Design Inquiry";
  const body = [
    `${i18n[currentLang].contact_form_name}: ${name}`,
    `${i18n[currentLang].contact_form_company}: ${company || "-"}`,
    `${i18n[currentLang].contact_form_contact}: ${contact}`,
    "",
    `${i18n[currentLang].contact_form_message}:`,
    message,
  ].join("\n");

  window.location.href = `mailto:y1156813759@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  playUiTone("click");
});

// WeChat QR modal
const wechatTrigger = document.querySelector("#wechat-qr-trigger");
const wechatModal = document.querySelector("#wechat-qr-modal");
const wechatBackdrop = document.querySelector("#wechat-qr-backdrop");
const wechatClose = document.querySelector("#wechat-qr-close");

wechatTrigger?.addEventListener("click", () => wechatModal?.classList.add("is-open"));
wechatClose?.addEventListener("click", () => wechatModal?.classList.remove("is-open"));
wechatBackdrop?.addEventListener("click", () => wechatModal?.classList.remove("is-open"));

const stageMotion = {
  width: 0,
  height: 0,
  startAt: performance.now(),
};

const getAudioContext = async () => {
  if (!soundEnabled) return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) {
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume().catch(() => null);
  }
  return audioContext;
};

const playUiTone = async (type = "hover") => {
  if (!soundEnabled) return;
  const nowMs = performance.now();
  if (nowMs - lastToneAt < 90) return;
  lastToneAt = nowMs;

  const context = await getAudioContext().catch(() => null);
  if (!context || context.state !== "running") return;

  const now = context.currentTime;
  const oscA = context.createOscillator();
  const oscB = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const base = type === "click" ? 610 : 760;

  oscA.type = "triangle";
  oscA.frequency.setValueAtTime(base, now);
  oscA.frequency.exponentialRampToValueAtTime(base * 0.74, now + 0.11);

  oscB.type = "sine";
  oscB.frequency.setValueAtTime(base * 1.38, now);
  oscB.frequency.exponentialRampToValueAtTime(base * 1.08, now + 0.09);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(type === "click" ? 1200 : 1500, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(type === "click" ? 0.03 : 0.018, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (type === "click" ? 0.22 : 0.15));

  oscA.connect(filter);
  oscB.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  oscA.start(now);
  oscB.start(now);
  oscA.stop(now + 0.18);
  oscB.stop(now + 0.16);
};

const playPackagingSnap = async (pitch = 1, gainBoost = 1, delayMs = 0) => {
  if (!soundEnabled) return;
  const context = await getAudioContext().catch(() => null);
  if (!context || context.state !== "running") return;

  const now = context.currentTime + delayMs / 1000;
  const gain = context.createGain();
  const bandpass = context.createBiquadFilter();
  const lowpass = context.createBiquadFilter();
  const tone = context.createOscillator();
  const toneGain = context.createGain();

  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(1380 * pitch, now);
  bandpass.Q.setValueAtTime(0.9, now);

  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(3200, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.04 * gainBoost, now + 0.014);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  tone.type = "triangle";
  tone.frequency.setValueAtTime(410 * pitch, now);
  tone.frequency.exponentialRampToValueAtTime(260 * pitch, now + 0.12);
  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.exponentialRampToValueAtTime(0.028 * gainBoost, now + 0.012);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

  const burstBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.06), context.sampleRate);
  const burstData = burstBuffer.getChannelData(0);
  for (let index = 0; index < burstData.length; index += 1) {
    const decay = 1 - index / burstData.length;
    burstData[index] = (Math.random() * 2 - 1) * decay * 0.2;
  }

  const burstSource = context.createBufferSource();
  const burstGain = context.createGain();
  burstSource.buffer = burstBuffer;
  burstGain.gain.setValueAtTime(0.0001, now);
  burstGain.gain.exponentialRampToValueAtTime(0.032 * gainBoost, now + 0.008);
  burstGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);

  tone.connect(toneGain);
  toneGain.connect(bandpass);
  burstSource.connect(burstGain);
  burstGain.connect(bandpass);
  bandpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(context.destination);

  tone.start(now);
  tone.stop(now + 0.14);
  burstSource.start(now);
};

const playWaterDrop = async () => {
  if (!soundEnabled) return;
  const context = await getAudioContext().catch(() => null);
  if (!context) return;

  if (context.state === "suspended") {
    await context.resume().catch(() => null);
  }

  if (context.state !== "running") return;

  const now = context.currentTime;
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const osc = context.createOscillator();

  // Water drop: sine wave, 1100 Hz → 420 Hz, 80ms
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400, now);
  filter.Q.setValueAtTime(1.2, now);

  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  osc.start(now);
  osc.stop(now + 0.09);
};

const playBoxOpenTone = () => {
  playPackagingSnap(1, 1.1, 0);
  playPackagingSnap(1.18, 0.82, 44);
  playPackagingSnap(0.92, 0.68, 94);
};

const updateStaticText = () => {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (i18n[currentLang][key]) {
      node.textContent = i18n[currentLang][key];
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
    if (button.dataset.lang === "zh") button.textContent = "中";
    if (button.dataset.lang === "en") button.textContent = "EN";
  });
};

const resizeStage = () => {
  if (!heroStage) return;
  const rect = heroStage.getBoundingClientRect();
  stageMotion.width = rect.width;
  stageMotion.height = rect.height;
};

const setCardPosition = (card, config) => {
  const w = config.w;
  const h = config.h;
  const z = config.z || 0;
  const r = config.r || 0;
  const ry = config.ry || 0;
  const rx = config.rx || 0;
  const x = config.x;
  const y = config.y;
  const scale = config.scale ?? 1;
  const opacity = config.opacity ?? 1;
  card.style.width = `${w}px`;
  card.style.height = `${h}px`;
  card.style.opacity = String(opacity);
  card.style.zIndex = `${Math.round(160 + z)}`;
  card.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, ${z}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${r}deg) scale(${scale})`;
};

const initCards = () => {
  heroCardStates.length = 0;
  heroCards.forEach((card, index) => {
    const preset = cardPresets[index % cardPresets.length];
    const layout = heroClusterLayout[index % heroClusterLayout.length];
    const width = Math.round(Math.min(320, Math.max(220, preset.w * 1.18)));
    const height = Math.round(width * (4 / 3));
    const state = {
      card,
      index,
      width,
      height,
      x: stageMotion.width * 0.5,
      y: stageMotion.height * 0.5,
      targetX: stageMotion.width * 0.5,
      targetY: stageMotion.height * 0.5,
      rotation: layout.rot,
      scale: layout.scale,
      opacity: 0.76,
      depth: layout.depth,
      layout,
      phase: layout.phase,
      captureX: stageMotion.width * 0.5,
      captureY: stageMotion.height * 0.5,
    };
    heroCardStates.push(state);
    card.dataset.index = String(index);
  });
};

const setCursorVisible = (visible) => {
  if (!precisionCursor) return;
  const allowed = visible && entryScreen && !document.body.classList.contains("has-entered");
  precisionCursor.classList.toggle("is-visible", allowed);
  precisionGuides?.classList.toggle("is-visible", allowed);
  document.body.classList.toggle("cursor-active", allowed);
};

const updatePrecisionCursor = (clientX, clientY) => {
  if (!precisionCursor) return;
  precisionCursor.style.left = `${clientX}px`;
  precisionCursor.style.top = `${clientY}px`;
  document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
};

const setActiveHeroCard = (card) => {
  currentHeroCard = card;
  heroCards.forEach((item) => {
    item.classList.toggle("is-active", item === card && !orderedMode);
    item.classList.toggle("is-dimmed", orderedMode && item !== card);
  });

  if (card && heroWireframeController?.focusFromCard) {
    heroWireframeController.focusFromCard(card);
  }
};

const updateFocusPanel = (workKey) => {
  const data = worksData[workKey];
  if (!data) return;
  selectedWorkKey = workKey;
  heroFocusKicker.textContent = i18n[currentLang].focus_kicker;
  heroFocusTitle.textContent = data.title[currentLang];
  heroFocusDesc.textContent = data.description[currentLang];
  heroFocusMetaA.textContent = data.focus[currentLang];
  heroFocusMetaB.textContent = data.value[currentLang];
  heroFocusEnter.textContent = i18n[currentLang].hero_action_works;
};

const updateWorksPanel = (workKey) => {
  const data = worksData[workKey];
  if (!data) return;

  if (worksLabel) worksLabel.textContent = data.label[currentLang];
  if (worksTitle) worksTitle.textContent = data.title[currentLang];
  if (worksDescription) worksDescription.textContent = data.description[currentLang];
  if (metricFocus) metricFocus.textContent = data.focus[currentLang];
  if (metricValue) metricValue.textContent = data.value[currentLang];

  worksTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.workTarget === workKey);
  });
};

const applyOrderedLayout = (activeCard) => {
  orderedMode = true;
  selectedCardIndex = Number(activeCard.dataset.index || -1);
  const selectedState = heroCardStates[selectedCardIndex];
  if (selectedState) {
    selectedState.captureX = selectedState.x;
    selectedState.captureY = selectedState.y;
  }
  selectionStartedAt = performance.now();
  heroFocusPanel.classList.remove("is-visible");
  window.clearTimeout(focusTimeout);
};

const releaseOrderedLayout = () => {
  orderedMode = false;
  selectedCardIndex = -1;
  selectionStartedAt = 0;
  heroCards.forEach((card) => {
    card.classList.remove("is-ordered", "is-dimmed", "is-active");
  });
  heroFocusPanel.classList.remove("is-visible");
};

const enterProject = (card) => {
  const projectKey = card.dataset.projectKey || card.dataset.work;
  const projectIndex = parseInt(card.dataset.projectIndex || "0", 10);
  const cardName = card.querySelector(".hero-card-name")?.textContent.trim() || "Project";

  if (!workGallery || !workGalleryTrack) return;

  galleryCategory = projectKey;
  const items = workGalleryImages[projectKey] || workGalleryImages.oem;

  buildGalleryItems(items);
  galleryTargetX = 0;
  galleryCurrentX = 0;
  galleryStep = projectIndex;
  galleryWheelLocked = false;

  // Open in detail mode directly
  galleryMode = "detail";
  renderWorkDetail(items[projectIndex] || items[0], projectIndex);
  workGallery.classList.add("is-detail");

  updateGalleryChromeText();
  if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(items[projectIndex] || items[0], projectIndex) || cardName;
  if (workGalleryIndex) workGalleryIndex.textContent = String(projectIndex + 1).padStart(2, "0");
  if (worksPreview) worksPreview.classList.remove("is-visible");

  document.body.classList.add("work-gallery-open");
  document.documentElement.classList.add("work-gallery-open");
  workGallery.setAttribute("aria-hidden", "false");
  workGallery.classList.remove("is-open");
  void workGallery.offsetWidth;
  workGallery.classList.add("is-open");
  workGallery.scrollTo({ top: 0, behavior: "auto" });

  window.setTimeout(() => {
    measureGallery();
    queueGalleryRender();
  }, 40);

  galleryOpen = true;
  playUiTone("click");
};

const switchLanguage = (lang) => {
  currentLang = lang;
  updateStaticText();
  window.rebuildServicesStoryText?.();
  updateFocusPanel(selectedWorkKey);
  updateWorksPanel(selectedWorkKey);
  refreshOpenGalleryLanguage();
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchLanguage(button.dataset.lang);
    playUiTone("click");
  });
});

heroCards.forEach((card) => {
  card.addEventListener("pointerenter", () => {
    if (heroStep === 0 || orderedMode) return;
    setActiveHeroCard(card);
    playUiTone("hover");
  });

  card.addEventListener("focus", () => {
    if (heroStep === 0 || orderedMode) return;
    setActiveHeroCard(card);
  });

  card.addEventListener("click", (event) => {
    if (heroStep === 0) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    enterProject(card);
  });
});

window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") {
    setCursorVisible(false);
    fieldPointer.active = false;
    return;
  }

  updatePrecisionCursor(event.clientX, event.clientY);
  const entryRect = entryScreen?.getBoundingClientRect();
  const insideEntry = !!entryRect &&
    entryRect.bottom > 0 &&
    event.clientX >= entryRect.left &&
    event.clientX <= entryRect.right &&
    event.clientY >= entryRect.top &&
    event.clientY <= entryRect.bottom;
  setCursorVisible(insideEntry);

  if (heroStage) {
    const rect = heroStage.getBoundingClientRect();
    const insideHero =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (insideHero) {
      fieldPointer.x = (event.clientX - rect.left) / rect.width;
      fieldPointer.y = (event.clientY - rect.top) / rect.height;
      fieldPointer.active = true;
    } else {
      fieldPointer.active = false;
      if (!orderedMode) {
        currentHeroCard = null;
        heroCards.forEach((card) => card.classList.remove("is-active"));
      }
    }
  }
});

document.addEventListener("pointerleave", () => {
  setCursorVisible(false);
  fieldPointer.active = false;
});

worksTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedWorkKey = tab.dataset.workTarget;
    updateWorksPanel(selectedWorkKey);
    updateFocusPanel(selectedWorkKey);
    playUiTone("click");
  });
});

// Works list hover preview
const worksPreview = document.querySelector("#works-hover-preview");
const worksPreviewImg = document.querySelector("#works-preview-img");

const categoryColors = {
  oem:    ["#2a2420", "#3d3028", "#4a3a30", "#352a22"],
  gift:   ["#2e2228", "#3a2a32", "#4a3040", "#2a1e28"],
  series: ["#1e2430", "#242c3a", "#2a3448", "#1a2030"],
  brand:  ["#222820", "#2c3228", "#343c2e", "#1e2418"],
  aigc:   ["#1a1c22", "#20222c", "#242830", "#1c1e26"],
  "aigc-video": ["#161820", "#202436", "#283048", "#12141d"],
  delivery: ["#24211c", "#312b22", "#40362a", "#221f1a"],
};

const categoryPatterns = {
  oem:    "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
  gift:   "repeating-linear-gradient(-45deg, rgba(255,200,180,0.06) 0px, rgba(255,200,180,0.06) 1px, transparent 1px, transparent 10px)",
  series: "repeating-linear-gradient(90deg, rgba(100,160,220,0.05) 0px, rgba(100,160,220,0.05) 1px, transparent 1px, transparent 14px)",
  brand:  "repeating-linear-gradient(0deg, rgba(180,200,120,0.05) 0px, rgba(180,200,120,0.05) 1px, transparent 1px, transparent 11px)",
  aigc:   "repeating-linear-gradient(135deg, rgba(140,160,220,0.06) 0px, rgba(140,160,220,0.06) 1px, transparent 1px, transparent 9px)",
  "aigc-video": "repeating-linear-gradient(120deg, rgba(150,180,255,0.07) 0px, rgba(150,180,255,0.07) 1px, transparent 1px, transparent 8px)",
  delivery: "repeating-linear-gradient(45deg, rgba(230,210,170,0.06) 0px, rgba(230,210,170,0.06) 1px, transparent 1px, transparent 10px)",
};

let previewRaf = null;
let previewTarget = { x: 0, y: 0 };
let previewCurrent = { x: 0, y: 0 };

const animatePreview = () => {
  previewCurrent.x += (previewTarget.x - previewCurrent.x) * 0.12;
  previewCurrent.y += (previewTarget.y - previewCurrent.y) * 0.12;
  if (worksPreview) {
    worksPreview.style.transform = `translate(${previewCurrent.x}px, ${previewCurrent.y}px)`;
  }
  previewRaf = requestAnimationFrame(animatePreview);
};

const worksRows = Array.from(document.querySelectorAll(".works-row"));
worksRows.forEach((row) => {
  const cat = row.dataset.category;
  const colors = categoryColors[cat] || categoryColors.oem;
  const pattern = categoryPatterns[cat] || categoryPatterns.oem;
  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");

  row.addEventListener("mouseenter", (e) => {
    if (worksPreviewImg) {
      const imagePool = workGalleryImages?.[cat] || [];
      const imageItem = imagePool[Math.floor(Math.random() * imagePool.length)];
      worksPreviewImg.classList.remove("is-image-preview", "is-waving");
      if (imageItem?.src) {
        worksPreviewImg.style.setProperty("--preview-image", `url("${imageItem.src}")`);
        worksPreviewImg.style.setProperty("--preview-position", imageItem.position || "center");
        worksPreviewImg.style.removeProperty("--preview-fallback");
        worksPreviewImg.classList.add("is-image-preview");
        if (!reducedMotion) {
          void worksPreviewImg.offsetWidth;
          worksPreviewImg.classList.add("is-waving");
        }
      } else {
        const bg = colors[Math.floor(Math.random() * colors.length)];
        worksPreviewImg.style.setProperty("--preview-image", "none");
        worksPreviewImg.style.setProperty("--preview-position", "center");
        worksPreviewImg.style.setProperty("--preview-fallback", `${pattern}, ${bg}`);
      }
    }
    if (worksPreview) {
      worksPreview.classList.add("is-visible");
    }
    if (!previewRaf) previewRaf = requestAnimationFrame(animatePreview);
  });

  row.addEventListener("mousemove", (e) => {
    previewTarget.x = e.clientX + 24;
    previewTarget.y = e.clientY - 80;
  });

  row.addEventListener("mouseleave", () => {
    if (worksPreview) worksPreview.classList.remove("is-visible");
    if (worksPreviewImg) worksPreviewImg.classList.remove("is-waving");
    if (previewRaf) { cancelAnimationFrame(previewRaf); previewRaf = null; }
  });
});

// Click-through horizontal project gallery
const workGallery = document.querySelector("#work-gallery");
const workGalleryTrack = document.querySelector("#work-gallery-track");
const workGalleryTitle = document.querySelector("#work-gallery-title");
const workGalleryIndex = document.querySelector("#work-gallery-index");
const workGalleryClose = document.querySelector("#work-gallery-close");
const workGalleryBack = document.querySelector("#work-gallery-back");
const workGalleryProgressFill = document.querySelector("#work-gallery-progress-fill");
const workDetail = document.querySelector("#work-detail");

const workGalleryImages = {
  oem: [
    { title: "STRUCTURE STUDY", src: "images/666.png", position: "center", size: "wide" },
    { title: "SHELF SYSTEM", src: "images/居居.png", position: "center", size: "small", bg: "#d8d0c0" },
    { title: "SURFACE DIRECTION", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "small", bg: "#cfc5b4" },
  ],
  gift: [
    { title: "GIFT PROJECT 01", src: "images/works/gift/0000.png", position: "center", size: "wide" },
    { title: "GIFT PROJECT 02", src: "images/works/gift/000000.png", position: "center", size: "wide" },
    { title: "GIFT PROJECT 03", src: "images/works/gift/1-1.png", position: "center", size: "wide" },
    { title: "GIFT PROJECT 04", src: "images/works/gift/1.png", position: "center", size: "wide" },
    { title: "GIFT PROJECT 05", src: "images/works/gift/3.png", position: "center", size: "wide" },
    { title: "GIFT PROJECT 06", src: "images/works/gift/333.png", position: "center", size: "wide" },
  ],
  series: [
    { title: "SERIES RHYTHM", src: "images/666.png", position: "65% center", size: "wide" },
    { title: "BOX LANGUAGE", src: "images/居居.png", position: "center", size: "small", bg: "#c6ccd6" },
    { title: "SYSTEM MARK", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "small", bg: "#d5d8dc" },
  ],
  brand: [
    { title: "TYPE FIELD", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "wide", bg: "#e5e1d6" },
    { title: "IDENTITY CROP", src: "images/666.png", position: "center", size: "wide" },
    { title: "MARK DETAIL", src: "images/居居.png", position: "center", size: "small", bg: "#ccd4c3" },
  ],
  aigc: [
    { title: "PROMPT BOARD", src: "images/666.png", position: "center", size: "wide" },
    { title: "OPTION COMPARE", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "small", bg: "#cbcbd2" },
    { title: "DRAFT FILTER", src: "images/居居.png", position: "center", size: "small", bg: "#d7d5ce" },
  ],
  delivery: [
    { title: "SAMPLING ROUND", src: "images/666.png", position: "44% center", size: "wide" },
    { title: "MATERIAL CHECK", src: "images/居居.png", position: "center", size: "small", bg: "#d8ceb8" },
    { title: "FINAL HANDOFF", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "small", bg: "#e0d8ca" },
  ],
};

workGalleryImages["aigc-video"] = [
  { title: "AIGC VIDEO 01", src: "images/666.png", position: "center", size: "wide" },
  { title: "SHORT VIDEO FLOW", src: "images/lucian-j-yang-logo.png.png", position: "center", size: "small", bg: "#cbcbd2" },
  { title: "COMMERCIAL FILM STUDY", src: "images/666.png", position: "center", size: "wide" },
];

const galleryText = {
  zh: {
    back: "\u8fd4\u56de",
    close: "\u5173\u95ed",
    project: "\u9879\u76ee",
    giftTitle: "\u793c\u54c1\u9879\u76ee",
    categoryTitles: {
      oem: "OEM \u5305\u88c5\u9879\u76ee",
      gift: "\u793c\u54c1\u9879\u76ee",
      series: "\u7cfb\u5217\u5305\u88c5\u9879\u76ee",
      brand: "\u54c1\u724c\u8f85\u52a9\u9879\u76ee",
      aigc: "AIGC \u6d41\u7a0b\u9879\u76ee",
      delivery: "\u4ea4\u4ed8\u534f\u540c\u9879\u76ee",
    },
    tags: ["\u5305\u88c5", "\u89c6\u89c9\u65b9\u5411", "\u4ea4\u4ed8"],
    summary: "\u4ee5\u6e20\u9053\u6e05\u6670\u5ea6\u3001\u751f\u4ea7\u53ef\u884c\u6027\u548c\u7a33\u5b9a\u89c6\u89c9\u7cfb\u7edf\u4e3a\u6838\u5fc3\u7684\u5305\u88c5\u65b9\u5411\u3002",
    body: [
      "\u8bbe\u8ba1\u8303\u56f4\u5305\u62ec\u5305\u88c5\u7ed3\u6784\u3001\u753b\u9762\u8282\u594f\u3001\u8bc6\u522b\u5c42\u7ea7\u4e0e\u63d0\u6848\u8f93\u51fa\u3002",
      "\u65b9\u6848\u9700\u8981\u5728\u89c6\u89c9\u8868\u8fbe\u3001\u6750\u6599\u3001\u6210\u672c\u3001\u5de5\u827a\u4e0e\u4ea4\u4ed8\u7ea6\u675f\u4e4b\u95f4\u4fdd\u6301\u5e73\u8861\u3002",
    ],
  },
  en: {
    back: "Back",
    close: "Close",
    project: "Project",
    giftTitle: "Gift Project",
    tags: ["PACKAGING", "ART DIRECTION", "DELIVERY"],
    summary: "A focused packaging direction built around channel clarity, production feasibility, and a calm visual system that can hold up in real use.",
    body: [
      "Design scope includes packaging structure, surface rhythm, recognition hierarchy, and presentation-ready visual output.",
      "The work balances visual expression with material, cost, process, and delivery constraints.",
    ],
  },
};

galleryText.zh.categoryTitles["aigc-video"] = "AIGC\u89c6\u9891";

let galleryTargetX = 0;
let galleryCurrentX = 0;
let galleryMaxX = 0;
let galleryRaf = 0;
let galleryOpen = false;
let galleryMode = "index";
let galleryCategory = "oem";
let galleryStep = 0;
let galleryWheelLocked = false;
let galleryPositions = [0];

const localizedValue = (value) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLang] || value.en || value.zh || "";
  }
  return value || "";
};

const getGalleryItemTitle = (item, index) => {
  const rawTitle = localizedValue(item?.title);
  if (currentLang === "zh") {
    if (item?.title && typeof item.title === "object" && item.title.zh) return rawTitle;
    const giftMatch = rawTitle.match(/^GIFT PROJECT\s+(\d+)/i);
    if (giftMatch) return `${galleryText.zh.giftTitle} ${giftMatch[1]}`;
    const categoryTitle = galleryText.zh.categoryTitles[galleryCategory] || galleryText.zh.project;
    return `${categoryTitle} ${String(index + 1).padStart(2, "0")}`;
  }
  return rawTitle || `${galleryText[currentLang].project} ${String(index + 1).padStart(2, "0")}`;
};

const updateGalleryChromeText = () => {
  if (workGalleryBack) workGalleryBack.textContent = galleryText[currentLang].back;
  if (workGalleryClose) {
    workGalleryClose.textContent = galleryText[currentLang].close;
    workGalleryClose.setAttribute("aria-label", galleryText[currentLang].close);
  }
};

const clampGalleryX = (value) => Math.max(0, Math.min(galleryMaxX, value));

const measureGallery = () => {
  if (!workGalleryTrack || !workGallery) return;
  galleryMaxX = Math.max(0, workGalleryTrack.scrollWidth - workGallery.clientWidth);
  const items = Array.from(workGalleryTrack.children);
  const firstLeft = items[0]?.offsetLeft || 0;
  galleryPositions = items.map((item) => clampGalleryX(item.offsetLeft - firstLeft));
  if (!galleryPositions.length) galleryPositions = [0];
  galleryStep = Math.max(0, Math.min(galleryPositions.length - 1, galleryStep));
  galleryTargetX = clampGalleryX(galleryTargetX);
  galleryCurrentX = clampGalleryX(galleryCurrentX);
};

const renderGallery = () => {
  galleryRaf = 0;
  galleryCurrentX += (galleryTargetX - galleryCurrentX) * 0.16;
  if (Math.abs(galleryTargetX - galleryCurrentX) < 0.12) galleryCurrentX = galleryTargetX;
  if (workGalleryTrack) {
    workGalleryTrack.style.transform = `translate3d(${-galleryCurrentX}px, 0, 0)`;
  }
  if (workGalleryProgressFill) {
    const progress = galleryMaxX ? galleryCurrentX / galleryMaxX : 0;
    workGalleryProgressFill.style.transform = `scaleX(${Math.max(0.04, progress).toFixed(4)})`;
  }
  if (galleryCurrentX !== galleryTargetX) {
    galleryRaf = window.requestAnimationFrame(renderGallery);
  }
};

const queueGalleryRender = () => {
  if (!galleryRaf) galleryRaf = window.requestAnimationFrame(renderGallery);
};

const buildGalleryItems = (items) => {
  if (!workGalleryTrack) return;
  workGalleryTrack.innerHTML = items.map((item, index) => `
    <article class="work-gallery-item ${item.size === "small" ? "is-small" : ""}" role="button" tabindex="0" data-project-index="${index}">
      <p class="work-gallery-caption">${getGalleryItemTitle(item, index)}</p>
      <div class="work-gallery-frame" style="--gallery-bg: ${item.bg || "#d8d0c0"}; --gallery-position: ${item.position || "center"};">
        <img src="${item.src}" alt="">
      </div>
    </article>
  `).join("");
};

const renderWorkDetail = (item, index) => {
  if (!workDetail) return;
  const title = getGalleryItemTitle(item, index);
  const copy = galleryText[currentLang];
  const summary = localizedValue(item.summary) || copy.summary;
  const body = item.body ? item.body.map(localizedValue) : copy.body;
  const tags = item.tags ? item.tags.map(localizedValue) : copy.tags;
  workDetail.innerHTML = `
    <section class="work-detail-intro">
      <aside class="work-detail-side">
        <div>
          <p class="work-detail-kicker">${copy.project} ${String(index + 1).padStart(2, "0")}</p>
          <h4 class="work-detail-name">${title}</h4>
          <div class="work-detail-tags">
            ${tags.map((tag) => `<span class="work-detail-tag">${tag}</span>`).join("")}
          </div>
        </div>
        <div class="work-detail-body">
          <p class="work-detail-copy">${summary}</p>
          ${body.map((line) => `<p>${line}</p>`).join("")}
        </div>
      </aside>
      <figure class="work-detail-hero" style="--gallery-position: ${item.position || "center"};">
        <img src="${item.src}" alt="">
      </figure>
    </section>
    <section class="work-detail-full">
      <figure class="work-detail-full-figure" style="--gallery-position: ${item.position || "center"};">
        <img src="${item.src}" alt="">
      </figure>
    </section>
  `;
};

const openWorkDetail = (index) => {
  if (!workGallery) return;
  const items = workGalleryImages[galleryCategory] || workGalleryImages.oem;
  const item = items[index] || items[0];
  galleryStep = Math.max(0, Math.min(items.length - 1, index));
  galleryMode = "detail";
  renderWorkDetail(item, galleryStep);
  workGallery.classList.add("is-detail");
  updateGalleryChromeText();
  if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(item, galleryStep);
  if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
  workGallery.scrollTo({ top: 0, behavior: "auto" });
  playUiTone("click");
};

const returnToGalleryIndex = () => {
  if (!workGallery) return;
  galleryMode = "index";
  workGallery.classList.remove("is-detail");
  if (workDetail) workDetail.innerHTML = "";
  const activeItem = workGalleryTrack?.children[galleryStep];
  if (workGalleryTitle) workGalleryTitle.textContent = activeItem?.querySelector(".work-gallery-caption")?.textContent || galleryText[currentLang].project;
  queueGalleryRender();
};

const refreshOpenGalleryLanguage = () => {
  updateGalleryChromeText();
  if (!workGallery || !galleryOpen) return;

  const items = workGalleryImages[galleryCategory] || workGalleryImages.oem;

  if (galleryMode === "detail") {
    const item = items[galleryStep] || items[0];
    renderWorkDetail(item, galleryStep);
    if (workGalleryTitle) workGalleryTitle.textContent = getGalleryItemTitle(item, galleryStep);
    if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
    return;
  }

  buildGalleryItems(items);
  const activeItem = workGalleryTrack?.children[galleryStep];
  if (workGalleryTitle) {
    workGalleryTitle.textContent = activeItem?.querySelector(".work-gallery-caption")?.textContent || galleryText[currentLang].project;
  }
  measureGallery();
  queueGalleryRender();
};

const openWorkGallery = (row) => {
  if (!workGallery || !workGalleryTrack) return;
  const category = row.dataset.category || "oem";
  const index = row.querySelector(".works-row-index")?.textContent.trim() || "";
  const title = row.querySelector(".works-row-name")?.textContent.trim() || "Project";
  galleryCategory = category;
  galleryMode = "index";
  buildGalleryItems(workGalleryImages[category] || workGalleryImages.oem);
  galleryTargetX = 0;
  galleryCurrentX = 0;
  galleryStep = 0;
  galleryWheelLocked = false;
  workGallery.classList.remove("is-detail");
  if (workDetail) workDetail.innerHTML = "";
  updateGalleryChromeText();
  if (workGalleryTitle) workGalleryTitle.textContent = title;
  if (workGalleryIndex) workGalleryIndex.textContent = index;
  if (worksPreview) worksPreview.classList.remove("is-visible");
  document.body.classList.add("work-gallery-open");
  document.documentElement.classList.add("work-gallery-open");
  workGallery.setAttribute("aria-hidden", "false");
  workGallery.classList.remove("is-open");
  void workGallery.offsetWidth;
  workGallery.classList.add("is-open");
  window.setTimeout(() => {
    measureGallery();
    queueGalleryRender();
  }, 40);
  galleryOpen = true;
  playUiTone("click");
};

const closeWorkGallery = () => {
  if (!workGallery || !galleryOpen) return;
  galleryOpen = false;
  galleryMode = "index";
  workGallery.classList.remove("is-open");
  workGallery.classList.remove("is-detail");
  workGallery.setAttribute("aria-hidden", "true");
  document.body.classList.remove("work-gallery-open");
  document.documentElement.classList.remove("work-gallery-open");
  if (workDetail) workDetail.innerHTML = "";
};

document.querySelectorAll(".bottom-nav-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (!galleryOpen) return;
    const targetId = item.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    event.preventDefault();
    closeWorkGallery();
    window.requestAnimationFrame(() => {
      document.querySelector(targetId)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });
});

worksRows.forEach((row) => {
  row.addEventListener("click", () => openWorkGallery(row));
  row.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openWorkGallery(row);
  });
});

const handleWorkGalleryWheel = (event) => {
  if (!galleryOpen) return;
  if (galleryMode === "detail") return;
  event.preventDefault();
  event.stopPropagation();
  measureGallery();
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(delta) < 8 || galleryWheelLocked) return;
  galleryWheelLocked = true;
  galleryStep += delta > 0 ? 1 : -1;
  galleryStep = Math.max(0, Math.min(galleryPositions.length - 1, galleryStep));
  galleryTargetX = galleryPositions[galleryStep] || 0;
  const activeItem = workGalleryTrack?.children[galleryStep];
  if (workGalleryTitle && activeItem) {
    workGalleryTitle.textContent = activeItem.querySelector(".work-gallery-caption")?.textContent || workGalleryTitle.textContent;
  }
  if (workGalleryIndex) workGalleryIndex.textContent = String(galleryStep + 1).padStart(2, "0");
  queueGalleryRender();
  window.setTimeout(() => {
    galleryWheelLocked = false;
  }, 260);
};

window.addEventListener("wheel", handleWorkGalleryWheel, { passive: false, capture: true });

workGalleryTrack?.addEventListener("click", (event) => {
  const item = event.target.closest(".work-gallery-item");
  if (!item) return;
  openWorkDetail(Number(item.dataset.projectIndex || 0));
});

workGalleryTrack?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const item = event.target.closest(".work-gallery-item");
  if (!item) return;
  event.preventDefault();
  openWorkDetail(Number(item.dataset.projectIndex || 0));
});

workGalleryBack?.addEventListener("click", returnToGalleryIndex);
workGalleryClose?.addEventListener("click", closeWorkGallery);
window.addEventListener("resize", () => {
  if (!galleryOpen) return;
  measureGallery();
  queueGalleryRender();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeWorkGallery();
});

homeLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!hasEntered) return;
    releaseOrderedLayout();
    currentHeroCard = null;
    window.clearTimeout(focusTimeout);
  });
});

heroFocusEnter?.addEventListener("click", () => {
  document.querySelector("#works")?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
});

if (!reducedMotion && revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

// Child element staggered reveal
const revealChildObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const section = entry.target;
      const children = section.querySelectorAll("[data-reveal]");
      children.forEach((el) => {
        const delay = parseInt(el.dataset.delay || "0", 10);
        setTimeout(() => {
          el.classList.add("is-revealed");
          if (el.classList.contains("service-item")) {
            playPackagingSnap(0.62 + Math.random() * 0.18, 0.42, 0);
          }
        }, delay);
      });
      obs.unobserve(section);
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".about-rows, #services, #works, #contact").forEach((sec) => {
  revealChildObserver.observe(sec);
});

if (reducedMotion) {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
}

const initServicesScrollStory = () => {
  const section = document.querySelector(".services-scroll-story");
  if (!section) return;

  const stage = section.querySelector(".services-sticky");
  const entryTitle = section.querySelector(".services-entry-title");
  const panels = Array.from(section.querySelectorAll(".service-text-panel"));
  if (!stage || !entryTitle || !panels.length) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * (3 - 2 * value);
  let targetProgress = 0;
  let currentProgress = 0;
  let servicesInView = false;
  let panelGlyphs = [];

  const splitGlyphs = (node, text) => {
    node.textContent = "";
    return Array.from(text).map((char) => {
      const span = document.createElement("span");
      span.className = "service-glyph";
      span.textContent = char;
      node.appendChild(span);
      return span;
    });
  };

  const updateEntryTitle = () => {
    const title = i18n[currentLang]?.services_title || entryTitle.getAttribute("aria-label") || "";
    const parts = currentLang === "zh" ? ["\u4e3a\u4f55", "\u9009\u62e9\u6211"] : ["Why Work", "With Me"];
    entryTitle.setAttribute("aria-label", title);
    entryTitle.textContent = "";
    parts.forEach((part) => {
      const span = document.createElement("span");
      span.textContent = part;
      entryTitle.appendChild(span);
    });
  };

  const rebuildText = () => {
    updateEntryTitle();
    panelGlyphs = panels.map((panel) => {
      const titleNode = panel.querySelector(".service-text-title");
      const bodyNode = panel.querySelector(".service-text-body");
      const title = i18n[currentLang]?.[panel.dataset.serviceTitle] || titleNode.textContent;
      const body = i18n[currentLang]?.[panel.dataset.serviceText] || bodyNode.textContent;
      return {
        title: splitGlyphs(titleNode, title),
        body: splitGlyphs(bodyNode, body),
      };
    });
  };

  const renderGlyphs = (glyphs, phase, stagger, travel) => {
    glyphs.forEach((glyph, index) => {
      if (phase <= -0.02 || phase >= 1.02) {
        glyph.style.opacity = "0";
        glyph.style.filter = "blur(22px)";
        glyph.style.transform = `translate3d(0, ${travel}px, 0)`;
        return;
      }

      const enter = smooth(clamp01((phase - index * stagger) / 0.28));
      const exit = smooth(clamp01((phase - 0.74 - index * stagger * 0.12) / 0.18));
      const amount = enter * (1 - exit);
      const blur = 22 * (1 - amount) + exit * 12;
      const y = (1 - enter) * travel - exit * travel * 0.72;
      glyph.style.opacity = amount.toFixed(3);
      glyph.style.filter = `blur(${blur.toFixed(2)}px)`;
      glyph.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    });
  };

  const setPanel = (panel, local, index) => {
    const path = smooth(clamp01((local + 0.08) / 1.16));
    const enter = smooth(clamp01((local + 0.08) / 0.34));
    const exit = smooth(clamp01((local - 0.8) / 0.3));
    const inRange = local >= -0.1 && local <= 1.16 ? 1 : 0;
    const y = 84 - path * 168;
    const z = -120 + Math.sin(path * Math.PI) * 190 - exit * 48;
    const scale = 0.96 + Math.sin(path * Math.PI) * 0.16 - exit * 0.045;
    const direction = index % 2 === 0 ? 1 : -1;
    const rotate = direction * (-4.2 + path * 7.8 - exit * 1.4);
    const opacity = Math.min(enter * 1.08, 1) * (1 - exit * 0.18) * inRange;

    panel.style.setProperty("--service-panel-y", `${y.toFixed(2)}vh`);
    panel.style.setProperty("--service-panel-z", `${z.toFixed(2)}px`);
    panel.style.setProperty("--service-panel-scale", scale.toFixed(4));
    panel.style.setProperty("--service-card-rotate", `${rotate.toFixed(3)}deg`);
    panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));

    if (panelGlyphs[index]) {
      renderGlyphs(panelGlyphs[index].title, local, 0.018, 18);
      renderGlyphs(panelGlyphs[index].body, local - 0.08, 0.006, 16);
    }
  };

  const readProgress = () => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    servicesInView = rect.top < window.innerHeight && rect.bottom > 0;
    targetProgress = reducedMotion ? 1 : clamp01(-rect.top / travel);
  };

  const render = () => {
    currentProgress += (targetProgress - currentProgress) * 0.075;
    if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;

    const progress = currentProgress;
    const open = smooth(clamp01(progress / 0.22));
    const inside = smooth(clamp01((progress - 0.13) / 0.22));

    section.style.setProperty("--services-progress", progress.toFixed(4));
    section.style.setProperty("--services-open", open.toFixed(4));
    section.style.setProperty("--services-inside", inside.toFixed(4));
    section.style.setProperty("--services-slab-opacity", (inside * 0.96).toFixed(3));
    document.body.classList.toggle("services-white-stage", servicesInView && inside > 0.58);

    panels.forEach((panel, index) => {
      const start = 0.24 + index * 0.1;
      const step = 0.14;
      const local = (progress - start) / step;
      setPanel(panel, local, index);
    });

    requestAnimationFrame(render);
  };

  rebuildText();
  window.rebuildServicesStoryText = () => {
    rebuildText();
    readProgress();
  };

  readProgress();
  render();
  window.addEventListener("scroll", readProgress, { passive: true });
  window.addEventListener("resize", readProgress);
};

initServicesScrollStory();

const hoverCodeGlyphs = "LUCIANJYANG0123456789#/_包装判断结构";
const hoverCodeTargets = Array.from(
  document.querySelectorAll(
    ".about-heading, .about-lead, .about-detail, .section-head h2, .section-intro, .service-item h3, .service-item p, .works-statement-title, .works-statement-body"
  )
).filter((node) => !node.classList.contains("scroll-type-text") && !node.closest(".services-scroll-story"));

hoverCodeTargets.forEach((node) => {
  if (!node.textContent.trim()) return;
  node.classList.add("code-hover-text");
  let raf = 0;
  let frame = 0;
  let source = "";

  const restore = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    frame = 0;
    if (source) node.textContent = source;
    node.classList.remove("is-coding");
  };

  node.addEventListener("pointerenter", () => {
    source = node.textContent;
    node.classList.add("is-coding");
    playUiTone("hover");

    const run = () => {
      frame += 1;
      const strength = Math.max(0, 1 - frame / 18);
      node.textContent = source
        .split("")
        .map((char, index) => {
          if (char.trim() === "" || Math.random() > strength * 0.28) return char;
          return hoverCodeGlyphs[(index + frame + Math.floor(Math.random() * hoverCodeGlyphs.length)) % hoverCodeGlyphs.length];
        })
        .join("");

      if (frame < 18) {
        raf = requestAnimationFrame(run);
        return;
      }

      restore();
      node.classList.add("is-code-settled");
      window.setTimeout(() => node.classList.remove("is-code-settled"), 360);
    };

    raf = requestAnimationFrame(run);
  });

  node.addEventListener("pointerleave", restore);
});

const animateCards = (timestamp) => {
  if (!stageMotion.width || !stageMotion.height) {
    window.requestAnimationFrame(animateCards);
    return;
  }

  const elapsed = (timestamp - stageMotion.startAt) * 0.001;
  const width = stageMotion.width;
  const height = stageMotion.height;
  const minSide = Math.min(width, height);
  const centerX = width * 0.5;
  const centerY = height * 0.50;
  const pointerX = fieldPointer.x * width;
  const pointerY = fieldPointer.y * height;
  const swayX = Math.sin(elapsed * 0.22) * width * 0.014;
  const swayY = Math.cos(elapsed * 0.18) * height * 0.012;
  const heroRect = heroSection?.getBoundingClientRect();
  const hasEntered = document.body.classList.contains("has-entered");
  const scrollDriven = hasEntered && !orderedMode;

  // Lerp heroStepTarget toward heroStep for smooth card transitions
  heroStepTarget += (heroStep - heroStepTarget) * 0.072;

  // scrollProgress: 0 = card 0 front, 1 = card 5 front
  const scrollProgress = HERO_CARD_COUNT > 1
    ? Math.max(0, Math.min(1, (heroStepTarget - 1) / (HERO_CARD_COUNT - 1)))
    : 0;

  // Water intro fade: 0 = full water, 1 = cards active
  const introProgress = Math.min(1, heroStepTarget);

  // Enable scroll-snap to next section only after last card
  if (hasEntered) {
    const heroComplete = heroStep >= HERO_CARD_COUNT;
    if (document.documentElement.classList.contains("snap-active") !== heroComplete) {
      document.documentElement.classList.toggle("snap-active", heroComplete);
    }
  }

  // Tail fade: hero-section is 180vh; sticky stage = 100vh, tail = 80vh
  // heroRect.bottom starts at ~180vh, drops to 0 as user scrolls out
  // fade cards over the last ~80vh of hero-section (heroRect.bottom: 100vh → 0)
  const tailFade = heroRect
    ? Math.min(1, Math.max(0, (heroRect.bottom - stageMotion.height) / (stageMotion.height * 0.7)))
    : 1;

  if (heroStage) {
    heroStage.style.setProperty("--hero-scroll-progress", scrollProgress.toFixed(4));
    heroStage.style.setProperty("--hero-intro-progress", introProgress.toFixed(4));
  }

  if (hasEntered && heroRect && heroRect.bottom < -stageMotion.height * 0.25 && !orderedMode) {
    window.requestAnimationFrame(animateCards);
    return;
  }

  const targets = heroCardStates.map((state, index) => {
    const { layout } = state;
    if (orderedMode && index === selectedCardIndex) {
      const progress = Math.min(1, (timestamp - selectionStartedAt) / 920);
      const eased = 1 - (1 - progress) ** 3;
      const spiralRadius = (1 - eased) * minSide * 0.16;
      const spin = progress * Math.PI * 5.2 + layout.phase;
      const x = state.captureX + (centerX - state.captureX) * eased + Math.cos(spin) * spiralRadius * 0.58;
      const y = state.captureY + (centerY - 10 - state.captureY) * eased + Math.sin(spin) * spiralRadius * 0.34;
      const rotation = layout.rot + progress * 640;
      const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
      return {
        x,
        y,
        rotation,
        ry: Math.sin(spin) * 34,
        rx: -8 + Math.cos(spin) * 6,
        scale: 1.08 - eased * 0.34,
        depth: 180,
        opacity,
      };
    }

    if (scrollDriven) {
      const cardCount = HERO_CARD_COUNT;
      // Only show first 6 cards; hide the rest
      if (index >= HERO_CARD_COUNT) {
        return { x: centerX, y: centerY + height, rotation: 0, ry: 0, rx: 0, scale: 0, depth: 0, opacity: 0, current: false };
      }
      // travel: 0→card 0 front, 5→card 5 front
      const travel = scrollProgress * (cardCount - 1);
      const delta = index - travel; // 0 = currently active card

      // Arc track: cards travel from bottom-left → center → top-right
      // delta = 0 → focal card at viewport center
      // delta > 0 → upcoming, sits bottom-right; delta < 0 → passed, drifts top-left

      const pointerShiftX = fieldPointer.active ? (fieldPointer.x - 0.5) * minSide * 0.04 : 0;
      const pointerShiftY = fieldPointer.active ? (fieldPointer.y - 0.5) * minSide * 0.03 : 0;

      // Activation: 1 at front, 0 when ±2 cards away
      const activationProgress = Math.max(0, 1 - Math.abs(delta) / 2.0);
      const isCurrent = Math.abs(delta) < 0.5;

      // Track spread: how far cards fan out horizontally/vertically per unit delta
      const spreadX = width  * 0.26; // horizontal spacing between adjacent cards
      const spreadY = height * 0.18; // vertical drop per adjacent card

      // Base position: linear arc offset from center
      // positive delta → right and down (upcoming), negative → left and up (passed)
      const rawX = centerX + delta * spreadX;
      const rawY = centerY + delta * spreadY;

      // Clamp visible band so cards far off-track fade out
      const visibleBand = Math.max(0, 1 - Math.max(0, Math.abs(delta) - 2.5) / 1.5);

      // Scale: focal card is large (fills most of viewport), neighbors shrink
      const scale = 0.32 + activationProgress * 1.08;

      // Perspective tilt: cards tilt as they travel the arc
      // upcoming (delta>0): lean left (negative ry); passed (delta<0): lean right
      const ryTilt = -delta * 14;
      const rotTilt = delta * 2.5;

      // Pointer parallax (reduced for focal card to keep it centered)
      const parallaxStrength = 1 - activationProgress * 0.7; // focal card gets 30% parallax, neighbors get 100%
      const x = rawX + pointerShiftX * (0.2 + activationProgress * 0.3) * parallaxStrength;
      const y = rawY + pointerShiftY * (0.2 + activationProgress * 0.2) * parallaxStrength;

      return {
        x,
        y,
        rotation: rotTilt + pointerShiftX * 0.010,
        ry: Math.max(-55, Math.min(55, ryTilt)) + pointerShiftX * 0.018,
        rx: -2 + activationProgress * 2 - pointerShiftY * 0.008,
        scale,
        depth: 10 + activationProgress * 180,
        opacity: Math.min(0.97, Math.max(0, tailFade * introProgress * visibleBand * (0.15 + activationProgress * 0.55 + (isCurrent ? 0.27 : 0)))),
        current: isCurrent,
      };
    }

    const radiusX = width * (orderedMode ? 0.38 : 0.34);
    const radiusY = height * (orderedMode ? 0.30 : 0.26);
    const xDrift = Math.sin(elapsed * 0.36 + layout.phase) * 18;
    const yDrift = Math.cos(elapsed * 0.42 + layout.phase) * 14;
    let x = centerX + swayX + layout.ox * radiusX + xDrift;
    let y = centerY + swayY + layout.oy * radiusY + yDrift;

    if (fieldPointer.active) {
      const dx = x - pointerX;
      const dy = y - pointerY;
      const distance = Math.hypot(dx, dy) || 1;
      const influenceRadius = minSide * 0.24;
      if (distance < influenceRadius) {
        const repel = ((influenceRadius - distance) / influenceRadius) ** 1.65;
        x += (dx / distance) * repel * 84;
        y += (dy / distance) * repel * 64;
      }
    }

    if (orderedMode) {
      const spread = index < selectedCardIndex ? -1 : 1;
      x += spread * minSide * 0.16;
    }

    return {
      x,
      y,
      rotation: layout.rot + Math.sin(elapsed * 0.38 + layout.phase) * 4.2,
      ry: Math.sin(elapsed * 0.34 + layout.phase) * 14,
      rx: Math.cos(elapsed * 0.28 + layout.phase) * 4,
      scale: orderedMode ? layout.scale * 0.92 : layout.scale,
      depth: orderedMode ? layout.depth - 24 : layout.depth,
      opacity: heroStep === 0 ? 0 : (orderedMode ? 0 : 0.76),
    };
  });

  if (!scrollDriven) for (let pass = 0; pass < 2; pass += 1) {
    for (let i = 0; i < heroCardStates.length; i += 1) {
      for (let j = i + 1; j < heroCardStates.length; j += 1) {
        if (orderedMode && (i === selectedCardIndex || j === selectedCardIndex)) continue;
        const a = targets[i];
        const b = targets[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 1;
        const minDistance = (heroCardStates[i].width + heroCardStates[j].width) * 0.34;
        if (distance < minDistance) {
          const push = (minDistance - distance) * 0.5;
          const nx = dx / distance;
          const ny = dy / distance;
          a.x -= nx * push;
          a.y -= ny * push * 0.86;
          b.x += nx * push;
          b.y += ny * push * 0.86;
        }
      }
    }
  }

  heroCardStates.forEach((state, index) => {
    const target = targets[index];
    state.targetX = target.x;
    state.targetY = target.y;
    state.x += (target.x - state.x) * (orderedMode ? 0.09 : 0.075);
    state.y += (target.y - state.y) * (orderedMode ? 0.09 : 0.075);
    state.rotation += (target.rotation - state.rotation) * 0.08;
    state.scale += (target.scale - state.scale) * 0.08;
    state.opacity += (target.opacity - state.opacity) * 0.08;
    state.depth += (target.depth - state.depth) * 0.08;

    state.card.classList.toggle("is-dimmed", orderedMode && index !== selectedCardIndex);
    state.card.classList.toggle("is-active", !orderedMode && currentHeroCard === state.card);
    state.card.classList.toggle("is-scroll-current", scrollDriven && Boolean(target.current));

    setCardPosition(state.card, {
      x: state.x,
      y: state.y,
      w: state.width,
      h: state.height,
      z: state.depth,
      r: state.rotation,
      ry: target.ry || 0,
      rx: target.rx || 0,
      scale: state.scale,
      opacity: Math.max(0, Math.min(1, state.opacity)),
    });
  });

  if (orderedMode) {
    const progress = Math.min(1, (timestamp - selectionStartedAt) / 920);
    heroFocusPanel.classList.toggle("is-visible", progress > 0.52);
  }

  window.requestAnimationFrame(animateCards);
};

const initHeroWireframe = (svg) => {
  if (!svg || reducedMotion) return null;
  const ns = "http://www.w3.org/2000/svg";
  const pointer = { x: 0.5, y: 0.52, active: false, boost: 0.72 };
  const horizonLines = [];
  const depthLines = [];
  let width = 0;
  let height = 0;
  let rafId = 0;

  const createLine = (depth = false) => {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("class", depth ? "hero-wireframe-line is-depth" : "hero-wireframe-line");
    svg.appendChild(path);
    return path;
  };

  const ensureLines = (store, count, depth = false) => {
    while (store.length < count) {
      store.push(createLine(depth));
    }
    while (store.length > count) {
      store.pop()?.remove();
    }
  };

  const buildHorizontalPath = (index, count, time) => {
    const horizon = height * 0.16;
    const progress = index / (count - 1 || 1);
    const depthEase = progress ** 1.66;
    const baseY = horizon + depthEase * (height * 0.98);
    const centerPull = (pointer.x - 0.5) * width * 0.18;
    const pointerDx = width * pointer.x - width * 0.5;
    const pointerDy = height * pointer.y - baseY;
    const distance = Math.hypot(pointerDx * 0.82, pointerDy) || 1;
    const localInfluence = Math.max(0, 1 - distance / 360);
    const wave = Math.sin(time * 0.0012 + progress * 9.2) * (8 + progress * 28);
    const lift = localInfluence * (24 + pointer.boost * 34);
    const leftX = -width * 0.08 + progress * width * 0.08;
    const rightX = width * 1.08 - progress * width * 0.08;
    const controlOffsetX = width * (0.18 + progress * 0.12);

    return [
      `M ${leftX.toFixed(2)} ${baseY.toFixed(2)}`,
      `C ${(leftX + controlOffsetX + centerPull * 0.25).toFixed(2)} ${(baseY + wave * 0.8 - lift).toFixed(2)}`,
      `${(rightX - controlOffsetX + centerPull * 0.75).toFixed(2)} ${(baseY - wave * 0.6 - lift * 0.8).toFixed(2)}`,
      `${rightX.toFixed(2)} ${baseY.toFixed(2)}`,
    ].join(" ");
  };

  const buildDepthPath = (index, count, time) => {
    const horizonY = height * 0.16;
    const vanishingX = width * (0.5 + (pointer.x - 0.5) * 0.14);
    const progress = index / (count - 1 || 1);
    const startX = -width * 0.18 + progress * width * 1.36;
    const bottomY = height * 1.03;
    const dx = startX - width * pointer.x;
    const dy = bottomY - height * pointer.y;
    const distance = Math.hypot(dx, dy) || 1;
    const influence = Math.max(0, 1 - distance / 420);
    const drift = Math.sin(time * 0.001 + progress * 5.6) * 10;
    const bend = influence * (16 + pointer.boost * 16);

    return [
      `M ${startX.toFixed(2)} ${bottomY.toFixed(2)}`,
      `Q ${(startX * 0.78 + vanishingX * 0.22 + drift).toFixed(2)} ${(height * 0.58 - bend).toFixed(2)}`,
      `${vanishingX.toFixed(2)} ${horizonY.toFixed(2)}`,
    ].join(" ");
  };

  const render = (time = 0) => {
    const horizontalCount = 20;
    const depthCount = 11;
    ensureLines(horizonLines, horizontalCount);
    ensureLines(depthLines, depthCount, true);
    pointer.boost += ((pointer.active ? 1 : 0.72) - pointer.boost) * 0.06;

    for (let i = 0; i < horizontalCount; i += 1) {
      const path = horizonLines[i];
      path.setAttribute("d", buildHorizontalPath(i, horizontalCount, time));
      path.style.opacity = String(0.06 + (i / horizontalCount) * 0.18);
    }

    for (let i = 0; i < depthCount; i += 1) {
      const path = depthLines[i];
      path.setAttribute("d", buildDepthPath(i, depthCount, time));
      path.style.opacity = String(0.04 + (i / depthCount) * 0.08);
    }

    rafId = window.requestAnimationFrame(render);
  };

  const resize = () => {
    const rect = svg.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  };

  svg.addEventListener("pointermove", (event) => {
    const rect = svg.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    pointer.active = true;
  });

  svg.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.x = 0.5;
    pointer.y = 0.52;
  });

  window.addEventListener("resize", resize);
  resize();
  render();

  return {
    focusTimer: null,
    focusFromCard(card) {
      const rect = card.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      pointer.x = (rect.left + rect.width * 0.5 - svgRect.left) / svgRect.width;
      pointer.y = (rect.top + rect.height * 0.5 - svgRect.top) / svgRect.height;
      pointer.active = true;
      window.clearTimeout(this.focusTimer);
      this.focusTimer = window.setTimeout(() => {
        pointer.active = false;
      }, 420);
    },
  };
};

const initParticleCanvas = (canvas, mode = "light") => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const particles = [];
  const pointer = { x: 0, y: 0, active: false };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    particles.length = 0;
    const count = mode === "dark-iridescent" ? 78 : 56;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * (mode === "dark-iridescent" ? 0.18 : 0.22),
        vy: (Math.random() - 0.5) * (mode === "dark-iridescent" ? 0.18 : 0.22),
        r: Math.random() * (mode === "dark-iridescent" ? 2.8 : 2.2) + 1,
        hue: Math.random() * 360,
      });
    }
  };

  const render = () => {
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);

    particles.forEach((particle) => {
      if (pointer.active) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy) || 1;
        const threshold = mode === "dark-iridescent" ? 220 : 180;
        if (distance < threshold) {
          const force = mode === "dark-iridescent" ? 0.018 : 0.012;
          particle.vx -= (dx / distance) * force;
          particle.vy -= (dy / distance) * force;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= mode === "dark-iridescent" ? 0.982 : 0.985;
      particle.vy *= mode === "dark-iridescent" ? 0.982 : 0.985;

      if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
      particle.x = Math.max(0, Math.min(rect.width, particle.x));
      particle.y = Math.max(0, Math.min(rect.height, particle.y));

      context.beginPath();
      if (mode === "dark-iridescent") {
        const alpha = 0.2 + Math.abs(Math.sin((particle.x + particle.y) * 0.004)) * 0.18;
        context.fillStyle = `hsla(${particle.hue}, 70%, 68%, ${alpha})`;
      } else if (mode === "dark") {
        context.fillStyle = "rgba(255,255,255,0.10)";
      } else {
        context.fillStyle = "rgba(255,255,255,0.62)";
      }
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();

      if (mode === "dark-iridescent") {
        context.beginPath();
        context.fillStyle = "rgba(8, 8, 10, 0.84)";
        context.arc(particle.x, particle.y, particle.r * 0.52, 0, Math.PI * 2);
        context.fill();
      }
    });

    window.requestAnimationFrame(render);
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resize);
  resize();
  window.requestAnimationFrame(render);
};

const updateBeijingMeta = () => {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (beijingTimeNode) {
    beijingTimeNode.textContent = timeFormatter.format(now);
  }

  if (beijingDateNode) {
    beijingDateNode.textContent = dateFormatter.format(now).replace(/-/g, ".");
  }
};

const entryWaves = []; // canvas-drawn waves, no DOM nodes

const initEntryField = (canvas) => {
  if (!canvas || reducedMotion) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const pointer = { x: 0.5, y: 0.5, active: false, hover: false };
  let width = 0;
  let height = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const render = (time = 0) => {
    const cx = width * 0.5 + (pointer.active ? (pointer.x - 0.5) * 26 : 0);
    const cy = height * 0.5 + (pointer.active ? (pointer.y - 0.5) * 18 : 0);
    const maxRadius = Math.min(width, height) * 0.46;
    const hoverBoost = pointer.hover ? 1 : 0;

    context.clearRect(0, 0, width, height);
    context.save();
    context.globalCompositeOperation = "lighter";

    // center glow — softer, wider falloff
    const glowR = Math.min(width, height) * (0.38 + hoverBoost * 0.08);
    const glow = context.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    glow.addColorStop(0, `rgba(73, 196, 176, ${0.032 + hoverBoost * 0.068})`);
    glow.addColorStop(0.5, `rgba(73, 196, 176, ${0.012 + hoverBoost * 0.028})`);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const drawOrganicRing = (radius, alpha, tint = "73, 196, 176", offset = 0) => {
      const segments = 92;
      const gapEvery = 11;
      context.save();
      context.strokeStyle = `rgba(${tint}, ${alpha})`;
      context.lineWidth = 0.82;
      context.lineCap = "round";
      for (let start = 0; start < segments; start += gapEvery) {
        context.beginPath();
        for (let i = start; i < Math.min(start + gapEvery - 2, segments); i += 1) {
          const t = i / segments;
          const angle = t * Math.PI * 2;
          const wobble =
            Math.sin(angle * 2.3 + time * 0.00022 + offset) * radius * 0.022 +
            Math.sin(angle * 5.1 - time * 0.00016 + offset * 1.7) * radius * 0.012 +
            Math.sin(angle * 9 + offset) * radius * 0.006;
          const r = radius + wobble;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r * (0.986 + Math.sin(offset) * 0.008);
          if (i === start) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }
      context.restore();
    };

    // single slow pulse — breathes, doesn't ripple
    const period = 3800;
    const phase = (time % period) / period;
    const eased = 1 - (1 - phase) ** 2.4;
    const pulseR = maxRadius * (0.22 + eased * 0.68);
    const pulseAlpha = (1 - phase) ** 1.35 * (0.09 + hoverBoost * 0.055);
    drawOrganicRing(pulseR, pulseAlpha, "73, 196, 176", 0.3);
    drawOrganicRing(pulseR * 1.018, pulseAlpha * 0.32, "210, 235, 226", 1.25);

    // offset second ring — half period behind, barely visible
    const phase2 = ((time + period * 0.5) % period) / period;
    const eased2 = 1 - (1 - phase2) ** 2.4;
    const pulseR2 = maxRadius * (0.22 + eased2 * 0.68);
    const pulseAlpha2 = (1 - phase2) ** 1.35 * 0.036;
    drawOrganicRing(pulseR2, pulseAlpha2, "200, 220, 210", 2.1);

    context.restore();

    // canvas wave particles — irregular scatter matching original DOM effect
    const now = performance.now();
    for (let wi = entryWaves.length - 1; wi >= 0; wi--) {
      const w = entryWaves[wi];
      const age = (now - w.startedAt) / w.duration;
      if (age >= 1) { entryWaves.splice(wi, 1); continue; }
      context.save();
      context.globalCompositeOperation = "lighter";
      for (let pi = 0; pi < w.particles.length; pi++) {
        const p = w.particles[pi];
        const pAge = Math.max(0, (now - p.startedAt) / p.duration);
        if (pAge >= 1) continue;
        const eased = 1 - (1 - pAge) ** 2.2;
        const travel = p.travel * eased;
        const px = w.cx + p.dx * travel;
        const py = w.cy + p.dy * travel;
        const alpha = (1 - pAge) ** 1.5 * 0.48 * w.strength;
        const sz = p.size * (0.5 + eased * 0.8);
        context.globalAlpha = alpha;
        context.fillStyle = p.warm ? "rgba(210, 235, 220, 1)" : "rgba(73, 196, 176, 1)";
        context.beginPath();
        context.rect(px - sz * 0.5, py - sz * 0.5, sz, sz);
        context.fill();
      }
      context.restore();
    }

    window.requestAnimationFrame(render);
  };

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    pointer.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.x = 0.5;
    pointer.y = 0.5;
  });

  entryGo?.addEventListener("pointerenter", () => {
    pointer.hover = true;
    createEntryWave(1.25);
    playUiTone("hover");
  });

  entryGo?.addEventListener("pointerleave", () => {
    pointer.hover = false;
  });

  window.addEventListener("resize", resize);
  resize();
  window.requestAnimationFrame(render);
};

// ── Bamboo Particle Tree (Three.js) ──────────────────────────────────
const initBambooParticles = (canvas) => {
  if (!canvas || reducedMotion || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  const positions = [];
  const colors = [];

  const c1 = new THREE.Color(0x49c4b0);
  const c2 = new THREE.Color(0x8ee8c8);
  const c3 = new THREE.Color(0xd4f0e0);

  const addSection = (cy, r, h) => {
    for (let i = 0; i < 70; i++) {
      const theta = Math.random() * Math.PI * 2;
      const y = cy + (Math.random() - 0.5) * h;
      positions.push(Math.cos(theta) * r, y, Math.sin(theta) * r);
      const mix = c1.clone().lerp(c2, Math.random());
      colors.push(mix.r, mix.g, mix.b);
    }
    for (let i = 0; i < 32; i++) {
      const theta = (i / 32) * Math.PI * 2;
      positions.push(Math.cos(theta) * (r + 0.014), cy + h * 0.5, Math.sin(theta) * (r + 0.014));
      colors.push(c3.r, c3.g, c3.b);
    }
  };

  const addLeaf = (ox, oy, oz, dx, dy, dz, len) => {
    for (let i = 0; i < 60; i++) {
      const t = Math.random();
      const sp = (Math.random() - 0.5) * 0.055 * (1 - t);
      positions.push(ox + dx * len * t + sp, oy + dy * len * t + sp * 0.4, oz + dz * len * t + sp);
      const mix = c1.clone().lerp(c3, t * 0.65);
      colors.push(mix.r, mix.g, mix.b);
    }
  };

  [
    [-1.80, 0.072, 0.38], [-1.42, 0.068, 0.36], [-1.06, 0.064, 0.34],
    [-0.72, 0.060, 0.32], [-0.40, 0.056, 0.30], [-0.10, 0.052, 0.28],
    [ 0.18, 0.048, 0.26], [ 0.44, 0.044, 0.24],
  ].forEach(([cy, r, h]) => addSection(cy, r, h));

  [
    [-0.07, -1.10, 0, -0.55, 0.38, 0.10, 0.72],
    [ 0.07, -0.78, 0,  0.52, 0.42, 0.08, 0.68],
    [-0.06, -0.44, 0, -0.48, 0.50, 0.06, 0.64],
    [ 0.06, -0.12, 0,  0.44, 0.54, 0.05, 0.60],
    [-0.05,  0.20, 0, -0.40, 0.58, 0.04, 0.56],
    [ 0.05,  0.46, 0,  0.36, 0.60, 0.03, 0.52],
    [-0.04,  0.58, 0, -0.28, 0.70, 0.02, 0.38],
    [ 0.04,  0.62, 0,  0.26, 0.72, 0.02, 0.36],
  ].forEach(([ox, oy, oz, dx, dy, dz, l]) => addLeaf(ox, oy, oz, dx, dy, dz, l));

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.024, vertexColors: true, transparent: true,
    opacity: 0.85, sizeAttenuation: true, depthWrite: false,
  });

  const plant = new THREE.Points(geo, mat);
  plant.scale.setScalar(0.68);
  plant.position.y = -0.08;
  scene.add(plant);

  let mx = 0, my = 0;
  window.addEventListener("pointermove", (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  let raf;
  const animate = (t) => {
    raf = requestAnimationFrame(animate);
    plant.rotation.y = t * 0.00018 + mx * 0.10;
    plant.rotation.x += (my * 0.05 - plant.rotation.x) * 0.05;
    renderer.render(scene, camera);
  };
  animate(0);

  document.addEventListener("siteEntered", () => {
    cancelAnimationFrame(raf);
    renderer.dispose();
  }, { once: true });
};

// ── Hero Bamboo (Three.js, sticky hero stage) ─────────────────────────────
// 造型参考中式插花：多根细茎从花瓶口散开，叶片向外展开，整体紧凑小巧
const initHeroBamboo = (canvas) => {
  if (!canvas || reducedMotion || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  // 相机拉远 + 窄 FOV，整体显示更小
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 14.0);

  const positions = [], colors = [];
  const cStem  = new THREE.Color(0x3aaa8e); // 茎：深青绿
  const cNode  = new THREE.Color(0xc8ede0); // 节环：浅白绿
  const cLeafA = new THREE.Color(0x5ecfb2); // 叶：亮青
  const cLeafB = new THREE.Color(0xa8e8d0); // 叶尖：浅绿

  // 3D 竹茎：bx/bz = 根部 XZ，by = 根部 Y，leanX/leanZ = XZ 倾斜，segN 节，r0 初始半径
  const addStalk = (bx, bz, by, leanX, leanZ, segN, r0) => {
    for (let s = 0; s < segN; s++) {
      const t = s / segN;
      const cy = by + s * 0.16;
      const cx = bx + leanX * t * 0.12;
      const cz = bz + leanZ * t * 0.12;
      const r  = r0 * (1 - t * 0.35);
      const h  = 0.13;
      for (let i = 0; i < 12; i++) {
        const theta = Math.random() * Math.PI * 2;
        const yy = cy + (Math.random() - 0.5) * h;
        positions.push(cx + Math.cos(theta) * r, yy, cz + Math.sin(theta) * r);
        const mix = cStem.clone().lerp(cLeafA, Math.random() * 0.3);
        colors.push(mix.r, mix.g, mix.b);
      }
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        positions.push(cx + Math.cos(theta) * (r + 0.005), cy + h * 0.5, cz + Math.sin(theta) * (r + 0.005));
        colors.push(cNode.r, cNode.g, cNode.b);
      }
    }
  };

  // 3D 叶片：ox/oy/oz = 起点，dx/dy/dz = 生长方向，len 长，spread 宽
  const addLeaf = (ox, oy, oz, dx, dy, dz, len, spread) => {
    const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
    const ax = dx/d, ay = dy/d, az = dz/d;
    // 叉积求垂直于生长方向的侧向量
    let px, py, pz;
    if (Math.abs(ay) < 0.9) { px = az; py = 0; pz = -ax; }
    else { px = 1; py = 0; pz = 0; }
    const pl = Math.sqrt(px*px + py*py + pz*pz);
    px /= pl; py /= pl; pz /= pl;
    for (let i = 0; i < 18; i++) {
      const t = Math.random();
      const sp = (Math.random() - 0.5) * spread * (1 - t * 0.8);
      positions.push(ox + ax*len*t + px*sp, oy + ay*len*t + py*sp, oz + az*len*t + pz*sp);
      const mix = cLeafA.clone().lerp(cLeafB, t * 0.7);
      colors.push(mix.r, mix.g, mix.b);
    }
  };

  // ── 5 根竹茎，从瓶口散开，各自有 XZ 方向倾斜 ──
  // [bx, bz, by, leanX, leanZ, segN, r0]
  [
    [ 0.00,  0.00, -0.28,  0.0,  0.0,  5, 0.009], // 中间主茎，直立
    [-0.05,  0.04, -0.28, -0.5,  0.3,  4, 0.008], // 左前
    [ 0.05, -0.04, -0.28,  0.4, -0.4,  4, 0.008], // 右后
    [-0.08, -0.05, -0.28, -0.9, -0.5,  3, 0.007], // 左后
    [ 0.08,  0.06, -0.28,  0.8,  0.6,  3, 0.007], // 右前
  ].forEach(([bx, bz, by, leanX, leanZ, segN, r0]) => addStalk(bx, bz, by, leanX, leanZ, segN, r0));

  // ── 叶片：ox/oy/oz + 3D 方向 dx/dy/dz ──
  const L = 0.30, S = 0.055;
  [
    // 主茎叶（向四面散开）
    [ 0.00,  0.30,  0.00, -0.70,  0.50,  0.50, L,     S    ],
    [ 0.00,  0.46,  0.00,  0.65,  0.55, -0.50, L,     S    ],
    [ 0.00,  0.58,  0.00, -0.50,  0.70,  0.50, L*0.8, S    ],
    [ 0.00,  0.68,  0.00,  0.40,  0.80, -0.45, L*0.7, S*0.8],
    // 左前茎叶
    [-0.06,  0.20,  0.05, -0.80,  0.40,  0.45, L*0.9, S    ],
    [-0.06,  0.36,  0.05, -0.60,  0.65,  0.45, L*0.85,S    ],
    [-0.08,  0.50,  0.05, -0.40,  0.80,  0.45, L*0.7, S*0.8],
    // 右后茎叶
    [ 0.06,  0.18, -0.05,  0.75,  0.45, -0.50, L*0.9, S    ],
    [ 0.06,  0.34, -0.05,  0.60,  0.60, -0.50, L*0.85,S    ],
    [ 0.08,  0.48, -0.05,  0.45,  0.75, -0.50, L*0.7, S*0.8],
    // 左后茎叶
    [-0.10,  0.10, -0.06, -0.85,  0.30, -0.45, L*0.8, S*0.9],
    [-0.10,  0.26, -0.06, -0.70,  0.55, -0.45, L*0.75,S*0.8],
    // 右前茎叶
    [ 0.10,  0.08,  0.07,  0.80,  0.35,  0.50, L*0.8, S*0.9],
    [ 0.10,  0.24,  0.07,  0.70,  0.50,  0.50, L*0.75,S*0.8],
    // 顶部散叶
    [-0.02,  0.76,  0.03, -0.40,  0.80,  0.45, L*0.6, S*0.7],
    [ 0.02,  0.76, -0.03,  0.35,  0.85, -0.40, L*0.6, S*0.7],
  ].forEach(([ox, oy, oz, dx, dy, dz, len, spread]) => addLeaf(ox, oy, oz, dx, dy, dz, len, spread));

  // ── 花瓶轮廓（圆形截面，旋转时有立体感） ──
  const vaseProfile = [
    // [cy, r]  — 圆形截面，rx=rz
    [-0.90, 0.11], [-0.80, 0.13], [-0.70, 0.14],
    [-0.60, 0.12], [-0.50, 0.09], [-0.38, 0.10],
    [-0.28, 0.12],
  ];
  const cVase = new THREE.Color(0x4ab8a0);
  vaseProfile.forEach(([cy, r]) => {
    for (let i = 0; i < 18; i++) {
      const theta = (i / 18) * Math.PI * 2;
      positions.push(Math.cos(theta) * r, cy, Math.sin(theta) * r);
      const mix = cVase.clone().lerp(cNode, Math.random() * 0.4);
      colors.push(mix.r, mix.g, mix.b);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.016, vertexColors: true, transparent: true,
    opacity: 0.82, sizeAttenuation: true, depthWrite: false,
  });

  const plant = new THREE.Points(geo, mat);
  // 整体下移，让瓶底不被裁掉，竹叶在画面上半部
  plant.position.y = 0.2;
  scene.add(plant);

  let mx = 0, my = 0;
  const onPointer = (e) => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  let raf;
  const animate = (t) => {
    raf = requestAnimationFrame(animate);
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    plant.rotation.y = t * 0.00010 + mx * 0.06 + sp * 0.35;
    plant.rotation.x += (my * 0.03 + sp * 0.05 - plant.rotation.x) * 0.04;
    mat.opacity = 0.82 - sp * 0.30;
    renderer.render(scene, camera);
  };
  animate(0);

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};

const initWaterSurface = (canvas) => {
  if (!canvas || reducedMotion) return;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  const vert = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform float u_time;
    uniform vec2  u_res;
    uniform vec2  u_mouse;
    uniform float u_scroll;
    // ripples: xy=position(0-1), z=startTime, w=unused
    uniform vec3  u_ripples[3];

    // gradient noise (Perlin-style)
    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return fract(sin(p) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      vec2 ga = hash2(i)             * 2.0 - 1.0;
      vec2 gb = hash2(i + vec2(1,0)) * 2.0 - 1.0;
      vec2 gc = hash2(i + vec2(0,1)) * 2.0 - 1.0;
      vec2 gd = hash2(i + vec2(1,1)) * 2.0 - 1.0;
      float va = dot(ga, f);
      float vb = dot(gb, f - vec2(1,0));
      float vc = dot(gc, f - vec2(0,1));
      float vd = dot(gd, f - vec2(1,1));
      return 0.5 + 0.5 * (va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd));
    }

    // fractal Brownian motion — 5 octaves
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p  = rot * p * 2.02;
        a *= 0.5;
      }
      return v;
    }

    // water caustic: bright veins from interference of fbm layers
    float caustic(vec2 p, float t) {
      vec2 q = vec2(fbm(p + t * 0.18), fbm(p + vec2(5.2, 1.3)));
      vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + t * 0.14),
                    fbm(p + 2.0 * q + vec2(8.3, 2.8) + t * 0.10));
      float f = fbm(p + 2.8 * r);
      // create sharp bright veins
      float vein = 1.0 - abs(sin(f * 6.28318 * 1.5 + t * 0.22));
      vein = pow(vein, 3.8);
      return vein;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      // aspect-correct UV, centered
      vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);

      // mouse tilt: stronger UV warp based on pointer position
      vec2 m = (u_mouse - 0.5) * 0.28;
      p += m;

      float t = u_time * 0.38;
      p *= 2.4;

      // two caustic layers at slight offset for depth
      float c1 = caustic(p,           t);
      float c2 = caustic(p * 0.74 + vec2(3.1, 1.7), t * 0.82);
      float c  = c1 * 0.62 + c2 * 0.48;

      // click ripples: radial wave distortion
      float rippleWarp = 0.0;
      for (int i = 0; i < 3; i++) {
        vec2  rpos  = u_ripples[i].xy;
        float rtime = u_ripples[i].z;
        if (rtime < 0.0) continue;
        float age     = u_time - rtime;
        float dur     = 2.2;
        if (age > dur) continue;
        float progress = age / dur;
        float decay    = (1.0 - progress) * (1.0 - progress) * (1.0 - progress);
        // aspect-correct distance from ripple center
        vec2  diff = uv - rpos;
        diff.x    *= u_res.x / u_res.y;
        float dist = length(diff);
        float front = progress * 0.9; // wave front radius
        // softer ring with noise-like variation
        float ring  = exp(-pow((dist - front) * 28.0, 2.0)); // sharper falloff (14 → 28)
        // add subtle noise variation to ring edge
        float noiseVar = sin(dist * 80.0 + u_time * 2.0) * 0.15 + sin(dist * 120.0 - u_time * 1.5) * 0.1;
        ring *= (1.0 + noiseVar * decay);
        rippleWarp += ring * decay * 0.22;
      }
      c = clamp(c + rippleWarp, 0.0, 1.0);

      // primary color: #00ccbd (0, 204, 189) = (0.0, 0.8, 0.741)
      // palette: dark teal → bright cyan-teal
      vec3 deepCol  = vec3(0.0, 0.24,  0.22);      // deep #003d38
      vec3 midCol   = vec3(0.0, 0.60,  0.56);      // mid #00998f
      vec3 brightCol = vec3(0.0, 0.80, 0.741);     // primary #00ccbd
      vec3 peakCol  = vec3(0.60, 0.95, 0.90);      // peak bright #99f2e6

      vec3 col = mix(deepCol, midCol, smoothstep(0.0, 0.42, c));
      col      = mix(col, brightCol, smoothstep(0.38, 0.72, c));
      col      = mix(col, peakCol,   smoothstep(0.65, 1.00, c));

      // vignette: darken edges so cards/UI read clearly
      float vign = 1.0 - smoothstep(0.35, 1.1, length(uv - 0.5) * 1.6);
      col *= vign * 0.88 + 0.12;

      // fade with scroll
      float alpha = (1.0 - u_scroll * 0.82) * 0.88;
      gl_FragColor = vec4(col * alpha, alpha);
    }
  `;

  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime    = gl.getUniformLocation(prog, "u_time");
  const uRes     = gl.getUniformLocation(prog, "u_res");
  const uMouse   = gl.getUniformLocation(prog, "u_mouse");
  const uScroll  = gl.getUniformLocation(prog, "u_scroll");
  const uRipples = [0,1,2].map(i => gl.getUniformLocation(prog, `u_ripples[${i}]`));

  // ripple state: {x, y, startTime} in normalised coords + shader time
  const waterRipples = [{x:0,y:0,t:-99},{x:0,y:0,t:-99},{x:0,y:0,t:-99}];
  let waterRippleIdx = 0;
  const addWaterRipple = (clientX, clientY) => {
    const r = waterRipples[waterRippleIdx % 3];
    r.x = clientX / window.innerWidth;
    r.y = 1.0 - clientY / window.innerHeight;
    r.pending = true; // will be stamped with shader time on next frame
    waterRippleIdx++;
  };
  window.addEventListener("pointerdown", (e) => {
    if (heroStep !== 0) return;
    addWaterRipple(e.clientX, e.clientY);
  });

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const resize = () => {
    const pr = Math.min(window.devicePixelRatio, 2);
    canvas.width  = Math.round(canvas.clientWidth  * pr);
    canvas.height = Math.round(canvas.clientHeight * pr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  window.addEventListener("resize", resize);
  resize();

  let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  const onPointer = (e) => {
    tmx = e.clientX / window.innerWidth;
    tmy = 1.0 - e.clientY / window.innerHeight;
  };
  window.addEventListener("pointermove", onPointer);

  let raf;
  const animate = (t) => {
    raf = requestAnimationFrame(animate);
    mx += (tmx - mx) * 0.08;
    my += (tmy - my) * 0.08;
    const shaderTime = t * 0.001;
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    // stamp pending ripples with current shader time
    for (const r of waterRipples) {
      if (r.pending) { r.t = shaderTime; r.pending = false; }
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime,   shaderTime);
    gl.uniform2f(uRes,    canvas.width, canvas.height);
    gl.uniform2f(uMouse,  mx, my);
    gl.uniform1f(uScroll, sp);
    for (let i = 0; i < 3; i++) {
      gl.uniform3f(uRipples[i], waterRipples[i].x, waterRipples[i].y, waterRipples[i].t);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  animate(0);

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
    gl.deleteProgram(prog);
    gl.deleteBuffer(buf);
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};

// ── Floating Particle Orbs (mouse-flee interaction) ───────────────────────
const initFloatingOrbs = (canvas) => {
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const PR = Math.min(window.devicePixelRatio, 2);
  const resize = () => {
    canvas.width  = Math.round(canvas.clientWidth  * PR);
    canvas.height = Math.round(canvas.clientHeight * PR);
  };
  window.addEventListener("resize", resize);
  resize();

  // orb config
  const ORB_COUNT  = 3;
  const ORB_RADIUS = 52; // logical px (before PR)
  const FLEE_DIST  = 160;
  const FLEE_FORCE = 0.38;
  const DRIFT_SPD  = 0.18;
  const DAMP       = 0.88;

  // seed positions spread across canvas
  const seeds = [
    { nx: 0.22, ny: 0.38 },
    { nx: 0.68, ny: 0.28 },
    { nx: 0.50, ny: 0.68 },
  ];

  const orbs = seeds.map((s, i) => ({
    x:  s.nx * canvas.clientWidth,
    y:  s.ny * canvas.clientHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    phase: i * 2.1,          // drift phase offset
    // per-orb particle cloud
    pts: Array.from({ length: 420 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = ORB_RADIUS * Math.cbrt(Math.random()); // volume-uniform
      return {
        ox: r * Math.sin(phi) * Math.cos(theta),
        oy: r * Math.sin(phi) * Math.sin(theta),
        oz: r * Math.cos(phi),
        // flow lines: a subset of pts that form arcs
        isLine: Math.random() < 0.06,
        lineAngle: Math.random() * Math.PI * 2,
      };
    }),
  }));

  let mx = -9999, my = -9999;
  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
  };
  window.addEventListener("pointermove", onMove);

  let raf;
  const animate = (ts) => {
    raf = requestAnimationFrame(animate);
    const t = ts * 0.001;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    const globalAlpha = Math.max(0, 1 - sp * 2.5);
    if (globalAlpha <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(PR, PR);

    for (const orb of orbs) {
      // gentle drift
      orb.x += Math.sin(t * DRIFT_SPD + orb.phase)       * 0.22;
      orb.y += Math.cos(t * DRIFT_SPD * 0.7 + orb.phase) * 0.18;

      // flee from mouse
      const dx = orb.x - mx;
      const dy = orb.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < FLEE_DIST && dist > 0.1) {
        const force = (1 - dist / FLEE_DIST) * FLEE_FORCE;
        orb.vx += (dx / dist) * force;
        orb.vy += (dy / dist) * force;
      }

      // damping + apply velocity
      orb.vx *= DAMP;
      orb.vy *= DAMP;
      orb.x  += orb.vx;
      orb.y  += orb.vy;

      // soft boundary bounce
      const pad = ORB_RADIUS + 20;
      if (orb.x < pad)     { orb.x = pad;     orb.vx =  Math.abs(orb.vx) * 0.5; }
      if (orb.x > W - pad) { orb.x = W - pad; orb.vx = -Math.abs(orb.vx) * 0.5; }
      if (orb.y < pad)     { orb.y = pad;      orb.vy =  Math.abs(orb.vy) * 0.5; }
      if (orb.y > H - pad) { orb.y = H - pad;  orb.vy = -Math.abs(orb.vy) * 0.5; }

      // draw particle cloud
      const rotY = t * 0.18 + orb.phase;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rotX = t * 0.11 + orb.phase * 0.5;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      for (const pt of orb.pts) {
        // rotate point around Y then X
        const rx = pt.ox * cosY - pt.oz * sinY;
        const rz = pt.ox * sinY + pt.oz * cosY;
        const ry = pt.oy * cosX - rz   * sinX;

        const px = orb.x + rx;
        const py = orb.y + ry;

        // depth-based brightness: front = bright, back = dim
        const depth = (rz + ORB_RADIUS) / (ORB_RADIUS * 2); // 0..1
        const bright = 0.18 + depth * 0.82;

        // distance from sphere surface → fade outer particles
        const r2d = Math.sqrt(rx * rx + ry * ry);
        const edgeFade = Math.max(0, 1 - r2d / (ORB_RADIUS * 1.05));

        const alpha = globalAlpha * bright * edgeFade * (pt.isLine ? 0.55 : 0.28);
        if (alpha < 0.01) continue;

        // teal-white palette matching water surface
        const g = Math.round(200 + depth * 55);
        const b = Math.round(189 + depth * 66);
        ctx.fillStyle = `rgba(${Math.round(depth * 180)},${g},${b},${alpha.toFixed(3)})`;
        ctx.fillRect(px - 0.6, py - 0.6, 1.2, 1.2);
      }

    }

    ctx.restore();
  };
  animate(0);

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};

const playEntryCodeReveal = () => {
  if (!entryCodeWord) return;

  const target = "LUCIANJYANG";
  const glyphSets = ["L1|", "UVY", "C<(", "I1L|", "A4@", "NMW/", "J7]", "YV/", "A4@", "NMW/", "G6&"];
  const duration = 760;
  entryCodeWord.dataset.ghost = target;
  entryCodeWord.textContent = target;
  entryCodeWord.classList.remove("is-resolved", "is-scrambling");
  entryCodeWord.classList.add("is-mosaic");

  const scramble = (startedAt) => {
    const elapsed = performance.now() - startedAt;
    const rawProgress = Math.min(elapsed / duration, 1);
    const output = target
      .split("")
      .map((letter, index) => {
        const local = Math.min(Math.max((rawProgress - index * 0.075) / 0.58, 0), 1);
        if (local > 0.92) return letter;
        const set = glyphSets[index] || letter;
        return set[Math.floor((1 - local) * set.length + elapsed / 92 + index) % set.length];
      })
      .join("");

    entryCodeWord.textContent = output;

    if (rawProgress < 1) {
      window.requestAnimationFrame(() => scramble(startedAt));
      return;
    }

    entryCodeWord.textContent = target;
    entryCodeWord.classList.remove("is-scrambling");
    entryCodeWord.classList.add("is-resolved");
  };

  window.setTimeout(() => {
    entryCodeWord.classList.remove("is-mosaic");
    entryCodeWord.classList.add("is-scrambling");
    scramble(performance.now());
  }, 560);
};

const createEntryWave = (strength = 1) => {
  if (hasEntered || reducedMotion) return;
  const rect = entryScreen?.getBoundingClientRect();
  if (!rect) return;
  const cx = rect.width * 0.5;
  const cy = rect.height * 0.5;
  const maxDist = Math.hypot(rect.width, rect.height) * 0.52;
  const gridX = rect.width <= 760 ? 46 : 54;
  const gridY = rect.width <= 760 ? 40 : 48;
  const startedAt = performance.now();
  const particles = [];

  for (let x = -rect.width * 0.5; x <= rect.width * 0.5; x += gridX) {
    for (let y = -rect.height * 0.5; y <= rect.height * 0.5; y += gridY) {
      const dist = Math.hypot(x, y);
      if (dist < 72 || dist > maxDist || Math.random() > 0.56) continue;
      const nx = x / dist;
      const ny = y / dist;
      const delay = dist * (0.82 - strength * 0.12) + Math.random() * 46;
      particles.push({
        dx: nx,
        dy: ny,
        travel: dist + Math.random() * gridX * 0.6,
        size: 1.8 + Math.random() * 2.2,
        warm: Math.random() < 0.28,
        startedAt: startedAt + delay,
        duration: 900 + Math.random() * 600,
      });
    }
  }

  entryWaves.push({ cx, cy, strength, startedAt, duration: 2200, particles });
  if (entryWaves.length > 4) entryWaves.splice(0, entryWaves.length - 4);
};

const isInsideEntryCore = (event) => {
  if (!entryGo) return false;
  if (event.target?.closest?.("#entry-go")) return true;
  const rect = entryGo.getBoundingClientRect();
  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.5;
  return Math.hypot(event.clientX - centerX, event.clientY - centerY) <= Math.max(rect.width, rect.height) * 0.72;
};

const createEntryDieline = (clientX, clientY) => {
  if (!entryDielineLayer || !entryScreen || hasEntered) return;
  const rect = entryScreen.getBoundingClientRect();
  const originX = Math.min(Math.max(clientX - rect.left, 86), rect.width - 86);
  const originY = Math.min(Math.max(clientY - rect.top, 62), rect.height - 62);
  const fragment = document.createElement("div");
  let lineIndex = 0;

  fragment.className = "entry-dieline";
  fragment.style.setProperty("--dieline-x", `${originX}px`);
  fragment.style.setProperty("--dieline-y", `${originY}px`);

  const addSegment = (x1, y1, x2, y2, type = "cut") => {
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const line = document.createElement("i");
    line.className = `entry-dieline-line is-${type}`;
    line.style.setProperty("--line-x", x1.toFixed(2));
    line.style.setProperty("--line-y", y1.toFixed(2));
    line.style.setProperty("--line-length", length.toFixed(2));
    line.style.setProperty("--line-angle", angle.toFixed(2));
    line.style.setProperty("--line-delay", String(lineIndex * 20 + Math.random() * 60));
    line.style.setProperty("--line-exit-shift", String((lineIndex % 2 === 0 ? 1 : -1) * (4 + Math.random() * 5)));
    line.style.setProperty("--line-opacity", type === "cut" ? "0.56" : type === "fold" ? "0.42" : "0.34");
    fragment.appendChild(line);
    lineIndex += 1;
  };

  const addPolyline = (points, type = "cut") => {
    for (let index = 0; index < points.length - 1; index += 1) {
      addSegment(points[index][0], points[index][1], points[index + 1][0], points[index + 1][1], type);
    }
  };

  const addOpenFlap = (left, right, top, outerY, inset = 8) => {
    addPolyline([[left, top], [left + inset, outerY], [right - inset, outerY], [right, top]]);
  };

  const glueX = -125;
  const bodyLeft = -103;
  const bodyTop = -42;
  const bodyBottom = 42;
  const sideA = -61;
  const frontRight = 9;
  const sideB = 51;
  const bodyRight = 121;

  addSegment(glueX, -34, bodyLeft, bodyTop);
  addSegment(glueX, 34, glueX, -34);
  addSegment(bodyLeft, bodyBottom, glueX, 34);
  addSegment(bodyRight, bodyTop, bodyRight, bodyBottom);
  addOpenFlap(sideA, frontRight, bodyTop, -86, 10);
  addOpenFlap(sideB, bodyRight, bodyTop, -86, 10);
  addOpenFlap(bodyLeft, sideA, bodyTop, -72, 7);
  addOpenFlap(frontRight, sideB, bodyTop, -72, 7);
  addOpenFlap(sideA, frontRight, bodyBottom, 86, 10);
  addOpenFlap(sideB, bodyRight, bodyBottom, 86, 10);
  addOpenFlap(bodyLeft, sideA, bodyBottom, 72, 7);
  addOpenFlap(frontRight, sideB, bodyBottom, 72, 7);
  addSegment(bodyLeft, bodyTop, bodyLeft, bodyBottom, "fold");
  addSegment(sideA, bodyTop, sideA, bodyBottom, "fold");
  addSegment(frontRight, bodyTop, frontRight, bodyBottom, "fold");
  addSegment(sideB, bodyTop, sideB, bodyBottom, "fold");
  addSegment(bodyLeft, bodyTop, bodyRight, bodyTop, "fold");
  addSegment(bodyLeft, bodyBottom, bodyRight, bodyBottom, "fold");
  addSegment(sideA, -86, frontRight, -86, "mark");
  addSegment(sideB, -86, bodyRight, -86, "mark");
  addSegment(sideA, 86, frontRight, 86, "mark");
  addSegment(sideB, 86, bodyRight, 86, "mark");
  addSegment(glueX - 16, -36, glueX - 2, -36, "mark");
  addSegment(glueX - 16, 36, glueX - 2, 36, "mark");

  entryDielineLayer.appendChild(fragment);
  while (entryDielineLayer.children.length > 5) entryDielineLayer.firstElementChild?.remove();
  window.setTimeout(() => fragment.remove(), 3900);
};

const enterSite = () => {
  if (hasEntered) return;
  hasEntered = true;
  playUiTone("click");

  if (reducedMotion) {
    document.body.classList.add("has-entered");
    requestAnimationFrame(() => {
      resizeStage();
      initCards();
    });
    return;
  }

  // Phase 1: lid swings open
  document.body.classList.add("is-unfolding");
  playEntryCodeReveal();

  // Phase 2: screen exits
  window.setTimeout(() => {
    document.body.classList.remove("is-unfolding");
    document.body.classList.add("is-entering");
  }, 1900);

  // Phase 3: complete entry
  window.setTimeout(() => {
    document.body.classList.remove("is-entering");
    document.body.classList.add("has-entered");
    // Re-measure stage after CSS switches to sticky/100vh
    requestAnimationFrame(() => {
      resizeStage();
      initCards();
    });
    document.dispatchEvent(new CustomEvent("siteEntered"));
  }, 2680);
};

entryGo?.addEventListener("click", enterSite);

entryScreen?.addEventListener("click", (event) => {
  if (hasEntered || document.body.classList.contains("is-unfolding") || document.body.classList.contains("is-entering")) return;
  if (isInsideEntryCore(event)) return;
  createEntryWave(1);
  createEntryDieline(event.clientX, event.clientY);
});

entryScreen?.addEventListener(
  "wheel",
  (event) => {
    if (event.deltaY > 0) {
      event.preventDefault();
      enterSite();
    }
  },
  { passive: false }
);

// Hero section wheel hijack: discrete step-through of intro + 6 cards
// 2 intro ticks (water only) → 6 card steps → release to normal scroll
let heroIntroBudget = HERO_INTRO_TICKS; // ticks remaining in water-only intro

const isHeroStepControlActive = () => {
  if (!document.body.classList.contains("has-entered")) return false;
  if (orderedMode) return false;

  const rect = heroSection?.getBoundingClientRect();
  if (!rect) return false;

  return rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5 && heroStep < HERO_CARD_COUNT;
};

const lockHeroStep = (duration) => {
  heroWheelLocked = true;
  window.setTimeout(() => { heroWheelLocked = false; }, duration);
};

const stepHeroSequence = (isForward) => {
  if (!isHeroStepControlActive()) return false;
  if (heroWheelLocked) return true;

  if (isForward) {
    if (heroIntroBudget > 0) {
      heroIntroBudget -= 1;
      lockHeroStep(320);
    } else {
      heroStep = Math.min(HERO_CARD_COUNT, heroStep + 1);
      lockHeroStep(480);
    }
  } else {
    if (heroStep > 0) {
      heroStep = Math.max(0, heroStep - 1);
    } else {
      heroIntroBudget = Math.min(HERO_INTRO_TICKS, heroIntroBudget + 1);
    }
    lockHeroStep(380);
  }

  return true;
};

window.addEventListener(
  "wheel",
  (event) => {
    if (!isHeroStepControlActive()) return;
    event.preventDefault();
    stepHeroSequence(event.deltaY > 0);
  },
  { passive: false }
);

let heroTouchStart = null;

heroStage?.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    heroTouchStart = {
      x: touch.clientX,
      y: touch.clientY,
    };
  },
  { passive: true }
);

heroStage?.addEventListener(
  "touchmove",
  (event) => {
    if (isHeroStepControlActive()) {
      event.preventDefault();
    }
  },
  { passive: false }
);

heroStage?.addEventListener(
  "touchend",
  (event) => {
    if (!heroTouchStart) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - heroTouchStart.x;
    const dy = touch.clientY - heroTouchStart.y;
    heroTouchStart = null;

    if (Math.abs(dy) < 36 || Math.abs(dy) < Math.abs(dx)) return;
    stepHeroSequence(dy < 0);
  },
  { passive: true }
);

// Hero stage click ripple effect
const heroRipples = [];

const createHeroRipple = (clientX, clientY, isClick = false) => {
  if (!heroStage || reducedMotion) return;
  const rect = heroStage.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const startedAt = performance.now();

  heroRipples.push({
    x,
    y,
    startedAt,
    duration: isClick ? 1800 : 900,
    maxRadius: Math.min(rect.width, rect.height) * (isClick ? 0.18 : 0.06),
    isClick,
    // organic variation seed per ripple
    seed: Math.random() * Math.PI * 2,
  });

  if (heroRipples.length > 3) heroRipples.shift();
  playWaterDrop();
};

heroStage?.addEventListener("click", (event) => {
  if (!document.body.classList.contains("has-entered")) return;
  if (event.target.closest(".hero-card")) return;
  createHeroRipple(event.clientX, event.clientY, true);
});

// Mouse movement ripple effect (throttled)
let lastRippleTime = 0;
const RIPPLE_THROTTLE = 300;

heroStage?.addEventListener("pointermove", (event) => {
  if (!document.body.classList.contains("has-entered")) return;
  if (event.target.closest(".hero-card")) return;

  const now = performance.now();
  if (now - lastRippleTime < RIPPLE_THROTTLE) return;

  lastRippleTime = now;
  createHeroRipple(event.clientX, event.clientY);
});

// Ripple rendering on hero-kinetic-canvas overlay
const renderHeroRipples = () => {
  const canvas = document.getElementById("hero-ripple-canvas");
  if (!canvas || !heroStage) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = heroStage.getBoundingClientRect();
  const pr = Math.min(window.devicePixelRatio, 2);

  if (canvas.width !== rect.width * pr || canvas.height !== rect.height * pr) {
    canvas.width = rect.width * pr;
    canvas.height = rect.height * pr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(pr, pr);
  }

  ctx.clearRect(0, 0, rect.width, rect.height);

  const now = performance.now();
  for (let i = heroRipples.length - 1; i >= 0; i--) {
    const ripple = heroRipples[i];
    const elapsed = now - ripple.startedAt;
    const progress = Math.min(elapsed / ripple.duration, 1);

    if (progress >= 1) {
      heroRipples.splice(i, 1);
      continue;
    }

    const eased = 1 - (1 - progress) ** 2;
    const radius = ripple.maxRadius * eased;
    const opacity = (1 - progress) * (ripple.isClick ? 0.5 : 0.35);

    // Ultra-soft organic ripple: draw as continuous wavy path
    ctx.save();
    ctx.shadowBlur = 16;
    ctx.shadowColor = `rgba(153, 242, 230, ${opacity * 0.4})`;

    const segments = 24; // more segments = smoother wave
    const angleStep = (Math.PI * 2) / segments;

    // outer wave ring
    ctx.beginPath();
    for (let j = 0; j <= segments; j++) {
      const angle = j * angleStep + ripple.seed;
      // layered wave: multiple frequencies for natural irregularity
      const wave1 = Math.sin(angle * 3 + ripple.seed * 2) * 0.06;
      const wave2 = Math.sin(angle * 5 - ripple.seed) * 0.03;
      const wave3 = Math.sin(angle * 7 + progress * Math.PI * 2) * 0.02;
      const r = radius * (1 + wave1 + wave2 + wave3);
      const px = ripple.x + Math.cos(angle) * r;
      const py = ripple.y + Math.sin(angle) * r;
      j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();

    // gradient stroke: fade from center to edge
    const grad = ctx.createRadialGradient(ripple.x, ripple.y, radius * 0.8, ripple.x, ripple.y, radius * 1.1);
    grad.addColorStop(0, `rgba(200, 245, 237, 0)`);
    grad.addColorStop(0.5, `rgba(200, 245, 237, ${opacity * 0.7})`);
    grad.addColorStop(1, `rgba(200, 245, 237, 0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = ripple.isClick ? 1.8 : 1.0;
    ctx.stroke();

    ctx.restore();

    // Inner ring (only for click ripples, softer)
    if (ripple.isClick && progress < 0.6) {
      const innerRadius = radius * 0.5;
      const innerOpacity = (1 - progress / 0.6) * 0.25;

      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(153, 242, 230, ${innerOpacity * 0.4})`;

      // inner wave ring (same organic style as outer)
      ctx.beginPath();
      const innerSegs = 20;
      const innerStep = (Math.PI * 2) / innerSegs;
      for (let k = 0; k <= innerSegs; k++) {
        const angle = k * innerStep + ripple.seed * 1.5;
        const wave1 = Math.sin(angle * 4 - ripple.seed) * 0.05;
        const wave2 = Math.sin(angle * 6 + progress * Math.PI) * 0.025;
        const r = innerRadius * (1 + wave1 + wave2);
        const px = ripple.x + Math.cos(angle) * r;
        const py = ripple.y + Math.sin(angle) * r;
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      const innerGrad = ctx.createRadialGradient(
        ripple.x, ripple.y, innerRadius * 0.75,
        ripple.x, ripple.y, innerRadius * 1.1
      );
      innerGrad.addColorStop(0, `rgba(173, 235, 224, 0)`);
      innerGrad.addColorStop(0.5, `rgba(173, 235, 224, ${innerOpacity * 0.9})`);
      innerGrad.addColorStop(1, `rgba(173, 235, 224, 0)`);
      ctx.strokeStyle = innerGrad;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }
  }

  requestAnimationFrame(renderHeroRipples);
};

if (heroStage && !reducedMotion) {
  requestAnimationFrame(renderHeroRipples);
}


window.addEventListener(
  "pointerdown",
  () => {
    if (soundEnabled) {
      getAudioContext().catch(() => null);
    }
  },
  { once: true, passive: true }
);

window.addEventListener("resize", () => {
  resizeStage();
  if (orderedMode && currentHeroCard) {
    applyOrderedLayout(currentHeroCard);
  }
});

switchLanguage("zh");
resizeStage();
initCards();
updateFocusPanel("oem");
updateWorksPanel("oem");
heroWireframeController = initHeroWireframe(heroWireframe);
initEntryField(entryFieldCanvas);
initWaterSurface(document.getElementById("hero-kinetic-canvas"));
initFloatingOrbs(document.getElementById("hero-orbs-canvas"));
initParticleCanvas(heroCopyCanvas, "dark");
// initParticleCanvas(particleCanvas, "light");
updateBeijingMeta();
window.setInterval(updateBeijingMeta, 30000);
window.requestAnimationFrame(animateCards);

// Marquee: clone track so it loops seamlessly regardless of item count
(function () {
  const marquee = document.querySelector(".clients-marquee");
  const track = marquee && marquee.querySelector(".clients-track");
  if (!track) return;
  const clone = track.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marquee.appendChild(clone);
})();

// Portrait section — scroll-driven via CSS variables
(function () {
  const section = document.querySelector(".portrait-about-wrapper");
  if (!section) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    // progress: 0 = section just entered, 1 = section fully scrolled through
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    // exit: starts at 0.7 progress, reaches 1 at end — drives blur/fade
    const exit = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));

    section.style.setProperty("--portrait-progress", progress.toFixed(4));
    section.style.setProperty("--portrait-exit", exit.toFixed(4));
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
})();

// Bottom nav scroll spy
(function () {
  const nav = document.querySelector(".bottom-nav");
  const indicator = document.querySelector(".bottom-nav-indicator");
  const navItems = document.querySelectorAll(".bottom-nav-item");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  function moveIndicator(item) {
    if (!nav || !indicator || !item) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    nav.style.setProperty("--nav-indicator-x", `${itemRect.left - navRect.left}px`);
    nav.style.setProperty("--nav-indicator-w", `${itemRect.width}px`);
    nav.classList.add("has-indicator");
  }

  function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let active = null;
    let activeItem = null;
    for (const sec of sections) {
      if (sec.offsetTop <= scrollY) active = sec.id;
    }
    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      const isActive = href === "#" + active;
      item.classList.toggle("is-active", isActive);
      if (isActive) activeItem = item;
    });
    moveIndicator(activeItem);
  }

  navItems.forEach((item) => {
    item.addEventListener("pointerenter", () => moveIndicator(item));
    item.addEventListener("focus", () => moveIndicator(item));
  });

  nav?.addEventListener("pointerleave", () => {
    moveIndicator(document.querySelector(".bottom-nav-item.is-active"));
  });

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();
})();

// ── Three.js packaging box ────────────────────────────────────────────────
(function initBox3D() {
  if (typeof THREE === "undefined") return;
  const canvas = document.getElementById("box3d-canvas");
  if (!canvas) return;

  const W = 200, H = 200;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
  camera.position.set(2.2, 2.6, 3.4);
  camera.lookAt(0, 0.1, 0);

  // Lighting — warm natural light for kraft paper
  scene.add(new THREE.AmbientLight(0xfff1e4, 0.72));

  const keyLight = new THREE.DirectionalLight(0xfff3e2, 2.8);
  keyLight.position.set(3, 5, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(512, 512);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe3c9b3, 1.2);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xc69d86, 0.8);
  rimLight.position.set(0, -2, -4);
  scene.add(rimLight);

  // Materials — white kraft paper palette
  const matFront  = new THREE.MeshStandardMaterial({ color: 0xe9dccb, roughness: 0.93, metalness: 0.00 });
  const matSide   = new THREE.MeshStandardMaterial({ color: 0xdccab6, roughness: 0.95, metalness: 0.00 });
  const matTop    = new THREE.MeshStandardMaterial({ color: 0xf1e6d7, roughness: 0.90, metalness: 0.00 });
  const matBottom = new THREE.MeshStandardMaterial({ color: 0xcfbaa3, roughness: 0.98, metalness: 0.00 });
  const matInner  = new THREE.MeshStandardMaterial({ color: 0xc5ad94, roughness: 0.99, metalness: 0.00 });

  // Box: square 1×1×1
  const bx = 1, by = 1, bz = 1, t = 0.04;

  // Root group — everything rotates together
  const root = new THREE.Group();
  scene.add(root);

  function addFace(geo, mat, px, py, pz) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(px, py, pz);
    m.castShadow = true;
    m.receiveShadow = true;
    root.add(m);
    return m;
  }

  const faceXZ = new THREE.BoxGeometry(bx, by, t);
  const faceYZ = new THREE.BoxGeometry(t, by, bz);
  const faceXY = new THREE.BoxGeometry(bx, t, bz);

  addFace(faceXZ, matFront,  0,  0,  bz / 2);
  addFace(faceXZ, matSide,   0,  0, -bz / 2);
  addFace(faceYZ, matSide,  -bx / 2, 0, 0);
  addFace(faceYZ, matFront,  bx / 2, 0, 0);
  addFace(faceXY, matBottom, 0, -by / 2, 0);

  // Inner bottom (visible when lid opens)
  const innerGeo = new THREE.BoxGeometry(bx - t * 2, t, bz - t * 2);
  const innerMesh = new THREE.Mesh(innerGeo, matInner);
  innerMesh.position.set(0, -by / 2 + t, 0);
  root.add(innerMesh);

  // Lid — pivot at back-top edge: y = +by/2, z = -bz/2
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, by / 2, -bz / 2);
  root.add(lidPivot);

  const skirtH = 0.18;

  // Lid top panel — closed: sits flat at y=by/2, covering the opening
  const lidTopGeo = new THREE.BoxGeometry(bx, t, bz);
  const lidTopMesh = new THREE.Mesh(lidTopGeo, matTop);
  lidTopMesh.position.set(0, 0, bz / 2);
  lidTopMesh.castShadow = true;
  lidPivot.add(lidTopMesh);

  // Lid front skirt (drops down over front face)
  const lidFrontGeo = new THREE.BoxGeometry(bx, skirtH, t);
  const lidFrontMesh = new THREE.Mesh(lidFrontGeo, matFront);
  lidFrontMesh.position.set(0, -skirtH / 2, bz);
  lidPivot.add(lidFrontMesh);

  // Lid side skirts
  const lidSideGeo = new THREE.BoxGeometry(t, skirtH, bz);
  const lidLeftMesh = new THREE.Mesh(lidSideGeo, matSide);
  lidLeftMesh.position.set(-bx / 2, -skirtH / 2, bz / 2);
  lidPivot.add(lidLeftMesh);

  const lidRightMesh = new THREE.Mesh(lidSideGeo, matFront);
  lidRightMesh.position.set(bx / 2, -skirtH / 2, bz / 2);
  lidPivot.add(lidRightMesh);

  // Shadow plane
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4),
    new THREE.ShadowMaterial({ opacity: 0.16 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -by / 2 - 0.01;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // Animation state — start fully closed
  let lidAngle = 0;
  let lidTarget = 0;
  let isHovered = false;
  let isUnfolding = false;
  let idleT = 0;

  const HOVER_ANGLE = -0.62;
  const OPEN_ANGLE  = -2.05;

  const trigger = document.getElementById("entry-go");
  trigger?.addEventListener("mouseenter", () => { isHovered = true; });
  trigger?.addEventListener("mouseleave", () => { isHovered = false; });

  const bodyObserver = new MutationObserver(() => {
    isUnfolding = document.body.classList.contains("is-unfolding");
  });
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  function lerp(a, b, f) { return a + (b - a) * f; }

  function animate() {
    window.requestAnimationFrame(animate);
    idleT += 0.006;

    root.rotation.y = 0.52 + Math.sin(idleT * 0.7) * 0.04;
    root.rotation.x = -0.32 + Math.sin(idleT * 0.5) * 0.02;

    if (isUnfolding) {
      lidTarget = OPEN_ANGLE;
    } else if (isHovered) {
      lidTarget = HOVER_ANGLE;
    } else {
      lidTarget = 0;
    }

    lidAngle = lerp(lidAngle, lidTarget, 0.07);
    lidPivot.rotation.x = lidAngle;

    renderer.render(scene, camera);
  }

  animate();
})();
