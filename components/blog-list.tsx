"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

interface BlogListProps {
  posts: BlogPost[]
}

const categories = ["All", "Math", "Physics", "Misc"]

export function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  // Count posts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length }
    for (const cat of categories.slice(1)) {
      counts[cat] = posts.filter((p) => p.category === cat).length
    }
    return counts
  }, [posts])

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-8">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-3 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "filter-chip",
              activeCategory === category && "filter-chip--active"
            )}
          >
            {category}
            <span className="filter-chip__count">{categoryCounts[category]}</span>
          </button>
        ))}
      </div>

      {/* Posts - Numbered List Style */}
      <ul className="article-list article-list--numbered">
        {filteredPosts.map((post, index) => {
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

      {filteredPosts.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No posts in this category yet.
        </p>
      )}
    </section>
  )
}
