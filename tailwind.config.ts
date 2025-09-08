import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pastel color palette for romantic theme
        primary: {
          pink: '#FFB6C1',
          lavender: '#E6E6FA',
          peach: '#FFDAB9',
          mint: '#F0FFF0',
          cream: '#FFF8DC',
        },
        accent: {
          rose: '#FFC0CB',
          purple: '#DDA0DD',
          gold: '#F0E68C',
          sage: '#98FB98',
          coral: '#FFB07A',
        },
        text: {
          dark: '#4A4A4A',
          medium: '#6B6B6B',
          light: '#8A8A8A',
        }
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s infinite linear',
        'pulse-soft': 'pulse-soft 2s infinite',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'text-reveal': 'text-reveal 1s ease-out forwards',
        'audio-wave': 'audio-wave 1s infinite ease-in-out',
        'surprise-float': 'surprise-float 8s infinite linear',
        'confetti-fall': 'confetti-fall 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100vh) rotate(45deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-100px) rotate(45deg)', opacity: '0' }
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'rotate(45deg) scale(1)' },
          '50%': { transform: 'rotate(45deg) scale(1.1)' }
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'audio-wave': {
          '0%, 100%': { height: '10px' },
          '50%': { height: '30px' }
        },
        'surprise-float': {
          '0%': { transform: 'translateY(100vh) rotate(45deg) scale(0)' },
          '20%': { transform: 'translateY(80vh) rotate(45deg) scale(1)' },
          '80%': { transform: 'translateY(-20vh) rotate(45deg) scale(1)' },
          '100%': { transform: 'translateY(-100px) rotate(45deg) scale(0)' }
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FFDAB9 0%, #F0FFF0 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FFB07A 0%, #FFC0CB 50%, #E6E6FA 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(255, 182, 193, 0.3)',
        'medium': '0 8px 30px rgba(255, 182, 193, 0.4)',
        'strong': '0 12px 40px rgba(255, 182, 193, 0.5)',
      }
    },
  },
  plugins: [],
}
export default config
