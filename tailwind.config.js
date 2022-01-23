
const colors = require('tailwindcss/colors');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      red: colors.red,
      rose: colors.rose,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      cyan: colors.cyan,
      sky: colors.sky,
      teal: colors.teal,
      slate : colors.slate
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
