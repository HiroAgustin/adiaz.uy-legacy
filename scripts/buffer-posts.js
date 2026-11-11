import { execFileSync, spawnSync } from "node:child_process";
import { parse } from "yaml";

const bufferModes = ["shareNow", "addToQueue"];

export function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function frontmatter(source, path) {
  const lines = source.split("\n");
  if (lines[0].replace(/^\uFEFF/, "").trimEnd() !== "---") {
    throw new Error(`Missing YAML frontmatter in ${path}.`);
  }
  const end = lines.findIndex((line, index) => index > 0 && line.trimEnd() === "---");
  if (end === -1) throw new Error(`Missing closing frontmatter delimiter in ${path}.`);
  const data = parse(`${lines.slice(1, end).join("\n")}\n`);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Expected YAML frontmatter fields in ${path}.`);
  }
  return { data, lines, end };
}

export function getNewPosts({ staged = false } = {}) {
  let base = process.env.BUFFER_BASE_REF;
  if (staged) {
    const head = spawnSync("git", ["rev-parse", "--verify", "--quiet", "HEAD"], {
      encoding: "utf8",
    });
    if (head.error) throw head.error;
    if (head.status === 0) base = head.stdout.trim();
    else if (head.status === 1) base = git("hash-object", "-t", "tree", "--stdin").trim();
    else throw new Error(`Cannot resolve HEAD: ${head.stderr.trim()}`);
  } else if (!base || !/^[a-f0-9]{40}$/i.test(base) || /^0+$/.test(base)) {
    throw new Error("Set BUFFER_BASE_REF to the full commit SHA before the new posts.");
  }

  const changes = git(
    "diff",
    ...(staged ? ["--cached"] : []),
    "--name-status",
    "-z",
    "--diff-filter=AMR",
    "--find-renames",
    base,
    ...(staged ? [] : ["HEAD"]),
    "--",
    "src/content/blog",
  )
    .split("\0")
    .filter(Boolean);

  const posts = [];
  for (let index = 0; index < changes.length;) {
    const status = changes[index++];
    const previousPath = changes[index++];
    const path = status.startsWith("R") ? changes[index++] : previousPath;
    if (!path.endsWith(".md")) continue;
    const source = git("show", `${staged ? "" : "HEAD"}:${path}`);
    const metadata = frontmatter(source, path);
    const { data } = metadata;
    if (data.draft === true) continue;
    if (status !== "A") {
      const previous = git("show", `${base}:${previousPath}`);
      if (frontmatter(previous, previousPath).data.draft !== true) continue;
    }
    if (data.bufferMode !== undefined && !bufferModes.includes(data.bufferMode)) {
      throw new Error(`Invalid bufferMode in ${path}: use shareNow or addToQueue.`);
    }
    posts.push({ path, source, ...metadata });
  }
  return posts;
}
