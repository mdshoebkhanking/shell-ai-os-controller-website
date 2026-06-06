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
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { LaptopMockup, LaptopStory } from '../components/LaptopMockup'
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

const routingStages = [
  {
    id: '01',
    title: 'Input surfaces',
    detail: 'Chat, voice, Telegram, or CLI request enters the control surface with source context.',
    signal: 'Intent',
    Icon: TerminalSquare,
    points: ['Chat / voice / Telegram / CLI', 'Workspace state', 'Command source']
  },
  {
    id: '02',
    title: 'Router + bridge',
    detail: 'Shell normalizes context, then routes intent through the UI bridge and natural-language router.',
    signal: 'Route',
    Icon: Network,
    points: ['QWebChannel + Shell Hub', 'Natural router', 'Context frame']
  },
  {
    id: '03',
    title: 'Tool gateway',
    detail: 'Parameters, ownership, risk level, dry-run expectations, and safety policy are checked first.',
    signal: 'Gate',
    Icon: ShieldCheck,
    points: ['Tool contract', 'SAFE / ASK / BLOCK', 'Runtime policy']
  },
  {
    id: '04',
    title: 'Result + trace',
    detail: 'Shell returns output, logs, diagnostics, and optional memory updates after controlled execution.',
    signal: 'Result',
    Icon: Activity,
    points: ['Local execution', 'Logs + diagnostics', 'Optional memory']
  }
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
  const heroDownloadLabel = releaseContent.assetFound ? 'Download Windows EXE' : 'Open latest release'
  const heroDownloadMeta = releaseContent.assetFound
    ? `${releaseContent.version} · ${releaseContent.size}`
    : releaseContent.status === 'loading'
      ? 'Resolving live GitHub asset'
      : 'Fallback via GitHub Releases'

  return (
    <main>
      <section id="download" className="hero-section">
        <TubesBackground className="hero-tubes-layer" />
        <div className="hero-copy">
          <div className="badge-row">
            <span>Open source</span>
            <span>Apache-2.0</span>
            <span>Windows best experience</span>
            <span>macOS/Linux partial</span>
            <span>Offline-capable</span>
            <span>No API key needed</span>
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
          <div className="hero-offline-note" aria-label="Offline Shell support">
            <WifiOff size={18} />
            <span>
              <strong>Offline voice available.</strong> Run local mode without API keys or internet; connect providers only when cloud models are needed.
            </span>
          </div>

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
              <Link to="/docs#linux-cli" className="secondary-action linux-cli-action">
                <TerminalSquare size={18} />
                Linux CLI
              </Link>
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
              <div className="offline-trust-card">
                <WifiOff />
                <span>Offline mode</span>
                <strong>No API key needed</strong>
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
          <div className="routing-flow" aria-hidden="true">
            <span>Input</span>
            <i />
            <span>Route</span>
            <i />
            <span>Gate</span>
            <i />
            <span>Result</span>
          </div>

          <div className="routing-stage-grid">
            {routingStages.map((stage) => {
              const Icon = stage.Icon

              return (
                <article key={stage.id} className="routing-stage">
                  <div className="routing-stage-head">
                    <Icon />
                    <div>
                      <span>{stage.id} / {stage.signal}</span>
                      <strong>{stage.title}</strong>
                    </div>
                  </div>
                  <p>{stage.detail}</p>
                  <ul>
                    {stage.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="section-heading">
          <p className="eyebrow">Platform Story</p>
          <h2>Choose the right Shell path for your machine.</h2>
        </div>
        <div className="platform-grid">
          {platformCards.map((platform) => {
            const Icon = platform.icon
            const details = platformDetails[platform.title]
            const cta = (
              <span className="platform-cta-content">
                {details.action}
                <ArrowRight size={15} />
              </span>
            )

            return (
              <article
                key={platform.title}
                className={`platform-card platform-card-${platform.title.toLowerCase()}${
                  platform.title === 'Windows' ? ' primary' : ''
                }`}
              >
                <div className="platform-card-top">
                  <div className="platform-title-lockup">
                    <Icon />
                    <div>
                      <span>{platform.label}</span>
                      <h3>{platform.title}</h3>
                    </div>
                  </div>
                  <div className="platform-marker" aria-label={`${platform.title} status ${details.marker}`}>
                    <strong>{details.marker}</strong>
                  </div>
                </div>

                <div className="platform-profile">
                  <span>{details.status}</span>
                  <strong>{details.path}</strong>
                  <p>{details.summary}</p>
                </div>

                <ul>
                  {platform.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      {point}
                    </li>
                  ))}
                </ul>

                {details.href.startsWith('#') ? (
                  <a href={details.href} className="platform-cta">
                    {cta}
                  </a>
                ) : (
                  <Link to={details.href} className="platform-cta">
                    {cta}
                  </Link>
                )}
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

      <footer className="home-legal-footer" aria-label="Shell AI footer">
        <span className="footer-watermark" aria-hidden="true">SHELL</span>
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>Shell AI OS Controller</strong>
            <span>Open-source AI desktop control layer for safe local workflows.</span>
            <small>Apache-2.0</small>
          </div>

          <nav aria-label="Product links">
            <h3>Product</h3>
            <a href="#download">Download</a>
            <a href="#features">Features</a>
            <a href="#architecture">Architecture</a>
            <a href="#safety">Safety</a>
          </nav>

          <nav aria-label="Resources links">
            <h3>Resources</h3>
            <Link to="/docs">Docs</Link>
            <a href={githubRepoUrl} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`${githubRepoUrl}/releases`} target="_blank" rel="noreferrer">Releases</a>
            <a href={`${githubRepoUrl}/issues`} target="_blank" rel="noreferrer">Issues</a>
          </nav>

          <nav aria-label="Legal links">
            <h3>Legal</h3>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <a href={`${githubRepoUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">License</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Shell AI OS Controller</span>
          <span>Windows installer · macOS coming soon · Linux CLI</span>
        </div>
      </footer>
    </main>
  )
}
