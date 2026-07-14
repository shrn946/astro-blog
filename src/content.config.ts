import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const authors = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    photo: z.string(),
    bio: z.string(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/categories" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: reference('authors'),
    category: reference('categories'),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    featuredImage: z.string(),
    featuredImageAlt: z.string().optional(),
    canonical: z.string().url().optional(),
    robots: z.string().optional(),
    readingTime: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
    language: z.string().default('en'),
    series: z.string().optional(),
    estimatedReadingTime: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    references: z.array(z.object({
      title: z.string(),
      url: z.string().url()
    })).optional()
  }),
});

export const collections = { blog, authors, categories };
