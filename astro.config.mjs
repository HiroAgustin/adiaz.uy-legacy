import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

const site = "https://adiaz.uy";
const bufferMode = process.env.BUFFER_MODE;
if (
  process.env.BUFFER_PUBLISH === "true" &&
  bufferMode !== "shareNow" &&
  bufferMode !== "addToQueue"
) {
  throw new Error("Use npm run social:publish to publish posts with their chosen Buffer modes.");
}

export default defineConfig({
  site,

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Atkinson Hyperlegible",
      cssVariable: "--font-body",
      display: "optional",
      weights: [400, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Merienda",
      cssVariable: "--font-heading",
      display: "optional",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],

  integrations: [
    ...(process.env.BUFFER_PUBLISH === "true"
      ? [
          (await import("astro-buffalo")).default({
            posts: new URL("./src/buffer-posts.ts", import.meta.url),
            contentDirectory: "src/content/blog",
            mode: bufferMode,
          }),
        ]
      : []),
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
      theme: "dark-plus",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
