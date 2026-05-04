"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Layers3,
  Package,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const whatsappUrl =
  "https://wa.me/201014344053?text=عايز%20أعمل%20قطعة%20مخصصة%20مع%20LEVORO"

const products = [
  {
    icon: Shirt,
    name: "Oversized T-Shirt",
    tag: "الأفضل للبداية",
    price: "يبدأ من 699 جنيه",
    description:
      "قطعة يومية مريحة، مناسبة للتصميمات البسيطة، الجُمل، اللوجوهات، والستايل streetwear.",
    features: ["طباعة أمامية", "طباعة خلفية", "ألوان أساسية"],
    cta: "صمّم تيشيرت",
    href: "/studio",
    highlighted: true,
  },
  {
    icon: Layers3,
    name: "Custom Hoodie",
    tag: "Premium",
    price: "يبدأ من 1499 جنيه",
    description:
      "اختيار أقوى للدروب الشتوي، الهدايا، والتصميمات الكبيرة اللي محتاجة قطعة تبان.",
    features: ["خامة تقيلة", "تصميم كبير", "مناسب للهدايا"],
    cta: "صمّم هودي",
    href: "/studio",
    highlighted: false,
  },
  {
    icon: Users,
    name: "Group Orders",
    tag: "للكميات",
    price: "خصم حسب العدد",
    description:
      "للجروبات، الدفعات، الفرق، صناع المحتوى، أو أي merch drop محتاج تنفيذ منظم.",
    features: ["طلبات جماعية", "مراجعة قبل التنفيذ", "تنسيق مقاسات"],
    cta: "اطلب لجروب",
    href: "/studio",
    highlighted: false,
  },
]

export default function ProductsSection() {
  return (
    <section
      id="products"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, -24, 0],
            y: [0, 20, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
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
            <Package className="h-4 w-4 text-primary" />
            المنتجات اللي هنبدأ بيها
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            اختيارات قليلة
            <span className="block text-primary">بس معمولة صح</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            في البداية مش محتاجين نغرقك في منتجات كتير. هنركز على القطع اللي
            تناسب التخصيص والطباعة وتطلع premium فعلًا.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.14 + index * 0.08,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Card
                  className={[
                    "group relative h-full overflow-hidden rounded-[2rem] bg-card/80 shadow-sm backdrop-blur transition duration-300",
                    "hover:-translate-y-1 hover:shadow-md",
                    product.highlighted
                      ? "ring-1 ring-primary/50"
                      : "ring-1 ring-border/60",
                  ].join(" ")}
                >
                  {product.highlighted && (
                    <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                  )}

                  <CardContent className="flex h-full flex-col p-5 sm:p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                        {product.tag}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-card-foreground">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm font-bold text-primary">
                        {product.price}
                      </p>

                      <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {product.description}
                      </p>
                    </div>

                    <div className="mb-6 space-y-3">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Button
                        asChild
                        variant={product.highlighted ? "default" : "outline"}
                        className="h-12 w-full rounded-full font-bold"
                      >
                        <Link href={product.href}>
                          {product.cta}
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-border bg-card/80 p-5 text-center shadow-sm backdrop-blur"
        >
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>

          <h3 className="text-xl font-bold text-card-foreground">
            عندك فكرة مختلفة؟
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            ابعتلنا التصميم أو الفكرة، ولو ينفع تتنفذ على قطعة من منتجاتنا
            هنجهزلك معاينة قبل ما تبدأ في الطلب.
          </p>

          <Button asChild className="mt-5 h-12 rounded-full px-6 font-bold">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              ابعتلنا على واتساب
              <ArrowLeft className="mr-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
