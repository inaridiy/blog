import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: "src/",
  css: ["zenn-content-css", "@/assets/article.css", "tailwindcss/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  privateRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
  },
});
