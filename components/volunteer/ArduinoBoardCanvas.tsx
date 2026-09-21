'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RotateCw, Move, Sparkles } from 'lucide-react'

export function ArduinoBoardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasMountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const animFrameRef = useRef<number | null>(null)

  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [error, setError] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const mount = canvasMountRef.current
    if (!container || !mount) return

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Calculate dimensions matching container
    const width = container.clientWidth || 600
    const height = Math.max(280, Math.min(440, Math.round(width * 0.62)))

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0.25, 3)
    cameraRef.current = camera

    // WebGL Renderer with transparency & high pixel ratio
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      setError(true)
      setLoading(false)
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false // Never block mobile page scroll
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.8
    controlsRef.current = controls

    controls.addEventListener('start', () => setIsInteracting(true))
    controls.addEventListener('end', () => setIsInteracting(false))

    // Theme-adaptive studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    // Key light (crisp white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(5, 8, 5)
    scene.add(keyLight)

    // Fill light (subtle Arduino teal tint)
    const fillLight = new THREE.DirectionalLight(0x00979d, 1.0)
    fillLight.position.set(-5, -2, -4)
    scene.add(fillLight)

    // Rim/accent light (subtle warm orange highlight)
    const rimLight = new THREE.DirectionalLight(0xf26727, 0.7)
    rimLight.position.set(0, 6, -5)
    scene.add(rimLight)

    // Load GLTF Model
    const loader = new GLTFLoader()
    loader.load(
      '/models/arduino.glb',
      (gltf) => {
        const model = gltf.scene
        model.scale.set(0.05, 0.05, 0.05)

        // Center model geometry
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        model.position.y += 0.15

        // Adjust camera focal distance based on model bounds
        const size = box.getSize(new THREE.Vector3())
        let dist = Math.abs(Math.max(size.x, size.y, size.z) / 2 / Math.tan((camera.fov * Math.PI) / 360))
        dist *= 1.6
        camera.position.set(0, 0.25, dist)
        camera.near = dist / 100
        camera.far = dist * 100
        camera.updateProjectionMatrix()

        controls.target.set(0, 0, 0)
        controls.update()

        scene.add(model)
        setLoading(false)
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100))
        }
      },
      (err) => {
        console.error('Error loading Arduino 3D model:', err)
        setError(true)
        setLoading(false)
      }
    )

    // Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handling via ResizeObserver and window listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth || 600
      const h = Math.max(280, Math.min(440, Math.round(w * 0.62)))
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      scene.clear()
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full relative min-h-[280px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Dedicated WebGL Mount Container without React children */}
        <div ref={canvasMountRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto" />
        {/* Loading Spinner / Skeleton Overlay */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-[#00979D]/20 animate-ping" />
              <div className="w-12 h-12 rounded-full border-2 border-[#00979D] border-t-transparent animate-spin" />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-secondary)' }}>
                Loading 3D Hardware Model...
              </span>
              {loadProgress > 0 && (
                <span className="text-[11px] font-mono text-[#00979D] mt-0.5 font-semibold">
                  {loadProgress}%
                </span>
              )}
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center z-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Interactive 3D Hardware Preview
            </p>
            <p className="text-xs max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Hardware acceleration is disabled or unsupported in this browser environment.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Controls & Hint Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full px-4 py-2.5 mt-2 rounded-xl border text-xs"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-base)',
        }}
      >
        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
          <Move className="w-3.5 h-3.5 text-[#00979D]" />
          <span className="font-mono text-[11px]">
            {isInteracting ? 'Controlling board orientation...' : 'Drag or swipe to rotate 360°'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#00979D]/10 text-[#00979D] border border-[#00979D]/25">
            <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
            <span>AUTO-ORBIT ACTIVE</span>
          </div>
          <span className="text-[11px] font-mono font-medium hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
            Official Arduino Uno GLTF
          </span>
        </div>
      </div>
    </div>
  )
}
