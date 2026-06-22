import { useEffect, useState } from "react";
import { getImageBlob } from "../store/features/books/uploads.api";

export const useImageSrc = (imagePath: string | undefined | null): string => {
  const isDirectUrl = !!imagePath && imagePath.startsWith("http");

  const [imageSrc, setImageSrc] = useState(() => {
    if (!imagePath) return "";
    if (isDirectUrl) return imagePath;
    return "";
  });

  useEffect(() => {
    if (!imagePath) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageSrc("");
      return;
    }

    if (isDirectUrl) {
      setImageSrc(imagePath);
      return;
    }

    let cancelled = false;

    getImageBlob(imagePath)
      .then((url) => {
        if (!cancelled) setImageSrc(url);
      })
      .catch(() => {
        if (!cancelled) setImageSrc("");
      });

    return () => {
      cancelled = true;
    };
  }, [imagePath, isDirectUrl]);

  return imageSrc;
};
