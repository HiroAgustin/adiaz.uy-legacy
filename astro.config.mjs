import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://adiaz.uy";

export default defineConfig({
  site,
  integrations: [
    sitemap({
      customPages: [new URL("/Resume.pdf", site).href],
    }),
  ],
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      theme: "monokai",
    },
  },
});
