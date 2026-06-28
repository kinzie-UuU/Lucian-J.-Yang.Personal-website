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

  // 安吉尔 —— gift 列表第 2 项 (projectIndex 1)
  "gift:1": {
    eyebrowLeft: "SELECTED WORK — 06",
    eyebrowRight: "PACKAGING / GIFT",
    coverIdx: "礼品 · 净水品牌",
    coverTitle: "安吉尔",
    coverYear: "Angel Water — 礼品包装",
    coverEn: "Clean water, clean design.",
    coverMeta: "知名净水品牌<br>渠道礼品定制",
    hero: {
      src: "images/works/gift/anjier/1.1新.webp",
      title: "安吉尔礼品包装",
      sub: "GIFT PACKAGING · WATER PURIFIER BRAND · 企业礼赠渠道",
    },
    statement: {
      quote: '净水品牌的礼品包装，<br>视觉语言就该像水一样——<br><em>克制、清透、不多余</em>。',
      support:
        "安吉尔是国内知名净水品牌。礼品包装的定位是企业赠礼渠道，收礼场景多为节庆或客户维护。设计的核心判断：用「干净」做主题，和品牌核心价值直接对齐；同时保持足够的礼品感，让收礼人在打开之前就感受到品质。颜色、工艺和结构都做了减法，把预算集中在最能影响第一眼判断的地方。",
    },
    series: [],
    context:
      "安吉尔净水品牌礼品包装定制项目，面向企业礼赠渠道。[?]（请补充：节令/时间/出货量/是否有后续合作）",
    stats: [
      { n: "[?]", plus: false, l: "出货量<br>（请确认）" },
      { n: "[?]", plus: false, l: "项目周期<br>（请确认）" },
      { n: "1", plus: false, l: "套方案<br>定稿落地" },
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

  // 24 年端午 —— oem 列表第 2 项 (projectIndex 1)
  "oem:1": {
    eyebrowLeft: "SELECTED WORK — 04",
    eyebrowRight: "PACKAGING / OEM",
    coverIdx: "端午 · OEM礼盒",
    coverTitle: "24 年端午",
    coverYear: "2024 — OEM贴牌包装",
    coverEn: "Seven versions, one brief.",
    coverMeta: "多 SKU 系列<br>OEM 全流程",
    hero: {
      src: "images/works/oem/24nianduanwu/2.webp",
      title: "24 年端午",
      sub: "OEM PACKAGING · DRAGON BOAT FESTIVAL · 系列礼盒",
    },
    statement: {
      quote: '系列感不是<em>让每款都像</em>，<br>而是让每款<em>各自成立</em>，<br>又放在一起认得出来。',
      support:
        "7 款 SKU 共用一个视觉底层——结构、识别层级、主题色域保持一致；各款在插画题材、配色比例和材质工艺上各自走向，让不同预算段的买家都有适配的选择，同时不让系列感在货架上散掉。",
    },
    series: [
      {
        layout: "wide-text",
        src: "images/works/oem/24nianduanwu/1.webp",
        name: "系列主视觉",
        caption: "统一结构 · 差异化配色",
        note: "从定稿到打样，最多的沟通点在颜色的印刷还原。OEM 项目尤其要在提案阶段就锁定工艺，不然颜色打出来和屏幕差很多。",
      },
      {
        layout: "half-pair",
        items: [
          { src: "images/works/oem/24nianduanwu/4.webp", name: "高端款", caption: "精裱盒 · 金线烫印" },
          { src: "images/works/oem/24nianduanwu/4-1.webp", name: "中端款", caption: "天地盖 · 通用工艺" },
        ],
      },
    ],
    context:
      "2024 年端午节 OEM 包装项目，覆盖 [?] 个价格带，从电商自营到线下礼品渠道同步铺货。全系列 7 款 SKU 由我独立设计并跟进打样交付。",
    stats: [
      { n: "7", plus: false, l: "款 SKU<br>全系列" },
      { n: "[?]", plus: false, l: "总出货量<br>（请确认）" },
      { n: "[?]", plus: false, l: "最高单款<br>（请确认）" },
    ],
  },

  // 追觅科技 —— gift 列表第 8 项 (projectIndex 7)
  "gift:7": {
    eyebrowLeft: "SELECTED WORK — 05",
    eyebrowRight: "PACKAGING / GIFT",
    coverIdx: "企业福利 · 科技品牌",
    coverTitle: "追觅",
    coverYear: "追觅科技 — 企业礼品",
    coverEn: "Tech brand, gifted right.",
    coverMeta: "头部科技品牌<br>福利礼品包装",
    hero: {
      src: "images/works/gift/zhuimi/8888.webp",
      title: "追觅科技礼品包装",
      sub: "GIFT PACKAGING · TECH BRAND · 企业福利渠道",
    },
    statement: {
      quote: '科技品牌的礼品包装，<br>不能太硬也不能太甜，<br><em>找到那个专业又有温度的刻度</em>。',
      support:
        "追觅科技是国内头部智能清洁电器品牌。企业礼品的包装需要在「科技感」和「礼品场景」之间找到平衡——太工业感会让收礼人感觉是发了一台设备，太花哨又会弱化品牌调性。最终用克制的配色和干净的版式做主干，用品牌色点缀，走「有品质的日常」这条线。",
    },
    series: [
      {
        layout: "wide-text",
        src: "images/works/gift/zhuimi/袋子11.webp",
        name: "礼品手提袋",
        caption: "品牌主色 · 轻量化",
        note: "手提袋是整套礼品包装的第一层视觉——它在办公室被拎着走的时候就是品牌露出。版面干净，识别清楚，不抢产品本身的风头。",
      },
      {
        layout: "wide-text-rev",
        src: "images/works/gift/zhuimi/袋子6671.webp",
        name: "系列延展",
        caption: "多尺寸格式",
        note: "同一套视觉语言延伸到不同尺寸的包装格式，保持系列感。",
      },
    ],
    context:
      "追觅科技企业福利渠道礼品包装定制项目。[?]（请补充：节令/时间/是否有具体产品内容物）",
    stats: [
      { n: "[?]", plus: false, l: "出货量<br>（请确认）" },
      { n: "3", plus: false, l: "件套<br>手提袋 + 礼盒 + 配件" },
      { n: "[?]", plus: false, l: "项目周期<br>（请确认）" },
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
