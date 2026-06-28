/* ============================================================================
   Work case data — 深度案例内容
   按 "category:projectIndex" 作键，对应 index.html 里 works-row 的
   data-category + data-project-index。内容均由 Lucian 本人确认，勿编造。
   新增案例：复制一个块、填四要素 (背景/约束/判断/结果) 即可。
   ============================================================================ */
window.workCaseData = {
  // 24 年中秋 —— oem 列表第 3 项 (projectIndex 2)
  "oem:2": {
    eyebrowLeft: "SELECTED WORK — 01",
    eyebrowRight: "PACKAGING / OEM",
    coverIdx: "中秋 · 节令礼盒",
    coverTitle: "中秋",
    coverYear: "2024 — 企业自有品牌",
    coverEn: "Mid-Autumn, five systems.",
    coverMeta: "一个客户 · 一个项目<br>5 套包装系统 · 全部量产",
    hero: {
      src: "images/works/oem/24nianzhongqiu/3.webp",
      title: "圆月限定",
      sub: "ROUND EDITION · 主推款 · 深海蓝 / 烫金月相",
    },
    statement: {
      quote: '同一项目下，<br>每一款都该是<em>单独的好设计</em>，<br>而不是一套模板换色。',
      support:
        "面向企业福利渠道——同质化就卖不动。所以我用颜色作为区分的第一抓手，让五款摆在一起也各自成立；再用风格谱系拉开层次：中式典雅、西式现代、传统、撞色，覆盖不同审美与价位带。",
    },
    series: [
      {
        layout: "wide-text",
        src: "images/works/oem/24nianzhongqiu/1.webp",
        name: "花影礼盒",
        caption: "天青蓝 · 工笔花卉",
        note: "系列以共享的视觉骨架打底，再让每款长出自己的性格。花影一款走清雅路线，留白与线描，对应偏年轻、女性向的赠礼场景。",
      },
      {
        layout: "wide-text-rev",
        src: "images/works/oem/24nianzhongqiu/2.webp",
        name: "暖橙系列",
        caption: "暖橙 · 节庆主调",
        note: "暖橙承担最“节日”的情绪，高饱和、热闹，适合大批量福利发放的通用场景——一眼是中秋，一眼是喜庆。",
      },
      {
        layout: "half-pair",
        items: [
          { src: "images/works/oem/24nianzhongqiu/4.webp", name: "薄荷雅集", caption: "薄荷绿 · 清雅向" },
          { src: "images/works/oem/24nianzhongqiu/5.webp", name: "豆绿轻礼", caption: "豆绿 · 日常礼赠" },
        ],
      },
    ],
    context:
      "公司自有品牌的中秋项目。整季共落地 8 套礼盒、覆盖不同价位，我主导其中 5 套。福利渠道的核心命题，是在“体面感”与价位之间，把每一款都做出新鲜度。",
    stats: [
      { n: "60,000", plus: true, l: "传统桂花款（黄）<br>出货最高" },
      { n: "50,000", plus: true, l: "竹月雅集<br>客户最满意" },
      { n: "5 / 8", plus: false, l: "整季礼盒中<br>由我主导的款数" },
    ],
  },
};
