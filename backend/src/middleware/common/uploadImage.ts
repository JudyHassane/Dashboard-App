import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { BadRequestError } from "../../utils/response/custom-error/CustomError";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const imageUploadDir = path.resolve(
  __dirname,
  "../../../storage/images",
);

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (
    !allowedMimeTypes.has(file.mimetype) ||
    !allowedExtensions.has(extension)
  ) {
    return cb(
      new BadRequestError("Only JPG, PNG, and WEBP images are allowed"),
    );
  }

  cb(null, true);
};

export const uploadSingleImage = (folderName: string, fieldName: string) => {
  const uploadDir = path.resolve(imageUploadDir, folderName);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },

    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now();
      const extension = path.extname(file.originalname).toLowerCase();
      const originalName = path.basename(file.originalname, extension);

      const safeName = originalName
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "");

      cb(null, `${uniqueSuffix}-${safeName}${extension}`);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }).single(fieldName);
};
