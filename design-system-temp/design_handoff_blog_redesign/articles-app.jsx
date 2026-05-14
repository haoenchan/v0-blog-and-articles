/* global React, ReactDOM, Header, Footer, ScrollProgress, MouseGlow, ChargeFieldHost, EinsteinSprite, Reveal, ArticleRow */
const { useEffect, useRef, useState, useMemo } = React;

/* ============================================================
   ARTICLES INDEX PAGE — exact source copy from app/blog/page.tsx
   + filter chips from components/blog-list.tsx
   ============================================================ */

const CATEGORIES = ["All", "Math", "Physics", "Misc"];

function FilterChips({ active, setActive, counts }) {
  return (
    <div className="filter-chips" role="tablist" aria-label="Categories">
      {CATEGORIES.map(c => (
        <button key={c} role="tab" aria-selected={active === c}
          className={`filter-chip ${active === c ? "is-active" : ""}`}
          onClick={() => setActive(c)}>
          <span>{c}</span>
          <span className="filter-chip__count">{counts[c] || 0}</span>
        </button>
      ))}
    </div>
  );
}

function ArticlesPage() {
  const posts = window.POSTS || [];
  const [active, setActive] = useState("All");

  const counts = useMemo(() => {
    const c = { All: posts.length, Math: 0, Physics: 0, Misc: 0 };
    posts.forEach(p => { if (c[p.category] != null) c[p.category]++; });
    return c;
  }, [posts]);

  const filtered = active === "All" ? posts : posts.filter(p => p.category === active);

  return (
    <div className="page page--wide">
      <ScrollProgress />
      <ChargeFieldHost opacity={0.65} />
      <MouseGlow />
      <Header active="/blog" />

      <main className="main">
        <section className="page-header">
          <Reveal>
            <h1 className="page-header__title">Articles</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="page-header__sub">
              Here are some articles I have written in my free time! If there are any errors you may contact me on my{" "}
              <a href="https://instagram.com/haoenphysics" target="_blank" rel="noopener noreferrer" className="link-primary">Instagram</a>
            </p>
          </Reveal>
        </section>

        <div className="divider-fade" />

        <section className="articles-section">
          <Reveal>
            <FilterChips active={active} setActive={setActive} counts={counts} />
          </Reveal>

          <ol className="article-list article-list--numbered">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} as="li" delay={i * 70} className="article-row-reveal">
                <ArticleRow post={p} idx={i} />
              </Reveal>
            ))}
          </ol>

          {filtered.length === 0 && (
            <p className="empty-state">No posts in this category yet.</p>
          )}
        </section>
      </main>

      <EinsteinSprite />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ArticlesPage />);
