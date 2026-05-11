import { Response } from "express";

declare global {
  namespace Express {
    interface Response {
      customSuccess(
        httpStatusCode: number,
        message: string,
        data?: unknown,
      ): Response;
    }
  }
}
