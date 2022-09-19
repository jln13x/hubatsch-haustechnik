import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

const site = "https://staging-hubatsch-haustechnik.hubatsch.dev";

export default defineConfig({
  site,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("datenschutz"),
    }),
    compress(),
  ],
});
