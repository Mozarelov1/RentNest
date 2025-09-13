export type UserStatus = 'active' | 'banned';

export interface ShortUserInfo {
  name?: string;
  photo?: string;
  status: UserStatus;
  createdAt: Date;
}