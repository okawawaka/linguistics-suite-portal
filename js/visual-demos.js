/**
 * Linguistics Suite Portal — Authentic & Fluid Visual Interactive Demos
 * Pixel-perfect, high-frame-rate synchronized animations for all 4 linguistics tools:
 * 1. Acoustic Annotator: Sweeping Playhead, Responsive DSP Waveform, STFT Spectrogram, Real-time Praat TextGrid & VU Meter
 * 2. IPA Editor: Rhythmic Typing, IPA Chart Matrix Key-Strike, Smooth Status Ticker, and Chao Tone Synthesis
 * 3. Syntax Tree Editor: Step-by-Step Bracket Parser & Dynamic Tree Node Pulse with Fluid Movement Dash Trace
 * 4. Phonological Rule Editor: 4-Block Pipeline, Distinctive SPE Matrix Scanning, and KaTeX Equation Real-time Render
 */

(function () {
  "use strict";

  /* ==========================================================================
     DEMO 1: ACOUSTIC ANNOTATOR & PRAAT RUNTIME (SMOOTH PLAYHEAD SWEEP)
     ========================================================================== */
  const annotatorCanvas = document.getElementById("demo-annotator-canvas");
  const minimapCanvas = document.getElementById("demo-annotator-minimap");
  const minimapSlider = document.getElementById("minimap-slider");
  const inspectorText = document.getElementById("annotator-inspector-info");
  const vuLeds = Array.from({ length: 8 }, (_, i) => document.getElementById(`vu-${i}`));
  const progTotal = document.getElementById("prog-total");
  const progWord = document.getElementById("prog-word");
  const progSel = document.getElementById("prog-sel");

  if (annotatorCanvas) {
    const ctx = annotatorCanvas.getContext("2d");
    let mCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;
    let width = 0;
    let height = 230;

    function resizeAnnotator() {
      const dpr = window.devicePixelRatio || 1;
      const rect = annotatorCanvas.parentElement.getBoundingClientRect();
      width = Math.floor(rect.width || 480);
      height = Math.floor(rect.height || 230);

      annotatorCanvas.width = width * dpr;
      annotatorCanvas.height = height * dpr;
      annotatorCanvas.style.width = width + "px";
      annotatorCanvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (minimapCanvas && mCtx) {
        const mRect = minimapCanvas.parentElement.getBoundingClientRect();
        const mW = Math.floor(mRect.width || width);
        minimapCanvas.width = mW * dpr;
        minimapCanvas.height = 20 * dpr;
        minimapCanvas.style.width = mW + "px";
        minimapCanvas.style.height = "20px";
        mCtx.setTransform(1, 0, 0, 1, 0, 0);
        mCtx.scale(dpr, dpr);
        drawMinimap(mW, 20);
      }
    }
    window.addEventListener("resize", resizeAnnotator);
    window.addEventListener("load", resizeAnnotator);

    // Static minimap envelope draw
    function drawMinimap(mW, mH) {
      if (!mCtx) return;
      mCtx.clearRect(0, 0, mW, mH);
      mCtx.fillStyle = "#1E1E1E";
      mCtx.fillRect(0, 0, mW, mH);

      mCtx.strokeStyle = "#4B5563";
      mCtx.lineWidth = 1;
      mCtx.beginPath();
      for (let x = 0; x < mW; x += 3) {
        const h = Math.abs(Math.sin(x * 0.08) * Math.cos(x * 0.025)) * (mH * 0.72);
        mCtx.moveTo(x, (mH - h) / 2);
        mCtx.lineTo(x, (mH + h) / 2);
      }
      mCtx.stroke();
    }

    // Phone tier intervals (durations in ratio to total width) - [ sumomo ]
    const phoneList = [
      { label: "sil", durRatio: 0.08, type: "sil", f0: 0, f1: 0, f2: 0, amp: 0.05 },
      { label: "s", durRatio: 0.12, type: "fric", f0: 0, f1: 350, f2: 4500, amp: 0.45 },
      { label: "u", durRatio: 0.14, type: "vowel", f0: 178, f1: 360, f2: 1120, amp: 0.72 },
      { label: "m", durRatio: 0.12, type: "nasal", f0: 164, f1: 300, f2: 1200, amp: 0.50 },
      { label: "o", durRatio: 0.16, type: "vowel", f0: 172, f1: 520, f2: 950, amp: 0.85 },
      { label: "m", durRatio: 0.12, type: "nasal", f0: 160, f1: 300, f2: 1200, amp: 0.48 },
      { label: "o", durRatio: 0.16, type: "vowel", f0: 152, f1: 500, f2: 920, amp: 0.80 },
      { label: "sil", durRatio: 0.10, type: "sil", f0: 0, f1: 0, f2: 0, amp: 0.05 }
    ];

    let playProgress = 0; // 0.0 to 1.0

    function drawAnnotator() {
      if (width === 0) return;
      ctx.clearRect(0, 0, width, height);

      // Proportional vertical layout
      const waveH = Math.round(height * 0.35);
      const specH = Math.round(height * 0.39);
      const tier1H = Math.round(height * 0.12);
      const tier2H = height - waveH - specH - tier1H;

      const tier1Y = waveH + specH;
      const tier2Y = tier1Y + tier1H;

      // ------------------------------------------------------------------
      // 1. WAVEFORM OSCILLOGRAM
      // ------------------------------------------------------------------
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, waveH);
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, waveH);

      // Center baseline
      ctx.strokeStyle = "rgba(17,17,17,0.15)";
      ctx.beginPath();
      ctx.moveTo(0, waveH / 2);
      ctx.lineTo(width, waveH / 2);
      ctx.stroke();

      // Scale text
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 8px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("+1.0", 4, 10);
      ctx.fillText("0.0", 4, waveH / 2 + 3);
      ctx.fillText("-1.0", 4, waveH - 3);

      // Static realistic audio waveform shape
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        const normX = x / width;
        // Calculate envelope based on phone intervals
        let segAmp = 0.1;
        let acc = 0;
        for (let p of phoneList) {
          if (normX >= acc && normX < acc + p.durRatio) {
            segAmp = p.amp;
            break;
          }
          acc += p.durRatio;
        }

        const t = x * 0.12;
        const wave = (Math.sin(t * 2.8) * 0.65 + Math.sin(t * 6.5) * 0.35) * (segAmp * waveH * 0.42);
        const y = waveH / 2 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = "#111111";
      ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
      ctx.fillText("OSCILLOGRAM (AUDIO WAVEFORM)", 38, 12);

      // ------------------------------------------------------------------
      // 2. STFT SPECTROGRAM + F0 + LPC FORMANTS
      // ------------------------------------------------------------------
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, waveH, width, specH);

      // Frequency bands
      const colW = 4;
      for (let x = 0; x < width; x += colW) {
        const normX = x / width;
        let segAmp = 0.1;
        let acc = 0;
        for (let p of phoneList) {
          if (normX >= acc && normX < acc + p.durRatio) {
            segAmp = p.amp;
            break;
          }
          acc += p.durRatio;
        }

        const f1Y = waveH + specH * 0.74 - segAmp * 16;
        const f2Y = waveH + specH * 0.48 - segAmp * 20;
        const f3Y = waveH + specH * 0.24 - segAmp * 12;

        ctx.fillStyle = `rgba(227, 6, 19, ${0.12 + segAmp * 0.4})`;
        ctx.fillRect(x, f1Y, colW - 1, 14);

        ctx.fillStyle = `rgba(180, 190, 205, ${0.1 + segAmp * 0.25})`;
        ctx.fillRect(x, f2Y, colW - 1, 10);
        ctx.fillRect(x, f3Y, colW - 1, 8);
      }

      // Frequency markers
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "7.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText("5000Hz", width - 6, waveH + 11);
      ctx.fillText("2500Hz", width - 6, waveH + specH / 2);
      ctx.fillText("0Hz", width - 6, waveH + specH - 4);

      // F0 pitch contour (Cyan points)
      ctx.fillStyle = "#06B6D4";
      for (let x = 0; x < width; x += 7) {
        const normX = x / width;
        let f0Val = 0;
        let acc = 0;
        for (let p of phoneList) {
          if (normX >= acc && normX < acc + p.durRatio) {
            f0Val = p.f0;
            break;
          }
          acc += p.durRatio;
        }
        if (f0Val > 0) {
          const pitchY = waveH + specH * 0.84 - (f0Val / 300) * (specH * 0.38);
          ctx.beginPath();
          ctx.arc(x, pitchY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Burg LPC Formant dots (Red)
      for (let x = 0; x < width; x += 9) {
        const normX = x / width;
        let f1 = 0, f2 = 0;
        let acc = 0;
        for (let p of phoneList) {
          if (normX >= acc && normX < acc + p.durRatio) {
            f1 = p.f1;
            f2 = p.f2;
            break;
          }
          acc += p.durRatio;
        }
        if (f1 > 0) {
          ctx.fillStyle = "#E30613";
          ctx.beginPath();
          ctx.arc(x, waveH + specH - (f1 / 5000) * specH, 1.8, 0, Math.PI * 2);
          ctx.arc(x, waveH + specH - (f2 / 5000) * specH, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
      ctx.fillText("STFT SPECTROGRAM (0-5000Hz) & F0/LPC", 8, waveH + 13);

      // ------------------------------------------------------------------
      // 3. PRAAT TEXTGRID TIERS
      // ------------------------------------------------------------------
      // Tier 1: Words
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(0, tier1Y, width, tier1H);
      ctx.strokeStyle = "#D1D5DB";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, tier1Y, width, tier1H);

      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 7.5px 'JetBrains Mono', monospace";
      ctx.fillText("1: Words", 6, tier1Y + tier1H / 2 + 3);

      const wordStartX = width * 0.08;
      const wordEndX = width * 0.89;

      // Word boundary lines
      ctx.strokeStyle = "#9CA3AF";
      ctx.beginPath();
      ctx.moveTo(wordStartX, tier1Y);
      ctx.lineTo(wordStartX, tier1Y + tier1H);
      ctx.moveTo(wordEndX, tier1Y);
      ctx.lineTo(wordEndX, tier1Y + tier1H);
      ctx.stroke();

      ctx.fillStyle = "#111111";
      ctx.font = "bold 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("[ sumomo ]", (wordStartX + wordEndX) / 2, tier1Y + tier1H / 2);

      // Tier 2: Phones
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(0, tier2Y, width, tier2H);
      ctx.strokeRect(0, tier2Y, width, tier2H);

      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 7.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("2: Phones", 6, tier2Y + tier2H / 2 + 3);

      // Calculate Playhead Position
      const playheadX = playProgress * width;

      // Draw Phone Intervals and highlight active one
      let currentAccX = 0;
      let activePhoneObj = phoneList[0];

      for (let p of phoneList) {
        const segW = p.durRatio * width;
        const startX = currentAccX;
        const endX = startX + segW;
        const isCurrent = playheadX >= startX && playheadX < endX;

        if (isCurrent) {
          activePhoneObj = p;
          // Active cell light-blue fill
          ctx.fillStyle = "rgba(37, 99, 235, 0.18)";
          ctx.fillRect(startX, tier2Y, segW, tier2H);
        }

        // Boundary line
        ctx.strokeStyle = "#9CA3AF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, tier2Y);
        ctx.lineTo(startX, tier2Y + tier2H);
        ctx.stroke();

        // Phone label
        ctx.fillStyle = isCurrent ? "#E30613" : "#111111";
        ctx.font = isCurrent ? "bold 12px 'Noto Sans JP', sans-serif" : "600 11px 'Noto Sans JP', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, (startX + endX) / 2, tier2Y + tier2H / 2);

        currentAccX = endX;
      }

      // ------------------------------------------------------------------
      // 4. SWEEPING PLAYHEAD CURSOR (Praat Red Needle)
      // ------------------------------------------------------------------
      ctx.strokeStyle = "#E30613";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      // Needle head triangle
      ctx.fillStyle = "#E30613";
      ctx.beginPath();
      ctx.moveTo(playheadX - 4, 0);
      ctx.lineTo(playheadX + 4, 0);
      ctx.lineTo(playheadX, 6);
      ctx.closePath();
      ctx.fill();

      // ------------------------------------------------------------------
      // 5. UPDATE UI SYNCHRONIZATIONS
      // ------------------------------------------------------------------
      // Update text inspector
      if (inspectorText) {
        const curSec = (playProgress * 2.45).toFixed(3);
        const f0Disp = activePhoneObj.f0 > 0 ? `${activePhoneObj.f0}Hz` : "---";
        const f1Disp = activePhoneObj.f1 > 0 ? `${activePhoneObj.f1}Hz` : "---";
        const f2Disp = activePhoneObj.f2 > 0 ? `${activePhoneObj.f2}Hz` : "---";
        inspectorText.textContent = `T: ${curSec}s | [${activePhoneObj.label}] F0: ${f0Disp} | F1: ${f1Disp} | F2: ${f2Disp}`;
      }

      // Update LED VU Meter based on active phone amplitude
      if (vuLeds.length === 8 && vuLeds[0]) {
        const litCount = Math.min(8, Math.round(activePhoneObj.amp * 8.5));
        vuLeds.forEach((led, idx) => {
          if (idx < litCount) led.classList.add("lit");
          else led.classList.remove("lit");
        });
      }

      // Update Minimap Viewport slider
      if (minimapSlider) {
        minimapSlider.style.left = `${playProgress * 62}%`;
      }

      // Update Praat PlayBars progress fills
      if (progTotal) progTotal.style.width = `${playProgress * 100}%`;
      if (progWord) {
        const wStart = 0.08, wEnd = 0.89;
        if (playProgress >= wStart && playProgress <= wEnd) {
          progWord.style.width = `${((playProgress - wStart) / (wEnd - wStart)) * 100}%`;
        } else {
          progWord.style.width = playProgress > wEnd ? "100%" : "0%";
        }
      }
      if (progSel) {
        // Find current interval progress
        let acc = 0;
        for (let p of phoneList) {
          if (playProgress >= acc && playProgress < acc + p.durRatio) {
            progSel.style.width = `${((playProgress - acc) / p.durRatio) * 100}%`;
            break;
          }
          acc += p.durRatio;
        }
      }

      // Increment progress smoothly (approx 3.2s loop)
      playProgress += 0.0035;
      if (playProgress > 1) {
        playProgress = 0;
      }
    }

    let annotatorActive = false;
    let annotatorAnimId = null;

    function renderAnnotatorLoop() {
      if (!annotatorActive) return;
      drawAnnotator();
      annotatorAnimId = requestAnimationFrame(renderAnnotatorLoop);
    }

    resizeAnnotator();

    if ("IntersectionObserver" in window) {
      const annotatorObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!annotatorActive) {
              annotatorActive = true;
              annotatorAnimId = requestAnimationFrame(renderAnnotatorLoop);
            }
          } else {
            annotatorActive = false;
            if (annotatorAnimId) {
              cancelAnimationFrame(annotatorAnimId);
              annotatorAnimId = null;
            }
          }
        });
      }, { threshold: 0.05 });
      annotatorObs.observe(annotatorCanvas.closest(".visual-monitor-frame") || annotatorCanvas);
    } else {
      annotatorActive = true;
      annotatorAnimId = requestAnimationFrame(renderAnnotatorLoop);
    }
  }

  /* ==========================================================================
     DEMO 2: IPA KEYBOARD & PHONETIC MATRIX (RHYTHMIC TYPING & FLASH)
     ========================================================================== */
  const ipaOutput = document.getElementById("demo-ipa-output");
  const ipaCharCounter = document.getElementById("ipa-char-counter");
  const ipaStatusSym = document.getElementById("ipa-status-symbol");
  const ipaStatusDesc = document.getElementById("ipa-status-desc");
  const matrixKeys = document.querySelectorAll(".demo-matrix-key, .demo-tone-btn");
  const ipaClearBtn = document.getElementById("demo-ipa-clear");

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
    "˧˥": "高上昇調 Chao Tone 35 (High Rising)",
    "a": "非円唇前舌広母音 / Open front unrounded vowel",
    "i": "非円唇前舌狭母音 / Close front unrounded vowel",
    "u": "円唇後舌狭母音 / Close back rounded vowel",
    "e": "非円唇前舌半狭母音 / Close-mid front unrounded vowel",
    "o": "円唇後舌半狭母音 / Close-mid back rounded vowel"
  };

  if (ipaOutput) {
    const sequences = [
      // 1. namamugi (生麦)
      [
        { ipa: "n", desc: ipaSymbolData["n"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "u", desc: ipaSymbolData["u"] },
        { ipa: "ɡ", desc: ipaSymbolData["ɡ"] },
        { ipa: "i", desc: ipaSymbolData["i"] }
      ],
      // 2. namagome (生米)
      [
        { ipa: "n", desc: ipaSymbolData["n"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "ɡ", desc: ipaSymbolData["ɡ"] },
        { ipa: "o", desc: ipaSymbolData["o"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "e", desc: ipaSymbolData["e"] }
      ],
      // 3. namatamago (生卵)
      [
        { ipa: "n", desc: ipaSymbolData["n"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "t", desc: ipaSymbolData["t"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "m", desc: ipaSymbolData["m"] },
        { ipa: "a", desc: ipaSymbolData["a"] },
        { ipa: "ɡ", desc: ipaSymbolData["ɡ"] },
        { ipa: "o", desc: ipaSymbolData["o"] }
      ]
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let currentBuffer = "";
    let ipaTimer = null;
    let ipaActive = false;

    function scheduleIpaNext(delay) {
      if (!ipaActive) return;
      if (ipaTimer) clearTimeout(ipaTimer);
      ipaTimer = setTimeout(stepIpaSimulation, delay);
    }

    function stepIpaSimulation() {
      if (!ipaActive) return;
      const currentWord = sequences[wordIdx];

      if (charIdx >= currentWord.length) {
        // Word complete: wait, then clear and next word
        ipaTimer = setTimeout(() => {
          if (!ipaActive) return;
          if (ipaClearBtn) {
            ipaClearBtn.classList.add("act-highlight");
            setTimeout(() => ipaClearBtn.classList.remove("act-highlight"), 200);
          }
          currentBuffer = "";
          ipaOutput.textContent = "";
          if (ipaCharCounter) ipaCharCounter.textContent = "0 CHARS";
          if (ipaStatusSym) ipaStatusSym.textContent = "[ READY ]";
          if (ipaStatusDesc) ipaStatusDesc.textContent = "国際音声字母 (IPA) リアルタイム合字入力システム";
          charIdx = 0;
          wordIdx = (wordIdx + 1) % sequences.length;
          scheduleIpaNext(600);
        }, 2200);
        return;
      }

      const item = currentWord[charIdx];
      currentBuffer += item.ipa;
      ipaOutput.textContent = currentBuffer;
      if (ipaCharCounter) ipaCharCounter.textContent = `${currentBuffer.length} CHARS`;

      if (ipaStatusSym) ipaStatusSym.textContent = `[ ${item.ipa} ]`;
      if (ipaStatusDesc) ipaStatusDesc.textContent = item.desc;

      // Strike matrix key highlight
      const matchBtn = Array.from(matrixKeys).find(btn => btn.getAttribute("data-ipa") === item.ipa);
      if (matchBtn) {
        matchBtn.classList.add("key-active");
        setTimeout(() => matchBtn.classList.remove("key-active"), 280);
      }

      charIdx++;
      scheduleIpaNext(380);
    }

    const ipaContainer = ipaOutput.closest(".visual-monitor-frame") || ipaOutput;
    if ("IntersectionObserver" in window) {
      const ipaObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!ipaActive) {
              ipaActive = true;
              scheduleIpaNext(400);
            }
          } else {
            ipaActive = false;
            if (ipaTimer) {
              clearTimeout(ipaTimer);
              ipaTimer = null;
            }
          }
        });
      }, { threshold: 0.05 });
      ipaObs.observe(ipaContainer);
    } else {
      ipaActive = true;
      scheduleIpaNext(800);
    }

    // Interactive user clicks
    matrixKeys.forEach(btn => {
      btn.addEventListener("click", () => {
        const char = btn.getAttribute("data-ipa");
        if (!char) return;
        currentBuffer += char;
        ipaOutput.textContent = currentBuffer;
        if (ipaCharCounter) ipaCharCounter.textContent = `${currentBuffer.length} CHARS`;
        if (ipaStatusSym) ipaStatusSym.textContent = `[ ${char} ]`;
        if (ipaStatusDesc) ipaStatusDesc.textContent = ipaSymbolData[char] || btn.getAttribute("data-desc") || "Phonetic Symbol";
        btn.classList.add("key-active");
        setTimeout(() => btn.classList.remove("key-active"), 220);
      });
    });

    if (ipaClearBtn) {
      ipaClearBtn.addEventListener("click", () => {
        currentBuffer = "";
        ipaOutput.textContent = "";
        if (ipaCharCounter) ipaCharCounter.textContent = "0 CHARS";
      });
    }
  }

  /* ==========================================================================
     DEMO 3: SYNTAX TREE EDITOR (STEP-BY-STEP BRACKET & TREE NODE PULSE)
     ========================================================================== */
  const treeNodes = ["node-tp", "node-dp1", "node-tbar", "node-vp"];
  const codeLines = document.querySelectorAll(".demo-tree-code-box .code-line");
  const branchArrow = document.getElementById("branch-arrow");
  const btnSnp = document.getElementById("btn-tree-mode-snp");
  const btnTpdp = document.getElementById("btn-tree-mode-tpdp");

  if (treeNodes.length > 0) {
    let step = 0;

    function stepTreeParser() {
      // 1. Highlight tree node
      treeNodes.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          if (idx === step) {
            el.classList.add("node-pulsing");
          } else {
            el.classList.remove("node-pulsing");
          }
        }
      });

      // 2. Highlight code line in editor
      codeLines.forEach((line, idx) => {
        if (idx === step + 1) {
          line.classList.add("active-line");
        } else {
          line.classList.remove("active-line");
        }
      });

      // 3. Highlight movement arrow on VP step
      if (branchArrow) {
        if (step === 3) {
          branchArrow.style.filter = "drop-shadow(0 0 4px #E30613)";
        } else {
          branchArrow.style.filter = "none";
        }
      }

      step = (step + 1) % treeNodes.length;
      if (syntaxActive) {
        syntaxTimer = setTimeout(stepTreeParser, 1300);
      }
    }

    let syntaxActive = false;
    let syntaxTimer = null;

    const syntaxContainer = document.querySelector("#syntax .visual-monitor-frame") || document.getElementById("syntax");
    if (syntaxContainer && "IntersectionObserver" in window) {
      const syntaxObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!syntaxActive) {
              syntaxActive = true;
              syntaxTimer = setTimeout(stepTreeParser, 400);
            }
          } else {
            syntaxActive = false;
            if (syntaxTimer) {
              clearTimeout(syntaxTimer);
              syntaxTimer = null;
            }
          }
        });
      }, { threshold: 0.05 });
      syntaxObs.observe(syntaxContainer);
    } else {
      syntaxActive = true;
      stepTreeParser();
    }

    // Toggle S/NP vs TP/DP framework
    function setGrammarFramework(mode) {
      if (mode === "snp") {
        if (btnSnp) btnSnp.classList.add("active-state");
        if (btnTpdp) btnTpdp.classList.remove("active-state");
        const rootText = document.querySelector("#node-tp text");
        if (rootText) rootText.textContent = "S";
        const dpText = document.querySelector("#node-dp1 text");
        if (dpText) dpText.firstChild.textContent = "NP";
        const tbarText = document.querySelector("#node-tbar text");
        if (tbarText) tbarText.textContent = "VP";
      } else {
        if (btnTpdp) btnTpdp.classList.add("active-state");
        if (btnSnp) btnSnp.classList.remove("active-state");
        const rootText = document.querySelector("#node-tp text");
        if (rootText) rootText.textContent = "TP";
        const dpText = document.querySelector("#node-dp1 text");
        if (dpText) dpText.firstChild.textContent = "DP";
        const tbarText = document.querySelector("#node-tbar text");
        if (tbarText) tbarText.textContent = "T'";
      }
    }

    if (btnSnp && btnTpdp) {
      btnSnp.addEventListener("click", () => setGrammarFramework("snp"));
      btnTpdp.addEventListener("click", () => setGrammarFramework("tpdp"));

      // Gentle auto toggle to showcase both systems
      let currentMode = "tpdp";
      setInterval(() => {
        currentMode = currentMode === "tpdp" ? "snp" : "tpdp";
        setGrammarFramework(currentMode);
      }, 7000);
    }
  }

  /* ==========================================================================
     DEMO 4: PHONOLOGICAL RULE EDITOR (PIPELINE & MATRIX SCANNING)
     ========================================================================== */
  const ruleBlocks = [
    document.getElementById("rule-b-target"),
    document.getElementById("rule-b-change"),
    document.getElementById("rule-b-env-r"),
    document.getElementById("rule-part-matrix"),
    document.getElementById("rule-part-latex")
  ];

  const synChunks = [
    document.getElementById("syn-target"),
    document.getElementById("syn-change"),
    document.getElementById("syn-env")
  ];

  const matrixFeats = [
    document.getElementById("feat-1"), // +coronal
    document.getElementById("feat-2"), // -anterior
    document.getElementById("feat-3")  // +delayed release
  ];

  const btnOpArrow = document.getElementById("btn-op-arrow");
  const btnOpGreater = document.getElementById("btn-op-greater");
  const synOp = document.getElementById("demo-syn-op");
  const builderArrow = document.getElementById("builder-arrow");
  const mathArr = document.getElementById("math-arr");
  const katexPreview = document.getElementById("demo-katex-rendered");

  let pipelineStep = 0;

  function stepRulePipeline() {
    // Reset all highlights
    ruleBlocks.forEach(b => b && b.classList.remove("active-step"));
    synChunks.forEach(c => c && (c.style.color = "#111111"));
    matrixFeats.forEach(f => f && f.classList.remove("active-feat"));
    if (katexPreview) katexPreview.classList.remove("active-preview");

    if (pipelineStep === 0) {
      // Step 0: Target (/s/)
      if (ruleBlocks[0]) ruleBlocks[0].classList.add("active-step");
      if (synChunks[0]) synChunks[0].style.color = "#E30613";
    } else if (pipelineStep === 1) {
      // Step 1: Change ([ʃ])
      if (ruleBlocks[1]) ruleBlocks[1].classList.add("active-step");
      if (synChunks[1]) synChunks[1].style.color = "#E30613";
    } else if (pipelineStep === 2) {
      // Step 2: Environment (/ _ [i])
      if (ruleBlocks[2]) ruleBlocks[2].classList.add("active-step");
      if (synChunks[2]) synChunks[2].style.color = "#E30613";
    } else if (pipelineStep === 3) {
      // Step 3: Scan SPE Feature Matrix
      if (ruleBlocks[3]) ruleBlocks[3].classList.add("active-step");
      matrixFeats.forEach((f, idx) => {
        setTimeout(() => {
          if (f) f.classList.add("active-feat");
        }, idx * 120);
      });
    } else if (pipelineStep === 4) {
      // Step 4: Render Live KaTeX Formula
      if (ruleBlocks[4]) ruleBlocks[4].classList.add("active-step");
      if (katexPreview) katexPreview.classList.add("active-preview");
    }

    pipelineStep = (pipelineStep + 1) % 5;
    if (phonologyActive) {
      phonologyTimer = setTimeout(stepRulePipeline, 1100);
    }
  }

  let phonologyActive = false;
  let phonologyTimer = null;

  const phonologyContainer = document.querySelector("#phonology .visual-monitor-frame") || document.getElementById("phonology");
  if (phonologyContainer && "IntersectionObserver" in window) {
    const phonologyObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!phonologyActive) {
            phonologyActive = true;
            phonologyTimer = setTimeout(stepRulePipeline, 400);
          }
        } else {
          phonologyActive = false;
          if (phonologyTimer) {
            clearTimeout(phonologyTimer);
            phonologyTimer = null;
          }
        }
      });
    }, { threshold: 0.05 });
    phonologyObs.observe(phonologyContainer);
  } else {
    phonologyActive = true;
    stepRulePipeline();
  }

  // Operator toggle logic
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

    let currentOp = "arrow";
    setInterval(() => {
      currentOp = currentOp === "arrow" ? "greater" : "arrow";
      setOperator(currentOp);
    }, 6000);
  }
})();
