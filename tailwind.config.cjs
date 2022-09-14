/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          200: "#ff29c9",
          500: "#CC0099",
          700: "#b8008a",
          900: "#7a005c",
        },
      },
    },
  },
  plugins: [],
};
