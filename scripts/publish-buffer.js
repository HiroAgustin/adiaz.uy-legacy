import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { getNewPosts } from "./buffer-posts.js";

export function publishBuffer({ cwd = process.cwd(), env = process.env, run = spawnSync } = {}) {
  const posts = getNewPosts({ cwd, baseRef: env.BUFFER_BASE_REF });
  const modes = new Set(posts.map(({ data }) => data.bufferMode ?? "shareNow"));
  if (!modes.size) {
    console.log("No new blog posts to share.");
    return;
  }
  for (const mode of modes) {
    const result = run(process.execPath, ["./node_modules/astro/bin/astro.mjs", "build"], {
      cwd,
      stdio: "inherit",
      env: { ...env, BUFFER_PUBLISH: "true", BUFFER_MODE: mode },
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(
        `Buffer publishing (${mode}) failed: ${result.signal ? `signal ${result.signal}` : `exit ${result.status}`}.`,
      );
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    publishBuffer();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
