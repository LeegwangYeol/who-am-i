"use client"

// global-error는 root layout이 깨졌을 때 트리거되므로,
// 자체 <html>/<body>를 가져야 한다.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            An unexpected error occurred. Please try again.
          </p>
          {error.digest && (
            <p
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.75rem",
                color: "#64748b",
                marginBottom: "1.5rem",
                wordBreak: "break-all",
              }}
            >
              digest: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              display: "inline-block",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              background: "#6366f1",
              color: "white",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
