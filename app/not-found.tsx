// Root not-found — locale segment에 매칭되지 않는 경로(예: 잘못된 locale prefix)에서 트리거.
// next-intl 미들웨어가 대부분의 경로를 [locale]/로 redirect하므로 실질적으로 거의 호출되지 않지만,
// Next.js가 root not-found를 요구하므로 최소한의 페이지를 제공.
import "./globals.css"

export default function RootNotFound() {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0b0b14",
          color: "#e5e7eb",
          padding: "1rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "2.5rem",
            borderRadius: "1.5rem",
            background: "rgba(20,20,28,0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "32rem",
          }}
        >
          <p
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: "5rem",
              fontWeight: 700,
              color: "#a5b4fc",
              margin: 0,
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginTop: "1rem",
              marginBottom: "0.75rem",
            }}
          >
            Page not found · 페이지를 찾을 수 없습니다
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              background: "#6366f1",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to home →
          </a>
        </div>
      </body>
    </html>
  )
}
