"use client"

import { useEffect, useRef, useState } from "react"

export default function TradeFlowMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  // Coordinates for Korea and US (approximate)
  const koreaCoords = { x: 650, y: 200 }
  const usCoords = { x: 150, y: 220 }

  // Trade volume data (in billions USD)
  const tradeData = {
    koreaToUS: 110, // Korea exports to US
    usToKorea: 85, // US exports to Korea
  }

  // Number of dots based on trade volume
  const koreaToUSDots = Math.round(tradeData.koreaToUS / 5)
  const usToKoreaDots = Math.round(tradeData.usToKorea / 5)

  useEffect(() => {
    // Handle responsive sizing
    const handleResize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const { width } = container.getBoundingClientRect()
        const height = width * 0.625 // Maintain aspect ratio
        setDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Scale coordinates based on current dimensions
    const scaleX = dimensions.width / 800
    const scaleY = dimensions.height / 500

    const scaledKoreaCoords = {
      x: koreaCoords.x * scaleX,
      y: koreaCoords.y * scaleY,
    }
    const scaledUSCoords = {
      x: usCoords.x * scaleX,
      y: usCoords.y * scaleY,
    }

    // Load world map image
    const worldMap = new Image()
    worldMap.crossOrigin = "anonymous"
    worldMap.src = "/placeholder.svg?height=500&width=800" // This would be replaced with actual Korea-US map

    // Create dots for animation
    const createDots = (count: number, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
      return Array.from({ length: count }, (_, i) => ({
        progress: Math.random(), // Random starting position
        speed: 0.001 + Math.random() * 0.002, // Random speed
        fromX,
        fromY,
        toX,
        toY,
        color,
        size: 3 + Math.random() * 3,
      }))
    }

    const koreaToUSDotsList = createDots(
      koreaToUSDots,
      scaledKoreaCoords.x,
      scaledKoreaCoords.y,
      scaledUSCoords.x,
      scaledUSCoords.y,
      "#4285F4",
    )

    const usToKoreaDotsList = createDots(
      usToKoreaDots,
      scaledUSCoords.x,
      scaledUSCoords.y,
      scaledKoreaCoords.x,
      scaledKoreaCoords.y,
      "#EA4335",
    )

    // Animation function
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw world map
      ctx.drawImage(worldMap, 0, 0, dimensions.width, dimensions.height)

      // Draw country markers
      ctx.fillStyle = "#34A853"
      ctx.beginPath()
      ctx.arc(scaledKoreaCoords.x, scaledKoreaCoords.y, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#FBBC05"
      ctx.beginPath()
      ctx.arc(scaledUSCoords.x, scaledUSCoords.y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw country labels
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.fillText("South Korea", scaledKoreaCoords.x + 15, scaledKoreaCoords.y)
      ctx.fillText("United States", scaledUSCoords.x + 15, scaledUSCoords.y)

      // Draw curved paths
      const drawCurvedPath = (fromX: number, fromY: number, toX: number, toY: number, color: string) => {
        const controlPointX = (fromX + toX) / 2
        const controlPointY = Math.min(fromY, toY) - 100 * scaleY

        // Draw the curved path
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.quadraticCurveTo(controlPointX, controlPointY, toX, toY)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()

        // Add arrowhead to clearly show direction
        const headLen = 15 * Math.max(scaleX, scaleY)
        const angle = Math.atan2(toY - controlPointY, toX - controlPointX)

        ctx.beginPath()
        ctx.moveTo(toX, toY)
        ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
      }

      drawCurvedPath(
        scaledKoreaCoords.x,
        scaledKoreaCoords.y,
        scaledUSCoords.x,
        scaledUSCoords.y,
        "rgba(66, 133, 244, 0.3)",
      )
      drawCurvedPath(
        scaledUSCoords.x,
        scaledUSCoords.y,
        scaledKoreaCoords.x,
        scaledKoreaCoords.y,
        "rgba(234, 67, 53, 0.3)",
      )

      // Draw "Trade War" in Chinese characters vertically
      const tradeWarChars = "贸易战" // Chinese for "trade war"
      ctx.font = "bold 24px Arial"
      ctx.fillStyle = "#000"

      // Position in the middle between the two countries
      const midX = (scaledKoreaCoords.x + scaledUSCoords.x) / 2
      const midY = Math.min(scaledKoreaCoords.y, scaledUSCoords.y) - 50 * scaleY

      // Draw characters vertically
      for (let i = 0; i < tradeWarChars.length; i++) {
        ctx.fillText(tradeWarChars[i], midX, midY + i * 30)
      }

      // Draw and update dots
      const updateAndDrawDots = (dots: any[], color: string) => {
        dots.forEach((dot) => {
          // Update position along the curve
          dot.progress += dot.speed
          if (dot.progress > 1) dot.progress = 0

          // Calculate position on the curve
          const t = dot.progress
          const controlPointX = (dot.fromX + dot.toX) / 2
          const controlPointY = Math.min(dot.fromY, dot.toY) - 100 * scaleY

          const x = Math.pow(1 - t, 2) * dot.fromX + 2 * (1 - t) * t * controlPointX + Math.pow(t, 2) * dot.toX
          const y = Math.pow(1 - t, 2) * dot.fromY + 2 * (1 - t) * t * controlPointY + Math.pow(t, 2) * dot.toY

          // Draw dot
          ctx.beginPath()
          ctx.arc(x, y, dot.size, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        })
      }

      updateAndDrawDots(koreaToUSDotsList, "#4285F4")
      updateAndDrawDots(usToKoreaDotsList, "#EA4335")

      // Draw legend
      const legendY = dimensions.height - 70
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.fillText("Trade Volume (Billions USD):", 20, legendY)

      ctx.fillStyle = "#4285F4"
      ctx.fillRect(20, legendY + 20, 15, 15)
      ctx.fillStyle = "#000"
      ctx.fillText(`Korea → US: $${tradeData.koreaToUS}B`, 45, legendY + 32)

      ctx.fillStyle = "#EA4335"
      ctx.fillRect(20, legendY + 45, 15, 15)
      ctx.fillStyle = "#000"
      ctx.fillText(`US → Korea: $${tradeData.usToKorea}B`, 45, legendY + 57)

      requestAnimationFrame(animate)
    }

    worldMap.onload = animate

    return () => {
      // Cleanup
    }
  }, [dimensions])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Korea-US Trade Flow Visualization</h2>
      <div className="relative w-full border border-gray-200 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full" />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Animated dots represent trade volume between South Korea and the United States. Blue dots show exports from
        Korea to the US, and red dots show exports from the US to Korea.
      </p>
    </div>
  )
}

