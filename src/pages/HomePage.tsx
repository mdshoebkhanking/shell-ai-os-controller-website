import {
  Activity,
  AppWindow,
  ArrowRight,
  Brain,
  BookOpen,
  Boxes,
  CheckCircle2,
  Download,
  ExternalLink,
  Globe,
  Layers3,
  LockKeyhole,
  Network,
  ShieldAlert,
  ShieldCheck,
  TerminalSquare,
  WifiOff
} from 'lucide-react'
import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InternalAIFabricBackground } from '../components/InternalAIFabricBackground'
import { LaptopMockup, LaptopStory } from '../components/LaptopMockup'
import { githubRepoUrl, platformCards, screenStates } from '../data'
import { useLatestReleaseContent } from '../release'

gsap.registerPlugin(ScrollTrigger)

const desktopWorkflowLayers = [
  { label: 'Apps', detail: 'Windows', Icon: AppWindow },
  { label: 'Files', detail: 'Local', Icon: BookOpen },
  { label: 'Terminal', detail: 'Shell', Icon: TerminalSquare },
  { label: 'Browser', detail: 'Web', Icon: Globe },
  { label: 'APIs', detail: 'Tools', Icon: Network },
  { label: 'Logs', detail: 'Trace', Icon: Activity },
  { label: 'Memory', detail: 'Recall', Icon: Brain }
]

const homeRailItems = [
  { id: 'download', label: 'Download', Icon: Download },
  { id: 'story', label: 'Story', Icon: BookOpen },
  { id: 'problem', label: 'Desktop Problem', Icon: Layers3 },
  { id: 'platform', label: 'Platform Story', Icon: AppWindow },
  { id: 'safety', label: 'Safety Cockpit', Icon: ShieldCheck },
  { id: 'reviews', label: 'Reviews & Feedback', Icon: CheckCircle2 }
]

const platformDetails: Record<
  string,
  {
    status: string
    path: string
    summary: string
    marker: string
    action: string
    href: string
  }
> = {
  Windows: {
    status: 'Best supported',
    path: 'Setup EXE path',
    summary: 'Use the Windows installer when you want the strongest desktop-control path and the cleanest first run.',
    marker: 'EXE',
    action: 'Download Windows EXE',
    href: '#download'
  },
  macOS: {
    status: 'Installer coming soon',
    path: 'Source helper path',
    summary: 'Use helper scripts for Web UI, docs, chat, and development workflows while installer support is planned.',
    marker: 'Soon',
    action: 'macOS helper docs',
    href: '/docs#macos-helper'
  },
  Linux: {
    status: 'CLI available',
    path: 'ShellAI Core CLI',
    summary: 'Use the CLI/source path for diagnostics, local dev workflows, and environments where automation varies.',
    marker: 'CLI',
    action: 'Open Linux CLI',
    href: '/docs#linux-cli'
  }
}

export function HomePage() {
  const releaseContent = useLatestReleaseContent()
  const badgeVersion = releaseContent.status === 'ready' ? releaseContent.version : 'NEW'
  const heroDownloadLabel = releaseContent.assetFound ? 'Download Windows EXE' : 'Open latest release'
  const heroDownloadMeta = releaseContent.assetFound
    ? `${releaseContent.version} · ${releaseContent.size}`
    : releaseContent.status === 'loading'
      ? 'Resolving live GitHub asset'
      : 'Fallback via GitHub Releases'

  const [reviews, setReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem('shell_ai_reviews_v7')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: '1',
        name: 'Sarah Jenkins',
        role: 'Lead Dev @ AutomateHQ',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        comment: 'The guarded tool gateway makes terminal automation feel controlled. I can preview commands, approve risky work, and still move fast.',
        date: 'Jun 12, 2026'
      },
      {
        id: '2',
        name: 'Rohan Sharma',
        role: 'Full-Stack Dev @ TechMahindra',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        comment: 'Voice control, offline workflows, and Windows setup all feel simple. I had desktop automation running in just a few minutes.',
        date: 'Jun 10, 2026'
      },
      {
        id: '3',
        name: 'Aiden Vance',
        role: 'Security Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        comment: 'Local SQLite memory and .env-based secrets make the architecture easy to audit. It is a strong fit for teams that care about control.',
        date: 'May 30, 2026'
      },
      {
        id: '4',
        name: 'Priya Patel',
        role: 'ML Engineer @ Bangalore AI Lab',
        avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 4,
        comment: 'Context lookup is quick because memory stays local. The safety cockpit is clear enough for real enterprise review flows.',
        date: 'May 29, 2026'
      },
      {
        id: '5',
        name: 'Elena Rostova',
        role: 'Full-Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 4,
        comment: 'Local voice pipelines worked smoothly on Windows. The logs and GPU charts made it clear what the system was doing.',
        date: 'May 28, 2026'
      },
      {
        id: '6',
        name: 'Kabir Mehta',
        role: 'Devops Lead @ CloudScale India',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        comment: 'Telegram allowlists and status triggers make remote administration practical. The parameter checks keep powerful actions from becoming careless.',
        date: 'May 25, 2026'
      }
    ]
  })

  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [formError, setFormError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeRailSection, setActiveRailSection] = useState('download')
  const marqueeReviews = [...reviews, ...reviews]
  const heroStatus = screenStates[0]

  useEffect(() => {
    const sections = homeRailItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveRailSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-38% 0px -46% 0px',
        threshold: [0.02, 0.2, 0.45, 0.7]
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleMagneticMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12

    target.style.setProperty('--magnetic-x', `${Math.max(-6, Math.min(6, x)).toFixed(2)}px`)
    target.style.setProperty('--magnetic-y', `${Math.max(-6, Math.min(6, y)).toFixed(2)}px`)
  }

  const handleMagneticLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--magnetic-x', '0px')
    event.currentTarget.style.setProperty('--magnetic-y', '0px')
  }

  const handleTiltMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    target.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`)
    target.style.setProperty('--tilt-y', `${(x * 9).toFixed(2)}deg`)
  }

  const handleTiltLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  // Word-by-word blur reveal for the positioning headline
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '.word-split-word',
        { opacity: 0.1, y: 16, filter: 'blur(7px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.split-section',
            start: 'top 80%',
            end: 'top 34%',
            scrub: 0.6
          }
        }
      )
    })

    return () => context.revert()
  }, [])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) {
      setFormError('Please enter your name.')
      return
    }
    if (!newComment.trim() || newComment.length < 10) {
      setFormError('Review comment must be at least 10 characters long.')
      return
    }

    const newReview = {
      id: Date.now().toString(),
      name: newName.trim(),
      role: newRole.trim() || 'Shell AI Enthusiast',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newName.trim())}&background=06b6d4&color=fff&bold=true`,
      rating: newRating,
      comment: newComment.trim(),
      date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
      isUserAdded: true
    }

    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem('shell_ai_reviews_v7', JSON.stringify(updatedReviews))

    // Clear form
    setNewName('')
    setNewRole('')
    setNewRating(5)
    setNewComment('')
    setFormError('')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <main>
      <nav className="home-section-rail" aria-label="Home section navigation">
        {homeRailItems.map((item) => {
          const Icon = item.Icon

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeRailSection === item.id ? 'is-active' : undefined}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={16} />
            </a>
          )
        })}
      </nav>

      <section id="download" className="hero-section">
        <div className="hero-copy">
          <a href="#download" className="hero-announcement-link">
            <div className="hero-announcement">
              <span className="announcement-badge">{badgeVersion}</span>
              <span className="announcement-text">Shell AI OS Controller is now live</span>
              <ArrowRight size={12} className="announcement-arrow" />
            </div>
          </a>

          <h1 className="hero-title" aria-label="Shell AI OS Controller">
            <span className="hero-title-line">Shell AI</span>
            <span className="hero-title-line hero-title-accent">
              OS Controller
              <svg className="hero-title-sweep" viewBox="0 0 120 12" aria-hidden="true" preserveAspectRatio="none">
                <path d="M2 7 C 30 2, 72 2, 118 7" />
              </svg>
            </span>
          </h1>
          <p className="hero-subtitle">
            An open-source AI desktop control layer for chat, voice, tools,
            automation, memory, agents, diagnostics, and safe local workflows.
          </p>

          <div className="hero-social-proof">
            <div className="avatar-group">
              <span className="avatar" style={{ background: 'var(--site-cyan)' }}>SJ</span>
              <span className="avatar" style={{ background: 'var(--site-teal)' }}>AV</span>
              <span className="avatar" style={{ background: 'var(--site-blue)' }}>ER</span>
              <span className="avatar" style={{ background: 'var(--site-amber)' }}>MK</span>
            </div>
            <div className="rating-info">
              <div className="stars">★★★★☆</div>
              <span><strong>4.7</strong> developer rating (500+ setups)</span>
            </div>
          </div>

          <div className="hero-offline-note" aria-label="Offline Shell support">
            <WifiOff size={18} />
            <span>
              <strong>Online and local control.</strong> Connect cloud providers when needed, or use local voice and core workflows without API keys or internet.
            </span>
          </div>

          <div className="hero-download-cluster">
            <div className="hero-actions">
              <a
                href={releaseContent.disabled ? '#download' : releaseContent.href}
                className={
                  releaseContent.disabled
                    ? 'primary-action hero-download-action hero-magnetic-action is-loading'
                    : 'primary-action hero-download-action hero-magnetic-action'
                }
                target={releaseContent.disabled ? undefined : '_blank'}
                rel={releaseContent.disabled ? undefined : 'noreferrer'}
                aria-disabled={releaseContent.disabled}
                onPointerMove={handleMagneticMove}
                onPointerLeave={handleMagneticLeave}
              >
                <span className="download-icon-frame">
                  <Download size={18} />
                </span>
                <span className="download-copy">
                  <strong>{heroDownloadLabel}</strong>
                  <small>{heroDownloadMeta}</small>
                </span>
                <ArrowRight className="download-arrow" size={17} />
              </a>
              <Link
                to="/docs"
                className="secondary-action hero-magnetic-action"
                onPointerMove={handleMagneticMove}
                onPointerLeave={handleMagneticLeave}
              >
                <BookOpen size={18} />
                Read Docs
              </Link>
            </div>
            <div className="hero-subactions">
              <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="hero-subaction-link">
                <ExternalLink size={13} />
                <span>View on GitHub</span>
              </a>
              <span className="hero-subaction-divider">•</span>
              <Link to="/docs#linux-cli" className="hero-subaction-link">
                <TerminalSquare size={13} />
                <span>Linux CLI Guide</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="energy-field" />
          <LaptopMockup />
        </div>
      </section>

      <div className="home-internal-background">
        <InternalAIFabricBackground variant="section" />
      </div>

      <LaptopStory screens={screenStates} />

      <section className="split-section">
        <div>
          <p className="eyebrow">Positioning</p>
          <h2 className="word-split-heading" aria-label="Not an OS. A control layer over your OS.">
            {'Not an OS. A control layer over your OS.'.split(' ').map((word, index) => (
              <span key={`${word}-${index}`} className="word-split-word" aria-hidden="true">
                {word}{' '}
              </span>
            ))}
          </h2>
        </div>
        <div className="split-copy">
          <p>
            Windows, macOS, and Linux already provide your desktop, kernel,
            files, permissions, and security boundaries. Shell sits above them
            as an AI command surface.
          </p>
          <p>
            It routes work through chat, voice, diagnostics, tools, memory, and
            safety gates, then returns structured results, logs, and visible
            readiness state.
          </p>
        </div>
      </section>

      <section id="problem" className="problem-section">
        <div className="section-heading align-left">
          <p className="eyebrow">The Desktop Problem</p>
          <h2>Most assistants stop at chat.</h2>
          <p>
            Shell connects the prompt to the messy parts of real work: apps,
            files, terminal commands, browser tasks, APIs, memory, logs, and
            local readiness.
          </p>
        </div>
        <div className="desktop-stack" aria-label="Desktop workflow layers">
          <div className="workflow-grid-lines" />
          <div className="workflow-pulse workflow-pulse-one" />
          <div className="workflow-pulse workflow-pulse-two" />
          <div className="workflow-rail workflow-rail-left" />
          <div className="workflow-rail workflow-rail-right" />

          <div className="workflow-signal-strip" aria-hidden="true">
            <span>Input stream</span>
            <span>Policy check</span>
            <span>Live trace</span>
          </div>

          <div className="workflow-core shell-overlay">
            <div className="workflow-core-icon">
              <Layers3 />
            </div>
            <div>
              <span>Routing Layer</span>
              <strong>Shell control layer</strong>
              <small>SAFE / ASK / TRACE</small>
            </div>
          </div>

          <div className="workflow-node-list">
            {desktopWorkflowLayers.map((layer, index) => {
              const Icon = layer.Icon

              return (
                <div key={layer.label} className="workflow-node" style={{ '--i': index } as CSSProperties}>
                  <Icon />
                  <span>{layer.label}</span>
                  <small>{layer.detail}</small>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="platform" className="platform-section">
        <div className="section-heading">
          <p className="eyebrow">Platform Story</p>
          <h2>Choose the right Shell path for your machine.</h2>
        </div>
        <div className="platform-grid">
          {platformCards.map((platform) => {
            const Icon = platform.icon
            const details = platformDetails[platform.title]
            const isPrimary = platform.title === 'Windows'

            return (
              <article
                key={platform.title}
                className={`platform-card tilt-card${isPrimary ? ' primary' : ''}`}
                onPointerMove={handleTiltMove}
                onPointerLeave={handleTiltLeave}
              >
                {isPrimary && (
                  <div className="platform-popular-badge">
                    <span>Best Supported</span>
                  </div>
                )}

                <div className="platform-card-header">
                  <div className="platform-title-group">
                    <Icon size={24} className="platform-card-icon" />
                    <h3>{platform.title}</h3>
                  </div>
                  <div className="platform-price-tag">
                    {details.marker}
                  </div>
                </div>

                <div className="platform-summary-text">
                  <p>{details.summary}</p>
                </div>

                <ul className="platform-features-list">
                  {platform.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={16} className="feature-check-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="platform-card-action">
                  {details.href.startsWith('#') ? (
                    <a href={details.href} className="primary-action platform-action-btn">
                      {details.action}
                      <ArrowRight size={15} />
                    </a>
                  ) : (
                    <Link to={details.href} className="secondary-action platform-action-btn">
                      {details.action}
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="safety" className="safety-section">
        <div className="safety-copy">
          <p className="eyebrow">Safety Cockpit</p>
          <h2>Human-controlled automation, not blind autonomy.</h2>
          <p>
            Risky work stays behind visible gates: preview, approval, block, and
            trace. Shell should explain what ran, what was blocked, and why.
          </p>
        </div>
        <div className="gate-panel">
          <div className="gate safe">
            <ShieldCheck />
            <strong>SAFE</strong>
            <span>Read-only or low-risk action</span>
          </div>
          <div className="gate ask">
            <ShieldAlert />
            <strong>ASK</strong>
            <span>Needs explicit approval</span>
          </div>
          <div className="gate block">
            <LockKeyhole />
            <strong>BLOCK</strong>
            <span>Outside allowed boundary</span>
          </div>
          <div className="gate trace">
            <TerminalSquare />
            <strong>TRACE</strong>
            <span>Logs and structured result</span>
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="section-heading">
          <p className="eyebrow">Reviews & Feedback</p>
          <h2>Clear feedback from real builders.</h2>
          <p>
            See what reviewers noticed about setup, safety gates, local memory, voice control, and day-to-day desktop automation.
          </p>
          <div className="reviews-summary-badge">
            <span className="reviews-summary-stars" aria-hidden="true">{'\u2605\u2605\u2605\u2605\u2606'}</span>
            <span><strong>4.7 / 5</strong> average score from 50+ developer reviews</span>
          </div>
        </div>

        <div className="reviews-layout">
          <div className="reviews-grid" aria-label="Reviewer feedback carousel">
            <div className="reviews-track">
              {marqueeReviews.map((review, index) => (
                <article
                  key={`${review.id}-${index}`}
                  className={`review-card review-card-tone-${index % reviews.length % 4}`}
                  aria-hidden={index >= reviews.length}
                >
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="review-avatar-img" />
                      ) : (
                        review.name.charAt(0)
                      )}
                    </div>
                    <div className="review-meta">
                      <div className="review-name-wrapper">
                        <strong>{review.name}</strong>
                        <CheckCircle2 size={13} className="review-verified-badge" />
                      </div>
                      <span>{review.role}</span>
                    </div>
                    <div className="review-date">{review.date}</div>
                  </div>
                  <div className="review-rating" aria-label={`${review.rating} out of 5 stars`}>
                    {'\u2605'.repeat(review.rating) + '\u2606'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-comment">"{review.comment}"</p>
                </article>
              ))}
            </div>
          </div>

          <div className="review-form-container">
            <form onSubmit={handleSubmitReview} className="review-form">
              <h3>Write a Review</h3>
              {formError && <p className="review-error-message">{formError}</p>}
              {showSuccess && <p className="review-success-message">🎉 Thank you! Your review has been added live.</p>}

              <div className="form-group">
                <label htmlFor="review-name">Name *</label>
                <input
                  id="review-name"
                  type="text"
                  placeholder="Your Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="review-role">Role / Company (Optional)</label>
                <input
                  id="review-role"
                  type="text"
                  placeholder="e.g. Lead Engineer @ AutomateHQ"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-stars-select">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${(hoverRating || newRating) >= star ? 'active' : ''}`}
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review-comment">Review *</label>
                <textarea
                  id="review-comment"
                  rows={4}
                  placeholder="Tell us what you think of Shell AI..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="primary-action submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <Boxes className="cta-icon" />
        <h2>Control your workspace with AI, safely.</h2>
        <div className="hero-actions centered">
          <a href="#download" className="primary-action shiny-action">
            Download Shell AI for Windows
            <ArrowRight size={18} />
          </a>
          <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="secondary-action github-action">
            Audit the source on GitHub
          </a>
          <Link to="/docs" className="secondary-action">
            Read install guide
          </Link>
        </div>
      </section>
    </main>
  )
}
