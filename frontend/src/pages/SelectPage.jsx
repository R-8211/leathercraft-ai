/**
 * アイテム選択画面 — Sprint 2 で本実装予定
 * Sprint 1 ではプレースホルダーとして表示する
 */
export default function SelectPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1] flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🧵</div>
        <h1
          className="text-3xl font-bold text-[#3d2212] mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          アイテム選択
        </h1>
        <p className="text-[#7d4a2d] mb-8 leading-relaxed">
          この画面は <strong>Sprint 2</strong> で実装予定です。
          <br />
          作りたいアイテムを選んでチャット画面へ進む機能が追加されます。
        </p>
        <div className="bg-white border border-[#e4d0b8] rounded-2xl p-6 text-left">
          <p className="text-xs font-bold text-[#b87348] uppercase tracking-widest mb-3">実装予定の機能</p>
          <ul className="space-y-2 text-sm text-[#5e3720]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87348]" />
              二つ折り財布・三つ折り財布・長財布
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87348]" />
              カードケース・小銭入れ・コインケース
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87348]" />
              キーケース
            </li>
          </ul>
        </div>
        <a
          href="/"
          className="inline-block mt-6 text-sm text-[#b87348] hover:text-[#9a5d38] underline underline-offset-2"
        >
          ← トップページへ戻る
        </a>
      </div>
    </div>
  )
}
