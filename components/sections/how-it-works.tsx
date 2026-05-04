"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  Link,
  PackageCheck,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Palette,
    title: "اختار القطعة",
    description:
      "ابدأ بـ Hoodie أو Oversized T-Shirt، واختار اللون والمقاس المناسبين ليك.",
    meta: "Product",
  },
  {
    icon: Wand2,
    title: "ارفع التصميم أو اكتب فكرتك",
    description:
      "ارفع صورة، logo، جملة، أو اكتبلنا الفكرة وإحنا نساعدك تطلعها بشكل مناسب.",
    meta: "Design",
  },
  {
    icon: Eye,
    title: "شوف المعاينة وراجعها",
    description:
      "قبل الطباعة، تشوف شكل التصميم على القطعة وتقدر تطلب تعديل لو محتاج.",
    meta: "Preview",
  },
  {
    icon: PackageCheck,
    title: "نصنعها ونوصلهالك",
    description:
      "بعد موافقتك، بنبدأ التصنيع والطباعة، وبعدها الطلب يوصلك لحد باب البيت.",
    meta: "Delivery",
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 28, 0],
            y: [0, -18, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 -left-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
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
            <Sparkles className="h-4 w-4 text-primary" />
            إزاي LEVORO بتشتغل؟
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            من فكرة بسيطة
            <span className="block text-primary">لقطعة جاهزة تلبسها</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            خلّينا رحلة الطلب واضحة من غير دوشة: تختار، تصمم، تراجع، وبعد
            موافقتك نبدأ التصنيع والتوصيل.
          </motion.p>
        </div>

        <div className="relative mt-14">
          <div className="absolute top-0 right-6 hidden h-full w-px bg-border md:block lg:hidden" />
          <div className="absolute top-1/2 right-0 left-0 hidden h-px bg-border lg:block" />

          <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.14 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  <Card className="relative h-full rounded-[2rem] bg-card/80 p-0 shadow-sm ring-1 ring-border/60 backdrop-blur">
                    <CardContent className="p-5">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                          0{index + 1}
                        </div>
                      </div>

                      <p className="mb-2 text-xs font-semibold text-primary">
                        {step.meta}
                      </p>

                      <h3 className="text-lg font-bold text-card-foreground">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="absolute top-7 -right-1 hidden h-3 w-3 rounded-full border border-border bg-primary md:block lg:hidden" />

                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -left-3 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm lg:flex">
                      <ArrowLeft className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-border bg-card/80 p-4 shadow-sm backdrop-blur sm:p-5"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-3 text-right">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-base font-bold text-card-foreground">
                  مش لازم تكون مصمم عشان تبدأ
                </p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  ابعتلنا الفكرة بأي شكل، وإحنا نساعدك نحولها لتصميم مناسب
                  للطباعة قبل ما تدفع وتبدأ التصنيع.
                </p>
              </div>
            </div>

            <Button className="h-12 rounded-full px-6 font-bold" asChild>
              <Link href="/studio">
                ابدأ تصميمك
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
