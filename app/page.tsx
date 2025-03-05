"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import CareerItem from "../components/CareerItem"
import EducationItem from "../components/EducationItem"
import ProjectItem from "../components/ProjectItem"

export default function ProfilePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  interface Star {
    id: number;
    left: string;
    animationDuration: string;
    opacity: number;
  }
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const createStar = () => {
      const newStar: Star = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
      };
      setStars(prevStars => [...prevStars, newStar]);
    };

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-200 relative">
      <div className="stars-container fixed w-screen h-screen z-[10]">
        {stars.map( (star :Star)=> (
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold b text-gray-900">
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
                width={300}
                height={300}
                className="rounded-3xl"
                priority={true}
              />
            </div>
            <div className="flex-grow">
              <div className="bg-gradient-to-r from-blue-400 to-blue-700 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Introduction</h2>
                <p className="text-white mb-4 text-balance whitespace-break-spaces">
                💻 프론트엔드 웹 개발자이자 🤖 자동화 로봇 엔지니어로서,
Next.js와 C#을 활용한 웹 개발 및 공장 자동화 시스템 개발 경험을 보유하고 있습니다.

AI 기술과 로봇 자동화의 융합에 대한 깊은 관심을 가지고 있으며,
📚 지속적인 학습과 🚀 도전을 통해 기술 혁신을 추구합니다!
                </p>
              </div>
            </div>
          </div>

          <section className="mt-12 bg-gradient-to-r from-orange-600 to-orange-200 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
            <h2 className="text-2xl text-white font-semibold mb-4">Career</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CareerItem
                company="피오유엘"
                position="웹개발 · 연구원"
                period="2024.06 ~ 2025.03"
                description="라미 프로젝트(llami) 프론트엔드 개발. Next.js와 TypeScript를 활용한 모듈화된 프론트엔드 아키텍처 구현, 옵티미스틱 Fetch 적용, Git 워크플로우 관리 및 UI 컴포넌트 테스트 환경 구축."
              />
              <CareerItem
                company="윈텍오토메이션"
                position="FA(공장자동화) · 주임"
                period="2021.10 ~ 2024.06"
                description="생산 자동화 장비 프로젝트 진행. C# .NET 기반 PC 자동화 장비 개발, 프레스 핸들러 통합 프로젝트 진행, MES 시스템 적용 및 하드웨어 통신 유닛 개발."
              />
              <CareerItem
                company="Enitec(주)"
                position="SI개발 · 개발팀 사원"
                period="2019.11 ~ 2021.04"
                description="반도체 기기 로그 분석 및 테스트, 임베디드 시스템 분석 및 설계, WinActor 라이브러리 개발 (엑셀 정리, AI-OCR)."
              />
            </div>
          </section>

          <section className="mt-12 bg-gradient-to-r from-teal-200 to-teal-500 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2 ">
              {[
                ".NET", "C#", "Oracle", "Node.js", "TypeScript", "Next.js", "Supabase", "React",
                "Sass", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "MySQL", "Tailwind", "GitHub",
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

          <section className="mt-12 bg-gradient-to-r from-fuchsia-500 to-fuchsia-200 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
            <h2 className="text-2xl text-white font-semibold mb-4">Education</h2>
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

          <section className="mt-12 bg-gradient-to-r from-red-200 to-red-500 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
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

          <footer className="mt-6 bg-gradient-to-r from-pink-500 to-pink-100 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md p-6">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    {/* Left Section */}
    <div className="mb-6 md:mb-0">
    <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="white"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <a href="mailto:bpscokr003@naver.com" className="text-blue-500 hover:underline">
                      <span className="text-white overflow-hidden whitespace-nowrap hover:overflow-visible hover:whitespace-normal">
                        bpscokr003@naver.com
                      </span>
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white overflow-hidden whitespace-nowrap hover:overflow-visible hover:whitespace-normal">
                      경기 수원시
                    </span>
                  </div>
                </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">

      <div className="space-x-4 grid  grid-cols-2 md:grid-cols-4 gap-3">
        <a href="https://github.com/LeegwangYeol" className="text-pink-500 hover:underline flex items-center">
          <i className="fab fa-github mr-2"></i> GitHub
        </a>
        <a href="https://velog.io/@kelog123" className="text-pink-500 hover:underline flex items-center">
          <i aria-hidden="true" className="fab fa-grav mr-2"></i> Velog
        </a>
        <a href="https://instagram.com" className="text-pink-500 hover:underline flex items-center">
          <i className="fab fa-instagram mr-2"></i> Instagram
        </a>
        <a href="https://www.youtube.com/@lolollol2379" className="text-pink-500 hover:underline flex items-center">
          <i className="fab fa-youtube mr-2"></i> YouTube
        </a>
      </div>
    </div>
  </div>
</footer>

        </div>
        <button
          onClick={()=>{window.scrollTo({top: 0, behavior: 'smooth'})}}
          className="fixed top-8 right-12 text-4xl text-blue-300 rounded-full shadow-lg hover:bg-blue-400 transition-colors"
        >
          <i className="fab fa-grav"></i>
        </button>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-1/2 translate-x-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
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
      <style jsx>{`  
        .stars-container {
          z-index: 1;
        }
        .star {
          position: absolute;
          width: 13px;
          height: 4px;
          background: yellow;
          border-radius: 40%;
          animation: fall linear;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(960deg);
          }
        }
      `}</style>
    </div>
    
  )
}
