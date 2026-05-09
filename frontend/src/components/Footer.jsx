import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#3d2212] text-[#d4b28e] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3
              className="text-white text-lg font-bold mb-3"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              LeatherCraft AI
            </h3>
            <p className="text-sm leading-relaxed">
              日本語で伝えるだけで、レザークラフトの型紙が即座に手に入る。
              初心者からベテランまで、手作りの楽しさを広げます。
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">
              サービス
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  使い方
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  料金プラン
                </Link>
              </li>
              <li>
                <Link to="/select" className="hover:text-white transition-colors">
                  型紙を作る
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">
              法的情報・運営
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  運営情報
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@leathercraft-ai.example.com"
                  className="hover:text-white transition-colors"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#5e3720] mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9a5d38]">
          <p>&copy; 2026 LeatherCraft AI. All rights reserved.</p>
          <p>
            型紙は参考用途として提供されます。商用利用については利用規約をご確認ください。
          </p>
        </div>
      </div>
    </footer>
  )
}
