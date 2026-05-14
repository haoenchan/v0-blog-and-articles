"use client"

import katex from "katex"
import "katex/dist/katex.min.css"
import { useEffect, useRef, useState } from "react"

interface ArticleContentProps {
  content: string
}

function renderMath(text: string): string {
  let result = text.replace(/\$\$([^$]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })
    } catch {
      return math
    }
  })
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
  const html = renderMath(
    text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  )
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

type AnimationType = 'fade-up' | 'fade-left' | 'fade-in'

function ScrollReveal({
  children,
  delay = 0,
  type = 'fade-up',
}: {
  children: React.ReactNode
  delay?: number
  type?: AnimationType
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transforms: Record<AnimationType, string> = {
    'fade-up': visible ? 'translateY(0)' : 'translateY(24px)',
    'fade-left': visible ? 'translateX(0)' : 'translateX(-24px)',
    'fade-in': 'none',
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[type],
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
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

          if (trimmed.startsWith("### ")) {
            return (
              <ScrollReveal key={index} type="fade-left">
                <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-foreground">
                  <RichText text={trimmed.replace("### ", "")} />
                </h3>
              </ScrollReveal>
            )
          }

          if (trimmed.startsWith("## ")) {
            return (
              <ScrollReveal key={index} type="fade-left">
                <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground">
                  <RichText text={trimmed.replace("## ", "")} />
                </h2>
              </ScrollReveal>
            )
          }

          if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
            const math = trimmed.slice(2, -2).trim()
            try {
              const html = katex.renderToString(math, { displayMode: true, throwOnError: false })
              return (
                <ScrollReveal key={index} type="fade-in" delay={50}>
                  <div
                    className="my-2 overflow-x-auto text-center"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </ScrollReveal>
              )
            } catch {
              return (
                <ScrollReveal key={index} type="fade-up">
                  <p className="text-base text-foreground/80">{math}</p>
                </ScrollReveal>
              )
            }
          }

          return (
            <ScrollReveal key={index} type="fade-up">
              <p className="text-base leading-relaxed text-foreground/80">
                <RichText text={trimmed} />
              </p>
            </ScrollReveal>
          )
        })}
      </div>
    </article>
  )
}
