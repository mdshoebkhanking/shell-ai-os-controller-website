import {
  Activity,
  AppWindow,
  Bot,
  Boxes,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  FileArchive,
  GalleryHorizontalEnd,
  Globe,
  Hammer,
  Mail,
  MemoryStick,
  Mic2,
  MonitorCog,
  Network,
  NotebookTabs,
  Phone,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Workflow
} from 'lucide-react'

export const githubRepoUrl = 'https://github.com/mdshoebkhanking/shell-ai-os-controller'
export const releasesUrl = `${githubRepoUrl}/releases`
export const latestReleaseApi =
  'https://api.github.com/repos/mdshoebkhanking/shell-ai-os-controller/releases/latest'
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export type ScreenState = {
  id: string
  label: string
  title: string
  description: string
  image: string
}

export const screenStates: ScreenState[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Workspace command center',
    description: 'Chat, readiness, telemetry, transcript state, and live activity are visible before Shell routes work.',
    image: publicAsset('/media/screenshots/dashboard.png')
  },
  {
    id: 'control',
    label: 'Control',
    title: 'Guarded tool gateway',
    description: '460+ catalogued tools sit behind parameter checks, risk labels, dry-run expectations, and logs.',
    image: publicAsset('/media/screenshots/control.png')
  },
  {
    id: 'settings',
    label: 'Settings',
    title: 'Provider and safety cockpit',
    description: 'Provider keys, voice runtime, Telegram allowlists, update checks, and safety controls stay explicit.',
    image: publicAsset('/media/screenshots/settings.png')
  },
  {
    id: 'gallery',
    label: 'Gallery',
    title: 'Output workspace',
    description: 'Generated media, QR/PDF utilities, OCR hooks, and tool outputs stay organized for follow-up work.',
    image: publicAsset('/media/screenshots/gallery.png')
  },
  {
    id: 'apps',
    label: 'Apps',
    title: 'Local workflow inventory',
    description: 'Shell maps local workspace surfaces into context while keeping OS permissions and user control intact.',
    image: publicAsset('/media/screenshots/apps.png')
  },
  {
    id: 'notes',
    label: 'Notes',
    title: 'Memory and recall',
    description: 'Optional SQLite Memory v2 adds tags, importance, redaction, recall audit, and migration support.',
    image: publicAsset('/media/screenshots/notes.png')
  },
  {
    id: 'phone',
    label: 'Phone',
    title: 'Remote access surface',
    description: 'Telegram and phone-style workflows use allowlists, status, start/stop controls, and visible readiness.',
    image: publicAsset('/media/screenshots/phone.png')
  },
  {
    id: 'macros',
    label: 'Macros',
    title: 'Workflow checkpoints',
    description: 'Multi-step work can persist last actions, resume state, checkpoints, and rollback points.',
    image: publicAsset('/media/screenshots/macros.png')
  }
]

export const featureGroups = [
  { title: 'Chat', icon: TerminalSquare, copy: 'Text-first assistant flow with tool routing and grounded responses.' },
  { title: 'Voice', icon: Mic2, copy: 'Offline/local voice path plus provider fallback and mic readiness states.' },
  { title: '460+ guarded tools', icon: Hammer, copy: 'A catalogued Python tool surface behind a guarded execution gateway.' },
  { title: 'Desktop control', icon: AppWindow, copy: 'Apps, windows, screenshots, clipboard, keyboard, and mouse automation.' },
  { title: 'Windows control', icon: MonitorCog, copy: 'Best PC-control path with pywinauto, Windows-MCP, pywin32, and PyAutoGUI fallbacks.' },
  { title: 'Browser wrappers', icon: Globe, copy: 'Browser automation wrappers with safety gates and dry-run expectations.' },
  { title: 'Telegram', icon: Bot, copy: 'Remote-control bot with allowlists, status, start/stop, and test-send controls.' },
  { title: 'Email/media', icon: Mail, copy: 'SMTP, image workflows, QR/PDF utilities, OCR hooks, and media helpers.' },
  { title: 'Runtime diagnostics', icon: Activity, copy: 'Health checks, readiness states, logs, and repair guidance.' },
  { title: 'Telemetry', icon: Radar, copy: 'Live local CPU, RAM, GPU, and network charts for visible confidence.' },
  { title: 'ShellAI Core', icon: Cpu, copy: 'Optional CLI/backend path with model routing, tools, monitor, cron, and daemon queue.' },
  { title: 'AI OS Fabric', icon: Boxes, copy: 'Coordinator, Shell, Safety, Memory, UI, and Optimizer agents behind stable APIs.' },
  { title: 'Memory v2', icon: MemoryStick, copy: 'SQLite memory with tags, importance scoring, redaction, recall audit, and migration.' },
  { title: 'Project RAG v2', icon: Database, copy: 'Incremental codebase indexing with BM25/TF-IDF fallback and semantic search.' },
  { title: 'Secure sandbox', icon: ShieldCheck, copy: 'Per-run workspaces with timeout enforcement, audit logs, and rollback cleanup.' },
  { title: 'Workflow checkpoints', icon: Workflow, copy: 'Workflow persistence, last-action tracking, resume loading, and rollback points.' }
]

export const platformCards = [
  {
    title: 'Windows',
    label: 'Windows Installer',
    icon: CheckCircle2,
    points: [
      'Download the latest setup EXE',
      'Best supported install path',
      'Windows 10/11 focused',
      'Desktop control support included'
    ]
  },
  {
    title: 'macOS',
    label: 'Installer coming soon',
    icon: NotebookTabs,
    points: [
      'macOS installer planned',
      'Developer/source setup for now',
      'Web UI and docs workflows',
      'Some permissions may be needed'
    ]
  },
  {
    title: 'Linux',
    label: 'CLI available',
    icon: Network,
    points: [
      'ShellAI Core CLI path',
      'Source/helper launch',
      'Diagnostics and dev workflows',
      'Desktop automation depends on environment'
    ]
  }
]

export const docsSteps = [
  {
    id: 'windows-install',
    title: 'Windows install',
    icon: FileArchive,
    command: 'Download latest setup EXE, run it, then open ShellAI.exe',
    copy: 'This is the intended first-class path for non-technical users.'
  },
  {
    id: 'macos-helper',
    title: 'macOS source helper',
    icon: GalleryHorizontalEnd,
    command: 'chmod +x ONE_CLICK_INSTALL.command start_shellai.command && ./ONE_CLICK_INSTALL.command',
    copy: 'Use helper scripts for Web UI, docs, chat, and development workflows.'
  },
  {
    id: 'linux-cli',
    title: 'Linux source helper',
    icon: Phone,
    command: 'chmod +x start_shellai.sh repair_shellai.sh && ./start_shellai.sh',
    copy: 'Automation support varies by local Wayland/X11 and package environment.'
  },
  {
    id: 'api-setup',
    title: 'API setup',
    icon: Brain,
    command: 'cp .env.example .env',
    copy: 'Provider keys are optional for local/offline mode. Add keys only for cloud models and third-party services.'
  }
]
