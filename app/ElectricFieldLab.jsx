
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Zap,
  Plus,
  Minus,
  RotateCcw,
  MousePointer2,
  Settings2,
  Info,
  Activity,
  Trash2,
  Move,
  GripHorizontal
} from 'lucide-react';

const App = () => {
  // --- Simulation State ---
  const [charges, setCharges] = useState([
    { id: 1, x: -150, y: 0, q: 5 },
    { id: 2, x: 150, y: 0, q: -5 }
  ]);
  const [testCharges, setTestCharges] = useState([]); // Array of { id, x, y, vx, vy }
  const [showPotential, setShowPotential] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [brushCharge, setBrushCharge] = useState(5);
  const [isSimulating, setIsSimulating] = useState(true);

  // Dragging State
  const [draggedId, setDraggedId] = useState(null);

  const canvasRef = useRef(null);
  const K = 5000;
  const dt = 0.5;
  const gridSpacing = 30;

  // --- Physics Calculations ---
  const getFieldAt = (x, y) => {
    let ex = 0;
    let ey = 0;
    let v = 0;

    charges.forEach(c => {
      const dx = x - c.x;
      const dy = y - c.y;
      const r2 = dx * dx + dy * dy;
      const r = Math.sqrt(r2);

      if (r < 15) return;

      const magnitude = (K * c.q) / r2;
      ex += magnitude * (dx / r);
      ey += magnitude * (dy / r);
      v += (K * c.q) / r;
    });

    return { ex, ey, v };
  };

  // --- Test Charges Animation ---
  useEffect(() => {
    if (!isSimulating || testCharges.length === 0) return;

    let frame;
    const update = () => {
      setTestCharges(prevCharges => {
        return prevCharges
          .map(tc => {
            const { ex, ey } = getFieldAt(tc.x, tc.y);

            // F = qE, assume m=1, q=1 for test charge
            const ax = ex;
            const ay = ey;

            const nextVx = tc.vx + ax * dt;
            const nextVy = tc.vy + ay * dt;
            const nextX = tc.x + nextVx * dt;
            const nextY = tc.y + nextVy * dt;

            return { ...tc, x: nextX, y: nextY, vx: nextVx, vy: nextVy };
          })
          // Filter out charges that drift too far off screen
          .filter(tc => Math.abs(tc.x) < 1000 && Math.abs(tc.y) < 1000);
      });
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isSimulating, charges, testCharges.length]);

  // --- Canvas Rendering ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (showPotential) {
      const step = 10;
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const simX = x - w / 2;
          const simY = y - h / 2;
          const { v } = getFieldAt(simX, simY);

          const opacity = Math.min(Math.abs(v) / 600, 0.5);
          ctx.fillStyle = v > 0
            ? `rgba(239, 68, 68, ${opacity})`
            : `rgba(59, 130, 246, ${opacity})`;
          ctx.fillRect(x, y, step, step);
        }
      }
    }

    if (showVectors) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      for (let x = gridSpacing / 2; x < w; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < h; y += gridSpacing) {
          const simX = x - w / 2;
          const simY = y - h / 2;
          const { ex, ey } = getFieldAt(simX, simY);

          const mag = Math.sqrt(ex * ex + ey * ey);
          if (mag < 0.05) continue;

          const len = Math.min(mag * 2, gridSpacing * 0.7);
          const angle = Math.atan2(ey, ex);

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.globalAlpha = Math.min(mag / 12, 0.5);
          ctx.beginPath();
          ctx.moveTo(-len / 2, 0);
          ctx.lineTo(len / 2, 0);
          ctx.lineTo(len / 2 - 4, -3);
          ctx.moveTo(len / 2, 0);
          ctx.lineTo(len / 2 - 4, 3);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }, [charges, showPotential, showVectors]);

  // --- Interaction Handlers ---
  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Check if we clicked an existing charge to drag
    const clickedCharge = charges.find(c => {
      const dist = Math.sqrt((c.x - x) ** 2 + (c.y - y) ** 2);
      return dist < 20;
    });

    if (clickedCharge) {
      setDraggedId(clickedCharge.id);
      return;
    }

    if (e.shiftKey) {
      setTestCharges(prev => [...prev, { id: Date.now(), x, y, vx: 0, vy: 0 }]);
    } else {
      setCharges([...charges, { id: Date.now(), x, y, q: brushCharge }]);
    }
  };

  const handleMouseMove = (e) => {
    if (draggedId === null) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCharges(prev => prev.map(c => c.id === draggedId ? { ...c, x, y } : c));
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  const clearAll = () => {
    setCharges([]);
    setTestCharges([]);
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <Zap className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">Electric Field Lab</h1>
              <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Computational Physics Simulator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
              <button
                onClick={() => setBrushCharge(5)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${brushCharge > 0 ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Plus size={14} strokeWidth={3} /> POSITIVE
              </button>
              <button
                onClick={() => setBrushCharge(-5)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${brushCharge < 0 ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Minus size={14} strokeWidth={3} /> NEGATIVE
              </button>
            </div>
            <button
              onClick={clearAll}
              className="p-3.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-2xl transition-all border border-slate-700"
              title="Clear all"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Main Visualizer */}
          <div className="lg:col-span-8 relative bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden group cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handleCanvasMouseDown}
              className="w-full h-full block"
            />

            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full">
                {/* Point Charges */}
                {charges.map(c => (
                  <div
                    key={c.id}
                    className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-white/40 flex items-center justify-center text-[11px] font-black shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing transition-transform hover:scale-110 ${c.q > 0 ? 'bg-red-500 shadow-red-500/20' : 'bg-blue-500 shadow-blue-500/20'}`}
                    style={{ left: `calc(50% + ${c.x}px)`, top: `calc(50% + ${c.y}px)` }}
                  >
                    {c.q > 0 ? '+' : '-'}{Math.abs(c.q)}
                  </div>
                ))}

                {/* Test Charges */}
                {testCharges.map(tc => (
                  <div
                    key={tc.id}
                    className="absolute w-4 h-4 -ml-2 -mt-2 bg-yellow-400 rounded-full border border-white shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                    style={{ left: `calc(50% + ${tc.x}px)`, top: `calc(50% + ${tc.y}px)` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute top-6 left-6 flex gap-3">
              <div className="bg-slate-950/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Live Engine Active</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 flex flex-wrap gap-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-slate-950/90 backdrop-blur px-3 py-2 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MousePointer2 size={12} /> Click: Add Charge
              </div>
              <div className="bg-slate-950/90 backdrop-blur px-3 py-2 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Move size={12} /> Drag: Move Charge
              </div>
              <div className="bg-slate-950/90 backdrop-blur px-3 py-2 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} /> Shift+Click: New Test Charge
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <Settings2 size={20} className="text-blue-400" />
                <h2 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Lab Configurations</h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-600 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                      <Activity size={20} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-black tracking-wide uppercase">Vector Grid</span>
                  </div>
                  <input type="checkbox" checked={showVectors} onChange={e => setShowVectors(e.target.checked)} className="w-6 h-6 rounded-lg accent-blue-500" />
                </label>

                <label className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-600 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                      <Zap size={20} className="text-red-400" />
                    </div>
                    <span className="text-sm font-black tracking-wide uppercase">Potential</span>
                  </div>
                  <input type="checkbox" checked={showPotential} onChange={e => setShowPotential(e.target.checked)} className="w-6 h-6 rounded-lg accent-red-500" />
                </label>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800/50">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Real-time Telemetry</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-[8px] font-black text-slate-600 uppercase mb-2">Static Q</div>
                    <div className="text-2xl font-mono font-bold text-white leading-none">{charges.length}</div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-[8px] font-black text-slate-600 uppercase mb-2">Test Particles</div>
                    <div className="text-2xl font-mono font-bold text-white leading-none">
                      {testCharges.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Info size={120} />
              </div>
              <div className="flex items-center gap-3 mb-6 text-blue-400 relative z-10">
                <Info size={20} strokeWidth={2.5} />
                <h2 className="font-black text-xs uppercase tracking-[0.2em]">Scientific Review</h2>
              </div>
              <div className="space-y-6 text-sm text-slate-400 leading-relaxed relative z-10">
                <p>
                  The electric field <i className="font-serif">E</i> from a point charge <i className="font-serif">q</i> is governed by <b>Coulomb's Law</b>:
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl font-mono text-center text-blue-400 text-lg border border-blue-500/10 shadow-lg shadow-blue-500/5">
                  E = k · (q / r²)
                </div>
                <p>
                  The electric potential <i className="font-serif">V</i> represents the scalar field:
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl font-mono text-center text-red-400 text-lg border border-red-500/10 shadow-lg shadow-red-500/5">
                  V = k · (q / r)
                </div>
                <p className="text-xs italic text-slate-500 border-t border-slate-800/50 pt-4">
                  Trajectory calculation is computed for all active test particles independently using the principle of superposition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;