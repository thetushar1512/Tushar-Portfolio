'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, href = '#', className = '', primary = true }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35 })
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
      className={`relative inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-sm tracking-wider overflow-hidden group active:scale-95 transition-transform ${className}`}
    >
      {primary ? (
        <>
          <span className="absolute inset-0 rounded-full rainbow-ring" />
          <span className="absolute inset-[1.5px] rounded-full bg-black/85" />
          <span className="relative z-10 text-white">{children}</span>
        </>
      ) : (
        <>
          <span className="absolute inset-0 rounded-full rainbow-ring-reverse opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-[1.5px] rounded-full bg-black/85" />
          <span className="relative z-10 text-white/80 group-hover:text-white transition-colors">{children}</span>
        </>
      )}
    </motion.a>
  )
}
