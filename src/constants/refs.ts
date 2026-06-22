import type { Book } from "../types";

export const bookDialogRef = {
  current: null as ((book?: Book) => void) | null,
};
