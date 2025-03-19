"use client"

import { useThemeStore } from "@/store/theme"

interface FooterProps {
}

export default function Footer() {
  const { isDarkTheme } = useThemeStore();

  return (
    <footer className={`w-full flex flex-row justify-center items-center p-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="container mx-auto items-center w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <div className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-4 rounded-lg flex flex-col space-y-2`}>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill={isDarkTheme ? "white" : "black"}
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 프론트엔드 웹 개발 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:bpscokr003@naver.com" className="text-blue-500 hover:underline">
                <span className={`${isDarkTheme ? 'text-white' : 'text-black'} overflow-hidden whitespace-nowrap hover:overflow-visible hover:whitespace-normal`}>
                  bpscokr003@naver.com
                </span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ${isDarkTheme ? 'text-white' : 'text-black'}"
                viewBox="0 0 20 20"
                fill={isDarkTheme ? "white" : "black"}
              >
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className={`${isDarkTheme ? 'text-white' : 'text-black'} overflow-hidden whitespace-nowrap hover:overflow-visible hover:whitespace-normal`}>
                경기 수원시
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3`}>
            <a href="https://github.com/LeegwangYeol" className="hover:underline flex items-center" style={{ color: isDarkTheme ? 'white' : 'black' }}>
              <i className="fab fa-github mr-2" style={{ color: isDarkTheme ? 'white' : 'black' }}></i> GitHub
            </a>
            <a href="https://velog.io/@kelog123" className="hover:underline flex items-center" style={{ color: isDarkTheme ? 'white' : 'black' }}>
              <i aria-hidden="true" className="fab fa-grav mr-2" style={{ color: isDarkTheme ? 'white' : 'black' }}></i> Velog
            </a>
            <a href="https://instagram.com" className="hover:underline flex items-center" style={{ color: isDarkTheme ? 'white' : 'black' }}>
              <i className="fab fa-instagram mr-2" style={{ color: isDarkTheme ? 'white' : 'black' }}></i> Instagram
            </a>
            <a href="https://www.youtube.com/@lolollol2379" className="hover:underline flex items-center" style={{ color: isDarkTheme ? 'white' : 'black' }}>
              <i className="fab fa-youtube mr-2" style={{ color: isDarkTheme ? 'white' : 'black' }}></i> YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
