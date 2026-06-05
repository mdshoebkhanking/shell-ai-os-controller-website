import { Route, Routes } from 'react-router-dom'
import { SiteNav } from './components/SiteNav'
import { SiteMotion } from './components/SiteMotion'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DocsPage } from './pages/DocsPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { HomePage } from './pages/HomePage'
import { PrivacyPage, TermsPage } from './pages/LegalPage'
import { ReleasesPage } from './pages/ReleasesPage'

export default function App() {
  return (
    <>
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
    </>
  )
}
