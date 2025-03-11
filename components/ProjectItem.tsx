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
}: ProjectItemProps) {
  return (
    <div className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} rounded-lg shadow-md overflow-hidden ${isSpecialProject ? 'border-2 border-blue-500' : ''}`}>
      {image && (
        <div className="relative h-56">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{name}</h3>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{period}</p>
        <p className={`${isDarkTheme ? 'text-white' : 'text-gray-700'} mb-4 text-balance whitespace-pre-line`}>{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className={`${isDarkTheme ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-1 text-pretty rounded`}>
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
              className="text-blue-500 hover:underline text-sm"
            >
              GitHub
            </a>
          )}
          {detailUrl && (
            <Link href={detailUrl} className="text-blue-500 hover:underline text-sm">
              자세히 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
