import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Projects collection: one typed Markdown entry per project in src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    links: z.object({
      demo: z.string().optional(),
      code: z.string().optional(),
    }),
    order: z.number(),
  }),
});

export const collections = { projects };
