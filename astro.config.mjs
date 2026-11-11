import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import buffalo from "astro-buffalo";
import { getPublishingPosts } from "./scripts/buffer-posts.js";

import tailwindcss from "@tailwindcss/vite";

const site = "https://adiaz.uy";

let channelIds;
if (process.env.BUFFER_PUBLISH === "true" && process.env.BUFFER_CHANNEL_IDS) {
  try {
    channelIds = JSON.parse(process.env.BUFFER_CHANNEL_IDS);
  } catch {
    throw new Error("Use npm run social:publish to publish to the selected channels.");
  }
  if (
    !Array.isArray(channelIds) ||
    !channelIds.length ||
    channelIds.some((id) => typeof id !== "string" || !id.trim())
  ) {
    throw new Error("Use npm run social:publish to publish to the selected channels.");
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
      name: "check-publishing-choices",
      hooks: {
        "astro:config:setup": ({ command }) => {
          if (command === "build" && process.env.BUFFER_PUBLISH === "true") {
            if (!channelIds) {
              throw new Error("Use npm run social:publish to publish to the selected channels.");
            }
            getPublishingPosts();
          }
        },
      },
    },
    buffalo({
      posts: new URL("./src/buffer-posts.ts", import.meta.url),
      contentDirectory: "src/content/blog",
      channelIds,
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
