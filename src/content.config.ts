import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/posts' }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default('Admin'),
    categories: z.array(z.string()).default(['others']),
    tags: z.array(z.string()).default(['others']),
    draft: z.boolean().optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/pages' }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    justify: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postCollection,
  pages: pagesCollection,
};
