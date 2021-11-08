module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              padding: '0',
              margin: '0',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        lg: {
          css: {
            pre: {
              padding: '0',
              margin: '0',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        sm: {
          css: {
            pre: {
              padding: '0',
              margin: '0',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.gray.200'),
              '&:hover': {
                color: theme('colors.gray.200'),
              },
            },
            'h2 a': {
              color: theme('colors.gray.200'),
            },
            h1: {
              color: theme('colors.gray.200'),
            },
            h2: {
              color: theme('colors.gray.200'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            h5: {
              color: theme('colors.gray.200'),
            },
            h6: {
              color: theme('colors.gray.200'),
            },
            th: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            code: {
              color: theme('colors.gray.200'),
            },
            figcaption: {
              color: theme('colors.gray.200'),
            },
            code: {
              color: theme('colors.gray.900'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: { typography: ['dark'] },
  },
  plugins: [require('@tailwindcss/typography')],
};
