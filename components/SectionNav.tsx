"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

interface SectionDef {
  id: string
  /** i18n 키 (nav 네임스페이스 안의 sectionLabel 키) */
  labelKey: "hero" | "career" | "stack" | "education" | "projects"
}

const SECTIONS: SectionDef[] = [
  { id: "hero", labelKey: "hero" },
  { id: "career", labelKey: "career" },
  { id: "stack", labelKey: "stack" },
  { id: "education", labelKey: "education" },
  { id: "projects", labelKey: "projects" },
]

/**
 * 우측 세로 정렬 dot navigation.
 * IntersectionObserver로 현재 viewport 안에 있는 섹션을 active로 표시.
 * lg(1024px) 이상에서만 표시 — 모바일/태블릿에서는 노이즈.
 */
export default function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id)
  const t = useTranslations("sectionNav")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActive(id)
            }
          })
        },
        {
          // 뷰포트 중앙 40% 안에 들어오면 active
          rootMargin: "-30% 0px -55% 0px",
          threshold: 0,
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const onClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      aria-label="섹션 내비게이션"
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {SECTIONS.map(({ id, labelKey }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onClick(id)}
            aria-label={t(labelKey)}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-end h-3 cursor-pointer"
          >
            {/* 라벨: hover 시 슬라이드인 */}
            <span
              className={`absolute right-6 pr-1 text-xs font-mono uppercase tracking-wider whitespace-nowrap pointer-events-none transition-all duration-200 ${
                isActive
                  ? "opacity-100 text-indigo-400 dark:text-indigo-300 translate-x-0"
                  : "opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400 translate-x-1 group-hover:translate-x-0"
              }`}
            >
              {t(labelKey)}
            </span>
            {/* 도트 */}
            <span
              className={`inline-block rounded-full transition-all duration-200 ${
                isActive
                  ? "w-3 h-3 bg-gradient-to-br from-indigo-500 to-pink-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  : "w-2 h-2 bg-gray-400/50 group-hover:bg-indigo-400/80"
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
