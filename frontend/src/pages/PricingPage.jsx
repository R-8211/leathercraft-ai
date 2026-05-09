import { Link } from 'react-router-dom'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    nameJa: '無料プラン',
    price: 0,
    unit: '永久無料',
    color: 'border-[#e4d0b8]',
    headerBg: 'bg-[#faf6f1]',
    ctaStyle: 'border-2 border-[#b87348] text-[#b87348] hover:bg-[#b87348] hover:text-white',
    ctaLabel: '無料で始める',
    description: 'はじめてのレザークラフトに挑戦したい方向け',
    highlight: false,
    features: [
      { label: '月5回まで型紙生成', available: true },
      { label: '対応アイテム全種類', available: true },
      { label: 'SVGプレビュー', available: true },
      { label: 'PDFダウンロード（透かし入り）', available: true },
      { label: '型紙保存（最大5件）', available: true },
      { label: '透かしなしPDF', available: false },
      { label: '月50回以上の生成', available: false },
      { label: 'チャット履歴の長期保存', available: false },
      { label: '優先サポート', available: false },
    ],
  },
  {
    id: 'hobby',
    name: 'Hobby',
    nameJa: 'ホビープラン',
    price: 480,
    unit: '月額',
    color: 'border-[#b87348]',
    headerBg: 'bg-[#faf6f1]',
    ctaStyle: 'bg-[#b87348] hover:bg-[#9a5d38] text-white',
    ctaLabel: 'Hobbyプランを始める',
    description: '定期的にレザークラフトを楽しむホビーユーザー向け',
    highlight: false,
    features: [
      { label: '月50回まで型紙生成', available: true },
      { label: '対応アイテム全種類', available: true },
      { label: 'SVGプレビュー', available: true },
      { label: '透かしなしPDFダウンロード', available: true },
      { label: '型紙保存（最大30件）', available: true },
      { label: 'チャット履歴の長期保存', available: true },
      { label: '月100回以上の生成', available: false },
      { label: '優先サポート', available: false },
      { label: '商用利用', available: false },
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    nameJa: 'クリエイタープラン',
    price: 1480,
    unit: '月額',
    color: 'border-[#7d4a2d]',
    headerBg: 'bg-gradient-to-br from-[#f2e9dc] to-[#e4d0b8]',
    ctaStyle: 'bg-[#7d4a2d] hover:bg-[#5e3720] text-white',
    ctaLabel: 'Creatorプランを始める',
    description: '本格的に制作・販売を行うクリエイター向け',
    highlight: true,
    badge: 'おすすめ',
    features: [
      { label: '月200回まで型紙生成', available: true },
      { label: '対応アイテム全種類', available: true },
      { label: 'SVGプレビュー', available: true },
      { label: '透かしなしPDFダウンロード', available: true },
      { label: '型紙保存（最大100件）', available: true },
      { label: 'チャット履歴の長期保存', available: true },
      { label: '商用利用可', available: true },
      { label: '優先サポート', available: true },
      { label: 'API連携（β）', available: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    nameJa: 'プロプラン',
    price: 4980,
    unit: '月額',
    color: 'border-[#3d2212]',
    headerBg: 'bg-[#3d2212]',
    ctaStyle: 'bg-[#3d2212] hover:bg-black text-white',
    ctaLabel: 'Proプランを始める',
    description: 'ビジネス・大量生成・API連携が必要なプロ向け',
    highlight: false,
    features: [
      { label: '無制限で型紙生成', available: true },
      { label: '対応アイテム全種類', available: true },
      { label: 'SVGプレビュー', available: true },
      { label: '透かしなしPDFダウンロード', available: true },
      { label: '型紙保存（無制限）', available: true },
      { label: 'チャット履歴の長期保存', available: true },
      { label: '商用利用可', available: true },
      { label: '優先サポート', available: true },
      { label: 'API連携', available: true },
    ],
  },
]

const COMPARISON_ROWS = [
  { label: '月の生成回数', free: '5回', hobby: '50回', creator: '200回', pro: '無制限' },
  { label: 'PDFダウンロード', free: '透かし入り', hobby: '透かしなし', creator: '透かしなし', pro: '透かしなし' },
  { label: '型紙保存件数', free: '5件', hobby: '30件', creator: '100件', pro: '無制限' },
  { label: '商用利用', free: '×', hobby: '×', creator: '○', pro: '○' },
  { label: 'チャット履歴保存', free: '×', hobby: '○', creator: '○', pro: '○' },
  { label: '優先サポート', free: '×', hobby: '×', creator: '○', pro: '○' },
  { label: 'API連携', free: '×', hobby: '×', creator: 'β', pro: '○' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#f2e9dc] to-[#faf6f1] text-center border-b border-[#e4d0b8]">
        <h1
          className="text-4xl sm:text-5xl font-bold text-[#3d2212] mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          料金プラン
        </h1>
        <p className="text-[#7d4a2d] text-lg max-w-2xl mx-auto">
          まずは無料から始められます。使い方に合わせてプランをお選びください。
        </p>
      </section>

      {/* Plan Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 overflow-hidden bg-white shadow-sm ${plan.color} ${
                  plan.highlight ? 'shadow-lg scale-105' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#b87348] text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className={`${plan.headerBg} px-6 py-6`}>
                  <div
                    className={`text-lg font-bold mb-1 ${
                      plan.id === 'pro' ? 'text-white' : 'text-[#3d2212]'
                    }`}
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {plan.name}
                  </div>
                  <div className={`text-xs mb-4 ${plan.id === 'pro' ? 'text-[#d4b28e]' : 'text-[#9a5d38]'}`}>
                    {plan.nameJa}
                  </div>
                  <div className={`flex items-end gap-1 ${plan.id === 'pro' ? 'text-white' : 'text-[#3d2212]'}`}>
                    {plan.price === 0 ? (
                      <span className="text-3xl font-bold">無料</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">¥{plan.price.toLocaleString()}</span>
                        <span className="text-sm mb-1 text-[#9a5d38]">/{plan.unit}</span>
                      </>
                    )}
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${plan.id === 'pro' ? 'text-[#d4b28e]' : 'text-[#7d4a2d]'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="px-6 py-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map(({ label, available }) => (
                      <li key={label} className="flex items-start gap-2 text-sm">
                        {available ? (
                          <svg
                            className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-[#c4a882] mt-0.5 shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className={available ? 'text-[#3d2212]' : 'text-[#c4a882]'}>{label}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/select"
                    className={`block w-full text-center px-4 py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle}`}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#3d2212] text-center mb-10"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            プラン比較表
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#e4d0b8]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#7d4a2d] w-1/3">
                    機能
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      className={`text-center py-3 px-4 text-sm font-bold ${
                        p.highlight ? 'text-[#7d4a2d] bg-[#faf6f1]' : 'text-[#3d2212]'
                      }`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ label, free, hobby, creator, pro }, i) => (
                  <tr
                    key={label}
                    className={i % 2 === 0 ? 'bg-[#faf6f1]/50' : 'bg-white'}
                  >
                    <td className="py-3 px-4 text-sm text-[#5e3720] font-medium">{label}</td>
                    {[free, hobby, creator, pro].map((val, j) => (
                      <td
                        key={j}
                        className={`py-3 px-4 text-sm text-center ${
                          val === '×' ? 'text-[#c4a882]' : 'text-[#3d2212] font-medium'
                        } ${j === 2 ? 'bg-[#faf6f1]' : ''}`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#faf6f1]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#3d2212] text-center mb-10"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            よくある質問
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '無料プランからアップグレードできますか？',
                a: 'はい、いつでもアップグレードできます。アップグレード後は即時に新しいプランの機能をご利用いただけます。',
              },
              {
                q: 'いつでも解約できますか？',
                a: 'はい、いつでも解約できます。解約後も当月末まで有料機能をご利用いただけます。',
              },
              {
                q: '生成した型紙を商用利用できますか？',
                a: 'Creatorプラン以上では商用利用が可能です。詳しくは利用規約をご確認ください。',
              },
              {
                q: 'PDFの透かしとは何ですか？',
                a: '無料プランでダウンロードしたPDFには「LeatherCraft AI Free」の透かしが薄く入ります。Hobbyプラン以上では透かしのないクリーンなPDFをダウンロードできます。',
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="bg-white border border-[#e4d0b8] rounded-xl px-6 py-4 group"
              >
                <summary className="font-semibold text-[#3d2212] cursor-pointer list-none flex items-center justify-between gap-2">
                  {q}
                  <svg
                    className="w-4 h-4 text-[#b87348] shrink-0 transition-transform group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-[#7d4a2d] text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#7d4a2d] to-[#5e3720] text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          まずは無料で試してみよう
        </h2>
        <p className="text-[#e4d0b8] mb-8">
          クレジットカード不要・アカウント登録なしで始められます
        </p>
        <Link
          to="/select"
          className="inline-block px-8 py-4 bg-[#f2e9dc] hover:bg-white text-[#5e3720] font-bold text-lg rounded-xl transition-all"
        >
          無料で型紙を作る
        </Link>
      </section>
    </div>
  )
}
