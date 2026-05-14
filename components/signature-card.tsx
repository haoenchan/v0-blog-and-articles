"use client"

import katex from "katex"
import { useMemo } from "react"

export function SignatureCard() {
  const formulaHtml = useMemo(() => {
    try {
      return katex.renderToString("F = k\\,\\frac{q_1\\, q_2}{r^{2}}", {
        displayMode: true,
        throwOnError: false
      })
    } catch {
      return "F = kq₁q₂/r²"
    }
  }, [])

  return (
    <div className="signature-card">
      {/* Corner crop marks */}
      <div className="signature-card__corner signature-card__corner--tl" />
      <div className="signature-card__corner signature-card__corner--tr" />
      <div className="signature-card__corner signature-card__corner--bl" />
      <div className="signature-card__corner signature-card__corner--br" />

      {/* Eyebrow */}
      <div className="signature-card__eyebrow">
        <span>Coulomb&apos;s Law</span>
        <span className="signature-card__id">λ</span>
      </div>

      {/* Formula */}
      <div 
        className="signature-card__formula"
        dangerouslySetInnerHTML={{ __html: formulaHtml }}
      />

      {/* Caption */}
      <p className="signature-card__caption">
        The electrostatic force between two charged particles
      </p>

      {/* Tags */}
      <div className="signature-card__tags">
        <span className="tag-tick">+q</span>
        <span className="tag-line" />
        <span className="tag-tick tag-tick--neg">−e</span>
      </div>
    </div>
  )
}
