import { useEffect, useMemo, useState } from 'react'
import { latestReleaseApi, releasesUrl } from './data'

export type ReleaseAsset = {
  name: string
  size: number
  browser_download_url: string
  digest?: string
}

export type ReleasePayload = {
  tag_name: string
  html_url: string
  published_at: string
  assets: ReleaseAsset[]
}

type ReleaseState =
  | { status: 'loading' }
  | { status: 'ready'; release: ReleasePayload; asset?: ReleaseAsset }
  | { status: 'error'; message: string }

export type ReleaseContent = {
  status: ReleaseState['status']
  version: string
  assetName: string
  size: string
  published: string
  digest: string
  href: string
  htmlUrl: string
  disabled: boolean
  assetFound: boolean
}

const setupAssetPattern = /^shell-ai-os-controller-setup-.*\.exe$/i
const windowsExePattern = /\.exe$/i
const releaseRefreshIntervalMs = 5 * 60 * 1000
const releaseCacheTtlMs = 60 * 1000

let cachedRelease:
  | {
      release: ReleasePayload
      fetchedAt: number
    }
  | undefined
let pendingRelease: Promise<ReleasePayload> | undefined

const findWindowsAsset = (assets: ReleaseAsset[] = []) =>
  assets.find((item) => setupAssetPattern.test(item.name)) ??
  assets.find((item) => windowsExePattern.test(item.name) && /setup|installer|install/i.test(item.name)) ??
  assets.find((item) => windowsExePattern.test(item.name) && /shell/i.test(item.name))

const formatBytes = (size: number) => {
  if (!Number.isFinite(size) || size <= 0) return 'Unknown size'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = size
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

const formatDate = (value: string) => {
  if (!value) return 'Unknown date'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value))
}

const fetchLatestRelease = async () => {
  const now = Date.now()

  if (cachedRelease && now - cachedRelease.fetchedAt < releaseCacheTtlMs) {
    return cachedRelease.release
  }

  if (pendingRelease) return pendingRelease

  pendingRelease = fetch(latestReleaseApi, {
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json'
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`GitHub returned HTTP ${response.status}`)
      }

      return (await response.json()) as ReleasePayload
    })
    .then((release) => {
      cachedRelease = {
        release,
        fetchedAt: Date.now()
      }

      return release
    })
    .finally(() => {
      pendingRelease = undefined
    })

  return pendingRelease
}

export function useLatestReleaseContent(): ReleaseContent {
  const [state, setState] = useState<ReleaseState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    const fetchRelease = async (showLoading = false) => {
      if (showLoading) setState({ status: 'loading' })

      try {
        const release = await fetchLatestRelease()
        const asset = findWindowsAsset(release.assets)

        if (!cancelled) setState({ status: 'ready', release, asset })
      } catch (error) {
        if (!cancelled) setState({ status: 'error', message: String(error) })
      }
    }

    void fetchRelease(true)
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') void fetchRelease()
    }, releaseRefreshIntervalMs)

    const refreshVisibleTab = () => {
      if (document.visibilityState === 'visible') void fetchRelease()
    }

    document.addEventListener('visibilitychange', refreshVisibleTab)

    return () => {
      cancelled = true
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', refreshVisibleTab)
    }
  }, [])

  return useMemo(() => {
    if (state.status === 'loading') {
      return {
        status: state.status,
        version: 'Checking latest release...',
        assetName: 'shell-ai-os-controller-setup-*.exe',
        size: 'Fetching from GitHub',
        published: 'Live release API',
        digest: 'Digest appears here when GitHub provides it',
        href: releasesUrl,
        htmlUrl: releasesUrl,
        disabled: true,
        assetFound: false
      }
    }

    if (state.status === 'error') {
      return {
        status: state.status,
        version: 'Release API unavailable',
        assetName: 'Fallback to GitHub Releases',
        size: state.message,
        published: 'Use the fallback link',
        digest: 'Not available',
        href: releasesUrl,
        htmlUrl: releasesUrl,
        disabled: false,
        assetFound: false
      }
    }

    return {
      status: state.status,
      version: state.release.tag_name || 'Latest release',
      assetName: state.asset?.name ?? 'Windows setup asset not found',
      size: state.asset ? formatBytes(state.asset.size) : 'Open GitHub Releases',
      published: formatDate(state.release.published_at),
      digest: state.asset?.digest ?? 'Not provided by the GitHub API',
      href: state.asset?.browser_download_url ?? state.release.html_url ?? releasesUrl,
      htmlUrl: state.release.html_url ?? releasesUrl,
      disabled: false,
      assetFound: Boolean(state.asset)
    }
  }, [state])
}
