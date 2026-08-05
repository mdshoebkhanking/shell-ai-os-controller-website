import { ExternalLink, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { githubRepoUrl, publicAsset } from '../data'

const navItems = [
  { label: 'Download', href: '/#download' },
  { label: 'Story', href: '/#story' },
  { label: 'Features', href: '/features' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Safety', href: '/#safety' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Docs', href: '/docs' }
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.slice(1)
    }

    return location.pathname === href
  }

  return (
    <header className="site-nav-shell" data-open={open}>
      <nav className="site-nav">
        {/* Left: Brand Logo */}
        <Link to="/" className="brand-link" aria-label="Shell AI homepage">
          <img src={publicAsset('/media/brand/shell-official-logo.png')} alt="Shell AI logo" className="brand-mark" />
          <span>Shell AI</span>
        </Link>

        {/* Center: Desktop Navigation links */}
        <div className="nav-center-links">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={isActive(item.href) ? 'is-active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="nav-right-actions">
          <a className="nav-github" href={githubRepoUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={14} />
            <span>GitHub</span>
          </a>
          
          <button
            className="nav-menu-button"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="nav-mobile-dropdown">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={isActive(item.href) ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a className="nav-github-mobile" href={githubRepoUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              <ExternalLink size={14} />
              <span>GitHub</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
