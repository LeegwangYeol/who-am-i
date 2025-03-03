"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import ProjectItem from "@/components/ProjectItem"

// Sample data for projects and blog posts
const items = [
  {
    title: "Autonomous Robot for Factory Automation",
    description:
      "Designed and implemented an autonomous robot system for streamlining manufacturing processes, resulting in a 30% increase in production efficiency.",
    imageUrl: "/placeholder.svg?height=225&width=400&text=Robot+Project",
    link: "https://example.com/robot-project",
    type: "project" as const,
  },
  {
    title: "Machine Learning in Robotics: A Comprehensive Guide",
    description:
      "An in-depth blog post exploring the applications of machine learning in modern robotics, including case studies and future trends.",
    imageUrl: "/placeholder.svg?height=225&width=400&text=ML+in+Robotics",
    link: "https://example.com/ml-robotics-blog",
    type: "blog" as const,
  },
  // Add more projects and blog posts here
]

export default function ProfilePage() {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 4))
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 })
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [])

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting) {
      loadMore()
    }
  }

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const currentLength = visibleItems.length
      const nextItems = items.slice(currentLength, currentLength + 2)
      setVisibleItems((prevItems) => [...prevItems, ...nextItems])
      setLoading(false)
    }, 1000) // Simulating API call
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=250&width=250&text=Your+Photo"
                  alt="Profile Picture"
                  width={250}
                  height={250}
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Your Name</h2>
                <p className="mt-1 text-gray-600">Automation Robotics Engineer</p>
                <p className="mt-2 text-gray-500">
                  Experienced engineer specializing in autonomous robots and factory automation. Passionate about
                  leveraging cutting-edge technology to improve manufacturing processes and drive innovation in the
                  field of robotics.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
              <p className="text-gray-600 mb-4">
                With over X years of experience in the field of automation and robotics, I have developed a deep
                understanding of robotic systems, control algorithms, and machine learning applications in industrial
                settings. My work focuses on creating efficient, intelligent, and adaptable robotic solutions that
                enhance productivity and safety in manufacturing environments.
              </p>
              <p className="text-gray-600 mb-4">
                I am particularly interested in the intersection of artificial intelligence and robotics, constantly
                exploring new ways to implement smart decision-making capabilities in autonomous systems. My expertise
                spans across various domains, including sensor integration, computer vision, path planning, and
                human-robot collaboration.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Projects and Blog Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleItems.map((item, index) => (
                  <ProjectItem key={index} {...item} />
                ))}
              </div>
              <div ref={loader} className="text-center py-4 mt-4">
                {loading && <p className="text-gray-600">Loading more...</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

