import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each recipe lives in its own folder: src/content/recipes/<slug>/index.md
// Put the recipe's photos in that same folder.
const recipes = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/recipes', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(['cooking', 'baking']),
      difficulty: z.enum(['easy', 'medium', 'hard']),
      prepMinutes: z.number().int().nonnegative(),
      cookMinutes: z.number().int().nonnegative(),
      servings: z.string(),
      cuisine: z.string().optional(),
      diet: z.array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'])).default([]),
      tags: z.array(z.string()).default([]),
      // `item` is the plain ingredient name used for search and "what can I make?" matching.
      ingredients: z.array(
        z.object({
          item: z.string(),
          amount: z.string().optional(),
          optional: z.boolean().default(false),
        }),
      ),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// Journal posts: src/content/journal/<slug>.md (or <slug>/index.md if the post has photos)
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { recipes, journal };
