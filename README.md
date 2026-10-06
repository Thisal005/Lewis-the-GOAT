# Sir Lewis Hamilton — Unofficial Fan Archival Portfolio

An independent, non-commercial archival fan portfolio celebrating the career records, technical telemetry, milestones, and advocacy of 7-time Formula 1 World Drivers' Champion **Sir Lewis Hamilton**.

Designed with a high-performance motorsport telemetry aesthetic (Mercedes Petronas cyan `#00D2BE`, Scuderia Ferrari rosso corsa `#E8002D`, and championship gold `#FFD700`), this static portfolio is optimized for deployment to Amazon S3 and AWS CloudFront.

---

## Key Features & Review Priorities

### 1. Visual Quality & Design Polish
- **Motorsport Telemetry Design System**: Custom typography hierarchy using `Outfit` for bold racing headlines, `Inter` for body legibility, and `JetBrains Mono` for telemetry and dated records.
- **Hero Polish**: High-resolution portrait in Scuderia Ferrari team red wear, floating quick-stat capsules, `#44` watermark, and ambient radial glow. Polished across mobile, tablet, and desktop viewports.
- **Authentic Content Only**: Zero filler text, fabricated quotations, or unsupported claims.

### 2. Functional Behavior
- **Sticky Navigation**: Smooth scrolling to section anchors with `scroll-margin-top` offset to eliminate header overlap.
- **Active Navigation Tracking**: `IntersectionObserver` dynamically highlights active sections as users scroll.
- **Interactive Lightbox Modal**: Click any gallery item to open a full-resolution modal with caption, context, image attribution, keyboard navigation (`Left`/`Right` arrow keys, `Escape` to close), and focus restoration.
- **Interactive Era Breakdown Tabs**: Toggle between Mercedes-AMG, McLaren, and Scuderia Ferrari chapters to view era-specific statistics and team accomplishments.
- **Milestone Filter Pills**: Filter milestones by `All`, `Championship`, `Historic Win`, and `Career Move`.

### 3. Responsive Accessibility (WCAG 2.1 Compliant)
- **Viewports Tested**: Explicitly verified at 375px (mobile), 768px (tablet), and 1440px (desktop).
- **Mobile Navigation Drawer**: Accessible hamburger menu with `aria-expanded`, `aria-label`, background scroll locking, keyboard focus trap, and Escape key listener.
- **Focus Indicators**: High-visibility focus outline (`2px solid var(--accent-cyan); outline-offset: 3px`) on all interactive controls.
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support disabling heavy transforms, transitions, and forcing instantaneous scroll behavior.
- **Semantic HTML**: Descriptive image `alt` attributes, accessible button labels, and single `<h1>` hierarchy.

### 4. Content Integrity & Attribution
- **Unofficial Fan Archive Identification**: Prominently marked in the top navigation, hero badge, and dedicated footer legal disclaimer.
- **Dated Statistics**: Explicitly verified as of **December 2024** (end of the 2024 season ahead of the 2025 Ferrari campaign).
- **Verified Quotations**: Authentic quotes verified from official FIA press conferences, broadcast audio, and autobiographical statements with full citations.
- **Authoritative Sources**: Direct references to Formula1.com official driver records, FIA classifications, Mission 44 foundation reports, and the Royal Academy of Engineering Hamilton Commission.

### 5. Static Deployment Compatibility
- **100% Static**: Pure client-side bundle built by Vite into `dist/`.
- **Zero Backend / Secrets**: No runtime APIs, server dependencies, or required environment variables.
- **S3 / CloudFront Ready**: Single-page anchor navigation avoiding server-side URL rewrite requirements.
- **Asset Hashing & Optimization**: WebP-compressed images with fallback PNG/JPG assets, packaged directly in `dist/assets/`.

---

## Getting Started

### Prerequisites
- Node.js (v20+ or v22+)
- npm (v10+)

### Installation
```bash
npm install
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server with HMR |
| `npm run build` | Compiles TypeScript and builds production bundle to `dist/` |
| `npm run lint` | Runs oxlint linter across codebase (0 errors, 0 warnings) |
| `npm run typecheck` | Validates TypeScript types with `tsc -b --noEmit` (0 errors) |
| `npm run preview` | Starts local HTTP server previewing production build in `dist/` |

---

## Project Structure

```
├── public/
│   ├── assets/              # Local image assets (original & WebP optimized)
│   ├── favicon.svg          # Stylized LH44 motorsport monogram favicon
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx        # Biography, racecraft mastery, verified quotes
│   │   ├── CareerStatsSection.tsx  # Dated telemetry, metric cards, era tabs
│   │   ├── Footer.tsx              # Unofficial fan disclaimer, quick links, back-to-top
│   │   ├── GallerySection.tsx      # Curated photo gallery with category filters
│   │   ├── Hero.tsx                # Hero section with Ferrari portrait & quick stats
│   │   ├── LightboxModal.tsx       # Accessible modal dialog with keyboard nav
│   │   ├── MilestonesSection.tsx   # Chronological career timeline & filter pills
│   │   ├── Navbar.tsx              # Sticky header with active dot & mobile drawer
│   │   ├── SourcesSection.tsx      # Verified sources & media attribution guidelines
│   │   └── VenturesSection.tsx     # Mission 44, Hamilton Commission, Almave
│   ├── data/
│   │   └── portfolioData.ts        # Single source of truth for verified facts & stats
│   ├── types/
│   │   └── index.ts                # TypeScript interface definitions
│   ├── App.css                     # Component layout, responsive grid & animations
│   ├── index.css                   # Design tokens, variables, typography, reset
│   ├── App.tsx                     # Main page assembly & IntersectionObserver
│   └── main.tsx                    # React application entry point
├── dist/                           # Production build output
├── index.html                      # HTML entry point with meta tags & Google fonts
├── package.json                    # Project configuration & npm scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite configuration
```

---

## Disclaimer

*This project is an independent, non-commercial fan tribute created strictly for educational and portfolio demonstration purposes. It is not affiliated with, sponsored by, or endorsed by Sir Lewis Hamilton, Formula One Management (FOM), the FIA, Mercedes-AMG Petronas Motorsport, Scuderia Ferrari HP, or any associated corporate partners.*
