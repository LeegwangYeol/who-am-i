import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // 모든 경로를 매칭하되 정적/메타 파일은 제외
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|opengraph-image|apple-icon|icon|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
}
