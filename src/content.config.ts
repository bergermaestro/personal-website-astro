import { defineCollection, z, type ImageFunction } from "astro:content";
import { file, glob } from "astro/loaders";

// Books
const bookSchema = (image: ImageFunction) => {
  return z
    .object({
      title: z.string(),
      released: z.number(),
      author: z.string(),
      status: z.enum(["to read", "currently reading", "finished"]),
      rating: z.number().optional(),
      finished_on: z.string().optional(),
      cover: image(),
    })
    .refine((data) => data.status !== "finished" || data.finished_on, {
      message: "If the status is 'finished', 'finished_on' cannot be null.",
      path: ["finished_on"],
    });
};

type Book = z.infer<ReturnType<typeof bookSchema>>;

// Custom parser generates id field from the title
const bookParser = (text: string) => {
  const books = JSON.parse(text) as Book[];
  return books.map((book) => ({
    ...book,
    id: book.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, ""),
  }));
};

const books = defineCollection({
  loader: file("src/data/books/books.json", { parser: bookParser }),
  schema: ({ image }) => bookSchema(image),
});

// Year Recap Summaries
const yearRecaps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/books/year_summaries" }),
  schema: () =>
    z.object({
      year: z.number(),
    }),
});

// Blog Posts
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string(),
      image: z.string().optional(),
      pubDate: z.string(),
      links: z.array(z.string()).optional(),
      type: z.enum(["Development", "Miscellaneous", "Tech Adjacent"]),
    }),
});

const jobs = defineCollection({
  loader: file("src/data/jobs.json"),
  schema: () =>
    z.object({
      title: z.string(),
      company: z.string(),
      companyLink: z.string().optional(),
      date: z.string(),
      tools: z.array(z.string()),
      description: z.array(z.string()),
    }),
});

export const collections = { books, yearRecaps, posts, jobs };
