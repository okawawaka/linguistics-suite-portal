/**
 * Linguistics Suite Portal — Main Application Logic
 * Scroll progress line, kinetic typography observers, coordinate readouts & keyboard shortcuts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Immediately reveal hero elements after load
  setTimeout(() => {
    document.querySelectorAll(".hero-section .slide-in-up").forEach((el) => {
      el.classList.add("is-visible");
    });
  }, 100);

  // 2. Component-level Intersection Observers (Precise view-triggered animations)
  const animObserverOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
  };

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // If it's a metrics strip, trigger number counters immediately
        if (entry.target.classList.contains("metrics-strip")) {
          const metricVals = entry.target.querySelectorAll(".metric-val");
          metricVals.forEach(animateMetricVal);
        }
      }
    });
  }, animObserverOptions);

  // Observe each component individually so animations trigger right in front of user
  document.querySelectorAll(
    ".slide-in-up, .poster-block, .sec-header, .poster-head, .section-lead-band, .tool-feature-list, .metrics-strip"
  ).forEach((el) => {
    if (!el.closest(".hero-section")) {
      animObserver.observe(el);
    }
  });

  // 2b. High-Precision Digital Metric Counter Animation
  function animateMetricVal(el) {
    if (el.dataset.hasCounted) return;
    el.dataset.hasCounted = "true";

    const targetNum = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(targetNum)) return;

    if (targetNum === 0) {
      el.textContent = "0" + suffix;
      return;
    }

    const duration = 950;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(easeProgress * targetNum);
      el.textContent = currentNum + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = targetNum + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // 3. Robust Scroll Progress & Continuous Vertical Ruler Tracker
  const header = document.querySelector(".portal-header");
  const progressBar = document.getElementById("scroll-progress");
  const rulerThumb = document.getElementById("ruler-thumb");
  const rulerLinks = document.querySelectorAll(".ruler-step-link");
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function updateScrollState() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    // A. Top Progress Line
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    // B. Header Sticky Scrolled State
    if (header) {
      if (scrollY > 40) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    }

    // C. Vertical Ruler Thumb Position
    if (rulerThumb) {
      const trackHeight = 220;
      const thumbHeight = 8;
      const thumbTop = (progress / 100) * (trackHeight - thumbHeight);
      rulerThumb.style.top = thumbTop + "px";
    }

    // D. Active Section Highlight on Ruler
    const probeY = scrollY + window.innerHeight * 0.38;
    let activeId = "";

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= probeY) {
        activeId = sec.getAttribute("id");
        break;
      }
    }

    rulerLinks.forEach((link) => {
      if (activeId && link.getAttribute("data-step") === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState, { passive: true });
  updateScrollState();

  // 4. Precision Scientific Coordinate Readout (Mouse Tracking)
  const posReadout = document.getElementById("header-coord-pos");
  if (posReadout) {
    window.addEventListener("mousemove", (e) => {
      const x = String(e.clientX).padStart(4, "0");
      const y = String(e.clientY).padStart(4, "0");
      posReadout.textContent = `POS: X${x} Y${y}`;
    });
  }

  // 5. Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 6. Back to top button
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 7. Academic Keyboard Shortcuts (Power-User Feature)
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.key === "1") {
      document.querySelector("#annotator")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "2") {
      document.querySelector("#ipa")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "3") {
      document.querySelector("#syntax")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "4") {
      document.querySelector("#phonology")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "t" || e.key === "T") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // ==========================================================================
  // 8. Swiss Typographic Typewriter Effect for Hero & Major Headings
  // ==========================================================================
  class TypewriterEffect {
    constructor() {
      this.activeTimers = new Map();
      this.init();
    }

    init() {
      // 1. Hero Main Line 2 (Triggers on initial load)
      const heroTarget = document.querySelector(".typewriter-hero");
      if (heroTarget) {
        setTimeout(() => {
          this.play(heroTarget, 55, true);
        }, 400);
      }

      // 2. Headings on Scroll
      const headings = document.querySelectorAll(".typewriter-heading");
      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.hasTyped) {
            entry.target.dataset.hasTyped = "true";
            this.play(entry.target, 35, false);
          }
        });
      }, { threshold: 0.25, rootMargin: "0px 0px -40px 0px" });

      headings.forEach((el) => headingObserver.observe(el));

      // 3. React to Language Switch (JA / EN)
      window.addEventListener("portalLanguageChanged", () => {
        if (heroTarget) {
          heroTarget.removeAttribute("data-full-text");
          this.play(heroTarget, 45, true);
        }
        headings.forEach((el) => {
          el.removeAttribute("data-full-text");
          if (el.dataset.hasTyped === "true") {
            this.play(el, 30, false);
          }
        });
      });
    }

    play(element, speed = 40, keepCursorBlinking = false) {
      if (!element) return;

      // Clear any active timer for this element
      if (this.activeTimers.has(element)) {
        clearInterval(this.activeTimers.get(element));
        this.activeTimers.delete(element);
      }

      // Get target text from textContent (already updated by i18n)
      let fullText = element.getAttribute("data-full-text");
      if (!fullText) {
        const textSpan = element.querySelector(".typewriter-text");
        fullText = textSpan ? textSpan.textContent.trim() : element.textContent.trim();
        if (fullText) {
          element.setAttribute("data-full-text", fullText);
        }
      }

      if (!fullText) return;

      element.textContent = "";

      const textSpan = document.createElement("span");
      textSpan.className = "typewriter-text";
      const cursorSpan = document.createElement("span");
      cursorSpan.className = "typewriter-cursor";
      if (!element.classList.contains("typewriter-hero")) {
        cursorSpan.classList.add("cursor-dark");
      }

      element.appendChild(textSpan);
      element.appendChild(cursorSpan);

      let charIndex = 0;
      const timer = setInterval(() => {
        if (charIndex < fullText.length) {
          textSpan.textContent += fullText.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(timer);
          this.activeTimers.delete(element);
          if (!keepCursorBlinking) {
            // Fade out cursor after 2s for headings
            setTimeout(() => {
              cursorSpan.style.transition = "opacity 0.4s ease";
              cursorSpan.style.opacity = "0";
              setTimeout(() => cursorSpan.remove(), 400);
            }, 2000);
          }
        }
      }, speed);

      this.activeTimers.set(element, timer);
    }
  }

  window.typewriterManager = new TypewriterEffect();
});
