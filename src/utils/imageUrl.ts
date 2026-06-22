import { ENV } from "../config/env";

export const getImageUrl = (storageKey: string): string => {
  if (storageKey.startsWith("http")) return storageKey;
  return `${ENV.serverUrl}/uploads/${storageKey}`;
};
