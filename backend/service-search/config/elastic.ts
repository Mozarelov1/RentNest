import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

export const esClient = new Client({
  node: process.env.ELASTIC_URL || 'http://localhost:9200',
});