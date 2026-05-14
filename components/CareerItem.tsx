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
      className={`${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } p-5 rounded-xl transition-transform hover:-translate-y-0.5`}
    >
      <header className="mb-2">
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
          className={`text-xs mt-1 font-mono ${
            isDarkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {period}
        </p>
      </header>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          isDarkTheme ? "text-gray-200" : "text-gray-700"
        } text-balance whitespace-pre-line`}
      >
        {description}
      </p>
    </article>
  )
}
