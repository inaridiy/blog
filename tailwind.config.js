/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

module.exports = {

  theme: {
    typography: theme => ({
      default: {
        css: {
          a: {
            color: theme('colors.primary.500')
          },

          blockquote: {
            fontWeight: '400',
            color: theme('colors.gray.600'),
            fontStyle: 'normal',
            quotes: '"\\201C""\\201D""\\2018""\\2019"'
          },
          'blockquote p:first-of-type::before': {
            content: ''
          },
          'blockquote p:last-of-type::after': {
            content: ''
          },
          code: {
            fontWeight: '400',
            backgroundColor: theme('colors.gray.100'),
            padding: theme('padding.1'),
            borderWidth: 1,
            borderColor: theme('colors.gray.200'),
            borderRadius: theme('borderRadius.default')
          },
          'code::before': {
            content: ''
          },
          'code::after': {
            content: ''
          },
          'h3 code': {
            fontWeight: '600'
          },
          'pre code': {
            fontFamily: 'DM Mono'
          }
        }
      },


    })
  },
  variants: {
    margin: ['responsive', 'last'],
    padding: ['responsive', 'hover'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'first', 'last'],
    typography: ['responsive']
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
