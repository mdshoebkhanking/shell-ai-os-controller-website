import { FileText, Scale, ShieldCheck } from 'lucide-react'
import { githubRepoUrl } from '../data'

const privacySections = [
  {
    title: 'What this site collects',
    copy: 'The public website is designed to be informational. It may receive ordinary browser request data such as IP address, user agent, referrer, and basic traffic metadata through hosting or GitHub release downloads.'
  },
  {
    title: 'What Shell may store locally',
    copy: 'Shell itself is intended to run local-first. Provider keys, workspace settings, logs, memory, diagnostics, and automation state should stay on the user machine unless the user explicitly connects a third-party service.'
  },
  {
    title: 'Third-party services',
    copy: 'Downloads are resolved from GitHub Releases. Optional AI providers, Telegram, email, browser tools, and OS automation integrations are controlled by the user and may be subject to their own privacy terms.'
  },
  {
    title: 'Security expectations',
    copy: 'Users should keep API keys private, avoid publishing logs with secrets, verify release assets from GitHub, and review what a tool will do before allowing automation.'
  }
]

const termsSections = [
  {
    title: 'Open-source software',
    copy: 'Shell AI OS Controller is provided as open-source software. Use of the source code and releases is governed by the repository license and any notices included with the project.'
  },
  {
    title: 'User responsibility',
    copy: 'Shell can connect AI prompts to local tools, files, browser workflows, and desktop automation. Users are responsible for reviewing commands, approvals, credentials, and any action that affects their system.'
  },
  {
    title: 'Downloads and releases',
    copy: 'The website may link to the latest GitHub release asset. Release availability, filenames, checksums, and installer behavior can change when a new version is published.'
  },
  {
    title: 'No guaranteed outcome',
    copy: 'Shell is provided without a guarantee that every tool, provider, platform, or automation path will work in every environment. Windows is the best-supported path; macOS and Linux support is partial.'
  }
]

function LegalShell({
  eyebrow,
  title,
  intro,
  type
}: {
  eyebrow: string
  title: string
  intro: string
  type: 'privacy' | 'terms'
}) {
  const sections = type === 'privacy' ? privacySections : termsSections
  const Icon = type === 'privacy' ? ShieldCheck : Scale

  return (
    <main id="main-content" className="subpage legal-page">
      <section className="subpage-hero legal-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="legal-meta-row">
          <span>Plain-English project policy</span>
          <span>Last updated June 5, 2026</span>
          <span>Open-source product site</span>
        </div>
      </section>

      <section className="legal-policy-panel">
        <div className="legal-policy-intro">
          <Icon />
          <div>
            <span>{type === 'privacy' ? 'Privacy baseline' : 'Terms baseline'}</span>
            <h2>{type === 'privacy' ? 'Clear expectations before download.' : 'Responsible use for a local AI control layer.'}</h2>
          </div>
        </div>

        <div className="legal-policy-grid">
          {sections.map((section) => (
            <article key={section.title} className="legal-policy-card">
              <FileText />
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-note">
        <div>
          <h2>Important note</h2>
          <p>
            This page is product-facing policy copy for the Shell AI website. It
            should be reviewed by a qualified legal professional before being
            used as the final legal policy for a public company or commercial
            deployment.
          </p>
        </div>
        <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="secondary-action github-action">
          Audit source on GitHub
        </a>
      </section>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacy Policy"
      title="Privacy-first expectations for Shell AI."
      intro="Shell is positioned as a local-first AI desktop control layer. This policy explains what the public site may collect, what the app should keep local, and where third-party services enter the workflow."
      type="privacy"
    />
  )
}

export function TermsPage() {
  return (
    <LegalShell
      eyebrow="Terms & Conditions"
      title="Terms for downloading and using Shell AI."
      intro="Shell connects AI to local workflows, tools, automation, and diagnostics. These terms set expectations for open-source use, release downloads, platform support, and user responsibility."
      type="terms"
    />
  )
}
