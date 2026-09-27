/**
 * Linguistics Suite Portal — Internationalization (i18n) Module
 * Swiss Typographic Style / Bilingual Dictionary (JA / EN)
 * Concise, Impactful, Student-Driven Academic Language
 */

const translations = {
  ja: {
    // Header
    metaBrand: "LINGUISTICS SUITE",
    metaSub: "BUILT FOR LINGUISTS BY STUDENTS",
    navTools: "ツール",
    navWorkflow: "ワークフロー",
    navDesign: "デザイン",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB APPS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "言語学専攻の学生による",
    heroTitleLine2: "言語学のためのツール",
    heroLead: "音声分析、IPA入力、構文木、音韻規則。研究とレポートを快適にする、完全無料・ブラウザ完結のオープンソースWebツール群。",
    heroCtaExplore: "ツールを見る ↓",
    heroCtaWorkflow: "ワークフロー →",
    heroStatTools: "4つの特化ツール",
    heroStatServerless: "100% ブラウザ完結",
    heroStatDesign: "スイススタイル",
    heroStatLicense: "完全オープンソース",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / 音響音声学・DSP",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "ブラウザ音響分析 & Praat TextGrid エディタ",
    t1Desc: "ブラウザ内マイクから高音質16-bit PCM録音。Burg LPCフォルマント (F1-F3) 推定、F0ピッチ抽出、母音四辺形プロット、Praat TextGridの作成・編集をサーバー通信なしで瞬時に実行します。",
    t1Spec1: "F0ピッチ軌跡 & Burg LPCフォルマント (F1-F3)",
    t1Spec2: "高精細スペクトログラム & 音響VAD無音自動分割",
    t1Spec3: "F1-F2 母音四辺形プロット (CSV出力対応)",
    t1Spec4: "Praat TextGrid 双方向インポート・エクスポート",
    t1ActionLaunch: "アプリを起動する ↗",
    t1ActionRepo: "GitHub リポジトリ",

    // Tool 2: IPA Editor
    t2Category: "02 / 音声学・記号入力",
    t2Title: "IPA Editor",
    t2Subtitle: "国際音声字母エディタ & 声調記号入力",
    t2Desc: "339のIPA全記号に対応した入力Webエディタ。SIL国際規格の声調バー自動合字（Chao Tone Letters）や結合分音記号の自動合成を備え、クリックひとつでクリップボードにコピーできます。",
    t2Spec1: "全339記号・非肺気流子音・補助記号を完全網羅",
    t2Spec2: "声調バー（Chao Tone Letters）の自動合字合成",
    t2Spec3: "結合分音記号の非破壊自動アタッチ",
    t2Spec4: "ワンクリックコピー & 日英バイリンガルUI",
    t2ActionLaunch: "アプリを起動する ↗",
    t2ActionRepo: "GitHub リポジトリ",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / 統語論・形式文法",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "構文木エディタ & 統語階層可視化",
    t3Desc: "Penn Treebankブラケット記法から美しい構文木をリアルタイム描画。Xバー理論・生成文法体系（TP/DP）と学校文法（S/NP）の切替、三角形ノード、構成素移動矢印、LaTeX・SVG・高解像度PNG出力に対応。",
    t3Spec1: "ブラケット記法（Penn Treebank）リアルタイムパース",
    t3Spec2: "TP/DP学術体系 ＆ S/NP体系のワンクリック切替",
    t3Spec3: "構成素移動矢印（Movement Arrows）と三角形省略記法",
    t3Spec4: "LaTeX（forest / qtree / tikz-qtree） & SVG/PNG出力",
    t3ActionLaunch: "アプリを起動する ↗",
    t3ActionRepo: "GitHub リポジトリ",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / 音韻論・歴史言語学",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "音韻規則・音変化エディタ & KaTeX出力",
    t4Desc: "音韻規則（A → B / C _ D）と音変化（A > B / C _ D）を構造化記述。SPE示差特徴マトリクスや環境条件を美しく整形し、KaTeX数式表示や論文・発表用画像として出力できます。",
    t4Spec1: "共時的規則（→）と通時的音変化（>）の統合エディタ",
    t4Spec2: "SPE示差特徴マトリクスの自動整形",
    t4Spec3: "KaTeX（LaTeX）数式コード生成 & リアルタイムプレビュー",
    t4Spec4: "論文・スライド用ベクターSVG & 高解像度PNGエクスポート",
    t4ActionLaunch: "アプリを起動する ↗",
    t4ActionRepo: "GitHub リポジトリ",

    // Section 2: Workflow (Concise)
    secWorkflowTitle: "RESEARCH PIPELINE",
    secWorkflowSubtitle: "4つのツールがつながる、言語学研究のワークフロー",
    secWorkflowDesc: "音声収録から構文モデリングまで。分断されていた作業をブラウザ上でシームレスにつなぎます。",
    
    wfStep1Num: "01",
    wfStep1Title: "音響分析 (Acoustic Phonetics)",
    wfStep1Desc: "Acoustic Annotator で音声を録音・解析。フォルマントとF0を計測し、TextGrid区間をアノテーション。",

    wfStep2Num: "02",
    wfStep2Title: "記号転記 (Phonetic Transcription)",
    wfStep2Desc: "IPA Editor で音声を正確にテキスト化。声調バーや補助記号をきれいに合字合成。",

    wfStep3Num: "03",
    wfStep3Title: "規則モデル化 (Phonology)",
    wfStep3Desc: "Phonological Rule Editor で音韻変化を定式化。示差特徴マトリクスとKaTeX数式を生成。",

    wfStep4Num: "04",
    wfStep4Title: "構文解析 (Syntax)",
    wfStep4Desc: "Syntax Tree Editor で文全体の階層構造を樹形図化。移動矢印とともに論文用画像を出力。",

    // Section 3: Design (Visual & Kinetic Poster Style)
    secDesignTitle: "SWISS STYLE",
    secDesignSubtitle: "美しさと合理性を追求したスイス・スタイル",
    designKey1: "ZERO CORNERS",
    designDesc1: "角丸ゼロ・装飾シャドウの排除",
    designKey2: "MODULAR GRID",
    designDesc2: "数学的モジュラーグリッド",
    designKey3: "STARK CONTRAST",
    designDesc3: "スイスレッド (#E30613) の焦点シグナル",
    designKey4: "100% LOCAL",
    designDesc4: "サーバー不要・完全なプライバシー保護",

    // Footer
    footerHeading: "LINGUISTICS SUITE",
    footerCopy: "© 2026 okawawaka. Built for linguistics by students.",
    footerLicenseNote: "本スイートの全ツールはオープンソース（MIT / GPL v3）です。学術研究・レポート・授業・教材作成に自由にお使いいただけます。",
    footerBackToTop: "TOP ↑"
  },

  en: {
    // Header
    metaBrand: "LINGUISTICS SUITE",
    metaSub: "BUILT FOR LINGUISTS BY STUDENTS",
    navTools: "TOOLS",
    navWorkflow: "WORKFLOW",
    navDesign: "DESIGN",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB APPS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "Linguistic Tools,",
    heroTitleLine2: "Built by Students, for Linguistics.",
    heroLead: "Acoustic analysis, IPA typing, syntax trees, and phonological rules. A unified suite of free, client-side, open-source web applications.",
    heroCtaExplore: "EXPLORE TOOLS ↓",
    heroCtaWorkflow: "WORKFLOW →",
    heroStatTools: "4 Specialized Apps",
    heroStatServerless: "100% Client-Side",
    heroStatDesign: "Swiss Typographic Style",
    heroStatLicense: "Open Source (MIT / GPL)",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / ACOUSTIC PHONETICS & DSP",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "In-Browser Acoustic Analysis & Praat TextGrid Editor",
    t1Desc: "High-fidelity 16-bit PCM recording directly in browser. Computes Burg LPC formants (F1-F3), autocorrelation pitch tracking, vowel space plots, and Praat TextGrid editing entirely client-side.",
    t1Spec1: "Autocorrelation F0 pitch & Burg LPC formants (F1-F3)",
    t1Spec2: "STFT spectrogram & acoustic VAD silence segmentation",
    t1Spec3: "F1-F2 vowel space quadrilateral chart with CSV export",
    t1Spec4: "Bidirectional Praat TextGrid import and export",
    t1ActionLaunch: "LAUNCH APP ↗",
    t1ActionRepo: "GitHub Repository",

    // Tool 2: IPA Editor
    t2Category: "02 / PHONETICS & TRANSCRIPTION",
    t2Title: "IPA Editor",
    t2Subtitle: "International Phonetic Alphabet & Tone Letter Editor",
    t2Desc: "Modern IPA web editor covering all 339 characters. Features real-time ligature merging for Chao tone letters, combining diacritics, and instant clipboard copying.",
    t2Spec1: "All 339 IPA symbols, non-pulmonic consonants, & diacritics",
    t2Spec2: "SIL-standard Chao Tone Letter ligature merging",
    t2Spec3: "Non-destructive combining diacritic placement",
    t2Spec4: "One-click clipboard copy & bilingual UI",
    t2ActionLaunch: "LAUNCH APP ↗",
    t2ActionRepo: "GitHub Repository",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / FORMAL SYNTAX",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "Syntax Tree Editor & Hierarchical Structure Visualizer",
    t3Desc: "Real-time syntax trees from Penn Treebank bracket notation. Toggle between generative (TP/DP) and pedagogical (S/NP) frameworks with triangle nodes, movement arrows, and LaTeX/SVG/PNG export.",
    t3Spec1: "Real-time Penn Treebank bracket parsing",
    t3Spec2: "Instant toggle: Academic (TP/DP) vs Pedagogical (S/NP)",
    t3Spec3: "Constituent movement arrows & triangle abbreviation nodes",
    t3Spec4: "LaTeX (forest, qtree), SVG, & high-res PNG export",
    t3ActionLaunch: "LAUNCH APP ↗",
    t3ActionRepo: "GitHub Repository",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / PHONOLOGY & HISTORICAL LINGUISTICS",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "Phonological Rule & Sound Change Editor with KaTeX",
    t4Desc: "Structured notation for phonological rules (A → B / C _ D) and historical shifts (A > B / C _ D). Typesets SPE distinctive feature matrices into KaTeX equations and publication-grade SVG/PNG.",
    t4Spec1: "Unified editor for synchronic rules (→) and sound changes (>)",
    t4Spec2: "SPE distinctive feature matrix automatic formatting",
    t4Spec3: "KaTeX / LaTeX equation generation & live preview",
    t4Spec4: "Vector SVG & high-resolution PNG export for papers",
    t4ActionLaunch: "LAUNCH APP ↗",
    t4ActionRepo: "GitHub Repository",

    // Section 2: Workflow
    secWorkflowTitle: "RESEARCH PIPELINE",
    secWorkflowSubtitle: "An Integrated Pipeline Across Linguistic Domains",
    secWorkflowDesc: "From raw acoustic data to formal syntax trees, connect the entire linguistic workflow right in your browser.",
    
    wfStep1Num: "01",
    wfStep1Title: "Acoustic Phonetics",
    wfStep1Desc: "Record and analyze speech with Acoustic Annotator. Track formants and F0, annotating TextGrid intervals.",

    wfStep2Num: "02",
    wfStep2Title: "Phonetic Transcription",
    wfStep2Desc: "Transcribe acoustic cues with IPA Editor. Assemble precise IPA characters and Chao tone ligatures.",

    wfStep3Num: "03",
    wfStep3Title: "Phonological Modeling",
    wfStep3Desc: "Formulate sound alternations with Phonological Rule Editor. Format SPE feature matrices and LaTeX math.",

    wfStep4Num: "04",
    wfStep4Title: "Syntactic Tree Modeling",
    wfStep4Desc: "Model hierarchical sentence structure with Syntax Tree Editor. Generate publication-ready trees with movement arrows.",

    // Section 3: Design
    secDesignTitle: "SWISS STYLE",
    secDesignSubtitle: "Precision & Functional Aesthetics of Swiss Graphic Design",
    designKey1: "ZERO CORNERS",
    designDesc1: "Zero border-radius & zero decorative drop-shadows",
    designKey2: "MODULAR GRID",
    designDesc2: "Rigorous mathematical grid layout",
    designKey3: "STARK CONTRAST",
    designDesc3: "Functional focus signals in Swiss Red (#E30613)",
    designKey4: "100% LOCAL",
    designDesc4: "Zero server uploads, 100% client-side privacy",

    // Footer
    footerHeading: "LINGUISTICS SUITE",
    footerCopy: "© 2026 okawawaka. Built for linguistics by students.",
    footerLicenseNote: "All tools are distributed under open-source licenses (MIT / GPL v3). Free for academic research, education, and student reports.",
    footerBackToTop: "TOP ↑"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem("ling_portal_lang") || "ja";
    this.init();
  }

  init() {
    this.setLanguage(this.currentLang);
    this.bindEvents();
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem("ling_portal_lang", lang);
    document.documentElement.lang = lang;

    // Update active button state
    const jaBtn = document.getElementById("lang-ja");
    const enBtn = document.getElementById("lang-en");
    if (jaBtn && enBtn) {
      if (lang === "ja") {
        jaBtn.classList.add("active");
        enBtn.classList.remove("active");
      } else {
        enBtn.classList.add("active");
        jaBtn.classList.remove("active");
      }
    }

    // Apply translations to data-i18n elements
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[lang][key];
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Apply translations to data-i18n-html elements
    const htmlElements = document.querySelectorAll("[data-i18n-html]");
    htmlElements.forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const translation = translations[lang][key];
      if (translation !== undefined) {
        el.innerHTML = translation;
      }
    });

    // Update page title
    if (lang === "ja") {
      document.title = "言語学・音声学ツールスイート — Linguistics Suite";
    } else {
      document.title = "Linguistics & Phonetics Suite — Open Research Tools";
    }
  }

  bindEvents() {
    const jaBtn = document.getElementById("lang-ja");
    const enBtn = document.getElementById("lang-en");

    if (jaBtn) {
      jaBtn.addEventListener("click", () => this.setLanguage("ja"));
    }
    if (enBtn) {
      enBtn.addEventListener("click", () => this.setLanguage("en"));
    }
  }
}

// Global instance
window.i18n = new I18nManager();
