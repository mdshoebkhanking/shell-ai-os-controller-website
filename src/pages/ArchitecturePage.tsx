import { Activity, Brain, Cpu, ShieldAlert, Network, Terminal, ShieldCheck, Database, Files, ArrowRight } from 'lucide-react'
import { useState, useEffect, type CSSProperties } from 'react'

const layers = [
  {
    title: 'Input',
    copy: 'React Web UI, voice, Telegram, CLI',
    Icon: Terminal,
    desc: 'Requests enter the control surface with source context from local or remote integrations.',
    color: '#eab308', // Amber/Yellow
    glow: 'rgba(234, 179, 8, 0.15)',
    id: '01'
  },
  {
    title: 'Bridge',
    copy: 'QWebChannel, Shell Hub, classic runtime',
    Icon: Network,
    desc: 'Normalizes and routes intent safely through the UI-native desktop bridge channels.',
    color: '#f99539', // Orange
    glow: 'rgba(249, 149, 57, 0.15)',
    id: '02'
  },
  {
    title: 'Reasoning',
    copy: 'Natural-language router and agent orchestrator',
    Icon: Brain,
    desc: 'Analyzes user prompts, matches available tools, and builds structured execution parameters.',
    color: '#10b981', // Emerald
    glow: 'rgba(16, 185, 129, 0.15)',
    id: '03'
  },
  {
    title: 'Gate',
    copy: 'Tool gateway and SAFE / ASK / BLOCK policy',
    Icon: ShieldAlert,
    desc: 'Checks risk thresholds, parameter safety, and runs allowlist audits before starting execution.',
    color: '#06b6d4', // Cyan
    glow: 'rgba(6, 182, 212, 0.15)',
    id: '04'
  },
  {
    title: 'Execution',
    copy: 'Local tools, APIs, desktop automation, browser wrappers',
    Icon: Cpu,
    desc: 'Runs validated scripts, manages system APIs, and drives terminal or browser actions.',
    color: '#3b82f6', // Blue
    glow: 'rgba(59, 130, 246, 0.15)',
    id: '05'
  },
  {
    title: 'Result',
    copy: 'Structured response, UI events, logs, memory, traces',
    Icon: Activity,
    desc: 'Returns system output, writes telemetry traces, updates SQLite memory, and logs metrics.',
    color: '#a855f7', // Purple/Violet
    glow: 'rgba(168, 85, 247, 0.15)',
    id: '06'
  }
]

const routingStages = [
  {
    id: '01',
    phase: 'Intent',
    title: 'Input surfaces',
    desc: 'Chat, voice, Telegram, or CLI request enters the control surface with source context.',
    Icon: Terminal,
    points: ['Voice Pipeline', 'Workspace state', 'Context frame']
  },
  {
    id: '02',
    phase: 'Route',
    title: 'Router + bridge',
    desc: 'Shell normalizes context, then routes intent through the UI bridge and natural-language router.',
    Icon: Network,
    points: ['QWebChannel', 'Shell Hub API', 'NL Normalization']
  },
  {
    id: '03',
    phase: 'Gate',
    title: 'Tool gateway',
    desc: 'Parameters, ownership, risk level, dry-run expectations, and safety policy are checked first.',
    Icon: ShieldAlert,
    points: ['Risk levels', 'SAFE / ASK / BLOCK', 'Audit logger']
  },
  {
    id: '04',
    phase: 'Result',
    title: 'Result + trace',
    desc: 'Shell returns output, logs, diagnostics, and optional memory updates after controlled execution.',
    Icon: Activity,
    points: ['Structured Output', 'SQLite memory update', 'GPU & CPU usage metrics']
  }
]

export function ArchitecturePage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % layers.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const handleNodeClick = (index: number) => {
    setIsAutoPlay(false)
    setActiveStepIndex(index)
  }

  const activeLayer = layers[activeStepIndex]
  const ActiveIcon = activeLayer.Icon

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="eyebrow">Architecture & Flow</p>
        <h1>The control layer is explicit by design.</h1>
        <p>
          Shell AI OS Controller routes work through a secure, multi-stage runtime lifecycle.
          The execution path is inspectable, auditable, and human-controlled.
        </p>
      </section>

      {/* CIRCULAR REQUEST LIFECYCLE (Interactive Napkin-sketch visualizer) */}
      <section className="lifecycle-section">
        <div className="section-heading">
          <p className="eyebrow">Shell Pipeline</p>
          <h2>6-Step Request Lifecycle</h2>
          <p>
            Trace how a user request flows from input to reasoning, security gating, execution, and local database feedback.
          </p>
        </div>

        <div className="lifecycle-visualizer-container">
          {/* Decorative database badge (Top-Left) */}
          <div className="floating-badge badge-red float-left-top">
            <Database size={24} />
            <span>SQLite Local DB</span>
          </div>

          {/* Decorative documents folder badge (Bottom-Right) */}
          <div className="floating-badge badge-green float-right-bottom">
            <Files size={24} />
            <span>Trace Logs</span>
          </div>

          <div className="circular-visualizer-wrap">
            {/* Pulsing glow background */}
            <div className="center-glow-ambient" style={{ background: activeLayer.glow } as CSSProperties} />

            {/* The outer circular ring */}
            <div className="circular-ring" />

            {layers.map((layer, index) => {
              const NodeIcon = layer.Icon
              const angle = index * 60 - 90
              const radius = 175 // radius in px
              const x = Math.round(radius * Math.cos((angle * Math.PI) / 180))
              const y = Math.round(radius * Math.sin((angle * Math.PI) / 180))
              const isActive = index === activeStepIndex

              return (
                <button
                  key={layer.title}
                  className={`circular-node ${isActive ? 'active' : ''}`}
                  style={{
                    '--node-color': layer.color,
                    '--node-glow': layer.glow,
                    '--x': `${x}px`,
                    '--y': `${y}px`
                  } as CSSProperties}
                  onClick={() => handleNodeClick(index)}
                  onMouseEnter={() => setIsAutoPlay(false)}
                  onMouseLeave={() => setIsAutoPlay(true)}
                  aria-label={`Select step ${layer.id}: ${layer.title}`}
                >
                  <span className="node-num">{layer.id}</span>
                  <div className="node-icon-frame">
                    <NodeIcon size={20} />
                  </div>
                  <span className="node-label">{layer.title}</span>
                </button>
              )
            })}

            {/* Central hub showing details of active node */}
            <article
              className="center-hub-card"
              style={{
                borderColor: `rgba(${parseInt(activeLayer.color.slice(1, 3), 16) || 6}, ${parseInt(activeLayer.color.slice(3, 5), 16) || 182}, ${parseInt(activeLayer.color.slice(5, 7), 16) || 212}, 0.25)`
              } as CSSProperties}
            >
              <div className="hub-header">
                <span className="hub-id" style={{ color: activeLayer.color }}>Stage {activeLayer.id}</span>
                <h3 className="hub-title">{activeLayer.title}</h3>
              </div>
              <p className="hub-desc">{activeLayer.desc}</p>
              <div className="hub-meta">
                <span className="meta-label">COMPONENTS / STACK</span>
                <p className="meta-copy">{activeLayer.copy}</p>
              </div>

              <div className="hub-icon-backdrop" style={{ color: activeLayer.color }}>
                <ActiveIcon size={96} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* EXPLICIT CONTROL LAYERS (Animated SVG Diagram Section) */}
      <section className="explicit-layers-section">
        <div className="section-heading">
          <p className="eyebrow">Visual Flowchart</p>
          <h2>Explicit Control Layers Map</h2>
          <p>
            Review the structural architecture of the secure sandbox. Intents are normalized and filtered through policy gates.
          </p>
        </div>

        <div className="explicit-layers-layout">
          <div className="stages-detail-list">
            {routingStages.map((stage) => {
              const Icon = stage.Icon
              return (
                <article key={stage.id} className="stage-detail-card">
                  <div className="stage-card-icon-frame">
                    <Icon size={18} />
                  </div>
                  <div className="stage-card-content">
                    <span className="stage-card-phase">Phase {stage.id} — {stage.phase}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.desc}</p>
                    <div className="stage-card-pills">
                      {stage.points.map((pt) => (
                        <span key={pt} className="stage-pill">{pt}</span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="explicit-svg-visual-card">
            {/* The user-provided SVG diagram fully converted and styled */}
            <svg
              className="explicit-control-svg"
              viewBox="0 0 804 696"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radial gradients for glowing flow lines */}
                <linearGradient id="orbit-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe60a" />
                  <stop offset="50%" stopColor="#f99539" />
                  <stop offset="100%" stopColor="#fd6a65" />
                </linearGradient>
                <linearGradient id="orbit-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fd6a65" />
                  <stop offset="50%" stopColor="#44e095" />
                  <stop offset="100%" stopColor="#4f92ff" />
                </linearGradient>
              </defs>

              <g id="items" style={{ isolation: 'isolate' }}>
                <g id="blend" style={{ mixBlendMode: 'normal' }}>
                  {/* Orbits / Capsules curves */}
                  <g id="g-root-cp_-1_common_18hkapydokhs8-stroke" transform="translate(350, 116)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="url(#orbit-gradient-1)" strokeWidth="2.5" className="animate-svg-orbit-flow-1">
                      <path d="M 65.766602 508C 80.754799 508 106 396.518951 106 259C 106 121.481171 80.754799 10 65.766602 10C 80.7752 10.013003 92.941704 121.819679 92.941704 259C 92.941704 396.180328 80.7752 507.987 65.766602 508Z"></path>
                    </g>
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="url(#orbit-gradient-2)" strokeWidth="2.5" className="animate-svg-orbit-flow-2">
                      <path d="M 65.765896 508C 80.774597 507.987 92.941093 396.180328 92.941093 259C 92.941093 121.819679 80.774597 10.013003 65.765896 10L 51.957397 10C 66.060696 18.932598 77.199295 127.330734 77.199295 259C 77.199295 390.669403 65.382599 499.067383 51.279297 508L 65.765896 508Z"></path>
                    </g>
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="var(--site-cyan)" strokeWidth="2" strokeOpacity="0.8" className="animate-svg-orbit-static">
                      <path d="M 77.199997 259C 77.199997 390.669403 65.383301 499.067383 51.279999 508L 50.061501 508C 35.0734 508 10 396.518951 10 259C 10 121.481171 35.0734 10 50.061501 10C 50.6991 10 51.958099 10 51.958099 10C 66.061401 18.932598 77.199997 127.330734 77.199997 259Z"></path>
                    </g>
                  </g>

                  {/* Connectors / Node lines */}
                  <g id="g-root-he_4jt8p2dokjd6-stroke" transform="translate(266, 170)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2">
                      <path d="M 10 10L 124 10C 130.627421 10 136.000004 15.372583 136.000004 22L 136 157C 136.000004 163.627422 141.372587 169.000005 148.000004 169.000005L 262 169" strokeDasharray="5 5"></path>
                    </g>
                  </g>
                  <g id="g-root-he_3zqkmdokk5g-stroke" transform="translate(266, 284)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2">
                      <path d="M 10 10L 119 10C 125.627421 10 131.000004 15.372583 131.000004 22L 131 67C 131.000003 73.627419 136.372587 79.000002 143.000004 79.000002L 252 79" strokeDasharray="5 5"></path>
                    </g>
                  </g>
                  <g id="g-root-he_1qa39dydokhla-stroke" transform="translate(266, 377)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2">
                      <path d="M 10 31L 120.5 31C 126.298992 31 131.000002 26.29899 131.000002 20.5L 131 20.5C 131.000002 14.70101 135.701012 10 141.500002 10L 252 10" strokeDasharray="5 5"></path>
                    </g>
                  </g>
                  <g id="g-root-he_1lu9r9idokidk-stroke" transform="translate(266, 401)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2">
                      <path d="M 10 121L 124 121C 130.627421 121.000004 136.000004 115.62742 136.000004 109.000003L 136 22C 136.000004 15.372583 141.372587 10 148.000004 10L 262 10" strokeDasharray="5 5"></path>
                    </g>
                  </g>

                  {/* Title node */}
                  <g transform="translate(402, 63)">
                    <text fill="#ffffff" fillOpacity="0.9" style={{ font: 'bold 25px Roboto, sans-serif' }} textAnchor="middle">
                      <tspan x="0" y="15">Explicit Control Layers</tspan>
                    </text>
                  </g>

                  {/* Intent Node */}
                  <g transform="translate(204, 162)">
                    <text fill="#ffe60a" style={{ font: 'bold 20px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="0">Intent</tspan>
                    </text>
                  </g>
                  <g transform="translate(206, 146)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="#ffe60a" strokeWidth="2">
                      <path d="M 12 57C 11.874946 53.780693 13.099022 50.655247 15.377134 48.377136C 17.655245 46.099022 20.780693 44.874947 24 45C 27.219309 44.874947 30.344755 46.099022 32.622868 48.377136C 34.900978 50.655247 36.125053 53.780693 36 57ZM 16 34C 16 38.418278 19.581722 42 24 42C 28.418278 42 32 38.418278 32 34C 32 29.581722 28.418278 26 24 26C 19.581722 26 16 29.581722 16 34M 32 32.68C 30.569401 33.576534 28.90794 34.035347 27.219999 34C 23.398668 34.009598 19.918804 31.801521 18.299999 28.34M 46.439999 37L 43.560001 37M 48 33L 42 33M 45 11L 45 13M 33.599998 23L 36 23M 56 23L 54 23M 35 14L 37 16M 55 14L 53 16M 51 22C 50.905949 18.726038 48.27396 16.094048 44.999996 16C 41.726036 16.094048 39.094048 18.726038 39 22C 39.044998 24.080042 40.185844 25.981453 42 27L 42 28C 42 28.552284 42.447716 29 43 29L 47 29C 47.552284 29 48 28.552284 48 28L 48 27C 49.814156 25.981453 50.955002 24.080042 51 22ZM 24 49L 24 51"></path>
                    </g>
                  </g>
                  <g transform="translate(204, 213)">
                    <text fill="rgba(255,255,255,0.7)" style={{ font: '13px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="-9">User requests with</tspan>
                      <tspan x="0" y="9">source context enter</tspan>
                      <tspan x="0" y="27">the control surface.</tspan>
                    </text>
                  </g>

                  {/* Route Node */}
                  <g transform="translate(204, 276)">
                    <text fill="#f99539" style={{ font: 'bold 20px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="0">Route</tspan>
                    </text>
                  </g>
                  <g transform="translate(206, 260)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="#f99539" strokeWidth="2">
                      <path d="M 11 51C 11 54.313709 13.686292 57 17 57C 20.313709 57 23 54.313709 23 51C 23 47.686295 20.313709 45 17 45C 13.686292 45 11 47.686295 11 51M 45 17C 45 20.313709 47.686295 23 51 23C 54.313709 23 57 20.313709 57 17C 57 13.686292 54.313709 11 51 11C 47.686295 11 45 13.686292 45 17M 17 45L 17 36.09C 17.001104 34.960808 17.916805 34.045998 19.046001 34.046001L 48.953999 34.045998C 50.083977 34.046001 51 33.129974 51 32L 51 23.271999"></path>
                    </g>
                  </g>
                  <g transform="translate(204, 327)">
                    <text fill="rgba(255,255,255,0.7)" style={{ font: '13px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="-9">Intent is normalized</tspan>
                      <tspan x="0" y="9">and routed through UI</tspan>
                      <tspan x="0" y="27">and natural language.</tspan>
                    </text>
                  </g>

                  {/* Gate Node */}
                  <g transform="translate(204, 390)">
                    <text fill="#fd6a65" style={{ font: 'bold 20px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="0">Gate</tspan>
                    </text>
                  </g>
                  <g transform="translate(206, 374)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="#fd6a65" strokeWidth="2">
                      <path d="M 23.998001 49L 23.998001 57M 23.998001 13.142L 23.998001 27M 31.997999 11L 31.997999 27M 39.998001 13.142L 39.998001 27M 32.001999 31L 31.997999 45M 39.998001 31L 40.001999 45M 32.001999 49L 31.997999 57M 39.998001 49L 40.001999 57M 16 27C 16 18.163445 23.163445 11 32 11C 40.836555 11 48 18.163445 48 27L 48 56C 48 56.552284 47.552284 57 47 57L 17 57C 16.447716 57 16 56.552284 16 56ZM 19.998001 38C 19.998001 39.656853 21.341146 41 22.998001 41C 24.654854 41 25.998001 39.656853 25.998001 38C 25.998001 36.343147 24.654854 35 22.998001 35C 21.341146 35 19.998001 36.343147 19.998001 38ZM 15.998 27L 48.001999 27M 48.001999 31L 15.998 31M 15.998 45L 48.001999 45M 48.001999 49L 15.998 49M 48 27.094C 48 25.989429 48.895432 25.094 50 25.094C 51.104568 25.094 52 25.989429 52 27.094L 52 33.094002C 52 34.19857 51.104568 35.094002 50 35.094002C 48.895432 35.094002 48 34.19857 48 33.094002M 48 44C 48 42.895432 48.895432 42 50 42C 51.104568 42 52 42.895432 52 44L 52 50C 52 51.104568 51.104568 52 50 52C 48.895432 52 48 51.104568 48 50"></path>
                    </g>
                  </g>
                  <g transform="translate(204, 441)">
                    <text fill="rgba(255,255,255,0.7)" style={{ font: '13px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="-9">Parameters and</tspan>
                      <tspan x="0" y="9">policies are checked</tspan>
                      <tspan x="0" y="27">before tool execution.</tspan>
                    </text>
                  </g>

                  {/* Result Node */}
                  <g transform="translate(204, 504)">
                    <text fill="#44e095" style={{ font: 'bold 20px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="0">Result</tspan>
                    </text>
                  </g>
                  <g transform="translate(206, 488)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="#44e095" strokeWidth="2">
                      <path d="M 57 36C 57 35.447716 56.552284 35 56 35L 12 35C 11.447716 35 11 35.447716 11 36L 11 53C 11 55.209141 12.790861 57 15 57L 53 57C 55.209141 57 57 55.209141 57 53ZM 11 39L 29 39C 29.552284 39 30 39.447716 30 40L 30 41C 30 43.209141 31.790861 45 34 45L 34 45C 36.209137 45 38 43.209141 38 41L 38 40C 38 39.447716 38.447716 39 39 39L 57 39M 34.007999 39L 34.007999 41M 53 35C 53 30.040001 49.130001 28.856001 44 29C 42.987999 24.514 38.790001 23 34 23C 29.209999 23 25.012001 24.514 24 29C 18.866001 28.856001 15 30.040001 15 35M 11.008 25L 13.007999 25M 19.007999 14L 21.007999 16M 57.007999 25L 55.007999 25M 49.007999 14L 47.007999 16M 34.007999 11L 34.007999 14M 23.007999 39L 23.007999 57M 45.007999 39L 45.007999 57"></path>
                    </g>
                  </g>
                  <g transform="translate(204, 564)">
                    <text fill="rgba(255,255,255,0.7)" style={{ font: '13px Roboto, sans-serif' }} textAnchor="end">
                      <tspan x="0" y="-18">Output, logs, and</tspan>
                      <tspan x="0" y="0">memory updates are</tspan>
                      <tspan x="0" y="18">returned after execution.</tspan>
                    </text>
                  </g>

                  {/* Processing Subtitle Label */}
                  <g transform="translate(590, 287)">
                    <text fill="#4f92ff" style={{ font: 'bold 20px Roboto, sans-serif' }}>
                      <tspan x="0" y="20">Controlled</tspan>
                      <tspan x="0" y="44">Request Processing</tspan>
                    </text>
                  </g>
                  <g transform="translate(530, 341)">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" stroke="#4f92ff" strokeWidth="2">
                      <path d="M 54.608002 37.199402C 55.6036 36.999397 56.400002 36.199402 56.400002 35.199402L 56.400002 32.7994C 56.400002 31.7994 55.6036 30.999399 54.608002 30.7994L 51.8204 30.399401C 51.023998 30.1994 50.426601 29.799459 50.227402 28.99946L 49.032799 25.99946C 48.634602 25.39946 48.833599 24.399441 49.2318 23.79944L 51.0238 21.39942C 51.621201 20.599419 51.621201 19.399441 50.824799 18.79944L 49.032799 16.99946C 48.236198 16.199459 47.240799 16.19944 46.444199 16.79944L 44.054798 18.599419C 43.4576 18.99942 42.661201 19.19944 41.864601 18.79944C 40.868999 18.399441 39.8736 17.99942 38.877998 17.599421C 38.081398 17.39942 37.683201 16.799459 37.4842 15.99946L 37.0858 13.1994C 36.886803 12.1994 36.090202 11.399414 35.094601 11.399414L 32.705399 11.399414C 31.709801 11.399414 30.913401 12.1994 30.714199 13.1994L 30.316 15.99946C 30.1168 16.799459 29.718639 17.39942 28.92218 17.599421C 27.9266 17.99942 26.93104 18.399441 25.935459 18.79944C 25.33812 19.19944 24.34252 18.99942 23.74518 18.599419L 21.35578 16.79944C 20.55932 16.19944 19.364639 16.199459 18.7673 16.99946L 16.975281 18.79944C 16.17882 19.59944 16.178801 20.599419 16.776159 21.39942L 18.56818 23.79944C 18.9664 24.399441 19.165539 25.199459 18.7673 25.99946C 18.36908 26.99946 17.97084 27.99946 17.572599 28.99946C 17.37348 29.799459 16.776159 30.1994 15.9797 30.399401L 13.192039 30.7994C 12.19648 30.999399 11.400024 31.7994 11.400024 32.7994L 11.400024 35.199402C 11.400024 36.199402 12.19648 36.999397 13.192039 37.199402L 15.9797 37.5994C 16.776159 37.7994 17.37348 38.199402 17.572599 38.999397C 17.97084 39.999397 18.36908 40.999397 18.7673 41.999397C 19.165539 42.5994 18.9664 43.5994 18.56818 44.199402L 16.776159 46.5994C 16.178801 47.399399 16.17882 48.5994 16.975281 49.199402L 18.7673 50.999401C 19.563759 51.7994 20.55932 51.7994 21.35578 51.199402L 23.74518 49.399399C 24.34252 48.999401 25.139 48.7994 25.935459 49.199402C 26.93104 49.5994 27.9266 49.999401 28.92218 50.399399C 29.718639 50.5994 30.1168 51.199402 30.316 51.999401L 30.714199 54.7994C 30.913401 55.7994 31.709801 56.5994 32.705399 56.5994L 35.094601 56.5994C 36.090202 56.5994 36.886803 55.7994 37.0858 54.7994L 37.4842 51.999401C 37.683201 51.199402 38.081398 50.5994 38.877998 50.399399C 39.8736 49.999401 40.868999 49.5994 41.864601 49.199402C 42.462002 48.7994 43.4576 48.999401 44.054798 49.399399L 46.444199 51.199402C 47.240799 51.7994 48.435398 51.7994 49.032799 50.999401L 50.824799 49.199402C 51.621201 48.399399 51.621201 47.399399 51.0238 46.5994L 49.2318 44.199402C 48.833599 43.5994 48.634602 42.7994 49.032799 41.999397L 50.227402 38.999397C 50.426601 38.199402 51.023998 37.7994 51.8204 37.5994L 54.608002 37.199402ZM 26 27.4242L 26 33.624199C 26 37.624199 28.400021 41.224197 32.200001 42.624199L 33 43.0242C 33.599998 43.224201 34.200001 43.224201 34.799999 43.0242L 35.599998 42.624199C 39.400002 41.224197 41.799999 37.624199 41.799999 33.624199L 41.799999 27.4242C 41.799999 27.0242 41.599998 26.424179 41 26.22418C 39.799999 25.62418 37.200001 24.824219 33.799999 24.824219C 30.4 24.824219 27.800039 25.824181 26.60004 26.22418C 26.200041 26.424179 26 26.8242 26 27.4242ZM 33.900002 24.824219L 33.900002 43.173801"></path>
                      <path d="M54.6 37.2h-3C50.6 37.2 50 36.6 50 35.8v-3c0-.8.6-1.4 1.4-1.4h3c.8 0 1.4.6 1.4 1.4v3c0 .8-.6 1.4-1.4 1.4z" fill="#4f92ff"></path>
                    </g>
                  </g>
                  <g transform="translate(590, 371)">
                    <text fill="rgba(255,255,255,0.7)" style={{ font: '13px Roboto, sans-serif' }}>
                      <tspan x="0" y="20">Seamless and secure</tspan>
                      <tspan x="0" y="38">request handling</tspan>
                      <tspan x="0" y="56">through explicit</tspan>
                      <tspan x="0" y="74">control layers.</tspan>
                    </text>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* DETAILED LAYERS SECTION */}
      <section className="architecture-map">
        {layers.map((layer, index) => {
          const NodeIcon = layer.Icon
          return (
            <article key={layer.title} className="architecture-grid-card" style={{ '--card-color': layer.color } as CSSProperties}>
              <div className="grid-card-glow" />
              <div className="grid-card-header">
                <span className="grid-card-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="grid-card-icon" style={{ color: layer.color }}>
                  <NodeIcon size={24} />
                </div>
              </div>
              <h2>{layer.title}</h2>
              <p className="layer-copy-main">{layer.copy}</p>
              <p className="layer-copy-sub">{layer.desc}</p>
            </article>
          )
        })}
      </section>

      {/* CORE BOUNDARY SECTION */}
      <section className="architecture-note">
        <ShieldCheck className="safety-check-glow" />
        <div>
          <h2>Core Runtime Boundary</h2>
          <p>
            Shell AI OS Controller strictly respects host OS isolation. All actions stay within standard developer credentials and user session boundaries, running commands locally with transparent allowlists and structured parameter validation.
          </p>
        </div>
      </section>
    </main>
  )
}
