import { prisma } from "@/lib/prisma"

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
      items: {
        include: {
          design: true,
          product: true,
          variant: true,
        },
      },
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      shipment: true,
      statusLogs: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  })
}
