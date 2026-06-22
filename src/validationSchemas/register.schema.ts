import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .max(254, "Email must be at most 254 characters")
      .transform((value) => value.toLowerCase()),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters"),

    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
