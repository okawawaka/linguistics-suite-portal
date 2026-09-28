/**
 * Linguistics Suite Portal — Internationalization (i18n) Module
 * Bilingual Dictionary (JA / EN)
 * Concise, Bullet-Point Academic Specifications (No Prose)
 */

const translations = {
  ja: {
    // Header
    metaBrand: "LINGUISTICS TOOLBOX",
    metaSub: "OPEN WEB TOOLS FOR LINGUISTICS",
    navTools: "ツール",
    navFeatures: "ツールの特徴",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB TOOLS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "ブラウザですぐに使える、",
    heroTitleLine2: "言語学の研究・学習ツール",
    heroBullet1: "音声分析、IPA入力、構文木、音韻規則の作成に対応",
    heroBullet2: "データはサーバーに送信せず、すべてブラウザ内（端末）で処理",
    heroBullet3: "アカウント登録やインストール不要で、PCやスマホからそのまま利用可能",
    heroCtaExplore: "ツールを見る ↓",
    heroCtaFeatures: "ツールの特徴 →",

    creatorNoteLabel: "開発のきっかけ //",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / 音響音声学・音声分析",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "ブラウザ音響分析 & Praat TextGrid エディタ",
    t1BuiltFor: "音響音声学で使うPraatをもっと手軽に、パソコンがなくても直接スマホやタブレットから録音して分析できるようにしたいと思って作りました。",
    t1Spec1: "ブラウザ上での音声録音と、無音区間の自動検出・区間分割",
    t1Spec2: "基本周波数（F0）のピッチ推定とLPCフォルマント（F1〜F3）の抽出",
    t1Spec3: "F1-F2母音四辺形散布図のリアルタイム描画とCSV書き出し",
    t1Spec4: "Praat TextGrid形式の読み込み・書き出しに対応",
    t1Spec5: "音声データを外部に送信せず、すべての解析をブラウザ内で完結",
    t1ActionLaunch: "アプリを起動する ↗",
    t1ActionRepo: "GitHub リポジトリ",

    // Tool 2: IPA Editor
    t2Category: "02 / 音声学・記号入力",
    t2Title: "IPA Editor",
    t2Subtitle: "国際音声字母エディタ & 声調記号入力",
    t2BuiltFor: "記述言語学や音声学で扱うIPA（国際音声字母）の特殊記号を、パソコンだけでなくスマホからでも手軽に入力したくて作りました。",
    t2Spec1: "肺臓気流子音・非肺臓気流子音・母音・補助記号など、IPAの各記号に対応",
    t2Spec2: "数字キー（1〜5）の入力から趙元任の声調バー（Chao Tone Letters）を合字変換",
    t2Spec3: "ベース文字の並びを崩さずにダイアクリティカルマーク（結合記号）を付与",
    t2Spec4: "ボタン一つでクリップボードへコピー（日本語・英語の表示切替に対応）",
    t2ActionLaunch: "アプリを起動する ↗",
    t2ActionRepo: "GitHub リポジトリ",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / 統語論・形式統語論",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "構文木エディタ & 統語階層可視化",
    t3BuiltFor: "統語論や意味論で扱う構文木を、授業のノートや板書、レポート作成時にパソコン上ですばやく組み立てたくて作りました。",
    t3Spec1: "ブラケット記法（かっこ表記）から構文木をリアルタイムに自動描画",
    t3Spec2: "TP/DP体系（生成文法）とS/NP体系（伝統文法）をボタン一つで切り替え",
    t3Spec3: "構成素の移動を表す矢印描画と、下位構造の三角形省略記法",
    t3Spec4: "LaTeX（forest / qtree）形式のコード生成、SVG・PNG画像としての保存",
    t3ActionLaunch: "アプリを起動する ↗",
    t3ActionRepo: "GitHub リポジトリ",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / 音韻論・歴史言語学",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "音韻規則・音変化エディタ & KaTeX出力",
    t4BuiltFor: "歴史言語学や音韻論で出てくる音韻規則を、パソコン上できれいに表示できるようにしたくて開発しました。",
    t4Spec1: "共時的な音韻規則（→）と通時的な音変化（>）の入力に対応",
    t4Spec2: "Chomsky-Halle（SPE）の示差的特徴マトリクスを縦並びで自動レイアウト",
    t4Spec3: "KaTeX形式の数式プレビュー表示とLaTeXコードの生成",
    t4Spec4: "レポートやスライドにそのまま貼れるSVG・高解像度PNG画像の書き出し",
    t4ActionLaunch: "アプリを起動する ↗",
    t4ActionRepo: "GitHub リポジトリ",

    // Section: Tool Features (3 Major Pillars)
    secFeaturesTitle: "FEATURES",
    secFeaturesSubtitle: "ツールの特徴",
    feat1Num: "01",
    feat1Title: "ミニマルなデザイン",
    feat1Bullet1: "スイススタイル（国際タイポグラフィ様式）を取り入れた簡潔なレイアウト",
    feat1Bullet2: "装飾的な影や過度な角丸を排した、データ重視の構成",
    feat1Bullet3: "音声波形や統語木、マトリクス記号の視認性を最優先",
    feat2Num: "02",
    feat2Title: "端末内（ブラウザ）で完結",
    feat2Bullet1: "音声データや入力テキストを外部サーバーへ一切送信しません",
    feat2Bullet2: "ブラウザの標準機能（Web Audio API等）を用いてローカルで高速処理",
    feat2Bullet3: "調査データや未発表の言語資料も安心して扱えます",
    feat3Num: "03",
    feat3Title: "言語学の記法に特化",
    feat3Bullet1: "声調バー（Chao tone letters）やIPAダイアクリティカルマークの合成",
    feat3Bullet2: "Praat TextGridの入出力とフォルマント分析",
    feat3Bullet3: "Penn Treebank形式の構文木パースと移動矢印の描画",
    feat3Bullet4: "SPE示差的特徴マトリクスとKaTeX数式コードの生成",

    // Footer
    footerHeading: "LINGUISTICS TOOLBOX",
    footerCopy: "© 2026 okawawaka. Linguistics Toolbox.",
    footerBullet1: "全ツール無料・オープンソース（MIT / GPL v3）",
    footerBullet2: "大学の講義・ゼミ、個人研究や教材作成などにご活用ください",
    footerBackToTop: "TOP ↑"
  },

  en: {
    // Header
    metaBrand: "LINGUISTICS TOOLBOX",
    metaSub: "OPEN WEB TOOLS FOR LINGUISTICS",
    navTools: "TOOLS",
    navFeatures: "FEATURES",
    navGithub: "GITHUB",

    // Hero
    heroOverline: "OPEN WEB TOOLS FOR PHONETICS & THEORETICAL LINGUISTICS",
    heroTitleLine1: "Open Web Tools",
    heroTitleLine2: "for Linguistic Research & Learning",
    heroBullet1: "Tools for acoustic phonetics, IPA transcription, syntax trees, & phonological rules",
    heroBullet2: "All data stays in your browser — zero server uploads",
    heroBullet3: "No sign-up or installation required — runs right on your desktop or mobile browser",
    heroCtaExplore: "EXPLORE TOOLS ↓",
    heroCtaFeatures: "FEATURES →",

    creatorNoteLabel: "CREATOR NOTE //",

    // Tool 1: Acoustic Annotator
    t1Category: "01 / ACOUSTIC PHONETICS & DSP",
    t1Title: "Acoustic Annotator",
    t1Subtitle: "In-Browser Acoustic Analysis & Praat TextGrid Editor",
    t1BuiltFor: "I wanted to make Praat for acoustic phonetics more accessible, allowing direct recording and analysis from smartphones and tablets without a PC.",
    t1Spec1: "In-browser audio recording & automatic silence segmentation",
    t1Spec2: "F0 pitch tracking & LPC formant estimation (F1-F3)",
    t1Spec3: "F1-F2 vowel chart plotting with CSV export",
    t1Spec4: "Import and export Praat TextGrid format",
    t1Spec5: "All signal processing runs locally in your browser without uploading audio",
    t1ActionLaunch: "LAUNCH APP ↗",
    t1ActionRepo: "GitHub Repository",

    // Tool 2: IPA Editor
    t2Category: "02 / PHONETICS & TRANSCRIPTION",
    t2Title: "IPA Editor",
    t2Subtitle: "International Phonetic Alphabet & Tone Letter Editor",
    t2BuiltFor: "I wanted a simple way to type international phonetic symbols across various fields of linguistics, directly from both laptops and phones.",
    t2Spec1: "Covers pulmonic/non-pulmonic consonants, vowels, and diacritics from the IPA chart",
    t2Spec2: "Convert tone numbers (1-5) into Chao tone letter ligatures",
    t2Spec3: "Attach combining diacritics cleanly to base characters with keyword search",
    t2Spec4: "Quick clipboard copy & bilingual Japanese/English interface",
    t2ActionLaunch: "LAUNCH APP ↗",
    t2ActionRepo: "GitHub Repository",

    // Tool 3: Syntax Tree Editor
    t3Category: "03 / FORMAL SYNTAX",
    t3Title: "Syntax Tree Editor",
    t3Subtitle: "Syntax Tree Editor & Hierarchical Structure Visualizer",
    t3BuiltFor: "I wanted to easily sketch syntax trees for syntax and semantics on a PC during lectures, study sessions, and report writing.",
    t3Spec1: "Parse bracket notation into syntax trees in real time",
    t3Spec2: "Switch between theoretical (TP/DP) and pedagogical (S/NP) categories with one click",
    t3Spec3: "Movement arrows and triangle abbreviation nodes for phrases",
    t3Spec4: "Export as LaTeX (forest / qtree) code, SVG, or high-res PNG",
    t3ActionLaunch: "LAUNCH APP ↗",
    t3ActionRepo: "GitHub Repository",

    // Tool 4: Phonological Rule Editor
    t4Category: "04 / PHONOLOGY & HISTORICAL LINGUISTICS",
    t4Title: "Phonological Rule Editor",
    t4Subtitle: "Phonological Rule & Sound Change Editor with KaTeX",
    t4BuiltFor: "I wanted to cleanly display phonological rules that appear in historical linguistics and phonology on a PC, so I developed this tool.",
    t4Spec1: "Supports both synchronic phonological rules (→) and diachronic sound changes (>)",
    t4Spec2: "Structured SPE distinctive feature matrices with clean alignment",
    t4Spec3: "Live KaTeX preview & LaTeX equation code generation",
    t4Spec4: "Export clean SVG and high-resolution PNG for papers and presentation slides",
    t4ActionLaunch: "LAUNCH APP ↗",
    t4ActionRepo: "GitHub Repository",

    // Section: Tool Features (3 Major Pillars)
    secFeaturesTitle: "FEATURES",
    secFeaturesSubtitle: "Key Features",
    feat1Num: "01",
    feat1Title: "Minimalist Design",
    feat1Bullet1: "Clean layouts informed by Swiss Typographic Style",
    feat1Bullet2: "Information-focused structure without unnecessary shadows or heavy borders",
    feat1Bullet3: "Clear visibility for waveforms, syntax trees, and feature matrices",
    feat2Num: "02",
    feat2Title: "Runs Locally in Browser",
    feat2Bullet1: "Audio and input text are never sent to external servers",
    feat2Bullet2: "Fast processing using standard in-browser Web Audio APIs",
    feat2Bullet3: "Safe to use with field recordings and unpublished linguistic data",
    feat3Num: "03",
    feat3Title: "Linguistics-Dedicated",
    feat3Bullet1: "Chao tone letter ligatures and IPA combining diacritics",
    feat3Bullet2: "Praat TextGrid interop and LPC formant estimation",
    feat3Bullet3: "Penn Treebank bracket parsing and movement arrows",
    feat3Bullet4: "SPE distinctive feature matrices and KaTeX math export",

    // Footer
    footerHeading: "LINGUISTICS TOOLBOX",
    footerCopy: "© 2026 okawawaka. Linguistics Toolbox.",
    footerBullet1: "All tools free & open-source software (MIT / GPL v3)",
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
      document.title = "言語学ツールボックス";
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
