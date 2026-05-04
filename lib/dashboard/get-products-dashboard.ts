import { prisma } from "@/lib/prisma"

export async function getProductsDashboardData() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      description: true,
      basePrice: true,
      depositAmount: true,
      status: true,
      material: true,
      fit: true,
      allowBackPrint: true,
      allowSleevePrint: true,
      variants: {
        orderBy: [
          {
            colorName: "asc",
          },
          {
            size: "asc",
          },
        ],
        select: {
          id: true,
          colorName: true,
          colorHex: true,
          size: true,
          stock: true,
          isActive: true,
          priceAdjustment: true,
        },
      },
      printOptions: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          area: true,
          label: true,
          extraCost: true,
          isActive: true,
        },
      },
    },
  })

  return {
    products,
  }
}
