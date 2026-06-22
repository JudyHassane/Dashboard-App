import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../utils/response/custom-error/CustomError";

export const uploadBookCover = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next(new BadRequestError("Book cover image is required"));
  }

  return res.customSuccess(201, "Book cover uploaded successfully", {
    image: {
      filename: req.file.filename,
      storageKey: `images/books/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });
};
