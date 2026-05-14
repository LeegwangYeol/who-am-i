"use client"

import { useTranslations } from "next-intl"
import { useThemeStore } from "@/store/theme"

export default function Loading() {
  const t = useTranslations("loading")
  const { isDarkTheme } = useThemeStore()

  return (
    <div
      role="status"
      aria-live="polite"
      className={`min-h-screen ${
        isDarkTheme ? "bg-app-dark" : "bg-app-light"
      } flex items-center justify-center`}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full border-4 border-transparent animate-spin ${
            isDarkTheme
              ? "border-t-indigo-400 border-r-indigo-400/40"
              : "border-t-indigo-600 border-r-indigo-600/40"
          }`}
          aria-hidden="true"
        />
        <p
          className={`text-sm tracking-widest uppercase ${
            isDarkTheme ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {t("label")}
        </p>
      </div>
    </div>
  )
}
