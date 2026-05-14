import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface RecentPostsProps {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="mt-8">
      <ul className="article-list article-list--numbered">
        {posts.map((post, index) => {
          const num = String(index + 1).padStart(2, "0")
          return (
            <li key={post.slug} className="article-row-reveal">
              <Link
                href={`/blog/${post.slug}`}
                className="article-row"
              >
                {/* Number column */}
                <div className="article-row__num-col">
                  <span className="article-row__num">
                    <em>{num}</em>
                  </span>
                </div>

                {/* Meta column */}
                <div className="article-row__meta-col">
                  <span className="article-row__cat">{post.category}</span>
                  <time className="article-row__date" dateTime={post.date}>
                    {post.date}
                  </time>
                  <span className="article-row__read">{post.readTime}</span>
                </div>

                {/* Body column */}
                <div className="article-row__body">
                  <h3 className="article-row__title">
                    <span className="article-row__title-text">{post.title}</span>
                    <ArrowUpRight className="article-row__arrow h-4 w-4" />
                  </h3>
                  <p className="article-row__excerpt">{post.excerpt}</p>
                </div>

                {/* Hover rule */}
                <span className="article-row__hover-rule" aria-hidden="true" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
