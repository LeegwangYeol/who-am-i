import Image from "next/image"
import Link from "next/link"

interface ProjectItemProps {
  title: string
  description: string
  imageUrl: string
  link: string
  type: "project" | "blog"
}

export default function ProjectItem({ title, description, imageUrl, link, type }: ProjectItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        width={400}
        height={225}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={link}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {type === "project" ? "View Project" : "Read Blog Post"}
        </Link>
      </div>
    </div>
  )
}

