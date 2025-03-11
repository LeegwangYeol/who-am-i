"use client"

// import Link from "next/link"

interface EducationItemProps {
  institution: string
  degree: string
  period?: string
  description?: string
  link?: string
  isDarkTheme?: boolean
}

export default function EducationItem({ institution, degree, period, description, link, isDarkTheme = false }: EducationItemProps) {
  return (
    <div className={`mb-4 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-6 rounded-lg shadow-md`}>
      <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{institution}</h4>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>{degree}</p>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{period}</p>
      {description && <p className={`mt-1 text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-pretty`}>{description}</p>}
      {link && (
        <a href={link} className="text-blue-500 hover:underline text-sm">
          자세히 보기
        </a>
      )}
    </div>
  )
}
