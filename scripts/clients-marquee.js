(() => {
  const marquee = document.querySelector(".clients-marquee");
  const track = marquee?.querySelector(".clients-track");
  if (!marquee || !track) return;

  const clone = track.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marquee.appendChild(clone);
})();

