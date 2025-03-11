interface CareerItemProps {
    company: string
    position: string
    period: string
    description: string
    isDarkTheme?: boolean
  }
  
  export default function CareerItem({ company, position, period, description, isDarkTheme = false }: CareerItemProps) {
    return (
      <div className={`mb-4 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} p-4 rounded-lg`}>
        <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>
          {position} at {company}
        </h4>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} text-balance whitespace-pre-line`}>{period}</p>
        <p className={`mt-2 ${isDarkTheme ? 'text-white' : 'text-black'} text-balance whitespace-pre-line`}>{description}</p>
      </div>
    )
  }