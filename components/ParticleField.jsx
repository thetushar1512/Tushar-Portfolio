'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Stars() {
  const ref = useRef()
  const { mouse } = useThree()

  const positions = useMemo(() => {
    const N = 3500
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      // sphere distribution
      const r = 6 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i*3+2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x += delta * 0.012
    const tx = mouse.x * 0.35
    const ty = mouse.y * 0.35
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.002
    ref.current.rotation.x += (-ty - ref.current.rotation.x) * 0.002
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a78bfa" size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

function WireGlobe() {
  const ref = useRef()
  const { mouse } = useThree()
  useFrame((s, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.08
    ref.current.rotation.x = mouse.y * 0.25
  })
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[0x000000]} />
      <fog attach="fog" args={[0x000000, 5, 18]} />
      <Stars />
      <WireGlobe />
    </Canvas>
  )
}
