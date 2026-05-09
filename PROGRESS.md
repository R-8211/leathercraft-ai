# LeatherCraft AI — 作業進捗メモ

**最終更新：** 2026-05-09 11:13
**ステータス：** 開発準備完了 / SPEC.md 生成待ち

---

## ここまでやったこと

### 1. 事業計画書 & 市場調査（完了）
- `BUSINESS_PLAN.md` をプロジェクトルートに作成済み
- 内容：市場規模・競合分析・ビジネスモデル・GTM戦略・3カ年ロードマップ

### 2. Claude Code 設定（完了）
- `C:\Users\良一\.claude\settings.json` 設定済み：
  - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1"` → エージェントチーム有効
  - `teammateMode: "in-process"`
  - Stopフック → `update-progress.ps1`（進捗メモ自動更新）

### 3. グローバル CLAUDE.md（完了）
- `C:\Users\良一\.claude\CLAUDE.md` 作成済み
- 内容：コミュニケーション・コードスタイル・Git規約・禁止事項

### 4. 開発パイプライン エージェント（完了）

| エージェント | ファイル | モデル | 役割 |
|------------|---------|-------|------|
| planner | `~/.claude/agents/planner.md` | Opus | 仕様書生成 → `/docs/spec.md` |
| generator | `~/.claude/agents/generator.md` | Sonnet | 1スプリントずつ実装 → `/docs/progress.md` |
| evaluator | `~/.claude/agents/evaluator.md` | Sonnet | Playwright テスト → `/docs/feedback/sprint-N.md` |

---

## プロジェクト構成（現在）

```
C:\Users\良一\Projects\leathercraft-ai\
├── BUSINESS_PLAN.md       ← 事業計画書・市場調査
├── PROGRESS.md            ← このファイル
├── package.json
├── frontend/              ← React + Vite（スキャフォルド済み）
│   ├── src/
│   └── vite.config.js
└── backend/               ← Node.js + Express（スキャフォルド済み）
    └── src/
```

---

## 次にやること

### ステップ1：SPEC.md の生成（planner エージェント）

以下を入力するだけで開始：
```
LeatherCraft AI の仕様書を作って。日本語でチャット入力 → SVG型紙生成 → PDFダウンロードができるWebアプリ。財布・小銭入れが対象。
```
→ planner が `/docs/spec.md` を自動生成

### ステップ2：Sprint 1 実装（generator エージェント）
```
SPEC.md に基づいてスプリント1を実装して
```

### ステップ3：動作テスト（evaluator エージェント）
```
スプリント1を評価して
```

### ステップ4：以降繰り返し
PASS → 次スプリント / FAIL → generator が修正 → 再評価

---

## 重要ファイルの場所

| ファイル | パス |
|---------|------|
| 事業計画書 | `./BUSINESS_PLAN.md` |
| グローバルルール | `C:\Users\良一\.claude\CLAUDE.md` |
| グローバル設定 | `C:\Users\良一\.claude\settings.json` |
| Stopフック | `C:\Users\良一\.claude\hooks\update-progress.ps1` |
| planner | `C:\Users\良一\.claude\agents\planner.md` |
| generator | `C:\Users\良一\.claude\agents\generator.md` |
| evaluator | `C:\Users\良一\.claude\agents\evaluator.md` |
| 製品仕様書（未作成） | `./docs/spec.md` |
| スプリント記録（未作成） | `./docs/progress.md` |

---

## メモ・決定事項

- SNS自動投稿は今回のスコープ外（将来的に検討）
- ビジネスプランは確認済み・承認済み
- バックエンドの API キーは `./backend/.env` に格納予定
- Claude API モデル：`claude-sonnet-4-6`
- ドキュメント出力先は `/docs/` ディレクトリに統一
