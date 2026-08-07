import type { CSSProperties, MouseEvent } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScreenState, screenStates } from '../data'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

type LaptopMockupProps = {
  activeId?: string
  className?: string
  compact?: boolean
  /** Optional: path to a video file (e.g. "/media/hero-demo.mp4") */
  videoSrc?: string
  /** Still frame shown before the hover video starts. */
  videoPosterSrc?: string
}

export function LaptopMockup({
  activeId = 'dashboard',
  className = '',
  compact = false,
  videoSrc = '/media/videos/hero-demo.mp4',
  videoPosterSrc = '/media/videos/hero-demo-poster.png'
}: LaptopMockupProps) {
  const activeIndex = Math.max(
    0,
    screenStates.findIndex((screen) => screen.id === activeId)
  )
  const activeScreen = screenStates[activeIndex] ?? screenStates[0]

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isVideoShown, setIsVideoShown] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const usesVideoPoster = Boolean(videoSrc && videoPosterSrc && isVideoReady)

  // Check if video file actually exists
  useEffect(() => {
    if (!videoSrc) return
    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setIsVideoReady(true)
      })
      .catch(() => {
        setIsVideoReady(false)
      })
  }, [videoSrc])

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !isAudioEnabled
    videoRef.current.volume = isAudioEnabled ? 0.78 : 0
  }, [isAudioEnabled])

  const playVideo = useCallback((withAudio = isAudioEnabled) => {
    if (!isVideoReady || !videoRef.current) return

    setIsVideoShown(true)
    videoRef.current.muted = !withAudio
    videoRef.current.volume = withAudio ? 0.78 : 0

    const playPromise = videoRef.current.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsVideoShown(false)
      })
    }
  }, [isAudioEnabled, isVideoReady])

  const handleMouseEnter = useCallback(() => {
    if (!isVideoReady || !videoRef.current) return
    hoverTimeoutRef.current = setTimeout(() => {
      if (!videoRef.current) return
      videoRef.current.currentTime = 0
      playVideo()
    }, 120)
  }, [isVideoReady, playVideo])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    if (!videoRef.current) return
    setIsVideoShown(false)
    videoRef.current.pause()
  }, [])

  const handleAudioToggle = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const nextAudioState = !isAudioEnabled
    setIsAudioEnabled(nextAudioState)

    if (!videoRef.current) return
    if (!isVideoShown) videoRef.current.currentTime = 0
    playVideo(nextAudioState)
  }, [isAudioEnabled, isVideoShown, playVideo])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  return (
    <div
      className={`laptop-scene ${compact ? 'laptop-scene-compact' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="laptop-device">
        <div className="laptop-lid">
          <div className="laptop-camera" />
          <div className="laptop-screen" ref={screenRef}>
            {screenStates.map((screen) => (
              <img
                key={screen.id}
                src={screen.image}
                alt={`Shell ${screen.label} screenshot`}
                className={`${screen.id === activeScreen.id ? 'is-active' : ''} ${isVideoShown || usesVideoPoster ? 'is-video-playing' : ''}`}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            ))}

            {usesVideoPoster && (
              <img
                src={videoPosterSrc}
                alt="Shell AI video preview"
                className={`laptop-video-poster ${isVideoShown ? 'is-video-playing' : ''}`}
                draggable={false}
              />
            )}

            {videoSrc && (
              <div className={`laptop-video-overlay ${isVideoShown ? 'is-visible' : ''}`}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  muted={!isAudioEnabled}
                  loop
                  playsInline
                  preload="metadata"
                  poster={videoPosterSrc}
                  className="laptop-video-player"
                  aria-hidden="true"
                />
                {isVideoReady && !isVideoShown && (
                  <div className="laptop-play-hint" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Hover to play</span>
                  </div>
                )}
              </div>
            )}

            {isVideoReady && (
              <button
                className={`laptop-audio-toggle ${isAudioEnabled ? 'is-on' : ''}`}
                type="button"
                onClick={handleAudioToggle}
                aria-label={isAudioEnabled ? 'Mute demo video audio' : 'Play demo video with sound'}
                title={isAudioEnabled ? 'Mute sound' : 'Play sound'}
              >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            )}

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
        <span>{isVideoShown ? 'Demo' : activeScreen.label}</span>
        <strong>{isVideoShown ? 'Shell AI in action' : activeScreen.title}</strong>
      </div>
    </div>
  )
}

// ─── Scroll Story ─────────────────────────────────────────────────────────────

type LaptopStoryProps = {
  screens?: ScreenState[]
}

export function LaptopStory({ screens = screenStates }: LaptopStoryProps) {
  const [activeId, setActiveId] = useState(screens[0]?.id ?? 'dashboard')
  const [storyInView, setStoryInView] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const storyVideoStyle = {
    '--story-video-image': `url("${screens.find((s) => s.id === activeId)?.image ?? screens[0]?.image ?? ''}")`
  } as CSSProperties

  const scrollToStep = useCallback((id: string) => {
    const el = document.querySelector(`[data-screen-step="${id}"]`)
    if (!el) return
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, opts?: Record<string, unknown>) => void } }).lenis
    if (lenis?.scrollTo) {
      lenis.scrollTo(el, { offset: -Math.round(window.innerHeight * 0.24), duration: 1.15 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (!reduceMotion && stageRef.current) {
        // Sticky laptop "lands" as the story section scrolls in
        gsap.fromTo(
          '.story-laptop-motion',
          { y: -12, scale: 0.98, rotationX: 12, transformPerspective: 900 },
          {
            y: 34,
            scale: 0.94,
            rotationX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true
            }
          }
        )

        // Scroll-flight: each step dives in (3D), holds, then drifts out
        const articles = gsap.utils.toArray<HTMLElement>('.story-steps article')
        articles.forEach((article) => {
          gsap.fromTo(
            article,
            { opacity: 0.16, y: 96 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: { trigger: article, start: 'top 96%', end: 'top 56%', scrub: 0.5 }
            }
          )
          gsap.fromTo(
            article,
            { '--step-dive': '16deg' } as gsap.TweenVars,
            {
              '--step-dive': '0deg',
              ease: 'none',
              scrollTrigger: { trigger: article, start: 'top 96%', end: 'top 54%', scrub: 0.5 }
            } as gsap.TweenVars
          )
          gsap.to(article, {
            y: -44,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: { trigger: article, start: 'bottom 32%', end: 'bottom 6%', scrub: 0.5 }
          })
        })
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

      // Progress rail visibility follows the story section
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 62%',
        end: 'bottom 38%',
        onToggle: (self) => setStoryInView(self.isActive)
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
          <div className="offline-proof-card">
            <span>Online + local voice</span>
            <strong>Use cloud providers when connected, or local voice/core workflows when offline.</strong>
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
                <img src={screen.image} alt="" draggable={false} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <span className="story-step-glass" />
              </div>
              <figcaption>{screen.label}</figcaption>
            </figure>
          </article>
        ))}
      </div>

      <nav
        className={`story-progress-rail${storyInView ? ' is-visible' : ''}`}
        aria-label="Story progress"
      >
        {screens.map((screen, index) => (
          <button
            key={screen.id}
            type="button"
            className={activeId === screen.id ? 'is-active' : undefined}
            aria-label={`Go to step ${index + 1}: ${screen.title}`}
            title={screen.title}
            onClick={() => scrollToStep(screen.id)}
          >
            <span className="story-progress-dot" />
            <span className="story-progress-label">{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>
    </section>
  )
}
