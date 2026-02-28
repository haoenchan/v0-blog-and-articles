import Link from "next/link"
import { getAllPosts } from "@/lib/blog-data"
import { ArrowRight } from "lucide-react"
import { RecentPosts } from "@/components/recent-posts"

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero / Introduction */}
      <section className="py-16 sm:py-24">
        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl text-balance">
          Writer, thinker, <br className="hidden sm:block" />
          and curious mind.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          I write about ideas that fascinate me — from the philosophy of slow
          thinking to the craft of building in public. This is where I share
          essays, articles, and reflections.
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            Read all writing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Recent Writing */}
      <section className="py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Recent Writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <RecentPosts posts={recentPosts} />
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* About Section */}
      <section className="py-16">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          About
        </h2>
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
          <p>
            I believe in the power of words to clarify thinking and connect
            people. My writing explores the intersection of technology,
            creativity, and the human experience.
          </p>
          <p>
            When I am not writing, you can find me reading, walking without a
            destination, or working on projects that combine design and code.
            I am always looking for new perspectives and conversations.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-6">
          <a
            href="https://instagram.com/haoenphysics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  )
}
