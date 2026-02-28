import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/blog-data"
import { ArticleContent } from "@/components/article-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} - Your Name`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Back Link */}
      <div className="pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>
      </div>

      {/* Article Header */}
      <header className="py-12 sm:py-16">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.category}</span>
          <span className="text-border">{"/"}</span>
          <time>{post.date}</time>
          <span className="text-border">{"/"}</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {post.excerpt}
        </p>
      </header>

      <div className="border-t border-border" />

      {/* Article Body */}
      <ArticleContent content={post.content} />

      {/* Article Footer */}
      <div className="border-t border-border" />
      <div className="flex items-center justify-between py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://yoursite.com/blog/${post.slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Share on X
        </a>
      </div>
    </div>
  )
}
