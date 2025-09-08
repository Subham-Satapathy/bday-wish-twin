'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AudioSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setError('Audio message is not available yet. I&apos;ll add it soon! 💕')
      setIsLoaded(true)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.error('Audio play error:', err)
      setError('Unable to play audio. Please try again!')
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration

    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className="relative w-full h-screen bg-primary-cream flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FFB6C1 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #E6E6FA 0%, transparent 50%)`
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-script text-text-dark mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          A Special Message for You
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-text-medium mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Close your eyes, listen with your heart 💕
        </motion.p>

        {/* Audio player container */}
        <motion.div
          className="bg-white rounded-3xl shadow-strong p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            preload="metadata"
            className="hidden"
          >
            <source src="/audio/love-message.mp3" type="audio/mpeg" />
            <source src="/audio/love-message.ogg" type="audio/ogg" />
            Your browser doesn&apos;t support audio playback.
          </audio>

          {/* Play button */}
          <div className="flex flex-col items-center">
            <motion.button
              onClick={togglePlayPause}
              disabled={!isLoaded && !error}
              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-primary-pink to-accent-rose rounded-full shadow-medium flex items-center justify-center text-white text-3xl md:text-4xl transition-all duration-300 hover:scale-110 hover:shadow-strong disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause message' : 'Play message'}
            >
              <AnimatePresence mode="wait">
                {!isLoaded && !error ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="loading-spinner w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                  />
                ) : error ? (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    💌
                  </motion.span>
                ) : isPlaying ? (
                  <motion.span
                    key="pause"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    ⏸️
                  </motion.span>
                ) : (
                  <motion.span
                    key="play"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    ▶️
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Audio visualizer */}
            <div className="flex items-center justify-center space-x-1 mb-6 h-12">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary-pink rounded-full"
                  animate={{
                    height: isPlaying ? [4, 20, 4] : 4,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Progress bar and time display */}
            {!error && duration > 0 && (
              <div className="w-full">
                <div
                  className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-3 overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-pink to-accent-rose rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="flex justify-between text-sm text-text-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Status text */}
            <motion.p
              className="text-text-medium mt-4 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {error ? (
                error
              ) : !isLoaded ? (
                'Loading your special message...'
              ) : isPlaying ? (
                'Playing with love... 💕'
              ) : (
                'Tap to hear my voice 🎵'
              )}
            </motion.p>
          </div>
        </motion.div>

        {/* Floating musical notes */}
        <div className="absolute inset-0 pointer-events-none">
          {isPlaying && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [20, -50, -100],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            >
              {['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
