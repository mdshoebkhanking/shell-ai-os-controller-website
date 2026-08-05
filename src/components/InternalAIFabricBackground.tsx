import type { CSSProperties } from 'react'

const fieldNodes = Array.from({ length: 10 }, (_, index) => index)

type InternalAIFabricBackgroundProps = {
  className?: string
  variant?: 'fixed' | 'section'
}

export function InternalAIFabricBackground({
  className,
  variant = 'fixed'
}: InternalAIFabricBackgroundProps) {
  return (
    <div
      className={['internal-ai-fabric', `internal-ai-fabric-${variant}`, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div className="internal-ai-fabric-depth" />
      <div className="internal-ai-fabric-topology" />
      <div className="internal-ai-fabric-currents" />
      <div className="internal-ai-fabric-particles">
        {fieldNodes.map((index) => (
          <span key={index} style={{ '--node-index': index } as CSSProperties} />
        ))}
      </div>
      <div className="internal-ai-fabric-vignette" />
    </div>
  )
}
