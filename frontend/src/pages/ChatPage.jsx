import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import PatternSvgPlaceholder from '../components/PatternSvgPlaceholder'
import styles from './ChatPage.module.css'

// アイテム名の対応表（URLパラメータ → 表示名）
const ITEM_NAMES = {
  'bifold-wallet': '二つ折り財布',
  'trifold-wallet': '三つ折り財布',
  'long-wallet': '長財布',
  'card-case': 'カードケース',
  'coin-purse': '小銭入れ',
  'coin-case': 'コインケース',
  'key-case': 'キーケース',
}

// サジェスト例
const SUGGEST_EXAMPLES = [
  'カードが6枚入る薄めの財布を作りたい',
  '小銭がたくさん入るBOX型コインケース',
  '普段使いできるシンプルなキーケース',
]

// スタブ AI 応答生成（ダミー）
function generateStubResponse(userMessage, itemName) {
  const lower = userMessage.toLowerCase()

  if (lower.includes('カード') && lower.includes('枚')) {
    return `わかりました！カードをたくさん収納できる${itemName}ですね。カードポケットの枚数を考慮して設計します。\n\n他に気になる点はありますか？例えば:\n- 小銭入れはつけますか？\n- 革の色や厚みのご希望は？\n- 大きさのイメージはありますか？`
  }
  if (lower.includes('薄') || lower.includes('コンパクト') || lower.includes('slim')) {
    return `薄くてコンパクトな${itemName}をお作りします。スリムなデザインを実現するために、内部のパーツ構成を工夫しますね。\n\n具体的な厚みや縦横のサイズのイメージはありますか？`
  }
  if (lower.includes('box') || lower.includes('box型') || lower.includes('ボックス')) {
    return `BOX型の${itemName}ですね！マチをしっかり取ることで収納力が上がります。\n\n開口部はファスナーにしますか？それともスナップボタンやマグネットのご希望はありますか？`
  }
  if (lower.includes('シンプル') || lower.includes('普段使い') || lower.includes('定番')) {
    return `シンプルで使いやすい${itemName}ですね。飽きのこないデザインで長く使えるものを作りましょう。\n\n革の色や素材のイメージはありますか？（タンニン鞣し・クロム鞣しなど）`
  }

  // デフォルト応答
  return `ありがとうございます！${itemName}の制作ですね。\n\nもう少し詳しく教えていただけますか？例えば:\n- どんな用途で使いますか？\n- 大きさのイメージはありますか？\n- 特にこだわりたい点はありますか？\n\nご要望をもとに最適な型紙を生成します。`
}

export default function ChatPage() {
  const { itemId } = useParams()
  const location = useLocation()
  const itemName = location.state?.itemName ?? ITEM_NAMES[itemId] ?? 'アイテム'

  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      text: `こんにちは！${itemName}の型紙を作成します。\nどんな仕様にしたいか、自然な言葉で教えてください。\n\n例:「カードが6枚入って、小銭入れもほしい」「できるだけスリムにしたい」など、思いつくことをそのままお伝えください。`,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat') // スマホ用タブ: 'chat' | 'preview'

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // メッセージが追加されたら最下部へスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async () => {
    const text = inputText.trim()
    if (!text || isLoading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // スタブ応答を 1〜2 秒後に返す
    const delay = 800 + Math.random() * 800
    await new Promise((resolve) => setTimeout(resolve, delay))

    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: generateStubResponse(text, itemName),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }, [inputText, isLoading, itemName])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
    // Shift+Enter は通常の改行（デフォルト動作）
  }

  const handleSuggestClick = (text) => {
    setInputText(text)
    inputRef.current?.focus()
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  }

  const formatMessageText = (text) => {
    // 改行を <br> に変換
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className={styles.page}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <Link to="/select" className={styles.backButton} aria-label="アイテム選択に戻る">
          <BackIcon />
        </Link>
        <div className={styles.headerInfo}>
          <h1 className={styles.headerTitle}>{itemName}</h1>
          <span className={styles.headerSub}>型紙生成 AI</span>
        </div>
        {/* スマホ用タブ切り替え */}
        <div className={styles.tabSwitcher} role="tablist" aria-label="表示切り替え">
          <button
            role="tab"
            aria-selected={activeTab === 'chat'}
            className={`${styles.tabBtn} ${activeTab === 'chat' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <ChatTabIcon />
            チャット
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'preview'}
            className={`${styles.tabBtn} ${activeTab === 'preview' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <PreviewTabIcon />
            プレビュー
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className={styles.body}>
        {/* 左ペイン: チャット */}
        <div
          className={`${styles.chatPane} ${activeTab === 'preview' ? styles.hiddenOnMobile : ''}`}
          role="tabpanel"
          aria-label="チャット"
        >
          {/* メッセージ一覧 */}
          <div className={styles.messages} ref={messagesContainerRef} aria-live="polite" aria-label="チャット履歴">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}`}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.avatar} aria-hidden="true">
                    <AiIcon />
                  </div>
                )}
                <div className={styles.bubbleWrap}>
                  <div
                    className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                  <span className={`${styles.timestamp} ${msg.role === 'user' ? styles.timestampRight : ''}`}>
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* ローディング表示 */}
            {isLoading && (
              <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                <div className={styles.avatar} aria-hidden="true">
                  <AiIcon />
                </div>
                <div className={styles.bubbleWrap}>
                  <div className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.bubbleLoading}`} aria-label="AIが考え中">
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* サジェスト例 */}
          {messages.length === 1 && !isLoading && (
            <div className={styles.suggests} aria-label="入力例">
              <p className={styles.suggestsLabel}>入力例</p>
              <div className={styles.suggestsList}>
                {SUGGEST_EXAMPLES.map((example) => (
                  <button
                    key={example}
                    className={styles.suggestBtn}
                    onClick={() => handleSuggestClick(example)}
                    type="button"
                  >
                    <SuggestIcon />
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 入力エリア */}
          <div className={styles.inputArea}>
            <div className={styles.inputWrap}>
              <textarea
                ref={inputRef}
                className={styles.textarea}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="要望を入力（Enter で送信・Shift+Enter で改行）"
                rows={1}
                disabled={isLoading}
                aria-label="メッセージ入力"
              />
              <button
                className={styles.sendButton}
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                type="button"
                aria-label="送信"
              >
                <SendIcon />
              </button>
            </div>
            <p className={styles.inputHint}>Enter で送信　Shift + Enter で改行</p>
          </div>
        </div>

        {/* 右ペイン: 型紙プレビュー */}
        <div
          className={`${styles.previewPane} ${activeTab === 'chat' ? styles.hiddenOnMobile : ''}`}
          role="tabpanel"
          aria-label="型紙プレビュー"
        >
          <div className={styles.previewHeader}>
            <h2 className={styles.previewTitle}>型紙プレビュー</h2>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewPlaceholder}>
              <PatternSvgPlaceholder />
              <div className={styles.previewOverlay} aria-hidden="true">
                <div className={styles.previewOverlayContent}>
                  <PatternIcon />
                  <p className={styles.previewOverlayTitle}>型紙はここに表示されます</p>
                  <p className={styles.previewOverlayText}>
                    チャットで要望をお伝えいただくと、
                    <br />
                    AI が型紙を生成してここに表示します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- アイコンコンポーネント ----

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function AiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7v1a7 7 0 01-7 7v1a2 2 0 01-4 0v-1a7 7 0 01-7-7v-1a7 7 0 017-7V4a2 2 0 012-2zm0 4a5 5 0 00-5 5v1a5 5 0 005 5 5 5 0 005-5v-1a5 5 0 00-5-5zm0 3a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function SuggestIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function PatternIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeDasharray="2 2" />
    </svg>
  )
}

function ChatTabIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function PreviewTabIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}
