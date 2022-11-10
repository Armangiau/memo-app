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
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.875rem',
        '7xl': '4.75rem',
        '8xl': '5.875rem',
        '9xl': '7.5rem'
      },
      height: {
        xs: '1.5rem',
        sm: '2.125rem',
        md: '2.75rem',
        lg: '4rem',
        xl: '4.625rem',
        '2xl': '5.25rem',
        '3xl': '6.5rem',
        '4xl': '9rem',
        '5xl': '12.75rem',
        '6xl': '17.125rem',
        '7xl': '21.5rem',
        '8xl': '27.125rem',
        '9xl': '35.25rem'
      },
      width: {
        xs: '1.5rem',
        sm: '2.125rem',
        md: '2.75rem',
        lg: '4rem',
        xl: '4.625rem',
        '2xl': '5.25rem',
        '3xl': '6.5rem',
        '4xl': '9rem',
        '5xl': '12.75rem',
        '6xl': '17.125rem',
        '7xl': '21.5rem',
        '8xl': '27.125rem',
        '9xl': '35.25rem'
      },
      padding: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
        '5xl': '5rem',
        '6xl': '6.75rem',
        '7xl': '8.5rem',
        '8xl': '10.75rem',
        '9xl': '14rem'
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '0.875rem',
        '3xl': '1.125rem',
        '4xl': '1.625rem',
        '5xl': '2.375rem',
        '6xl': '3.25rem',
        '7xl': '4.125rem',
        '8xl': '5.25rem',
        '9xl': '6.875rem'
      },
      fontFamily: {
        title: ['K2D', ...defaultTheme.fontFamily.sans]
      },
    }
  }
}
