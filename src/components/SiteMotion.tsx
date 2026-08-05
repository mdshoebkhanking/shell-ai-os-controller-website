import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
              scrub: 0.5
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
              scrub: 0.8
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
              scrub: 0.6
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
              scrub: 0.5
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
              scrub: 0.5
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
              scrub: 0.5
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

    return () => {
      window.cancelAnimationFrame(frame)
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer)
      }
      context?.revert()
    }
  }, [pathname])

  return null
}
