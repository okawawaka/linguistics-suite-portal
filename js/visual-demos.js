/**
 * Linguistics Suite Portal — Visual Interactive Demos (Robust & Pixel-Perfect)
 * 1. Acoustic Annotator: Real-time Audio Waveform, Spectrogram, F0 pitch, Praat TextGrid & LED VU Meter
 * 2. IPA Editor: Interactive typing simulation, Chao tone ligature assembly & dynamic Unicode tags
 * 3. Syntax Tree Editor: Constant publication-quality tree with continuous flowing dashed movement trace
 * 4. Phonological Rule Editor: Structured SPE distinctive feature matrix with scan highlights & glowing arrow
 */

(function () {
  /* ==========================================================================
     DEMO 1: Acoustic Annotator Visual Simulator & 8-Segment LED VU Meter
     ========================================================================== */
  const annotatorCanvas = document.getElementById("demo-annotator-canvas");
  const vuLeds = Array.from({ length: 8 }, (_, i) => document.getElementById(`vu-${i}`));

  if (annotatorCanvas) {
    const ctx = annotatorCanvas.getContext("2d");
    let width = 0, height = 280;
    let offset = 0;

    function resizeAnnotator() {
      const dpr = window.devicePixelRatio || 1;
      const rect = annotatorCanvas.parentElement.getBoundingClientRect();
      width = rect.width || 480;
      height = 280;
      annotatorCanvas.width = width * dpr;
      annotatorCanvas.height = height * dpr;
      annotatorCanvas.style.width = width + "px";
      annotatorCanvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resizeAnnotator);
    window.addEventListener("load", resizeAnnotator);
    resizeAnnotator();

    const segments = [
      { label: "sil", dur: 50, type: "sil", power: 0.1 },
      { label: "s", dur: 85, type: "fric", power: 0.5 },
      { label: "a", dur: 110, type: "vowel", f0: 165, power: 0.85 },
      { label: "k", dur: 75, type: "stop", power: 0.3 },
      { label: "u", dur: 95, type: "vowel", f0: 175, power: 0.75 },
      { label: "ɾ", dur: 60, type: "tap", power: 0.4 },
      { label: "a", dur: 120, type: "vowel", f0: 145, power: 0.8 },
      { label: "sil", dur: 60, type: "sil", power: 0.05 }
    ];
    const totalCycle = segments.reduce((sum, s) => sum + s.dur, 0);

    function drawAnnotator() {
      if (width === 0) return;
      ctx.clearRect(0, 0, width, height);

      const waveH = 110;
      const specH = 115;
      const tierH = 55;

      // 1. Waveform Area
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, waveH);
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, waveH);

      // Centerline
      ctx.strokeStyle = "rgba(17,17,17,0.12)";
      ctx.beginPath();
      ctx.moveTo(0, waveH / 2);
      ctx.lineTo(width, waveH / 2);
      ctx.stroke();

      // Waveform trace
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let currentSampleAmp = 0;

      for (let x = 0; x < width; x += 2) {
        const t = (x + offset) * 0.05;
        const env = Math.sin((x + offset) * 0.009) * 0.5 + 0.5;
        const wave = (Math.sin(t * 3.2) * 0.6 + Math.sin(t * 7.5) * 0.4) * (env * (waveH * 0.38));
        const y = waveH / 2 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // Capture center amplitude for VU meter
        if (Math.abs(x - width * 0.45) < 3) {
          currentSampleAmp = Math.abs(wave) / (waveH * 0.38);
        }
      }
      ctx.stroke();

      // Drive 8-Segment LED VU meter
      if (vuLeds.length === 8 && vuLeds[0]) {
        const litCount = Math.round(currentSampleAmp * 8);
        vuLeds.forEach((led, idx) => {
          if (idx < litCount) {
            led.classList.add("lit");
          } else {
            led.classList.remove("lit");
          }
        });
      }

      // Top Tag
      ctx.fillStyle = "#111111";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("AUDIO WAVEFORM (PCM 16-BIT)", 12, 18);

      // 2. Spectrogram + F0 Pitch Area
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, waveH, width, specH);

      // Spectrogram color frequency bands
      const colW = 5;
      for (let x = 0; x < width; x += colW) {
        const specEnv = Math.sin((x + offset) * 0.016) * 0.5 + 0.5;
        const f1Y = waveH + specH * 0.72 - specEnv * 16;
        const f2Y = waveH + specH * 0.46 - specEnv * 20;
        const f3Y = waveH + specH * 0.22 - specEnv * 12;

        ctx.fillStyle = `rgba(227, 6, 19, ${0.18 + specEnv * 0.35})`;
        ctx.fillRect(x, f1Y, colW - 1, 14);

        ctx.fillStyle = `rgba(180, 185, 195, ${0.12 + specEnv * 0.25})`;
        ctx.fillRect(x, f2Y, colW - 1, 10);
        ctx.fillRect(x, f3Y, colW - 1, 8);
      }

      // F0 Pitch dots (Swiss Red)
      ctx.fillStyle = "#E30613";
      for (let x = 0; x < width; x += 8) {
        const pitchEnv = Math.sin((x + offset) * 0.012) * 0.45 + 0.5;
        if (pitchEnv > 0.25) {
          const pitchY = waveH + specH * 0.85 - pitchEnv * 38;
          ctx.beginPath();
          ctx.arc(x, pitchY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Spectrogram Label
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillText("STFT SPECTROGRAM (0-5000Hz) & F0 PITCH", 12, waveH + 18);

      // 3. TextGrid Tier Area
      const tierY = waveH + specH;
      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, tierY, width, tierH);
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, tierY, width, tierH);

      // TextGrid label
      ctx.fillStyle = "rgba(17,17,17,0.5)";
      ctx.font = "bold 8px 'JetBrains Mono', monospace";
      ctx.fillText("1: intervals", 6, tierY + 12);

      // Moving boundaries
      let startX = -(offset % totalCycle);
      while (startX < width) {
        let curX = startX;
        for (let seg of segments) {
          const nextX = curX + seg.dur;
          if (nextX > 0 && curX < width) {
            // Boundary Line
            ctx.strokeStyle = "#111111";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(curX, 0);
            ctx.lineTo(curX, height);
            ctx.stroke();

            // Interval Label
            ctx.fillStyle = seg.type === "vowel" ? "#E30613" : "#111111";
            ctx.font = "bold 13px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(seg.label, (curX + nextX) / 2, tierY + tierH / 2 + 4);
          }
          curX = nextX;
        }
        startX += totalCycle;
      }

      // Red Playhead Cursor
      const playheadX = width * 0.45;
      ctx.strokeStyle = "#E30613";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      offset += 0.8;
      requestAnimationFrame(drawAnnotator);
    }
    requestAnimationFrame(drawAnnotator);
  }

  /* ==========================================================================
     DEMO 2: IPA Editor Interactive Typing Simulator & Dynamic Unicode Tags
     ========================================================================== */
  const ipaInputBox = document.getElementById("demo-ipa-output");
  const ipaTag = document.getElementById("ipa-active-tag");
  const ipaKeys = document.querySelectorAll(".demo-ipa-key");

  if (ipaInputBox && ipaKeys.length > 0) {
    const sequences = [
      [
        { char: "t", keyId: "key-t", code: "U+0074 [ t ]" },
        { char: "ʃ", keyId: "key-esh", code: "U+0283 [ ʃ ]" },
        { char: "oː", keyId: "key-colon", code: "U+02D0 [ ː ]" },
        { char: "k", keyId: "key-k", code: "U+006B [ k ]" },
        { char: "j", keyId: "key-j", code: "U+006A [ j ]" },
        { char: "oː", keyId: "key-colon", code: "U+02D0 [ ː ]" },
        { char: " ˥˩", keyId: "key-tone", code: "U+02E5-U+02E9 [ ˥˩ ]" }
      ],
      [
        { char: "n", keyId: "key-n", code: "U+006E [ n ]" },
        { char: "i", keyId: "key-i", code: "U+0069 [ i ]" },
        { char: "h", keyId: "key-h", code: "U+0068 [ h ]" },
        { char: "o", keyId: "key-o", code: "U+006F [ o ]" },
        { char: "ɴ", keyId: "key-cap-n", code: "U+0274 [ ɴ ]" },
        { char: " ˨˦", keyId: "key-tone", code: "U+02E8-U+02E6 [ ˨˦ ]" }
      ]
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let currentText = "";

    function stepTyping() {
      const currentWord = sequences[wordIdx];
      if (charIdx >= currentWord.length) {
        setTimeout(() => {
          currentText = "";
          ipaInputBox.textContent = "";
          if (ipaTag) ipaTag.textContent = "READY";
          charIdx = 0;
          wordIdx = (wordIdx + 1) % sequences.length;
          stepTyping();
        }, 2400);
        return;
      }

      const item = currentWord[charIdx];
      const targetBtn = document.getElementById(item.keyId);

      if (targetBtn) {
        targetBtn.classList.add("key-active");
        setTimeout(() => targetBtn.classList.remove("key-active"), 220);
      }

      if (ipaTag) {
        ipaTag.textContent = item.code;
      }

      currentText += item.char;
      ipaInputBox.textContent = currentText;
      charIdx++;

      setTimeout(stepTyping, 420);
    }

    setTimeout(stepTyping, 800);
  }

  /* ==========================================================================
     DEMO 3: Syntax Tree Editor Dynamic SVG Tree Simulator
     ========================================================================== */
  const treeSvg = document.getElementById("demo-tree-svg");
  if (treeSvg) {
    const nodes = ["node-tp", "node-dp1", "node-tbar", "node-vp"];
    let step = 0;

    function pulseTree() {
      nodes.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          if (idx === step) {
            el.classList.add("node-pulsing");
          } else {
            el.classList.remove("node-pulsing");
          }
        }
      });

      step = (step + 1) % nodes.length;
      setTimeout(pulseTree, 1200);
    }

    pulseTree();
  }

  /* ==========================================================================
     DEMO 4: Phonological Rule Editor Interactive Assembler
     ========================================================================== */
  const ruleContainer = document.getElementById("demo-rule-container");
  if (ruleContainer) {
    const parts = [
      "rule-part-input",
      "rule-part-arrow",
      "rule-part-output",
      "rule-part-slash",
      "rule-part-env",
      "rule-part-matrix",
      "rule-part-latex"
    ];

    let activePartIdx = 0;

    function stepRuleHighlight() {
      parts.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          if (idx === activePartIdx) {
            el.classList.add("part-highlight");
          } else {
            el.classList.remove("part-highlight");
          }
        }
      });

      activePartIdx = (activePartIdx + 1) % parts.length;
      setTimeout(stepRuleHighlight, 900);
    }

    stepRuleHighlight();
  }
})();
