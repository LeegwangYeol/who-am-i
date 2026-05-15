"use client"

import { useTranslations } from "next-intl"
import { Mail, MapPin, Github, Youtube, PenSquare } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { useThemeStore } from "@/store/theme"

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

const SOCIAL_LINKS: Array<{
  href: string
  Icon: LucideIcon
  label: string
}> = [
  { href: "https://github.com/LeegwangYeol", Icon: Github, label: "GitHub" },
  { href: "https://velog.io/@kelog123", Icon: PenSquare, label: "Velog" },
  { href: "https://www.youtube.com/@lolollol2379", Icon: Youtube, label: "YouTube" },
  // Instagram 등 추가 소셜은 본인 핸들이 정해지면 여기에 추가.
  // 동일 핸들을 layout.tsx의 JSON-LD `sameAs` 배열에도 함께 등록할 것.
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
        <div className={`${glass} p-6 rounded-2xl flex flex-col gap-3`}>
          <p className={`text-xs uppercase tracking-[0.2em] ${textMuted}`}>
            {t("contact")}
          </p>
          <a
            href="mailto:bpscokr003@naver.com"
            className={`flex items-center gap-2 ${text} hover:text-indigo-500 transition-colors`}
          >
            <Mail size={18} className="flex-shrink-0" aria-hidden="true" />
            <span className="truncate">bpscokr003@naver.com</span>
          </a>
          <div className={`flex items-center gap-2 ${text}`}>
            <MapPin size={18} className="flex-shrink-0" aria-hidden="true" />
            <span>{t("location")}</span>
          </div>
        </div>

        {/* Social */}
        <div className={`${glass} p-6 rounded-2xl`}>
          <p className={`text-xs uppercase tracking-[0.2em] ${textMuted} mb-3`}>
            {t("social")}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SOCIAL_LINKS.map(link => {
              const { Icon } = link
              return (
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
                    <Icon size={18} aria-hidden="true" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className={`text-center text-xs mt-6 ${textMuted}`}>
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  )
}
