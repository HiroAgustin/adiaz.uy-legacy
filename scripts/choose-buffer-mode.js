import { closeSync, openSync, readFileSync, readSync, writeFileSync, writeSync } from "node:fs";
import { styleText } from "node:util";
import { getNewPosts, git } from "./buffer-posts.js";

function promptForMode({ path, data }) {
  let terminal;
  try {
    terminal = openSync("/dev/tty", "r+");
  } catch (error) {
    throw new Error(
      `Cannot prompt for ${path}. Commit from a terminal or set bufferMode: shareNow or addToQueue in its frontmatter and stage it.`,
      { cause: error },
    );
  }
  try {
    const byte = Buffer.alloc(1);
    const styleOptions = { stream: process.stderr };
    const prompt = [
      "",
      `Share ${styleText("bold", `"${data.title ?? path}"`, styleOptions)} via Buffer:`,
      `  ${styleText("cyan", "1.", styleOptions)} Share now`,
      `  ${styleText("cyan", "2.", styleOptions)} Add to queue`,
      `Choose 1 or 2 ${styleText("dim", "(Ctrl-C cancels)", styleOptions)}: `,
    ].join("\n");
    while (true) {
      writeSync(terminal, prompt);
      let answer = "";
      while (true) {
        if (readSync(terminal, byte, 0, 1, null) === 0) {
          throw new Error("Buffer choice cancelled; commit aborted.");
        }
        if (byte[0] === 10) break;
        answer += byte.toString();
      }
      if (answer.trim() === "1") return "shareNow";
      if (answer.trim() === "2") return "addToQueue";
      writeSync(terminal, "Enter 1 to share now or 2 to add to queue.\n");
    }
  } finally {
    closeSync(terminal);
  }
}

function ensureUnchanged(posts) {
  for (const { path, source } of posts) {
    if (readFileSync(path, "utf8") !== source) {
      throw new Error(
        `${path} has unstaged changes. Stage the complete post and retry; no publishing choices were saved.`,
      );
    }
  }
}

try {
  const posts = getNewPosts({ staged: true }).filter(({ data }) => data.bufferMode === undefined);
  ensureUnchanged(posts);
  const updates = posts.map((post) => {
    const mode = promptForMode(post);
    const { lines, end } = post;
    lines.splice(end, 0, `bufferMode: ${mode}${lines[0].endsWith("\r") ? "\r" : ""}`);
    return { ...post, updated: lines.join("\n") };
  });
  ensureUnchanged(posts);
  for (const post of updates) {
    writeFileSync(post.path, post.updated);
  }
  if (updates.length) git("add", "--", ...updates.map(({ path }) => path));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
