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
        }
      },
      spacing: {
        '110vh': '110vh',
        '12vh': '12vh',
      },
      zIndex: {
        '999': '999',
      }
    },
  },
  plugins: [],
}