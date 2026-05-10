import Anthropic from '@anthropic-ai/sdk'
import { ITEM_SCHEMAS } from './itemSchemas.js'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MODEL = 'claude-haiku-4-5-20251001'

/**
 * アイテム別のシステムプロンプトを生成する
 */
function buildSystemPrompt(itemId) {
  const schema = ITEM_SCHEMAS[itemId]
  const itemLabel = schema?.label ?? 'レザークラフト製品'

  const paramList = schema
    ? Object.entries(schema.params)
        .map(([key, def]) => {
          let desc = `  - ${def.label}（${key}）: ${def.unit ? `単位=${def.unit}` : ''}`
          if (def.type === 'number') desc += `, 推奨範囲 ${def.min}〜${def.max}`
          if (def.type === 'boolean') desc += ', true/false'
          if (def.type === 'select') desc += `, 選択肢: ${def.options?.join('/')} `
          return desc
        })
        .join('\n')
    : ''

  return `あなたはレザークラフト専門のAIアシスタントです。
ユーザーが「${itemLabel}」を作るための型紙生成を支援しています。

## あなたの役割
1. ユーザーの自然言語の要望を聞いて、型紙生成に必要なパラメータを引き出す
2. 情報が不足している場合は、具体的な追質問をして必要な値を確認する（最大2往復まで）
3. 十分な情報が集まったら、または2往復の対話が済んだら、未指定の値をデフォルトで補完して要件を確定する

## 抽出すべきパラメータ（「${itemLabel}」の場合）
${paramList}

## 応答ルール
- 日本語でフレンドリーに会話する
- 一度に聞く質問は最大2つまで（ユーザーを圧倒しない）
- 数値が曖昧な場合（「薄め」「小さめ」など）は、具体的な数値を提案してその値で確定する
- **ユーザーが「確定してください」「これで進めて」「お願いします」などの確認意思を示したら、必ず <requirements> タグを出力する**
- **主要なパラメータ（幅・高さ・カード枚数など）が確定したら、残りはデフォルト値で補完して <requirements> タグを出力する**
- デフォルトで補完した値は summary 内に「〇〇はデフォルト値を使用」と明記する

## 要件確定の出力形式
全てのパラメータが揃ったら（未指定はデフォルト補完）、必ず以下の形式で出力すること：

<requirements>
{"itemId":"${itemId}","values":{},"ready":true,"summary":"要件の要約（日本語）"}
</requirements>

各パラメータの値（valuesオブジェクト内）:
${Object.entries(schema?.params ?? {}).map(([k, d]) => `  "${k}": ${d.type === 'boolean' ? 'true または false' : d.type === 'number' ? `整数（${d.min}〜${d.max}）` : `"${d.options?.join('" または "') ?? '文字列'}"`}`).join('\n')}

要件が不足している場合は <requirements> タグを出力せず、追質問のみ行う。
<requirements> タグ内のJSONは必ず有効なJSON（コメントなし、ダブルクォートのみ）にすること。`
}

/**
 * チャットメッセージを Claude へ送信し、応答とパース済み要件を返す
 * @param {string} itemId
 * @param {Array<{role: 'user'|'assistant', content: string}>} history
 * @returns {Promise<{ text: string, requirements: object|null }>}
 */
export async function sendChatMessage(itemId, history) {
  const systemPrompt = buildSystemPrompt(itemId)

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: history,
  })

  const text = response.content
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('')

  // <requirements>...</requirements> ブロックを抽出してパース
  const reqMatch = text.match(/<requirements>([\s\S]*?)<\/requirements>/)
  let requirements = null

  if (reqMatch) {
    try {
      requirements = JSON.parse(reqMatch[1].trim())
    } catch (e) {
      console.error('[claudeService] requirements JSON parse error:', e)
    }
  }

  // ユーザーに表示するテキストから <requirements> ブロックを除去
  const displayText = text.replace(/<requirements>[\s\S]*?<\/requirements>/, '').trim()

  return { text: displayText, requirements }
}
