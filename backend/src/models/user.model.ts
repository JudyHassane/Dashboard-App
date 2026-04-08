export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Currently In-Memory
export const users: User[] = [];
