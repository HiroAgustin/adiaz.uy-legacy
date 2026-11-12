import type { APIRoute } from "astro";
import { getPosts } from "./lib/posts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Configure the site URL before publishing to Buffer.");
  }

  const posts = await getPosts();
  return Response.json(
    posts.map((post) => {
      if (!post.filePath) {
        throw new Error(`Missing source file path for blog post "${post.id}".`);
      }
      return {
        filePath: post.filePath,
        title: post.data.title,
        url: new URL(`/${post.id}/`, site).href,
        mode: post.data.bufferMode,
        channelIds: post.data.bufferChannels,
      };
    }),
  );
};
