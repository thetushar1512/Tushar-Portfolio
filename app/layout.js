import { Inter, Space_Grotesk, Syncopate } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })
const syncopate = Syncopate({ subsets: ['latin'], weight: ['400','700'], variable: '--font-syncopate', display: 'swap' })

export const metadata = {
  title: 'Tushar Nandal — Software Engineer & Full-Stack Developer',
  description: 'Premium 3D interactive portfolio of Tushar Nandal — full-stack engineer crafting scalable real-time products. BITS Pilani, Goa.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${syncopate.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-violet-500/40 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
