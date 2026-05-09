import { Link } from 'react-router-dom'
import styles from './SelectPage.module.css'

const ITEMS = [
  { name: '二つ折り財布', level: '中級', time: '3〜5時間', icon: <WalletIcon />, levelKey: 'levelIntermediate' },
  { name: 'カードケース', level: '初心者', time: '1〜2時間', icon: <CardIcon />, levelKey: 'levelBeginner' },
  { name: '小銭入れ', level: '初心者', time: '1〜2時間', icon: <PurseIcon />, levelKey: 'levelBeginner' },
  { name: 'コインケース', level: '中級', time: '2〜3時間', icon: <CoinIcon />, levelKey: 'levelIntermediate' },
  { name: '長財布', level: '上級', time: '5〜8時間', icon: <LongWalletIcon />, levelKey: 'levelAdvanced' },
  { name: 'キーケース', level: '初心者', time: '1〜2時間', icon: <KeyIcon />, levelKey: 'levelBeginner' },
]

export default function SelectPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <CraftIcon />
            アイテム選択
          </div>
          <h1 className={styles.title}>作りたいアイテムを選ぶ</h1>
          <p className={styles.subtitle}>
            アイテムを選ぶと、AI対話画面へ進みます。どんな仕様にしたいか自然な言葉で伝えてください。
          </p>
        </div>

        <div className={styles.notice}>
          <InfoIcon className={styles.noticeIcon} />
          <p className={styles.noticeText}>
            この機能は <strong>Sprint 2</strong> で実装予定です。現在は選択UIのデザインプレビューとして表示しています。
          </p>
        </div>

        <div className={styles.grid}>
          {ITEMS.map(({ name, level, time, icon, levelKey }) => (
            <div key={name} className={styles.itemCard} aria-disabled="true">
              <span className={styles.comingSoon}>準備中</span>
              <div className={styles.itemIconWrap}>{icon}</div>
              <p className={styles.itemName}>{name}</p>
              <span className={`${styles.itemLevel} ${styles[levelKey]}`}>{level}</span>
              <span className={styles.itemTime}>{time}</span>
            </div>
          ))}
        </div>

        <Link to="/" className={styles.backLink}>
          <ArrowLeftIcon />
          トップページへ戻る
        </Link>
      </div>
    </div>
  )
}

function CraftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function InfoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="13" y1="8" x2="3" y2="8" />
      <polyline points="7 4 3 8 7 12" />
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
