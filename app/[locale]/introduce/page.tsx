"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import PostCard from "@/app/components/post-card"
import { useThemeStore } from "@/store/theme"
import LeeGwangYeol from "@/app/components/name"

type LikeKey = "reason" | "code" | "motive" | "hardware" | "goal" | "dream"

type PostKey =
  | "challenge"
  | "future"
  | "overcome"
  | "hardware"
  | "quality"
  | "dream"

const POSTS: Array<{
  id: number
  postKey: PostKey
  categoryKey: "values" | "competencies"
  likeKey: LikeKey
}> = [
  { id: 1, postKey: "challenge", categoryKey: "values", likeKey: "reason" },
  { id: 2, postKey: "future", categoryKey: "values", likeKey: "code" },
  { id: 3, postKey: "overcome", categoryKey: "competencies", likeKey: "motive" },
  { id: 4, postKey: "hardware", categoryKey: "competencies", likeKey: "hardware" },
  { id: 5, postKey: "quality", categoryKey: "competencies", likeKey: "goal" },
  { id: 6, postKey: "dream", categoryKey: "competencies", likeKey: "dream" },
]

export default function IntroducePage() {
  const { isDarkTheme } = useThemeStore()
  const t = useTranslations("introduce")
  const [likes, setLikes] = useState<Record<LikeKey, number>>({
    reason: 124,
    motive: 89,
    dream: 156,
    goal: 112,
    hardware: 130,
    code: 105,
  })

  const handleLike = (post: LikeKey) => {
    setLikes(prev => ({ ...prev, [post]: prev[post] + 1 }))
  }

  const glass = isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
  const textHeading = isDarkTheme ? "text-white" : "text-gray-900"
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-600"

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-app-dark" : "bg-app-light"
      } relative pt-20`}
    >
      <header className={`${glass} shadow`}>
        <div className="max-w-7xl h-52 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">{t("h1")}</h1>
          <LeeGwangYeol />
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 pt-14 pb-4 reveal-up">
        <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${textMuted}`}>
          {t("eyebrow")}
        </p>
        <h2
          className={`text-3xl md:text-4xl font-bold ${textHeading} heading-accent`}
        >
          {t("title")}
        </h2>
        <p className={`mt-4 leading-relaxed ${textMuted}`}>{t("subtitle")}</p>
      </section>

      <main
        className={`max-w-2xl mt-8 mx-auto px-2 sm:px-6 lg:px-8 ${glass} rounded-2xl shadow-md reveal-up reveal-delay-1`}
      >
        <div className="px-4 py-8 sm:px-0 space-y-8">
          {POSTS.map(post => (
            <PostCard
              key={post.id}
              userName={t("userName")}
              category={t(`category.${post.categoryKey}`)}
              categoryValue={t(`posts.${post.postKey}.categoryValue`)}
              likeKey={post.likeKey}
              content={t(`posts.${post.postKey}.content`)}
              highlights={[]}
              postedTime={t(`posts.${post.postKey}.postedTime`)}
              onLike={handleLike}
              likes={likes}
              isDarkTheme={isDarkTheme}
              likesLabel={t("likes", { count: likes[post.likeKey] })}
              actionLabels={{
                like: t("actions.like"),
                comment: t("actions.comment"),
                share: t("actions.share"),
                bookmark: t("actions.bookmark"),
              }}
            />
          ))}
        </div>
      </main>

      <div className="h-16" />
    </div>
  )
}
