/* ============================================================================
   SCRIPT MAP
   This file intentionally stays in runtime order for now. The hero water
   surface, hero wheel-step control, services scroll story, and work gallery
   share state through DOM classes and CSS variables.

   Safe edit zones:
   1. copy/data objects
   2. contact form and social interactions
   3. works hover preview and gallery text/data
   4. isolated utility helpers

   Frozen visual chains:
   - initWaterSurface and its canvas setup
   - hero wheel-step control
   - services scroll story renderer
   ============================================================================ */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Site copy, work taxonomy, and gallery data are loaded from site-data.js.

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
let lastSnapAt = 0;
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
// step 1-5 = card focus steps
const HERO_CARD_COUNT = 5;
const HERO_INTRO_TICKS = 2;
const HERO_WHEEL_STEP_THRESHOLD = 18;
const HERO_WHEEL_BACK_THRESHOLD = 44;
const HERO_TOUCH_STEP_THRESHOLD = 42;
const HERO_RELEASE_EASING_GAP = 0.08;
let heroStep = 0;           // 0..HERO_CARD_COUNT
let heroStepTarget = 0;     // lerp target (float)
let heroWheelLocked = false;// debounce between steps
let heroIntroBudget = HERO_INTRO_TICKS; // ticks remaining in water-only intro
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
const particleCanvas = document.querySelector("#clients-particles");
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
const homeLinks = Array.from(document.querySelectorAll('a[href="#top"]'));
const soundToggle = document.querySelector("#sound-toggle");
const fullscreenToggle = document.querySelector("#fullscreen-toggle");
const SOUND_STORAGE_KEY = "lucianYangSoundEnabled";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Header controls, sound, and fullscreen state ------------------------------
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

const isFullscreenActive = () => Boolean(document.fullscreenElement);

const updateFullscreenState = () => {
  const active = isFullscreenActive();
  document.body.classList.toggle("is-fullscreen", active);
  fullscreenToggle?.setAttribute("aria-pressed", String(active));
  fullscreenToggle?.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
};

fullscreenToggle?.addEventListener("click", async () => {
  try {
    if (isFullscreenActive()) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    }
  } catch {
    // Fullscreen can be blocked by browser policy; keep the UI in the current state.
  } finally {
    updateFullscreenState();
  }
});

document.addEventListener("fullscreenchange", updateFullscreenState);

applySoundState();
updateFullscreenState();

// Scroll typography and section reveal effects ------------------------------
const SCROLL_TYPE_SELECTOR = [
  ".js-scroll-type-disabled",
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

// Contact interactions -------------------------------------------------------
// Contact: hover-to-copy
const copyItems = document.querySelectorAll(".contact-copy-item");
const contactForm = document.querySelector("#contact-form");

const showContactToast = () => {
  const toast = document.getElementById("contact-toast");
  if (!toast) return;
  toast.textContent = currentLang === "zh" ? "已准备发送邮件，并复制内容" : "Email draft ready to send and copied";
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 2400);
};

copyItems.forEach((item) => {
  let hoverTimer = null;
  item.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      const text = item.dataset.copy;
      if (!text || !navigator.clipboard?.writeText) return;
      navigator.clipboard.writeText(text).then(() => {
        item.classList.add("copied");
        setTimeout(() => item.classList.remove("copied"), 1600);
      }).catch(() => null);
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

  navigator.clipboard?.writeText(body).catch(() => null);
  window.location.href = `mailto:y1156813759@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  playUiTone("click");
  showContactToast();
});

// WeChat QR modal
const wechatTrigger = document.querySelector("#wechat-qr-trigger");
const wechatModal = document.querySelector("#wechat-qr-modal");
const wechatBackdrop = document.querySelector("#wechat-qr-backdrop");
const wechatClose = document.querySelector("#wechat-qr-close");

const openWechatModal = () => {
  if (!wechatModal) return;
  wechatModal.classList.add("is-open");
  wechatModal.setAttribute("aria-hidden", "false");
  wechatClose?.focus({ preventScroll: true });
};

const closeWechatModal = () => {
  if (!wechatModal) return;
  wechatModal.classList.remove("is-open");
  wechatModal.setAttribute("aria-hidden", "true");
  wechatTrigger?.focus({ preventScroll: true });
};

wechatTrigger?.addEventListener("click", openWechatModal);
wechatClose?.addEventListener("click", closeWechatModal);
wechatBackdrop?.addEventListener("click", closeWechatModal);

// Audio feedback and shared interaction state -------------------------------
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
  const nowMs = performance.now();
  if (nowMs - lastSnapAt < 200) return;
  lastSnapAt = nowMs;
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

// Static UI updates and language switching ----------------------------------
const updateStaticText = () => {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (i18n[currentLang][key]) {
      const value = i18n[currentLang][key];
      const pillLabel = node.querySelector?.(".label-stack");
      if (pillLabel) {
        pillLabel.querySelectorAll(".pill-label, .pill-label-hover").forEach((span) => {
          span.textContent = value;
        });
        node.setAttribute("aria-label", value);
      } else {
        node.textContent = value;
      }
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
      opacity: 0,
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

const updateWorksTabState = (workKey) => {
  const data = worksData[workKey];
  if (!data) return;

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

const forceScrollTop = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const resetHeroSequenceState = ({ resetScroll = false, resetCards = true } = {}) => {
  if (resetScroll) forceScrollTop();

  heroStep = 0;
  heroStepTarget = 0;
  heroIntroBudget = HERO_INTRO_TICKS;
  heroWheelLocked = false;
  orderedMode = false;
  selectedCardIndex = -1;
  selectionStartedAt = 0;
  currentHeroCard = null;
  fieldPointer.active = false;
  window.clearTimeout(focusTimeout);

  document.documentElement.classList.remove("snap-active");
  heroFocusPanel?.classList.remove("is-visible");
  heroStage?.style.setProperty("--hero-scroll-progress", "0");
  heroStage?.style.setProperty("--hero-intro-progress", "0");
  heroStage?.style.setProperty("--hero-water-progress", "0");
  heroStage?.style.setProperty("--hero-tail-fade", "1");

  heroCards.forEach((card) => {
    card.classList.remove("is-active", "is-dimmed", "is-ordered", "is-scroll-current");
  });

  if (!resetCards) return;

  resizeStage();
  initCards();
  heroCardStates.forEach((state) => {
    state.x = stageMotion.width * 0.5;
    state.y = stageMotion.height * 0.5;
    state.targetX = state.x;
    state.targetY = state.y;
    state.opacity = 0;
    setCardPosition(state.card, {
      x: state.x,
      y: state.y,
      w: state.width,
      h: state.height,
      z: state.depth,
      r: state.rotation,
      scale: state.scale,
      opacity: 0,
    });
  });
};

window.LucianRuntime = {
  reducedMotion,
  playUiTone,
  forceScrollTop,
  resetHeroSequenceState,
  resizeStage,
  initCards,
  setEntered(value) {
    hasEntered = value;
  },
  isEntered() {
    return hasEntered;
  },
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
  queueWorkDetailReveal();

  window.setTimeout(() => {
    measureGallery();
    queueGalleryRender();
  }, 40);

  galleryOpen = true;
  playUiTone("click");
};

const switchLanguage = (lang) => {
  currentLang = lang;
  if (typeof restoreScrambledTextNodes === "function") restoreScrambledTextNodes();
  updateStaticText();
  initScrambledText();
  window.rebuildServicesStoryText?.();
  updateFocusPanel(selectedWorkKey);
  updateWorksTabState(selectedWorkKey);
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
    updateWorksTabState(selectedWorkKey);
    updateFocusPanel(selectedWorkKey);
    playUiTone("click");
  });
});

// Works preview and project gallery -----------------------------------------
// Works list hover preview
const worksPreview = document.querySelector("#works-hover-preview");
const worksPreviewImg = document.querySelector("#works-preview-img");

const categoryColors = {
  oem:    ["#2a2420", "#3d3028", "#4a3a30", "#352a22"],
  gift:   ["#2e2228", "#3a2a32", "#4a3040", "#2a1e28"],
  brand:  ["#222820", "#2c3228", "#343c2e", "#1e2418"],
  aigc:   ["#1a1c22", "#20222c", "#242830", "#1c1e26"],
  "aigc-video": ["#161820", "#202436", "#283048", "#12141d"],
};

const categoryPatterns = {
  oem:    "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
  gift:   "repeating-linear-gradient(-45deg, rgba(255,200,180,0.06) 0px, rgba(255,200,180,0.06) 1px, transparent 1px, transparent 10px)",
  brand:  "repeating-linear-gradient(0deg, rgba(180,200,120,0.05) 0px, rgba(180,200,120,0.05) 1px, transparent 1px, transparent 11px)",
  aigc:   "repeating-linear-gradient(135deg, rgba(140,160,220,0.06) 0px, rgba(140,160,220,0.06) 1px, transparent 1px, transparent 9px)",
  "aigc-video": "repeating-linear-gradient(120deg, rgba(150,180,255,0.07) 0px, rgba(150,180,255,0.07) 1px, transparent 1px, transparent 8px)",
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
      const imageItem = imagePool[0];
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
        const bg = colors[0];
        worksPreviewImg.style.setProperty("--preview-image", "none");
        worksPreviewImg.style.setProperty("--preview-position", "center");
        worksPreviewImg.style.setProperty("--preview-fallback", `${pattern}, ${bg}`);
      }
    }
    if (worksPreview) {
      worksPreview.classList.add("is-visible");
    }
    const rect = row.getBoundingClientRect();
    previewTarget.x = rect.left + rect.width * 0.67 - 120;
    previewTarget.y = rect.top + rect.height * 0.32;
    if (!previewRaf) previewRaf = requestAnimationFrame(animatePreview);
  });

  row.addEventListener("mousemove", (e) => {
    const rect = row.getBoundingClientRect();
    const anchorX = rect.left + rect.width * 0.67 - 120;
    const anchorY = rect.top + rect.height * 0.32;
    const driftX = (e.clientX - (rect.left + rect.width * 0.5)) * 0.38;
    const driftY = (e.clientY - (rect.top + rect.height * 0.5)) * 0.42;
    previewTarget.x = anchorX + driftX;
    previewTarget.y = anchorY + driftY;
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

// Work gallery image and text data are loaded from site-data.js.

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
        <img src="${item.src}" alt="" decoding="async">
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
        <img src="${item.src}" alt="" decoding="async">
      </figure>
    </section>
    <section class="work-detail-full">
      <figure class="work-detail-full-figure" style="--gallery-position: ${item.position || "center"};">
        <img src="${item.src}" alt="" decoding="async">
      </figure>
    </section>
  `;
  workGallery?.style.setProperty("--work-detail-reveal", "0");
};

const updateWorkDetailReveal = () => {
  if (!workGallery || galleryMode !== "detail") return;
  const figure = workGallery.querySelector(".work-detail-full-figure");
  if (!figure) return;

  const galleryRect = workGallery.getBoundingClientRect();
  const figureRect = figure.getBoundingClientRect();
  const revealLine = galleryRect.top + galleryRect.height * 0.76;
  const revealDistance = Math.max(320, galleryRect.height * 0.5);
  const progress = Math.max(0, Math.min(1, (revealLine - figureRect.top) / revealDistance));
  workGallery.style.setProperty("--work-detail-reveal", progress.toFixed(4));
};

let workDetailRevealRaf = 0;
const queueWorkDetailReveal = () => {
  if (workDetailRevealRaf) return;
  workDetailRevealRaf = window.requestAnimationFrame(() => {
    workDetailRevealRaf = 0;
    updateWorkDetailReveal();
  });
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
  queueWorkDetailReveal();
  playUiTone("click");
};

const returnToGalleryIndex = () => {
  if (!workGallery) return;
  galleryMode = "index";
  workGallery.classList.remove("is-detail");
  if (workDetail) workDetail.innerHTML = "";
  workGallery.style.setProperty("--work-detail-reveal", "0");
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
  workGallery.style.setProperty("--work-detail-reveal", "0");
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
  workGallery.style.setProperty("--work-detail-reveal", "0");
};

document.querySelectorAll(".bottom-nav-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    const targetId = item.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    if (galleryOpen) closeWorkGallery();

    window.requestAnimationFrame(() => {
      const aboutTextProgress = 0.32;
      const scrollable = Math.max(0, target.scrollHeight - window.innerHeight);
      const servicesPaddingTop = target.id === "services"
        ? parseFloat(window.getComputedStyle(target).paddingTop || "0") || 0
        : 0;
      const top = target.id === "about"
        ? target.offsetTop + scrollable * aboutTextProgress
        : target.id === "services"
          ? target.offsetTop + servicesPaddingTop
        : target.offsetTop;

      window.scrollTo({
        top,
        behavior: reducedMotion ? "auto" : "smooth",
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
workGallery?.addEventListener("scroll", queueWorkDetailReveal, { passive: true });
window.addEventListener("resize", () => {
  if (!galleryOpen) return;
  measureGallery();
  queueGalleryRender();
  queueWorkDetailReveal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wechatModal?.classList.contains("is-open")) {
    closeWechatModal();
    return;
  }
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
    { threshold: 0.04, rootMargin: "0px 0px -4% 0px" }
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
  { threshold: 0.02, rootMargin: "0px 0px -6% 0px" }
);

document.querySelectorAll(".about-rows, #services, #works, #contact").forEach((sec) => {
  revealChildObserver.observe(sec);
});

if (reducedMotion) {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
}

const initServicesEntryGridScan = (canvas) => {
  if (!canvas || typeof THREE === "undefined") return null;

  const card = canvas.closest(".services-entry-card") || canvas;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const uniforms = {
    iResolution: { value: new THREE.Vector3(1, 1, 1) },
    iTime: { value: 0 },
    uOpen: { value: 0 },
    uInside: { value: 0 },
    uProgress: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec3 iResolution;
      uniform float iTime;
      uniform float uOpen;
      uniform float uInside;
      uniform float uProgress;
      uniform vec2 uPointer;
      varying vec2 vUv;

      float smoother01(float a, float b, float x) {
        float t = clamp((x - a) / max(1e-5, b - a), 0.0, 1.0);
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
      }

      float gridMask(vec2 uv, float thickness) {
        vec2 f = fract(uv);
        vec2 a = min(f, 1.0 - f);
        vec2 w = max(fwidth(uv), vec2(0.0008));
        vec2 line = 1.0 - smoothstep(thickness * w, thickness * w + w * 1.45, a);
        return max(line.x, line.y);
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 fragCoord = vUv * iResolution.xy;
        vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
        float open = smoothstep(0.0, 1.0, uOpen);
        float inside = smoothstep(0.0, 1.0, uInside);

        vec3 ro = vec3(0.0, 0.0, -0.54 - open * 0.24);
        vec3 rd = normalize(vec3(p * 0.86, 2.18 + open * 0.44));

        float tilt = uPointer.y * mix(0.12, 0.26, open);
        float yaw = uPointer.x * mix(0.1, 0.24, open);
        float cR = cos(tilt), sR = sin(tilt);
        rd.yz = mat2(cR, -sR, sR, cR) * rd.yz;
        float cY = cos(yaw), sY = sin(yaw);
        rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;
        rd.xy += uPointer * (0.04 + open * 0.08) * rd.z;

        float minT = 1e20;
        vec2 gridUV = vec2(0.0);
        vec3 hit = vec3(0.0);
        float hitSide = 0.0;

        for (int i = 0; i < 4; i++) {
          float isY = float(i < 2);
          float wall = mix(-0.56, 0.56, float(i)) * isY + mix(-1.02, 1.02, float(i - 2)) * (1.0 - isY);
          float num = wall - (isY * ro.y + (1.0 - isY) * ro.x);
          float den = isY * rd.y + (1.0 - isY) * rd.x;
          float t = num / den;
          vec3 h = ro + rd * t;
          bool use = t > 0.0 && t < minT && h.z > 0.0 && h.z < 6.4;
          minT = use ? t : minT;
          hit = use ? h : hit;
          gridUV = use ? mix(h.xz, h.yz, 1.0 - isY) / mix(0.105, 0.082, open) : gridUV;
          hitSide = use ? isY : hitSide;
        }

        float dist = length(hit - ro);
        float travel = iTime * (0.34 + open * 1.55) + uProgress * 4.8;
        gridUV.y -= travel;
        gridUV += vec2(
          sin(gridUV.y * 2.7 + iTime * 1.8),
          cos(gridUV.x * 2.3 - iTime * 1.6)
        ) * 0.012;

        float lines = gridMask(gridUV, 1.0);
        float redBlue = gridMask(gridUV + vec2(0.035, -0.018), 0.92);
        float fade = exp(-dist * 0.74) * smoothstep(6.4, 0.1, hit.z);
        float centerVoid = smoothstep(0.18, 1.8, hit.z);

        float cycle = mod(iTime + uProgress * 1.35, 3.8);
        float phase = cycle < 1.9 ? cycle / 1.9 : 1.0 - (cycle - 1.9) / 1.9;
        phase = mix(phase, fract(iTime * 0.52 + uProgress * 1.4), open * 0.55);
        float scanZ = phase * 5.8;
        float dz = abs(hit.z - scanZ);
        float scan = exp(-0.5 * dz * dz / (0.22 * 0.22));
        float aura = exp(-0.5 * dz * dz / (0.62 * 0.62)) * 0.32;
        float taper = smoother01(0.02, 0.22, phase) * (1.0 - smoother01(0.82, 1.0, phase));

        vec3 base = vec3(0.02, 0.075, 0.068);
        vec3 lineCol = vec3(0.286, 0.768, 0.690) * lines;
        vec3 fringe = vec3(0.15, 0.86, 0.76) * redBlue * 0.42 + vec3(0.72, 1.0, 0.92) * lines * 0.16;
        vec3 scanCol = vec3(0.286, 0.768, 0.690) * (scan * 0.72 + aura * 0.96) * taper;
        vec3 color = base * centerVoid + (lineCol + fringe + scanCol) * fade;
        color += vec3(hash(fragCoord + iTime * 96.0) - 0.5) * 0.018;

        float alpha = clamp((0.44 + lines * 0.74 + scan * 0.48 + aura * 0.3) * fade + 0.14 * centerVoid, 0.0, 0.98);
        gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    extensions: {
      derivatives: true,
    },
  });

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  let targetOpen = 0;
  let currentOpen = 0;
  let targetInside = 0;
  let currentInside = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  let raf = 0;
  let pointerInside = false;
  let lastPointerAt = 0;
  let lastPointerX = 0;
  let lastPointerY = 0;
  const pointerTarget = new THREE.Vector2(0, 0);
  const pointerCurrent = new THREE.Vector2(0, 0);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    uniforms.iResolution.value.set(width, height, renderer.getPixelRatio());
  };

  const onPointerMove = (event) => {
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    const rect = card.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    pointerInside = inside;
    lastPointerAt = performance.now();
    if (inside) {
      pointerTarget.set(
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
        -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1)
      );
    } else {
      pointerTarget.set(0, 0);
    }
  };

  const onPointerLeave = () => {
    pointerInside = false;
    lastPointerAt = 0;
    pointerTarget.set(0, 0);
  };

  const tick = (now) => {
    if (pointerInside && lastPointerAt && now - lastPointerAt > 420) {
      const rect = card.getBoundingClientRect();
      const stillInside =
        lastPointerX >= rect.left &&
        lastPointerX <= rect.right &&
        lastPointerY >= rect.top &&
        lastPointerY <= rect.bottom;
      if (!stillInside) {
        pointerInside = false;
        pointerTarget.set(0, 0);
      }
    }
    currentOpen += (targetOpen - currentOpen) * 0.075;
    currentInside += (targetInside - currentInside) * 0.075;
    currentProgress += (targetProgress - currentProgress) * 0.08;
    pointerCurrent.lerp(pointerTarget, pointerInside ? 0.08 : 0.12);

    uniforms.iTime.value = now / 1000;
    uniforms.uOpen.value = currentOpen;
    uniforms.uInside.value = currentInside;
    uniforms.uProgress.value = currentProgress;
    uniforms.uPointer.value.copy(pointerCurrent);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  let resizeObserver = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  }
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", onPointerLeave);
  document.addEventListener("mouseleave", onPointerLeave);
  card.addEventListener("pointerleave", onPointerLeave);
  resize();
  raf = requestAnimationFrame(tick);

  return {
    setProgress(open, inside, progress) {
      targetOpen = Math.min(1, Math.max(0, open));
      targetInside = Math.min(1, Math.max(0, inside));
      targetProgress = Math.min(1, Math.max(0, progress));
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
      card.removeEventListener("pointerleave", onPointerLeave);
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    },
  };
};

const initServicePanelShaders = (panels) => {
  if (!panels?.length || reducedMotion) return null;

  const palettes = [
    [[0.18, 0.18, 0.2], [0.92, 0.34, 0.18], [1.0, 0.78, 0.32]],
    [[0.22, 0.08, 0.08], [0.95, 0.22, 0.18], [1.0, 0.64, 0.42]],
    [[0.28, 0.24, 0.2], [0.72, 0.48, 0.22], [0.9, 0.76, 0.46]],
    [[0.08, 0.16, 0.14], [0.2, 0.62, 0.45], [0.74, 1.0, 0.7]],
    [[0.48, 0.32, 0.16], [1.0, 0.62, 0.24], [1.0, 0.88, 0.52]],
    [[0.1, 0.1, 0.16], [0.42, 0.24, 0.95], [0.9, 0.58, 1.0]],
  ];

  const vertexSource = `#version 300 es
    precision highp float;
    in vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `#version 300 es
    precision highp float;
    out vec4 O;
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 colorLow;
    uniform vec3 colorMid;
    uniform vec3 colorHigh;
    #define FC gl_FragCoord.xy
    #define R resolution
    #define T time
    #define S smoothstep

    float rnd(vec2 p) {
      p = fract(p * vec2(12.9898, 78.233));
      p += dot(p, p + 34.56);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 u = S(i, i + 1.0, p);
      vec2 k = vec2(1.0, 0.0);
      float a = rnd(i);
      float b = rnd(i + k);
      float c = rnd(i + k.yx);
      float d = rnd(i + k.xx);
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float snoise(vec3 p) {
      float t = T * 0.5;
      for (int i = 0; i < 3; i++) {
        p += cos(p.zyx * 3.0 + vec3(0.0, t, 1.6)) / 3.0;
        p += sin(p.zyx + t + vec3(t, 1.6, 0.0)) / 2.0;
        p += sin(p.zyx + t * 2.0 + vec3(0.0, 1.6, t)) / 6.0;
        p *= 1.75;
      }
      p += fract(sin(p + vec3(13.0, 7.0, 3.0)) * 5e5) * 0.04;
      return fract(noise(p.xy) * noise(p.yz));
    }

    vec2 layeredNoise(vec3 p) {
      return vec2(snoise(p - sin(T * 0.1)), snoise(p * 4.0));
    }

    void main() {
      vec2 uv = FC / R;
      vec2 flowUv = vec2(uv.x * 1.16, uv.y * 0.92);
      vec2 cn = layeredNoise(flowUv.xyx + vec3(T * 0.015, -T * 0.018, T * 0.01));
      vec3 col = vec3(0.0);
      col = mix(col, colorLow, cn.x);
      col = mix(col, mix(colorMid, colorHigh, cn.y), cn.y);
      col = S(0.0, 1.0, col);
      col = tanh(col * col * col);
      col = sqrt(max(col, vec3(0.0)));

      vec2 c = FC / R;
      c *= 1.0 - c.yx;
      float vig = c.x * c.y * 25.0;
      vig = pow(max(vig, 0.0), 0.42);
      float grain = rnd(FC + T * 92.0) - 0.5;
      col = col * vig * 0.74 + grain * 0.014;
      O = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const renderers = panels.map((panel, index) => {
    const canvas = document.createElement("canvas");
    canvas.className = "service-panel-shader";
    canvas.setAttribute("aria-hidden", "true");
    panel.prepend(canvas);

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) return null;

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return null;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const palette = palettes[index % palettes.length];
    return {
      canvas,
      gl,
      program,
      buffer,
      resolution: gl.getUniformLocation(program, "resolution"),
      time: gl.getUniformLocation(program, "time"),
      colorLow: gl.getUniformLocation(program, "colorLow"),
      colorMid: gl.getUniformLocation(program, "colorMid"),
      colorHigh: gl.getUniformLocation(program, "colorHigh"),
      palette,
    };
  }).filter(Boolean);

  if (!renderers.length) return null;

  const resize = () => {
    renderers.forEach(({ canvas, gl }) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    });
  };

  let raf = 0;
  const render = (now) => {
    resize();
    renderers.forEach((item, index) => {
      const { canvas, gl, program, resolution, time, colorLow, colorMid, colorHigh, palette } = item;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, item.buffer);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now * 0.001 + index * 12.5);
      gl.uniform3fv(colorLow, palette[0]);
      gl.uniform3fv(colorMid, palette[1]);
      gl.uniform3fv(colorHigh, palette[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
    raf = requestAnimationFrame(render);
  };

  resize();
  raf = requestAnimationFrame(render);
  window.addEventListener("resize", resize);

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderers.forEach(({ canvas, gl, program, buffer }) => {
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        canvas.remove();
      });
    },
  };
};

const initServicesScrollStory = () => {
  const section = document.querySelector(".services-scroll-story");
  if (!section) return;

  const stage = section.querySelector(".services-sticky");
  const entryGrid = section.querySelector("#services-entry-gridscan");
  const entryTitle = section.querySelector(".services-entry-title");
  const panels = Array.from(section.querySelectorAll(".service-text-panel"));
  if (!stage || !entryTitle || !panels.length) return;
  const entryGridScan = initServicesEntryGridScan(entryGrid);
  const panelShaders = initServicePanelShaders(panels);

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

      const glyphDelay = Math.min(index * stagger, 0.14);
      const enter = smooth(clamp01((phase - glyphDelay) / 0.38));
      const exit = smooth(clamp01((phase - 0.8 - glyphDelay * 0.08) / 0.24));
      const amount = enter * (1 - exit);
      const blur = 14 * (1 - amount) + exit * 8;
      const y = (1 - enter) * travel * 0.72 - exit * travel * 0.55;
      glyph.style.opacity = amount.toFixed(3);
      glyph.style.filter = `blur(${blur.toFixed(2)}px)`;
      glyph.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    });
  };

  const setPanel = (panel, local, index) => {
    const enter = smooth(clamp01((local + 0.12) / 0.78));
    const exit = smooth(clamp01((local - 0.66) / 0.46));
    const inRange = local >= -0.14 && local <= 1.08 ? 1 : 0;
    const y = local < 0.62
      ? 104 - enter * 104
      : -exit * 132;
    const clarity = smooth(clamp01((local - 0.34) / 0.24)) * (1 - smooth(clamp01((local - 0.76) / 0.24)));
    const z = -130 + clarity * 230 - exit * 52;
    const scale = local < 0.62
      ? 0.52 + enter * 0.44 + clarity * 0.34
      : 1.3 - exit * 0.9;
    const direction = index % 2 === 0 ? 1 : -1;
    const rotate = local < 0.62
      ? direction * (-5.2 + enter * 4.8)
      : direction * (-0.4 + exit * 4.8);
    const opacity = Math.min(enter * 1.12, 1) * (1 - exit) * inRange;
    const contentOpacity = smooth(clamp01((local - 0.3) / 0.26)) * (1 - smooth(clamp01((local - 0.76) / 0.22)));

    panel.style.setProperty("--service-panel-y", `${y.toFixed(2)}vh`);
    panel.style.setProperty("--service-panel-z", `${z.toFixed(2)}px`);
    panel.style.setProperty("--service-panel-scale", scale.toFixed(4));
    panel.style.setProperty("--service-card-rotate", `${rotate.toFixed(3)}deg`);
    panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));
    panel.style.setProperty("--service-content-opacity", contentOpacity.toFixed(3));

    if (panelGlyphs[index]) {
      renderGlyphs(panelGlyphs[index].title, local + 0.04, 0.004, 14);
      renderGlyphs(panelGlyphs[index].body, local - 0.02, 0.0012, 12);
    }
  };

  const readProgress = () => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    servicesInView = rect.top < window.innerHeight && rect.bottom > 0;
    targetProgress = reducedMotion ? 1 : clamp01(-rect.top / travel);
  };

  const render = () => {
    currentProgress += (targetProgress - currentProgress) * 0.105;
    if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;

    const progress = currentProgress;
    const open = smooth(clamp01(progress / 0.22));
    const inside = smooth(clamp01((progress - 0.13) / 0.22));
    const outro = smooth(clamp01((progress - 0.82) / 0.18));

    section.style.setProperty("--services-progress", progress.toFixed(4));
    section.style.setProperty("--services-open", open.toFixed(4));
    section.style.setProperty("--services-inside", inside.toFixed(4));
    section.style.setProperty("--services-outro", outro.toFixed(4));
    section.style.setProperty("--services-slab-opacity", (inside * 0.96).toFixed(3));
    document.body.classList.toggle("services-white-stage", servicesInView && inside > 0.58 && outro < 0.55);
    if (entryGridScan) entryGridScan.setProgress(open, inside, progress);

    panels.forEach((panel, index) => {
      const start = 0.19 + index * 0.085;
      const step = 0.19;
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

const initServicesImageTrail = () => {
  const stage = document.querySelector(".services-scroll-story .services-sticky");
  const layer = stage?.querySelector(".services-image-trail");
  const entryCard = stage?.querySelector(".services-entry-card");
  const images = Array.from(layer?.querySelectorAll(".content__img") || []);
  if (!stage || !layer || !images.length || reducedMotion) return;

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const threshold = 74;
  let mousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let cacheMousePos = { x: 0, y: 0 };
  let imageIndex = -1;
  let zIndex = 1;
  let raf = 0;
  let hasStarted = false;
  let idleFrames = 0;

  const getLocalPos = (event) => {
    const rect = stage.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const isInsideEntryCard = (event) => {
    if (!entryCard) return false;
    const rect = entryCard.getBoundingClientRect();
    const gutter = 18;
    return (
      event.clientX >= rect.left - gutter &&
      event.clientX <= rect.right + gutter &&
      event.clientY >= rect.top - gutter &&
      event.clientY <= rect.bottom + gutter
    );
  };

  const stageInView = () => {
    const rect = stage.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const showNextImage = () => {
    imageIndex = (imageIndex + 1) % images.length;
    zIndex = zIndex > 80 ? 2 : zIndex + 1;

    const image = images[imageIndex];
    const inner = image.querySelector(".content__img-inner");
    const rect = image.getBoundingClientRect();
    const width = rect.width || 160;
    const height = rect.height || 144;
    const dx = mousePos.x - cacheMousePos.x;
    const dy = mousePos.y - cacheMousePos.y;
    const rotation = clamp(dx * 0.045, -9, 9);
    const driftX = clamp(dx * 0.64, -84, 84);
    const driftY = clamp(dy * 0.64, -84, 84);
    const startX = cacheMousePos.x - width / 2;
    const startY = cacheMousePos.y - height / 2;
    const endX = mousePos.x - width / 2;
    const endY = mousePos.y - height / 2;

    window.clearTimeout(image._trailFadeTimer);
    window.clearTimeout(image._trailDoneTimer);
    image.style.transition = "none";
    image.style.zIndex = String(zIndex);
    image.style.opacity = "0.88";
    image.style.filter = "blur(8px) saturate(0.7) brightness(0.72)";
    image.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(0.62) rotate(${rotation - 5}deg)`;
    if (inner) {
      inner.style.transition = "none";
      inner.style.transform = "scale(1.2)";
      inner.style.filter = "brightness(1.24) contrast(1.08)";
    }

    window.requestAnimationFrame(() => {
      image.style.transition = "transform 560ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease, filter 520ms ease";
      image.style.opacity = "0.84";
      image.style.filter = "blur(0) saturate(0.94) brightness(0.92)";
      image.style.transform = `translate3d(${endX}px, ${endY}px, 0) scale(1) rotate(${rotation}deg)`;
      if (inner) {
        inner.style.transition = "transform 560ms cubic-bezier(0.16, 1, 0.3, 1), filter 520ms ease";
        inner.style.transform = "scale(1.04)";
        inner.style.filter = "brightness(1) contrast(1.04)";
      }
    });

    image._trailFadeTimer = window.setTimeout(() => {
      image.style.opacity = "0";
      image.style.filter = "blur(8px) saturate(0.72) brightness(0.72)";
      image.style.transform = `translate3d(${endX + driftX}px, ${endY + driftY}px, 0) scale(0.3) rotate(${rotation + driftX * 0.04}deg)`;
      if (inner) inner.style.transform = "scale(1.16)";
    }, 380);

    image._trailDoneTimer = window.setTimeout(() => {
      image.style.transform = "translate3d(-999px, -999px, 0) scale(0.7)";
    }, 960);
  };

  const render = () => {
    raf = 0;
    if (!stageInView()) {
      hasStarted = false;
      return;
    }

    cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.12);
    cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.12);

    const distance = Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);
    if (distance > threshold) {
      showNextImage();
      lastMousePos = { ...mousePos };
      idleFrames = 0;
    } else {
      idleFrames += 1;
    }

    if (idleFrames > 28) {
      hasStarted = false;
      return;
    }

    raf = window.requestAnimationFrame(render);
  };

  stage.addEventListener("pointermove", (event) => {
    mousePos = getLocalPos(event);
    if (isInsideEntryCard(event)) {
      lastMousePos = { ...mousePos };
      return;
    }

    if (!hasStarted) {
      hasStarted = true;
      idleFrames = 0;
      cacheMousePos = { ...mousePos };
      lastMousePos = { ...mousePos };
      if (!raf) raf = window.requestAnimationFrame(render);
    } else {
      idleFrames = 0;
    }
  });

  stage.addEventListener("pointerleave", () => {
    hasStarted = false;
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  });
};

initServicesImageTrail();

// Works statement enters as a scroll-linked fade instead of an intersection pop.
(function initWorksStatementMotion() {
  const section = document.querySelector(".works-section");
  if (!section) return;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smooth = (value) => value * value * value * (value * (value * 6 - 15) + 10);
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const raw = (window.innerHeight * 1.42 - rect.top) / (window.innerHeight * 0.92);
    section.style.setProperty("--works-enter", smooth(clamp01(raw)).toFixed(4));
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();

const scrambleTextChars = ".:·_";
const scrambleTextRadius = 112;
const scrambleTextDuration = 780;
const scrambleTextSpeed = 0.48;
let scrambledTextCleanups = [];

const restoreScrambledTextNodes = () => {
  scrambledTextCleanups.forEach((cleanup) => cleanup());
  scrambledTextCleanups = [];
};

const splitScrambledNode = (node) => {
  const children = Array.from(node.childNodes).map((child) => child.cloneNode(true));
  const sourceText = node.textContent || "";
  if (!sourceText.trim()) return [];

  node.replaceChildren();
  node.classList.add("scrambled-text");

  const chars = [];
  const appendScrambledText = (target, text) => {
    Array.from(text).forEach((char) => {
      if (/\s/.test(char)) {
        target.appendChild(document.createTextNode(char));
        return;
      }

      const span = document.createElement("span");
      span.className = "scramble-char";
      span.textContent = char;
      span.dataset.content = char;
      span.dataset.scrambleUntil = "0";
      target.appendChild(span);
      chars.push(span);
    });
  };

  const rebuild = (sourceNode, target) => {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      appendScrambledText(target, sourceNode.textContent || "");
      return;
    }

    if (sourceNode.nodeType !== Node.ELEMENT_NODE) return;

    const clone = sourceNode.cloneNode(false);
    target.appendChild(clone);
    sourceNode.childNodes.forEach((child) => rebuild(child, clone));
  };

  children.forEach((child) => rebuild(child, node));

  return chars;
};

const initScrambledText = () => {
  restoreScrambledTextNodes();
  if (reducedMotion) return;

  document.querySelectorAll(".js-scrambled-text").forEach((node) => {
    const source = node.innerHTML;
    const chars = splitScrambledNode(node);
    if (!chars.length) return;

    let raf = 0;

    const render = () => {
      raf = 0;
      const now = performance.now();
      let hasActive = false;

      chars.forEach((charNode) => {
        const endAt = Number(charNode.dataset.scrambleUntil || 0);
        if (endAt > now) {
          hasActive = true;
          charNode.textContent = scrambleTextChars[Math.floor(Math.random() * scrambleTextChars.length)];
          return;
        }
        charNode.textContent = charNode.dataset.content || "";
      });

      if (hasActive) {
        const delay = Math.max(1, 1000 / (24 + scrambleTextSpeed * 48));
        window.setTimeout(() => {
          if (!raf) raf = requestAnimationFrame(render);
        }, delay);
      }
    };

    const handleMove = (event) => {
      const now = performance.now();
      chars.forEach((charNode) => {
        const rect = charNode.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance >= scrambleTextRadius) return;
        const strength = 1 - distance / scrambleTextRadius;
        const endAt = now + scrambleTextDuration * strength;
        charNode.dataset.scrambleUntil = String(Math.max(Number(charNode.dataset.scrambleUntil || 0), endAt));
      });

      if (!raf) raf = requestAnimationFrame(render);
    };

    node.addEventListener("pointermove", handleMove);
    scrambledTextCleanups.push(() => {
      if (raf) cancelAnimationFrame(raf);
      node.removeEventListener("pointermove", handleMove);
      node.classList.remove("scrambled-text");
      node.innerHTML = source;
    });
  });
};

initScrambledText();

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
  const waterProgress = heroStep > 0
    ? 1
    : (HERO_INTRO_TICKS - heroIntroBudget) / HERO_INTRO_TICKS;

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
    heroStage.style.setProperty("--hero-water-progress", waterProgress.toFixed(4));
    heroStage.style.setProperty("--hero-tail-fade", tailFade.toFixed(4));
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
      // Only show first 5 cards; hide the rest
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
    const period = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Shanghai",
      hour: "numeric",
      hour12: true,
    }).formatToParts(now).find((part) => part.type === "dayPeriod")?.value || "";
    beijingTimeNode.innerHTML = `<span class="top-meta-period">${period.toUpperCase()}</span>${timeFormatter.format(now)}`;
  }

  if (beijingDateNode) {
    beijingDateNode.textContent = dateFormatter.format(now).replace(/-/g, ".");
  }
};

// Frozen: hero WebGL water surface ------------------------------------------
const initWaterSurface = (canvas) => {
  if (!canvas || reducedMotion) return;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  // ── shared quad ──────────────────────────────────────────────────────────
  const quadVert = `
    attribute vec2 a_pos;
    varying vec2 v_uv;
    void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // ── Pass 1: wave-equation simulation (ping-pong FBO) ─────────────────────
  const simFrag = `
    precision highp float;
    uniform sampler2D u_prev;
    uniform vec2  u_res;
    uniform vec2  u_mouse;
    uniform vec2  u_last_mouse;
    uniform vec2  u_velocity;
    uniform float u_viscosity;
    uniform float u_speed;
    uniform float u_size;
    uniform int   u_frame;
    varying vec2 v_uv;

    float sdLine(vec2 p, vec2 a, vec2 b) {
      float vel = clamp(length(u_velocity), 0.5, 1.5);
      vec2 pa = p - a, ba = b - a;
      float len2 = dot(ba, ba);
      if (len2 < 0.000001) return length(pa) / vel;
      float h = clamp(dot(pa,ba)/len2, 0.0, 1.0);
      return length(pa - ba*h) / vel;
    }

    void main() {
      vec2 spd = vec2(u_speed) / u_res;
      vec4 self = texture2D(u_prev, v_uv);

      float top    = texture2D(u_prev, v_uv - spd.yx).r;
      float right  = texture2D(u_prev, v_uv + spd.xy).r;
      float bottom = texture2D(u_prev, v_uv + spd.yx).r;
      float left   = texture2D(u_prev, v_uv - spd.xy).r;

      float velocity = clamp(length(u_velocity), 0.1, 1.0);
      float shade = smoothstep(0.02 * u_size * velocity, 0.0,
                               sdLine(v_uv, u_last_mouse, u_mouse));
      float d = shade * u_viscosity;
      d += -(self.g - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
      d *= 0.99;
      d *= float(u_frame > 5);
      d = d * 0.5 + 0.5;

      gl_FragColor = vec4(d, self.r, 0.0, 1.0);
    }
  `;

  // ── Pass 2: render water surface — black base, teal from ripple energy, unified displacement ──
  const renderFrag = `
    precision highp float;
    uniform sampler2D u_ripple;
    uniform sampler2D u_title;
    uniform vec2  u_sim_res;
    uniform float u_scroll;
    uniform float u_disp;
    uniform float u_light;
    uniform float u_shadow;
    varying vec2 v_uv;

    const float bias  = 0.2;
    const float scale = 10.0;
    const float power = 10.1;

    vec4 blurRipple(vec2 uv) {
      vec2 off = vec2(1.333) / u_sim_res;
      vec4 c = vec4(0.0);
      c += texture2D(u_ripple, uv) * 0.294;
      c += texture2D(u_ripple, uv + off) * 0.353;
      c += texture2D(u_ripple, uv - off) * 0.353;
      return c;
    }

    float bumpMap(vec2 uv, float h) {
      return 1.0 - blurRipple(uv).r * h;
    }

    vec4 renderPass(vec2 uv, inout float distortion) {
      vec3 surfacePos = vec3(uv, 0.0);
      vec3 ray = normalize(vec3(uv, 1.0));
      vec3 lightPos = vec3(2.0, 3.0, -3.0);
      vec3 normal = vec3(0.0, 0.0, -1.0);
      vec2 sd = vec2(0.005, 0.0);

      float fx = bumpMap(uv + sd.xy, 0.2);
      float fy = bumpMap(uv + sd.yx, 0.2);
      float f  = bumpMap(uv, 0.2);
      distortion = f;

      fx = (fx - f) / sd.x;
      fy = (fy - f) / sd.x;
      normal = normalize(normal + vec3(fx, fy, 0.0) * 0.2);

      float shade = bias + scale * pow(1.0 + dot(normalize(surfacePos - vec3(uv, -3.0)), normal), power);
      vec3 lightV = lightPos - surfacePos;
      float lightDist = max(length(lightV), 0.001);
      lightV /= lightDist;

      vec3 lightColor = vec3(1.0 - u_light / 20.0);
      float brightness = 1.0 - u_light / 40.0;
      float falloff = 0.1;
      float attenuation = (0.75 + u_light / 40.0) / (1.0 + lightDist * lightDist * falloff);
      float diffuse  = max(dot(normal, lightV), 0.0);
      float specular = pow(max(dot(reflect(-lightV, normal), -ray), 0.0), 15.0) * 0.1;

      float metalness = 1.0 - blurRipple(uv).r;
      metalness *= metalness;

      vec3 texCol = vec3(0.5) * brightness;
      vec3 color = (texCol * (diffuse * vec3(0.9) * 2.0 + 0.5)
                  + lightColor * specular * f * 2.0 * metalness) * attenuation * 2.0;
      return vec4(color, 1.0);
    }

    void main() {
      float distortion;
      vec4 reflections = renderPass(v_uv, distortion);

      float rippleVal = blurRipple(v_uv).r;
      // wave energy: deviation from neutral 0.5 → 0 at rest, 1 at peak
      float energy = clamp(abs(rippleVal - 0.5) * 3.2, 0.0, 1.0);

      float ripple = 0.16 + distortion * 0.1 - 0.1 + reflections.r * 0.7;

      // base: near-black with imperceptible teal tint
      vec3 base = vec3(0.014, 0.022, 0.020);

      // teal palette — only emerges when there is wave energy
      vec3 tealDim    = vec3(0.0,   0.18,  0.17);
      vec3 tealMid    = vec3(0.0,   0.48,  0.44);
      vec3 tealBright = vec3(0.20,  0.82,  0.74);
      vec3 tealPeak   = vec3(0.55,  0.96,  0.88);

      vec3 tealCol = mix(tealDim,    tealMid,    smoothstep(0.0,  0.35, energy));
      tealCol      = mix(tealCol,    tealBright, smoothstep(0.35, 0.72, energy));
      tealCol      = mix(tealCol,    tealPeak,   smoothstep(0.72, 1.00, energy));

      // blend black → teal driven by energy
      vec3 col = mix(base, tealCol, energy * 0.90);

      // specular reflection contributes a teal-tinted highlight
      col += reflections.rgb * vec3(0.22, 0.68, 0.62) * energy;

      float lights = max(0.0, ripple - 0.5);
      col += lights * (u_light / 10.0) * vec3(0.30, 1.0, 0.90);
      float shadow = max(0.0, 1.0 - (ripple + 0.5));
      col -= shadow * (u_shadow / 10.0);

      // title: wide-kernel blur of ripple height → smooth 2D displacement
      // height deviation from 0.5 is unipolar (no sign flip) → text floats with waves, no oscillation
      vec2 px = vec2(1.0) / u_sim_res;
      float h00 = texture2D(u_ripple, v_uv).r;
      float h10 = texture2D(u_ripple, v_uv + vec2( px.x * 8.0, 0.0)).r;
      float hm1 = texture2D(u_ripple, v_uv + vec2(-px.x * 8.0, 0.0)).r;
      float h01 = texture2D(u_ripple, v_uv + vec2(0.0,  px.y * 8.0)).r;
      float h0m = texture2D(u_ripple, v_uv + vec2(0.0, -px.y * 8.0)).r;
      // wide gaussian: smooth height avoids high-freq oscillation
      float hSmooth = h00 * 0.36 + (h10 + hm1 + h01 + h0m) * 0.16;
      // deviation from neutral 0.5 drives displacement magnitude and direction
      float hDev = hSmooth - 0.5;
      // direction: tilt toward the wave — use local gradient of the smooth field
      float gx = h10 - hm1;
      float gy = h01 - h0m;
      vec2 titleUv = clamp(v_uv + vec2(gx, gy) * hDev * (u_disp * 0.4), 0.001, 0.999);
      vec4 title = texture2D(u_title, titleUv);
      col = mix(col, title.rgb, title.a * 0.92);

      float vign = 1.0 - smoothstep(0.35, 1.1, length(v_uv - 0.5) * 1.6);
      col *= vign * 0.88 + 0.12;

      float alpha = (1.0 - u_scroll * 0.82) * 0.92;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
    }
  `;

  // ── compile helper ────────────────────────────────────────────────────────
  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(sh));
    }
    return sh;
  };
  const makeProgram = (fSrc) => {
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, quadVert));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fSrc));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(p));
    }
    return p;
  };

  const simProg    = makeProgram(simFrag);
  const renderProg = makeProgram(renderFrag);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const simAPos    = gl.getAttribLocation(simProg,    "a_pos");
  const renderAPos = gl.getAttribLocation(renderProg, "a_pos");

  const bindQuad = (loc) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  };

  // ── FBO helpers ───────────────────────────────────────────────────────────
  const makeFBO = (w, h) => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // init to neutral 0.5 (=0x80) — wave equation resting state is r=0.5, g=0.5
    const init = new Uint8Array(w * h * 4).fill(0x80);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, init);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex, fb };
  };

  let simW = 0, simH = 0;
  let fboA, fboB;
  let read, write;

  const resizeFBOs = (w, h) => {
    if (fboA) { gl.deleteTexture(fboA.tex); gl.deleteFramebuffer(fboA.fb); }
    if (fboB) { gl.deleteTexture(fboB.tex); gl.deleteFramebuffer(fboB.fb); }
    fboA = makeFBO(w, h);
    fboB = makeFBO(w, h);
    simW = w; simH = h;
    // update read/write references to the new FBOs
    read = fboA; write = fboB;
  };

  // ── title texture ─────────────────────────────────────────────────────────
  const titleTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, titleTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const titleCanvas2d = document.createElement("canvas");
  const updateTitleTexture = () => {
    const w = canvas.clientWidth  * Math.min(window.devicePixelRatio, 2);
    const h = canvas.clientHeight * Math.min(window.devicePixelRatio, 2);
    if (w < 4 || h < 4) return; // canvas not yet laid out
    titleCanvas2d.width  = w;
    titleCanvas2d.height = h;
    const ctx2d = titleCanvas2d.getContext("2d");
    ctx2d.clearRect(0, 0, w, h);
    const fontSize = Math.round(w * 0.088);
    ctx2d.font = `700 ${fontSize}px "Trench Slab", "Cabinet Grotesk", "Satoshi", system-ui, sans-serif`;
    ctx2d.fillStyle = "rgba(255,255,255,0.95)";
    ctx2d.textAlign = "center";
    ctx2d.textBaseline = "middle";
    ctx2d.fillText("LUCIAN J. YANG", w / 2, h / 2);
    gl.bindTexture(gl.TEXTURE_2D, titleTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, titleCanvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  };

  // ── resize ────────────────────────────────────────────────────────────────
  // Sim runs at half resolution for performance; render pass upscales via LINEAR
  const SIM_SCALE = 0.5;
  const resize = () => {
    const pr = Math.min(window.devicePixelRatio, 2);
    const w  = Math.round(canvas.clientWidth  * pr);
    const h  = Math.round(canvas.clientHeight * pr);
    if (w < 4 || h < 4) { requestAnimationFrame(resize); return; }
    canvas.width  = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    resizeFBOs(Math.round(w * SIM_SCALE), Math.round(h * SIM_SCALE));
    updateTitleTexture();
  };
  window.addEventListener("resize", resize);
  resize();

  document.fonts?.load?.('700 160px "Trench Slab"').then(() => {
    updateTitleTexture();
  }).catch(() => {});

  // ── cache uniform locations ───────────────────────────────────────────────
  const uSim = {
    prev:       gl.getUniformLocation(simProg, "u_prev"),
    res:        gl.getUniformLocation(simProg, "u_res"),
    mouse:      gl.getUniformLocation(simProg, "u_mouse"),
    lastMouse:  gl.getUniformLocation(simProg, "u_last_mouse"),
    velocity:   gl.getUniformLocation(simProg, "u_velocity"),
    viscosity:  gl.getUniformLocation(simProg, "u_viscosity"),
    speed:      gl.getUniformLocation(simProg, "u_speed"),
    size:       gl.getUniformLocation(simProg, "u_size"),
    frame:      gl.getUniformLocation(simProg, "u_frame"),
  };
  const uRender = {
    ripple:   gl.getUniformLocation(renderProg, "u_ripple"),
    title:    gl.getUniformLocation(renderProg, "u_title"),
    simRes:   gl.getUniformLocation(renderProg, "u_sim_res"),
    scroll:   gl.getUniformLocation(renderProg, "u_scroll"),
    disp:     gl.getUniformLocation(renderProg, "u_disp"),
    light:    gl.getUniformLocation(renderProg, "u_light"),
    shadow:   gl.getUniformLocation(renderProg, "u_shadow"),
  };

  // ── mouse state ───────────────────────────────────────────────────────────
  let mx = -1.0, my = -0.5, lmx = -1.1, lmy = -0.6;
  let velX = 0, velY = 0;
  let pointerSeeded = false;

  const onPointer = (e) => {
    const nx = e.clientX / window.innerWidth;
    const ny = 1.0 - e.clientY / window.innerHeight;
    if (!pointerSeeded) {
      // first move: seed both positions to avoid a teleport-line across the canvas
      mx = nx; my = ny; lmx = nx; lmy = ny;
      pointerSeeded = true;
      return;
    }
    lmx = mx; lmy = my;
    mx = nx; my = ny;
    velX = (mx - lmx) * window.innerWidth  / 16;
    velY = (my - lmy) * window.innerHeight / 16;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // ── render loop ───────────────────────────────────────────────────────────
  let frame = 0;
  let raf;

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const sp = parseFloat(heroStage?.style.getPropertyValue("--hero-scroll-progress") || "0");

    // auto-resize when canvas becomes visible after has-entered
    const pr = Math.min(window.devicePixelRatio, 2);
    const cw = Math.round(canvas.clientWidth * pr);
    const ch = Math.round(canvas.clientHeight * pr);
    if (cw > 4 && ch > 4 && (cw !== canvas.width || ch !== canvas.height)) {
      canvas.width = cw; canvas.height = ch;
      gl.viewport(0, 0, cw, ch);
      resizeFBOs(Math.round(cw * SIM_SCALE), Math.round(ch * SIM_SCALE));
      updateTitleTexture();
    }

    // ── sim pass ──
    gl.bindFramebuffer(gl.FRAMEBUFFER, write.fb);
    gl.viewport(0, 0, simW, simH);
    gl.useProgram(simProg);
    bindQuad(simAPos);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.tex);
    gl.uniform1i(uSim.prev,      0);
    gl.uniform2f(uSim.res,       simW, simH);
    gl.uniform2f(uSim.mouse,     mx,   my);
    gl.uniform2f(uSim.lastMouse, lmx,  lmy);
    gl.uniform2f(uSim.velocity,  velX, velY);
    gl.uniform1f(uSim.viscosity, 7.5);
    gl.uniform1f(uSim.speed,     5.0);
    gl.uniform1f(uSim.size,      1.25);
    gl.uniform1i(uSim.frame,     frame);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const tmp = read; read = write; write = tmp;
    velX *= 0.88;
    velY *= 0.88;

    // ── render pass ──
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(renderProg);
    bindQuad(renderAPos);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.tex);
    gl.uniform1i(uRender.ripple,  0);
    gl.uniform2f(uRender.simRes,  simW, simH);
    gl.uniform1f(uRender.scroll,  sp);
    gl.uniform1f(uRender.disp,    18.0);
    gl.uniform1f(uRender.light,   5.0);
    gl.uniform1f(uRender.shadow,  2.5);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, titleTex);
    gl.uniform1i(uRender.title, 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    frame++;
  };
  animate();

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", resize);
  };
  window.addEventListener("pagehide", cleanup, { once: true });
};

// Frozen: hero wheel-step sequence ------------------------------------------
// Hero section wheel hijack: discrete step-through of intro + 5 cards
// 2 intro ticks (water only) → 5 card steps → release to normal scroll
const isHeroStepControlActive = (deltaY = 0) => {
  if (!document.body.classList.contains("has-entered")) return false;
  if (orderedMode) return false;

  const rect = heroSection?.getBoundingClientRect();
  if (!rect) return false;

  const isInPinnedHero = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;
  if (!isInPinnedHero) return false;

  if (deltaY > 0) {
    return heroStep < HERO_CARD_COUNT || heroStepTarget < HERO_CARD_COUNT - HERO_RELEASE_EASING_GAP;
  }

  if (deltaY < 0) {
    const isNearPinnedTop = rect.top >= -window.innerHeight * 0.12;
    return isNearPinnedTop && (heroStep > 0 || heroIntroBudget < HERO_INTRO_TICKS);
  }

  return heroStep < HERO_CARD_COUNT || heroStep > 0 || heroIntroBudget < HERO_INTRO_TICKS;
};

const lockHeroStep = (duration) => {
  heroWheelLocked = true;
  window.setTimeout(() => { heroWheelLocked = false; }, duration);
};

const stepHeroSequence = (isForward) => {
  if (!isHeroStepControlActive(isForward ? 1 : -1)) return false;
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
    const deltaY = event.deltaY;
    if (!isHeroStepControlActive(deltaY)) return;
    event.preventDefault();

    const threshold = deltaY > 0 ? HERO_WHEEL_STEP_THRESHOLD : HERO_WHEEL_BACK_THRESHOLD;
    if (Math.abs(deltaY) < threshold) return;

    stepHeroSequence(deltaY > 0);
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
    const touch = event.touches[0];
    const dy = touch && heroTouchStart ? touch.clientY - heroTouchStart.y : 0;
    if (isHeroStepControlActive(-dy)) {
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

    if (Math.abs(dy) < HERO_TOUCH_STEP_THRESHOLD || Math.abs(dy) < Math.abs(dx)) return;
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
  if (isClick) playWaterDrop();
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
resetHeroSequenceState({ resetScroll: true, resetCards: true });
updateFocusPanel("oem");
updateWorksTabState("oem");
heroWireframeController = initHeroWireframe(heroWireframe);
initWaterSurface(document.getElementById("hero-kinetic-canvas"));
// initParticleCanvas(particleCanvas, "light");
updateBeijingMeta();
window.setInterval(updateBeijingMeta, 30000);
window.requestAnimationFrame(animateCards);

// Secondary section effects --------------------------------------------------
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
  const video = section.querySelector(".portrait-video");

  let ticking = false;
  let targetVideoTime = 0;
  let targetEnter = 0;
  let targetTextEnter = 0;
  let targetProgressValue = 0;
  let targetExit = 0;
  let currentEnter = 0;
  let currentTextEnter = 0;
  let currentProgressValue = 0;
  let currentExit = 0;
  let scrubRaf = null;
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));

  const scrubVideo = () => {
    scrubRaf = requestAnimationFrame(scrubVideo);
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const delta = targetVideoTime - video.currentTime;
    if (Math.abs(delta) < 0.006) return;
    const step = Math.sign(delta) * Math.min(Math.abs(delta) * 0.14, 0.045);
    video.currentTime += step;
  };

  const renderMotion = () => {
    currentEnter += (targetEnter - currentEnter) * 0.085;
    currentTextEnter += (targetTextEnter - currentTextEnter) * 0.075;
    currentProgressValue += (targetProgressValue - currentProgressValue) * 0.07;
    currentExit += (targetExit - currentExit) * 0.085;

    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));

    requestAnimationFrame(renderMotion);
  };

  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    // enter: starts before the sticky portrait locks, so the scene can drift in.
    const enter = clamp01((window.innerHeight - rect.top) / (window.innerHeight * 1.35));

    // progress: 0 = section just entered, 1 = section fully scrolled through
    const progress = clamp01(-rect.top / scrollable);

    // exit starts before the sticky stage releases, so the next scene can catch it.
    const exit = smootherStep(clamp01((progress - 0.78) / 0.18));

    targetEnter = smootherStep(enter);
    targetTextEnter = smootherStep(clamp01((progress - 0.08) / 0.34));
    targetProgressValue = progress;
    targetExit = exit;

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const rawVideoProgress = Math.max(0, Math.min(1, progress / 0.9));
      const videoProgress = smootherStep(rawVideoProgress);
      targetVideoTime = video.duration * videoProgress;
    }
  };

  if (video) {
    video.pause();
    video.addEventListener("loadedmetadata", () => {
      section.classList.add("is-portrait-video-ready");
      update();
    }, { once: true });
    video.addEventListener("canplay", () => {
      section.classList.add("is-portrait-video-ready");
    }, { once: true });
    scrubVideo();
  }

  renderMotion();

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
  window.addEventListener("pagehide", () => {
    if (scrubRaf) cancelAnimationFrame(scrubRaf);
  }, { once: true });
})();

// Navigation scroll spy ------------------------------------------------------
// Bottom nav scroll spy
(function () {
  const navItems = document.querySelectorAll(".bottom-nav-item");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let active = null;
    for (const sec of sections) {
      if (sec.offsetTop <= scrollY) active = sec.id;
    }
    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      const isActive = href === "#" + active;
      item.classList.toggle("is-active", isActive);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();
})();

