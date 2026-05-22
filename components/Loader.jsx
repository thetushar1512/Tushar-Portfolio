'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let v = 0
    const iv = setInterval(() => {
      v += Math.random() * 9 + 3
      if (v >= 100) { v = 100; clearInterval(iv); setTimeout(() => setDone(true), 350) }
      setProgress(Math.floor(v))
    }, 90)
    return () => clearInterval(iv)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative flex flex-col items-center">
            {/* Spinning rings */}
            <div className="relative h-40 w-40 mb-10">
              <motion.div
                className="absolute inset-0 rounded-full border border-violet-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_20px_#a855f7]" />
              </motion.div>
              <motion.div
                className="absolute inset-4 rounded-full border border-cyan-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_#22d3ee]" />
              </motion.div>
              <motion.div
                className="absolute inset-10 rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono-soft text-3xl font-light tracking-widest tabular-nums">{progress.toString().padStart(2,'0')}<span className="text-violet-400">%</span></span>
              </div>
            </div>
            <div className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-white/40">Initializing Experience</div>
            <div className="mt-4 h-px w-64 bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
