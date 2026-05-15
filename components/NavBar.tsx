"use client"

import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { useThemeStore, toggleTheme } from "@/store/theme"
import { useState, useRef, useEffect, type ComponentType, type SVGProps } from "react"
import { User, BookOpen, Sun, Moon, ChevronDown } from "lucide-react"

const LANGUAGE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
}

const LANGUAGE_SHORT: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
  ja: "JA",
}

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

type NavItem = {
  href: "/" | "/introduce"
  key: "profile" | "introduce"
  Icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", key: "profile", Icon: User },
  { href: "/introduce", key: "introduce", Icon: BookOpen },
]

export default function NavBar() {
  const { isDarkTheme } = useThemeStore()
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale() as Locale
  const t = useTranslations("nav")

  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    if (!langOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [langOpen])

  const onLanguageSelect = (next: Locale) => {
    setLangOpen(false)
    router.replace(pathname, { locale: next })
  }

  const itemBase =
    "inline-flex items-center justify-center rounded-full transition-colors h-9"

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,720px)] ${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-1.5`}
    >
      <Link
        href="/"
        className={`font-semibold tracking-tight px-2 sm:px-3 py-1 rounded-full shrink-0 ${
          isDarkTheme ? "text-white" : "text-gray-900"
        }`}
        aria-label={t("home")}
      >
        {/* 모바일: 약자, 데스크탑: 풀 브랜드 */}
        <span className="hidden sm:inline text-sm sm:text-base">Mr.Lee&apos;s Lair</span>
        <span className="sm:hidden inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white text-xs font-bold">
          L
        </span>
      </Link>

      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href
          const { Icon } = item
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={t(item.key)}
                title={t(item.key)}
                className={`${itemBase} px-2.5 sm:px-3 text-sm ${
                  active
                    ? isDarkTheme
                      ? "bg-white/15 text-white"
                      : "bg-gray-900/10 text-gray-900"
                    : isDarkTheme
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-900/5"
                }`}
              >
                <Icon size={16} className="sm:hidden" aria-hidden="true" />
                <span className="hidden sm:inline">{t(item.key)}</span>
              </Link>
            </li>
          )
        })}

        {/* Language switcher */}
        <li className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangOpen(v => !v)}
            aria-label={t("language")}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            className={`${itemBase} text-xs font-semibold gap-1 px-2.5 ${
              isDarkTheme
                ? "bg-white/10 hover:bg-white/20 text-gray-200"
                : "bg-gray-900/5 hover:bg-gray-900/10 text-gray-800"
            }`}
          >
            <span aria-hidden="true">{LANGUAGE_SHORT[locale]}</span>
            <ChevronDown
              size={12}
              aria-hidden="true"
              className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
            />
          </button>
          {langOpen && (
            <ul
              role="listbox"
              className={`absolute right-0 mt-2 min-w-[150px] rounded-2xl overflow-hidden ${
                isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
              } shadow-lg p-1`}
            >
              {routing.locales.map(l => {
                const isCurrent = l === locale
                return (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() => onLanguageSelect(l)}
                      role="option"
                      aria-selected={isCurrent}
                      className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors flex items-center ${
                        isCurrent
                          ? isDarkTheme
                            ? "bg-white/15 text-white"
                            : "bg-gray-900/10 text-gray-900"
                          : isDarkTheme
                            ? "text-gray-200 hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-900/5"
                      }`}
                    >
                      <span className="font-mono text-xs mr-2 opacity-70 w-6">
                        {LANGUAGE_SHORT[l]}
                      </span>
                      {LANGUAGE_LABEL[l]}
                      {isCurrent && (
                        <span className="ml-auto text-indigo-400" aria-hidden="true">
                          ●
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </li>

        <li>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? t("toLight") : t("toDark")}
            title={isDarkTheme ? t("toLight") : t("toDark")}
            className={`${itemBase} ml-1 w-10 ring-1 ${
              isDarkTheme
                ? "bg-yellow-300/15 hover:bg-yellow-300/25 text-yellow-300 ring-yellow-300/30 shadow-[0_0_12px_rgba(253,224,71,0.25)]"
                : "bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-600 ring-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
            }`}
          >
            {isDarkTheme ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  )
}
