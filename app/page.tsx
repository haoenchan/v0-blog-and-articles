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
          About Me
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {"Hi! I'm Haoen and I am interested in physics and a bit of math. Here, I will post some of my own articles including my own solutions to some problems and also some handouts."}
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            Read all articles
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
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {"Here are some of the articles I have recently written in my free time! :pp"}
        </p>
        <RecentPosts posts={recentPosts} />
      </section>


    </div>
  )
}
