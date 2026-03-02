import Link from "next/link"
import { getAllPosts } from "@/lib/blog-data"
import { ArrowRight, Sparkles } from "lucide-react"
import { RecentPosts } from "@/components/recent-posts"
import { PhysicsCanvas } from "@/components/physics-canvas"

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="relative mx-auto max-w-3xl px-6 overflow-hidden">

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-sky-500/[0.06] via-purple-500/[0.04] to-transparent blur-[120px] animate-glow-drift" />
      <div className="pointer-events-none absolute top-80 -right-40 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-emerald-500/[0.04] to-transparent blur-[100px] animate-glow-drift-reverse" />

      {/* Physics diagram animations behind content */}
      <PhysicsCanvas />

      {/* Hero */}
      <section className="relative py-24 sm:py-32">
        {/* Tag */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground ring-1 ring-border/50">
            <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-[pulse_3s_ease-in-out_infinite]" />
            <span>Math & Physics</span>
          </span>
        </div>

        {/* Heading — with rainbow accent */}
        <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl animate-fade-in-up">
          <span className="text-foreground">About </span>
          <span className="text-rainbow">Me</span>
        </h1>

        <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/75 animate-fade-in-up [animation-delay:150ms]">
          {"Hi! I'm Haoen and I am interested in physics and a bit of math. Here, I will post some of my own articles including my own solutions to some problems and also some handouts."}
        </p>

        <div className="mt-10 animate-fade-in-up [animation-delay:300ms]">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-border/50 transition-all duration-300 hover:ring-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
          >
            <span className="relative z-10">Read all articles</span>
            <ArrowRight className="relative z-10 h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            {/* Hover shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

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
        <p className="mt-3 text-sm text-muted-foreground/80">
          {"Here are some of the articles I have recently written in my free time! :pp"}
        </p>
        <RecentPosts posts={recentPosts} />
      </section>
    </div>
  )
}