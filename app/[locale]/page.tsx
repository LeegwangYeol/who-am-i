"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import CareerItem from "@/components/CareerItem"
import EducationItem from "@/components/EducationItem"
import ProjectItem from "@/components/ProjectItem"
import Footer from "@/components/Footer"
import FixedButtons from "@/components/FixedButtons"
import { useThemeStore } from "@/store/theme"
import LeeGwangYeol from "@/app/components/name"

type TechCategory = "frontend" | "language" | "database" | "ai" | "tools"

const TECH_STACK: Array<{ name: string; isMain: boolean; cat: TechCategory }> = [
  // Frontend
  { name: "Next.js", isMain: true, cat: "frontend" },
  { name: "React", isMain: true, cat: "frontend" },
  { name: "Tailwind", isMain: true, cat: "frontend" },
  { name: "HTML5", isMain: false, cat: "frontend" },
  { name: "CSS3", isMain: false, cat: "frontend" },
  { name: "Sass", isMain: false, cat: "frontend" },

  // Languages & Runtime
  { name: "TypeScript", isMain: true, cat: "language" },
  { name: "JavaScript", isMain: true, cat: "language" },
  { name: "C#", isMain: true, cat: "language" },
  { name: ".NET", isMain: true, cat: "language" },
  { name: "Node.js", isMain: false, cat: "language" },

  // Database
  { name: "Supabase", isMain: false, cat: "database" },
  { name: "PostgreSQL", isMain: false, cat: "database" },
  { name: "MySQL", isMain: false, cat: "database" },
  { name: "Oracle", isMain: false, cat: "database" },

  // AI
  { name: "LLM", isMain: false, cat: "ai" },
  { name: "OpenAI API", isMain: false, cat: "ai" },
  { name: "Anthropic API", isMain: false, cat: "ai" },

  // Tools
  { name: "GitHub", isMain: false, cat: "tools" },
  { name: "Jira", isMain: false, cat: "tools" },
]

const TECH_CATEGORIES: TechCategory[] = [
  "frontend",
  "language",
  "database",
  "ai",
  "tools",
]

const CAREER_KEYS = ["wintech2025", "poul", "wintech2021", "enitec"] as const
const EDU_KEYS = ["hufs", "kosea"] as const

export default function ProfilePage() {
  const { isDarkTheme } = useThemeStore()
  const t = useTranslations()

  const textHeading = isDarkTheme ? "text-white" : "text-gray-900"
  const textBody = isDarkTheme ? "text-gray-100" : "text-gray-800"
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-600"
  const glass = isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-app-dark" : "bg-app-light"
      } relative pt-20`}
    >
      <header className={`${glass} shadow`}>
        <div className="max-w-7xl h-52 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">{t("site.h1")}</h1>
          <LeeGwangYeol />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-6 sm:px-0">
            {/* Hero / Introduction */}
            <div id="hero" className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 reveal-up scroll-mt-24">
              <div className={`flex-shrink-0 p-3 ${glass} rounded-3xl`}>
                <Image
                  src="/my-image-600.jpg"
                  alt={t("hero.imageAlt")}
                  width={300}
                  height={300}
                  sizes="(min-width: 768px) 300px, 240px"
                  className="rounded-2xl"
                  priority
                />
              </div>
              <div className="flex-grow w-full">
                <div className={`${glass} rounded-2xl shadow-md p-7 md:p-10`}>
                  <p
                    className={`text-xs uppercase tracking-[0.2em] mb-3 ${textMuted}`}
                  >
                    {t("hero.eyebrow")}
                  </p>
                  <h2
                    className={`text-3xl md:text-5xl font-bold mb-2 ${textHeading} tracking-tight`}
                  >
                    <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                      {t("hero.name")}
                    </span>{" "}
                    <span className={`${textMuted} font-medium`}>
                      · {t("hero.nameLatin")}
                    </span>
                  </h2>
                  <p
                    className={`text-base md:text-xl ${textBody} mb-6 font-medium`}
                  >
                    {t("hero.role")}
                  </p>
                  <p
                    className={`${textBody} text-balance whitespace-break-spaces leading-loose`}
                  >
                    {t("hero.summary")}
                  </p>
                </div>
              </div>
            </div>

            {/* Career */}
            <section
              id="career"
              className={`mt-16 ${glass} rounded-2xl shadow-md p-7 md:p-10 reveal-up reveal-delay-1 scroll-mt-24`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-8 heading-accent`}
              >
                {t("section.career")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CAREER_KEYS.map(key => (
                  <CareerItem
                    key={key}
                    company={t(`career.${key}.company`)}
                    position={t(`career.${key}.position`)}
                    period={t(`career.${key}.period`)}
                    description={t(`career.${key}.description`)}
                    isDarkTheme={isDarkTheme}
                  />
                ))}
              </div>
            </section>

            {/* Technology Stack */}
            <section
              id="stack"
              className={`mt-16 ${glass} rounded-2xl shadow-md p-7 md:p-10 reveal-up reveal-delay-2 scroll-mt-24`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-8 heading-accent`}
              >
                {t("section.techStack")}
              </h2>
              <div className="space-y-5">
                {TECH_CATEGORIES.map(cat => {
                  const items = TECH_STACK.filter(t2 => t2.cat === cat)
                  if (items.length === 0) return null
                  return (
                    <div key={cat}>
                      <h3
                        className={`text-xs uppercase tracking-[0.18em] mb-2 ${textMuted}`}
                      >
                        {t(`techCategory.${cat}`)}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map(tech => (
                          <span
                            key={tech.name}
                            className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${
                              tech.isMain
                                ? isDarkTheme
                                  ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold shadow-md shadow-indigo-500/30"
                                  : "bg-gradient-to-br from-indigo-600 to-pink-600 text-white font-semibold shadow-md shadow-indigo-600/20"
                                : isDarkTheme
                                  ? "bg-white/10 text-gray-200 border border-white/10"
                                  : "bg-white/60 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Education */}
            <section
              id="education"
              className={`mt-16 ${glass} rounded-2xl shadow-md p-7 md:p-10 reveal-up reveal-delay-3 scroll-mt-24`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-8 heading-accent`}
              >
                {t("section.education")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EDU_KEYS.map(key => (
                  <EducationItem
                    key={key}
                    institution={t(`education.${key}.institution`)}
                    degree={t(`education.${key}.degree`)}
                    period={t(`education.${key}.period`)}
                    description={t(`education.${key}.description`)}
                    isDarkTheme={isDarkTheme}
                  />
                ))}
              </div>
            </section>

            {/* Projects */}
            <section
              id="projects"
              className={`mt-16 ${glass} rounded-2xl shadow-md p-7 md:p-10 reveal-up reveal-delay-4 scroll-mt-24`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-8 heading-accent`}
              >
                {t("section.projects")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectItem
                  name={t("projects.ham.name")}
                  period={t("projects.ham.period")}
                  technologies={["C#", ".NET", "WPF", "MVVM"]}
                  description={t("projects.ham.description")}
                  isDarkTheme={isDarkTheme}
                  featuredLabel={t("projects.featured")}
                  githubLabel={t("projects.github")}
                  detailsLabel={t("projects.details")}
                />
                <ProjectItem
                  name={t("projects.llami.name")}
                  period={t("projects.llami.period")}
                  technologies={[
                    "Next.js",
                    "TypeScript",
                    "Supabase",
                    "ElysiaJS",
                  ]}
                  description={t("projects.llami.description")}
                  isSpecialProject
                  isDarkTheme={isDarkTheme}
                  featuredLabel={t("projects.featured")}
                  githubLabel={t("projects.github")}
                  detailsLabel={t("projects.details")}
                />
                <ProjectItem
                  name={t("projects.press.name")}
                  period={t("projects.press.period")}
                  technologies={["C#", ".NET", "WinForms", "MSSQL"]}
                  description={t("projects.press.description")}
                  isDarkTheme={isDarkTheme}
                  featuredLabel={t("projects.featured")}
                  githubLabel={t("projects.github")}
                  detailsLabel={t("projects.details")}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <FixedButtons />
    </div>
  )
}
