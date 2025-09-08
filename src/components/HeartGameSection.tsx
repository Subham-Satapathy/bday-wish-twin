'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingHeart {
  id: number
  x: number
  y: number
  speed: number
  message: string
  color: string
}

const loveMessages = [
  "You have the most beautiful smile 😊",
  "Your laugh is my favorite sound 🎵",
  "You make every day brighter ☀️",
  "Your kindness touches everyone 💝",
  "You're incredibly smart and talented 🌟",
  "Your hugs feel like home 🏠",
  "You make me want to be better 💪",
  "Your eyes sparkle like stars ✨",
  "You're my greatest adventure 🗺️",
  "Your heart is pure gold 💛",
  "You make ordinary moments magical ✨",
  "Your strength inspires me daily 💪",
  "You're my favorite person 👑",
  "Your love makes me complete 💕",
  "You're absolutely amazing! 🌈"
]

const heartColors = ['#FFB6C1', '#FFC0CB', '#DDA0DD', '#F0E68C', '#98FB98', '#FFB07A']

export default function HeartGameSection() {
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [revealedMessages, setRevealedMessages] = useState<string[]>([])
  const [gameTime, setGameTime] = useState(30)
  const [showMessages, setShowMessages] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const heartIntervalRef = useRef<NodeJS.Timeout>()
  const gameTimerRef = useRef<NodeJS.Timeout>()

  // Create a new floating heart
  const createHeart = useCallback((): FloatingHeart => {
    const gameArea = gameAreaRef.current
    if (!gameArea) return { id: 0, x: 0, y: 0, speed: 0, message: '', color: '' }

    const areaRect = gameArea.getBoundingClientRect()
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (areaRect.width - 60),
      y: areaRect.height + 20,
      speed: 1 + Math.random() * 2,
      message: loveMessages[Math.floor(Math.random() * loveMessages.length)],
      color: heartColors[Math.floor(Math.random() * heartColors.length)]
    }
  }, [])

  // Start the game
  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setRevealedMessages([])
    setGameTime(30)
    setShowMessages(false)

    // Create hearts at intervals
    heartIntervalRef.current = setInterval(() => {
      setHearts(prev => [...prev, createHeart()])
    }, 1000)

    // Game timer
    gameTimerRef.current = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // End the game
  const endGame = () => {
    setGameActive(false)
    setHearts([])
    setShowMessages(true)
    
    if (heartIntervalRef.current) {
      clearInterval(heartIntervalRef.current)
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
    }
  }

  // Handle heart click/pop
  const popHeart = (heartId: number, message: string) => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId))
    setScore(prev => prev + 1)
    
    if (!revealedMessages.includes(message)) {
      setRevealedMessages(prev => [...prev, message])
    }
  }

  // Update heart positions
  useEffect(() => {
    if (!gameActive) return

    const updateHearts = () => {
      setHearts(prev => prev
        .map(heart => ({
          ...heart,
          y: heart.y - heart.speed
        }))
        .filter(heart => heart.y > -60) // Remove hearts that went off screen
      )
    }

    const animationFrame = setInterval(updateHearts, 50)
    return () => clearInterval(animationFrame)
  }, [gameActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current)
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    }
  }, [])

  return (
    <div className="relative w-full bg-primary-lavender p-4 py-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, #FFB6C1 0%, transparent 30%),
                           radial-gradient(circle at 70% 80%, #DDA0DD 0%, transparent 30%),
                           radial-gradient(circle at 20% 80%, #F0E68C 0%, transparent 30%)`
        }} />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script text-text-dark mb-4 px-4 text-center">
          Pop the Hearts! 💖
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-medium max-w-2xl px-4 text-center">
          {gameActive 
            ? "Quick! Click the floating hearts to discover why I love you!"
            : "Click the floating hearts to discover special messages about why I love you!"
          }
        </p>
      </motion.div>

      {/* Game stats */}
      {gameActive && (
        <motion.div
          className="flex justify-center space-x-8 mb-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/90 rounded-2xl px-6 py-3 shadow-medium">
            <div className="text-2xl font-bold text-primary-pink">{score}</div>
            <div className="text-sm text-text-medium">Hearts Popped</div>
          </div>
          <div className="bg-white/90 rounded-2xl px-6 py-3 shadow-medium">
            <div className="text-2xl font-bold text-accent-purple">{gameTime}</div>
            <div className="text-sm text-text-medium">Seconds Left</div>
          </div>
        </motion.div>
      )}

      {/* Game area */}
      <motion.div
        ref={gameAreaRef}
        className="relative w-full max-w-4xl h-64 sm:h-80 md:h-96 lg:h-[500px] bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-strong overflow-hidden border border-white/50"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Start button */}
        {!gameActive && !showMessages && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={startGame}
              className="px-12 py-6 bg-gradient-to-r from-primary-pink to-accent-rose text-white text-2xl font-bold rounded-3xl shadow-strong transition-all duration-300 hover:scale-105 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Heart Hunt! 💕
            </motion.button>
          </div>
        )}

        {/* Game over message */}
        {!gameActive && showMessages && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center p-8">
              <h3 className="text-3xl font-script text-primary-pink mb-4">
                Amazing! You popped {score} hearts! 🎉
              </h3>
              <p className="text-lg text-text-medium mb-6">
                You discovered {revealedMessages.length} reasons why I love you!
              </p>
              <motion.button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-accent-rose to-primary-lavender text-white font-semibold rounded-2xl shadow-medium transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again! 💖
              </motion.button>
            </div>
          </div>
        )}

        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute w-12 h-12 heart bg-opacity-90 hover:scale-110 transition-transform duration-200 cursor-pointer z-20"
              style={{
                backgroundColor: heart.color,
                left: heart.x,
                top: heart.y,
                transform: 'rotate(45deg)',
              }}
              onClick={() => popHeart(heart.id, heart.message)}
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 45 }}
              exit={{ 
                scale: 0, 
                rotate: 405,
                transition: { duration: 0.3 }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              aria-label="Pop heart for surprise message"
            />
          ))}
        </AnimatePresence>

        {/* Background hearts decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 heart bg-white/20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${10 + (i % 3) * 30}%`,
                transform: 'rotate(45deg)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Revealed messages */}
      {revealedMessages.length > 0 && (
        <motion.div
          className="w-full max-w-4xl mt-8 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-script text-center text-text-dark mb-6">
            Messages of Love You&apos;ve Discovered 💕
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {revealedMessages.map((message, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-medium"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <p className="text-text-dark text-center font-medium">
                    {message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.p
        className="text-center text-text-medium mt-6 italic z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {gameActive 
          ? "💡 Tip: Hearts float up - catch them quickly!"
          : "Each heart contains a special reason why you mean the world to me"
        }
      </motion.p>
    </div>
  )
}
