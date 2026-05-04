import "dotenv/config"

import type { PrintArea } from "../generated/prisma"
import { prisma } from "../lib/prisma"

type SeedPrintOption = {
  area: PrintArea
  label: string
  extraCost: number
  maxWidthCm?: number
  maxHeightCm?: number
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
  isActive: boolean
}

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@levoro.com"
  const adminName = process.env.ADMIN_SEED_NAME || "LEVORO Admin"

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: adminName,
      role: "ADMIN",
      isActive: true,
    },
  })

  const streetwear = await prisma.category.upsert({
    where: { slug: "streetwear" },
    update: {
      name: "Streetwear",
      description: "قطع كاجوال قابلة للتخصيص والطباعة.",
      sortOrder: 1,
      isActive: true,
    },
    create: {
      name: "Streetwear",
      slug: "streetwear",
      description: "قطع كاجوال قابلة للتخصيص والطباعة.",
      sortOrder: 1,
      isActive: true,
    },
  })

  const oversizedTshirt = await prisma.product.upsert({
    where: { slug: "oversized-t-shirt" },
    update: {
      categoryId: streetwear.id,
      name: "Oversized T-Shirt",
      shortDescription: "تيشيرت واسع تقدر تصممه على ذوقك.",
      description:
        "تيشيرت Oversized مناسب للطباعة الأمامية والخلفية، خامة مريحة وشكل streetwear.",
      basePrice: 699,
      compareAtPrice: 799,
      depositAmount: 350,
      status: "ACTIVE",
      material: "Cotton blend",
      fit: "Regular,Oversized",
      allowCustomText: true,
      allowCustomImage: true,
      allowBackPrint: true,
      allowSleevePrint: true,
    },
    create: {
      categoryId: streetwear.id,
      name: "Oversized T-Shirt",
      slug: "oversized-t-shirt",
      shortDescription: "تيشيرت واسع تقدر تصممه على ذوقك.",
      description:
        "تيشيرت Oversized مناسب للطباعة الأمامية والخلفية، خامة مريحة وشكل streetwear.",
      basePrice: 699,
      compareAtPrice: 799,
      depositAmount: 350,
      status: "ACTIVE",
      material: "Cotton blend",
      fit: "Regular,Oversized",
      allowCustomText: true,
      allowCustomImage: true,
      allowBackPrint: true,
      allowSleevePrint: true,
    },
  })

  const hoodie = await prisma.product.upsert({
    where: { slug: "custom-hoodie" },
    update: {
      categoryId: streetwear.id,
      name: "Custom Hoodie",
      shortDescription: "هودي custom بتصميمك.",
      description: "هودي قابل للتخصيص، مناسب للتصميمات الكبيرة والدروب الشتوي.",
      basePrice: 1499,
      compareAtPrice: 1699,
      depositAmount: 750,
      status: "ACTIVE",
      material: "Fleece cotton blend",
      fit: "Regular,Oversized",
      allowCustomText: true,
      allowCustomImage: true,
      allowBackPrint: true,
      allowSleevePrint: true,
    },
    create: {
      categoryId: streetwear.id,
      name: "Custom Hoodie",
      slug: "custom-hoodie",
      shortDescription: "هودي custom بتصميمك.",
      description: "هودي قابل للتخصيص، مناسب للتصميمات الكبيرة والدروب الشتوي.",
      basePrice: 1499,
      compareAtPrice: 1699,
      depositAmount: 750,
      status: "ACTIVE",
      material: "Fleece cotton blend",
      fit: "Regular,Oversized",
      allowCustomText: true,
      allowCustomImage: true,
      allowBackPrint: true,
      allowSleevePrint: true,
    },
  })

  const products = [oversizedTshirt, hoodie]

  const colors = [
    { colorName: "Black", colorHex: "#111111" },
    { colorName: "White", colorHex: "#FFFFFF" },
    { colorName: "Navy", colorHex: "#1F2A44" },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]

  for (const product of products) {
    for (const color of colors) {
      for (const size of sizes) {
        await prisma.productVariant.upsert({
          where: {
            productId_colorName_size: {
              productId: product.id,
              colorName: color.colorName,
              size,
            },
          },
          update: {
            colorHex: color.colorHex,
            stock: 10,
            isActive: true,
            priceAdjustment: 0,
          },
          create: {
            productId: product.id,
            colorName: color.colorName,
            colorHex: color.colorHex,
            size,
            sku: `${product.slug}-${color.colorName}-${size}`
              .toUpperCase()
              .replaceAll(" ", "-"),
            stock: 10,
            isActive: true,
            priceAdjustment: 0,
          },
        })
      }
    }

    const printOptions: SeedPrintOption[] = [
      {
        area: "FRONT",
        label: "طباعة أمامية",
        extraCost: 0,
        maxWidthCm: 28,
        maxHeightCm: 35,
        previewZone: {
          x: 42,
          y: 86,
          width: 124,
          height: 132,
        },
        defaultPlacement: {
          x: 21,
          y: 35,
          width: 82,
          height: 62,
        },
        isActive: true,
      },
      {
        area: "BACK",
        label: "طباعة خلفية",
        extraCost: 150,
        maxWidthCm: 32,
        maxHeightCm: 40,
        previewZone: {
          x: 38,
          y: 72,
          width: 132,
          height: 150,
        },
        defaultPlacement: {
          x: 25,
          y: 44,
          width: 82,
          height: 62,
        },
        isActive: true,
      },
      {
        area: "LEFT_CHEST",
        label: "صدر شمال",
        extraCost: 0,
        maxWidthCm: 10,
        maxHeightCm: 10,
        previewZone: {
          x: 112,
          y: 88,
          width: 48,
          height: 54,
        },
        defaultPlacement: {
          x: 7,
          y: 10,
          width: 34,
          height: 34,
        },
        isActive: true,
      },
      {
        area: "RIGHT_CHEST",
        label: "صدر يمين",
        extraCost: 0,
        maxWidthCm: 10,
        maxHeightCm: 10,
        previewZone: {
          x: 50,
          y: 88,
          width: 48,
          height: 54,
        },
        defaultPlacement: {
          x: 7,
          y: 10,
          width: 34,
          height: 34,
        },
        isActive: true,
      },
      {
        area: "LEFT_SLEEVE",
        label: "كم شمال",
        extraCost: 50,
        maxWidthCm: 8,
        maxHeightCm: 22,
        previewZone: {
          x: 8,
          y: 92,
          width: 52,
          height: 116,
        },
        defaultPlacement: {
          x: 9,
          y: 22,
          width: 34,
          height: 72,
        },
        isActive: true,
      },
      {
        area: "RIGHT_SLEEVE",
        label: "كم يمين",
        extraCost: 50,
        maxWidthCm: 8,
        maxHeightCm: 22,
        previewZone: {
          x: 148,
          y: 92,
          width: 52,
          height: 116,
        },
        defaultPlacement: {
          x: 9,
          y: 22,
          width: 34,
          height: 72,
        },
        isActive: true,
      },
    ]

    for (const option of printOptions) {
      await prisma.productPrintOption.upsert({
        where: {
          productId_area_label: {
            productId: product.id,
            area: option.area,
            label: option.label,
          },
        },
        update: {
          extraCost: option.extraCost,
          maxWidthCm: option.maxWidthCm,
          maxHeightCm: option.maxHeightCm,
          previewZone: option.previewZone,
          defaultPlacement: option.defaultPlacement,
          isActive: option.isActive,
        },
        create: {
          productId: product.id,
          area: option.area,
          label: option.label,
          extraCost: option.extraCost,
          maxWidthCm: option.maxWidthCm,
          maxHeightCm: option.maxHeightCm,
          previewZone: option.previewZone,
          defaultPlacement: option.defaultPlacement,
          isActive: option.isActive,
        },
      })
    }
  }

  await prisma.studioPageConfig.upsert({
    where: {
      id: "default-studio-config",
    },
    update: {
      badge: "LEVORO Studio",
      title: "صمّم قطعتك خطوة بخطوة",
      highlightedTitle: "اختار مكان جاهز وعدّل براحتك",
      description:
        "اختار المنتج ومكان الطباعة الجاهز، وبعدها حرّك التصميم وكبّره أو صغّره جوه مساحة الطباعة قبل ما تبعت الطلب للمراجعة.",
      trustBadges: [
        "مش لازم تكون مصمم",
        "تحكم في مكان التصميم",
        "Designer check",
      ],
      isActive: true,
    },
    create: {
      id: "default-studio-config",
      badge: "LEVORO Studio",
      title: "صمّم قطعتك خطوة بخطوة",
      highlightedTitle: "اختار مكان جاهز وعدّل براحتك",
      description:
        "اختار المنتج ومكان الطباعة الجاهز، وبعدها حرّك التصميم وكبّره أو صغّره جوه مساحة الطباعة قبل ما تبعت الطلب للمراجعة.",
      trustBadges: [
        "مش لازم تكون مصمم",
        "تحكم في مكان التصميم",
        "Designer check",
      ],
      isActive: true,
    },
  })

  const styles = [
    {
      name: "Minimal Arabic",
      slug: "minimal-arabic",
      description: "تصميم عربي بسيط وشيك.",
      sortOrder: 1,
    },
    {
      name: "Dark Street",
      slug: "dark-street",
      description: "ستايل غامق مناسب للـ oversized والهوديز.",
      sortOrder: 2,
    },
    {
      name: "Gym Mode",
      slug: "gym-mode",
      description: "تصميمات مناسبة للجيم والتحفيز.",
      sortOrder: 3,
    },
  ]

  for (const style of styles) {
    await prisma.studioStyle.upsert({
      where: {
        slug: style.slug,
      },
      update: {
        name: style.name,
        description: style.description,
        sortOrder: style.sortOrder,
        isActive: true,
      },
      create: {
        name: style.name,
        slug: style.slug,
        description: style.description,
        sortOrder: style.sortOrder,
        isActive: true,
      },
    })
  }

  const templates = [
    {
      title: "Arabic Minimal",
      slug: "arabic-minimal",
      vibe: "Minimal",
      description: "تصميم عربي بسيط وشيك.",
      tags: ["arabic", "minimal", "typography"],
    },
    {
      title: "Dark Street",
      slug: "dark-street",
      vibe: "Streetwear",
      description: "ستايل غامق مناسب للـ oversized والهوديز.",
      tags: ["streetwear", "dark", "bold"],
    },
    {
      title: "Gym Mode",
      slug: "gym-mode",
      vibe: "Gym",
      description: "تصميمات مناسبة للجيم والتحفيز.",
      tags: ["gym", "fitness", "motivation"],
    },
  ]

  for (const template of templates) {
    await prisma.designTemplate.upsert({
      where: { slug: template.slug },
      update: {
        title: template.title,
        vibe: template.vibe,
        description: template.description,
        tags: template.tags,
        isActive: true,
      },
      create: {
        ...template,
        isActive: true,
      },
    })
  }

  console.log("Database seeded successfully.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })