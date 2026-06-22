import { ENV } from "../config/env";

export const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  return `${ENV.BACKEND_URL}/api/uploads/${normalizedPath}`;
};
