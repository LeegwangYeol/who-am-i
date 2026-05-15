"use client"

import { useEffect } from "react"

/**
 * `.spotlight` 클래스를 가진 모든 element에 대해 mousemove 위치를
 * --mx / --my CSS 변수로 전달하는 클라이언트 컴포넌트.
 *
 * 핵심 디자인:
 * - rAF로 throttle (60fps)
 * - prefers-reduced-motion 사용자에겐 동작 안 함
 * - 이벤트 캡처 단계에서 한 번만 listen — 카드별 listener 불필요
 */
export default function SpotlightTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mql.matches) return

    let raf = 0
    let lastTarget: Element | null = null
    let lastX = 0
    let lastY = 0

    const onMove = (e: MouseEvent) => {
      lastTarget = e.target as Element
      lastX = e.clientX
      lastY = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (!lastTarget) return
        // 가장 가까운 .spotlight 조상 찾기 (or self)
        const card = (lastTarget as HTMLElement).closest?.(".spotlight") as HTMLElement | null
        if (!card) return
        const rect = card.getBoundingClientRect()
        const mx = lastX - rect.left
        const my = lastY - rect.top
        card.style.setProperty("--mx", `${mx}px`)
        card.style.setProperty("--my", `${my}px`)
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
