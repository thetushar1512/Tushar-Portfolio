'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,92%)]"
    >
      <div className={`glass rounded-full px-4 md:px-6 py-3 flex items-center justify-between transition-all ${scrolled ? 'bg-black/70' : ''}`}>
        <a href="#hero" data-cursor="hover" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center">
            <span className="text-black font-black text-sm">T</span>
            <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-md -z-10 group-hover:bg-violet-500/70 transition" />
          </div>
          <span className="font-display text-sm tracking-wider">tushar<span className="text-violet-400">.</span>dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <a key={i} href={l.href} data-cursor="hover" className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition group">
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition origin-left" />
            </a>
          ))}
        </nav>

        <a href="#contact" data-cursor="hover" className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-mono-soft border border-white/10 rounded-full hover:border-violet-400/60 hover:bg-violet-500/10 transition">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
          Available
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" data-cursor="hover">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass mt-2 rounded-2xl p-4 flex flex-col gap-2">
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-white/80 hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  )
}
