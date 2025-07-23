import { Request, Response, NextFunction } from 'express';

export function adminOnly(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    //@ts-ignore
    if (!user || user.role !== 'user') {
        res.status(403).json({ message: 'Forbidden: admins only' });
        return
    }

    next();
}