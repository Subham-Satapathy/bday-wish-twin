'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Confetti {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  shape: string
  rotation: number
  rotationSpeed: number
}

const confettiColors = ['#FFB6C1', '#E6E6FA', '#FFDAB9', '#F0FFF0', '#FFC0CB', '#DDA0DD', '#F0E68C', '#98FB98']
const confettiShapes = ['circle', 'square', 'heart']

export default function CelebrateSection() {
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const createConfetti = (): Confetti => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 10,
  })

  const animateConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    setConfetti(prev => {
      const updated = prev.map(piece => ({
        ...piece,
        x: piece.x + piece.vx,
        y: piece.y + piece.vy,
        rotation: piece.rotation + piece.rotationSpeed,
        vy: piece.vy + 0.1, // gravity
      })).filter(piece => piece.y < window.innerHeight + 50)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw confetti
      updated.forEach(piece => {
        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.rotation * Math.PI / 180)
        ctx.fillStyle = piece.color

        switch (piece.shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(0, 0, 5, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'square':
            ctx.fillRect(-4, -4, 8, 8)
            break
          case 'heart':
            // Draw heart shape
            ctx.beginPath()
            ctx.moveTo(0, 3)
            ctx.bezierCurveTo(-5, -2, -10, -2, -5, 1)
            ctx.bezierCurveTo(-5, -2, 0, -5, 0, -2)
            ctx.bezierCurveTo(0, -5, 5, -2, 5, 1)
            ctx.bezierCurveTo(10, -2, 5, -2, 0, 3)
            ctx.fill()
            break
        }
        ctx.restore()
      })

      return updated
    })

    if (isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animateConfetti)
    }
  }, [isAnimating])

  const startConfetti = () => {
    setIsAnimating(true)
    
    // Create initial burst of confetti
    const newConfetti = Array.from({ length: 100 }, createConfetti)
    setConfetti(newConfetti)

    // Add more confetti over time
    const interval = setInterval(() => {
      setConfetti(prev => [...prev, ...Array.from({ length: 20 }, createConfetti)])
    }, 200)

    // Stop after 5 seconds
    setTimeout(() => {
      setIsAnimating(false)
      clearInterval(interval)
      
      // Clear remaining confetti after animation
      setTimeout(() => {
        setConfetti([])
      }, 3000)
    }, 5000)
  }

  useEffect(() => {
    if (isAnimating) {
      animateConfetti()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimating, animateConfetti])

  return (
    <div className="relative w-full h-screen bg-primary-mint flex items-center justify-center overflow-hidden">
      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-script text-text-dark mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let&apos;s Celebrate You! 🎉
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-text-medium mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Click the button below to make it rain love and celebration! 
          Because you deserve all the joy in the world! 💕
        </motion.p>

        {/* Celebrate button */}
        <motion.button
          onClick={startConfetti}
          disabled={isAnimating}
          className={`relative group px-12 py-6 text-2xl md:text-3xl font-bold text-white rounded-3xl shadow-strong transition-all duration-300 ${
            isAnimating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-pink via-accent-rose to-primary-lavender hover:scale-105 hover:shadow-lg active:scale-95'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: isAnimating ? 1 : 1.05 }}
          whileTap={{ scale: isAnimating ? 1 : 0.95 }}
          aria-label="Start celebration with confetti"
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-coral to-accent-purple rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isAnimating ? (
              <>
                <span className="animate-spin">🎊</span>
                Celebrating...
                <span className="animate-bounce">🎈</span>
              </>
            ) : (
              <>
                Celebrate 🎈
              </>
            )}
          </span>

          {/* Sparkle effects on hover */}
          {!isAnimating && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Hint text */}
        <motion.p
          className="text-accent-purple text-lg mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {isAnimating ? 'Look at all that love falling! 💖' : 'Click to make it rain love! 💕'}
        </motion.p>

        {/* Additional decorative hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-accent-rose/60 heart"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [45, 45, 45],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
