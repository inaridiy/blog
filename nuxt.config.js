require('dotenv').config();
const { API_KEY, API_URL } = process.env;
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*generate: {
    async routes() {
      const pages = await this.$axios.$get(
        process.env.API_URL + "inaridiy?limit=100",
        { headers: { "X-API-KEY": process.env.API_KEY } }
      )
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/${content.id}`,
            payload: content
          }))
        )
    
      return pages
    }
  },*/
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.scss'
  ],
  components: true,
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/prism',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)

  // Modules (https://go.nuxtjs.dev/config-modules)

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@/modules/ogp.js',
    '@nuxtjs/google-fonts'
  ],
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { baseURL: process.env.API_URL },
  markdownit: {
    injected: true
  },
  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Mono': true
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  env: {
    API_KEY,
    API_URL
  }
}
