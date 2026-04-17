import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/response/errors/CustomError";
import { isDatabaseError } from "../utils/response/errors/DatabaseError";
import jwt from "jsonwebtoken";

// Express call this middleware when next(error) is called

// Centralized error handler — registered as the LAST middleware in app.ts
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Custom Error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // JWT Error
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ message: "Refresh token expired" });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  // Database Error
  if (isDatabaseError(err)) {
    if (err?.code === "23505") {
      if (err?.detail?.includes("(email)")) {
        return res.status(409).json({ message: "Email already registered" });
      }

      return res
        .status(409)
        .json({ message: "Duplicate value already exists" });
    }
  }

  // Unexpected Error
  console.error("Unexpected error:", err);
  return res.status(500).json({ message: "Server error" });
};
