import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // Initialize Lenis smooth scroll globally
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    })

    // Expose lenis globally for component integration
    ;(window as any).lenis = lenis

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Manual tick sync: run Lenis update inside GSAP's ticker animation loop
    function update(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div className="scroll-progress-bar" />
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
