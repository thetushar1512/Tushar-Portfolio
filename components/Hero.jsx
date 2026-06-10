'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import MagneticButton from './MagneticButton'
import { ArrowDown, Crosshair, Sparkles } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 2.9 } },
}

const item = {
  hidden: { y: 28, opacity: 0, filter: 'blur(8px)' },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const globeNodes = [
  {
    label: 'Identity',
    detail: 'About me',
    target: '#about',
    position: [-1.32, 0.58, 1.42],
    color: '#d7f9ff',
  },
  {
    label: 'Projects',
    detail: 'Selected work',
    target: '#projects',
    position: [1.42, 0.06, 1.3],
    color: '#8cf7d2',
  },
  {
    label: 'Contact',
    detail: 'Start a build',
    target: '#contact',
    position: [0.18, -1.22, 1.36],
    color: '#b7c7ff',
  },
]

function makeArc(start, end) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) * 0.18,
      (start[1] + end[1]) * 0.18 + 1.2,
      (start[2] + end[2]) * 0.18
    ),
    new THREE.Vector3(...end)
  )
  return curve.getPoints(72)
}

function GlobeMarker({ node, active, onSelect, onHover }) {
  const ref = useRef()
  const ring = useRef()
  const halo = useRef()
  const handleSelect = (event) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()
    onSelect(node)
  }

  const handleHover = (event, value) => {
    event.stopPropagation()
    onHover(value)
  }

  useFrame((state) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.8) * 0.045
    ref.current.scale.setScalar(active ? 1.28 : pulse)
    if (ring.current) {
      ring.current.rotation.z += active ? 0.034 : 0.018
      ring.current.scale.setScalar(active ? 1.35 : 1.08 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06)
    }
    if (halo.current) {
      halo.current.scale.setScalar(active ? 1.55 : 1.16 + Math.sin(state.clock.elapsedTime * 1.7) * 0.08)
      halo.current.material.opacity = active ? 0.22 : 0.08
    }
  })

  return (
    <group position={node.position}>
      <mesh ref={halo}>
        <sphereGeometry args={[0.11, 28, 28]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.128, 0.005, 8, 56]} />
        <meshBasicMaterial color={node.color} transparent opacity={active ? 0.62 : 0.32} />
      </mesh>
      <mesh
        ref={ref}
        onClick={handleSelect}
        onPointerOver={(event) => handleHover(event, node)}
        onPointerOut={(event) => handleHover(event, null)}
      >
        <sphereGeometry args={[0.048, 28, 28]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={active ? 2.25 : 1.1}
          roughness={0.24}
          metalness={0.2}
        />
      </mesh>
      <mesh
        onClick={handleSelect}
        onPointerOver={(event) => handleHover(event, node)}
        onPointerOut={(event) => handleHover(event, null)}
      >
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html
        position={[0, 0.2, 0]}
        center
        distanceFactor={5.1}
        zIndexRange={[24, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <a
          href={node.target}
          className={`globe-label ${active ? 'is-active' : ''}`}
          onClick={handleSelect}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onPointerOver={(event) => handleHover(event, node)}
          onPointerOut={(event) => handleHover(event, null)}
          data-cursor="hover"
        >
          <span>{node.label}</span>
          <small>{node.detail}</small>
        </a>
      </Html>
    </group>
  )
}

function GlobeScene({ activeNode, hoverNode, onSelect, onHover }) {
  const group = useRef()
  const orbitA = useRef()
  const orbitB = useRef()
  const orbitC = useRef()
  const atmosphere = useRef()
  const controls = useRef()
  const { camera } = useThree()

  const arcs = useMemo(
    () => globeNodes.slice(1).map((node) => new THREE.BufferGeometry().setFromPoints(makeArc(globeNodes[0].position, node.position))),
    []
  )

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * (activeNode || hoverNode ? 0.018 : 0.052)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.1, 0.03)

    if (orbitA.current) orbitA.current.rotation.z += delta * 0.16
    if (orbitB.current) orbitB.current.rotation.y -= delta * 0.12
    if (orbitC.current) orbitC.current.rotation.x += delta * 0.1
    if (atmosphere.current) {
      atmosphere.current.rotation.y -= delta * 0.026
      atmosphere.current.material.opacity = THREE.MathUtils.lerp(
        atmosphere.current.material.opacity,
        activeNode || hoverNode ? 0.18 : 0.1,
        0.05
      )
    }

    const targetPosition = activeNode ? [0, 0.14, 6.4] : [0, 0.14, 7.0]
    camera.position.lerp(new THREE.Vector3(...targetPosition), activeNode ? 0.045 : 0.03)
    camera.lookAt(0, 0, 0)
    controls.current?.update()
  })

  return (
    <>
      <ambientLight intensity={1.18} />
      <directionalLight position={[4, 3, 5]} intensity={1.82} />
      <pointLight position={[-3, -2, 3]} intensity={1.55} color="#8cf7d2" />

      <group ref={group}>
        <mesh>
          <sphereGeometry args={[2.08, 96, 96]} />
          <meshPhysicalMaterial
            color="#030303"
            roughness={0.38}
            metalness={0.82}
            clearcoat={0.62}
            clearcoatRoughness={0.32}
            transmission={0}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.088, 48, 48]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.034} />
        </mesh>

        <mesh ref={atmosphere}>
          <sphereGeometry args={[2.18, 64, 64]} />
          <meshBasicMaterial color="#8cf7d2" wireframe transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <mesh ref={orbitA} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.22, 0.004, 10, 180]} />
          <meshBasicMaterial color="#d7f9ff" transparent opacity={0.3} />
        </mesh>
        <mesh ref={orbitB} rotation={[0.45, 0.2, 0.7]}>
          <torusGeometry args={[2.26, 0.003, 10, 180]} />
          <meshBasicMaterial color="#8cf7d2" transparent opacity={0.23} />
        </mesh>
        <mesh ref={orbitC} rotation={[0.18, -0.58, 0.2]}>
          <torusGeometry args={[2.38, 0.0025, 10, 180]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </mesh>

        {arcs.map((geometry, i) => (
          <line key={i}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial attach="material" color={i === 1 ? '#8cf7d2' : '#d7f9ff'} transparent opacity={0.15} />
          </line>
        ))}

        <Text
          position={[0, 0.02, 2.105]}
          fontSize={0.4}
          letterSpacing={0.16}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.18}
        >
          TN
        </Text>

        {globeNodes.map((node) => (
          <GlobeMarker
            key={node.label}
            node={node}
            active={activeNode?.label === node.label || hoverNode?.label === node.label}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
      </group>

      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        minDistance={6.4}
        maxDistance={7.4}
        rotateSpeed={0.52}
        zoomSpeed={0}
        dampingFactor={0.1}
        enableDamping
        autoRotate={!activeNode && !hoverNode}
        autoRotateSpeed={0.45}
      />
    </>
  )
}

function PortfolioGlobe() {
  const [activeNode, setActiveNode] = useState(null)
  const [hoverNode, setHoverNode] = useState(null)

  const selectNode = (node) => {
    setActiveNode(node)
    window.history.pushState(null, '', node.target)
    document.querySelector(node.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative h-[520px] w-[min(98vw,760px)] md:h-[680px]" data-cursor="hover">
      <div className="absolute inset-x-10 top-1/2 h-44 -translate-y-1/2 rounded-full bg-cyan-200/10 blur-[72px]" />
      <Canvas
        camera={{ position: [0, 0.14, 7.2], fov: 37 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <GlobeScene activeNode={activeNode} hoverNode={hoverNode} onSelect={selectNode} onHover={setHoverNode} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3.5 py-2 text-[9px] uppercase tracking-[0.24em] text-white/42 backdrop-blur">
        <Crosshair size={12} className="text-white/60" />
        {activeNode ? `Entering ${activeNode.label}` : hoverNode ? `${hoverNode.label} · click to enter` : 'Drag globe · hover nodes'}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-x-hidden px-6 pt-28 md:pt-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="absolute left-8 top-28 z-20 hidden font-mono-soft text-[9px] uppercase tracking-[0.4em] text-white/35 md:block"
      >
        <div>Portfolio // 2026</div>
        <div className="mt-0.5">bits goa // eee</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="absolute right-8 top-28 z-20 hidden text-right font-mono-soft text-[9px] uppercase tracking-[0.3em] text-white/30 md:block"
      >
        <div className="text-white/55">rotate the world</div>
        <div>click a node to enter</div>
      </motion.div>

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono-soft text-[10px] uppercase tracking-[0.28em] text-white/55"
          >
            <Sparkles size={12} className="text-[#8cf7d2]" />
            Software Engineer · BITS Pilani Goa
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.65rem,5.2vw,5.15rem)] font-light leading-[0.98] tracking-tight"
          >
            Hi, I&apos;m
            <span className="mt-2 block bg-gradient-to-br from-white via-white to-white/50 bg-clip-text font-medium text-transparent">
              Tushar Nandal
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/56 md:text-lg lg:mx-0"
          >
            I build real-time products, intelligent systems, and full-stack interfaces with a sharp focus on performance, clarity, and delightful interaction.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href="#contact" primary={false}>Get in Touch</MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 font-mono-soft text-[9px] uppercase tracking-[0.34em] text-white/25"
          >
            28.89°N 76.60°E · Rohtak · Currently @ Goa, India
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2"
        >
          <PortfolioGlobe />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/24"
      >
        <span className="font-mono-soft text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
