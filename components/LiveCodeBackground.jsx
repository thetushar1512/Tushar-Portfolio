'use client'
import { useEffect, useRef } from 'react'

const GLYPHS = ['.', ':', '-', '=', '+', '*']

export default function LiveCodeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!ctx) return

    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let cell = 18
    let cols = 0
    let rows = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      cell = width < 768 ? 16 : 20
      cols = Math.ceil(width / cell) + 8
      rows = Math.ceil(height / cell) + 8
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textBaseline = 'top'
      ctx.font = `${cell * 0.72}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
    }

    const draw = (time = 0) => {
      const t = reduceMotion.matches ? 0 : time * 0.00032
      const drift = reduceMotion.matches ? 0 : (time * 0.006) % cell

      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, width, height)

      for (let y = -4; y < rows; y += 1) {
        for (let x = -4; x < cols; x += 1) {
          const diagonal = Math.sin(x * 0.18 - y * 0.32 + t * 4.2)
          const longWave = Math.sin(x * 0.06 + y * 0.08 - t * 2.4)
          const band = Math.max(0, 1 - Math.abs(diagonal) * 2.1)
          const mist = Math.max(0, 1 - Math.abs(longWave) * 1.8)
          const value = Math.min(1, band * 0.58 + mist * 0.2)

          if (value < 0.16) continue

          const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(value * GLYPHS.length))]
          const alpha = 0.025 + value * 0.115
          ctx.fillStyle = `rgba(235, 235, 235, ${alpha})`
          ctx.fillText(glyph, x * cell - drift, y * cell + drift * 0.55)
        }
      }

      const veil = ctx.createRadialGradient(width * 0.5, height * 0.46, 0, width * 0.5, height * 0.46, Math.max(width, height) * 0.72)
      veil.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
      veil.addColorStop(0.5, 'rgba(0, 0, 0, 0.46)')
      veil.addColorStop(1, 'rgba(0, 0, 0, 0.92)')
      ctx.fillStyle = veil
      ctx.fillRect(0, 0, width, height)

      const topFade = ctx.createLinearGradient(0, 0, 0, height)
      topFade.addColorStop(0, 'rgba(0, 0, 0, 0.86)')
      topFade.addColorStop(0.22, 'rgba(0, 0, 0, 0.42)')
      topFade.addColorStop(0.58, 'rgba(0, 0, 0, 0.2)')
      topFade.addColorStop(1, 'rgba(0, 0, 0, 0.72)')
      ctx.fillStyle = topFade
      ctx.fillRect(0, 0, width, height)

      if (!reduceMotion.matches) frame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    if (!reduceMotion.matches) frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.12)_58%,rgba(0,0,0,0.72))]" />
    </div>
  )
}
