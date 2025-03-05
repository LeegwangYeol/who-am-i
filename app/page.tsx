"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import CareerItem from "../components/CareerItem"
import EducationItem from "../components/EducationItem"
import ProjectItem from "../components/ProjectItem"

export default function ProfilePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            홍길동 <span className="text-xl text-gray-600">/ Hong Gildong</span>
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <Image
                src="/placeholder.svg?height=250&width=250&text=Your+Photo"
                alt="Profile Picture"
                width={250}
                height={250}
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Experienced Automation Robotics Engineer specializing in autonomous robots and factory automation.
                  Passionate about leveraging cutting-edge technology to improve manufacturing processes and drive
                  innovation in the field of robotics.
                </p>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:your.email@example.com" className="text-blue-500 hover:underline">
                    your.email@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link href="https://github.com/LeegwangYeol" className="text-blue-500 hover:underline">
              GitHub
            </Link>
            <Link href="https://yourblog.com" className="text-blue-500 hover:underline">
              Blog
            </Link>
            <Link href="/resume.pdf" className="text-blue-500 hover:underline">
              Resume
            </Link>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Career</h2>
            <CareerItem
              company="TechCorp"
              position="Senior Robotics Engineer"
              period="2018 - Present"
              description="Led the development of autonomous robot systems for factory automation, resulting in a 30% increase in production efficiency."
            />
            <CareerItem
              company="InnoRobotics"
              position="Robotics Software Developer"
              period="2015 - 2018"
              description="Developed control algorithms for collaborative robots, enhancing human-robot interaction in manufacturing environments."
            />
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {["Python", "C++", "ROS", "Machine Learning", "Computer Vision", "PLC Programming", "MATLAB"].map(
                (tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ),
              )}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <EducationItem
              institution="Seoul National University"
              degree="Ph.D. in Robotics and Automation"
              period="2010 - 2015"
              link="/education/snu-phd"
            />
            <EducationItem
              institution="Korea Advanced Institute of Science and Technology (KAIST)"
              degree="M.S. in Mechanical Engineering"
              period="2008 - 2010"
              link="/education/kaist-ms"
            />
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectItem
                name="Autonomous Factory Robot"
                image="/placeholder.svg?height=225&width=400&text=Factory+Robot"
                period="2019 - 2020"
                technologies={["ROS", "C++", "Computer Vision"]}
                repoUrl="https://github.com/yourusername/factory-robot"
                detailUrl="/projects/factory-robot"
                isSpecialProject={true}
              />
              <ProjectItem
                name="Collaborative Robot Arm"
                image="/placeholder.svg?height=225&width=400&text=Robot+Arm"
                period="2017 - 2018"
                technologies={["Python", "Machine Learning", "Force Control"]}
                repoUrl="https://github.com/yourusername/collab-robot-arm"
                detailUrl="/projects/collab-robot-arm"
              />
            </div>
          </section>
        </div>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}

