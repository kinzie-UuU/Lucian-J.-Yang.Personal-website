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
    "hero_text": "Lucian J. Yang 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    "hero_script": "quietly, precisely.",
    "hero_action_works": "进入作品选集",
    "hero_action_about": "查看服务",
    "hero_note": "首页不是说明文档，而是进入作品现场的入口。先浏览，再判断，再进入项目。",
    "works_kicker": "作品",
    "works_statement_title": "不是把包装做漂亮，而是把包装做对。",
    "works_statement_body": "Lucian J. Yang 聚焦 OEM、礼赠渠道、系列礼盒与品牌升级项目。比起单纯制造风格，我更关心包装如何在真实约束中成立。",
    "works_title": "点击作品，进入更集中、更明确的判断现场。",
    "works_text": "这里不是把项目平铺成截图，而是把真实合作中最常见的场景，整理成可浏览、可比较、可进入的作品入口。",
    "work_tab_oem": "品牌包装",
    "work_tab_gift": "礼品福利",
    "work_tab_brand": "品牌字体",
    "work_tab_aigc": "AIGC流",
    "works_col_project": "类别",
    "works_col_type": "方向",
    "works_col_year": "年份",
    "work_row_1_name": "包装设计",
    "work_row_2_name": "节礼包装设计",
    "work_row_3_name": "品牌与字体设计",
    "work_row_4_name": "AIGC工作流",
    "work_row_5_name": "AIGC视频",
    "metric_focus": "重点",
    "metric_value": "价值",
    "about_kicker": "关于",
    "about_title": "我是谁",
    "about_text_1": "我是一名以包装设计为主的设计师，主要方向是 OEM / 贴牌包装，以及礼品与福利渠道设计。\n\n我关注的，不只是包装是否好看，而是它在真实条件下是否成立：是否适合渠道，是否符合预算，是否匹配工艺，是否能在生产与交付中保持完整。",
    "about_text_2": "对我来说，设计不是先讨论风格，而是先判断什么该做、什么该省、什么最适合当前条件。\n\nAIGC 是我提高效率与比较方案的工具，但真正有价值的，仍然是判断本身。",
    "services_kicker": "服务",
    "services_title": "为何选择我",
    "services_intro": "我提供的，不只是包装设计本身，而是在价格、工艺、交付与渠道约束下，更合适的方案判断。",
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
    "contact_kicker": "联系",
    "contact_title": "联系",
    "contact_text": "如果你正在寻找一位既懂包装表达，也重视真实落地与成本约束的设计师，欢迎联系我。",
    "contact_collab": "OEM / 贴牌包装 · 礼品与福利渠道设计 · 系列包装 · 节庆礼盒 · 包装升级 · 包装提案与方向判断支持",
    "focus_kicker": "当前项目",
    "meta_name": "©杨钦鹏",
    "contact_form_name": "姓名",
    "contact_form_company": "公司",
    "contact_form_contact": "邮箱/电话",
    "contact_form_message": "需求信息",
    "contact_form_send": "发送邮件",
    "work_tab_aigc_video": "视频创作"
  },
  "en": {
    "nav_about": "About",
    "nav_services": "Services",
    "nav_works": "Works",
    "nav_contact": "Contact",
    "hero_kicker": "Packaging Direction / Visual Judgment / OEM System",
    "hero_title": "Not just making packaging beautiful, but making it right.",
    "hero_text": "Lucian J. Yang focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    "hero_script": "quietly, precisely.",
    "hero_action_works": "Enter Works",
    "hero_action_about": "View Services",
    "hero_note": "The homepage is not a document. It is an entrance into the work itself: browse first, judge second, then enter the project.",
    "works_kicker": "Works",
    "works_statement_title": "Not just making packaging beautiful, but making it right.",
    "works_statement_body": "Lucian J. Yang focuses on OEM, gifting channels, series boxes, and brand-upgrade packaging. The priority is not style alone, but whether a package truly works under real constraints.",
    "works_title": "Click a project and enter a more focused field of judgment.",
    "works_text": "These works show not just results, but the judgment behind them. What matters is whether they hold up in real price bands, channel conditions, process constraints, and production realities.",
    "work_tab_oem": "OEM / Brand Packaging",
    "work_tab_gift": "Gifting / Welfare Channel",
    "work_tab_brand": "Brand & Type Support",
    "work_tab_aigc": "AIGC Workflow / SOP",
    "works_col_project": "Category",
    "works_col_type": "Direction",
    "works_col_year": "Year",
    "work_row_1_name": "Packaging Design",
    "work_row_2_name": "Gift Packaging Design",
    "work_row_3_name": "Brand & Typography Design",
    "work_row_4_name": "AIGC Workflow",
    "work_row_5_name": "AIGC Video",
    "metric_focus": "Focus",
    "metric_value": "Value",
    "about_kicker": "About",
    "about_title": "Who I Am",
    "about_text_1": "I am a designer focused on packaging, primarily OEM / private label packaging and gifting & welfare channel design.\n\nMy focus is not just whether packaging looks good, but whether it holds up under real conditions — right for the channel, within budget, matched to process, and intact through production and delivery.",
    "about_text_2": "For me, design does not start with style. It starts with judgment: what should be done, what should be cut, what fits the current conditions.\n\nAIGC is a tool for efficiency and comparison. The real value is still the judgment itself.",
    "services_kicker": "Services",
    "services_title": "Why Work With Me",
    "services_intro": "What I offer is not just packaging design, but better judgment on what fits — within price, process, delivery, and channel constraints.",
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
    "contact_kicker": "Contact",
    "contact_title": "Contact",
    "contact_text": "If you are looking for a designer who understands packaging expression and takes real-world execution and cost constraints seriously, get in touch.",
    "contact_collab": "OEM / Private Label · Gifting & Welfare Channels · Series Packaging · Seasonal Gift Boxes · Packaging Upgrade · Proposal & Direction Support",
    "focus_kicker": "Active Project",
    "meta_name": "©Lucian J. Yang",
    "contact_form_name": "Name",
    "contact_form_company": "Company",
    "contact_form_contact": "Email / Phone",
    "contact_form_message": "Project Needs",
    "contact_form_send": "Send Email",
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
      "title": "STRUCTURE STUDY",
      "src": "images/works/oem/01.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "SHELF SYSTEM",
      "src": "images/works/oem/02.jpg",
      "position": "center",
      "size": "small",
      "bg": "#d8d0c0"
    },
    {
      "title": "SURFACE DIRECTION",
      "src": "images/works/oem/03.jpg",
      "position": "center",
      "size": "small",
      "bg": "#cfc5b4"
    }
  ],
  "gift": [
    {
      "title": "GIFT PROJECT 01",
      "src": "images/works/gift/01.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "GIFT PROJECT 02",
      "src": "images/works/gift/02.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "GIFT PROJECT 03",
      "src": "images/works/gift/03.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "GIFT PROJECT 04",
      "src": "images/works/gift/04.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "GIFT PROJECT 05",
      "src": "images/works/gift/05.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "GIFT PROJECT 06",
      "src": "images/works/gift/06.jpg",
      "position": "center",
      "size": "wide"
    }
  ],
  "brand": [
    {
      "title": "TYPE FIELD",
      "src": "images/works/brand/01.jpg",
      "position": "center",
      "size": "wide",
      "bg": "#e5e1d6"
    },
    {
      "title": "IDENTITY CROP",
      "src": "images/works/brand/02.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "MARK DETAIL",
      "src": "images/works/brand/03.jpg",
      "position": "center",
      "size": "small",
      "bg": "#ccd4c3"
    }
  ],
  "aigc": [
    {
      "title": "PROMPT BOARD",
      "src": "images/works/aigc/01.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "OPTION COMPARE",
      "src": "images/works/aigc/02.jpg",
      "position": "center",
      "size": "small",
      "bg": "#cbcbd2"
    },
    {
      "title": "DRAFT FILTER",
      "src": "images/works/aigc/03.jpg",
      "position": "center",
      "size": "small",
      "bg": "#d7d5ce"
    }
  ],
  "aigc-video": [
    {
      "title": "AIGC VIDEO 01",
      "src": "images/works/aigc-video/01.jpg",
      "position": "center",
      "size": "wide"
    },
    {
      "title": "SHORT VIDEO FLOW",
      "src": "images/works/aigc-video/02.jpg",
      "position": "center",
      "size": "small",
      "bg": "#cbcbd2"
    },
    {
      "title": "COMMERCIAL FILM STUDY",
      "src": "images/works/aigc-video/03.jpg",
      "position": "center",
      "size": "wide"
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
      "brand": "品牌辅助项目",
      "aigc": "AIGC 流程项目",
      "aigc-video": "AIGC视频"
    },
    "categoryDescriptions": {
      "oem": "贴牌、系列包装与渠道交付，重点处理结构、识别和量产可行性。",
      "gift": "面向节礼、福利与礼赠渠道，把场景、预算和交付节奏放进包装判断。",
      "brand": "补强品牌、字体与视觉系统，让包装识别和系列延展更完整。",
      "aigc": "用 AIGC 做方向探索、提案比较和流程提效，帮助方案更快进入判断。",
      "aigc-video": "以动态影像补充包装叙事，让提案、展示和传播更有连续性。"
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
      "brand": "Brand Support Project",
      "aigc": "AIGC Workflow Project",
      "aigc-video": "AIGC Video"
    },
    "categoryDescriptions": {
      "oem": "Private-label and series packaging focused on structure, recognition, and production-ready delivery.",
      "gift": "Gift and welfare-channel packaging shaped around occasion, budget, and delivery rhythm.",
      "brand": "Brand, type, and visual-system support that makes packaging recognition more complete.",
      "aigc": "AIGC-assisted exploration, proposal comparison, and workflow acceleration for faster design judgment.",
      "aigc-video": "Motion work that extends packaging stories across proposals, presentation, and communication."
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
