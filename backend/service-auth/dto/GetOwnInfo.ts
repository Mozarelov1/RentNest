export type UserRole = 'user' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'banned';

export interface UserInfo {
  id: number;
  email: string;
  name?: string;
  photo?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}