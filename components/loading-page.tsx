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

      <div className="einstein-runner relative" style={{ width: '100px', height: '140px' }}>
        {/* Head - wild hair */}
        <div className="absolute" style={{ left: '30px', top: '10px', width: '40px', height: '35px' }}>
          {/* Hair top left */}
          <div className="absolute bg-amber-700" style={{ left: '5px', top: '0px', width: '8px', height: '8px' }} />
          <div className="absolute bg-amber-700" style={{ left: '0px', top: '5px', width: '8px', height: '8px' }} />
          <div className="absolute bg-amber-700" style={{ left: '2px', top: '12px', width: '6px', height: '6px' }} />
          
          {/* Face */}
          <div className="absolute bg-amber-100" style={{ left: '10px', top: '8px', width: '20px', height: '20px' }} />
          
          {/* Eyes */}
          <div className="absolute bg-black" style={{ left: '14px', top: '12px', width: '4px', height: '4px' }} />
          <div className="absolute bg-black" style={{ left: '24px', top: '12px', width: '4px', height: '4px' }} />
          
          {/* Hair top right */}
          <div className="absolute bg-amber-700" style={{ left: '27px', top: '0px', width: '8px', height: '8px' }} />
          <div className="absolute bg-amber-700" style={{ left: '32px', top: '5px', width: '8px', height: '8px' }} />
          <div className="absolute bg-amber-700" style={{ left: '32px', top: '12px', width: '6px', height: '6px' }} />
          
          {/* Mouth */}
          <div className="absolute bg-gray-700" style={{ left: '16px', top: '22px', width: '8px', height: '2px' }} />
        </div>

        {/* Body */}
        <div className="absolute bg-red-600" style={{ left: '35px', top: '48px', width: '30px', height: '28px' }} />

        {/* Left Arm */}
        <div className="arm-left absolute bg-amber-100" style={{ left: '28px', top: '52px', width: '8px', height: '24px' }} />

        {/* Right Arm */}
        <div className="arm-right absolute bg-amber-100" style={{ left: '64px', top: '52px', width: '8px', height: '24px' }} />

        {/* Left Leg */}
        <div className="leg-left absolute bg-gray-800" style={{ left: '40px', top: '76px', width: '8px', height: '30px' }} />

        {/* Right Leg */}
        <div className="leg-right absolute bg-gray-800" style={{ left: '52px', top: '76px', width: '8px', height: '30px' }} />

        {/* Left Shoe */}
        <div className="absolute bg-black" style={{ left: '38px', top: '106px', width: '12px', height: '8px' }} />

        {/* Right Shoe */}
        <div className="absolute bg-black" style={{ left: '50px', top: '106px', width: '12px', height: '8px' }} />
      </div>
    </div>
  )
}
