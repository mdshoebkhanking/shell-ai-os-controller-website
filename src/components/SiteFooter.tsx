import { Link } from 'react-router-dom'
import { githubRepoUrl, publicAsset } from '../data'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={publicAsset('/media/brand/shell-official-logo.png')} alt="Shell AI logo" className="brand-mark-footer" />
            <span>Shell AI</span>
          </Link>
          <p className="footer-tagline">
            Secure, high-performance local control layer for agentic AI workflows.
          </p>
          <div className="footer-status">
            <span className="status-indicator" />
            <span>All systems operational</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/#download">Download</Link>
            <Link to="/#story">Story</Link>
            <Link to="/features">Features</Link>
            <Link to="/architecture">Architecture</Link>
            <a href={githubRepoUrl} target="_blank" rel="noreferrer">CLI Tool</a>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="/docs">Documentation</Link>
            <a href={githubRepoUrl} target="_blank" rel="noreferrer">GitHub Repository</a>
            <Link to="/releases">Release Notes</Link>
          </div>

          <div className="footer-column">
            <h4>Security & legal</h4>
            <Link to="/#safety">Safety Gate</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} Shell AI OS Controller. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
