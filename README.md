# Tushar Nandal — 3D Interactive Portfolio

A premium, OLED-black, 3D interactive resume website built with **Next.js 14**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

![Preview](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Three Fiber](https://img.shields.io/badge/R3F-8.x-8b5cf6?style=flat-square)
![Framer](https://img.shields.io/badge/Framer%20Motion-11-pink?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square&logo=tailwindcss)

## ✨ Features

- **Cinematic Loader** with animated percentage + concentric rotating rings
- **Custom Magnetic Cursor** that morphs over interactive elements
- **3D Particle Field + Wireframe Globe** background (R3F + drei) with mouse parallax
- **Glassmorphism Navbar** with scroll states and availability indicator
- **Hero** with staggered Framer Motion text reveals + magnetic glowing CTAs
- **About** with an interactive 3D distorted icosahedron avatar (drag to rotate), categorized skills, and a glowing scroll-activated timeline
- **Projects Showcase** with parallax tilt cards, glare effects, and domain filtering
- **Connect Hub** — premium social cards (LinkedIn, GitHub, Twitter, Instagram) with brand-glow on hover
- **Functional Contact Form** → MongoDB via `/api/contact`

## 📦 Tech Stack

| Layer        | Tech                                                       |
|--------------|------------------------------------------------------------|
| Framework    | Next.js 14 (App Router)                                    |
| 3D           | three.js, @react-three/fiber, @react-three/drei            |
| Animation    | framer-motion, react-parallax-tilt                         |
| Styling      | Tailwind CSS, custom CSS tokens                            |
| Icons        | lucide-react                                               |
| Backend      | Next.js API routes                                         |
| Database     | MongoDB                                                    |

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/tushar-portfolio.git
cd tushar-portfolio
yarn install --ignore-engines
# or
npm install --legacy-peer-deps
```

> `--ignore-engines` is needed because some R3F sub-deps declare newer Node versions; the app runs fine on Node 18/20.

### 2. Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

If you don’t want MongoDB locally, the contact form will throw on submit — but every other section works without a DB.

### 3. Run

```bash
yarn dev
# open http://localhost:3000
```

## 📁 Project Structure

```
.
├── app/
│   ├── api/[[...path]]/route.js   # catch-all API — /api/contact, /api/contacts
│   ├── globals.css                # tailwind + custom tokens
│   ├── layout.js                  # fonts + root layout
│   └── page.js                    # main composition
├── components/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── CustomCursor.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Loader.jsx
│   ├── MagneticButton.jsx
│   ├── Navbar.jsx
│   ├── ParticleField.jsx
│   └── Projects.jsx
├── .env.example
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## 🎨 Customization Cheatsheet

| What                | Where                                                |
|---------------------|------------------------------------------------------|
| Name / tagline      | `components/Hero.jsx`                                |
| Bio                 | `components/About.jsx` → first `<p>` blocks          |
| Skills              | `components/About.jsx` → `skills` object             |
| Timeline            | `components/About.jsx` → `timeline` array            |
| Projects            | `components/Projects.jsx` → `projects` array         |
| Social URLs         | `components/Contact.jsx` → `socials` array           |
| Email / phone       | `components/Contact.jsx` → bottom of socials column  |
| Brand colors        | search `violet-500`, `cyan-400`, `fuchsia-500`       |
| Loader duration     | `app/page.js` → `setTimeout(..., 2600)`              |
| 3D background       | `components/ParticleField.jsx`                       |
| 3D avatar           | `components/About.jsx` → `RotatingCore`              |

## 🌐 Deploy to Vercel

```bash
vercel
```

Add `MONGO_URL` and `DB_NAME` as environment variables in the Vercel dashboard. That’s it.

## 📜 License

MIT · Crafted with Three.js, Framer & a lot of coffee.
