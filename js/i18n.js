/**
 * Linguistics Suite Portal — Internationalization (i18n) Module
 * Swiss Typographic Style / Bilingual Dictionary (JA / EN)
 */

const translations = {
  ja: {
    // Header
    metaBrand: "LINGUISTICS SUITE",
    metaSub: "RESEARCH & EDUCATION TOOLS",
    navTools: "ツール一覧",
    navWorkflow: "研究ワークフロー",
    navPhilosophy: "設計思想",
    navSpecs: "技術仕様",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "AN OPEN SUITE FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "言語学・音声学を、",
    heroTitleLine2: "極めて精緻に。",
    heroTitleLine3: "ブラウザで完結する。",
    heroLead: "国際音声字母、音響分析、音韻規則、構文木。研究と教育を刷新する、スイススタイルで統一された4つのオープンソースWebアプリケーション群。",
    heroCtaExplore: "ツールを体験する",
    heroCtaWorkflow: "ワークフローを見る",
    heroStatTools: "4つの特化ツール",
    heroStatServerless: "100% クライアント完結",
    heroStatDesign: "国際タイポグラフィ様式",
    heroStatLicense: "オープンソース (MIT / GPL)",

    // Section 1: Tools Showcase
    secToolsTitle: "01 / TOOL SUITE",
    secToolsSubtitle: "専門性の高い4つの独立Webアプリケーション",
    secToolsDesc: "各ツールはインストール不要・サーバー不要でブラウザ上で即座に動作し、高度な計算・描画を完全クライアントサイドで処理します。",

    // Tool 1: Acoustic Annotator
    t1Category: "音響音声学 / DSP & アノテーション",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "ブラウザ音響分析 & Praat TextGrid エディタ",
    t1Desc: "大学院・音声学研究のためのWebネイティブ音響分析スイート。ブラウザ内マイクから16-bit PCM高音質録音を行い、LPC フォルマント軌跡 (Burg法)、F0ピッチ抽出、母音四辺形プロット、音響VADによる自動区間分割を瞬時に実行します。",
    t1Spec1: "自己相関F0ピッチ & Burg LPCフォルマント (F1-F3)",
    t1Spec2: "STFT 高精細スペクトログラム ＆ 音響VAD無音検出",
    t1Spec3: "F1-F2 音響母音四辺形プロット ＆ CSV出力",
    t1Spec4: "Praat TextGrid 双方向インポート・エクスポート",
    t1ActionLaunch: "アプリを起動する ↗",
    t1ActionRepo: "リポジトリ (GitHub)",

    // Tool 2: IPA Editor
    t2Category: "音声学・音標文字 / 字母入力",
    t2Title: "IPA Editor",
    t2Subtitle: "国際音声字母エディタ & 声調記号入力",
    t2Desc: "スイススタイルによる合理的・現代的な国際音声字母（IPA）Webエディタ。339記号を完全網羅し、子音表・母音四辺形・結合分音記号・声調バー（Chao Tone Letters）の合字合成をワンクリックで自在に入力できます。",
    t2Spec1: "全339 IPA記号・非肺気流子音・補助記号を完全網羅",
    t2Spec2: "SIL国際規格に準拠した声調バー自動合字（Ligature）",
    t2Spec3: "基底文字とダイアクリティカルマークの非破壊自動結合",
    t2Spec4: "ワンクリッククリップボードコピー ＆ 国際化UI",
    t2ActionLaunch: "アプリを起動する ↗",
    t2ActionRepo: "リポジトリ (GitHub)",

    // Tool 3: Syntax Tree Editor
    t3Category: "統語論・形式文法 / 樹形図描画",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "構文木エディタ & 統語階層可視化",
    t3Desc: "言語学・統語論のための Penn Treebank 形式構文木エディタ。ブラケット記法からのリアルタイム描画、Xバー理論・学術体系（TP/DP/vP）の即時切替、三角形省略、構成素移動矢印、LaTeX・SVG・高解像度PNG出力に対応します。",
    t3Spec1: "ブラケット記法（Penn Treebank）リアルタイム構文解析",
    t3Spec2: "伝統的体系（S/NP）と生成文法学術体系（TP/DP）の切替",
    t3Spec3: "構成素移動矢印（Movement Arrows）と三角形省略記法",
    t3Spec4: "LaTeX（forest / qtree / tikz-qtree）・SVG・PNGエクスポート",
    t3ActionLaunch: "アプリを起動する ↗",
    t3ActionRepo: "リポジトリ (GitHub)",

    // Tool 4: Phonological Rule Editor
    t4Category: "音韻論・歴史言語学 / 規則記述",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "音韻規則・音変化エディタ & KaTeX出力",
    t4Desc: "音韻規則（共時的規則: A → B / C _ D）および音変化（通時的変化: A > B / C _ D）の構造化記述Webエディタ。SPE示差特徴マトリクス、環境条件のビジュアル整形、KaTeX数式描画、論文用高解像度エクスポートをサポートします。",
    t4Spec1: "共時的音韻規則（→）と通時的音変化（>）の統合記述",
    t4Spec2: "Chomsky-Halle (SPE) 示差特徴マトリクスの自動整形",
    t4Spec3: "KaTeX（LaTeX）数式コード生成 ＆ リアルタイム表示",
    t4Spec4: "SVGベクターグラフィック ＆ 論文用高解像度PNG出力",
    t4ActionLaunch: "アプリを起動する ↗",
    t4ActionRepo: "リポジトリ (GitHub)",

    // Section 2: Workflow
    secWorkflowTitle: "02 / INTEGRATED WORKFLOW",
    secWorkflowSubtitle: "実証的データから形式理論までをつなぐ一連の研究サイクル",
    secWorkflowDesc: "本スイートは、音声学の実験的録音・音響分析から、文字転記、音韻構造の定式化、文構造の統語モデル化まで、言語科学の研究パイプライン全体をシームレスに横断します。",
    
    wfStep1Num: "01",
    wfStep1Title: "音響分析 (Acoustic Phonetics)",
    wfStep1Desc: "Acoustic Annotator で音声を収録。Burg LPC と自己相関法により、基本周波数 (F0) と声道フォルマント (F1-F3) を物理的・定量的に計測・区間アノテーションします。",

    wfStep2Num: "02",
    wfStep2Title: "音声記号転記 (Phonetic Transcription)",
    wfStep2Desc: "得られた音響特徴に基づき、IPA Editor で精密な国際音声字母を入力。声調バーや結合分音記号を直感的に付与し、国際規格のUnicodeテキストを抽出します。",

    wfStep3Num: "03",
    wfStep3Title: "音韻規則化 (Phonological Modeling)",
    wfStep3Desc: "音標テキスト間の交替・変化パターンを Phonological Rule Editor で定式化。示差特徴マトリクスを用いて、同化・脱落・通時的音変化を数理的に可視化・LaTeX化します。",

    wfStep4Num: "04",
    wfStep4Title: "統語構造解析 (Syntactic Tree Modeling)",
    wfStep4Desc: "発話全体の構造を Syntax Tree Editor でモデリング。Xバー理論やミニマリスト・プログラムの仮定に基づき、移動矢印と階層構造を備えた学術品質の樹形図を完成させます。",

    // Section 3: Philosophy
    secPhilosophyTitle: "03 / SWISS STYLE & PHILOSOPHY",
    secPhilosophySubtitle: "スイススタイル（国際タイポグラフィ様式）の美学と設計思想",
    secPhilosophyDesc: "ヨゼフ・ミューラー＝ブロックマンやマックス・ビルに端を発するスイスデザインの客観主義・合理主義を、デジタル学術ツールの設計に完全適用しました。",
    
    phil1Title: "角丸ゼロ・装飾シャドウの排除",
    phil1Desc: "情緒的な装飾や疑似的な立体感（ドロップシャドウ・角丸）を排し、純粋な幾何学平面と境界線によって構造の厳密性を視覚化しています。",

    phil2Title: "数学的モジュラーグリッド",
    phil2Desc: "画面全体のレイアウトは厳格な比率のグリッドシステムに基づき、学術情報・データ・操作パネルが常に整然とした論理的秩序を持って配置されます。",

    phil3Title: "機能的タイポグラフィと色彩",
    phil3Desc: "Stark Black (#111111) と Pure White (#FFFFFF) の強固なコントラストの中に、スイスレッド (#E30613) を焦点・シグナルとして機能的にのみ配置します。",

    phil4Title: "100% クライアントサイド & プライバシー保護",
    phil4Desc: "研究用音声や言語データは外部サーバーに一切送信されません。すべてのDSP計算・パーサー・レンダリングがブラウザ内部で完結するため、機密性の高いフィールドワークデータも安全です。",

    // Footer
    footerHeading: "LINGUISTICS SUITE",
    footerCopy: "© 2026 okawawaka. All tools are open-source and free for research and education.",
    footerLicenseNote: "本スイートの各アプリケーションはオープンソース（MIT / GPL v3）ライセンスのもとで公開されています。研究論文・授業・教材・学術発表での自由な利用を歓迎します。",
    footerBackToTop: "TOP ↑"
  },

  en: {
    // Header
    metaBrand: "LINGUISTICS SUITE",
    metaSub: "RESEARCH & EDUCATION TOOLS",
    navTools: "TOOLS",
    navWorkflow: "WORKFLOW",
    navPhilosophy: "PHILOSOPHY",
    navSpecs: "SPECS",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "AN OPEN SUITE FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "Linguistics & Phonetics,",
    heroTitleLine2: "Engineered with Precision.",
    heroTitleLine3: "Pure Web Native.",
    heroLead: "IPA transcription, acoustic DSP analysis, phonological rules, and syntax trees. A unified suite of four open-source web applications designed in the rigorous Swiss Typographic Style.",
    heroCtaExplore: "EXPLORE TOOLS",
    heroCtaWorkflow: "VIEW WORKFLOW",
    heroStatTools: "4 Specialized Apps",
    heroStatServerless: "100% Client-Side",
    heroStatDesign: "Swiss Typographic Style",
    heroStatLicense: "Open Source (MIT / GPL)",

    // Section 1: Tools Showcase
    secToolsTitle: "01 / TOOL SUITE",
    secToolsSubtitle: "Four High-Precision Standalone Web Applications",
    secToolsDesc: "Every application runs instantly in modern browsers without installations or backend servers, executing compute-heavy algorithms entirely on the client side.",

    // Tool 1: Acoustic Annotator
    t1Category: "ACOUSTIC PHONETICS / DSP & ANNOTATION",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "In-Browser Acoustic Analysis & Praat TextGrid Editor",
    t1Desc: "A web-native acoustic analysis suite built for graduate and linguistic research. Records uncompressed 16-bit PCM WAV directly from the microphone, performing Burg LPC formant estimation (F1-F3), autocorrelation pitch tracking, acoustic VAD segmentation, and F1-F2 vowel space plotting.",
    t1Spec1: "Autocorrelation F0 pitch tracking & Burg LPC formants (F1-F3)",
    t1Spec2: "STFT high-definition spectrogram & acoustic VAD segmentation",
    t1Spec3: "F1-F2 vowel space quadrilateral chart with CSV export",
    t1Spec4: "Bidirectional Praat TextGrid import and export",
    t1ActionLaunch: "LAUNCH APP ↗",
    t1ActionRepo: "REPOSITORY (GITHUB)",

    // Tool 2: IPA Editor
    t2Category: "PHONETICS & PHONETIC SYMBOLS / INPUT",
    t2Title: "IPA Editor",
    t2Subtitle: "International Phonetic Alphabet & Tone Letter Editor",
    t2Desc: "A rational, modern IPA web editor built in the Swiss style. Comprehensive coverage of all 339 IPA characters with real-time ligature merging for Chao tone letters, dynamic combining diacritics, and one-click clipboard copying.",
    t2Spec1: "Full 339 IPA symbols, non-pulmonic consonants, and diacritics",
    t2Spec2: "SIL-compliant automatic tone bar ligatures (Chao Tone Letters)",
    t2Spec3: "Non-destructive combining diacritic attachment",
    t2Spec4: "Instant one-click clipboard copying & bilingual UI",
    t2ActionLaunch: "LAUNCH APP ↗",
    t2ActionRepo: "REPOSITORY (GITHUB)",

    // Tool 3: Syntax Tree Editor
    t3Category: "SYNTAX & FORMAL GRAMMAR / TREE VISUALIZATION",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "Syntax Tree Editor & Hierarchical Structure Visualizer",
    t3Desc: "A dedicated syntax tree editor supporting Penn Treebank bracket notation and X-bar theory. Features instant switching between pedagogical (S/NP) and generative (TP/DP) frameworks, triangle nodes, constituent movement arrows, and LaTeX/SVG/PNG export.",
    t3Spec1: "Penn Treebank bracket parsing in real time",
    t3Spec2: "Dual-framework toggle: Pedagogical (S/NP) and Academic (TP/DP)",
    t3Spec3: "Movement arrows and triangle abbreviation nodes",
    t3Spec4: "Export to LaTeX (forest, qtree, tikz-qtree), SVG, and high-res PNG",
    t3ActionLaunch: "LAUNCH APP ↗",
    t3ActionRepo: "REPOSITORY (GITHUB)",

    // Tool 4: Phonological Rule Editor
    t4Category: "PHONOLOGY & HISTORICAL LINGUISTICS / RULES",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "Phonological Rule & Sound Change Editor with KaTeX",
    t4Desc: "A structured web editor for phonological rules (synchronic: A → B / C _ D) and historical sound changes (diachronic: A > B / C _ D). Provides distinctive feature matrices (SPE), environment rendering, KaTeX math typesetting, and publication-ready export.",
    t4Spec1: "Unified syntax for synchronic rules (→) and sound changes (>)",
    t4Spec2: "Chomsky-Halle (SPE) distinctive feature matrix formatting",
    t4Spec3: "KaTeX / LaTeX mathematical syntax generation & live preview",
    t4Spec4: "Vector SVG and publication-grade PNG image export",
    t4ActionLaunch: "LAUNCH APP ↗",
    t4ActionRepo: "REPOSITORY (GITHUB)",

    // Section 2: Workflow
    secWorkflowTitle: "02 / INTEGRATED WORKFLOW",
    secWorkflowSubtitle: "Bridging Empirical Acoustic Data to Theoretical Models",
    secWorkflowDesc: "This suite spans the full linguistic research pipeline: from physical speech recording and digital signal processing to transcription, phonological rule induction, and formal syntactic tree construction.",
    
    wfStep1Num: "01",
    wfStep1Title: "Acoustic Phonetics",
    wfStep1Desc: "Capture speech with Acoustic Annotator. Quantify fundamental frequency (F0) and vocal tract resonances (F1-F3 formants) with Burg LPC and autocorrelation, annotating interval boundaries on TextGrids.",

    wfStep2Num: "02",
    wfStep2Title: "Phonetic Transcription",
    wfStep2Desc: "Transcribe acoustic cues with IPA Editor. Assemble precise consonant/vowel symbols, Chao tone bars, and combining diacritics into standard Unicode text.",

    wfStep3Num: "03",
    wfStep3Title: "Phonological Modeling",
    wfStep3Desc: "Formulate alternations in Phonological Rule Editor. Formalize natural classes using SPE distinctive feature matrices to model assimilation, deletion, and historical sound shifts.",

    wfStep4Num: "04",
    wfStep4Title: "Syntactic Tree Modeling",
    wfStep4Desc: "Model hierarchical sentence structure with Syntax Tree Editor. Generate publication-ready trees with X-bar projections, movement arrows, and LaTeX export.",

    // Section 3: Philosophy
    secPhilosophyTitle: "03 / SWISS STYLE & PHILOSOPHY",
    secPhilosophySubtitle: "The Aesthetics & Principles of the International Typographic Style",
    secPhilosophyDesc: "Inspired by Josef Müller-Brockmann and Max Bill, we apply the objective rationalism of Swiss graphic design directly to academic software architecture.",
    
    phil1Title: "Zero Rounded Corners, Zero Decorative Shadows",
    phil1Desc: "Rejecting skeuomorphic shadows and rounded corners, every UI element is grounded in pure geometric planes and strict boundary lines.",

    phil2Title: "Mathematical Modular Grid",
    phil2Desc: "Layouts follow an unyielding modular grid system, ensuring academic data, scientific plots, and control panels maintain logical clarity.",

    phil3Title: "Functional Typography & Restrained Color",
    phil3Desc: "High-contrast Stark Black (#111111) and Pure White (#FFFFFF) form the canvas, with Swiss Red (#E30613) applied solely as a functional focal signal.",

    phil4Title: "100% Client-Side & Absolute Privacy",
    phil4Desc: "Your audio files and field data are never uploaded to any remote server. Every DSP algorithm and rendering engine runs locally in the browser sandbox.",

    // Footer
    footerHeading: "LINGUISTICS SUITE",
    footerCopy: "© 2026 okawawaka. All tools are open-source and free for research and education.",
    footerLicenseNote: "All applications in this suite are distributed under open-source licenses (MIT / GPL v3). Unrestricted use for research, education, and publication is encouraged.",
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
