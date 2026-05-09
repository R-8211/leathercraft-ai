import { Link } from 'react-router-dom'
import PatternSvgPlaceholder from '../components/PatternSvgPlaceholder'
import styles from './LandingPage.module.css'

const STEPS = [
  {
    step: '01',
    icon: <ChatIcon />,
    title: '日本語で伝える',
    description: '「マチ付きの二つ折り財布、カードは6枚入る感じで」のように、作りたいものを自然な言葉で入力するだけ。',
  },
  {
    step: '02',
    icon: <SparkleIcon />,
    title: 'AIが要件を整理',
    description: 'AIが寸法・仕様を自動で整理します。不明な点があれば追質問して、あなたの希望に合った型紙に仕上げます。',
  },
  {
    step: '03',
    icon: <FileIcon />,
    title: '型紙を受け取る',
    description: '縫い代・ステッチ線・寸法入りの実寸SVGが即座に生成。A4 PDF でダウンロードして家庭用プリンターで印刷できます。',
  },
]

const ITEMS = [
  { name: '二つ折り財布', level: '中級', time: '3〜5時間', icon: <WalletIcon />, levelKey: 'levelIntermediate' },
  { name: 'カードケース', level: '初心者', time: '1〜2時間', icon: <CardIcon />, levelKey: 'levelBeginner' },
  { name: '小銭入れ', level: '初心者', time: '1〜2時間', icon: <PurseIcon />, levelKey: 'levelBeginner' },
  { name: 'コインケース', level: '中級', time: '2〜3時間', icon: <CoinIcon />, levelKey: 'levelIntermediate' },
  { name: '長財布', level: '上級', time: '5〜8時間', icon: <LongWalletIcon />, levelKey: 'levelAdvanced' },
  { name: 'キーケース', level: '初心者', time: '1〜2時間', icon: <KeyIcon />, levelKey: 'levelBeginner' },
]

const SAMPLES = [
  { label: '二つ折り財布', desc: 'カード6枚・小銭入れ付き', cardClass: styles.galleryCardCream },
  { label: 'カードケース', desc: 'スリムな名刺入れ型', cardClass: styles.galleryCardLight },
  { label: 'L字コインケース', desc: 'コンパクト・実用的', cardClass: styles.galleryCardCream },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              AI型紙生成サービス
            </div>
            <h1 className={styles.heroTitle}>
              日本語で伝えるだけで
              <br />
              <span className={styles.heroAccent}>型紙が手に入る</span>
            </h1>
            <p className={styles.heroBody}>
              「マチ付きの二つ折り財布、カードは6枚入る感じで」——そんな一言から、縫い代・ステッチ線・寸法入りの実寸型紙が即座に生成されます。家庭用プリンターでA4印刷可能なPDFとしてダウンロードできます。
            </p>
            <div className={styles.heroActions}>
              <Link to="/select" className={styles.btnPrimary}>無料で型紙を作る</Link>
              <a href="#how-it-works" className={styles.btnOutline}>使い方を見る</a>
            </div>
            <p className={styles.heroNote}>無料プランで月5回まで体験可 ・ クレジットカード不要</p>
          </div>

          <div className={styles.heroPreview}>
            <div className={styles.previewCard}>
              <div className={styles.previewBar}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <span className={styles.previewBarLabel}>型紙プレビュー — 二つ折り財布 95×110mm</span>
              </div>
              <PatternSvgPlaceholder label="二つ折り財布" />
              <div className={styles.previewFooter}>
                <span className={styles.previewMeta}>パーツ数: 4点</span>
                <span className={styles.previewMeta}>縫い代: 4mm</span>
                <span className={styles.previewBadge}>生成完了</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>3ステップで型紙完成</h2>
            <p className={styles.sectionSubtitle}>
              専門知識は不要。日本語で話しかけるだけで、プロ品質の型紙が手に入ります。
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map(({ step, icon, title, description }) => (
              <div key={step} className={styles.stepCard}>
                <div className={styles.stepIconWrap}>{icon}</div>
                <p className={styles.stepNumber}>Step {step}</p>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Items */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>対応アイテム</h2>
            <p className={styles.sectionSubtitle}>
              財布系から小物系まで、主要なレザークラフトアイテムに対応しています。
            </p>
          </div>
          <div className={styles.itemsGrid}>
            {ITEMS.map(({ name, level, time, icon, levelKey }) => (
              <Link key={name} to="/select" className={styles.itemCard}>
                <div className={styles.itemIconWrap}>{icon}</div>
                <p className={styles.itemName}>{name}</p>
                <span className={`${styles.itemLevel} ${styles[levelKey]}`}>{level}</span>
                <span className={styles.itemTime}>{time}</span>
              </Link>
            ))}
          </div>
          <div className={styles.itemsCta}>
            <Link to="/select" className={styles.btnPrimaryWithIcon}>
              アイテムを選んで型紙を作る
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Gallery */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>サンプル型紙ギャラリー</h2>
            <p className={styles.sectionSubtitle}>実際に生成された型紙のプレビューイメージです。</p>
          </div>
          <div className={styles.galleryGrid}>
            {SAMPLES.map(({ label, desc, cardClass }) => (
              <div key={label} className={`${styles.galleryCard} ${cardClass}`}>
                <PatternSvgPlaceholder label={label} />
                <p className={styles.galleryTitle}>{label}</p>
                <p className={styles.galleryDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>さっそく型紙を作ってみよう</h2>
          <p className={styles.ctaBannerBody}>
            アカウント登録不要・クレジットカード不要。まずは無料で体験してください。
          </p>
          <Link to="/select" className={styles.ctaBannerBtn}>無料で型紙を作る</Link>
        </div>
      </section>
    </div>
  )
}

/* ---- SVG Icons ---- */
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <circle cx="8.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      <path d="M9 9l-.707-.707M15.707 15.707L15 15M9 15l-.707.707M15.707 8.293L15 9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="12" y2="17" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M2 12h20" />
      <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 14h5" />
    </svg>
  )
}

function PurseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8V6a6 6 0 0112 0v2" />
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M10 13a2 2 0 104 0" />
    </svg>
  )
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.5-2.5 3-2.5 3s-2.5-1.5-2.5-3z" />
    </svg>
  )
}

function LongWalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18" />
      <rect x="14" y="11" width="5" height="2" rx="1" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7.5" cy="9.5" r="4.5" />
      <path d="M12 9.5h9" />
      <path d="M18 9.5v2.5" />
      <path d="M21 9.5v2" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="9" x2="15" y2="9" />
      <polyline points="10 4 15 9 10 14" />
    </svg>
  )
}
