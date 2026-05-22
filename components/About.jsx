'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code2, Briefcase, Trophy, AudioLines, Activity } from 'lucide-react'

const skills = {
  Languages: ['C++', 'C', 'JavaScript', 'Python', 'SQL'],
  'Web Dev': ['Next.js 16', 'React.js', 'Node.js', 'Express.js', 'Firebase'],
  Frontend: ['Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
  Databases: ['PostgreSQL', 'MongoDB', 'Firestore'],
  Tools: ['Git/GitHub', 'Socket.io', 'Turbopack', 'PWA'],
}

const timeline = [
  {
    icon: GraduationCap,
    year: '2024 — 2028',
    title: 'B.E. Electrical & Electronics Engineering',
    org: 'BITS Pilani — K.K. Birla Goa Campus',
    desc: 'Focusing on software development, machine learning, and hardware logic. Building full-stack code solutions and data-driven algorithms.'
  },
  {
    icon: Code2,
    year: '2024 — Present',
    title: 'Full-Stack Engineer · CampusEats',
    org: 'Founding Dev — Real-time PWA',
    desc: 'Architecting a real-time food-ordering PWA designed to serve 3,000+ students at BITS Goa. Currently in testing phase.'
  },
  {
    icon: Briefcase,
    year: '2024',
    title: 'Research · Sensor Fusion',
    org: 'Under Prof. Anirban Das, BITS Goa',
    desc: 'Built adaptive Kalman filter + fuzzy logic sensor selection over an MQTT/InfluxDB IoT pipeline.'
  },
  {
    icon: Activity,
    year: '2025',
    title: 'Smart Disaster Alert System',
    org: 'Academic Project — Object Oriented Programming (ECOM F213)',
    desc: 'Architected a multi-threaded capable alert engine using rigorous OOP principles. Features a fully custom decoupled pipeline: historical CSV data parsing via static nested data structures, custom exception boundary handling, real-time telemetry log writing, and mathematical probability mapping to evaluate four-tier severity thresholds (Low to Critical).'
  },
  {
    icon: AudioLines,
    year: '2025',
    title: 'DSP Music Genre Classifier',
    org: 'Independent Project — DSP / Signals & Systems',
    desc: 'Built a zero-ML music genre classifier using STFT + Hamming windows to extract timbre, brightness, and rhythmic volatility into a 3D feature space with deterministic fuzzy-logic vetoes.'
  },
  {
    icon: Trophy,
    year: 'Ongoing',
    title: 'Competitive Programming',
    org: 'Codeforces — manUNDERmaskk',
    desc: "Striver's A2Z DSA sheet. Focus on architectural efficiency & algorithmic depth."
  },
  {
    icon: GraduationCap,
    year: '2016 — 2024',
    title: 'Scholars Rosary Senior Secondary School',
    org: 'Rohtak, Haryana',
    desc: 'Foundation years — built early curiosity around code, systems, and product thinking.'
  },
]

function RotatingCore() {
  const ref = useRef()
  useFrame((s, d) => {
    if (!ref.current) return
    ref.current.rotation.x += d * 0.3
    ref.current.rotation.y += d * 0.4
  })
  return (
    <Float speed={1.3} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.1}
          metalness={0.85}
          emissive="#7c3aed"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  )
}

function TimelineItem({ item, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = item.icon
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
      className="relative pl-12 pb-10 last:pb-0"
    >
      <span className={`absolute left-0 top-1 grid place-items-center h-8 w-8 rounded-full border ${inView ? 'border-violet-400/70 bg-violet-500/15 shadow-[0_0_30px_-4px_#8b5cf6]' : 'border-white/15'} transition-all`}>
        <Icon size={14} className={inView ? 'text-violet-300' : 'text-white/40'} />
      </span>
      <span className="absolute left-4 top-9 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent" />
      <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">{item.year}</div>
      <h4 className="font-display text-lg md:text-xl text-white">{item.title}</h4>
      <div className="text-sm text-violet-300/80 mb-2">{item.org}</div>
      <p className="text-sm text-white/55 max-w-lg leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-violet-300/80 mb-3">01 · Identity</div>
          <h2 className="font-display text-4xl md:text-6xl font-light">About <span className="italic text-violet-300">me</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 sticky top-28"
          >
            <div className="relative aspect-square rounded-3xl glass overflow-hidden glow-ring">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
                <directionalLight position={[-5, -3, 3]} intensity={0.8} color="#22d3ee" />
                <RotatingCore />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
              </Canvas>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/50">
                <span>drag · interact</span>
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-violet-400 pulse-dot"/> avatar v0.1</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-display text-2xl text-white">3K+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Target Users</div>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-display text-2xl text-violet-300">15+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Technologies</div>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <div className="font-display text-2xl text-cyan-300">∞</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Curiosity</div>
              </div>
            </div>
          </motion.div>

          {/* Bio + Skills */}
          <div className="md:col-span-3 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-white/75 font-light">
                Dedicated software engineer with a strong foundation in <span className="text-white">C++</span> and <span className="text-white">JavaScript</span>. Proficient in the <span className="text-violet-300">MERN stack</span> (Next.js 16, React, Node.js) and <span className="text-violet-300">PostgreSQL</span>, with a proven track record of building scalable campus solutions.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/55">
                I'm the founding dev behind <span className="text-cyan-300">CampusEats</span> — a real-time food-ordering PWA designed to serve 3,000+ students at BITS Goa. Active competitive programmer on Codeforces (<span className="text-white/80">manUNDERmaskk</span>) with a focus on DSA and architectural efficiency. Member of <span className="text-white/80">DevSoc</span> & the <span className="text-white/80">Department of Propnights</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">// Technical arsenal</div>
              <div className="space-y-3">
                {Object.entries(skills).map(([cat, list]) => (
                  <div key={cat} className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-violet-300/80 font-mono-soft w-20">{cat}</span>
                    {list.map((s) => (
                      <span key={s} data-cursor="hover" className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.02] text-white/70 hover:border-violet-400/50 hover:text-white hover:bg-violet-500/10 transition">
                        {s}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="pt-6"
            >
              <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">// Journey</div>
              <div className="relative">
                {timeline.map((it, i) => (
                  <TimelineItem key={i} item={it} i={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
