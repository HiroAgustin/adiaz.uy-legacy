import { closeSync, openSync, readSync, writeSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { styleText } from "node:util";
import { bufferModes, frontmatter, getNewPosts, git } from "./buffer-posts.js";

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

export async function chooseBufferModes({ cwd = process.cwd(), choose = promptForMode } = {}) {
  const posts = getNewPosts({ cwd, staged: true }).filter(
    ({ data }) => data.bufferMode === undefined,
  );
  for (const post of posts) {
    if ((await readFile(resolve(cwd, post.path), "utf8")) !== post.source) {
      throw new Error(
        `Stage the complete publishing version of ${post.path} before choosing its Buffer mode; unstaged changes were left untouched.`,
      );
    }
  }
  const updates = [];
  for (const post of posts) {
    const mode = choose(post);
    if (!bufferModes.includes(mode)) {
      throw new Error(`Invalid Buffer choice for ${post.path}.`);
    }
    const { lines, end } = frontmatter(post.source, post.path);
    lines.splice(end, 0, `bufferMode: ${mode}${lines[0].endsWith("\r") ? "\r" : ""}`);
    updates.push({ ...post, updated: lines.join("\n") });
  }
  for (const post of updates) {
    if ((await readFile(resolve(cwd, post.path), "utf8")) !== post.source) {
      throw new Error(
        `${post.path} changed during the prompt; commit aborted without saving choices.`,
      );
    }
  }
  for (const post of updates) {
    await writeFile(resolve(cwd, post.path), post.updated);
  }
  if (updates.length) git(cwd, "add", "--", ...updates.map(({ path }) => path));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await chooseBufferModes();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
