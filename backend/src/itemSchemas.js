/**
 * アイテム別の要件スキーマとデフォルト値
 * 各パラメータには推奨デフォルト値と有効範囲を定義する
 */

export const ITEM_SCHEMAS = {
  'bifold-wallet': {
    label: '二つ折り財布',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 95,  min: 70,  max: 130, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 110, min: 80,  max: 150, type: 'number' },
      gusset:        { label: 'マチ',           unit: 'mm', default: 8,   min: 0,   max: 25,  type: 'number' },
      cardPockets:   { label: 'カードポケット数', unit: '枚', default: 4,   min: 2,   max: 12,  type: 'number' },
      hasCoinPocket: { label: '小銭入れ',       unit: '',   default: true,                    type: 'boolean' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 5,   min: 0,   max: 15,  type: 'number' },
    },
  },
  'trifold-wallet': {
    label: '三つ折り財布',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 70,  min: 55,  max: 100, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 100, min: 80,  max: 140, type: 'number' },
      gusset:        { label: 'マチ',           unit: 'mm', default: 12,  min: 0,   max: 30,  type: 'number' },
      cardPockets:   { label: 'カードポケット数', unit: '枚', default: 6,   min: 2,   max: 12,  type: 'number' },
      hasCoinPocket: { label: '小銭入れ',       unit: '',   default: true,                    type: 'boolean' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 5,   min: 0,   max: 15,  type: 'number' },
    },
  },
  'long-wallet': {
    label: '長財布',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 100, min: 80,  max: 130, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 195, min: 160, max: 220, type: 'number' },
      gusset:        { label: 'マチ',           unit: 'mm', default: 10,  min: 0,   max: 30,  type: 'number' },
      cardPockets:   { label: 'カードポケット数', unit: '枚', default: 6,   min: 2,   max: 16,  type: 'number' },
      hasCoinPocket: { label: '小銭入れ',       unit: '',   default: true,                    type: 'boolean' },
      closureType:   { label: '留め具',         unit: '',   default: 'snap', options: ['snap', 'round_zipper', 'flap'], type: 'select' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 5,   min: 0,   max: 15,  type: 'number' },
    },
  },
  'card-case': {
    label: 'カードケース',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 72,  min: 55,  max: 90,  type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 105, min: 80,  max: 125, type: 'number' },
      cardPockets:   { label: 'カードポケット数', unit: '枚', default: 4,   min: 2,   max: 10,  type: 'number' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 5,   min: 0,   max: 12,  type: 'number' },
    },
  },
  'coin-purse': {
    label: '小銭入れ',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 100, min: 60,  max: 140, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 80,  min: 50,  max: 120, type: 'number' },
      gusset:        { label: 'マチ',           unit: 'mm', default: 0,   min: 0,   max: 20,  type: 'number' },
      closureType:   { label: '留め具',         unit: '',   default: 'snap', options: ['snap', 'l_zipper', 'flap'], type: 'select' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 8,   min: 0,   max: 20,  type: 'number' },
    },
  },
  'coin-case': {
    label: 'コインケース',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 90,  min: 60,  max: 130, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 70,  min: 50,  max: 110, type: 'number' },
      gusset:        { label: 'マチ',           unit: 'mm', default: 20,  min: 10,  max: 40,  type: 'number' },
      closureType:   { label: '留め具',         unit: '',   default: 'l_zipper', options: ['l_zipper', 'round_zipper', 'snap'], type: 'select' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 8,   min: 0,   max: 20,  type: 'number' },
    },
  },
  'key-case': {
    label: 'キーケース',
    params: {
      width:         { label: '幅',             unit: 'mm', default: 70,  min: 50,  max: 100, type: 'number' },
      height:        { label: '高さ',           unit: 'mm', default: 110, min: 80,  max: 150, type: 'number' },
      keyHooks:      { label: 'キーフック数',   unit: '個', default: 4,   min: 1,   max: 8,   type: 'number' },
      closureType:   { label: '留め具',         unit: '',   default: 'snap', options: ['snap', 'button'], type: 'select' },
      cornerRadius:  { label: '角丸 R',         unit: 'mm', default: 8,   min: 0,   max: 20,  type: 'number' },
    },
  },
}

/**
 * デフォルト値を補完した要件オブジェクトを返す
 * @param {string} itemId
 * @param {Record<string, unknown>} userValues ユーザーが指定した値（未指定はデフォルトで補完）
 * @returns {{ values: Record<string, unknown>, autoFilled: string[] }}
 */
export function buildRequirements(itemId, userValues = {}) {
  const schema = ITEM_SCHEMAS[itemId]
  if (!schema) throw new Error(`Unknown itemId: ${itemId}`)

  const values = {}
  const autoFilled = []

  for (const [key, def] of Object.entries(schema.params)) {
    if (userValues[key] !== undefined && userValues[key] !== null) {
      values[key] = userValues[key]
    } else {
      values[key] = def.default
      autoFilled.push(key)
    }
  }

  return { values, autoFilled }
}

/**
 * 入力値のバリデーション
 * @param {string} itemId
 * @param {Record<string, unknown>} values
 * @returns {string[]} 警告メッセージの配列
 */
export function validateRequirements(itemId, values) {
  const schema = ITEM_SCHEMAS[itemId]
  if (!schema) return []

  const warnings = []

  for (const [key, def] of Object.entries(schema.params)) {
    const v = values[key]
    if (def.type === 'number' && v !== undefined) {
      if (v < def.min) {
        warnings.push(`「${def.label}」が ${def.min}${def.unit} より小さい値（${v}${def.unit}）です。正確な型紙が生成できない場合があります。`)
      }
      if (v > def.max) {
        warnings.push(`「${def.label}」が ${def.max}${def.unit} より大きい値（${v}${def.unit}）です。正確な型紙が生成できない場合があります。`)
      }
    }
  }

  return warnings
}
