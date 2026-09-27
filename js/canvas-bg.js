/**
 * Linguistics Suite Portal — Interactive Geometric & Harmonic Waves Canvas
 * Swiss Typographic Style: Mathematical Grid, Harmonic Resonances, Kinetic Signals
 */

(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let mouse = { x: -1000, y: -1000, active: false };
  let time = 0;
  let animFrameId;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = (mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height);
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  // Wave definitions representing acoustic harmonics: F0, F1, F2, F3
  const waves = [
    { freq: 0.003, speed: 0.02, amp: 45, color: "rgba(17, 17, 17, 0.06)", width: 1 },
    { freq: 0.006, speed: 0.015, amp: 30, color: "rgba(17, 17, 17, 0.09)", width: 1 },
    { freq: 0.012, speed: 0.03, amp: 20, color: "rgba(227, 6, 19, 0.35)", width: 1.5 }, // Swiss Red (F1 Formant accent)
    { freq: 0.018, speed: 0.025, amp: 14, color: "rgba(17, 17, 17, 0.05)", width: 1 },
    { freq: 0.025, speed: 0.04, amp: 8, color: "rgba(227, 6, 19, 0.6)", width: 1 }      // Swiss Red accent
  ];

  function drawGrid() {
    const gridSize = 60;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(226, 229, 233, 0.6)";

    // Subtle coordinate grid
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Cross markers at grid intersections (Swiss Precision Marks)
    const markerSize = 3;
    ctx.fillStyle = "rgba(17, 17, 17, 0.25)";
    for (let x = gridSize; x < width; x += gridSize * 2) {
      for (let y = gridSize; y < height; y += gridSize * 2) {
        ctx.fillRect(x - markerSize / 2, y, markerSize, 1);
        ctx.fillRect(x, y - markerSize / 2, 1, markerSize);
      }
    }
  }

  function drawAcousticWaves() {
    const centerY = height * 0.58;

    waves.forEach((w, index) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.width;

      const step = 4;
      for (let x = 0; x <= width; x += step) {
        // Basic harmonic equation: sin(wt + kx)
        const baseSin = Math.sin(time * w.speed + x * w.freq);
        const secondHarmonic = Math.cos(time * (w.speed * 0.7) + x * (w.freq * 1.6)) * 0.4;
        
        let yOffset = (baseSin + secondHarmonic) * w.amp;

        // Interactive mouse distortion (Acoustic Resonance Effect)
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = (centerY + yOffset) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;

          if (dist < maxDist) {
            const influence = (1 - dist / maxDist);
            const ripple = Math.sin(dist * 0.08 - time * 0.1) * (35 * influence);
            yOffset += ripple;
          }
        }

        const y = centerY + yOffset + (index * 8 - 16);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    // Draw active frequency measurement readout indicator near cursor
    if (mouse.active) {
      ctx.save();
      ctx.fillStyle = "rgba(17, 17, 17, 0.9)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(
        `FREQ: ${(mouse.x * 2.5).toFixed(0)}Hz | RES: ${(height - mouse.y).toFixed(1)}dB`,
        mouse.x + 15,
        mouse.y - 12
      );
      ctx.strokeStyle = "rgba(227, 6, 19, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  let isVisible = false;

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    drawGrid();
    drawAcousticWaves();

    time += 1;
    animFrameId = requestAnimationFrame(animate);
  }

  // Optimize performance: pause canvas render loop when hero is off-screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animFrameId = requestAnimationFrame(animate);
          }
        } else {
          isVisible = false;
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas.parentElement || canvas);
  } else {
    isVisible = true;
    animate();
  }
})();
