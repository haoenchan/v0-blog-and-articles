'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function usePageLoading(duration: number = 1500) {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), duration)
    return () => clearTimeout(timer)
  }, [searchParams, duration])

  return isLoading
}
