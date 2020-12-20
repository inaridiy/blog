require('dotenv').config();
const { API_KEY, API_URL, } = process.env;
const baseDir = process.env.BASE_DIR || '/'
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const g_id = process.env.G_ID
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'いなりの開発記録',
    meta: [
      { hid: 'description', name: 'description', content: 'いなりのの日常とか開発とか' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'いなりの開発記録' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: 'いなりの開発記録' },
      { hid: 'og:description', property: 'og:description', content: 'いなりのの日常とか開発とか' },
      { hid: 'og:image', property: 'og:image', content: 'https://images.microcms-assets.io/protected/ap-northeast-1:a64cefb4-cff5-48f5-8704-92146a82c0f9/service/inaridiy/media/logo.png' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      }
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
    '@nuxtjs/google-analytics'
    //   '@nuxtjs/google-fonts'
  ],
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    'vue-scrollto/nuxt',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { baseURL: process.env.API_URL },
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にする
    use: ["markdown-it-anchor"]
  },
  googleAnalytics: {
    id: g_id
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  env: {
    API_KEY,
    API_URL,
    baseUrl: baseUrl,
  },
  router: {
    base: baseDir,
  },
}
