"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { createGuestOrderSchema } from "@/validations/order.schema"

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replaceAll("-", "")
}

function createOrderCode() {
  const random = Math.floor(1000 + Math.random() * 9000)
  return `LEV-${Date.now().toString().slice(-6)}-${random}`
}

type ActionState =
  | { ok: true; orderCode: string }
  | { ok: false; message: string }

export async function createGuestOrderAction(
  input: unknown
): Promise<ActionState> {
  const parsed = createGuestOrderSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "راجع بيانات الطلب",
    }
  }

  const data = parsed.data
  const phone = normalizePhone(data.customerPhone)

  const product = await prisma.product.findUnique({
    where: { id: data.productId },
    include: {
      printOptions: true,
    },
  })

  if (!product || product.status !== "ACTIVE") {
    return {
      ok: false,
      message: "المنتج غير متاح حاليًا",
    }
  }

  const variant = data.variantId
    ? await prisma.productVariant.findUnique({
        where: { id: data.variantId },
      })
    : null

  const printExtraCost = product.printOptions
    .filter((option) => data.printAreas.includes(option.area))
    .reduce((sum, option) => sum + option.extraCost, 0)

  const unitPrice =
    product.basePrice + printExtraCost + (variant?.priceAdjustment || 0)
  const subtotal = unitPrice * data.quantity
  const shippingFee = 7000
  const discount = 0
  const total = subtotal + shippingFee - discount
  const depositAmount = product.depositAmount || Math.ceil(total * 0.5)

  const orderCode = createOrderCode()

  const order = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: { phone },
      update: {
        name: data.customerName,
        email: data.customerEmail || null,
      },
      create: {
        name: data.customerName,
        phone,
        email: data.customerEmail || null,
      },
    })

    const address = await tx.address.create({
      data: {
        customerId: customer.id,
        city: data.shippingCity,
        area: data.shippingArea,
        street: data.shippingAddress,
        notes: data.shippingNotes,
        type: "HOME",
      },
    })

    const design = await tx.design.create({
      data: {
        customerId: customer.id,
        title: `${product.name} Custom Design`,
        frontText: data.frontText,
        backText: data.backText,
        notes: data.designNotes,
        preferredPlacement: data.printAreas[0],
        status: "SUBMITTED",
      },
    })

    const createdOrder = await tx.order.create({
      data: {
        orderCode,
        customerId: customer.id,
        addressId: address.id,

        customerName: data.customerName,
        customerPhone: phone,
        customerEmail: data.customerEmail || null,

        shippingCity: data.shippingCity,
        shippingArea: data.shippingArea,
        shippingAddress: data.shippingAddress,
        shippingNotes: data.shippingNotes,

        subtotal,
        discount,
        shippingFee,
        depositAmount,
        total,

        status: "PENDING_PAYMENT",
        paymentStatus: "UNPAID",

        items: {
          create: {
            productId: product.id,
            variantId: variant?.id,
            designId: design.id,
            productName: product.name,
            colorName: variant?.colorName || data.colorName,
            size: variant?.size || data.size,
            quantity: data.quantity,
            unitPrice,
            totalPrice: subtotal,
            printAreas: data.printAreas,
            itemNotes: data.designNotes,
          },
        },

        statusLogs: {
          create: {
            toStatus: "PENDING_PAYMENT",
            note: "تم إنشاء الطلب من العميل",
          },
        },
      },
    })

    return createdOrder
  })

  revalidatePath("/admin/orders")

  return {
    ok: true,
    orderCode: order.orderCode,
  }
}
