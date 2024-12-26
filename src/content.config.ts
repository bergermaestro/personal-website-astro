import { defineCollection, z, type ImageFunction } from "astro:content";
import { file } from "astro/loaders";

const bookSchema = (image: ImageFunction) => {
  return z
    .object({
      title: z.string(),
      released: z.number(),
      author: z.string(),
      status: z.enum(["to read", "currently reading", "finished"]),
      rating: z.number().nullable(),
      finished_on: z.string().nullable(),
      cover: image(),
    })
    .refine((data) => data.status !== "finished" || data.finished_on !== null, {
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
  loader: file("src/data/json/books.json", { parser: bookParser }),
  schema: ({ image }) => bookSchema(image),
});

export const collections = { books };
