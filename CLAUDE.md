# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**task-board** — タスク管理ボードアプリ。ビルドツール・フレームワーク不使用のバニラ HTML/CSS/JavaScript で構築する。

## 開発の始め方

ビルドステップは不要。ブラウザで `index.html` を直接開くか、ローカルサーバーを立ち上げて確認する。

```bash
# Python がある場合（推奨）
python -m http.server 8080

# Node.js がある場合
npx serve .
```

## アーキテクチャ

バニラ JS 構成のため、モジュール間の依存はスクリプトの読み込み順序で管理する。

- **index.html** — エントリポイント。`<script>` タグの順序が依存関係を決める。
- **style.css** — スタイルシート。
- **script.js** — ロジック全体。タスクデータの管理・UI 制御・ローカルストレージへの永続化を担当する。

## コーディング規約

- ES Modules（`type="module"`）を使う場合、ローカルサーバー経由でないと動作しないことに注意する。
- グローバルスコープの汚染を避けるため、即時関数（IIFE）または ES Modules で変数をスコープする。
- コメントは WHY が非自明な場合のみ記載する（WHAT はコードで表現する）。

## Git 運用ルール

**コードを変更するたびに必ず GitHub へプッシュすること。**

```bash
git add <変更ファイル>
git commit -m "変更内容を端的に説明するメッセージ"
git push origin main
```

### コミットメッセージの指針

- 日本語・英語どちらでも可。
- 「何をしたか」より「なぜしたか」を優先して書く。
- 例: `タスク削除ボタンを追加 — ユーザーが完了済みタスクを整理できるように`

### 注意事項

- `git add .` や `git add -A` は避け、変更したファイルを明示して add する（意図しないファイルの混入防止）。
- `.env` やシークレットを含むファイルは絶対にコミットしない。
- force push（`git push --force`）は禁止。

## GitHub リポジトリ

（リポジトリ作成後にURLをここへ記載する）
