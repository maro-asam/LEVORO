import { prisma } from "@/lib/prisma"

export async function getDashboardOverview() {
  const [
    totalOrders,
    designReviewOrders,
    productionOrders,
    deliveredOrders,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "DESIGN_REVIEW",
      },
    }),

    prisma.order.count({
      where: {
        status: {
          in: ["READY_FOR_PRODUCTION", "IN_PRODUCTION", "QUALITY_CHECK"],
        },
      },
    }),

    prisma.order.count({
      where: {
        status: "DELIVERED",
      },
    }),

    prisma.order.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    }),
  ])

  return {
    stats: {
      totalOrders,
      designReviewOrders,
      productionOrders,
      deliveredOrders,
    },
    recentOrders,
  }
}
