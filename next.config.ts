import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const securityHeaders = [
  // 클릭재킹 방지
  { key: "X-Frame-Options", value: "DENY" },
  // MIME 스니핑 방지
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer 정책 (origin only)
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 권한 정책: 카메라/마이크/지오로케이션 명시적 차단
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // 모든 자원을 HTTPS로
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // XSS 보호 (현대 브라우저에선 deprecated이지만 안전망)
  { key: "X-XSS-Protection", value: "1; mode=block" },
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
