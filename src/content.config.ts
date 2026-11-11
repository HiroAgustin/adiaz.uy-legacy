import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    bufferMode: z.enum(["shareNow", "addToQueue"]).optional(),
    bufferChannels: z.array(z.string().min(1)).min(1).optional(),
    updatedDate: z.coerce.date().optional(),
    image: z
      .object({
        path: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      })
      .optional(),
  }),
});

export const collections = { blog };
