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

// 📸 HOW TO ADD YOUR LOCAL PHOTOS:
// 
// 1. Add your photos to the 'public/images/' folder
// 2. Use descriptive names like: photo1.jpg, memory1.png, etc.
// 3. Update the src paths below to match your filenames
// 4. Supported formats: .jpg, .jpeg, .png, .webp
// 
// Example: If you put 'first-date.jpg' in public/images/
// Use: src: '/images/first-date.jpg'
//
// ✅ BENEFITS: Faster loading, no external dependencies, works offline!

const photos: Photo[] = [
  {
    id: 1,
    src: '/images/photo1.jpg',
    alt: 'Our first memory together',
    caption: 'The moment I knew you were special 💕'
  },
  {
    id: 2,
    src: '/images/photo2.jpg',
    alt: 'Our adventure together', 
    caption: 'Adventures are better with you 🌟'
  },
  {
    id: 3,
    src: '/images/photo3.jpg',
    alt: 'Celebrating together',
    caption: 'Every celebration is brighter with you ✨'
  },
  {
    id: 4,
    src: '/images/photo4.jpg',
    alt: 'Quiet moments',
    caption: 'Perfect moments in perfect company 🥰'
  },
  {
    id: 5,
    src: '/images/photo5.jpg',
    alt: 'Sharing laughter',
    caption: 'Your laughter is my favorite sound 😊'
  },
  {
    id: 6,
    src: '/images/photo6.jpg',
    alt: 'Forever together',
    caption: 'Here\'s to forever with you 💍'
  }
]

export default function PhotoGallery() {
  // Removed carousel state and functions since we're showing all photos vertically

  return (
    <div className="w-full min-h-screen bg-gradient-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Section title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script text-center text-contrast-dark mb-6 sm:mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Beautiful Memories
        </motion.h2>

        {/* Vertical Photo Gallery */}
        <div className="space-y-8 sm:space-y-12">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="bg-white rounded-3xl shadow-strong overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain bg-gray-50"
                  priority={index === 0}
                />
              </div>
              
              <div className="p-6 sm:p-8 bg-gradient-to-r from-primary-cream to-primary-mint">
                <p className="text-lg sm:text-xl md:text-2xl text-text-medium text-center italic font-light leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery info */}
        <motion.p
          className="text-center text-text-medium mt-8 sm:mt-12 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {photos.length} precious memories of our beautiful journey together 💕
        </motion.p>
      </div>
    </div>
  )
}
