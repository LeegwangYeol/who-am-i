// next-intl 메시지 키/값에 대한 타입 안전성.
// 한국어(ko) 카탈로그를 source of truth로 사용하여,
// useTranslations(...) / getTranslations(...) 호출 시 자동완성 및
// 미존재 키 사용에 대한 타입 에러를 받는다.
import type messages from "./messages/ko.json"

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages
    Locale: "ko" | "en" | "ja"
  }
}
