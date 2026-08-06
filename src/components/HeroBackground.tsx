import type { CSSProperties } from 'react'

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      {/* Base depth layer - deep graphite darkness */}
      <div className="hero-bg-base" />

      {/* Mid atmosphere - soft cyan-teal diffusion */}
      <div className="hero-bg-atmosphere" />

      {/* Volumetric haze layers — REMOVED for perf (CPU blur on no-GPU server) */}
      {/* Subtle grid texture — REMOVED for perf */}
      {/* Floating micro particles — REMOVED for perf */}
      {/* Star-like micro points — REMOVED for perf */}
      {/* AI network hints — REMOVED for perf */}
      {/* Center ambient glow — REMOVED for perf */}

      {/* Vignette */}
      <div className="hero-bg-vignette" />
    </div>
  )
}
