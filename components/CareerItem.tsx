interface CareerItemProps {
  company: string
  position: string
  period: string
  description: string
  isDarkTheme?: boolean
}

export default function CareerItem({
  company,
  position,
  period,
  description,
  isDarkTheme = false,
}: CareerItemProps) {
  return (
    <article
      className={`spotlight relative overflow-hidden ${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } p-6 pl-7 rounded-xl transition-transform hover:-translate-y-0.5`}
    >
      {/* 좌측 그라데이션 accent bar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-pink-500"
      />
      <header className="mb-3">
        <h3
          className={`text-lg font-semibold leading-snug ${
            isDarkTheme ? "text-white" : "text-gray-900"
          }`}
        >
          {position}
          <span className={isDarkTheme ? "text-gray-400" : "text-gray-500"}>
            {" "}
            @ {company}
          </span>
        </h3>
        <p
          className={`text-xs mt-1.5 font-mono ${
            isDarkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {period}
        </p>
      </header>
      <p
        className={`mt-3 text-sm leading-loose ${
          isDarkTheme ? "text-gray-200" : "text-gray-700"
        } text-balance whitespace-pre-line`}
      >
        {description}
      </p>
    </article>
  )
}
