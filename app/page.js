'use client'
import { useEffect, useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LiveCodeBackground from '@/components/LiveCodeBackground'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always start at top — clears any hash left by globe node navigation
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)

    const t = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white noise">
      {loading && <Loader onDone={() => setLoading(false)} />}

      {/* Live Code Background */}
      <LiveCodeBackground />

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
