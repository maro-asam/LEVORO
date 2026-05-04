"use client"

import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  Image,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const qualityChecks = [
  {
    icon: Image,
    label: "جودة الصورة",
    value: "واضحة للطباعة",
  },
  {
    icon: FileCheck2,
    label: "مكان التصميم",
    value: "متوازن على القطعة",
  },
  {
    icon: Ruler,
    label: "المقاس",
    value: "مناسب للستايل",
  },
  {
    icon: PackageCheck,
    label: "الموافقة",
    value: "قبل التصنيع",
  },
]

const notes = [
  "لو الصورة ضعيفة هنبلغك",
  "لو التصميم محتاج تعديل هنراجع معاك",
  "مش بنبدأ تصنيع غير بعد الموافقة",
]

export default function TrustQualitySection() {
  return (
    <section
      id="quality"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            جاهزية قبل الطباعة
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            كل تصميم له مراجعة
            <span className="block text-primary">
              قبل ما يتحول لقطعة حقيقية
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            بدل ما تطلب وتستنى النتيجة على أمل، LEVORO بتراجع أهم تفاصيل التصميم
            والمقاس والمعاينة قبل ما يبدأ التصنيع.
          </motion.p>
        </div>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            <Card className="overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
              <CardContent className="p-6 sm:p-8">
                <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                  <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-3 rounded-full border border-dashed border-primary/40"
                    />

                    <div className="absolute inset-8 rounded-full bg-primary/10" />

                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Print readiness
                      </p>
                      <p className="mt-2 text-5xl font-black text-primary">
                        96%
                      </p>
                      <p className="mt-2 text-xs font-semibold text-muted-foreground">
                        جاهز للمراجعة النهائية
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4 text-right">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          مش مجرد رقم
                        </p>
                        <p className="mt-1 text-sm leading-7 text-muted-foreground">
                          ده معناه إن التصميم اتراجع من ناحية الجودة، المكان،
                          والمقاس قبل ما يدخل مرحلة التصنيع.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {qualityChecks.map((check, index) => {
              const Icon = check.icon

              return (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.42,
                    delay: 0.2 + index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <Card className="h-full rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
                    <CardContent className="p-5">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>

                      <p className="text-sm font-semibold text-muted-foreground">
                        {check.label}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-card-foreground">
                        {check.value}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
