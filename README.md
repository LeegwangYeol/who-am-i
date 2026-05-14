# Mr.Lee's Lair · 이광열 포트폴리오

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

웹 개발과 로봇 자동화 양쪽을 다루는 엔지니어 **이광열 / Lee Gwangyeol** 의 포트폴리오 사이트입니다.

- 🌐 다국어 지원 — 한국어 / English / 日本語 (URL 접두사 라우팅)
- 🌗 다크 / 라이트 / 시스템 자동 — `localStorage` 영속화, FOUC 방지 인라인 스크립트
- 🪟 Glassmorphism 디자인 — 두 테마 모두에서 가독성을 유지하도록 대비 튜닝
- ♿ 접근성 — `prefers-reduced-motion`, sr-only h1, 시멘틱 ARIA
- 🔍 SEO — Open Graph 동적 이미지(언어별), JSON-LD `Person` / `WebSite`, sitemap with `hreflang`, robots
- 📊 Vercel Analytics & Speed Insights
- 🔒 Security headers — HSTS, XFO, Referrer-Policy, Permissions-Policy

## 사이트맵

| 경로 | 설명 |
|---|---|
| `/` → `/ko` | 한국어 (기본) — 미들웨어가 Accept-Language 기반 redirect |
| `/en`, `/ja` | 영어 / 일본어 메인 |
| `/{locale}/introduce` | 가치관 & 핵심역량 자기소개 |
| `/{locale}/opengraph-image` | 페이지별 OG 카드 (1200×630 PNG, 동적 생성) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | file-based metadata |
| `/icon`, `/apple-icon` | ImageResponse로 동적 생성한 아이콘 |

## 기술 스택

| 영역 | 사용 기술 |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript 5 |
| Styling | Tailwind CSS 4 · tailwindcss-animate · CSS variables (oklch) |
| State | valtio (테마) |
| i18n | next-intl (locale-prefix `always` + Accept-Language detection) |
| Icons / Misc | lucide-react · @fortawesome/fontawesome-free · class-variance-authority · clsx |
| Telemetry | @vercel/analytics · @vercel/speed-insights |
| Image | `next/og` (Spoqa Han Sans Neo TTF로 한글 OG 렌더) |

## 디렉토리

```
.
├── app/
│   ├── [locale]/                # 다국어 라우팅 루트
│   │   ├── layout.tsx           # html/body + metadata + JSON-LD + 테마 FOUC script
│   │   ├── page.tsx             # 메인 (Hero / Career / Stack / Education / Projects)
│   │   ├── introduce/           # 가치관 & 핵심역량
│   │   ├── opengraph-image.tsx  # 동적 OG (locale별 콘텐츠)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/              # 페이지 전용 컴포넌트 (post-card, name 픽셀아트)
│   ├── icon.tsx · apple-icon.tsx  # 동적 favicon
│   ├── manifest.ts · sitemap.ts · robots.ts
│   └── global-error.tsx
├── components/                  # 공유 컴포넌트 (NavBar, Footer, CareerItem, ...)
├── i18n/                        # next-intl 설정 (routing, navigation, request)
├── lib/                         # site 상수
├── messages/                    # ko.json · en.json · ja.json (메시지 카탈로그)
├── store/                       # valtio 테마 스토어
└── middleware.ts                # next-intl 미들웨어
```

## 로컬 실행

```bash
# 의존성 설치
npm install
# (자동으로 husky pre-commit hook이 설치됨)

# 개발 서버
npm run dev
# → http://localhost:3000 (자동으로 /ko 등으로 redirect)

# 프로덕션 빌드 & 실행
npm run build
npm run start

# 정적 검증
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit

# e2e 테스트 (자동으로 prod 서버 띄움)
npm run test:e2e        # headless
npm run test:e2e:ui     # 시각 디버깅 UI
```

### 검증되는 e2e 시나리오

`e2e/i18n.spec.ts` — 15개 테스트로 다음을 보장:

- locale 자동 감지 (Accept-Language → ko/en/ja)
- 각 locale 페이지 렌더링, `html[lang]` 동기화
- NavBar 언어 스위처로 페이지 유지 이동
- hreflang 3개, JSON-LD `Person` + `WebSite` SSR inline
- sitemap.xml URL 6개 / hreflang 18개
- 테마 토글 & localStorage 영속화
- 보안 헤더 5종 (`X-Frame-Options`, HSTS, ...)
- OG/icon/apple-icon PNG 응답
- locale 내부 404 처리

## CI

`.github/workflows/ci.yml` — push/PR 시:

1. **verify**: lint → typecheck → build → 빌드 artifact 업로드
2. **e2e**: artifact 다운로드 → Playwright chromium 캐시 → 테스트 실행, 실패 시 리포트 업로드

## 환경 변수

`.env.example` 참고. 배포 시 다음 변수만 설정하면 됩니다:

```dotenv
# 배포 도메인. 미설정 시 Vercel은 VERCEL_URL 자동 사용.
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`sitemap.xml`, `og:url`, JSON-LD 등이 이 값을 사용합니다.

## 다국어 작업

- 메시지: `messages/{locale}.json`
- 키 추가 시 ko / en / ja 세 파일 모두 업데이트
- 서버 컴포넌트: `getTranslations({ locale, namespace })`
- 클라이언트 컴포넌트: `useTranslations(namespace)`
- 페이지간 이동: `import { Link, useRouter } from "@/i18n/navigation"` (자동으로 locale prefix 유지)

## 배포

Vercel에 그대로 push하면 빌드/배포됩니다. 별도 설정은 환경변수 하나(`NEXT_PUBLIC_SITE_URL`)만 필요.

## 라이선스

콘텐츠(글, 사진, 경력 정보)는 © 이광열. 코드(레이아웃, 컴포넌트, 빌드 스크립트)는 자유롭게 참고하셔도 좋습니다.
