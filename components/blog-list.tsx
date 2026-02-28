"use client"

import Link from "next/link"
import { useState } from "react"
import type { BlogPost } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

interface BlogListProps {
  posts: BlogPost[]
}

const categories = ["All", "Essays", "Technology", "Writing"]

export function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-8">
      {/* Category Filter */}
      <div className="flex items-center gap-4 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "text-sm transition-colors",
              activeCategory === category
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col">
        {filteredPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article
              className={cn(
                "flex flex-col gap-2 py-6",
                index !== filteredPosts.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{post.category}</span>
                <span className="text-border">{"/"}</span>
                <time>{post.date}</time>
                <span className="text-border">{"/"}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors sm:text-2xl">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No posts in this category yet.
        </p>
      )}
    </section>
  )
}
