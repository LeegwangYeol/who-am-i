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

const TECH_STACK: Array<{ name: string; isMain: boolean }> = [
  { name: ".NET", isMain: true },
  { name: "C#", isMain: true },
  { name: "TypeScript", isMain: true },
  { name: "Next.js", isMain: true },
  { name: "React", isMain: true },
  { name: "JavaScript", isMain: true },
  { name: "Tailwind", isMain: true },
  { name: "Node.js", isMain: false },
  { name: "Supabase", isMain: false },
  { name: "PostgreSQL", isMain: false },
  { name: "MySQL", isMain: false },
  { name: "Oracle", isMain: false },
  { name: "Sass", isMain: false },
  { name: "HTML5", isMain: false },
  { name: "CSS3", isMain: false },
  { name: "GitHub", isMain: false },
  { name: "Jira", isMain: false },
  { name: "LLM", isMain: false },
  { name: "OpenAI API", isMain: false },
  { name: "Anthropic API", isMain: false },
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
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 reveal-up">
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
                <div className={`${glass} rounded-2xl shadow-md p-6 md:p-8`}>
                  <p
                    className={`text-xs uppercase tracking-[0.2em] mb-2 ${textMuted}`}
                  >
                    {t("hero.eyebrow")}
                  </p>
                  <h2
                    className={`text-3xl md:text-4xl font-bold mb-1 ${textHeading}`}
                  >
                    {t("hero.name")}{" "}
                    <span className={textMuted}>· {t("hero.nameLatin")}</span>
                  </h2>
                  <p className={`text-base md:text-lg ${textBody} mb-4`}>
                    {t("hero.role")}
                  </p>
                  <p
                    className={`${textBody} text-balance whitespace-break-spaces leading-relaxed`}
                  >
                    {t("hero.summary")}
                  </p>
                </div>
              </div>
            </div>

            {/* Career */}
            <section
              className={`mt-12 ${glass} rounded-2xl shadow-md p-6 md:p-8 reveal-up reveal-delay-1`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-6 heading-accent`}
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
              className={`mt-12 ${glass} rounded-2xl shadow-md p-6 md:p-8 reveal-up reveal-delay-2`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-6 heading-accent`}
              >
                {t("section.techStack")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map(tech => (
                  <span
                    key={tech.name}
                    className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${
                      tech.isMain
                        ? isDarkTheme
                          ? "bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/30"
                          : "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20"
                        : isDarkTheme
                          ? "bg-white/10 text-gray-200 border border-white/10"
                          : "bg-white/60 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section
              className={`mt-12 ${glass} rounded-2xl shadow-md p-6 md:p-8 reveal-up reveal-delay-3`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-6 heading-accent`}
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
              className={`mt-12 ${glass} rounded-2xl shadow-md p-6 md:p-8 reveal-up reveal-delay-4`}
            >
              <h2
                className={`text-2xl md:text-3xl ${textHeading} font-bold mb-6 heading-accent`}
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
