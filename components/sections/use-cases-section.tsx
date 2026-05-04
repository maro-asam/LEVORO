"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  Gift,
  Heart,
  Megaphone,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const useCases = [
  {
    icon: Heart,
    title: "قطعة لنفسك",
    label: "Personal Piece",
    description:
      "تصميم يعبر عنك: جملة، رمز، ستايل، أو حاجة بتحبها وتبقى جزء من لبسك اليومي.",
    examples: ["Arabic type", "Minimal", "Streetwear"],
  },
  {
    icon: Gift,
    title: "هدية مختلفة",
    label: "Gift",
    description:
      "بدل هدية عادية، اعمل قطعة باسم، تاريخ، ذكرى، أو رسالة شخصية للشخص اللي بتحبه.",
    examples: ["اسم", "تاريخ", "رسالة"],
  },
  {
    icon: Users,
    title: "جروب أو دفعة",
    label: "Group",
    description:
      "للدفعات، الفرق، الرحلات، الجيم، أو أي جروب محتاج قطعة موحدة ومميزة.",
    examples: ["دفعة", "Team", "Trip"],
  },
  {
    icon: Megaphone,
    title: "Merch لصانع محتوى",
    label: "Creator Merch",
    description:
      "لو عندك جمهور أو community، اعمل drop بسيط من غير مخزون كبير ولا تعقيد.",
    examples: ["Drop", "Community", "Limited"],
  },
  {
    icon: Trophy,
    title: "Event أو مناسبة",
    label: "Event",
    description:
      "قطعة مخصوصة لمناسبة، بطولة، launch، birthday، أو campaign صغيرة.",
    examples: ["Birthday", "Launch", "Event"],
  },
]

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 28, 0],
            y: [0, -18, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -22, 0],
            y: [0, 22, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-muted blur-3xl"
        />

        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              LEVORO لمين؟
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="text-balance text-3xl font-bold leading-snug tracking-tight sm:text-4xl md:text-5xl"
            >
              أي فكرة عندك
              <span className="block text-primary">ممكن تتحول لقطعة تلبسها</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
          >
            سواء عايز قطعة لنفسك، هدية، merch لجمهورك، أو طلب لجروب كامل —
            LEVORO بتديك طريقة واضحة تبدأ بيها من غير ما تكون designer.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            <Card className="h-full overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
              <CardContent className="p-0">
                <div className="border-b border-border px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">
                        Idea to piece
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        أمثلة لأفكار تتحول لقطع custom
                      </p>
                    </div>

                    <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                      Use Cases
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 sm:grid-cols-2">
                  {useCases.slice(0, 4).map((item, index) => (
                    <UseCaseCard
                      key={item.title}
                      item={item}
                      index={index}
                      bordered
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <Card className="overflow-hidden rounded-[2rem] bg-primary text-primary-foreground shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <p className="text-sm font-semibold opacity-80">
                    مش لاقي حالتك؟
                  </p>

                  <h3 className="mt-2 text-2xl font-bold leading-snug">
                    ابعتلنا الفكرة وإحنا نقولك أنسب تنفيذ
                  </h3>

                  <p className="mt-4 text-sm leading-7 opacity-85">
                    صورة، جملة، theme، event، أو حتى فكرة مش مرتبة — نساعدك
                    نحولها لقطعة مناسبة للطباعة.
                  </p>

                  <Button
                    variant="secondary"
                    className="mt-6 h-12 rounded-full px-6 font-bold"
                  >
                    ابدأ بفكرتك
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            >
              <Card className="rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
                <CardContent className="p-0">
                  <UseCaseCard item={useCases[4]} index={4} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCaseCard({
  item,
  index,
  bordered = false,
}: {
  item: (typeof useCases)[number]
  index: number
  bordered?: boolean
}) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.42,
        delay: 0.2 + index * 0.07,
        ease: "easeOut",
      }}
      className={[
        "group relative p-5 sm:p-6",
        bordered ? "border-border sm:border-l sm:border-b" : "",
      ].join(" ")}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <Icon className="h-5 w-5" />
        </div>

        <span className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
          {item.label}
        </span>
      </div>

      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.examples.map((example) => (
          <span
            key={example}
            className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold text-muted-foreground"
          >
            {example}
          </span>
        ))}
      </div>
    </motion.div>
  )
}