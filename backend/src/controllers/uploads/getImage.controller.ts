import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { asyncHandler } from "../../utils/asyncHandler";
import { imageUploadDir } from "../../middleware/common/uploadImage";
import {
  BadRequestError,
  NotFoundError,
} from "../../utils/response/custom-error/CustomError";

export const getImage = asyncHandler(async (req: Request, res: Response) => {
  const folderName = path.basename(req.params.folderName);
  const filename = path.basename(req.params.filename);

  if (
    folderName !== req.params.folderName ||
    filename !== req.params.filename
  ) {
    throw new BadRequestError("Invalid image path");
  }

  const filePath = path.join(imageUploadDir, folderName, filename);

  try {
    await fsPromises.access(filePath);
  } catch {
    throw new NotFoundError("Image not found");
  }

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  const stream = fs.createReadStream(filePath);

  stream.on("error", (err) => {
    if (!res.headersSent) {
      res.status(500).end("Error reading file");
    } else {
      res.destroy(err);
    }
  });

  stream.pipe(res);
});
