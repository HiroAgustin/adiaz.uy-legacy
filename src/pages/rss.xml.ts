import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getPosts } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Configure the site URL before building the feed.");
  }

  const posts = await getPosts();

  return rss({
    title: "adiaz.uy",
    description: "Agustín Díaz (@HiroAgustin) · Web Development Blog.",
    site,
    customData: "<language>en</language>",
    items: posts.map((post) => {
      if (!post.rendered) {
        throw new Error(`Missing rendered content for blog post "${post.id}".`);
      }

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${post.id}/`,
        content: post.rendered.html,
      };
    }),
  });
};
