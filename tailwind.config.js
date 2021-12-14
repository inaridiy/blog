const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./src/assets/**/*.{css}",
    "./src/components/*.{vue,js}",
    "./src/components/**/*.{vue,js}",
    "./src/pages/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
    /* ... */
  ],
  theme: {
    extend: { colors },
  },
  plugins: [],
};
