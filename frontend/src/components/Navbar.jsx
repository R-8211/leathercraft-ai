import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

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
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <LeatherIcon />
          <span className={styles.logoText}>LeatherCraft AI</span>
        </Link>

        <ul className={styles.desktopNav}>
          {NAV_ITEMS.map(({ label, to }) => (
            <li key={to}>
              {to.startsWith('/#') ? (
                <a href={to} onClick={(e) => handleHashLink(e, to)} className={styles.navLink}>
                  {label}
                </a>
              ) : (
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.desktopActions}>
          <Link to="/login" className={styles.loginLink}>ログイン</Link>
          <Link to="/select" className={styles.ctaBtn}>無料で始める</Link>
        </div>

        <button
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="15" y1="5" x2="5" y2="15" />
              <line x1="5" y1="5" x2="15" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="17" y2="7" />
              <line x1="3" y1="13" x2="17" y2="13" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map(({ label, to }) => (
            <div key={to}>
              {to.startsWith('/#') ? (
                <a href={to} onClick={(e) => handleHashLink(e, to)} className={styles.mobileNavLink}>
                  {label}
                </a>
              ) : (
                <NavLink
                  to={to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={styles.mobileNavLink}
                >
                  {label}
                </NavLink>
              )}
            </div>
          ))}
          <hr className={styles.mobileDivider} />
          <Link to="/login" onClick={() => setMenuOpen(false)} className={styles.mobileNavLink}>
            ログイン
          </Link>
          <Link to="/select" onClick={() => setMenuOpen(false)} className={styles.mobileCtaBtn}>
            無料で始める
          </Link>
        </div>
      )}
    </header>
  )
}

function LeatherIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect width="30" height="30" rx="8" fill="var(--color-earth-500)" />
      <path
        d="M8 21 L15 10 L22 21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="10.5" y1="17" x2="19.5" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
