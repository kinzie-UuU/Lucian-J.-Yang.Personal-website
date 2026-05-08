(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const copyItems = document.querySelectorAll(".contact-copy-item");
  const contactForm = document.querySelector("#contact-form");
  const wechatTrigger = document.querySelector("#wechat-qr-trigger");
  const wechatModal = document.querySelector("#wechat-qr-modal");
  const wechatBackdrop = document.querySelector("#wechat-qr-backdrop");
  const wechatClose = document.querySelector("#wechat-qr-close");

  const getLang = () => runtime.getCurrentLang();

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

