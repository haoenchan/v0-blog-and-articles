"use client"

import { useEffect, useRef } from "react"

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`
        }
      })
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])
  
  return <div ref={ref} className="mouse-glow" aria-hidden />
}
