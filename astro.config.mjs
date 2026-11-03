import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://adiaz.uy",
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
