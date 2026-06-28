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
