'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Github, ExternalLink, Cpu, Zap, Globe, AudioLines, ShieldAlert } from 'lucide-react'

const projects = [
  {
    title: 'CampusEats',
    sub: 'Real-time Quick-Commerce PWA',
    domain: 'Full-Stack',
    icon: Zap,
    accent: 'from-violet-500 to-fuchsia-500',
    desc: 'Architected a Progressive Web App streamlining food ordering for 3,000+ students at BITS Goa. Live multi-order tracking via Firestore snapshot listeners. Merchant dashboard with sound alerts & automated payment workflows.',
    tech: ['Next.js 16', 'Firebase', 'Firestore', 'Tailwind', 'Turbopack', 'PWA'],
    github: 'https://github.com/ayush-ranjan15/Disaster-alert-system',
    live: 'https://campus-eats-app.vercel.app',
    highlights: ['3,000+ target users', 'iOS + Android PWA', 'Real-time tracking'],
  },
  
  {
    title: 'Multi-Sensor Fusion',
    sub: 'Adaptive Kalman + Fuzzy Logic',
    domain: 'AI / IoT',
    icon: Cpu,
    accent: 'from-cyan-400 to-blue-500',
    desc: 'Built under Prof. Anirban Das. Fuzzy-logic-based dynamic sensor selection + adaptive Kalman filter fusing 4 heterogeneous temperature sensors. MQTT-based IoT pipeline with dockerised InfluxDB backend.',
    tech: ['Python', 'MQTT', 'InfluxDB', 'Docker', 'Kalman', 'Fuzzy Logic'],
    github: 'https://github.com/thetushar1512/Iot_database_system',
    live: 'https://github.com/thetushar1512/Iot_database_system',
    highlights: ['Process variance 0.001', 'Auto failover', 'Real-time dashboard'],
  },
  {
    title: 'DSP Music Genre Classifier',
    sub: 'Non-ML Audio Intelligence Pipeline',
    domain: 'Digital Signal Processing',
    icon: AudioLines,
    accent: 'from-blue-600 to-red-600',
    desc: 'Developed a deterministic audio analysis pipeline that maps music into a geometric feature space. Extracts spectral centroids, zero-crossing rates, and spectral flux using Fourier Transforms (STFT) with Hamming windows to accurately isolate genre traits without relying on neural networks.',
    tech: ['Python 3', 'Librosa', 'NumPy', 'Matplotlib', 'Signals & Systems'],
    github: 'https://github.com/thetushar1512/Music-Genre-Detector-DSP',
    live: '',
    highlights: ['Pure Mathematics & Logic', 'Deterministic Signal Boundaries', 'Visual Analysis Dashboard'],
  },
  {
    title: 'Smart Disaster Alert System',
    sub: 'ECOM F213 — Object Oriented Programming',
    domain: 'Software Architecture',
    icon: ShieldAlert,
    accent: 'from-teal-500 to-emerald-400',
    desc: 'A production-grade, role-based disaster forecasting and alerting engine built from scratch in pure Java, utilizing deterministic mathematical modeling to process multi-source environmental telemetry.',
    tech: ['Java', 'OOP', 'I/O Streams', 'Software Design Patterns'],
    github: 'https://github.com/thetushar1512/Smart-Disaster-Alert-System',
    live: '',
    highlights: ['4 Disaster Simulation Models', 'Role-Based Access Control', 'Custom Probability Engine'],
  },
  {
    title: 'Codeforces Grind',
    sub: 'manUNDERmaskk — DSA Mastery',
    domain: 'Algorithms',
    icon: Globe,
    accent: 'from-amber-400 to-rose-500',
    desc: "Active competitive programmer on Codeforces with a focus on Striver's A2Z DSA sheet — solving problems centred on data-structures, graph algorithms, and architectural efficiency.",
    tech: ['C++', 'DSA', 'Codeforces', 'Algorithms'],
    github: 'https://codeforces.com/profile/manUNDERmaskk',
    live: 'https://codeforces.com/profile/manUNDERmaskk',
    highlights: ['Daily problems', 'Graph + DP focus', 'Striver A2Z'],
  },
]

const filters = ['All', 'Full-Stack', 'AI / IoT', 'DSP / Signals & Systems', 'Software Architecture', 'Algorithms']

export default function Projects() {
  const [active, setActive] = useState('All')
  const list = active === 'All' ? projects : projects.filter((p) => p.domain === active)

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-violet-300/80 mb-3">02 · Selected work</div>
            <h2 className="font-display text-4xl md:text-6xl font-light">Projects <span className="italic text-violet-300">showcase</span></h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-cursor="hover"
                className={`px-4 py-2 text-xs font-mono-soft uppercase tracking-widest rounded-full border transition ${active === f ? 'bg-violet-500/15 text-white border-violet-400/60 shadow-[0_0_30px_-8px_#8b5cf6]' : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22,1,0.36,1] }}
                >
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    glareEnable
                    glareMaxOpacity={0.18}
                    glareColor="#a78bfa"
                    glarePosition="all"
                    transitionSpeed={1500}
                    className="h-full"
                  >
                    <div data-cursor="hover" className="group relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 md:p-8 overflow-hidden">
                      {/* Decorative grad */}
                      <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl group-hover:opacity-40 transition`} />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
                        <div className="absolute inset-0 rounded-3xl border border-violet-400/40 shadow-[0_0_60px_-15px_#8b5cf6]" />
                      </div>

                      <div className="relative flex items-start justify-between mb-6">
                        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${p.accent} grid place-items-center shadow-lg`}>
                          <Icon size={20} className="text-black" />
                        </div>
                        <span className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40">{p.domain}</span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-light">{p.title}</h3>
                      <div className="text-sm text-violet-300/80 mt-1">{p.sub}</div>

                      <p className="mt-4 text-sm text-white/55 leading-relaxed">{p.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[10px] uppercase tracking-widest rounded-full border border-white/10 text-white/60">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {p.highlights.map((h) => (
                          <div key={h} className="text-[10px] text-center text-white/45 border border-white/5 rounded-lg py-2 px-1 bg-white/[0.02]">
                            {h}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <div className="flex items-center gap-2">
                          <a href={p.github} target="_blank" rel="noreferrer" data-cursor="hover" className="h-9 w-9 grid place-items-center rounded-full border border-white/10 hover:bg-white hover:text-black transition">
                            <Github size={15} />
                          </a>
                          <a href={p.live} target="_blank" rel="noreferrer" data-cursor="hover" className="h-9 w-9 grid place-items-center rounded-full border border-white/10 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition">
                            <ExternalLink size={15} />
                          </a>
                        </div>
                        <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/30">0{i+1} / 0{projects.length}</div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
