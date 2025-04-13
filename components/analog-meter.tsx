"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function AnalogMeter() {
  const [value, setValue] = useState(65)
  const [secondaryValue, setSecondaryValue] = useState(42)
  const [tertiaryValue, setTertiaryValue] = useState(78)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Simulate changing values
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))))
      setSecondaryValue((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 8 - 4))))
      setTertiaryValue((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 6 - 3))))
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Theme toggle needs to be client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 relative">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Main content area with meter and indicators */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Meter */}
          <Card className={`flex-1 ${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'} hover:${theme === "dark" ? 'glassmorphism-dark:hover' : 'glassmorphism-light:hover'}`}>
            <CardHeader>
              <CardTitle>Main Meter</CardTitle>
              <CardDescription>Current system performance</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-64 h-64">
                {/* Gauge background */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Outer circle */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />

                  {/* Tick marks */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const angle = -210 + i * 24 // -210 to 30 degrees (240 degree arc)
                    const radian = (angle * Math.PI) / 180
                    const x1 = 100 + 70 * Math.cos(radian)
                    const y1 = 100 + 70 * Math.sin(radian)
                    const x2 = 100 + 85 * Math.cos(radian)
                    const y2 = 100 + 85 * Math.sin(radian)

                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="hsl(var(--foreground))"
                        strokeWidth={i % 5 === 0 ? "3" : "1"}
                      />
                    )
                  })}

                  {/* Numbers */}
                  {[0, 20, 40, 60, 80, 100].map((num, i) => {
                    const angle = -210 + i * 48 // -210 to 30 degrees (240 degree arc)
                    const radian = (angle * Math.PI) / 180
                    const x = 100 + 60 * Math.cos(radian)
                    const y = 100 + 60 * Math.sin(radian)

                    return (
                      <text
                        key={i}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="hsl(var(--foreground))"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {num}
                      </text>
                    )
                  })}

                  {/* Colored arcs */}
                  <path
                    d="M 30 130 A 90 90 0 0 1 100 10"
                    fill="none"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="8"
                  />
                  <path d="M 100 10 A 90 90 0 0 1 170 130" fill="none" stroke="hsl(var(--success))" strokeWidth="8" />

                  {/* Needle */}
                  {(() => {
                    const angle = -210 + (value / 100) * 240 // Map value to angle
                    const radian = (angle * Math.PI) / 180
                    const x = 100 + 75 * Math.cos(radian)
                    const y = 100 + 75 * Math.sin(radian)

                    return (
                      <>
                        <line
                          x1="100"
                          y1="100"
                          x2={x}
                          y2={y}
                          stroke="hsl(var(--primary))"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" />
                      </>
                    )
                  })()}

                  {/* Value text */}
                  <text
                    x="100"
                    y="140"
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {value.toFixed(1)}
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Analog Indicators */}
          <Card className={`md:w-80 ${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'} hover:${theme === "dark" ? 'glassmorphism-dark:hover' : 'glassmorphism-light:hover'}`}>
            <CardHeader>
              <CardTitle>Analog Indicators</CardTitle>
              <CardDescription>Supporting metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Secondary Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pressure</span>
                  <span>{secondaryValue.toFixed(1)}</span>
                </div>
                <div className="relative h-12">
                  <svg className="w-full h-full" viewBox="0 0 200 40">
                    {/* Background */}
                    <rect x="0" y="15" width="200" height="10" rx="5" fill="hsl(var(--muted))" />

                    {/* Value bar */}
                    <rect x="0" y="15" width={secondaryValue * 2} height="10" rx="5" fill="hsl(var(--primary))" />

                    {/* Needle */}
                    <polygon
                      points={`${secondaryValue * 2},10 ${secondaryValue * 2 - 5},25 ${secondaryValue * 2 + 5},25`}
                      fill="hsl(var(--foreground))"
                    />

                    {/* Tick marks */}
                    {Array.from({ length: 11 }).map((_, i) => (
                      <line
                        key={i}
                        x1={i * 20}
                        y1="30"
                        x2={i * 20}
                        y2={i % 5 === 0 ? "35" : "33"}
                        stroke="hsl(var(--foreground))"
                        strokeWidth={i % 5 === 0 ? "2" : "1"}
                      />
                    ))}

                    {/* Numbers */}
                    {[0, 50, 100].map((num, i) => (
                      <text key={i} x={num * 2} y="40" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">
                        {num}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Tertiary Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Temperature</span>
                  <span>{tertiaryValue.toFixed(1)}</span>
                </div>
                <div className="relative h-20">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    {/* Semi-circle background */}
                    <path
                      d="M 20 50 A 80 80 0 0 1 180 50"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Value arc */}
                    {(() => {
                      const angle = (tertiaryValue / 100) * 180 // Map value to angle
                      const endX = 20 + 160 * (angle / 180)
                      const endY = 50 - Math.sin((angle * Math.PI) / 180) * 80

                      return (
                        <path
                          d={`M 20 50 A 80 80 0 0 1 ${endX} ${endY}`}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      )
                    })()}

                    {/* Needle */}
                    {(() => {
                      const angle = (tertiaryValue / 100) * 180 // Map value to angle
                      const radian = ((180 - angle) * Math.PI) / 180
                      const x = 100 + 40 * Math.cos(radian)
                      const y = 50 - 40 * Math.sin(radian)

                      return (
                        <>
                          <line
                            x1="100"
                            y1="50"
                            x2={x}
                            y2={y}
                            stroke="hsl(var(--foreground))"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="100" cy="50" r="4" fill="hsl(var(--foreground))" />
                        </>
                      )
                    })()}

                    {/* Tick marks */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const angle = 180 - i * 18 // 180 to 0 degrees
                      const radian = (angle * Math.PI) / 180
                      const x1 = 100 + 30 * Math.cos(radian)
                      const y1 = 50 - 30 * Math.sin(radian)
                      const x2 = 100 + 38 * Math.cos(radian)
                      const y2 = 50 - 38 * Math.sin(radian)

                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="hsl(var(--foreground))"
                          strokeWidth={i % 5 === 0 ? "2" : "1"}
                        />
                      )
                    })}

                    {/* Numbers */}
                    {[0, 50, 100].map((num, i) => {
                      const angle = 180 - (num / 100) * 180 // Map value to angle
                      const radian = (angle * Math.PI) / 180
                      const x = 100 + 25 * Math.cos(radian)
                      const y = 50 - 25 * Math.sin(radian)

                      return (
                        <text
                          key={i}
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="hsl(var(--foreground))"
                          fontSize="10"
                        >
                          {num}
                        </text>
                      )
                    })}
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card className={`${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'} hover:${theme === "dark" ? 'glassmorphism-dark:hover' : 'glassmorphism-light:hover'}`}>
          <CardHeader>
            <CardTitle>Detailed Metrics</CardTitle>
            <CardDescription>Complete system readings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Main Value</div>
                <div className="text-2xl font-bold">{value.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {value < 40 ? "Low" : value > 70 ? "High" : "Normal"} range
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Min</span>
                      <span>0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max</span>
                      <span>100.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg</span>
                      <span>{((value + 65) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Pressure</div>
                <div className="text-2xl font-bold">{secondaryValue.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {secondaryValue < 40 ? "Low" : secondaryValue > 70 ? "High" : "Normal"} pressure
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Min</span>
                      <span>0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max</span>
                      <span>100.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg</span>
                      <span>{((secondaryValue + 42) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Temperature</div>
                <div className="text-2xl font-bold">{tertiaryValue.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {tertiaryValue < 40 ? "Low" : tertiaryValue > 70 ? "High" : "Normal"} temperature
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Min</span>
                      <span>0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max</span>
                      <span>100.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg</span>
                      <span>{((tertiaryValue + 78) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="text-sm font-medium mb-2">System Status</div>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    value < 30 ||
                    value > 80 ||
                    secondaryValue < 30 ||
                    secondaryValue > 80 ||
                    tertiaryValue < 30 ||
                    tertiaryValue > 80
                      ? "bg-destructive"
                      : "bg-success"
                  }`}
                ></div>
                <span>
                  {value < 30 ||
                  value > 80 ||
                  secondaryValue < 30 ||
                  secondaryValue > 80 ||
                  tertiaryValue < 30 ||
                  tertiaryValue > 80
                    ? "Attention Required"
                    : "Operating Normally"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className={`border-t pt-6 ${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'} hover:${theme === "dark" ? 'glassmorphism-dark:hover' : 'glassmorphism-light:hover'} rounded-lg mt-6`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2">System Information</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Model: Analog Meter Pro 2000</p>
                  <p>
                    Serial: AM-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </p>
                  <p>Firmware: v3.2.1</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Status</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      value < 30 ||
                      value > 80 ||
                      secondaryValue < 30 ||
                      secondaryValue > 80 ||
                      tertiaryValue < 30 ||
                      tertiaryValue > 80
                        ? "bg-destructive"
                        : "bg-success"
                    }`}
                  ></div>
                  <span className="text-sm">
                    {value < 30 ||
                    value > 80 ||
                    secondaryValue < 30 ||
                    secondaryValue > 80 ||
                    tertiaryValue < 30 ||
                    tertiaryValue > 80
                      ? "Attention Required"
                      : "Operating Normally"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdate.toLocaleTimeString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Controls</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Calibrate
                  </button>
                  <button className="px-3 py-1 text-sm border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground">
                    Reset
                  </button>
                  <button className="px-3 py-1 text-sm border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Analog Instruments Inc. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
