import { Link } from 'react-router-dom'
import PatternSvgPlaceholder from '../components/PatternSvgPlaceholder'

const STEPS = [
  {
    step: '01',
    icon: '💬',
    title: '日本語で伝える',
    description: '「マチ付きの二つ折り財布、カードは6枚入る感じで」のように、作りたいものを自然な言葉で入力するだけ。',
  },
  {
    step: '02',
    icon: '🤖',
    title: 'AIが要件を整理',
    description: 'AIが寸法・仕様を自動で整理します。不明な点があれば追質問して、あなたの希望に合った型紙に仕上げます。',
  },
  {
    step: '03',
    icon: '📐',
    title: '型紙を受け取る',
    description: '縫い代・ステッチ線・寸法入りの実寸SVGが即座に生成。A4 PDF でダウンロードして家庭用プリンターで印刷できます。',
  },
]

const ITEMS = [
  { name: '二つ折り財布', level: '中級', time: '3〜5時間', emoji: '👛' },
  { name: 'カードケース', level: '初心者', time: '1〜2時間', emoji: '🪪' },
  { name: '小銭入れ', level: '初心者', time: '1〜2時間', emoji: '👝' },
  { name: 'コインケース', level: '中級', time: '2〜3時間', emoji: '💰' },
  { name: '長財布', level: '上級', time: '5〜8時間', emoji: '💼' },
  { name: 'キーケース', level: '初心者', time: '1〜2時間', emoji: '🔑' },
]

const SAMPLES = [
  { label: '二つ折り財布', desc: 'カード6枚・小銭入れ付き', highlight: 'bg-[#f2e9dc]' },
  { label: 'カードケース', desc: 'スリムな名刺入れ型', highlight: 'bg-[#e4d0b8]/50' },
  { label: 'L字コインケース', desc: 'コンパクト・実用的', highlight: 'bg-[#f2e9dc]' },
]

const LEVEL_COLOR = {
  '初心者': 'bg-green-100 text-green-700',
  '中級': 'bg-amber-100 text-amber-700',
  '上級': 'bg-red-100 text-red-700',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6f1] via-[#f2e9dc] to-[#e4d0b8] pt-16 pb-24 px-4">
        {/* 背景テクスチャ風装飾 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #b87348 0px,
              #b87348 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-[#b87348]/20 text-[#7d4a2d] text-xs font-semibold rounded-full mb-6 uppercase tracking-widest">
                AI型紙生成サービス
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3d2212] leading-tight mb-6"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                日本語で伝えるだけで
                <br />
                <span className="text-[#b87348]">型紙が手に入る</span>
              </h1>

              <p className="text-lg text-[#5e3720] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                「マチ付きの二つ折り財布、カードは6枚入る感じで」
                ——そんな一言から、縫い代・ステッチ線・寸法入りの実寸型紙が即座に生成されます。
                家庭用プリンターでA4印刷可能なPDFとしてダウンロードできます。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/select"
                  className="px-8 py-4 bg-[#b87348] hover:bg-[#9a5d38] text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  無料で型紙を作る
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 border-2 border-[#b87348] text-[#b87348] hover:bg-[#b87348]/10 font-semibold text-lg rounded-xl transition-all"
                >
                  使い方を見る
                </a>
              </div>

              <p className="text-sm text-[#9a5d38] mt-4">
                無料プランで月5回まで体験可 ・ クレジットカード不要
              </p>
            </div>

            {/* Pattern Preview */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#b87348]/20 rounded-2xl blur-xl" aria-hidden="true" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 border border-[#e4d0b8]">
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#9a5d38]">
                    <span className="w-3 h-3 rounded-full bg-red-300" />
                    <span className="w-3 h-3 rounded-full bg-yellow-300" />
                    <span className="w-3 h-3 rounded-full bg-green-300" />
                    <span className="ml-2">型紙プレビュー — 二つ折り財布 95×110mm</span>
                  </div>
                  <PatternSvgPlaceholder
                    label="二つ折り財布"
                    className="w-full h-auto"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-[#9a5d38]">
                    <span>パーツ数: 4点</span>
                    <span>縫い代: 4mm</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">生成完了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#3d2212] mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              3ステップで型紙完成
            </h2>
            <p className="text-[#7d4a2d] text-lg">
              専門知識は不要。日本語で話しかけるだけで、プロ品質の型紙が手に入ります。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ step, icon, title, description }) => (
              <div
                key={step}
                className="relative bg-[#faf6f1] rounded-2xl p-8 border border-[#e4d0b8] hover:border-[#b87348] transition-colors group"
              >
                <div className="text-5xl mb-4">{icon}</div>
                <div className="text-xs font-bold text-[#b87348] uppercase tracking-widest mb-2">
                  Step {step}
                </div>
                <h3
                  className="text-xl font-bold text-[#3d2212] mb-3"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {title}
                </h3>
                <p className="text-[#7d4a2d] leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Items Section */}
      <section className="py-20 px-4 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#3d2212] mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              対応アイテム
            </h2>
            <p className="text-[#7d4a2d] text-lg">
              財布系から小物系まで、主要なレザークラフトアイテムに対応しています。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ITEMS.map(({ name, level, time, emoji }) => (
              <Link
                key={name}
                to="/select"
                className="bg-white rounded-xl p-4 border border-[#e4d0b8] hover:border-[#b87348] hover:shadow-md transition-all text-center group"
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="text-sm font-bold text-[#3d2212] mb-1">{name}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block mb-1 ${LEVEL_COLOR[level]}`}>
                  {level}
                </div>
                <div className="text-xs text-[#9a5d38]">{time}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/select"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87348] hover:bg-[#9a5d38] text-white font-bold rounded-xl transition-all shadow-lg"
            >
              アイテムを選んで型紙を作る
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="10" x2="16" y2="10" />
                <polyline points="11 5 16 10 11 15" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Gallery Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#3d2212] mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              サンプル型紙ギャラリー
            </h2>
            <p className="text-[#7d4a2d] text-lg">
              実際に生成された型紙のプレビューイメージです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLES.map(({ label, desc, highlight }) => (
              <div
                key={label}
                className={`${highlight} rounded-2xl p-6 border border-[#e4d0b8]`}
              >
                <PatternSvgPlaceholder
                  label={label}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h3 className="font-bold text-[#3d2212] mb-1">{label}</h3>
                <p className="text-sm text-[#7d4a2d]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#7d4a2d] to-[#5e3720]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            さっそく型紙を作ってみよう
          </h2>
          <p className="text-[#e4d0b8] text-lg mb-8">
            アカウント登録不要・クレジットカード不要。まずは無料で体験してください。
          </p>
          <Link
            to="/select"
            className="inline-block px-10 py-4 bg-[#f2e9dc] hover:bg-white text-[#5e3720] font-bold text-xl rounded-xl transition-all shadow-xl"
          >
            無料で型紙を作る
          </Link>
        </div>
      </section>
    </div>
  )
}
