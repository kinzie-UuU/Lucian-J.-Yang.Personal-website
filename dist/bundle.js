/* --- site-data.js --- */
/* ============================================================================
   Site data
   Copy, localization, work taxonomy, and gallery content live here so the main
   runtime file can stay focused on interaction and animation logic.
   ============================================================================ */
// Copy and localization data -------------------------------------------------
var i18n = {
  "zh": {
    "nav_about": "关于",
    "nav_services": "服务",
    "nav_works": "作品",
    "nav_contact": "联系",
    "hero_kicker": "Packaging Direction / Visual Judgment / OEM System",
    "hero_title": "不是把包装做漂亮，而是把包装做对。",
    "hero_text": "我聚焦 OEM / 贴牌包装、礼赠渠道、系列礼盒与品牌升级。真正重要的不是风格是否抢眼，而是它能否在预算、工艺、渠道和交付中成立。",
    "hero_script": "quietly, precisely.",
    "hero_action_works": "进入作品选集",
    "hero_action_about": "查看服务",
    "hero_note": "首页不是说明文档，而是进入作品现场的入口。先浏览，再判断，再进入项目。",
    "hero_card_1_category": "品牌包装",
    "hero_card_1_name": "包装设计",
    "hero_card_1_meta": "01 · 结构与识别",
    "hero_card_2_category": "礼品福利",
    "hero_card_2_name": "节礼包装设计",
    "hero_card_2_meta": "02 · 节点与渠道",
    "hero_card_3_category": "品牌字体",
    "hero_card_3_name": "品牌与字体设计",
    "hero_card_3_meta": "03 · 字体与识别",
    "hero_card_4_category": "AIGC流",
    "hero_card_4_name": "AIGC 工作流",
    "hero_card_4_meta": "04 · 提案与筛选",
    "hero_card_5_category": "视频创作",
    "hero_card_5_name": "AIGC 视频",
    "hero_card_5_meta": "05 · 动态表达",
    "works_kicker": "作品",
    "works_statement_title": "不是把包装做漂亮，而是把包装做对。",
    "works_statement_body": "Lucian J. Yang 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    "works_transition_line_1": "不是把包装做漂亮",
    "works_transition_line_2": "而是让包装在真实条件下成立",
    "works_transition_note": "我关注的不是单一风格，而是包装能否适配渠道、预算、工艺与交付。从 OEM、礼赠渠道到系列礼盒，我更在意方案能不能被生产、被运输、被销售，并最终完整落地。",
    "works_title": "点击作品，进入更集中、更明确的判断现场。",
    "works_text": "这里不是把项目平铺成截图，而是把真实合作中最常见的场景，整理成可浏览、可比较、可进入的作品入口。",
    "work_tab_oem": "品牌包装",
    "work_tab_gift": "礼品福利",
    "work_tab_brand": "品牌字体",
    "work_tab_aigc": "AIGC流",
    "works_col_project": "类别",
    "works_col_type": "方向",
    "works_col_year": "年份",
    "work_row_category_1_name": "包装设计",
    "work_row_category_2_name": "节礼包装设计",
    "work_row_category_3_name": "品牌与字体设计",
    "work_row_category_4_name": "AIGC工作流",
    "work_row_category_5_name": "AIGC视频",
    "works_infinite_hint": "SCROLL / ARROWS / TOUCH",
    "work_row_1_name": "23 年端午",
    "work_row_2_name": "24 年端午",
    "work_row_3_name": "24 年中秋",
    "work_row_4_name": "超级粽棒",
    "work_row_5_name": "风味人间",
    "work_row_6_name": "23 顺丰端午",
    "work_row_7_name": "安吉尔",
    "work_row_8_name": "固德威",
    "metric_focus": "重点",
    "metric_value": "价值",
    "about_kicker": "关于",
    "about_title": "我是谁",
    "about_heading": "关于我",
    "about_role_1": "包装",
    "about_role_2": "设计师",
    "about_skills_label": "掌握技能",
    "about_tool_jimeng": "即梦",
    "about_tool_capcut": "剪映",
    "about_tool_kling": "可灵",
    "about_text_1": "我是一名以包装设计为主的设计师，主要方向是 OEM / 贴牌包装，以及礼品与福利渠道设计。\n\n我关注的，不只是包装是否好看，而是它在真实条件下是否成立：是否适合渠道，是否符合预算，是否匹配工艺，是否能在生产与交付中保持完整。",
    "about_text_2": "对我来说，设计不是先讨论风格，而是先判断什么该做、什么该省、什么最适合当前条件。\n\nAIGC 是我提高效率与比较方案的工具，但真正有价值的，仍然是判断本身。",
    "services_kicker": "服务",
    "services_title": "为何选择我",
    "services_intro": "我提供的不只是画面输出，而是帮助项目在价格带、工艺、渠道和交付节奏里做出更稳的包装判断。",
    "service_title_1": "包装主导",
    "service_text_1": "以 OEM / 贴牌包装为主，也覆盖礼品、福利渠道、系列包装与礼盒设计。",
    "service_title_2": "方案判断",
    "service_text_2": "帮你判断什么该做、什么该省，什么方案真正适合当前价格带、工艺条件与渠道场景。",
    "service_title_3": "成本约束",
    "service_text_3": "从材质、工艺、打样到供应商协同，让设计能进入生产、交付和真实使用。",
    "service_title_4": "AIGC效率",
    "service_text_4": "把 AIGC 用在前期比较、提案推演与方向筛选上，提高效率，但不替代判断。",
    "service_title_5": "品牌字体",
    "service_text_5": "在需要时补强品牌、字体与视觉系统，让包装识别和系列一致性更完整。",
    "service_title_6": "交付协同",
    "service_text_6": "我会把设计文件、打样反馈与供应商沟通整理清楚，让方案更顺畅地进入执行。",
    "clients_kicker": "合作客户",
    "clients_title": "合作客户",
    "clients_intro": "部分合作品牌与项目方，覆盖物流、家居、食品、企业福利与消费品渠道。",
    "contact_kicker": "联系",
    "contact_title": "联系",
    "contact_text": "如果你需要把包装方向、成本约束和交付节奏同时理清，我们可以从一个具体项目开始。",
    "contact_collab": "OEM / 贴牌包装 · 礼品与福利渠道设计 · 系列包装 · 节庆礼盒 · 包装升级 · 包装提案与方向判断支持",
    "focus_kicker": "当前项目",
    "meta_name": "©杨钦鹏",
    "contact_form_kicker": "项目咨询",
    "contact_form_note": "说明项目类型、时间和预算范围即可。",
    "contact_form_name": "姓名",
    "contact_form_company": "公司",
    "contact_form_contact": "邮箱/电话",
    "contact_form_message": "需求信息",
    "contact_form_send": "发送邮件",
    "contact_copied": "已复制",
    "work_tab_aigc_video": "视频创作"
  },
  "en": {
    "nav_about": "About",
    "nav_services": "Services",
    "nav_works": "Works",
    "nav_contact": "Contact",
    "hero_kicker": "Packaging Direction / Visual Judgment / OEM System",
    "hero_title": "Not just making packaging beautiful, but making it right.",
    "hero_text": "I focus on OEM / private-label packaging, gifting channels, series boxes, and brand-upgrade projects. What matters is not whether the style is loud, but whether it holds under budget, process, channel, and delivery constraints.",
    "hero_script": "quietly, precisely.",
    "hero_action_works": "Enter Works",
    "hero_action_about": "View Services",
    "hero_note": "The homepage is not a document. It is an entrance into the work itself: browse first, judge second, then enter the project.",
    "hero_card_1_category": "Brand Packaging",
    "hero_card_1_name": "Packaging Design",
    "hero_card_1_meta": "01 · Structure & Recognition",
    "hero_card_2_category": "Gifting",
    "hero_card_2_name": "Gift Packaging Design",
    "hero_card_2_meta": "02 · Occasion & Channel",
    "hero_card_3_category": "Brand Type",
    "hero_card_3_name": "Brand & Typography Design",
    "hero_card_3_meta": "03 · Type & Identity",
    "hero_card_4_category": "AIGC Flow",
    "hero_card_4_name": "AIGC Workflow",
    "hero_card_4_meta": "04 · Proposal & Filtering",
    "hero_card_5_category": "Video",
    "hero_card_5_name": "AIGC Video",
    "hero_card_5_meta": "05 · Motion Expression",
    "works_kicker": "Works",
    "works_statement_title": "Not just making packaging beautiful, but making it right.",
    "works_statement_body": "Lucian J. Yang focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    "works_transition_line_1": "Not just making packaging beautiful,",
    "works_transition_line_2": "but making it work in real conditions.",
    "works_transition_note": "The point is not one fixed style, but whether the package fits its channel, budget, process, and delivery path. From OEM to gifting and series boxes, I care whether an idea can be produced, shipped, sold, and landed intact.",
    "works_title": "Click a project and enter a more focused field of judgment.",
    "works_text": "These works show not just results, but the judgment behind them. What matters is whether they hold up in real price bands, channel conditions, process constraints, and production realities.",
    "work_tab_oem": "OEM / Brand Packaging",
    "work_tab_gift": "Gifting / Welfare Channel",
    "work_tab_brand": "Brand & Type Support",
    "work_tab_aigc": "AIGC Workflow / SOP",
    "works_col_project": "Category",
    "works_col_type": "Direction",
    "works_col_year": "Year",
    "work_row_category_1_name": "Packaging Design",
    "work_row_category_2_name": "Gift Packaging Design",
    "work_row_category_3_name": "Brand & Typography Design",
    "work_row_category_4_name": "AIGC Workflow",
    "work_row_category_5_name": "AIGC Video",
    "works_infinite_hint": "SCROLL / ARROWS / TOUCH",
    "work_row_1_name": "2023 Dragon Boat",
    "work_row_2_name": "2024 Dragon Boat",
    "work_row_3_name": "2024 Mid-Autumn",
    "work_row_4_name": "Super Zong Bang",
    "work_row_5_name": "Flavor of the World",
    "work_row_6_name": "SF Dragon Boat 2023",
    "work_row_7_name": "Angel",
    "work_row_8_name": "GoodWe",
    "metric_focus": "Focus",
    "metric_value": "Value",
    "about_kicker": "About",
    "about_title": "Who I Am",
    "about_heading": "About Me",
    "about_role_1": "Packaging",
    "about_role_2": "Designer",
    "about_skills_label": "Toolkit",
    "about_tool_jimeng": "Jimeng",
    "about_tool_capcut": "CapCut",
    "about_tool_kling": "Kling",
    "about_text_1": "I am a designer focused on packaging, primarily OEM / private label packaging and gifting & welfare channel design.\n\nMy focus is not just whether packaging looks good, but whether it holds up under real conditions — right for the channel, within budget, matched to process, and intact through production and delivery.",
    "about_text_2": "For me, design does not start with style. It starts with judgment: what should be done, what should be cut, what fits the current conditions.\n\nAIGC is a tool for efficiency and comparison. The real value is still the judgment itself.",
    "services_kicker": "Services",
    "services_title": "Why Work With Me",
    "services_intro": "I provide more than visual output: I help projects make steadier packaging decisions within price bands, production process, channel needs, and delivery rhythm.",
    "service_title_1": "Packaging-Led",
    "service_text_1": "Primarily OEM / private label packaging, also covering gifting, welfare channels, series packaging, and gift box design.",
    "service_title_2": "Proposal Judgment",
    "service_text_2": "Clarify what should be made, what should be cut, and what truly fits the price band, process, and channel.",
    "service_title_3": "Cost Constraints",
    "service_text_3": "From materials and process to sampling and supplier feedback, keep design connected to production and delivery.",
    "service_title_4": "AIGC Efficiency",
    "service_text_4": "Use AIGC for early comparison, proposal exploration, and direction filtering without replacing judgment.",
    "service_title_5": "Brand & Type",
    "service_text_5": "Bring in brand, typography, and visual systems when packaging needs stronger recognition and series consistency.",
    "service_title_6": "Delivery Alignment",
    "service_text_6": "I keep files, sampling feedback, and supplier communication clear so the direction can move smoothly into production.",
    "clients_kicker": "Clients",
    "clients_title": "Clients",
    "clients_intro": "Selected brands and project partners across logistics, home, food, corporate gifting, and consumer channels.",
    "contact_kicker": "Contact",
    "contact_title": "Contact",
    "contact_text": "If you need to clarify packaging direction, cost constraints, and delivery rhythm at the same time, we can start with one concrete project.",
    "contact_collab": "OEM / Private Label · Gifting & Welfare Channels · Series Packaging · Seasonal Gift Boxes · Packaging Upgrade · Proposal & Direction Support",
    "focus_kicker": "Active Project",
    "meta_name": "©Lucian J. Yang",
    "contact_form_kicker": "Project Inquiry",
    "contact_form_note": "Share the project type, timing, and budget range.",
    "contact_form_name": "Name",
    "contact_form_company": "Company",
    "contact_form_contact": "Email / Phone",
    "contact_form_message": "Project Needs",
    "contact_form_send": "Send Email",
    "contact_copied": "Copied",
    "work_tab_aigc_video": "Short Video / Commercial Film"
  }
};

// Works taxonomy and hero card data -----------------------------------------
var worksData = {
  "oem": {
    "label": {
      "zh": "OEM Packaging",
      "en": "OEM Packaging"
    },
    "title": {
      "zh": "OEM / 贴牌包装",
      "en": "OEM Packaging"
    },
    "description": {
      "zh": "在多 SKU、明确价格带与高执行要求下，建立稳定、清晰并且可延展的包装系统。",
      "en": "Packaging systems built for multi-SKU, strict pricing bands, and execution-heavy production conditions."
    },
    "focus": {
      "zh": "结构 / 识别 / 交付",
      "en": "Structure / Recognition / Delivery"
    },
    "value": {
      "zh": "让包装在现实条件中真正成立",
      "en": "Make packaging genuinely work in real conditions"
    }
  },
  "gift": {
    "label": {
      "zh": "Gift Channel",
      "en": "Gift Channel"
    },
    "title": {
      "zh": "礼品 / 福利渠道",
      "en": "Gift Channel"
    },
    "description": {
      "zh": "在礼赠感、预算、内容编排与交付节点之间做平衡，而不是只制造节日气氛。",
      "en": "Balance gifting tone, budget, content structure, and delivery milestones instead of relying on mood alone."
    },
    "focus": {
      "zh": "礼赠感 / 节奏 / 渠道",
      "en": "Gift Tone / Timing / Channel"
    },
    "value": {
      "zh": "让礼盒在预算和节点中依然成立",
      "en": "Make gift packaging hold together under budget and seasonal deadlines"
    }
  },
  "brand": {
    "label": {
      "zh": "Brand Support",
      "en": "Brand Support"
    },
    "title": {
      "zh": "品牌 / 字体辅助",
      "en": "Brand Support"
    },
    "description": {
      "zh": "让字体、识别与视觉规则服务包装主轴，而不是喧宾夺主。",
      "en": "Let typography and identity support the packaging axis instead of taking over."
    },
    "focus": {
      "zh": "字体 / 识别 / 节制",
      "en": "Typography / Identity / Restraint"
    },
    "value": {
      "zh": "补强表达，但不制造噪音",
      "en": "Strengthen expression without adding noise"
    }
  },
  "aigc": {
    "label": {
      "zh": "AIGC Workflow",
      "en": "AIGC Workflow"
    },
    "title": {
      "zh": "AIGC 流程辅助",
      "en": "AIGC Workflow"
    },
    "description": {
      "zh": "更快生成比较样本与方向草案，但最终保留什么仍由判断决定。",
      "en": "Generate comparative drafts faster, while judgment still decides what deserves to remain."
    },
    "focus": {
      "zh": "流程 / 比较 / 筛选",
      "en": "Workflow / Comparison / Selection"
    },
    "value": {
      "zh": "提效，不替代判断",
      "en": "Accelerate the process without replacing judgment"
    }
  },
  "aigc-video": {
    "label": {
      "zh": "AIGC Video",
      "en": "AIGC Video"
    },
    "title": {
      "zh": "AIGC视频",
      "en": "AIGC Video"
    },
    "description": {
      "zh": "以 AIGC 工具辅助短视频、商业片和提案动态内容创作。",
      "en": "AIGC-assisted short video, commercial film, and motion content for proposals."
    },
    "focus": {
      "zh": "短视频 / 商业片 / 动态提案",
      "en": "Short Video / Commercial Film / Motion Pitch"
    },
    "value": {
      "zh": "把概念更快变成可观看的动态表达",
      "en": "Turn concepts into watchable motion faster"
    }
  }
};

// Work gallery image and text data -------------------------------------------
var workGalleryImages = {
  "oem": [
    {
      "title": "23 ??? / ? 2128",
      "src": "images/works/oem/23nianduanwu/1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "23 ??? / ? 2129",
      "src": "images/works/oem/23nianduanwu/2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / 2",
      "src": "images/works/oem/24nianduanwu/2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / 4 1",
      "src": "images/works/oem/24nianduanwu/4-1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / 4",
      "src": "images/works/oem/24nianduanwu/4.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / 5",
      "src": "images/works/oem/24nianduanwu/5.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / ? d7e1c0843ad3984dd0f10b377c1e0fa6",
      "src": "images/works/oem/24nianduanwu/1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / ? edbc9bf09f6b6fe5ff46617c413d261c",
      "src": "images/works/oem/24nianduanwu/6.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / ? f0e6aae672c6a9fdba536b14f56b8369",
      "src": "images/works/oem/24nianduanwu/7.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / 69f4e228dc3023cccc50614c9cd1c92d",
      "src": "images/works/oem/24nianzhongqiu/1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / 741ec1f70c19da7b0c2e43d93168aac4",
      "src": "images/works/oem/24nianzhongqiu/2.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / 48568aba65e2869e012c7241157263cd",
      "src": "images/works/oem/24nianzhongqiu/3.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / 99305b1073245b4e88842a66499d789f",
      "src": "images/works/oem/24nianzhongqiu/4.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / c3c0c419a463034be778ff965df78227",
      "src": "images/works/oem/24nianzhongqiu/5.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / ? 8ab939e6c1ff2264f2e7654412a607f9",
      "src": "images/works/oem/24nianzhongqiu/1-1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / ? 7173a7bd5c6fef11a258d3ff90779ef4",
      "src": "images/works/oem/24nianzhongqiu/4-4.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "24 ??? / ? 9798d144d7bdcf657882930968b4c82d",
      "src": "images/works/oem/24nianzhongqiu/2-2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / ? d38a0cd6d006be1773b3f4fd25defa0e",
      "src": "images/works/oem/24nianzhongqiu/5-5.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "24 ??? / ? f38a134ba255715232b301358034f7ee",
      "src": "images/works/oem/24nianzhongqiu/3-3.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 03 01",
      "src": "images/works/oem/chaojizongbang/03-01.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 03 02",
      "src": "images/works/oem/chaojizongbang/03-02.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 03 03",
      "src": "images/works/oem/chaojizongbang/03-03.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 03",
      "src": "images/works/oem/chaojizongbang/03.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 04 01",
      "src": "images/works/oem/fengweirenjian/04-01.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 04 02",
      "src": "images/works/oem/fengweirenjian/04-02.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 04 03",
      "src": "images/works/oem/fengweirenjian/04-03.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 04 04",
      "src": "images/works/oem/fengweirenjian/04-04.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 04",
      "src": "images/works/oem/fengweirenjian/04.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 蛋黄酥效果1",
      "src": "images/works/oem/gaoshangyoudian/蛋黄酥效果1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 鸡蛋仔 蓝1 1",
      "src": "images/works/oem/gaoshangyoudian/鸡蛋仔-蓝1-1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "fenglisu / 0",
      "src": "images/works/oem/gaoshangyoudian/fenglisu/0.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "guoba / 锅巴",
      "src": "images/works/oem/gaoshangyoudian/guoba/锅巴.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "lvdougao / 定胜糕",
      "src": "images/works/oem/gaoshangyoudian/lvdougao/定胜糕.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "lvdougao / 原味绿豆糕",
      "src": "images/works/oem/gaoshangyoudian/lvdougao/原味绿豆糕.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / ? 563",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG563.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / ? 564",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG564.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / ? 711",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG711.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / ? 712",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG712.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / ? 713",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG713.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / ? 714",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG714.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / ? 715",
      "src": "images/works/oem/gaoshangyoudian/WechatIMG715.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "??? / ? 572",
      "src": "images/works/oem/gongfuzong/WechatIMG572.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / ? 572",
      "src": "images/works/oem/gongfuzong/WechatIMG572.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? / 5 1",
      "src": "images/works/oem/gongfuzongdaizi/5-1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "????? / 5 2",
      "src": "images/works/oem/gongfuzongdaizi/5-2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? / 5 3",
      "src": "images/works/oem/gongfuzongdaizi/5-3.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "????? / 5 4",
      "src": "images/works/oem/gongfuzongdaizi/5-4.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? / 5 5",
      "src": "images/works/oem/gongfuzongdaizi/5-5.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? / 5 6",
      "src": "images/works/oem/gongfuzongdaizi/5-6.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "????? 01 / 1",
      "src": "images/works/oem/gongfuzongdaizi01/1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? 01 / 2",
      "src": "images/works/oem/gongfuzongdaizi01/2.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "????? 01 / 3",
      "src": "images/works/oem/gongfuzongdaizi01/3.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? 01 / 4",
      "src": "images/works/oem/gongfuzongdaizi01/4.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? 01 / 5",
      "src": "images/works/oem/gongfuzongdaizi01/5.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "????? 01 / 6",
      "src": "images/works/oem/gongfuzongdaizi01/6.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "????? 01 / 7",
      "src": "images/works/oem/gongfuzongdaizi01/7.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "??? / ? 557",
      "src": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / ? 557",
      "src": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / 效果副本",
      "src": "images/works/oem/kexiaoxiong/嗨吃鸭卤味鸭.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "??? / 枣仁核桃",
      "src": "images/works/oem/kexiaoxiong/枣仁核桃.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / ? 709",
      "src": "images/works/oem/kexiaoxiong/WechatIMG709.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 02 01",
      "src": "images/works/oem/lognyuewanfang/02-01.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 02 02",
      "src": "images/works/oem/lognyuewanfang/02-02.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 02",
      "src": "images/works/oem/lognyuewanfang/02.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "??????? / 10款集合 2",
      "src": "images/works/oem/rouroudajuhuidaizi/10款集合 2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??????? / 10款集合",
      "src": "images/works/oem/rouroudajuhuidaizi/10款集合.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 05 01",
      "src": "images/works/oem/shanshuizongyun/05-01.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 05 02",
      "src": "images/works/oem/shanshuizongyun/05-02.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 05 03",
      "src": "images/works/oem/shanshuizongyun/05-03.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 05",
      "src": "images/works/oem/shanshuizongyun/05.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 1 1 1",
      "src": "images/works/oem/wuwunafu/1-1-1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 1",
      "src": "images/works/oem/wuwunafu/1.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / ? 691",
      "src": "images/works/oem/xiangji/WechatIMG691.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / ? 692",
      "src": "images/works/oem/xiangji/WechatIMG692.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / ? 693",
      "src": "images/works/oem/xiangji/WechatIMG693.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 01",
      "src": "images/works/oem/yanxiangduanyang/01.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒 2",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒 3",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 3.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒 4",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 4.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒 5",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 5.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒 6",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 6.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 产品摄影  中秋月饼礼盒",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 000",
      "src": "images/works/oem/zhengliuchuzong/000.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 06 01",
      "src": "images/works/oem/zhuyingqingfeng/06-01.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 06 02",
      "src": "images/works/oem/zhuyingqingfeng/06-02.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 06 03",
      "src": "images/works/oem/zhuyingqingfeng/06-03.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "???? / 06 04",
      "src": "images/works/oem/zhuyingqingfeng/06-04.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "???? / 06",
      "src": "images/works/oem/zhuyingqingfeng/06.webp",
      "position": "center",
      "size": "small"
    }
  ],
  "gift": [
    {
      "title": "23 ???? / ? 704",
      "src": "images/works/gift/23shunfengduanwu/1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "23 ???? / ? 705",
      "src": "images/works/gift/23shunfengduanwu/2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / 1.1新",
      "src": "images/works/gift/anjier/1.1新.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "??? / 固德威1",
      "src": "images/works/gift/gudewei/固德威1.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "??? / 固德威31",
      "src": "images/works/gift/gudewei/固德威31.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / 方案2效果q",
      "src": "images/works/gift/gujia/方案2效果q.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / 效果2",
      "src": "images/works/gift/gujia/效果2.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / 效果211副本",
      "src": "images/works/gift/gujia/效果211副本.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / ? 706",
      "src": "images/works/gift/shentong/WechatIMG706.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / ? 707",
      "src": "images/works/gift/shentong/WechatIMG707.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / ? 708",
      "src": "images/works/gift/shentong/WechatIMG708.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 121",
      "src": "images/works/gift/顺丰端午04/WechatIMG121.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 122",
      "src": "images/works/gift/顺丰端午04/WechatIMG122.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 123",
      "src": "images/works/gift/顺丰端午04/WechatIMG123.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 124",
      "src": "images/works/gift/顺丰端午04/WechatIMG124.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 125",
      "src": "images/works/gift/顺丰端午04/WechatIMG125.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 126",
      "src": "images/works/gift/顺丰端午04/WechatIMG126.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 127",
      "src": "images/works/gift/顺丰端午04/WechatIMG127.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 129",
      "src": "images/works/gift/顺丰端午03/WechatIMG129.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 130",
      "src": "images/works/gift/顺丰端午03/WechatIMG130.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 131",
      "src": "images/works/gift/顺丰端午03/WechatIMG131.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 132",
      "src": "images/works/gift/顺丰端午03/WechatIMG132.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 133",
      "src": "images/works/gift/顺丰端午03/WechatIMG133.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 134",
      "src": "images/works/gift/顺丰端午03/WechatIMG134.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 135",
      "src": "images/works/gift/顺丰端午02/WechatIMG135.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 136",
      "src": "images/works/gift/顺丰端午02/WechatIMG136.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 137",
      "src": "images/works/gift/顺丰端午02/WechatIMG137.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 138",
      "src": "images/works/gift/顺丰端午02/WechatIMG138.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 139",
      "src": "images/works/gift/顺丰端午02/WechatIMG139.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 140",
      "src": "images/works/gift/顺丰端午02/WechatIMG140.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 141",
      "src": "images/works/gift/顺丰端午02/WechatIMG141.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 142",
      "src": "images/works/gift/顺丰端午02/WechatIMG142.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 143",
      "src": "images/works/gift/顺丰端午02/WechatIMG143.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 144",
      "src": "images/works/gift/顺丰端午02/WechatIMG144.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 145",
      "src": "images/works/gift/顺丰端午02/WechatIMG145.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 146",
      "src": "images/works/gift/顺丰端午02/WechatIMG146.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 147",
      "src": "images/works/gift/顺丰端午02/WechatIMG147.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 149",
      "src": "images/works/gift/顺丰端午02/WechatIMG149.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 150",
      "src": "images/works/gift/顺丰端午02/WechatIMG150.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 160",
      "src": "images/works/gift/顺丰端午01/WechatIMG160.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 161",
      "src": "images/works/gift/顺丰端午01/WechatIMG161.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 162",
      "src": "images/works/gift/顺丰端午01/WechatIMG162.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 163",
      "src": "images/works/gift/顺丰端午01/WechatIMG163.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 164",
      "src": "images/works/gift/顺丰端午01/WechatIMG164.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "gift / ? 165",
      "src": "images/works/gift/顺丰端午01/WechatIMG165.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 166",
      "src": "images/works/gift/顺丰端午01/WechatIMG166.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "gift / ? 167",
      "src": "images/works/gift/顺丰端午01/WechatIMG167.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / ? 703",
      "src": "images/works/gift/zhaoyin/WechatIMG703.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / ? 872",
      "src": "images/works/gift/zhaoyin/WechatIMG872.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / ? 873",
      "src": "images/works/gift/zhaoyin/WechatIMG873.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / 8888",
      "src": "images/works/gift/zhuimi/8888.webp",
      "position": "center",
      "size": "small"
    },
    {
      "title": "?? / 袋子11",
      "src": "images/works/gift/zhuimi/袋子11.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "?? / 袋子6671",
      "src": "images/works/gift/zhuimi/袋子6671.webp",
      "position": "center",
      "size": "small"
    }
  ],
  "brand": [
    {
      "title": "TYPE FIELD",
      "src": "images/works/brand/01.webp",
      "position": "center",
      "size": "wide",
      "bg": "#e5e1d6"
    },
    {
      "title": "IDENTITY CROP",
      "src": "images/works/brand/02.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "MARK DETAIL",
      "src": "images/works/brand/03.webp",
      "position": "center",
      "size": "small",
      "bg": "#ccd4c3"
    }
  ],
  "aigc": [
    {
      "title": "PROMPT BOARD",
      "src": "images/works/aigc-video/01.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "OPTION COMPARE",
      "src": "images/works/aigc-video/02.webp",
      "position": "center",
      "size": "small",
      "bg": "#cbcbd2"
    },
    {
      "title": "DRAFT FILTER",
      "src": "images/works/aigc-video/03.webp",
      "position": "center",
      "size": "small",
      "bg": "#d7d5ce"
    }
  ],
  "aigc-video": [
    {
      "title": "AIGC VIDEO 01",
      "src": "images/works/aigc-video/01.webp",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "SHORT VIDEO FLOW",
      "src": "images/works/aigc-video/02.webp",
      "position": "center",
      "size": "small",
      "bg": "#cbcbd2"
    },
    {
      "title": "COMMERCIAL FILM STUDY",
      "src": "images/works/aigc-video/03.webp",
      "position": "center",
      "size": "wide"
    }
  ]
};

var workGalleryProjects = {
  "oem": [
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "23nianduanwu",
      "projectIndex": 0,
      "categoryIndex": 0,
      "title": "23 年端午",
      "src": "images/works/oem/23nianduanwu/1.webp",
      "cover": "images/works/oem/23nianduanwu/1.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 2,
      "items": [
        {
          "title": "23 年端午 / 图 2128",
          "src": "images/works/oem/23nianduanwu/1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "23nianduanwu",
          "categoryIndex": 0
        },
        {
          "title": "23 年端午 / 图 2129",
          "src": "images/works/oem/23nianduanwu/2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "23nianduanwu",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "24nianduanwu",
      "projectIndex": 1,
      "categoryIndex": 1,
      "title": "24 年端午",
      "src": "images/works/oem/24nianduanwu/2.webp",
      "cover": "images/works/oem/24nianduanwu/2.webp",
      "position": "center",
      "size": "small",
      "imageCount": 7,
      "items": [
        {
          "title": "24 年端午 / 2",
          "src": "images/works/oem/24nianduanwu/2.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 0
        },
        {
          "title": "24 年端午 / 4 1",
          "src": "images/works/oem/24nianduanwu/4-1.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 1
        },
        {
          "title": "24 年端午 / 4",
          "src": "images/works/oem/24nianduanwu/4.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 2
        },
        {
          "title": "24 年端午 / 5",
          "src": "images/works/oem/24nianduanwu/5.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 3
        },
        {
          "title": "24 年端午 / 图 d7e1c0843ad3984dd0f10b377c1e0fa6",
          "src": "images/works/oem/24nianduanwu/1.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 4
        },
        {
          "title": "24 年端午 / 图 edbc9bf09f6b6fe5ff46617c413d261c",
          "src": "images/works/oem/24nianduanwu/6.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 5
        },
        {
          "title": "24 年端午 / 图 f0e6aae672c6a9fdba536b14f56b8369",
          "src": "images/works/oem/24nianduanwu/7.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianduanwu",
          "categoryIndex": 6
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "24nianzhongqiu",
      "projectIndex": 2,
      "categoryIndex": 2,
      "title": "24 年中秋",
      "src": "images/works/oem/24nianzhongqiu/1.webp",
      "cover": "images/works/oem/24nianzhongqiu/1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 10,
      "items": [
        {
          "title": "24 年中秋 / 69f4e228dc3023cccc50614c9cd1c92d",
          "src": "images/works/oem/24nianzhongqiu/1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 0
        },
        {
          "title": "24 年中秋 / 741ec1f70c19da7b0c2e43d93168aac4",
          "src": "images/works/oem/24nianzhongqiu/2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 1
        },
        {
          "title": "24 年中秋 / 48568aba65e2869e012c7241157263cd",
          "src": "images/works/oem/24nianzhongqiu/3.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 2
        },
        {
          "title": "24 年中秋 / 99305b1073245b4e88842a66499d789f",
          "src": "images/works/oem/24nianzhongqiu/4.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 3
        },
        {
          "title": "24 年中秋 / c3c0c419a463034be778ff965df78227",
          "src": "images/works/oem/24nianzhongqiu/5.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 4
        },
        {
          "title": "24 年中秋 / 图 8ab939e6c1ff2264f2e7654412a607f9",
          "src": "images/works/oem/24nianzhongqiu/1-1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 5
        },
        {
          "title": "24 年中秋 / 图 7173a7bd5c6fef11a258d3ff90779ef4",
          "src": "images/works/oem/24nianzhongqiu/4-4.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 6
        },
        {
          "title": "24 年中秋 / 图 9798d144d7bdcf657882930968b4c82d",
          "src": "images/works/oem/24nianzhongqiu/2-2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 7
        },
        {
          "title": "24 年中秋 / 图 d38a0cd6d006be1773b3f4fd25defa0e",
          "src": "images/works/oem/24nianzhongqiu/5-5.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 8
        },
        {
          "title": "24 年中秋 / 图 f38a134ba255715232b301358034f7ee",
          "src": "images/works/oem/24nianzhongqiu/3-3.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "24nianzhongqiu",
          "categoryIndex": 9
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "chaojizongbang",
      "projectIndex": 3,
      "categoryIndex": 3,
      "title": "超级粽棒",
      "src": "images/works/oem/chaojizongbang/03-01.webp",
      "cover": "images/works/oem/chaojizongbang/03-01.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 4,
      "items": [
        {
          "title": "超级粽棒 / 03 01",
          "src": "images/works/oem/chaojizongbang/03-01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "chaojizongbang",
          "categoryIndex": 0
        },
        {
          "title": "超级粽棒 / 03 02",
          "src": "images/works/oem/chaojizongbang/03-02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "chaojizongbang",
          "categoryIndex": 1
        },
        {
          "title": "超级粽棒 / 03 03",
          "src": "images/works/oem/chaojizongbang/03-03.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "chaojizongbang",
          "categoryIndex": 2
        },
        {
          "title": "超级粽棒 / 03",
          "src": "images/works/oem/chaojizongbang/03.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "chaojizongbang",
          "categoryIndex": 3
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "fengweirenjian",
      "projectIndex": 4,
      "categoryIndex": 4,
      "title": "风味人间",
      "src": "images/works/oem/fengweirenjian/04-01.webp",
      "cover": "images/works/oem/fengweirenjian/04-01.webp",
      "position": "center",
      "size": "small",
      "imageCount": 5,
      "items": [
        {
          "title": "风味人间 / 04 01",
          "src": "images/works/oem/fengweirenjian/04-01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "fengweirenjian",
          "categoryIndex": 0
        },
        {
          "title": "风味人间 / 04 02",
          "src": "images/works/oem/fengweirenjian/04-02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "fengweirenjian",
          "categoryIndex": 1
        },
        {
          "title": "风味人间 / 04 03",
          "src": "images/works/oem/fengweirenjian/04-03.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "fengweirenjian",
          "categoryIndex": 2
        },
        {
          "title": "风味人间 / 04 04",
          "src": "images/works/oem/fengweirenjian/04-04.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "fengweirenjian",
          "categoryIndex": 3
        },
        {
          "title": "风味人间 / 04",
          "src": "images/works/oem/fengweirenjian/04.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "fengweirenjian",
          "categoryIndex": 4
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "gaoshangyoudian",
      "projectIndex": 5,
      "categoryIndex": 5,
      "title": "糕上有点",
      "src": "images/works/oem/gaoshangyoudian/蛋黄酥效果1.webp",
      "cover": "images/works/oem/gaoshangyoudian/蛋黄酥效果1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 13,
      "items": [
        {
          "title": "糕上有点 / 蛋黄酥效果1",
          "src": "images/works/oem/gaoshangyoudian/蛋黄酥效果1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 0
        },
        {
          "title": "糕上有点 / 鸡蛋仔 蓝1 1",
          "src": "images/works/oem/gaoshangyoudian/鸡蛋仔-蓝1-1.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 1
        },
        {
          "title": "糕上有点 / 0",
          "src": "images/works/oem/gaoshangyoudian/fenglisu/0.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 2
        },
        {
          "title": "糕上有点 / 锅巴",
          "src": "images/works/oem/gaoshangyoudian/guoba/锅巴.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 3
        },
        {
          "title": "糕上有点 / 定胜糕",
          "src": "images/works/oem/gaoshangyoudian/lvdougao/定胜糕.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 4
        },
        {
          "title": "糕上有点 / 原味绿豆糕",
          "src": "images/works/oem/gaoshangyoudian/lvdougao/原味绿豆糕.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 5
        },
        {
          "title": "糕上有点 / 图 563",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG563.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 6
        },
        {
          "title": "糕上有点 / 图 564",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG564.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 7
        },
        {
          "title": "糕上有点 / 图 711",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG711.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 8
        },
        {
          "title": "糕上有点 / 图 712",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG712.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 9
        },
        {
          "title": "糕上有点 / 图 713",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG713.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 10
        },
        {
          "title": "糕上有点 / 图 714",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG714.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 11
        },
        {
          "title": "糕上有点 / 图 715",
          "src": "images/works/oem/gaoshangyoudian/WechatIMG715.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gaoshangyoudian",
          "categoryIndex": 12
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "gongfuzong",
      "projectIndex": 6,
      "categoryIndex": 6,
      "title": "功夫粽",
      "src": "images/works/oem/gongfuzong/WechatIMG572.webp",
      "cover": "images/works/oem/gongfuzong/WechatIMG572.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 2,
      "items": [
        {
          "title": "功夫粽 / 图 572",
          "src": "images/works/oem/gongfuzong/WechatIMG572.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzong",
          "categoryIndex": 0
        },
        {
          "title": "功夫粽 / 图 572",
          "src": "images/works/oem/gongfuzong/WechatIMG572.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzong",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "gongfuzongdaizi",
      "projectIndex": 7,
      "categoryIndex": 7,
      "title": "功夫粽袋子",
      "src": "images/works/oem/gongfuzongdaizi/5-1.webp",
      "cover": "images/works/oem/gongfuzongdaizi/5-1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 6,
      "items": [
        {
          "title": "功夫粽袋子 / 5 1",
          "src": "images/works/oem/gongfuzongdaizi/5-1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 0
        },
        {
          "title": "功夫粽袋子 / 5 2",
          "src": "images/works/oem/gongfuzongdaizi/5-2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 1
        },
        {
          "title": "功夫粽袋子 / 5 3",
          "src": "images/works/oem/gongfuzongdaizi/5-3.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 2
        },
        {
          "title": "功夫粽袋子 / 5 4",
          "src": "images/works/oem/gongfuzongdaizi/5-4.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 3
        },
        {
          "title": "功夫粽袋子 / 5 5",
          "src": "images/works/oem/gongfuzongdaizi/5-5.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 4
        },
        {
          "title": "功夫粽袋子 / 5 6",
          "src": "images/works/oem/gongfuzongdaizi/5-6.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi",
          "categoryIndex": 5
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "gongfuzongdaizi01",
      "projectIndex": 8,
      "categoryIndex": 8,
      "title": "功夫粽袋子 01",
      "src": "images/works/oem/gongfuzongdaizi01/1.webp",
      "cover": "images/works/oem/gongfuzongdaizi01/1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 7,
      "items": [
        {
          "title": "功夫粽袋子 01 / 1",
          "src": "images/works/oem/gongfuzongdaizi01/1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 0
        },
        {
          "title": "功夫粽袋子 01 / 2",
          "src": "images/works/oem/gongfuzongdaizi01/2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 1
        },
        {
          "title": "功夫粽袋子 01 / 3",
          "src": "images/works/oem/gongfuzongdaizi01/3.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 2
        },
        {
          "title": "功夫粽袋子 01 / 4",
          "src": "images/works/oem/gongfuzongdaizi01/4.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 3
        },
        {
          "title": "功夫粽袋子 01 / 5",
          "src": "images/works/oem/gongfuzongdaizi01/5.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 4
        },
        {
          "title": "功夫粽袋子 01 / 6",
          "src": "images/works/oem/gongfuzongdaizi01/6.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 5
        },
        {
          "title": "功夫粽袋子 01 / 7",
          "src": "images/works/oem/gongfuzongdaizi01/7.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "gongfuzongdaizi01",
          "categoryIndex": 6
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "kexiaoxiogn",
      "projectIndex": 9,
      "categoryIndex": 9,
      "title": "可小熊",
      "src": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
      "cover": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 2,
      "items": [
        {
          "title": "可小熊 / 图 557",
          "src": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "kexiaoxiogn",
          "categoryIndex": 0
        },
        {
          "title": "可小熊 / 图 557",
          "src": "images/works/oem/kexiaoxiogn/WechatIMG557.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "kexiaoxiogn",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "kexiaoxiong",
      "projectIndex": 10,
      "categoryIndex": 10,
      "title": "可小熊",
      "src": "images/works/oem/kexiaoxiong/嗨吃鸭卤味鸭.webp",
      "cover": "images/works/oem/kexiaoxiong/嗨吃鸭卤味鸭.webp",
      "position": "center",
      "size": "small",
      "imageCount": 3,
      "items": [
        {
          "title": "可小熊 / 效果副本",
          "src": "images/works/oem/kexiaoxiong/嗨吃鸭卤味鸭.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "kexiaoxiong",
          "categoryIndex": 0
        },
        {
          "title": "可小熊 / 枣仁核桃",
          "src": "images/works/oem/kexiaoxiong/枣仁核桃.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "kexiaoxiong",
          "categoryIndex": 1
        },
        {
          "title": "可小熊 / 图 709",
          "src": "images/works/oem/kexiaoxiong/WechatIMG709.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "kexiaoxiong",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "lognyuewanfang",
      "projectIndex": 11,
      "categoryIndex": 11,
      "title": "龙悦万方",
      "src": "images/works/oem/lognyuewanfang/02-01.webp",
      "cover": "images/works/oem/lognyuewanfang/02-01.webp",
      "position": "center",
      "size": "small",
      "imageCount": 3,
      "items": [
        {
          "title": "龙悦万方 / 02 01",
          "src": "images/works/oem/lognyuewanfang/02-01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "lognyuewanfang",
          "categoryIndex": 0
        },
        {
          "title": "龙悦万方 / 02 02",
          "src": "images/works/oem/lognyuewanfang/02-02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "lognyuewanfang",
          "categoryIndex": 1
        },
        {
          "title": "龙悦万方 / 02",
          "src": "images/works/oem/lognyuewanfang/02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "lognyuewanfang",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "rouroudajuhuidaizi",
      "projectIndex": 12,
      "categoryIndex": 12,
      "title": "肉肉大聚会袋子",
      "src": "images/works/oem/rouroudajuhuidaizi/10款集合 2.webp",
      "cover": "images/works/oem/rouroudajuhuidaizi/10款集合 2.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 2,
      "items": [
        {
          "title": "肉肉大聚会袋子 / 10款集合 2",
          "src": "images/works/oem/rouroudajuhuidaizi/10款集合 2.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "rouroudajuhuidaizi",
          "categoryIndex": 0
        },
        {
          "title": "肉肉大聚会袋子 / 10款集合",
          "src": "images/works/oem/rouroudajuhuidaizi/10款集合.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "rouroudajuhuidaizi",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "shanshuizongyun",
      "projectIndex": 13,
      "categoryIndex": 13,
      "title": "山水粽韵",
      "src": "images/works/oem/shanshuizongyun/05-01.webp",
      "cover": "images/works/oem/shanshuizongyun/05-01.webp",
      "position": "center",
      "size": "small",
      "imageCount": 4,
      "items": [
        {
          "title": "山水粽韵 / 05 01",
          "src": "images/works/oem/shanshuizongyun/05-01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "shanshuizongyun",
          "categoryIndex": 0
        },
        {
          "title": "山水粽韵 / 05 02",
          "src": "images/works/oem/shanshuizongyun/05-02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "shanshuizongyun",
          "categoryIndex": 1
        },
        {
          "title": "山水粽韵 / 05 03",
          "src": "images/works/oem/shanshuizongyun/05-03.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "shanshuizongyun",
          "categoryIndex": 2
        },
        {
          "title": "山水粽韵 / 05",
          "src": "images/works/oem/shanshuizongyun/05.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "shanshuizongyun",
          "categoryIndex": 3
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "wuwunafu",
      "projectIndex": 14,
      "categoryIndex": 14,
      "title": "五五纳福",
      "src": "images/works/oem/wuwunafu/1-1-1.webp",
      "cover": "images/works/oem/wuwunafu/1-1-1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 2,
      "items": [
        {
          "title": "五五纳福 / 1 1 1",
          "src": "images/works/oem/wuwunafu/1-1-1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "wuwunafu",
          "categoryIndex": 0
        },
        {
          "title": "五五纳福 / 1",
          "src": "images/works/oem/wuwunafu/1.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "wuwunafu",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "xiangji",
      "projectIndex": 15,
      "categoryIndex": 15,
      "title": "祥记",
      "src": "images/works/oem/xiangji/WechatIMG691.webp",
      "cover": "images/works/oem/xiangji/WechatIMG691.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 3,
      "items": [
        {
          "title": "祥记 / 图 691",
          "src": "images/works/oem/xiangji/WechatIMG691.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "xiangji",
          "categoryIndex": 0
        },
        {
          "title": "祥记 / 图 692",
          "src": "images/works/oem/xiangji/WechatIMG692.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "xiangji",
          "categoryIndex": 1
        },
        {
          "title": "祥记 / 图 693",
          "src": "images/works/oem/xiangji/WechatIMG693.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "xiangji",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "yanxiangduanyang",
      "projectIndex": 16,
      "categoryIndex": 16,
      "title": "燕享端阳",
      "src": "images/works/oem/yanxiangduanyang/01.webp",
      "cover": "images/works/oem/yanxiangduanyang/01.webp",
      "position": "center",
      "size": "small",
      "imageCount": 1,
      "items": [
        {
          "title": "燕享端阳 / 01",
          "src": "images/works/oem/yanxiangduanyang/01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "yanxiangduanyang",
          "categoryIndex": 0
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "yuexiashaoguang",
      "projectIndex": 17,
      "categoryIndex": 17,
      "title": "月下韶光",
      "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 2.webp",
      "cover": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 2.webp",
      "position": "center",
      "size": "small",
      "imageCount": 6,
      "items": [
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒 2",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 2.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 0
        },
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒 3",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 3.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 1
        },
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒 4",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 4.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 2
        },
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒 5",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 5.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 3
        },
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒 6",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒 6.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 4
        },
        {
          "title": "月下韶光 / 产品摄影  中秋月饼礼盒",
          "src": "images/works/oem/yuexiashaoguang/产品摄影  中秋月饼礼盒.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "yuexiashaoguang",
          "categoryIndex": 5
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "zhengliuchuzong",
      "projectIndex": 18,
      "categoryIndex": 18,
      "title": "蒸馏初粽",
      "src": "images/works/oem/zhengliuchuzong/000.webp",
      "cover": "images/works/oem/zhengliuchuzong/000.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 1,
      "items": [
        {
          "title": "蒸馏初粽 / 000",
          "src": "images/works/oem/zhengliuchuzong/000.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "zhengliuchuzong",
          "categoryIndex": 0
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "oem",
      "projectKey": "zhuyingqingfeng",
      "projectIndex": 19,
      "categoryIndex": 19,
      "title": "竹影清风",
      "src": "images/works/oem/zhuyingqingfeng/06-01.webp",
      "cover": "images/works/oem/zhuyingqingfeng/06-01.webp",
      "position": "center",
      "size": "small",
      "imageCount": 5,
      "items": [
        {
          "title": "竹影清风 / 06 01",
          "src": "images/works/oem/zhuyingqingfeng/06-01.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "zhuyingqingfeng",
          "categoryIndex": 0
        },
        {
          "title": "竹影清风 / 06 02",
          "src": "images/works/oem/zhuyingqingfeng/06-02.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "zhuyingqingfeng",
          "categoryIndex": 1
        },
        {
          "title": "竹影清风 / 06 03",
          "src": "images/works/oem/zhuyingqingfeng/06-03.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "zhuyingqingfeng",
          "categoryIndex": 2
        },
        {
          "title": "竹影清风 / 06 04",
          "src": "images/works/oem/zhuyingqingfeng/06-04.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "oem",
          "projectKey": "zhuyingqingfeng",
          "categoryIndex": 3
        },
        {
          "title": "竹影清风 / 06",
          "src": "images/works/oem/zhuyingqingfeng/06.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "oem",
          "projectKey": "zhuyingqingfeng",
          "categoryIndex": 4
        }
      ]
    }
  ],
  "gift": [
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "23shunfengduanwu",
      "projectIndex": 0,
      "categoryIndex": 0,
      "title": "23 顺丰端午",
      "src": "images/works/gift/23shunfengduanwu/1.webp",
      "cover": "images/works/gift/23shunfengduanwu/1.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 2,
      "items": [
        {
          "title": "23 顺丰端午 / 图 704",
          "src": "images/works/gift/23shunfengduanwu/1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "23shunfengduanwu",
          "categoryIndex": 0
        },
        {
          "title": "23 顺丰端午 / 图 705",
          "src": "images/works/gift/23shunfengduanwu/2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "23shunfengduanwu",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "anjier",
      "projectIndex": 1,
      "categoryIndex": 1,
      "title": "安吉尔",
      "src": "images/works/gift/anjier/1.1新.webp",
      "cover": "images/works/gift/anjier/1.1新.webp",
      "position": "center",
      "size": "small",
      "imageCount": 1,
      "items": [
        {
          "title": "安吉尔 / 1.1新",
          "src": "images/works/gift/anjier/1.1新.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "anjier",
          "categoryIndex": 0
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "gudewei",
      "projectIndex": 2,
      "categoryIndex": 2,
      "title": "固德威",
      "src": "images/works/gift/gudewei/固德威1.webp",
      "cover": "images/works/gift/gudewei/固德威1.webp",
      "position": "center",
      "size": "small",
      "imageCount": 2,
      "items": [
        {
          "title": "固德威 / 固德威1",
          "src": "images/works/gift/gudewei/固德威1.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "gudewei",
          "categoryIndex": 0
        },
        {
          "title": "固德威 / 固德威31",
          "src": "images/works/gift/gudewei/固德威31.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "gudewei",
          "categoryIndex": 1
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "gujia",
      "projectIndex": 3,
      "categoryIndex": 3,
      "title": "顾家",
      "src": "images/works/gift/gujia/方案2效果q.webp",
      "cover": "images/works/gift/gujia/方案2效果q.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 3,
      "items": [
        {
          "title": "顾家 / 方案2效果q",
          "src": "images/works/gift/gujia/方案2效果q.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "gujia",
          "categoryIndex": 0
        },
        {
          "title": "顾家 / 效果2",
          "src": "images/works/gift/gujia/效果2.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "gujia",
          "categoryIndex": 1
        },
        {
          "title": "顾家 / 效果211副本",
          "src": "images/works/gift/gujia/效果211副本.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "gujia",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "root",
      "projectIndex": 4,
      "categoryIndex": 4,
      "title": "礼品散图",
      "src": "images/works/gift/顺丰端午04/WechatIMG121.webp",
      "cover": "images/works/gift/顺丰端午04/WechatIMG121.webp",
      "position": "center",
      "size": "small",
      "imageCount": 36,
      "items": [
        {
          "title": "礼品散图 / 图 121",
          "src": "images/works/gift/顺丰端午04/WechatIMG121.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 0
        },
        {
          "title": "礼品散图 / 图 122",
          "src": "images/works/gift/顺丰端午04/WechatIMG122.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 1
        },
        {
          "title": "礼品散图 / 图 123",
          "src": "images/works/gift/顺丰端午04/WechatIMG123.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 2
        },
        {
          "title": "礼品散图 / 图 124",
          "src": "images/works/gift/顺丰端午04/WechatIMG124.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 3
        },
        {
          "title": "礼品散图 / 图 125",
          "src": "images/works/gift/顺丰端午04/WechatIMG125.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 4
        },
        {
          "title": "礼品散图 / 图 126",
          "src": "images/works/gift/顺丰端午04/WechatIMG126.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 5
        },
        {
          "title": "礼品散图 / 图 127",
          "src": "images/works/gift/顺丰端午04/WechatIMG127.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 6
        },
        {
          "title": "礼品散图 / 图 129",
          "src": "images/works/gift/顺丰端午03/WechatIMG129.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 7
        },
        {
          "title": "礼品散图 / 图 130",
          "src": "images/works/gift/顺丰端午03/WechatIMG130.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 8
        },
        {
          "title": "礼品散图 / 图 131",
          "src": "images/works/gift/顺丰端午03/WechatIMG131.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 9
        },
        {
          "title": "礼品散图 / 图 132",
          "src": "images/works/gift/顺丰端午03/WechatIMG132.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 10
        },
        {
          "title": "礼品散图 / 图 133",
          "src": "images/works/gift/顺丰端午03/WechatIMG133.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 11
        },
        {
          "title": "礼品散图 / 图 134",
          "src": "images/works/gift/顺丰端午03/WechatIMG134.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 12
        },
        {
          "title": "礼品散图 / 图 135",
          "src": "images/works/gift/顺丰端午02/WechatIMG135.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 13
        },
        {
          "title": "礼品散图 / 图 136",
          "src": "images/works/gift/顺丰端午02/WechatIMG136.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 14
        },
        {
          "title": "礼品散图 / 图 137",
          "src": "images/works/gift/顺丰端午02/WechatIMG137.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 15
        },
        {
          "title": "礼品散图 / 图 138",
          "src": "images/works/gift/顺丰端午02/WechatIMG138.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 16
        },
        {
          "title": "礼品散图 / 图 139",
          "src": "images/works/gift/顺丰端午02/WechatIMG139.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 17
        },
        {
          "title": "礼品散图 / 图 140",
          "src": "images/works/gift/顺丰端午02/WechatIMG140.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 18
        },
        {
          "title": "礼品散图 / 图 141",
          "src": "images/works/gift/顺丰端午02/WechatIMG141.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 19
        },
        {
          "title": "礼品散图 / 图 142",
          "src": "images/works/gift/顺丰端午02/WechatIMG142.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 20
        },
        {
          "title": "礼品散图 / 图 143",
          "src": "images/works/gift/顺丰端午02/WechatIMG143.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 21
        },
        {
          "title": "礼品散图 / 图 144",
          "src": "images/works/gift/顺丰端午02/WechatIMG144.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 22
        },
        {
          "title": "礼品散图 / 图 145",
          "src": "images/works/gift/顺丰端午02/WechatIMG145.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 23
        },
        {
          "title": "礼品散图 / 图 146",
          "src": "images/works/gift/顺丰端午02/WechatIMG146.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 24
        },
        {
          "title": "礼品散图 / 图 147",
          "src": "images/works/gift/顺丰端午02/WechatIMG147.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 25
        },
        {
          "title": "礼品散图 / 图 149",
          "src": "images/works/gift/顺丰端午02/WechatIMG149.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 26
        },
        {
          "title": "礼品散图 / 图 150",
          "src": "images/works/gift/顺丰端午02/WechatIMG150.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 27
        },
        {
          "title": "礼品散图 / 图 160",
          "src": "images/works/gift/顺丰端午01/WechatIMG160.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 28
        },
        {
          "title": "礼品散图 / 图 161",
          "src": "images/works/gift/顺丰端午01/WechatIMG161.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 29
        },
        {
          "title": "礼品散图 / 图 162",
          "src": "images/works/gift/顺丰端午01/WechatIMG162.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 30
        },
        {
          "title": "礼品散图 / 图 163",
          "src": "images/works/gift/顺丰端午01/WechatIMG163.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 31
        },
        {
          "title": "礼品散图 / 图 164",
          "src": "images/works/gift/顺丰端午01/WechatIMG164.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 32
        },
        {
          "title": "礼品散图 / 图 165",
          "src": "images/works/gift/顺丰端午01/WechatIMG165.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 33
        },
        {
          "title": "礼品散图 / 图 166",
          "src": "images/works/gift/顺丰端午01/WechatIMG166.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 34
        },
        {
          "title": "礼品散图 / 图 167",
          "src": "images/works/gift/顺丰端午01/WechatIMG167.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "root",
          "categoryIndex": 35
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "shentong",
      "projectIndex": 5,
      "categoryIndex": 5,
      "title": "申通",
      "src": "images/works/gift/shentong/WechatIMG706.webp",
      "cover": "images/works/gift/shentong/WechatIMG706.webp",
      "position": "center",
      "size": "small",
      "imageCount": 3,
      "items": [
        {
          "title": "申通 / 图 706",
          "src": "images/works/gift/shentong/WechatIMG706.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "shentong",
          "categoryIndex": 0
        },
        {
          "title": "申通 / 图 707",
          "src": "images/works/gift/shentong/WechatIMG707.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "shentong",
          "categoryIndex": 1
        },
        {
          "title": "申通 / 图 708",
          "src": "images/works/gift/shentong/WechatIMG708.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "shentong",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "zhaoyin",
      "projectIndex": 6,
      "categoryIndex": 6,
      "title": "招银",
      "src": "images/works/gift/zhaoyin/WechatIMG703.webp",
      "cover": "images/works/gift/zhaoyin/WechatIMG703.webp",
      "position": "center",
      "size": "wide",
      "imageCount": 3,
      "items": [
        {
          "title": "招银 / 图 703",
          "src": "images/works/gift/zhaoyin/WechatIMG703.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "zhaoyin",
          "categoryIndex": 0
        },
        {
          "title": "招银 / 图 872",
          "src": "images/works/gift/zhaoyin/WechatIMG872.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "zhaoyin",
          "categoryIndex": 1
        },
        {
          "title": "招银 / 图 873",
          "src": "images/works/gift/zhaoyin/WechatIMG873.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "zhaoyin",
          "categoryIndex": 2
        }
      ]
    },
    {
      "isProject": true,
      "categoryKey": "gift",
      "projectKey": "zhuimi",
      "projectIndex": 7,
      "categoryIndex": 7,
      "title": "追觅",
      "src": "images/works/gift/zhuimi/8888.webp",
      "cover": "images/works/gift/zhuimi/8888.webp",
      "position": "center",
      "size": "small",
      "imageCount": 3,
      "items": [
        {
          "title": "追觅 / 8888",
          "src": "images/works/gift/zhuimi/8888.webp",
          "position": "center",
          "size": "wide",
          "categoryKey": "gift",
          "projectKey": "zhuimi",
          "categoryIndex": 0
        },
        {
          "title": "追觅 / 袋子11",
          "src": "images/works/gift/zhuimi/袋子11.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "zhuimi",
          "categoryIndex": 1
        },
        {
          "title": "追觅 / 袋子6671",
          "src": "images/works/gift/zhuimi/袋子6671.webp",
          "position": "center",
          "size": "small",
          "categoryKey": "gift",
          "projectKey": "zhuimi",
          "categoryIndex": 2
        }
      ]
    }
  ]
};

var galleryText = {
  "zh": {
    "back": "返回",
    "close": "关闭",
    "project": "项目",
    "giftTitle": "礼品项目",
    "categoryTitles": {
      "oem": "OEM 包装项目",
      "gift": "礼品项目",
      "brand": "品牌与字体项目",
      "aigc": "AI 工作流"
    },
    "categoryDescriptions": {
      "oem": "贴牌、系列包装与渠道交付，重点处理结构、识别和量产可行性。",
      "gift": "面向节礼、福利与礼赠渠道，把场景、预算和交付节奏放进包装判断。",
      "brand": "品牌、字体与视觉系统补强，让包装识别和系列延展更完整。",
      "aigc": "用 AI 工具做方向探索、提案比较和视频内容创作，提高效率，但判断本身不外包。"
    },
    "tags": [
      "包装",
      "视觉方向",
      "交付"
    ],
    "summary": "以渠道清晰度、生产可行性和稳定视觉系统为核心的包装方向。",
    "body": [
      "设计范围包括包装结构、画面节奏、识别层级与提案输出。",
      "方案需要在视觉表达、材料、成本、工艺与交付约束之间保持平衡。"
    ]
  },
  "en": {
    "back": "Back",
    "close": "Close",
    "project": "Project",
    "giftTitle": "Gift Project",
    "categoryTitles": {
      "oem": "OEM Packaging Project",
      "gift": "Gift Project",
      "brand": "Brand & Type",
      "aigc": "AI Workflow"
    },
    "categoryDescriptions": {
      "oem": "Private-label and series packaging focused on structure, recognition, and production-ready delivery.",
      "gift": "Gift and welfare-channel packaging shaped around occasion, budget, and delivery rhythm.",
      "brand": "Brand, type, and visual-system support that makes packaging recognition more complete.",
      "aigc": "AI tools for direction exploration, proposal comparison, and video content — accelerating the process while keeping judgment in-house."
    },
    "tags": [
      "PACKAGING",
      "ART DIRECTION",
      "DELIVERY"
    ],
    "summary": "A focused packaging direction built around channel clarity, production feasibility, and a calm visual system that can hold up in real use.",
    "body": [
      "Design scope includes packaging structure, surface rhythm, recognition hierarchy, and presentation-ready visual output.",
      "The work balances visual expression with material, cost, process, and delivery constraints."
    ]
  }
};


/* --- scripts/audio-feedback.js --- */
(() => {
  let soundEnabled = true;
  let audioContext = null;
  let lastToneAt = 0;
  let lastWaterDropAt = 0;
  let lastUnlockAt = 0;
  const UI_TONE_GAIN = 0.06;
  const WATER_DROP_GAIN = 0.04;
  const UNLOCK_TONE_GAIN = 0.075;
  const BACKGROUND_MUSIC_SRC = "audio/liquid-light-loop.mp3";
  const BACKGROUND_MUSIC_VOLUME = 0.24;
  let backgroundAudio = null;
  let backgroundRequested = false;
  let backgroundFadeFrame = 0;

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
    if (type === "hover") return;

    const nowMs = performance.now();
    if (nowMs - lastToneAt < 180) return;
    lastToneAt = nowMs;

    const context = await getAudioContext().catch(() => null);
    if (!context || context.state !== "running") return;

    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const base = 620;

    osc.type = "sine";
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(base * 0.72, now + 0.1);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(UI_TONE_GAIN, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  const playWaterDrop = async () => {
    if (!soundEnabled) return;
    const nowMs = performance.now();
    if (nowMs - lastWaterDropAt < 420) return;
    lastWaterDropAt = nowMs;

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

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, now);
    filter.Q.setValueAtTime(0.7, now);

    osc.type = "sine";
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(390, now + 0.11);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(WATER_DROP_GAIN, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  const playUnlockTone = async ({ delayMs = 0 } = {}) => {
    if (!soundEnabled) return false;
    const nowMs = performance.now();
    if (nowMs - lastUnlockAt < 520) return false;

    const context = await getAudioContext().catch(() => null);
    if (!context || context.state !== "running") return false;
    lastUnlockAt = nowMs;

    const scheduledDelayMs = Number.isFinite(delayMs) ? Math.max(0, delayMs) : 0;
    const startAt = context.currentTime + scheduledDelayMs * 0.001;
    const master = context.createGain();
    const click = context.createOscillator();
    const clickGain = context.createGain();
    const clickFilter = context.createBiquadFilter();
    const latch = context.createOscillator();
    const latchGain = context.createGain();
    const latchFilter = context.createBiquadFilter();

    master.gain.setValueAtTime(UNLOCK_TONE_GAIN, startAt);
    master.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.24);

    click.type = "triangle";
    click.frequency.setValueAtTime(1480, startAt);
    click.frequency.exponentialRampToValueAtTime(980, startAt + 0.028);
    clickFilter.type = "bandpass";
    clickFilter.frequency.setValueAtTime(2100, startAt);
    clickFilter.Q.setValueAtTime(5.2, startAt);
    clickGain.gain.setValueAtTime(0.0001, startAt);
    clickGain.gain.exponentialRampToValueAtTime(0.82, startAt + 0.005);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.045);

    latch.type = "sine";
    latch.frequency.setValueAtTime(260, startAt + 0.035);
    latch.frequency.exponentialRampToValueAtTime(155, startAt + 0.145);
    latchFilter.type = "lowpass";
    latchFilter.frequency.setValueAtTime(760, startAt);
    latchFilter.Q.setValueAtTime(1.35, startAt);
    latchGain.gain.setValueAtTime(0.0001, startAt);
    latchGain.gain.setValueAtTime(0.46, startAt + 0.038);
    latchGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.18);

    click.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(master);
    latch.connect(latchFilter);
    latchFilter.connect(latchGain);
    latchGain.connect(master);
    master.connect(context.destination);

    click.start(startAt);
    click.stop(startAt + 0.055);
    latch.start(startAt + 0.035);
    latch.stop(startAt + 0.2);
    return true;
  };

  const getBackgroundAudio = () => {
    if (backgroundAudio) return backgroundAudio;

    backgroundAudio = new Audio(BACKGROUND_MUSIC_SRC);
    backgroundAudio.loop = true;
    backgroundAudio.preload = "none";
    backgroundAudio.volume = 0;
    return backgroundAudio;
  };

  const cancelBackgroundFade = () => {
    if (!backgroundFadeFrame) return;
    cancelAnimationFrame(backgroundFadeFrame);
    backgroundFadeFrame = 0;
  };

  const clampVolume = (value) => Math.max(0, Math.min(1, value));

  const fadeBackgroundMusic = (targetVolume, duration = 560, onDone) => {
    const audio = backgroundAudio;
    if (!audio) {
      onDone?.();
      return;
    }

    const target = clampVolume(targetVolume);
    cancelBackgroundFade();

    if (duration <= 0) {
      audio.volume = clampVolume(target);
      onDone?.();
      return;
    }

    const startVolume = audio.volume;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = clampVolume(startVolume + (target - startVolume) * eased);

      if (progress < 1) {
        backgroundFadeFrame = requestAnimationFrame(step);
        return;
      }

      backgroundFadeFrame = 0;
      audio.volume = clampVolume(target);
      onDone?.();
    };

    backgroundFadeFrame = requestAnimationFrame(step);
  };

  const playBackgroundMusic = async ({ request = true, fade = true } = {}) => {
    if (request) backgroundRequested = true;
    if (!backgroundRequested || !soundEnabled) return false;

    const audio = getBackgroundAudio();
    audio.muted = false;

    try {
      await audio.play();
      fadeBackgroundMusic(BACKGROUND_MUSIC_VOLUME, fade ? 680 : 0);
      document.body?.classList.add("music-active");
      return true;
    } catch {
      document.body?.classList.remove("music-active");
      return false;
    }
  };

  const pauseBackgroundMusic = ({ remember = false, fade = true } = {}) => {
    if (!remember) backgroundRequested = false;
    if (!backgroundAudio) return Promise.resolve(null);

    return new Promise((resolve) => {
      fadeBackgroundMusic(0, fade ? 360 : 0, () => {
        backgroundAudio.pause();
        document.body?.classList.remove("music-active");
        resolve(null);
      });
    });
  };

  const suspendAudioContext = () => (
    audioContext?.state === "running"
      ? audioContext.suspend().catch(() => null)
      : Promise.resolve(null)
  );

  window.LucianAudio = {
    getAudioContext,
    playUiTone,
    playWaterDrop,
    playUnlockTone,
    startBackgroundMusic(options) {
      return playBackgroundMusic(options);
    },
    resumeBackgroundMusic(options) {
      return playBackgroundMusic({ ...options, request: false });
    },
    pauseBackgroundMusic,
    isBackgroundMusicRequested() {
      return backgroundRequested;
    },
    getBackgroundMusicState() {
      return {
        requested: backgroundRequested,
        exists: Boolean(backgroundAudio),
        src: backgroundAudio?.currentSrc || backgroundAudio?.src || BACKGROUND_MUSIC_SRC,
        loop: Boolean(backgroundAudio?.loop),
        paused: Boolean(backgroundAudio?.paused),
        volume: backgroundAudio?.volume ?? 0,
        readyState: backgroundAudio?.readyState ?? 0,
      };
    },
    suspendAudioContext,
    setSoundEnabled(value) {
      soundEnabled = Boolean(value);
      if (!soundEnabled) {
        pauseBackgroundMusic({ remember: true });
      } else if (backgroundRequested) {
        playBackgroundMusic({ request: false }).catch(() => null);
      }
    },
    isSoundEnabled() {
      return soundEnabled;
    },
  };
})();


/* --- scripts/hero-state-runtime.js --- */
window.initHeroStateRuntime = () => ({
  hasEntered: false,
});


/* --- scripts/hero-sequence-runtime.js --- */
window.initHeroSequenceRuntime = ({
  heroState,
  heroStage,
  fieldPointer,
}) => {
  const stageMotion = {
    width: 0,
    height: 0,
    startAt: performance.now(),
  };

  const resizeStage = () => {
    if (!heroStage) return;
    const rect = heroStage.getBoundingClientRect();
    stageMotion.width = rect.width;
    stageMotion.height = rect.height;
  };

  const forceScrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const resetHeroSequenceState = ({ resetScroll = false } = {}) => {
    if (resetScroll) forceScrollTop();

    heroState.hasEntered = Boolean(heroState.hasEntered);
    fieldPointer.active = false;

    document.documentElement.classList.remove("snap-active");
    heroStage?.style.setProperty("--hero-scroll-progress", "0");
    heroStage?.style.setProperty("--hero-intro-progress", "0");
    heroStage?.style.setProperty("--hero-tail-fade", "1");

    resizeStage();
  };

  return {
    stageMotion,
    resizeStage,
    forceScrollTop,
    resetHeroSequenceState,
  };
};


/* --- scripts/runtime-bridge.js --- */
window.initLucianRuntimeBridge = ({
  reducedMotion,
  entryScreen,
  heroStage,
  precisionCursor,
  precisionGuides,
  fieldPointer,
  getAudioContext,
  playUiTone,
  playWaterDrop,
  getLanguageController,
  getHeroSequenceController,
  getHeroState,
}) => {
  const setCursorVisible = (visible) => {
    if (!precisionCursor) return;
    const allowed = visible && entryScreen;
    const showGuides = allowed && !document.body.classList.contains("has-entered");
    precisionCursor.classList.toggle("is-visible", allowed);
    precisionGuides?.classList.toggle("is-visible", showGuides);
    document.body.classList.toggle("cursor-active", showGuides);
    if (document.body.classList.contains("has-entered")) {
      document.body.classList.remove("cursor-active");
    }
  };

  const updatePrecisionCursor = (clientX, clientY) => {
    if (!precisionCursor) return;
    precisionCursor.style.left = `${clientX}px`;
    precisionCursor.style.top = `${clientY}px`;
    document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
  };

  const clearFieldPointer = () => {
    fieldPointer.active = false;
  };

  const runtime = {
    reducedMotion,
    playUiTone,
    playUnlockTone(options) {
      return window.LucianAudio?.playUnlockTone?.(options) || Promise.resolve(false);
    },
    getAudioContext,
    suspendAudioContext() {
      return window.LucianAudio?.suspendAudioContext?.() || Promise.resolve(null);
    },
    startBackgroundMusic(options) {
      return window.LucianAudio?.startBackgroundMusic?.(options) || Promise.resolve(false);
    },
    resumeBackgroundMusic(options) {
      return window.LucianAudio?.resumeBackgroundMusic?.(options) || Promise.resolve(false);
    },
    pauseBackgroundMusic(options) {
      return window.LucianAudio?.pauseBackgroundMusic?.(options) || Promise.resolve(null);
    },
    setSoundEnabled(value) {
      window.LucianAudio?.setSoundEnabled?.(value);
    },
    isSoundEnabled() {
      return window.LucianAudio?.isSoundEnabled?.() || false;
    },
    getCurrentLang() {
      return getLanguageController?.()?.getCurrentLang?.() || "zh";
    },
    switchLanguage(lang) {
      getLanguageController?.()?.switchLanguage?.(lang);
    },
    closeWorkGallery() {
      window.LucianWorkGallery?.close?.();
    },
    setCursorVisible,
    updatePrecisionCursor,
    get entryScreen() {
      return entryScreen;
    },
    get heroStage() {
      return heroStage;
    },
    setFieldPointer(value = {}) {
      if (typeof value.x === "number") fieldPointer.x = value.x;
      if (typeof value.y === "number") fieldPointer.y = value.y;
      if (typeof value.active === "boolean") fieldPointer.active = value.active;
    },
    clearHeroPointerState: clearFieldPointer,
    clearFieldPointer,
    forceScrollTop() {
      getHeroSequenceController?.()?.forceScrollTop?.();
    },
    resetHeroSequenceState(options) {
      getHeroSequenceController?.()?.resetHeroSequenceState?.(options);
    },
    resizeStage() {
      getHeroSequenceController?.()?.resizeStage?.();
    },
    setEntered(value) {
      const heroState = getHeroState?.();
      if (heroState) heroState.hasEntered = value;
    },
    isEntered() {
      return getHeroState?.()?.hasEntered || false;
    },
  };

  window.LucianRuntime = runtime;

  const installHeroRipples = () => {
    runtime.heroRipples = {
      get stage() {
        return heroStage;
      },
      reducedMotion,
      playWaterDrop,
    };
  };

  const installAudioUnlock = () => {
    window.addEventListener(
      "pointerdown",
      () => {
        if (window.LucianAudio?.isSoundEnabled?.()) {
          getAudioContext().catch(() => null);
          window.LucianAudio?.resumeBackgroundMusic?.().catch(() => null);
        }
      },
      { once: true, passive: true }
    );
  };

  return {
    runtime,
    setCursorVisible,
    updatePrecisionCursor,
    installHeroRipples,
    installAudioUnlock,
  };
};


/* --- scripts/app-bootstrap.js --- */
window.initLucianApp = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let languageController = null;
  let heroSequenceController = null;
  let runtimeBridge = null;
  const heroState = window.initHeroStateRuntime?.() || {
    hasEntered: false,
  };
  const fieldPointer = { x: 0.5, y: 0.5, active: false };
  const precisionCursor = document.querySelector("#precision-cursor");
  const precisionGuides = document.querySelector("#precision-guides");
  const langButtons = Array.from(document.querySelectorAll(".lang-button"));
  const heroStage = document.querySelector("#hero-stage");
  const entryScreen = document.querySelector("#entry-screen");

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const getAudioContext = () => window.LucianAudio?.getAudioContext?.() || Promise.resolve(null);
  const playUiTone = (type = "hover") => window.LucianAudio?.playUiTone?.(type);
  const playWaterDrop = () => window.LucianAudio?.playWaterDrop?.();

  runtimeBridge = window.initLucianRuntimeBridge?.({
    reducedMotion,
    entryScreen,
    heroStage,
    precisionCursor,
    precisionGuides,
    fieldPointer,
    getAudioContext,
    playUiTone,
    playWaterDrop,
    getLanguageController() {
      return languageController;
    },
    getHeroSequenceController() {
      return heroSequenceController;
    },
    getHeroState() {
      return heroState;
    },
  }) || null;

  runtimeBridge?.installHeroRipples?.();
  runtimeBridge?.installAudioUnlock?.();

  window.addEventListener("resize", () => {
    heroSequenceController?.resizeStage?.();
  });

  languageController = window.initLanguageRuntime?.({
    initialLang: "zh",
    langButtons,
  }) || null;
  languageController?.switchLanguage?.("zh");

  heroSequenceController = window.initHeroSequenceRuntime?.({
    heroState,
    heroStage,
    fieldPointer,
  }) || null;
  heroSequenceController?.resizeStage?.();
  heroSequenceController?.resetHeroSequenceState?.({ resetScroll: true });

  return {
    heroState,
    fieldPointer,
    runtimeBridge,
    get languageController() {
      return languageController;
    },
    get heroSequenceController() {
      return heroSequenceController;
    },
  };
};


/* --- scripts/static-text-runtime.js --- */
window.LucianStaticText = {
  update(currentLang, { langButtons = [] } = {}) {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const value = window.i18n?.[currentLang]?.[key];
      if (!value) return;

      const pillLabel = node.querySelector?.(".label-stack");
      if (pillLabel) {
        pillLabel.querySelectorAll(".pill-label").forEach((span) => {
          span.textContent = value;
        });
        node.setAttribute("aria-label", value);
      } else {
        node.textContent = value;
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === currentLang);
      if (button.dataset.lang === "zh") button.textContent = "\u4e2d";
      if (button.dataset.lang === "en") button.textContent = "EN";
    });
  },
};


/* --- scripts/language-runtime.js --- */
window.initLanguageRuntime = ({
  initialLang = "zh",
  langButtons = [],
  onChange,
} = {}) => {
  let currentLang = initialLang;

  const switchLanguage = (lang) => {
    currentLang = lang;
    window.LucianScrambledText?.restore?.();
    window.LucianStaticText?.update?.(currentLang, { langButtons });
    window.LucianFlipText?.refresh?.();
    window.LucianScrambledText?.init?.();
    window.LucianAboutScrollReveal?.refresh?.();
    window.LucianWorksFlowingMenu?.refresh?.();
    window.rebuildServicesStoryText?.();
    onChange?.(currentLang);
    window.LucianWorkGallery?.refreshLanguage?.();
    window.LucianWorkInfiniteGallery?.refreshLanguage?.();
    window.LucianWorkCategoryShowcase?.refreshLanguage?.();
  };

  return {
    switchLanguage,
    getCurrentLang() {
      return currentLang;
    },
  };
};


/* --- scripts/flip-text.js --- */
(() => {
  const splitWord = (word) => {
    const text = word.textContent || "";
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized) return;
    if (word.dataset.flipSource === normalized && word.querySelector(".flip-char")) return;

    const fragment = document.createDocumentFragment();
    let index = 0;

    Array.from(normalized).forEach((char) => {
      if (/\s/.test(char)) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }

      const span = document.createElement("span");
      span.className = "flip-char";
      span.textContent = char;
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--flip-index", String(index));
      fragment.appendChild(span);
      index += 1;
    });

    word.textContent = "";
    word.appendChild(fragment);
    word.classList.add("flip-word");
    word.dataset.flipSource = normalized;
    word.setAttribute("aria-label", normalized);
  };

  const refresh = () => {
    document.querySelectorAll(".js-flip-text").forEach((root) => {
      if (root.matches("[data-i18n]")) {
        splitWord(root);
      }
      root.querySelectorAll("[data-i18n]").forEach(splitWord);
    });
  };

  window.LucianFlipText = { refresh };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      refresh();
    }, { once: true });
  } else {
    refresh();
  }
})();


/* --- script.js --- */
window.LucianApp = window.initLucianApp?.() || null;


/* --- scripts/services-scroll-story.js --- */
(() => {
  const section = document.querySelector(".services-scroll-story");
  const accordionItems = Array.from(section?.querySelectorAll(".services-accordion-item") || []);
  if (!section || !accordionItems.length) return;

  let accordionActiveIndex = -1;

  const currentLang = () => (
    document.documentElement.lang === "en"
      || window.LucianRuntime?.getCurrentLang?.() === "en"
      || window.LucianLanguageRuntime?.getCurrentLang?.() === "en"
  ) ? "en" : "zh";

  const textFor = (key) => window.i18n?.[currentLang()]?.[key] || "";

  const setAccordionActive = (index) => {
    const nextIndex = Math.max(0, Math.min(accordionItems.length - 1, Math.round(index)));
    if (nextIndex === accordionActiveIndex) return;
    accordionActiveIndex = nextIndex;
    accordionItems.forEach((item, itemIndex) => {
      const isActive = itemIndex === nextIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  };

  const rebuildServicesStoryText = () => {
    accordionItems.forEach((item) => {
      const label = item.querySelector(".services-accordion-label");
      const kicker = item.querySelector(".services-accordion-kicker");
      const cardTitle = item.querySelector(".services-accordion-title");
      const cardBody = item.querySelector(".services-accordion-body");
      const titleText = textFor(item.dataset.serviceTitle);
      const bodyText = textFor(item.dataset.serviceText);
      const itemIndex = Number(item.dataset.accordionIndex || 0);

      if (label && titleText) label.textContent = titleText;
      if (kicker) kicker.textContent = `${String(itemIndex + 1).padStart(2, "0")} / ${String(accordionItems.length).padStart(2, "0")}`;
      if (cardTitle && titleText) cardTitle.textContent = titleText;
      if (cardBody && bodyText) cardBody.textContent = bodyText;
      if (titleText) item.setAttribute("aria-label", titleText);
    });
  };

  window.rebuildServicesStoryText = rebuildServicesStoryText;
  window.LucianServicesStory = {
    refresh: rebuildServicesStoryText,
    reset: () => setAccordionActive(0),
    start: () => setAccordionActive(0),
  };

  rebuildServicesStoryText();
  setAccordionActive(0);

  accordionItems.forEach((item, index) => {
    item.addEventListener("pointerenter", () => setAccordionActive(index));
    item.addEventListener("focus", () => setAccordionActive(index));
    item.addEventListener("click", () => setAccordionActive(index));
  });

  window.addEventListener("lucian:site-entered", rebuildServicesStoryText);
})();


/* --- scripts/work-gallery.js --- */
(() => {
  const runtime = window.LucianRuntime;
  const worksRows = Array.from(document.querySelectorAll(".works-row"));
  const workGallery = document.querySelector("#work-gallery");
  const workGalleryTrack = document.querySelector("#work-gallery-track");
  const workGalleryTitle = document.querySelector("#work-gallery-title");
  const workGalleryIndex = document.querySelector("#work-gallery-index");
  const workGalleryDescription = document.querySelector("#work-gallery-description");
  const workGalleryClose = document.querySelector("#work-gallery-close");
  const workGalleryBack = document.querySelector("#work-gallery-back");
  const workDetail = document.querySelector("#work-detail");

  let galleryOpen = false;
  let galleryMode = "projects";
  let galleryCategory = "oem";
  let galleryStep = 0;
  let projectDetailObserver = null;
  let gallerySourceItems = [];
  let galleryCurrentProject = null;
  let galleryReturnY = 0;

  let circularCleanup = null;
  let circularCurrentIndex = 0;
  const circularImageCache = new Map();
  let circularPrewarmStarted = false;
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

  const getCurrentLang = () => runtime?.getCurrentLang?.() || "zh";
  const isCircularGallery = () => workGallery?.classList.contains("is-circular");
  const isGalleryBrowsingMode = () => galleryMode === "projects";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const localizedValue = (value) => {
    const currentLang = getCurrentLang();
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLang] || value.en || value.zh || "";
    }
    return value || "";
  };

  const getAllWorkGalleryItems = () => Object.entries(workGalleryImages).flatMap(([categoryKey, items]) => (
    items.map((item, categoryIndex) => ({ ...item, categoryKey, categoryIndex }))
  ));

  const getCategoryWorkGalleryItems = (categoryKey) => (
    (workGalleryImages[categoryKey] || []).map((item, categoryIndex) => ({ ...item, categoryKey, categoryIndex }))
  );

  const getCategoryBrowseItems = (categoryKey) => {
    const imageItems = getCategoryWorkGalleryItems(categoryKey);
    if (imageItems.length) return imageItems;
    return getGalleryProjects(categoryKey);
  };

  const getGalleryProjects = (categoryKey) => {
    const projectItems = window.workGalleryProjects?.[categoryKey];
    if (projectItems?.length) {
      return projectItems.map((project, projectIndex) => ({
        ...project,
        categoryKey,
        categoryIndex: projectIndex,
        projectIndex,
        isProject: true
      }));
    }

    const fallbackItems = getCategoryWorkGalleryItems(categoryKey);
    return fallbackItems.length ? [{
      isProject: true,
      categoryKey,
      categoryIndex: 0,
      projectIndex: 0,
      projectKey: categoryKey,
      title: galleryText[getCurrentLang()]?.categoryTitles?.[categoryKey] || categoryKey,
      src: fallbackItems[0].src,
      cover: fallbackItems[0].src,
      position: fallbackItems[0].position || "center",
      imageCount: fallbackItems.length,
      items: fallbackItems
    }] : [];
  };

  const getGalleryDisplayIndex = (item, fallbackIndex = 0) => {
    const displayIndex = Number.isFinite(item?.projectIndex)
      ? item.projectIndex
      : Number.isFinite(item?.categoryIndex)
        ? item.categoryIndex
        : fallbackIndex;
    return String(displayIndex + 1).padStart(2, "0");
  };

  const getGalleryItemTitle = (item, index) => {
    const currentLang = getCurrentLang();
    const rawTitle = localizedValue(item?.title);
    if (item?.isProject) return rawTitle || `${galleryText[currentLang].project} ${getGalleryDisplayIndex(item, index)}`;
    const itemCategory = item?.categoryKey || galleryCategory;
    const itemIndex = Number.isFinite(item?.categoryIndex) ? item.categoryIndex : index;
    if (currentLang === "zh") {
      if (item?.title && typeof item.title === "object" && item.title.zh) return rawTitle;
      const giftMatch = rawTitle.match(/^GIFT PROJECT\s+(\d+)/i);
      if (giftMatch) return `${galleryText.zh.giftTitle} ${giftMatch[1]}`;
      const categoryTitle = galleryText.zh.categoryTitles[itemCategory] || galleryText.zh.project;
      return `${categoryTitle} ${getGalleryDisplayIndex(item, index)}`;
    }
    return rawTitle || `${galleryText[currentLang].project} ${getGalleryDisplayIndex(item, index)}`;
  };

  const getGalleryCategoryDescription = (item) => {
    const currentLang = getCurrentLang();
    const itemCategory = item?.categoryKey || galleryCategory;
    if (item?.isProject) {
      const imageCount = item.imageCount || item.items?.length || 0;
      const imageLabel = currentLang === "zh" ? `${imageCount} 张图片` : `${imageCount} images`;
      const categoryDescription = galleryText[currentLang]?.categoryDescriptions?.[itemCategory]
        || galleryText.zh?.categoryDescriptions?.[itemCategory]
        || "";
      return imageCount ? `${categoryDescription} · ${imageLabel}` : categoryDescription;
    }
    return galleryText[currentLang]?.categoryDescriptions?.[itemCategory]
      || galleryText.zh?.categoryDescriptions?.[itemCategory]
      || "";
  };

  const updateGalleryHeader = (item, index, fallbackTitle = "") => {
    if (workGalleryTitle) {
      workGalleryTitle.textContent = item ? getGalleryItemTitle(item, index) : fallbackTitle || galleryText[getCurrentLang()].project;
    }
    if (workGalleryIndex) {
      workGalleryIndex.textContent = getGalleryDisplayIndex(item, index);
    }
    if (workGalleryDescription) {
      workGalleryDescription.textContent = getGalleryCategoryDescription(item);
    }
  };

  const updateGalleryChromeText = () => {
    const currentLang = getCurrentLang();
    if (workGalleryBack) workGalleryBack.textContent = galleryText[currentLang].back;
    if (workGalleryClose) {
      workGalleryClose.setAttribute("aria-label", galleryText[currentLang].close);
    }
  };

  const destroyCircularGallery = () => {
    if (!circularCleanup) return;
    circularCleanup();
    circularCleanup = null;
    workGallery?.classList.remove("is-depth-gallery");
  };

  const teardownProjectDetailMotion = () => {
    if (!projectDetailObserver) return;
    projectDetailObserver.disconnect();
    projectDetailObserver = null;
  };

  const setupProjectDetailMotion = () => {
    teardownProjectDetailMotion();
    if (!workGallery || !workDetail) return;
    const panels = Array.from(workDetail.querySelectorAll("[data-project-panel]"));
    if (!panels.length) return;

    if (!("IntersectionObserver" in window)) {
      panels.forEach((panel) => panel.classList.add("is-visible"));
      return;
    }

    projectDetailObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, {
      root: workGallery,
      rootMargin: "-8% 0px -16%",
      threshold: [0.18, 0.42, 0.68]
    });

    panels.forEach((panel) => {
      projectDetailObserver.observe(panel);
    });
  };

  const initDomCircularGallery = (root, sourceItems) => {
    root.innerHTML = "";
    root.classList.add("is-dom-fallback", "is-waterfall");

    let raf = 0;
    let disposed = false;
    let isDown = false;
    let didDrag = false;
    let activeCard = null;
    let suppressNextClick = false;
    let startY = 0;
    let pointerDeltaY = 0;
    let scrollTarget = 0;
    let scrollCurrent = scrollTarget;
    let dragStartTarget = scrollTarget;
    let columns = [];
    let columnCount = 3;
    let metrics = { width: 1, height: 1, cardWidth: 320, gap: 30 };
    let lazyImageObserver = null;
    const startedAt = performance.now();

    const getLoopIndex = (index) => {
      const total = Math.max(1, sourceItems.length);
      return ((index % total) + total) % total;
    };

    const getColumnCount = () => {
      const width = root.clientWidth || window.innerWidth;
      if (width >= 760) return 3;
      return 2;
    };

    const getCardFromEvent = (event) => {
      const directCard = event.target.closest?.(".work-waterfall-card");
      if (directCard) return directCard;

      const pointStack = document.elementsFromPoint?.(event.clientX, event.clientY) || [];
      const pointCard = pointStack
        .map((element) => element.closest?.(".work-waterfall-card"))
        .find(Boolean);
      return pointCard || null;
    };

    const openCard = (card) => {
      if (!card || galleryMode !== "projects") return;
      const index = Number.parseInt(card.dataset.index || "0", 10);
      openProjectDetail(index);
    };

    const loadCardImage = (image) => {
      if (!image?.dataset?.src) return;
      image.src = image.dataset.src;
      image.removeAttribute("data-src");
      image.classList.add("is-loading");
      image.decode?.()
        .then(() => image.classList.remove("is-loading"))
        .catch(() => image.classList.remove("is-loading"));
    };

    const observeLazyImage = (image, eager = false) => {
      if (!image) return;
      if (eager || !lazyImageObserver) {
        loadCardImage(image);
        return;
      }
      lazyImageObserver.observe(image);
    };

    const makeCard = (item, index, options = {}) => {
      const eager = Boolean(options.eager);
      const card = document.createElement("button");
      card.className = "work-waterfall-card";
      if (item.isProject) card.classList.add("is-project-card");
      card.type = "button";
      card.dataset.index = String(index);
      card.style.setProperty("--gallery-position", item.position || "center");
      const imageCount = item.imageCount || item.items?.length || 0;
      const imageCountLabel = getCurrentLang() === "zh" ? `${imageCount} 张图片` : `${imageCount} IMAGES`;
      card.innerHTML = `
        <span class="work-waterfall-image">
          <img
            src="${eager ? item.src : transparentPixel}"
            ${eager ? "" : `data-src="${item.src}"`}
            alt=""
            draggable="false"
            decoding="async"
            loading="${eager ? "eager" : "lazy"}"
            fetchpriority="${eager ? "high" : "low"}"
          >
        </span>
        <span class="work-waterfall-title">${getGalleryItemTitle(item, index)}</span>
        ${item.isProject ? `<span class="work-waterfall-count">${imageCountLabel}</span>` : ""}
      `;
      observeLazyImage(card.querySelector("img"), eager);
      card.addEventListener("click", (event) => {
        if (!isGalleryBrowsingMode()) return;
        if (didDrag || suppressNextClick) {
          suppressNextClick = false;
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        openCard(card);
      });
      card.addEventListener("keydown", (event) => {
        if (!isGalleryBrowsingMode() || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        event.stopPropagation();
        openCard(card);
      });
      return card;
    };

    const buildColumns = () => {
      columnCount = getColumnCount();
      root.innerHTML = "";
      lazyImageObserver?.disconnect();
      lazyImageObserver = "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            lazyImageObserver?.unobserve(entry.target);
            loadCardImage(entry.target);
          });
        }, {
          root: workGallery,
          rootMargin: "140% 0px",
          threshold: 0.01,
        })
        : null;
      const shell = document.createElement("div");
      shell.className = "work-waterfall";
      root.appendChild(shell);

      columns = Array.from({ length: columnCount }, (_, columnIndex) => {
        const box = document.createElement("div");
        box.className = "work-waterfall-column";
        box.style.setProperty("--column-index", String(columnIndex));
        const list = document.createElement("div");
        list.className = "work-waterfall-list";
        box.appendChild(list);
        shell.appendChild(box);
        return { box, list, height: 1, speed: 0.62 + (columnIndex % 3) * 0.1 };
      });

      const repeated = Array.from({ length: 4 }, () => sourceItems).flat();
      repeated.forEach((item, repeatedIndex) => {
        const realIndex = getLoopIndex(repeatedIndex);
        const column = columns[realIndex % columnCount];
        column.list.appendChild(makeCard(item, realIndex, {
          eager: repeatedIndex < columnCount * 2,
        }));
      });

      columns.forEach((column) => {
        column.height = Math.max(1, column.list.scrollHeight / 4);
      });
    };

    const resize = () => {
      const nextColumnCount = getColumnCount();
      metrics = {
        width: Math.max(1, root.clientWidth || window.innerWidth),
        height: Math.max(1, root.clientHeight || window.innerHeight),
        cardWidth: clamp((root.clientWidth || window.innerWidth) * 0.22, 260, 430),
        gap: clamp(24, (root.clientWidth || window.innerWidth) * 0.026, 48)
      };
      root.style.setProperty("--waterfall-card-width", `${metrics.cardWidth}px`);
      root.style.setProperty("--waterfall-gap", `${metrics.gap}px`);
      if (!columns.length || nextColumnCount !== columnCount) {
        buildColumns();
      } else {
        columns.forEach((column) => {
          column.height = Math.max(1, column.list.scrollHeight / 4);
        });
      }
    };

    const render = () => {
      if (disposed) return;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.055;
      const elapsed = (performance.now() - startedAt) / 1000;

      columns.forEach((column, columnIndex) => {
        const direction = columnIndex % 2 === 0 ? 1 : -1;
        const offset = columnIndex * column.height * 0.21;
        const raw = scrollCurrent * column.speed * direction + offset;
        const loop = ((raw % column.height) + column.height) % column.height;
        const driftX = Math.sin(elapsed * 0.24 + columnIndex * 1.7) * 10;
        const driftY = Math.sin(elapsed * 0.34 + columnIndex * 2.1) * 22;
        column.list.style.transform = `translate3d(${driftX.toFixed(2)}px, ${(-column.height + loop + driftY).toFixed(2)}px, 0)`;

        const cards = column.list.children;
        for (let index = 0; index < cards.length; index += 1) {
          const card = cards[index];
          const wave = Math.sin(elapsed * 0.52 + index * 0.74 + columnIndex * 1.25) * 5.2;
          const breathe = 1 + Math.sin(elapsed * 0.38 + index * 0.41) * 0.006;
          card.style.transform = `translate3d(0, ${wave.toFixed(2)}px, 0) scale(${breathe.toFixed(4)})`;
          const img = card.querySelector("img");
          if (img) {
            img.style.transform = `translate3d(0, ${(wave * -0.42).toFixed(2)}px, 0) scale(1.055)`;
          }
        }
      });

      raf = window.requestAnimationFrame(render);
    };

    const onWheel = (event) => {
      if (!isCircularGallery() || !isGalleryBrowsingMode()) return;
      event.preventDefault();
      event.stopPropagation();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      scrollTarget += delta * 0.68;
    };

    const onPointerDown = (event) => {
      if (!isGalleryBrowsingMode()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      isDown = true;
      didDrag = false;
      activeCard = getCardFromEvent(event);
      startY = event.clientY;
      pointerDeltaY = 0;
      dragStartTarget = scrollTarget;
      root.classList.add("is-dragging");
      root.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!isDown) return;
      const dy = event.clientY - startY;
      pointerDeltaY = dy;
      if (Math.abs(dy) > 14) {
        didDrag = true;
        scrollTarget = dragStartTarget - dy * 1.4;
      }
    };

    const onPointerUp = (event) => {
      if (!isDown) return;
      isDown = false;
      root.classList.remove("is-dragging");
      root.releasePointerCapture?.(event.pointerId);
      if (didDrag && Math.abs(pointerDeltaY) > 14) {
        activeCard = null;
        return;
      }

      const card = activeCard || getCardFromEvent(event);
      activeCard = null;
      if (!card) return;
      suppressNextClick = true;
      openCard(card);
    };

    const onClick = (event) => {
      if (!isGalleryBrowsingMode()) return;
      const card = getCardFromEvent(event);
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      if (suppressNextClick) {
        suppressNextClick = false;
        event.stopImmediatePropagation?.();
        return;
      }
      if (didDrag) return;
      openCard(card);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("click", onClick, true);
    raf = window.requestAnimationFrame(render);

    circularCleanup = () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      lazyImageObserver?.disconnect();
      lazyImageObserver = null;
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel, { capture: true });
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("click", onClick, true);
      root.classList.remove("is-dom-fallback", "is-waterfall");
      root.innerHTML = "";
    };
  };

  const initCircularGallery = (items) => {
    destroyCircularGallery();
    const root = workGalleryTrack?.querySelector(".work-circular-root");
    if (!root) return;

    const sourceItems = items.length ? items : getAllWorkGalleryItems();
    if (!sourceItems.length) return;

    root.innerHTML = "";
    initDomCircularGallery(root, sourceItems);
  };

  const buildGalleryItems = (items, { defer = false } = {}) => {
    if (!workGalleryTrack) return;
    gallerySourceItems = items;
    destroyCircularGallery();
    workGallery?.classList.add("is-circular");
    workGalleryTrack.style.transform = "translate3d(0, 0, 0)";
    workGalleryTrack.innerHTML = `
      <div class="work-circular-root">
      </div>
    `;
    if (defer) {
      window.requestAnimationFrame(() => {
        if (!galleryOpen || !isGalleryBrowsingMode()) return;
        initCircularGallery(items);
      });
      return;
    }
    initCircularGallery(items);
  };

  const prewarmCircularGallery = () => {
    if (circularPrewarmStarted) return;
    circularPrewarmStarted = true;
    const runIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 650));

    runIdle(() => {
      const items = Object.keys(window.workGalleryProjects || {})
        .flatMap((categoryKey) => getGalleryProjects(categoryKey).slice(0, 2))
        .slice(0, 10);
      items.forEach((item) => {
        const src = item.cover || item.src;
        if (src && !circularImageCache.has(src)) {
          const img = new Image();
          img.decoding = "async";
          img.fetchPriority = "low";
          img.src = src;
          circularImageCache.set(src, img);
          if (img.decode) img.decode().catch(() => {});
        }
      });
    }, { timeout: 2600 });
  };

  const renderProjectDetail = (project, index) => {
    if (!workDetail || !project) return;
    const currentLang = getCurrentLang();
    const copy = galleryText[currentLang];
    const items = project.items || [];
    const cover = items[0] || project;
    const title = getGalleryItemTitle(project, index);
    const categoryTitle = copy.categoryTitles?.[project.categoryKey] || copy.project;
    const imageLabel = currentLang === "zh" ? `${items.length} 张图片` : `${items.length} IMAGES`;
    const summary = getGalleryCategoryDescription(project);
    const detailItems = items.length ? items : [cover];
    const getProjectFrameClass = (item) => (
      /\.png(?:[?#].*)?$/i.test(item?.src || "") ? " is-png-frame" : ""
    );
    workDetail.innerHTML = `
      <section class="work-project-case">
        <aside class="work-detail-side work-project-info">
          <div>
            <p class="work-detail-kicker">${categoryTitle} ${getGalleryDisplayIndex(project, index)}</p>
            <h4 class="work-detail-name">${title}</h4>
            <div class="work-detail-tags">
              <span class="work-detail-tag">${categoryTitle}</span>
              <span class="work-detail-tag">${imageLabel}</span>
            </div>
          </div>
          <div class="work-detail-body">
            <p class="work-detail-copy">${summary}</p>
            <p>${copy.summary}</p>
          </div>
        </aside>
        <div class="work-project-stream" aria-label="${title}">
            ${detailItems.map((item, itemIndex) => `
              <section class="work-detail-full work-project-panel${itemIndex === 0 ? " is-hero-panel" : ""}${itemIndex % 3 === 1 ? " is-split-panel" : ""}" data-project-panel style="--project-image-index: ${itemIndex};">
                <figure class="work-detail-full-figure${getProjectFrameClass(item)}" style="--gallery-position: ${item.position || "center"};">
                  <img
                    src="${item.src}"
                    alt=""
                    decoding="async"
                    loading="${itemIndex < 2 ? "eager" : "lazy"}"
                    ${itemIndex === 0 ? 'fetchpriority="high"' : 'fetchpriority="low"'}
                  >
                  <figcaption class="work-project-image-caption">${String(itemIndex + 1).padStart(2, "0")} / ${getGalleryItemTitle(item, itemIndex)}</figcaption>
                </figure>
              </section>
            `).join("")}
        </div>
      </section>
    `;
    setupProjectDetailMotion();
  };

  const openProjectDetail = (index, { playTone = true } = {}) => {
    if (!workGallery) return;
    const projects = gallerySourceItems.length ? gallerySourceItems : getGalleryProjects(galleryCategory);
    const project = projects[index] || projects[0];
    if (!project) return;
    galleryStep = Math.max(0, Math.min(projects.length - 1, index));
    galleryCurrentProject = project;
    galleryMode = "project-detail";
    destroyCircularGallery();
    renderProjectDetail(project, galleryStep);
    workGallery.classList.add("is-detail", "is-project-detail");
    workGallery.classList.remove("is-circular");
    updateGalleryChromeText();
    updateGalleryHeader(project, galleryStep);
    workGallery.scrollTo({ top: 0, behavior: "auto" });
    if (playTone) runtime?.playUiTone?.("click");
  };

  const returnToGalleryIndex = () => {
    if (!workGallery) return;
    galleryMode = "projects";
    teardownProjectDetailMotion();
    workGallery.classList.remove("is-detail", "is-project-detail");
    if (workDetail) workDetail.innerHTML = "";
    galleryCurrentProject = null;
    const projects = getGalleryProjects(galleryCategory);
    buildGalleryItems(projects);
    const activeProject = projects[galleryStep] || projects[0];
    updateGalleryHeader(activeProject, galleryStep);
  };

  const refreshLanguage = () => {
    updateGalleryChromeText();
    if (!workGallery || !galleryOpen) return;

    const items = gallerySourceItems.length ? gallerySourceItems : getGalleryProjects(galleryCategory);

    if (galleryMode === "project-detail") {
      const project = galleryCurrentProject || items[galleryStep] || items[0];
      renderProjectDetail(project, galleryStep);
      updateGalleryHeader(project, galleryStep);
      return;
    }

    buildGalleryItems(items);
    const activeItem = items[galleryStep];
    updateGalleryHeader(activeItem, galleryStep);
  };

  const showGallery = () => {
    runtime?.hideWorksPreview?.();
    galleryReturnY = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add("work-gallery-open");
    document.documentElement.classList.add("work-gallery-open");
    workGallery.setAttribute("aria-hidden", "false");
    workGallery.classList.remove("is-open");
    void workGallery.offsetWidth;
    workGallery.classList.add("is-open");
    galleryOpen = true;
    runtime?.playUiTone?.("click");
  };

  const getCategoryTitle = (category) => {
    const currentLang = getCurrentLang();
    return galleryText[currentLang]?.categoryTitles?.[category]
      || galleryText.zh?.categoryTitles?.[category]
      || "Project";
  };

  const openCategory = (category = "oem", title = getCategoryTitle(category)) => {
    if (!workGallery || !workGalleryTrack) return;
    const browseItems = getCategoryBrowseItems(category);
    const initialIndex = 0;
    galleryCategory = category;
    galleryMode = "projects";
    galleryStep = initialIndex;
    galleryCurrentProject = null;
    teardownProjectDetailMotion();
    workGallery.classList.remove("is-detail");
    workGallery.classList.remove("is-project-detail");
    if (workDetail) workDetail.innerHTML = "";
    updateGalleryChromeText();
    updateGalleryHeader(browseItems[initialIndex], initialIndex, title);
    buildGalleryItems(browseItems, { defer: true });
    showGallery();
  };

  const openWorkGallery = (row) => {
    if (row.dataset.featuredOnly === "true") return;
    const category = row.dataset.category || "oem";
    const title = row.querySelector(".works-row-name")?.textContent.trim() || getCategoryTitle(category);
    if (row.dataset.projectIndex) {
      openProject({ category, projectIndex: row.dataset.projectIndex, title });
      return;
    }
    openCategory(category, title);
  };

  const openProject = ({ category = "oem", projectIndex = 0, title = "" } = {}) => {
    const parsedIndex = Number.parseInt(projectIndex, 10);
    const projects = getGalleryProjects(category);
    if (!projects.length) {
      openCategory(category, title || getCategoryTitle(category));
      return;
    }

    galleryCategory = category;
    gallerySourceItems = projects;
    galleryCurrentProject = null;
    galleryStep = Math.max(0, Math.min(projects.length - 1, Number.isFinite(parsedIndex) ? parsedIndex : 0));
    teardownProjectDetailMotion();
    destroyCircularGallery();
    if (workGalleryTrack) workGalleryTrack.innerHTML = "";
    updateGalleryChromeText();
    showGallery();
    openProjectDetail(galleryStep, { playTone: false });
  };

  const close = () => {
    if (!workGallery) return;
    const restorePageScroll = () => {
      if (galleryReturnY <= 0) return;
      window.scrollTo(0, galleryReturnY);
      window.requestAnimationFrame(() => window.scrollTo(0, galleryReturnY));
    };

    if (!galleryOpen) {
      workGallery.classList.remove("is-open", "is-detail", "is-project-detail", "is-circular");
      workGallery.setAttribute("aria-hidden", "true");
      document.body.classList.remove("work-gallery-open");
      document.documentElement.classList.remove("work-gallery-open");
      if (workGalleryTrack) workGalleryTrack.innerHTML = "";
      restorePageScroll();
      return;
    }
    galleryOpen = false;
    galleryMode = "projects";
    galleryCurrentProject = null;
    teardownProjectDetailMotion();
    destroyCircularGallery();
    workGallery.classList.remove("is-open");
    workGallery.classList.remove("is-detail");
    workGallery.classList.remove("is-project-detail");
    workGallery.classList.remove("is-circular");
    workGallery.setAttribute("aria-hidden", "true");
    document.body.classList.remove("work-gallery-open");
    document.documentElement.classList.remove("work-gallery-open");
    if (workDetail) workDetail.innerHTML = "";
    if (workGalleryTrack) workGalleryTrack.innerHTML = "";
    if (workGalleryDescription) workGalleryDescription.textContent = "";
    restorePageScroll();
  };

  worksRows.forEach((row) => {
    if (row.dataset.featuredOnly === "true") return;
    row.addEventListener("click", () => openWorkGallery(row));
    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openWorkGallery(row);
    });
  });

  workGalleryBack?.addEventListener("click", returnToGalleryIndex);
  workGalleryClose?.addEventListener("click", close);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector("#wechat-qr-modal.is-open")) return;
    if (event.key === "Escape") close();
  });

  updateGalleryChromeText();
  prewarmCircularGallery();

  window.LucianWorkGallery = {
    close,
    openCategory,
    openProject,
    refreshLanguage,
  };
})();


/* --- scripts/work-case-data.js --- */
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


/* --- scripts/work-case.js --- */
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


/* --- scripts/scrambled-text.js --- */
(() => {
  const scrambleTextChars = ".:·_";
  const scrambleTextRadius = 112;
  const scrambleTextDuration = 780;
  const scrambleTextSpeed = 0.48;
  let cleanups = [];

  const restore = () => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
  };

  const splitNode = (node) => {
    const children = Array.from(node.childNodes).map((child) => child.cloneNode(true));
    const sourceText = node.textContent || "";
    if (!sourceText.trim()) return [];

    node.replaceChildren();
    node.classList.add("scrambled-text");

    const chars = [];
    const appendText = (target, text) => {
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
        appendText(target, sourceNode.textContent || "");
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

  const init = () => {
    restore();
    if (window.LucianRuntime?.reducedMotion) return;

    document.querySelectorAll(".js-scrambled-text").forEach((node) => {
      const source = node.innerHTML;
      const chars = splitNode(node);
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
      cleanups.push(() => {
        if (raf) cancelAnimationFrame(raf);
        node.removeEventListener("pointermove", handleMove);
        node.classList.remove("scrambled-text");
        node.innerHTML = source;
      });
    });
  };

  window.LucianScrambledText = { init, restore };
  init();
})();


/* --- scripts/header-controls.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const soundToggle = document.querySelector("#sound-toggle");
  const soundStateNode = soundToggle?.querySelector(".top-meta-sound-state");
  const fullscreenToggle = document.querySelector("#fullscreen-toggle");
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

  const applySoundState = () => {
    const enabled = runtime.isSoundEnabled();
    document.body.classList.toggle("sound-muted", !enabled);
    soundToggle?.setAttribute("aria-pressed", String(enabled));
    soundToggle?.setAttribute(
      "aria-label",
      enabled ? "Mute site sound" : "Enable site sound"
    );
    if (soundStateNode) {
      soundStateNode.textContent = enabled ? "ON" : "OFF";
    }
  };

  soundToggle?.addEventListener("click", async () => {
    const enabled = !runtime.isSoundEnabled();
    runtime.setSoundEnabled(enabled);
    applySoundState();
    writeStoredBoolean(SOUND_STORAGE_KEY, enabled);

    if (enabled) {
      await runtime.getAudioContext().catch(() => null);
      if (document.body.classList.contains("has-entered")) {
        await runtime.startBackgroundMusic?.({ fade: true }).catch(() => null);
      }
      runtime.playUiTone("click");
      return;
    }

    await runtime.pauseBackgroundMusic?.({ remember: true });
    await runtime.suspendAudioContext();
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

  runtime.setSoundEnabled(readStoredBoolean(SOUND_STORAGE_KEY, true));
  applySoundState();
  updateFullscreenState();
})();


/* --- scripts/hero-tv-controls.js --- */
(() => {
  const video = document.querySelector("#hero-tv-video");
  const cabinet = document.querySelector(".hero-tv-cabinet");
  const soundToggle = document.querySelector("#hero-tv-sound-toggle");
  const replayToggle = document.querySelector("#hero-tv-replay-toggle");
  if (!video || !(video instanceof HTMLVideoElement) || !soundToggle || !replayToggle) return;

  const TV_VOLUME = 0.86;

  const setSoundButtonState = (enabled) => {
    cabinet?.classList.toggle("is-tv-sound-on", enabled);
    soundToggle.setAttribute("aria-pressed", String(enabled));
    soundToggle.setAttribute(
      "aria-label",
      enabled ? "Mute TV video sound" : "Turn TV sound on"
    );
    soundToggle.title = enabled ? "Mute TV sound" : "Turn TV sound on";
  };

  const setTvSound = async (enabled) => {
    const shouldEnable = Boolean(enabled);
    video.volume = TV_VOLUME;

    if (shouldEnable) {
      try {
        await video.play();
      } catch {
        // The next play attempt may still succeed after the user gesture below.
      }

      video.muted = false;
      video.removeAttribute("muted");

      try {
        await video.play();
      } catch {
        video.muted = true;
        video.setAttribute("muted", "");
        await video.play().catch(() => null);
      }
    } else {
      video.muted = true;
      video.setAttribute("muted", "");
      await video.play().catch(() => null);
    }

    setSoundButtonState(!video.muted && video.volume > 0);
  };

  const replayVideo = async () => {
    cabinet?.classList.add("is-tv-replaying");
    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      // Keep the current video state if replay is blocked.
    } finally {
      window.setTimeout(() => {
        cabinet?.classList.remove("is-tv-replaying");
      }, 260);
    }
  };

  soundToggle.addEventListener("click", async () => {
    await setTvSound(video.muted);
    window.LucianRuntime?.playUiTone?.("click");
  });

  replayToggle.addEventListener("click", async () => {
    await replayVideo();
    window.LucianRuntime?.playUiTone?.("click");
  });

  video.addEventListener("volumechange", () => {
    setSoundButtonState(!video.muted && video.volume > 0);
  });

  replayToggle.title = "Replay TV video";
  setSoundButtonState(!video.muted && video.volume > 0);
})();

/* --- scripts/language-controls.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const langButtons = Array.from(document.querySelectorAll(".lang-button"));

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.switchLanguage(button.dataset.lang);
      runtime.playUiTone("click");
    });
  });
})();



/* --- scripts/contact-interactions.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const contactEmail = "y1156813759@gmail.com";
  const contactSection = document.querySelector("#contact");
  const contactTitle = contactSection?.querySelector(".contact-title");
  const copyItems = document.querySelectorAll(".contact-copy-item");
  const contactForm = document.querySelector("#contact-form");
  const wechatTrigger = document.querySelector("#wechat-qr-trigger");
  const wechatModal = document.querySelector("#wechat-qr-modal");
  const wechatBackdrop = document.querySelector("#wechat-qr-backdrop");
  const wechatClose = document.querySelector("#wechat-qr-close");
  const circularTexts = document.querySelectorAll(".contact-circular-text");

  const getLang = () => runtime.getCurrentLang();
  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10);

  const initContactPaperMotion = () => {
    if (!contactSection) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;
    let titleFlipTimer = 0;
    let titleFlipLoopTimer = 0;
    let programmaticEntryTimer = 0;

    const setVar = (name, value) => {
      contactSection.style.setProperty(name, value.toFixed(4));
    };

    const setPxVar = (name, value) => {
      contactSection.style.setProperty(name, `${value.toFixed(2)}px`);
    };

    const runProgrammaticEntry = () => {
      if (prefersReducedMotion.matches) return;
      window.clearTimeout(programmaticEntryTimer);
      contactSection.classList.add("is-contact-jump-entering");
      requestUpdate();
      programmaticEntryTimer = window.setTimeout(() => {
        contactSection.classList.remove("is-contact-jump-entering");
        programmaticEntryTimer = 0;
      }, 980);
    };

    const triggerTitleFlip = () => {
      if (!contactTitle || titleFlipTimer) return;
      contactTitle.classList.add("is-flipping");
      titleFlipTimer = window.setTimeout(() => {
        contactTitle.classList.remove("is-flipping");
        titleFlipTimer = 0;
      }, 1600);
    };

    const titleReadyToFlip = () => {
      if (!contactTitle || prefersReducedMotion.matches) return false;
      const vh = Math.max(1, window.innerHeight);
      const rect = contactSection.getBoundingClientRect();
      return rect.top < vh * 0.22 && rect.bottom > vh * 0.42;
    };

    const maybeFlipTitle = () => {
      if (!titleReadyToFlip()) return;
      triggerTitleFlip();
    };

    const stopTitleFlipLoop = () => {
      window.clearTimeout(titleFlipLoopTimer);
      titleFlipLoopTimer = 0;
    };

    const scheduleTitleFlipLoop = (delay = 0) => {
      if (!contactTitle || prefersReducedMotion.matches || titleFlipLoopTimer) return;
      titleFlipLoopTimer = window.setTimeout(() => {
        titleFlipLoopTimer = 0;
        if (!titleReadyToFlip()) return;
        maybeFlipTitle();
        scheduleTitleFlipLoop(5600);
      }, delay);
    };

    const update = () => {
      ticking = false;

      if (prefersReducedMotion.matches) {
        setVar("--contact-paper-place", 1);
        setVar("--contact-paper-settle", 1);
        setVar("--contact-form-reveal", 1);
        setVar("--contact-form-alpha", 1);
        setVar("--contact-social-alpha", 1);
        setPxVar("--contact-form-y", 0);
        setPxVar("--contact-social-y", 0);
        return;
      }

      const vh = Math.max(1, window.innerHeight);
      const rect = contactSection.getBoundingClientRect();
      const enter = smootherStep(clamp01((vh * 1.12 - rect.top) / (vh * 1.08)));
      const settle = smootherStep(clamp01((vh * 0.56 - rect.top) / (vh * 0.92)));
      const form = smootherStep(clamp01((vh * 0.18 - rect.top) / (vh * 0.82)));
      const social = smootherStep(clamp01((vh * -0.02 - rect.top) / (vh * 0.72)));

      setVar("--contact-paper-place", enter);
      setVar("--contact-paper-settle", settle);
      setVar("--contact-form-reveal", form);
      setVar("--contact-form-alpha", form);
      setVar("--contact-social-alpha", social);
      setPxVar("--contact-form-y", (1 - form) * 48);
      setPxVar("--contact-social-y", (1 - social) * 34);
      if (titleReadyToFlip()) scheduleTitleFlipLoop(400);
      else stopTitleFlipLoop();
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("lucian:programmatic-section-jump", (event) => {
      if (event.detail?.targetId !== "contact") return;
      runProgrammaticEntry();
    });
    prefersReducedMotion.addEventListener?.("change", requestUpdate);
    if ("IntersectionObserver" in window && contactTitle) {
      const titleObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) scheduleTitleFlipLoop(400);
        else stopTitleFlipLoop();
      }, { threshold: 0.18 });
      titleObserver.observe(contactSection);
      window.addEventListener("pagehide", () => {
        titleObserver.disconnect();
        stopTitleFlipLoop();
        contactSection.classList.remove("is-contact-jump-entering");
        window.clearTimeout(programmaticEntryTimer);
        window.clearTimeout(titleFlipTimer);
      }, { once: true });
    }
  };

  initContactPaperMotion();

  circularTexts.forEach((circle) => {
    const text = circle.dataset.circularText || "";
    const letters = Array.from(text);
    if (!letters.length || circle.querySelector(".contact-circular-letter")) return;

    const fragment = document.createDocumentFragment();
    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.className = "contact-circular-letter";
      span.textContent = letter;
      span.style.setProperty("--letter-angle", `${(360 / letters.length) * index}deg`);
      fragment.appendChild(span);
    });
    circle.appendChild(fragment);
    circle.style.setProperty("--letter-count", String(letters.length));
  });

  const showContactToast = () => {
    const toast = document.getElementById("contact-toast");
    if (!toast) return;

    toast.textContent = getLang() === "zh"
      ? "\u5df2\u51c6\u5907\u53d1\u9001\u90ae\u4ef6\uff0c\u5e76\u590d\u5236\u5185\u5bb9"
      : "Email draft ready to send and copied";
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2400);
  };

  const buildGmailComposeUrl = ({ subject = "", body = "" } = {}) => {
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: contactEmail,
      su: subject,
      body,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
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

    const lang = getLang();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = lang === "zh"
      ? "\u5305\u88c5\u8bbe\u8ba1\u9700\u6c42\u54a8\u8be2"
      : "Packaging Design Inquiry";
    const body = [
      `${i18n[lang].contact_form_name}: ${name}`,
      `${i18n[lang].contact_form_company}: ${company || "-"}`,
      `${i18n[lang].contact_form_contact}: ${contact}`,
      "",
      `${i18n[lang].contact_form_message}:`,
      message,
    ].join("\n");

    navigator.clipboard?.writeText(body).catch(() => null);
    window.open(buildGmailComposeUrl({ subject, body }), "_blank", "noopener");
    runtime.playUiTone("click");
    showContactToast();
  });

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

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && wechatModal?.classList.contains("is-open")) {
      closeWechatModal();
    }
  });
})();


/* --- scripts/scroll-type-effects.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime || runtime.reducedMotion) return;

  const SCROLL_TYPE_SELECTOR = [
    ".js-scroll-type-disabled",
  ].join(",");

  const SCROLL_TYPE_SCOPE_SELECTOR = [
    "#services",
    "#works-transition",
    "#works",
    "#contact",
    ".clients-section",
    ".work-gallery",
  ].join(",");

  const shouldUseScrollTypeEffect = (node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (!node.closest(SCROLL_TYPE_SCOPE_SELECTOR)) return false;
    if (node.closest("#works-transition")) return false;
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
      const isParagraph = parent.matches(".about-lead, .about-detail");
      const center = rect.top + rect.height * 0.5;
      const distance = Math.abs(center - focusLine);
      const raw = 1 - Math.min(1, distance / focusRange);
      const viewportFocus = raw * raw * (3 - 2 * raw);
      const count = Number(parent.style.getPropertyValue("--glyph-count") || 1);
      const glyphOrder = count <= 1 ? 0 : index / (count - 1);
      const parentPhase = Math.max(-0.2, Math.min(1.2, (focusLine - parentRect.top) / Math.max(parentRect.height, 1)));
      const directionBias = scrollTypeDirection < 0 ? -0.035 : 0.035;
      const scanPhase = parentPhase + directionBias;
      const smooth = (value) => value * value * (3 - 2 * value);
      const glyphSpread = 0.38;
      const exitSpread = 0.12;
      const enterWindow = isParagraph ? 0.32 : 0.26;
      const exitStart = isParagraph ? 0.9 : 0.82;
      const exitWindow = isParagraph ? 0.28 : 0.22;
      const enter = smooth(Math.max(0, Math.min(1, (scanPhase - glyphOrder * glyphSpread) / enterWindow)));
      const exit = smooth(Math.max(0, Math.min(1, (scanPhase - exitStart - glyphOrder * exitSpread) / exitWindow)));
      const amount = Math.max(0, Math.min(1, enter * (1 - exit)));
      const focus = Math.max(viewportFocus * 0.58, amount);
      const maxY = isHeroDisplay ? 14 : isParagraph ? 3.5 : 7;
      const enteringFromBelow = center > focusLine ? 1 : -1;
      const y = ((1 - enter) * maxY - exit * maxY * 0.7) * enteringFromBelow * scrollTypeDirection;
      const blur = 0;
      const minOpacity = isHeroDisplay ? 0.08 : isParagraph ? 0.22 : 0.06;
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
})();


/* --- scripts/reveal-effects.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const revealNodes = document.querySelectorAll(".reveal");

  if (!runtime.reducedMotion && revealNodes.length) {
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

  const revealChildObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        const children = section.querySelectorAll("[data-reveal]");
        children.forEach((element) => {
          const baseDelay = parseInt(element.dataset.delay || "0", 10);
          const delay = section.id === "works" ? Math.min(Math.round(baseDelay * 0.18), 140) : baseDelay;
          setTimeout(() => {
            element.classList.add("is-revealed");
          }, delay);
        });
        observer.unobserve(section);
      });
    },
    { threshold: 0.02, rootMargin: "0px 0px -6% 0px" }
  );

  document.querySelectorAll(".about-rows, #services, #works, #contact").forEach((section) => {
    revealChildObserver.observe(section);
  });

  if (runtime.reducedMotion) {
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      element.classList.add("is-revealed");
    });
  }
})();


/* --- scripts/precision-cursor.js --- */
(() => {
  const runtime = window.LucianRuntime;
  const cursor = document.querySelector("#precision-cursor");
  if (!runtime || !cursor) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const enabled = finePointer && !prefersReducedMotion;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let frame = 0;
  let visible = false;

  const isEntryTransitioning = () => (
    document.body.classList.contains("is-unfolding")
    || document.body.classList.contains("is-entering")
  );

  const hideCursor = () => {
    if (!visible) return;
    visible = false;
    runtime.setCursorVisible(false);
    runtime.clearFieldPointer();
  };

  const updateHeroPointer = () => {
    const heroStage = runtime.heroStage;
    if (!heroStage || !document.body.classList.contains("has-entered")) {
      runtime.clearHeroPointerState();
      return;
    }

    const rect = heroStage.getBoundingClientRect();
    const insideHero =
      x >= rect.left
      && x <= rect.right
      && y >= rect.top
      && y <= rect.bottom;

    if (!insideHero) {
      runtime.clearHeroPointerState();
      return;
    }

    runtime.setFieldPointer({
      x: (x - rect.left) / rect.width,
      y: (y - rect.top) / rect.height,
      active: true,
    });
  };

  const flushPointer = () => {
    frame = 0;
    if (!enabled || isEntryTransitioning()) {
      hideCursor();
      return;
    }

    runtime.updatePrecisionCursor(x, y);
    const shouldShow = document.body.classList.contains("has-entered");
    if (shouldShow !== visible) {
      visible = shouldShow;
      runtime.setCursorVisible(shouldShow);
    }

    updateHeroPointer();
  };

  const requestPointerFlush = () => {
    if (frame) return;
    frame = requestAnimationFrame(flushPointer);
  };

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      hideCursor();
      return;
    }

    x = event.clientX;
    y = event.clientY;
    requestPointerFlush();
  }, { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    x = event.clientX;
    y = event.clientY;
    cursor.classList.add("is-pressing");
    requestPointerFlush();
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    cursor.classList.remove("is-pressing");
  }, { passive: true });

  document.addEventListener("pointerleave", hideCursor);

  window.addEventListener("scroll", () => {
    if (!visible) return;
    requestPointerFlush();
  }, { passive: true });

  const bodyClassObserver = new MutationObserver(requestPointerFlush);
  bodyClassObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();


/* --- scripts/works-hover-preview.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const worksPreview = document.querySelector("#works-hover-preview");
  const worksPreviewImg = document.querySelector("#works-preview-img");
  const worksRows = Array.from(document.querySelectorAll(".works-row"));

  const hideWorksPreview = () => {
    worksPreview?.classList.remove("is-visible");
    worksPreviewImg?.classList.remove("is-waving");
  };

  runtime.hideWorksPreview = hideWorksPreview;

  const getDistance = (x1, y1, x2, y2) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  };

  const getClosestVerticalEdge = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const topDistance = getDistance(x, y, rect.width / 2, 0);
    const bottomDistance = getDistance(x, y, rect.width / 2, rect.height);
    return topDistance < bottomDistance ? "top" : "bottom";
  };

  const getRowText = (row) => row.querySelector(".works-row-name")?.textContent?.trim() || "";

  const getRowImage = (row) => {
    if (row.dataset.featuredSrc) return row.dataset.featuredSrc;

    const category = row.dataset.category || "oem";
    const projectIndex = Number.parseInt(row.dataset.projectIndex || "", 10);
    const project = Number.isFinite(projectIndex)
      ? window.workGalleryProjects?.[category]?.[projectIndex]
      : null;
    if (project?.cover || project?.src) return project.cover || project.src;

    const imagePool = window.workGalleryImages?.[category] || [];
    return imagePool[0]?.src || "";
  };

  const buildFlowingMenu = (row) => {
    const existing = row.querySelector(".works-flowing-menu");
    if (existing) return existing;

    const text = getRowText(row);
    const image = getRowImage(row);
    const overlay = document.createElement("span");
    const inner = document.createElement("span");
    const contentWidthEstimate = Math.max(220, text.length * 32 + 240);
    const repetitions = Math.min(5, Math.max(3, Math.ceil(window.innerWidth / contentWidthEstimate) + 2));

    overlay.className = "works-flowing-menu";
    overlay.setAttribute("aria-hidden", "true");
    inner.className = "works-flowing-menu-inner";

    for (let index = 0; index < repetitions; index += 1) {
      const part = document.createElement("span");
      const label = document.createElement("span");
      const media = document.createElement("span");

      part.className = "works-flowing-menu-part";
      label.className = "works-flowing-menu-text";
      media.className = "works-flowing-menu-img";
      label.textContent = text;
      if (image) media.style.backgroundImage = `url("${image}")`;

      part.append(label, media);
      inner.appendChild(part);
    }

    overlay.appendChild(inner);
    row.appendChild(overlay);
    row.style.setProperty("--flowing-menu-distance", `${contentWidthEstimate}px`);
    return overlay;
  };

  const resetFlowingMenuText = (row) => {
    row.querySelector(".works-flowing-menu")?.remove();
    row.style.removeProperty("--flowing-menu-distance");
  };

  const showFlowingMenu = (row, edge) => {
    const overlay = buildFlowingMenu(row);
    const inner = overlay.querySelector(".works-flowing-menu-inner");
    if (!inner) return;

    overlay.style.transition = "none";
    inner.style.transition = "none";
    overlay.style.transform = edge === "top" ? "translate3d(0, -101%, 0)" : "translate3d(0, 101%, 0)";
    inner.style.transform = edge === "top" ? "translate3d(0, 101%, 0)" : "translate3d(0, -101%, 0)";

    window.requestAnimationFrame(() => {
      row.classList.add("is-flowing");
      overlay.style.transition = "";
      inner.style.transition = "";
      overlay.style.transform = "translate3d(0, 0, 0)";
      inner.style.transform = "translate3d(0, 0, 0)";
    });
  };

  const hideFlowingMenu = (row, edge) => {
    const overlay = row.querySelector(".works-flowing-menu");
    const inner = row.querySelector(".works-flowing-menu-inner");
    if (!overlay || !inner) return;
    row.classList.remove("is-flowing");
    overlay.style.transform = edge === "top" ? "translate3d(0, -101%, 0)" : "translate3d(0, 101%, 0)";
    inner.style.transform = edge === "top" ? "translate3d(0, 101%, 0)" : "translate3d(0, -101%, 0)";
  };

  window.LucianWorksFlowingMenu = {
    refresh() {
      worksRows.forEach(resetFlowingMenuText);
    },
  };

  worksRows.forEach((row) => {
    row.removeAttribute("role");
    if (!row.hasAttribute("tabindex")) row.setAttribute("tabindex", "0");

    row.addEventListener("mouseenter", (event) => {
      hideWorksPreview();
      showFlowingMenu(row, getClosestVerticalEdge(event, row));
    });

    row.addEventListener("mouseleave", (event) => {
      hideFlowingMenu(row, getClosestVerticalEdge(event, row));
    });

    row.addEventListener("focus", () => {
      hideWorksPreview();
      showFlowingMenu(row, "bottom");
    });

    row.addEventListener("blur", () => {
      hideFlowingMenu(row, "bottom");
    });
  });
})();


/* --- scripts/work-infinite-gallery.js --- */
(() => {
  const section = document.querySelector("#works-infinite");
  const canvas = document.querySelector("#works-infinite-canvas");
  const titleEl = document.querySelector("#works-infinite-title");
  const descriptionEl = document.querySelector("#works-infinite-description");
  const indexEl = document.querySelector("#works-infinite-index");

  if (!section || !canvas || !window.THREE) return;

  const categoryKeys = ["oem"];
  const categoryLabels = {
    zh: {
      oem: "OEM包装",
      gift: "礼品福利",
      brand: "品牌字体",
      aigc: "AIGC流",
      "aigc-video": "视频创作",
    },
    en: {
      oem: "OEM Packaging",
      gift: "Gifting",
      brand: "Brand Type",
      aigc: "AIGC Flow",
      "aigc-video": "Video",
    },
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const mod = (value, length) => ((value % length) + length) % length;
  const lerp = (from, to, amount) => from + (to - from) * amount;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getLangKey = () => (document.documentElement.lang || "").toLowerCase().startsWith("en") ? "en" : "zh";
  const getCategoryLabel = (category) => categoryLabels[getLangKey()]?.[category] || categoryLabels.zh[category] || category;
  const getCategoryDescription = (category) => {
    const lang = getLangKey();
    return window.galleryText?.[lang]?.categoryDescriptions?.[category]
      || window.galleryText?.zh?.categoryDescriptions?.[category]
      || "";
  };

  const makeCategoryPools = () => categoryKeys.map((categoryKey, categoryIndex) => ({
      categoryKey,
      categoryIndex,
      items: (window.workGalleryImages?.[categoryKey] || [])
        .filter((item) => item?.src)
        .map((item, imageIndex) => ({
          ...item,
          categoryKey,
          categoryIndex,
          imageIndex,
        })),
    })).filter((pool) => pool.items.length);

  const categoryPools = makeCategoryPools();
  const fallbackItems = categoryPools.flatMap((pool) => pool.items);
  if (!fallbackItems.length) return;

  const createFallback = () => {
    section.classList.add("is-fallback");
    const fallback = document.createElement("div");
    fallback.className = "works-infinite-fallback";
    fallbackItems.slice(0, 12).forEach((item) => {
      const img = document.createElement("img");
      img.alt = item.title || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = item.src;
      fallback.appendChild(img);
    });
    section.querySelector(".works-infinite-stage")?.prepend(fallback);
  };

  const whitePixel = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  whitePixel.needsUpdate = true;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile(),
      powerPreference: "high-performance",
    });
  } catch (error) {
    createFallback();
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 120);
  camera.position.set(0, 0, 0);

  const loader = new THREE.TextureLoader();
  const textureCache = new Map();

  const createMaterial = () => new THREE.ShaderMaterial({
    transparent: true,
    depthTest: true,
    depthWrite: false,
    uniforms: {
      map: { value: whitePixel },
      opacity: { value: 0 },
      time: { value: 0 },
      wave: { value: 0 },
      hover: { value: 0 },
      texelSize: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float time;
      uniform float wave;
      uniform float hover;

      void main() {
        vUv = uv;
        vec3 p = position;
        float cloth = sin((p.x * 2.6) + time * 0.85) * 0.05 * wave;
        float ripple = sin((p.y * 5.2) + time * 2.1) * 0.035 * hover;
        p.z += cloth + ripple;
        p.x += sin((p.y + time * 0.22) * 2.0) * 0.055 * wave;
        p.y += cos((p.x + time * 0.16) * 2.4) * 0.04 * wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D map;
      uniform float opacity;
      uniform float hover;
      uniform vec2 texelSize;

      void main() {
        vec4 sharp = texture2D(map, vUv);
        vec4 blur = sharp * 0.44;
        blur += texture2D(map, vUv + vec2(texelSize.x * 2.0, 0.0)) * 0.14;
        blur += texture2D(map, vUv - vec2(texelSize.x * 2.0, 0.0)) * 0.14;
        blur += texture2D(map, vUv + vec2(0.0, texelSize.y * 2.0)) * 0.14;
        blur += texture2D(map, vUv - vec2(0.0, texelSize.y * 2.0)) * 0.14;
        vec4 color = mix(blur, sharp, 0.82 + hover * 0.18);
        color.rgb = mix(color.rgb * 0.62, color.rgb, opacity);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

  const getTexture = (item, material) => {
    if (textureCache.has(item.src)) return textureCache.get(item.src);

    const record = { texture: whitePixel, aspect: item.size === "wide" ? 1.52 : 0.92, loaded: false };
    textureCache.set(item.src, record);
    loader.load(
      item.src,
      (texture) => {
        if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy?.() || 1);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        record.texture = texture;
        record.aspect = texture.image?.width && texture.image?.height
          ? texture.image.width / texture.image.height
          : record.aspect;
        record.loaded = true;
        if (material) {
          material.uniforms.map.value = texture;
          material.uniforms.texelSize.value.set(1 / (texture.image?.width || 1), 1 / (texture.image?.height || 1));
        }
      },
      undefined,
      () => {
        textureCache.delete(item.src);
      }
    );
    return record;
  };

  const poolCount = isMobile() ? 6 : 10;
  const depthRange = isMobile() ? 34 : 50;
  const planes = Array.from({ length: poolCount }, (_, slot) => {
    const material = createMaterial();
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 34, 18), material);
    mesh.userData = { slot, itemIndex: -1, categoryKey: "", depth: 0, hover: 0 };
    scene.add(mesh);
    return mesh;
  });

  let width = 1;
  let height = 1;
  let scrollPosition = 0;
  let manualOffset = 0;
  let velocity = 0;
  let lastTime = performance.now();
  let lastInteraction = performance.now();
  let lastPageY = window.scrollY;
  let activeCategory = "";
  let isPointerDown = false;
  let lastPointerY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let hoverMesh = null;
  let rafId = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const markInteraction = () => {
    lastInteraction = performance.now();
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.6);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const positionFor = (poolIndex, depth) => {
    const horizontalAngle = (poolIndex * 2.618) % (Math.PI * 2);
    const verticalAngle = (poolIndex * 1.618 + Math.PI / 3) % (Math.PI * 2);
    const horizontalRadius = (poolIndex % 3) * 1.2;
    const verticalRadius = ((poolIndex + 1) % 4) * 0.8;
    const maxX = isMobile() ? 4.1 : 8;
    const maxY = isMobile() ? 4.8 : 8;
    const focus = Math.exp(-Math.pow((depth - 0.22) / 0.2, 2));
    const scatter = 1 - focus;
    return {
      x: ((Math.sin(horizontalAngle) * horizontalRadius * maxX) / 3) * scatter,
      y: (((Math.cos(verticalAngle) * verticalRadius * maxY) / 4) * scatter) + focus * 0.18,
      tilt: Math.sin(horizontalAngle * 0.7) * 0.16 * scatter,
    };
  };

  const updateCopy = (category) => {
    if (!category || activeCategory === category) return;
    activeCategory = category;
    if (titleEl) titleEl.textContent = getCategoryLabel(category);
    if (descriptionEl) descriptionEl.textContent = getCategoryDescription(category);
  };

  const updateIndex = () => {
    if (!indexEl) return;
    const itemCount = categoryPools[0]?.items?.length || 1;
    const imageIndex = mod(Math.round(scrollPosition), itemCount);
    indexEl.textContent = `OEM / ${String(imageIndex + 1).padStart(2, "0")}`;
  };

  const refreshLanguage = () => {
    if (!activeCategory) {
      updateCopy(categoryPools[0]?.categoryKey || "oem");
      return;
    }
    if (titleEl) titleEl.textContent = getCategoryLabel(activeCategory);
    if (descriptionEl) descriptionEl.textContent = getCategoryDescription(activeCategory);
  };

  const getSectionProgress = () => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - (window.innerHeight || 1));
    return clamp(-rect.top / travel, 0, 1);
  };

  const updateHover = () => {
    if (!pointerX && !pointerY) return;
    pointer.x = (pointerX / width) * 2 - 1;
    pointer.y = -(pointerY / height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(planes, false);
    hoverMesh = hits[0]?.object || null;
  };

  const render = (now) => {
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    const idleMs = now - lastInteraction;
    const autoSpeed = prefersReducedMotion ? 0 : (isMobile() ? 0.16 : 0.24);
    const auto = idleMs > 3000 ? autoSpeed : 0;
    const sectionProgress = getSectionProgress();
    const categoryPosition = Math.min(categoryPools.length - 0.0001, sectionProgress * categoryPools.length);
    const activePoolIndex = clamp(Math.floor(categoryPosition), 0, categoryPools.length - 1);
    const activePool = categoryPools[activePoolIndex] || categoryPools[0];
    const localProgress = categoryPosition - activePoolIndex;
    const activeItems = activePool.items;
    manualOffset = mod(manualOffset + (velocity + auto) * dt, activeItems.length);
    scrollPosition = mod(localProgress * activeItems.length + manualOffset, activeItems.length);
    velocity *= Math.exp(-dt * 2.7);

    const baseIndex = Math.floor(scrollPosition);
    const progress = scrollPosition - baseIndex;

    updateHover();
    planes.forEach((mesh, poolIndex) => {
      let depthSlot = poolIndex - progress;
      let itemOffset = poolIndex;
      if (depthSlot < 0) {
        depthSlot += poolCount;
        itemOffset += poolCount;
      }

      const itemIndex = mod(baseIndex + itemOffset, activeItems.length);
      const item = activeItems[itemIndex];
      const depth = clamp(depthSlot / (poolCount - 1), 0, 1);
      const worldZ = -3.8 - depth * depthRange;
      const pos = positionFor(poolIndex, depth);
      const focus = Math.exp(-Math.pow((depth - 0.22) / 0.25, 2));
      const nearFade = clamp(depth / 0.08, 0, 1);
      const farFade = clamp((0.88 - depth) / 0.2, 0, 1);
      const opacity = clamp(focus * nearFade * farFade, 0, 1);
      const material = mesh.material;

      const itemKey = `${activePool.categoryKey}:${itemIndex}`;
      if (mesh.userData.itemKey !== itemKey) {
        const textureRecord = getTexture(item, material);
        mesh.userData.itemIndex = itemIndex;
        mesh.userData.itemKey = itemKey;
        mesh.userData.categoryKey = item.categoryKey;
        material.uniforms.map.value = textureRecord.texture;
        material.uniforms.texelSize.value.set(
          1 / (textureRecord.texture.image?.width || 1),
          1 / (textureRecord.texture.image?.height || 1)
        );
      }

      const textureRecord = getTexture(item, material);
      const aspect = textureRecord.aspect || (item.size === "wide" ? 1.52 : 0.92);
      const baseScale = isMobile() ? 1.95 : 2.25;
      mesh.position.set(pos.x, pos.y, worldZ);
      mesh.rotation.set(pos.tilt * 0.18, -pos.tilt * 0.28, pos.tilt * 0.12);
      mesh.scale.set(baseScale * aspect, baseScale, 1);
      mesh.userData.depth = depth;
      mesh.userData.hover = lerp(mesh.userData.hover, hoverMesh === mesh ? 1 : 0, 1 - Math.exp(-dt * 8));
      material.uniforms.time.value = now * 0.001;
      material.uniforms.opacity.value = textureRecord.loaded ? opacity : 0;
      material.uniforms.wave.value = (isMobile() ? 0.42 : 0.62) * (0.3 + Math.abs(velocity) * 0.24);
      material.uniforms.hover.value = mesh.userData.hover;

    });

    updateCopy(activePool.categoryKey);
    updateIndex();
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(render);
  };

  const sectionVisibility = () => {
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight || 1;
    const visible = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
    return clamp(visible / Math.min(viewportH, rect.height || viewportH), 0, 1);
  };

  const onWheel = (event) => {
    if (sectionVisibility() < 0.12) return;
    velocity += clamp(event.deltaY * 0.006, -2.4, 2.4);
    markInteraction();
  };

  const onScroll = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastPageY;
    lastPageY = currentY;
    if (sectionVisibility() < 0.18 || Math.abs(delta) < 0.5) return;
    velocity += clamp(delta * 0.0034, -1.8, 1.8);
    markInteraction();
  };

  const onKeyDown = (event) => {
    if (sectionVisibility() < 0.45) return;
    if (!["ArrowDown", "ArrowRight", "PageDown", " ", "ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) return;
    const direction = ["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key) ? -1 : 1;
    velocity += direction * (isMobile() ? 0.9 : 1.25);
    markInteraction();
  };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    if (!isPointerDown) return;
    const delta = lastPointerY - event.clientY;
    lastPointerY = event.clientY;
    velocity += clamp(delta * 0.018, -1.4, 1.4);
    markInteraction();
  };

  const onPointerDown = (event) => {
    isPointerDown = true;
    lastPointerY = event.clientY;
    canvas.classList.add("is-dragging");
    canvas.setPointerCapture?.(event.pointerId);
    markInteraction();
  };

  const onPointerUp = (event) => {
    isPointerDown = false;
    canvas.classList.remove("is-dragging");
    canvas.releasePointerCapture?.(event.pointerId);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", () => {
    hoverMesh = null;
  });

  window.LucianWorkInfiniteGallery = {
    refreshLanguage,
  };

  resize();
  updateCopy(categoryPools[0].categoryKey);
  rafId = window.requestAnimationFrame(render);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(rafId);
    renderer.dispose();
    planes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
  }, { once: true });
})();


/* --- scripts/work-category-showcase.js --- */
(() => {
  const track = document.querySelector("#works-category-track");
  if (!track) return;

  // gift merged into main works list; aigc-video merged into aigc card
  const categories = ["brand", "aigc"];
  const labels = {
    zh: {
      brand: "品牌与字体",
      aigc: "AI 工作流",
    },
    en: {
      brand: "Brand & Type",
      aigc: "AI Workflow",
    },
  };

  const getLangKey = () => (
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ? "en" : "zh"
  );

  const getLabel = (category) => labels[getLangKey()]?.[category] || labels.zh[category] || category;

  const getDescription = (category) => {
    const lang = getLangKey();
    return window.galleryText?.[lang]?.categoryDescriptions?.[category]
      || window.galleryText?.zh?.categoryDescriptions?.[category]
      || "";
  };

  const createPreviewImage = (item, index) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    figure.className = "works-category-image";
    figure.style.setProperty("--image-index", index);
    img.src = item.src;
    img.alt = item.title || "";
    img.loading = "lazy";
    img.decoding = "async";
    figure.appendChild(img);
    return figure;
  };

  const render = () => {
    const lang = getLangKey();
    track.innerHTML = "";

    categories.forEach((category, categoryIndex) => {
      const items = (window.workGalleryImages?.[category] || []).filter((item) => item?.src).slice(0, 3);
      if (!items.length) return;

      const article = document.createElement("article");
      const meta = document.createElement("div");
      const index = document.createElement("p");
      const title = document.createElement("h3");
      const description = document.createElement("p");
      const images = document.createElement("div");

      article.className = "works-category-card";
      article.dataset.category = category;
      meta.className = "works-category-meta";
      index.className = "works-category-index";
      title.className = "works-category-name";
      description.className = "works-category-description";
      images.className = "works-category-images";

      index.textContent = String(categoryIndex + 1).padStart(2, "0");
      title.textContent = getLabel(category);
      description.textContent = getDescription(category);
      items.forEach((item, imageIndex) => images.appendChild(createPreviewImage(item, imageIndex)));

      meta.append(index, title, description);
      article.append(meta, images);
      track.appendChild(article);
    });

    const heading = document.querySelector(".works-category-title");
    if (heading) heading.textContent = lang === "en" ? "Extended Skills" : "延展能力";
  };

  render();
  window.LucianWorkCategoryShowcase = {
    refreshLanguage: render,
  };
})();


/* --- scripts/section-flow.js --- */
(() => {
  const runtime = window.LucianRuntime;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const navItems = Array.from(document.querySelectorAll(".bottom-nav-item"));
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]:not([href="#"])'));
  const heroStage = document.querySelector(".hero-stage");
  const sectionIds = ["about", "services", "works", "contact"];
  const sections = new Map(
    ["about", "services", "works-transition", "works", "clients", "contact"]
      .map((id) => [id, document.getElementById(id)])
      .filter(([, element]) => Boolean(element))
  );

  let navTransition = null;
  let navTransitionLabel = null;
  let transitionActive = false;
  let transitionToken = 0;
  let transitionTimers = [];
  let jumpSettleTimers = [];
  let activeSection = "about";
  let ticking = false;
  let pendingHashTimers = [];
  let clearHashPendingTimer = 0;

  const readHashTarget = () => (window.location.hash?.slice(1) || "").split("?")[0];
  let pendingHashTarget = readHashTarget();

  const transitionTiming = {
    cover: 120,
    reveal: 220,
    buffer: 0,
  };

  const transitionCopy = {
    about: "ABOUT",
    services: "SERVICES",
    works: "FEATURED",
    contact: "CONTACT",
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const getTopSafeArea = () => {
    const parsed = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-top-safe"));
    return Number.isFinite(parsed) ? parsed : 64;
  };

  const topFor = (id) => {
    const target = sections.get(id);
    if (!target) return 0;
    const vh = Math.max(1, window.innerHeight);
    const safe = getTopSafeArea();

    if (id === "about") {
      const scrollable = Math.max(0, target.scrollHeight - vh);
      return Math.max(0, target.offsetTop + scrollable * 0.36);
    }

    if (id === "services") {
      return Math.max(0, target.offsetTop);
    }

    if (id === "works") {
      return Math.max(0, target.offsetTop - safe + vh * 0.06);
    }

    if (id === "contact") {
      return Math.max(0, target.offsetTop - safe + vh * 0.04);
    }

    if (id === "clients") {
      return Math.max(0, target.offsetTop - safe + vh * 0.08);
    }

    return Math.max(0, target.offsetTop - safe);
  };

  const rect = (id) => sections.get(id)?.getBoundingClientRect() || null;
  const isHeroTopSurfaceActive = () => {
    if (!heroStage) return false;
    const r = heroStage.getBoundingClientRect();
    const probeY = Math.max(32, getTopSafeArea() * 0.5);
    return r.top <= probeY && r.bottom >= probeY;
  };

  const intersects = (id, topRatio = 0.66, bottomRatio = 0.18) => {
    const r = rect(id);
    if (!r) return false;
    const vh = Math.max(1, window.innerHeight);
    return r.top <= vh * topRatio && r.bottom >= vh * bottomRatio;
  };

  const detectActiveSection = () => {
    if (isHeroTopSurfaceActive()) return "hero";

    const vh = Math.max(1, window.innerHeight);
    const contact = rect("contact");
    if (contact && contact.top <= vh * 0.58 && contact.bottom > getTopSafeArea()) return "contact";
    if (intersects("works", 0.72, 0.1) || intersects("works-transition", 0.66, 0.14)) return "works";
    if (intersects("services", 0.7, 0.16)) return "services";
    if (intersects("about", 0.72, 0.12)) return "about";

    const probeY = window.scrollY + vh * 0.42;
    let active = null;
    sectionIds.forEach((id) => {
      const target = sections.get(id);
      if (target && target.offsetTop <= probeY) active = id;
    });
    return active || "about";
  };

  const clearTransitionTimers = () => {
    transitionTimers.forEach((timer) => window.clearTimeout(timer));
    transitionTimers = [];
  };

  const clearJumpSettleTimers = () => {
    jumpSettleTimers.forEach((timer) => window.clearTimeout(timer));
    jumpSettleTimers = [];
  };

  const applyJumpTop = (top) => {
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  };

  const scheduleJumpSettle = (id, top, source) => {
    if (!["bottom-nav", "anchor", "hashchange", "initial-hash"].includes(source)) return;
    clearJumpSettleTimers();

    const settle = () => {
      if (window.location.hash && readHashTarget() !== id) return;
      applyJumpTop(top);
      setActiveNavTarget(id);
      window.LucianServicesStory?.refresh?.();
      window.LucianWorksFlowingMenu?.refresh?.();
    };

    window.requestAnimationFrame(settle);
    [90, 220, 420].forEach((delay) => {
      jumpSettleTimers.push(window.setTimeout(settle, delay));
    });
  };

  const getTransitionOverlay = () => {
    if (navTransition) return navTransition;

    navTransition = document.createElement("div");
    navTransition.className = "nav-paper-transition";
    navTransition.setAttribute("aria-hidden", "true");
    navTransition.hidden = true;

    const sheet = document.createElement("div");
    sheet.className = "nav-paper-sheet";
    navTransitionLabel = document.createElement("span");
    navTransitionLabel.className = "nav-paper-label";
    sheet.append(navTransitionLabel);
    navTransition.append(sheet);
    document.body.append(navTransition);

    return navTransition;
  };

  const resetTransitionLayers = ({ removeNodes = false, clearTimers = true } = {}) => {
    if (clearTimers) clearTransitionTimers();
    navTransition?.classList.remove("is-active", "is-leaving");
    if (navTransition) navTransition.hidden = true;
    document.body.classList.remove("nav-transition-active");
    transitionActive = false;

    if (removeNodes) {
      navTransition?.remove();
      navTransition = null;
      navTransitionLabel = null;
    }
  };

  const setTransitionText = (id) => {
    if (navTransitionLabel) navTransitionLabel.textContent = transitionCopy[id] || id.toUpperCase();
  };

  const finishTransition = () => {
    navTransition?.classList.add("is-leaving");
    navTransition?.classList.remove("is-active");
  };

  const setActiveNavTarget = (id) => {
    activeSection = id;
    setStageClasses(activeSection);
    navItems.forEach((item) => {
      const isActive = item.getAttribute("href") === `#${activeSection}`;
      item.classList.toggle("is-active", isActive);
      if (isActive) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    return activeSection;
  };

  const performJump = (id, { updateHash = true, behavior = "auto", source = "section-flow" } = {}) => {
    const target = sections.get(id);
    if (!target) return false;

    runtime?.closeWorkGallery?.();

    const top = Math.round(topFor(id));
    document.documentElement.classList.add("nav-jump-instant");
    if (behavior === "auto") applyJumpTop(top);
    else window.scrollTo({ top, left: 0, behavior });

    if (updateHash && window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }

    setActiveNavTarget(id);

    window.dispatchEvent(new CustomEvent("lucian:programmatic-section-jump", {
      detail: { targetId: id, source },
    }));

    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("nav-jump-instant");
      setActiveNavTarget(id);
      window.LucianServicesStory?.refresh?.();
      window.LucianWorksFlowingMenu?.refresh?.();
    });
    scheduleJumpSettle(id, top, source);

    return true;
  };

  const jumpToHero = ({ updateHash = true, source = "section-flow" } = {}) => {
    clearPendingHashTimers();
    clearJumpSettleTimers();
    pendingHashTarget = "";
    setHashJumpPending(false);
    resetTransitionLayers({ removeNodes: true });
    runtime?.closeWorkGallery?.();
    document.documentElement.classList.add("nav-jump-instant");
    applyJumpTop(0);

    if (updateHash && window.location.hash) {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    setActiveNavTarget("hero");
    window.dispatchEvent(new CustomEvent("lucian:programmatic-section-jump", {
      detail: { targetId: "hero", source },
    }));

    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("nav-jump-instant");
      setActiveNavTarget("hero");
    });

    return true;
  };

  const jumpToSection = (id, options = {}) => {
    if (!sections.has(id)) return false;

    const {
      updateHash = true,
      behavior = "auto",
      source = "section-flow",
      withTransition = false,
    } = options;

    transitionToken += 1;
    clearTransitionTimers();
    if (transitionActive) resetTransitionLayers({ removeNodes: true, clearTimers: false });

    if (!withTransition || reducedMotion) {
      return performJump(id, { updateHash, behavior, source });
    }

    transitionActive = true;
    const token = ++transitionToken;
    const overlay = getTransitionOverlay();
    setTransitionText(id);
    overlay.hidden = false;
    document.body.classList.add("nav-transition-active");
    overlay.classList.remove("is-leaving", "is-active");

    window.requestAnimationFrame(() => {
      if (token !== transitionToken) return;
      overlay.classList.add("is-active");
    });

    transitionTimers.push(window.setTimeout(() => {
      if (token !== transitionToken) return;
      performJump(id, { updateHash, behavior: "auto", source });
      window.requestAnimationFrame(() => {
        if (token !== transitionToken) return;
        finishTransition();
      });
    }, transitionTiming.cover));

    transitionTimers.push(window.setTimeout(() => {
      if (token !== transitionToken) return;
      resetTransitionLayers({ removeNodes: true, clearTimers: false });
    }, transitionTiming.cover + transitionTiming.reveal + transitionTiming.buffer));

    return true;
  };

  const setStageClasses = (active) => {
    const heroActive = active === "hero" || isHeroTopSurfaceActive();
    const warmActive = ["clients", "contact"].some((id) => intersects(id, 0.58, 0.08));
    const darkActive = !isHeroTopSurfaceActive()
      && (["about", "services", "works"].includes(active) || intersects("works-transition", 0.68, 0.08));
    document.documentElement.classList.toggle("is-hero-stage", heroActive);
    document.documentElement.classList.toggle("is-warm-stage", warmActive);
    document.documentElement.classList.toggle("is-dark-stage", darkActive && !warmActive);
    document.body.classList.toggle("is-hero-stage", heroActive);
    document.body.classList.toggle("is-warm-stage", warmActive);
    document.body.classList.toggle("is-dark-stage", darkActive && !warmActive);
  };

  const updateActiveNav = () => {
    return setActiveNavTarget(detectActiveSection());
  };

  const refresh = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (!document.body.classList.contains("has-entered")) {
        const id = sections.has(pendingHashTarget) ? pendingHashTarget : "about";
        setActiveNavTarget(id);
        return;
      }
      updateActiveNav();
      window.LucianServicesStory?.refresh?.();
    });
  };

  const handleAnchorClick = (event) => {
    const anchor = event.currentTarget;
    const id = anchor.getAttribute("href")?.slice(1);
    if (!id || !sections.has(id)) return;
    event.preventDefault();
    runtime?.playUiTone?.("click");
    jumpToSection(id, {
      updateHash: true,
      source: anchor.classList.contains("bottom-nav-item") ? "bottom-nav" : "anchor",
      withTransition: false,
    });
  };

  const clearPendingHashTimers = () => {
    pendingHashTimers.forEach((timer) => window.clearTimeout(timer));
    pendingHashTimers = [];
    window.clearTimeout(clearHashPendingTimer);
  };

  const setHashJumpPending = (pending) => {
    document.documentElement.classList.toggle("section-hash-jump-pending", pending);
    document.body.classList.toggle("section-hash-jump-pending", pending);
  };

  const clearHashJumpPendingSoon = (delay = 0) => {
    window.clearTimeout(clearHashPendingTimer);
    clearHashPendingTimer = window.setTimeout(() => {
      if (pendingHashTarget) return;
      setHashJumpPending(false);
    }, delay);
  };

  const targetIsSettled = (id) => {
    const target = sections.get(id);
    if (!target) return true;
    return Math.abs(window.scrollY - topFor(id)) < Math.max(12, window.innerHeight * 0.04);
  };

  const handlePendingHash = (forcedId = "") => {
    const id = forcedId || pendingHashTarget || readHashTarget();
    if (!id || !sections.has(id)) return;
    if (targetIsSettled(id)) {
      pendingHashTarget = "";
      clearHashJumpPendingSoon(360);
      return;
    }
    jumpToSection(id, { updateHash: false, source: "initial-hash" });
    clearHashPendingTimer = window.setTimeout(() => {
      if (!targetIsSettled(id)) return;
      pendingHashTarget = "";
      setHashJumpPending(false);
    }, 420);
  };

  const schedulePendingHash = () => {
    const id = readHashTarget() || pendingHashTarget;
    if (!id || !sections.has(id)) return;
    pendingHashTarget = id;
    setHashJumpPending(true);
    clearPendingHashTimers();
    [120, 820, 1700, 2600].forEach((delay) => {
      pendingHashTimers.push(window.setTimeout(() => handlePendingHash(id), delay));
    });
    clearHashJumpPendingSoon(3200);
  };

  const handleReturnToEntry = () => {
    clearPendingHashTimers();
    clearJumpSettleTimers();
    pendingHashTarget = "";
    setHashJumpPending(false);
    resetTransitionLayers({ removeNodes: true });
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    navItems.forEach((item) => item.classList.remove("is-active"));
    document.documentElement.classList.remove("is-hero-stage", "is-warm-stage", "is-dark-stage");
    document.body.classList.remove("is-hero-stage", "is-warm-stage", "is-dark-stage");
  };

  anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

  window.LucianSectionFlow = {
    jumpToHero,
    jumpToSection,
    refresh,
    getActiveSection() {
      return activeSection;
    },
  };
  document.documentElement.dataset.sectionFlow = "ready";

  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("hashchange", () => {
    const id = readHashTarget();
    if (id && sections.has(id)) jumpToSection(id, { updateHash: false, source: "hashchange" });
  });
  window.addEventListener("lucian:site-entered", schedulePendingHash);
  window.addEventListener("lucian:return-to-entry", handleReturnToEntry);
  window.addEventListener("pageshow", () => {
    resetTransitionLayers({ removeNodes: true });
    pendingHashTarget = readHashTarget() || pendingHashTarget;
    refresh();
    if (document.body.classList.contains("has-entered")) {
      schedulePendingHash();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetTransitionLayers({ removeNodes: true });
  });

  if (document.body.classList.contains("has-entered")) updateActiveNav();
  else setActiveNavTarget(sections.has(pendingHashTarget) ? pendingHashTarget : "about");
  if (document.body.classList.contains("has-entered")) {
    schedulePendingHash();
  }
})();


/* --- scripts/site-clock.js --- */
(() => {
  const beijingTimeNodes = Array.from(document.querySelectorAll("#beijing-time, [data-beijing-time]"));
  const beijingDateNodes = Array.from(document.querySelectorAll("#beijing-date, [data-beijing-date]"));

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

    if (beijingTimeNodes.length) {
      const period = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Shanghai",
        hour: "numeric",
        hour12: true,
      }).formatToParts(now).find((part) => part.type === "dayPeriod")?.value || "";
      const timeMarkup = `<span class="top-meta-period">${period.toUpperCase()}</span>${timeFormatter.format(now)}`;
      beijingTimeNodes.forEach((node) => {
        node.innerHTML = timeMarkup;
      });
    }

    if (beijingDateNodes.length) {
      const dateText = dateFormatter.format(now).replace(/-/g, ".");
      beijingDateNodes.forEach((node) => {
        node.textContent = dateText;
      });
    }
  };

  updateBeijingMeta();
  window.setInterval(updateBeijingMeta, 30000);
})();


/* --- scripts/bottom-nav-scroll-spy.js --- */
(() => {
  const flow = window.LucianSectionFlow;
  if (!flow) return;

  const dock = document.getElementById("bottom-nav-dock");
  const avatar = document.getElementById("bottom-nav-avatar");
  const directory = document.getElementById("bottom-nav-directory");
  const navItems = Array.from(document.querySelectorAll(".bottom-nav-item"));

  const setDockOpen = (open) => {
    if (!dock) return;
    dock.classList.toggle("is-open", open);
    directory?.setAttribute("aria-expanded", open ? "true" : "false");
    directory?.setAttribute("aria-label", open ? "Close directory" : "Open directory");
  };

  const jumpToHero = () => {
    setDockOpen(false);
    avatar?.blur();
    flow.jumpToHero?.({ source: "bottom-nav-avatar" });
  };

  avatar?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    jumpToHero();
  });

  directory?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDockOpen(!dock?.classList.contains("is-open"));
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => setDockOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!dock || !dock.classList.contains("is-open")) return;
    if (event.target instanceof Node && dock.contains(event.target)) return;
    setDockOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDockOpen(false);
  });

  const refresh = () => flow.refresh?.();

  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("lucian:programmatic-section-jump", refresh);
  window.addEventListener("lucian:site-entered", refresh);
  window.addEventListener("pageshow", refresh);
  refresh();
})();

/* --- scripts/clients-marquee.js --- */
(() => {
  const CONFIG = {
    smoothTau: 0.25,
    minCopies: 2,
    copyHeadroom: 2,
  };

  document.querySelectorAll(".clients-marquee.logoloop").forEach((root) => {
    const track = root.querySelector(".logoloop__track");
    const sourceList = root.querySelector(".logoloop__list");
    if (!track || !sourceList) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = Number(root.dataset.speed || 74);
    const hoverSpeed = Number(root.dataset.hoverSpeed || 0);
    const sourceItems = Array.from(sourceList.children).map((item) => item.cloneNode(true));
    let seqWidth = 0;
    let offset = 0;
    let velocity = 0;
    let lastTimestamp = 0;
    let raf = 0;
    let isHovered = false;

    const buildList = (hidden = true) => {
      const list = document.createElement("ul");
      list.className = "logoloop__list";
      if (hidden) list.setAttribute("aria-hidden", "true");
      sourceItems.forEach((item) => list.appendChild(item.cloneNode(true)));
      return list;
    };

    const updateCopies = () => {
      track.replaceChildren(sourceList);
      sourceList.removeAttribute("aria-hidden");

      seqWidth = Math.ceil(sourceList.getBoundingClientRect().width);
      if (!seqWidth) return;

      const containerWidth = root.clientWidth || seqWidth;
      const copiesNeeded = Math.max(
        CONFIG.minCopies,
        Math.ceil(containerWidth / seqWidth) + CONFIG.copyHeadroom
      );

      for (let index = 1; index < copiesNeeded; index += 1) {
        track.appendChild(buildList(true));
      }

      offset = ((offset % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const targetVelocity = isHovered ? hoverSpeed : speed;
      const easing = 1 - Math.exp(-delta / CONFIG.smoothTau);
      velocity += (targetVelocity - velocity) * easing;

      if (seqWidth > 0 && !prefersReducedMotion.matches) {
        offset = ((offset + velocity * delta) % seqWidth + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      raf = window.requestAnimationFrame(animate);
    };

    const restart = () => {
      window.cancelAnimationFrame(raf);
      lastTimestamp = 0;
      updateCopies();
      raf = window.requestAnimationFrame(animate);
    };

    root.addEventListener("mouseenter", () => {
      isHovered = true;
    });
    root.addEventListener("mouseleave", () => {
      isHovered = false;
    });

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(restart);
      observer.observe(root);
      observer.observe(sourceList);
    } else {
      window.addEventListener("resize", restart);
    }

    prefersReducedMotion.addEventListener?.("change", restart);
    restart();
  });
})();


/* --- scripts/clients-title-interaction.js --- */
(() => {
  const runtime = window.LucianRuntime;
  const band = document.querySelector(".clients-title-band");
  const title = band?.querySelector(".clients-title-lockup");
  const floatLayer = band?.querySelector("#clients-title-float");
  if (!band || !title || runtime?.reducedMotion) return;
  floatLayer?.replaceChildren();

  const wrapTextNode = (node) => {
    const text = node.textContent.replace(/\s+/g, " ");
    if (!text.trim()) return null;

    const fragment = document.createDocumentFragment();
    Array.from(text).forEach((char) => {
      const span = document.createElement("span");
      span.className = "clients-title-char";
      span.textContent = char === " " ? "\u00a0" : char;
      fragment.appendChild(span);
    });
    return fragment;
  };

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return wrapTextNode(node);
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const clone = node.cloneNode(false);
    Array.from(node.childNodes).forEach((child) => {
      const processed = processNode(child);
      if (processed) clone.appendChild(processed);
    });
    return clone;
  };

  const prepareTitle = () => {
    const fragment = document.createDocumentFragment();
    Array.from(title.childNodes).forEach((node) => {
      const processed = processNode(node);
      if (processed) fragment.appendChild(processed);
    });
    title.replaceChildren(fragment);
  };

  const updateCharacters = (event) => {
    const chars = title.querySelectorAll(".clients-title-char");
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;
      const dx = event.clientX - charX;
      const dy = event.clientY - charY;
      const distance = Math.hypot(dx, dy);
      const radius = 82;

      if (distance > radius || distance === 0) {
        char.style.transform = "";
        char.style.filter = "";
        char.style.color = "";
        return;
      }

      const power = (radius - distance) / radius;
      const moveX = (dx / distance) * power * -18;
      const moveY = (dy / distance) * power * -18;
      char.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) scale(${(1 + power * 0.18).toFixed(3)})`;
      char.style.filter = `blur(${(power * 2.2).toFixed(2)}px)`;
      char.style.color = "#ff6268";
    });
  };

  const resetCharacters = () => {
    title.querySelectorAll(".clients-title-char").forEach((char) => {
      char.style.transform = "";
      char.style.filter = "";
      char.style.color = "";
    });
  };

  prepareTitle();
  band.addEventListener("pointermove", updateCharacters, { passive: true });
  band.addEventListener("pointerleave", resetCharacters, { passive: true });
})();


/* --- scripts/portrait-motion.js --- */
(() => {
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
  let aboutRevealUnits = [];
  let centeredRevealActive = false;
  let centeredRevealArmed = false;
  let centeredRevealCompleted = false;
  let centeredTurnLocked = false;
  let centeredRevealAnchorY = 0;
  let centeredRevealTarget = 0;
  let centeredRevealArmRaf = null;
  let centeredTouchY = 0;
  let scrollTurnProgress = 0;
  let centeredRevealBackSuppressed = false;
  const smootherStep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const inverseSmootherStep = (value) => {
    const target = clamp01(value);
    let low = 0;
    let high = 1;
    for (let i = 0; i < 12; i += 1) {
      const mid = (low + high) / 2;
      if (smootherStep(mid) < target) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  };
  const CENTERED_REVEAL_DONE = 1;
  const CENTERED_REVEAL_MIN = 0;
  const CENTERED_REVEAL_DELTA_SCALE = 1600;
  const CENTERED_REVEAL_MAX_STEP = 0.38;
  const CENTERED_REVEAL_WHEEL_MIN_STEP = 0.34;
  const CENTERED_TURN_START = 0.06;
  const CENTERED_AUTO_COMPLETE_PROGRESS = 0.28;
  const CENTERED_REVEAL_TOP_LIMIT = 0.62;
  const CENTERED_REVEAL_ENTRY_TOP = 0.56;
  const VIDEO_FRAME_DURATION = 1 / 60;
  const PORTRAIT_SCRUB_SECONDS = 3;
  let portraitVideoLoadStarted = !video || !video.dataset.src;
  const portraitEnterFromProgress = (progress) => {
    const enterRaw = clamp01(progress / 0.14);
    return enterRaw * enterRaw * (3 - 2 * enterRaw);
  };

  const ensurePortraitVideoLoaded = () => {
    if (!video || portraitVideoLoadStarted) return;
    const src = video.dataset.src;
    portraitVideoLoadStarted = true;
    if (!src) return;
    video.src = src;
    video.load();
  };

  const setPortraitVideoTarget = (fallbackProgress = scrollTurnProgress) => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return;
    if (
      centeredRevealActive
      && !centeredRevealArmed
      && centeredRevealTarget <= CENTERED_TURN_START
    ) {
      targetVideoTime = 0;
      return;
    }
    targetVideoTime = duration * clamp01(fallbackProgress);
  };

  const setCenteredRevealClass = (active) => {
    document.documentElement.classList.toggle("about-centered-reveal-active", active);
    document.body.classList.toggle("about-centered-reveal-active", active);
  };

  const setPortraitRevealState = ({ armed = false, complete = false } = {}) => {
    section.classList.toggle("is-portrait-reveal-armed", armed);
    section.classList.toggle("is-portrait-reveal-complete", complete);
  };

  const cancelCenteredRevealArm = () => {
    if (centeredRevealArmRaf !== null) {
      cancelAnimationFrame(centeredRevealArmRaf);
      centeredRevealArmRaf = null;
    }
    centeredRevealArmed = false;
  };

  const sectionTop = () => {
    const currentY = window.scrollY || window.pageYOffset || 0;
    const rect = section.getBoundingClientRect();
    return Math.max(0, Math.round(currentY + rect.top));
  };

  const effectiveVideoDuration = () => {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return 0;
    return Math.min(video.duration, PORTRAIT_SCRUB_SECONDS);
  };

  const centeredRevealProgress = () => (
    smootherStep(clamp01(centeredRevealTarget / CENTERED_TURN_START))
  );

  const centeredTurnProgress = () => (
    smootherStep(clamp01((centeredRevealTarget - CENTERED_TURN_START) / (CENTERED_REVEAL_DONE - CENTERED_TURN_START)))
  );

  const visibleCenteredRevealTarget = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return centeredRevealTarget;
    const visibleTurn = clamp01(smoothedVideoTime / duration);
    return CENTERED_TURN_START + inverseSmootherStep(visibleTurn) * (CENTERED_REVEAL_DONE - CENTERED_TURN_START);
  };

  const lockToCenteredAnchor = () => {
    if (!centeredRevealActive) return;
    window.scrollTo({ top: centeredRevealAnchorY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = centeredRevealAnchorY;
    document.body.scrollTop = centeredRevealAnchorY;
  };

  const syncCenteredPortrait = () => {
    if (!centeredRevealArmed) {
      targetEnter = CENTERED_REVEAL_MIN;
      scrollTurnProgress = 0;
      setPortraitVideoTarget(0);
      return;
    }
    targetEnter = centeredRevealProgress();
    if (centeredTurnLocked) {
      targetEnter = 1;
      scrollTurnProgress = 1;
      setPortraitVideoTarget(1);
      return;
    }

    scrollTurnProgress = centeredTurnProgress();
    setPortraitVideoTarget(scrollTurnProgress);
  };

  const resetVideoToFirstFrame = () => {
    centeredTurnLocked = false;
    targetVideoTime = 0;
    smoothedVideoTime = 0;
    deferredSeekTime = null;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.seeking) {
      deferredSeekTime = 0;
      return;
    }
    if (Math.abs(video.currentTime) > seekThreshold()) video.currentTime = 0;
  };

  const lockVideoToFinalFrame = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return;
    centeredTurnLocked = true;
    targetVideoTime = duration;
    smoothedVideoTime = duration;
    deferredSeekTime = null;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.seeking) {
      deferredSeekTime = duration;
      return;
    }
    if (Math.abs(video.currentTime - duration) > seekThreshold()) video.currentTime = duration;
  };

  const releaseCenteredReveal = ({ force = false } = {}) => {
    if (!centeredRevealActive && !force) return;
    cancelCenteredRevealArm();
    centeredRevealActive = false;
    if (!force) centeredRevealCompleted = true;
    setCenteredRevealClass(false);
    setPortraitRevealState({
      armed: false,
      complete: !force,
    });
    if (!force) {
      lockVideoToFinalFrame();
    } else {
      centeredTurnLocked = false;
      setPortraitVideoTarget(scrollTurnProgress);
    }
    targetEnter = Math.max(targetEnter, currentEnter, 1);
    targetTextEnter = 0;
    targetProgressValue = 0;
  };

  const isCenteredRevealInRange = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * CENTERED_REVEAL_TOP_LIMIT && rect.bottom > vh * 0.34;
  };

  const isCenteredRevealEntryGate = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return (
      rect.top <= vh * CENTERED_REVEAL_ENTRY_TOP
      && rect.top > -vh * 0.78
      && rect.bottom > vh * 0.34
      && !document.body.classList.contains("about-services-handoff-active")
    );
  };

  const releaseCenteredRevealBack = () => {
    if (!centeredRevealActive) return;
    cancelCenteredRevealArm();
    centeredRevealActive = false;
    centeredRevealCompleted = false;
    centeredRevealBackSuppressed = true;
    setCenteredRevealClass(false);
    setPortraitRevealState();
    const previousY = Math.max(0, centeredRevealAnchorY - window.innerHeight * 0.56);
    targetEnter = CENTERED_REVEAL_MIN;
    targetTextEnter = 0;
    targetProgressValue = 0;
    resetVideoToFirstFrame();
    window.scrollTo({ top: previousY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = previousY;
    document.body.scrollTop = previousY;
  };

  const settleProgrammaticAboutJump = () => {
    ensurePortraitVideoLoaded();
    cancelCenteredRevealArm();
    centeredRevealActive = false;
    centeredRevealCompleted = true;
    centeredRevealBackSuppressed = false;
    centeredTurnLocked = false;
    setCenteredRevealClass(false);
    setPortraitRevealState({ complete: true });

    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp01(-rect.top / scrollable);
    const textEnter = smootherStep(clamp01((progress - 0.2) / 0.3));

    targetEnter = 1;
    currentEnter = Math.max(currentEnter, 1);
    targetTextEnter = Math.max(targetTextEnter, textEnter);
    currentTextEnter = Math.max(currentTextEnter, textEnter);
    targetProgressValue = Math.max(targetProgressValue, progress);
    currentProgressValue = Math.max(currentProgressValue, progress);
    targetExit = 0;
    currentExit = 0;
    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", "0.0000");
    setPortraitVideoTarget(scrollTurnProgress);
    renderAboutReveal();
  };

  const armCenteredRevealAfterAnchor = () => {
    cancelCenteredRevealArm();
    centeredRevealArmRaf = requestAnimationFrame(() => {
      lockToCenteredAnchor();
      centeredRevealArmRaf = requestAnimationFrame(() => {
        lockToCenteredAnchor();
        centeredRevealArmRaf = null;
        if (!centeredRevealActive) return;
        centeredRevealArmed = true;
        setPortraitRevealState({ armed: true });
        syncCenteredPortrait();
        renderAboutReveal();
      });
    });
  };

  const activateCenteredReveal = ({ anchorY = sectionTop(), enter = currentEnter } = {}) => {
    ensurePortraitVideoLoaded();
    cancelCenteredRevealArm();
    centeredRevealActive = true;
    centeredRevealCompleted = false;
    const measuredAnchorY = sectionTop();
    centeredRevealAnchorY = Math.max(0, Math.round(Number.isFinite(anchorY) ? anchorY : measuredAnchorY));
    centeredRevealTarget = clamp01(enter);
    const initialPortraitEnter = centeredRevealTarget > CENTERED_TURN_START
      ? centeredRevealProgress()
      : CENTERED_REVEAL_MIN;
    const initialTurnProgress = centeredRevealTarget > CENTERED_TURN_START
      ? centeredTurnProgress()
      : 0;
    targetEnter = initialPortraitEnter;
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    currentEnter = initialPortraitEnter;
    currentTextEnter = 0;
    currentProgressValue = 0;
    currentExit = 0;
    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));
    setPortraitRevealState();
    setCenteredRevealClass(true);
    lockToCenteredAnchor();
    if (centeredRevealTarget <= CENTERED_TURN_START) resetVideoToFirstFrame();
    scrollTurnProgress = initialTurnProgress;
    setPortraitVideoTarget(scrollTurnProgress);
    smoothedVideoTime = targetVideoTime;
    armCenteredRevealAfterAnchor();
    renderAboutReveal();
  };

  const advanceCenteredReveal = (delta, { source = "wheel", allowBeforeArmed = false } = {}) => {
    if (!centeredRevealActive) return;
    if (!Number.isFinite(delta) || Math.abs(delta) < 0.01) return;
    if (!centeredRevealArmed && !allowBeforeArmed) {
      lockToCenteredAnchor();
      return;
    }
    const direction = delta >= 0 ? 1 : -1;
    if (centeredTurnLocked && direction < 0) {
      centeredTurnLocked = false;
      smoothedVideoTime = clampVideoTime(targetVideoTime);
    }
    const rawStep = delta / CENTERED_REVEAL_DELTA_SCALE;
    const stepDirection = rawStep >= 0 ? 1 : -1;
    const minimumStep = source === "wheel" && Math.abs(delta) >= 40
      ? CENTERED_REVEAL_WHEEL_MIN_STEP
      : 0;
    const stepMagnitude = Math.min(
      CENTERED_REVEAL_MAX_STEP,
      Math.max(Math.abs(rawStep), minimumStep),
    );
    const step = stepDirection * stepMagnitude;
    const visibleTarget = visibleCenteredRevealTarget();
    const baseTarget = centeredRevealArmed
      ? (direction < 0
        ? Math.min(centeredRevealTarget, visibleTarget)
        : Math.max(centeredRevealTarget, visibleTarget))
      : centeredRevealTarget;
    const nextTarget = clamp01(baseTarget + step);
    centeredRevealTarget = centeredTurnLocked ? CENTERED_REVEAL_DONE : nextTarget;
    centeredRevealTarget = Math.max(CENTERED_REVEAL_MIN, centeredRevealTarget);
    targetTextEnter = 0;
    targetProgressValue = 0;
    targetExit = 0;
    syncCenteredPortrait();
    lockToCenteredAnchor();
    if (
      direction < 0
      && centeredRevealTarget <= CENTERED_REVEAL_MIN + 0.001
      && currentEnter <= CENTERED_REVEAL_MIN + 0.04
    ) {
      releaseCenteredRevealBack();
    }
  };

  const portraitVideoReadyToRelease = () => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return true;
    return smoothedVideoTime >= duration * 0.96;
  };

  const centeredRevealReadyToResume = () => (
    centeredTurnLocked || (centeredTurnProgress() >= 0.995 && portraitVideoReadyToRelease())
  );

  const centeredRevealReadyToExitBack = () => (
    centeredRevealActive
    && centeredRevealArmed
    && centeredRevealTarget <= CENTERED_REVEAL_MIN + 0.001
    && currentEnter <= CENTERED_REVEAL_MIN + 0.04
  );

  const shouldLetNaturalScrollResume = (delta = 0) => (
    centeredRevealActive
    && centeredRevealArmed
    && delta > 0
    && centeredRevealReadyToResume()
  );

  const refreshAboutReveal = () => {
    const leftSelectors = [
      ".about-left .section-kicker",
      ".about-heading",
      ".about-role",
    ];
    const rightSelectors = [
      ".about-right .about-lead",
      ".about-right .about-detail",
      ".about-skills-label",
      ".about-skills-list span",
    ];

    const collect = (selectors, side) => selectors.flatMap((selector) => (
      Array.from(section.querySelectorAll(selector)).map((node) => ({ node, side }))
    ));

    const nextUnits = [
      ...collect(leftSelectors, "left"),
      ...collect(rightSelectors, "right"),
    ];

    const sideCounts = nextUnits.reduce((counts, unit) => {
      counts[unit.side] += 1;
      return counts;
    }, { left: 0, right: 0 });

    const sideIndexes = { left: 0, right: 0 };
    aboutRevealUnits = nextUnits.map((unit) => {
      const index = sideIndexes[unit.side]++;
      const count = Math.max(1, sideCounts[unit.side]);
      const isBlockRole = unit.node.classList.contains("about-role");
      const isHeading = unit.node.classList.contains("about-heading");
      unit.node.classList.add("about-scroll-reveal-unit");
      unit.node.style.setProperty("--about-reveal-index", String(index));
      return {
        ...unit,
        index,
        count,
        canTransform: !isBlockRole && !isHeading,
      };
    });
  };

  const renderAboutReveal = () => {
    if (!aboutRevealUnits.length) return;

    if (window.LucianRuntime?.reducedMotion) {
      aboutRevealUnits.forEach(({ node }) => {
        node.style.opacity = "1";
        node.style.filter = "none";
        node.style.transform = "";
      });
      return;
    }

    const sceneProgress = clamp01(currentTextEnter * 1.16);
    const exitFade = clamp01(currentExit * 1.12);

    aboutRevealUnits.forEach(({ node, side, index, count, canTransform }) => {
      const order = count <= 1 ? 0 : index / (count - 1);
      const sideDelay = side === "right" ? 0.08 : 0;
      const delay = sideDelay + order * (side === "right" ? 0.42 : 0.34);
      const windowSize = side === "right" ? 0.34 : 0.3;
      const enter = smootherStep(clamp01((sceneProgress - delay) / windowSize));
      const visible = Math.max(0, enter * (1 - exitFade));
      const baseOpacity = side === "right" ? 0.025 : 0.018;
      const opacity = Math.max(0, baseOpacity + visible * (1 - baseOpacity) - exitFade * 0.62);
      const blur = (1 - visible) * (side === "right" ? 8 : 10) + exitFade * 5;
      const y = (1 - visible) * (side === "right" ? 14 : 20) - exitFade * 12;
      const rotate = (1 - visible) * (side === "right" ? 3 : -5);

      node.style.opacity = opacity.toFixed(3);
      node.style.filter = `blur(${blur.toFixed(2)}px)`;
      if (canTransform) {
        node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
      }
    });
  };

  let smoothedVideoTime = 0;
  let deferredSeekTime = null;
  const seekThreshold = () => Math.max(0.012, VIDEO_FRAME_DURATION * 0.45);
  const clampVideoTime = (time) => {
    const duration = effectiveVideoDuration();
    if (duration <= 0) return 0;
    return Math.max(0, Math.min(duration, time));
  };
  const commitVideoSeek = (time) => {
    if (!video) return;
    const nextTime = clampVideoTime(time);
    if (video.seeking) {
      deferredSeekTime = nextTime;
      return;
    }
    deferredSeekTime = null;
    video.currentTime = nextTime;
  };

  const scrubVideo = () => {
    scrubRaf = requestAnimationFrame(scrubVideo);
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    // Critically-damped chase — same easing model as the CSS variables.
    // No dead zone, no stepped jumps; the face turn reads as silk.
    smoothedVideoTime += (targetVideoTime - smoothedVideoTime) * 0.16;
    // Only seek by meaningful frame-sized deltas, and never stack seeks while
    // the decoder is still landing on the previous frame.
    if (Math.abs(smoothedVideoTime - video.currentTime) > seekThreshold()) {
      commitVideoSeek(smoothedVideoTime);
    }
  };

  const renderMotion = () => {
    if (centeredRevealActive) {
      if (!isCenteredRevealInRange()) {
        releaseCenteredReveal({ force: true });
        requestAnimationFrame(renderMotion);
        return;
      }
      targetTextEnter = 0;
      targetProgressValue = 0;
      targetExit = 0;
      if (Math.abs(window.scrollY - centeredRevealAnchorY) > 2) lockToCenteredAnchor();
      if (!centeredRevealArmed) {
        targetEnter = centeredRevealTarget > CENTERED_TURN_START
          ? centeredRevealProgress()
          : CENTERED_REVEAL_MIN;
        setPortraitVideoTarget(scrollTurnProgress);
      } else {
        syncCenteredPortrait();
      }
      if (centeredRevealArmed && centeredRevealTarget >= CENTERED_REVEAL_DONE && currentEnter >= 0.96 && centeredRevealReadyToResume()) {
        lockVideoToFinalFrame();
        releaseCenteredReveal();
      }
    }

    const enterEase = centeredRevealActive ? 0.17 : 0.22;
    currentEnter += (targetEnter - currentEnter) * enterEase;
    currentTextEnter += (targetTextEnter - currentTextEnter) * 0.11;
    currentProgressValue += (targetProgressValue - currentProgressValue) * 0.07;
    currentExit += (targetExit - currentExit) * 0.085;

    if (centeredRevealReadyToExitBack()) {
      releaseCenteredRevealBack();
    }

    section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
    section.style.setProperty("--portrait-text-enter", currentTextEnter.toFixed(4));
    section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
    section.style.setProperty("--portrait-exit", currentExit.toFixed(4));
    renderAboutReveal();

    requestAnimationFrame(renderMotion);
  };

  const update = () => {
    ticking = false;
    if (document.body.classList.contains("hero-about-handoff-active")) return;
    if (centeredRevealActive) {
      lockToCenteredAnchor();
      return;
    }

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.25 && rect.bottom > -window.innerHeight * 0.35) {
      ensurePortraitVideoLoaded();
    }
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    // progress: 0 = section just entered, 1 = section fully scrolled through
    const progress = clamp01(-rect.top / scrollable);

    if (!centeredRevealCompleted && !centeredRevealBackSuppressed && isCenteredRevealEntryGate()) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: CENTERED_REVEAL_MIN,
      });
      return;
    }

    if (centeredRevealBackSuppressed && rect.top > window.innerHeight * 0.52) {
      centeredRevealBackSuppressed = false;
    }

    if (progress > CENTERED_AUTO_COMPLETE_PROGRESS) {
      centeredRevealCompleted = true;
    }

    // The portrait reads from both the section timeline and the visual moment
    // where About enters the viewport. Copy still waits for section progress.
    const visualEnter = smootherStep(clamp01((window.innerHeight - rect.top) / (window.innerHeight * 0.62)));
    targetEnter = Math.max(portraitEnterFromProgress(progress), visualEnter);

    // Text reveal starts after the portrait has clearly appeared.
    targetTextEnter = smootherStep(clamp01((progress - 0.2) / 0.3));

    targetProgressValue = progress;

    // About now scrolls naturally into Services; keep the portrait and copy
    // present instead of fading them into a handoff ghost.
    targetExit = 0;

    const duration = effectiveVideoDuration();
    if (duration > 0) {
      if (centeredTurnLocked) {
        lockVideoToFinalFrame();
        return;
      }
      // Video scrub overlaps the portrait reveal tail so the face turn feels
      // connected instead of waiting for a separate later phase.
      const rawVideoProgress = clamp01((progress - 0.08) / 0.76);
      scrollTurnProgress = smootherStep(rawVideoProgress);
      setPortraitVideoTarget(scrollTurnProgress);
    }
  };

  if (video) {
    video.pause();
    const markVideoReady = () => {
      resetVideoToFirstFrame();
      section.classList.add("is-portrait-video-ready");
      update();
    };
    video.addEventListener("seeked", () => {
      if (deferredSeekTime === null || !Number.isFinite(deferredSeekTime)) return;
      const nextTime = deferredSeekTime;
      deferredSeekTime = null;
      if (Math.abs(nextTime - video.currentTime) > seekThreshold()) {
        commitVideoSeek(nextTime);
      }
    });
    video.addEventListener("loadedmetadata", () => {
      markVideoReady();
    }, { once: true });
    video.addEventListener("canplay", () => {
      section.classList.add("is-portrait-video-ready");
    }, { once: true });
    if (video.readyState >= 1) markVideoReady();
    scrubVideo();
  }

  if (video && video.dataset.src && "IntersectionObserver" in window) {
    const portraitVideoObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      ensurePortraitVideoLoaded();
      portraitVideoObserver.disconnect();
    }, { rootMargin: "85% 0px" });
    portraitVideoObserver.observe(section);
    window.addEventListener("pagehide", () => {
      portraitVideoObserver.disconnect();
    }, { once: true });
  }

  window.LucianAboutMotion = {
    startCenteredReveal: ({ anchorY = sectionTop(), initialEnter = 0.12 } = {}) => {
      ensurePortraitVideoLoaded();
      activateCenteredReveal({
        anchorY,
        enter: initialEnter,
      });
    },
    primeEntry: (progress = 0.08) => {
      ensurePortraitVideoLoaded();
      const entry = portraitEnterFromProgress(progress);
      targetEnter = Math.max(targetEnter, entry);
      targetProgressValue = Math.max(targetProgressValue, progress);
      currentEnter = Math.max(currentEnter, entry);
      currentProgressValue = Math.max(currentProgressValue, progress);
      section.style.setProperty("--portrait-enter", currentEnter.toFixed(4));
      section.style.setProperty("--portrait-progress", currentProgressValue.toFixed(4));
      renderAboutReveal();
    },
    refresh: () => {
      window.requestAnimationFrame(() => {
        refreshAboutReveal();
        update();
        renderAboutReveal();
      });
    },
  };

  window.LucianAboutScrollReveal = {
    refresh: () => {
      window.requestAnimationFrame(() => {
        refreshAboutReveal();
        renderAboutReveal();
      });
    },
  };

  refreshAboutReveal();
  renderMotion();

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 && centeredRevealBackSuppressed) {
      centeredRevealBackSuppressed = false;
    }
    if (
      !centeredRevealActive
      && !centeredRevealCompleted
      && !centeredRevealBackSuppressed
      && event.deltaY > 0
      && isCenteredRevealEntryGate()
    ) {
      activateCenteredReveal({
        anchorY: sectionTop(),
        enter: CENTERED_REVEAL_MIN,
      });
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!centeredRevealActive) return;
    if (shouldLetNaturalScrollResume(event.deltaY || 0)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(event.deltaY || 0, { source: "wheel" });
  }, { passive: false, capture: true });

  window.addEventListener("touchstart", (event) => {
    if (!centeredRevealActive) return;
    centeredTouchY = event.touches[0]?.clientY || 0;
  }, { passive: true, capture: true });

  window.addEventListener("touchmove", (event) => {
    if (!centeredRevealActive) return;
    const y = event.touches[0]?.clientY || centeredTouchY;
    const delta = centeredTouchY - y;
    centeredTouchY = y;
    if (shouldLetNaturalScrollResume(delta * 3.2)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(delta * 3.2, { source: "touch" });
  }, { passive: false, capture: true });

  window.addEventListener("keydown", (event) => {
    if (!centeredRevealActive || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
    const direction = ["ArrowUp", "PageUp", "Home"].includes(event.key) ? -1 : 1;
    if (shouldLetNaturalScrollResume(direction * 720)) {
      releaseCenteredReveal();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    advanceCenteredReveal(direction * 720, { source: "keyboard" });
  }, { capture: true });

  window.addEventListener("lucian:programmatic-section-jump", (event) => {
    if (event.detail?.targetId === "about") {
      settleProgrammaticAboutJump();
      window.requestAnimationFrame(settleProgrammaticAboutJump);
      return;
    }
    releaseCenteredReveal({ force: true });
  });

  update();
  window.addEventListener("pagehide", () => {
    if (scrubRaf) cancelAnimationFrame(scrubRaf);
    setCenteredRevealClass(false);
  }, { once: true });
})();



/* --- scripts/scroll-curtain-transitions.js --- */
(() => {
  const roots = Array.from(document.querySelectorAll(".scroll-curtain-transition"));
  const gsap = window.gsap;
  const MorphSVGPlugin = window.MorphSVGPlugin;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (!roots.length || reducedMotion) return;

  const parseNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const svgNamespace = "http://www.w3.org/2000/svg";
  const easeOutExpo = (value) => (value >= 1 ? 1 : 1 - Math.pow(2, -10 * value));
  const slowFastSoft = (() => {
    const x1 = 0.62;
    const y1 = 0;
    const x2 = 0.24;
    const y2 = 1;
    const sample = (a, b, value) => (
      3 * a * (1 - value) * (1 - value) * value
      + 3 * b * (1 - value) * value * value
      + value * value * value
    );

    return (progress) => {
      let lower = 0;
      let upper = 1;
      let t = progress;

      for (let index = 0; index < 8; index += 1) {
        t = (lower + upper) / 2;
        if (sample(x1, x2, t) < progress) lower = t;
        else upper = t;
      }

      return sample(y1, y2, t);
    };
  })();

  const makeSheetPath = (edgeY, centerY) => {
    const edge = edgeY.toFixed(2);
    const center = centerY.toFixed(2);
    return `M0 1024V${edge}C240 ${center} 480 ${center} 720 ${center}C960 ${center} 1200 ${center} 1440 ${edge}V1024H0Z`;
  };

  const createVisualSheet = (root, surface) => {
    const color = surface.style.getPropertyValue("--curtain-color").trim() || "#000";
    root.style.setProperty("--curtain-color", color);

    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "scroll-curtain-transition__visual");
    svg.setAttribute("viewBox", "0 0 1440 1024");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("class", "scroll-curtain-transition__visual-path");
    path.setAttribute("d", makeSheetPath(1024, 1024));
    svg.append(path);
    root.append(svg);
    root.classList.add("is-svg-driven");

    return { svg, path };
  };

  const configs = roots.map((root) => {
    const targetSelector = root.dataset.target || "";
    const sourceSelector = root.dataset.source || "";
    const settleTargetSelector = root.dataset.settleTarget || "";
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    const source = sourceSelector ? document.querySelector(sourceSelector) : null;
    const settleTarget = settleTargetSelector ? document.querySelector(settleTargetSelector) : null;
    const maskPath = root.querySelector(".scroll-curtain-transition__mask-path");
    const startShape = root.querySelector(".scroll-curtain-transition__shape-start");
    const endShape = root.querySelector(".scroll-curtain-transition__shape-end");
    const surface = root.querySelector(".scroll-curtain-transition__surface");
    const clipDriven = Boolean(root.dataset.curveEdge && root.dataset.curveCenter);
    const visual = clipDriven && surface ? createVisualSheet(root, surface) : null;

    return {
      root,
      surface,
      visualSvg: visual?.svg || null,
      visualPath: visual?.path || null,
      kind: root.dataset.kind || "curtain",
      source,
      target,
      maskPath,
      startShape,
      endShape,
      clipDriven,
      curveState: { amount: 0 },
      curveEdge: parseNumber(root.dataset.curveEdge, 150),
      curveCenter: parseNumber(root.dataset.curveCenter, 54),
      closedPath: maskPath?.getAttribute("d") || "",
      durationIn: parseNumber(root.dataset.durationIn, 0.7),
      durationOut: parseNumber(root.dataset.durationOut, 0.92),
      overlap: parseNumber(root.dataset.overlap, 0.56),
      trigger: parseNumber(root.dataset.trigger, 0.72),
      reset: parseNumber(root.dataset.reset, 1.05),
      backLimit: parseNumber(root.dataset.backLimit, -0.52),
      settleTarget,
      settleOffset: parseNumber(root.dataset.settleOffset, 0),
      settleDuration: parseNumber(root.dataset.settleDuration, 920),
      played: false,
      timeline: null,
      previews: [],
      lastTop: null,
    };
  }).filter((config) => (
    config.target
    && config.surface
    && config.maskPath
    && config.startShape
    && config.endShape
    && config.closedPath
  ));

  if (!configs.length) return;

  let supported = false;
  let ticking = false;
  let locked = false;
  let lockedY = 0;
  let settling = false;
  let settleFrame = 0;
  let targetLockY = null;

  const lockScroll = () => {
    if (locked) return;
    locked = true;
    lockedY = window.scrollY || window.pageYOffset || 0;
    targetLockY = null;
    document.documentElement.classList.add("scroll-curtain-locking");
    document.body.classList.add("scroll-curtain-locking");
  };

  const unlockScroll = ({ restore = true } = {}) => {
    document.documentElement.classList.remove("scroll-curtain-locking");
    document.body.classList.remove("scroll-curtain-locking");
    if (!locked) return;
    locked = false;
    targetLockY = null;
    if (restore) window.scrollTo(0, lockedY);
  };

  const getScrollTopFor = (target, offset = 0) => {
    const rect = target.getBoundingClientRect();
    return Math.max(0, Math.round((window.scrollY || window.pageYOffset || 0) + rect.top + offset));
  };

  const settleScroll = (config, onComplete) => {
    if (!config.settleTarget) {
      onComplete();
      return;
    }

    window.cancelAnimationFrame(settleFrame);
    settling = true;

    const startY = window.scrollY || window.pageYOffset || 0;
    const targetY = getScrollTopFor(config.settleTarget, config.settleOffset);
    targetLockY = targetY;
    const distance = targetY - startY;
    const duration = Math.max(120, config.settleDuration);
    const startedAt = performance.now();

    const renderSettle = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = easeOutExpo(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        settleFrame = window.requestAnimationFrame(renderSettle);
        return;
      }

      settling = false;
      window.scrollTo(0, targetY);
      onComplete();
    };

    settleFrame = window.requestAnimationFrame(renderSettle);
  };

  const reset = (config, { keepTop = false } = {}) => {
    config.timeline?.kill();
    config.timeline = null;
    config.maskPath.setAttribute("d", config.closedPath);
    config.curveState.amount = 0;
    if (config.visualPath) config.visualPath.setAttribute("d", makeSheetPath(1024, 1024));
    if (config.visualSvg && gsap) gsap.set(config.visualSvg, { clearProps: "transform" });
    config.previews.forEach((preview) => preview.remove());
    config.previews = [];
    config.root.classList.remove("is-active");
    if (!keepTop) config.lastTop = null;
  };

  const renderCurve = (config) => {
    if (!config.visualPath) return;

    const amount = Math.max(0, Math.min(1, config.curveState.amount));
    const edge = 1024 + (config.curveEdge - 1024) * amount;
    const center = 1024 + (config.curveCenter - 1024) * amount;
    config.visualPath.setAttribute("d", makeSheetPath(edge, center));
  };

  const preparePageClone = (element, { alignToViewport = false } = {}) => {
    const preview = document.createElement("div");
    preview.className = "scroll-curtain-transition__page-preview";
    preview.setAttribute("aria-hidden", "true");
    if ("inert" in preview) preview.inert = true;

    const clone = element.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add("is-visible");

    const sourceCanvases = Array.from(element.querySelectorAll("canvas"));
    clone.querySelectorAll("canvas").forEach((canvas, index) => {
      const sourceCanvas = sourceCanvases[index];
      if (!sourceCanvas) return;

      try {
        const image = new Image();
        image.className = canvas.className;
        image.alt = "";
        image.decoding = "async";
        image.src = sourceCanvas.toDataURL("image/png");
        image.style.cssText = canvas.style.cssText;
        image.setAttribute("aria-hidden", "true");
        canvas.replaceWith(image);
      } catch (error) {
        canvas.remove();
      }
    });

    clone.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    clone.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-revealed"));
    clone.querySelectorAll("video").forEach((video) => {
      video.pause?.();
      video.removeAttribute("autoplay");
    });
    clone.style.pointerEvents = "none";

    if (alignToViewport) {
      const rect = element.getBoundingClientRect();
      clone.style.transform = `translate3d(0, ${rect.top.toFixed(2)}px, 0)`;
    }

    preview.append(clone);
    return preview;
  };

  const playPageReveal = (config) => {
    const source = config.source || document.querySelector(".works-section");
    if (!source || !config.target) return false;

    const currentPreview = preparePageClone(source, { alignToViewport: true });
    const nextPreview = preparePageClone(config.target);
    nextPreview.classList.add("scroll-curtain-transition__page-preview--next");
    if (config.target.id === "contact") {
      nextPreview.classList.add("scroll-curtain-transition__page-preview--contact");
    }

    config.root.append(currentPreview, nextPreview);
    config.previews = [currentPreview, nextPreview];

    const contactRevealDelay = Math.max(0.56, config.durationOut * 0.86);
    const contactRevealHold = { progress: 0 };

    config.timeline
      .set(currentPreview, {
        y: 0,
        scale: 1,
        opacity: 1,
        force3D: true,
      }, 0)
      .set(nextPreview, {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 1,
        force3D: true,
      }, 0)
      .to(currentPreview, {
        y: "-30vh",
        scale: 0.8,
        opacity: 0.4,
        duration: config.durationIn,
        ease: slowFastSoft,
        force3D: true,
      }, 0)
      .to(nextPreview, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: config.durationOut,
        ease: slowFastSoft,
        force3D: true,
      }, 0)
      .call(() => {
        nextPreview.classList.add("is-copy-visible");
      }, null, contactRevealDelay)
      .to(contactRevealHold, {
        progress: 1,
        duration: 1.06,
        ease: "none",
      }, contactRevealDelay);

    return true;
  };

  const resetAll = ({ restore = true } = {}) => {
    configs.forEach((config) => {
      config.played = false;
      reset(config);
    });
    document.body.classList.remove("scroll-curtain-active");
    window.cancelAnimationFrame(settleFrame);
    settling = false;
    unlockScroll({ restore });
  };

  const play = (config) => {
    if (!supported || config.timeline || locked) return false;

    reset(config);
    lockScroll();
    config.root.classList.add("is-active");
    document.body.classList.add("scroll-curtain-active");

    const settleAt = config.settleTarget
      ? Math.max(0.24, config.overlap + 0.1)
      : null;

    config.timeline = gsap.timeline({
      defaults: { overwrite: true },
      onComplete: () => {
        config.timeline = null;
        config.previews.forEach((preview) => preview.remove());
        config.previews = [];
        config.root.classList.remove("is-active");

        if (!configs.some((item) => item.root.classList.contains("is-active"))) {
          document.body.classList.remove("scroll-curtain-active");
        }
        if (!config.settleTarget) {
          unlockScroll({ restore: false });
        }
        requestUpdate();
      },
    });

    if (config.kind === "page-reveal" && playPageReveal(config)) {
      // Codrops-style page handoff: old view recedes while the next view
      // reveals upward through clip-path.
    } else if (config.clipDriven) {
      config.timeline
        .set(config.visualSvg, { yPercent: 0 }, 0)
        .to(config.curveState, {
          amount: 1,
          duration: config.durationIn,
          ease: slowFastSoft,
          onUpdate: () => renderCurve(config),
        }, 0)
        .to(config.visualSvg, {
          duration: config.durationOut,
          yPercent: -108,
          ease: slowFastSoft,
        }, config.overlap + 0.26);
    } else {
      config.timeline
        .set(config.surface, {
          yPercent: 108,
          borderTopLeftRadius: "48%",
          borderTopRightRadius: "48%",
        }, 0)
        .to(config.maskPath, {
          duration: config.durationIn,
          morphSVG: config.startShape,
          ease: slowFastSoft,
        }, 0)
        .to(config.surface, {
          duration: config.durationIn + 0.18,
          yPercent: 0,
          borderTopLeftRadius: "20%",
          borderTopRightRadius: "20%",
          ease: slowFastSoft,
        }, 0)
        .to(config.maskPath, {
          duration: config.durationOut,
          morphSVG: config.endShape,
          ease: slowFastSoft,
        }, config.overlap)
        .to(config.surface, {
          duration: config.durationOut,
          yPercent: -108,
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          ease: slowFastSoft,
        }, config.overlap + 0.26);
    }

    if (config.settleTarget) {
      config.timeline.call(() => {
        settleScroll(config, () => {
          unlockScroll({ restore: false });
          requestUpdate();
        });
      }, null, settleAt);
    }

    return true;
  };

  const update = () => {
    ticking = false;
    if (!document.body.classList.contains("has-entered") || settling) return;

    const vh = window.innerHeight || document.documentElement.clientHeight || 1;

    configs.forEach((config) => {
      const rect = config.target.getBoundingClientRect();
      const previousTop = config.lastTop;
      const triggerY = vh * config.trigger;
      const backY = vh * config.backLimit;
      const enteredWindow = rect.top < triggerY && rect.top > backY;
      const crossedWindow = previousTop !== null
        && previousTop >= triggerY
        && rect.top <= triggerY
        && rect.top > -vh * 1.35;
      config.lastTop = rect.top;

      if (!config.played && (enteredWindow || crossedWindow)) {
        if (play(config)) config.played = true;
        return;
      }

      if (rect.top > vh * config.reset) {
        config.played = false;
        reset(config, { keepTop: true });
      }
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const handleProgrammaticSectionJump = (event) => {
    const targetId = event.detail?.targetId;
    if (!targetId) return;
    resetAll({ restore: false });

    configs.forEach((config) => {
      if (config.target?.id !== targetId) return;
      config.played = true;
      reset(config);
    });
  };

  const keepScrollLocked = (event) => {
    if (!locked) return;
    event.preventDefault();
    if (!settling) window.scrollTo(0, targetLockY ?? lockedY);
  };

  try {
    supported = Boolean(gsap);
    if (!supported) {
      roots.forEach((root) => root.classList.remove("is-active"));
      return;
    }

    if (MorphSVGPlugin) gsap.registerPlugin(MorphSVGPlugin);
    resetAll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("wheel", keepScrollLocked, { passive: false, capture: true });
    window.addEventListener("touchmove", keepScrollLocked, { passive: false, capture: true });
    window.addEventListener("lucian:return-to-entry", resetAll);
    window.addEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);
    requestUpdate();
  } catch (error) {
    supported = false;
    resetAll();
    console.warn("[scroll-curtain-transitions] Disabled:", error.message);
  }
})();


/* --- scripts/entry-key-model.js --- */
(() => {
  const entryScreen = document.querySelector("#entry-screen");
  if (!entryScreen) return;

  const marqueeTrack = document.getElementById("entry-year-marquee-track");
  const progressEl = document.getElementById("entry-progress");
  const progressFill = document.getElementById("entry-progress-fill");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const marqueeDuration = Math.max(0, Number.parseInt(marqueeTrack?.dataset.marqueeMs || "3000", 10));
  const entryDelay = Math.max(600, Number.parseInt(entryScreen.dataset.autoEnterDelay || "2400", 10));
  const marqueeResolvers = [];

  let disposed = false;
  let entryReadyDispatched = false;
  let entryMarqueeComplete = !marqueeTrack || reducedMotion;
  let entryMarqueeTimer = 0;
  let progressRaf = 0;
  let progressRun = 0;

  const setProgress = (pct) => {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressEl) progressEl.textContent = `[${clamped}%]`;
    if (progressFill) progressFill.style.width = `${clamped}%`;
  };

  const completeEntryMarquee = () => {
    if (entryMarqueeComplete) return;
    entryMarqueeComplete = true;
    window.clearTimeout(entryMarqueeTimer);
    document.body.classList.add("entry-marquee-complete");
    while (marqueeResolvers.length) marqueeResolvers.shift()?.();
  };

  const waitForEntryMarquee = () => (
    entryMarqueeComplete
      ? Promise.resolve()
      : new Promise((resolve) => marqueeResolvers.push(resolve))
  );

  const resetEntryMarquee = () => {
    window.clearTimeout(entryMarqueeTimer);
    if (!marqueeTrack || reducedMotion) {
      entryMarqueeComplete = true;
      document.body.classList.add("entry-marquee-complete");
      return;
    }

    entryMarqueeComplete = false;
    document.body.classList.remove("entry-marquee-complete");
    marqueeTrack.classList.remove("is-running");
    void marqueeTrack.offsetWidth;
    marqueeTrack.classList.add("is-running");
    entryMarqueeTimer = window.setTimeout(completeEntryMarquee, marqueeDuration + 360);
  };

  const signalEntryReady = () => {
    if (entryReadyDispatched) return;
    entryReadyDispatched = true;
    waitForEntryMarquee().then(() => {
      if (disposed) return;
      document.body.classList.add("entry-key-ready");
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("entry-key-ready"));
      });
    });
  };

  const cancelProgress = () => {
    progressRun += 1;
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = 0;
  };

  const playProgress = () => {
    if (disposed) return;
    cancelProgress();
    entryReadyDispatched = false;
    document.body.classList.remove("entry-key-ready");
    setProgress(0);
    resetEntryMarquee();

    const run = ++progressRun;
    const startedAt = performance.now();

    const tick = () => {
      if (disposed || run !== progressRun) return;
      if (document.body.classList.contains("has-entered")) {
        progressRaf = 0;
        return;
      }

      const pct = ((performance.now() - startedAt) / entryDelay) * 100;
      setProgress(pct);

      if (pct < 100) {
        progressRaf = requestAnimationFrame(tick);
        return;
      }

      progressRaf = 0;
      signalEntryReady();
    };

    progressRaf = requestAnimationFrame(tick);

    // Fallback: RAF can be paused in background tabs. Fire signalEntryReady
    // via setTimeout so the entry always completes even if the user opens the
    // page while the tab is not in the foreground.
    window.setTimeout(() => {
      if (disposed || run !== progressRun) return;
      setProgress(100);
      signalEntryReady();
    }, entryDelay + marqueeDuration + 500);
  };

  marqueeTrack?.addEventListener("animationend", completeEntryMarquee);

  window.LucianEntryKey = {
    replay: playProgress,
    reset: playProgress,
    unlock() {
      setProgress(100);
      completeEntryMarquee();
    },
    isReady() {
      return true;
    },
  };

  playProgress();

  window.addEventListener("pagehide", () => {
    disposed = true;
    cancelProgress();
    window.clearTimeout(entryMarqueeTimer);
  }, { once: true });
})();

/* --- scripts/entry-hero-experience.js --- */
(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const {
    playUiTone,
    startBackgroundMusic,
    forceScrollTop,
    resetHeroSequenceState,
    resizeStage,
  } = runtime;

  const entryScreen = document.querySelector("#entry-screen");
  const heroStage = document.querySelector(".hero-stage");
  const heroSection = document.querySelector(".hero-section");
  const aboutSection = document.querySelector(".portrait-about-wrapper");
  const reducedMotion = runtime.reducedMotion
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ENTRY_UNFOLD_MS = 940;
  const ENTRY_CURTAIN_PREPAINT_MS = 160;
  const ENTRY_CURTAIN_MS = 2000;
  const ENTRY_CURTAIN_HOLD_MS = 180;

  const HERO_HANDOFF_RESET = 0.02;
  const HERO_HANDOFF_MS = 1450;
  const HERO_HANDOFF_RELEASE_MS = 180;
  const HERO_RETURN_TRIGGER = 1.5;
  const HERO_RETURN_MS = 1450;
  const HERO_INPUT_DIRECTION_HOLD_MS = 1400;
  const DEEP_LINK_TARGETS = new Set(["about", "services", "works", "contact"]);

  let entryTransitionLocked = false;
  let entryTransitionReleaseTimer = 0;
  let siteEnteredDispatched = false;
  let entryScrollTouchY = 0;

  let heroCurtainRaised = false;
  let heroHandoffActive = false;
  let heroHandoffComplete = false;
  let heroHandoffReturning = false;
  let heroForwardHandoffLocked = false;
  let heroHandoffTimer = 0;
  let heroHandoffReleaseTimer = 0;
  let heroHandoffReturnTimer = 0;
  let heroHandoffSettleRaf = 0;
  let heroHandoffSettleUntil = 0;
  let heroReturnTopRaf = 0;
  let heroReturnTopUntil = 0;
  let heroInstantTopReleaseTimer = 0;
  let heroWasReadyForHandoff = false;
  let heroInputDirection = 1;
  let heroInputDirectionUntil = 0;
  let heroTouchY = 0;
  let postEntryGuardUntil = 0;
  let postEntryGuardTimer = 0;
  let settleGuardUntil = 0;
  let settleTargetY = 0;
  let postForwardReturnGuardUntil = 0;

  const readInitialDeepLinkTarget = () => {
    const id = (window.location.hash || "").slice(1).split("?")[0];
    return DEEP_LINK_TARGETS.has(id) ? id : "";
  };

  const initialDeepLinkTarget = readInitialDeepLinkTarget();

  const setClass = (target, className, active) => {
    target.classList.toggle(className, active);
  };

  const dispatchSiteEntered = () => {
    if (siteEnteredDispatched || !document.body.classList.contains("has-entered")) return;
    siteEnteredDispatched = true;
    window.dispatchEvent(new CustomEvent("lucian:site-entered"));
  };

  const lockEntryTransitionScroll = (locked) => {
    entryTransitionLocked = locked;
    setClass(document.body, "is-entry-scroll-locked", locked);
    window.clearTimeout(entryTransitionReleaseTimer);
    if (locked) forceScrollTop();
  };

  const releaseEntryTransitionScroll = () => {
    lockEntryTransitionScroll(false);
    forceScrollTop();
    window.requestAnimationFrame(dispatchSiteEntered);
  };

  const scheduleEntryTransitionRelease = (delay = 260) => {
    window.clearTimeout(entryTransitionReleaseTimer);
    if (!document.body.classList.contains("has-entered")) return;
    entryTransitionReleaseTimer = window.setTimeout(releaseEntryTransitionScroll, delay);
  };

  const completeEntryTransition = () => {
    document.body.classList.remove("is-entering");
    document.body.classList.add("has-entered");
    forceScrollTop();
    requestAnimationFrame(() => {
      forceScrollTop();
      resizeStage();
      resetHeroSequenceState({ resetScroll: false });
      scheduleEntryTransitionRelease(420);
    });
  };

  const quickEnterFromDeepLink = () => {
    if (!initialDeepLinkTarget || runtime.isEntered()) return false;

    runtime.setEntered(true);
    entryTransitionLocked = false;
    window.clearTimeout(entryTransitionReleaseTimer);
    document.body.classList.remove(
      "is-entering",
      "is-unfolding",
      "is-entry-curtain-ready",
      "is-entry-scroll-locked",
      "is-entry-replaying"
    );
    document.body.classList.add("has-entered", "is-deep-link-entry");
    entryScreen?.style.removeProperty("display");
    runtime.setCursorVisible(false);

    requestAnimationFrame(() => {
      resizeStage();
      resetHeroSequenceState({ resetScroll: false });
      dispatchSiteEntered();
      window.LucianSectionFlow?.jumpToSection?.(initialDeepLinkTarget, {
        updateHash: false,
        source: "initial-hash",
      });
      window.setTimeout(() => {
        document.body.classList.remove("is-deep-link-entry");
      }, 520);
    });

    return true;
  };

  const enterSite = () => {
    if (runtime.isEntered()) return;
    if (quickEnterFromDeepLink()) return;

    resetHeroSequenceState({ resetScroll: true });
    runtime.setEntered(true);
    lockEntryTransitionScroll(true);
    window.LucianEntryKey?.unlock?.();
    if (runtime.playUnlockTone) runtime.playUnlockTone({ delayMs: 520 }).catch(() => false);
    else playUiTone("click");
    startBackgroundMusic?.({ fade: true });

    if (reducedMotion) {
      document.body.classList.add("has-entered");
      requestAnimationFrame(() => {
        forceScrollTop();
        resizeStage();
        resetHeroSequenceState({ resetScroll: false });
        releaseEntryTransitionScroll();
      });
      return;
    }

    runtime.setCursorVisible(false);
    document.body.classList.add("is-unfolding");

    window.setTimeout(() => {
      document.body.classList.remove("is-unfolding");
      document.body.classList.add("is-entry-curtain-ready");

      window.setTimeout(() => {
        document.body.classList.remove("is-entry-curtain-ready");
        document.body.classList.add("is-entering");
        window.setTimeout(completeEntryTransition, ENTRY_CURTAIN_MS + ENTRY_CURTAIN_HOLD_MS);
      }, ENTRY_CURTAIN_PREPAINT_MS);
    }, ENTRY_UNFOLD_MS);
  };


  const setHandoffClass = (active) => {
    setClass(document.documentElement, "hero-about-handoff-active", active);
    setClass(document.body, "hero-about-handoff-active", active);
  };

  const setSettledClass = (settled) => {
    setClass(document.documentElement, "hero-about-handoff-settled", settled);
    setClass(document.body, "hero-about-handoff-settled", settled);
  };

  const setReleaseClass = (releasing) => {
    setClass(document.documentElement, "hero-about-handoff-releasing", releasing);
    setClass(document.body, "hero-about-handoff-releasing", releasing);
  };

  const setReturningClass = (returning) => {
    setClass(document.documentElement, "hero-about-handoff-returning", returning);
    setClass(document.body, "hero-about-handoff-returning", returning);
  };

  const readHeroPast = () => {
    if (!heroSection) return 0;
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return (-rect.top) / vh;
  };

  const currentScrollY = () => window.scrollY || window.pageYOffset || 0;

  const isHeroHandoffZone = () => {
    if (!heroSection) return false;
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.08 && rect.bottom > vh * 0.35;
  };

  const stableAboutEntryTop = () => {
    if (!aboutSection) return 0;
    const offsetTop = Math.round(aboutSection.offsetTop || 0);
    if (offsetTop > 2) return offsetTop;

    if (heroSection) {
      const heroBottom = Math.round((heroSection.offsetTop || 0) + (heroSection.offsetHeight || 0));
      if (heroBottom > 2) return heroBottom;
    }

    return 0;
  };

  const targetAboutEntryTop = () => {
    if (!aboutSection) return 0;
    const currentY = currentScrollY();
    const rect = aboutSection.getBoundingClientRect();
    const measuredTop = Math.max(0, Math.round(currentY + rect.top));
    if (measuredTop > 2) return measuredTop;

    const stableTop = stableAboutEntryTop();
    if (stableTop > 2) return stableTop;

    const vhFallback = Math.round((window.innerHeight || 1) * 1.32);
    return Math.max(measuredTop, vhFallback);
  };

  const isBlockedByProgrammaticTransition = () => (
    document.body.classList.contains("nav-transition-active")
    || document.body.classList.contains("scroll-curtain-active")
    || document.body.classList.contains("about-services-handoff-active")
    || document.body.classList.contains("section-hash-jump-pending")
    || document.body.classList.contains("work-gallery-open")
  );

  const isHeroReadyForHandoff = () => (
    document.body.classList.contains("has-entered")
    && !document.body.classList.contains("is-entering")
    && !document.body.classList.contains("is-unfolding")
    && !document.body.classList.contains("is-entry-scroll-locked")
  );

  const startPostEntryGuard = () => {
    window.clearTimeout(postEntryGuardTimer);
    postEntryGuardUntil = performance.now() + 820;
    postEntryGuardTimer = window.setTimeout(() => {
      postEntryGuardTimer = 0;
      updateHeroAboutHandoff();
    }, 840);
  };

  const isPostEntryGuardActive = () => performance.now() < postEntryGuardUntil;
  const isSettleGuardActive = () => performance.now() < settleGuardUntil;

  const rememberHeroInputDirection = (direction) => {
    if (!Number.isFinite(direction) || Math.abs(direction) < 4) return;
    heroInputDirection = direction > 0 ? 1 : -1;
    heroInputDirectionUntil = performance.now() + HERO_INPUT_DIRECTION_HOLD_MS;
  };

  const isHeroInputScrollingUp = () => (
    performance.now() < heroInputDirectionUntil
    && heroInputDirection < 0
  );

  const rememberHeroWheelDirection = (event) => {
    rememberHeroInputDirection(event.deltaY);
  };

  const rememberHeroTouchStart = (event) => {
    heroTouchY = event.touches[0]?.clientY || heroTouchY;
  };

  const rememberHeroTouchDirection = (event) => {
    const y = event.touches[0]?.clientY || heroTouchY;
    const delta = heroTouchY - y;
    heroTouchY = y;
    rememberHeroInputDirection(delta);
  };

  const rememberHeroKeyDirection = (event) => {
    if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
      rememberHeroInputDirection(-1);
    } else if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
      rememberHeroInputDirection(1);
    }
  };

  const releaseSettleGuardForForwardInput = () => {
    const hasRecentInput = performance.now() < heroInputDirectionUntil;
    if (
      !heroHandoffComplete
      || !isSettleGuardActive()
      || performance.now() < postForwardReturnGuardUntil
      || !hasRecentInput
      || isHeroInputScrollingUp()
    ) return false;
    settleGuardUntil = 0;
    stopAboutEntrySettleLock();
    return true;
  };

  const shouldStartHeroHandoffFromInput = (direction = 1) => (
    direction > 0
    && !heroCurtainRaised
    && !heroHandoffActive
    && !heroHandoffComplete
    && !heroHandoffReturning
    && isHeroReadyForHandoff()
    && isHeroHandoffZone()
    && !isBlockedByProgrammaticTransition()
  );

  const heroReturnIntentThreshold = () => {
    const vh = window.innerHeight || 1;
    return Math.max(28, Math.min(96, vh * 0.06));
  };

  const hasScrolledAboveAboutEntryBy = (threshold) => {
    const aboutEntryY = stableAboutEntryTop();
    return Boolean(
      aboutEntryY > 2
      && performance.now() > postForwardReturnGuardUntil
      && currentScrollY() < aboutEntryY - threshold
    );
  };

  const hasHeroReturnIntentDrift = () => (
    hasScrolledAboveAboutEntryBy(heroReturnIntentThreshold())
  );

  const shouldStartHeroReturnFromInput = (direction = -1) => (
    direction < 0
    && heroHandoffComplete
    && !heroHandoffActive
    && !heroHandoffReturning
    && isHeroReadyForHandoff()
    && hasHeroReturnIntentDrift()
    && readHeroPast() < HERO_RETURN_TRIGGER
    && !isBlockedByProgrammaticTransition()
  );

  const lockHeroInstantTop = () => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.add("nav-jump-instant");
    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
  };

  const unlockHeroInstantTop = () => {
    const root = document.documentElement;
    const body = document.body;
    root.style.removeProperty("scroll-behavior");
    body.style.removeProperty("scroll-behavior");
    root.classList.remove("nav-jump-instant");
  };

  const settleHeroStart = ({ holdMs = 120 } = {}) => {
    window.clearTimeout(heroInstantTopReleaseTimer);
    lockHeroInstantTop();
    forceScrollTop();

    requestAnimationFrame(() => {
      forceScrollTop();
      requestAnimationFrame(() => {
        forceScrollTop();
      });
    });

    heroInstantTopReleaseTimer = window.setTimeout(() => {
      unlockHeroInstantTop();
    }, holdMs);
  };

  const settleAboutEntry = () => {
    if (!settleTargetY) return;
    window.scrollTo({ top: settleTargetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = settleTargetY;
    document.body.scrollTop = settleTargetY;
  };

  const stopAboutEntrySettleLock = () => {
    if (heroHandoffSettleRaf) cancelAnimationFrame(heroHandoffSettleRaf);
    heroHandoffSettleRaf = 0;
    heroHandoffSettleUntil = 0;
    if (heroHandoffComplete && !heroHandoffReturning) {
      settleTargetY = Math.round(window.scrollY || window.pageYOffset || settleTargetY || 0);
    }
  };

  const stopHeroReturnTopLock = ({ unlock = true } = {}) => {
    if (heroReturnTopRaf) cancelAnimationFrame(heroReturnTopRaf);
    heroReturnTopRaf = 0;
    heroReturnTopUntil = 0;
    if (unlock) {
      window.clearTimeout(heroInstantTopReleaseTimer);
      unlockHeroInstantTop();
    }
  };

  const startAboutEntrySettleLock = (duration = HERO_HANDOFF_RELEASE_MS + 520) => {
    stopAboutEntrySettleLock();
    heroHandoffSettleUntil = performance.now() + duration;

    const keepSettled = () => {
      settleAboutEntry();
      if (performance.now() >= heroHandoffSettleUntil) {
        stopAboutEntrySettleLock();
        return;
      }
      heroHandoffSettleRaf = requestAnimationFrame(keepSettled);
    };

    keepSettled();
  };

  const startHeroReturnTopLock = (duration = HERO_RETURN_MS + 620) => {
    stopHeroReturnTopLock({ unlock: false });
    window.clearTimeout(heroInstantTopReleaseTimer);
    lockHeroInstantTop();
    heroReturnTopUntil = performance.now() + duration;

    const keepAtTop = () => {
      forceScrollTop();
      if (performance.now() >= heroReturnTopUntil) {
        stopHeroReturnTopLock();
        return;
      }
      heroReturnTopRaf = requestAnimationFrame(keepAtTop);
    };

    keepAtTop();
  };

  const syncHeroReadyState = () => {
    const ready = isHeroReadyForHandoff();
    if (ready && !heroWasReadyForHandoff) startPostEntryGuard();
    heroWasReadyForHandoff = ready;
    return ready;
  };

  const finishHeroAboutHandoff = () => {
    const targetY = settleTargetY || targetAboutEntryTop();
    settleTargetY = targetY;
    setReleaseClass(true);
    settleGuardUntil = performance.now() + HERO_HANDOFF_RELEASE_MS + 360;
    lockHeroInstantTop();
    window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = targetY;
    document.body.scrollTop = targetY;
    startAboutEntrySettleLock();

    let releaseCompleted = false;
    let aboutEntryPrimed = false;
    const primeAboutEntry = () => {
      if (aboutEntryPrimed) return;
      aboutEntryPrimed = true;
      if (window.LucianAboutMotion?.startCenteredReveal) {
        window.LucianAboutMotion.startCenteredReveal({
          anchorY: settleTargetY || targetY,
          initialEnter: 0.12,
        });
      } else {
        window.LucianAboutMotion?.primeEntry?.(0.04);
      }
    };

    const completeRelease = () => {
      if (releaseCompleted) return;
      releaseCompleted = true;
      window.clearTimeout(heroHandoffReleaseTimer);
      stopHeroReturnTopLock();
      window.clearTimeout(heroInstantTopReleaseTimer);
      lockHeroInstantTop();
      const safeTargetY = targetY > 2
        ? targetY
        : Math.round((window.innerHeight || 1) * 1.32);
      settleTargetY = safeTargetY;
      window.scrollTo({ top: safeTargetY, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = safeTargetY;
      document.body.scrollTop = safeTargetY;
      settleAboutEntry();
      heroStage?.classList.remove("is-curtain-down");
      setHandoffClass(false);
      setSettledClass(true);
      heroHandoffActive = false;
      heroHandoffComplete = true;
      heroForwardHandoffLocked = false;
      postForwardReturnGuardUntil = performance.now() + HERO_HANDOFF_RELEASE_MS + 900;
      setReleaseClass(false);
      window.requestAnimationFrame(primeAboutEntry);
      heroInstantTopReleaseTimer = window.setTimeout(() => {
        unlockHeroInstantTop();
      }, HERO_HANDOFF_RELEASE_MS + 620);
      window.dispatchEvent(new CustomEvent("lucian:hero-about-handoff", {
        detail: { complete: true, targetY: safeTargetY },
      }));
    };

    if (reducedMotion) {
      primeAboutEntry();
      completeRelease();
      return;
    }

    window.clearTimeout(heroHandoffReleaseTimer);
    heroHandoffReleaseTimer = window.setTimeout(completeRelease, HERO_HANDOFF_RELEASE_MS + 480);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.clearTimeout(heroHandoffReleaseTimer);
        heroHandoffReleaseTimer = window.setTimeout(completeRelease, HERO_HANDOFF_RELEASE_MS);
      });
    });
  };

  const startHeroAboutHandoff = () => {
    if (
      !heroStage
      || heroHandoffActive
      || heroHandoffComplete
      || heroHandoffReturning
      || isBlockedByProgrammaticTransition()
    ) return;
    heroHandoffActive = true;
    heroCurtainRaised = true;
    heroForwardHandoffLocked = true;
    settleTargetY = targetAboutEntryTop();
    setHandoffClass(true);
    setSettledClass(false);
    setReleaseClass(false);
    heroStage.classList.add("is-curtain-down");
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReleaseTimer);

    if (reducedMotion) {
      finishHeroAboutHandoff();
      return;
    }

    heroHandoffTimer = window.setTimeout(finishHeroAboutHandoff, HERO_HANDOFF_MS);
  };

  function resetHeroAboutHandoff({ force = false } = {}) {
    if (!force && heroForwardHandoffLocked) return;
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReturnTimer);
    heroForwardHandoffLocked = false;
    heroHandoffActive = false;
    heroHandoffComplete = false;
    heroHandoffReturning = false;
    heroCurtainRaised = false;
    settleGuardUntil = 0;
    settleTargetY = 0;
    postForwardReturnGuardUntil = 0;
    window.clearTimeout(heroHandoffReleaseTimer);
    stopAboutEntrySettleLock();
    stopHeroReturnTopLock();
    setHandoffClass(false);
    setReleaseClass(false);
    setReturningClass(false);
    setSettledClass(false);
    heroStage?.classList.remove("is-curtain-down");
  }

  const finishHeroAboutReturn = () => {
    settleHeroStart();
    heroHandoffReturning = false;
    heroHandoffComplete = false;
    heroCurtainRaised = false;
    postForwardReturnGuardUntil = 0;
    setReturningClass(false);
    setHandoffClass(false);
    setReleaseClass(false);
    setSettledClass(false);
    heroStage?.classList.remove("is-curtain-down");
    startHeroReturnTopLock(760);
    updateHeroAboutHandoff();
  };

  const startHeroAboutReturn = () => {
    if (heroHandoffActive || heroHandoffReturning || isBlockedByProgrammaticTransition()) return;
    const heroCurtain = heroStage?.querySelector(".hero-curtain");
    heroHandoffReturning = true;
    heroCurtainRaised = true;
    setHandoffClass(true);
    setReturningClass(true);
    if (heroCurtain) {
      heroCurtain.style.transition = "none";
      heroCurtain.style.transform = "translate3d(0, 0, 0)";
      heroCurtain.getBoundingClientRect();
    }
    heroStage?.classList.add("is-curtain-down");
    window.clearTimeout(heroHandoffReturnTimer);
    window.clearTimeout(heroHandoffReleaseTimer);
    startHeroReturnTopLock();

    if (reducedMotion) {
      heroCurtain?.style.removeProperty("transition");
      heroCurtain?.style.removeProperty("transform");
      finishHeroAboutReturn();
      return;
    }

    requestAnimationFrame(() => {
      setSettledClass(false);
      requestAnimationFrame(() => {
        heroHandoffReleaseTimer = window.setTimeout(() => {
          heroCurtain?.style.removeProperty("transition");
          heroCurtain?.style.removeProperty("transform");
          heroStage?.classList.remove("is-curtain-down");
          heroHandoffReturnTimer = window.setTimeout(finishHeroAboutReturn, HERO_RETURN_MS);
        }, HERO_HANDOFF_RELEASE_MS);
      });
    });
  };

  const updateHeroAboutHandoff = () => {
    if (!heroStage || !heroSection || !aboutSection || !syncHeroReadyState()) return;
    if (isSettleGuardActive()) {
      if (releaseSettleGuardForForwardInput()) {
        return;
      }
      if (Math.abs(window.scrollY - settleTargetY) > 2) settleAboutEntry();
      return;
    }
    if (isBlockedByProgrammaticTransition() && !heroHandoffActive && !heroHandoffReturning) return;
    const past = readHeroPast();

    if (isPostEntryGuardActive()) {
      if (!heroCurtainRaised && past > HERO_HANDOFF_RESET) settleHeroStart();
      return;
    }

    if (reducedMotion) {
      if (!heroHandoffActive && heroHandoffComplete && past < HERO_HANDOFF_RESET) resetHeroAboutHandoff();
      return;
    }

    const scrollingUp = isHeroInputScrollingUp();
    const aboutRevealActive = document.body.classList.contains("about-centered-reveal-active");
    const hasReturnIntentDrift = hasHeroReturnIntentDrift();
    if (
      heroHandoffComplete
      && !heroHandoffReturning
      && scrollingUp
      && !aboutRevealActive
      && hasReturnIntentDrift
      && past < HERO_RETURN_TRIGGER
    ) {
      startHeroAboutReturn();
      return;
    }

    const canStartHandoff = isHeroHandoffZone() && !scrollingUp;
    if (!heroCurtainRaised && !heroHandoffComplete && !heroHandoffActive && canStartHandoff && past > HERO_HANDOFF_RESET) {
      settleHeroStart();
    } else if (!canStartHandoff && !heroHandoffActive && !heroHandoffReturning) {
      setHandoffClass(false);
    } else if (!heroHandoffActive && heroHandoffComplete && settleTargetY > 2 && past < HERO_HANDOFF_RESET) {
      settleAboutEntry();
    } else if (!heroHandoffActive && heroHandoffComplete && past < HERO_HANDOFF_RESET) {
      resetHeroAboutHandoff();
    }
  };

  let heroHandoffTicking = false;
  const onHeroScroll = () => {
    if (heroHandoffTicking) return;
    heroHandoffTicking = true;
    requestAnimationFrame(() => {
      updateHeroAboutHandoff();
      heroHandoffTicking = false;
    });
  };

  const handleProgrammaticSectionJump = (event) => {
    if (event.detail?.targetId !== "hero") return;
    resetHeroAboutHandoff({ force: true });
    settleHeroStart({ holdMs: 900 });
  };

  const blockEntryScroll = (event) => {
    if (!entryTransitionLocked) return;
    event.preventDefault();
    forceScrollTop();
    scheduleEntryTransitionRelease(260);
  };

  const blockInputDuringHeroHandoff = (event) => {
    const direction = event.type === "wheel"
      ? event.deltaY
      : heroInputDirection;
    if (shouldStartHeroHandoffFromInput(direction)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      startHeroAboutHandoff();
      return;
    }
    if (shouldStartHeroReturnFromInput(direction)) {
      event.preventDefault();
      event.stopPropagation();
      startHeroAboutReturn();
      return;
    }
    if (isPostEntryGuardActive() && isHeroReadyForHandoff()) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      return;
    }
    if (!heroHandoffActive && !heroHandoffReturning && !isSettleGuardActive()) return;
    if (releaseSettleGuardForForwardInput()) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
    else if (!heroHandoffActive) requestAnimationFrame(settleHeroStart);
  };

  const blockKeysDuringHeroHandoff = (event) => {
    const blockedKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if (shouldStartHeroHandoffFromInput(["ArrowDown", "PageDown", "End", " "].includes(event.key) ? 1 : -1)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      startHeroAboutHandoff();
      return;
    }
    if (shouldStartHeroReturnFromInput(["ArrowUp", "PageUp", "Home"].includes(event.key) ? -1 : 1)) {
      event.preventDefault();
      event.stopPropagation();
      startHeroAboutReturn();
      return;
    }
    if (isPostEntryGuardActive() && isHeroReadyForHandoff() && blockedKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      settleHeroStart();
      return;
    }
    if (
      (!heroHandoffActive && !heroHandoffReturning && !isSettleGuardActive())
      || !blockedKeys.includes(event.key)
    ) return;
    event.preventDefault();
    event.stopPropagation();
    if (isSettleGuardActive()) requestAnimationFrame(settleAboutEntry);
  };

  entryScreen?.addEventListener("wheel", (event) => {
    if (runtime.isEntered() || Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    enterSite();
  }, { passive: false });

  entryScreen?.addEventListener("touchstart", (event) => {
    entryScrollTouchY = event.touches[0]?.clientY || 0;
  }, { passive: true });

  entryScreen?.addEventListener("touchmove", (event) => {
    if (runtime.isEntered()) return;
    const y = event.touches[0]?.clientY || entryScrollTouchY;
    const delta = entryScrollTouchY - y;
    if (Math.abs(delta) < 10) return;
    event.preventDefault();
    enterSite();
  }, { passive: false });
  window.addEventListener("wheel", rememberHeroWheelDirection, { passive: true, capture: true });
  window.addEventListener("touchstart", rememberHeroTouchStart, { passive: true, capture: true });
  window.addEventListener("touchmove", rememberHeroTouchDirection, { passive: true, capture: true });
  window.addEventListener("keydown", rememberHeroKeyDirection, { capture: true });
  window.addEventListener("wheel", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", blockEntryScroll, { passive: false, capture: true });
  window.addEventListener("wheel", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("touchmove", blockInputDuringHeroHandoff, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeysDuringHeroHandoff, { capture: true });
  window.addEventListener("scroll", onHeroScroll, { passive: true });
  window.addEventListener("resize", updateHeroAboutHandoff);
  window.addEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);

  window.addEventListener("pageshow", () => {
    if (document.body.classList.contains("has-entered")) return;
    resetHeroSequenceState({ resetScroll: true });
  });

  window.addEventListener("entry-key-ready", () => {
    if (!runtime.isEntered()) enterSite();
  });

  if (initialDeepLinkTarget && !runtime.isEntered()) {
    requestAnimationFrame(quickEnterFromDeepLink);
  } else if (document.body.classList.contains("entry-key-ready") && !runtime.isEntered()) {
    requestAnimationFrame(enterSite);
  }

  updateHeroAboutHandoff();
  new MutationObserver(syncHeroReadyState).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("pagehide", () => {
    window.clearTimeout(entryTransitionReleaseTimer);
    window.clearTimeout(postEntryGuardTimer);
    window.clearTimeout(heroHandoffTimer);
    window.clearTimeout(heroHandoffReleaseTimer);
    window.clearTimeout(heroHandoffReturnTimer);
    stopAboutEntrySettleLock();
    stopHeroReturnTopLock();
    setHandoffClass(false);
    setReleaseClass(false);
    setReturningClass(false);
    window.removeEventListener("wheel", rememberHeroWheelDirection, { capture: true });
    window.removeEventListener("touchstart", rememberHeroTouchStart, { capture: true });
    window.removeEventListener("touchmove", rememberHeroTouchDirection, { capture: true });
    window.removeEventListener("keydown", rememberHeroKeyDirection, { capture: true });
    window.removeEventListener("scroll", onHeroScroll);
    window.removeEventListener("resize", updateHeroAboutHandoff);
    window.removeEventListener("lucian:programmatic-section-jump", handleProgrammaticSectionJump);
  }, { once: true });
})();

