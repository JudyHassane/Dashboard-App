import axios from "../../../lib/axios";

const imageCache = new Map<string, string>();

export const getImageBlob = async (imagePath: string): Promise<string> => {
  if (imageCache.has(imagePath)) {
    return imageCache.get(imagePath)!;
  }

  const response = await axios.get(`/uploads/${imagePath}`, {
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);

  imageCache.set(imagePath, url);

  return url;
};
