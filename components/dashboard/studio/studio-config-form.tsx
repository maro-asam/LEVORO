"use client"

import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateStudioConfigAction } from "@/app/dashboard/actions/studio.actions"

type StudioConfigFormProps = {
  config: {
    badge: string
    title: string
    highlightedTitle: string | null
    description: string | null
    trustBadges: string[]
  } | null
}

export function StudioConfigForm({ config }: StudioConfigFormProps) {
  const [isPending, startTransition] = useTransition()

  const [badge, setBadge] = useState(config?.badge ?? "LEVORO Studio")
  const [title, setTitle] = useState(config?.title ?? "صمّم قطعتك خطوة بخطوة")
  const [highlightedTitle, setHighlightedTitle] = useState(
    config?.highlightedTitle ?? "اختار مكان جاهز وعدّل براحتك"
  )
  const [description, setDescription] = useState(config?.description ?? "")
  const [trustBadgesText, setTrustBadgesText] = useState(
    config?.trustBadges?.join("\n") ?? ""
  )

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  function handleSubmit() {
    setMessage("")
    setError("")

    if (!title.trim()) {
      setError("عنوان الصفحة مطلوب.")
      return
    }

    startTransition(async () => {
      const result = await updateStudioConfigAction({
        badge,
        title,
        highlightedTitle,
        description,
        trustBadgesText,
      })

      if (!result.success) {
        setError(result.message ?? "حصلت مشكلة أثناء الحفظ.")
        return
      }

      setMessage(result.message ?? "تم الحفظ.")
    })
  }

  return (
    <section className="rounded-[2rem] border border-border bg-background p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black">إعدادات صفحة الاستوديو</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          العنوان والوصف والـ trust badges اللي بتظهر في أول صفحة Studio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studio-badge">Badge</Label>
          <Input
            id="studio-badge"
            value={badge}
            onChange={(event) => setBadge(event.target.value)}
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="studio-title">العنوان الأساسي</Label>
          <Input
            id="studio-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="studio-highlighted-title">العنوان المميز</Label>
          <Input
            id="studio-highlighted-title"
            value={highlightedTitle}
            onChange={(event) => setHighlightedTitle(event.target.value)}
            className="rounded-2xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="studio-description">الوصف</Label>
          <Textarea
            id="studio-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-28 resize-none rounded-2xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="studio-trust-badges">Trust badges</Label>
          <Textarea
            id="studio-trust-badges"
            value={trustBadgesText}
            onChange={(event) => setTrustBadgesText(event.target.value)}
            placeholder="كل badge في سطر لوحده"
            className="min-h-28 resize-none rounded-2xl"
          />
          <p className="text-xs text-muted-foreground">
            اكتب كل badge في سطر منفصل.
          </p>
        </div>
      </div>

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

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="mt-5 h-11 rounded-full px-6 font-bold"
      >
        {isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
      </Button>
    </section>
  )
}