"use server"

import { prisma } from "@/lib/prisma"

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replaceAll("-", "")
}

export async function trackOrderAction(input: {
  orderCode: string
  phoneLast4: string
}) {
  const orderCode = input.orderCode.trim().toUpperCase()
  const phoneLast4 = input.phoneLast4.trim()

  const order = await prisma.order.findUnique({
    where: { orderCode },
    include: {
      items: {
        include: {
          design: true,
        },
      },
      shipment: true,
      payments: true,
      statusLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!order) {
    return {
      ok: false,
      message: "مش لاقيين طلب بالكود ده",
    }
  }

  if (!order.customerPhone.endsWith(phoneLast4)) {
    return {
      ok: false,
      message: "رقم الموبايل غير مطابق للطلب",
    }
  }

  return {
    ok: true,
    order,
  }
}
