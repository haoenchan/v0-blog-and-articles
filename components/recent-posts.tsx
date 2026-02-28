import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface RecentPostsProps {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="mt-8 flex flex-col">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group"
        >
          <article
            className={`relative flex flex-col gap-2.5 py-7 transition-all duration-300 ${index !== posts.length - 1
                ? "border-b border-border/50"
                : ""
              }`}
          >
            {/* Hover background */}
            <div className="pointer-events-none absolute -inset-x-5 -inset-y-1 rounded-2xl bg-gradient-to-r from-primary/[0.04] to-accent/[0.02] opacity-0 transition-all duration-500 group-hover:opacity-100" />

            {/* Meta row */}
            <div className="relative flex items-center gap-3 text-sm">
              <span className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/25 group-hover:shadow-sm group-hover:shadow-primary/10">
                {post.category}
              </span>
              <time className="text-muted-foreground/50 tabular-nums">{post.date}</time>
            </div>

            {/* Title */}
            <h3 className="relative font-serif text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              <span className="flex items-center gap-2">
                {post.title}
                <ArrowUpRight className="inline-block h-4 w-4 -translate-x-1 translate-y-0.5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </span>
            </h3>

            {/* Excerpt */}
            <p className="relative text-sm leading-relaxed text-muted-foreground/65 line-clamp-2 transition-colors duration-300 group-hover:text-muted-foreground/80">
              {post.excerpt}
            </p>

            {/* Read time */}
            <span className="relative mt-0.5 text-sm font-medium text-muted-foreground/50 transition-colors duration-300 group-hover:text-muted-foreground/70">
              {post.readTime}
            </span>
          </article>
        </Link>
      ))}
    </div>
  )
}