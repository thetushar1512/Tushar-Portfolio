'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false })

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simulate asset load
    const t = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white noise">
      {loading && <Loader onDone={() => setLoading(false)} />}

      {/* Background 3D Particle Field */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Subtle grid backdrop */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-0" />

      <CustomCursor />
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

export default App
