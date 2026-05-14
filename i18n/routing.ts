import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["ko", "en", "ja"] as const,
  defaultLocale: "ko",
  // 모든 locale에 prefix를 강제 (/ko, /en, /ja).
  // "/" 접근은 미들웨어가 Accept-Language 기반으로 /ko, /en, /ja 중 하나로 redirect.
  // file-based metadata 라우트(opengraph-image 등)가 모든 locale에서 일관되게 동작.
  localePrefix: "always",
})

export type Locale = (typeof routing.locales)[number]
