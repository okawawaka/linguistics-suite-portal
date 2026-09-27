/**
 * Linguistics Suite Portal — Main Application Logic
 * Scroll interactions, kinetic typography observers, keyboard shortcuts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Immediately reveal hero elements after load
  setTimeout(() => {
    document.querySelectorAll(".hero-section .slide-in-up, .hero-section .slide-in-left").forEach((el) => {
      el.classList.add("is-visible");
    });
  }, 100);

  // 2. Intersection Observer for Scroll Kinetic Slide-In Animations
  const kineticElements = document.querySelectorAll(
    ".slide-in-left, .slide-in-right, .slide-in-up, .workflow-step, .philosophy-card, .sec-header"
  );

  const observerOptions = {
    threshold: 0.12,
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
    // Only observe elements not already visible (e.g. outside hero)
    if (!el.closest(".hero-section")) {
      observer.observe(el);
    }
  });

  // 3. Sticky Header active border on scroll
  const header = document.querySelector(".portal-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // 4. Smooth scroll for internal links
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

  // 5. Back to top button
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 6. Academic Keyboard Shortcuts (Power-User Feature)
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
