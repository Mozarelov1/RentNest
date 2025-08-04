import express from 'express';
import { ChatDataSource } from './config/data-source';
import cookieParser from 'cookie-parser';

const chatRoutes = require('./routes/chat-routes');

async function bootstrap() {
  try {
    await ChatDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    app.use('/api/messages',  chatRoutes);

    app.listen(2007, () => {
      console.log('server started at http://localhost:2007');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();

