'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SurpriseSection() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  const messages = [
    "Thank you for being the most amazing person in my life!",
    "I love you forever ❤️",
    "Happy Birthday, Twin! 🎉✨"
  ]

  // Animate through messages
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(prev => prev + 1)
      } else {
        setShowHeart(true)
        setTimeout(() => setShowFireworks(true), 1000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentMessageIndex, messages.length])

  // Create firework particles
  const createFirework = (index: number) => {
    const colors = ['#FFB6C1', '#E6E6FA', '#FFC0CB', '#DDA0DD', '#F0E68C', '#98FB98']
    return {
      id: index,
      color: colors[index % colors.length],
      delay: Math.random() * 2,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-sunset overflow-hidden flex flex-col">
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
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
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const firework = createFirework(i)
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${firework.x}%`,
                  top: `${firework.y}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  delay: firework.delay,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 2,
                }}
              >
                {/* Firework burst */}
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: firework.color,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((j * 30) * Math.PI / 180) * 50,
                      y: Math.sin((j * 30) * Math.PI / 180) * 50,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: firework.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Animated messages */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              className="mb-8"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100 
              }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-script text-white leading-tight text-center">
                {messages[currentMessageIndex]}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Subtle heart decoration */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💕
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final celebration text */}
          {showFireworks && (
            <motion.div
              className="space-y-6 sm:space-y-8 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-contrast-light font-light text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                You make every day feel like a celebration! ✨
              </motion.p>
              
              <motion.div
                className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 text-2xl sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {['🎊', '🎉', '💕', '🎈', '✨'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-contrast-light italic text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Here&apos;s to many more beautiful years together! 🥂
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Subtle floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/25 heart"
              style={{
                left: `${20 + i * 15}%`,
                top: `${80 + Math.random() * 20}%`,
              }}
              animate={{
                y: [-20, -300],
                rotate: [45, 45],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll to top hint */}
      {showFireworks && (
        <motion.div
          className="relative pb-8 pt-4 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Relive the magic again
          </motion.button>
        </motion.div>
      )}

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 w-8 h-8 bg-white/15 heart opacity-50" />
      <div className="absolute top-8 right-8 w-6 h-6 bg-white/15 heart opacity-60" />
      <div className="absolute bottom-16 left-12 w-5 h-5 bg-white/15 heart opacity-40" />
      <div className="absolute bottom-20 right-16 w-7 h-7 bg-white/15 heart opacity-50" />
    </div>
  )
}
