import Link from "next/link"
import { ArrowUpRight, Clock, Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface RecentPostsProps {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group"
        >
          <article
            className="relative overflow-hidden rounded-2xl bg-card/50 p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:ring-border/60 hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {/* Subtle gradient overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              {/* Top row: category + date */}
              <div className="mb-3 flex items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:ring-primary/25">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground/70">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                <span className="flex items-center gap-2">
                  {post.title}
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-0.5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
              </h3>

              {/* Excerpt */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2 transition-colors duration-300 group-hover:text-muted-foreground">
                {post.excerpt}
              </p>

              {/* Read time */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground/80">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}