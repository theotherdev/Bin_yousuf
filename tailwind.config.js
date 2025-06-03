/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary': '#4c4c4c',
        'secondary': '#666',
        'accent': '#888',
      },
      animation: {
        'blur-in': 'blur-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'blur-out': 'blur-out 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        'blur-in': {
          '0%': {
            filter: 'blur(10px)',
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: '1',
            transform: 'translateY(0px)'
          }
        },
        'blur-out': {
          '0%': {
            filter: 'blur(0px)',
            opacity: '1',
            transform: 'translateY(0px)'
          },
          '100%': {
            filter: 'blur(10px)',
            opacity: '0',
            transform: 'translateY(-20px)'
          }
        },
        'fadeInUp': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      spacing: {
        '110vh': '110vh',
        '12vh': '12vh',
        '15vh': '15vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '38vw': '38vw',
        '60vw': '60vw',
        '5vw': '5vw',
        '10vw': '10vw',
      },
      zIndex: {
        '5': '5',
        '999': '999',
        '1000': '1000',
        '2000': '2000',
      },
      backdropBlur: {
        '20': '20px',
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'project': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'project-hover': '0 30px 80px rgba(0, 0, 0, 0.2)',
        'project-highlight': '0 40px 100px rgba(0, 0, 0, 0.25)',
        'sidebar': '0 20px 60px rgba(0, 0, 0, 0.1)',
        'mobile-menu': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'modal': '0 40px 100px rgba(0, 0, 0, 0.3)',
      },
      maxWidth: {
        '1400': '1400px',
      },
      borderRadius: {
        '20': '20px',
      },
      fontSize: {
        'clamp-hero': 'clamp(40px, 7vw, 80px)',
        'clamp-hero-mobile': 'clamp(60px, 15vw, 120px)',
        'clamp-title': 'clamp(48px, 6vw, 80px)',
        'clamp-subtitle': 'clamp(24px, 4vw, 32px)',
        'clamp-description': 'clamp(24px, 3vw, 32px)',
      },
    },
  },
  plugins: [
    // Add plugin for blur utilities if needed
    function({ addUtilities }) {
      const newUtilities = {
        '.blur-out': {
          filter: 'blur(10px)',
          opacity: '0',
          transform: 'translateY(-20px)',
        },
        '.blur-in': {
          filter: 'blur(0px)',
          opacity: '1',
          transform: 'translateY(0px)',
        },
        '.will-change-transform': {
          'will-change': 'transform, width, height, top, left, opacity',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-gpu': {
          transform: 'translateZ(0)',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
        '.scroll-snap-y': {
          'scroll-snap-type': 'y mandatory',
        },
        '.scroll-snap-start': {
          'scroll-snap-align': 'start',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}