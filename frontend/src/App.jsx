import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import SelectPage from './pages/SelectPage'
import ChatPage from './pages/ChatPage'
import PlaceholderPage from './pages/PlaceholderPage'
import styles from './App.module.css'

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

// チャット画面は Navbar のみ（フッターなし）でフル高さを活用
function ChatLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <PricingPage />
            </Layout>
          }
        />
        <Route
          path="/select"
          element={
            <Layout>
              <SelectPage />
            </Layout>
          }
        />
        <Route
          path="/chat/:itemId"
          element={
            <ChatLayout>
              <ChatPage />
            </ChatLayout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <PlaceholderPage
                title="ログイン"
                description="アカウントにログインして、より多くの機能をご利用いただけます。"
                sprint="8"
              />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <PlaceholderPage
                title="利用規約"
                description="LeatherCraft AI のサービス利用規約です。"
                sprint="12"
              />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <PlaceholderPage
                title="プライバシーポリシー"
                description="お客様の個人情報の取り扱いについて説明します。"
                sprint="12"
              />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <PlaceholderPage
                title="運営情報"
                description="LeatherCraft AI の運営者情報です。"
                sprint="12"
              />
            </Layout>
          }
        />
        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <Layout>
              <PlaceholderPage
                title="ページが見つかりません"
                description="お探しのページは存在しないか、移動した可能性があります。"
              />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
