/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ef-blue': '#0038ff',
        'ef-dark-blue': '#0026b8',
        'ef-pink': '#ff3e75',
        'ef-yellow': '#f5ec78',
        'ef-orange': '#ff5a22',
        'ef-black': '#111111',
        'ef-cream': '#faf8f5',
        'fz-blue': '#0038ff',
        'fz-dark-blue': '#0026b8',
        'fz-pink': '#ff3e75',
        'fz-yellow': '#f5ec78',
        'fz-orange': '#ff5a22',
        'fz-black': '#111111',
        'fz-cream': '#faf8f5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Poppins"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        script: ['"Caveat"', 'cursive'],
        body: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'wiggle-slow': 'wiggle 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'train-marquee': 'trainMarquee 30s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        trainMarquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}