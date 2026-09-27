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

  // 2. Intersection Observer for Scroll Kinetic Slide-In Animations
  const kineticElements = document.querySelectorAll(
    ".slide-in-up, .workflow-step, .poster-block, .sec-header, .poster-head"
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
});
