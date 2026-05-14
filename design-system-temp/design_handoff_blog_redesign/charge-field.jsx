/* global React */
const { useEffect, useRef } = React;

/* ChargeField — animated electric-dipole field behind the page.
 * Ported directly from the source repo (haoenchan/v0-blog-and-articles).
 * The `opacity` and `density` props let us dial the signature down/up. */
function ChargeField({ opacity = 1, density = 16, paused = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cc = canvas.getContext("2d");
    if (!cc) return;

    let animId;
    let ct = 0;

    const NUM_LINES = density;
    const TRACE_STEPS = 220;
    const STEP_SIZE = 3.5;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function netField(px, py, qx, qy, ex, ey) {
      let dxP = px - qx, dyP = py - qy;
      let r2P = dxP * dxP + dyP * dyP;
      if (r2P < 1) r2P = 1;
      const rP = Math.sqrt(r2P);
      const eP = 1 / r2P;
      const ePx = eP * (dxP / rP);
      const ePy = eP * (dyP / rP);

      let dxN = ex - px, dyN = ey - py;
      let r2N = dxN * dxN + dyN * dyN;
      if (r2N < 1) r2N = 1;
      const rN = Math.sqrt(r2N);
      const eN = 1 / r2N;
      const eNx = eN * (dxN / rN);
      const eNy = eN * (dyN / rN);

      const fx = ePx + eNx;
      const fy = ePy + eNy;
      let mag = Math.sqrt(fx * fx + fy * fy);
      if (mag < 1e-10) mag = 1e-10;
      return { dx: fx / mag, dy: fy / mag, mag };
    }

    function drawArrowHead(x, y, angle, alpha) {
      const len = 5;
      cc.beginPath();
      cc.moveTo(x, y);
      cc.lineTo(x - len * Math.cos(angle - 0.38), y - len * Math.sin(angle - 0.38));
      cc.moveTo(x, y);
      cc.lineTo(x - len * Math.cos(angle + 0.38), y - len * Math.sin(angle + 0.38));
      cc.strokeStyle = `rgba(255,255,255,${alpha * opacity})`;
      cc.lineWidth = 1;
      cc.stroke();
    }

    function draw() {
      cc.clearRect(0, 0, canvas.width, canvas.height);
      const CW = canvas.width;
      const CH = canvas.height;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sf = Math.min(window.scrollY / maxScroll, 1);

      const spread = (1 - sf) * CW * 0.30 + 30;
      const midX = CW * 0.5;
      const midY = CH * 0.5 + Math.sin(ct * 0.25) * 20;

      const posX = midX + spread + Math.sin(ct * 0.3) * 8;
      const posY = midY + Math.sin(ct * 0.22) * 10;

      const negX = midX - spread + Math.sin(ct * 0.28 + 1) * 8;
      const negY = midY + Math.sin(ct * 0.19 + 0.5) * 10;

      const R = 7;

      for (let i = 0; i < NUM_LINES; i++) {
        const startAngle = (i / NUM_LINES) * Math.PI * 2;
        let px = posX + Math.cos(startAngle) * (R + 2);
        let py = posY + Math.sin(startAngle) * (R + 2);

        const pts = [{ x: px, y: py }];
        let terminated = false;

        for (let s = 0; s < TRACE_STEPS; s++) {
          const f = netField(px, py, posX, posY, negX, negY);
          px += f.dx * STEP_SIZE;
          py += f.dy * STEP_SIZE;
          pts.push({ x: px, y: py });

          const dNeg = Math.hypot(px - negX, py - negY);
          if (dNeg < R + 3) { terminated = true; break; }
          if (px < -100 || px > CW + 100 || py < -100 || py > CH + 100) break;
          const dPos = Math.hypot(px - posX, py - posY);
          if (s > 5 && dPos < R) break;
        }

        const totalPts = pts.length;
        for (let j = 0; j < totalPts - 1; j++) {
          const frac = j / totalPts;
          const baseAlpha = terminated ? 0.38 : 0.28;
          const alpha = baseAlpha * (1 - frac * 0.7) * opacity;
          cc.beginPath();
          cc.moveTo(pts[j].x, pts[j].y);
          cc.lineTo(pts[j + 1].x, pts[j + 1].y);
          cc.strokeStyle = `rgba(255,255,255,${alpha})`;
          cc.lineWidth = terminated ? 1.0 : 0.8;
          cc.stroke();
        }

        const arrowIdx = Math.floor(totalPts * 0.35);
        if (arrowIdx > 0 && arrowIdx < totalPts - 1) {
          const adx = pts[arrowIdx + 1].x - pts[arrowIdx].x;
          const ady = pts[arrowIdx + 1].y - pts[arrowIdx].y;
          drawArrowHead(pts[arrowIdx].x, pts[arrowIdx].y, Math.atan2(ady, adx), terminated ? 0.45 : 0.3);
        }
        if (terminated && totalPts > 30) {
          const arrowIdx2 = Math.floor(totalPts * 0.7);
          if (arrowIdx2 > 0 && arrowIdx2 < totalPts - 1) {
            const adx = pts[arrowIdx2 + 1].x - pts[arrowIdx2].x;
            const ady = pts[arrowIdx2 + 1].y - pts[arrowIdx2].y;
            drawArrowHead(pts[arrowIdx2].x, pts[arrowIdx2].y, Math.atan2(ady, adx), 0.3);
          }
        }
      }

      const eqAlpha = (0.06 + sf * 0.04) * opacity;
      [{ cx: posX, cy: posY }, { cx: negX, cy: negY }].forEach(({ cx, cy }) => {
        for (let r = 25; r <= 65; r += 20) {
          cc.beginPath();
          cc.arc(cx, cy, r, 0, Math.PI * 2);
          cc.strokeStyle = `rgba(255,255,255,${eqAlpha})`;
          cc.lineWidth = 0.5;
          cc.setLineDash([2, 4]);
          cc.stroke();
          cc.setLineDash([]);
        }
      });

      const glowR = 25 + sf * 10;
      [{ cx: posX, cy: posY }, { cx: negX, cy: negY }].forEach(({ cx, cy }) => {
        const grd = cc.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        grd.addColorStop(0, `rgba(255,255,255,${(0.07 + sf * 0.05) * opacity})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        cc.beginPath();
        cc.arc(cx, cy, glowR, 0, Math.PI * 2);
        cc.fillStyle = grd;
        cc.fill();
      });

      // +q
      cc.beginPath();
      cc.arc(posX, posY, R, 0, Math.PI * 2);
      cc.fillStyle = `rgba(20,20,20,${0.9 * opacity})`;
      cc.fill();
      cc.strokeStyle = `rgba(255,255,255,${0.75 * opacity})`;
      cc.lineWidth = 1.1;
      cc.stroke();
      const ps = 3.5;
      cc.strokeStyle = `rgba(255,255,255,${0.85 * opacity})`;
      cc.lineWidth = 1.2;
      cc.lineCap = "round";
      cc.beginPath();
      cc.moveTo(posX - ps, posY); cc.lineTo(posX + ps, posY);
      cc.moveTo(posX, posY - ps); cc.lineTo(posX, posY + ps);
      cc.stroke();
      cc.font = "italic 10px Georgia, serif";
      cc.fillStyle = `rgba(255,255,255,${0.50 * opacity})`;
      cc.textAlign = "left";
      cc.textBaseline = "middle";
      cc.fillText("+q", posX + R + 4, posY - 8);

      // -e
      cc.beginPath();
      cc.arc(negX, negY, R, 0, Math.PI * 2);
      cc.fillStyle = `rgba(20,20,20,${0.9 * opacity})`;
      cc.fill();
      cc.strokeStyle = `rgba(255,255,255,${0.75 * opacity})`;
      cc.lineWidth = 1.1;
      cc.stroke();
      cc.strokeStyle = `rgba(255,255,255,${0.85 * opacity})`;
      cc.lineWidth = 1.2;
      cc.beginPath();
      cc.moveTo(negX - ps, negY); cc.lineTo(negX + ps, negY);
      cc.stroke();
      cc.font = "italic 10px Georgia, serif";
      cc.fillStyle = `rgba(255,255,255,${0.50 * opacity})`;
      cc.textAlign = "right";
      cc.fillText("−e", negX - R - 4, negY - 8);

      if (sf > 0.6) {
        const labelAlpha = (sf - 0.6) * 2.5 * 0.4 * opacity;
        cc.font = "10px Georgia, serif";
        cc.fillStyle = `rgba(255,255,255,${labelAlpha})`;
        cc.textAlign = "center";
        cc.fillText("F = kq\u2081q\u2082/r\u00b2", midX, midY + 38);
      }

      ct += 0.012;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [opacity, density, paused]);

  return (
    <canvas
      ref={canvasRef}
      className="charge-field"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

window.ChargeField = ChargeField;
