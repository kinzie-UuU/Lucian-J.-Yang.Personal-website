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
