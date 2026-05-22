'use client'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { ArrowDown, Sparkles } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 2.9 } }
}
const item = {
  hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22,1,0.36,1] } }
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl w-full text-center">
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/60">
          <Sparkles size={12} className="text-violet-300" />
          Software Engineer · BITS Pilani Goa
        </motion.div>

        <motion.h1 variants={item} className="font-display text-[clamp(2.4rem,8vw,6rem)] leading-[1.02] font-light tracking-tight text-balance">
          Hi, I'm <span className="relative inline-block">
            <span className="bg-gradient-to-br from-white via-violet-200 to-violet-500 bg-clip-text text-transparent font-medium glow-text">Tushar Nandal</span>
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
          </span>
        </motion.h1>

        <motion.p variants={item} className="mt-8 text-lg md:text-2xl text-white/60 font-light max-w-3xl mx-auto text-balance">
          I architect <span className="text-white">real-time, scalable</span> products at the intersection of
          <span className="text-violet-300"> full-stack engineering</span> and
          <span className="text-cyan-300"> intelligent systems</span>.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#projects">View Projects →</MagneticButton>
          <MagneticButton href="#contact" primary={false}>Get in Touch</MagneticButton>
        </motion.div>

        <motion.div variants={item} className="mt-24 flex flex-col items-center gap-2 text-white/30">
          <span className="font-mono-soft text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating side stats */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.4, duration: 0.8 }}
        className="hidden xl:flex flex-col gap-4 absolute left-10 top-1/2 -translate-y-1/2 font-mono-soft text-[10px] uppercase tracking-widest text-white/30 [writing-mode:vertical-rl] rotate-180"
      >
        <span>codeforces · manUNDERmaskk</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.4, duration: 0.8 }}
        className="hidden xl:flex flex-col gap-4 absolute right-10 top-1/2 -translate-y-1/2 font-mono-soft text-[10px] uppercase tracking-widest text-white/30 [writing-mode:vertical-rl]"
      >
        <span>est. 2024 · goa, india</span>
      </motion.div>
    </section>
  )
}
