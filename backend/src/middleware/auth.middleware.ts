import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { UnauthorizedError, ForbiddenError } from "../utils/errors/CustomError";
import { AuthRequest } from "../types/auth.types";

// Middleware to protect routes using JWT access token
// Runs before protected routes

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // Get Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;

  // Extract token from header
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return next(new UnauthorizedError("Access token required"));
  }

  try {
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as {
      id: number;
    };
    // Save the authenticated user's id into the request object so the next controller can use it
    req.userId = decoded.id;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Access token expired"));
    }
    next(new ForbiddenError("Invalid token"));
  }
};
