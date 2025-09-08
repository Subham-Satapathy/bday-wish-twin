'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeSection from '@/components/WelcomeSection'
import PhotoGallery from '@/components/PhotoGallery'
import CelebrateSection from '@/components/CelebrateSection'
import AudioSection from '@/components/AudioSection'
import LoveLetterSection from '@/components/LoveLetterSection'
import HeartGameSection from '@/components/HeartGameSection'
import SurpriseSection from '@/components/SurpriseSection'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Handle scroll spy for section navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const element = section as HTMLElement
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading screen component
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative">
      {/* Navigation dots for desktop */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <nav className="flex flex-col space-y-4">
          {['Welcome', 'Memories', 'Celebrate', 'Message', 'Letter', 'Game', 'Surprise'].map((section, index) => (
            <button
              key={section}
              onClick={() => {
                const element = document.getElementById(section.toLowerCase())
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'bg-primary-pink scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </nav>
      </div>

      {/* Mobile navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <button
                key={index}
                onClick={() => {
                  const sections = ['welcome', 'memories', 'celebrate', 'message', 'letter', 'game', 'surprise']
                  const element = document.getElementById(sections[index])
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSection === index
                    ? 'bg-primary-pink scale-125'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <section id="welcome" className="section">
            <WelcomeSection />
          </section>

          {/* Photo Gallery Section */}
          <section id="memories" className="section">
            <PhotoGallery />
          </section>

          {/* Celebrate Section */}
          <section id="celebrate" className="section">
            <CelebrateSection />
          </section>

          {/* Audio Message Section */}
          <section id="message" className="section">
            <AudioSection />
          </section>

          {/* Love Letter Section */}
          <section id="letter" className="section">
            <LoveLetterSection />
          </section>

          {/* Heart Game Section */}
          <section id="game" className="section">
            <HeartGameSection />
          </section>

          {/* Final Surprise Section */}
          <section id="surprise" className="section">
            <SurpriseSection />
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
