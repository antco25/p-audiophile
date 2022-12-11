/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '376px',
      'xsm': '576px',
      ...defaultTheme.screens,
      '2xl': '1440px',
    },
    extend: {
      fontSize: {
        'sm': ['0.8125rem', {
          lineHeight: '1.5625rem',
          fontWeight: '700',
        }],
        'base': ['0.9375rem', {
          lineHeight: '1.5625rem',
          fontWeight: '500',
        }]
      },
      fontFamily: {
        sans: ['Manrope']
      },
      colors: {
        'pGray': '#101010',
        'pOrange': {
          100: '#FBAF85',
          200: '#D87D4A',
        },
        'pLight': {
          100: '#FAFAFA',
          200: '#F1F1F1',
        },
      },
    },
  },
  plugins: [],
}
