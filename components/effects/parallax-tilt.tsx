"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ParallaxTiltProps {
  children: ReactNode
  max?: number
  className?: string
}

export function ParallaxTilt({ 
  children, 
  max = 6,
  className = ""
}: ParallaxTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
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
    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)"
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [max])
  
  return (
    <div ref={ref} className={`parallax-tilt ${className}`}>
      {children}
    </div>
  )
}
