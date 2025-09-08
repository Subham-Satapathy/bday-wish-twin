'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WelcomeSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-screen bg-gradient-sunset overflow-hidden">
      {/* Background floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-white/70 heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45, 45, 45],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Large decorative hearts */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-accent-rose/80 heart"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [45, 45, 45],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-12 h-12 bg-white/80 heart"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [45, 45, 45],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        />

        {/* Welcome message */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-script text-white mb-6 text-shadow-lg"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          Happy Birthday, Twin! 🎉
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 max-w-4xl leading-relaxed text-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          You are the light of my life, and today is all about you ❤️
        </motion.p>

        {/* Animated subtitle */}
        <motion.div
          className="text-lg md:text-xl text-white/90 italic mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Scroll down for a journey through our love story...
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">Scroll</p>
        </motion.div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
