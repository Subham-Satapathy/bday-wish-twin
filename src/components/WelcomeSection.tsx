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
      {/* Background floating hearts - very subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 heart"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [45, 45, 45],
              scale: [0.8, 1.0, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background decorative hearts - moved behind text */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-accent-rose/20 heart"
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
          className="absolute top-32 right-16 w-12 h-12 bg-white/15 heart"
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
        {/* Large background heart - very subtle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/5 heart"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [45, 45, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

        {/* Welcome message */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-script mb-4 sm:mb-6 px-2 text-center"
          style={{
            color: '#FFFFFF',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.6), 0px 0px 8px rgba(255, 182, 193, 0.5)',
            fontWeight: 700
          }}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          Happy Birthday, <span style={{ 
            color: '#FFFFFF', 
            textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 0px 0px 12px rgba(255, 182, 193, 0.8)',
            fontWeight: 800,
            letterSpacing: '2px'
          }}>Twin</span>! 🎉
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 max-w-4xl leading-relaxed px-4 text-center"
          style={{
            color: '#FFFFFF',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.6)',
            fontWeight: 600
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          You are the light of my life, and today is all about you ❤️
        </motion.p>

        {/* Animated subtitle */}
        <motion.div
          className="text-base sm:text-lg md:text-xl italic mb-8 sm:mb-12 px-6 text-center"
          style={{
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)',
            fontWeight: 500
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Scroll down for a journey through our love story...
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 sm:bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/70 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 sm:h-3 bg-white/90 rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-xs sm:text-sm mt-2 font-medium" style={{
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}>Scroll</p>
        </motion.div>

        {/* Sparkle effects - very subtle */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
