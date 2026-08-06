import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── ScrollTrigger performance config ────────────────────────────────
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  ignoreMobileResize: true
})

const revealSelector = [
  '.section-heading',
  '.split-section > div',
  '.story-proof-grid div',
  '.desktop-stack',
  '.routing-system',
  '.pipeline-node',
  '.routing-stage',
  '.platform-card',
  '.gate',
  '.release-card',
  '.final-cta > *',
  '.feature-page-stats > div',
  '.feature-tabs',
  '.feature-browser-heading',
  '.feature-page-item',
  '.doc-card',
  '.architecture-map article',
  '.architecture-note',
  '.install-notes',
  '.stage-detail-card',
  '.lifecycle-visualizer-container',
  '.explicit-layers-section .section-heading',
  '.review-form-container',
  '.safety-copy',
  '.gate-panel',
  '.hero-announcement',
  '.hero-offline-note',
  '.hero-download-cluster',
  '.floating-badge'
].join(',')

// Animated number counter for stat values
function animateCounter(el: HTMLElement, target: string) {
  const isNum = /^\d+\+?$/.test(target.trim())
  if (!isNum) return
  const raw = parseInt(target)
  const hasSuffix = target.includes('+')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: raw,
    duration: 1.8,
    ease: 'power3.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + (hasSuffix ? '+' : '')
    }
  })
}

export function SiteMotion() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1))
      if (!target) return

      const top = target.getBoundingClientRect().top + window.scrollY - 86
      const lenis = (window as any).lenis
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(Math.max(0, top), { immediate: true })
      } else {
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
      }
    }

    const frame = window.requestAnimationFrame(scrollToHash)
    const timers = [80, 260, 620].map((delay) => window.setTimeout(scrollToHash, delay))

    return () => {
      window.cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [hash, pathname])

  useEffect(() => {
    if (!hash) {
      const lenis = (window as any).lenis
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }
  }, [pathname, hash])

  useEffect(() => {
    // Force animations ON everywhere — premium visuals must be visible
    // even when OS/browser reports prefers-reduced-motion (common on
    // Windows Server / RDP / Parsec where animations are OS-disabled).
    const reduceMotion = false

    if (reduceMotion) {
      ScrollTrigger.refresh()
      return
    }

    let context: gsap.Context | undefined
    let fallbackTimer: number | undefined
    const frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        // ─── Scroll Progress Bar ───────────────────────────────────────
        gsap.to('.scroll-progress-bar', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.1
          }
        })

        // ─── General reveal animations with stagger ────────────────────
        const revealTargets = Array.from(new Set(gsap.utils.toArray<HTMLElement>(revealSelector)))

        revealTargets.forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              delay: Math.min((index % 5) * 0.04, 0.14),
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                once: true
              }
            }
          )
        })

        // ─── Fallback for initially visible elements ──────────────────
        const revealVisibleTargets = () => {
          revealTargets.forEach((element) => {
            const rect = element.getBoundingClientRect()
            if (rect.top < window.innerHeight * 0.94 && rect.bottom > -80) {
              gsap.to(element, {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
              })
            }
          })
        }
        fallbackTimer = window.setTimeout(revealVisibleTargets, 350)

        // ─── Hero parallax energy field ────────────────────────────────
        if (document.querySelector('.hero-section') && document.querySelector('.energy-field')) {
          gsap.to('.energy-field', {
            y: 86,
            opacity: 0.78,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Hero text subtle parallax ────────────────────────────────
        if (document.querySelector('.hero-copy')) {
          gsap.to('.hero-copy', {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Hero laptop visual parallax ──────────────────────────────
        if (document.querySelector('.hero-visual')) {
          gsap.to('.hero-visual', {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Desktop workflow stack parallax ──────────────────────────
        if (document.querySelector('.problem-section') && document.querySelector('.desktop-stack')) {
          gsap.to('.desktop-stack', {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: '.problem-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Architecture routing system parallax ─────────────────────
        if (document.querySelector('#architecture') && document.querySelector('.routing-system')) {
          gsap.to('.routing-system', {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: '#architecture',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Platform cards stagger parallax ─────────────────────────
        if (document.querySelector('.platform-section') && document.querySelector('.platform-card')) {
          gsap.to('.platform-card', {
            y: (index: number) => (index % 2 === 0 ? -18 : 16),
            ease: 'none',
            scrollTrigger: {
              trigger: '.platform-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Platform card stagger entrance (scale + fade) ────────────
        const platformCards = gsap.utils.toArray<HTMLElement>('.platform-card')
        if (platformCards.length) {
          gsap.fromTo(
            platformCards,
            { autoAlpha: 0, scale: 0.94, y: 30 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'back.out(1.3)',
              scrollTrigger: {
                trigger: '.platform-grid',
                start: 'top 88%',
                once: true
              }
            }
          )
        }

        // ─── Feature stat cards counter animation ─────────────────────
        const statValues = gsap.utils.toArray<HTMLElement>('.stat-value')
        statValues.forEach((el) => {
          const original = el.textContent || ''
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => animateCounter(el, original)
          })
        })

        // ─── Gate items stagger entrance ─────────────────────────────
        const gateItems = gsap.utils.toArray<HTMLElement>('.gate')
        if (gateItems.length) {
          gsap.fromTo(
            gateItems,
            { autoAlpha: 0, x: -20 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.gate-panel',
                start: 'top 86%',
                once: true
              }
            }
          )
        }

        // ─── Architecture stage cards stagger slide-in ───────────────
        const stageCards = gsap.utils.toArray<HTMLElement>('.stage-detail-card')
        if (stageCards.length) {
          gsap.fromTo(
            stageCards,
            { autoAlpha: 0, x: -30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.stages-detail-list',
                start: 'top 88%',
                once: true
              }
            }
          )
        }

        // ─── Architecture grid cards scale entrance ───────────────────
        const archCards = gsap.utils.toArray<HTMLElement>('.architecture-grid-card')
        if (archCards.length) {
          gsap.fromTo(
            archCards,
            { autoAlpha: 0, scale: 0.92, y: 20 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.architecture-map',
                start: 'top 85%',
                once: true
              }
            }
          )
        }

        // ─── Review cards stagger entrance ───────────────────────────
        const reviewCards = gsap.utils.toArray<HTMLElement>('.review-card')
        if (reviewCards.length > 0) {
          // Just reveal the grid, not individual cards since they animate via marquee
          gsap.fromTo(
            '.reviews-grid',
            { autoAlpha: 0, x: -30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.reviews-section',
                start: 'top 88%',
                once: true
              }
            }
          )
        }

        // ─── Circular lifecycle visualizer reveal ─────────────────────
        if (document.querySelector('.circular-visualizer-wrap')) {
          gsap.fromTo(
            '.circular-visualizer-wrap',
            { autoAlpha: 0, scale: 0.88 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: '.lifecycle-section',
                start: 'top 82%',
                once: true
              }
            }
          )
        }

        // ─── SVG diagram fade-in ──────────────────────────────────────
        if (document.querySelector('.explicit-svg-visual-card')) {
          gsap.fromTo(
            '.explicit-svg-visual-card',
            { autoAlpha: 0, x: 40 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.explicit-layers-layout',
                start: 'top 84%',
                once: true
              }
            }
          )
        }

        // ─── Floating badges subtle float animation ───────────────────
        const floatingBadges = gsap.utils.toArray<HTMLElement>('.floating-badge')
        if (floatingBadges.length) {
          floatingBadges.forEach((badge, i) => {
            gsap.to(badge, {
              y: i % 2 === 0 ? -8 : 8,
              duration: 2.5 + i * 0.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.3
            })
          })
        }

        // ─── Premium 3D card tilt (mouse-tracked perspective) ────────
        const tiltTargets = gsap.utils.toArray<HTMLElement>(
          '.platform-card, .gate, .review-form-container, .doc-card, .architecture-grid-card'
        )

        tiltTargets.forEach((card) => {
          card.classList.add('tilt-card')

          // Inject glare layer once
          if (!card.querySelector('.tilt-glare')) {
            const glare = document.createElement('div')
            glare.className = 'tilt-glare'
            card.appendChild(glare)
          }

          const rotateXTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' })
          const rotateYTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' })

          gsap.set(card, { transformPerspective: 900 })

          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width
            const py = (e.clientY - rect.top) / rect.height

            rotateYTo((px - 0.5) * 10)
            rotateXTo((0.5 - py) * 8)

            card.style.setProperty('--glare-x', `${px * 100}%`)
            card.style.setProperty('--glare-y', `${py * 100}%`)
            card.classList.add('is-tilting')
          })

          card.addEventListener('mouseleave', () => {
            rotateXTo(0)
            rotateYTo(0)
            card.classList.remove('is-tilting')
          })
        })

        // ─── Hero title luxury entrance (split-line reveal) ───────────
        if (document.querySelector('.hero-title-line')) {
          gsap.fromTo(
            '.hero-title-line',
            { autoAlpha: 0, y: 44, rotateX: -18 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 1.05,
              stagger: 0.14,
              ease: 'power4.out',
              delay: 0.15
            }
          )
        }

        // ─── Hero subtitle + social proof soft cascade ────────────────
        if (document.querySelector('.hero-subtitle')) {
          gsap.fromTo(
            ['.hero-subtitle', '.hero-social-proof'],
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power3.out',
              delay: 0.55
            }
          )
        }

        // ─── Scroll-scrubbed section heading letter-spacing luxe ──────
        const luxeHeadings = gsap.utils.toArray<HTMLElement>(
          '.section-heading h2, .split-section h2, .safety-copy h2'
        )
        luxeHeadings.forEach((h) => {
          gsap.fromTo(
            h,
            { letterSpacing: '0.02em', opacity: 0.85 },
            {
              letterSpacing: '-0.01em',
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: h,
                start: 'top 92%',
                end: 'top 42%',
                scrub: 0.3
              }
            }
          )
        })

        // ─── Reviews track premium scroll-speed drift ─────────────────
        if (document.querySelector('.reviews-track')) {
          gsap.to('.reviews-track', {
            x: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: '.reviews-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3
            }
          })
        }

        // ─── Final CTA magnetic glow pulse on scroll-in ───────────────
        if (document.querySelector('.final-cta')) {
          gsap.fromTo(
            '.final-cta',
            { boxShadow: '0 0 0 rgba(114,226,255,0)' },
            {
              boxShadow: '0 0 120px rgba(114,226,255,0.09)',
              ease: 'none',
              scrollTrigger: {
                trigger: '.final-cta',
                start: 'top 90%',
                end: 'top 40%',
                scrub: 0.3
              }
            }
          )
        }

        // ─── Hero subactions fade in ──────────────────────────────────
        if (document.querySelector('.hero-subactions')) {
          gsap.fromTo(
            '.hero-subactions',
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.8,
              delay: 0.6,
              ease: 'power2.out'
            }
          )
        }

        ScrollTrigger.refresh()
      })
    })

    // ─── Reviews: scroll-driven drift (scroll-world scrub approach) ──
    // Mouse wheel, drag-to-scroll, and idle auto-drift on [data-scroll-drift]
    const driftCleanup = initScrollDrift()

    return () => {
      window.cancelAnimationFrame(frame)
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer)
      }
      driftCleanup()
      context?.revert()
    }
  }, [pathname])

/**
 * Scroll-world inspired scroll-drift engine for review carousels.
 * - Mouse wheel over the container scrolls it (captures from page scroll)
 * - Drag-to-scroll with momentum
 * - Idle auto-drift (gentle auto-scroll when user is inactive)
 * - Infinite loop (wraps back to top when bottom is reached)
 */
function initScrollDrift() {
  const containers = document.querySelectorAll<HTMLElement>('[data-scroll-drift]')
  if (!containers.length) return () => {}

  const cleanups: (() => void)[] = []

  containers.forEach((container) => {
    let isDragging = false
    let startY = 0
    let startScrollTop = 0
    let lastScrollTop = 0
    let velocity = 0
    let momentumRaf = 0
    let driftRaf = 0
    let idleTimer = 0
    let isIdle = false

    const track = container.querySelector<HTMLElement>('.reviews-track')
    if (!track) return

    // ─── Infinite loop setup: ensure content is doubled ─────────────
    const children = Array.from(track.children)
    const halfHeight = children.slice(0, children.length / 2).reduce(
      (sum, el) => sum + (el as HTMLElement).offsetHeight + 20, 0
    )

    // ─── Mouse wheel: capture scroll from page ──────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      container.scrollTop += e.deltaY * 1.2
      resetIdle()
    }

    // ─── Drag-to-scroll ─────────────────────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      startY = e.clientY
      startScrollTop = container.scrollTop
      lastScrollTop = container.scrollTop
      velocity = 0
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      cancelMomentum()
      stopDrift()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const dy = startY - e.clientY
      const newScrollTop = startScrollTop + dy
      velocity = lastScrollTop - newScrollTop
      container.scrollTop = newScrollTop
      lastScrollTop = newScrollTop
    }

    const onPointerUp = () => {
      if (!isDragging) return
      isDragging = false
      container.style.cursor = ''
      container.style.userSelect = ''
      applyMomentum()
      resetIdle()
    }

    // ─── Momentum after drag release ────────────────────────────────
    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.5) return
      container.scrollTop -= velocity * 0.95
      velocity *= 0.92
      momentumRaf = requestAnimationFrame(applyMomentum)
    }
    const cancelMomentum = () => cancelAnimationFrame(momentumRaf)

    // ─── Idle auto-drift ────────────────────────────────────────────
    const DRIFT_SPEED = 0.6 // px per frame

    const startDrift = () => {
      if (isIdle) return
      isIdle = true
      const drift = () => {
        if (!isIdle || isDragging) return
        container.scrollTop += DRIFT_SPEED
        // Wrap around for infinite loop
        if (container.scrollTop >= halfHeight) {
          container.scrollTop -= halfHeight
        }
        driftRaf = requestAnimationFrame(drift)
      }
      driftRaf = requestAnimationFrame(drift)
    }

    const stopDrift = () => {
      isIdle = false
      cancelAnimationFrame(driftRaf)
    }

    const resetIdle = () => {
      stopDrift()
      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(startDrift, 2500)
    }

    // ─── Scroll event: reset idle timer ─────────────────────────────
    const onScroll = () => {
      resetIdle()
      // Infinite wrap
      if (container.scrollTop >= halfHeight) {
        container.scrollTop -= halfHeight
      } else if (container.scrollTop <= 0 && halfHeight > 0) {
        container.scrollTop += halfHeight
      }
    }

    // ─── Attach listeners (container-scoped, not global) ────────────
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('pointerdown', onPointerDown)
    // pointermove/up on container only when dragging — avoids global listener overhead
    const onPointerMoveScoped = (e: PointerEvent) => {
      if (!isDragging) return
      onPointerMove(e)
    }
    const onPointerUpScoped = () => {
      if (!isDragging) return
      onPointerUp()
    }
    container.addEventListener('pointermove', onPointerMoveScoped, { passive: true })
    container.addEventListener('pointerup', onPointerUpScoped, { passive: true })
    container.addEventListener('pointerleave', onPointerUpScoped, { passive: true })
    container.addEventListener('scroll', onScroll, { passive: true })

    // Start idle drift after 2s
    idleTimer = window.setTimeout(startDrift, 2000)

    cleanups.push(() => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMoveScoped)
      container.removeEventListener('pointerup', onPointerUpScoped)
      container.removeEventListener('pointerleave', onPointerUpScoped)
      container.removeEventListener('scroll', onScroll)
      stopDrift()
      cancelMomentum()
      clearTimeout(idleTimer)
    })
  })

  return () => cleanups.forEach((fn) => fn())
}

  return null
}
