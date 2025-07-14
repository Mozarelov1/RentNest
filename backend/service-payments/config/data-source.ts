import { DataSource } from 'typeorm';
import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

export const PaymentDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PAYMENT,
    synchronize: false,
    dropSchema: false,
    entities: [path.join(__dirname, '..', 'models', '*.ts')],   
    migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
});

