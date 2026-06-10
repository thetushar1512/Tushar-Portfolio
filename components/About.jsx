'use client'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
// useInView still used in TimelineItem
import { GraduationCap, Code2, Briefcase, Trophy, AudioLines, Activity } from 'lucide-react'

const skills = {
  Languages: ['C++', 'C', 'JavaScript', 'Python', 'SQL'],
  'Web Dev':  ['Next.js 16', 'React.js', 'Node.js', 'Express.js', 'Firebase'],
  Frontend:   ['Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
  Databases:  ['PostgreSQL', 'MongoDB', 'Firestore'],
  Tools:      ['Git/GitHub', 'Socket.io', 'Turbopack', 'PWA'],
}

const timeline = [
  {
    icon: GraduationCap,
    year: '2024 — 2028',
    title: 'B.E. Electrical & Electronics Engineering',
    org: 'BITS Pilani — K.K. Birla Goa Campus',
    desc: 'Focusing on software development, machine learning, and hardware logic. Building full-stack code solutions and data-driven algorithms.',
  },
  {
    icon: Code2,
    year: '2024 — Present',
    title: 'Full-Stack Engineer · CampusEats',
    org: 'Founding Dev — Real-time PWA',
    desc: 'Architecting a real-time food-ordering PWA designed to serve 3,000+ students at BITS Goa. Currently in testing phase.',
  },
  {
    icon: Briefcase,
    year: '2024',
    title: 'Research · Sensor Fusion',
    org: 'Under Prof. Anirban Das, BITS Goa',
    desc: 'Built adaptive Kalman filter + fuzzy logic sensor selection over an MQTT/InfluxDB IoT pipeline.',
  },
  {
    icon: Activity,
    year: '2025',
    title: 'Smart Disaster Alert System',
    org: 'Academic Project — OOP (ECOM F213)',
    desc: 'Architected a multi-threaded alert engine using rigorous OOP principles with custom exception handling, real-time telemetry logging, and four-tier severity thresholds.',
  },
  {
    icon: AudioLines,
    year: '2025',
    title: 'DSP Music Genre Classifier',
    org: 'Independent Project — DSP / Signals & Systems',
    desc: 'Built a zero-ML genre classifier using STFT + Hamming windows to extract timbre, brightness, and rhythmic volatility into a 3D feature space with deterministic fuzzy-logic vetoes.',
  },
  {
    icon: GraduationCap,
    year: '2016 — 2024',
    title: 'Scholars Rosary Senior Secondary School',
    org: 'Rohtak, Haryana',
    desc: 'Foundation years — built early curiosity around code, systems, and product thinking.',
  },
]

function TimelineItem({ item, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const active = useInView(ref, { margin: '-42% 0px -42% 0px' })
  const Icon = item.icon
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pb-12 pl-14 transition duration-500 last:pb-0 ${active ? 'opacity-100' : 'opacity-[0.62]'}`}
    >
      <span
        className={`absolute left-0 top-1 z-10 grid h-8 w-8 place-items-center rounded-full border bg-black transition duration-500 ${
          active
            ? 'border-white/70 shadow-[0_0_26px_rgba(140,247,210,0.32),0_0_44px_rgba(120,120,255,0.18)]'
            : inView
              ? 'border-white/30'
              : 'border-white/10'
        }`}
      >
        <Icon size={14} className={active ? 'text-white' : inView ? 'text-white/[0.78]' : 'text-white/30'} />
      </span>
      <div
        className={`rounded-2xl border p-4 transition duration-500 ${
          active
            ? 'border-white/[0.13] bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.22)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className={`mb-1 font-mono-soft text-[10px] uppercase tracking-[0.3em] transition ${active ? 'text-[#8cf7d2]/80' : 'text-white/35'}`}>
          {item.year}
        </div>
        <h4 className={`font-display text-lg transition md:text-xl ${active ? 'text-white' : 'text-white/86'}`}>{item.title}</h4>
        <div className={`mb-2 text-sm transition ${active ? 'text-white/66' : 'text-white/48'}`}>{item.org}</div>
        <p className={`max-w-lg text-sm leading-relaxed transition ${active ? 'text-white/62' : 'text-white/42'}`}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

function TimelineList() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 24, mass: 0.35 })
  const beadTop = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 top-4 bottom-4 w-px bg-white/[0.09]" />
      <motion.div
        className="absolute left-4 top-4 w-px origin-top bg-gradient-to-b from-[#ff4ecd] via-[#8cf7d2] to-[#7a7cff] shadow-[0_0_18px_rgba(140,247,210,0.46)]"
        style={{ bottom: 16, scaleY: progress }}
      />
      <motion.div
        className="absolute left-4 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg,#ff4ecd,#ffd166,#8cf7d2,#7a7cff,#ff4ecd)] shadow-[0_0_20px_rgba(140,247,210,0.85),0_0_44px_rgba(122,124,255,0.42)]"
        style={{ top: beadTop }}
      >
        <span className="absolute inset-[5px] rounded-full bg-white" />
        <span className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(140,247,210,0.28),transparent_62%)]" />
      </motion.div>

      {timeline.map((it, i) => (
        <TimelineItem key={i} item={it} i={i} />
      ))}
    </div>
  )
}

const VP = { once: false, amount: 0.3 }

function ProfileImage() {
  return (
    <div className="flex justify-center mb-14">
      <div className="relative">

        {/* Outer green glow ring */}
        <motion.div
          className="absolute -inset-2 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.85, 0.15] }}
          viewport={VP}
          transition={{ duration: 1.6, times: [0, 0.3, 1] }}
          style={{ boxShadow: '0 0 55px 10px rgba(140,247,210,0.5)' }}
        />

        {/* Circle */}
        <div className="h-80 w-80 md:h-[480px] md:w-[480px] overflow-hidden rounded-full border-2 border-white/20 ring-4 ring-white/[0.06] relative">
          <motion.img
            src="/profile.jpg?v=3"
            alt="Tushar Nandal"
            className="h-full w-full object-cover"
            style={{ transformOrigin: '17% 28%', objectPosition: '60% 28%' }}
            initial={{ scale: 1.65, filter: 'blur(22px) brightness(0.05)' }}
            whileInView={{ scale: 1.3, filter: 'blur(0px) brightness(1)' }}
            viewport={VP}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <span className="absolute bottom-6 right-6 h-5 w-5 rounded-full bg-emerald-400 border-2 border-black" style={{ boxShadow: '0 0 12px rgba(52,211,153,0.85)' }} />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-32">
      <div className="mx-auto max-w-3xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-3 font-mono-soft text-[10px] uppercase tracking-[0.34em] text-white/35">01 · Identity</div>
          <h2 className="font-display text-4xl font-light text-white md:text-6xl">About <span className="italic text-white/80">me</span></h2>
        </motion.div>

        {/* Profile image — scroll-triggered render animation */}
        <ProfileImage />


        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-lg font-light leading-relaxed text-white/72 md:text-xl">
            Dedicated software engineer with a strong foundation in <span className="text-white">C++</span> and{' '}
            <span className="text-white">JavaScript</span>. Proficient in the{' '}
            <span className="text-white">MERN stack</span> (Next.js 16, React, Node.js) and{' '}
            <span className="text-white">PostgreSQL</span>, with a proven track record of building scalable campus solutions.
          </p>
          <p className="mt-5 text-base leading-relaxed text-white/48">
            I'm the founding dev behind <span className="text-white/80">CampusEats</span> — a real-time food-ordering PWA designed to serve 3,000+ students at BITS Goa.{' '}
            Member of <span className="text-white/80">DevSoc</span> &amp; the{' '}
            <span className="text-white/80">Department of Propnights</span>.
          </p>
        </motion.div>

        {/* Technical skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14"
        >
          <div className="mb-5 font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/32">// Technical arsenal</div>
          <div className="space-y-4">
            {Object.entries(skills).map(([cat, list]) => (
              <div key={cat} className="grid gap-2 sm:grid-cols-[118px_1fr] sm:items-center">
                <span className="font-mono-soft text-[10px] uppercase tracking-[0.22em] text-white/36">{cat}</span>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <span
                      key={s}
                      data-cursor="hover"
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-white/50 transition hover:border-[#8cf7d2]/40 hover:bg-[#8cf7d2]/[0.06] hover:text-white/[0.88] cursor-pointer"
                    >
                      {s}
                    </span>
                  ))}
                </div>
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
        >
          <div className="mb-6 font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/32">// Journey</div>
          <TimelineList />
        </motion.div>

      </div>
    </section>
  )
}
