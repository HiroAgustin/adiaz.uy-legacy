import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("blog");
  return posts.sort(
    (first, second) => second.data.pubDate.getTime() - first.data.pubDate.getTime(),
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
