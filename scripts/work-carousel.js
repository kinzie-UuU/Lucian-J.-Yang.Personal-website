/* ============================================================================
   Work Carousel — rotateY fan effect, GSAP spring, wheel navigation
   Translates the React/Motion tilted-carousel concept into vanilla JS.
   Core mechanic from: codepen.io/vii120/pen/VYmmdMK
   Each card: rotateY = (activeIndex - i) * 60 deg
   Strip:     translateX = -(activeIndex * cardWidth)px
   ============================================================================ */
(() => {
  const section = document.querySelector(".work-carousel-section");
  if (!section || !window.gsap) return;

  /* ── Data ──────────────────────────────────────────────────────────── */
  const CARDS = [
    { key: "oem:2",  title: "24 年中秋", sub: "节令礼盒 · OEM",  src: "images/works/oem/24nianzhongqiu/3.webp" },
    { key: "oem:1",  title: "24 年端午", sub: "OEM 包装",         src: "images/works/oem/24nianduanwu/2.webp" },
    { key: "oem:3",  title: "超级粽棒",  sub: "IP 包装 · OEM",    src: "images/works/oem/chaojizongbang/03.webp" },
    { key: "gift:3", title: "顾家家居",  sub: "礼品福利",          src: "images/works/gift/gujia/方案2效果q.webp" },
    { key: "gift:7", title: "追觅科技",  sub: "礼品福利 · 科技",  src: "images/works/gift/zhuimi/8888.webp" },
    { key: "gift:1", title: "安吉尔",    sub: "礼品福利",          src: "images/works/gift/anjier/1.1新.webp" },
  ];

  const n = CARDS.length;
  let active = 0;
  let wheelLocked = false;

  /* ── DOM build ─────────────────────────────────────────────────────── */
  const strip = section.querySelector("#wc-strip");
  const titleEl = section.querySelector("#wc-title");
  const subEl = section.querySelector("#wc-sub");
  const indexEl = section.querySelector("#wc-index");

  CARDS.forEach((card, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wc-perspective";
    wrapper.innerHTML = `
      <div class="wc-card" data-i="${i}">
        <img class="wc-img" src="${card.src}" alt="${card.title}" loading="lazy" draggable="false">
        <div class="wc-card-overlay">
          <div class="wc-card-name">${card.title}</div>
          <div class="wc-card-tag">${card.sub}</div>
          <div class="wc-card-cta">→ 查看案例</div>
        </div>
      </div>`;
    strip.appendChild(wrapper);
  });

  const cardEls = Array.from(strip.querySelectorAll(".wc-card"));
  const CARD_W = () => cardEls[0]?.offsetWidth || 280;
  const GAP = 24;

  // x so that the active card is centered in the stage
  const centeredX = (idx) => {
    const stageW = section.querySelector(".wc-stage")?.offsetWidth || window.innerWidth;
    const cw = CARD_W();
    return stageW / 2 - idx * (cw + GAP) - cw / 2;
  };

  /* ── Animate ───────────────────────────────────────────────────────── */
  const update = (idx, instant = false) => {
    active = idx;
    const dur = instant ? 0 : 0.8;
    const ease = instant ? "none" : "elastic.out(1, 0.2)";
    const slideEase = instant ? "none" : "power2.out";

    // Translate strip so active card is centered in stage
    gsap.to(strip, { x: centeredX(active), duration: dur, ease: slideEase });

    // Rotate + scale each card
    cardEls.forEach((el, i) => {
      const offset = active - i;
      gsap.to(el, {
        rotateY: offset * 55,
        scale: i === active ? 1 : 0.85,
        duration: dur,
        ease,
        overwrite: true,
      });
      // Blur non-active title inside card
      const cta = el.querySelector(".wc-card-cta");
      if (cta) gsap.to(cta, { opacity: i === active ? 1 : 0, duration: 0.3 });
    });

    // Update copy
    if (titleEl) titleEl.textContent = CARDS[active].title;
    if (subEl) subEl.textContent = CARDS[active].sub;
    if (indexEl) indexEl.textContent =
      String(active + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");

    // Dots
    section.querySelectorAll(".wc-dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === active);
    });
  };

  /* ── Dots ──────────────────────────────────────────────────────────── */
  const dotTrack = section.querySelector("#wc-dots");
  if (dotTrack) {
    CARDS.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "wc-dot";
      d.setAttribute("aria-label", `Go to slide ${i + 1}`);
      d.addEventListener("click", () => update(i));
      dotTrack.appendChild(d);
    });
  }

  /* ── Arrows ────────────────────────────────────────────────────────── */
  section.querySelector(".wc-prev")?.addEventListener("click", () => {
    if (active > 0) update(active - 1);
  });
  section.querySelector(".wc-next")?.addEventListener("click", () => {
    if (active < n - 1) update(active + 1);
  });

  /* ── Card click ─────────────────────────────────────────────────────── */
  cardEls.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (i !== active) { update(i); return; }
      // Open case study
      const caseKey = CARDS[i].key;
      const [cat, idx] = caseKey.split(":");
      const row = document.querySelector(
        `.works-row[data-category="${cat}"][data-project-index="${idx}"]`
      );
      if (row) row.click();
    });
  });

  /* ── Scroll wheel ──────────────────────────────────────────────────── */
  let wheelAcc = 0, wheelTimer = 0;
  const onWheel = (e) => {
    if (wheelLocked) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
    if (!inView) return;

    const goingDown = e.deltaY > 0;
    const goingUp   = e.deltaY < 0;

    // At boundaries: release and let page scroll naturally
    if (goingDown && active >= n - 1) return;
    if (goingUp   && active <= 0)     return;

    e.preventDefault();
    wheelAcc += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (wheelAcc > 40 && active < n - 1) {
        update(active + 1);
      } else if (wheelAcc < -40 && active > 0) {
        update(active - 1);
      }
      wheelAcc = 0;
    }, 60);
  };
  window.addEventListener("wheel", onWheel, { passive: false });

  /* ── Touch swipe ───────────────────────────────────────────────────── */
  let touchStartX = 0;
  section.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  section.addEventListener("touchend", (e) => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (dx > 60 && active < n - 1) update(active + 1);
    if (dx < -60 && active > 0) update(active - 1);
  }, { passive: true });

  /* ── Keyboard ──────────────────────────────────────────────────────── */
  window.addEventListener("keydown", (e) => {
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === "ArrowRight" && active < n - 1) update(active + 1);
    if (e.key === "ArrowLeft" && active > 0) update(active - 1);
  });

  /* ── Resize ────────────────────────────────────────────────────────── */
  window.addEventListener("resize", () => update(active, true));

  /* ── Init ──────────────────────────────────────────────────────────── */
  update(0, true);
  window.LucianWorkCarousel = { goTo: update };
})();
