import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Request } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Boom from '@hapi/boom';

import multer, { Multer, StorageEngine } from 'multer';
import multerS3 from 'multer-s3';
import s3Client from './s3Client';  

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const upload: Multer = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET!,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, key?: string) => void
    ) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  }) as StorageEngine,
  limits: { fileSize: 10 * 1024 * 1024 },
});

function parseS3Url(fileUrl: string): { bucket: string; key: string } {
  const { hostname, pathname } = new URL(fileUrl);
  return {
    bucket: hostname.split('.')[0],
    key: decodeURIComponent(pathname.substring(1)),
  };
}

export async function deleteFile(
  url: string
): Promise<{ success: true }> {
  const { bucket, key } = parseS3Url(url);
  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    return { success: true };
  } catch {
    throw Boom.badRequest('Cannot delete file at specified URL');
  }
}