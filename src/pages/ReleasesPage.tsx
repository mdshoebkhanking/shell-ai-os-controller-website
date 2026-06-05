import { ReleaseDownloadCard } from '../components/ReleaseDownloadCard'

export function ReleasesPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="eyebrow">Releases</p>
        <h1>Latest Windows build, resolved from GitHub.</h1>
        <p>
          The download card reads the latest release and picks the Windows setup
          asset automatically. If the API is unavailable, it falls back to the
          GitHub Releases page.
        </p>
      </section>
      <ReleaseDownloadCard />
    </main>
  )
}

