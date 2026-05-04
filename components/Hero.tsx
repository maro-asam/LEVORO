"use client"

import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const trustPoints = [
  "معاينة قبل الطباعة",
  "مراجعة تصميم مجانية",
  "تصنيع حسب الطلب",
]

const processSteps = [
  "اختار القطعة",
  "ارفع التصميم أو اكتب فكرتك",
  "نراجعها ونصنعها بعد موافقتك",
]

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function LevoroHero() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background text-foreground"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          لبس معمول على ذوقك، مش مختار من الرف
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="max-w-4xl text-4xl leading-snug font-bold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl"
        >
          صمّم قطعة لبس شبهك
          <span className="block text-primary">وإحنا نصنعها ونوصلهالك</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="mt-5 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8 md:text-lg"
        >
          LEVORO بتخليك تعمل Hoodie أو Oversized T-Shirt بتصميمك، مع معاينة
          واضحة ومراجعة من designer قبل الطباعة عشان تطلع القطعة زي ما متخيلها.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="h-12 rounded-full px-6 text-sm font-bold sm:text-base"
            asChild
          >
            <Link href="/studio">
              ابدأ تصميمك
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full bg-background/60 px-6 text-sm font-bold backdrop-blur sm:text-base"
            asChild
          >
            <Link
              href="https://wa.me/01014344053"
              target="_blank"
              rel="noopener noreferrer"
            >
              تواصل معانا
              <MessageCircle className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          {trustPoints.map((point) => (
            <div
              key={point}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-medium text-card-foreground shadow-sm backdrop-blur sm:text-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {point}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="mt-10 w-full max-w-5xl rounded-3xl bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
            <CardContent className="p-3 sm:p-4 md:p-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-background/85 backdrop-blur">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span className="h-3 w-3 rounded-full bg-muted" />
                    <span className="h-3 w-3 rounded-full bg-muted" />
                  </div>

                  <p className="text-xs font-semibold text-muted-foreground">
                    LEVORO Studio Preview
                  </p>
                </div>

                <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="border-b border-border p-4 md:border-b-0 md:border-l">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">
                          صمّم قطعتك
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          اختار المنتج وعدّل التصميم قبل الطلب
                        </p>
                      </div>

                      <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        Preview
                      </div>
                    </div>

                    <div className="space-y-3">
                      {processSteps.map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.55 + index * 0.08,
                            ease: "easeOut",
                          }}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-right"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {step}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="relative mx-auto flex min-h-70 max-w-sm items-center justify-center rounded-3xl border border-border bg-muted/40">
                      <motion.div
                        animate={{
                          y: [0, -6, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-4 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm"
                      >
                        Hoodie · Black · L
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative mt-8 h-48 w-40"
                      >
                        <div className="absolute top-0 left-1/2 h-12 w-20 -translate-x-1/2 rounded-b-full border border-border bg-card" />

                        <div className="absolute top-8 left-1/2 h-36 w-32 -translate-x-1/2 rounded-[2.25rem] border border-border bg-card shadow-sm" />

                        <div className="absolute top-12 right-0 h-28 w-9 rotate-12 rounded-full border border-border bg-card" />
                        <div className="absolute top-12 left-0 h-28 w-9 -rotate-12 rounded-full border border-border bg-card" />

                        <div className="absolute top-20 left-1/2 flex h-16 w-20 -translate-x-1/2 items-center justify-center rounded-2xl border border-border bg-primary text-center text-primary-foreground shadow-sm">
                          <div>
                            <p className="text-[10px] font-black tracking-[0.18em]">
                              LEVORO
                            </p>
                            <p className="mt-1 text-[9px] font-bold opacity-80">
                              YOUR PIECE
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <div className="absolute bottom-4 grid w-[calc(100%-2rem)] grid-cols-3 gap-2">
                        {["Hoodie", "Size L", "Ready"].map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-border bg-background px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
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

function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <motion.div
        animate={{
          x: [0, 32, 0],
          y: [0, -24, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-28 -right-32 h-72 w-72 rounded-full bg-primary/15 blur-3xl sm:h-96 sm:w-96"
      />

      <motion.div
        animate={{
          x: [0, -28, 0],
          y: [0, 28, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-36 -left-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
      />

      <motion.div
        animate={{
          opacity: [0.35, 0.7, 0.35],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-muted blur-3xl"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/70 to-background" />

      <FloatingDot className="top-[22%] right-[12%]" delay={0} />
      <FloatingDot className="top-[28%] left-[16%]" delay={0.7} />
      <FloatingDot className="right-[24%] bottom-[22%]" delay={1.1} />
      <FloatingDot className="bottom-[18%] left-[28%]" delay={1.5} />
    </div>
  )
}

function FloatingDot({
  className,
  delay,
}: {
  className: string
  delay: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0.25, y: 0 }}
      animate={{
        opacity: [0.2, 0.55, 0.2],
        y: [0, -12, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute h-2 w-2 rounded-full bg-primary/50 ${className}`}
    />
  )
}
