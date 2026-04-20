# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Next.js with Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test suite is configured.

## Project Overview

Multi-page portfolio website for Georgian concert pianist Sandro Gegechkori. Built with **Next.js 16 App Router**, **TypeScript**, **CSS Modules**, and **react-icons**. The home page (`/`) renders all sections together. Each section also has its own standalone route via the `app/(sections)/` route group. An admin dashboard at `/admin` manages concert events stored in MongoDB.

---

## Content Management: `utils/data.ts`

**All static site content lives in a single `WEBSITE_DATA` export.** No CMS, database, or API — changes require editing this file directly.

### Data shape summary

| Key           | What it controls                                                                          |
| ------------- | ----------------------------------------------------------------------------------------- |
| `navigation`  | Array of nav link labels (lowercased = anchor IDs)                                        |
| `heroSection` | Occupation, name header, quote, CTA labels                                                |
| `biography`   | 4-paragraph bio array, highlights list, section header/subheader                          |
| `recognition` | Array of `{ year, name, des }` awards + closing quote/author                              |
| `stages`      | Array of `{ hall, city, country, img }` concert halls                                     |
| `media`       | Discography: album name, description, track list `{ index, music, time }`, streaming CTAs |
| `performance` | Array of `{ venue, city, year, piece, ctaLabel, ctaLink }` live performances              |
| `gallery`     | Array of `{ src, alt }` images                                                            |
| `schedule`    | Placeholder shape only — actual events come from MongoDB at runtime                       |
| `contact`     | `management { label, name, email }`, `socials { instagram, youtube, facebook }`           |
| `footer`      | Name, tagline, navigation links array `{ label, href }`                                   |

**Placeholder data that needs replacing:**
- The 6 tracks in `media.discContent.music` all repeat "Chopin — Ballade No. 1" — need real tracklist
- Streaming links in `media.discContent.ctas` and social links in `contact.socials` are all `"#"` placeholders

---

## Page Structure

`app/layout.tsx` loads Google Fonts (Cormorant Garamond, EB Garamond, Montserrat), applies CSS font variables, and renders `<Navigation />` and `<Footer />` around all pages.

### Home page (`app/page.tsx`)

Renders all sections together with `export const dynamic = "force-dynamic"`:
1. `Hero` — full-viewport background image, name, quote, two CTAs
2. `Biography` — two-column: text left, `about.jpg` right
3. `Recognition` — awards list + critic quote
4. `Stages` — grid of concert hall cards
5. `Media` — album art + tracklist (id=`"discography"`)
6. `Performance` — live performance list (id=`"performance"`)
7. `Gallery` — CSS grid of 6 images
8. `Schedule` — upcoming concert list, **fetched from MongoDB at request time**
9. `Contact` — management info with gold-accented agent block

### Standalone section pages (`app/(sections)/`)

Each section also has its own route via a `(sections)` route group:

| Route | Page file | Renders |
|-------|-----------|---------|
| `/hero` | `app/(sections)/hero/page.tsx` | `<Hero />` |
| `/biography` | `app/(sections)/biography/page.tsx` | `<Biography />` |
| `/recognition` | `app/(sections)/recognition/page.tsx` | `<Recognition />` |
| `/discography` | `app/(sections)/discography/page.tsx` | `<Media />` |
| `/performances` | `app/(sections)/performances/page.tsx` | `<Performance />` |
| `/gallery` | `app/(sections)/gallery/page.tsx` | `<Gallery />` |
| `/schedule` | `app/(sections)/schedule/page.tsx` | `<Schedule />` |
| `/contact` | `app/(sections)/contact/page.tsx` | `<Contact />` |
| `/stages` | `app/(sections)/stages/page.tsx` | `<Stages />` |

Each page imports and renders its corresponding section component. Pages that use dynamic data (e.g. `/schedule`) must export `dynamic = "force-dynamic"` to avoid stale caches.

---

## Architecture: Two Data Layers

### Static content
All bio, awards, stages, discography, performances, and gallery data lives in `utils/data.ts`. Server Components import `WEBSITE_DATA` directly — no API calls.

### Dynamic events (MongoDB)
Concert schedule events are stored in MongoDB and managed via the admin dashboard. The `Schedule` section is an `async` Server Component that calls `connectDB()` and queries the `Event` model directly (no HTTP fetch). Any page rendering this component must export `dynamic = "force-dynamic"` to ensure fresh data on every request (both `app/page.tsx` and `app/(sections)/schedule/page.tsx`).

---

## Sections (`sections/`)

Each section is a Server Component (no `"use client"`) except Navigation. Each has a co-located `*.module.css`.

### Section → id mapping (for anchor nav)

| Section file | `id` attribute  | Nav label      |
| ------------ | --------------- | -------------- |
| biography    | `biography`     | Biography      |
| recognition  | `recognition`   | Recognition    |
| stages       | `stages`        | Stages         |
| media        | `discography`   | Discography    |
| performance  | `performance`   | Performance    |
| gallery      | `gallery`       | Gallery        |
| schedule     | `schedule`      | Schedule       |
| contact      | `contact`       | Contact        |

**Navigation:** On the home page, nav items use hash-based anchors (`/#biography`, etc.) for smooth scrolling. Each section is also accessible as a standalone page (`/biography`, `/schedule`, etc.).

---

## Admin Dashboard (`app/admin/`)

- `/admin` → redirects to `/admin/events`
- `/admin/login` → login form, posts to `/api/auth/login`, stores JWT in `localStorage`
- `/admin/events` → full CRUD dashboard (JWT-protected, redirects to login if unauthenticated)

Admin pages are `"use client"` components. Auth state is held in `localStorage` as `admin_token`.

### API Routes

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/login` | POST | No | Validate hardcoded credentials, return JWT |
| `/api/public/events` | GET | No | All events (used by Schedule section via HTTP if needed) |
| `/api/admin/events` | GET | Bearer JWT | All events |
| `/api/admin/events` | POST | Bearer JWT | Create event |
| `/api/admin/events/[id]` | GET/PUT/DELETE | Bearer JWT | Single event operations |

### Event model fields (`models/Event.ts`)

`day` (Number), `month` (String), `year` (Number), `venue` (required), `city` (required), `country`, `piece`, `ticketUrl` (optional)

---

## Auth (`lib/auth.ts`, `app/api/auth/login/route.ts`)

Credentials are hardcoded in `route.ts` (username: `sandroGeg`). JWT is signed with `JWT_SECRET` env var, 7-day expiry. All protected routes call `requireAuth(req)` which extracts and verifies the `Authorization: Bearer <token>` header.

---

## Database (`lib/db.ts`)

`connectDB()` uses a global singleton cache to avoid multiple connections in serverless/hot-reload environments. Requires `DB` env var (MongoDB connection string).

---

## Styling System

### Global CSS (`app/globals.css`)

**CSS custom properties (dark theme):**
```css
--bg: #0a0a10          /* near-black background */
--secondary-bg: #111118
--card: #1a1a24
--accent: #c9a84c      /* gold — primary brand color */
--accent-effect: #e2c97e
--accent-spot: #5c1a2e /* burgundy */
--text: #f0ebe0        /* off-white body text */
--secondary-text: #a89f8c
```

**Rem baseline:** `html { font-size: 62.5% }` → `1rem = 10px`

**Typography:**
- `h1–h6`: Cormorant Garamond (`--font-headers`)
- `p`: EB Garamond (`--font-body`)
- UI/buttons/labels: Montserrat (`--font-ui`)

**Shared utility classes (use in section/component CSS modules):**
- `.section-header` — uppercase Montserrat label in gold, with a 2rem gold line via `::before`
- `.sectionSubheader` — large serif heading (6.4rem → responsive down to 2.8rem), `margin-top: 1.2rem`

**Default section padding:** `9.6rem 4.8rem` (vertical/horizontal), responsive down to `9.6rem 2rem` at 480px.

### Responsive breakpoints
- `1280px` — subheader font reduces
- `1024px` — subheader font reduces further
- `768px` — section/header padding reduces, mobile nav activates
- `480px` — maximum compression

---

## Environment Variables (`config.env`)

Loaded via `dotenv` in `next.config.ts`. Required variables:
- `DB` — MongoDB Atlas connection string
- `JWT_SECRET` — Secret for signing JWTs

---

## Navigation (`components/navigation/navigation.tsx`)

- `"use client"` — uses `useState` for mobile menu
- Clicking a nav link calls `e.preventDefault()` and uses `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })` — this ensures smooth scrolling works even when the hash is already set in the URL (browser default would do nothing on repeated clicks)

---

## Static Assets (`public/`)

| File | Used in |
|------|---------|
| `/hero.jpg` | Hero section background, gallery |
| `/about.jpg` | Biography section portrait |
| `/album.jpg` | Media section album art, gallery |
| `/concertgebouw.jpg` | Stages — Concertgebouw Amsterdam |
| `/mozarthaus.jpg` | Stages — Mozarthaus Vienna |
| `/hall2.jpg`–`/hall8.jpg` | Stages — other venues |

---

## Known TODOs

- Replace placeholder track listing in `media.discContent.music` with real tracklist
- Replace `"#"` placeholder URLs in `contact.socials` and `media.discContent.ctas` with real links
- Contact form was removed; management info is shown instead
