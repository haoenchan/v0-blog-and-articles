import Link from "next/link"
import { Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted-foreground/60">
          {"2026 Haoenchan. All rights reserved."}
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link
            href="/"
            className="group text-sm text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
          >
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 group-hover:after:w-full">
              About
            </span>
          </Link>
          <Link
            href="/blog"
            className="group text-sm text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
          >
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 group-hover:after:w-full">
              Articles
            </span>
          </Link>
          <a
            href="https://instagram.com/haoenphysics"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
          >
            <Instagram className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 group-hover:after:w-full">
              Instagram
            </span>
          </a>
        </nav>
      </div>
    </footer>
  )
}