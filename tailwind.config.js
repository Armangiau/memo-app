/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '-smh': { raw: '(max-height: 640px)' }
      },
      fontFamily: {
        headlight: ['Headlight', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
}
