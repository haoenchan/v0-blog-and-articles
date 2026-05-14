/* global React, ChargeField */
/* ============================================================
   Shared components — used by index, articles, article pages.
   All shared values are attached to `window` at the bottom.
   ============================================================ */

const { useEffect, useRef, useState, useMemo, useLayoutEffect } = React;

/* ----------- KaTeX render helper ----------- */
function renderKatex(tex, displayMode = false) {
  if (typeof window === "undefined" || !window.katex) return tex;
  try { return window.katex.renderToString(tex, { displayMode, throwOnError: false }); }
  catch (e) { return tex; }
}
function KaTeX({ tex, display = false, className = "" }) {
  const html = useMemo(() => renderKatex(tex, display), [tex, display]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ----------- IntersectionObserver fade reveal ----------- */
function Reveal({ children, delay = 0, y = 24, as: As = "div", className = "", once = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) o.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [once]);
  return (
    <As ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}>
      {children}
    </As>
  );
}

/* ============================================================
   HEADER — sticky, with rainbow logo underline
   ============================================================ */

function Header({ active = "/" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a href="index.html" className="logo">
          <span className="logo__word">Haoenchan</span>
          <span className="logo__underline" aria-hidden="true" />
        </a>
        <nav className="site-nav" aria-label="Main">
          <a href="index.html" className={`site-nav__link ${active === "/" ? "is-active" : ""}`}>About</a>
          <a href="articles.html" className={`site-nav__link ${active === "/blog" ? "is-active" : ""}`}>Articles</a>
        </nav>
        <button className="site-header__mobile" aria-label="Toggle navigation menu" onClick={() => setOpen(o => !o)}>
          <span className={`mobile-icon ${open ? "is-open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>
      <div className={`site-header__drawer ${open ? "is-open" : ""}`}>
        <div className="site-header__drawer-inner">
          <a href="index.html" onClick={() => setOpen(false)}>About</a>
          <a href="articles.html" onClick={() => setOpen(false)}>Articles</a>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   FOOTER — verbatim from source
   ============================================================ */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="hero__rule">
        <span className="hero__rule-line" />
      </div>
      <div className="site-footer__inner">
        <div className="site-footer__bottom">
          <span className="site-footer__copy">2026 Haoenchan. All rights reserved.</span>
          <nav className="site-footer__nav" aria-label="Footer">
            <a href="index.html">About</a>
            <a href="articles.html">Articles</a>
            <a href="https://instagram.com/haoenphysics" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-2px", marginRight: "4px" }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SCROLL PROGRESS — thin rainbow bar at top
   ============================================================ */

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current; if (!el) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(1, Math.max(0, window.scrollY / max));
      el.style.transform = `scaleX(${pct})`;
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><div ref={ref} className="scroll-progress__bar" /></div>;
}

/* ============================================================
   MOUSE GLOW — soft cyan halo following cursor
   ============================================================ */

function MouseGlow({ disabled = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (disabled) return;
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(${mx - 200}px, ${my - 200}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [disabled]);
  if (disabled) return null;
  return <div ref={ref} className="mouse-glow" aria-hidden="true" />;
}

/* ============================================================
   MAGNETIC HOVER — wraps a button-like child and pulls toward cursor
   ============================================================ */

function MagneticHover({ children, strength = 0.25, radius = 100, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < radius) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transform = "translate(0, 0)";
        }
      });
    };
    const onLeave = () => { el.style.transform = "translate(0, 0)"; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, radius]);
  return <span ref={ref} className={`magnetic ${className}`} style={{ display: "inline-block", transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)" }}>{children}</span>;
}

/* ============================================================
   PARALLAX TILT — wraps a card; tilts 3D on mouse move
   ============================================================ */

function ParallaxTilt({ children, max = 8, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateY(${nx * max}deg) rotateX(${-ny * max}deg)`;
      });
    };
    const onLeave = () => { el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)"; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);
  return (
    <div ref={ref} className={`parallax-tilt ${className}`} style={{ transformStyle: "preserve-3d", transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
      {children}
    </div>
  );
}

/* ============================================================
   CHARGE FIELD HOST — convenience wrapper that always positions correctly
   ============================================================ */

function ChargeFieldHost({ opacity = 0.85, show = true }) {
  if (!show) return null;
  return (
    <div className="charge-field-host" aria-hidden="true">
      <ChargeField opacity={opacity} />
    </div>
  );
}

/* ============================================================
   EINSTEIN SPRITE — pixel-art Einstein running across the bottom
   ============================================================ */

const EINSTEIN_FRAMES = [
  [[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0],[0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],[0,0,0,2,2,2,1,1,1,1,2,2,2,0,0,0],[0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],[0,0,0,0,0,3,3,7,7,3,3,0,0,0,0,0],[0,0,0,0,3,3,3,7,7,3,3,3,0,0,0,0],[0,0,0,3,3,3,3,4,4,3,3,3,3,0,0,0],[0,0,2,3,3,3,3,4,4,3,3,3,3,2,0,0],[0,0,2,2,3,3,3,4,4,3,3,3,2,2,0,0],[0,0,0,2,3,3,3,3,3,3,3,3,2,0,0,0],[0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,0,0,0,5,5,0,0,5,5,0,0,0,0,0],[0,0,0,0,5,5,0,0,0,0,5,5,0,0,0,0],[0,0,0,5,5,0,0,0,0,0,0,5,5,0,0,0],[0,0,0,5,5,0,0,0,0,0,0,0,5,5,0,0],[0,0,6,6,0,0,0,0,0,0,0,0,6,6,0,0],[0,0,6,6,6,0,0,0,0,0,0,6,6,6,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
  [[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0],[0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],[0,0,0,2,2,2,1,1,1,1,2,2,2,0,0,0],[0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],[0,0,0,0,0,3,3,7,7,3,3,0,0,0,0,0],[0,0,0,0,3,3,3,7,7,3,3,3,0,0,0,0],[0,0,0,3,3,3,3,4,4,3,3,3,3,0,0,0],[0,0,2,3,3,3,3,4,4,3,3,3,3,2,0,0],[0,0,2,2,3,3,3,4,4,3,3,3,2,2,0,0],[0,0,0,2,3,3,3,3,3,3,3,3,2,0,0,0],[0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0],[0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0],[0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0],[0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0],[0,0,0,0,0,0,6,6,6,6,0,0,0,0,0,0],[0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
  [[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0],[0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,8,2,2,2,8,2,2,2,0,0,0],[0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],[0,0,0,2,2,2,1,1,1,1,2,2,2,0,0,0],[0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],[0,0,0,0,0,3,3,7,7,3,3,0,0,0,0,0],[0,0,0,0,3,3,3,7,7,3,3,3,0,0,0,0],[0,0,0,3,3,3,3,4,4,3,3,3,3,0,0,0],[0,0,2,3,3,3,3,4,4,3,3,3,3,2,0,0],[0,0,2,2,3,3,3,4,4,3,3,3,2,2,0,0],[0,0,0,2,3,3,3,3,3,3,3,3,2,0,0,0],[0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],[0,0,0,0,0,5,5,0,0,5,5,0,0,0,0,0],[0,0,0,0,5,5,0,0,0,0,5,5,0,0,0,0],[0,0,5,5,0,0,0,0,0,0,0,5,5,0,0,0],[0,5,5,0,0,0,0,0,0,0,0,0,5,5,0,0],[0,6,6,0,0,0,0,0,0,0,0,0,6,6,0,0],[6,6,6,0,0,0,0,0,0,0,0,0,6,6,6,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
];
const EINSTEIN_COLORS = {0:'transparent',1:'#e5e7eb',2:'#fcd9b6',3:'#1f2937',4:'#f3f4f6',5:'#374151',6:'#111827',7:'#dc2626',8:'#1f2937'};

function EinsteinSprite({ paused = false }) {
  const [frame, setFrame] = useState(0);
  const [pos, setPos] = useState(-160);
  useEffect(() => {
    if (paused) return;
    const fi = setInterval(() => setFrame(f => (f + 1) % EINSTEIN_FRAMES.length), 110);
    const mi = setInterval(() => setPos(p => p > window.innerWidth + 160 ? -160 : p + 5), 16);
    return () => { clearInterval(fi); clearInterval(mi); };
  }, [paused]);
  const cur = EINSTEIN_FRAMES[frame];
  const PX = 3;
  return (
    <div className="einstein-wrap" aria-hidden="true">
      <div className="einstein" style={{ left: pos + "px" }}>
        <div className="einstein__grid" style={{ gridTemplateColumns: `repeat(16, ${PX}px)`, gridTemplateRows: `repeat(24, ${PX}px)` }}>
          {cur.flat().map((p, i) => (
            <div key={i} style={{ width: PX, height: PX, backgroundColor: EINSTEIN_COLORS[p] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ARTICLE ROW — shared by homepage + articles index
   ============================================================ */

function ArticleRow({ post, idx }) {
  const num = String(idx + 1).padStart(2, "0");
  return (
    <a href={`article.html#${post.slug}`} className="article-row">
      <div className="article-row__num-col">
        <span className="article-row__num"><em>{num}</em></span>
      </div>
      <div className="article-row__meta-col">
        <span className={`article-row__cat article-row__cat--${post.category.toLowerCase()}`}>{post.category}</span>
        <span className="article-row__sep">/</span>
        <time className="article-row__date" dateTime={post.iso || post.date}>{post.date}</time>
        <span className="article-row__sep">/</span>
        <span className="article-row__read">{post.readTime}</span>
      </div>
      <div className="article-row__body">
        <h3 className="article-row__title">
          <span className="article-row__title-text">{post.title}</span>
          <svg className="article-row__arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </h3>
        <p className="article-row__excerpt">{post.excerpt}</p>
      </div>
      <span className="article-row__hover-rule" aria-hidden="true" />
    </a>
  );
}

/* ============================================================
   Export all to window
   ============================================================ */

Object.assign(window, {
  KaTeX, Reveal, Header, Footer,
  ScrollProgress, MouseGlow, MagneticHover, ParallaxTilt,
  ChargeFieldHost, EinsteinSprite, ArticleRow,
});
