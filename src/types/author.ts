export interface Author {
  id: number;
  name: string;
  genre?: string;
}

export const emptyAuthor: Author = {
  id: 0,
  name: "",
  genre: "",
};
