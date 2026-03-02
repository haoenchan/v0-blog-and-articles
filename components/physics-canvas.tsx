"use client"

import { useEffect, useRef } from "react"

export function PhysicsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let t = 0

    function resize() {
      if (!canvas || !container) return
      canvas.width = container.offsetWidth
      canvas.height = container.scrollHeight
    }
    resize()
    window.addEventListener("resize", resize)
    const ro = new ResizeObserver(() => resize())
    ro.observe(container)

    const W = "rgba(255,255,255,0.55)"
    const WD = "rgba(255,255,255,0.20)"
    const WT = "rgba(255,255,255,0.50)"

    function label(text: string, x: number, y: number, align: CanvasTextAlign = "left", italic = true) {
      ctx!.save()
      ctx!.font = italic ? "italic 11px Georgia, serif" : "10px Georgia, serif"
      ctx!.fillStyle = WT
      ctx!.textAlign = align
      ctx!.textBaseline = "middle"
      ctx!.fillText(text, x, y)
      ctx!.restore()
    }

    function arrow(x1: number, y1: number, x2: number, y2: number, alpha = 0.7) {
      const ang = Math.atan2(y2 - y1, x2 - x1)
      const len = 7
      ctx!.beginPath()
      ctx!.moveTo(x1, y1)
      ctx!.lineTo(x2, y2)
      ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
      ctx!.lineWidth = 1.2
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.moveTo(x2, y2)
      ctx!.lineTo(x2 - len * Math.cos(ang - 0.4), y2 - len * Math.sin(ang - 0.4))
      ctx!.moveTo(x2, y2)
      ctx!.lineTo(x2 - len * Math.cos(ang + 0.4), y2 - len * Math.sin(ang + 0.4))
      ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
      ctx!.lineWidth = 1.2
      ctx!.stroke()
    }

    function drawPendulum(t: number) {
      const cx = canvas!.width - 100
      const cy = 150
      const L = 105
      const theta = 0.38
      const phi = t * 0.9
      const bx3 = L * Math.sin(theta) * Math.cos(phi)
      const by3 = -L * Math.cos(theta)
      const bz3 = L * Math.sin(theta) * Math.sin(phi)
      const proj = (x: number, y: number, z: number) => ({
        x: cx + x * 0.85 - z * 0.85,
        y: cy - y * 0.9 + x * 0.38 + z * 0.38,
      })
      const pivotS = proj(0, 0, 0)
      const bobS = proj(bx3, by3, bz3)
      const orbitR3x = L * Math.sin(theta)

      // Orbit path
      ctx!.save()
      ctx!.setLineDash([3, 5])
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.9
      ctx!.beginPath()
      let first = true
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        const sp = proj(orbitR3x * Math.cos(a), by3, orbitR3x * Math.sin(a))
        first ? ctx!.moveTo(sp.x, sp.y) : ctx!.lineTo(sp.x, sp.y)
        first = false
      }
      ctx!.closePath()
      ctx!.stroke()
      ctx!.restore()

      // Vertical axis
      const axisBottom = proj(0, by3, 0)
      ctx!.save()
      ctx!.setLineDash([4, 4])
      ctx!.beginPath()
      ctx!.moveTo(pivotS.x, pivotS.y)
      ctx!.lineTo(axisBottom.x, axisBottom.y)
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.8
      ctx!.stroke()
      ctx!.restore()

      // Radius line
      ctx!.save()
      ctx!.setLineDash([3, 4])
      ctx!.beginPath()
      ctx!.moveTo(axisBottom.x, axisBottom.y)
      ctx!.lineTo(bobS.x, bobS.y)
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.8
      ctx!.stroke()
      ctx!.restore()
      label("r", (axisBottom.x + bobS.x) / 2 - 6, (axisBottom.y + bobS.y) / 2 + 6)

      // θ arc
      const arcR = 26
      ctx!.save()
      ctx!.setLineDash([])
      ctx!.beginPath()
      let arcFirst = true
      for (let i = 0; i <= 12; i++) {
        const a = (i / 12) * theta
        const sp = proj(Math.sin(a) * Math.cos(phi) * arcR, -Math.cos(a) * arcR, Math.sin(a) * Math.sin(phi) * arcR)
        arcFirst ? ctx!.moveTo(sp.x, sp.y) : ctx!.lineTo(sp.x, sp.y)
        arcFirst = false
      }
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.9
      ctx!.stroke()
      ctx!.restore()
      const arcMid = proj(
        Math.sin(theta / 2) * Math.cos(phi) * arcR * 1.45,
        -Math.cos(theta / 2) * arcR * 1.45,
        Math.sin(theta / 2) * Math.sin(phi) * arcR * 1.45
      )
      label("θ", arcMid.x, arcMid.y)

      // String
      ctx!.beginPath()
      ctx!.moveTo(pivotS.x, pivotS.y)
      ctx!.lineTo(bobS.x, bobS.y)
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1.3
      ctx!.stroke()
      label("ℓ", (pivotS.x + bobS.x) / 2 + 9, (pivotS.y + bobS.y) / 2 - 8)

      // Pivot
      ctx!.beginPath()
      ctx!.arc(pivotS.x, pivotS.y, 4, 0, Math.PI * 2)
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1.2
      ctx!.stroke()

      // Ceiling hatch
      ctx!.save()
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.8
      for (let i = -2; i <= 2; i++) {
        ctx!.beginPath()
        ctx!.moveTo(pivotS.x + i * 8 - 4, pivotS.y - 8)
        ctx!.lineTo(pivotS.x + i * 8 + 4, pivotS.y - 14)
        ctx!.stroke()
      }
      ctx!.beginPath()
      ctx!.moveTo(pivotS.x - 20, pivotS.y - 8)
      ctx!.lineTo(pivotS.x + 20, pivotS.y - 8)
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1
      ctx!.stroke()
      ctx!.restore()

      // Bob
      ctx!.beginPath()
      ctx!.arc(bobS.x, bobS.y, 10, 0, Math.PI * 2)
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1.3
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.arc(bobS.x - 3, bobS.y - 3, 2, 0, Math.PI * 2)
      ctx!.fillStyle = "rgba(255,255,255,0.35)"
      ctx!.fill()
      label("m", bobS.x + 14, bobS.y - 2)

      // Force vectors
      const strDx = pivotS.x - bobS.x, strDy = pivotS.y - bobS.y
      const strLen = Math.hypot(strDx, strDy)
      const tScale = 42
      arrow(bobS.x, bobS.y, bobS.x + (strDx / strLen) * tScale, bobS.y + (strDy / strLen) * tScale, 0.7)
      label("T", bobS.x + (strDx / strLen) * tScale + 5, bobS.y + (strDy / strLen) * tScale - 5)

      arrow(bobS.x, bobS.y, bobS.x, bobS.y + 44, 0.65)
      label("mg", bobS.x + 5, bobS.y + 53)

      const TcosLen = tScale * Math.cos(theta)
      arrow(bobS.x, bobS.y, bobS.x, bobS.y - TcosLen, 0.45)
      label("T cosθ", bobS.x - 52, bobS.y - TcosLen + 2, "left", false)

      const inDx = axisBottom.x - bobS.x, inDy = axisBottom.y - bobS.y
      const inLen = Math.hypot(inDx, inDy)
      const TsinLen = tScale * Math.sin(theta)
      const cEx = bobS.x + (inDx / inLen) * TsinLen
      const cEy = bobS.y + (inDy / inLen) * TsinLen
      arrow(bobS.x, bobS.y, cEx, cEy, 0.45)
      label("T sinθ = mv²/r", cEx + 4, cEy + 10, "left", false)

      ctx!.save()
      ctx!.setLineDash([3, 3])
      arrow(bobS.x, bobS.y, bobS.x - (inDx / inLen) * TsinLen * 0.8, bobS.y - (inDy / inLen) * TsinLen * 0.8, 0.28)
      ctx!.restore()

      // Velocity
      const vx3 = -Math.sin(phi)
      const vz3 = Math.cos(phi)
      const vEnd = proj(bx3 + vx3 * 38 * 0.45, by3, bz3 + vz3 * 38 * 0.45)
      arrow(bobS.x, bobS.y, vEnd.x, vEnd.y, 0.55)
      label("v", vEnd.x + 5, vEnd.y - 5)
    }

    function drawSpring(t: number) {
      const wallL = 18
      const wallR = canvas!.width > 500 ? 390 : 360
      const wallY = 530
      const m1rest = 138
      const m2rest = 258
      const bw = 26, bh = 26
      const coilH = 6

      const blend = 0.5 + 0.5 * Math.sin(t * 0.18)
      const A = 28
      const omega1 = 1.05
      const omega2 = 1.82

      const x1 = A * (blend * Math.cos(omega1 * t) + (1 - blend) * Math.cos(omega2 * t))
      const x2 = A * (blend * Math.cos(omega1 * t) - (1 - blend) * Math.cos(omega2 * t))
      const m1x = m1rest + x1
      const m2x = m2rest + x2
      const k = 0.85
      const F1 = -k * x1 + k * (x2 - x1)
      const F2 = -k * (x2 - x1) - k * x2

      function zigzag(x0: number, x1end: number, y: number, coils: number, lbl: string) {
        const len = x1end - x0
        const sw = len / (coils * 2)
        ctx!.beginPath()
        ctx!.moveTo(x0, y)
        for (let i = 0; i < coils * 2; i++) {
          ctx!.lineTo(x0 + (i + 1) * sw, y + (i % 2 === 0 ? -coilH : coilH))
        }
        ctx!.lineTo(x1end, y)
        ctx!.strokeStyle = W
        ctx!.lineWidth = 1.1
        ctx!.lineJoin = "round"
        ctx!.stroke()
        label(lbl, x0 + len * 0.5, y - 14)
      }

      function wall(x: number, y: number, dir = -1) {
        ctx!.beginPath()
        ctx!.moveTo(x, y - 38)
        ctx!.lineTo(x, y + 38)
        ctx!.strokeStyle = W
        ctx!.lineWidth = 1.5
        ctx!.stroke()
        for (let i = -3; i <= 3; i++) {
          ctx!.beginPath()
          ctx!.moveTo(x, y + i * 12)
          ctx!.lineTo(x + dir * 10, y + i * 12)
          ctx!.strokeStyle = WD
          ctx!.lineWidth = 0.8
          ctx!.stroke()
        }
      }

      function massBlock(cx: number, y: number, lbl: string) {
        ctx!.strokeStyle = W
        ctx!.lineWidth = 1.2
        ctx!.strokeRect(cx - bw / 2, y - bh / 2, bw, bh)
        label(lbl, cx, y, "center")
      }

      // Equilibrium lines
      ctx!.save()
      ctx!.setLineDash([2, 4])
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.7
      ;[m1rest, m2rest].forEach((rx) => {
        ctx!.beginPath()
        ctx!.moveTo(rx, wallY - bh / 2 - 8)
        ctx!.lineTo(rx, wallY + bh / 2 + 32)
        ctx!.stroke()
      })
      ctx!.restore()

      wall(wallL, wallY, -1)
      wall(wallR, wallY, 1)
      zigzag(wallL, m1x - bw / 2, wallY, 7, "k₁")
      zigzag(m1x + bw / 2, m2x - bw / 2, wallY, 6, "k₂")
      zigzag(m2x + bw / 2, wallR, wallY, 7, "k₃")
      massBlock(m1x, wallY, "m₁")
      massBlock(m2x, wallY, "m₂")

      // Displacement annotations
      const annotY = wallY + bh / 2 + 18
      const pairs: [number, number, string][] = [[m1rest, m1x, "x₁"], [m2rest, m2x, "x₂"]]
      pairs.forEach(([rx, mx, lbl]) => {
        if (Math.abs(mx - rx) > 2) {
          ctx!.save()
          ctx!.setLineDash([2, 3])
          ctx!.beginPath()
          ctx!.moveTo(rx, annotY)
          ctx!.lineTo(mx, annotY)
          ctx!.strokeStyle = WD
          ctx!.lineWidth = 0.8
          ctx!.stroke()
          ctx!.restore()
          ;[rx, mx].forEach((xx) => {
            ctx!.beginPath()
            ctx!.moveTo(xx, annotY - 3)
            ctx!.lineTo(xx, annotY + 3)
            ctx!.strokeStyle = WD
            ctx!.lineWidth = 0.8
            ctx!.stroke()
          })
          label(lbl, (rx + mx) / 2, annotY + 11, "center")
        }
      })

      // Force arrows
      const fScale = 0.55
      if (Math.abs(F1) > 1.5) {
        const fx1end = m1x + (F1 > 0 ? bw / 2 + 6 : -bw / 2 - 6) + F1 * fScale
        arrow(m1x + (F1 > 0 ? bw / 2 : -bw / 2), wallY - 8, fx1end, wallY - 8, 0.65)
        label("F₁", fx1end + (F1 > 0 ? 4 : -18), wallY - 18, "left", false)
      }
      if (Math.abs(F2) > 1.5) {
        const fx2end = m2x + (F2 > 0 ? bw / 2 + 6 : -bw / 2 - 6) + F2 * fScale
        arrow(m2x + (F2 > 0 ? bw / 2 : -bw / 2), wallY - 8, fx2end, wallY - 8, 0.65)
        label("F₂", fx2end + (F2 > 0 ? 4 : -18), wallY - 18, "left", false)
      }

      // Equations
      ctx!.save()
      ctx!.font = "9px Georgia, serif"
      ctx!.fillStyle = "rgba(255,255,255,0.28)"
      ctx!.textAlign = "left"
      ctx!.fillText("F₁ = −k₁x₁ + k₂(x₂−x₁)", wallL, wallY + 68)
      ctx!.fillText("F₂ = −k₂(x₂−x₁) − k₃x₂", wallL, wallY + 82)
      ctx!.restore()

      // Mode indicator
      const modeStr = blend > 0.72 ? "mode 1  (symmetric, ω₁)" : blend < 0.28 ? "mode 2  (antisymmetric, ω₂)" : "superposition  (ω₁ + ω₂)"
      ctx!.save()
      ctx!.font = "9px Georgia, serif"
      ctx!.fillStyle = "rgba(255,255,255,0.32)"
      ctx!.textAlign = "left"
      ctx!.fillText(modeStr, wallL, wallY - 56)
      ctx!.restore()
      label("ω₁² = k/m", wallL, wallY - 46, "left", false)
      ctx!.save()
      ctx!.font = "9px Georgia, serif"
      ctx!.fillStyle = "rgba(255,255,255,0.30)"
      ctx!.textAlign = "left"
      ctx!.fillText("ω₂² = (k+2k₂)/m", wallL, wallY - 34)
      ctx!.restore()
    }

    function drawStandingWave(t: number) {
      const x0 = canvas!.width - 58
      const yTop = 340
      const yBot = 580
      const L = yBot - yTop
      const modes = 3
      const amp = 22

      ;[yTop, yBot].forEach((y) => {
        ctx!.beginPath()
        ctx!.arc(x0, y, 3, 0, Math.PI * 2)
        ctx!.strokeStyle = W
        ctx!.lineWidth = 1
        ctx!.stroke()
      })

      // Mode 1
      ctx!.beginPath()
      for (let i = 0; i <= 100; i++) {
        const frac = i / 100
        const x = x0 + Math.sin(frac * Math.PI) * amp * Math.sin(t * 1.1)
        const y = yTop + frac * L
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
      }
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1.3
      ctx!.stroke()

      // Mode 2
      ctx!.beginPath()
      for (let i = 0; i <= 100; i++) {
        const frac = i / 100
        const x = x0 + Math.sin(frac * Math.PI * 2) * (amp * 0.5) * Math.sin(t * 2.2 + 0.6)
        const y = yTop + frac * L
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
      }
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.9
      ctx!.stroke()

      // Nodes
      for (let n = 0; n <= modes; n++) {
        ctx!.beginPath()
        ctx!.arc(x0, yTop + (n / modes) * L, 2, 0, Math.PI * 2)
        ctx!.fillStyle = WD
        ctx!.fill()
      }
      label("n=1", x0 + 8, yTop + L * 0.5, "left", false)
      label("n=2", x0 + 8, yTop + L * 0.25, "left", false)

      // Wavelength brace
      ctx!.save()
      ctx!.setLineDash([2, 3])
      ctx!.beginPath()
      ctx!.moveTo(x0 - 30, yTop)
      ctx!.lineTo(x0 - 30, yBot)
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.8
      ctx!.stroke()
      ctx!.restore()
      ;[yTop, yBot].forEach((y) => {
        ctx!.beginPath()
        ctx!.moveTo(x0 - 34, y)
        ctx!.lineTo(x0 - 26, y)
        ctx!.strokeStyle = WD
        ctx!.lineWidth = 0.8
        ctx!.stroke()
      })
      label("λ", x0 - 42, (yTop + yBot) / 2, "center")
    }

    function drawRipple(t: number) {
      const cx = 65
      const cy = 750
      const maxR = 55
      const count = 4

      ctx!.beginPath()
      ctx!.arc(cx, cy, 2.5, 0, Math.PI * 2)
      ctx!.fillStyle = W
      ctx!.fill()

      for (let i = 0; i < count; i++) {
        const phase = (t * 0.55 + i * (1 / count)) % 1
        const r = phase * maxR
        const alpha = (1 - phase) * 0.4
        ctx!.beginPath()
        ctx!.arc(cx, cy, r, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx!.lineWidth = 0.9
        ctx!.stroke()
      }
      label("point source", cx + 8, cy - 14, "left", false)

      const r1 = ((t * 0.55) % 1) * maxR
      const r2 = (((t * 0.55) + 1 / count) % 1) * maxR
      if (r1 > 4 && r2 > r1 + 4 && r2 < maxR - 4) {
        ctx!.save()
        ctx!.setLineDash([2, 3])
        ctx!.beginPath()
        ctx!.moveTo(cx + r1, cy)
        ctx!.lineTo(cx + r2, cy)
        ctx!.strokeStyle = WD
        ctx!.lineWidth = 0.8
        ctx!.stroke()
        ctx!.restore()
        label("λ", cx + (r1 + r2) / 2, cy - 7, "center")
      }
    }

    function drawTransverseWave(t: number) {
      const y0 = canvas!.height - 90
      const w = canvas!.width
      const A = 16
      const k = (Math.PI * 5) / w

      ctx!.save()
      ctx!.setLineDash([3, 5])
      ctx!.beginPath()
      ctx!.moveTo(0, y0)
      ctx!.lineTo(w, y0)
      ctx!.strokeStyle = WD
      ctx!.lineWidth = 0.7
      ctx!.stroke()
      ctx!.restore()

      ctx!.beginPath()
      for (let x = 0; x <= w; x += 2) {
        const y = y0 - A * Math.sin(k * x - t * 1.6)
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
      }
      ctx!.strokeStyle = W
      ctx!.lineWidth = 1.2
      ctx!.stroke()

      const crestX = ((Math.PI / 2 + t * 1.6) / k) % w
      if (crestX > 30 && crestX < w - 60) {
        arrow(crestX, y0, crestX, y0 - A, 0.5)
        label("A", crestX + 5, y0 - A / 2, "left")
      }
      arrow(w * 0.78, y0 - 24, w * 0.92, y0 - 24, 0.4)
      label("v", w * 0.85, y0 - 32, "center", false)
    }

    function drawFrame() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawPendulum(t)
      drawSpring(t)
      drawStandingWave(t)
      drawRipple(t)
      drawTransverseWave(t)
      t += 0.022
      animId = requestAnimationFrame(drawFrame)
    }

    drawFrame()

    return () => {
      window.removeEventListener("resize", resize)
      ro.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </div>
  )
}
