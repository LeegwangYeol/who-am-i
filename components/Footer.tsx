"use client"

import { useTranslations } from "next-intl"
import { useThemeStore } from "@/store/theme"

const SOCIAL_LINKS = [
  { href: "https://github.com/LeegwangYeol", icon: "fab fa-github", label: "GitHub" },
  { href: "https://velog.io/@kelog123", icon: "fab fa-grav", label: "Velog" },
  { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" },
  { href: "https://www.youtube.com/@lolollol2379", icon: "fab fa-youtube", label: "YouTube" },
]

export default function Footer() {
  const { isDarkTheme } = useThemeStore()
  const t = useTranslations("footer")
  const glass = isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
  const text = isDarkTheme ? "text-white" : "text-gray-900"
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-600"

  return (
    <footer className="w-full px-4 py-10 mt-8">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Contact */}
        <div className={`${glass} p-5 rounded-2xl flex flex-col gap-3`}>
          <p className={`text-xs uppercase tracking-[0.2em] ${textMuted}`}>{t("contact")}</p>
          <a
            href="mailto:bpscokr003@naver.com"
            className={`flex items-center gap-2 ${text} hover:text-indigo-500 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate">bpscokr003@naver.com</span>
          </a>
          <div className={`flex items-center gap-2 ${text}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{t("location")}</span>
          </div>
        </div>

        {/* Social */}
        <div className={`${glass} p-5 rounded-2xl`}>
          <p className={`text-xs uppercase tracking-[0.2em] ${textMuted} mb-3`}>{t("social")}</p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SOCIAL_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isDarkTheme
                      ? "text-gray-200 hover:bg-white/10"
                      : "text-gray-700 hover:bg-gray-900/5"
                  }`}
                >
                  <i className={link.icon} aria-hidden="true"></i>
                  <span className="text-sm">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`text-center text-xs mt-6 ${textMuted}`}>
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  )
}
