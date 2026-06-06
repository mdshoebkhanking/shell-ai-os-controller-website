import { ArrowRight, FileText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { docsSteps, githubRepoUrl } from '../data'

export function DocsPage() {
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

      <section className="docs-grid">
        {docsSteps.map((step) => {
          const Icon = step.icon
          return (
            <article key={step.title} id={step.id} className="doc-card">
              <Icon />
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
              <code>{step.command}</code>
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
