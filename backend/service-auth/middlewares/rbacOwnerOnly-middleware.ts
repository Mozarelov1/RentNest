import { Request, Response, NextFunction, RequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Repository, ObjectLiteral, FindOptionsWhere } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const jwt_secret = process.env.JWT_SECRET!;

interface OwnerOnlyOpts<Entity> {
  paramIdName: string;             
  ownerField: keyof Entity | Array<keyof Entity>;
}

export function ownerOnly<Entity extends ObjectLiteral>(repository: Repository<Entity>, opts: OwnerOnlyOpts<Entity>): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paramIdName, ownerField } = opts;
      const resourceIdField = 'id'; 
      const token = req.cookies.accessToken;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized: token missing' });
        return;
      }

      const payload = jwt.verify(token, jwt_secret);
      const rawSub = payload.sub;
      const userId = typeof rawSub === 'string' ? Number(rawSub) : Number(rawSub);
      if (!userId || isNaN(userId)) {
        res.status(401).json({ message: 'Unauthorized: invalid token payload' });
        return;
      }

      const rawParam = req.params[paramIdName];

      let resourceId: number | string;
      const asNumber = Number(rawParam);
      if (!Number.isNaN(asNumber) && /^\d+$/.test(rawParam)) {
        resourceId = asNumber;
      } else {
        resourceId = rawParam;
      }
      if (!resourceId) {
        res.status(400).json({ message: `Bad Request: "${paramIdName}" must be a number` });
        return;
      }
      const where = { [resourceIdField as string]: resourceId } as FindOptionsWhere<Entity>;
      const entity = await repository.findOne({ where });
      if (!entity) {
        res.status(404).json({ message: `Resource not found (id=${resourceId})` });
        return;
      }

      const fields = Array.isArray(ownerField) ? ownerField : [ownerField];
      const isOwner = fields.some(field => {
        const val = (entity as any)[field];
        return val === userId;
      });
      if (!isOwner) {
         res.status(403).json({ message: 'Forbidden: you are not the owner' });
      }

      next();
    } catch (err: any) {
      res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
  };
}
