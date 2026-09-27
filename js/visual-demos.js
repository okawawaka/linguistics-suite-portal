/**
 * Linguistics Suite Portal — Visual Interactive Demos
 * Highly animated, Swiss-style visual simulators for all 4 tools:
 * 1. Acoustic Annotator: Real-time Audio Waveform, Spectrogram, F0 curve & TextGrid intervals
 * 2. IPA Editor: Interactive typing simulation, Chao tone letter ligature formation
 * 3. Syntax Tree Editor: Dynamic tree branching SVG generation with movement arrow
 * 4. Phonological Rule Editor: Structured SPE distinctive feature matrix assembler
 */

(function () {
  /* ==========================================================================
     DEMO 1: Acoustic Annotator Visual Simulator
     ========================================================================== */
  const annotatorCanvas = document.getElementById("demo-annotator-canvas");
  if (annotatorCanvas) {
    const ctx = annotatorCanvas.getContext("2d");
    let width = 0, height = 0;
    let animId;
    let offset = 0;

    function resizeAnnotator() {
      const dpr = window.devicePixelRatio || 1;
      const rect = annotatorCanvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = 280;
      annotatorCanvas.width = width * dpr;
      annotatorCanvas.height = height * dpr;
      annotatorCanvas.style.width = width + "px";
      annotatorCanvas.style.height = height + "px";
      ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resizeAnnotator);
    resizeAnnotator();

    // Simulated speech segments: [s] [a] [k] [u] [ɾ] [a]
    const segments = [
      { label: "#", dur: 60, type: "sil" },
      { label: "s", dur: 90, type: "fric" },
      { label: "a", dur: 120, type: "vowel", f0: 160, f1: 820, f2: 1350 },
      { label: "k", dur: 80, type: "stop" },
      { label: "u", dur: 100, type: "vowel", f0: 175, f1: 380, f2: 1200 },
      { label: "ɾ", dur: 60, type: "tap" },
      { label: "a", dur: 130, type: "vowel", f0: 140, f1: 800, f2: 1320 },
      { label: "#", dur: 70, type: "sil" }
    ];

    function drawAnnotator() {
      ctx.clearRect(0, 0, width, height);

      const waveH = 100;
      const specH = 110;
      const tierH = 45;

      // 1. Waveform Area
      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, width, waveH);
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, waveH);

      // Centerline
      ctx.strokeStyle = "rgba(17,17,17,0.15)";
      ctx.beginPath();
      ctx.moveTo(0, waveH / 2);
      ctx.lineTo(width, waveH / 2);
      ctx.stroke();

      // Waveform trace
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const t = (x + offset) * 0.05;
        const env = Math.sin((x + offset) * 0.008) * 0.5 + 0.5;
        const wave = (Math.sin(t * 3) * 0.6 + Math.sin(t * 7) * 0.4) * (env * (waveH * 0.38));
        const y = waveH / 2 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Spectrogram + F0 Pitch Area
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, waveH, width, specH);

      // Spectrogram color frequency bands simulation
      const colW = 6;
      for (let x = 0; x < width; x += colW) {
        const specEnv = Math.sin((x + offset) * 0.015) * 0.5 + 0.5;
        // Formant bands (F1, F2, F3)
        const f1Y = waveH + specH * 0.7 - specEnv * 15;
        const f2Y = waveH + specH * 0.45 - specEnv * 20;
        const f3Y = waveH + specH * 0.2 - specEnv * 10;

        ctx.fillStyle = `rgba(227, 6, 19, ${0.15 + specEnv * 0.35})`;
        ctx.fillRect(x, f1Y, colW - 1, 14);

        ctx.fillStyle = `rgba(180, 180, 190, ${0.1 + specEnv * 0.25})`;
        ctx.fillRect(x, f2Y, colW - 1, 10);
        ctx.fillRect(x, f3Y, colW - 1, 8);
      }

      // F0 Pitch Track (Red dots)
      ctx.fillStyle = "#E30613";
      for (let x = 0; x < width; x += 8) {
        const pitchEnv = Math.sin((x + offset) * 0.01) * 0.4 + 0.5;
        if (pitchEnv > 0.3) {
          const pitchY = waveH + specH * 0.82 - pitchEnv * 35;
          ctx.beginPath();
          ctx.arc(x, pitchY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. TextGrid Tier Area
      const tierY = waveH + specH;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, tierY, width, tierH);
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, tierY, width, tierH);

      // Loop and draw interval boundaries
      let currentX = -(offset % 710);
      while (currentX < width) {
        for (let seg of segments) {
          const nextX = currentX + seg.dur;
          if (nextX > 0 && currentX < width) {
            // Draw boundary
            ctx.strokeStyle = "#111111";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(currentX, 0);
            ctx.lineTo(currentX, height);
            ctx.stroke();

            // Draw label
            ctx.fillStyle = seg.type === "vowel" ? "#E30613" : "#111111";
            ctx.font = "bold 13px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(seg.label, (currentX + nextX) / 2, tierY + tierH / 2);
          }
          currentX = nextX;
        }
      }

      // Time indicator bar (Scanning cursor)
      const playheadX = width * 0.42;
      ctx.strokeStyle = "#E30613";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      // Top label
      ctx.fillStyle = "#E30613";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("LPC FORMANTS [F1-F3] & F0 PITCH", 10, waveH + 16);

      offset += 0.8;
      animId = requestAnimationFrame(drawAnnotator);
    }
    drawAnnotator();
  }

  /* ==========================================================================
     DEMO 2: IPA Editor Interactive Typing Simulator
     ========================================================================== */
  const ipaInputBox = document.getElementById("demo-ipa-output");
  const ipaKeys = document.querySelectorAll(".demo-ipa-key");

  if (ipaInputBox && ipaKeys.length > 0) {
    const sequence = [
      { char: "t", keyId: "key-t" },
      { char: "ʃ", keyId: "key-esh" },
      { char: "oː", keyId: "key-colon" },
      { char: "k", keyId: "key-k" },
      { char: "j", keyId: "key-j" },
      { char: "oː", keyId: "key-colon" },
      { char: " ˥˩", keyId: "key-tone" } // Tone ligature
    ];

    let seqIndex = 0;
    let currentText = "";

    function stepIpaTyping() {
      if (seqIndex >= sequence.length) {
        // Pause and reset
        setTimeout(() => {
          currentText = "";
          ipaInputBox.textContent = "";
          seqIndex = 0;
          stepIpaTyping();
        }, 2200);
        return;
      }

      const item = sequence[seqIndex];
      const targetBtn = document.getElementById(item.keyId);

      if (targetBtn) {
        targetBtn.classList.add("key-active");
        setTimeout(() => targetBtn.classList.remove("key-active"), 280);
      }

      currentText += item.char;
      ipaInputBox.textContent = currentText;
      seqIndex++;

      setTimeout(stepIpaTyping, 450);
    }

    setTimeout(stepIpaTyping, 1000);
  }

  /* ==========================================================================
     DEMO 3: Syntax Tree Editor Dynamic SVG Tree Simulator
     ========================================================================== */
  const treeSvg = document.getElementById("demo-tree-svg");
  if (treeSvg) {
    // Tree steps: Nodes and branches expand sequentially
    const treeNodes = [
      { id: "node-tp", delay: 300 },
      { id: "node-dp1", delay: 800 },
      { id: "node-tbar", delay: 1300 },
      { id: "node-vp", delay: 1800 },
      { id: "branch-arrow", delay: 2400 }
    ];

    function runTreeAnimation() {
      // Reset all nodes
      const allAnimElements = treeSvg.querySelectorAll(".tree-anim-item");
      allAnimElements.forEach(el => el.classList.remove("is-drawn"));

      treeNodes.forEach(item => {
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) el.classList.add("is-drawn");
        }, item.delay);
      });

      // Loop after 5 seconds
      setTimeout(runTreeAnimation, 5200);
    }

    runTreeAnimation();
  }

  /* ==========================================================================
     DEMO 4: Phonological Rule Editor Interactive Assembler
     ========================================================================== */
  const ruleContainer = document.getElementById("demo-rule-container");
  if (ruleContainer) {
    const parts = [
      { id: "rule-part-input", delay: 400 },
      { id: "rule-part-arrow", delay: 900 },
      { id: "rule-part-output", delay: 1400 },
      { id: "rule-part-slash", delay: 1900 },
      { id: "rule-part-env", delay: 2400 },
      { id: "rule-part-matrix", delay: 2900 }
    ];

    function runRuleAnimation() {
      parts.forEach(p => {
        const el = document.getElementById(p.id);
        if (el) el.classList.remove("matrix-active");
      });

      parts.forEach(p => {
        setTimeout(() => {
          const el = document.getElementById(p.id);
          if (el) el.classList.add("matrix-active");
        }, p.delay);
      });

      setTimeout(runRuleAnimation, 5400);
    }

    runRuleAnimation();
  }
})();
