"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  Eye,
  ImageUp,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const painCards = [
  {
    icon: MessageCircleQuestion,
    title: "العميل مش عارف يبدأ منين",
    description:
      "عنده فكرة أو صورة أو جملة، بس مش عارف يحولها لقطعة شكلها حلو.",
  },
  {
    icon: Eye,
    title: "مفيش وضوح قبل الطباعة",
    description:
      "بيطلب وهو مش متأكد التصميم هيبان إزاي على الهودي أو التيشيرت.",
  },
  {
    icon: ShieldCheck,
    title: "الخوف من الجودة والمقاس",
    description:
      "هل الصورة جودتها كفاية؟ هل المقاس مناسب؟ هل ينفع أراجع قبل التنفيذ؟",
  },
]

const studioFeatures = [
  "اختيار القطعة",
  "رفع التصميم",
  "معاينة مبدئية",
  "Designer check",
  "موافقة قبل التصنيع",
]

export default function ProblemSection() {
  return (
    <section
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.75, 0.45],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            مش بنبيع طباعة وخلاص
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            براند LEVORO بيحل
            <span className="block text-primary">إن العميل يطلب وهو مطمّن</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            الفكرة مش إننا نحط صورة على هودي. الفكرة إننا نخلي رحلة الطلب واضحة:
            العميل يشوف، يراجع، يوافق، وبعدها نبدأ التصنيع.
          </motion.p>
        </div>

        <div className="mt-14 grid items-center gap-5 lg:grid-cols-[1fr_1.12fr_1fr]">
          <div className="space-y-5">
            {painCards.slice(0, 2).map((card, index) => (
              <PainCard
                key={card.title}
                {...card}
                delay={0.12 + index * 0.08}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden rounded-[2rem] bg-card/90 shadow-sm ring-1 ring-border/60 backdrop-blur">
              <CardContent className="p-5 sm:p-6">
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />

                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted-foreground">
                      LEVORO Studio
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">تجربة طلب واضحة</h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Wand2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-background/70 p-4">
                  <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                      <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      Preview Flow
                    </p>
                  </div>

                  <div className="space-y-3">
                    {studioFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: 0.32 + index * 0.06,
                          ease: "easeOut",
                        }}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {feature}
                        </p>
                        {index === studioFeatures.length - 1 && (
                          <CheckCircle2 className="mr-auto h-5 w-5 text-primary" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-muted/40 p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground">
                      قبل الطباعة
                    </p>
                    <p className="mt-1 text-sm font-bold">موافقة العميل</p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/40 p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground">
                      بعد الموافقة
                    </p>
                    <p className="mt-1 text-sm font-bold">تصنيع وتوصيل</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-5">
            <PainCard {...painCards[2]} delay={0.22} />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
              className="rounded-[2rem] border border-border bg-primary p-5 text-primary-foreground shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-foreground/15">
                <ImageUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">من فكرة لقطعة حقيقية</h3>
              <p className="mt-3 text-sm leading-7 opacity-85">
                بدل ما العميل يطلب على العمياني، LEVORO يخليه يشوف الفكرة ويتأكد
                منها قبل ما تتحول لمنتج.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PainCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      <Card className="rounded-[2rem] bg-card/75 shadow-sm backdrop-blur">
        <CardContent className="p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-card-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
