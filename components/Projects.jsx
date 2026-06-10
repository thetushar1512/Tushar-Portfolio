'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Cpu, Zap, Globe, AudioLines, ShieldAlert } from 'lucide-react'

const projects = [
  {
    title: 'CampusEats',
    sub: 'Real-time Quick-Commerce PWA',
    domain: 'Full-Stack',
    icon: Zap,
    accent: 'from-white to-emerald-200',
    desc: 'Architected a Progressive Web App streamlining food ordering for 3,000+ students at BITS Goa. Live multi-order tracking via Firestore snapshot listeners. Merchant dashboard with sound alerts & automated payment workflows.',
    tech: ['Next.js 16', 'Firebase', 'Firestore', 'Tailwind', 'Turbopack', 'PWA'],
    github: 'https://github.com/Ayush15-code/Bits-eateries-ordering-app',
    live: 'https://campus-eats-app.vercel.app',
    highlights: ['3,000+ target users', 'iOS + Android PWA', 'Real-time tracking'],
  },
  
  {
    title: 'Multi-Sensor Fusion',
    sub: 'Adaptive Kalman + Fuzzy Logic',
    domain: 'AI / IoT',
    icon: Cpu,
    accent: 'from-cyan-100 to-slate-400',
    desc: 'Built under Prof. Anirban Das. Fuzzy-logic-based dynamic sensor selection + adaptive Kalman filter fusing 4 heterogeneous temperature sensors. MQTT-based IoT pipeline with dockerised InfluxDB backend.',
    tech: ['Python', 'MQTT', 'InfluxDB', 'Docker', 'Kalman', 'Fuzzy Logic'],
    github: 'https://github.com/thetushar1512/Iot_database_system',
    live: 'https://github.com/thetushar1512/Iot_database_system',
    highlights: ['Process variance 0.001', 'Auto failover', 'Real-time dashboard'],
  },
  {
    title: 'DSP Music Genre Classifier',
    sub: 'Non-ML Audio Intelligence Pipeline',
    domain: 'DSP / Signals & Systems',
    icon: AudioLines,
    accent: 'from-slate-200 to-indigo-300',
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
    accent: 'from-emerald-100 to-teal-300',
    desc: 'A production-grade, role-based disaster forecasting and alerting engine built from scratch in pure Java, utilizing deterministic mathematical modeling to process multi-source environmental telemetry.',
    tech: ['Java', 'OOP', 'I/O Streams', 'Software Design Patterns'],
    github: 'https://github.com/thetushar1512/Smart-Disaster-Alert-System',
    live: '',
    highlights: ['4 Disaster Simulation Models', 'Role-Based Access Control', 'Custom Probability Engine'],
  },
  // {
  //   title: 'Codeforces Grind',
  //   sub: 'manUNDERmaskk — DSA Mastery',
  //   domain: 'Algorithms',
  //   icon: Globe,
  //   accent: 'from-zinc-100 to-zinc-500',
  //   desc: "Active competitive programmer on Codeforces with a focus on Striver's A2Z DSA sheet — solving problems centred on data-structures, graph algorithms, and architectural efficiency.",
  //   tech: ['C++', 'DSA', 'Codeforces', 'Algorithms'],
  //   github: 'https://codeforces.com/profile/manUNDERmaskk',
  //   live: 'https://codeforces.com/profile/manUNDERmaskk',
  //   highlights: ['Daily problems', 'Graph + DP focus', 'Striver A2Z'],
  // },
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
            <div className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">02 · Selected work</div>
            <h2 className="font-display text-4xl md:text-6xl font-light rainbow-hover">Projects <span className="italic">showcase</span></h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-cursor="hover"
                className={`px-4 py-2 text-xs font-mono-soft uppercase tracking-widest rounded-full border transition rainbow-glow-hover ${active === f ? 'bg-white/5 text-white border-white/20' : 'border-white/8 text-white/45 hover:text-white hover:border-white/20'}`}
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
                  <motion.article
                    data-cursor="hover"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className="group color-hover-card relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.18)] md:p-8"
                  >
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 mb-6 flex items-start justify-between">
                      <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.accent} shadow-[0_16px_40px_rgba(0,0,0,0.24)] transition duration-300 group-hover:scale-[1.04]`}>
                        <Icon size={20} className="text-black" />
                      </div>
                      <span className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/36 transition group-hover:text-white/52">{p.domain}</span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-display text-2xl font-light text-white/92 transition group-hover:text-white md:text-3xl">{p.title}</h3>
                      <div className="mt-1 text-sm text-white/48">{p.sub}</div>

                      <p className="mt-4 text-sm leading-relaxed text-white/54 transition group-hover:text-white/62">{p.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/54 transition group-hover:border-white/[0.14] group-hover:text-white/68">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {p.highlights.map((h) => (
                          <div key={h} className="rounded-lg border border-white/[0.06] bg-white/[0.018] px-1 py-2 text-center text-[10px] text-white/42 transition group-hover:border-white/[0.1] group-hover:text-white/55">
                            {h}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                        <div className="flex items-center gap-2">
                          <a href={p.github} target="_blank" rel="noreferrer" data-cursor="hover" className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.09] text-white/68 transition hover:border-white/30 hover:bg-white hover:text-black">
                            <Github size={15} />
                          </a>
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer" data-cursor="hover" className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.09] text-white/68 transition hover:border-white/30 hover:bg-white hover:text-black">
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                        <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/28 transition group-hover:text-white/42">0{i+1} / 0{projects.length}</div>
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
