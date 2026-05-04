"use server"

import { revalidatePath } from "next/cache"

import type { ProductStatus } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

type CreateProductInput = {
  name: string
  slug: string
  shortDescription?: string
  description?: string
  basePrice: number
  depositAmount?: number
  material?: string
  fit?: string
  status?: ProductStatus
  allowBackPrint?: boolean
  allowSleevePrint?: boolean
}

type CreateVariantInput = {
  productId: string
  colorName: string
  colorHex?: string
  size: string
  stock?: number
  priceAdjustment?: number
}

export async function createProductAction(input: CreateProductInput) {
  if (!input.name.trim()) {
    return {
      success: false,
      message: "اكتب اسم المنتج.",
    }
  }

  if (!input.slug.trim()) {
    return {
      success: false,
      message: "اكتب slug للمنتج.",
    }
  }

  if (!input.basePrice || input.basePrice <= 0) {
    return {
      success: false,
      message: "اكتب سعر صحيح.",
    }
  }

  const slug = slugify(input.slug)

  const existingProduct = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  })

  if (existingProduct) {
    return {
      success: false,
      message: "فيه منتج بنفس الـ slug.",
    }
  }

  await prisma.product.create({
    data: {
      name: input.name.trim(),
      slug,
      shortDescription: input.shortDescription?.trim() || null,
      description: input.description?.trim() || null,
      basePrice: input.basePrice,
      depositAmount: input.depositAmount ?? 0,
      material: input.material?.trim() || null,
      fit: input.fit?.trim() || null,
      status: input.status ?? "ACTIVE",
      allowBackPrint: input.allowBackPrint ?? true,
      allowSleevePrint: input.allowSleevePrint ?? true,
      allowCustomText: true,
      allowCustomImage: true,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/products")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم إضافة المنتج.",
  }
}

export async function updateProductStatusAction(
  productId: string,
  status: ProductStatus
) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  })

  if (!product) {
    return {
      success: false,
      message: "المنتج غير موجود.",
    }
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/products")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم تحديث حالة المنتج.",
  }
}

export async function createProductVariantAction(input: CreateVariantInput) {
  if (!input.productId) {
    return {
      success: false,
      message: "اختار المنتج.",
    }
  }

  if (!input.colorName.trim()) {
    return {
      success: false,
      message: "اكتب اسم اللون.",
    }
  }

  if (!input.size.trim()) {
    return {
      success: false,
      message: "اكتب المقاس.",
    }
  }

  const product = await prisma.product.findUnique({
    where: {
      id: input.productId,
    },
    select: {
      id: true,
    },
  })

  if (!product) {
    return {
      success: false,
      message: "المنتج غير موجود.",
    }
  }

  await prisma.productVariant.upsert({
    where: {
      productId_colorName_size: {
        productId: input.productId,
        colorName: input.colorName.trim(),
        size: input.size.trim().toUpperCase(),
      },
    },
    update: {
      colorHex: input.colorHex?.trim() || null,
      stock: input.stock ?? 0,
      priceAdjustment: input.priceAdjustment ?? 0,
      isActive: true,
    },
    create: {
      productId: input.productId,
      colorName: input.colorName.trim(),
      colorHex: input.colorHex?.trim() || null,
      size: input.size.trim().toUpperCase(),
      stock: input.stock ?? 0,
      priceAdjustment: input.priceAdjustment ?? 0,
      isActive: true,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/products")

  return {
    success: true,
    message: "تم إضافة / تحديث المقاس واللون.",
  }
}

export async function toggleProductVariantAction(variantId: string) {
  const variant = await prisma.productVariant.findUnique({
    where: {
      id: variantId,
    },
    select: {
      id: true,
      isActive: true,
    },
  })

  if (!variant) {
    return {
      success: false,
      message: "الـ variant غير موجود.",
    }
  }

  await prisma.productVariant.update({
    where: {
      id: variant.id,
    },
    data: {
      isActive: !variant.isActive,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/products")

  return {
    success: true,
    message: "تم تحديث حالة اللون والمقاس.",
  }
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}
