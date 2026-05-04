import { z } from "zod"

export const createGuestOrderSchema = z.object({
  customerName: z.string().min(2, "اكتب الاسم بالكامل"),
  customerPhone: z.string().min(10, "اكتب رقم موبايل صحيح"),
  customerEmail: z
    .string()
    .email("اكتب إيميل صحيح")
    .optional()
    .or(z.literal("")),

  shippingCity: z.string().min(2, "اختار المحافظة"),
  shippingArea: z.string().min(2, "اكتب المنطقة"),
  shippingAddress: z.string().min(8, "اكتب العنوان بالتفصيل"),
  shippingNotes: z.string().optional(),

  productId: z.string().min(1),
  variantId: z.string().optional(),
  size: z.string().min(1),
  colorName: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),

  frontText: z.string().optional(),
  backText: z.string().optional(),
  designNotes: z.string().optional(),

  printAreas: z
    .array(
      z.enum([
        "FRONT",
        "BACK",
        "LEFT_CHEST",
        "RIGHT_CHEST",
        "LEFT_SLEEVE",
        "RIGHT_SLEEVE",
      ])
    )
    .default(["FRONT"]),
})

export type CreateGuestOrderInput = z.infer<typeof createGuestOrderSchema>
