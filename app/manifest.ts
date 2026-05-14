import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mr.Lee's Lair · 이광열 포트폴리오",
    short_name: "Mr.Lee's Lair",
    description:
      "이광열 / Lee Gwangyeol 포트폴리오 · 프론트엔드 웹 개발자 · 자동화 로봇 엔지니어",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b14",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
