'use client'
import { useEffect, useState } from 'react'

export function usePageLoading(duration: number = 1500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return isLoading
}
