import { Link } from 'react-router-dom'

/**
 * 汎用プレースホルダーページ
 * 利用規約・プライバシーポリシー・運営情報・ログインなど Sprint 後半で実装されるページ用
 */
export default function PlaceholderPage({ title, description, sprint }) {
  return (
    <div className="min-h-screen bg-[#faf6f1] flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-6">🔧</div>
        <h1
          className="text-3xl font-bold text-[#3d2212] mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-[#7d4a2d] mb-6 leading-relaxed">{description}</p>
        )}
        {sprint && (
          <div className="inline-block px-3 py-1 bg-[#b87348]/20 text-[#7d4a2d] text-sm rounded-full mb-6">
            Sprint {sprint} で実装予定
          </div>
        )}
        <div>
          <Link
            to="/"
            className="text-sm text-[#b87348] hover:text-[#9a5d38] underline underline-offset-2"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
