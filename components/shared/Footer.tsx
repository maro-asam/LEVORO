import { Mail, MapPin, MessageCircle, Shirt } from "lucide-react"

import { Button } from "@/components/ui/button"

const footerLinks = [
  {
    title: "LEVORO",
    links: [
      { label: "إزاي بتشتغل؟", href: "#how" },
      { label: "المنتجات", href: "#products" },
      { label: "ليه LEVORO؟", href: "#why" },
      { label: "الأسئلة الشائعة", href: "#faq" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "سياسة الاستبدال", href: "#" },
      { label: "الشحن والتوصيل", href: "#" },
      { label: "تتبع الطلب", href: "#" },
      { label: "طلبات الجروبات", href: "#" },
    ],
  },
]

export default function LevoroFooter() {
  return (
    <footer
      dir="rtl"
      className="border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Shirt className="h-5 w-5" />
              </div>

              <div className="leading-none">
                <p className="text-xl font-black tracking-[0.18em]">LEVORO</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  Made for you
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              LEVORO بتخليك تصمم Hoodie أو Oversized T-Shirt على ذوقك، مع معاينة
              قبل الطباعة، مراجعة تصميم، تصنيع حسب الطلب، وتوصيل لحد باب البيت.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button className="h-11 rounded-full px-5 font-bold">
                ابدأ تصميمك
              </Button>

              <Button
                variant="outline"
                className="h-11 rounded-full px-5 font-bold"
              >
                <MessageCircle className="ml-2 h-4 w-4" />
                واتساب
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-bold text-foreground">
                  {group.title}
                </p>

                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-border bg-card p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <FooterInfo
              icon={MessageCircle}
              title="واتساب"
              value="ابدأ بفكرتك أو اسأل عن طلبك"
            />
            <FooterInfo
              icon={Mail}
              title="الإيميل"
              value="hello@levoro.store"
            />
            <FooterInfo icon={MapPin} title="الشحن" value="توصيل داخل مصر" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} LEVORO. كل الحقوق محفوظة.</p>

          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-foreground">
              الخصوصية
            </a>
            <a href="#" className="transition hover:text-foreground">
              الشروط
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterInfo({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType
  title: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-background/70 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
