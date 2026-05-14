/* global React, ReactDOM, TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakRadio, useTweaks,
   KaTeX, Reveal, Header, Footer, ScrollProgress, MouseGlow, MagneticHover, ParallaxTilt, ChargeFieldHost, EinsteinSprite, ArticleRow */
const { useEffect, useRef, useState, useMemo } = React;

/* ============================================================
   HERO — exact source copy ("About Me", original lead paragraph)
   ============================================================ */

function Hero({ tweaks }) {
  return (
    <section className="hero">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__lead">
          <div className="chip animate-fade-in">
            <span className="sparkle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.9 5.8L19.8 11l-5.9 2.2L12 19l-1.9-5.8L4.2 11l5.9-2.2L12 3z"/>
              </svg>
            </span>
            <span>Math &amp; Physics</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line animate-fade-in-up">About </span>
            <span className="hero__title-line hero__title-line--accent animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <em className={tweaks.accent === "rainbow" ? "text-rainbow text-rainbow--rotating" : "text-accent-solid"}>
                Me
              </em>
              {tweaks.showCursor ? <span className="cursor-blink" aria-hidden="true">|</span> : null}
            </span>
          </h1>

          <p className="hero__lead-text animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            {tweaks.showDropCap ? (
              <>
                <span className="drop-cap">H</span>
                {"i! I'm Haoen and I am interested in physics and a bit of math. Here, I will post some of my own articles including my own solutions to some problems and also some handouts."}
              </>
            ) : (
              "Hi! I'm Haoen and I am interested in physics and a bit of math. Here, I will post some of my own articles including my own solutions to some problems and also some handouts."
            )}
          </p>

          <div className="hero__cta-row animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <MagneticHover strength={0.18} radius={140}>
              <a href="articles.html" className="cta-pill">
                <span>Read all articles</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                <span className="cta-pill__shimmer" aria-hidden="true" />
              </a>
            </MagneticHover>
          </div>
        </div>

        {tweaks.showSignatureCard ? <SignatureCard /> : null}
      </div>
    </section>
  );
}

function SignatureCard() {
  return (
    <Reveal delay={250} className="signature-card-wrap" y={32}>
      <ParallaxTilt max={6}>
        <div className="signature-card">
          <div className="signature-card__corner signature-card__corner--tl" />
          <div className="signature-card__corner signature-card__corner--tr" />
          <div className="signature-card__corner signature-card__corner--bl" />
          <div className="signature-card__corner signature-card__corner--br" />
          <div className="signature-card__formula">
            <KaTeX tex="F = k\,\frac{q_1\, q_2}{r^{2}}" display />
          </div>
          <div className="signature-card__tags">
            <span className="tag-tick">+q</span>
            <span className="tag-line" />
            <span className="tag-tick tag-tick--neg">−e</span>
          </div>
        </div>
      </ParallaxTilt>
    </Reveal>
  );
}

/* ============================================================
   RECENT ARTICLES — exact source headings, real first-3 from blog-data
   ============================================================ */

function RecentWriting({ tweaks }) {
  const posts = (window.POSTS || []).slice(0, 3);
  return (
    <section id="articles" className="recent">
      <Reveal className="section-head">
        <h2 className="recent__title">Recent Articles</h2>
        <a href="articles.html" className="recent__viewall">
          <span>View all</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <p className="recent__sub">Here are some of the articles I have recently written in my free time! :pp</p>
      </Reveal>

      <ol className={`article-list article-list--${tweaks.articleStyle}`}>
        {posts.map((p, i) => (
          <Reveal key={p.slug} as="li" delay={i * 100} className="article-row-reveal">
            <ArticleRow post={p} idx={i} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   APP
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showChargeField": true,
  "chargeFieldOpacity": 0.85,
  "accent": "rainbow",
  "articleStyle": "numbered",
  "showSignatureCard": true,
  "showDropCap": true,
  "showCursor": false,
  "showEinstein": true,
  "wideHero": true,
  "showMouseGlow": true,
  "showScrollProgress": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <div className={`page ${t.wideHero ? "page--wide" : ""}`}>
      {t.showScrollProgress ? <ScrollProgress /> : null}
      <ChargeFieldHost show={t.showChargeField} opacity={t.chargeFieldOpacity} />
      <MouseGlow disabled={!t.showMouseGlow} />

      <Header active="/" />

      <main className="main">
        <Hero tweaks={t} />
        <div className="divider-fade" />
        <RecentWriting tweaks={t} />
      </main>

      {t.showEinstein ? <EinsteinSprite /> : null}

      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Layout">
          <TweakRadio label="Article style" value={t.articleStyle} options={[
            { value: "numbered", label: "Numbered" },
            { value: "cards", label: "Cards" },
          ]} onChange={v => setTweak("articleStyle", v)} />
          <TweakToggle label="Wide hero" value={t.wideHero} onChange={v => setTweak("wideHero", v)} />
          <TweakToggle label="Signature card" value={t.showSignatureCard} onChange={v => setTweak("showSignatureCard", v)} />
          <TweakToggle label="Drop cap on lead" value={t.showDropCap} onChange={v => setTweak("showDropCap", v)} />
        </TweakSection>
        <TweakSection title="Personality">
          <TweakRadio label='Accent on "Me"' value={t.accent} options={[
            { value: "rainbow", label: "Rainbow" },
            { value: "cyan", label: "Cyan" },
          ]} onChange={v => setTweak("accent", v)} />
          <TweakToggle label="Cursor after Me" value={t.showCursor} onChange={v => setTweak("showCursor", v)} />
          <TweakToggle label="Einstein cameo" value={t.showEinstein} onChange={v => setTweak("showEinstein", v)} />
        </TweakSection>
        <TweakSection title="Motion & FX">
          <TweakToggle label="Scroll progress bar" value={t.showScrollProgress} onChange={v => setTweak("showScrollProgress", v)} />
          <TweakToggle label="Mouse-follow glow" value={t.showMouseGlow} onChange={v => setTweak("showMouseGlow", v)} />
          <TweakToggle label="ChargeField canvas" value={t.showChargeField} onChange={v => setTweak("showChargeField", v)} />
          <TweakSlider label="ChargeField opacity" value={t.chargeFieldOpacity} min={0.1} max={1} step={0.05} onChange={v => setTweak("chargeFieldOpacity", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
