import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="subpage not-found-page">
      <section className="not-found-content">
        <p className="eyebrow">Lost signal</p>
        <h1 className="not-found-code" aria-label="Error 404">404</h1>
        <p className="not-found-copy">
          This route drifted outside the control layer. Let&rsquo;s get you back online.
        </p>
        <Link to="/" className="primary-action not-found-link">
          Return to home
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  )
}
