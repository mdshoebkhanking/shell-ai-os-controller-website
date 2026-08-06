import { ArrowRight, FileText, ShieldCheck, Download, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { docsSteps, githubRepoUrl } from '../data'
import { useLatestReleaseContent } from '../release'

function TerminalMockup({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="terminal-mockup">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="terminal-title">bash</span>
        <div className="terminal-actions">
          {copied && <span className="copied-text">Copied!</span>}
          <button className="terminal-copy" onClick={handleCopy} aria-label="Copy command" type="button">
            {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <code className="terminal-body">{command}</code>
    </div>
  )
}

function DocsLifecycleTimeline() {
  return (
    <div className="docs-timeline-svg-wrapper">
      <svg viewBox="0 0 800 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="docs-blueprint-svg">
        <defs>
          <linearGradient id="blueprint-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
          <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path d="M148 70 L340 70" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M148 70 L340 70" stroke="url(#blueprint-line-grad)" strokeWidth="1.5" className="animate-path" />
        
        <path d="M460 70 L652 70" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M460 70 L652 70" stroke="url(#blueprint-line-grad)" strokeWidth="1.5" className="animate-path" />

        <g className="svg-node" transform="translate(120, 70)">
          <circle r="26" fill="#09090b" stroke="#06b6d4" strokeWidth="1.5" className="node-circle" />
          <circle r="32" fill="transparent" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" className="node-outer" />
          <path d="M-5 -5 L5 -5 M-5 -1 L5 -1 M0 -5 L0 3 M-3 0 L0 3 L3 0" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="0" y="50" fill="#fafafa" fontSize="12.5" fontWeight="600" textAnchor="middle">1. Platform Setup</text>
          <text x="0" y="66" fill="#a1a1aa" fontSize="10.5" textAnchor="middle">Windows EXE or helpers</text>
        </g>

        <g className="svg-node" transform="translate(400, 70)">
          <circle r="26" fill="#09090b" stroke="#14b8a6" strokeWidth="1.5" className="node-circle" />
          <circle r="32" fill="transparent" stroke="rgba(20, 184, 166, 0.12)" strokeWidth="1" className="node-outer" />
          <circle r="4" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
          <path d="M-2 -7 L2 -7 M-7 -2 L-7 2 M7 -2 L7 2 M-2 7 L2 7 M-5 -5 L-3 -3 M5 -5 L3 -3 M-5 5 L-3 3 M5 5 L3 3" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
          <text x="0" y="50" fill="#fafafa" fontSize="12.5" fontWeight="600" textAnchor="middle">2. Configure Keys</text>
          <text x="0" y="66" fill="#a1a1aa" fontSize="10.5" textAnchor="middle">Create local .env credentials</text>
        </g>

        <g className="svg-node" transform="translate(680, 70)">
          <circle r="26" fill="#09090b" stroke="#10b981" strokeWidth="1.5" className="node-circle" />
          <circle r="32" fill="transparent" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="1" className="node-outer" />
          <path d="M-3 -5 L4 0 L-3 5 Z" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round" />
          <text x="0" y="50" fill="#fafafa" fontSize="12.5" fontWeight="600" textAnchor="middle">3. Run & Launch</text>
          <text x="0" y="66" fill="#a1a1aa" fontSize="10.5" textAnchor="middle">Diagnostics app start</text>
        </g>
      </svg>
    </div>
  )
}

export function DocsPage() {
  const releaseContent = useLatestReleaseContent()

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="eyebrow">Docs</p>
        <h1>Install Shell without guessing.</h1>
        <p>
          Start with the Windows setup EXE when possible. macOS and Linux are
          source/helper launch paths with partial desktop-control support.
        </p>
      </section>

      <section className="docs-timeline-section">
        <div className="section-heading">
          <p className="eyebrow">Setup Lifecycle</p>
          <h2>Getting started visual timeline</h2>
        </div>
        <DocsLifecycleTimeline />
      </section>

      <section className="docs-grid">
        {docsSteps.map((step) => {
          const Icon = step.icon
          return (
            <article key={step.title} id={step.id} className="doc-card">
              <Icon className="doc-card-icon" />
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
              {step.id === 'windows-install' ? (
                <div className="windows-installer-guide">
                  <div className="windows-guide-step">
                    <span className="step-num">1</span>
                    <span>
                      Download the latest setup EXE:
                      <a
                        href={releaseContent.disabled ? '#download' : releaseContent.href}
                        className="guide-download-btn"
                        target={releaseContent.disabled ? undefined : '_blank'}
                        rel={releaseContent.disabled ? undefined : 'noreferrer'}
                      >
                        <Download size={13} />
                        <span>
                          {releaseContent.status === 'loading'
                            ? 'Checking...'
                            : releaseContent.assetFound
                              ? `Download (${releaseContent.version})`
                              : 'Get Latest Build'}
                        </span>
                      </a>
                    </span>
                  </div>
                  <div className="windows-guide-step">
                    <span className="step-num">2</span>
                    <span>Run the installer on your PC (accept prompt)</span>
                  </div>
                  <div className="windows-guide-step">
                    <span className="step-num">3</span>
                    <span>Open <strong>ShellAI.exe</strong> from shortcut</span>
                  </div>
                </div>
              ) : (
                <TerminalMockup command={step.command} />
              )}
            </article>
          )
        })}
      </section>

      <section className="install-notes">
        <div>
          <h2>Safety reminders</h2>
          <p>
            Keep API keys local, never publish `.env`, and treat Telegram/remote
            PC control as opt-in. Shell should show clear missing-key and
            readiness diagnostics instead of fake success states.
          </p>
        </div>
        <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="primary-action">
          Open source repository
        </a>
      </section>

      <section className="docs-legal-section" aria-label="Legal documents">
        <div className="section-heading align-left">
          <p className="eyebrow">Legal</p>
          <h2>Privacy and terms before public use.</h2>
          <p>
            Keep the download flow transparent with clear policy pages for data,
            third-party services, releases, and responsible automation.
          </p>
        </div>

        <div className="legal-link-grid">
          <Link to="/privacy" className="legal-link-card">
            <ShieldCheck />
            <span>Privacy Policy</span>
            <strong>How site data, local app data, and third-party services are handled.</strong>
            <ArrowRight />
          </Link>
          <Link to="/terms" className="legal-link-card">
            <FileText />
            <span>Terms & Conditions</span>
            <strong>Open-source use, release downloads, support limits, and user responsibility.</strong>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  )
}
