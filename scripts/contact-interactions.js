(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const contactSection = document.querySelector("#contact");
  const copyItems = document.querySelectorAll(".contact-copy-item");
  const contactForm = document.querySelector("#contact-form");
  const wechatTrigger = document.querySelector("#wechat-qr-trigger");
  const wechatModal = document.querySelector("#wechat-qr-modal");
  const wechatBackdrop = document.querySelector("#wechat-qr-backdrop");
  const wechatClose = document.querySelector("#wechat-qr-close");

  const getLang = () => runtime.getCurrentLang();
  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smootherStep = (value) => value * value * value * (value * (value * 6 - 15) + 10);

  const initContactPaperMotion = () => {
    if (!contactSection) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const setVar = (name, value) => {
      contactSection.style.setProperty(name, value.toFixed(4));
    };

    const update = () => {
      ticking = false;

      if (prefersReducedMotion.matches) {
        setVar("--contact-paper-place", 1);
        setVar("--contact-paper-settle", 1);
        setVar("--contact-paper-exit", 0);
        setVar("--contact-paper-bg", 1);
        return;
      }

      const vh = Math.max(1, window.innerHeight);
      const rect = contactSection.getBoundingClientRect();
      const enter = smootherStep(clamp01((vh * 1.08 - rect.top) / (vh * 0.94)));
      const settle = smootherStep(clamp01((vh * 0.74 - rect.top) / (vh * 0.72)));
      const bg = smootherStep(clamp01((vh * 1.18 - rect.top) / (vh * 1.16)));
      const exit = smootherStep(clamp01((vh * 0.04 - rect.bottom) / (vh * 0.7)));

      setVar("--contact-paper-place", enter);
      setVar("--contact-paper-settle", settle);
      setVar("--contact-paper-exit", exit);
      setVar("--contact-paper-bg", bg);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    prefersReducedMotion.addEventListener?.("change", requestUpdate);
  };

  initContactPaperMotion();

  const showContactToast = () => {
    const toast = document.getElementById("contact-toast");
    if (!toast) return;

    toast.textContent = getLang() === "zh"
      ? "\u5df2\u51c6\u5907\u53d1\u9001\u90ae\u4ef6\uff0c\u5e76\u590d\u5236\u5185\u5bb9"
      : "Email draft ready to send and copied";
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
    window.location.href = `mailto:y1156813759@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
