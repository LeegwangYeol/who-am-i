"use client"

import { useEffect, useState } from "react"

/**
 * 페이지 상단에 표시되는 얇은 스크롤 진행률 인디케이터.
 * scroll Y / (scrollHeight - viewport) 비율을 그라데이션 bar의 width로 표현.
 * fixed top-0 z-[60]으로 NavBar(z-50)보다 위에 떠 있다.
 *
 * prefers-reduced-motion 사용자는 transition을 끄지만 progress 자체는 표시.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(p)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        style={{
          width: `${progress * 100}%`,
          transition: "width 100ms linear",
        }}
      />
    </div>
  )
}
