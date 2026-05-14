import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { SITE_URL } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  if (!hasLocale(routing.locales, localeParam)) notFound()
  const locale = localeParam
  const t = await getTranslations({ locale, namespace: "introduce" })
  const path = `/${locale}/introduce`
  const languages = Object.fromEntries(
    routing.locales.map(l => [l, `${SITE_URL}/${l}/introduce`])
  )

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages,
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${path}`,
      type: "article",
    },
    twitter: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  }
}

export default function IntroduceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
