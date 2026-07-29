(() => {
  "use strict";

  document.documentElement.classList.remove("no-js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const body = document.body;
  const root = document.documentElement;

  body.classList.add("is-loading");

  const finishLoader = () => {
    const loader = document.querySelector(".loader");
    loader?.classList.add("is-finished");
    body.classList.remove("is-loading");
    body.classList.add("page-ready");
  };

  if (reducedMotion) {
    finishLoader();
  } else {
    window.addEventListener("load", () => window.setTimeout(finishLoader, 1150), { once: true });
    window.setTimeout(finishLoader, 2600);
  }

  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".scroll-progress");
  let previousScrollY = window.scrollY;
  let scrollTicking = false;

  const updateScrollState = () => {
    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = pageHeight > 0 ? scrollY / pageHeight : 0;

    progress.style.transform = `scaleX(${Math.min(Math.max(progressValue, 0), 1)})`;
    header.classList.toggle("is-scrolled", scrollY > 28);
    header.classList.toggle(
      "is-hidden",
      scrollY > previousScrollY && scrollY > 340 && !body.classList.contains("nav-open"),
    );

    previousScrollY = Math.max(scrollY, 0);
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollState);
        scrollTicking = true;
      }
    },
    { passive: true },
  );
  updateScrollState();

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  const closeNavigation = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
    nav?.classList.remove("is-open");
    body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("is-open", !isOpen);
    body.classList.toggle("nav-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  const revealElements = [...document.querySelectorAll(".reveal")];
  revealElements.forEach((element, index) => {
    const siblings = element.parentElement
      ? [...element.parentElement.children].filter((child) => child.classList.contains("reveal"))
      : [];
    const siblingIndex = siblings.indexOf(element);
    if (siblings.length > 1 && siblingIndex >= 0) {
      element.style.setProperty("--delay", `${Math.min(siblingIndex * 85, 340)}ms`);
    } else if (index < 3) {
      element.style.setProperty("--delay", `${index * 60}ms`);
    }
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("in-view"));
  }

  const counters = [...document.querySelectorAll("[data-counter]")];
  const runCounter = (counter) => {
    const target = Number(counter.dataset.counter);
    const duration = 1250;
    const startedAt = performance.now();

    const update = (now) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      counter.textContent = Math.round(target * eased).toString();
      if (elapsed < 1) window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window && !reducedMotion) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 },
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.counter;
    });
  }

  if (finePointer && !reducedMotion) {
    let cursorX = -100;
    let cursorY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener(
      "pointermove",
      (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
        root.style.setProperty("--cursor-x", `${cursorX}px`);
        root.style.setProperty("--cursor-y", `${cursorY}px`);
      },
      { passive: true },
    );

    const ring = document.querySelector(".cursor-ring");
    const animateRing = () => {
      ringX += (cursorX - ringX) * 0.14;
      ringY += (cursorY - ringY) * 0.14;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      window.requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll("a, button, .tilt-card").forEach((element) => {
      element.addEventListener("pointerenter", () => body.classList.add("cursor-active"));
      element.addEventListener("pointerleave", () => body.classList.remove("cursor-active"));
    });

    document.querySelectorAll(".magnetic").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        element.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
      });

      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });

    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        const maxTilt = card.classList.contains("portrait-card") ? 6 : 3;
        card.style.transform = `perspective(1100px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) translateZ(0)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  const parallaxElement = document.querySelector("[data-parallax]");
  if (parallaxElement && !reducedMotion) {
    window.addEventListener(
      "pointermove",
      (event) => {
        if (window.innerWidth <= 820) return;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        parallaxElement.style.transform = `translate3d(${x * -12}px, ${y * -9}px, 0)`;
      },
      { passive: true },
    );
  }

  const copyButton = document.querySelector("[data-copy-email]");
  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.copyEmail;
    const label = copyButton.querySelector("[data-copy-label]");

    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Email copied";
      copyButton.querySelector("i").textContent = "Done";
      window.setTimeout(() => {
        label.textContent = email;
        copyButton.querySelector("i").textContent = "Copy";
      }, 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear().toString();

  const projectFilters = [...document.querySelectorAll("[data-project-filter]")];
  const projectCards = [...document.querySelectorAll("[data-project-category]")];
  const projectCount = document.querySelector("[data-project-count]");

  projectFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const category = filterButton.dataset.projectFilter;

      projectFilters.forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filterButton));
      });

      let visibleCount = 0;

      projectCards.forEach((card) => {
        const categories = card.dataset.projectCategory.split(/\s+/);
        const matches = category === "all" || categories.includes(category);

        card.classList.toggle("is-filtered-out", !matches);

        if (matches) {
          card.removeAttribute("aria-hidden");
          visibleCount += 1;
        } else {
          card.setAttribute("aria-hidden", "true");
        }
      });

      if (projectCount) {
        projectCount.textContent =
          category === "all"
            ? `Showing ${visibleCount} projects`
            : `${visibleCount} projects in this view`;
      }
    });
  });

  const canvas = document.querySelector("#hero-canvas");
  const context = canvas?.getContext("2d", { alpha: true });

  if (!canvas || !context || reducedMotion) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let animationFrame = 0;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const createParticles = () => {
    const particleCount = width < 700 ? 36 : Math.min(84, Math.floor(width / 18));
    particles = Array.from({ length: particleCount }, (_, index) => {
      const angle = (index / particleCount) * Math.PI * 2 + Math.random() * 0.3;
      const radius = Math.min(width, height) * (0.19 + Math.random() * 0.29);
      return {
        angle,
        radius,
        speed: (0.00028 + Math.random() * 0.00038) * (index % 2 === 0 ? 1 : -1),
        depth: 0.35 + Math.random() * 0.75,
        size: 0.45 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      };
    });
  };

  const resizeCanvas = () => {
    const bounds = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    pointer.x += (pointer.targetX - pointer.x) * 0.035;
    pointer.y += (pointer.targetY - pointer.y) * 0.035;

    const centerX = width * 0.69 + pointer.x * 24;
    const centerY = height * 0.48 + pointer.y * 18;
    const positions = [];

    particles.forEach((particle) => {
      particle.angle += particle.speed * 16;
      const pulse = 1 + Math.sin(time * 0.0006 + particle.phase) * 0.035;
      const ellipseX = particle.radius * pulse;
      const ellipseY = particle.radius * 0.46 * pulse;
      const x = centerX + Math.cos(particle.angle) * ellipseX;
      const y =
        centerY +
        Math.sin(particle.angle) * ellipseY +
        Math.sin(particle.angle * 2.2 + particle.phase) * 16;
      positions.push({ x, y, particle });
    });

    for (let i = 0; i < positions.length; i += 1) {
      const current = positions[i];
      for (let j = i + 1; j < positions.length; j += 1) {
        const next = positions[j];
        const dx = current.x - next.x;
        const dy = current.y - next.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 112) {
          context.beginPath();
          context.moveTo(current.x, current.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(97, 218, 225, ${0.08 * (1 - distance / 112)})`;
          context.lineWidth = 0.55;
          context.stroke();
        }
      }
    }

    positions.forEach(({ x, y, particle }) => {
      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fillStyle =
        particle.depth > 0.78
          ? `rgba(80, 227, 230, ${0.3 + particle.depth * 0.38})`
          : `rgba(255, 255, 255, ${0.16 + particle.depth * 0.25})`;
      context.fill();

      if (particle.depth > 0.92) {
        context.beginPath();
        context.arc(x, y, particle.size * 4.2, 0, Math.PI * 2);
        context.fillStyle = "rgba(80, 227, 230, 0.035)";
        context.fill();
      }
    });

    animationFrame = window.requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.targetX = event.clientX / window.innerWidth - 0.5;
      pointer.targetY = event.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = window.requestAnimationFrame(draw);
    }
  });

  resizeCanvas();
  animationFrame = window.requestAnimationFrame(draw);
})();
