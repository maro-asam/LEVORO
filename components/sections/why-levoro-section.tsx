"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileCheck2,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const checkpoints = [
  {
    icon: Eye,
    title: "Preview",
    description: "العميل يشوف شكل التصميم قبل الطباعة.",
  },
  {
    icon: FileCheck2,
    title: "Design Check",
    description: "نراجع الجودة، المقاس، ومكان التصميم.",
  },
  {
    icon: Ruler,
    title: "Fit Clarity",
    description: "نساعد العميل يختار المقاس بثقة.",
  },
  {
    icon: PackageCheck,
    title: "Made-to-Order",
    description: "نبدأ التصنيع بعد الموافقة فقط.",
  },
]

const outcomes = [
  "مفيش طلب على العمياني",
  "مشاكل أقل قبل التصنيع",
  "ثقة أعلى في الدفع",
  "قطعة أقرب للي العميل متخيله",
]

export default function WhyLevoroSection() {
  return (
    <section
      id="why"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            ليه LEVORO؟
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            مش بنطبع وخلاص
            <span className="block text-primary">
              بنعدّي طلبك على سيستم يطمنك
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            الفرق الحقيقي إن LEVORO مش بتسيب العميل يطلب وهو متوتر. كل أوردر
            custom بيمر بمراحل وضوح ومراجعة قبل ما يدخل التصنيع.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mt-12"
        >
          <Card className="overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
            <CardContent className="p-0">
              <div className="border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      LEVORO Order System
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      من أول فكرة لحد قطعة جاهزة للتصنيع
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Wand2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
                <div className="p-5 sm:p-6">
                  <div className="relative">
                    <div className="absolute top-6 right-5 hidden h-[calc(100%-3rem)] w-px bg-border md:block" />

                    <div className="grid gap-4">
                      {checkpoints.map((item, index) => {
                        const Icon = item.icon

                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.25 + index * 0.08,
                              ease: "easeOut",
                            }}
                            className="relative flex gap-4 rounded-3xl border border-border bg-background/70 p-4"
                          >
                            <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div className="text-right">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-bold text-foreground">
                                  {item.title}
                                </p>
                                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                                  Step 0{index + 1}
                                </span>
                              </div>
                              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border bg-muted/30 p-5 sm:p-6 lg:border-t-0 lg:border-r">
                  <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <h3 className="text-2xl leading-snug font-bold">
                      النتيجة مش بس منتج أحسن
                      <span className="block text-primary">
                        النتيجة عميل مطمّن
                      </span>
                    </h3>

                    <div className="mt-6 space-y-3">
                      {outcomes.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                          <p className="text-sm font-semibold text-foreground">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="mt-6 h-12 w-full rounded-full font-bold"
                      asChild
                    >
                      <Link href="/studio">
                        جرّب LEVORO Studio
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
