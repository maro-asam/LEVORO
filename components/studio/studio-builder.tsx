/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ElementType,
  type ReactNode,
} from "react"
import { Rnd } from "react-rnd"
import {
  ArrowLeft,
  CheckCircle2,
  ImageUp,
  MessageCircle,
  Move,
  Palette,
  RefreshCcw,
  Ruler,
  Shirt,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createStudioRequestAction } from "@/actions/studio.actions"

type PrismaPrintArea =
  | "FRONT"
  | "BACK"
  | "LEFT_CHEST"
  | "RIGHT_CHEST"
  | "LEFT_SLEEVE"
  | "RIGHT_SLEEVE"

type Placement = {
  x: number
  y: number
  width: number
  height: number
}

type PreviewZone = {
  x: number
  y: number
  width: number
  height: number
}

type StudioBuilderData = {
  config: {
    badge: string
    title: string
    highlightedTitle: string | null
    description: string | null
    trustBadges: string[]
  } | null

  products: Array<{
    id: string
    name: string
    slug: string
    shortDescription: string | null
    description?: string | null
    basePrice: number
    depositAmount: number | null
    fit: string | null
    allowBackPrint: boolean
    allowSleevePrint: boolean
    variants: Array<{
      id: string
      colorName: string
      colorHex: string | null
      size: string
      priceAdjustment: number
    }>
    printOptions: Array<{
      id: string
      area: PrismaPrintArea
      label: string
      extraCost: number
      previewZone: unknown
      defaultPlacement: unknown
    }>
  }>

  styles: Array<{
    id: string
    name: string
    slug: string
    description: string | null
  }>
}

const fallbackTrustBadges = [
  "مش لازم تكون مصمم",
  "تحكم في مكان التصميم",
  "Designer check",
]

const fallbackFitOptions = [
  {
    name: "Regular",
    label: "Regular",
    description: "قَصة أقرب للمقاس الطبيعي ومناسبة لو عايز شكل بسيط.",
    icon: Shirt,
  },
  {
    name: "Oversized",
    label: "Oversized",
    description: "قَصة أوسع وstreetwear أكتر، مناسبة للهوديز والتيشيرتات.",
    icon: Sparkles,
  },
]

export function StudioBuilder({ data }: { data: StudioBuilderData }) {
  const [isPending, startTransition] = useTransition()

  const [selectedProductId, setSelectedProductId] = useState(
    data.products[0]?.id ?? ""
  )
  const [selectedStyleId, setSelectedStyleId] = useState(
    data.styles[0]?.id ?? ""
  )
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedFit, setSelectedFit] = useState("Oversized")
  const [selectedPrintOptionId, setSelectedPrintOptionId] = useState("")

  const [placement, setPlacement] = useState<Placement>(() =>
    getCenteredPlacement(defaultPreviewZone("FRONT"))
  )

  const [idea, setIdea] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [area, setArea] = useState("")
  const [address, setAddress] = useState("")

  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [orderCode, setOrderCode] = useState("")

  const product = useMemo(() => {
    return (
      data.products.find((item) => item.id === selectedProductId) ??
      data.products[0] ??
      null
    )
  }, [data.products, selectedProductId])

  const selectedStyle = useMemo(() => {
    return (
      data.styles.find((style) => style.id === selectedStyleId) ??
      data.styles[0] ??
      null
    )
  }, [data.styles, selectedStyleId])

  const colorOptions = useMemo(() => {
    return getProductColors(product?.variants ?? [])
  }, [product])

  const sizeOptions = useMemo(() => {
    return getProductSizes(product?.variants ?? [], selectedColor)
  }, [product, selectedColor])

  const printOptions = product?.printOptions ?? []

  const selectedPrintOption = useMemo(() => {
    return (
      printOptions.find((option) => option.id === selectedPrintOptionId) ??
      printOptions[0] ??
      null
    )
  }, [printOptions, selectedPrintOptionId])

  const selectedVariant = useMemo(() => {
    if (!product) return null

    return (
      product.variants.find(
        (variant) =>
          variant.colorName === selectedColor && variant.size === selectedSize
      ) ??
      product.variants.find((variant) => variant.colorName === selectedColor) ??
      product.variants.find((variant) => variant.size === selectedSize) ??
      product.variants[0] ??
      null
    )
  }, [product, selectedColor, selectedSize])

  const fitOptions = useMemo(() => {
    return getFitOptions(product?.fit)
  }, [product?.fit])

  const currentPrintArea = selectedPrintOption?.area ?? "FRONT"

  const zone = useMemo(() => {
    return parsePreviewZone(selectedPrintOption?.previewZone, currentPrintArea)
  }, [selectedPrintOption?.previewZone, currentPrintArea])

  const defaultPlacement = useMemo(() => {
    return parseDefaultPlacement(
      selectedPrintOption?.defaultPlacement,
      zone,
      currentPrintArea
    )
  }, [selectedPrintOption?.defaultPlacement, zone, currentPrintArea])

  const totalPreview = useMemo(() => {
    if (!product) return 0

    return (
      product.basePrice +
      (selectedVariant?.priceAdjustment ?? 0) +
      (selectedPrintOption?.extraCost ?? 0)
    )
  }, [product, selectedVariant, selectedPrintOption])

  useEffect(() => {
    if (!product) return

    const firstVariant = product.variants[0]
    const firstPrintOption = product.printOptions[0]

    setSelectedColor(firstVariant?.colorName ?? "")
    setSelectedSize(firstVariant?.size ?? "")
    setSelectedPrintOptionId(firstPrintOption?.id ?? "")
  }, [product?.id])

  useEffect(() => {
    if (!selectedColor) return
    if (sizeOptions.length === 0) return

    const sizeExists = sizeOptions.includes(selectedSize)

    if (!sizeExists) {
      setSelectedSize(sizeOptions[0])
    }
  }, [selectedColor, selectedSize, sizeOptions])

  useEffect(() => {
    setPlacement(defaultPlacement)
  }, [
    selectedPrintOptionId,
    defaultPlacement.x,
    defaultPlacement.y,
    defaultPlacement.width,
    defaultPlacement.height,
  ])

  function resetPlacement() {
    setPlacement(defaultPlacement)
  }

  function handleSubmit() {
    setError("")
    setSuccessMessage("")
    setOrderCode("")

    if (!product) {
      setError("مفيش منتج متاح حاليًا.")
      return
    }

    if (!selectedPrintOption) {
      setError("اختار مكان الطباعة الأول.")
      return
    }

    if (!selectedColor) {
      setError("اختار اللون.")
      return
    }

    if (!selectedSize) {
      setError("اختار المقاس.")
      return
    }

    if (!name.trim()) {
      setError("اكتب اسمك.")
      return
    }

    if (!phone.trim()) {
      setError("اكتب رقم واتساب.")
      return
    }

    if (!city.trim()) {
      setError("اكتب المحافظة.")
      return
    }

    if (!area.trim()) {
      setError("اكتب المنطقة.")
      return
    }

    if (!address.trim()) {
      setError("اكتب العنوان.")
      return
    }

    const safePlacement = normalizePlacement(placement, zone)

    startTransition(async () => {
      const result = await createStudioRequestAction({
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          area: area.trim(),
          address: address.trim(),
        },
        product: {
          productId: product.id,
          variantId: selectedVariant?.id,
          productName: product.name,
          colorName: selectedColor,
          size: selectedSize,
          fit: selectedFit,
        },
        design: {
          vibe: selectedStyle?.name,
          idea: idea.trim(),
          printArea: selectedPrintOption.area,
          placementPreset: selectedPrintOption.label,
          placement: {
            x: safePlacement.x,
            y: safePlacement.y,
            width: safePlacement.width,
            height: safePlacement.height,
            zone,
          },
        },
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء إرسال الطلب.")
        return
      }

      setSuccessMessage(result.message ?? "تم إرسال طلبك للمراجعة.")
      setOrderCode(result.orderCode ?? "")
    })
  }

  if (!product) {
    return (
      <main dir="rtl" className="min-h-screen bg-background text-foreground">
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>

          <h1 className="text-3xl font-bold">الاستوديو غير متاح حاليًا</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            مفيش منتجات مفعّلة في الداتابيز. فعّل منتج واحد على الأقل من
            الداشبورد أو seed data عشان الصفحة تشتغل.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm">
              <Wand2 className="h-4 w-4 text-primary" />
              {data.config?.badge ?? "LEVORO Studio"}
            </div>

            <h1 className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {data.config?.title ?? "صمّم قطعتك خطوة بخطوة"}
              <span className="block text-primary">
                {data.config?.highlightedTitle ??
                  "اختار مكان جاهز وعدّل براحتك"}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8">
              {data.config?.description ??
                "اختار المنتج ومكان الطباعة الجاهز، وبعدها حرّك التصميم وكبّره أو صغّره جوه مساحة الطباعة قبل ما تبعت الطلب للمراجعة."}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {(data.config?.trustBadges?.length
                ? data.config.trustBadges
                : fallbackTrustBadges
              ).map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-card-foreground shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-start">
            <Card className="rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      ابني طلبك
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      الاختيارات دي جاية من الداتابيز وقابلة للتعديل من
                      الداشبورد بعدين
                    </p>
                  </div>

                  <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    DB Driven
                  </div>
                </div>

                <div className="space-y-8">
                  <StudioBlock
                    icon={Shirt}
                    title="1. اختار القطعة"
                    description="المنتجات المتاحة حاليًا من الداتابيز."
                  >
                    <div className="grid gap-3 md:grid-cols-3">
                      {data.products.map((item) => {
                        const Icon = getProductIcon(item.slug)
                        const isSelected = selectedProductId === item.id

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedProductId(item.id)}
                            className={cn(
                              "rounded-3xl border bg-background/70 p-4 text-right transition hover:bg-muted/50",
                              isSelected
                                ? "border-primary ring-1 ring-primary/30"
                                : "border-border"
                            )}
                          >
                            <div
                              className={cn(
                                "mb-4 flex h-11 w-11 items-center justify-center rounded-2xl",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>

                            <p className="text-sm font-bold text-foreground">
                              {item.name}
                            </p>
                            <p className="mt-2 text-xs leading-6 text-muted-foreground">
                              {item.shortDescription ??
                                item.description ??
                                "منتج قابل للتخصيص."}
                            </p>
                            <p className="mt-3 text-xs font-bold text-primary">
                              {formatPrice(item.basePrice)}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </StudioBlock>

                  <StudioBlock
                    icon={Palette}
                    title="2. اختار الستايل"
                    description="الستايلات دي قابلة للإدارة من الداشبورد."
                  >
                    {data.styles.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data.styles.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setSelectedStyleId(style.id)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-xs font-bold transition sm:text-sm",
                              selectedStyleId === style.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted"
                            )}
                            title={style.description ?? style.name}
                          >
                            {style.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <EmptyInlineMessage text="مفيش styles مضافة حاليًا." />
                    )}
                  </StudioBlock>

                  <StudioBlock
                    icon={Palette}
                    title="3. مكان الطباعة"
                    description="اختار مكان جاهز، وبعدها تقدر تحرّك التصميم بنفسك."
                  >
                    <ChoiceGroupByObject
                      label="مكان الطباعة"
                      options={printOptions.map((option) => ({
                        id: option.id,
                        label: option.label,
                      }))}
                      value={selectedPrintOptionId}
                      onChange={setSelectedPrintOptionId}
                      emptyText="مفيش أماكن طباعة متاحة للمنتج ده."
                    />
                  </StudioBlock>

                  <StudioBlock
                    icon={Move}
                    title="4. ظبط مكان التصميم"
                    description="تقدر تحرّك التصميم وتكبّره أو تصغّره من المعاينة اللي على جنب."
                  >
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div className="rounded-2xl border border-border bg-muted/40 p-4">
                        <p className="text-sm font-bold text-foreground">
                          التحكم الحالي
                        </p>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                          مكان التحكم بيتغير حسب اختيارك: أمام، خلف، صدر، أو كم.
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-full px-5 font-bold"
                        onClick={resetPlacement}
                      >
                        <RefreshCcw className="ml-2 h-4 w-4" />
                        رجّع الوضع
                      </Button>
                    </div>
                  </StudioBlock>

                  <StudioBlock
                    icon={ImageUp}
                    title="5. ارفع التصميم أو اكتب فكرتك"
                    description="الرفع الفعلي هيتربط بعدين بـ Cloudinary / Artwork."
                  >
                    <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                      <button
                        type="button"
                        className="flex min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background/70 p-6 text-center transition hover:bg-muted/40"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground">
                          <Upload className="h-5 w-5" />
                        </div>

                        <p className="text-sm font-bold text-foreground">
                          ارفع التصميم
                        </p>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                          UI فقط حاليًا — هنربط الرفع بعدين ونحفظه في Artwork
                        </p>
                      </button>

                      <div className="space-y-2">
                        <Label htmlFor="idea">فكرتك</Label>
                        <Textarea
                          id="idea"
                          value={idea}
                          onChange={(event) => setIdea(event.target.value)}
                          placeholder="مثال: عايز هودي أسود عليه جملة عربية بسيطة على الصدر، ومن ورا تاريخ صغير..."
                          className="min-h-40 resize-none rounded-2xl"
                        />
                      </div>
                    </div>
                  </StudioBlock>

                  <StudioBlock
                    icon={Ruler}
                    title="6. المقاس واللون"
                    description="الألوان والمقاسات جاية من ProductVariant."
                  >
                    <div className="grid gap-5">
                      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-3xl border border-border bg-card p-4">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                              <Label>اللون</Label>
                              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                                اختار اللون المتاح للمنتج ده
                              </p>
                            </div>

                            <span className="shrink-0 rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                              {selectedColor || "غير محدد"}
                            </span>
                          </div>

                          {colorOptions.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                              {colorOptions.map((color) => {
                                const isSelected = selectedColor === color.name

                                return (
                                  <button
                                    key={color.name}
                                    type="button"
                                    onClick={() => setSelectedColor(color.name)}
                                    aria-label={color.name}
                                    title={color.name}
                                    className={cn(
                                      "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition",
                                      isSelected
                                        ? "border-primary ring-2 ring-primary/30"
                                        : "border-border hover:border-primary/60"
                                    )}
                                  >
                                    <span
                                      className="h-8 w-8 rounded-full border border-border shadow-sm"
                                      style={{
                                        backgroundColor:
                                          color.hex ??
                                          getFallbackColorHex(color.name),
                                      }}
                                    />

                                    {isSelected && (
                                      <span className="absolute -bottom-1 h-2 w-2 rounded-full bg-primary" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          ) : (
                            <EmptyInlineMessage text="مفيش ألوان متاحة للمنتج ده." />
                          )}
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <Label>المقاس</Label>
                              <p className="mt-1 text-xs text-muted-foreground">
                                المقاسات المتاحة حسب اللون المختار
                              </p>
                            </div>

                            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                              {selectedSize || "غير محدد"}
                            </span>
                          </div>

                          {sizeOptions.length > 0 ? (
                            <div className="grid grid-cols-5 gap-2 max-sm:grid-cols-3">
                              {sizeOptions.map((size) => {
                                const isSelected = selectedSize === size

                                return (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                      "flex h-12 items-center justify-center rounded-2xl border px-3 text-sm font-black transition",
                                      isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                  >
                                    {size}
                                  </button>
                                )
                              })}
                            </div>
                          ) : (
                            <EmptyInlineMessage text="مفيش مقاسات متاحة للون ده." />
                          )}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-border bg-card p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <Label>الـ Fit</Label>
                            <p className="mt-1 text-xs text-muted-foreground">
                              اختار الإحساس اللي عايزه في اللبس
                            </p>
                          </div>

                          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                            {selectedFit}
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {fitOptions.map((fit) => {
                            const isSelected = selectedFit === fit.name
                            const Icon = fit.icon

                            return (
                              <button
                                key={fit.name}
                                type="button"
                                onClick={() => setSelectedFit(fit.name)}
                                className={cn(
                                  "rounded-3xl border p-4 text-right transition hover:bg-muted/50",
                                  isSelected
                                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                                    : "border-border bg-background"
                                )}
                              >
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <div
                                    className={cn(
                                      "flex h-10 w-10 items-center justify-center rounded-2xl",
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                    )}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </div>

                                  {isSelected && (
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                  )}
                                </div>

                                <p className="text-sm font-bold text-foreground">
                                  {fit.label}
                                </p>
                                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                                  {fit.description}
                                </p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border bg-muted/40 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <p className="text-xs leading-6 text-muted-foreground">
                            لو مش متأكد من المقاس، اختار الأقرب ليك وسيب لنا
                            ملاحظة في الطلب. قبل التنفيذ هنراجع معاك التفاصيل.
                          </p>
                        </div>
                      </div>
                    </div>
                  </StudioBlock>

                  <StudioBlock
                    icon={MessageCircle}
                    title="7. بيانات التواصل والشحن"
                    description="هنستخدمها عشان نراجع معاك التصميم ونأكد الطلب."
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="اسمك"
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم واتساب</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="01xxxxxxxxx"
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">المحافظة</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          placeholder="القاهرة / الجيزة..."
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area">المنطقة</Label>
                        <Input
                          id="area"
                          value={area}
                          onChange={(event) => setArea(event.target.value)}
                          placeholder="مدينة نصر / فيصل / المعادي..."
                          className="rounded-2xl"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">العنوان بالتفصيل</Label>
                        <Textarea
                          id="address"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          placeholder="اكتب الشارع، رقم العمارة، الدور، وأي علامة مميزة..."
                          className="min-h-28 resize-none rounded-2xl"
                        />
                      </div>
                    </div>
                  </StudioBlock>

                  {error && (
                    <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm font-semibold text-foreground">
                      {successMessage}
                      {orderCode && (
                        <span className="block pt-1 text-xs text-muted-foreground">
                          رقم الطلب: {orderCode}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="lg:sticky lg:top-24">
              <Card className="overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
                <CardContent className="p-0">
                  <div className="border-b border-border p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          معاينة القطعة
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          اسحب التصميم جوه منطقة الطباعة
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Move className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <StudioMockupPreview
                      productName={product.name}
                      color={selectedColor}
                      printArea={currentPrintArea}
                      printAreaLabel={selectedPrintOption?.label ?? "الأمام"}
                      idea={idea}
                      placement={placement}
                      onPlacementChange={setPlacement}
                      zone={zone}
                    />

                    <div className="mt-5 space-y-3">
                      <SummaryRow label="المنتج" value={product.name} />
                      <SummaryRow
                        label="السعر المتوقع"
                        value={formatPrice(totalPreview)}
                      />
                      <SummaryRow
                        label="العربون"
                        value={
                          product.depositAmount
                            ? formatPrice(product.depositAmount)
                            : "يحدد لاحقًا"
                        }
                      />
                      <SummaryRow
                        label="الستايل"
                        value={selectedStyle?.name ?? "غير محدد"}
                      />
                      <SummaryRow
                        label="مكان الطباعة"
                        value={selectedPrintOption?.label ?? "غير محدد"}
                      />
                      <SummaryRow
                        label="اللون"
                        value={selectedColor || "غير محدد"}
                      />
                      <SummaryRow
                        label="المقاس"
                        value={selectedSize || "غير محدد"}
                      />
                      <SummaryRow label="الـ Fit" value={selectedFit} />
                      <SummaryRow
                        label="الفكرة"
                        value={idea ? "تمت إضافة وصف" : "لسه مفيش وصف"}
                      />
                      <SummaryRow
                        label="الشحن"
                        value={
                          city && area
                            ? `${city} · ${area}`
                            : "لسه مفيش بيانات شحن"
                        }
                      />
                    </div>

                    <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
                      <p className="text-sm font-bold text-foreground">
                        بيانات placement
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        Area: {currentPrintArea} · X:{" "}
                        {Math.round(normalizePlacement(placement, zone).x)} ·
                        Y: {Math.round(normalizePlacement(placement, zone).y)} ·
                        W:{" "}
                        {Math.round(normalizePlacement(placement, zone).width)}{" "}
                        · H:{" "}
                        {Math.round(normalizePlacement(placement, zone).height)}
                      </p>
                    </div>

                    <Button
                      className="mt-5 h-12 w-full rounded-full font-bold"
                      onClick={handleSubmit}
                      disabled={isPending}
                    >
                      {isPending ? "جاري الإرسال..." : "ابعت الطلب للمراجعة"}
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 rounded-[2rem] border border-border bg-card/70 p-4 shadow-sm backdrop-blur">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-xs leading-6 text-muted-foreground">
                    اللي العميل بيعمله هنا معاينة مبدئية. الطباعة النهائية بتتم
                    من الملف الأصلي بعد مراجعة فريق LEVORO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function StudioBlock({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ElementType
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-background/60 p-4 sm:p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

function ChoiceGroupByObject({
  label,
  options,
  value,
  onChange,
  emptyText = "مفيش اختيارات متاحة.",
}: {
  label: string
  options: { id: string; label: string }[]
  value: string
  onChange: (value: string) => void
  emptyText?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {options.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-bold transition",
                value === option.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <EmptyInlineMessage text={emptyText} />
      )}
    </div>
  )
}

function StudioMockupPreview({
  productName,
  color,
  printArea,
  printAreaLabel,
  idea,
  placement,
  onPlacementChange,
  zone,
}: {
  productName: string
  color: string
  printArea: PrismaPrintArea
  printAreaLabel: string
  idea: string
  placement: Placement
  onPlacementChange: (placement: Placement) => void
  zone: PreviewZone
}) {
  const isBack = printArea === "BACK"
  const isLeftSleeve = printArea === "LEFT_SLEEVE"
  const isRightSleeve = printArea === "RIGHT_SLEEVE"
  const isSleeve = isLeftSleeve || isRightSleeve
  const isChest = printArea === "LEFT_CHEST" || printArea === "RIGHT_CHEST"

  const safePlacement = normalizePlacement(placement, zone)

  return (
    <div className="rounded-3xl border border-border bg-background/70 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-foreground">معاينة مبدئية</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {productName} · {color || "Color"}
          </p>
        </div>

        <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          {isSleeve ? "Sleeve" : isBack ? "Back" : "Front"}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-85 max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted/40">
        <div className="absolute top-4 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
          {productName}
        </div>

        <div className="relative mt-8 h-64 w-52">
          <div className="absolute top-0 left-1/2 h-14 w-24 -translate-x-1/2 rounded-b-full border border-border bg-card" />

          <div
            className={cn(
              "absolute top-9 left-1/2 h-48 w-44 -translate-x-1/2 rounded-[2.75rem] border bg-card shadow-sm",
              !isSleeve ? "border-primary/40" : "border-border"
            )}
          />

          <div
            className={cn(
              "absolute top-14 right-0 h-40 w-12 rotate-12 rounded-full border bg-card",
              isRightSleeve
                ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]"
                : "border-border"
            )}
          />

          <div
            className={cn(
              "absolute top-14 left-0 h-40 w-12 -rotate-12 rounded-full border bg-card",
              isLeftSleeve
                ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]"
                : "border-border"
            )}
          />

          <div
            className={cn(
              "absolute border border-dashed border-primary/50 bg-primary/5",
              isSleeve ? "rounded-full" : "rounded-2xl",
              isChest && "rounded-xl"
            )}
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.width,
              height: zone.height,
            }}
          >
            <Rnd
              bounds="parent"
              lockAspectRatio
              size={{
                width: safePlacement.width,
                height: safePlacement.height,
              }}
              position={{
                x: safePlacement.x,
                y: safePlacement.y,
              }}
              minWidth={isSleeve ? 20 : 28}
              minHeight={isSleeve ? 36 : 22}
              maxWidth={zone.width}
              maxHeight={zone.height}
              onDragStop={(_, dragData) => {
                onPlacementChange(
                  normalizePlacement(
                    {
                      ...safePlacement,
                      x: dragData.x,
                      y: dragData.y,
                    },
                    zone
                  )
                )
              }}
              onResizeStop={(_, __, ref, ___, position) => {
                onPlacementChange(
                  normalizePlacement(
                    {
                      x: position.x,
                      y: position.y,
                      width: Number.parseInt(ref.style.width, 10),
                      height: Number.parseInt(ref.style.height, 10),
                    },
                    zone
                  )
                )
              }}
              className="z-20"
            >
              <div
                className={cn(
                  "flex h-full w-full cursor-move items-center justify-center overflow-hidden border border-border bg-primary p-1 text-center text-primary-foreground shadow-sm transition",
                  isSleeve ? "rounded-full" : "rounded-xl"
                )}
              >
                <p
                  className={cn(
                    "line-clamp-3 max-w-full text-[8px] leading-3 font-black tracking-[0.08em] break-all sm:text-[9px]",
                    isSleeve && "rotate-90 whitespace-nowrap"
                  )}
                >
                  {idea ? getShortIdea(idea) : "YOUR DESIGN"}
                </p>
              </div>
            </Rnd>
          </div>
        </div>

        <div className="absolute bottom-4 grid w-[calc(100%-2rem)] grid-cols-3 gap-2">
          <div className="rounded-xl border border-border bg-background px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground">
            {printAreaLabel}
          </div>

          <div className="rounded-xl border border-border bg-background px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground">
            قابل للتعديل
          </div>

          <div className="rounded-xl border border-border bg-background px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground">
            Drag
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs leading-6 text-muted-foreground">
        المكان الجاهز بيتغير حسب منطقة الطباعة. تقدر تسحبه أو تغيّر حجمه قبل
        الإرسال.
      </p>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/70 px-4 py-3">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  )
}

function EmptyInlineMessage({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-3 text-xs font-semibold text-muted-foreground">
      {text}
    </div>
  )
}

function getProductColors(
  variants: Array<{ colorName: string; colorHex: string | null }>
) {
  const map = new Map<string, string | null>()

  for (const variant of variants) {
    if (!map.has(variant.colorName)) {
      map.set(variant.colorName, variant.colorHex)
    }
  }

  return Array.from(map.entries()).map(([name, hex]) => ({
    name,
    hex,
  }))
}

function getProductSizes(
  variants: Array<{ colorName: string; size: string }>,
  selectedColor: string
) {
  const filtered = selectedColor
    ? variants.filter((variant) => variant.colorName === selectedColor)
    : variants

  return Array.from(new Set(filtered.map((variant) => variant.size))).sort(
    sortSizes
  )
}

function sortSizes(a: string, b: string) {
  const order = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

  const aIndex = order.indexOf(a)
  const bIndex = order.indexOf(b)

  if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
  if (aIndex === -1) return 1
  if (bIndex === -1) return -1

  return aIndex - bIndex
}

function parsePreviewZone(
  value: unknown,
  printArea: PrismaPrintArea
): PreviewZone {
  if (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    "y" in value &&
    "width" in value &&
    "height" in value
  ) {
    const zone = value as Record<string, unknown>

    if (
      typeof zone.x === "number" &&
      typeof zone.y === "number" &&
      typeof zone.width === "number" &&
      typeof zone.height === "number"
    ) {
      return {
        x: zone.x,
        y: zone.y,
        width: zone.width,
        height: zone.height,
      }
    }
  }

  return defaultPreviewZone(printArea)
}

function parseDefaultPlacement(
  value: unknown,
  zone: PreviewZone,
  printArea: PrismaPrintArea
): Placement {
  if (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    "y" in value &&
    "width" in value &&
    "height" in value
  ) {
    const placement = value as Record<string, unknown>

    if (
      typeof placement.x === "number" &&
      typeof placement.y === "number" &&
      typeof placement.width === "number" &&
      typeof placement.height === "number"
    ) {
      return normalizePlacement(
        {
          x: placement.x,
          y: placement.y,
          width: placement.width,
          height: placement.height,
        },
        zone
      )
    }
  }

  return getDefaultPlacementForArea(zone, printArea)
}

function defaultPreviewZone(printArea: PrismaPrintArea): PreviewZone {
  switch (printArea) {
    case "FRONT":
      return {
        x: 42,
        y: 86,
        width: 124,
        height: 132,
      }

    case "BACK":
      return {
        x: 38,
        y: 72,
        width: 132,
        height: 150,
      }

    case "LEFT_CHEST":
      return {
        x: 112,
        y: 88,
        width: 48,
        height: 54,
      }

    case "RIGHT_CHEST":
      return {
        x: 50,
        y: 88,
        width: 48,
        height: 54,
      }

    case "LEFT_SLEEVE":
      return {
        x: 8,
        y: 92,
        width: 52,
        height: 116,
      }

    case "RIGHT_SLEEVE":
      return {
        x: 148,
        y: 92,
        width: 52,
        height: 116,
      }

    default:
      return {
        x: 44,
        y: 84,
        width: 120,
        height: 132,
      }
  }
}

function getDefaultPlacementForArea(
  zone: PreviewZone,
  printArea: PrismaPrintArea
): Placement {
  if (printArea === "LEFT_SLEEVE" || printArea === "RIGHT_SLEEVE") {
    return normalizePlacement(
      {
        x: Math.max(0, (zone.width - 34) / 2),
        y: Math.max(0, (zone.height - 72) / 2),
        width: Math.min(34, zone.width),
        height: Math.min(72, zone.height),
      },
      zone
    )
  }

  if (printArea === "LEFT_CHEST" || printArea === "RIGHT_CHEST") {
    return normalizePlacement(
      {
        x: Math.max(0, (zone.width - 34) / 2),
        y: Math.max(0, (zone.height - 34) / 2),
        width: Math.min(34, zone.width),
        height: Math.min(34, zone.height),
      },
      zone
    )
  }

  return getCenteredPlacement(zone)
}

function getCenteredPlacement(zone: PreviewZone): Placement {
  const width = Math.min(82, zone.width)
  const height = Math.min(62, zone.height)

  return normalizePlacement(
    {
      x: Math.max(0, (zone.width - width) / 2),
      y: Math.max(0, (zone.height - height) / 2),
      width,
      height,
    },
    zone
  )
}

function normalizePlacement(
  placement: Placement,
  zone: PreviewZone
): Placement {
  const width = clamp(placement.width, 20, zone.width)
  const height = clamp(placement.height, 20, zone.height)

  const x = clamp(placement.x, 0, Math.max(0, zone.width - width))
  const y = clamp(placement.y, 0, Math.max(0, zone.height - height))

  return {
    x,
    y,
    width,
    height,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getShortIdea(idea: string) {
  const cleaned = idea.trim()

  if (!cleaned) return "YOUR DESIGN"

  if (cleaned.length <= 24) return cleaned

  return `${cleaned.slice(0, 24)}...`
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value)
}

function getFallbackColorHex(colorName: string) {
  const normalized = colorName.toLowerCase()

  if (normalized.includes("black") || normalized.includes("أسود")) {
    return "#020617"
  }

  if (normalized.includes("white") || normalized.includes("أبيض")) {
    return "#ffffff"
  }

  if (normalized.includes("navy") || normalized.includes("كحلي")) {
    return "#172554"
  }

  if (
    normalized.includes("grey") ||
    normalized.includes("gray") ||
    normalized.includes("رمادي")
  ) {
    return "#a3a3a3"
  }

  return "#737373"
}

function getFitOptions(productFit: string | null | undefined) {
  if (!productFit) return fallbackFitOptions

  const values = productFit
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  if (values.length === 0) return fallbackFitOptions

  return values.map((value) => ({
    name: value,
    label: value,
    description:
      value.toLowerCase().includes("over") || value.includes("واسع")
        ? "قَصة أوسع وstreetwear أكتر."
        : "قَصة مناسبة للاستخدام اليومي.",
    icon: value.toLowerCase().includes("over") ? Sparkles : Shirt,
  }))
}

function getProductIcon(slug: string): ElementType {
  if (slug.includes("group") || slug.includes("merch")) {
    return Sparkles
  }

  return Shirt
}