import { z } from "zod";

export const loginSchema = z.object({
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
});

export type LoginFormData = z.infer<typeof loginSchema>;
