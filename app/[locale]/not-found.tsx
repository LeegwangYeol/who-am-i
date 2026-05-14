"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useThemeStore } from "@/store/theme"

export default function LocaleNotFound() {
  const t = useTranslations("notFound")
  const { isDarkTheme } = useThemeStore()
  const glass = isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
  const textHeading = isDarkTheme ? "text-white" : "text-gray-900"
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-600"

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-app-dark" : "bg-app-light"
      } flex items-center justify-center px-4`}
    >
      <div
        className={`${glass} rounded-3xl shadow-md p-10 md:p-14 max-w-lg text-center`}
      >
        <p
          className={`font-mono text-7xl md:text-8xl font-bold mb-4 ${
            isDarkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {t("title")}
        </p>
        <h1
          className={`text-2xl md:text-3xl font-bold mb-3 ${textHeading} heading-accent inline-block`}
        >
          {t("heading")}
        </h1>
        <p className={`${textMuted} leading-relaxed mb-8`}>{t("description")}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition-colors"
        >
          {t("home")} →
        </Link>
      </div>
    </div>
  )
}
