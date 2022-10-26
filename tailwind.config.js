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
      },
      colors: {
        primary: '#1276CE',
        secondary: '#A26100',
        action: '#D50B59',
        "primary-light": '#F2F9FF',
        "secondary-light": '#FFF9EF',
        "action-light": '#FFF2F7'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
}
