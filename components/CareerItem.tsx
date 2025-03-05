interface CareerItemProps {
    company: string
    position: string
    period: string
    description: string
  }
  
  export default function CareerItem({ company, position, period, description }: CareerItemProps) {
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold">
          {position} at {company}
        </h4>
        <p className="text-sm text-gray-600 text-balance whitespace-pre-line">{period}</p>
        <p className="mt-2 text-balance whitespace-pre-line">{description}</p>
      </div>
    )
  }
  
  