import CloudIpsp from 'cloudipsp-node-js-sdk';
import dotenv from "dotenv"
import path  from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export const fondy = new CloudIpsp({
  merchantId: +process.env.FONDY_MERCHANT_ID!,
  secretKey:  process.env.FONDY_SECRET_KEY!,
  apiUrl:     process.env.FONDY_API_URL!,
});

