import { useState, type CSSProperties } from 'react'
import { ArrowRight, TerminalSquare, Mic2, Hammer, AppWindow, MonitorCog, Globe, Bot, Mail, Activity, Radar, Cpu, Boxes, MemoryStick, Database, ShieldCheck, Workflow, Layers, Zap, Shield, Monitor } from 'lucide-react'
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

const featureStats = [
  { value: '16', label: 'documented modules', icon: Layers, color: '#10b981' },
  { value: '460+', label: 'guarded tools', icon: Zap, color: '#f59e0b' },
  { value: '3', label: 'safety states', icon: Shield, color: '#ef4444' },
  { value: 'Windows', label: 'best experience', icon: Monitor, color: '#3b82f6' }
]

// 1. Stacked Cylinders Visualizer Component (Image 1)
function MemoryVisualizer() {
  const [activeLayer, setActiveLayer] = useState<number>(0)
  
  const layers = [
    {
      title: 'Codebase RAG v2',
      color: '#10b981', // Emerald
      desc: 'Incremental codebase indexing with BM25/TF-IDF fallback and semantic vector search.',
      details: ['Semantic vectors', 'Incremental crawler', 'Token chunking']
    },
    {
      title: 'Project Workspace Context',
      color: '#f99539', // Orange
      desc: 'Aggregates active editor files, cursor offsets, build logs, and environment variables.',
      details: ['Active file state', 'Cursor location tracking', 'Diagnostics integration']
    },
    {
      title: 'SQLite Memory v2',
      color: '#eab308', // Amber
      desc: 'Local context log with tags, importance rating, semantic recall, and automatic old memory pruning.',
      details: ['Redaction hooks', 'Importance scoring', 'Migration support']
    }
  ]

  return (
    <div className="memory-visualizer-layout">
      {/* 3D Cylinders Stack Container */}
      <div className="cylinders-stack">
        <svg viewBox="0 0 300 380" className="cylinders-svg">
          {/* Top Layer Connection Path */}
          <path d="M 150 100 L 250 100" stroke={activeLayer === 0 ? '#10b981' : 'rgba(255,255,255,0.06)'} strokeWidth="2" strokeDasharray={activeLayer === 0 ? '4 4' : 'none'} className={activeLayer === 0 ? 'path-pulse' : ''} />
          {/* Mid Layer Connection Path */}
          <path d="M 150 190 L 250 190" stroke={activeLayer === 1 ? '#f99539' : 'rgba(255,255,255,0.06)'} strokeWidth="2" strokeDasharray={activeLayer === 1 ? '4 4' : 'none'} className={activeLayer === 1 ? 'path-pulse' : ''} />
          {/* Bottom Layer Connection Path */}
          <path d="M 150 280 L 250 280" stroke={activeLayer === 2 ? '#eab308' : 'rgba(255,255,255,0.06)'} strokeWidth="2" strokeDasharray={activeLayer === 2 ? '4 4' : 'none'} className={activeLayer === 2 ? 'path-pulse' : ''} />

          {/* Bottom Cylinder (Yellow) */}
          <g className={`cylinder-group ${activeLayer === 2 ? 'active' : ''}`} onClick={() => setActiveLayer(2)} style={{ '--node-glow': 'rgba(234,179,8,0.2)' } as CSSProperties}>
            <path d="M 70 250 L 70 300 A 80 25 0 0 0 230 300 L 230 250 Z" fill="url(#yellow-grad)" opacity={activeLayer === 2 ? 0.95 : 0.6} stroke="#eab308" strokeWidth="1.5" />
            <ellipse cx="150" cy="250" rx="80" ry="25" fill="#eab308" opacity={activeLayer === 2 ? 0.85 : 0.4} stroke="#eab308" strokeWidth="1.5" />
            <ellipse cx="150" cy="300" rx="80" ry="25" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.5} />
            <text x="150" y="280" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12" letterSpacing="0.05em">SQLITE MEMORY</text>
          </g>

          {/* Middle Cylinder (Orange) */}
          <g className={`cylinder-group ${activeLayer === 1 ? 'active' : ''}`} onClick={() => setActiveLayer(1)} style={{ '--node-glow': 'rgba(249,149,57,0.2)' } as CSSProperties}>
            <path d="M 70 160 L 70 210 A 80 25 0 0 0 230 210 L 230 160 Z" fill="url(#orange-grad)" opacity={activeLayer === 1 ? 0.95 : 0.6} stroke="#f99539" strokeWidth="1.5" />
            <ellipse cx="150" cy="160" rx="80" ry="25" fill="#f99539" opacity={activeLayer === 1 ? 0.85 : 0.4} stroke="#f99539" strokeWidth="1.5" />
            <ellipse cx="150" cy="210" rx="80" ry="25" fill="none" stroke="#f99539" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.5} />
            <text x="150" y="190" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12" letterSpacing="0.05em">WORKSPACE CONTEXT</text>
          </g>

          {/* Top Cylinder (Emerald Green) */}
          <g className={`cylinder-group ${activeLayer === 0 ? 'active' : ''}`} onClick={() => setActiveLayer(0)} style={{ '--node-glow': 'rgba(16,185,129,0.2)' } as CSSProperties}>
            <path d="M 70 70 L 70 120 A 80 25 0 0 0 230 120 L 230 70 Z" fill="url(#emerald-grad)" opacity={activeLayer === 0 ? 0.95 : 0.6} stroke="#10b981" strokeWidth="1.5" />
            <ellipse cx="150" cy="70" rx="80" ry="25" fill="#10b981" opacity={activeLayer === 0 ? 0.85 : 0.4} stroke="#10b981" strokeWidth="1.5" />
            <ellipse cx="150" cy="120" rx="80" ry="25" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.5} />
            <text x="150" y="100" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12" letterSpacing="0.05em">CODEBASE RAG</text>
          </g>

          <defs>
            <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="orange-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f99539" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="yellow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#713f12" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Corresponding Layer Cards on the Right */}
      <div className="memory-info-cards">
        {layers.map((layer, index) => {
          const isActive = index === activeLayer
          return (
            <div 
              key={layer.title}
              className={`memory-info-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveLayer(index)}
              style={{ '--accent-color': layer.color } as CSSProperties}
            >
              <h3>{layer.title}</h3>
              <p>{layer.desc}</p>
              <div className="card-pills">
                {layer.details.map((pill) => (
                  <span key={pill} className="card-pill">{pill}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 2. Desktop Control / Branching Pipes Visualizer Component (Image 2)
function ControlVisualizer() {
  const [activeBranch, setActiveBranch] = useState<number>(0)
  
  const branches = [
    {
      title: 'Browser Wrappers',
      color: '#f87171', // Red
      icon: Globe,
      desc: 'Controlled browser automation wrappers running actions behind safety audits.',
      details: ['Puppeteer/Playwright', 'Cookies isolation', 'Ask policies']
    },
    {
      title: 'Windows Control',
      color: '#f97316', // Orange
      icon: MonitorCog,
      desc: 'First-class PC integration using pywinauto and pywin32 bindings.',
      details: ['Windows 10/11 native', 'Desktop API hooks', 'Window hierarchy inspect']
    },
    {
      title: 'Desktop Control',
      color: '#4ade80', // Green
      icon: AppWindow,
      desc: 'Automates keyboard, clipboard, screen parsing, and mouse triggers.',
      details: ['PyAutoGUI bindings', 'System clipboard access', 'Image template matching']
    },
    {
      title: 'Python Tools',
      color: '#60a5fa', // Blue
      icon: TerminalSquare,
      desc: 'Gives the AI execution context in a clean, local Python process workspace.',
      details: ['Virtualenvs isolation', 'Standard library access', 'Custom scripts execution']
    },
    {
      title: 'Telegram Bot',
      color: '#c084fc', // Purple
      icon: Bot,
      desc: 'Secure remote command bot utilizing custom allowlists and start/stop controls.',
      details: ['Polled updates', 'Media transfer', 'Admin notification flags']
    },
    {
      title: 'Email/Media Utilities',
      color: '#a3e635', // Lime
      icon: Mail,
      desc: 'SMTP helpers, QR encoders, PDF generators, and OCR extraction tools.',
      details: ['Tesseract OCR hooks', 'SMTP mail queue', 'Image file pipelines']
    }
  ]

  const ActiveBranchIcon = branches[activeBranch].icon

  return (
    <div className="control-visualizer-layout">
      {/* SVG Branches Diagram on Left */}
      <div className="control-diagram-container">
        <svg viewBox="0 0 500 420" className="control-branches-svg">
          {/* Connecting Trunk lines */}
          <path d="M 250 380 L 250 180" stroke="#f87171" strokeWidth="2.5" fill="none" className={activeBranch === 0 ? 'path-glow-active' : ''} opacity={activeBranch === 0 ? 1 : 0.25} style={{ color: '#f87171' } as CSSProperties} />
          <path d="M 250 380 L 250 220 A 40 40 0 0 0 210 180 L 180 180" stroke="#f97316" strokeWidth="2.5" fill="none" className={activeBranch === 1 ? 'path-glow-active' : ''} opacity={activeBranch === 1 ? 1 : 0.25} style={{ color: '#f97316' } as CSSProperties} />
          <path d="M 250 380 L 250 280 A 40 40 0 0 0 210 240 L 180 240" stroke="#4ade80" strokeWidth="2.5" fill="none" className={activeBranch === 2 ? 'path-glow-active' : ''} opacity={activeBranch === 2 ? 1 : 0.25} style={{ color: '#4ade80' } as CSSProperties} />
          <path d="M 250 380 L 250 340 A 40 40 0 0 0 210 300 L 180 300" stroke="#60a5fa" strokeWidth="2.5" fill="none" className={activeBranch === 3 ? 'path-glow-active' : ''} opacity={activeBranch === 3 ? 1 : 0.25} style={{ color: '#60a5fa' } as CSSProperties} />
          <path d="M 250 380 L 250 220 A 40 40 0 0 1 290 180 L 320 180" stroke="#c084fc" strokeWidth="2.5" fill="none" className={activeBranch === 4 ? 'path-glow-active' : ''} opacity={activeBranch === 4 ? 1 : 0.25} style={{ color: '#c084fc' } as CSSProperties} />
          <path d="M 250 380 L 250 280 A 40 40 0 0 1 290 240 L 320 240" stroke="#a3e635" strokeWidth="2.5" fill="none" className={activeBranch === 5 ? 'path-glow-active' : ''} opacity={activeBranch === 5 ? 1 : 0.25} style={{ color: '#a3e635' } as CSSProperties} />

          {/* Node Circles */}
          {/* Browser Wrappers circle */}
          <circle cx="250" cy="180" r="20" fill="#0b0f19" stroke="#f87171" strokeWidth={activeBranch === 0 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(0)} style={{ color: '#f87171' } as CSSProperties} />
          <foreignObject x="241" y="171" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <Globe size={18} color="#f87171" />
          </foreignObject>
          <text x="250" y="148" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Browser Wrappers</text>

          {/* Windows Control circle */}
          <circle cx="180" cy="180" r="20" fill="#0b0f19" stroke="#f97316" strokeWidth={activeBranch === 1 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(1)} style={{ color: '#f97316' } as CSSProperties} />
          <foreignObject x="171" y="171" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <MonitorCog size={18} color="#f97316" />
          </foreignObject>
          <text x="115" y="184" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">Windows Control</text>

          {/* Desktop Control circle */}
          <circle cx="180" cy="240" r="20" fill="#0b0f19" stroke="#4ade80" strokeWidth={activeBranch === 2 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(2)} style={{ color: '#4ade80' } as CSSProperties} />
          <foreignObject x="171" y="231" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <AppWindow size={18} color="#4ade80" />
          </foreignObject>
          <text x="115" y="244" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Desktop Control</text>

          {/* Python Tools circle */}
          <circle cx="180" cy="300" r="20" fill="#0b0f19" stroke="#60a5fa" strokeWidth={activeBranch === 3 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(3)} style={{ color: '#60a5fa' } as CSSProperties} />
          <foreignObject x="171" y="291" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <TerminalSquare size={18} color="#60a5fa" />
          </foreignObject>
          <text x="115" y="304" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Python Tools</text>

          {/* Telegram Bot circle */}
          <circle cx="320" cy="180" r="20" fill="#0b0f19" stroke="#c084fc" strokeWidth={activeBranch === 4 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(4)} style={{ color: '#c084fc' } as CSSProperties} />
          <foreignObject x="311" y="171" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <Bot size={18} color="#c084fc" />
          </foreignObject>
          <text x="385" y="184" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Telegram Bot</text>

          {/* Email/Media Utilities circle */}
          <circle cx="320" cy="240" r="20" fill="#0b0f19" stroke="#a3e635" strokeWidth={activeBranch === 5 ? 3.5 : 1.5} className="clickable-branch-node" onClick={() => setActiveBranch(5)} style={{ color: '#a3e635' } as CSSProperties} />
          <foreignObject x="311" y="231" width="18" height="18" style={{ pointerEvents: 'none' }}>
            <Mail size={18} color="#a3e635" />
          </foreignObject>
          <text x="385" y="244" textAnchor="middle" fill="#a3e635" fontSize="10" fontWeight="bold">Email/Media</text>
        </svg>
      </div>

      {/* Details Box */}
      <div className="control-details-box" style={{ borderColor: branches[activeBranch].color } as CSSProperties}>
        <div className="details-header" style={{ color: branches[activeBranch].color }}>
          <ActiveBranchIcon size={24} />
          <h3>{branches[activeBranch].title}</h3>
        </div>
        <p className="details-desc">{branches[activeBranch].desc}</p>
        <div className="details-pills">
          {branches[activeBranch].details.map((pill) => (
            <span key={pill} className="details-pill" style={{ background: `${branches[activeBranch].color}15`, color: branches[activeBranch].color } as CSSProperties}>{pill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 3. Runtime & Safety Mindmap Visualizer Component (Image 3)
function MindmapVisualizer() {
  const [selectedNode, setSelectedNode] = useState<string>('core')
  
  const nodes: Record<string, { title: string; color: string; desc: string; category: string; details: string[] }> = {
    core: {
      title: 'Shell AI OS Controller',
      color: '#94a3b8',
      desc: 'The central local command interface routing user requests securely to automation tools and sandboxes.',
      category: 'System Core',
      details: ['Local Host Execution', 'Secure Bridging', 'Audit Logging']
    },
    diagnostics: {
      title: 'Runtime Diagnostics',
      color: '#f97316', // Orange
      desc: 'Proactively audits local API connectivity, dependencies configuration, and system logs.',
      category: 'Runtime & Safety',
      details: ['System Health Checks', 'Venv verification', 'Dependency audits']
    },
    telemetry: {
      title: 'Telemetry',
      color: '#f97316', // Orange
      desc: 'Tracks CPU, RAM, GPU utilization and system queue delays live to prevent local bottleneck locks.',
      category: 'Runtime & Safety',
      details: ['Resource charts', 'Queue status tracking', 'GPU integration charts']
    },
    sandbox: {
      title: 'Secure Sandbox',
      color: '#f97316', // Orange
      desc: 'Strict per-run sandbox environment with file isolation, timeout bounds, and automated rollback cleanups.',
      category: 'Runtime & Safety',
      details: ['File isolation', 'Timeout limits', 'Clean workspace resets']
    },
    memory: {
      title: 'Memory v2',
      color: '#ec4899', // Pink
      desc: 'Local SQLite memory logs that index past execution contexts, complete with tag ratings and manual redaction.',
      category: 'Memory & RAG',
      details: ['Context logs', 'SQLite backing store', 'Redaction hooks']
    },
    rag: {
      title: 'Project RAG v2',
      color: '#ec4899', // Pink
      desc: 'Indexes codebases incrementally to ground routing agents in accurate local code reference context.',
      category: 'Memory & RAG',
      details: ['BM25 search fallback', 'Vector embedding index', 'Incremental updates']
    },
    shellai: {
      title: 'ShellAI Core',
      color: '#ef4444', // Red-Orange
      desc: 'CLI backend engine driving model configuration routing and task queuing.',
      category: 'Desktop Control',
      details: ['CLI parameters parsing', 'Provider configuration', 'Daemon scheduling']
    },
    fabric: {
      title: 'AI OS Fabric',
      color: '#ef4444', // Red-Orange
      desc: 'Coordinating multi-agent architecture linking Shell, Optimizer, and Safety handlers together.',
      category: 'Desktop Control',
      details: ['Agent handoffs', 'Context sharing api', 'Multi-model routing']
    },
    checkpoints: {
      title: 'Workflow Checkpoints',
      color: '#a855f7', // Purple
      desc: 'Track long-running multi-step tasks, letting you pause, inspect, resume, or roll back parameters.',
      category: 'Tools & Automation',
      details: ['Step logging', 'State rollbacks', 'Checkpoint resume']
    }
  }

  return (
    <div className="mindmap-visualizer-layout">
      {/* Interactive Mindmap SVG */}
      <div className="mindmap-container">
        <svg viewBox="0 0 700 350" className="mindmap-svg">
          {/* Paths connecting nodes to the center */}
          <path d="M 350 175 L 140 100" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.6} />
          <path d="M 140 100 L 70 60" stroke="#f97316" strokeWidth="1.2" opacity={0.4} />
          <path d="M 140 100 L 190 60" stroke="#f97316" strokeWidth="1.2" opacity={0.4} />
          <path d="M 140 100 L 120 140" stroke="#f97316" strokeWidth="1.2" opacity={0.4} />

          <path d="M 350 175 L 170 250" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.6} />
          <path d="M 170 250 L 120 285" stroke="#ec4899" strokeWidth="1.2" opacity={0.4} />
          <path d="M 170 250 L 220 285" stroke="#ec4899" strokeWidth="1.2" opacity={0.4} />

          <path d="M 350 175 L 530 115" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.6} />
          <path d="M 530 115 L 590 80" stroke="#ef4444" strokeWidth="1.2" opacity={0.4} />
          <path d="M 530 115 L 610 135" stroke="#ef4444" strokeWidth="1.2" opacity={0.4} />

          <path d="M 350 175 L 530 240" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.6} />
          <path d="M 530 240 L 610 240" stroke="#a855f7" strokeWidth="1.2" opacity={0.4} />

          {/* Central Gray Node */}
          <g className={`mindmap-node central-node ${selectedNode === 'core' ? 'active' : ''}`} onClick={() => setSelectedNode('core')} transform="translate(350, 175)">
            <rect x="-85" y="-22" width="170" height="44" rx="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">Shell AI OS Controller</text>
          </g>

          {/* Left Top Sub-group (Runtime & Safety) */}
          <g className={`mindmap-node group-node ${selectedNode === 'diagnostics' ? 'active' : ''}`} onClick={() => setSelectedNode('diagnostics')} transform="translate(140, 100)" style={{ color: '#f97316' } as CSSProperties}>
            <rect x="-65" y="-16" width="130" height="32" rx="16" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#f97316" fontWeight="bold" fontSize="10">Runtime & Safety</text>
          </g>
          <circle cx="70" cy="60" r="14" fill="#0b0f19" stroke="#f97316" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('diagnostics'); }} style={{ color: '#f97316' } as CSSProperties} />
          <foreignObject x="62" y="52" width="16" height="16" style={{ pointerEvents: 'none' }}><Activity size={12} color="#f97316" /></foreignObject>
          
          <circle cx="190" cy="60" r="14" fill="#0b0f19" stroke="#f97316" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('telemetry'); }} style={{ color: '#f97316' } as CSSProperties} />
          <foreignObject x="182" y="52" width="16" height="16" style={{ pointerEvents: 'none' }}><Radar size={12} color="#f97316" /></foreignObject>

          <circle cx="120" cy="140" r="14" fill="#0b0f19" stroke="#f97316" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('sandbox'); }} style={{ color: '#f97316' } as CSSProperties} />
          <foreignObject x="112" y="132" width="16" height="16" style={{ pointerEvents: 'none' }}><ShieldCheck size={12} color="#f97316" /></foreignObject>

          {/* Left Bottom Sub-group (Memory & RAG) */}
          <g className={`mindmap-node group-node ${selectedNode === 'memory' ? 'active' : ''}`} onClick={() => setSelectedNode('memory')} transform="translate(170, 250)" style={{ color: '#ec4899' } as CSSProperties}>
            <rect x="-65" y="-16" width="130" height="32" rx="16" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#ec4899" fontWeight="bold" fontSize="10">Memory & RAG</text>
          </g>
          <circle cx="120" cy="285" r="14" fill="#0b0f19" stroke="#ec4899" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('memory'); }} style={{ color: '#ec4899' } as CSSProperties} />
          <foreignObject x="112" y="277" width="16" height="16" style={{ pointerEvents: 'none' }}><MemoryStick size={12} color="#ec4899" /></foreignObject>

          <circle cx="220" cy="285" r="14" fill="#0b0f19" stroke="#ec4899" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('rag'); }} style={{ color: '#ec4899' } as CSSProperties} />
          <foreignObject x="212" y="277" width="16" height="16" style={{ pointerEvents: 'none' }}><Database size={12} color="#ec4899" /></foreignObject>

          {/* Right Top Sub-group (Desktop Control) */}
          <g className={`mindmap-node group-node ${selectedNode === 'fabric' ? 'active' : ''}`} onClick={() => setSelectedNode('fabric')} transform="translate(530, 115)" style={{ color: '#ef4444' } as CSSProperties}>
            <rect x="-65" y="-16" width="130" height="32" rx="16" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="10">Desktop Control</text>
          </g>
          <circle cx="590" cy="80" r="14" fill="#0b0f19" stroke="#ef4444" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('shellai'); }} style={{ color: '#ef4444' } as CSSProperties} />
          <foreignObject x="582" y="72" width="16" height="16" style={{ pointerEvents: 'none' }}><Cpu size={12} color="#ef4444" /></foreignObject>

          <circle cx="610" cy="135" r="14" fill="#0b0f19" stroke="#ef4444" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('fabric'); }} style={{ color: '#ef4444' } as CSSProperties} />
          <foreignObject x="602" y="127" width="16" height="16" style={{ pointerEvents: 'none' }}><Boxes size={12} color="#ef4444" /></foreignObject>

          {/* Right Bottom Sub-group (Tools & Automation) */}
          <g className={`mindmap-node group-node ${selectedNode === 'checkpoints' ? 'active' : ''}`} onClick={() => setSelectedNode('checkpoints')} transform="translate(530, 240)" style={{ color: '#a855f7' } as CSSProperties}>
            <rect x="-65" y="-16" width="130" height="32" rx="16" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#a855f7" fontWeight="bold" fontSize="10">Tools & Automation</text>
          </g>
          <circle cx="610" cy="240" r="14" fill="#0b0f19" stroke="#a855f7" strokeWidth="1" className="clickable-child" onClick={(e) => { e.stopPropagation(); setSelectedNode('checkpoints'); }} style={{ color: '#a855f7' } as CSSProperties} />
          <foreignObject x="602" y="232" width="16" height="16" style={{ pointerEvents: 'none' }}><Workflow size={12} color="#a855f7" /></foreignObject>
        </svg>
      </div>

      {/* Selected Node Details */}
      <div className="mindmap-details-card" style={{ borderColor: nodes[selectedNode].color } as CSSProperties}>
        <div className="details-header">
          <span className="details-badge" style={{ color: nodes[selectedNode].color }}>{nodes[selectedNode].category}</span>
          <h3>{nodes[selectedNode].title}</h3>
        </div>
        <p>{nodes[selectedNode].desc}</p>
        <div className="details-pills">
          {nodes[selectedNode].details.map((pill) => (
            <span key={pill} className="details-pill" style={{ background: `${nodes[selectedNode].color}15`, color: nodes[selectedNode].color } as CSSProperties}>{pill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 4. Integrations Radar Visualizer Component
function IntegrationsVisualizer() {
  const [activeChannel, setActiveChannel] = useState<number>(0)
  
  const channels = [
    {
      title: 'Telegram Bot Interface',
      color: '#c084fc', // Purple
      icon: Bot,
      desc: 'Controlled remote interface with status check, test alerts, and allowlists.',
      details: ['Admin allowlists', 'Remote logs audit', 'Status triggers']
    },
    {
      title: 'Voice Pipeline Runtime',
      color: '#f59e0b', // Amber
      icon: Mic2,
      desc: 'Processes speech requests offline using local libraries, or tunnels to Whisper API.',
      details: ['Mic mute/unmute checks', 'Local STT engine', 'Offline fallback']
    },
    {
      title: 'Email & SMTP Mailer',
      color: '#10b981', // Emerald
      icon: Mail,
      desc: 'Sends diagnostic logs, system alerts, or PDF reports directly to your mailbox.',
      details: ['SSL/TLS encryption', 'SMTP configuration check', 'Automated reports']
    },
    {
      title: 'Chat & Web UI Controller',
      color: '#3b82f6', // Blue
      icon: TerminalSquare,
      desc: 'Standard local web client for typing, inspecting tools, and review settings.',
      details: ['WebSockets stream', 'Localhost CORS isolation', 'Real-time telemetry']
    }
  ]

  const ActiveIcon = channels[activeChannel].icon

  return (
    <div className="integrations-visualizer-layout">
      {/* Concentric Circle Radar Map */}
      <div className="radar-map-container">
        <svg viewBox="0 0 400 400" className="radar-svg">
          <circle cx="200" cy="200" r="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="200" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />

          <circle cx="200" cy="200" r="30" fill="rgba(14, 20, 32, 0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <text x="200" y="204" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">HUB</text>

          <line x1="200" y1="200" x2="350" y2="200" stroke="var(--site-cyan)" strokeWidth="1.5" opacity="0.3" className="radar-sweep" />

          {/* 1. Telegram Bot (Top-Left) */}
          <g className={`radar-node-group ${activeChannel === 0 ? 'active' : ''}`} onClick={() => setActiveChannel(0)}>
            <line x1="200" y1="200" x2="110" y2="110" stroke="#c084fc" strokeWidth={activeChannel === 0 ? 2 : 1} opacity={activeChannel === 0 ? 0.8 : 0.3} />
            <circle cx="110" cy="110" r="18" fill="#0b0f19" stroke="#c084fc" strokeWidth={activeChannel === 0 ? 3.5 : 1.5} />
            <foreignObject x="101" y="101" width="18" height="18" style={{ pointerEvents: 'none' }}><Bot size={14} color="#c084fc" /></foreignObject>
            <text x="110" y="85" textAnchor="middle" fill="#c084fc" fontSize="9.5" fontWeight="bold">Telegram</text>
          </g>

          {/* 2. Voice (Top-Right) */}
          <g className={`radar-node-group ${activeChannel === 1 ? 'active' : ''}`} onClick={() => setActiveChannel(1)}>
            <line x1="200" y1="200" x2="290" y2="110" stroke="#f59e0b" strokeWidth={activeChannel === 1 ? 2 : 1} opacity={activeChannel === 1 ? 0.8 : 0.3} />
            <circle cx="290" cy="110" r="18" fill="#0b0f19" stroke="#f59e0b" strokeWidth={activeChannel === 1 ? 3.5 : 1.5} />
            <foreignObject x="281" y="101" width="18" height="18" style={{ pointerEvents: 'none' }}><Mic2 size={14} color="#f59e0b" /></foreignObject>
            <text x="290" y="85" textAnchor="middle" fill="#f59e0b" fontSize="9.5" fontWeight="bold">Voice</text>
          </g>

          {/* 3. Email (Bottom-Right) */}
          <g className={`radar-node-group ${activeChannel === 2 ? 'active' : ''}`} onClick={() => setActiveChannel(2)}>
            <line x1="200" y1="200" x2="290" y2="290" stroke="#10b981" strokeWidth={activeChannel === 2 ? 2 : 1} opacity={activeChannel === 2 ? 0.8 : 0.3} />
            <circle cx="290" cy="290" r="18" fill="#0b0f19" stroke="#10b981" strokeWidth={activeChannel === 2 ? 3.5 : 1.5} />
            <foreignObject x="281" y="281" width="18" height="18" style={{ pointerEvents: 'none' }}><Mail size={14} color="#10b981" /></foreignObject>
            <text x="290" y="320" textAnchor="middle" fill="#10b981" fontSize="9.5" fontWeight="bold">Email</text>
          </g>

          {/* 4. Chat/Web UI (Bottom-Left) */}
          <g className={`radar-node-group ${activeChannel === 3 ? 'active' : ''}`} onClick={() => setActiveChannel(3)}>
            <line x1="200" y1="200" x2="110" y2="290" stroke="#3b82f6" strokeWidth={activeChannel === 3 ? 2 : 1} opacity={activeChannel === 3 ? 0.8 : 0.3} />
            <circle cx="110" cy="290" r="18" fill="#0b0f19" stroke="#3b82f6" strokeWidth={activeChannel === 3 ? 3.5 : 1.5} />
            <foreignObject x="101" y="281" width="18" height="18" style={{ pointerEvents: 'none' }}><TerminalSquare size={14} color="#3b82f6" /></foreignObject>
            <text x="110" y="320" textAnchor="middle" fill="#3b82f6" fontSize="9.5" fontWeight="bold">Web UI</text>
          </g>
        </svg>
      </div>

      {/* Channel details */}
      <div className="integrations-details-card" style={{ borderColor: channels[activeChannel].color } as CSSProperties}>
        <div className="details-header" style={{ color: channels[activeChannel].color }}>
          <ActiveIcon size={24} />
          <h3>{channels[activeChannel].title}</h3>
        </div>
        <p>{channels[activeChannel].desc}</p>
        <div className="details-pills">
          {channels[activeChannel].details.map((pill) => (
            <span key={pill} className="details-pill" style={{ background: `${channels[activeChannel].color}15`, color: channels[activeChannel].color } as CSSProperties}>{pill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. Automation Workflow Visualizer Component
function AutomationVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      title: '460+ Guarded Tools Catalog',
      color: '#eab308', // Yellow
      icon: Hammer,
      desc: 'Local execution gateway with pre-checks, parameter audits, dry-runs, and rollback cleanups.',
      details: ['Parameter constraints', 'Pre-run audits', 'Dry-runs check']
    },
    {
      title: 'Workflow Checkpoints',
      color: '#a855f7', // Purple
      icon: Workflow,
      desc: 'Multi-step orchestrator tracking execution state, allowing task pausing, checkpointing, and rolling back.',
      details: ['Step state persistence', 'State rollback checks', 'Execution retry queue']
    },
    {
      title: 'Browser Automation Wrappers',
      color: '#f87171', // Red
      icon: Globe,
      desc: 'Performs automated browser runs via isolation wrappers, enforcing user confirmation policies.',
      details: ['Browser context isolation', 'Interactive permission ask', 'Detailed action logs']
    }
  ]

  const ActiveIcon = steps[activeStep].icon

  return (
    <div className="automation-visualizer-layout">
      {/* Pipeline Flow Visualization */}
      <div className="pipeline-flow-container">
        <svg viewBox="0 0 500 150" className="pipeline-svg">
          {/* Horizontal connecting paths */}
          <path d="M 90 75 L 250 75" stroke={activeStep >= 1 ? '#a855f7' : 'rgba(255,255,255,0.06)'} strokeWidth="3" strokeDasharray={activeStep === 1 ? '5 5' : 'none'} className={activeStep === 1 ? 'path-flow-run' : ''} />
          <path d="M 250 75 L 410 75" stroke={activeStep === 2 ? '#f87171' : 'rgba(255,255,255,0.06)'} strokeWidth="3" strokeDasharray={activeStep === 2 ? '5 5' : 'none'} className={activeStep === 2 ? 'path-flow-run' : ''} />

          {/* Node 1: Guarded Tools */}
          <g className={`pipeline-node-group ${activeStep === 0 ? 'active' : ''}`} onClick={() => setActiveStep(0)}>
            <circle cx="90" cy="75" r="24" fill="#0b0f19" stroke="#eab308" strokeWidth={activeStep === 0 ? 3.5 : 1.5} />
            <foreignObject x="78" y="63" width="24" height="24" style={{ pointerEvents: 'none' }}><Hammer size={20} color="#eab308" /></foreignObject>
            <text x="90" y="125" textAnchor="middle" fill="#eab308" fontSize="10.5" fontWeight="bold">Guarded Tools</text>
          </g>

          {/* Node 2: Workflow Checkpoints */}
          <g className={`pipeline-node-group ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
            <circle cx="250" cy="75" r="24" fill="#0b0f19" stroke="#a855f7" strokeWidth={activeStep === 1 ? 3.5 : 1.5} />
            <foreignObject x="238" y="63" width="24" height="24" style={{ pointerEvents: 'none' }}><Workflow size={20} color="#a855f7" /></foreignObject>
            <text x="250" y="125" textAnchor="middle" fill="#a855f7" fontSize="10.5" fontWeight="bold">Checkpoints</text>
          </g>

          {/* Node 3: Browser Wrappers */}
          <g className={`pipeline-node-group ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
            <circle cx="410" cy="75" r="24" fill="#0b0f19" stroke="#f87171" strokeWidth={activeStep === 2 ? 3.5 : 1.5} />
            <foreignObject x="398" y="63" width="24" height="24" style={{ pointerEvents: 'none' }}><Globe size={20} color="#f87171" /></foreignObject>
            <text x="410" y="125" textAnchor="middle" fill="#f87171" fontSize="10.5" fontWeight="bold">Browser Wrappers</text>
          </g>
        </svg>
      </div>

      {/* Details Box */}
      <div className="automation-details-card" style={{ borderColor: steps[activeStep].color } as CSSProperties}>
        <div className="details-header" style={{ color: steps[activeStep].color }}>
          <ActiveIcon size={24} />
          <h3>{steps[activeStep].title}</h3>
        </div>
        <p>{steps[activeStep].desc}</p>
        <div className="details-pills">
          {steps[activeStep].details.map((pill) => (
            <span key={pill} className="details-pill" style={{ background: `${steps[activeStep].color}15`, color: steps[activeStep].color } as CSSProperties}>{pill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}const featureToTabMap: Record<string, string> = {
  'Chat': 'integrations',
  'Voice': 'integrations',
  '460+ guarded tools': 'automation',
  'Desktop control': 'control',
  'Windows control': 'control',
  'Browser wrappers': 'automation',
  'Telegram': 'integrations',
  'Email/media': 'integrations',
  'Runtime diagnostics': 'safety',
  'Telemetry': 'safety',
  'ShellAI Core': 'control',
  'AI OS Fabric': 'control',
  'Memory v2': 'memory',
  'Project RAG v2': 'memory',
  'Secure sandbox': 'safety',
  'Workflow checkpoints': 'automation'
}

export function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<FeatureTabId>('all')
  const activeTabData = featureTabs.find((tab) => tab.id === activeTab) ?? featureTabs[0]

  const filteredFeatures = activeTab === 'all'
    ? featureGroups
    : featureGroups.filter(fg => featureToTabMap[fg.title] === activeTab)

  return (
    <main id="main-content" className="subpage feature-page">
      <section className="subpage-hero feature-page-hero">
        <p className="eyebrow">Features</p>
        <h1>Everything Shell can control, route, remember, and guard.</h1>
        <p>
          A dedicated feature index for the real Shell product surface, grouped
          by daily workflow area instead of crowding the homepage.
        </p>

        <div className="feature-page-stats" aria-label="Shell feature summary">
          {featureStats.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="stat-card" style={{ '--stat-color': color } as CSSProperties}>
              <div className="stat-icon-wrap">
                <Icon size={22} color={color} />
              </div>
              <div className="stat-content">
                <strong className="stat-value">{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-browser" aria-label="Shell features">
        <div className="feature-tabs" role="tablist" aria-label="Feature categories">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              className={activeTab === tab.id ? 'feature-tab is-active' : 'feature-tab'}
              aria-selected={activeTab === tab.id}
              role="tab"
              aria-controls="feature-tabpanel"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div id="feature-tabpanel" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
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

          {/* Interactive Playgrounds replacing the old grid boxes */}
          <div className="features-visualizer-container">
            {activeTab === 'all' && <MindmapVisualizer />}
            {activeTab === 'control' && <ControlVisualizer />}
            {activeTab === 'memory' && <MemoryVisualizer />}
            {activeTab === 'automation' && <AutomationVisualizer />}
            {activeTab === 'safety' && <MindmapVisualizer />}
            {activeTab === 'integrations' && <IntegrationsVisualizer />}
          </div>

          {/* Bento-style specifications grid of all modules */}
          <div className="features-grid-specs">
            <div className="specs-heading">
              <p className="eyebrow">Specifications</p>
              <h2>{activeTab === 'all' ? 'All Documented Modules' : `${activeTabData.label} Modules`}</h2>
              <p>Explore technical specs and runtime details for each module segment.</p>
            </div>
            
            <div className="features-bento-grid">
              {filteredFeatures.map((fg) => {
                const Icon = fg.icon
                return (
                  <div key={fg.title} className="feature-bento-card">
                    <div className="card-shine" />
                    <div className="feature-card-header">
                      <div className="feature-card-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <h3>{fg.title}</h3>
                    </div>
                    <p>{fg.copy}</p>
                    <div className="feature-card-badge">Verified Local</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
