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
        "sticky top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-border/50 bg-card/70 backdrop-blur-2xl shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          : "border-border/80 bg-card backdrop-blur-none shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="group relative font-serif text-xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-[length:200%_100%] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%_0]">
            Haoenchan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-1 text-sm tracking-wide transition-colors duration-200 hover:text-foreground",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all after:duration-300",
                pathname === item.href
                  ? "text-foreground font-medium after:w-full"
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
          <nav className="border-t border-border/40 px-6 py-4" aria-label="Mobile navigation">
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