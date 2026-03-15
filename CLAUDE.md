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

Single-page portfolio website for Georgian concert pianist Sandro Gegechkori. Built with **Next.js 16 App Router**, **TypeScript**, **CSS Modules**, and **react-icons**. The entire page uses hash-based anchor navigation — no routing.

---

## Content Management: `utils/data.ts`

**All site content lives in a single `WEBSITE_DATA` export.** This is the only place to change text, images, links, events, awards, etc. No CMS, database, or API.

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
| `schedule`    | Array of `{ day, month, year, venue, city, country, piece }` upcoming events              |
| `contact`     | `management { label, name, email }`, `socials { instagram, youtube, facebook }`           |
| `footer`      | Name, tagline, navigation links array `{ label, href }`                                   |

**Navigation anchor mapping:** Nav items are lowercased to generate hrefs (`"Biography"` → `#biography`). Section IDs must match this pattern. Current IDs: `#biography`, `#recognition`, `#stages`, `#discography` (media section), `#media` (performance section — note the mismatch), `#gallery`, `#schedule`, `#contact`.

**Important placeholder data:** The 6 tracks in `media.discContent.music` all repeat "Chopin — Ballade No. 1 in G minor, Op. 23" — these need to be replaced with the real tracklist. Streaming links in `media.discContent.ctas` and social links in `contact.socials` are all `"#"` placeholders.

---

## Page Structure

`app/layout.tsx` wraps everything:

```
<Navigation />   ← sticky header, "use client" for hamburger toggle
{children}       ← app/page.tsx
<Footer />       ← also rendered inside page.tsx (double-rendered — see below)
```

> **Note:** `Footer` is imported in both `app/layout.tsx` and `app/page.tsx`. This results in two footers rendering. Likely a bug.

`app/page.tsx` renders sections in this order:

1. `Hero` — full-viewport background image, name, quote, two CTAs
2. `Biography` — two-column: text left, `about.jpg` right
3. `Recognition` — awards list + critic quote
4. `Stages` — grid of concert hall cards
5. `Media` — album art + tracklist (id=`"discography"`)
6. `Performance` — live performance list (id=`"media"`) ← id mismatch with nav
7. `Gallery` — CSS grid of 6 images
8. `Schedule` — upcoming concert list
9. `Contact` — left: management info; right: contact form (static, no submission handler)

---

## Sections (`sections/`)

Each section:

- Is a Server Component (no `"use client"`) except Navigation
- Imports `WEBSITE_DATA` directly
- Has a co-located `*.module.css` file
- Has a section `id` for anchor navigation

### Section → Component relationships

| Section       | Child component                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `recognition` | `RecognitionContainer` — renders `{ year, name, des }`                                                                 |
| `stages`      | `StagesContainer` — renders `{ img, name, city, country }` with `next/image` at 1000×1000                              |
| `media`       | `SongList` — renders `{ index, song, duration }` row                                                                   |
| `performance` | `PerformanceItem` — renders `{ venue, city, year, piece, ctaLabel, ctaLink }`                                          |
| `schedule`    | `ScheduleItem` — renders `{ day, month, year, venue, city, country, piece }` with hardcoded "Inquire" CTA link (`"#"`) |
| `gallery`     | Inline `next/image` with `fill`, CSS grid classes `item1`–`item6` for layout                                           |

---

## Components (`components/`)

All are pure presentational Server Components (props-in, JSX-out) except `Navigation`.

### `Navigation` (`components/navigation/navigation.tsx`)

- `"use client"` — uses `useState` for mobile menu open/closed
- Logo: `SG` text link to `#`
- Nav links: `WEBSITE_DATA.navigation` lowercased as hash hrefs
- Hamburger: three `<span>` elements, toggled via `.hamburgerOpen` CSS class
- Clicking a nav link closes the menu (`setIsOpen(false)`)

### `StagesContainer`

Props: `img`, `name`, `city`, `country`. Uses `next/image` with explicit `width={1000} height={1000}`.

### `RecognitionContainer`

Props: `year` (number), `name`, `des`. Simple year + name/description layout.

### `ScheduleItem`

Props: `day`, `month`, `year`, `venue`, `city`, `country`, `piece`. The "Inquire" CTA button links to hardcoded `"#"`.

### `PerformanceItem`

Props: `venue`, `city`, `year`, `piece`, `ctaLabel`, `ctaLink`. Renders venue name, `city · year | piece` meta line, and a CTA link.

### `SongList`

Props: `index` (roman numeral string), `song`, `duration`. Renders one track row.

---

## Styling System

### Global CSS (`app/globals.css`)

**CSS custom properties (dark theme):**

```css
--bg: #0a0a10 /* near-black background */ --secondary-bg: #111118
  --card: #1a1a24 --accent: #c9a84c /* gold — primary brand color */
  --accent-effect: #e2c97e /* lighter gold for hover/glow */
  --accent-spot: #5c1a2e /* burgundy for spot accents */ --text: #f0ebe0
  /* off-white body text */ --highlight: #ffffff --secondary-text: #a89f8c
  /* muted gray */;
```

**Rem baseline:** `html { font-size: 62.5% }` → `1rem = 10px`

**Typography assignment:**

- `h1–h6`: `var(--font-headers)` (Cormorant Garamond), weight 400
- `p`: `var(--font-body)` (EB Garamond)
- `body` default / UI elements: `var(--font-ui)` (Montserrat)

**Shared utility classes (use these in section/component CSS modules):**

- `.section-header` — uppercase Montserrat label in `--accent` gold, with a 2rem gold line via `::before`
- `.sectionSubheader` — large serif heading (6.4rem → responsive down to 2.8rem)

**Default section padding:** `9.6rem 4.8rem` (vertical/horizontal), responsive down to `9.6rem 2rem` at 480px.

### Responsive breakpoints

- `1280px` — subheader font reduces
- `1024px` — subheader font reduces further
- `768px` — section/header padding reduces, mobile nav activates
- `480px` — maximum compression

### CSS Modules

Each section and component has its own `*.module.css`. All class names are locally scoped. No global class sharing between modules except the utility classes defined in `globals.css`.

---

## Fonts

Loaded via `next/font/google` in `app/layout.tsx` and applied as CSS variables on `<body>`:

| Variable         | Font               | Usage                                        |
| ---------------- | ------------------ | -------------------------------------------- |
| `--font-headers` | Cormorant Garamond | All `h1`–`h6` elements                       |
| `--font-body`    | EB Garamond        | All `p` elements                             |
| `--font-ui`      | Montserrat         | Body default, UI elements, `.section-header` |

---

## Icons

From `react-icons`:

- `react-icons/go` — `GoTriangleRight` (hero secondary CTA arrow)
- `react-icons/md` — `MdOpenInNew`, `MdArrowOutward` (media/contact links)
- `react-icons/fi` — `FiInstagram`, `FiYoutube`, `FiFacebook` (footer + contact)

---

## Static Assets (`public/`)

| File                      | Used in                          |
| ------------------------- | -------------------------------- |
| `/hero.jpg`               | Hero section background, gallery |
| `/about.jpg`              | Biography section portrait       |
| `/album.jpg`              | Media section album art, gallery |
| `/concertgebouw.jpg`      | Stages — Concertgebouw Amsterdam |
| `/mozarthaus.jpg`         | Stages — Mozarthaus Vienna       |
| `/hall2.jpg`–`/hall8.jpg` | Stages — other venues            |

---

## Known Bugs

- `Footer` is imported in both `app/layout.tsx` and `app/page.tsx`, causing it to render twice
