/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5015bd',
          light: '#027fe9',
          dark: '#3d0a49',
        },
        secondary: {
          DEFAULT: '#00caf8',
        },
        background: {
          DEFAULT: '#111229',
        },
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
};