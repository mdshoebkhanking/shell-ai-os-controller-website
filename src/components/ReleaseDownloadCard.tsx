import { Download, ExternalLink, RefreshCcw, ShieldCheck } from 'lucide-react'
import { useLatestReleaseContent } from '../release'

export function ReleaseDownloadCard() {
  const content = useLatestReleaseContent()

  return (
    <section id="download" className="release-section">
      <div className="section-heading">
        <p className="eyebrow">Latest Release</p>
        <h2>Download the newest Windows setup EXE.</h2>
        <p>
          The card resolves the latest GitHub release at runtime and selects the
          `shell-ai-os-controller-setup-*.exe` asset when it exists.
        </p>
      </div>

      <div className="release-card">
        <div className="release-top">
          <div className="release-icon">
            {content.status === 'loading' ? <RefreshCcw className="spin" /> : <ShieldCheck />}
          </div>
          <div>
            <span>Version</span>
            <strong>{content.version}</strong>
          </div>
          <a href={content.htmlUrl} target="_blank" rel="noreferrer" className="release-source">
            GitHub Releases
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="release-grid">
          <div>
            <span>Asset</span>
            <strong>{content.assetName}</strong>
          </div>
          <div>
            <span>Size</span>
            <strong>{content.size}</strong>
          </div>
          <div>
            <span>Published</span>
            <strong>{content.published}</strong>
          </div>
          <div>
            <span>SHA256 / Digest</span>
            <strong>{content.digest}</strong>
          </div>
        </div>

        <a
          className={content.disabled ? 'download-button is-disabled' : 'download-button'}
          href={content.href}
          aria-disabled={content.disabled}
        >
          <Download size={18} />
          Download latest Windows EXE
        </a>
      </div>
    </section>
  )
}
