/**
 * サンプル型紙を模したプレースホルダー SVG
 * 実際の型紙生成は Sprint 4-5 で実装する
 */
export default function PatternSvgPlaceholder({ label = '二つ折り財布', className = '' }) {
  return (
    <svg
      viewBox="0 0 280 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${label}の型紙サンプル`}
    >
      {/* 背景 */}
      <rect width="280" height="200" fill="#faf6f1" rx="4" />

      {/* グリッド線 */}
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={i * 20}
          y1="0"
          x2={i * 20}
          y2="200"
          stroke="#e4d0b8"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 20}
          x2="280"
          y2={i * 20}
          stroke="#e4d0b8"
          strokeWidth="0.5"
        />
      ))}

      {/* 外装パーツ */}
      <rect
        x="20"
        y="20"
        width="110"
        height="160"
        fill="none"
        stroke="#7d4a2d"
        strokeWidth="1.5"
        rx="4"
      />
      {/* 折り目線 */}
      <line
        x1="75"
        y1="20"
        x2="75"
        y2="180"
        stroke="#b87348"
        strokeWidth="1"
        strokeDasharray="6 3"
      />
      {/* 縫い代 */}
      <rect
        x="24"
        y="24"
        width="102"
        height="152"
        fill="none"
        stroke="#c49068"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        rx="2"
      />

      {/* パーツラベル */}
      <text x="55" y="110" textAnchor="middle" fill="#7d4a2d" fontSize="9" fontFamily="sans-serif">
        外装
      </text>
      <text x="55" y="122" textAnchor="middle" fill="#9a5d38" fontSize="7" fontFamily="sans-serif">
        × 1枚
      </text>

      {/* 寸法線 */}
      <line x1="20" y1="188" x2="130" y2="188" stroke="#b87348" strokeWidth="0.8" markerEnd="url(#arrow)" />
      <text x="75" y="197" textAnchor="middle" fill="#7d4a2d" fontSize="7" fontFamily="sans-serif">
        110mm
      </text>
      <line x1="138" y1="20" x2="138" y2="180" stroke="#b87348" strokeWidth="0.8" />
      <text x="148" y="105" fill="#7d4a2d" fontSize="7" fontFamily="sans-serif" transform="rotate(90, 148, 105)">
        160mm
      </text>

      {/* 内装パーツ */}
      <rect
        x="155"
        y="20"
        width="105"
        height="80"
        fill="none"
        stroke="#7d4a2d"
        strokeWidth="1.5"
        rx="2"
      />
      <rect
        x="159"
        y="24"
        width="97"
        height="72"
        fill="none"
        stroke="#c49068"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        rx="1"
      />
      <text x="207" y="65" textAnchor="middle" fill="#7d4a2d" fontSize="9" fontFamily="sans-serif">
        内装
      </text>
      <text x="207" y="77" textAnchor="middle" fill="#9a5d38" fontSize="7" fontFamily="sans-serif">
        × 1枚
      </text>

      {/* カードポケット */}
      <rect
        x="155"
        y="115"
        width="105"
        height="65"
        fill="none"
        stroke="#7d4a2d"
        strokeWidth="1.5"
        rx="2"
      />
      <rect
        x="159"
        y="119"
        width="97"
        height="57"
        fill="none"
        stroke="#c49068"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        rx="1"
      />
      <text x="207" y="150" textAnchor="middle" fill="#7d4a2d" fontSize="9" fontFamily="sans-serif">
        カードポケット
      </text>
      <text x="207" y="162" textAnchor="middle" fill="#9a5d38" fontSize="7" fontFamily="sans-serif">
        × 2枚
      </text>

      {/* ステッチ穴ガイド（外装） */}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`sl${i}`}
          cx="26"
          cy={30 + i * 18}
          r="1.2"
          fill="#c49068"
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`sr${i}`}
          cx="124"
          cy={30 + i * 18}
          r="1.2"
          fill="#c49068"
        />
      ))}

      {/* 凡例 */}
      <g transform="translate(10, 192)">
        <line x1="0" y1="4" x2="12" y2="4" stroke="#7d4a2d" strokeWidth="1.5" />
        <text x="14" y="7" fill="#7d4a2d" fontSize="6" fontFamily="sans-serif">外形</text>
        <line x1="40" y1="4" x2="52" y2="4" stroke="#c49068" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="54" y="7" fill="#7d4a2d" fontSize="6" fontFamily="sans-serif">縫い代</text>
        <line x1="85" y1="4" x2="97" y2="4" stroke="#b87348" strokeWidth="1" strokeDasharray="6 3" />
        <text x="99" y="7" fill="#7d4a2d" fontSize="6" fontFamily="sans-serif">折り目</text>
      </g>
    </svg>
  )
}
