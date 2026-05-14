"use client"

import { useState, useEffect } from "react"
import { useThemeStore } from "@/store/theme"

interface Star {
  id: number
  left: string
  animationDuration: string
  opacity: number
}

const MAX_STARS = 30

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)
  const { isDarkTheme } = useThemeStore()

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReducedMotion(media.matches)
    onChange()
    media.addEventListener?.("change", onChange)
    return () => media.removeEventListener?.("change", onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const createStar = () => {
      const newStar: Star = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
      }
      setStars(prev => [...prev, newStar].slice(-MAX_STARS))
    }
    const interval = setInterval(createStar, 300)
    return () => clearInterval(interval)
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <>
      <div className="stars-container fixed inset-0 pointer-events-none w-screen h-screen z-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              animationDuration: star.animationDuration,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        .stars-container {
          z-index: 1;
        }
        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: ${isDarkTheme
            ? "rgba(255,255,255,0.85)"
            : "rgba(99,102,241,0.55)"};
          box-shadow: 0 0 6px
            ${isDarkTheme ? "rgba(255,255,255,0.6)" : "rgba(99,102,241,0.35)"};
          border-radius: 50%;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  )
}
