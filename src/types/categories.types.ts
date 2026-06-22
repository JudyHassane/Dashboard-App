export interface Category {
  id: number;
  name: string;
}

export interface GetCategoriesParams {
  searchQuery: string;
  pageNumber: number;
  pageSize: number;
}

export interface GetCategoriesResponse {
  categories: Category[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
