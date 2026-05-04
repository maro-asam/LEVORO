import { prisma } from "@/lib/prisma"

export async function getStudioData() {
  const [config, products, styles] = await Promise.all([
    prisma.studioPageConfig.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        variants: {
          where: {
            isActive: true,
          },
          orderBy: [
            {
              colorName: "asc",
            },
            {
              size: "asc",
            },
          ],
        },
        printOptions: {
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    }),

    prisma.studioStyle.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),
  ])

  return {
    config,
    products,
    styles,
  }
}