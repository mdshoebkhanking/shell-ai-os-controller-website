import type { PointerEvent, ReactNode } from 'react'
import { useCallback, useRef } from 'react'
import * as THREE from 'three'

type TubesBackgroundProps = {
  children?: ReactNode
  className?: string
  enableClickInteraction?: boolean
}

type TubeMesh = THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>

const palettes = [
  { tube: '#7cf6ff', glow: '#d8c59a', light: '#5ae6a8' },
  { tube: '#8fb6ff', glow: '#7cf6ff', light: '#d8c59a' },
  { tube: '#5ae6a8', glow: '#f5f1e8', light: '#7cf6ff' },
  { tube: '#d8c59a', glow: '#7cf6ff', light: '#8fb6ff' }
]

function buildCurve(index: number, total: number) {
  const points: THREE.Vector3[] = []
  const offset = index - (total - 1) / 2
  const phase = index * 0.74

  for (let step = 0; step < 9; step += 1) {
    const progress = step / 8
    const x = (progress - 0.5) * 15
    const y = offset * 0.42 + Math.sin(progress * Math.PI * 2 + phase) * 0.52
    const z = Math.cos(progress * Math.PI * 1.8 + phase) * 1.14 + offset * 0.08
    points.push(new THREE.Vector3(x, y, z))
  }

  return new THREE.CatmullRomCurve3(points)
}

function setRendererSize(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, element: HTMLElement) {
  const width = Math.max(element.clientWidth, 1)
  const height = Math.max(element.clientHeight, 1)
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

  renderer.setPixelRatio(dpr)
  renderer.setSize(width, height, true)
  renderer.domElement.dataset.tubesReady = 'true'
  renderer.domElement.dataset.tubesDpr = String(dpr)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function createTubesScene({
  canvas,
  container,
  pointerRef,
  applyPaletteRef
}: {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
  applyPaletteRef: React.MutableRefObject<(index: number) => void>
}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: 'high-performance'
  })
  const startedAt = performance.now()
  const tubeGroup = new THREE.Group()
  const tubeMeshes: TubeMesh[] = []
  const tubeCount = container.clientWidth < 700 ? 5 : 8

  canvas.dataset.tubesInit = 'started'
  canvas.dataset.tubesPalette = '0'
  camera.position.set(0, 0, 9.5)
  renderer.setClearAlpha(0)
  scene.add(tubeGroup)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.38)
  const keyLight = new THREE.PointLight(palettes[0].tube, 18, 20)
  const rimLight = new THREE.PointLight(palettes[0].glow, 11, 20)
  keyLight.position.set(-3.5, 2.8, 4.5)
  rimLight.position.set(4, -1.6, 3.2)
  scene.add(ambientLight, keyLight, rimLight)

  for (let index = 0; index < tubeCount; index += 1) {
    const curve = buildCurve(index, tubeCount)
    const radius = index % 2 === 0 ? 0.048 : 0.036
    const geometry = new THREE.TubeGeometry(curve, 96, radius, 8, false)
    const material = new THREE.MeshStandardMaterial({
      color: palettes[0].tube,
      emissive: palettes[0].glow,
      emissiveIntensity: 0.34,
      metalness: 0.42,
      opacity: 0.48,
      roughness: 0.28,
      transparent: true
    })
    const mesh: TubeMesh = new THREE.Mesh(geometry, material)
    mesh.position.y = (index - tubeCount / 2) * 0.12
    mesh.position.z = -index * 0.12
    tubeMeshes.push(mesh)
    tubeGroup.add(mesh)
  }

  applyPaletteRef.current = (nextIndex: number) => {
    const paletteIndex = nextIndex % palettes.length
    const palette = palettes[paletteIndex]
    canvas.dataset.tubesPalette = String(paletteIndex)
    keyLight.color.set(palette.tube)
    rimLight.color.set(palette.glow)
    tubeMeshes.forEach((mesh, meshIndex) => {
      mesh.material.color.set(meshIndex % 2 === 0 ? palette.tube : palette.light)
      mesh.material.emissive.set(meshIndex % 2 === 0 ? palette.glow : palette.tube)
    })
  }

  const resizeObserver = new ResizeObserver(() => {
    setRendererSize(renderer, camera, container)
    renderer.render(scene, camera)
  })
  resizeObserver.observe(container)
  setRendererSize(renderer, camera, container)

  let animationFrame = 0

  const renderFrame = () => {
    const elapsed = (performance.now() - startedAt) / 1000
    const targetX = pointerRef.current.x
    const targetY = pointerRef.current.y

    tubeGroup.rotation.y += (targetX * 0.32 - tubeGroup.rotation.y) * 0.045
    tubeGroup.rotation.x += (-targetY * 0.18 - tubeGroup.rotation.x) * 0.045
    tubeGroup.position.x += (targetX * 0.38 - tubeGroup.position.x) * 0.035
    tubeGroup.position.y += (targetY * 0.22 - tubeGroup.position.y) * 0.035

    tubeMeshes.forEach((mesh, index) => {
      mesh.position.z = -index * 0.12 + Math.sin(elapsed * 0.8 + index) * 0.09
      mesh.rotation.z = Math.sin(elapsed * 0.24 + index) * 0.035
    })

    renderer.render(scene, camera)
    animationFrame = window.requestAnimationFrame(renderFrame)
  }

  if (reducedMotion) {
    tubeGroup.rotation.set(-0.08, 0.18, 0)
    renderer.render(scene, camera)
  } else {
    renderFrame()
  }

  return () => {
    window.cancelAnimationFrame(animationFrame)
    resizeObserver.disconnect()
    tubeMeshes.forEach((mesh) => {
      mesh.geometry.dispose()
      mesh.material.dispose()
    })
    renderer.dispose()
    applyPaletteRef.current = () => undefined
  }
}

export function TubesBackground({ children, className, enableClickInteraction = true }: TubesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const paletteIndexRef = useRef(0)
  const applyPaletteRef = useRef<(index: number) => void>(() => undefined)
  const cleanupRef = useRef<(() => void) | undefined>(undefined)

  const setCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    cleanupRef.current?.()
    cleanupRef.current = undefined

    if (!canvas) {
      return
    }

    const startScene = () => {
      if (!containerRef.current || cleanupRef.current) {
        return
      }

      try {
        cleanupRef.current = createTubesScene({
          applyPaletteRef,
          canvas,
          container: containerRef.current,
          pointerRef
        })
      } catch (error) {
        canvas.dataset.tubesError = error instanceof Error ? error.message : 'webgl-setup-failed'
      }
    }

    if (containerRef.current) {
      startScene()
    } else {
      window.requestAnimationFrame(startScene)
    }
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  }

  const handleClick = () => {
    if (!enableClickInteraction) {
      return
    }

    paletteIndexRef.current = (paletteIndexRef.current + 1) % palettes.length
    applyPaletteRef.current(paletteIndexRef.current)
  }

  return (
    <div
      ref={containerRef}
      className={['tubes-background', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
    >
      <canvas ref={setCanvasRef} className="tubes-background-canvas" aria-hidden="true" />
      {children ? <div className="tubes-background-content">{children}</div> : null}
    </div>
  )
}
