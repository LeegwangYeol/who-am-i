import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import Script from "next/script"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import ThemeProvider from "@/components/theme-provider"
import FallingStars from "@/components/falling-stars"
import NavBar from "@/components/NavBar"
import ScrollProgress from "@/components/ScrollProgress"
import SectionNav from "@/components/SectionNav"
import SpotlightTracker from "@/components/SpotlightTracker"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { routing, type Locale } from "@/i18n/routing"
import { SITE_URL, SITE_AUTHOR, SITE_EMAIL } from "@/lib/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const OG_LOCALE: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b14" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  if (!hasLocale(routing.locales, localeParam)) notFound()
  const locale = localeParam
  const t = await getTranslations({ locale, namespace: "site" })

  const localePath = `/${locale}`
  const languages = Object.fromEntries(
    routing.locales.map(l => [l, `${SITE_URL}/${l}`])
  )

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t("name")} · ${t("tagline")}`,
      template: `%s · ${t("name")}`,
    },
    description: t("description"),
    applicationName: t("name"),
    authors: [{ name: SITE_AUTHOR }],
    creator: SITE_AUTHOR,
    keywords: [
      "이광열",
      "Lee Gwangyeol",
      "포트폴리오",
      "portfolio",
      "ポートフォリオ",
      "프론트엔드 개발자",
      "frontend developer",
      "Next.js",
      "TypeScript",
      "React",
      "C#",
      ".NET",
      "자동화 엔지니어",
      "automation engineer",
      "FA",
      "AI",
    ],
    openGraph: {
      type: "profile",
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter(l => l !== locale)
        .map(l => OG_LOCALE[l]),
      url: `${SITE_URL}${localePath}`,
      siteName: t("name"),
      title: `${t("name")} · ${t("tagline")}`,
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} · ${t("tagline")}`,
      description: t("description"),
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "site" })

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("name"),
    alternateName: "이광열 포트폴리오",
    url: SITE_URL,
    description: t("description"),
    inLanguage: routing.locales,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "ja" ? "イ・グァンヨル" : "이광열",
    alternateName: "Lee Gwangyeol",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle:
      locale === "en"
        ? "Frontend Web Developer · Automation Robotics Engineer"
        : locale === "ja"
          ? "フロントエンドWebエンジニア・ロボット自動化エンジニア"
          : "프론트엔드 웹 개발자 · 자동화 로봇 엔지니어",
    description: t("description"),
    email: `mailto:${SITE_EMAIL}`,
    address: {
      "@type": "PostalAddress",
      addressLocality:
        locale === "en"
          ? "Gwangju, Gyeonggi-do"
          : locale === "ja"
            ? "京畿道広州市"
            : "경기 광주시",
      addressCountry: "KR",
    },
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "C#",
      ".NET",
      "WPF",
      "Factory Automation",
      "Robotic Automation",
      "LLM",
      "AI",
    ],
    sameAs: [
      "https://github.com/LeegwangYeol",
      "https://velog.io/@kelog123",
      "https://www.youtube.com/@lolollol2379",
    ],
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* FOUC 방지: 하이드레이션 전에 저장된 테마(or 시스템 선호도)를 즉시 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='dark'||s==='light')?s:(s==='system'?(d?'dark':'light'):(d?'dark':'light'));var r=document.documentElement;if(t==='dark')r.classList.add('dark');r.style.colorScheme=t;r.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://static.llami.net/widget-v1.css"
        />
        <Script type="module" id="llami-chat-widget" strategy="lazyOnload">
          {`
            import { initialize, run } from "https://static.llami.net/widget-v1.js";
            run("92243ae5-2350-4975-b422-59143f089eed");
          `}
        </Script>
        {/* JSON-LD는 SSR HTML에 inline되어야 SEO 크롤러가 인식 → native script */}
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            <ScrollProgress />
            <FallingStars />
            <NavBar />
            <SectionNav />
            <SpotlightTracker />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
