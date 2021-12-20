const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      dropShadow: {
        't-xl': '0 -10px 10px rgb(0 0 0 / 0.1)',
      },
    },
  },
  variants: {
    extend: { typography: ['dark'] },
  },
  //plugins: [require('@tailwindcss/typography')],
};
