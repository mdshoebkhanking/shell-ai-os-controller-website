import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featureGroups } from '../data'

const featureTabs = [
  {
    id: 'all',
    label: 'All Features',
    copy: 'The complete Shell surface across chat, tools, desktop control, memory, safety, diagnostics, and integrations.'
  },
  {
    id: 'control',
    label: 'Desktop Control',
    copy: 'Workflows that connect Shell to applications, windows, browser wrappers, and Windows-first PC control.'
  },
  {
    id: 'automation',
    label: 'Tools & Automation',
    copy: 'Guarded tools, repeatable workflows, browser wrappers, and checkpointed automation paths.'
  },
  {
    id: 'memory',
    label: 'Memory & RAG',
    copy: 'Local context, project search, notes, recall audit, and codebase indexing for grounded work.'
  },
  {
    id: 'safety',
    label: 'Runtime & Safety',
    copy: 'Readiness, telemetry, diagnostics, traceability, sandboxing, and SAFE / ASK / BLOCK boundaries.'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    copy: 'Remote and media surfaces such as Telegram, email, gallery/media helpers, phone, and voice.'
  }
] as const

type FeatureTabId = (typeof featureTabs)[number]['id']

const featureCategoryByTitle: Record<string, Exclude<FeatureTabId, 'all'>> = {
  Chat: 'integrations',
  Voice: 'integrations',
  '460+ guarded tools': 'automation',
  'Desktop control': 'control',
  'Windows control': 'control',
  'Browser wrappers': 'automation',
  Telegram: 'integrations',
  'Email/media': 'integrations',
  'Runtime diagnostics': 'safety',
  Telemetry: 'safety',
  'ShellAI Core': 'control',
  'AI OS Fabric': 'control',
  'Memory v2': 'memory',
  'Project RAG v2': 'memory',
  'Secure sandbox': 'safety',
  'Workflow checkpoints': 'automation'
}

const featureStats = [
  ['16', 'documented modules'],
  ['460+', 'guarded tools'],
  ['3', 'safety states'],
  ['Windows', 'best experience']
]

export function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<FeatureTabId>('all')
  const activeTabData = featureTabs.find((tab) => tab.id === activeTab) ?? featureTabs[0]

  const filteredFeatures = useMemo(() => {
    if (activeTab === 'all') {
      return featureGroups
    }

    return featureGroups.filter((feature) => featureCategoryByTitle[feature.title] === activeTab)
  }, [activeTab])

  return (
    <main className="subpage feature-page">
      <section className="subpage-hero feature-page-hero">
        <p className="eyebrow">Features</p>
        <h1>Everything Shell can control, route, remember, and guard.</h1>
        <p>
          A dedicated feature index for the real Shell product surface, grouped
          by daily workflow area instead of crowding the homepage.
        </p>

        <div className="feature-page-stats" aria-label="Shell feature summary">
          {featureStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-browser" aria-label="Shell features">
        <div className="feature-tabs" role="tablist" aria-label="Feature categories">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'feature-tab is-active' : 'feature-tab'}
              aria-selected={activeTab === tab.id}
              role="tab"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="feature-browser-heading">
          <div>
            <p className="eyebrow">Active View</p>
            <h2>{activeTabData.label}</h2>
            <p>{activeTabData.copy}</p>
          </div>
          <Link to="/docs" className="secondary-action">
            Read install docs
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="feature-grid feature-page-grid">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon
            const category = featureTabs.find((tab) => tab.id === featureCategoryByTitle[feature.title])

            return (
              <article key={feature.title} className="feature-item feature-page-item">
                <Icon />
                <span className="feature-card-label">{category?.label ?? 'Feature'}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
