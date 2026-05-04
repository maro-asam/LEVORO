import {
  getOrderStatusLabel,
  getOrderStatusTone,
  getPaymentStatusLabel,
} from "@/lib/dashboard/status"
import { getOrders } from "@/lib/dashboard/get-orders"
import { cn } from "@/lib/utils"

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-black">الطلبات</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          كل طلبات LEVORO Studio، مع بيانات العميل والتصميم والشحن.
        </p>
      </section>

      <section className="grid gap-4">
        {orders.map((order) => {
          const firstItem = order.items[0]
          const latestLog = order.statusLogs[0]

          return (
            <article
              key={order.id}
              className="rounded-[2rem] border border-border bg-background p-5 shadow-sm"
            >
              <div className="grid gap-5 xl:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-foreground px-3 py-1 text-xs font-black text-background">
                      {order.orderCode}
                    </span>

                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-bold",
                        getOrderStatusTone(order.status)
                      )}
                    >
                      {getOrderStatusLabel(order.status)}
                    </span>

                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <InfoBlock
                      label="العميل"
                      value={order.customerName}
                      subValue={order.customerPhone}
                    />

                    <InfoBlock
                      label="المنتج"
                      value={firstItem?.productName ?? "غير محدد"}
                      subValue={[
                        firstItem?.colorName,
                        firstItem?.size,
                        firstItem?.itemNotes,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    />

                    <InfoBlock
                      label="الشحن"
                      value={order.shippingCity}
                      subValue={`${order.shippingArea} · ${order.shippingAddress}`}
                    />
                  </div>

                  {order.customerNotes && (
                    <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4">
                      <p className="text-xs font-bold text-muted-foreground">
                        ملاحظات العميل
                      </p>
                      <p className="mt-2 text-sm leading-7">
                        {order.customerNotes}
                      </p>
                    </div>
                  )}

                  {latestLog && (
                    <div className="mt-4 rounded-2xl border border-border bg-card p-4">
                      <p className="text-xs font-bold text-muted-foreground">
                        آخر تحديث
                      </p>
                      <p className="mt-2 text-sm leading-7">
                        {latestLog.note ??
                          getOrderStatusLabel(latestLog.toStatus)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid gap-3 rounded-3xl border border-border bg-muted/30 p-4 xl:w-72">
                  <SummaryRow
                    label="Subtotal"
                    value={formatPrice(order.subtotal)}
                  />
                  <SummaryRow
                    label="العربون"
                    value={formatPrice(order.depositAmount)}
                  />
                  <SummaryRow
                    label="الشحن"
                    value={formatPrice(order.shippingFee)}
                  />
                  <SummaryRow
                    label="الإجمالي"
                    value={formatPrice(order.total)}
                    strong
                  />
                </div>
              </div>
            </article>
          )
        })}

        {orders.length === 0 && (
          <div className="rounded-[2rem] border border-border bg-background p-10 text-center shadow-sm">
            <p className="font-bold">لسه مفيش طلبات</p>
            <p className="mt-2 text-sm text-muted-foreground">
              أول طلب من صفحة الاستوديو هيظهر هنا.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

function InfoBlock({
  label,
  value,
  subValue,
}: {
  label: string
  value: string
  subValue?: string | null
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black">{value}</p>
      {subValue && (
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {subValue}
        </p>
      )}
    </div>
  )
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-background px-4 py-3">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className={cn("text-sm font-bold", strong && "text-base font-black")}>
        {value}
      </p>
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
