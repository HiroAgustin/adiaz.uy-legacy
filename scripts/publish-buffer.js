import { execFileSync } from "node:child_process";
import { getPublishingPosts } from "./buffer-posts.js";

try {
  const posts = getPublishingPosts();
  const groups = new Set(posts.map(({ data }) => JSON.stringify([...data.bufferChannels].sort())));
  if (!groups.size) console.log("No new blog posts to share.");
  for (const channels of groups) {
    console.log("Publishing Buffer posts for selected channels...");
    execFileSync(process.execPath, ["./node_modules/astro/bin/astro.mjs", "build"], {
      stdio: "inherit",
      env: { ...process.env, BUFFER_PUBLISH: "true", BUFFER_CHANNEL_IDS: channels },
    });
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
