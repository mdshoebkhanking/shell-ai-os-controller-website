import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealSelector = [
  '.section-heading',
  '.split-section > div',
  '.story-proof-grid div',
  '.story-steps article',
  '.desktop-stack',
  '.routing-system',
  '.pipeline-node',
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
  '.install-notes'
].join(',')

export function SiteMotion() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1))
      if (!target) return

      const top = target.getBoundingClientRect().top + window.scrollY - 86
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
    }

    const frame = window.requestAnimationFrame(scrollToHash)
    const timers = [80, 260, 620].map((delay) => window.setTimeout(scrollToHash, delay))

    return () => {
      window.cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [hash, pathname])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      ScrollTrigger.refresh()
      return
    }

    let context: gsap.Context | undefined
    let fallbackTimer: number | undefined
    let revealVisibleTargets: (() => void) | undefined
    const frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        const revealTargets = Array.from(new Set(gsap.utils.toArray<HTMLElement>(revealSelector)))

        revealTargets.forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 34, filter: 'blur(10px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.82,
              delay: Math.min((index % 5) * 0.045, 0.18),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            }
          )
        })

        revealVisibleTargets = () => {
          revealTargets.forEach((element) => {
            const rect = element.getBoundingClientRect()

            if (rect.top < window.innerHeight * 0.94 && rect.bottom > -80) {
              gsap.to(element, {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.36,
                ease: 'power2.out',
                overwrite: 'auto'
              })
            }
          })
        }

        window.addEventListener('scroll', revealVisibleTargets, { passive: true })
        fallbackTimer = window.setTimeout(revealVisibleTargets, 620)

        gsap.to('.energy-field', {
          y: 86,
          opacity: 0.78,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to('.desktop-stack', {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: '.problem-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to('.routing-system', {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: '#architecture',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to('.platform-card', {
          y: (index) => (index % 2 === 0 ? -18 : 16),
          ease: 'none',
          scrollTrigger: {
            trigger: '.platform-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })

        ScrollTrigger.refresh()
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer)
      }
      if (revealVisibleTargets) {
        window.removeEventListener('scroll', revealVisibleTargets)
      }
      context?.revert()
    }
  }, [pathname])

  return null
}
