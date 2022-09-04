/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'headlight' : ['Headlight', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["winter"],
  },
}
