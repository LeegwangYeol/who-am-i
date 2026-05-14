"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { useThemeStore } from "@/store/theme"

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("error")
  const { isDarkTheme } = useThemeStore()
  const glass = isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
  const textHeading = isDarkTheme ? "text-white" : "text-gray-900"
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-600"

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // 콘솔로 흘려 디버깅 편의성 확보
      console.error(error)
    }
  }, [error])

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-app-dark" : "bg-app-light"
      } flex items-center justify-center px-4`}
    >
      <div
        className={`${glass} rounded-3xl shadow-md p-10 md:p-14 max-w-lg text-center`}
      >
        <div className="text-5xl mb-4" aria-hidden="true">
          ⚠️
        </div>
        <h1
          className={`text-2xl md:text-3xl font-bold mb-3 ${textHeading} heading-accent inline-block`}
        >
          {t("heading")}
        </h1>
        <p className={`${textMuted} leading-relaxed mb-6`}>
          {t("description")}
        </p>
        {error.digest && (
          <p
            className={`font-mono text-xs mb-6 break-all ${
              isDarkTheme ? "text-gray-500" : "text-gray-400"
            }`}
          >
            digest: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition-colors"
        >
          {t("retry")}
        </button>
      </div>
    </div>
  )
}
