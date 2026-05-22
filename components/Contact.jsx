'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Instagram, Mail, Phone, MapPin, Send, Check } from 'lucide-react'

const socials = [
  { name: 'LinkedIn', icon: Linkedin, color: 'from-sky-400 to-blue-600', glow: 'shadow-[0_0_60px_-10px_#3b82f6]', href: 'https://www.linkedin.com/in/tushar-nandal-04668126b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { name: 'GitHub', icon: Github, color: 'from-zinc-400 to-zinc-700', glow: 'shadow-[0_0_60px_-10px_#ffffff80]', href: 'https://github.com/thetushar1512' },
  { name: 'Twitter', icon: Twitter, color: 'from-sky-300 to-cyan-500', glow: 'shadow-[0_0_60px_-10px_#22d3ee]', href: 'https://x.com/TushaRvK_18' },
  { name: 'Instagram', icon: Instagram, color: 'from-pink-500 via-rose-500 to-amber-400', glow: 'shadow-[0_0_60px_-10px_#ec4899]', href: 'https://www.instagram.com/the.tushaaar?igsh=anp6dnJjd2w2OHQ2' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok && data.ok) {
        setSent(true)
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setSent(false), 4000)
      } else {
        setErrorMessage(data.error || 'Something went wrong.')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Could not connect to the server. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="font-mono-soft text-[10px] uppercase tracking-[0.4em] text-violet-300/80 mb-3">03 · Connect</div>
          <h2 className="font-display text-4xl md:text-6xl font-light">Let's build <span className="italic text-violet-300">something</span></h2>
          <p className="mt-4 text-white/55 max-w-xl mx-auto">I'm open to internships, collaborations, and ambitious side-projects. Drop a message — I reply faster than my IDE compiles.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Social cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {socials.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  whileHover={{ y: -6, rotateX: 6, rotateY: -4, scale: 1.02 }}
                  className={`group relative aspect-square rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent p-5 flex flex-col justify-between transition-all hover:border-white/30 hover:${s.glow}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-3xl group-hover:opacity-60 transition`} />
                  <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center`}>
                    <Icon size={18} className="text-black" />
                  </div>
                  <div>
                    <div className="font-display text-lg">{s.name}</div>
                    <div className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40">@tushar</div>
                  </div>
                </motion.a>
              )
            })}

            <div className="col-span-2 glass rounded-3xl p-5 space-y-3">
              <a href="mailto:tushar.nandal678@gmail.com" data-cursor="hover" suppressHydrationWarning className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <Mail size={15} className="text-violet-300" /> <span suppressHydrationWarning>tushar.nandal678@gmail.com</span>
              </a>
              <a href="tel:+917206191512" data-cursor="hover" suppressHydrationWarning className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <Phone size={15} className="text-violet-300" /> +91 72061 91512
              </a>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={15} className="text-violet-300" /> Goa, India · Open to remote
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass rounded-3xl p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 block">Your name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 focus:border-violet-400 focus:outline-none transition placeholder:text-white/20"
                  placeholder="e.g. Ada Lovelace"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 focus:border-violet-400 focus:outline-none transition placeholder:text-white/20"
                  placeholder="hello@yourdomain.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono-soft text-[10px] uppercase tracking-[0.3em] text-white/40 block">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 focus:border-violet-400 focus:outline-none resize-none transition placeholder:text-white/20"
                placeholder="Tell me about your idea, role, or project…"
              />
            </div>

            {errorMessage && (
              <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono-soft">Avg. reply · 24h</div>
              <button
                type="submit"
                disabled={loading || sent}
                data-cursor="hover"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden disabled:opacity-60 transition active:scale-95"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 blur-xl opacity-50" />
                <span className="absolute inset-[1.5px] rounded-full bg-black/70" />
                <span className="relative z-10 inline-flex items-center gap-2 text-sm text-white font-medium">
                  {sent ? (
                    <>
                      <Check size={14} className="text-emerald-400" /> Sent!
                    </>
                  ) : loading ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}