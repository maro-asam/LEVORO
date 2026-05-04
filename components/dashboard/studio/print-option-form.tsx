"use client"

import { useMemo, useState, useTransition } from "react"

import type { PrintArea } from "@/generated/prisma"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { createProductPrintOptionAction, toggleProductPrintOptionAction } from "@/app/dashboard/actions/studio.actions"

type ProductForPrintOptions = {
  id: string
  name: string
  slug: string
  status: string
  printOptions: Array<{
    id: string
    area: PrintArea
    label: string
    extraCost: number
    previewZone: unknown
    defaultPlacement: unknown
    isActive: boolean
  }>
}

const printAreaOptions: Array<{
  value: PrintArea
  label: string
}> = [
  {
    value: "FRONT",
    label: "أمام",
  },
  {
    value: "BACK",
    label: "خلف",
  },
  {
    value: "LEFT_CHEST",
    label: "صدر شمال",
  },
  {
    value: "RIGHT_CHEST",
    label: "صدر يمين",
  },
  {
    value: "LEFT_SLEEVE",
    label: "كم شمال",
  },
  {
    value: "RIGHT_SLEEVE",
    label: "كم يمين",
  },
]

export function PrintOptionManager({
  products,
}: {
  products: ProductForPrintOptions[]
}) {
  const [isPending, startTransition] = useTransition()

  const [productId, setProductId] = useState(products[0]?.id ?? "")
  const [area, setArea] = useState<PrintArea>("FRONT")
  const [label, setLabel] = useState("أمام")
  const [extraCost, setExtraCost] = useState("0")

  const zoneDefaults = useMemo(() => getDefaultsForArea(area), [area])

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const selectedProduct = products.find((product) => product.id === productId)

  function handleAreaChange(nextArea: PrintArea) {
    setArea(nextArea)
    setLabel(getPrintAreaLabel(nextArea))
  }

  function handleCreate() {
    setMessage("")
    setError("")

    const defaults = getDefaultsForArea(area)

    startTransition(async () => {
      const result = await createProductPrintOptionAction({
        productId,
        area,
        label,
        extraCost: Number(extraCost) || 0,
        previewZone: defaults.previewZone,
        defaultPlacement: defaults.defaultPlacement,
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة.")
        return
      }

      setMessage(result.message ?? "تمت الإضافة.")
    })
  }

  function handleToggle(optionId: string) {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await toggleProductPrintOptionAction(optionId)

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة.")
        return
      }

      setMessage(result.message ?? "تم التحديث.")
    })
  }

  return (
    <section className="rounded-[2rem] border border-border bg-background p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black">أماكن الطباعة</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          هنا تضيف أمام، خلف، صدر، وأكمام لكل منتج.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_120px]">
        <div className="space-y-2">
          <Label>المنتج</Label>
          <select
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
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
          <Label>نوع المكان</Label>
          <select
            value={area}
            onChange={(event) => handleAreaChange(event.target.value as PrintArea)}
            className="h-10 w-full rounded-2xl border border-input bg-background px-3 text-sm"
          >
            {printAreaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="print-label">اسم الزر</Label>
          <Input
            id="print-label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="print-cost">تكلفة إضافية</Label>
          <Input
            id="print-cost"
            value={extraCost}
            onChange={(event) => setExtraCost(event.target.value)}
            inputMode="numeric"
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-3xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground md:grid-cols-2">
        <div>
          <p className="font-bold text-foreground">Preview zone</p>
          <p className="mt-1">
            x: {zoneDefaults.previewZone.x} · y: {zoneDefaults.previewZone.y} ·
            w: {zoneDefaults.previewZone.width} · h:{" "}
            {zoneDefaults.previewZone.height}
          </p>
        </div>

        <div>
          <p className="font-bold text-foreground">Default placement</p>
          <p className="mt-1">
            x: {zoneDefaults.defaultPlacement.x} · y:{" "}
            {zoneDefaults.defaultPlacement.y} · w:{" "}
            {zoneDefaults.defaultPlacement.width} · h:{" "}
            {zoneDefaults.defaultPlacement.height}
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleCreate}
        disabled={isPending || products.length === 0}
        className="mt-5 h-11 rounded-full px-6 font-bold"
      >
        {isPending ? "جاري الإضافة..." : "إضافة مكان طباعة"}
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

      <div className="mt-7 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-[2rem] border border-border bg-card p-4"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-black">{product.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.slug} · {product.status}
                </p>
              </div>

              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
                {product.printOptions.length} أماكن
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {product.printOptions.map((option) => (
                <div
                  key={option.id}
                  className="rounded-2xl border border-border bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black">{option.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getPrintAreaLabel(option.area)} · +{option.extraCost} EGP
                      </p>
                    </div>

                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-bold",
                        option.isActive
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                          : "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      {option.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleToggle(option.id)}
                    className="mt-3 rounded-full font-bold"
                  >
                    {option.isActive ? "تعطيل" : "تفعيل"}
                  </Button>
                </div>
              ))}

              {product.printOptions.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                  مفيش أماكن طباعة للمنتج ده.
                </div>
              )}
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            مفيش منتجات. أضف منتج الأول.
          </div>
        )}
      </div>
    </section>
  )
}

function getPrintAreaLabel(area: PrintArea) {
  const labels: Record<PrintArea, string> = {
    FRONT: "أمام",
    BACK: "خلف",
    LEFT_CHEST: "صدر شمال",
    RIGHT_CHEST: "صدر يمين",
    LEFT_SLEEVE: "كم شمال",
    RIGHT_SLEEVE: "كم يمين",
  }

  return labels[area] ?? area
}

function getDefaultsForArea(area: PrintArea) {
  switch (area) {
    case "FRONT":
      return {
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
      }

    case "BACK":
      return {
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
      }

    case "LEFT_CHEST":
      return {
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
      }

    case "RIGHT_CHEST":
      return {
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
      }

    case "LEFT_SLEEVE":
      return {
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
      }

    case "RIGHT_SLEEVE":
      return {
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
      }

    default:
      return {
        previewZone: {
          x: 44,
          y: 84,
          width: 120,
          height: 132,
        },
        defaultPlacement: {
          x: 19,
          y: 35,
          width: 82,
          height: 62,
        },
      }
  }
}