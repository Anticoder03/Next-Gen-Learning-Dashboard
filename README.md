# 🚀 NexusLearn — Student Learning Dashboard

A futuristic, highly animated student learning dashboard built with Next.js, Supabase, Framer Motion, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)

---

## ✨ Features

- **Bento Grid Layout** — A visually striking dashboard with tiles of different sizes
- **Dark Mode Only** — Deep background tones with glowing gradient accents
- **Live Data from Supabase** — Courses fetched using Server Components (RSC)
- **Buttery-Smooth Animations** — Powered by Framer Motion with spring physics
- **Zero Layout Shifts** — All animations use `transform` and `opacity` exclusively
- **Responsive Design** — Desktop (full sidebar), Tablet (icon-only), Mobile (bottom nav)
- **Skeleton Loaders** — Pulsing loading states via `<Suspense>` boundaries
- **Semantic HTML** — No div soup; uses `<nav>`, `<main>`, `<article>`, `<section>`

---

## 🏗️ Architecture

### Server/Client Component Split

The architecture follows Next.js App Router best practices, keeping data fetching on the server and interactivity on the client:

| Component | Type | Purpose |
|---|---|---|
| `layout.tsx` | **Server** | Static shell with sidebar + main layout |
| `page.tsx` | **Server** | Orchestrates tiles, wraps CourseGrid in Suspense |
| `CourseGrid` | **Server** | Fetches course data from Supabase |
| `Sidebar` | **Client** | Collapsible navigation with layoutId animations |
| `HeroTile` | **Client** | Animated greeting with streak counter |
| `CourseTile` | **Client** | Hover effects, animated progress bars |
| `ActivityTile` | **Client** | Contribution graph with staggered cell entrance |
| `StatsTile` | **Client** | Animated stat counters |

### Why this split?

- **Server Components** (`CourseGrid`, `page.tsx`, `layout.tsx`): Handle data fetching securely on the server. The Supabase query runs server-side, keeping the anon key usage secure and eliminating client-side fetch waterfalls.
- **Client Components** (all interactive tiles): Need `"use client"` because they use Framer Motion hooks (`useInView`, `motion.*`), React state, and browser event handlers.

### Data Flow

```
Supabase PostgreSQL
    ↓ (server-side query via @supabase/ssr)
CourseGrid (Server Component)
    ↓ (passes data as props)
CourseTile (Client Component — animates with Framer Motion)
```

---

## 🛠️ Setup

### Prerequisites

- Node.js 18+ and npm
- A free [Supabase](https://supabase.com) account

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd internsala-proj-1
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com/dashboard)
2. Open the **SQL Editor** in your Supabase dashboard
3. Paste and run the contents of `supabase-setup.sql`
4. Copy your project URL and anon key from **Settings → API**

### 3. Configure Environment

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css         # Design system & dark theme
│   ├── layout.tsx          # Root layout (Server)
│   ├── page.tsx            # Dashboard page (Server)
│   └── loading.tsx         # Full-page skeleton loader
├── components/
│   ├── sidebar/
│   │   ├── Sidebar.tsx     # Collapsible nav (Client)
│   │   ├── SidebarItem.tsx # Nav item with layoutId (Client)
│   │   └── BottomNav.tsx   # Mobile bottom nav (Client)
│   ├── dashboard/
│   │   ├── BentoGrid.tsx   # Staggered animation orchestrator (Client)
│   │   ├── HeroTile.tsx    # Welcome greeting (Client)
│   │   ├── CourseTile.tsx  # Course card with progress (Client)
│   │   ├── CourseGrid.tsx  # Data fetcher (Server)
│   │   ├── ActivityTile.tsx # Activity graph (Client)
│   │   ├── StatsTile.tsx   # Quick stats (Client)
│   │   └── ErrorState.tsx  # Error display (Client)
│   └── skeletons/
│       └── CourseCardSkeleton.tsx # Pulsing skeleton (Client)
└── lib/
    ├── supabase/
    │   ├── server.ts       # Server Supabase client
    │   └── client.ts       # Browser Supabase client
    ├── types.ts            # TypeScript interfaces
    └── icons.ts            # Dynamic icon resolver
```

---

## 🎨 Animation Details

| Animation | Technique | Physics |
|---|---|---|
| Tile entrance | `staggerChildren: 0.08`, `y: 30→0` | Spring (200, 24) |
| Card hover | `scale: 1→1.02` | Spring (300, 20) |
| Progress bar | `scaleX: 0→value` | Custom ease, 1.2s |
| Sidebar highlight | `layoutId` shared animation | Spring (300, 20) |
| Skeleton pulse | `opacity: 0.3→0.6` loop | EaseInOut, 1.8s |
| Activity cells | Staggered `opacity + scale` | Delay wave effect |

> All animations use **only `transform` and `opacity`** — zero layout shifts, fully GPU-accelerated.

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## 🧩 Challenges & Solutions

1. **Server/Client boundary**: Framer Motion requires client-side hooks. Solution: Keep data fetching in Server Components (`CourseGrid`) and pass data down to Client Components (`CourseTile`) as props.

2. **Dynamic icons from DB**: The `icon_name` field stores a string. Solution: Created an icon resolver (`lib/icons.ts`) that maps strings to Lucide components with a fallback.

3. **Zero layout shifts**: Hover scales could cause reflows. Solution: Used `will-change-transform` and exclusively `transform`/`opacity` for all animations.

4. **Responsive sidebar**: Needs to be full on desktop, icons on tablet, bottom nav on mobile. Solution: Three-tier responsive approach with Tailwind breakpoints and a separate `BottomNav` component.

---

## 📝 License

MIT
