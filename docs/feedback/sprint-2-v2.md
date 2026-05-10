# Sprint 2 評価結果

**判定:** 合格
**評価日:** 2026-05-10
**評価対象:** Sprint 2 - アイテム選択とチャット UI 骨格

---

## スコア

| 基準 | スコア | 閾値 | 判定 |
|------|--------|------|------|
| 機能完全性 | 5/5 | 4 | PASS |
| 動作安定性 | 5/5 | 4 | PASS |
| UI/UX品質 | 5/5 | 3 | PASS |
| エラーハンドリング | 4/5 | 3 | PASS |
| 回帰なし | 5/5 | 5 | PASS |

---

## テスト環境

- ブラウザ: Chromium (Playwright 1.59.1 / ヘッドレス)
- デスクトップ: 1280x800
- スマホ: 375x667
- サーバー: Vite 開発サーバー (localhost:5173)

---

## テスト結果詳細（18項目）

### 合格した項目

- **[受入基準] アイテムクリック → チャット遷移**: `/select` で「二つ折り財布」をクリックすると `/chat/bifold-wallet` に正しく遷移する
- **[受入基準] チャット画面上部のアイテム名表示**: `location.state` 経由でアイテム名が渡され「二つ折り財布」が `h1.headerTitle` に表示される。直接URLアクセス時も `ITEM_NAMES` マップからフォールバック表示される
- **[受入基準] ユーザー発言が右寄せ吹き出し**: Enter 送信後、`.bubbleUser` スタイルで右寄せ茶色吹き出しが正しく追加される
- **[受入基準] サジェスト例クリック → 入力欄への挿入**: 「カードが6枚入る薄めの財布を作りたい」クリックで `textarea` に文字列が挿入される
- **7アイテムカードの表示**: 二つ折り財布・三つ折り財布・長財布・カードケース・小銭入れ・コインケース・キーケースの全7枚が正しく表示される
- **カードのメタ情報**: 各カードに難易度バッジ（初心者/中級/上級）・所要時間・説明文が表示されている
- **ローディング表示**: メッセージ送信後100ms時点で3点ドットの `.bubbleLoading` が表示される
- **AI スタブ応答**: 1〜2秒後にキーワードに応じた適切なダミー応答が左寄せ吹き出しで表示される（カード枚数キーワードで正しいブランチが動作）
- **Shift+Enter 改行**: `textarea` 内に改行文字 `\n` が挿入され、Enter キーのみで送信される
- **戻るボタン**: `←` ボタンクリックで `/select` に戻る
- **直接URL アクセス**: `/chat/card-case` に直接アクセスすると「カードケース」が表示される（`ITEM_NAMES` フォールバック動作）
- **スマホ375px タブ切り替え**: `tabSwitcher` が表示され、「プレビュー」タブクリックでチャットペインが非表示になる
- **サジェスト送信後非表示**: メッセージ送信後 `messages.length > 1` になりサジェストが非表示になる
- **型紙プレビューエリア**: 「型紙プレビュー」ヘッダーと「型紙はここに表示されます」オーバーレイが表示される
- **[回帰] ランディングページ**: 「日本語で伝えるだけで型紙が手に入る」ヒーローが正常に表示される
- **[回帰] 料金ページ**: Free / Hobby / Creator / Pro プランが正常に表示される
- **コンソールエラー**: JavaScript エラー・ページエラーともにゼロ

### 不合格の項目

なし（全受入基準を充足）

---

## バグ一覧

| # | 重要度 | 内容 | 再現手順 |
|---|--------|------|----------|
| - | - | 機能上のバグは発見されなかった | - |

---

## コードレビュー（vercel-react-best-practices）

### CRITICAL / HIGH カテゴリ

| ルール | 状態 | 詳細 |
|--------|------|------|
| rerender-no-inline-components | PASS | アイコンコンポーネント（BackIcon, AiIcon 等）はファイル末尾で独立定義されており、レンダー内インライン定義ではない |
| bundle-no-barrel-import | PASS | barrel import なし。依存は react-router-dom・CSS Modules のみ |
| useCallback-deps-correct | PASS | `sendMessage` の deps `[inputText, isLoading, itemName]` は適切 |
| waterfall-no-serial-await | PASS | fetch なし（スタブ実装）。直列 await の問題なし |
| a11y-aria-live | PASS | メッセージエリアに `aria-live="polite"` 設定済み |
| a11y-focus-visible | PASS | すべてのインタラクティブ要素に `focus-visible` スタイル設定済み（Sprint 1 のスキルレビューで対応済み） |
| touch-hover-media-query | PASS | `.itemCard:hover` / `.backButton:hover` / `.suggestBtn:hover` 等が `@media (hover: hover)` で囲まれている |

### Minor カテゴリ

| ルール | 状態 | 詳細 |
|--------|------|------|
| perf-split-twice | 注意 | `formatMessageText` 関数内で `text.split('\n')` が2回実行されている（本体の `.map()` と `length - 1` 比較）。現状では問題ないが、長文メッセージが増えると無駄な処理が発生する |

---

## 改善提案

### Minor（機能影響なし、次スプリント以降で対応可）

1. **`formatMessageText` の二重 split 解消** (`perf-split-twice`)
   ```js
   // 現状（splitが2回）
   text.split('\n').map((line, i) => (
     <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
   ))

   // 改善案（splitを1回に）
   const lines = text.split('\n')
   lines.map((line, i) => (
     <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
   ))
   ```

2. **テキストエリアの auto-grow**（既知の課題として progress.md に記録済み）: `rows={1}` + `max-height: 120px` の現状実装は動作上問題ないが、入力に応じて高さが自動伸長すると UX が向上する。Sprint 3 以降で対応を検討。

3. **`sendMessage` の `useCallback` 不要論**: `sendMessage` は `onClick` と `onKeyDown` の2箇所でのみ使用。頻繁に再生成されるコンポーネント内でないため、`useCallback` を削除してもパフォーマンス上の差は生じない。ただし現状の実装を維持しても問題なし。

---

## Generator への指示

**本スプリントは合格です。次の Sprint 3（AI 対話と要件抽出）に進んでください。**

修正必須事項はありません。上記の改善提案は Sprint 3 実装時に余力があれば対応してください。特に `formatMessageText` の二重 split は1行の修正で解消できるため、Sprint 3 で Claude API 連携を実装する際にあわせて修正することを推奨します。
