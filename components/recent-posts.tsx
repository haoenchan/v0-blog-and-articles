import Link from "next/link"
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
            className={`flex flex-col gap-2 py-6 ${
              index !== posts.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{post.category}</span>
              <time className="text-muted-foreground">{post.date}</time>
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
            <span className="mt-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {post.readTime}
            </span>
          </article>
        </Link>
      ))}
    </div>
  )
}
