
const colors = require('tailwindcss/colors');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      cyan: colors.cyan,
      sky: colors.sky,
      teal: colors.teal,
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
