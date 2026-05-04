import type { Metadata, Viewport } from "next"
import { Alexandria } from "next/font/google"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://levoro.store"),

  title: {
    default: "LEVORO | لبس معمول على ذوقك",
    template: "%s | LEVORO",
  },

  description:
    "LEVORO بتخليك تصمم Hoodie أو Oversized T-Shirt على ذوقك، مع معاينة قبل الطباعة، مراجعة تصميم، تصنيع حسب الطلب، وتوصيل لحد باب البيت.",

  keywords: [
    "LEVORO",
    "ليفورو",
    "تصميم هدوم",
    "طباعة تيشيرت",
    "طباعة هودي",
    "custom clothing Egypt",
    "تيشيرت مخصص",
    "هودي مخصص",
    "لبس حسب الطلب",
    "streetwear Egypt",
  ],

  authors: [{ name: "LEVORO" }],
  creator: "LEVORO",
  publisher: "LEVORO",
  applicationName: "LEVORO",

  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://levoro.store",
    siteName: "LEVORO",
    title: "LEVORO | لبس معمول على ذوقك",
    description:
      "صمّم قطعتك، وإحنا نصنعها ونوصلهالك. Custom hoodies و oversized t-shirts بتصميمك.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LEVORO - لبس معمول على ذوقك",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LEVORO | لبس معمول على ذوقك",
    description:
      "صمّم Hoodie أو Oversized T-Shirt على ذوقك مع معاينة قبل الطباعة.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://levoro.store",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cn(alexandria.variable, alexandria.className)}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          "selection:bg-primary selection:text-primary-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            <main className="min-h-screen">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
