import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScreenState, screenStates } from '../data'

gsap.registerPlugin(ScrollTrigger)

type LaptopMockupProps = {
  activeId?: string
  className?: string
  compact?: boolean
}

export function LaptopMockup({ activeId = 'dashboard', className = '', compact = false }: LaptopMockupProps) {
  const activeIndex = Math.max(
    0,
    screenStates.findIndex((screen) => screen.id === activeId)
  )
  const activeScreen = screenStates[activeIndex] ?? screenStates[0]

  return (
    <div className={`laptop-scene ${compact ? 'laptop-scene-compact' : ''} ${className}`}>
      <div className="laptop-device">
        <div className="laptop-lid">
          <div className="laptop-camera" />
          <div className="laptop-screen">
            {screenStates.map((screen) => (
              <img
                key={screen.id}
                src={screen.image}
                alt={`Shell ${screen.label} screenshot`}
                className={screen.id === activeScreen.id ? 'is-active' : ''}
                draggable={false}
              />
            ))}
            <div className="screen-glass" />
          </div>
        </div>
        <div className="laptop-hinge" />
        <div className="laptop-base">
          <div className="trackpad" />
          <div className="base-glow" />
        </div>
      </div>
      <div className="laptop-shadow" />
      <div className="screen-status">
        <span>{activeScreen.label}</span>
        <strong>{activeScreen.title}</strong>
      </div>
    </div>
  )
}

type LaptopStoryProps = {
  screens?: ScreenState[]
}

export function LaptopStory({ screens = screenStates }: LaptopStoryProps) {
  const [activeId, setActiveId] = useState(screens[0]?.id ?? 'dashboard')
  const stageRef = useRef<HTMLDivElement | null>(null)
  const storyVideoStyle = {
    '--story-video-image': `url("${screens[0]?.image ?? ''}")`
  } as CSSProperties

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (!reduceMotion && stageRef.current) {
        gsap.fromTo(
          '.story-laptop-motion',
          { y: -12, scale: 0.98 },
          {
            y: 34,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true
            }
          }
        )
      }

      screens.forEach((screen) => {
        ScrollTrigger.create({
          trigger: `[data-screen-step="${screen.id}"]`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveId(screen.id),
          onEnterBack: () => setActiveId(screen.id)
        })
      })
    }, stageRef)

    return () => context.revert()
  }, [screens])

  return (
    <section ref={stageRef} id="story" className="story-section">
      <div className="story-copy">
        <p className="eyebrow">Scroll Story</p>
        <h2>More than chat: Shell connects prompts to real local workflow state.</h2>
        <p>
          The value is not a demo trick. Shell is a guarded control layer with
          tools, memory, RAG, diagnostics, voice, and remote surfaces that stay
          visible before anything runs.
        </p>

        <div className="story-proof-grid" aria-label="Shell differentiators">
          <div>
            <span>460+ tools</span>
            <strong>Guarded execution, not blind actions.</strong>
          </div>
          <div>
            <span>Memory v2 + RAG</span>
            <strong>Local context can carry across serious work.</strong>
          </div>
          <div>
            <span>Diagnostics</span>
            <strong>Readiness, logs, repair hints, and traceable results.</strong>
          </div>
          <div>
            <span>Windows-first</span>
            <strong>One installer, bundled app, honest macOS/Linux support.</strong>
          </div>
        </div>
      </div>

      <div className="story-laptop-wrap">
        <div className="story-laptop-motion">
          <div className="story-media-frame" aria-label="Future Shell video mockup frame">
            <div className="story-media-screen">
              <div className="story-video-slot" aria-hidden="true" style={storyVideoStyle} />
              <div className="story-media-sheen" />
            </div>
            <div className="story-media-base">
              <span />
            </div>
          </div>
        </div>
      </div>

      <div className="story-steps">
        {screens.map((screen, index) => (
          <article
            key={screen.id}
            data-screen-step={screen.id}
            className={activeId === screen.id ? 'is-active' : ''}
          >
            <span className="story-step-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="story-step-copy">
              <h3>{screen.title}</h3>
              <p>{screen.description}</p>
            </div>
            <figure className="story-step-mockup" aria-label={`${screen.label} screenshot preview`}>
              <div className="story-step-screen">
                <img src={screen.image} alt="" draggable={false} />
                <span className="story-step-glass" />
              </div>
              <figcaption>{screen.label}</figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}
