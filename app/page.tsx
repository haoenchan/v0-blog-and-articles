import Link from "next/link"
import { getAllPosts } from "@/lib/blog-data"
import { ArrowRight, Sparkles } from "lucide-react"
import { RecentPosts } from "@/components/recent-posts"

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="relative mx-auto max-w-3xl px-6 overflow-hidden">

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-primary/[0.07] via-accent/[0.05] to-transparent blur-[100px] animate-glow-drift" />
      <div className="pointer-events-none absolute top-60 -right-40 h-[300px] w-[300px] rounded-full bg-accent/[0.04] blur-[80px] animate-glow-drift-reverse" />

      {/* Hero / Introduction */}
      <section className="relative py-20 sm:py-28">
        {/* Tag badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-1.5 ring-1 ring-primary/20 backdrop-blur-sm animate-fade-in">
          <Sparkles className="h-3 w-3 text-accent animate-[pulse_3s_ease-in-out_infinite]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Math & Physics</span>
        </div>

        {/* Heading with gradient */}
        <h1 className="font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl animate-fade-in-up">
          <span className="bg-gradient-to-br from-foreground from-40% to-muted-foreground/60 bg-clip-text text-transparent">
            About Me
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground/80 animate-fade-in-up [animation-delay:100ms]">
          {"Hi! I'm Haoen and I am interested in physics and a bit of math. Here, I will post some of my own articles including my own solutions to some problems and also some handouts."}
        </p>

        <div className="mt-10 flex items-center gap-6 animate-fade-in-up [animation-delay:200ms]">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">Read all articles</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            {/* Hover shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      {/* Recent Writing */}
      <section className="relative py-20">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
              View all
            </span>
            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground/60">
          {"Here are some of the articles I have recently written in my free time! :pp"}
        </p>
        <RecentPosts posts={recentPosts} />
      </section>
    </div>
  )
}