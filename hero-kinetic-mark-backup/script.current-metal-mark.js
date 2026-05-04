const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const i18n = {
  zh: {
    nav_about: "关于",
    nav_services: "服务",
    nav_works: "作品",
    nav_contact: "联系",
    hero_kicker: "Packaging Direction / Visual Judgment / OEM System",
    hero_title: "不是把包装做漂亮，而是把包装做对。",
    hero_text: "Kinzie 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    hero_script: "quietly, precisely.",
    hero_action_works: "进入作品选集",
    hero_action_about: "查看服务",
    hero_note: "首页不是说明文档，而是进入作品现场的入口。先浏览，再判断，再进入项目。",
    works_kicker: "作品",
    works_statement_title: "不是把包装做漂亮，而是把包装做对。",
    works_statement_body: "Kinzie 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
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
    hero_text: "Kinzie focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    hero_script: "quietly, precisely.",
    hero_action_works: "Enter Works",
    hero_action_about: "View Services",
    hero_note: "The homepage is not a document. It is an entrance into the work itself: browse first, judge second, then enter the project.",
    works_kicker: "Works",
    works_statement_title: "Not just making packaging beautiful, but making it right.",
    works_statement_body: "Kinzie focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    works_title: "Click a project and enter a more focused field of judgment.",
    works_text: "These works show not just results, but the judgment behind them. What matters is whether they hold up in real price bands, channel conditions, process constraints, and production realities.",
    work_tab_oem: "OEM Packaging",
    work_tab_gift: "Gift Channel",
    work_tab_series: "Series Packaging",
    work_tab_brand: "Brand Support",
    work_tab_aigc: "AIGC Workflow",
    works_col_project: "Project",
    works_col_type: "Type",
    works_col_year: "Year",
    work_row_1_name: "Multi-SKU OEM Packaging System",
    work_row_2_name: "Seasonal Gift Channel Packaging",
    work_row_3_name: "Series Gift Box Visual System",
    work_row_4_name: "Brand Typography & Identity Support",
    work_row_5_name: "AIGC-Assisted Proposal Workflow",
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
    clients_kicker: "Clients",
    clients_title: "Clients",
    contact_kicker: "Contact",
    contact_title: "Contact",
    contact_text: "If you are looking for a designer who understands packaging expression and takes real-world execution and cost constraints seriously, get in touch.",
    contact_collab: "OEM / Private Label · Gifting & Welfare Channels · Series Packaging · Seasonal Gift Boxes · Packaging Upgrade · Proposal & Direction Support",
    focus_kicker: "Active Project",
    meta_name: "KINZIE",
  },
};

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
const heroCardStates = [];
const fieldPointer = { x: 0.5, y: 0.5, active: false };
const precisionCursor = document.querySelector("#precision-cursor");
const precisionGuides = document.querySelector("#precision-guides");
const heroClusterLayout = [
  { ox: -0.52, oy: -0.22, scale: 0.88, rot: -12, depth: -24, phase: 0.1 },
  { ox: -0.32, oy: -0.30, scale: 0.86, rot: -6, depth: -8,  phase: 0.6 },
  { ox: -0.10, oy: -0.28, scale: 0.84, rot:  5, depth:  8,  phase: 1.1 },
  { ox:  0.14, oy: -0.22, scale: 0.86, rot:  9, depth: 22,  phase: 1.7 },
  { ox:  0.38, oy: -0.14, scale: 0.92, rot:  7, depth: 52,  phase: 2.1 },
  { ox:  0.52, oy:  0.08, scale: 0.84, rot: -8, depth: 18,  phase: 2.6 },
  { ox:  0.36, oy:  0.28, scale: 0.86, rot:  4, depth: -2,  phase: 3.1 },
  { ox:  0.12, oy:  0.36, scale: 0.90, rot: -9, depth: -18, phase: 3.7 },
  { ox: -0.16, oy:  0.32, scale: 0.82, rot:  8, depth: -34, phase: 4.2 },
  { ox: -0.40, oy:  0.18, scale: 1.04, rot:  0, depth: 66,  phase: 4.8 },
  { ox: -0.24, oy: -0.06, scale: 0.82, rot: -4, depth: 28,  phase: 5.4 },
  { ox:  0.22, oy:  0.10, scale: 0.78, rot: 11, depth: -12, phase: 5.9 },
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
const SOUND_STORAGE_KEY = "kinzieSoundEnabled";

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

  if (!audioContext) return;

  if (soundEnabled) {
    await audioContext.resume().catch(() => null);
    playUiTone("click");
    return;
  }

  if (audioContext.state === "running") {
    await audioContext.suspend().catch(() => null);
  }
});

applySoundState();

// Contact: hover-to-copy
const copyItems = document.querySelectorAll(".contact-copy-item");

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
  if (audioContext) return audioContext;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  audioContext = new AudioCtx();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
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
      y: stageMotion.height * 0.48,
      targetX: stageMotion.width * 0.5,
      targetY: stageMotion.height * 0.48,
      rotation: layout.rot,
      scale: layout.scale,
      opacity: 0.76,
      depth: layout.depth,
      layout,
      phase: layout.phase,
      captureX: stageMotion.width * 0.5,
      captureY: stageMotion.height * 0.48,
    };
    heroCardStates.push(state);
    card.dataset.index = String(index);
  });
};

const setCursorVisible = (visible) => {
  if (!precisionCursor) return;
  precisionCursor.classList.toggle("is-visible", visible);
  precisionGuides?.classList.toggle("is-visible", visible);
  document.body.classList.toggle("cursor-active", visible);
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
  const workKey = card.dataset.work;
  flowPaused = true;
  setActiveHeroCard(card);
  updateFocusPanel(workKey);
  updateWorksPanel(workKey);
  applyOrderedLayout(card);
  playUiTone("click");
};

const switchLanguage = (lang) => {
  currentLang = lang;
  updateStaticText();
  updateFocusPanel(selectedWorkKey);
  updateWorksPanel(selectedWorkKey);
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchLanguage(button.dataset.lang);
    playUiTone("click");
  });
});

heroCards.forEach((card) => {
  card.addEventListener("pointerenter", () => {
    if (orderedMode) return;
    setActiveHeroCard(card);
    playUiTone("hover");
  });

  card.addEventListener("focus", () => {
    if (orderedMode) return;
    setActiveHeroCard(card);
  });

  card.addEventListener("click", () => {
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
  setCursorVisible(true);

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
};

const categoryPatterns = {
  oem:    "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
  gift:   "repeating-linear-gradient(-45deg, rgba(255,200,180,0.06) 0px, rgba(255,200,180,0.06) 1px, transparent 1px, transparent 10px)",
  series: "repeating-linear-gradient(90deg, rgba(100,160,220,0.05) 0px, rgba(100,160,220,0.05) 1px, transparent 1px, transparent 14px)",
  brand:  "repeating-linear-gradient(0deg, rgba(180,200,120,0.05) 0px, rgba(180,200,120,0.05) 1px, transparent 1px, transparent 11px)",
  aigc:   "repeating-linear-gradient(135deg, rgba(140,160,220,0.06) 0px, rgba(140,160,220,0.06) 1px, transparent 1px, transparent 9px)",
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

  row.addEventListener("mouseenter", (e) => {
    const bg = colors[Math.floor(Math.random() * colors.length)];
    if (worksPreviewImg) {
      worksPreviewImg.style.background = `${pattern}, ${bg}`;
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
    if (previewRaf) { cancelAnimationFrame(previewRaf); previewRaf = null; }
  });
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

document.querySelectorAll("#about, #services, #works, #contact").forEach((sec) => {
  revealChildObserver.observe(sec);
});

if (reducedMotion) {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
}

const hoverCodeGlyphs = "KINZIE0123456789#/_包装判断结构";
const hoverCodeTargets = Array.from(
  document.querySelectorAll(
    ".about-heading, .about-lead, .about-detail, .section-head h2, .section-intro, .service-item h3, .service-item p, .works-statement-title, .works-statement-body"
  )
);

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
  const centerY = height * 0.47;
  const pointerX = fieldPointer.x * width;
  const pointerY = fieldPointer.y * height;
  const swayX = Math.sin(elapsed * 0.22) * width * 0.014;
  const swayY = Math.cos(elapsed * 0.18) * height * 0.012;
  const heroRect = heroSection?.getBoundingClientRect();
  const hasEntered = document.body.classList.contains("has-entered");
  // scrollable height = hero total height minus one viewport
  const heroScrollable = heroSection ? Math.max(window.innerHeight * 2, heroSection.offsetHeight - window.innerHeight) : 1;
  const scrollProgress = (hasEntered && heroRect)
    ? Math.min(1, Math.max(0, -heroRect.top / heroScrollable))
    : 0;
  const scrollDriven = hasEntered && !orderedMode;

  if (heroStage) {
    heroStage.style.setProperty("--hero-scroll-progress", scrollProgress.toFixed(4));
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
      const cardCount = heroCardStates.length;
      // travel: 0 → card 0 is front, 1 → card 1 is front, etc.
      const travel = scrollProgress * (cardCount - 1);
      const delta = index - travel; // 0 = currently front

      // Cards orbit a central axis (bamboo). delta=0 → front center.
      // Full circle spread: each card is PI/2 apart when at rest,
      // narrows as scroll brings each one to front.
      const orbitAngle = delta * (Math.PI * 0.55);

      // Horizontal radius around center, slight vertical arc
      const radiusX = minSide * 0.20;
      const radiusY = minSide * 0.04;
      const axisX = centerX;
      const axisY = height * 0.50;

      // depth: cos(0)=1 → front, cos(PI)=-1 → back
      const depthWave = Math.cos(orbitAngle);
      const depthFront = (depthWave + 1) * 0.5;
      const focus = Math.max(0, 1 - Math.abs(delta) / 1.6);

      const pointerShiftX = fieldPointer.active ? (fieldPointer.x - 0.5) * minSide * 0.05 : 0;
      const pointerShiftY = fieldPointer.active ? (fieldPointer.y - 0.5) * minSide * 0.03 : 0;

      const x = axisX + Math.sin(orbitAngle) * radiusX + pointerShiftX * (0.3 + depthFront * 0.2);
      const y = axisY + Math.sin(orbitAngle * 0.5) * radiusY + pointerShiftY * (0.2 + depthFront * 0.1);

      // cards more than 5 slots away are invisible
      const visibleBand = Math.max(0, 1 - Math.max(0, Math.abs(delta) - 4.0) / 1.5);
      const isCurrent = Math.abs(delta) < 0.5;

      return {
        x,
        y,
        rotation: Math.sin(orbitAngle) * 4 + pointerShiftX * 0.012,
        ry: Math.sin(orbitAngle) * 55 + pointerShiftX * 0.025,
        rx: -3 + depthWave * 3 - pointerShiftY * 0.012,
        scale: 0.68 + focus * 0.34 + depthFront * 0.05,
        depth: 10 + depthFront * 140 + focus * 50,
        opacity: Math.min(0.96, Math.max(0, visibleBand * (0.22 + depthFront * 0.42 + focus * 0.32))),
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
      y += index % 2 === 0 ? -minSide * 0.02 : minSide * 0.02;
    }

    return {
      x,
      y,
      rotation: layout.rot + Math.sin(elapsed * 0.38 + layout.phase) * 4.2,
      ry: Math.sin(elapsed * 0.34 + layout.phase) * 14,
      rx: Math.cos(elapsed * 0.28 + layout.phase) * 4,
      scale: orderedMode ? layout.scale * 0.92 : layout.scale,
      depth: orderedMode ? layout.depth - 24 : layout.depth,
      opacity: orderedMode ? 0.14 : 0.76,
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

const initHeroKineticMark = (canvas) => {
  if (!canvas || reducedMotion || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 8.4);

  const group = new THREE.Group();
  group.rotation.x = Math.PI * 0.5;
  scene.add(group);

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.92,
    roughness: 0.16,
    emissive: 0x010101,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xf4f0e8,
    metalness: 0.62,
    roughness: 0.12,
    emissive: 0x090909,
  });

  const majorRadius = 1.52;
  const minorRadius = 0.84;
  const ribCount = 54;
  const tubeSegments = 140;
  const twist = 1.05;

  const createRibCurve = (offset = 0, phase = 0) => {
    const points = [];
    for (let i = 0; i <= tubeSegments; i += 1) {
      const u = (i / tubeSegments) * Math.PI * 2;
      const v = offset + u * twist + phase;
      const breathing = 1 + Math.sin(u * 3 + offset) * 0.018;
      const localMinor = minorRadius * breathing;
      const x = (majorRadius + localMinor * Math.cos(v)) * Math.cos(u);
      const y = localMinor * Math.sin(v) * 0.98;
      const z = (majorRadius + localMinor * Math.cos(v)) * Math.sin(u);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.42);
  };

  for (let i = 0; i < ribCount; i += 1) {
    const offset = (i / ribCount) * Math.PI * 2;
    const ribGeo = new THREE.TubeGeometry(createRibCurve(offset), 140, 0.028 + (i % 3) * 0.002, 10, true);
    const rib = new THREE.Mesh(ribGeo, darkMat);
    rib.rotation.x = 0.18;
    rib.rotation.y = -0.32;
    rib.rotation.z = 0.08;
    group.add(rib);

    if (i % 3 === 0) {
      const glintGeo = new THREE.TubeGeometry(createRibCurve(offset + 0.018, 0.02), 90, 0.008, 8, true);
      const glint = new THREE.Mesh(glintGeo, highlightMat);
      glint.rotation.copy(rib.rotation);
      glint.scale.set(1.006, 1.006, 1.006);
      group.add(glint);
    }
  }

  const innerShadowGeo = new THREE.TorusGeometry(1.15, 0.045, 12, 128);
  const innerShadowMat = new THREE.MeshStandardMaterial({
    color: 0x020202,
    metalness: 0.8,
    roughness: 0.22,
  });
  const innerShadow = new THREE.Mesh(innerShadowGeo, innerShadowMat);
  innerShadow.rotation.x = Math.PI * 0.5 + 0.18;
  innerShadow.rotation.z = -0.2;
  group.add(innerShadow);

  group.scale.setScalar(0.86);

  const fillLight = new THREE.PointLight(0xffffff, 1.8, 10);
  fillLight.position.set(-2.8, 2.4, 3.6);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0xffffff, 1.85, 10);
  rimLight.position.set(2.8, -1.6, 4.2);
  scene.add(rimLight);
  const topLight = new THREE.DirectionalLight(0xffffff, 1.65);
  topLight.position.set(-1.4, 4, 5);
  scene.add(topLight);
  const lowStrip = new THREE.PointLight(0x909090, 0.8, 8);
  lowStrip.position.set(-3.2, -2.4, 2.2);
  scene.add(lowStrip);
  scene.add(new THREE.AmbientLight(0x080808, 1.1));

  let mx = 0;
  const onPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer);

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  let raf = 0;
  const animate = (time = 0) => {
    raf = requestAnimationFrame(animate);
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");
    group.rotation.x += (Math.PI * 0.5 - group.rotation.x) * 0.035;
    group.rotation.z += (0 - group.rotation.z) * 0.035;
    group.rotation.y += ((mx * 0.22 + sp * Math.PI * 0.42) - group.rotation.y) * 0.035;
    renderer.render(scene, camera);
  };
  animate();

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};

const playEntryCodeReveal = () => {
  if (!entryCodeWord) return;

  const target = "KINZIEDESIGN";
  const glyphSets = ["KXH#", "I1L|", "NMW/", "Z2E=", "I1L|", "E3F_"];
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
    document.documentElement.classList.add("snap-active");
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
    document.documentElement.classList.add("snap-active");
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
initHeroKineticMark(document.getElementById("hero-kinetic-canvas"));
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
