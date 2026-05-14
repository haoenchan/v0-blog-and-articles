'use client'

import { Suspense } from 'react'
import { LoadingPage } from '@/components/loading-page'
import { usePageLoading } from '@/hooks/use-page-loading'

interface ArticlePageWrapperProps {
  children: React.ReactNode
}

function ArticlePageWrapperInner({ children }: ArticlePageWrapperProps) {
  const isLoading = usePageLoading(1200)
  return (
    <>
      {isLoading && <LoadingPage />}
      {children}
    </>
  )
}

export function ArticlePageWrapper({ children }: ArticlePageWrapperProps) {
  return (
    <Suspense fallback={null}>
      <ArticlePageWrapperInner>{children}</ArticlePageWrapperInner>
    </Suspense>
  )
}
