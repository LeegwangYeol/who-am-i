import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { SITE_URL } from "@/lib/site"

function localizedUrl(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path}`
}

function buildAlternates(path: string) {
  const languages = Object.fromEntries(
    routing.locales.map(l => [l, localizedUrl(l, path)])
  )
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/introduce", priority: 0.8 },
  ]

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map(locale => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: buildAlternates(path),
    }))
  )
}
