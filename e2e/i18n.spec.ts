import { test, expect } from "@playwright/test"

test.describe("i18n", () => {
  test("/ 는 Accept-Language에 따라 ko/en/ja 중 하나로 redirect", async ({
    page,
  }) => {
    const response = await page.goto("/")
    expect(response?.ok()).toBeTruthy()
    expect(page.url()).toMatch(/\/(ko|en|ja)\/?$/)
  })

  test("ko 페이지가 한국어로 렌더링된다", async ({ page }) => {
    await page.goto("/ko", { waitUntil: "networkidle" })
    await expect(page).toHaveTitle(/이광열|Mr\.Lee/)
    // hero.role — locale별 unique한 문구
    await expect(
      page.getByText("웹과 로봇 자동화를 잇는 개발자")
    ).toBeVisible()
  })

  test("en 페이지가 영문으로 렌더링된다", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" })
    await expect(page).toHaveTitle(/Lee Gwangyeol|Mr\.Lee/)
    await expect(
      page.getByText("Bridging the web and robotic automation")
    ).toBeVisible()
  })

  test("ja 페이지가 일본어로 렌더링된다", async ({ page }) => {
    await page.goto("/ja", { waitUntil: "networkidle" })
    await expect(
      page.getByText("Webとロボット自動化をつなぐエンジニア")
    ).toBeVisible()
  })

  test("NavBar 언어 스위처로 ko → en 이동", async ({ page }) => {
    await page.goto("/ko", { waitUntil: "networkidle" })
    // 언어 드롭다운 trigger (aria-label="언어 선택" 또는 "Language")
    await page.locator('nav button[aria-label*="언어"]').click()
    // English option
    await page.getByRole("option", { name: /English/ }).click()
    await page.waitForURL(/\/en/)
    await expect(
      page.getByText("Bridging the web and robotic automation")
    ).toBeVisible()
  })

  test("html lang 속성이 locale 따라 바뀐다", async ({ page }) => {
    for (const locale of ["ko", "en", "ja"]) {
      await page.goto(`/${locale}`)
      expect(await page.locator("html").getAttribute("lang")).toBe(locale)
    }
  })
})

test.describe("hreflang & SEO", () => {
  test("hreflang alternate 태그가 3개 모두 출력된다", async ({ page }) => {
    await page.goto("/en")
    const links = await page
      .locator('link[rel="alternate"][hreflang]')
      .all()
    const langs = await Promise.all(links.map(l => l.getAttribute("hreflang")))
    expect(langs).toEqual(expect.arrayContaining(["ko", "en", "ja"]))
  })

  test("JSON-LD Person + WebSite 스키마가 SSR HTML에 포함된다", async ({
    request,
  }) => {
    const res = await request.get("/ko")
    const html = await res.text()
    expect(html).toContain('"@type":"Person"')
    expect(html).toContain('"@type":"WebSite"')
  })

  test("sitemap.xml에 6개 URL + hreflang", async ({ request }) => {
    const res = await request.get("/sitemap.xml")
    expect(res.ok()).toBeTruthy()
    const xml = await res.text()
    expect(xml.match(/<url>/g)?.length).toBe(6)
    expect(xml.match(/hreflang/g)?.length).toBe(18)
  })
})

test.describe("Theme", () => {
  test("테마 토글 버튼이 dark/light 클래스를 전환한다", async ({ page }) => {
    await page.goto("/ko", { waitUntil: "networkidle" })
    const html = page.locator("html")
    const initialDark = await html.evaluate(el => el.classList.contains("dark"))

    // NavBar 안 토글 버튼 — aria-label은 현재 모드의 반대를 가리킴
    await page
      .locator('nav button[aria-label*="모드로 전환"]')
      .dispatchEvent("click")

    const flipped = await html.evaluate(el => el.classList.contains("dark"))
    expect(flipped).toBe(!initialDark)
  })

  test("선택한 테마가 localStorage에 영속화된다", async ({ page }) => {
    await page.goto("/ko", { waitUntil: "networkidle" })
    await page
      .locator('nav button[aria-label*="모드로 전환"]')
      .dispatchEvent("click")
    const stored = await page.evaluate(() => localStorage.getItem("theme"))
    expect(["dark", "light"]).toContain(stored)
  })
})

test.describe("Security & metadata", () => {
  test("보안 헤더가 모두 응답에 포함된다", async ({ request }) => {
    const res = await request.get("/ko")
    const headers = res.headers()
    expect(headers["x-frame-options"]).toBe("DENY")
    expect(headers["x-content-type-options"]).toBe("nosniff")
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin")
    expect(headers["strict-transport-security"]).toContain("max-age=")
    expect(headers["permissions-policy"]).toContain("camera=()")
  })

  test("OG 이미지 라우트가 PNG를 반환한다", async ({ request }) => {
    const res = await request.get("/en/opengraph-image")
    expect(res.ok()).toBeTruthy()
    expect(res.headers()["content-type"]).toContain("image/png")
  })

  test("/icon, /apple-icon이 PNG를 반환한다", async ({ request }) => {
    for (const path of ["/icon", "/apple-icon"]) {
      const res = await request.get(path)
      expect(res.ok()).toBeTruthy()
      expect(res.headers()["content-type"]).toContain("image/png")
    }
  })
})

test.describe("404", () => {
  test("locale 내 존재하지 않는 경로는 404 페이지를 보여준다", async ({
    page,
  }) => {
    const res = await page.goto("/ko/this-does-not-exist")
    expect(res?.status()).toBe(404)
    await expect(page.getByText("404", { exact: false })).toBeVisible()
  })
})
