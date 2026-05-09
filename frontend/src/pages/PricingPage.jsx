import { Link } from 'react-router-dom'
import styles from './PricingPage.module.css'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    nameJa: '無料プラン',
    price: 0,
    unit: '永久無料',
    headerClass: '',
    ctaClass: styles.ctaOutline,
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
    headerClass: '',
    ctaClass: styles.ctaBrown,
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
    headerClass: styles.planHeaderCream,
    ctaClass: styles.ctaDark,
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
    headerClass: styles.planHeaderDark,
    ctaClass: styles.ctaBlack,
    ctaLabel: 'Proプランを始める',
    description: 'ビジネス・大量生成・API連携が必要なプロ向け',
    highlight: false,
    isDark: true,
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
  { label: '月の生成回数', values: ['5回', '50回', '200回', '無制限'] },
  { label: 'PDFダウンロード', values: ['透かし入り', '透かしなし', '透かしなし', '透かしなし'] },
  { label: '型紙保存件数', values: ['5件', '30件', '100件', '無制限'] },
  { label: '商用利用', values: ['×', '×', '○', '○'] },
  { label: 'チャット履歴保存', values: ['×', '○', '○', '○'] },
  { label: '優先サポート', values: ['×', '×', '○', '○'] },
  { label: 'API連携', values: ['×', '×', 'β', '○'] },
]

const FAQ_ITEMS = [
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
]

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>料金プラン</h1>
        <p className={styles.pageSubtitle}>
          まずは無料から始められます。使い方に合わせてプランをお選びください。
        </p>
      </section>

      {/* Plan Cards */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.inner}>
          <div className={styles.plansGrid}>
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`${styles.planCard} ${plan.highlight ? styles.planCardHighlight : ''}`}
              >
                {plan.badge && <span className={styles.planBadge}>{plan.badge}</span>}

                <div className={`${styles.planHeader} ${plan.headerClass || ''}`}>
                  <p className={`${styles.planName} ${plan.isDark ? styles.planNameLight : ''}`}>
                    {plan.name}
                  </p>
                  <p className={`${styles.planNameJa} ${plan.isDark ? styles.planNameJaLight : ''}`}>
                    {plan.nameJa}
                  </p>
                  <div className={styles.planPriceRow}>
                    {plan.price === 0 ? (
                      <span className={`${styles.planPrice} ${plan.isDark ? styles.planPriceLight : ''}`}>
                        無料
                      </span>
                    ) : (
                      <>
                        <span className={`${styles.planPrice} ${plan.isDark ? styles.planPriceLight : ''}`}>
                          ¥{plan.price.toLocaleString()}
                        </span>
                        <span className={`${styles.planPriceUnit} ${plan.isDark ? styles.planPriceUnitLight : ''}`}>
                          /{plan.unit}
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`${styles.planDesc} ${plan.isDark ? styles.planDescLight : ''}`}>
                    {plan.description}
                  </p>
                </div>

                <div className={styles.planFeatures}>
                  <ul className={styles.featureList}>
                    {plan.features.map(({ label, available }) => (
                      <li key={label} className={styles.featureItem}>
                        {available ? (
                          <CheckIcon className={`${styles.featureIcon} ${styles.iconCheck}`} />
                        ) : (
                          <XIcon className={`${styles.featureIcon} ${styles.iconX}`} />
                        )}
                        <span className={available ? styles.featureAvailable : styles.featureUnavailable}>
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/select" className={`${styles.planCta} ${plan.ctaClass}`}>
                    {plan.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.innerNarrow}>
          <h2 className={styles.sectionTitle}>プラン比較表</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>機能</th>
                  {PLANS.map((p, i) => (
                    <th key={p.id} className={`${styles.thPlan} ${i === 2 ? styles.thPlanHighlight : ''}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ label, values }, rowIdx) => (
                  <tr key={label} className={rowIdx % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td className={styles.tdFeature}>{label}</td>
                    {values.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`${styles.tdValue} ${colIdx === 2 ? styles.tdValueHighlight : ''} ${val === '×' ? styles.tdValueMuted : ''}`}
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
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.innerXNarrow}>
          <h2 className={styles.sectionTitle}>よくある質問</h2>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  {q}
                  <ChevronIcon className={styles.faqChevron} />
                </summary>
                <p className={styles.faqBody}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>まずは無料で試してみよう</h2>
        <p className={styles.ctaBody}>クレジットカード不要・アカウント登録なしで始められます</p>
        <Link to="/select" className={styles.ctaBtn}>無料で型紙を作る</Link>
      </section>
    </div>
  )
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2 8 6 12 14 4" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 6 8 10 12 6" />
    </svg>
  )
}
