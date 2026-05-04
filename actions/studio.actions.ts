"use server"

import { revalidatePath } from "next/cache"

import type { PrintArea } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

type CreateStudioRequestInput = {
  customer: {
    name: string
    phone: string
    city: string
    area?: string
    address?: string
  }

  product: {
    productId: string
    variantId?: string
    productName: string
    colorName: string
    size: string
    fit?: string
  }

  design: {
    vibe?: string
    idea?: string
    printArea: PrintArea
    placementPreset: string
    placement: {
      x: number
      y: number
      width: number
      height: number
      zone: {
        x: number
        y: number
        width: number
        height: number
      }
    }
  }
}

export async function createStudioRequestAction(input: CreateStudioRequestInput) {
  const product = await prisma.product.findUnique({
    where: {
      id: input.product.productId,
    },
    include: {
      variants: true,
      printOptions: true,
    },
  })

  if (!product || product.status !== "ACTIVE") {
    return {
      success: false,
      message: "المنتج غير متاح حاليًا.",
    }
  }

  const selectedVariant = input.product.variantId
    ? product.variants.find(
        (variant) =>
          variant.id === input.product.variantId &&
          variant.isActive &&
          variant.colorName === input.product.colorName &&
          variant.size === input.product.size
      )
    : null

  if (input.product.variantId && !selectedVariant) {
    return {
      success: false,
      message: "اللون أو المقاس غير متاح حاليًا.",
    }
  }

  const selectedPrintOption = product.printOptions.find(
    (option) =>
      option.isActive &&
      option.area === input.design.printArea &&
      option.label === input.design.placementPreset
  )

  if (!selectedPrintOption) {
    return {
      success: false,
      message: "مكان الطباعة غير متاح حاليًا.",
    }
  }

  const customer = await prisma.customer.upsert({
    where: {
      phone: input.customer.phone,
    },
    update: {
      name: input.customer.name,
      notes: input.customer.city,
    },
    create: {
      name: input.customer.name,
      phone: input.customer.phone,
      notes: input.customer.city,
    },
  })

  const orderCode = await generateUniqueOrderCode()

  const subtotal =
    product.basePrice +
    (selectedVariant?.priceAdjustment ?? 0) +
    selectedPrintOption.extraCost

  const depositAmount = product.depositAmount ?? 0
  const total = subtotal

  const result = await prisma.$transaction(async (tx) => {
    const design = await tx.design.create({
      data: {
        customerId: customer.id,
        vibe: input.design.vibe,
        notes: input.design.idea,
        preferredPlacement: input.design.printArea,
        placement: {
          preset: input.design.placementPreset,
          area: input.design.printArea,
          ...input.design.placement,
        },
        status: "SUBMITTED",
      },
    })

    const order = await tx.order.create({
      data: {
        orderCode,
        customerId: customer.id,

        status: "DESIGN_REVIEW",
        paymentStatus: "UNPAID",

        customerName: input.customer.name,
        customerPhone: input.customer.phone,

        shippingCity: input.customer.city,
        shippingArea: input.customer.area ?? "غير محدد",
        shippingAddress: input.customer.address ?? "غير محدد",

        subtotal,
        depositAmount,
        total,

        customerNotes: input.design.idea,

        items: {
          create: {
            productId: product.id,
            variantId: selectedVariant?.id,
            designId: design.id,

            productName: product.name,
            colorName: selectedVariant?.colorName ?? input.product.colorName,
            size: selectedVariant?.size ?? input.product.size,
            quantity: 1,
            unitPrice: subtotal,
            totalPrice: subtotal,
            printAreas: [input.design.printArea],
            itemNotes: [
              input.product.fit ? `Fit: ${input.product.fit}` : null,
              `Preset: ${input.design.placementPreset}`,
            ]
              .filter(Boolean)
              .join(" | "),
          },
        },

        statusLogs: {
          create: {
            toStatus: "DESIGN_REVIEW",
            note: "Studio request submitted by customer.",
          },
        },
      },
    })

    return {
      design,
      order,
    }
  })

  revalidatePath("/studio")

  return {
    success: true,
    message: "تم إرسال طلبك للمراجعة.",
    orderCode: result.order.orderCode,
  }
}

async function generateUniqueOrderCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const random = Math.floor(100000 + Math.random() * 900000)
    const orderCode = `LEV-${random}`

    const existingOrder = await prisma.order.findUnique({
      where: {
        orderCode,
      },
      select: {
        id: true,
      },
    })

    if (!existingOrder) {
      return orderCode
    }
  }

  return `LEV-${Date.now()}`
}