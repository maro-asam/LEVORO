"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@/generated/prisma"

export async function updateOrderStatusAction(input: {
  orderId: string
  toStatus: OrderStatus
  adminUserId?: string
  note?: string
}) {
  const currentOrder = await prisma.order.findUnique({
    where: { id: input.orderId },
  })

  if (!currentOrder) {
    return {
      ok: false,
      message: "الطلب غير موجود",
    }
  }

  await prisma.$transaction([
    prisma.order.update({
      where: { id: input.orderId },
      data: {
        status: input.toStatus,
      },
    }),

    prisma.orderStatusLog.create({
      data: {
        orderId: input.orderId,
        fromStatus: currentOrder.status,
        toStatus: input.toStatus,
        changedById: input.adminUserId,
        note: input.note,
      },
    }),
  ])

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${input.orderId}`)

  return {
    ok: true,
  }
}
