"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const whatsappUrl =
  "https://wa.me/201014344053?text=عايز%20أبدأ%20تصميم%20قطعة%20مخصصة%20مع%20LEVORO"

const ctaPoints = [
  "مش لازم تكون مصمم",
  "معاينة قبل الطباعة",
  "مراجعة قبل التصنيع",
]

export default function FinalCTASection() {
  return (
    <section
      dir="rtl"
      className="relative isolate overflow-hidden bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 24, 0],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -bottom-32 h-72 w-72 rounded-full bg-muted blur-3xl"
        />

        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Card className="overflow-hidden rounded-[2rem] bg-card/85 p-0 shadow-sm ring-1 ring-border/60 backdrop-blur">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_42%)]" />

                <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 text-center sm:p-8 md:p-10 lg:text-right">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08,
                        ease: "easeOut",
                      }}
                      className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                      أول قطعة LEVORO تبدأ بفكرة
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.14,
                        ease: "easeOut",
                      }}
                      className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
                    >
                      جاهز تعمل قطعة
                      <span className="block text-primary">
                        محدش غيرك لابسها؟
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8 lg:mx-0"
                    >
                      ابعتلنا التصميم أو حتى الفكرة بس، وإحنا نساعدك نحولها
                      لمعاينة واضحة قبل الطباعة، وبعد موافقتك نبدأ التصنيع.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.26,
                        ease: "easeOut",
                      }}
                      className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start"
                    >
                      {ctaPoints.map((point) => (
                        <div
                          key={point}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {point}
                        </div>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.32,
                        ease: "easeOut",
                      }}
                      className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="h-12 rounded-full px-6 text-sm font-bold sm:text-base"
                      >
                        <Link href="/studio">
                          ابدأ تصميمك
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-12 rounded-full bg-background/60 px-6 text-sm font-bold backdrop-blur sm:text-base"
                      >
                        <a href={whatsappUrl} target="_blank" rel="noreferrer">
                          <MessageCircle className="ml-2 h-4 w-4" />
                          كلمنا على واتساب
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="border-t border-border bg-muted/30 p-6 sm:p-8 md:p-10 lg:border-t-0 lg:border-r">
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="mx-auto max-w-md rounded-[2rem] border border-border bg-background/80 p-5 shadow-sm backdrop-blur"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">
                            Next step
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            ابدأ بأي حاجة عندك
                          </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                          <Wand2 className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          "صورة أو logo",
                          "جملة عايز تطبعها",
                          "فكرة مش مرتبة",
                          "طلب لجروب أو event",
                        ].map((item, index) => (
                          <motion.div
                            key={item}
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
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-2xl border border-border bg-card p-4 text-right">
                        <p className="text-sm font-bold text-foreground">
                          هنرد عليك بمعاينة وخطة تنفيذ
                        </p>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          ولو التصميم محتاج تعديل قبل الطباعة، هنقولك قبل ما
                          تبدأ.
                        </p>
                      </div>
                    </motion.div>
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
