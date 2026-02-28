import Link from "next/link"
import { Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative mt-12">
      {/* Gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted-foreground/40">
          {"2026 Haoenchan. All rights reserved."}
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link
            href="/"
            className="text-sm text-muted-foreground/40 transition-colors duration-200 hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground/40 transition-colors duration-200 hover:text-foreground"
          >
            Articles
          </Link>
          <a
            href="https://instagram.com/haoenphysics"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground/40 transition-colors duration-200 hover:text-foreground"
          >
            <Instagram className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  )
}