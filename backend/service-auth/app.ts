import express from 'express';
import { AuthDataSource } from './config/data-source';

import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes')

const googlePassConfig = require("./config/googlePassport");
const bearerTokPassConfig = require("./config/bearerTokPassport");

async function bootstrap() {
  try {
    await AuthDataSource.initialize();

    const app = express();

    app.use(helmet());
    app.use(
      cors({
      credentials: true,
      origin: true
    })
  );
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());

    app.use('/api/auth', authRoutes);
    app.use('/api/user',userRoutes);


    app.listen(2001, () => {
      console.log('server started at http://localhost:2001');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();
