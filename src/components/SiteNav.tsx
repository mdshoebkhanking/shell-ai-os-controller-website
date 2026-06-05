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
        <Link to="/" className="brand-link" aria-label="Shell AI homepage">
          <img src={publicAsset('/media/brand/shell-official-logo.png')} alt="" className="brand-mark" />
          <span>Shell AI</span>
        </Link>

        <button
          className="nav-menu-button"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="nav-links">
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
          <a className="nav-github github-action" href={githubRepoUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}
