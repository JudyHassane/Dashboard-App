export const endpoints = {
  auth: {
    me: "/users/me",
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh",
    logout: "/auth/logout",
  },
  app: {
    books: "/books",
    categories: "/categories",
    dashboard: "/dashboard",
  },
  uploads: {
    bookCover: "/uploads/images/books",
  },
} as const;
