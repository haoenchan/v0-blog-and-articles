"use client"

import katex from "katex"
import "katex/dist/katex.min.css"

interface ArticleContentProps {
  content: string
}

function renderMath(text: string): string {
  // Replace display math $$...$$ first
  let result = text.replace(/\$\$([^$]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })
    } catch {
      return math
    }
  })
  // Replace inline math $...$
  result = result.replace(/\$([^$]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })
    } catch {
      return math
    }
  })
  return result
}

function RichText({ text }: { text: string }) {
  // Handle bold markers then render math
  const html = renderMath(
    text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  )
  return (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = content.split("\n\n")

  return (
    <article className="py-12 sm:py-16">
      <div className="flex flex-col gap-6">
        {blocks.map((block, index) => {
          const trimmed = block.trim()
          if (!trimmed) return null

          // Headings
          if (trimmed.startsWith("### ")) {
            return (
              <h3
                key={index}
                className="mt-2 font-serif text-xl font-bold tracking-tight text-foreground"
              >
                <RichText text={trimmed.replace("### ", "")} />
              </h3>
            )
          }

          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={index}
                className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground"
              >
                <RichText text={trimmed.replace("## ", "")} />
              </h2>
            )
          }

          // Raw HTML block (figures, iframes) — don't wrap in <p>
          if (trimmed.startsWith("<")) {
            const html = renderMath(trimmed)
            return (
              <div
                key={index}
                className="article-body__figure"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )
          }

          // Display math block (standalone $$ ... $$)
          if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
            const math = trimmed.slice(2, -2).trim()
            try {
              const html = katex.renderToString(math, { displayMode: true, throwOnError: false })
              return (
                <div
                  key={index}
                  className="article-body__math my-2 text-center"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )
            } catch {
              return <p key={index} className="text-base text-foreground/80">{math}</p>
            }
          }

          // Regular paragraph with inline math and bold support
          return (
            <p key={index} className="text-base leading-relaxed text-foreground/80">
              <RichText text={trimmed} />
            </p>
          )
        })}
      </div>
    </article>
  )
}
