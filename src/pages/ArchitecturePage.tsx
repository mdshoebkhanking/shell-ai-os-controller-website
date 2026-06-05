import { ShieldCheck } from 'lucide-react'

const layers = [
  ['Input', 'React Web UI, voice, Telegram, CLI'],
  ['Bridge', 'QWebChannel, Shell Hub, classic runtime'],
  ['Reasoning', 'Natural-language router and agent orchestrator'],
  ['Gate', 'Tool gateway and SAFE / ASK / BLOCK policy'],
  ['Execution', 'Local tools, APIs, desktop automation, browser wrappers'],
  ['Result', 'Structured response, UI events, logs, memory, traces']
]

export function ArchitecturePage() {
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="eyebrow">Architecture</p>
        <h1>The control layer is explicit by design.</h1>
        <p>
          Shell is useful because the boundaries are visible: UI, router,
          gateway, safety policy, execution, logs, and memory.
        </p>
      </section>

      <section className="architecture-map">
        {layers.map(([title, copy], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="architecture-note">
        <ShieldCheck />
        <div>
          <h2>Core boundary</h2>
          <p>
            Shell does not bypass OS security. Dangerous actions should be
            blocked by default or require explicit opt-in, with preview,
            cancellation, and audit output where feasible.
          </p>
        </div>
      </section>
    </main>
  )
}

