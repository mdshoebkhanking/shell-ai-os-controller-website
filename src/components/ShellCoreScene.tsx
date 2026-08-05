import { useEffect, useRef, type PointerEvent } from 'react'
import * as THREE from 'three'

export function ShellCoreScene() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const pointerTarget = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const testCanvas = document.createElement('canvas')
    const hasWebGL = Boolean(
      window.WebGLRenderingContext &&
      (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
    )

    if (!hasWebGL) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.domElement.className = 'shell-core-canvas'
    mount.appendChild(renderer.domElement)

    const disposables: Array<{ dispose: () => void }> = []
    const track = <T extends { dispose: () => void }>(value: T) => {
      disposables.push(value)
      return value
    }

    const sceneGroup = new THREE.Group()
    sceneGroup.rotation.set(-0.08, -0.12, 0)
    scene.add(sceneGroup)

    const innerGeometry = track(new THREE.SphereGeometry(1.12, 64, 64))
    const innerMaterial = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x071014,
        emissive: 0x074b54,
        emissiveIntensity: 0.16,
        metalness: 0.08,
        roughness: 0.76,
        clearcoat: 0.72,
        clearcoatRoughness: 0.58,
        transparent: true,
        opacity: 0.94
      })
    )
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial)
    sceneGroup.add(innerSphere)

    const glowGeometry = track(new THREE.SphereGeometry(0.74, 48, 48))
    const glowMaterial = track(
      new THREE.MeshBasicMaterial({
        color: 0x19f6e8,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    const coreGlow = new THREE.Mesh(glowGeometry, glowMaterial)
    sceneGroup.add(coreGlow)

    const outerGlowGeometry = track(new THREE.SphereGeometry(1.42, 48, 48))
    const outerGlowMaterial = track(
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial)
    sceneGroup.add(outerGlow)

    const shellGeometry = track(new THREE.IcosahedronGeometry(2.08, 1))
    const shellEdges = track(new THREE.EdgesGeometry(shellGeometry, 12))
    const shellMaterial = track(
      new THREE.LineBasicMaterial({
        color: 0x7cf6ff,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending
      })
    )
    const shellLines = new THREE.LineSegments(shellEdges, shellMaterial)
    sceneGroup.add(shellLines)

    const rings = [
      { radius: 1.82, tilt: [0.58, 0.18, -0.34], speed: 0.12, opacity: 0.32 },
      { radius: 2.18, tilt: [-0.36, 0.72, 0.28], speed: -0.08, opacity: 0.22 },
      { radius: 2.46, tilt: [0.12, -0.52, 0.68], speed: 0.06, opacity: 0.18 }
    ].map((ring) => {
      const geometry = track(new THREE.TorusGeometry(ring.radius, 0.008, 8, 160))
      const material = track(
        new THREE.MeshBasicMaterial({
          color: 0x54f4ff,
          transparent: true,
          opacity: ring.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.set(ring.tilt[0], ring.tilt[1], ring.tilt[2])
      sceneGroup.add(mesh)

      return { mesh, speed: ring.speed, base: ring.tilt }
    })

    const particleCount = 620
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const colorA = new THREE.Color(0x7cf6ff)
    const colorB = new THREE.Color(0xe6fbff)

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.8 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const index = i * 3

      positions[index] = radius * Math.sin(phi) * Math.cos(theta)
      positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[index + 2] = radius * Math.cos(phi)

      const color = colorA.clone().lerp(colorB, Math.random() * 0.72)
      colors[index] = color.r
      colors[index + 1] = color.g
      colors[index + 2] = color.b
    }

    const particleGeometry = track(new THREE.BufferGeometry())
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleMaterial = track(
      new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.56,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      })
    )
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    sceneGroup.add(particles)

    const ambient = new THREE.AmbientLight(0x7cf6ff, 0.28)
    scene.add(ambient)

    const keyLight = new THREE.PointLight(0x13e0d1, 2.1, 12)
    keyLight.position.set(-2.8, 2.4, 3.6)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0x7cf6ff, 1.35, 12)
    rimLight.position.set(3.2, -1.4, -2.6)
    scene.add(rimLight)

    const clock = new THREE.Clock()
    let animationFrame: number | undefined
    let inView = true
    let tabVisible = document.visibilityState === 'visible'
    let parallaxX = 0
    let parallaxY = 0

    const getHeroProgress = () => {
      const hero = mount.closest('.hero-section')
      if (!hero) return 0

      const rect = hero.getBoundingClientRect()
      const total = Math.max(1, rect.height + window.innerHeight)
      return THREE.MathUtils.clamp((window.innerHeight - rect.top) / total, 0, 1)
    }

    const resize = () => {
      const width = Math.max(1, mount.clientWidth)
      const height = Math.max(1, mount.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene(clock.getElapsedTime())
    }

    const renderScene = (elapsed: number) => {
      const progress = getHeroProgress()

      parallaxX = THREE.MathUtils.lerp(parallaxX, pointerTarget.current.x, 0.05)
      parallaxY = THREE.MathUtils.lerp(parallaxY, pointerTarget.current.y, 0.05)

      sceneGroup.rotation.x = -0.08 + parallaxY + progress * 0.08
      sceneGroup.rotation.y = -0.12 + parallaxX + progress * 0.22
      camera.position.z = 7.24 - progress * 0.62

      shellLines.rotation.x = elapsed * 0.08
      shellLines.rotation.y = elapsed * 0.13
      innerSphere.rotation.y = elapsed * 0.055
      coreGlow.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.045)
      outerGlow.scale.setScalar(1 + Math.sin(elapsed * 0.78) * 0.035)
      particles.rotation.y = elapsed * 0.018
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.04

      rings.forEach((ring, index) => {
        ring.mesh.rotation.x = ring.base[0] + Math.sin(elapsed * 0.22 + index) * 0.035
        ring.mesh.rotation.y = ring.base[1] + elapsed * ring.speed
        ring.mesh.rotation.z = ring.base[2] + elapsed * ring.speed * 0.72
      })

      renderer.render(scene, camera)
    }

    const shouldAnimate = () => !reduceMotion && inView && tabVisible

    const start = () => {
      if (animationFrame === undefined && shouldAnimate()) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = undefined
      }
    }

    const animate = () => {
      animationFrame = undefined
      renderScene(clock.getElapsedTime())
      start()
    }

    const handleVisibilityChange = () => {
      tabVisible = document.visibilityState === 'visible'
      if (shouldAnimate()) {
        start()
      } else {
        stop()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        if (shouldAnimate()) {
          start()
        } else {
          stop()
        }
      },
      { threshold: 0.02 }
    )

    observer.observe(mount)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    resize()
    renderScene(0)
    start()

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mount.removeChild(renderer.domElement)
      disposables.forEach((disposable) => disposable.dispose())
      renderer.dispose()
      renderer.forceContextLoss()
    }
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    pointerTarget.current = {
      x: THREE.MathUtils.clamp(x * 0.6, -0.3, 0.3),
      y: THREE.MathUtils.clamp(y * -0.46, -0.23, 0.23)
    }
  }

  const handlePointerLeave = () => {
    pointerTarget.current = { x: 0, y: 0 }
  }

  return (
    <div
      ref={mountRef}
      className="shell-core-scene"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  )
}
