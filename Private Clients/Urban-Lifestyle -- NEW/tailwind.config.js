const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // purge: ['./src/**/*.tsx'], //breaks styling
  theme: {
    extend: {
      colors: {
        primary: colors.stone,
        secondary: colors.amber,
        tersiary: colors.neutral,
        warning: colors.orange,
        error: colors.red,
        sucsess: colors.green,
        light: colors.neutral,
        dark: colors.zinc,
      },

      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.primary.300'),
            h1: {
              color: theme('colors.primary.100'),
            },
            h2: {
              color: theme('colors.primary.100'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
