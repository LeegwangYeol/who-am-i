"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import CareerItem from "../components/CareerItem"
import EducationItem from "../components/EducationItem"
import ProjectItem from "../components/ProjectItem"

export default function ProfilePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            이광열 <span className="text-xl text-gray-600">/ Lee Gwang Yeol</span>
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <Image
                src="/sparring.webp"
                alt="Profile Picture"
                width={250}
                height={250}
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  풀스택 웹 개발자이자 자동화 로봇 엔지니어로서, Next.js와 C#을 활용한 웹 개발 및 공장 자동화 시스템 개발 경험을 보유하고 있습니다.
                  AI 기술과 로봇 자동화의 융합에 대한 깊은 관심을 가지고 있으며, 지속적인 학습과 도전을 통해 기술 혁신을 추구합니다.
                </p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <a href="mailto:bpscokr003@naver.com" className="text-blue-500 hover:underline">
                      bpscokr003@naver.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">010-6491-4081</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">경기 광주시 경충대로</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link href="https://github.com/LeegwangYeol" className="text-blue-500 hover:underline">
              GitHub
            </Link>
            <Link href="https://velog.io/@kelog123" className="text-blue-500 hover:underline">
              Blog
            </Link>
            {/* <Link href="/resume.pdf" className="text-blue-500 hover:underline">
              Resume
            </Link> */}
          </div>

          <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Career</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CareerItem
                company="피오유엘"
                position="웹개발 · 연구원"
                period="2024.06 ~ 2025.03"
                description="라미 프로젝트(llami) 프론트엔드 개발. Next.js와 TypeScript를 활용한 모듈화된 프론트엔드 아키텍처 구현, 옵티미스틱 Fetch 적용, Git 워크플로우 관리 및 UI 컴포넌트 테스트 환경 구축."
              />
              <CareerItem
                company="윈텍오토메이션"
                position="FA(공장자동화) · 소프트웨어팀 주임연구원"
                period="2021.10 ~ 2024.06"
                description="생산 자동화 장비 프로젝트 진행. C# .NET 기반 PC 자동화 장비 개발, 프레스 핸들러 통합 프로젝트 진행, MES 시스템 적용 및 하드웨어 통신 유닛 개발."
              />
              <CareerItem
                company="Enitec株式会社"
                position="SI개발 · 개발 보수팀 사원"
                period="2019.11 ~ 2021.04"
                description="반도체 기기 로그 분석 및 테스트, 임베디드 시스템 분석 및 설계, WinActor 라이브러리 개발 (엑셀 정리, AI-OCR)."
              />
            </div>
          </section>

          <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2 ">
              {[
                ".NET", "C#", "Oracle", "Node.js", "TypeScript", "Next.js", "Supabase", "React",
                "Sass", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "MySQL", "MSSQL", "GitHub",
                "Jira", "LLM", "openAI API", "Anthropic API"
              ].map(
                (tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                ),
              )}
            </div>
          </section>

          <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <EducationItem
                institution="한국외국어대학교(용인)"
                degree="사학과 (러시어과 이중전공)"
                period="2012.03 ~ 2019.02"
                description="학점: 3.35/4.5"
              />
              <EducationItem
                institution="코세아 인재개발원"
                degree="웹 개발자 IT 과정"
                period="2018.09 ~ 2019.03"
                description="웹 개발 기초 교육 수료"
              />
            </div>
          </section>

          <section className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectItem
                name="라미 프로젝트(llami)"
                period="2024.06 ~ 2025.03"
                technologies={["Next.js", "TypeScript", "Supabase", "ElysiaJS"]}
                description="AI 챗봇 프론트엔드 개발. SOLID 원칙 기반 모듈화된 아키텍처 구축, 상담 요청 확인 및 고객 연락처 관리 시스템 구현, 음성인식 기반 UX 개발."
                isSpecialProject={true}
              />
              <ProjectItem
                name="프레스 핸들러 통합 프로젝트"
                period="2021.10 ~ 2024.06"
                technologies={["C#", ".NET", "WinForm", "MSSQL"]}
                description="공장 자동화 장비 개발. 멀티쓰레드 기반 축 제어, 안전한 Motion 시퀀스 통일, MES 시스템 적용, 하드웨어 통신 구현."
              />
            </div>
          </section>
        </div>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
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
    </div>
  )
}
