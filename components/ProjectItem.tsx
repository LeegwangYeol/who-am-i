import Image from "next/image"
import Link from "next/link"

interface ProjectItemProps {
  name: string
  period: string
  technologies: string[]
  description: string
  image?: string
  repoUrl?: string
  detailUrl?: string
  isSpecialProject?: boolean
  isDarkTheme?: boolean
  featuredLabel?: string
  githubLabel?: string
  detailsLabel?: string
}

export default function ProjectItem({
  name,
  period,
  technologies,
  description,
  image,
  repoUrl,
  detailUrl,
  isSpecialProject = false,
  isDarkTheme = false,
  featuredLabel = "Featured",
  githubLabel = "GitHub →",
  detailsLabel = "자세히 보기 →",
}: ProjectItemProps) {
  return (
    <article
      className={`${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-0.5 ${
        isSpecialProject
          ? "ring-2 ring-indigo-500/60 ring-offset-2 ring-offset-transparent"
          : ""
      }`}
    >
      {image && (
        <div className="relative h-56">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className={`text-lg md:text-xl font-semibold ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            {name}
          </h3>
          {isSpecialProject && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500 text-white font-semibold">
              {featuredLabel}
            </span>
          )}
        </div>
        <p
          className={`text-xs font-mono mb-3 ${
            isDarkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {period}
        </p>
        <p
          className={`text-sm leading-relaxed mb-4 ${
            isDarkTheme ? "text-gray-200" : "text-gray-700"
          } text-balance whitespace-pre-line`}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {technologies.map(tech => (
            <span
              key={tech}
              className={`${
                isDarkTheme
                  ? "bg-white/10 text-gray-200 border border-white/10"
                  : "bg-white/70 text-gray-700 border border-gray-200"
              } text-xs px-2 py-0.5 rounded-md font-mono`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline text-sm"
            >
              {githubLabel}
            </a>
          )}
          {detailUrl && (
            <Link
              href={detailUrl}
              className="text-indigo-500 hover:underline text-sm"
            >
              {detailsLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
