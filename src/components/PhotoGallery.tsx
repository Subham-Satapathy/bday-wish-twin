'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Photo {
  id: number
  src: string
  alt: string
  caption: string
}

const photos: Photo[] = [
  {
    id: 1,
    src: 'https://via.placeholder.com/600x400/FFB6C1/FFFFFF?text=Our+First+Memory',
    alt: 'Our first memory together',
    caption: 'The moment I knew you were special 💕'
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/600x400/DDA0DD/FFFFFF?text=Adventure+Together',
    alt: 'Our adventure together',
    caption: 'Adventures are better with you 🌟'
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/600x400/F0E68C/FFFFFF?text=Celebrating+Love',
    alt: 'Celebrating together',
    caption: 'Every celebration is brighter with you ✨'
  },
  {
    id: 4,
    src: 'https://via.placeholder.com/600x400/98FB98/FFFFFF?text=Quiet+Moments',
    alt: 'Quiet moments',
    caption: 'Perfect moments in perfect company 🥰'
  },
  {
    id: 5,
    src: 'https://via.placeholder.com/600x400/FFB07A/FFFFFF?text=Laughter+Joy',
    alt: 'Sharing laughter',
    caption: 'Your laughter is my favorite sound 😊'
  },
  {
    id: 6,
    src: 'https://via.placeholder.com/600x400/E6E6FA/FFFFFF?text=Forever+Love',
    alt: 'Forever together',
    caption: 'Here\'s to forever with you 💍'
  }
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextPhoto()
    } else if (isRightSwipe) {
      prevPhoto()
    }
  }

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    setIsAutoPlaying(false)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    setIsAutoPlaying(false)
  }

  const goToPhoto = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="w-full bg-gradient-secondary px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script text-center text-text-dark mb-6 sm:mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Beautiful Memories
        </motion.h2>

        {/* Gallery container */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-strong overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Photo display area */}
          <div
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 mb-4">
                  <Image
                    src={photos[currentIndex].src}
                    alt={photos[currentIndex].alt}
                    fill
                    className="object-cover rounded-xl sm:rounded-2xl shadow-medium"
                    priority={currentIndex === 0}
                  />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-medium text-center italic px-2 sm:px-4">
                  {photos[currentIndex].caption}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible z-10"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible z-10"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 py-6 bg-gradient-to-r from-primary-cream to-primary-mint">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-pink scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play control */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-medium flex items-center justify-center transition-all duration-200 focus-visible"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5 text-text-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Gallery info */}
        <motion.p
          className="text-center text-text-medium mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Swipe or use arrows to navigate • {photos.length} precious memories
        </motion.p>
      </div>
    </div>
  )
}
