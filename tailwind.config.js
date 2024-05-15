/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './src/screens/*.tsx',
    './src/components/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          700: '#00875F',
          500: '#00B37E',
        },
        gray: {
          700: '#121214',
          600: '#202024',
          500: '#29292E',
          400: '#323238',
          300: '#7C7C8A',
          200: '#C4C4CC',
          100: '#E1E1E6'
        },
        white: '#FFFFFF',
        red: {
          500: '#F75A68'
        }
      },
      fontFamily: {
        'body': ['Roboto_400Regular', 'sans-serif'],
        'heading': ['Roboto_700Bold', 'sans-serif'],
      },
  
    },
  },
  plugins: [],
}

