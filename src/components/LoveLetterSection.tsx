'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoveLetterSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const letterContent = {
    date: "On your special day...",
    greeting: "My dearest Twin,",
    paragraphs: [
      "Words cannot express how grateful I am to have you in my life. Every day with you feels like a beautiful dream, and your smile lights up even the darkest moments.",
      "You bring so much joy, laughter, and love into my world. Your kindness, your strength, and your beautiful heart inspire me every single day.",
      "Your laugh is my favorite melody, your eyes are my favorite view, and your happiness is my greatest mission. You make ordinary moments feel extraordinary just by being yourself.",
      "Today, as we celebrate another year of your amazing life, I want you to know that you are cherished, you are loved, and you make everything better just by being you.",
      "Thank you for being patient with my silly jokes, for supporting my dreams, and for loving me exactly as I am. You see the best in everyone, especially in me.",
      "Here's to many more birthdays together, creating beautiful memories, sharing endless laughter, and growing old with our hands intertwined and our hearts beating as one."
    ],
    signature: "With all my love and devotion,",
    signatureName: "Your forever partner 💕"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-secondary flex items-center justify-center py-16 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45, 45, 45],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Soft gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-pink/20 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-primary-lavender/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-rose/20 rounded-full blur-xl" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section title */}
        <motion.h2
          className="text-4xl md:text-5xl font-script text-center text-text-dark mb-12"
          variants={itemVariants}
        >
          From My Heart to Yours
        </motion.h2>

        {/* Letter container */}
        <motion.div
          className="relative mx-auto"
          variants={letterVariants}
        >
          {/* Letter paper effect */}
          <div className="relative bg-white rounded-2xl shadow-strong p-8 md:p-12 lg:p-16">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-cream/10 to-transparent rounded-2xl pointer-events-none" />
            
            {/* Red margin line (like notebook paper) */}
            <div className="absolute left-12 top-0 bottom-0 w-px bg-accent-coral/30" />
            
            {/* Holes for paper effect */}
            <div className="absolute left-6 top-8 w-2 h-2 bg-gray-200 rounded-full" />
            <div className="absolute left-6 top-16 w-2 h-2 bg-gray-200 rounded-full" />
            <div className="absolute left-6 top-24 w-2 h-2 bg-gray-200 rounded-full" />

            {/* Letter content */}
            <div className="relative z-10 selectable-text">
              {/* Date */}
              <motion.p
                className="text-text-light italic mb-8 text-right"
                variants={itemVariants}
              >
                {letterContent.date}
              </motion.p>

              {/* Greeting */}
              <motion.p
                className="text-2xl md:text-3xl font-script text-primary-pink mb-8"
                variants={itemVariants}
              >
                {letterContent.greeting}
              </motion.p>

              {/* Letter body */}
              <div className="space-y-6 text-text-dark leading-relaxed">
                {letterContent.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-lg md:text-xl leading-8"
                    variants={itemVariants}
                    style={{ textIndent: '2rem' }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div
                className="mt-12 text-right"
                variants={itemVariants}
              >
                <p className="text-lg text-text-medium mb-2">
                  {letterContent.signature}
                </p>
                <p className="text-2xl md:text-3xl font-script text-primary-pink">
                  {letterContent.signatureName}
                </p>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-pink/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary-pink/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary-pink/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-pink/30 rounded-br-lg" />
          </div>

          {/* Letter shadow */}
          <div className="absolute inset-0 bg-black/10 rounded-2xl transform translate-x-2 translate-y-2 -z-10" />
          
          {/* Additional paper layers for depth */}
          <div className="absolute inset-0 bg-white/80 rounded-2xl transform translate-x-1 translate-y-1 -z-20" />
        </motion.div>

        {/* Bottom message */}
        <motion.p
          className="text-center text-text-medium mt-8 italic"
          variants={itemVariants}
        >
          Every word comes straight from my heart 💕
        </motion.p>
      </motion.div>

      {/* Floating love symbols */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none">
          {['💝', '💖', '💕', '💘', '💗'].map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [50, -100, -200],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
