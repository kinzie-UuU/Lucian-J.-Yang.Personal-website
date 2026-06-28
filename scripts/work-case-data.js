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

  // 超级粽棒 —— oem 列表第 4 项 (projectIndex 3)
  // ⚠️ [?] 标记处请 Lucian 校对
  "oem:3": {
    eyebrowLeft: "SELECTED WORK — 02",
    eyebrowRight: "PACKAGING / OEM",
    coverIdx: "端午 · OEM礼盒",
    coverTitle: "超级粽棒",
    coverYear: "OEM — 节令包装",
    coverEn: "Make the dumpling loud.",
    coverMeta: "IP 形象主导<br>多品类落地",
    hero: {
      src: "images/works/oem/chaojizongbang/03.webp",
      title: "超级粽棒",
      sub: "DRAGON BOAT FESTIVAL · IP CHARACTER PACKAGING",
    },
    statement: {
      quote: '同质化节令礼盒里，<br><em>风格即差异化</em>——<br>先让人认出你，再让人买你。',
      support:
        "端午礼盒市场高度同质化：绿色、粽叶、传统图腾，几乎是一个模子。超级粽棒的出发点是反向走：用 IP 角色做主视觉，用撞色和粗体字拉开与传统款的距离，目标渠道是企业福利和线上礼品，需要在货架和屏幕上都能被一眼认出。",
    },
    series: [
      {
        layout: "wide-text",
        src: "images/works/oem/chaojizongbang/03-01.webp",
        name: "主视觉 · IP 角色",
        caption: "深绿 · 撞色手提袋",
        note: "以粽子为原型的 IP 角色戴墨镜、穿运动配色，打破节令礼盒的传统严肃调性，直接对准 18-35 岁的企业福利接收者。",
      },
      {
        layout: "wide-text-rev",
        src: "images/works/oem/chaojizongbang/03-02.webp",
        name: "系列延展",
        caption: "多格式 · 礼盒 + 袋子",
        note: "IP 形象延伸到礼盒正面和购物袋，用同一套颜色系统保持系列感，在不同尺寸上都能识别。",
      },
    ],
    context:
      "端午节令 OEM 包装项目。客户需要一款在企业福利渠道有辨识度、能和传统礼盒拉开距离的产品。预算有限制，需要在有限结构内做出最大视觉冲击。",
    stats: [
      { n: "[?]", plus: false, l: "实际出货量<br>（请确认）" },
      { n: "1", plus: false, l: "套 IP 形象<br>覆盖全系列" },
      { n: "2", plus: false, l: "主要格式<br>礼盒 + 手提袋" },
    ],
  },

  // 顾家家居 —— gift 列表第 4 项 (projectIndex 3)
  // ⚠️ [?] 标记处请 Lucian 校对
  "gift:3": {
    eyebrowLeft: "SELECTED WORK — 03",
    eyebrowRight: "PACKAGING / GIFT",
    coverIdx: "企业福利 · 节令礼盒",
    coverTitle: "顾家",
    coverYear: "顾家家居 — 企业礼品",
    coverEn: "Home comfort, gifted.",
    coverMeta: "大品牌渠道<br>定制礼品包装",
    hero: {
      src: "images/works/gift/gujia/方案2效果q.webp",
      title: "顾家家居礼盒",
      sub: "GIFT PACKAGING · CORPORATE WELFARE · 家居品牌定制",
    },
    statement: {
      quote: '大品牌的礼品包装，<br>首先得<em>配得上品牌</em>，<br>然后才是好看。',
      support:
        "顾家家居是国内头部沙发 / 家居品牌，礼品包装需要在视觉上传达品牌的品质感，同时控制在企业礼品的合理成本区间内。设计的核心判断是：用材质感和留白代替复杂图案，让包装本身显得克制、高级，而不是把品牌 Logo 放大就算完成。",
    },
    series: [
      {
        layout: "wide-text",
        src: "images/works/gift/gujia/效果2.webp",
        name: "主礼盒方案",
        caption: "克制配色 · 品质感优先",
        note: "以浅色系为底，压印工艺做 Logo，整体传递「有品质」而非「喜庆」——契合顾家家居在消费者心智中的定位。",
      },
      {
        layout: "half-pair",
        items: [
          { src: "images/works/gift/gujia/效果211副本.webp", name: "方案细节", caption: "材质 · 压印 · 开合结构" },
          { src: "images/works/gift/gujia/方案2效果q.webp", name: "整体呈现", caption: "企业礼品场景" },
        ],
      },
    ],
    context:
      "顾家家居企业礼品包装定制项目，面向节令福利发放渠道。[?]（请补充：项目背景/时间/是否量产）",
    stats: [
      { n: "[?]", plus: false, l: "出货量<br>（请确认）" },
      { n: "[?]", plus: false, l: "项目周期<br>（请确认）" },
      { n: "3", plus: false, l: "个方案<br>最终选定方案2" },
    ],
  },
};
