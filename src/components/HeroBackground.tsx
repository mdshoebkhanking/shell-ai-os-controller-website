import type { CSSProperties } from 'react'

const particleCount = 24
const particles = Array.from({ length: particleCount }, (_, i) => i)

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      {/* Base depth layer - deep graphite darkness */}
      <div className="hero-bg-base" />

      {/* Mid atmosphere - soft cyan-teal diffusion */}
      <div className="hero-bg-atmosphere" />

      {/* Volumetric haze layers */}
      <div className="hero-bg-haze hero-bg-haze-1" />
      <div className="hero-bg-haze hero-bg-haze-2" />
      <div className="hero-bg-haze hero-bg-haze-3" />

      {/* Subtle grid texture */}
      <div className="hero-bg-grid" />

      {/* Floating micro particles */}
      <div className="hero-bg-particles">
        {particles.map((i) => (
          <span
            key={i}
            className="hero-particle"
            style={{ '--p-i': i, '--p-x': `${8 + (i * 37) % 84}%`, '--p-y': `${5 + (i * 53) % 90}%` } as CSSProperties}
          />
        ))}
      </div>

      {/* Star-like micro points */}
      <div className="hero-bg-micro" />

      {/* AI network hints - faint connecting lines */}
      <div className="hero-bg-network" />

      {/* Center ambient glow */}
      <div className="hero-bg-center-glow" />

      {/* Vignette */}
      <div className="hero-bg-vignette" />
    </div>
  )
}
