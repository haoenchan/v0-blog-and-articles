"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface MagneticHoverProps {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}

export function MagneticHover({ 
  children, 
  strength = 0.18, 
  radius = 140,
  className = ""
}: MagneticHoverProps) {
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = Math.hypot(dx, dy) < radius
          ? `translate(${dx * strength}px, ${dy * strength}px)`
          : "translate(0, 0)"
      })
    }
    const onLeave = () => {
      el.style.transform = "translate(0, 0)"
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [strength, radius])
  
  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}
