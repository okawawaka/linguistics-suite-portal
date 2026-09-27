# 言語学ツールポータル (Linguistics Toolbox)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Portal-brightgreen?logo=github)](https://okawawaka.github.io/linguistics-suite-portal/)

言語学研究・学習のためのオープンソースWebツール群のポータルサイトです。

- 公開URL: https://okawawaka.github.io/linguistics-suite-portal/

---

## 収録ツール

### 1. Acoustic Annotator（音響分析 & Praat TextGrid エディタ）
- ブラウザ内16-bit PCM録音および音響VADによる無音自動分割
- F0ピッチ軌跡推定およびBurg法LPCフォルマント（F1-F3）抽出
- F1-F2母音四辺形散布図プロット（CSV出力対応）
- Praat TextGrid形式の双方向インポート・エクスポート
- 公開URL: https://okawawaka.github.io/acoustic-annotator/
- リポジトリ: https://github.com/okawawaka/acoustic-annotator

### 2. IPA Editor（国際音声字母エディタ & 声調記号入力）
- 339個のIPA記号（肺臓気流・非肺臓気流・補助記号）の入力対応
- 声調番号からのChao Tone Letters（声調バー）自動合字合成
- 結合分音記号の非破壊自動アタッチおよび記号検索
- クリップボードへのワンクリックコピー
- 公開URL: https://okawawaka.github.io/ipa-editor/
- リポジトリ: https://github.com/okawawaka/ipa-editor

### 3. Syntax Tree Editor（構文木エディタ & 統語階層可視化）
- Penn Treebankブラケット記法からのリアルタイム構文木生成
- TP/DP学術体系およびS/NP体系の切り替え
- 構成素移動矢印（Movement Arrows）および三角形省略記法
- LaTeX（forest / qtree）コードおよびベクターSVG / PNG出力
- 公開URL: https://okawawaka.github.io/syntax-tree-editor/
- リポジトリ: https://github.com/okawawaka/syntax-tree-editor

### 4. Phonological Rule Editor（音韻規則・音変化エディタ & KaTeX出力）
- 共時的音韻規則（→）と通時的音変化（>）の統合編集
- Chomsky-Halle（SPE）示差特徴マトリクスの自動整形
- KaTeX（LaTeX）数式コード生成およびリアルタイムプレビュー
- ベクターSVGおよびPNG出力
- 公開URL: https://okawawaka.github.io/phonological-rule-editor/
- リポジトリ: https://github.com/okawawaka/phonological-rule-editor

---

## ツールの特徴

### 1. ミニマルなデザイン
- 余分な装飾を排した幾何学的設計
- データ・波形・階層構造の視認性を重視した配色

### 2. ローカル完結
- 外部サーバーへの音声・テキストデータ送信なし
- ブラウザ内部（Web Audio API / Canvas / SVG）でのリアルタイム処理
- 機密性の高いフィールドワーク音声や未発表データの保護

### 3. 言語学に特化した機能
- 音響音声学・記述音声学・形式統語論・音韻論の各領域に対応
- Praat、Penn Treebank、Chao Tone Letters、SPE示差特徴など専門仕様に準拠
- 論文や発表スライドに適したLaTeXコードおよびベクター画像（SVG）出力

---

## ライセンス

本ポータルサイトは [MIT License](LICENSE) のもとで公開されています。
各ツールのライセンスについては各リポジトリをご確認ください。
