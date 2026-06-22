import { z } from "zod";

export const bookSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),

    author: z
      .string()
      .trim()
      .min(1, "Author is required")
      .max(255, "Author must be less than 255 characters"),

    isbn: z
      .string()
      .trim()
      .regex(/^\d{13}$/, "ISBN must be exactly 13 digits"),

    description: z
      .string()
      .trim()
      .max(2000, "Description must be less than 2000 characters")
      .optional()
      .or(z.literal("")),

    categoryName: z
      .string()
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(100, "Category must be less than 100 characters"),

    price: z.preprocess(
      (val) =>
        val === "" || val === undefined || isNaN(Number(val))
          ? undefined
          : Number(val),
      z
        .number({ error: "Price is required" })
        .min(0, "Price cannot be negative"),
    ),

    stock: z.preprocess(
      (val) =>
        val === "" || val === undefined || isNaN(Number(val))
          ? undefined
          : Number(val),
      z
        .number({ error: "Stock is required" })
        .int("Stock must be a whole number")
        .min(0, "Stock cannot be negative"),
    ),

    imageMode: z.enum(["url", "upload"]),
    coverImage: z
      .string()
      .trim()
      .min(1, "Cover image is required")
      .max(255, "Cover image must be less than 255 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.imageMode === "url") {
      const isHttpUrl =
        /^https?:\/\/.+/i.test(data.coverImage) &&
        z.string().url().safeParse(data.coverImage).success;

      if (!isHttpUrl) {
        ctx.addIssue({
          code: "custom",
          path: ["coverImage"],
          message: "Must be a valid URL starting with http:// or https://",
        });
      }
    }
  });
export type BookFormData = z.infer<typeof bookSchema>;
