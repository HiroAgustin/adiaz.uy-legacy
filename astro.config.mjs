import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://adiaz.uy";

export default defineConfig({
  site,
  integrations: [
    ...(process.env.BUFFER_PUBLISH === "true"
      ? [
          (await import("astro-buffer")).default({
            posts: new URL("./src/buffer-posts.ts", import.meta.url),
            contentDirectory: "src/content/blog",
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
      theme: "monokai",
    },
  },
});
