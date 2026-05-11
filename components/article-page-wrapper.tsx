'use client'

import { LoadingPage } from "@/components/loading-page"
import { usePageLoading } from "@/hooks/use-page-loading"

interface ArticlePageWrapperProps {
  children: React.ReactNode
}

export function ArticlePageWrapper({ children }: ArticlePageWrapperProps) {
  const isLoading = usePageLoading(1200)

  return (
    <>
      {isLoading && <LoadingPage />}
      {children}
    </>
  )
}
