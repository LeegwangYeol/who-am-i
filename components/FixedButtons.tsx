"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useThemeStore } from "@/store/theme"

export default function FixedButtons() {
  const { isDarkTheme } = useThemeStore()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const t = useTranslations("common")

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showScrollTop) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      className={`fixed bottom-7 sm:bottom-10 right-7 sm:right-10 z-50 ${
        isDarkTheme
          ? "glassmorphism-dark text-white"
          : "glassmorphism-light text-gray-900"
      } w-11 h-11 rounded-full shadow-lg transition-all flex items-center justify-center hover:-translate-y-0.5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}
