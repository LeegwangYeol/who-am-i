import Image from "next/image"
import Link from "next/link"

interface ProjectItemProps {
  name: string
  image: string
  period: string
  technologies: string[]
  repoUrl: string
  detailUrl: string
  isSpecialProject?: boolean
}

export default function ProjectItem({
  name,
  image,
  period,
  technologies,
  repoUrl,
  detailUrl,
  isSpecialProject,
}: ProjectItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={detailUrl}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{period}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={repoUrl} className="text-blue-500 hover:underline">
            Repository
          </Link>
          {isSpecialProject && (
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">Special Project</span>
          )}
        </div>
      </div>
    </div>
  )
}

