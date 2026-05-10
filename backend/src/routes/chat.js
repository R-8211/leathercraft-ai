import { Router } from 'express'
import { sendChatMessage } from '../claudeService.js'
import { buildRequirements, validateRequirements, ITEM_SCHEMAS } from '../itemSchemas.js'

const router = Router()

/**
 * POST /api/chat
 * Body: {
 *   itemId: string,
 *   history: Array<{role: 'user'|'assistant', content: string}>
 * }
 * Response: {
 *   text: string,           // AI の応答テキスト（<requirements> タグ除去済み）
 *   requirements: object|null  // 要件が揃った場合のみ返す
 * }
 */
router.post('/', async (req, res) => {
  const { itemId, history } = req.body

  if (!itemId || typeof itemId !== 'string') {
    return res.status(400).json({ error: 'itemId is required' })
  }

  if (!ITEM_SCHEMAS[itemId]) {
    return res.status(400).json({ error: `Unknown itemId: ${itemId}` })
  }

  if (!Array.isArray(history) || history.length === 0) {
    return res.status(400).json({ error: 'history must be a non-empty array' })
  }

  // ロール検証: 'user' | 'assistant' のみ許可
  const validRoles = new Set(['user', 'assistant'])
  for (const msg of history) {
    if (!validRoles.has(msg.role) || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Invalid message format in history' })
    }
  }

  try {
    const { text, requirements: rawReq } = await sendChatMessage(itemId, history)

    let requirements = null

    if (rawReq?.ready && rawReq.values) {
      // デフォルト補完・バリデーション
      const { values, autoFilled } = buildRequirements(itemId, rawReq.values)
      const warnings = validateRequirements(itemId, values)
      const schema = ITEM_SCHEMAS[itemId]

      requirements = {
        itemId,
        itemLabel: schema.label,
        values,
        autoFilled,
        warnings,
        summary: rawReq.summary ?? '要件を確認してください。',
        schema: schema.params,
      }
    }

    return res.json({ text, requirements })
  } catch (err) {
    console.error('[/api/chat] error:', err)

    if (err?.status === 401) {
      return res.status(500).json({ error: 'API キーが無効です。管理者に連絡してください。' })
    }
    if (err?.status === 429) {
      return res.status(429).json({ error: 'APIの利用制限に達しました。しばらくしてから再試行してください。' })
    }

    return res.status(500).json({ error: 'AI サーバーとの通信に失敗しました。' })
  }
})

/**
 * POST /api/chat/finalize
 * 要件確認カードで手動編集した値を受け取り、バリデーションして返す
 * Body: { itemId: string, values: Record<string, unknown> }
 */
router.post('/finalize', (req, res) => {
  const { itemId, values } = req.body

  if (!itemId || !ITEM_SCHEMAS[itemId]) {
    return res.status(400).json({ error: 'Invalid itemId' })
  }

  if (!values || typeof values !== 'object') {
    return res.status(400).json({ error: 'values is required' })
  }

  const { values: finalValues, autoFilled } = buildRequirements(itemId, values)
  const warnings = validateRequirements(itemId, finalValues)
  const schema = ITEM_SCHEMAS[itemId]

  return res.json({
    itemId,
    itemLabel: schema.label,
    values: finalValues,
    autoFilled,
    warnings,
    schema: schema.params,
  })
})

export default router
