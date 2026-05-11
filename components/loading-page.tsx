'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingPage() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="/einstein-pixel.jpg"
            alt="Loading"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Calculating Physics{dots}
          </h2>
          <p className="text-sm text-muted-foreground">
            Unlocking the mysteries of the universe
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
