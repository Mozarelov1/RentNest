import { IUser } from '../dto/IUserDto';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}