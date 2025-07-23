export type UserRole = 'user' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'banned';

export interface IUser {
  id: number;
  email: string;
  passwordHash?: string;
  googleID?: string;
  name?: string;
  photo?: string;
  role: UserRole;
  status: UserStatus;
  ip_address?: string;
  createdAt: Date;
  updatedAt: Date;
}
