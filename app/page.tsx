"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import CareerItem from "@/components/CareerItem"
import EducationItem from "@/components/EducationItem"
import ProjectItem from "@/components/ProjectItem"
import Footer from "@/components/Footer"

export default function ProfilePage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'} relative`}>
      <div className="stars-container fixed w-screen h-screen">
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
      
      <header className={`bg-white ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className={`text-3xl font-bold b ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
            이광열의 포트폴리오
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
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
                <div className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md p-6`}>
                  <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Introduction</h2>
                  <p className={`${isDarkTheme ? 'text-white' : 'text-black'} mb-4 text-balance whitespace-break-spaces`}>
                  💻 프론트엔드 웹 개발자이자 🤖 자동화 로봇 엔지니어로서,
Next.js와 C#을 활용한 웹 개발 및 공장 자동화 시스템 개발 경험을 보유하고 있습니다.

AI 기술과 로봇 자동화의 융합에 대한 깊은 관심을 가지고 있으며,
📚 지속적인 학습과 🚀 도전을 통해 기술 혁신을 추구합니다!
                  </p>
                </div>
              </div>
            </div>

            <section className={`mt-12 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md p-6`}>
              <h2 className={`text-2xl ${isDarkTheme ? 'text-gray-200' : 'text-white'} font-semibold mb-4`}>Career</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CareerItem
                  company="피오유엘"
                  position="웹개발 · 연구원"
                  period="2024.06 ~ 2025.03"
                  description="라미 프로젝트(llami) 프론트엔드 개발. Next.js와 TypeScript를 활용한 모듈화된 프론트엔드 아키텍처 구현, 옵티미스틱 Fetch 적용, Git 워크플로우 관리 및 UI 컴포넌트 테스트 환경 구축."
                  isDarkTheme={isDarkTheme}
                />
                <CareerItem
                  company="윈텍오토메이션"
                  position="FA(공장자동화) · 주임"
                  period="2021.10 ~ 2024.06"
                  description="생산 자동화 장비 프로젝트 진행. C# .NET 기반 PC 자동화 장비 개발, 프레스 핸들러 통합 프로젝트 진행, MES 시스템 적용 및 하드웨어 통신 유닛 개발."
                  isDarkTheme={isDarkTheme}
                />
                <CareerItem
                  company="Enitec(주)"
                  position="SI개발 · 개발팀 사원"
                  period="2019.11 ~ 2021.04"
                  description="반도체 기기 로그 분석 및 테스트, 임베디드 시스템 분석 및 설계, WinActor 라이브러리 개발 (엑셀 정리, AI-OCR)."
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </section>

            <section className={`mt-12 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md p-6`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-white'}`}>Technology Stack</h2>
              <div className="flex flex-wrap gap-2 ">
                {[
                  ".NET", "C#", "Oracle", "Node.js", "TypeScript", "Next.js", "Supabase", "React",
                  "Sass", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "MySQL", "Tailwind", "GitHub",
                  "Jira", "LLM", "openAI API", "Anthropic API"
                ].map(
                  (tech, index) => (
                    <span key={index} className={`bg-blue-100 ${isDarkTheme ? 'text-gray-400' : 'text-blue-800'} text-sm px-3 py-1 rounded-full`}>
                        {tech}
                      </span>
                  ),
                )}
              </div>
            </section>

            <section className={`mt-12 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md p-6`}>
              <h2 className={`text-2xl ${isDarkTheme ? 'text-gray-200' : 'text-white'} font-semibold mb-4`}>Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <EducationItem
                  institution="한국외국어대학교(용인)"
                  degree="사학과 (러시어과 이중전공)"
                  period="2012.03 ~ 2019.02"
                  description="학점: 3.35/4.5"
                  isDarkTheme={isDarkTheme}
                />
                <EducationItem
                  institution="코세아 인재개발원"
                  degree="웹 개발자 IT 과정"
                  period="2018.09 ~ 2019.03"
                  description="웹 개발 기초 교육 수료"
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </section>

            <section className={`mt-12 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md p-6`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-white'}`}>Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectItem
                  name="라미 프로젝트(llami)"
                  period="2024.06 ~ 2025.03"
                  technologies={["Next.js", "TypeScript", "Supabase", "ElysiaJS"]}
                  description="AI 챗봇 프론트엔드 개발. SOLID 원칙 기반 모듈화된 아키텍처 구축, 상담 요청 확인 및 고객 연락처 관리 시스템 구현, 음성인식 기반 UX 개발."
                  isSpecialProject={true}
                  isDarkTheme={isDarkTheme}
                />
                <ProjectItem
                  name="프레스 핸들러 통합 프로젝트"
                  period="2021.10 ~ 2024.06"
                  technologies={["C#", ".NET", "WinForm", "MSSQL"]}
                  description="공장 자동화 장비 개발. 멀티쓰레드 기반 축 제어, 안전한 Motion 시퀀스 통일, MES 시스템 적용, 하드웨어 통신 구현."
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer isDarkTheme={isDarkTheme} />
      
      <div className="fixed bottom-8  right-1/2 z-50 translate-x-1/2 flex space-x-4">
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

      <button
        onClick={toggleTheme}
        className={`fixed top-8 right-8 z-50 text-4xl rounded-full shadow-lg transition-colors p-2 '}`}
      >
        <i className={`fas fa-moon ${isDarkTheme ? 'text-white' : 'text-black'}`}></i>
      </button>
      
      <style jsx>{`  
        .stars-container {
          z-index: 0;
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
    </div>
  )
}
