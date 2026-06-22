import { rateLimit } from "express-rate-limit";

export const fileUploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message:
      "Too many upload attempts from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
