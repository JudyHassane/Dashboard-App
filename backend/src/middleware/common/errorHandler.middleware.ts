import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { isDatabaseError } from "../../utils/response/custom-error/DatabaseError";
import multer from "multer";

// Express call this middleware when next(error) is called

// Centralized error handler
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Custom Error
  if (err instanceof CustomError) {
    return res
      .status(err.httpStatusCode)
      .json({ success: false, ...err.serialize() });
  }

  // Database Error
  if (isDatabaseError(err)) {
    if (err?.code === "23505") {
      if (err?.detail?.includes("(email)")) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
          statusCode: 409,
          details: null,
        });
      }
      return res.status(409).json({
        success: false,
        message: "Duplicate value already exists",
        statusCode: 409,
        details: null,
      });
    }
  }

  // Multer Error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image must be 5MB or smaller",
        statusCode: 400,
        details: null,
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
      statusCode: 400,
      details: { code: err.code },
    });
  }

  // Unexpected Error
  console.error("Unexpected error:", err);
  return res.status(500).json({
    success: false,
    message: "Server error",
    statusCode: 500,
    details: null,
  });
};
