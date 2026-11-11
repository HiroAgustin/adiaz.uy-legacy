import { closeSync, openSync, readFileSync, readSync, writeFileSync, writeSync } from "node:fs";
import { styleText } from "node:util";
import { getNewPosts, git } from "./buffer-posts.js";

async function getChannels() {
  const { BUFFER_API_KEY: token, BUFFER_ORGANIZATION_ID: organizationId } = process.env;
  if (!token || !organizationId) {
    throw new Error("Set BUFFER_API_KEY and BUFFER_ORGANIZATION_ID in .env to choose channels.");
  }
  const response = await fetch("https://api.buffer.com", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Channels($input: ChannelsInput!) {
        channels(input: $input) { id name service isDisconnected isLocked }
      }`,
      variables: { input: { organizationId } },
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Cannot load Buffer channels: HTTP ${response.status}.`);
  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(
      `Cannot load Buffer channels: ${result.errors.map((error) => error.message).join("; ")}`,
    );
  }
  if (!Array.isArray(result.data?.channels)) {
    throw new Error("Buffer returned no channel list.");
  }
  const allChannels = result.data.channels;
  if (
    allChannels.some(
      (channel) =>
        !channel ||
        typeof channel.id !== "string" ||
        !channel.id.trim() ||
        channel.id !== channel.id.trim() ||
        typeof channel.name !== "string" ||
        typeof channel.service !== "string" ||
        typeof channel.isDisconnected !== "boolean" ||
        typeof channel.isLocked !== "boolean",
    ) ||
    new Set(allChannels.map(({ id }) => id)).size !== allChannels.length
  ) {
    throw new Error("Buffer returned an invalid channel.");
  }
  const channels = allChannels.filter(
    ({ isDisconnected, isLocked }) => !isDisconnected && !isLocked,
  );
  if (!channels.length) throw new Error("No connected, unlocked Buffer channels found.");
  if (channels.length !== allChannels.length) {
    console.error("Disconnected or locked Buffer channels are unavailable.");
  }
  return channels;
}

function ask(path, prompt, parse, invalid) {
  let terminal;
  try {
    terminal = openSync("/dev/tty", "r+");
  } catch (error) {
    throw new Error(
      `Cannot prompt for ${path}. Commit from a terminal or set bufferMode and bufferChannels in its frontmatter and stage it.`,
      { cause: error },
    );
  }
  try {
    const byte = Buffer.alloc(1);
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
      const value = parse(answer.trim());
      if (value !== undefined) return value;
      writeSync(terminal, `${invalid}\n`);
    }
  } finally {
    closeSync(terminal);
  }
}

function promptForMode({ path, data }) {
  const styleOptions = { stream: process.stderr };
  const prompt = [
    "",
    `Share ${styleText("bold", `"${data.title ?? path}"`, styleOptions)} via Buffer:`,
    `  ${styleText("cyan", "1.", styleOptions)} Share now`,
    `  ${styleText("cyan", "2.", styleOptions)} Add to queue`,
    `Choose 1 or 2 ${styleText("dim", "(Ctrl-C cancels)", styleOptions)}: `,
  ].join("\n");
  return ask(
    path,
    prompt,
    (answer) => (answer === "1" ? "shareNow" : answer === "2" ? "addToQueue" : undefined),
    "Enter 1 to share now or 2 to add to queue.",
  );
}

function promptForChannels({ path, data }, channels) {
  const styleOptions = { stream: process.stderr };
  const prompt = [
    "",
    `Choose channels for ${styleText("bold", `"${data.title ?? path}"`, styleOptions)}:`,
    ...channels.map(
      ({ name, service }, index) =>
        `  ${styleText("cyan", `${index + 1}.`, styleOptions)} ${name} (${service})`,
    ),
    "Enter numbers separated by commas, or press Enter for all: ",
  ].join("\n");
  return ask(
    path,
    prompt,
    (answer) => {
      if (!answer || answer.toLowerCase() === "all") return channels.map(({ id }) => id);
      const selected = answer.split(",").map((value) => value.trim());
      if (
        selected.some(
          (value) => !/^\d+$/.test(value) || Number(value) < 1 || Number(value) > channels.length,
        ) ||
        new Set(selected.map(Number)).size !== selected.length
      ) {
        return;
      }
      return selected.map((value) => channels[Number(value) - 1].id);
    },
    "Enter valid channel numbers separated by commas, or press Enter for all.",
  );
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
  const posts = getNewPosts().filter(
    ({ data }) => data.bufferMode === undefined || data.bufferChannels === undefined,
  );
  ensureUnchanged(posts);
  const channels = posts.some(({ data }) => data.bufferChannels === undefined)
    ? await getChannels()
    : [];
  const updates = posts.map((post) => {
    const mode = post.data.bufferMode ?? promptForMode(post);
    const selected = post.data.bufferChannels ?? promptForChannels(post, channels);
    const { lines, end } = post;
    const newline = lines[0].endsWith("\r") ? "\r" : "";
    const fields = [];
    if (post.data.bufferMode === undefined) fields.push(`bufferMode: ${mode}${newline}`);
    if (post.data.bufferChannels === undefined) {
      fields.push(`bufferChannels: ${JSON.stringify(selected)}${newline}`);
    }
    lines.splice(end, 0, ...fields);
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
