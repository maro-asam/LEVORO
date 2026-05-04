import Link from "next/link"
import type { ReactNode } from "react"
import {
  LayoutDashboard,
  PackageCheck,
  Palette,
  Settings,
  Shirt,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    label: "نظرة عامة",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/orders",
    label: "الطلبات",
    icon: PackageCheck,
  },
  {
    href: "/dashboard/studio",
    label: "الاستوديو",
    icon: Palette,
  },
  {
    href: "/dashboard/products",
    label: "المنتجات",
    icon: Shirt,
  },
  {
    href: "/dashboard/settings",
    label: "الإعدادات",
    icon: Settings,
  },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main dir="rtl" className="min-h-screen bg-muted/30 text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-l border-border bg-background">
          <div className="sticky top-0 flex h-screen flex-col p-5">
            <Link href="/dashboard" className="mb-8 block">
              <div className="rounded-[2rem] border border-border bg-card p-4 shadow-sm">
                <p className="text-lg font-black tracking-tight">LEVORO</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  لوحة التحكم
                </p>
              </div>
            </Link>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto rounded-[2rem] border border-border bg-card p-4">
              <p className="text-sm font-bold">Studio Requests</p>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                راجع التصميم، أكد التفاصيل، وبعدها انقله للإنتاج.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground">
                  Dashboard
                </p>
                <h1 className="text-xl font-black">إدارة LEVORO</h1>
              </div>

              <Link
                href="/studio"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold transition hover:bg-muted"
              >
                افتح الاستوديو
              </Link>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </section>
      </div>
    </main>
  )
}
