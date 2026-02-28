import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog-data"
import { BlogList } from "@/components/blog-list"

export const metadata: Metadata = {
  title: "Articles - Haoenchan",
  description: "Articles on math and physics, problem solutions and handouts.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="py-16 sm:py-24">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Articles
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {"Here are some articles I have written in my free time! If there are any errors you may contact me on my "}
          <a
            href="https://instagram.com/haoenphysics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-accent transition-colors"
          >
            Instagram
          </a>
        </p>
      </section>

      <div className="border-t border-border" />

      <BlogList posts={posts} />
    </div>
  )
}
