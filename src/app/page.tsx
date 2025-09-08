'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeSection from '@/components/WelcomeSection'
import PhotoGallery from '@/components/PhotoGallery'
import CelebrateSection from '@/components/CelebrateSection'
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
          {['Welcome', 'Memories', 'Celebrate', 'Letter', 'Game', 'Surprise'].map((section, index) => (
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


      {/* Main content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <section id="welcome">
            <WelcomeSection />
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Photo Gallery Section */}
          <section id="memories">
            <PhotoGallery />
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary-pink/30 to-transparent"></div>

          {/* Celebrate Section */}
          <section id="celebrate">
            <CelebrateSection />
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent-rose/30 to-transparent"></div>

          {/* Love Letter Section */}
          <section id="letter">
            <LoveLetterSection />
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent"></div>

          {/* Heart Game Section */}
          <section id="game">
            <HeartGameSection />
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Final Surprise Section */}
          <section id="surprise">
            <SurpriseSection />
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
