"use client"

import { useState, useEffect } from "react"
import { useThemeStore } from "@/store/theme"

interface Star {
  id: number;
  left: string;
  animationDuration: string;
  opacity: number;
}

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const { isDarkTheme } = useThemeStore();
  const MAX_STARS = 30;

  useEffect(() => {
    const createStar = () => {
      const newStar: Star = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
      };
      setStars(prevStars => {
        const newStars = [...prevStars, newStar];
        return newStars.slice(-MAX_STARS); // 최대 개수 유지
      });
    };

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="stars-container fixed w-screen h-screen z-0">
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
          background-color: ${isDarkTheme ? 'white' : 'green'};
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
