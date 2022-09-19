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

if (process.env.VERCEL_ENV === "production") {
  integrations.push(compress({ logger: 2 }));
}

export default defineConfig({
  site,
  integrations: integrations,
});
