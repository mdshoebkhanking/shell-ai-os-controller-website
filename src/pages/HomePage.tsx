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
  TerminalSquare
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { LaptopMockup, LaptopStory } from '../components/LaptopMockup'
import { ReleaseDownloadCard } from '../components/ReleaseDownloadCard'
import { TubesBackground } from '../components/TubesBackground'
import { githubRepoUrl, platformCards, screenStates } from '../data'
import { useLatestReleaseContent } from '../release'

const desktopWorkflowLayers = [
  { label: 'Apps', detail: 'Windows', Icon: AppWindow },
  { label: 'Files', detail: 'Local', Icon: BookOpen },
  { label: 'Terminal', detail: 'Shell', Icon: TerminalSquare },
  { label: 'Browser', detail: 'Web', Icon: Globe },
  { label: 'APIs', detail: 'Tools', Icon: Network },
  { label: 'Logs', detail: 'Trace', Icon: Activity },
  { label: 'Memory', detail: 'Recall', Icon: Brain }
]

const platformMeta: Record<string, { depth: string; score: string; status: string; summary: string; chips: string[] }> = {
  Windows: {
    depth: '96%',
    score: '96',
    status: 'Full desktop path',
    summary: 'Installer, shortcuts, native Windows automation, and strongest PC-control coverage.',
    chips: ['Setup EXE', 'MCP', 'pywinauto']
  },
  macOS: {
    depth: '64%',
    score: '64',
    status: 'Source helper path',
    summary: 'Best for Web UI, chat, docs, voice, and development workflows with partial automation.',
    chips: ['Web UI', 'Voice', 'Tools']
  },
  Linux: {
    depth: '58%',
    score: '58',
    status: 'Dev workflow path',
    summary: 'Strong for CLI, diagnostics, RAG, and local tooling where desktop automation varies.',
    chips: ['CLI', 'RAG', 'Diagnostics']
  }
}

const routingSteps = [
  {
    id: '01',
    title: 'User input',
    detail: 'Chat, voice, Telegram, or CLI request enters the control surface.',
    signal: 'Intent captured',
    Icon: TerminalSquare
  },
  {
    id: '02',
    title: 'Shell surfaces',
    detail: 'The UI normalizes context, active workspace state, and command source.',
    signal: 'Context frame',
    Icon: AppWindow
  },
  {
    id: '03',
    title: 'QWebChannel + Shell Hub',
    detail: 'Frontend and backend exchange structured events through the bridge.',
    signal: 'Runtime bridge',
    Icon: Network
  },
  {
    id: '04',
    title: 'Natural router',
    detail: 'Intent is classified into answer, tool call, automation, or memory path.',
    signal: 'Route selected',
    Icon: Brain
  },
  {
    id: '05',
    title: 'Tool gateway',
    detail: 'Parameters, permissions, dry-run expectations, and tool ownership are checked.',
    signal: 'Tool contract',
    Icon: Boxes
  },
  {
    id: '06',
    title: 'Safety policy',
    detail: 'Actions are marked SAFE, ASK, BLOCK, or TRACE before execution.',
    signal: 'Guard state',
    Icon: ShieldCheck
  },
  {
    id: '07',
    title: 'Local execution',
    detail: 'Shell runs local tools, desktop automation, APIs, browser wrappers, or scripts.',
    signal: 'Controlled run',
    Icon: Layers3
  },
  {
    id: '08',
    title: 'Result + memory',
    detail: 'The user gets output, logs, trace, diagnostics, and optional recall updates.',
    signal: 'Audited result',
    Icon: Activity
  }
]

export function HomePage() {
  const releaseContent = useLatestReleaseContent()
  const heroDownloadLabel = releaseContent.assetFound ? 'Download Windows EXE' : 'Open latest release'
  const heroDownloadMeta = releaseContent.assetFound
    ? `${releaseContent.version} · ${releaseContent.size}`
    : releaseContent.status === 'loading'
      ? 'Resolving live GitHub asset'
      : 'Fallback via GitHub Releases'

  return (
    <main>
      <section className="hero-section">
        <TubesBackground className="hero-tubes-layer" />
        <div className="hero-copy">
          <div className="badge-row">
            <span>Open source</span>
            <span>Apache-2.0</span>
            <span>Windows best experience</span>
            <span>macOS/Linux partial</span>
            <span>Local-first</span>
            <span>Safety-gated</span>
          </div>

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

          <div className="hero-download-cluster">
            <div className="hero-actions">
              <a
                href={releaseContent.disabled ? '#download' : releaseContent.href}
                className={
                  releaseContent.disabled
                    ? 'primary-action shiny-action hero-download-action is-loading'
                    : 'primary-action shiny-action hero-download-action'
                }
                target={releaseContent.disabled ? undefined : '_blank'}
                rel={releaseContent.disabled ? undefined : 'noreferrer'}
                aria-disabled={releaseContent.disabled}
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
              <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="secondary-action github-action">
                <ExternalLink size={18} />
                View GitHub
              </a>
              <Link to="/docs" className="secondary-action">
                <BookOpen size={18} />
                Read Docs
              </Link>
            </div>

            <div className="hero-trust-grid" aria-label="Download trust signals">
              <div>
                <CheckCircle2 />
                <span>Windows setup</span>
                <strong>{releaseContent.assetFound ? 'EXE resolved' : 'Release fallback'}</strong>
              </div>
              <div>
                <ShieldCheck />
                <span>Integrity</span>
                <strong>{releaseContent.digest.startsWith('sha256:') ? 'SHA256 digest' : 'Release metadata'}</strong>
              </div>
              <div>
                <ExternalLink />
                <span>Source</span>
                <strong>GitHub auditable</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="energy-field" />
          <LaptopMockup activeId="dashboard" />
        </div>
      </section>

      <LaptopStory screens={screenStates} />

      <section className="split-section">
        <div>
          <p className="eyebrow">Positioning</p>
          <h2>Not an OS. A control layer over your OS.</h2>
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

      <section className="problem-section">
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

      <section id="architecture" className="pipeline-section">
        <div className="section-heading">
          <p className="eyebrow">How Shell Thinks</p>
          <h2>Every request moves through a visible routing layer.</h2>
          <p>
            Intent becomes a guarded tool call only after routing, policy, and
            runtime state checks.
          </p>
        </div>

        <div className="routing-system" aria-label="Shell request routing map">
          <div className="routing-system-grid" />
          <div className="routing-rail" />
          <div className="routing-terminal routing-terminal-input">Input</div>
          <div className="routing-terminal routing-terminal-output">Result</div>

          <div className="pipeline">
            {routingSteps.map((step) => {
              const Icon = step.Icon

              return (
                <article key={step.id} className="pipeline-node">
                  <div className="pipeline-node-top">
                    <span>{step.id}</span>
                    <Icon />
                  </div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                  <small>{step.signal}</small>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="section-heading">
          <p className="eyebrow">Platform Story</p>
          <h2>Windows first, honest cross-platform support.</h2>
        </div>
        <div className="platform-grid">
          {platformCards.map((platform) => {
            const Icon = platform.icon
            const meta = platformMeta[platform.title]

            return (
              <article
                key={platform.title}
                className={platform.title === 'Windows' ? 'platform-card primary' : 'platform-card'}
              >
                <div className="platform-card-top">
                  <div className="platform-title-lockup">
                    <Icon />
                    <div>
                      <span>{platform.label}</span>
                      <h3>{platform.title}</h3>
                    </div>
                  </div>

                  {meta && (
                    <div className="platform-score" aria-label={`${platform.title} support score ${meta.score}`}>
                      <strong>{meta.score}</strong>
                      <small>%</small>
                    </div>
                  )}
                </div>

                {meta && (
                  <div className="platform-support">
                    <div>
                      <span>Support profile</span>
                      <strong>{meta.status}</strong>
                      <p>{meta.summary}</p>
                    </div>
                    <div className="platform-meter" aria-hidden="true">
                      <i style={{ '--level': meta.depth } as CSSProperties} />
                    </div>
                    <div className="platform-chip-row">
                      {meta.chips.map((chip) => (
                        <small key={chip}>{chip}</small>
                      ))}
                    </div>
                  </div>
                )}

                <ul>
                  {platform.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      {point}
                    </li>
                  ))}
                </ul>
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

      <ReleaseDownloadCard />

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

      <footer className="home-legal-footer" aria-label="Shell AI legal links">
        <div>
          <strong>Shell AI OS Controller</strong>
          <span>Open-source AI desktop control layer. Review policies before public or team deployment.</span>
        </div>
        <nav>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </nav>
      </footer>
    </main>
  )
}
