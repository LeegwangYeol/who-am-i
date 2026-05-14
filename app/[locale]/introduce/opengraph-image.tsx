import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "About — Values & Competencies"

const FONT_BOLD =
  "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf"
const FONT_MEDIUM =
  "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf"

const CONTENT: Record<
  string,
  {
    eyebrow: string
    title: string
    subtitle: string
    values: string[]
  }
> = {
  ko: {
    eyebrow: "About · 이광열",
    title: "가치관과 핵심역량",
    subtitle: "여섯 개의 글로 정리한 저의 생각과 경험",
    values: [
      "도전정신",
      "미래 기술에 대한 확신",
      "부족을 극복하는 사람",
      "하드웨어와 소프트웨어 이해",
      "코드 품질에 대한 인식",
      "꿈을 현실로 만드는 능력",
    ],
  },
  en: {
    eyebrow: "About · Lee Gwangyeol",
    title: "Values & Competencies",
    subtitle: "Six essays on what I think and what I've lived",
    values: [
      "Challenge mindset",
      "Conviction in future tech",
      "Closing my own gaps",
      "Hardware × software literacy",
      "Code quality awareness",
      "Turning dreams into reality",
    ],
  },
  ja: {
    eyebrow: "About · Lee Gwangyeol",
    title: "価値観と核となる強み",
    subtitle: "6つの文章にまとめた、私の考えと経験",
    values: [
      "挑戦心",
      "未来技術への確信",
      "足りなさを乗り越える人",
      "ハードウェアとソフトウェアの理解",
      "コード品質への意識",
      "夢を現実にする力",
    ],
  },
}

export default async function IntroduceOpengraphImage({
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
            "linear-gradient(135deg, #0b0b14 0%, #102233 55%, #0b1a22 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.45), rgba(34,211,238,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.45), rgba(99,102,241,0))",
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
            color: "#67e8f9",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              borderRadius: 9999,
              background: "linear-gradient(90deg, #22d3ee, #6366f1)",
            }}
          />
          {c.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {c.title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              fontWeight: 500,
              display: "flex",
            }}
          >
            {c.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {c.values.map(v => (
            <div
              key={v}
              style={{
                fontSize: 22,
                padding: "10px 22px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(99,102,241,0.35)",
                color: "#e0e7ff",
                display: "flex",
              }}
            >
              {v}
            </div>
          ))}
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
