import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { InternalAIFabricBackground } from './components/InternalAIFabricBackground'
import { HeroBackground } from './components/HeroBackground'
import { SiteNav } from './components/SiteNav'
import { SiteMotion } from './components/SiteMotion'
import { SiteFooter } from './components/SiteFooter'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DocsPage } from './pages/DocsPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { HomePage } from './pages/HomePage'
import { PrivacyPage, TermsPage } from './pages/LegalPage'
import { ReleasesPage } from './pages/ReleasesPage'

export default function App() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // Scroll to top on route change — native, instant, zero lag
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {isHomePage ? (
        <HeroBackground />
      ) : (
        <InternalAIFabricBackground />
      )}
      <SiteNav />
      <SiteMotion />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/releases" element={<ReleasesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
