import { Router } from "express";
import { uploadSingleImage } from "../middleware/common/uploadImage";
import { uploadBookCover } from "../controllers/books/uploadBookCover.controller";
import { getImage } from "../controllers/uploads/getImage.controller";
import { fileUploadLimiter } from "../middleware/common/rateLimiter";

const router = Router();

router.post(
  "/images/books",
  [fileUploadLimiter, uploadSingleImage("books", "image")],
  uploadBookCover,
);

router.get("/images/:folderName/:filename", getImage);

export default router;
