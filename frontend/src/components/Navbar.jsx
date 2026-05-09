import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'トップ', to: '/' },
  { label: '使い方', to: '/#how-it-works' },
  { label: '料金', to: '/pricing' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleHashLink = (e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.replace('/#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setMenuOpen(false)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#faf6f1]/95 backdrop-blur border-b border-[#e4d0b8]">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <LeatherIcon />
          <span
            className="text-xl font-bold text-[#5e3720] leading-tight"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            LeatherCraft AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ label, to }) => (
            <li key={to}>
              {to.startsWith('/#') ? (
                <a
                  href={to}
                  onClick={(e) => handleHashLink(e, to)}
                  className="text-sm text-[#7d4a2d] hover:text-[#5e3720] font-medium transition-colors"
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#5e3720] border-b-2 border-[#b87348]'
                        : 'text-[#7d4a2d] hover:text-[#5e3720]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-[#7d4a2d] hover:text-[#5e3720] transition-colors"
          >
            ログイン
          </Link>
          <Link
            to="/select"
            className="px-4 py-2 bg-[#b87348] hover:bg-[#9a5d38] text-white text-sm font-medium rounded-lg transition-colors"
          >
            無料で始める
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 rounded text-[#7d4a2d]"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf6f1] border-t border-[#e4d0b8] px-4 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map(({ label, to }) => (
            <div key={to}>
              {to.startsWith('/#') ? (
                <a
                  href={to}
                  onClick={(e) => handleHashLink(e, to)}
                  className="block text-base text-[#7d4a2d] hover:text-[#5e3720] font-medium py-1"
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  to={to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#7d4a2d] hover:text-[#5e3720] font-medium py-1"
                >
                  {label}
                </NavLink>
              )}
            </div>
          ))}
          <hr className="border-[#e4d0b8]" />
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-base text-[#7d4a2d] font-medium py-1"
          >
            ログイン
          </Link>
          <Link
            to="/select"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-4 py-2 bg-[#b87348] text-white text-sm font-medium rounded-lg"
          >
            無料で始める
          </Link>
        </div>
      )}
    </header>
  )
}

function LeatherIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#b87348" />
      <path
        d="M8 22 L16 10 L24 22 M11 18 L21 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="10" r="2" fill="white" />
    </svg>
  )
}
