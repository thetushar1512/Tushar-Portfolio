'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function QuantumCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)

  // Configure distinct physics tiers to generate natural structural lag/momentum
  const springConfig1 = { stiffness: 400, damping: 28, mass: 0.2 }
  const springConfig2 = { stiffness: 200, damping: 22, mass: 0.5 }
  const springConfig3 = { stiffness: 100, damping: 15, mass: 0.9 }

  const x1 = useSpring(mouseX, springConfig1)
  const y1 = useSpring(mouseY, springConfig1)
  const x2 = useSpring(mouseX, springConfig2)
  const y2 = useSpring(mouseY, springConfig2)
  const x3 = useSpring(mouseX, springConfig3)
  const y3 = useSpring(mouseY, springConfig3)

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const el = e.target
      if (el && el.closest && el.closest('[data-cursor="hover"], a, button, input, textarea')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Node 1: Precise Singularity Core */}
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"
        style={{ x: x1, y: y1, translateX: '-50%', translateY: '-50%' }}
      />

      {/* Node 2: Cyber Orbit Ring (Splits on hover) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{ x: x2, y: y2, translateX: '-50%', translateY: '-50%' }}
      >
        <div 
          className={`absolute border border-purple-500/40 rounded-full transition-all duration-500 ease-out flex items-center justify-center ${
            hovering ? 'h-16 w-16 rotate-180 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'h-6 w-6'
          }`}
        >
          {/* Geometrical Satellite ticks */}
          <div className="absolute -top-1 h-2 w-[2px] bg-white" />
          <div className="absolute -bottom-1 h-2 w-[2px] bg-white" />
        </div>
      </motion.div>

      {/* Node 3: Kinetic Trailing Shards */}
      {[0, 90, 180, 270].map((angle, index) => (
        <motion.div
          key={index}
          className="absolute top-0 left-0 transition-all duration-300"
          style={{ x: x3, y: y3, translateX: '-50%', translateY: '-50%' }}
        >
          <div
            className={`w-1 bg-gradient-to-b from-purple-500 to-transparent transition-all duration-500 rounded-full ${
              hovering ? 'h-6 opacity-80' : 'h-2 opacity-30'
            }`}
            style={{
              transform: `rotate(${angle}deg) translateY(${hovering ? '-32px' : '-12px'})`,
            }}
          />
        </motion.div>
      ))}

      {/* Node 4: Ambient Dynamic Spotlight */}
      <motion.div
        className="absolute top-0 left-0 rounded-full mix-blend-screen pointer-events-none filter blur-xl opacity-20 transition-all duration-500"
        style={{ x: x2, y: y2, translateX: '-50%', translateY: '-50%' }}
      >
        <div className={`rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-500 ${hovering ? 'h-32 w-32 opacity-40' : 'h-12 w-12'}`} />
      </motion.div>
    </div>
  )
}