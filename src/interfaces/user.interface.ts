export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: Role;
  image: string | string[];
}

export interface UserImage {
  id: number;
  url: string;
  userId: string;
}

type Role = 'admin' | 'user';
