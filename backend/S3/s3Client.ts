import {S3Client} from '@aws-sdk/client-s3';
import path from "path";
import dotenv from "dotenv"

dotenv.config({
  path: path.resolve(__dirname, '.env')
});



const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error('AWS_REGION, AWS_ACCESS_KEY_ID, or AWS_SECRET_ACCESS_KEY not set');
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default s3Client;