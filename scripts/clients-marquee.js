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
