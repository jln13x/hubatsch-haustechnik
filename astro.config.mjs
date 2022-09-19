import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

const site = "https://staging-hubatsch-haustechnik.hubatsch.dev";

const integrations = [
  tailwind(),
  sitemap({
    filter: (page) => !page.includes("datenschutz"),
  }),
];

console.log(process.env.PUBLIC_VERCEL_ENV);
console.log({
  env: process.env,
});

console.log(process.env.VERCEL_ENV);

if (process.env.PUBLIC_VERCEL_ENV === "production") {
  integrations.push(compress());
}

export default defineConfig({
  site,
  integrations: integrations,
});
