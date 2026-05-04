import { prisma } from "@/lib/prisma"

export async function getAdminOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
          variant: true,
          design: true,
        },
      },
      payments: true,
      shipment: true,
    },
  })
}

export async function getAdminOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      address: true,
      items: {
        include: {
          product: true,
          variant: true,
          design: {
            include: {
              artworks: true,
              reviews: true,
            },
          },
        },
      },
      payments: true,
      shipment: true,
      statusLogs: {
        include: {
          changedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })
}
