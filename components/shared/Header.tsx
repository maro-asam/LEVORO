"use client"

import { useState } from "react"
import { ArrowLeft, Menu, MessageCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "../theme-toggle"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "إزاي بتشتغل؟", href: "#how" },
  { label: "المنتجات", href: "#products" },
  { label: "ليه LEVORO؟", href: "#why" },
]

export default function LevoroHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/85 text-foreground backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/`}>
          <Image src={`/logo.svg`} alt="LEVORO" width={150} height={150} />
        </Link>

        <nav className="hidden items-center rounded-full border border-border bg-muted/40 p-1 px-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button variant="outline" className="px-4" asChild>
            <Link
              href="https://wa.me/01014344053"
              target="_blank"
              rel="noopener noreferrer"
            >
              واتساب
              <MessageCircle className="mr-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild>
            <Link href="/studio">
              ابدأ تصميمك
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted/40 text-foreground transition md:hidden",
            "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label={isOpen ? "اقفل القائمة" : "افتح القائمة"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-background px-4 pt-2 pb-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 grid gap-3 border-t border-border pt-4">
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <span className="text-sm font-semibold text-muted-foreground">
                  تغيير الوضع
                </span>
                <ThemeToggle />
              </div>
              <Button variant="outline" className="" asChild>
                <Link
                  href="https://wa.me/01014344053"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="ml-2 h-4 w-4" />
                  كلمنا على واتساب
                </Link>
              </Button>

              <Button asChild>
                <Link href="/studio">
                  ابدأ تصميمك
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
