import { Download, ExternalLink, RefreshCcw, ShieldCheck } from 'lucide-react'
import { useLatestReleaseContent } from '../release'

const formatDigest = (digest: string) => {
  if (!digest || digest === 'Not available' || digest === 'Not provided by the GitHub API') {
    return 'Not provided'
  }

  return digest.length > 32 ? `${digest.slice(0, 20)}...${digest.slice(-10)}` : digest
}

export function ReleaseDownloadCard() {
  const content = useLatestReleaseContent()
  const ctaLabel = content.assetFound
    ? `Download ${content.version} for Windows`
    : content.status === 'loading'
      ? 'Resolving latest installer'
      : 'Open GitHub Releases'
  const sourceLabel = content.assetFound ? 'Direct EXE asset' : 'GitHub fallback'
  const downloadHref = content.disabled ? content.htmlUrl : content.href

  return (
    <section id="download" className="release-section">
      <div className="section-heading">
        <p className="eyebrow">Windows Installer</p>
        <h2>Download Shell AI for Windows.</h2>
        <p>
          Get the latest setup EXE from GitHub Releases. The site checks the
          newest release automatically, so new builds appear here when they ship.
        </p>
      </div>

      <div className="release-card">
        <div className="release-top">
          <div className="release-icon">
            {content.status === 'loading' ? <RefreshCcw className="spin" /> : <ShieldCheck />}
          </div>
          <div className="release-title">
            <span>Latest Windows installer</span>
            <strong>{content.version}</strong>
          </div>
          <a href={content.htmlUrl} target="_blank" rel="noreferrer" className="release-source">
            GitHub Releases
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="release-body">
          <div className="release-primary">
            <span>{sourceLabel}</span>
            <h3>Windows setup EXE</h3>
            <p>Installer-first download path for the best supported Shell AI desktop experience.</p>
            <a
              className={content.disabled ? 'download-button is-disabled' : 'download-button'}
              href={downloadHref}
              aria-disabled={content.disabled}
            >
              <Download size={18} />
              {ctaLabel}
            </a>
          </div>

          <div className="release-meta-panel" aria-label="Latest release details">
            <div className="release-detail">
              <span>Version</span>
              <strong>{content.version}</strong>
            </div>
            <div className="release-detail">
              <span>Size</span>
              <strong>{content.size}</strong>
            </div>
            <div className="release-detail">
              <span>Published</span>
              <strong>{content.published}</strong>
            </div>
            <div className="release-detail checksum">
              <span>Checksum</span>
              <strong title={content.digest}>{formatDigest(content.digest)}</strong>
            </div>
          </div>
        </div>

        <div className="release-asset-line" title={content.assetName}>
          <span>Asset</span>
          <strong>{content.assetName}</strong>
        </div>
      </div>
    </section>
  )
}
