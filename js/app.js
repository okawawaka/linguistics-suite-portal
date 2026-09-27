/**
 * Linguistics Suite Portal — Main Application Logic
 * Scroll interactions, kinetic typography observers, keyboard shortcuts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Intersection Observer for Kinetic Entrance Animations
  const kineticElements = document.querySelectorAll(
    ".reveal-text, .swiss-card, .workflow-step, .philosophy-card, .sec-header"
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Optional: unobserve once visible
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  kineticElements.forEach((el) => observer.observe(el));

  // 2. Sticky Header active border on scroll
  const header = document.querySelector(".portal-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // 3. Smooth scroll for internal links
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

  // 4. Back to top button
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. Academic Keyboard Shortcuts (Power-User Feature)
  window.addEventListener("keydown", (e) => {
    // If user is inside an input or textarea, ignore
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.key === "1") {
      document.querySelector("#tool-annotator")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "2") {
      document.querySelector("#tool-ipa")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "3") {
      document.querySelector("#tool-syntax")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "4") {
      document.querySelector("#tool-phonology")?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "t" || e.key === "T") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});
