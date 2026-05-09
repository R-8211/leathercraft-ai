import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.brandName}>LeatherCraft AI</p>
            <p className={styles.brandDesc}>
              日本語で伝えるだけで、レザークラフトの型紙が即座に手に入る。
              初心者からベテランまで、手作りの楽しさを広げます。
            </p>
          </div>

          <div>
            <p className={styles.colTitle}>サービス</p>
            <ul className={styles.linkList}>
              <li><a href="/#how-it-works" className={styles.footerLink}>使い方</a></li>
              <li><Link to="/pricing" className={styles.footerLink}>料金プラン</Link></li>
              <li><Link to="/select" className={styles.footerLink}>型紙を作る</Link></li>
            </ul>
          </div>

          <div>
            <p className={styles.colTitle}>法的情報・運営</p>
            <ul className={styles.linkList}>
              <li><Link to="/terms" className={styles.footerLink}>利用規約</Link></li>
              <li><Link to="/privacy" className={styles.footerLink}>プライバシーポリシー</Link></li>
              <li><Link to="/about" className={styles.footerLink}>運営情報</Link></li>
              <li>
                <a href="mailto:support@leathercraft-ai.example.com" className={styles.footerLink}>
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; 2026 LeatherCraft AI. All rights reserved.</p>
          <p className={styles.disclaimer}>型紙は参考用途として提供されます。商用利用については利用規約をご確認ください。</p>
        </div>
      </div>
    </footer>
  )
}
