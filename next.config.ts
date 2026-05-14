import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

// Content Security Policy.
// 외부 리소스:
// - llami.net: 챗봇 위젯 (CSS + JS)
// - vercel: Analytics, Speed Insights
// 'unsafe-inline'은 Next.js의 inline hydration script + FOUC 방지 script + JSON-LD
// 때문에 불가피. (정석은 nonce이지만 middleware에 propagation 로직이 필요해 trade-off)
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.llami.net https://va.vercel-scripts.com https://*.vercel-insights.com",
  "style-src 'self' 'unsafe-inline' https://static.llami.net",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com https://*.vercel-insights.com https://static.llami.net",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  // CSP — 콘텐츠 인젝션/클릭재킹/XSS 1차 방어선
  { key: "Content-Security-Policy", value: csp },
  // 클릭재킹 방지 (CSP frame-ancestors와 이중 안전망)
  { key: "X-Frame-Options", value: "DENY" },
  // MIME 스니핑 방지
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer 정책
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 권한 정책
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // XSS Protection (deprecated이지만 안전망)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // 교차 출처 격리
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
]

const nextConfig: NextConfig = {
  // X-Powered-By 헤더 제거
  poweredByHeader: false,

  // gzip 압축
  compress: true,

  // 프로덕션에서 console 제거 (error/warn만 유지)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // 이미지 포맷 자동 변환 (AVIF 우선, WebP 폴백)
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // OG 이미지는 한 번 생성하면 변경 빈도가 낮음 → CDN/브라우저 캐시 적극 사용
      {
        source: "/:locale(ko|en|ja)/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:locale(ko|en|ja)/introduce/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/icon",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, immutable",
          },
        ],
      },
      {
        source: "/apple-icon",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, immutable",
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
