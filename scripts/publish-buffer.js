import { execFileSync } from "node:child_process";
import { getNewPosts } from "./buffer-posts.js";

try {
  const posts = getNewPosts();
  const modes = new Set(posts.map(({ data }) => data.bufferMode ?? "shareNow"));
  if (!modes.size) {
    console.log("No new blog posts to share.");
  }
  for (const mode of modes) {
    console.log(`Publishing Buffer posts (${mode})...`);
    execFileSync(process.execPath, ["./node_modules/astro/bin/astro.mjs", "build"], {
      stdio: "inherit",
      env: { ...process.env, BUFFER_PUBLISH: "true", BUFFER_MODE: mode },
    });
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
