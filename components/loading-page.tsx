'use client'

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden">
      <style>{`
        @keyframes run {
          0% {
            left: -120px;
          }
          100% {
            left: calc(100% + 120px);
          }
        }

        @keyframes legLeft {
          0%, 100% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(45deg);
          }
        }

        @keyframes legRight {
          0%, 100% {
            transform: rotateX(-45deg);
          }
          50% {
            transform: rotateX(0deg);
          }
        }

        @keyframes armLeft {
          0%, 100% {
            transform: rotateZ(-45deg);
          }
          50% {
            transform: rotateZ(45deg);
          }
        }

        @keyframes armRight {
          0%, 100% {
            transform: rotateZ(45deg);
          }
          50% {
            transform: rotateZ(-45deg);
          }
        }

        .einstein-runner {
          animation: run 4s linear infinite;
          position: relative;
        }

        .pixel {
          display: inline-block;
        }

        .leg-left {
          animation: legLeft 0.4s ease-in-out infinite;
          transform-origin: top center;
        }

        .leg-right {
          animation: legRight 0.4s ease-in-out infinite;
          transform-origin: top center;
        }

        .arm-left {
          animation: armLeft 0.4s ease-in-out infinite;
          transform-origin: top right;
        }

        .arm-right {
          animation: armRight 0.4s ease-in-out infinite;
          transform-origin: top left;
        }
      `}</style>

      <div className="einstein-runner relative" style={{ width: '140px', height: '180px' }}>
        {/* WILD HAIR - Big and iconic */}
        {/* Top left spike */}
        <div className="absolute bg-slate-400" style={{ left: '20px', top: '0px', width: '6px', height: '12px' }} />
        <div className="absolute bg-slate-400" style={{ left: '14px', top: '4px', width: '8px', height: '8px' }} />
        <div className="absolute bg-slate-400" style={{ left: '10px', top: '10px', width: '8px', height: '6px' }} />
        
        {/* Top center */}
        <div className="absolute bg-slate-400" style={{ left: '28px', top: '-2px', width: '6px', height: '14px' }} />
        <div className="absolute bg-slate-400" style={{ left: '34px', top: '0px', width: '6px', height: '14px' }} />
        
        {/* Top right spike */}
        <div className="absolute bg-slate-400" style={{ left: '54px', top: '0px', width: '6px', height: '12px' }} />
        <div className="absolute bg-slate-400" style={{ left: '54px', top: '4px', width: '8px', height: '8px' }} />
        <div className="absolute bg-slate-400" style={{ left: '62px', top: '10px', width: '8px', height: '6px' }} />
        
        {/* Side hair left */}
        <div className="absolute bg-slate-400" style={{ left: '8px', top: '16px', width: '8px', height: '8px' }} />
        
        {/* Side hair right */}
        <div className="absolute bg-slate-400" style={{ left: '68px', top: '16px', width: '8px', height: '8px' }} />
        
        {/* HEAD - Face */}
        <div className="absolute bg-yellow-100" style={{ left: '24px', top: '12px', width: '28px', height: '32px' }} />
        
        {/* Eyes - with personality */}
        <div className="absolute bg-gray-800" style={{ left: '30px', top: '18px', width: '5px', height: '6px' }} />
        <div className="absolute bg-gray-800" style={{ left: '43px', top: '18px', width: '5px', height: '6px' }} />
        
        {/* Eyebrows - expressive */}
        <div className="absolute bg-slate-400" style={{ left: '28px', top: '16px', width: '8px', height: '2px' }} />
        <div className="absolute bg-slate-400" style={{ left: '40px', top: '16px', width: '8px', height: '2px' }} />
        
        {/* Nose */}
        <div className="absolute bg-yellow-50" style={{ left: '36px', top: '26px', width: '4px', height: '4px' }} />
        
        {/* Mouth - smile */}
        <div className="absolute bg-amber-900" style={{ left: '32px', top: '34px', width: '12px', height: '2px' }} />
        
        {/* Mustache - iconic */}
        <div className="absolute bg-slate-400" style={{ left: '30px', top: '32px', width: '4px', height: '3px' }} />
        <div className="absolute bg-slate-400" style={{ left: '36px', top: '31px', width: '2px', height: '4px' }} />
        <div className="absolute bg-slate-400" style={{ left: '40px', top: '31px', width: '2px', height: '4px' }} />
        <div className="absolute bg-slate-400" style={{ left: '46px', top: '32px', width: '4px', height: '3px' }} />

        {/* BODY - Coat */}
        <div className="absolute bg-gray-700" style={{ left: '20px', top: '44px', width: '36px', height: '48px' }} />
        
        {/* Coat lapels/buttons */}
        <div className="absolute bg-gray-600" style={{ left: '22px', top: '46px', width: '4px', height: '6px' }} />
        <div className="absolute bg-gray-600" style={{ left: '22px', top: '56px', width: '4px', height: '6px' }} />
        <div className="absolute bg-gray-600" style={{ left: '22px', top: '66px', width: '4px', height: '6px' }} />

        {/* Tie */}
        <div className="absolute bg-red-600" style={{ left: '34px', top: '44px', width: '8px', height: '14px' }} />

        {/* LEFT ARM */}
        <div className="arm-left absolute bg-yellow-100" style={{ left: '16px', top: '56px', width: '6px', height: '32px' }} />
        {/* Left hand */}
        <div className="absolute bg-yellow-100" style={{ left: '14px', top: '88px', width: '10px', height: '8px' }} />

        {/* RIGHT ARM */}
        <div className="arm-right absolute bg-yellow-100" style={{ left: '70px', top: '56px', width: '6px', height: '32px' }} />
        {/* Right hand */}
        <div className="absolute bg-yellow-100" style={{ left: '70px', top: '88px', width: '10px', height: '8px' }} />

        {/* LEFT LEG */}
        <div className="leg-left absolute bg-gray-900" style={{ left: '30px', top: '92px', width: '6px', height: '36px' }} />
        {/* Left shoe */}
        <div className="absolute bg-black" style={{ left: '28px', top: '128px', width: '10px', height: '8px' }} />

        {/* RIGHT LEG */}
        <div className="leg-right absolute bg-gray-900" style={{ left: '42px', top: '92px', width: '6px', height: '36px' }} />
        {/* Right shoe */}
        <div className="absolute bg-black" style={{ left: '40px', top: '128px', width: '10px', height: '8px' }} />
      </div>
    </div>
  )
}
