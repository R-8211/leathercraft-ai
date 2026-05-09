import { useNavigate } from 'react-router-dom'
import styles from './SelectPage.module.css'

const ITEMS = [
  {
    id: 'bifold-wallet',
    name: '二つ折り財布',
    level: '中級',
    levelKey: 'levelIntermediate',
    time: '3〜5時間',
    icon: WalletIcon,
    description: 'カードポケット・札入れ・小銭入れ付き',
  },
  {
    id: 'trifold-wallet',
    name: '三つ折り財布',
    level: '中級',
    levelKey: 'levelIntermediate',
    time: '4〜6時間',
    icon: TrifoldIcon,
    description: 'コンパクトで収納力の高い三つ折り',
  },
  {
    id: 'long-wallet',
    name: '長財布',
    level: '上級',
    levelKey: 'levelAdvanced',
    time: '5〜8時間',
    icon: LongWalletIcon,
    description: 'ラウンドファスナー型またはかぶせ型',
  },
  {
    id: 'card-case',
    name: 'カードケース',
    level: '初心者',
    levelKey: 'levelBeginner',
    time: '1〜2時間',
    icon: CardIcon,
    description: '名刺・カードをすっきり収納',
  },
  {
    id: 'coin-purse',
    name: '小銭入れ',
    level: '初心者',
    levelKey: 'levelBeginner',
    time: '1〜2時間',
    icon: PurseIcon,
    description: 'L字ファスナー型・スナップ型など',
  },
  {
    id: 'coin-case',
    name: 'コインケース',
    level: '中級',
    levelKey: 'levelIntermediate',
    time: '2〜3時間',
    icon: CoinIcon,
    description: 'BOX型の小銭入れ、容量たっぷり',
  },
  {
    id: 'key-case',
    name: 'キーケース',
    level: '初心者',
    levelKey: 'levelBeginner',
    time: '1〜2時間',
    icon: KeyIcon,
    description: '鍵を整理してスマートに持ち歩く',
  },
]

export default function SelectPage() {
  const navigate = useNavigate()

  const handleSelect = (item) => {
    navigate(`/chat/${item.id}`, { state: { itemName: item.name } })
  }

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
            アイテムを選ぶと AI 対話画面へ進みます。どんな仕様にしたいか自然な言葉で伝えてください。
          </p>
        </div>

        <div className={styles.grid}>
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={styles.itemCard}
                onClick={() => handleSelect(item)}
                aria-label={`${item.name}を選択`}
              >
                <div className={styles.itemIconWrap}>
                  <Icon />
                </div>
                <p className={styles.itemName}>{item.name}</p>
                <span className={`${styles.itemLevel} ${styles[item.levelKey]}`}>
                  {item.level}
                </span>
                <span className={styles.itemTime}>{item.time}</span>
                <p className={styles.itemDescription}>{item.description}</p>
              </button>
            )
          })}
        </div>

        <p className={styles.hint}>
          <TipIcon />
          初めての方は「カードケース」や「小銭入れ」など、難易度「初心者」のアイテムからお試しください。
        </p>
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

function TipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
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

function TrifoldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="9" y1="4" x2="9" y2="20" />
      <line x1="15" y1="4" x2="15" y2="20" />
      <path d="M12 9v2M12 13v2" />
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
