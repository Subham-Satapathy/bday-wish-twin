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
    <div className="relative w-full h-screen bg-gradient-sunset overflow-hidden flex items-center justify-center">
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
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Animated messages */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            className="mb-12"
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-script text-white leading-tight">
              {messages[currentMessageIndex]}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Giant animated heart */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="relative mx-auto mb-12"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [45, 45, 45],
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 80
              }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white heart mx-auto relative">
                {/* Heart pulsing effect */}
                <motion.div
                  className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-white/50 heart"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Sparkles around heart */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                    animate={{
                      x: Math.cos((i * 45) * Math.PI / 180) * 80,
                      y: Math.sin((i * 45) * Math.PI / 180) * 80,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final celebration text */}
        {showFireworks && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-2xl md:text-3xl text-white/90 font-light">
              You make every day feel like a celebration! ✨
            </p>
            
            <div className="flex justify-center space-x-2 text-4xl md:text-5xl">
              {['🎊', '🎉', '💕', '🎈', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-lg md:text-xl text-white/80 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Here&apos;s to many more beautiful years together! 🥂
            </motion.p>
          </motion.div>
        )}

        {/* Floating hearts around the screen */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-white/70 heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 50}%`,
              }}
              animate={{
                y: [-50, -window.innerHeight - 100],
                rotate: [45, 45],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll to top hint */}
      {showFireworks && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Relive the magic again
          </motion.button>
        </motion.div>
      )}

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 heart opacity-50" />
      <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 heart opacity-60" />
      <div className="absolute bottom-16 left-12 w-10 h-10 bg-white/20 heart opacity-40" />
      <div className="absolute bottom-20 right-16 w-14 h-14 bg-white/20 heart opacity-50" />
    </div>
  )
}
