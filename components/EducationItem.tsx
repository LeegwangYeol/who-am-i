"use client"

interface EducationItemProps {
  institution: string
  degree: string
  period?: string
  description?: string
  link?: string
  isDarkTheme?: boolean
}

export default function EducationItem({
  institution,
  degree,
  period,
  description,
  link,
  isDarkTheme = false,
}: EducationItemProps) {
  return (
    <article
      className={`${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } p-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5`}
    >
      <h3
        className={`text-lg font-semibold ${
          isDarkTheme ? "text-white" : "text-gray-900"
        }`}
      >
        {institution}
      </h3>
      <p
        className={`text-sm mt-1 ${
          isDarkTheme ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {degree}
      </p>
      {period && (
        <p
          className={`text-xs font-mono mt-1 ${
            isDarkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {period}
        </p>
      )}
      {description && (
        <p
          className={`mt-2 text-sm ${
            isDarkTheme ? "text-gray-300" : "text-gray-600"
          } text-pretty`}
        >
          {description}
        </p>
      )}
      {link && (
        <a
          href={link}
          className="text-indigo-500 hover:underline text-sm mt-2 inline-block"
        >
          자세히 보기 →
        </a>
      )}
    </article>
  )
}
