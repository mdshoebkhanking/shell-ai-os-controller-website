import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ─── SiteMotion — DISABLED for performance ─────────────────────────
// All GSAP ScrollTrigger + animations REMOVED — server has no GPU,
// mobile devices lag hard. Zero JS scroll animations = butter smooth 60fps.

export function SiteMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top on route change — no animation, instant
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
