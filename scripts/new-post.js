import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const draft = args.includes("--draft");
const title = args
  .filter((arg) => arg !== "--draft")
  .join(" ")
  .trim();

if (!title) {
  console.error('Usage: npm run blog -- [--draft] "Post title"');
  process.exit(1);
}

const slug = title
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

if (!slug) {
  console.error("The title must contain at least one letter or number.");
  process.exit(1);
}

const postPath = `src/content/blog/${slug}.md`;
const pubDate = new Date().toISOString().slice(0, 10);
const content = `---
title: ${JSON.stringify(title)}
description: ""
pubDate: "${pubDate}"
draft: ${draft}
---

`;

try {
  await writeFile(postPath, content, { flag: "wx" });
} catch (error) {
  if (error.code === "EEXIST") {
    console.error(`A post already exists at ${postPath}.`);
    process.exit(1);
  }
  throw error;
}

console.log(`Created ${postPath}`);
