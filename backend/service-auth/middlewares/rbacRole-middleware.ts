import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

type Role = 'admin' | 'moderator' | 'user';

const jwt_secret = process.env.JWT_SECRET;

export function authorize(allowedRoles: Role[] ) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;
        if (!token) {
            throw new Error('Unauthorized: token missing');
        };
        //@ts-ignore
        const response = await axios.get('http://localhost:2001/api/user/me',{headers: { Cookie: `jwt=${token}` }, timeout: 5000})
        const user = response.data;
        if (!user){
            throw new Error(`User with id=${user.id} not found`);
        }
        
        if (!allowedRoles.includes(user.role)) {
          res.status(403).json({ error: 'Forbidden' });
        }
        next();
    }
}
