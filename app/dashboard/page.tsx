import Link from "next/link"
import {
  ArrowUpLeft,
  PackageCheck,
  Palette,
  ShieldCheck,
  Truck,
} from "lucide-react"

import { getDashboardOverview } from "@/lib/dashboard/get-dashboard-overview"
import {
  getOrderStatusLabel,
  getOrderStatusTone,
  getPaymentStatusLabel,
} from "@/lib/dashboard/status"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const data = await getDashboardOverview()

  const cards = [
    {
      label: "كل الطلبات",
      value: data.stats.totalOrders,
      icon: PackageCheck,
    },
    {
      label: "مراجعة التصميم",
      value: data.stats.designReviewOrders,
      icon: Palette,
    },
    {
      label: "قيد الإنتاج",
      value: data.stats.productionOrders,
      icon: ShieldCheck,
    },
    {
      label: "تم التسليم",
      value: data.stats.deliveredOrders,
      icon: Truck,
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">نظرة عامة</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ملخص سريع عن طلبات الاستوديو والإنتاج.
            </p>
          </div>

          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            كل الطلبات
            <ArrowUpLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.label}
                className="rounded-[2rem] border border-border bg-background p-5 shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="text-sm font-bold text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-black">{card.value}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-border bg-background p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black">آخر الطلبات</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              أحدث الطلبات اللي دخلت من الاستوديو.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full min-w-[760px] text-right text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-bold">رقم الطلب</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">المنتج</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">الدفع</th>
                <th className="px-4 py-3 font-bold">الإجمالي</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="bg-background">
                  <td className="px-4 py-4 font-black">{order.orderCode}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold">{order.customerName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.customerPhone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {order.items[0]?.productName ?? "غير محدد"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
                        getOrderStatusTone(order.status)
                      )}
                    >
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {getPaymentStatusLabel(order.paymentStatus)}
                  </td>
                  <td className="px-4 py-4 font-black">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}

              {data.recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-muted-foreground"
                  >
                    لسه مفيش طلبات.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value)
}
