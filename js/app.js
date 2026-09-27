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

  const kineticElements = document.querySelectorAll(
    ".slide-in-up, .poster-block, .sec-header, .poster-head, .tool-focus-section, .section-lead-band, .metrics-strip"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  kineticElements.forEach((el) => {
    if (!el.closest(".hero-section")) {
      observer.observe(el);
    }
  });

  // 2b. Scientific Vertical Ruler Tracking & Metric Counters
  const sections = document.querySelectorAll("section[id]");
  const rulerLinks = document.querySelectorAll(".ruler-step-link");

  function animateMetricVal(el) {
    if (el.dataset.hasCounted) return;
    el.dataset.hasCounted = "true";

    const targetStr = el.getAttribute("data-target") || el.textContent.trim();
    const targetNum = parseInt(targetStr, 10);
    if (isNaN(targetNum)) return;

    const originalText = el.textContent.trim();
    const suffix = originalText.endsWith("%") ? "%" : (originalText.endsWith("ms") ? "ms" : "");
    const duration = 850;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(easeProgress * targetNum);
      el.textContent = currentNum + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = originalText;
      }
    }
    requestAnimationFrame(update);
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible", "is-scanned");
        const currentId = entry.target.getAttribute("id");
        rulerLinks.forEach((link) => {
          if (link.getAttribute("data-step") === currentId) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        const metricVals = entry.target.querySelectorAll(".metric-val");
        metricVals.forEach(animateMetricVal);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: "-5% 0px -25% 0px"
  });

  sections.forEach((sec) => sectionObserver.observe(sec));

  // 3. Scroll Progress Indicator & Header Sticky Border
  const header = document.querySelector(".portal-header");
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = progress + "%";
    }

    if (scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

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
