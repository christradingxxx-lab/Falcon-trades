import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Empty values from the editor come through as "" or null; treat them as "not set".
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

const list = z.preprocess((v) => (v === '' || v === null || v === undefined ? [] : v), z.array(z.string()));

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['daily', 'weekly', 'monthly', 'quarterly']).default('daily'),
    markets: list,
    // Anything not explicitly "public" stays private.
    visibility: z.enum(['public', 'private']).catch('private').default('private'),
    excerpt: optional(z.string()),
    cover: optional(z.string()),
    video: optional(z.string()),
    setup: optional(z.string()),
    entry: optional(z.string()),
    exit: optional(z.string()),
    result: optional(z.string()),
    mindset: optional(z.string()),
    tags: list,
  }),
});

const playbooks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playbooks' }),
  schema: z.object({
    title: z.string(),
    summary: optional(z.string()),
    market: optional(z.string()),
    order: z.coerce.number().default(100),
    cover: optional(z.string()),
    pdf: optional(z.string()),
    published: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: optional(z.string()),
    cover: optional(z.string()),
    pdf: optional(z.string()),
    published: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    tagline: optional(z.string()),
    platform: optional(z.string()),
    price: optional(z.string()),
    buyUrl: optional(z.string()),
    badge: optional(z.string()),
    image: optional(z.string()),
    features: list,
    order: z.coerce.number().default(100),
    published: z.boolean().default(true),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    topic: z.string().default('Session recap'),
    date: z.coerce.date(),
    description: optional(z.string()),
    published: z.boolean().default(true),
  }),
});

export const collections = { journal, playbooks, research, tools, videos };
