"use server"

import { revalidatePath } from "next/cache"

import type { PrintArea } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

type UpdateStudioConfigInput = {
  badge: string
  title: string
  highlightedTitle?: string
  description?: string
  trustBadgesText?: string
}

type CreateStudioStyleInput = {
  name: string
  slug: string
  description?: string
  sortOrder?: number
}

type CreateProductPrintOptionInput = {
  productId: string
  area: PrintArea
  label: string
  extraCost?: number
  previewZone: {
    x: number
    y: number
    width: number
    height: number
  }
  defaultPlacement: {
    x: number
    y: number
    width: number
    height: number
  }
}

export async function updateStudioConfigAction(input: UpdateStudioConfigInput) {
  const trustBadges = (input.trustBadgesText ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)

  const currentConfig = await prisma.studioPageConfig.findFirst({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (currentConfig) {
    await prisma.studioPageConfig.update({
      where: {
        id: currentConfig.id,
      },
      data: {
        badge: input.badge.trim() || "LEVORO Studio",
        title: input.title.trim(),
        highlightedTitle: input.highlightedTitle?.trim() || null,
        description: input.description?.trim() || null,
        trustBadges,
      },
    })
  } else {
    await prisma.studioPageConfig.create({
      data: {
        badge: input.badge.trim() || "LEVORO Studio",
        title: input.title.trim(),
        highlightedTitle: input.highlightedTitle?.trim() || null,
        description: input.description?.trim() || null,
        trustBadges,
        isActive: true,
      },
    })
  }

  revalidatePath("/studio")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم تحديث إعدادات الاستوديو.",
  }
}

export async function createStudioStyleAction(input: CreateStudioStyleInput) {
  if (!input.name.trim()) {
    return {
      success: false,
      message: "اكتب اسم الستايل.",
    }
  }

  if (!input.slug.trim()) {
    return {
      success: false,
      message: "اكتب slug للستايل.",
    }
  }

  await prisma.studioStyle.create({
    data: {
      name: input.name.trim(),
      slug: slugify(input.slug),
      description: input.description?.trim() || null,
      sortOrder: input.sortOrder ?? 0,
      isActive: true,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم إضافة الستايل.",
  }
}

export async function toggleStudioStyleAction(styleId: string) {
  const style = await prisma.studioStyle.findUnique({
    where: {
      id: styleId,
    },
    select: {
      id: true,
      isActive: true,
    },
  })

  if (!style) {
    return {
      success: false,
      message: "الستايل غير موجود.",
    }
  }

  await prisma.studioStyle.update({
    where: {
      id: style.id,
    },
    data: {
      isActive: !style.isActive,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم تحديث حالة الستايل.",
  }
}

export async function createProductPrintOptionAction(
  input: CreateProductPrintOptionInput
) {
  if (!input.productId) {
    return {
      success: false,
      message: "اختار المنتج.",
    }
  }

  if (!input.label.trim()) {
    return {
      success: false,
      message: "اكتب اسم مكان الطباعة.",
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

  await prisma.productPrintOption.create({
    data: {
      productId: product.id,
      area: input.area,
      label: input.label.trim(),
      extraCost: input.extraCost ?? 0,
      previewZone: input.previewZone,
      defaultPlacement: input.defaultPlacement,
      isActive: true,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم إضافة مكان الطباعة.",
  }
}

export async function toggleProductPrintOptionAction(optionId: string) {
  const option = await prisma.productPrintOption.findUnique({
    where: {
      id: optionId,
    },
    select: {
      id: true,
      isActive: true,
    },
  })

  if (!option) {
    return {
      success: false,
      message: "مكان الطباعة غير موجود.",
    }
  }

  await prisma.productPrintOption.update({
    where: {
      id: option.id,
    },
    data: {
      isActive: !option.isActive,
    },
  })

  revalidatePath("/studio")
  revalidatePath("/dashboard/studio")

  return {
    success: true,
    message: "تم تحديث حالة مكان الطباعة.",
  }
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
}
