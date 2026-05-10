import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import PatternSvgPlaceholder from '../components/PatternSvgPlaceholder'
import RequirementsCard from '../components/RequirementsCard'
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

// サジェスト例（アイテム別）
const SUGGEST_EXAMPLES_MAP = {
  'bifold-wallet': [
    'カードが6枚入る薄めの財布を作りたい',
    '小銭入れ付きで少しマチのある二つ折りがほしい',
    'シンプルでコンパクトな財布にしたい',
  ],
  'trifold-wallet': [
    'カードをたくさん入れたい三つ折りを作りたい',
    'コンパクトで使いやすい三つ折りがほしい',
    '小銭入れ付きで使いやすいものを作りたい',
  ],
  'long-wallet': [
    'カードが10枚以上入る長財布を作りたい',
    'ラウンドファスナーで安心感のある長財布がほしい',
    'シンプルなフラップタイプの長財布を作りたい',
  ],
  'card-case': [
    'カードが6枚入るカードケースを作りたい',
    '薄くてスリムなカードケースにしたい',
    '角丸でやわらかい印象のカードケースがほしい',
  ],
  'coin-purse': [
    'Lファスナーで開きやすい小銭入れを作りたい',
    'スナップボタンのシンプルな小銭入れがほしい',
    '少しマチをつけて収納力を上げたい',
  ],
  'coin-case': [
    'BOX型でしっかり収納できるコインケースを作りたい',
    'ラウンドファスナーで大きく開くコインケースがほしい',
    'コンパクトで持ち歩きやすいコインケースにしたい',
  ],
  'key-case': [
    'キーフックが4つ入るキーケースを作りたい',
    'コンパクトで使いやすいキーケースがほしい',
    'スナップボタンで開けやすいキーケースにしたい',
  ],
}

const DEFAULT_SUGGESTS = [
  'できるだけシンプルに作りたい',
  '使いやすさを重視したデザインにしたい',
  '標準的なサイズで作ってほしい',
]

const API_BASE = 'http://localhost:3001'

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
      requirements: null,
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat') // スマホ用タブ: 'chat' | 'preview'
  const [apiError, setApiError] = useState(null) // API接続エラー
  const [finalRequirements, setFinalRequirements] = useState(null) // 生成確定した要件

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const suggests = SUGGEST_EXAMPLES_MAP[itemId] ?? DEFAULT_SUGGESTS

  // チャット履歴を Claude API 用フォーマットに変換（requirements カードを除く通常メッセージのみ）
  const buildHistory = useCallback((msgs) => {
    return msgs
      .filter((m) => m.id !== 'initial' && !m.isRequirementsCard)
      .map((m) => ({
        role: m.role,
        content: m.text,
      }))
  }, [])

  // メッセージが追加されたら最下部へスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async () => {
    const text = inputText.trim()
    if (!text || isLoading) return

    setApiError(null)

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
      requirements: null,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // バックエンド API 呼び出し
      const history = buildHistory([...messages, userMessage])

      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, history }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error ?? `HTTP ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.text,
        timestamp: new Date(),
        requirements: null,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // 要件が揃った場合はカードメッセージを追加
      if (data.requirements) {
        const cardMessage = {
          id: `requirements-${Date.now()}`,
          role: 'assistant',
          text: '',
          timestamp: new Date(),
          requirements: data.requirements,
          isRequirementsCard: true,
        }
        setMessages((prev) => [...prev, cardMessage])
      }
    } catch (err) {
      console.error('[ChatPage] API error:', err)
      const errMsg = err.message?.includes('fetch')
        ? 'サーバーに接続できませんでした。バックエンドが起動しているか確認してください。'
        : err.message ?? 'エラーが発生しました。'
      setApiError(errMsg)

      // エラーメッセージを吹き出しとして表示
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          text: `申し訳ありません。エラーが発生しました。\n${errMsg}`,
          timestamp: new Date(),
          requirements: null,
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [inputText, isLoading, messages, itemId, buildHistory])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSuggestClick = (text) => {
    setInputText(text)
    inputRef.current?.focus()
  }

  const handleGenerate = useCallback((finalValues) => {
    // 最終確定した要件を設定し、生成フローへ（Sprint 4 で本実装）
    setFinalRequirements(finalValues)

    // 確定メッセージを追加
    setMessages((prev) => [
      ...prev,
      {
        id: `user-confirm-${Date.now()}`,
        role: 'user',
        text: 'この内容で型紙を生成してください。',
        timestamp: new Date(),
        requirements: null,
      },
      {
        id: `assistant-confirm-${Date.now()}`,
        role: 'assistant',
        text: '要件を確定しました。型紙を生成します...\n\n（型紙生成エンジンは Sprint 4 で実装予定です）',
        timestamp: new Date(),
        requirements: null,
      },
    ])
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  }

  const formatMessageText = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => (
      <span key={i}>
        {line}
        {i < lines.length - 1 && <br />}
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

      {/* API エラーバナー */}
      {apiError && (
        <div className={styles.errorBanner} role="alert">
          <WarningIcon />
          <span>{apiError}</span>
          <button
            className={styles.errorDismiss}
            onClick={() => setApiError(null)}
            aria-label="エラーを閉じる"
          >
            ×
          </button>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className={styles.body}>
        {/* 左ペイン: チャット */}
        <div
          className={`${styles.chatPane} ${activeTab === 'preview' ? styles.hiddenOnMobile : ''}`}
          role="tabpanel"
          aria-label="チャット"
        >
          {/* メッセージ一覧 */}
          <div className={styles.messages} aria-live="polite" aria-label="チャット履歴">
            {messages.map((msg) => {
              // 要件確認カードメッセージ
              if (msg.isRequirementsCard && msg.requirements) {
                return (
                  <div key={msg.id} className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                    <div className={styles.avatar} aria-hidden="true">
                      <AiIcon />
                    </div>
                    <div className={`${styles.bubbleWrap} ${styles.bubbleWrapWide}`}>
                      <RequirementsCard
                        requirements={msg.requirements}
                        onGenerate={handleGenerate}
                      />
                      <span className={styles.timestamp}>{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                )
              }

              return (
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
                      className={[
                        styles.bubble,
                        msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                        msg.isError ? styles.bubbleError : '',
                      ].join(' ')}
                    >
                      {formatMessageText(msg.text)}
                    </div>
                    <span className={`${styles.timestamp} ${msg.role === 'user' ? styles.timestampRight : ''}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              )
            })}

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
                {suggests.map((example) => (
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
            <p className={styles.inputHint}>Enter で送信 / Shift + Enter で改行</p>
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
            {finalRequirements && (
              <span className={styles.previewStatus}>要件確定済み</span>
            )}
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewPlaceholder}>
              <PatternSvgPlaceholder />
              {!finalRequirements && (
                <div className={styles.previewOverlay} aria-hidden="true">
                  <div className={styles.previewOverlayContent}>
                    <PatternDisplayIcon />
                    <p className={styles.previewOverlayTitle}>型紙はここに表示されます</p>
                    <p className={styles.previewOverlayText}>
                      チャットで要望をお伝えいただくと、
                      <br />
                      AI が型紙を生成してここに表示します。
                    </p>
                  </div>
                </div>
              )}
              {finalRequirements && (
                <div className={styles.previewOverlay} aria-hidden="true">
                  <div className={styles.previewOverlayContent}>
                    <GeneratingIcon />
                    <p className={styles.previewOverlayTitle}>Sprint 4 で実装予定</p>
                    <p className={styles.previewOverlayText}>
                      要件が確定しました。
                      <br />
                      SVG 型紙生成は Sprint 4 で実装されます。
                    </p>
                  </div>
                </div>
              )}
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

function PatternDisplayIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeDasharray="2 2" />
    </svg>
  )
}

function GeneratingIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
