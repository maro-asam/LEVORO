import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    take: 5,
    include: {
      variants: true,
      printOptions: true,
    },
  })

  return NextResponse.json({
    ok: true,
    productsCount: products.length,
    products,
  })
}
