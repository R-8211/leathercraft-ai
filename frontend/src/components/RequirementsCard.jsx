import { useState, useCallback } from 'react'
import styles from './RequirementsCard.module.css'

// 留め具の表示名マップ
const CLOSURE_LABELS = {
  snap:         'スナップボタン',
  l_zipper:     'Lファスナー',
  round_zipper: 'ラウンドファスナー',
  flap:         'フラップ（ベロ）',
  button:       'ボタン',
}

/**
 * 要件確認カードコンポーネント
 *
 * @param {{ requirements: object, onGenerate: (values: object) => void }} props
 *   requirements: バックエンドから返された要件オブジェクト
 *   onGenerate: 「生成する」ボタン押下時に呼ばれるコールバック。最終的な values を渡す。
 */
export default function RequirementsCard({ requirements, onGenerate }) {
  const { values: initialValues, autoFilled, warnings: initialWarnings, schema, summary, itemLabel } = requirements

  const [values, setValues] = useState({ ...initialValues })
  const [warnings, setWarnings] = useState(initialWarnings ?? [])
  const [isEditing, setIsEditing] = useState(false)

  const autoFilledSet = new Set(autoFilled ?? [])

  const handleValueChange = useCallback((key, rawValue, def) => {
    let parsed = rawValue
    if (def.type === 'number') {
      parsed = rawValue === '' ? '' : Number(rawValue)
    }
    setValues((prev) => ({ ...prev, [key]: parsed }))

    // リアルタイムバリデーション（数値のみ）
    if (def.type === 'number' && typeof parsed === 'number' && !isNaN(parsed)) {
      const newWarnings = []
      if (parsed < def.min) {
        newWarnings.push(`「${def.label}」が ${def.min}${def.unit} より小さい値（${parsed}${def.unit}）です。`)
      }
      if (parsed > def.max) {
        newWarnings.push(`「${def.label}」が ${def.max}${def.unit} より大きい値（${parsed}${def.unit}）です。`)
      }
      setWarnings((prev) => {
        // この key に関する既存の警告を削除して新しいものに入れ替える
        const filtered = prev.filter((w) => !w.includes(`「${def.label}」`))
        return [...filtered, ...newWarnings]
      })
    }
  }, [])

  const handleGenerate = useCallback(() => {
    // 空文字や NaN を除去し、安全な値に変換して渡す
    const finalValues = {}
    for (const [key, def] of Object.entries(schema)) {
      const v = values[key]
      if (def.type === 'number') {
        finalValues[key] = (v === '' || v === undefined || isNaN(Number(v))) ? def.default : Number(v)
      } else {
        finalValues[key] = v ?? def.default
      }
    }
    onGenerate(finalValues)
  }, [values, schema, onGenerate])

  return (
    <div className={styles.card} role="region" aria-label="要件確認カード">
      {/* ヘッダー */}
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderIcon} aria-hidden="true">
          <ChecklistIcon />
        </span>
        <div className={styles.cardHeaderText}>
          <p className={styles.cardTitle}>{itemLabel} の要件確認</p>
          <p className={styles.cardSubtitle}>内容を確認・編集してから生成ボタンを押してください</p>
        </div>
      </div>

      {/* 要件の要約 */}
      {summary && (
        <p className={styles.summaryText}>{summary}</p>
      )}

      {/* パラメータ一覧 */}
      <div className={styles.paramList} role="list">
        {Object.entries(schema).map(([key, def]) => {
          const value = values[key]
          const isAutoFilled = autoFilledSet.has(key) && !isEditing

          return (
            <div key={key} className={styles.paramRow} role="listitem">
              <label htmlFor={`req-${key}`} className={styles.paramLabel}>
                {def.label}
              </label>
              <div className={styles.paramValueWrap}>
                {def.type === 'number' && (
                  <>
                    <input
                      id={`req-${key}`}
                      type="number"
                      className={styles.paramInput}
                      value={value ?? ''}
                      min={def.min}
                      max={def.max}
                      onChange={(e) => handleValueChange(key, e.target.value, def)}
                      aria-label={`${def.label} (${def.min}〜${def.max}${def.unit})`}
                    />
                    {def.unit && <span className={styles.paramUnit}>{def.unit}</span>}
                  </>
                )}

                {def.type === 'boolean' && (
                  <label className={styles.toggle}>
                    <input
                      id={`req-${key}`}
                      type="checkbox"
                      className={styles.toggleInput}
                      checked={!!value}
                      onChange={(e) => handleValueChange(key, e.target.checked, def)}
                      aria-label={def.label}
                    />
                    <span className={`${styles.toggleTrack} ${value ? styles.on : ''}`} aria-hidden="true">
                      <span className={styles.toggleThumb} />
                    </span>
                    <span className={styles.toggleLabel}>{value ? 'あり' : 'なし'}</span>
                  </label>
                )}

                {def.type === 'select' && (
                  <select
                    id={`req-${key}`}
                    className={styles.paramSelect}
                    value={value ?? def.default}
                    onChange={(e) => handleValueChange(key, e.target.value, def)}
                    aria-label={def.label}
                  >
                    {(def.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>
                        {CLOSURE_LABELS[opt] ?? opt}
                      </option>
                    ))}
                  </select>
                )}

                {isAutoFilled && (
                  <span className={styles.autoBadge} title="指定がなかったため推奨値を補完しました">
                    推奨値
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 警告 */}
      {warnings.length > 0 && (
        <div className={styles.warnings} role="alert" aria-live="polite">
          {warnings.map((w, i) => (
            <div key={i} className={styles.warningItem}>
              <span className={styles.warningIcon} aria-hidden="true">
                <WarningIcon />
              </span>
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* フッター */}
      <div className={styles.cardFooter}>
        <button
          className={styles.editBtn}
          onClick={() => setIsEditing((prev) => !prev)}
          type="button"
          aria-pressed={isEditing}
        >
          {isEditing ? '編集完了' : '値を編集'}
        </button>
        <button
          className={styles.generateBtn}
          onClick={handleGenerate}
          type="button"
          aria-label="この内容で型紙を生成する"
        >
          <PatternIcon />
          この内容で生成
        </button>
      </div>
    </div>
  )
}

// ---- アイコン ----

function ChecklistIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function PatternIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
