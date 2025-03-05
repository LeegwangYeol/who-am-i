import Link from "next/link"

interface EducationItemProps {
  institution: string
  degree: string
  period: string
  link: string
}

export default function EducationItem({ institution, degree, period, link }: EducationItemProps) {
  return (
    <div className="mb-4">
      <Link href={link} className="text-lg font-semibold hover:underline">
        {institution}
      </Link>
      <p>{degree}</p>
      <p className="text-sm text-gray-600">{period}</p>
    </div>
  )
}

