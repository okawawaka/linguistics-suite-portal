/**
 * Linguistics Suite Portal — Internationalization (i18n) Module
 * Bilingual Dictionary (JA / EN)
 * Concise, Bullet-Point Academic Specifications (No Prose)
 */

const translations = {
  ja: {
    // Header
    metaBrand: "LINGUISTICS TOOLBOX",
    metaSub: "BUILT FOR LINGUISTS BY STUDENTS",
    navTools: "ツール",
    navFeatures: "ツールの特徴",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB APPS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "言語学専攻の学生による",
    heroTitleLine2: "言語学のためのツール",
    heroBullet1: "音声分析・IPA入力・構文木・音韻規則の4領域を網羅",
    heroBullet2: "完全ブラウザ完結・サーバー通信なし（機密データ保護）",
    heroBullet3: "登録不要・完全無料のオープンソースWebツール群",
    heroCtaExplore: "ツールを見る ↓",
    heroCtaFeatures: "ツールの特徴 →",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / 音響音声学・DSP",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "ブラウザ音響分析 & Praat TextGrid エディタ",
    t1Spec1: "ブラウザ内16-bit PCM高音質録音 & 音響VAD無音自動分割",
    t1Spec2: "F0ピッチ軌跡推定 & Burg法LPCフォルマント (F1-F3)",
    t1Spec3: "F1-F2母音四辺形散布図プロット（CSV出力対応）",
    t1Spec4: "Praat TextGrid形式の双方向インポート・エクスポート",
    t1Spec5: "サーバー送信なし・完全ローカルクライアントサイド処理",
    t1ActionLaunch: "アプリを起動する ↗",
    t1ActionRepo: "GitHub リポジトリ",

    // Tool 2: IPA Editor
    t2Category: "02 / 音声学・記号入力",
    t2Title: "IPA Editor",
    t2Subtitle: "国際音声字母エディタ & 声調記号入力",
    t2Spec1: "全339記号・肺臓気流・非肺臓気流・補助記号を完全網羅",
    t2Spec2: "声調番号からChao Tone Letters（声調バー）を自動合字合成",
    t2Spec3: "結合分音記号の非破壊自動アタッチ & 音声記号検索",
    t2Spec4: "ワンクリックでのクリップボードコピー & 日英UI",
    t2ActionLaunch: "アプリを起動する ↗",
    t2ActionRepo: "GitHub リポジトリ",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / 統語論・形式文法",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "構文木エディタ & 統語階層可視化",
    t3Spec1: "Penn Treebankブラケット記法のリアルタイム構文木パース",
    t3Spec2: "TP/DP学術体系 ＆ S/NP学校文法体系のワンクリック切替",
    t3Spec3: "構成素移動矢印（Movement Arrows）と三角形省略記法",
    t3Spec4: "LaTeX（forest / qtree）コード & ベクターSVG/PNG出力",
    t3ActionLaunch: "アプリを起動する ↗",
    t3ActionRepo: "GitHub リポジトリ",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / 音韻論・歴史言語学",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "音韻規則・音変化エディタ & KaTeX出力",
    t4Spec1: "共時的音韻規則（→）と通時的音変化（>）の統合エディタ",
    t4Spec2: "Chomsky-Halle (SPE) 示差特徴マトリクスの自動整形",
    t4Spec3: "KaTeX（LaTeX）数式コード生成 & リアルタイムプレビュー",
    t4Spec4: "論文・発表スライド用ベクターSVG & 高解像度PNG出力",
    t4ActionLaunch: "アプリを起動する ↗",
    t4ActionRepo: "GitHub リポジトリ",

    // Section: Tool Features (3 Major Pillars)
    secFeaturesTitle: "FEATURES",
    secFeaturesSubtitle: "ツールの特徴",
    feat1Num: "01",
    feat1Title: "ミニマルなデザイン",
    feat1Bullet1: "スイススタイル（国際タイポグラフィ様式）準拠",
    feat1Bullet2: "角丸ゼロ・装飾シャドウ完全排除の幾何学設計",
    feat1Bullet3: "言語データ・波形・階層の可読性を極限まで重視",
    feat2Num: "02",
    feat2Title: "ローカル完結",
    feat2Bullet1: "外部サーバーへの音声・テキスト送信ゼロ",
    feat2Bullet2: "ブラウザ内部（DSP / WASM）で高速リアルタイム処理",
    feat2Bullet3: "機密フィールドワーク音声・未発表データの安全保護",
    feat3Num: "03",
    feat3Title: "言語学に特化した機能",
    feat3Bullet1: "声調バー自動合字 & IPA結合分音記号",
    feat3Bullet2: "Praat TextGrid連携 & Burg法LPCフォルマント解析",
    feat3Bullet3: "Penn Treebank構文木 & Xバー移動矢印描画",
    feat3Bullet4: "SPE示差特徴マトリクス & KaTeX論文出力",

    // Footer
    footerHeading: "LINGUISTICS TOOLBOX",
    footerCopy: "© 2026 okawawaka. Built for linguistics by students.",
    footerBullet1: "全ツール完全無料・オープンソース（MIT / GPL v3）",
    footerBullet2: "学術研究・レポート・講義・教材作成に自由利用可能",
    footerBackToTop: "TOP ↑"
  },

  en: {
    // Header
    metaBrand: "LINGUISTICS TOOLBOX",
    metaSub: "BUILT FOR LINGUISTS BY STUDENTS",
    navTools: "TOOLS",
    navFeatures: "FEATURES",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB APPS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "Linguistic Tools,",
    heroTitleLine2: "Built by Students, for Linguistics.",
    heroBullet1: "Covers acoustic phonetics, IPA input, syntax trees, & phonological rules",
    heroBullet2: "100% Client-side execution without external server transmissions",
    heroBullet3: "Free & open-source with zero sign-up required",
    heroCtaExplore: "EXPLORE TOOLS ↓",
    heroCtaFeatures: "FEATURES →",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / ACOUSTIC PHONETICS & DSP",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "In-Browser Acoustic Analysis & Praat TextGrid Editor",
    t1Spec1: "In-browser 16-bit PCM recording & acoustic VAD silence segmentation",
    t1Spec2: "Autocorrelation F0 pitch tracking & Burg LPC formants (F1-F3)",
    t1Spec3: "F1-F2 vowel space quadrilateral chart with CSV export",
    t1Spec4: "Bidirectional Praat TextGrid import and export",
    t1Spec5: "Zero server transmission, fully local client-side processing",
    t1ActionLaunch: "LAUNCH APP ↗",
    t1ActionRepo: "GitHub Repository",

    // Tool 2: IPA Editor
    t2Category: "02 / PHONETICS & TRANSCRIPTION",
    t2Title: "IPA Editor",
    t2Subtitle: "International Phonetic Alphabet & Tone Letter Editor",
    t2Spec1: "All 339 IPA symbols, non-pulmonic consonants, & diacritics",
    t2Spec2: "SIL-standard Chao Tone Letter ligature merging from tone numbers",
    t2Spec3: "Non-destructive combining diacritic attachment & symbol search",
    t2Spec4: "One-click clipboard copy & bilingual Japanese/English UI",
    t2ActionLaunch: "LAUNCH APP ↗",
    t2ActionRepo: "GitHub Repository",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / FORMAL SYNTAX",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "Syntax Tree Editor & Hierarchical Structure Visualizer",
    t3Spec1: "Real-time syntax tree parsing from Penn Treebank brackets",
    t3Spec2: "Instant toggle: Academic (TP/DP) vs Pedagogical (S/NP)",
    t3Spec3: "Constituent movement arrows & triangle abbreviation nodes",
    t3Spec4: "LaTeX (forest, qtree), SVG, & high-resolution PNG export",
    t3ActionLaunch: "LAUNCH APP ↗",
    t3ActionRepo: "GitHub Repository",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / PHONOLOGY & HISTORICAL LINGUISTICS",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "Phonological Rule & Sound Change Editor with KaTeX",
    t4Spec1: "Unified editor for synchronic rules (→) and sound changes (>)",
    t4Spec2: "Chomsky-Halle (SPE) distinctive feature matrix formatting",
    t4Spec3: "KaTeX / LaTeX equation generation & real-time preview",
    t4Spec4: "Vector SVG & high-resolution PNG export for papers and slides",
    t4ActionLaunch: "LAUNCH APP ↗",
    t4ActionRepo: "GitHub Repository",

    // Section: Tool Features (3 Major Pillars)
    secFeaturesTitle: "FEATURES",
    secFeaturesSubtitle: "Key Features",
    feat1Num: "01",
    feat1Title: "Minimalist Design",
    feat1Bullet1: "Rooted in Swiss Typographic Style aesthetics",
    feat1Bullet2: "Absolute zero border-radius & zero decorative drop-shadows",
    feat1Bullet3: "Maximized legibility for complex data, waves, and trees",
    feat2Num: "02",
    feat2Title: "Local & Private",
    feat2Bullet1: "Zero audio or text transmission to external servers",
    feat2Bullet2: "Pure client-side execution (Web Audio, DSP, WASM)",
    feat2Bullet3: "Guaranteed data confidentiality for fieldwork and research",
    feat3Num: "03",
    feat3Title: "Linguistics-Dedicated",
    feat3Bullet1: "Chao Tone Letter automatic ligatures & IPA combining diacritics",
    feat3Bullet2: "Praat TextGrid interop & Burg LPC formant estimation",
    feat3Bullet3: "Penn Treebank bracket parsing & X-bar movement arrows",
    feat3Bullet4: "SPE distinctive feature matrices & KaTeX math export",

    // Footer
    footerHeading: "LINGUISTICS TOOLBOX",
    footerCopy: "© 2026 okawawaka. Built for linguistics by students.",
    footerBullet1: "All tools free & open-source (MIT / GPL v3)",
    footerBullet2: "Free for academic research, coursework, and teaching",
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
      document.title = "言語学ツールポータル";
    } else {
      document.title = "Linguistics Toolbox";
    }

    // Notify other components (e.g. Typewriter)
    window.dispatchEvent(new CustomEvent("portalLanguageChanged", { detail: { lang } }));
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
