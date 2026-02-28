import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog-data"
import { BlogList } from "@/components/blog-list"

export const metadata: Metadata = {
  title: "Writing - Your Name",
  description: "Essays and articles on technology, creativity, and ideas.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="py-16 sm:py-24">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Writing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Essays and reflections on technology, creativity, and the things that
          matter.
        </p>
      </section>

      <div className="border-t border-border" />

      <BlogList posts={posts} />
    </div>
  )
}
