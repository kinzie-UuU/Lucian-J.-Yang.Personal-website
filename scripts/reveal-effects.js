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
          const delay = parseInt(element.dataset.delay || "0", 10);
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
