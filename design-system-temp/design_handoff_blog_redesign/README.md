# Handoff: Haoenchan blog redesign → Next.js

## What this is

You (or your dev / Claude Code) have a working **Next.js 16 + Tailwind v4 + shadcn/ui** blog at `haoenchan/v0-blog-and-articles`. I redesigned the homepage / articles index / single article view as **standalone HTML + plain React-via-Babel + a single `styles.css`**. The HTML in this folder is a **design reference**, not code to ship.

The job is to **port the visual & interaction changes** back into your existing Next.js codebase — same file structure, same shadcn primitives, same Tailwind v4 + KaTeX setup. **All article copy and post data in `lib/blog-data.ts` stays untouched.**

Run this against your repo with Claude Code:

```bash
cd path/to/v0-blog-and-articles
claude  # then paste this README as your first message, or just say "implement the changes in design_handoff_blog_redesign/README.md against this repo"
```

## Fidelity

**High-fidelity.** Pixel-precise colors, type, spacing, motion timings. Where the redesign reuses an existing pattern from the repo (sticky header, ChargeField, KaTeX rendering), keep your existing implementation and only patch the visuals/copy mentioned below.

---

## File-by-file changes

> Paths are relative to repo root. Anything not listed is unchanged.

### `app/globals.css`

Append a new section at the bottom (everything else in your current globals stays). New tokens, animations, and global FX styles:

```css
/* ---- Scroll progress bar ---- */
.scroll-progress {
  position: fixed; top: 0; left: 0; right: 0;
  height: 2px; z-index: 100; pointer-events: none;
  background: oklch(0.20 0.01 220 / 0.2);
}
.scroll-progress__bar {
  height: 100%; width: 100%;
  transform-origin: left center; transform: scaleX(0);
  background: linear-gradient(90deg, #f87171, #fb923c, #facc15, #4ade80, #38bdf8, #a78bfa);
  box-shadow: 0 0 10px rgba(56,189,248,0.4);
}

/* ---- Mouse glow ---- */
.mouse-glow {
  position: fixed; top: 0; left: 0;
  width: 400px; height: 400px; border-radius: 50%;
  pointer-events: none; z-index: 1;
  background: radial-gradient(circle, rgba(56,189,248,0.08), rgba(56,189,248,0.02) 40%, transparent 70%);
  mix-blend-mode: screen; will-change: transform;
}
@media (prefers-reduced-motion: reduce) { .mouse-glow { display: none; } }

/* ---- Magnetic hover wrapper ---- */
.magnetic { display: inline-block; transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1); }

/* ---- Parallax tilt wrapper ---- */
.parallax-tilt { transform-style: preserve-3d; transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
```

Full token / motion / typography reference: see `styles.css` in this folder (it's a single 800-line stylesheet — pick what you need; everything for the listed components is in there).

---

### NEW: `components/effects/scroll-progress.tsx`

A thin rainbow line at the top that fills as you scroll. Mount once in `app/layout.tsx` (or per-page).

```tsx
"use client"
import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current; if (!el) return
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / max))})`
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on) }
  }, [])
  return <div className="scroll-progress"><div ref={ref} className="scroll-progress__bar" /></div>
}
```

### NEW: `components/effects/mouse-glow.tsx`

Soft cyan halo following the cursor. Mount in `app/layout.tsx`.

```tsx
"use client"
import { useEffect, useRef } from "react"

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`
      })
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])
  return <div ref={ref} className="mouse-glow" aria-hidden />
}
```

### NEW: `components/effects/magnetic-hover.tsx`

Wraps a button-like child; gently pulls toward the cursor when close. Used around the "Read all articles" CTA on the homepage.

```tsx
"use client"
import { useEffect, useRef, type ReactNode } from "react"

export function MagneticHover({ children, strength = 0.18, radius = 140 }: { children: ReactNode; strength?: number; radius?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = Math.hypot(dx, dy) < radius
          ? `translate(${dx * strength}px, ${dy * strength}px)` : "translate(0, 0)"
      })
    }
    const onLeave = () => { el.style.transform = "translate(0, 0)" }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", onLeave)
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", onLeave) }
  }, [strength, radius])
  return <span ref={ref} className="magnetic">{children}</span>
}
```

### NEW: `components/effects/parallax-tilt.tsx`

3D tilt on mouse-move. Used around the homepage signature card.

```tsx
"use client"
import { useEffect, useRef, type ReactNode } from "react"

export function ParallaxTilt({ children, max = 6 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateY(${nx * max}deg) rotateX(${-ny * max}deg)`
      })
    }
    const onLeave = () => { el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)" }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave) }
  }, [max])
  return <div ref={ref} className="parallax-tilt">{children}</div>
}
```

### NEW: `components/signature-card.tsx`

The Coulomb's-law index-card next to the hero. Pure visual — equation + +q / −e tag row, no extra English copy.

See `app.jsx` `SignatureCard` in this folder for the exact JSX. Use KaTeX (already in your repo) to render `F = k\,\frac{q_1\, q_2}{r^{2}}` in display mode. Tailwind classes are in `styles.css` under `.signature-card`.

---

### MODIFY: `app/layout.tsx`

Mount the global FX right above the existing `<ChargeField />`:

```tsx
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { MouseGlow } from "@/components/effects/mouse-glow"

// inside <body>:
<ScrollProgress />
<MouseGlow />
<ChargeField />
```

### MODIFY: `app/page.tsx` (homepage)

**Do not change the copy.** Keep:
- Eyebrow chip text: `Math & Physics`
- Heading: `About ` + rainbow `Me`
- Lead paragraph (the long "Hi! I'm Haoen…" one) unchanged
- CTA label: `Read all articles`
- Recent section heading: `Recent Articles` + the `:pp` subtitle

Changes:

1. Wrap the CTA in `<MagneticHover>`.
2. Add a `<SignatureCard />` to the right of the hero text on `lg` screens (use a `lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-20` wrapper). Mount inside `<ParallaxTilt>`.
3. The `<RecentPosts>` component itself gets restyled — see next.

### MODIFY: `components/recent-posts.tsx` (homepage list)

Replace the ringed "card" treatment with a **numbered editorial list**. Each row:

- Left col: serif italic `01`, `02`, `03` (numbers fade from foreground to muted vertically — use a gradient text effect)
- Middle col: meta strip — `<cat-chip>` / `<date>` / `<read-time>`, all `font-mono uppercase tracking-[0.12em] text-[0.72rem]`
- Right col: serif title (`text-2xl`/`md:text-[2rem]`, `font-bold`, `tracking-tight`) + muted excerpt; an arrow icon that appears on hover and slides in from the top-left
- Hover: the whole row translates the title 6px right, the number gradient swaps to `from-primary to-accent`, a 1px line draws across the bottom from left

Reference: `.article-row` and friends in `styles.css`. JSX in `shared-components.jsx` → `ArticleRow`.

### MODIFY: `components/blog-list.tsx` (articles index filter)

Keep the filter logic (`activeCategory` state + `categories` array) exactly as-is. Restyle the chips:

- `bg-secondary text-muted-foreground` → `bg-[oklch(0.16 0.01 220)] text-muted-foreground`, `rounded-md`, `border border-transparent`, `text-sm`
- Add a small `font-mono` count badge after each label, e.g. `<span class="filter-chip__count">{count}</span>` — pill-shaped, opacity 0.7, fed from a `useMemo` that counts posts per category
- Active: `bg-primary text-primary-foreground font-medium`; the count badge dims its inner pill to `bg-[oklch(0.06_0.005_220/0.25)]`

Reference: `.filter-chip` block in `styles.css`.

### MODIFY: `components/article-content.tsx` (renderer — bug fix)

**Bug fix:** your current renderer wraps every `\n\n`-separated block in a `<p>`, including blocks that start with raw HTML like the `<div>...<img>...</div>` figure embeds in `lib/blog-data.ts`. The browser auto-closes the `<p>` and the figure ends up rendering broken / outside the flow. Add a branch:

```ts
if (trimmed.startsWith("<")) {
  // Render raw HTML block (figures, iframes) — don't wrap in <p>
  const html = renderMath(trimmed)
  return (
    <ScrollReveal key={index} type="fade-up">
      <div className="article-body__figure" dangerouslySetInnerHTML={{ __html: html }} />
    </ScrollReveal>
  )
}
```

Place this branch **before** the default `<p>` fallback. CSS for `.article-body__figure` is in `styles.css` — border radius, dark background, italic serif captions.

Also: **the Trinket gif URLs in `blog-data.ts` are session-temporary** (`https://python-code-aws.trinket.io/python-generated/.../*.gif`) and will 404 once Trinket recycles them. Re-host those three GIFs (the rotation, angular momentum, and Lennard-Jones ones) in `public/` and update the `src=` paths to `/rotation_com.gif` etc.

### MODIFY: math overflow on equation blocks

In `article-content.tsx` you currently render display math inside `<div className="my-2 overflow-x-auto text-center">`. Drop `overflow-x-auto` — it produces an ugly horizontal scrollbar on long polynomial expressions. Instead, scale KaTeX font down on narrow screens:

```css
.article-body__math .katex-display, .article-body__math .katex { font-size: 1em; }
@media (max-width: 720px) {
  .article-body__math .katex-display, .article-body__math .katex { font-size: 0.82em; }
}
@media (max-width: 500px) {
  .article-body__math .katex-display, .article-body__math .katex { font-size: 0.7em; }
}
```

### NEW: `components/back-to-top.tsx`

Floating round button bottom-right that appears after `scrollY > 600`. See `BackToTop` in `article-app.jsx`. Mount inside `app/blog/[slug]/page.tsx`.

### MODIFY: `components/site-header.tsx`

Current header is fine. Two small adds:

1. **Mobile menu** — your current mobile drawer works, but to match the redesign use a CSS-grid `grid-rows-[0fr→1fr]` accordion (smoother than the current opacity fade). See `.site-header__drawer` in `styles.css`.
2. The header **doesn't need any FX wrappers** — `ScrollProgress` lives above it.

---

## Dates in `lib/blog-data.ts`

Two of your posts (Vieta, Sums) use `"February 20, 2026"`; the other four use ISO `"2026-02-05"`. **Normalize them all** — the user asked. Most readable + matches the majority of your existing data is ISO. Recommended:

```
February 20, 2026  →  2026-02-20
February 28, 2026  →  2026-02-28
```

Leave all other content fields untouched.

---

## Design tokens (already in your `globals.css`, just for reference)

| Token | Value |
|---|---|
| `--background` | `oklch(0.06 0.005 220)` |
| `--foreground` | `oklch(0.93 0.005 200)` |
| `--primary` | `oklch(0.72 0.14 200)` (≈ sky-400) |
| `--accent` | `oklch(0.72 0.18 175)` |
| `--card` | `oklch(0.12 0.01 220)` |
| `--border` | `oklch(0.20 0.01 220)` |
| Rainbow palette | `#f87171 #fb923c #facc15 #4ade80 #38bdf8 #a78bfa` |
| Serif | Playfair Display |
| Sans | Inter |
| Mono | Geist Mono |
| Reading column | `max-w-3xl` (48rem) |

## Interactions / motion timings

- 200ms — generic hover state changes
- 300ms — nav / button micro-transitions
- 350–600ms — magnetic / tilt easings (`cubic-bezier(0.22, 1, 0.36, 1)`)
- 500ms — header sticky style transition
- 600–800ms — scroll-reveal fades
- 10–12s — ambient hero glow drift loops

## Reference files in this bundle

- `index.html`, `articles.html`, `article.html` — the three pages, working
- `app.jsx`, `articles-app.jsx`, `article-app.jsx` — page-level React
- `shared-components.jsx` — `Header`, `Footer`, `ArticleRow`, `Reveal`, `ScrollProgress`, `MouseGlow`, `MagneticHover`, `ParallaxTilt`, `EinsteinSprite`
- `charge-field.jsx` — port of your existing `ChargeField`; **use your repo's version, not this one**
- `styles.css` — every CSS rule that powers the redesign; cherry-pick into `globals.css`
- `colors_and_type.css` — token-only file you can import as a reference
- `posts-data.js` — illustrative copy of your `blog-data.ts` (do not ship this; use your real `lib/blog-data.ts`)

## Things I did NOT touch

- Your KaTeX setup
- Your shadcn UI primitives
- Your icon source (lucide-react)
- The ChargeField canvas (just remounted higher in the layout so glow + scroll progress sit on top)
- Any article body copy in `lib/blog-data.ts`
