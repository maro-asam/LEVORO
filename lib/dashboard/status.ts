import type { OrderStatus, PaymentStatus } from "@/generated/prisma"

export function getOrderStatusLabel(status: OrderStatus) {
  const labels: Record<OrderStatus, string> = {
    PENDING_PAYMENT: "في انتظار الدفع",
    PAYMENT_REVIEW: "مراجعة الدفع",
    DESIGN_REVIEW: "مراجعة التصميم",
    WAITING_CUSTOMER_APPROVAL: "في انتظار موافقة العميل",
    READY_FOR_PRODUCTION: "جاهز للإنتاج",
    IN_PRODUCTION: "قيد الإنتاج",
    QUALITY_CHECK: "مراجعة الجودة",
    SHIPPED: "تم الشحن",
    DELIVERED: "تم التسليم",
    CANCELLED: "ملغي",
    REFUNDED: "مسترد",
  }

  return labels[status] ?? status
}

export function getPaymentStatusLabel(status: PaymentStatus) {
  const labels: Record<PaymentStatus, string> = {
    UNPAID: "غير مدفوع",
    DEPOSIT_PENDING: "العربون قيد المراجعة",
    DEPOSIT_PAID: "العربون مدفوع",
    PAID: "مدفوع",
    FAILED: "فشل الدفع",
    REFUNDED: "مسترد",
  }

  return labels[status] ?? status
}

export function getOrderStatusTone(status: OrderStatus) {
  if (["DELIVERED", "READY_FOR_PRODUCTION"].includes(status)) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }

  if (["CANCELLED", "REFUNDED"].includes(status)) {
    return "border-destructive/30 bg-destructive/10 text-destructive"
  }

  if (["IN_PRODUCTION", "QUALITY_CHECK", "SHIPPED"].includes(status)) {
    return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
  }

  return "border-primary/30 bg-primary/10 text-primary"
}
