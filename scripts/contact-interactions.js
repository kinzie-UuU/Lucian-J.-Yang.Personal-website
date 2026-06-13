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
