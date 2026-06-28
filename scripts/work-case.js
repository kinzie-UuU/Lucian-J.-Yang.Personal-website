/* ============================================================================
   Work case — 深度案例浮层逻辑
   点击带有案例数据 (window.workCaseData[category:projectIndex]) 的 works-row，
   渲染编辑式案例页并以全屏浮层打开。ESC / 关闭按钮 / 背景关闭，锁背景滚动。
   仅对有数据的行接管点击；无数据的行保持原状。
   ============================================================================ */
(() => {
  const data = window.workCaseData;
  if (!data) return;

  const rows = Array.from(document.querySelectorAll(".works-row"));
  if (!rows.length) return;

  const keyOf = (row) => {
    const cat = row.dataset.category || "";
    const idx = row.dataset.projectIndex;
    return idx != null && idx !== "" ? `${cat}:${idx}` : "";
  };

  const playTone = (type) => window.LucianRuntime?.playUiTone?.(type);

  // ---- overlay shell ----
  const overlay = document.createElement("div");
  overlay.className = "work-case-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML =
    '<button class="work-case-close" type="button" aria-label="关闭案例">✕</button>' +
    '<div class="work-case-body"></div>';
  document.body.appendChild(overlay);
  const body = overlay.querySelector(".work-case-body");
  const closeBtn = overlay.querySelector(".work-case-close");

  const esc = (s) => String(s == null ? "" : s);

  const renderSeriesRow = (block) => {
    if (block.layout === "half-pair") {
      return (
        '<div class="work-case-series-row">' +
        block.items
          .map(
            (it) =>
              '<figure class="work-case-fig work-case-col-half">' +
              `<img src="${esc(it.src)}" alt="${esc(it.name)}" decoding="async">` +
              '<figcaption class="work-case-fig-lbl">' +
              `<span class="n">${esc(it.name)}</span><span class="c">${esc(it.caption)}</span>` +
              "</figcaption></figure>"
          )
          .join("") +
        "</div>"
      );
    }
    const rev = block.layout === "wide-text-rev" ? " rev" : "";
    return (
      `<div class="work-case-series-row${rev}">` +
      '<figure class="work-case-fig work-case-col-wide">' +
      `<img src="${esc(block.src)}" alt="${esc(block.name)}" decoding="async">` +
      '<figcaption class="work-case-fig-lbl">' +
      `<span class="n">${esc(block.name)}</span><span class="c">${esc(block.caption)}</span>` +
      "</figcaption></figure>" +
      `<div class="work-case-col-rest"><p>${esc(block.note)}</p></div>` +
      "</div>"
    );
  };

  const renderStats = (stats) =>
    (stats || [])
      .map(
        (s) =>
          '<div class="work-case-data-row">' +
          `<span class="n">${esc(s.n)}${s.plus ? '<span style="font-size:0.5em">+</span>' : ""}</span>` +
          `<span class="l">${esc(s.l)}</span>` +
          "</div>"
      )
      .join("");

  const render = (c) => {
    const counter = { n: 0 };
    body.innerHTML =
      // RUNNING HEAD (fixed)
      '<div class="work-case-runhead">' +
        `<span>${esc(c.eyebrowRight || "LUCIAN J. YANG")}</span>` +
        `<span>${esc(c.eyebrowLeft || c.coverIdx)}</span>` +
      "</div>" +
      // COVER
      '<section class="work-case-cover">' +
        `<div class="work-case-cover-idx">${esc(c.coverIdx)}</div>` +
        '<div class="work-case-cover-headline">' +
          `<h1 class="work-case-cover-title">${esc(c.coverTitle)}<span class="work-case-cover-year">${esc(c.coverYear)}</span></h1>` +
          '<div class="work-case-cover-side">' +
            `<span class="work-case-cover-en">${esc(c.coverEn)}</span>` +
            `<div class="work-case-cover-meta">${esc(c.coverMeta)}</div>` +
          "</div>" +
        "</div>" +
      "</section>" +
      // HERO
      (c.hero
        ? '<section class="work-case-bleed">' +
          `<img src="${esc(c.hero.src)}" alt="${esc(c.hero.title)}">` +
          '<div class="work-case-bleed-cap">' +
          `<div class="t">${esc(c.hero.title)}</div><div class="s">${esc(c.hero.sub)}</div>` +
          "</div></section>"
        : "") +
      // STATEMENT
      (c.statement
        ? '<section class="work-case-stmt">' +
          '<span class="work-case-mono work-case-stmt-kick">判断 — THE JUDGMENT</span>' +
          `<blockquote>${esc(c.statement.quote)}</blockquote>` +
          `<p class="work-case-stmt-sup">${esc(c.statement.support)}</p>` +
          "</section>"
        : "") +
      // SERIES
      (c.series && c.series.length
        ? '<section class="work-case-series">' + c.series.map((b) => renderSeriesRow(b, counter)).join("") + "</section>"
        : "") +
      // FACTS
      '<section class="work-case-facts">' +
        "<div>" +
          '<div class="work-case-facts-lab">背景 — CONTEXT</div>' +
          `<p>${esc(c.context)}</p>` +
        "</div>" +
        "<div>" +
          '<div class="work-case-facts-lab">落地 — IN MARKET</div>' +
          `<div class="work-case-data">${renderStats(c.stats)}</div>` +
        "</div>" +
      "</section>" +
      '<div class="work-case-end">' +
        "<span>LUCIAN J. YANG — PACKAGING</span>" +
        `<span>${esc(c.coverYear)}</span>` +
      "</div>";
  };

  let lastFocus = null;

  const open = (c) => {
    render(c);
    overlay.scrollTop = 0;
    lastFocus = document.activeElement;
    document.body.classList.add("work-case-open");
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    closeBtn.focus({ preventScroll: true });
    playTone("click");
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("work-case-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  };

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  // ---- wire rows that have case data ----
  rows.forEach((row) => {
    const c = data[keyOf(row)];
    if (!c) return;
    row.classList.add("works-row--has-case");
    row.style.cursor = "pointer";
    row.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        open(c);
      },
      true
    );
    row.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      open(c);
    });
  });
})();
