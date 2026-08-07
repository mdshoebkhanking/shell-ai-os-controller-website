import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InternalAIFabricBackground } from './components/InternalAIFabricBackground'
import { HeroBackground } from './components/HeroBackground'
import { SiteNav } from './components/SiteNav'
import { SiteMotion } from './components/SiteMotion'
import { SiteFooter } from './components/SiteFooter'

const ArchitecturePage = lazy(() =>
  import('./pages/ArchitecturePage').then((m) => ({ default: m.ArchitecturePage }))
)
const DocsPage = lazy(() =>
  import('./pages/DocsPage').then((m) => ({ default: m.DocsPage }))
)
const FeaturesPage = lazy(() =>
  import('./pages/FeaturesPage').then((m) => ({ default: m.FeaturesPage }))
)
const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const PrivacyPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.PrivacyPage }))
)
const TermsPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.TermsPage }))
)
const ReleasesPage = lazy(() =>
  import('./pages/ReleasesPage').then((m) => ({ default: m.ReleasesPage }))
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

gsap.registerPlugin(ScrollTrigger)

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-busy="true" aria-live="polite">
      <span className="route-loader-wordmark">SHELL</span>
    </div>
  )
}

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
      <a href="#main-content" className="skip-to-main-link">
        Skip to main content
      </a>
      <div className="scroll-progress-bar" />
      {isHomePage ? (
        <HeroBackground />
      ) : (
        <InternalAIFabricBackground />
      )}
      <SiteNav />
      <SiteMotion />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  )
}
