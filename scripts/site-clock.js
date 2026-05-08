(() => {
  const beijingTimeNode = document.querySelector("#beijing-time");
  const beijingDateNode = document.querySelector("#beijing-date");

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

    if (beijingTimeNode) {
      const period = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Shanghai",
        hour: "numeric",
        hour12: true,
      }).formatToParts(now).find((part) => part.type === "dayPeriod")?.value || "";
      beijingTimeNode.innerHTML = `<span class="top-meta-period">${period.toUpperCase()}</span>${timeFormatter.format(now)}`;
    }

    if (beijingDateNode) {
      beijingDateNode.textContent = dateFormatter.format(now).replace(/-/g, ".");
    }
  };

  updateBeijingMeta();
  window.setInterval(updateBeijingMeta, 30000);
})();
