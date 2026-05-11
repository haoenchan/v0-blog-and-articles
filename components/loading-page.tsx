'use client'

import Image from 'next/image'

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden">
      <style>{`
        @keyframes run {
          0% {
            left: -100px;
          }
          25% {
            left: 20%;
          }
          50% {
            left: 50%;
            transform: scaleX(1);
          }
          75% {
            left: 80%;
            transform: scaleX(-1);
          }
          100% {
            left: calc(100% + 100px);
            transform: scaleX(-1);
          }
        }
        
        .einstein-running {
          animation: run 3s ease-in-out forwards;
        }
      `}</style>
      <div className="relative w-24 h-24">
        <Image
          src="/einstein-pixel.jpg"
          alt="Loading"
          fill
          className="object-contain einstein-running"
          priority
        />
      </div>
    </div>
  )
}
