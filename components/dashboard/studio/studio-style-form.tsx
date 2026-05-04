"use client"

import { useState, useTransition } from "react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createStudioStyleAction, toggleStudioStyleAction } from "@/app/dashboard/actions/studio.actions"

type StudioStyle = {
  id: string
  name: string
  slug: string
  description: string | null
  sortOrder: number
  isActive: boolean
}

export function StudioStyleManager({ styles }: { styles: StudioStyle[] }) {
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  function handleCreate() {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await createStudioStyleAction({
        name,
        slug,
        description,
        sortOrder: Number(sortOrder) || 0,
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة.")
        return
      }

      setName("")
      setSlug("")
      setDescription("")
      setSortOrder("0")
      setMessage(result.message ?? "تمت الإضافة.")
    })
  }

  function handleToggle(styleId: string) {
    setMessage("")
    setError("")

    startTransition(async () => {
      const result = await toggleStudioStyleAction(styleId)

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
        <h2 className="text-lg font-black">ستايلات الاستوديو</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          الستايلات اللي العميل يختار منها في صفحة Studio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px]">
        <div className="space-y-2">
          <Label htmlFor="style-name">اسم الستايل</Label>
          <Input
            id="style-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (!slug) {
                setSlug(event.target.value.toLowerCase().replace(/\s+/g, "-"))
              }
            }}
            placeholder="Minimal Arabic"
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="style-slug">Slug</Label>
          <Input
            id="style-slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="minimal-arabic"
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="style-order">الترتيب</Label>
          <Input
            id="style-order"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            inputMode="numeric"
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2 md:col-span-3">
          <Label htmlFor="style-description">الوصف</Label>
          <Textarea
            id="style-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-24 resize-none rounded-2xl"
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={handleCreate}
        disabled={isPending}
        className="mt-5 h-11 rounded-full px-6 font-bold"
      >
        {isPending ? "جاري الإضافة..." : "إضافة ستايل"}
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

      <div className="mt-6 grid gap-3">
        {styles.map((style) => (
          <div
            key={style.id}
            className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-black">{style.name}</p>
                <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                  {style.slug}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-bold",
                    style.isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                      : "border-border bg-muted text-muted-foreground"
                  )}
                >
                  {style.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {style.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {style.description}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => handleToggle(style.id)}
              disabled={isPending}
            >
              {style.isActive ? "تعطيل" : "تفعيل"}
            </Button>
          </div>
        ))}

        {styles.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            لسه مفيش styles.
          </div>
        )}
      </div>
    </section>
  )
}
