# 言語学・音声学ツールスイート ポータル (Linguistics Suite Portal)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design: Swiss Typographic Style](https://img.shields.io/badge/Design-Swiss%20Style-red.svg)](#)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Portal-brightgreen?logo=github)](https://okawawaka.github.io/linguistics-suite-portal/)

言語学・音声学研究のための、スイススタイル（国際タイポグラフィ様式）で統一されたオープンソースWebアプリケーション群の公式ポータル・ランディングページです。

👉 **Live Portal**: [https://okawawaka.github.io/linguistics-suite-portal/](https://okawawaka.github.io/linguistics-suite-portal/)

---

## 🏛️ 収録アプリケーション

| アプリケーション | 領域 | 主な機能・特徴 | ライブ版 | リポジトリ |
| :--- | :--- | :--- | :--- | :--- |
| **Acoustic Annotator** | 音響音声学 / DSP | ブラウザ内16-bit PCM録音、Burg LPCフォルマント (F1-F3)、自己相関F0ピッチ抽出、母音四辺形プロット、音響VAD、Praat TextGrid 双方向連携 | [起動 ↗](https://okawawaka.github.io/acoustic-annotator/) | [GitHub](https://github.com/okawawaka/acoustic-annotator) |
| **IPA Editor** | 音声学 / 記号入力 | 339記号完全網羅、SIL国際規格声調バー合字（Chao Tone Letters）、結合分音記号の自動結合、母音四辺形グリッド入力 | [起動 ↗](https://okawawaka.github.io/ipa-editor/) | [GitHub](https://github.com/okawawaka/ipa-editor) |
| **Syntax Tree Editor** | 統語論 / 樹形図 | Penn Treebankブラケット記法リアルタイム解析、Xバー理論・DP/TP学術体系、構成素移動矢印、LaTeX・SVG・高解像度PNG出力 | [起動 ↗](https://okawawaka.github.io/syntax-tree-editor/) | [GitHub](https://github.com/okawawaka/syntax-tree-editor) |
| **Phonological Rule Editor** | 音韻論 / 規則記述 | 共時的規則（→）・通時的音変化（>）の統合記述、SPE示差特徴マトリクス、KaTeX数式生成、論文用ベクターSVG出力 | [起動 ↗](https://okawawaka.github.io/phonological-rule-editor/) | [GitHub](https://github.com/okawawaka/phonological-rule-editor) |

---

## 🎨 デザイン設計思想（スイススタイル）

ヨゼフ・ミューラー＝ブロックマンやマックス・ビル等の設計思想に基づき、学術・科学ツールの合理性と客観性を最大化する視覚言語を採用しています。

- **角丸ゼロ (`border-radius: 0`)**: すべてのボタン、カード、入力域において装飾的な丸みを排除。
- **装飾的シャドウの排除 (`box-shadow: none`)**: 疑似的な立体感を排し、純粋な平面とグリッド線で情報構造を明示。
- **機能的カラーパレット**: Stark Black (`#111111`) と Pure White (`#FFFFFF`) の高コントラストをベースに、スイスレッド (`#E30613`) を信号・焦点として機能的に配置。
- **タイポグラフィ**: `Noto Sans` / `Noto Sans JP` および等幅 `JetBrains Mono` による階層構造。
- **キネティック・タイポグラフィ & インタラクティブ数理波形**: HTML5 Canvas による正弦波・調和波・座標グリッドのアニメーション。

---

## 🌐 GitHub Pages への公開方法

本リポジトリは完全な静的 Web サイト（Vanilla HTML/CSS/JS）であり、ビルド工程なしでそのまま GitHub Pages にホスト可能です。

1. GitHub リポジトリの **Settings** > **Pages** に移動します。
2. **Build and deployment** の Source で **Deploy from a branch** を選択します。
3. Branch で `main`（またはアクティブブランチ）の `/ (root)` を選択し、**Save** をクリックします。
4. 数分で `https://okawawaka.github.io/linguistics-suite-portal/` にて公開されます。

---

## 📄 ライセンス

本ポータルサイトは [MIT License](LICENSE) のもとで公開されています。
各ツールのライセンスについては各リポジトリをご確認ください。
