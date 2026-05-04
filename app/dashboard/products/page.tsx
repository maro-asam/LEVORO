import { PackagePlus, Shirt, SwatchBook } from "lucide-react"

import { ProductManager } from "@/components/dashboard/products/product-manager"
import { getProductsDashboardData } from "@/lib/dashboard/get-products-dashboard"

export default async function DashboardProductsPage() {
  const data = await getProductsDashboardData()

  const activeProducts = data.products.filter(
    (product) => product.status === "ACTIVE"
  ).length

  const variantsCount = data.products.reduce((total, product) => {
    return total + product.variants.length
  }, 0)

  return (
    <div className="space-y-8" dir="rtl">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black">إدارة المنتجات</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            أضف منتجات LEVORO، الألوان، المقاسات، المخزون، وسعر كل variant.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="كل المنتجات"
          value={data.products.length}
          icon={Shirt}
        />
        <StatCard
          label="منتجات مفعلة"
          value={activeProducts}
          icon={PackagePlus}
        />
        <StatCard label="Variants" value={variantsCount} icon={SwatchBook} />
      </section>

      <ProductManager products={data.products} />
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
