/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '-smh': { raw: '(max-height: 640px)' }
      },
      colors: {
        primary: '#1276CE',
        secondary: '#A26100',
        action: '#D50B59',
        'primary-light': '#F2F9FF',
        'secondary-light': '#FFF9EF',
        'action-light': '#FFF2F7'
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.625rem',
        '2xl': '0.875rem',
        '3xl': '1.125rem',
        '4xl': '1.625rem',
        '5xl': '2.375rem',
        '6xl': '3.25rem',
        '7xl': '4.125rem',
        '8xl': '5.25rem',
        '9xl': '6.875rem'
      },
      height: {
        xs: '1.5rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem',
        '2xl': '4.5rem',
        '3xl': '5.5rem',
        '4xl': '7.5rem',
        '5xl': '10.5rem',
        '6xl': '14rem',
        '7xl': '17.5rem',
        '8xl': '22rem',
        '9xl': '28.5rem'
      },
      width: {
        xs: '1.5rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem',
        '2xl': '4.5rem',
        '3xl': '5.5rem',
        '4xl': '7.5rem',
        '5xl': '10.5rem',
        '6xl': '14rem',
        '7xl': '17.5rem',
        '8xl': '22rem',
        '9xl': '28.5rem'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.875rem',
        '7xl': '4.75rem',
        '8xl': '5.875rem',
        '9xl': '7.5rem'
      }
    }
  },
}
