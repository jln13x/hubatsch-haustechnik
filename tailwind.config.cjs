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
      animation: {
        blob: "blob 8s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "50%": {
            transform:
              "translate(var(--blob-x), var(--blob-y)) scale(var(--blob-scale))",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
