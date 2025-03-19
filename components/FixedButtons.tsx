"use client"

import { useState, useEffect } from "react"
import { useThemeStore } from "@/store/theme"

interface FixedButtonsProps {
  scrollToTop: () => void
}

export default function FixedButtons({ scrollToTop }: FixedButtonsProps) {
  const { isDarkTheme } = useThemeStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed bottom-20 z-50 flex gap-4" 
    style={{ left: '50%', transform: 'translateX(-50%)' }}>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-2 rounded-full shadow-lg transition-all`}
          style={{ color: isDarkTheme ? 'white' : 'black' }}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      <a
        href="/introduce"
        className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-2 rounded-full shadow-lg transition-all flex items-center justify-center`}
        style={{ color: isDarkTheme ? 'white' : 'black' }}
        aria-label="Go to Introduction"
      >
        자기소개 보러가기
      </a>
    </div>
  )
}
