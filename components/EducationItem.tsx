"use client"

// import Link from "next/link"

interface EducationItemProps {
  institution: string
  degree: string
  period?: string
  description?: string
  link?: string
}

export default function EducationItem({ institution, degree, period, description, link }: EducationItemProps) {
  return (
    <div className="mb-4  bg-white border-2 p-6  border-blue-200 mg rounded-lg shadow-md">
      <h4 className="text-lg font-semibold">{institution}</h4>
      <p className="text-sm text-gray-600">{degree}</p>
      <p className="text-sm text-gray-500">{period}</p>
      {description && <p className="mt-1 text-sm text-gray-600 text-pretty">{description}</p>}
      {link && (
        <a href={link} className="text-blue-500 hover:underline text-sm">
          자세히 보기
        </a>
      )}
    </div>
  )
}
