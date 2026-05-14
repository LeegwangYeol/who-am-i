import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export const alt = "Lee Gwangyeol — Frontend Web Developer · Automation Robotics Engineer"

const FONT_BOLD =
  "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf"
const FONT_MEDIUM =
  "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf"

const CONTENT: Record<
  string,
  {
    name: string
    nameSub: string
    role: string
  }
> = {
  ko: {
    name: "이광열",
    nameSub: "Lee Gwangyeol",
    role: "프론트엔드 웹 개발자 · 자동화 로봇 엔지니어",
  },
  en: {
    name: "Lee Gwangyeol",
    nameSub: "이광열",
    role: "Frontend Web Developer · Automation Robotics Engineer",
  },
  ja: {
    name: "イ・グァンヨル",
    nameSub: "Lee Gwangyeol",
    role: "フロントエンドWebエンジニア・ロボット自動化エンジニア",
  },
}

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const c = CONTENT[locale] ?? CONTENT.ko

  const [fontBold, fontMedium] = await Promise.all([
    fetch(FONT_BOLD).then(r => r.arrayBuffer()),
    fetch(FONT_MEDIUM).then(r => r.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Spoqa Han Sans Neo",
          color: "#fff",
          background:
            "linear-gradient(135deg, #0b0b14 0%, #1a1033 55%, #1a0b22 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.55), rgba(99,102,241,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -120,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(236,72,153,0.45), rgba(236,72,153,0))",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#a5b4fc",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              borderRadius: 9999,
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
            }}
          />
          Mr.Lee&apos;s Lair
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "baseline",
              gap: 24,
            }}
          >
            {c.name}
            <span style={{ fontSize: 56, color: "#a1a1aa", fontWeight: 500 }}>
              {c.nameSub}
            </span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#e5e7eb",
              fontWeight: 500,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            {c.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Next.js", "TypeScript", "React", "C#", ".NET", "WPF", "AI · LLM"].map(
            tech => (
              <div
                key={tech}
                style={{
                  fontSize: 24,
                  padding: "10px 22px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e5e7eb",
                  display: "flex",
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Spoqa Han Sans Neo",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Spoqa Han Sans Neo",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  )
}
