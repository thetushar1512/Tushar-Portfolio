'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, href = '#', className = '', primary = true }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const mx = e.clientX - r.left - r.width / 2
    const my = e.clientY - r.top - r.height / 2
    setPos({ x: mx * 0.35, y: my * 0.35 })
  }
  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      className={`relative inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-sm tracking-wider group ${className}`}
    >
      {primary ? (
        <>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-100" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 blur-xl opacity-50 group-hover:opacity-90 transition" />
          <span className="absolute inset-[1.5px] rounded-full bg-black/70" />
          <span className="relative z-10 text-white">{children}</span>
        </>
      ) : (
        <>
          <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-violet-400/60 transition" />
          <span className="relative z-10 text-white/90">{children}</span>
        </>
      )}
    </motion.a>
  )
}
