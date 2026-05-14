/* global React, ReactDOM, Header, Footer, ScrollProgress, MouseGlow, ChargeFieldHost, Reveal, KaTeX */
const { useEffect, useRef, useState, useMemo } = React;

/* ============================================================
   ARTICLE PAGE — single post, with KaTeX rendering.
   Mirrors components/article-content.tsx logic.
   ============================================================ */

function renderMath(text) {
  let out = text.replace(/\$\$([^$]+?)\$\$/g, (_, math) => {
    try { return window.katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }); }
    catch (e) { return math; }
  });
  out = out.replace(/\$([^$]+?)\$/g, (_, math) => {
    try { return window.katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }); }
    catch (e) { return math; }
  });
  return out;
}

function RichText({ text }) {
  const html = renderMath(
    text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  );
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function ArticleBody({ content }) {
  const blocks = useMemo(() => content.split("\n\n"), [content]);

  return (
    <article className="article-body">
      <div className="article-body__flow">
        {blocks.map((block, i) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("### ")) {
            return (
              <Reveal key={i} y={16}>
                <h3 className="article-body__h3"><RichText text={trimmed.replace("### ", "")} /></h3>
              </Reveal>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <Reveal key={i} y={16}>
                <h2 className="article-body__h2"><RichText text={trimmed.replace("## ", "")} /></h2>
              </Reveal>
            );
          }
          if (trimmed.startsWith("#### ")) {
            return (
              <Reveal key={i} y={16}>
                <h4 className="article-body__h4"><RichText text={trimmed.replace("#### ", "")} /></h4>
              </Reveal>
            );
          }
          if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
            const math = trimmed.slice(2, -2).trim();
            try {
              const html = window.katex.renderToString(math, { displayMode: true, throwOnError: false });
              return (
                <Reveal key={i} delay={50} y={16}>
                  <div className="article-body__math" dangerouslySetInnerHTML={{ __html: html }} />
                </Reveal>
              );
            } catch (e) {
              return <Reveal key={i}><p className="article-body__p">{math}</p></Reveal>;
            }
          }
          // List items
          if (trimmed.startsWith("- ")) {
            const items = trimmed.split("\n").filter(l => l.startsWith("- ")).map(l => l.slice(2));
            return (
              <Reveal key={i}>
                <ul className="article-body__ul">
                  {items.map((it, j) => <li key={j}><RichText text={it} /></li>)}
                </ul>
              </Reveal>
            );
          }
          // Numbered list
          if (/^\d+\.\s/.test(trimmed)) {
            const items = trimmed.split("\n").filter(l => /^\d+\.\s/.test(l)).map(l => l.replace(/^\d+\.\s+/, ""));
            return (
              <Reveal key={i}>
                <ol className="article-body__ol">
                  {items.map((it, j) => <li key={j}><RichText text={it} /></li>)}
                </ol>
              </Reveal>
            );
          }
          // Raw HTML block (e.g. <div>...<img></div> figure embeds in the source content)
          if (trimmed.startsWith("<")) {
            const html = renderMath(trimmed);
            return (
              <Reveal key={i} y={16}>
                <div className="article-body__figure" dangerouslySetInnerHTML={{ __html: html }} />
              </Reveal>
            );
          }
          return (
            <Reveal key={i}>
              <p className="article-body__p"><RichText text={trimmed} /></p>
            </Reveal>
          );
        })}
      </div>
    </article>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

function ArticlePage() {
  const posts = window.POSTS || [];
  const [slug, setSlug] = useState(() => window.location.hash.slice(1) || posts[0]?.slug);

  useEffect(() => {
    const f = () => {
      setSlug(window.location.hash.slice(1) || posts[0]?.slug);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, [posts]);

  const post = posts.find(p => p.slug === slug) || posts[0];

  if (!post) {
    return (
      <div className="page page--wide">
        <Header active="/blog" />
        <main className="main"><section className="page-header"><p className="empty-state">Post not found.</p></section></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page page--wide">
      <ScrollProgress />
      <ChargeFieldHost opacity={0.45} />
      <MouseGlow />
      <Header active="/blog" />

      <main className="main">
        <div className="article-shell">
          <div className="article-shell__back">
            <a href="articles.html" className="back-link">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to writing
            </a>
          </div>

          <header className="article-header">
            <Reveal>
              <div className="article-header__meta">
                <span className={`article-header__cat article-header__cat--${post.category.toLowerCase()}`}>{post.category}</span>
                <span className="article-header__sep">/</span>
                <time className="article-header__date">{post.date}</time>
                <span className="article-header__sep">/</span>
                <span>{post.readTime}</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="article-header__title">{post.title}</h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="article-header__excerpt">{post.excerpt}</p>
            </Reveal>
          </header>

          <div className="divider-fade" />

          <ArticleBody content={post.content || ""} />

          <div className="divider-fade" />

          <div className="article-shell__footer">
            <a href="articles.html" className="back-link">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to writing
            </a>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noopener noreferrer"
              className="share-link"
            >
              Share on X
            </a>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ArticlePage />);
