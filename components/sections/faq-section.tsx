"use client"

import { motion } from "framer-motion"
import { HelpCircle, MessageCircle, Sparkles } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const faqs = [
  {
    question: "هل لازم أكون مصمم عشان أطلب؟",
    answer:
      "لا، مش لازم خالص. تقدر تبعتلنا صورة، جملة، logo، reference، أو حتى فكرة مش مترتبة، وإحنا نساعدك نطلعها بشكل مناسب للطباعة.",
  },
  {
    question: "هل هشوف شكل التصميم قبل الطباعة؟",
    answer:
      "أيوه. قبل ما نبدأ تصنيع أو طباعة، بنجهزلك معاينة مبدئية للتصميم على القطعة، وبعد موافقتك نبدأ التنفيذ.",
  },
  {
    question: "لو الصورة جودتها ضعيفة؟",
    answer:
      "لو الصورة أو التصميم مش مناسب للطباعة أو ممكن يطلع بجودة ضعيفة، هنبلغك قبل التنفيذ ونقترح عليك تعديل أو بديل مناسب.",
  },
  {
    question: "هل فيه دفع عند الاستلام؟",
    answer:
      "لأن المنتج بيتعمل مخصوص ليك، بنحتاج عربون لتأكيد الطلب قبل التصنيع. ممكن باقي المبلغ يتدفع عند الاستلام حسب نوع الطلب.",
  },
  {
    question: "هل أقدر أرجع المنتج؟",
    answer:
      "المنتجات المخصصة غالبًا لا تُسترجع لأنها معمولة مخصوص حسب اختيارك، لكن لو فيه عيب تصنيع أو اختلاف واضح عن المعاينة المتفق عليها، هنراجع المشكلة ونحلها.",
  },
  {
    question: "الطلب بياخد وقت قد إيه؟",
    answer:
      "المدة بتختلف حسب المنتج والتصميم والكمية. بعد تأكيد التصميم والعربون، هنبلغك بمدة تنفيذ وتوصيل واضحة قبل ما نبدأ.",
  },
  {
    question: "ينفع أعمل طلب لجروب أو دفعة؟",
    answer:
      "أيوه، LEVORO مناسب جدًا للجروبات، الدفعات، الفرق، events، وصناع المحتوى. ابعتلنا الكمية والمقاسات والفكرة، ونجهزلك عرض مناسب.",
  },
  {
    question: "هل أقدر أطلب هودي أو تيشيرت بتصميم مش جاهز؟",
    answer:
      "أيوه. ممكن تبدأ بفكرة بس، وإحنا نساعدك نترجمها لتصميم قابل للطباعة، وبعدها تشوف المعاينة قبل التنفيذ.",
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      dir="rtl"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 24, 0],
            y: [0, -18, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-12 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
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
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm"
            >
              <HelpCircle className="h-4 w-4 text-primary" />
              أسئلة بتتكرر
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="text-3xl leading-snug font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
            >
              قبل ما تبدأ
              <span className="block text-primary">خلّينا نطمنك أكتر</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            لأن كل قطعة custom بتتعمل مخصوص، طبيعي يكون عندك أسئلة عن التصميم،
            الدفع، الاسترجاع، والمدة. جمعنالك أهم الإجابات هنا.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.42fr]">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            <Card className="overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-border/60 backdrop-blur">
              <CardContent className="p-3 sm:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      value={`item-${index}`}
                      className="border-border px-3"
                    >
                      <AccordionTrigger className="text-right text-sm font-bold hover:no-underline sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-right text-sm leading-7 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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

                  <p className="text-sm font-semibold opacity-80">لسه محتار؟</p>

                  <h3 className="mt-2 text-2xl leading-snug font-bold">
                    ابعتلنا فكرتك وهنقولك أنسب تنفيذ
                  </h3>

                  <p className="mt-4 text-sm leading-7 opacity-85">
                    مش لازم تكون جاهز 100%. ابعت صورة، جملة، أو وصف بسيط،
                    وهنساعدك تعرف ينفع يتنفذ إزاي.
                  </p>
                  <Link
                    href="https://wa.me/201014344053?text=عايز%20أبدأ%20تصميم%20قطعة%20مخصصة%20مع%20LEVORO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="mt-6 h-12 rounded-full px-6 font-bold"
                    >
                      <MessageCircle className="ml-2 h-4 w-4" />
                      كلمنا على واتساب
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
