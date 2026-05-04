"use client"

import { useState, useTransition } from "react"

import type { ProductStatus } from "@/generated/prisma"
import {
  createProductAction,
  createProductVariantAction,
  toggleProductVariantAction,
  updateProductStatusAction,
} from "@/app/dashboard/actions/product.actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type DashboardProduct = {
  id: string
  name: string
  slug: string
  shortDescription: string | null
  description: string | null
  basePrice: number
  depositAmount: number | null
  status: ProductStatus
  material: string | null
  fit: string | null
  allowBackPrint: boolean
  allowSleevePrint: boolean
  variants: Array<{
    id: string
    colorName: string
    colorHex: string | null
    size: string
    stock: number
    isActive: boolean
    priceAdjustment: number
  }>
  printOptions: Array<{
    id: string
    area: string
    label: string
    extraCost: number
    isActive: boolean
  }>
}

export function ProductManager({ products }: { products: DashboardProduct[] }) {
  const [isPending, startTransition] = useTransition()

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [description, setDescription] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [material, setMaterial] = useState("")
  const [fit, setFit] = useState("Regular,Oversized")
  const [allowBackPrint, setAllowBackPrint] = useState(true)
  const [allowSleevePrint, setAllowSleevePrint] = useState(true)

  const [variantProductId, setVariantProductId] = useState(
    products[0]?.id ?? ""
  )
  const [colorName, setColorName] = useState("")
  const [colorHex, setColorHex] = useState("")
  const [size, setSize] = useState("M")
  const [stock, setStock] = useState("0")
  const [priceAdjustment, setPriceAdjustment] = useState("0")

  function handleCreateProduct() {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await createProductAction({
        name,
        slug,
        shortDescription,
        description,
        basePrice: Number(basePrice),
        depositAmount: Number(depositAmount) || 0,
        material,
        fit,
        status: "ACTIVE",
        allowBackPrint,
        allowSleevePrint,
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء إضافة المنتج.")
        return
      }

      setName("")
      setSlug("")
      setShortDescription("")
      setDescription("")
      setBasePrice("")
      setDepositAmount("")
      setMaterial("")
      setFit("Regular,Oversized")
      setAllowBackPrint(true)
      setAllowSleevePrint(true)
      setMessage(result.message ?? "تمت إضافة المنتج.")
    })
  }

  function handleCreateVariant() {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await createProductVariantAction({
        productId: variantProductId,
        colorName,
        colorHex,
        size,
        stock: Number(stock) || 0,
        priceAdjustment: Number(priceAdjustment) || 0,
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء إضافة اللون والمقاس.")
        return
      }

      setColorName("")
      setColorHex("")
      setSize("M")
      setStock("0")
      setPriceAdjustment("0")
      setMessage(result.message ?? "تمت إضافة اللون والمقاس.")
    })
  }

  function handleUpdateStatus(productId: string, status: ProductStatus) {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await updateProductStatusAction(productId, status)

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء تحديث المنتج.")
        return
      }

      setMessage(result.message ?? "تم تحديث المنتج.")
    })
  }

  function handleToggleVariant(variantId: string) {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await toggleProductVariantAction(variantId)

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء تحديث الـ variant.")
        return
      }

      setMessage(result.message ?? "تم تحديث الـ variant.")
    })
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-[2rem] bg-background shadow-sm">
        <CardContent className="p-5">
          <div className="mb-5">
            <h3 className="text-lg font-black">إضافة منتج جديد</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              المنتج بعد إضافته هيظهر في صفحة Studio لو حالته Active.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">اسم المنتج</Label>
              <Input
                id="product-name"
                value={name}
                onChange={(event) => {
                  const value = event.target.value
                  setName(value)

                  if (!slug.trim()) {
                    setSlug(value.toLowerCase().replace(/\s+/g, "-"))
                  }
                }}
                placeholder="Oversized Hoodie"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-slug">Slug</Label>
              <Input
                id="product-slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="oversized-hoodie"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="base-price">السعر الأساسي</Label>
              <Input
                id="base-price"
                value={basePrice}
                onChange={(event) => setBasePrice(event.target.value)}
                inputMode="numeric"
                placeholder="850"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit-amount">العربون</Label>
              <Input
                id="deposit-amount"
                value={depositAmount}
                onChange={(event) => setDepositAmount(event.target.value)}
                inputMode="numeric"
                placeholder="200"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">الخامة</Label>
              <Input
                id="material"
                value={material}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="Cotton fleece"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fit">Fit options</Label>
              <Input
                id="fit"
                value={fit}
                onChange={(event) => setFit(event.target.value)}
                placeholder="Regular,Oversized"
                className="rounded-2xl"
              />
              <p className="text-xs text-muted-foreground">
                افصل الاختيارات بفاصلة: Regular,Oversized
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="short-description">وصف مختصر</Label>
              <Input
                id="short-description"
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                placeholder="هودي قابل للتخصيص"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-28 resize-none rounded-2xl"
              />
            </div>

            <div className="flex flex-wrap gap-3 md:col-span-2">
              <ToggleButton
                active={allowBackPrint}
                label="يسمح بطباعة خلفية"
                onClick={() => setAllowBackPrint((value) => !value)}
              />

              <ToggleButton
                active={allowSleevePrint}
                label="يسمح بطباعة أكمام"
                onClick={() => setAllowSleevePrint((value) => !value)}
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleCreateProduct}
            disabled={isPending}
            className="mt-5 h-11 rounded-full px-6 font-bold"
          >
            {isPending ? "جاري الإضافة..." : "إضافة المنتج"}
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] bg-background shadow-sm">
        <CardContent className="p-5">
          <div className="mb-5">
            <h3 className="text-lg font-black">إضافة لون ومقاس</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              كل لون ومقاس بيتحفظ كـ ProductVariant.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px_120px_140px]">
            <div className="space-y-2">
              <Label>المنتج</Label>
              <select
                value={variantProductId}
                onChange={(event) => setVariantProductId(event.target.value)}
                className="h-10 w-full rounded-2xl border border-input bg-background px-3 text-sm"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-name">اللون</Label>
              <Input
                id="color-name"
                value={colorName}
                onChange={(event) => setColorName(event.target.value)}
                placeholder="Black"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-hex">Hex</Label>
              <Input
                id="color-hex"
                value={colorHex}
                onChange={(event) => setColorHex(event.target.value)}
                placeholder="#020617"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">المقاس</Label>
              <Input
                id="size"
                value={size}
                onChange={(event) => setSize(event.target.value)}
                placeholder="M"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">المخزون</Label>
              <Input
                id="stock"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                inputMode="numeric"
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="price-adjustment">فرق السعر</Label>
              <Input
                id="price-adjustment"
                value={priceAdjustment}
                onChange={(event) => setPriceAdjustment(event.target.value)}
                inputMode="numeric"
                placeholder="0"
                className="rounded-2xl"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleCreateVariant}
            disabled={isPending || products.length === 0}
            className="mt-5 h-11 rounded-full px-6 font-bold"
          >
            {isPending ? "جاري الإضافة..." : "إضافة اللون والمقاس"}
          </Button>

          {error && (
            <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm font-bold text-destructive">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-sm font-bold">
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-[2rem] border border-border bg-background p-5 shadow-sm"
          >
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black">{product.name}</h3>

                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-bold",
                      product.status === "ACTIVE"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                        : product.status === "ARCHIVED"
                          ? "border-border bg-muted text-muted-foreground"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-700"
                    )}
                  >
                    {product.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {product.slug} · {formatPrice(product.basePrice)}
                </p>

                {product.shortDescription && (
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full font-bold"
                  disabled={isPending}
                  onClick={() => handleUpdateStatus(product.id, "ACTIVE")}
                >
                  تفعيل
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full font-bold"
                  disabled={isPending}
                  onClick={() => handleUpdateStatus(product.id, "DRAFT")}
                >
                  Draft
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full font-bold"
                  disabled={isPending}
                  onClick={() => handleUpdateStatus(product.id, "ARCHIVED")}
                >
                  أرشفة
                </Button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_0.55fr]">
              <div className="rounded-3xl border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-black">الألوان والمقاسات</p>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
                    {product.variants.length} variants
                  </span>
                </div>

                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="rounded-2xl border border-border bg-background p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-6 w-6 rounded-full border border-border"
                            style={{
                              backgroundColor: variant.colorHex ?? "#737373",
                            }}
                          />
                          <div>
                            <p className="text-sm font-black">
                              {variant.colorName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {variant.size}
                            </p>
                          </div>
                        </div>

                        <span
                          className={cn(
                            "rounded-full border px-2 py-1 text-[11px] font-bold",
                            variant.isActive
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                              : "border-border bg-muted text-muted-foreground"
                          )}
                        >
                          {variant.isActive ? "Active" : "Off"}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <p>Stock: {variant.stock}</p>
                        <p>+{variant.priceAdjustment} EGP</p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3 rounded-full font-bold"
                        disabled={isPending}
                        onClick={() => handleToggleVariant(variant.id)}
                      >
                        {variant.isActive ? "تعطيل" : "تفعيل"}
                      </Button>
                    </div>
                  ))}

                  {product.variants.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      مفيش variants للمنتج ده.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-black">أماكن الطباعة</p>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
                    {product.printOptions.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {product.printOptions.map((option) => (
                    <div
                      key={option.id}
                      className="rounded-2xl border border-border bg-background p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-black">{option.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {option.area} · +{option.extraCost} EGP
                          </p>
                        </div>

                        <span
                          className={cn(
                            "rounded-full border px-2 py-1 text-[11px] font-bold",
                            option.isActive
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                              : "border-border bg-muted text-muted-foreground"
                          )}
                        >
                          {option.isActive ? "Active" : "Off"}
                        </span>
                      </div>
                    </div>
                  ))}

                  {product.printOptions.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      مفيش أماكن طباعة. ضيفها من Dashboard / Studio.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}

        {products.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-border bg-background p-10 text-center shadow-sm">
            <p className="font-black">لسه مفيش منتجات</p>
            <p className="mt-2 text-sm text-muted-foreground">
              أضف أول منتج وبعدها ضيف له ألوان ومقاسات.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-bold transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  )
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value)
}
