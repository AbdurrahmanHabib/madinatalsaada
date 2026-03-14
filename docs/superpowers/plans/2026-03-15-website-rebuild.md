# Madinat Al Saada Website — Complete Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a world-class static website for Madinat Al Saada Aluminium & Glass Works LLC that outclasses international competitors in design, performance, SEO, and accessibility.

**Architecture:** Pure static HTML/CSS/JS site. No frameworks, no build tools, no dependencies. 8 English pages + 8 Arabic RTL pages. Shared CSS design system with page-specific stylesheets. Vanilla JS under 5KB total. All images optimized to WebP. Semantic HTML5 with JSON-LD structured data. Contact form via Web3Forms (free, no backend needed). Hosted on cPanel with Cloudflare CDN.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, clamp, logical properties), Vanilla JS, Web3Forms API, Google Fonts (Inter), SVG icons (hand-crafted), WebP images.

**Design Reference:** Uncodixify principles — no glassmorphism, no pill shapes, no decorative gradients, max 6px border-radius, subtle shadows (`0 1px 3px rgba(0,0,0,0.08)`), 150ms ease transitions, Linear/Stripe aesthetic. Swiss-inspired grid, 8pt spacing, modular type scale.

**Company Info:**
- Full name: Madinat Al Saada Aluminium & Glass Works LLC
- Founded: 2016 (10 years experience as of 2026)
- Location: Amman Street, Industrial Area 1, Ajman, UAE
- Phone: +971 6 526 0556
- Email: info@madinatalsaada.ae
- Services: Curtain walls, ACP cladding, skylights, doors & windows, glass balustrades, automatic doors, rolling shutters
- Role: B2B subcontractor (fabrication + installation only)
- Partners: National Aluminium LLC, Al Qassim Aluminium & Glass, Innovo Group, Prime Metal Industries LLC
- Brands: Technal, Schuco, Reynaers, AluK, Guttmann
- Certifications: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018
- Leadership: Mohammad Sharif Pishdad (Managing Partner, 36+ yrs), Habibullah (General Managing Partner, 25+ yrs)
- Equipment: 15 specialized machines (Emmegi, Phantomatic CNC, Fomindustrie, etc.)
- Projects: 17+ completed, 3 ongoing across Dubai, Abu Dhabi, Sharjah, Ajman

---

## File Structure

```
madinatalsaada/
├── index.html                    # Homepage (EN)
├── about.html                    # About page (EN)
├── services.html                 # Services page (EN)
├── projects.html                 # Projects portfolio (EN)
├── equipment.html                # Equipment & machinery (EN)
├── technical.html                # Technical specs & brands (EN)
├── contact.html                  # Contact + working form (EN)
├── faq.html                      # FAQ page (EN)
├── ar/
│   ├── index.html                # Homepage (AR)
│   ├── about.html                # About page (AR)
│   ├── services.html             # Services page (AR)
│   ├── projects.html             # Projects (AR)
│   ├── equipment.html            # Equipment (AR)
│   ├── technical.html            # Technical (AR)
│   ├── contact.html              # Contact (AR)
│   └── faq.html                  # FAQ (AR)
├── css/
│   ├── reset.css                 # Modern CSS reset (normalize + box-sizing)
│   ├── tokens.css                # Design tokens (colors, spacing, typography, shadows)
│   ├── base.css                  # Base element styles (body, headings, links, images)
│   ├── layout.css                # Grid system, container, sections, responsive
│   ├── components.css            # Navbar, cards, buttons, forms, footer, FAQ accordion
│   ├── pages.css                 # Page-specific styles (hero, projects grid, etc.)
│   └── rtl.css                   # RTL overrides for Arabic (CSS logical properties)
├── js/
│   └── main.js                   # Single JS file (<5KB): mobile menu, FAQ, scroll, form
├── img/
│   ├── logo.webp                 # Compressed logo (<30KB)
│   ├── logo.png                  # PNG fallback
│   ├── og-image.jpg              # Open Graph social image (1200x630)
│   ├── projects/                 # Project images (WebP, multiple sizes)
│   │   ├── aykon-800.webp
│   │   ├── aykon-400.webp
│   │   ├── marinashores-800.webp
│   │   ├── marinashores-400.webp
│   │   └── ... (all 17 projects)
│   └── hero/
│       └── factory.webp          # Hero background image
├── robots.txt                    # Crawl directives
├── sitemap.xml                   # XML sitemap for all 16 pages
├── manifest.json                 # PWA manifest (optional, for mobile)
├── .htaccess                     # Cache headers, gzip, security headers (cPanel)
└── 404.html                      # Custom 404 page
```

**Design decisions:**
- Pages moved to root level (not `/pages/`) for cleaner URLs and SEO
- CSS split into 7 focused files vs 1 monolith (cacheable, maintainable)
- Images reorganized into `img/` with WebP format and responsive sizes
- Arabic pages mirror English structure under `/ar/`
- Single JS file handles all interactivity

---

## Chunk 1: Foundation — CSS Design System + Reset + Base

### Task 1: CSS Reset

**Files:**
- Create: `css/reset.css`

- [ ] **Step 1: Write modern CSS reset**

```css
/* Modern CSS Reset — based on Josh Comeau's reset + Andy Bell's improvements */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

a {
  color: inherit;
  text-decoration-skip-ink: auto;
}

ul,
ol {
  list-style: none;
}

table {
  border-collapse: collapse;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/reset.css
git commit -m "feat: add modern CSS reset"
```

---

### Task 2: Design Tokens

**Files:**
- Create: `css/tokens.css`

- [ ] **Step 1: Write design token system**

All values derived from 8pt grid. Typography uses modular scale (1.25 ratio). Colors are navy + neutrals only (Uncodixify compliant — no decorative colors). Shadows are subtle (max 8px blur).

```css
:root {
  /* === Colors === */
  --color-navy: #1a3a5c;
  --color-navy-light: #264d73;
  --color-navy-dark: #0f2840;
  --color-white: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-accent: #4a90a4;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;

  /* === Typography === */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */

  --leading-tight: 1.2;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* === Spacing (8pt grid) === */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* === Layout === */
  --container-max: 1200px;
  --container-narrow: 800px;
  --container-wide: 1400px;
  --navbar-height: 72px;

  /* === Borders === */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;    /* MAX per Uncodixify */
  --radius-full: 9999px;
  --border-thin: 1px solid var(--color-gray-200);
  --border-medium: 2px solid var(--color-gray-200);

  /* === Shadows (subtle only — Uncodixify) === */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.08);

  /* === Transitions (fast, no bounce — Uncodixify) === */
  --transition-fast: 100ms ease;
  --transition-base: 150ms ease;
  --transition-slow: 250ms ease;

  /* === Z-index scale === */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/tokens.css
git commit -m "feat: add design token system (colors, typography, spacing, shadows)"
```

---

### Task 3: Base Styles

**Files:**
- Create: `css/base.css`

- [ ] **Step 1: Write base element styles**

```css
/* === Body === */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  color: var(--color-gray-700);
  background-color: var(--color-white);
  line-height: var(--leading-normal);
}

/* === Typography === */
h1, h2, h3, h4 {
  color: var(--color-gray-900);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
}

h1 {
  font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(var(--text-xl), 3vw, var(--text-2xl));
}

h4 {
  font-size: var(--text-lg);
}

p {
  max-width: 65ch;
  margin-block-end: var(--space-4);
}

p:last-child {
  margin-block-end: 0;
}

a {
  color: var(--color-navy);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent);
}

a:focus-visible {
  outline: 2px solid var(--color-navy);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

strong {
  font-weight: var(--weight-semibold);
}

small {
  font-size: var(--text-sm);
}

/* === Images === */
img {
  border-radius: var(--radius-md);
}

/* === Selection === */
::selection {
  background-color: var(--color-navy);
  color: var(--color-white);
}

/* === Scrollbar (subtle) === */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-gray-300);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-400);
}

/* === Skip Link (Accessibility) === */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-navy);
  color: var(--color-white);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-md);
  z-index: var(--z-toast);
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: var(--space-4);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/base.css
git commit -m "feat: add base element styles with accessibility skip link"
```

---

### Task 4: Layout System

**Files:**
- Create: `css/layout.css`

- [ ] **Step 1: Write layout system**

Container, sections, grid utilities, responsive breakpoints. Mobile-first. Uses CSS logical properties for RTL compatibility.

```css
/* === Container === */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-5);
}

.container--narrow {
  max-width: var(--container-narrow);
}

.container--wide {
  max-width: var(--container-wide);
}

/* === Sections === */
.section {
  padding-block: var(--space-20);
}

.section--sm {
  padding-block: var(--space-12);
}

.section--lg {
  padding-block: var(--space-24);
}

.section--alt {
  background-color: var(--color-gray-50);
}

.section--dark {
  background-color: var(--color-navy-dark);
  color: var(--color-white);
}

.section--dark h2,
.section--dark h3,
.section--dark h4 {
  color: var(--color-white);
}

.section--dark p {
  color: rgba(255, 255, 255, 0.75);
}

/* === Section Header === */
.section__header {
  text-align: center;
  max-width: var(--container-narrow);
  margin-inline: auto;
  margin-block-end: var(--space-12);
}

.section__label {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-navy);
  margin-block-end: var(--space-3);
}

.section--dark .section__label {
  color: var(--color-accent);
}

.section__header h2 {
  margin-block-end: var(--space-4);
}

.section__header p {
  margin-inline: auto;
  color: var(--color-gray-500);
  font-size: var(--text-lg);
}

/* === Grid === */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--2 { grid-template-columns: 1fr; }
.grid--3 { grid-template-columns: 1fr; }
.grid--4 { grid-template-columns: 1fr; }

@media (min-width: 640px) {
  .grid--2 { grid-template-columns: repeat(2, 1fr); }
  .grid--4 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .grid--3 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid--3 { grid-template-columns: repeat(3, 1fr); }
  .grid--4 { grid-template-columns: repeat(4, 1fr); }
}

/* === Flex Utilities === */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* === Spacing === */
.mt-4 { margin-block-start: var(--space-4); }
.mt-8 { margin-block-start: var(--space-8); }
.mt-12 { margin-block-start: var(--space-12); }
.mb-4 { margin-block-end: var(--space-4); }
.mb-8 { margin-block-end: var(--space-8); }
.text-center { text-align: center; }

/* === Visually Hidden (Accessibility) === */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/layout.css
git commit -m "feat: add layout system with grid, container, section, flex utilities"
```

---

### Task 5: Components CSS

**Files:**
- Create: `css/components.css`

- [ ] **Step 1: Write component styles**

Navbar, buttons, cards, forms, footer, FAQ accordion, badges, stats, WhatsApp button. All Uncodixify-compliant.

```css
/* ============================================
   NAVBAR
   ============================================ */
.navbar {
  position: fixed;
  inset-inline: 0;
  top: 0;
  height: var(--navbar-height);
  background: var(--color-white);
  border-block-end: var(--border-thin);
  z-index: var(--z-sticky);
  transition: box-shadow var(--transition-base);
}

.navbar.is-scrolled {
  box-shadow: var(--shadow-sm);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.navbar__brand img {
  height: 40px;
  width: auto;
  border-radius: 0;
}

.navbar__brand span {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-gray-900);
  display: none;
}

@media (min-width: 1024px) {
  .navbar__brand span {
    display: block;
  }
}

.navbar__menu {
  display: none;
  gap: var(--space-1);
}

@media (min-width: 1024px) {
  .navbar__menu {
    display: flex;
  }
}

.navbar__menu a {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-gray-600);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.navbar__menu a:hover,
.navbar__menu a[aria-current="page"] {
  color: var(--color-gray-900);
  background: var(--color-gray-100);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Mobile Toggle */
.navbar__toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .navbar__toggle {
    display: none;
  }
}

.navbar__toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-gray-900);
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.navbar__toggle[aria-expanded="true"] span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__toggle[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle[aria-expanded="true"] span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.navbar__mobile {
  display: none;
  position: fixed;
  top: var(--navbar-height);
  inset-inline: 0;
  background: var(--color-white);
  border-block-end: var(--border-thin);
  padding: var(--space-4);
  z-index: var(--z-dropdown);
}

.navbar__mobile.is-open {
  display: block;
}

.navbar__mobile a {
  display: block;
  padding: var(--space-3) 0;
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-gray-700);
  border-block-end: var(--border-thin);
}

.navbar__mobile a:last-child {
  border-block-end: none;
}

.navbar__mobile a:hover {
  color: var(--color-navy);
}

/* Language Switch */
.lang-switch {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-gray-600);
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.lang-switch:hover {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}

/* ============================================
   BUTTONS
   ============================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
  white-space: nowrap;
}

.btn:focus-visible {
  outline: 2px solid var(--color-navy);
  outline-offset: 2px;
}

.btn--primary {
  background: var(--color-navy);
  color: var(--color-white);
  border-color: var(--color-navy);
}

.btn--primary:hover {
  background: var(--color-navy-light);
  border-color: var(--color-navy-light);
  color: var(--color-white);
}

.btn--secondary {
  background: var(--color-white);
  color: var(--color-navy);
  border-color: var(--color-gray-300);
}

.btn--secondary:hover {
  background: var(--color-gray-50);
  border-color: var(--color-navy);
}

.btn--outline-white {
  background: transparent;
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn--outline-white:hover {
  background: var(--color-white);
  color: var(--color-navy);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn--full {
  width: 100%;
}

/* ============================================
   CARDS
   ============================================ */
.card {
  background: var(--color-white);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.card:hover {
  border-color: var(--color-gray-300);
  box-shadow: var(--shadow-md);
}

.card__img {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: transform var(--transition-slow);
}

.card:hover .card__img img {
  transform: scale(1.03);
}

.card__body {
  padding: var(--space-6);
}

.card__body h3 {
  font-size: var(--text-lg);
  margin-block-end: var(--space-2);
}

.card__body p {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}

/* Icon Card (Services) */
.icon-card {
  padding: var(--space-8) var(--space-6);
  text-align: center;
}

.icon-card__icon {
  width: 48px;
  height: 48px;
  margin-inline: auto;
  margin-block-end: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  border-radius: var(--radius-lg);
  color: var(--color-navy);
}

.card:hover .icon-card__icon {
  background: var(--color-navy);
  color: var(--color-white);
}

.icon-card h3 {
  font-size: var(--text-base);
  margin-block-end: var(--space-2);
}

.icon-card p {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-inline: auto;
}

/* ============================================
   STATS
   ============================================ */
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat {
  text-align: center;
  padding: var(--space-6) var(--space-4);
}

.stat__number {
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  line-height: 1;
  margin-block-end: var(--space-2);
}

.section--dark .stat__number {
  color: var(--color-white);
}

.stat__label {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  font-weight: var(--weight-medium);
}

.section--dark .stat__label {
  color: rgba(255, 255, 255, 0.6);
}

/* ============================================
   FORMS
   ============================================ */
.form-group {
  margin-block-end: var(--space-5);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-gray-700);
  margin-block-end: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  background: var(--color-white);
  border: var(--border-thin);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);
}

.form-input::placeholder {
  color: var(--color-gray-400);
}

textarea.form-input {
  min-height: 140px;
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
.faq-item {
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  margin-block-end: var(--space-3);
  overflow: hidden;
}

.faq-item__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  background: var(--color-white);
  border: none;
  cursor: pointer;
  text-align: start;
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--color-gray-900);
  transition: background var(--transition-fast);
}

.faq-item__question:hover {
  background: var(--color-gray-50);
}

.faq-item__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-gray-400);
  transition: transform var(--transition-base);
}

.faq-item[open] .faq-item__icon {
  transform: rotate(180deg);
}

.faq-item__answer {
  padding: 0 var(--space-6) var(--space-6);
  color: var(--color-gray-600);
  line-height: var(--leading-relaxed);
  font-size: var(--text-sm);
}

/* ============================================
   FOOTER
   ============================================ */
.footer {
  background: var(--color-gray-900);
  padding-block-start: var(--space-16);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
  padding-block-end: var(--space-12);
  border-block-end: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

.footer__brand p {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--text-sm);
  margin-block-end: var(--space-6);
  max-width: 280px;
}

.footer__brand img {
  height: 48px;
  margin-block-end: var(--space-5);
  border-radius: 0;
}

.footer h4 {
  color: var(--color-white);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-block-end: var(--space-5);
}

.footer__links a {
  display: block;
  padding-block: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
  transition: color var(--transition-fast);
}

.footer__links a:hover {
  color: var(--color-white);
}

.footer__contact li {
  display: flex;
  gap: var(--space-3);
  margin-block-end: var(--space-4);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
}

.footer__contact svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-block-start: 2px;
  color: var(--color-gray-400);
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
  text-align: center;
  padding-block: var(--space-6);
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer__bottom p {
  color: rgba(255, 255, 255, 0.4);
  font-size: var(--text-xs);
  margin: 0;
}

/* ============================================
   WHATSAPP BUTTON
   ============================================ */
.whatsapp-float {
  position: fixed;
  inset-block-end: var(--space-6);
  inset-inline-end: var(--space-6);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25d366;
  border-radius: var(--radius-full);
  color: var(--color-white);
  box-shadow: 0 2px 12px rgba(37, 211, 102, 0.3);
  z-index: var(--z-dropdown);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.whatsapp-float:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  color: var(--color-white);
}

.whatsapp-float svg {
  width: 26px;
  height: 26px;
}

/* ============================================
   BREADCRUMB
   ============================================ */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  margin-block-end: var(--space-4);
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb a:hover {
  color: var(--color-white);
}

.breadcrumb__sep {
  color: rgba(255, 255, 255, 0.3);
}

.breadcrumb__current {
  color: rgba(255, 255, 255, 0.9);
}

/* ============================================
   PAGE HERO (inner pages)
   ============================================ */
.page-hero {
  padding-block-start: calc(var(--navbar-height) + var(--space-16));
  padding-block-end: var(--space-16);
  background: var(--color-navy-dark);
  color: var(--color-white);
}

.page-hero h1 {
  color: var(--color-white);
  margin-block-end: var(--space-3);
}

.page-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-lg);
  max-width: 600px;
}

/* ============================================
   PROJECT CARDS (portfolio)
   ============================================ */
.project-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: transform var(--transition-slow);
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-6);
}

.project-card__overlay h3 {
  color: var(--color-white);
  font-size: var(--text-lg);
  margin-block-end: var(--space-1);
}

.project-card__overlay p {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-sm);
  margin: 0;
}

/* ============================================
   BADGE
   ============================================ */
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
}

.badge--navy {
  background: var(--color-navy);
  color: var(--color-white);
}

.badge--accent {
  background: var(--color-accent);
  color: var(--color-white);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/components.css
git commit -m "feat: add component styles (navbar, buttons, cards, forms, footer, FAQ)"
```

---

### Task 6: Page-Specific Styles

**Files:**
- Create: `css/pages.css`

- [ ] **Step 1: Write page-specific styles**

Homepage hero, services layout, equipment cards, contact form, technical comparison cards, certification cards, partners grid, process timeline.

(This file contains styles for homepage hero with split layout, service detail alternating grid, equipment card icon sections, contact page grid, system comparison cards, brand cards, leader cards, download section, map container, and CTA sections.)

- [ ] **Step 2: Commit**

```bash
git add css/pages.css
git commit -m "feat: add page-specific styles (hero, services, projects, contact)"
```

---

### Task 7: RTL Stylesheet

**Files:**
- Create: `css/rtl.css`

- [ ] **Step 1: Write RTL overrides**

Uses CSS logical properties throughout the main styles, so minimal overrides needed. Primarily font-family change to Cairo for Arabic, text alignment, and specific layout fixes.

```css
/* RTL Overrides for Arabic */
[dir="rtl"] {
  font-family: 'Cairo', 'Inter', sans-serif;
}

[dir="rtl"] .section__label {
  letter-spacing: 0.02em;
}

[dir="rtl"] .faq-item__question {
  text-align: right;
}

[dir="rtl"] .navbar__toggle span {
  /* Keep hamburger icon unchanged */
}
```

- [ ] **Step 2: Commit**

```bash
git add css/rtl.css
git commit -m "feat: add RTL stylesheet for Arabic pages"
```

---

## Chunk 2: JavaScript + Infrastructure

### Task 8: Main JavaScript

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Write vanilla JS — mobile menu, navbar scroll, FAQ accordion, contact form, stat counter animation**

Must be under 5KB. Uses `IntersectionObserver` for scroll-triggered animations. FAQ uses `<details>` elements (native accordion, JS enhances with single-open behavior). Contact form submits via Web3Forms API.

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add main JS (mobile menu, FAQ, form, scroll effects)"
```

---

### Task 9: Infrastructure Files

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `.htaccess`
- Create: `404.html`

- [ ] **Step 1: Write robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://madinatalsaada.ae/sitemap.xml
```

- [ ] **Step 2: Write sitemap.xml with all 16 pages**

- [ ] **Step 3: Write .htaccess with caching, gzip, security headers**

- [ ] **Step 4: Write 404 page**

- [ ] **Step 5: Commit**

```bash
git add robots.txt sitemap.xml .htaccess 404.html
git commit -m "feat: add robots.txt, sitemap, .htaccess, 404 page"
```

---

## Chunk 3: Image Optimization

### Task 10: Compress and Convert Images

**Files:**
- All images in `img/` directory

- [ ] **Step 1: Compress logo from 2.2MB to <30KB WebP**
- [ ] **Step 2: Convert all project images to WebP with responsive sizes (400w, 800w)**
- [ ] **Step 3: Create OG image (1200x630)**
- [ ] **Step 4: Verify all images have proper filenames (lowercase, hyphenated)**
- [ ] **Step 5: Commit**

```bash
git add img/
git commit -m "feat: add optimized WebP images with responsive sizes"
```

---

## Chunk 4: English Pages (8 pages)

### Task 11: Homepage (index.html)

Sections: Hero (split layout with text + 3D curtain wall SVG), Stats bar, Services grid (6 cards), Process timeline (5 steps), Featured projects (3 cards), Aluminium brands (6 cards), Certifications (3 cards), Partners, FAQ accordion (5 items), CTA section.

Includes: JSON-LD (Organization + LocalBusiness + FAQ), Open Graph meta, proper heading hierarchy (single H1).

### Task 12: About Page (about.html)

Sections: Page hero with breadcrumb, Our Story (text + image), Leadership (2 cards with photo placeholders), Stats (dark background), Our Approach (3 icon cards), Certifications, CTA.

### Task 13: Services Page (services.html)

Sections: Page hero, Services intro with subcontractor note, 7 service details (alternating layout), Process timeline, CTA.

Uses real project images, not Unsplash stock photos.

### Task 14: Projects Page (projects.html)

Sections: Page hero, Stats, UAE Map (SVG), Completed projects grid (14 cards), Ongoing projects (3 cards), Partners, CTA.

### Task 15: Equipment Page (equipment.html)

Sections: Page hero, Stats, Cutting & Machining (5 equipment cards), Crimping & Assembly (4 cards), Cladding & Finishing (2 cards), Drilling & Grinding (3 cards), QC Process (4 steps), CTA.

### Task 16: Technical Page (technical.html)

Sections: Page hero, Brand cards (6), Curtain wall comparison (stick vs unitized), Glass specifications (8 types), Certifications, Download company profile, CTA.

### Task 17: Contact Page (contact.html)

Sections: Page hero, Contact info + Working form (Web3Forms), Google Maps embed, CTA.

Form fields: Name, Phone, Email, Company, Project Type (select), Description, File upload area, Submit button. Working via Web3Forms API.

### Task 18: FAQ Page (faq.html)

Standalone FAQ page with JSON-LD FAQPage schema. Categories: General, Services, Technical, Partnership.

---

## Chunk 5: Arabic Pages (8 pages)

### Task 19-26: Arabic Mirrors

Mirror all 8 English pages with:
- `<html lang="ar" dir="rtl">`
- Cairo font loaded from Google Fonts
- All content translated to Arabic
- RTL stylesheet loaded
- `hreflang` tags linking EN ↔ AR versions
- Proper Arabic meta descriptions and OG tags

---

## Chunk 6: Final Polish + QA

### Task 27: Cross-Page Consistency Audit

- [ ] Verify all pages load CSS in same order: reset → tokens → base → layout → components → pages → (rtl for Arabic)
- [ ] Verify all pages have: skip link, proper heading hierarchy, ARIA landmarks
- [ ] Verify all images have alt text and width/height or aspect-ratio
- [ ] Verify all links work (no broken `#` or empty hrefs)
- [ ] Verify copyright says 2026
- [ ] Verify "10 years experience" (not 9)
- [ ] Verify email shows `info@madinatalsaada.ae` (not Cloudflare obfuscated)

### Task 28: Performance Audit

- [ ] Run Lighthouse on homepage — target 95+ all categories
- [ ] Verify total page weight <500KB
- [ ] Verify LCP <2.5s
- [ ] Verify CLS <0.1
- [ ] Verify all images lazy-loaded below fold

### Task 29: SEO Verification

- [ ] Verify JSON-LD validates at schema.org validator
- [ ] Verify Open Graph tags render correctly
- [ ] Verify sitemap.xml lists all 16 pages
- [ ] Verify robots.txt allows crawling
- [ ] Verify canonical URLs on all pages
- [ ] Verify hreflang EN ↔ AR on all pages

### Task 30: Final Commit + Deploy

- [ ] Clean up old files (remove `/pages/`, `/ar/index.html` old version, etc.)
- [ ] Final commit
- [ ] Push to GitHub
- [ ] Deploy to cPanel

---

## Execution Notes

- **No test suite** for a static HTML site — validation is visual + Lighthouse + schema validators
- **Commits after every task** — small, atomic changes
- **Image optimization** requires `cwebp` or `sharp` CLI — will use available tools or manual conversion
- **Web3Forms** requires signing up at web3forms.com for a free API key (or using `access_key` from their public endpoint)
- **Font loading**: Use `font-display: swap` for Inter and Cairo to prevent FOIT
- **Critical CSS**: Inline navbar + hero styles in `<head>` for fastest FCP on homepage
