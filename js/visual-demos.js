/**
 * Linguistics Suite Portal — Authentic Visual Interactive Demos
 * Matches the actual layouts and behaviors of the 4 standalone linguistics applications:
 * 1. Acoustic Annotator: Multi-tier Praat TextGrid, Waveform, STFT Spectrogram, F0 Pitch, LPC Formants, Minimap & LED VU
 * 2. IPA Editor: Scaled IPA Matrix Table, Category Tabs, Status Ticker, Action Keys, and Chao Tone Letters
 * 3. Syntax Tree Editor: Split-pane Penn Treebank Code Editor + Live Vector SVG Tree with Movement Arrows
 * 4. Phonological Rule Editor: Bi-directional Text Notation, 4-Block Builder, SPE Feature Matrix, and Live KaTeX
 */

(function () {
  "use strict";

  /* ==========================================================================
     DEMO 1: ACOUSTIC ANNOTATOR & PRAAT RUNTIME
     ========================================================================== */
  const annotatorCanvas = document.getElementById("demo-annotator-canvas");
  const minimapCanvas = document.getElementById("demo-annotator-minimap");
  const minimapSlider = document.getElementById("minimap-slider");
  const inspectorText = document.getElementById("annotator-inspector-info");
  const vuLeds = Array.from({ length: 8 }, (_, i) => document.getElementById(`vu-${i}`));

  if (annotatorCanvas) {
    const ctx = annotatorCanvas.getContext("2d");
    let mCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;
    let width = 0;
    let height = 230;
    let offset = 0;

    function resizeAnnotator() {
      const dpr = window.devicePixelRatio || 1;
      const rect = annotatorCanvas.parentElement.getBoundingClientRect();
      width = rect.width || 480;
      height = 230;

      annotatorCanvas.width = width * dpr;
      annotatorCanvas.height = height * dpr;
      annotatorCanvas.style.width = width + "px";
      annotatorCanvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (minimapCanvas && mCtx) {
        const mRect = minimapCanvas.parentElement.getBoundingClientRect();
        minimapCanvas.width = mRect.width * dpr;
        minimapCanvas.height = 22 * dpr;
        minimapCanvas.style.width = mRect.width + "px";
        minimapCanvas.style.height = "22px";
        mCtx.setTransform(1, 0, 0, 1, 0, 0);
        mCtx.scale(dpr, dpr);
      }
    }
    window.addEventListener("resize", resizeAnnotator);
    window.addEventListener("load", resizeAnnotator);
    resizeAnnotator();

    // Phones tier segments
    const phoneSegments = [
      { label: "sil", dur: 45, type: "sil", f0: 0, f1: 0, f2: 0 },
      { label: "s", dur: 70, type: "fric", f0: 0, f1: 350, f2: 4500 },
      { label: "a", dur: 95, type: "vowel", f0: 172, f1: 740, f2: 1260 },
      { label: "k", dur: 60, type: "stop", f0: 0, f1: 0, f2: 0 },
      { label: "u", dur: 85, type: "vowel", f0: 185, f1: 380, f2: 1150 },
      { label: "ɾ", dur: 50, type: "tap", f0: 160, f1: 420, f2: 1400 },
      { label: "a", dur: 105, type: "vowel", f0: 154, f1: 760, f2: 1240 },
      { label: "sil", dur: 50, type: "sil", f0: 0, f1: 0, f2: 0 }
    ];
    const totalPhoneCycle = phoneSegments.reduce((sum, s) => sum + s.dur, 0);

    // Static minimap draw
    function drawMinimap() {
      if (!minimapCanvas || !mCtx) return;
      const mW = minimapCanvas.width / (window.devicePixelRatio || 1);
      const mH = 22;
      mCtx.clearRect(0, 0, mW, mH);
      mCtx.fillStyle = "#1E1E1E";
      mCtx.fillRect(0, 0, mW, mH);

      mCtx.strokeStyle = "#4B5563";
      mCtx.lineWidth = 1;
      mCtx.beginPath();
      for (let x = 0; x < mW; x += 3) {
        const h = Math.abs(Math.sin(x * 0.08) * Math.cos(x * 0.03)) * (mH * 0.75);
        mCtx.moveTo(x, (mH - h) / 2);
        mCtx.lineTo(x, (mH + h) / 2);
      }
      mCtx.stroke();
    }
    drawMinimap();

    function drawAnnotator() {
      if (width === 0) return;
      ctx.clearRect(0, 0, width, height);

      const waveH = 75;
      const specH = 95;
      const tier1H = 28; // Words Tier
      const tier2H = 32; // Phones Tier

      // ------------------------------------------------------------------
      // 1. WAVEFORM AREA (0 to 75px)
      // ------------------------------------------------------------------
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, waveH);
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, waveH);

      // Grid line (0 amplitude)
      ctx.strokeStyle = "rgba(17,17,17,0.15)";
      ctx.beginPath();
      ctx.moveTo(0, waveH / 2);
      ctx.lineTo(width, waveH / 2);
      ctx.stroke();

      // Amplitude Scale
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 8px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("+1.0", 4, 10);
      ctx.fillText("0.0", 4, waveH / 2 + 3);
      ctx.fillText("-1.0", 4, waveH - 3);

      // Waveform trace
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let currentSampleAmp = 0;

      for (let x = 0; x < width; x += 2) {
        const t = (x + offset) * 0.055;
        const env = Math.sin((x + offset) * 0.01) * 0.5 + 0.5;
        const wave = (Math.sin(t * 3.4) * 0.65 + Math.sin(t * 8.2) * 0.35) * (env * (waveH * 0.4));
        const y = waveH / 2 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        if (Math.abs(x - width * 0.42) < 3) {
          currentSampleAmp = Math.abs(wave) / (waveH * 0.4);
        }
      }
      ctx.stroke();

      // Top Tag
      ctx.fillStyle = "#111111";
      ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
      ctx.fillText("OSCILLOGRAM (AUDIO WAVEFORM)", 38, 12);

      // ------------------------------------------------------------------
      // 2. STFT SPECTROGRAM + F0 PITCH + FORMANT TRACKS (75 to 170px)
      // ------------------------------------------------------------------
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, waveH, width, specH);

      // Spectrogram color frequency bands
      const colW = 4;
      for (let x = 0; x < width; x += colW) {
        const specEnv = Math.sin((x + offset) * 0.018) * 0.5 + 0.5;
        const f1Y = waveH + specH * 0.74 - specEnv * 18;
        const f2Y = waveH + specH * 0.48 - specEnv * 22;
        const f3Y = waveH + specH * 0.24 - specEnv * 14;

        ctx.fillStyle = `rgba(227, 6, 19, ${0.16 + specEnv * 0.38})`;
        ctx.fillRect(x, f1Y, colW - 1, 14);

        ctx.fillStyle = `rgba(190, 195, 205, ${0.12 + specEnv * 0.24})`;
        ctx.fillRect(x, f2Y, colW - 1, 10);
        ctx.fillRect(x, f3Y, colW - 1, 8);
      }

      // Frequency scale markers (5000Hz, 2500Hz, 0Hz)
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "7.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText("5000Hz", width - 6, waveH + 11);
      ctx.fillText("2500Hz", width - 6, waveH + specH / 2);
      ctx.fillText("0Hz", width - 6, waveH + specH - 4);

      // F0 Pitch dots (Cyan/Blue dots like Praat)
      ctx.fillStyle = "#06B6D4";
      for (let x = 0; x < width; x += 7) {
        const pitchEnv = Math.sin((x + offset) * 0.014) * 0.45 + 0.5;
        if (pitchEnv > 0.28) {
          const pitchY = waveH + specH * 0.82 - pitchEnv * 36;
          ctx.beginPath();
          ctx.arc(x, pitchY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Burg LPC Formant Dots (Red dots F1-F3)
      for (let x = 0; x < width; x += 10) {
        const specEnv = Math.sin((x + offset) * 0.018) * 0.5 + 0.5;
        if (specEnv > 0.25) {
          ctx.fillStyle = "#E30613";
          ctx.beginPath();
          ctx.arc(x, waveH + specH * 0.74 - specEnv * 18 + 7, 1.8, 0, Math.PI * 2);
          ctx.arc(x, waveH + specH * 0.48 - specEnv * 22 + 5, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
      ctx.fillText("STFT SPECTROGRAM (0-5000Hz) & F0/LPC", 8, waveH + 13);

      // ------------------------------------------------------------------
      // 3. PRAAT TEXTGRID TIERS (170px to 230px)
      // ------------------------------------------------------------------
      const tier1Y = waveH + specH;
      const tier2Y = tier1Y + tier1H;

      // Tier 1: Words
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(0, tier1Y, width, tier1H);
      ctx.strokeStyle = "#D1D5DB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, tier1Y, width, tier1H);

      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 7.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("1: Words", 6, tier1Y + 11);

      // Tier 2: Phones
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(0, tier2Y, width, tier2H);
      ctx.strokeRect(0, tier2Y, width, tier2H);

      ctx.fillText("2: Phones", 6, tier2Y + 11);

      // Moving boundaries across tiers
      let startX = -(offset % totalPhoneCycle);
      const playheadX = width * 0.42;
      let activePhone = "a";
      let activeF0 = 172;
      let activeF1 = 740;
      let activeF2 = 1260;

      while (startX < width) {
        let curX = startX;
        for (let seg of phoneSegments) {
          const nextX = curX + seg.dur;
          if (nextX > 0 && curX < width) {
            // Check if playhead is in this segment
            const isSelected = playheadX >= curX && playheadX < nextX;
            if (isSelected) {
              activePhone = seg.label;
              if (seg.f0 > 0) activeF0 = seg.f0;
              if (seg.f1 > 0) activeF1 = seg.f1;
              if (seg.f2 > 0) activeF2 = seg.f2;

              // Highlight selected phone cell
              ctx.fillStyle = "rgba(37, 99, 235, 0.12)";
              ctx.fillRect(curX, tier2Y, seg.dur, tier2H);
            }

            // Phone boundary line
            ctx.strokeStyle = "#9CA3AF";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(curX, tier2Y);
            ctx.lineTo(curX, tier2Y + tier2H);
            ctx.stroke();

            // Phone label
            ctx.fillStyle = isSelected ? "#E30613" : "#111111";
            ctx.font = isSelected ? "bold 12px 'Noto Sans JP', sans-serif" : "600 11px 'Noto Sans JP', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(seg.label, (curX + nextX) / 2, tier2Y + tier2H / 2 + 1);
          }
          curX = nextX;
        }
        startX += totalPhoneCycle;
      }

      // Word level label: "sakura" centered in middle region
      ctx.fillStyle = "#111111";
      ctx.font = "bold 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("[ sakura ]", width * 0.46, tier1Y + tier1H / 2 + 1);

      // Red Playhead Cursor Line
      ctx.strokeStyle = "#E30613";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      // Cursor triangle at top
      ctx.fillStyle = "#E30613";
      ctx.beginPath();
      ctx.moveTo(playheadX - 4, 0);
      ctx.lineTo(playheadX + 4, 0);
      ctx.lineTo(playheadX, 6);
      ctx.closePath();
      ctx.fill();

      // Update Inspector Info in status bar
      if (inspectorText) {
        const timeSec = ((offset * 0.003) % 2.45).toFixed(3);
        inspectorText.textContent = `T: ${timeSec}s | [${activePhone}] F0: ${activeF0}Hz | F1: ${activeF1}Hz | F2: ${activeF2}Hz`;
      }

      // Drive 8-Segment LED VU meter
      if (vuLeds.length === 8 && vuLeds[0]) {
        const litCount = Math.min(8, Math.round(currentSampleAmp * 8.5));
        vuLeds.forEach((led, idx) => {
          if (idx < litCount) {
            led.classList.add("lit");
          } else {
            led.classList.remove("lit");
          }
        });
      }

      // Update Minimap slider position
      if (minimapSlider) {
        const sliderPos = ((offset * 0.05) % 60);
        minimapSlider.style.left = `${20 + sliderPos}%`;
      }

      offset += 0.85;
      requestAnimationFrame(drawAnnotator);
    }
    requestAnimationFrame(drawAnnotator);
  }

  /* ==========================================================================
     DEMO 2: IPA KEYBOARD & PHONETIC MATRIX (AUTHENTIC APP UI)
     ========================================================================== */
  const ipaOutput = document.getElementById("demo-ipa-output");
  const ipaCharCounter = document.getElementById("ipa-char-counter");
  const ipaStatusSym = document.getElementById("ipa-status-symbol");
  const ipaStatusDesc = document.getElementById("ipa-status-desc");
  const matrixKeys = document.querySelectorAll(".demo-matrix-key, .demo-tone-btn");

  const ipaSymbolData = {
    "p": "無声両唇破裂音 / Voiceless bilabial plosive",
    "b": "有声両唇破裂音 / Voiced bilabial plosive",
    "t": "無声歯茎破裂音 / Voiceless alveolar plosive",
    "d": "有声歯茎破裂音 / Voiced alveolar plosive",
    "k": "無声軟口蓋破裂音 / Voiceless velar plosive",
    "ɡ": "有声軟口蓋破裂音 / Voiced velar plosive",
    "ʔ": "声門破裂音 / Glottal stop",
    "m": "有声両唇鼻音 / Voiced bilabial nasal",
    "ɱ": "有声唇歯鼻音 / Voiced labiodental nasal",
    "n": "有声歯茎鼻音 / Voiced alveolar nasal",
    "ŋ": "有声軟口蓋鼻音 / Voiced velar nasal",
    "ɸ": "無声両唇摩擦音 / Voiceless bilabial fricative",
    "β": "有声両唇摩擦音 / Voiced bilabial fricative",
    "f": "無声唇歯摩擦音 / Voiceless labiodental fricative",
    "v": "有声唇歯摩擦音 / Voiced labiodental fricative",
    "s": "無声歯茎摩擦音 / Voiceless alveolar fricative",
    "z": "有声歯茎摩擦音 / Voiced alveolar fricative",
    "ʃ": "無声後部歯茎摩擦音 / Voiceless postalveolar fricative",
    "ʒ": "有声後部歯茎摩擦音 / Voiced postalveolar fricative",
    "x": "無声軟口蓋摩擦音 / Voiceless velar fricative",
    "ɣ": "有声軟口蓋摩擦音 / Voiced velar fricative",
    "h": "無声声門摩擦音 / Voiceless glottal fricative",
    "˥": "高平調 Chao Tone 55 (High Level)",
    "˦": "中高平調 Chao Tone 44 (Mid High)",
    "˧": "中平調 Chao Tone 33 (Mid Level)",
    "˨": "中低平調 Chao Tone 22 (Mid Low)",
    "˩": "低平調 Chao Tone 11 (Low Level)",
    "˥˩": "急下降調 Chao Tone 51 (High Falling)",
    "˧˥": "高上昇調 Chao Tone 35 (High Rising)"
  };

  // Interactive typing sequence simulation
  if (ipaOutput) {
    const sequence = [
      { ipa: "t", desc: ipaSymbolData["t"] },
      { ipa: "ʃ", desc: "無声後部歯茎破擦音 / Voiceless postalveolar affricate (合字結合)" },
      { ipa: "˥˩", desc: ipaSymbolData["˥˩"] },
      { ipa: "k", desc: ipaSymbolData["k"] },
      { ipa: "j", desc: "硬口蓋接近音 / Voiced palatal approximant" },
      { ipa: "o", desc: "半狭後舌円唇母音 / Close-mid back rounded vowel" },
      { ipa: "ː", desc: "長音記号 / Length mark (Diacritic)" },
      { ipa: "˧˥", desc: ipaSymbolData["˧˥"] }
    ];

    let seqIdx = 0;
    let buffer = "";

    function stepIpaSimulation() {
      if (seqIdx >= sequence.length) {
        setTimeout(() => {
          buffer = "";
          ipaOutput.textContent = "";
          if (ipaCharCounter) ipaCharCounter.textContent = "0 CHARS";
          seqIdx = 0;
          stepIpaSimulation();
        }, 2200);
        return;
      }

      const item = sequence[seqIdx];
      buffer += item.ipa;
      ipaOutput.textContent = buffer;
      if (ipaCharCounter) ipaCharCounter.textContent = `${buffer.length} CHARS`;
      if (ipaStatusSym) ipaStatusSym.textContent = `[ ${item.ipa} ]`;
      if (ipaStatusDesc) ipaStatusDesc.textContent = item.desc;

      // Highlight corresponding key in matrix table if present
      const matchBtn = Array.from(matrixKeys).find(btn => btn.getAttribute("data-ipa") === item.ipa);
      if (matchBtn) {
        matchBtn.classList.add("key-active");
        setTimeout(() => matchBtn.classList.remove("key-active"), 280);
      }

      seqIdx++;
      setTimeout(stepIpaSimulation, 650);
    }

    setTimeout(stepIpaSimulation, 1000);

    // Allow user to click any matrix or tone key manually
    matrixKeys.forEach(btn => {
      btn.addEventListener("click", () => {
        const char = btn.getAttribute("data-ipa");
        if (!char) return;
        buffer += char;
        ipaOutput.textContent = buffer;
        if (ipaCharCounter) ipaCharCounter.textContent = `${buffer.length} CHARS`;
        if (ipaStatusSym) ipaStatusSym.textContent = `[ ${char} ]`;
        if (ipaStatusDesc) ipaStatusDesc.textContent = ipaSymbolData[char] || btn.getAttribute("data-desc") || "Phonetic Symbol";
        btn.classList.add("key-active");
        setTimeout(() => btn.classList.remove("key-active"), 200);
      });
    });

    // Clear and action buttons
    const clearBtn = document.getElementById("demo-ipa-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        buffer = "";
        ipaOutput.textContent = "";
        if (ipaCharCounter) ipaCharCounter.textContent = "0 CHARS";
      });
    }

    const backBtn = document.getElementById("demo-ipa-backspace");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        buffer = buffer.slice(0, -1);
        ipaOutput.textContent = buffer;
        if (ipaCharCounter) ipaCharCounter.textContent = `${buffer.length} CHARS`;
      });
    }
  }

  /* ==========================================================================
     DEMO 3: SYNTAX TREE EDITOR & PENN TREEBANK PARSER (AUTHENTIC SPLIT-PANE)
     ========================================================================== */
  const btnSnp = document.getElementById("btn-tree-mode-snp");
  const btnTpdp = document.getElementById("btn-tree-mode-tpdp");
  const treeNodes = ["node-tp", "node-dp1", "node-tbar", "node-vp"];
  const codeLines = document.querySelectorAll(".demo-tree-code-box .code-line");

  if (treeNodes.length > 0) {
    let activeNodeIdx = 0;

    function stepTreeHierarchy() {
      treeNodes.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          if (idx === activeNodeIdx) {
            el.classList.add("node-pulsing");
          } else {
            el.classList.remove("node-pulsing");
          }
        }
      });

      // Synchronize code editor active line highlight
      codeLines.forEach((line, lIdx) => {
        if (lIdx === activeNodeIdx + 1) {
          line.style.backgroundColor = "rgba(227, 6, 19, 0.08)";
        } else {
          line.style.backgroundColor = "transparent";
        }
      });

      activeNodeIdx = (activeNodeIdx + 1) % treeNodes.length;
      setTimeout(stepTreeHierarchy, 1100);
    }
    stepTreeHierarchy();

    // Toggle S/NP vs TP/DP framework
    if (btnSnp && btnTpdp) {
      btnSnp.addEventListener("click", () => {
        btnSnp.classList.add("active-state");
        btnTpdp.classList.remove("active-state");
        const rootText = document.querySelector("#node-tp text");
        if (rootText) rootText.textContent = "S";
        const dpText = document.querySelector("#node-dp1 text");
        if (dpText) dpText.firstChild.textContent = "NP";
        const tbarText = document.querySelector("#node-tbar text");
        if (tbarText) tbarText.textContent = "VP";
      });

      btnTpdp.addEventListener("click", () => {
        btnTpdp.classList.add("active-state");
        btnSnp.classList.remove("active-state");
        const rootText = document.querySelector("#node-tp text");
        if (rootText) rootText.textContent = "TP";
        const dpText = document.querySelector("#node-dp1 text");
        if (dpText) dpText.firstChild.textContent = "DP";
        const tbarText = document.querySelector("#node-tbar text");
        if (tbarText) tbarText.textContent = "T'";
      });
    }
  }

  /* ==========================================================================
     DEMO 4: PHONOLOGICAL RULE EDITOR & SPE MATRIX (AUTHENTIC APP UI)
     ========================================================================== */
  const btnOpArrow = document.getElementById("btn-op-arrow");
  const btnOpGreater = document.getElementById("btn-op-greater");
  const synOp = document.getElementById("demo-syn-op");
  const builderArrow = document.getElementById("builder-arrow");
  const mathArr = document.getElementById("math-arr");

  if (btnOpArrow && btnOpGreater) {
    function setOperator(type) {
      if (type === "arrow") {
        btnOpArrow.classList.add("active-state");
        btnOpGreater.classList.remove("active-state");
        if (synOp) synOp.textContent = "→";
        if (builderArrow) builderArrow.textContent = "→";
        if (mathArr) mathArr.textContent = "⟶";
      } else {
        btnOpGreater.classList.add("active-state");
        btnOpArrow.classList.remove("active-state");
        if (synOp) synOp.textContent = ">";
        if (builderArrow) builderArrow.textContent = ">";
        if (mathArr) mathArr.textContent = ">";
      }
    }

    btnOpArrow.addEventListener("click", () => setOperator("arrow"));
    btnOpGreater.addEventListener("click", () => setOperator("greater"));

    // Subtle automatic toggle cycle to showcase synchronic vs diachronic support
    let currentOp = "arrow";
    setInterval(() => {
      currentOp = currentOp === "arrow" ? "greater" : "arrow";
      setOperator(currentOp);
    }, 4500);
  }
})();
