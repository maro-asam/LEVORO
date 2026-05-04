import { prisma } from "@/lib/prisma"

export async function getStudioDashboardData() {
  const [config, styles, products] = await Promise.all([
    prisma.studioPageConfig.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        badge: true,
        title: true,
        highlightedTitle: true,
        description: true,
        trustBadges: true,
        isActive: true,
      },
    }),

    prisma.studioStyle.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        sortOrder: true,
        isActive: true,
      },
    }),

    prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        printOptions: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            area: true,
            label: true,
            extraCost: true,
            previewZone: true,
            defaultPlacement: true,
            isActive: true,
          },
        },
      },
    }),
  ])

  return {
    config,
    styles,
    products,
  }
}