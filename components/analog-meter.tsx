"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function AnalogMeter() {
  const [codingSkills, setCodingSkills] = useState(85)
  const [passion, setPassion] = useState(92)
  const [creativity, setCreativity] = useState(78)
  const [problemSolving, setProblemSolving] = useState(88)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // 값의 변동 범위를 줄이고 업데이트 주기를 늘려 더 안정적인 표시 제공
  useEffect(() => {
    const interval = setInterval(() => {
      setCodingSkills((prev) => Math.max(84, Math.min(88, prev + (Math.random() * 1 - 0.5))))
      setPassion((prev) => Math.max(90, Math.min(94, prev + (Math.random() * 1 - 0.5))))
      setCreativity((prev) => Math.max(76, Math.min(80, prev + (Math.random() * 1 - 0.5))))
      setProblemSolving((prev) => Math.max(86, Math.min(90, prev + (Math.random() * 1 - 0.5))))
      setLastUpdate(new Date())
    }, 5000)

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
              <CardTitle>코딩 기술</CardTitle>
              <CardDescription>프로그래밍 숙련도</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-64 h-64">
                {/* Gauge background */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* 배경 원 */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  
                  {/* Colored arcs - 더 선명하게 표시 */}
                  <path
                    d="M 30 130 A 90 90 0 0 1 100 10"
                    fill="none"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="18"
                    strokeOpacity="1"
                  />
                  <path 
                    d="M 100 10 A 90 90 0 0 1 170 130" 
                    fill="none" 
                    stroke="hsl(var(--success))" 
                    strokeWidth="18" 
                    strokeOpacity="1" 
                  />

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
                        strokeWidth={i % 5 === 0 ? "3.5" : "1.5"} // 눈금 선 두껍게
                      />
                    )
                  })}

                  {/* Numbers */}
                  {[0, 20, 40, 60, 80, 100].map((num, i) => {
                    const angle = -210 + i * 48 // -210 to 30 degrees (240 degree arc)
                    const radian = (angle * Math.PI) / 180
                    const x = 100 + 55 * Math.cos(radian) // 숫자 위치 약간 안쪽으로
                    const y = 100 + 55 * Math.sin(radian) // 숫자 위치 약간 안쪽으로

                    return (
                      <text
                        key={i}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="hsl(var(--foreground))"
                        fontSize="14" // 숫자 크기 증가
                        fontWeight="bold"
                      >
                        {num}
                      </text>
                    )
                  })}

                  {/* Needle - 맨 마지막에 렌더링하여 항상 보이도록 함 */}
                  {(() => {
                    const angle = -210 + (codingSkills / 100) * 240 // Map value to angle
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
                          strokeWidth="5" // 바늘 두께 증가
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" /> // 바늘 중심 원 크기 조정
                        <circle cx="100" cy="100" r="3" fill="hsl(var(--background))" /> // 바늘 중심 작은 원 크기 조정
                      </>
                    )
                  })()}

                  {/* Value text */}
                  <text
                    x="100"
                    y="145" // 위치 살짝 아래로
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="22" // 값 텍스트 크기 증가
                    fontWeight="bold"
                  >
                    {codingSkills.toFixed(1)}
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Analog Indicators */}
          <Card className={`md:w-80 ${theme === "dark" ? 'glassmorphism-dark' : 'glassmorphism-light'} hover:${theme === "dark" ? 'glassmorphism-dark:hover' : 'glassmorphism-light:hover'}`}>
            <CardHeader>
              <CardTitle>개인 특성</CardTitle>
              <CardDescription>주요 강점 및 능력</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Secondary Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>열정</span>
                  <span>{passion.toFixed(1)}</span>
                </div>
                <div className="relative h-12">
                  <svg className="w-full h-full" viewBox="0 0 200 40">
                    {/* Background - 더 두껍게 표시 */}
                    <rect x="0" y="12" width="200" height="16" rx="8" fill="hsl(var(--muted))" strokeWidth="1.5" stroke="hsl(var(--border))" /> {/* 배경 테두리 두께 증가 */}

                    {/* Value bar - 더 두껍게 표시 */}
                    <rect x="0" y="12" width={passion * 2} height="16" rx="8" fill="hsl(var(--primary))" />
                    
                    {/* Needle - 더 크고 선명하게 표시 */}
                    <polygon
                      points={`${passion * 2},4 ${passion * 2 - 6},31 ${passion * 2 + 6},31`} // 바늘 크기 및 위치 조정
                      fill="hsl(var(--foreground))"
                    />
                    <circle cx={passion * 2} cy="20" r="5" fill="hsl(var(--primary))" /> {/* 바늘 원 크기 증가 */}

                    {/* Tick marks */}
                    {Array.from({ length: 11 }).map((_, i) => (
                      <line
                        key={i}
                        x1={i * 20}
                        y1="30"
                        x2={i * 20}
                        y2={i % 5 === 0 ? "36" : "33"} // 눈금 길이 조정
                        stroke="hsl(var(--foreground))"
                        strokeWidth={i % 5 === 0 ? "2.5" : "1.5"} // 눈금 두께 증가
                      />
                    ))}

                    {/* Numbers */}
                    {[0, 50, 100].map((num, i) => (
                      <text key={i} x={num * 2} y="42" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="medium"> {/* 숫자 크기 및 y위치 조정*/}
                        {num}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Tertiary Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>창의성</span>
                  <span>{creativity.toFixed(1)}</span>
                </div>
                <div className="relative h-20">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    {/* Semi-circle background - 더 두껍고 선명하게 표시 */}
                    <path
                      d="M 20 50 A 80 80 0 0 1 180 50"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 50 A 80 80 0 0 1 180 50"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />

                    {/* Value arc */}
                    {(() => {
                      const angle = (creativity / 100) * 180 // Map value to angle
                      const endX = 20 + 160 * (angle / 180)
                      const endY = 50 - Math.sin((angle * Math.PI) / 180) * 80

                      return (
                        <path
                          d={`M 20 50 A 80 80 0 0 1 ${endX} ${endY}`}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="12"
                          strokeLinecap="round"
                        />
                      )
                    })()}

                    {/* Needle */}
                    {(() => {
                      const angle = (creativity / 100) * 180 // Map value to angle
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
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <circle cx="100" cy="50" r="6" fill="hsl(var(--foreground))" />
                          <circle cx="100" cy="50" r="2" fill="hsl(var(--background))" />
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
            <CardTitle>기술 분석</CardTitle>
            <CardDescription>능력 상세 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">코딩 기술</div>
                <div className="text-2xl font-bold">{codingSkills.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {codingSkills < 60 ? "중급" : codingSkills > 80 ? "전문가" : "고급"} 수준
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
                      <span>{((codingSkills + 85) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">열정</div>
                <div className="text-2xl font-bold">{passion.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {passion < 60 ? "보통" : passion > 80 ? "매우 높음" : "높음"} 수준
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
                      <span>{((passion + 92) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">창의성</div>
                <div className="text-2xl font-bold">{creativity.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {creativity < 60 ? "실용적" : creativity > 80 ? "혁신적" : "창의적"} 사고
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
                      <span>{((creativity + 78) / 2).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="text-sm font-medium mb-2">종합 평가</div>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    codingSkills > 80 &&
                    passion > 80 &&
                    creativity > 70 &&
                    problemSolving > 80
                      ? "bg-success"
                      : "bg-amber-500"
                  }`}
                ></div>
                <span>
                  {codingSkills > 80 &&
                  passion > 80 &&
                  creativity > 70 &&
                  problemSolving > 80
                    ? "뛰어난 인재"
                    : "높은 잠재력"}
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
                <h3 className="font-medium text-lg mb-2">프로필 요약</h3>
                <div className="text-sm text-muted-foreground">
                  <p>풀스택 개발자</p>
                  <p>경력: 5년 이상</p>
                  <p>전문 분야: Next.js, React, TypeScript</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">문제 해결 능력</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>분석적 사고</span>
                    <span>{problemSolving.toFixed(1)}</span>
                  </div>
                  <div className="relative h-5">
                    <div className="absolute inset-0 bg-muted rounded-full border border-border"></div>
                    <div 
                      className="absolute inset-0 bg-primary rounded-full" 
                      style={{ width: `${problemSolving}%` }}
                    ></div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-foreground border-2 border-background" 
                      style={{ left: `calc(${problemSolving}% - 8px)` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">마지막 업데이트: {lastUpdate.toLocaleTimeString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">주요 강점</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-full">
                    Next.js
                  </span>
                  <span className="px-3 py-1 text-sm bg-primary/90 text-primary-foreground rounded-full">
                    React
                  </span>
                  <span className="px-3 py-1 text-sm bg-primary/80 text-primary-foreground rounded-full">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 text-sm bg-primary/70 text-primary-foreground rounded-full">
                    TailwindCSS
                  </span>
                  <span className="px-3 py-1 text-sm bg-primary/60 text-primary-foreground rounded-full">
                    UI/UX
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} 개인 포트폴리오. 모든 수치는 자체 평가를 기반으로 합니다.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
