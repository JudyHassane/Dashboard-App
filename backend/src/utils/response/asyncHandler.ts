import { Request, Response, NextFunction } from "express";

// Wraps an async controller so thrown errors are automatically passed to next()
// This eliminates the need for try/catch in every controller
// So any rejected Promise goes to next(error)

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
