'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-white/30"
        >
          © {new Date().getFullYear()} Tushar Nandal · Crafted with Three.js, Framer & a lot of coffee.
        </motion.div>
        <div className="flex items-center gap-2 text-[10px] font-mono-soft uppercase tracking-[0.4em] text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
          all systems online
        </div>
      </div>
    </footer>
  )
}
