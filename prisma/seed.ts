import "dotenv/config"
import { prisma } from "../lib/prisma"

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@levoro.com"
  const adminName = process.env.ADMIN_SEED_NAME || "LEVORO Admin"

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      role: "ADMIN",
    },
  })

  const streetwear = await prisma.category.upsert({
    where: { slug: "streetwear" },
    update: {},
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
    update: {},
    create: {
      categoryId: streetwear.id,
      name: "Oversized T-Shirt",
      slug: "oversized-t-shirt",
      shortDescription: "تيشيرت واسع تقدر تصممه على ذوقك.",
      description:
        "تيشيرت Oversized مناسب للطباعة الأمامية والخلفية، خامة مريحة وشكل streetwear.",
      basePrice: 69900,
      compareAtPrice: 79900,
      depositAmount: 35000,
      status: "ACTIVE",
      material: "Cotton blend",
      fit: "Oversized",
      allowCustomText: true,
      allowCustomImage: true,
      allowBackPrint: true,
      allowSleevePrint: false,
    },
  })

  const hoodie = await prisma.product.upsert({
    where: { slug: "custom-hoodie" },
    update: {},
    create: {
      categoryId: streetwear.id,
      name: "Custom Hoodie",
      slug: "custom-hoodie",
      shortDescription: "هودي custom بتصميمك.",
      description: "هودي قابل للتخصيص، مناسب للتصميمات الكبيرة والدروب الشتوي.",
      basePrice: 149900,
      compareAtPrice: 169900,
      depositAmount: 75000,
      status: "ACTIVE",
      material: "Fleece cotton blend",
      fit: "Relaxed",
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
          update: {},
          create: {
            productId: product.id,
            colorName: color.colorName,
            colorHex: color.colorHex,
            size,
            sku: `${product.slug}-${color.colorName}-${size}`
              .toUpperCase()
              .replaceAll(" ", "-"),
            stock: 0,
            isActive: true,
          },
        })
      }
    }

    const printOptions = [
      {
        area: "FRONT" as const,
        label: "طباعة أمامية",
        extraCost: 0,
        maxWidthCm: 28,
        maxHeightCm: 35,
      },
      {
        area: "BACK" as const,
        label: "طباعة خلفية",
        extraCost: 15000,
        maxWidthCm: 32,
        maxHeightCm: 40,
      },
      {
        area: "LEFT_CHEST" as const,
        label: "طباعة صغيرة على الصدر",
        extraCost: 0,
        maxWidthCm: 10,
        maxHeightCm: 10,
      },
      {
        area: "LEFT_SLEEVE",
        label: "كم شمال",
        extraCost: 50,
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
          productId_area: {
            productId: product.id,
            area: option.area,
          },
        },
        update: {},
        create: {
          productId: product.id,
          ...option,
        },
      })
    }
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
      update: {},
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
