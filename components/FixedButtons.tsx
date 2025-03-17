"use client"

import { useEffect, useState } from 'react'

interface FixedButtonsProps {
  isDarkTheme: boolean;
  scrollToTop: () => void;
}

export default function FixedButtons({ isDarkTheme, scrollToTop }: FixedButtonsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed bottom-8 right-1/2 z-50 translate-x-1/2 flex space-x-4">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} ${isDarkTheme ? 'text-white' : 'text-black'} p-2 rounded-full shadow-lg transition-all`}
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
        className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} ${isDarkTheme ? 'text-white' : 'text-black'} p-2 rounded-full shadow-lg transition-all flex items-center justify-center`}
        aria-label="Go to Introduction"
      >
        자기소개 보기
      </a>
    </div>
  )
}
