/**
 * 사이트 전역 상수.
 *
 * 배포 도메인은 `NEXT_PUBLIC_SITE_URL`로 주입한다.
 * - 로컬 / 미설정 시: Vercel이 자동 주입하는 `VERCEL_URL` 사용
 * - 그 마저도 없으면 `http://localhost:3000` fallback
 */
export const SITE_URL: string = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:3000"
})()

export const SITE_AUTHOR = "Lee Gwangyeol / 이광열"
export const SITE_EMAIL = "bpscokr003@naver.com"
