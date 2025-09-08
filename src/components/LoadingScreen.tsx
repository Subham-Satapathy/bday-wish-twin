'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-sunset flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated hearts */}
        <div className="relative mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-white heart"
              style={{
                left: `${i * 20}px`,
                top: 0,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [45, 45, 45],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.h1
          className="text-4xl md:text-6xl font-script text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Preparing something special...
        </motion.h1>
        
        <motion.p
          className="text-xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          For the most amazing Twin 💕
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="w-64 h-2 bg-white/30 rounded-full mt-8 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
}
