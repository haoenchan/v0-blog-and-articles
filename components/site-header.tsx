"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "About", href: "/" },
  { label: "Articles", href: "/blog" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-2xl shadow-[0_1px_20px_rgba(0,0,0,0.4)] border-b border-border/30"
          : "bg-transparent border-b border-border/10"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        {/* Logo — rainbow on hover */}
        <Link
          href="/"
          className="group relative font-serif text-xl font-bold tracking-tight text-foreground transition-all duration-500"
        >
          <span className="relative">
            Haoenchan
            {/* Rainbow underline on hover */}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 via-green-400 via-sky-400 to-purple-400 transition-all duration-500 group-hover:w-full" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-1 text-sm tracking-wide transition-all duration-300 hover:text-foreground",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300",
                pathname === item.href
                  ? "text-foreground font-medium after:w-full after:bg-gradient-to-r after:from-primary after:to-accent"
                  : "text-muted-foreground after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden text-foreground transition-transform duration-200 active:scale-90"
          aria-label="Toggle navigation menu"
        >
          <div className="relative h-5 w-5">
            <Menu
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              )}
            />
            <X
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav — smooth slide */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out sm:hidden",
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-border/20 px-6 py-4 bg-background/80 backdrop-blur-xl" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm tracking-wide transition-colors hover:text-foreground",
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}