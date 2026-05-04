import Link from "next/link"
import { ArrowUpLeft, Palette, Settings2, Shirt } from "lucide-react"

import { PrintOptionManager } from "@/components/dashboard/studio/print-option-form"
import { StudioConfigForm } from "@/components/dashboard/studio/studio-config-form"
import { StudioStyleManager } from "@/components/dashboard/studio/studio-style-form"
import { getStudioDashboardData } from "@/lib/dashboard/get-studio-dashboard"

export default async function DashboardStudioPage() {
  const data = await getStudioDashboardData()

  const activeStyles = data.styles.filter((style) => style.isActive).length
  const activeProducts = data.products.filter(
    (product) => product.status === "ACTIVE"
  ).length
  const activePrintOptions = data.products.reduce((total, product) => {
    return (
      total + product.printOptions.filter((option) => option.isActive).length
    )
  }, 0)

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black">إدارة الاستوديو</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            عدّل محتوى صفحة Studio، أضف styles، واضبط أماكن الطباعة لكل منتج من
            غير ما تلمس الكود كل مرة.
          </p>
        </div>

        <Link
          href="/studio"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          افتح الاستوديو
          <ArrowUpLeft className="h-4 w-4" />
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="منتجات مفعلة" value={activeProducts} icon={Shirt} />
        <StatCard label="ستايلات مفعلة" value={activeStyles} icon={Palette} />
        <StatCard
          label="أماكن طباعة مفعلة"
          value={activePrintOptions}
          icon={Settings2}
        />
      </section>

      <StudioConfigForm config={data.config} />

      <StudioStyleManager styles={data.styles} />

      <PrintOptionManager products={data.products} />
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: typeof Shirt
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-background p-5 shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>

      <p className="text-sm font-bold text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}
