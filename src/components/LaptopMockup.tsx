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
  const [progress, setProgress] = useState(0)
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reduceMotion = false
    const context = gsap.context(() => {
      if (!reduceMotion && stageRef.current) {
        // ─── Story steps: scroll-world camera-flight entrance ────────
        const articles = gsap.utils.toArray<HTMLElement>('.story-steps article')
        articles.forEach((article, i) => {
          // Entrance: 3D fly-in from depth
          gsap.fromTo(
            article,
            {
              autoAlpha: 0,
              y: 80,
              rotationX: -8,
              scale: 0.92,
              transformPerspective: 1200
            },
            {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: article,
                start: 'top 88%',
                end: 'top 42%',
                toggleActions: 'play none none reverse'
              }
            }
          )

          // Image: scroll-driven parallax zoom (dive-in feel)
          const mockup = article.querySelector('.story-step-mockup')
          if (mockup) {
            gsap.fromTo(
              mockup,
              { scale: 0.88, y: 24 },
              {
                scale: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 92%',
                  end: 'top 35%',
                  scrub: 0.6
                }
              }
            )
          }

          // Screen image: subtle depth zoom on scroll (camera push-in)
          const screenImg = article.querySelector('.story-step-screen img')
          if (screenImg) {
            gsap.fromTo(
              screenImg,
              { scale: 1.08 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 85%',
                  end: 'top 30%',
                  scrub: 0.8
                }
              }
            )
          }

          // Index number: scroll-driven glow pulse
          const index = article.querySelector('.story-step-index')
          if (index) {
            gsap.fromTo(
              index,
              { boxShadow: '0 0 0 rgba(114,226,255,0)' },
              {
                boxShadow: '0 0 32px rgba(114,226,255,0.35)',
                ease: 'none',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 70%',
                  end: 'top 35%',
                  scrub: 0.5
                }
              }
            )
          }

          // Copy text: staggered word reveal
          const copy = article.querySelector('.story-step-copy')
          if (copy) {
            gsap.fromTo(
              copy.children,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse'
                }
              }
            )
          }
        })

        // ─── Progress tracker ───────────────────────────────────────
        ScrollTrigger.create({
          trigger: stageRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => setProgress(self.progress)
        })
      }

      // ─── Active step detection (existing) ─────────────────────────
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
      {/* Scroll progress rail (scroll-world inspired) */}
      <div className="story-progress-rail" aria-hidden="true">
        <div
          className="story-progress-fill"
          style={{ transform: `scaleY(${progress})` }}
        />
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
