import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import buffalo from "astro-buffalo";
import { readFileSync } from "node:fs";
import { getNewPosts } from "./scripts/buffer-posts.js";

import tailwindcss from "@tailwindcss/vite";

const site = "https://adiaz.uy";

function checkPublishingModes() {
  const posts = getNewPosts({ base: process.env.BUFFER_BASE_REF ?? "" });
  for (const { path, source, data } of posts) {
    if (readFileSync(path, "utf8") !== source) {
      throw new Error(`${path} has uncommitted changes. Publish from the committed version.`);
    }
    if (!data.bufferMode) {
      throw new Error(`Choose a bufferMode for ${path} before publishing.`);
    }
  }
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
    {
      name: "check-publishing-modes",
      hooks: {
        "astro:config:setup": ({ command }) => {
          if (command === "build" && process.env.BUFFER_PUBLISH === "true") checkPublishingModes();
        },
      },
    },
    buffalo({
      posts: new URL("./src/buffer-posts.ts", import.meta.url),
      contentDirectory: "src/content/blog",
    }),
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
