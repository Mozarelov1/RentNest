import express from 'express';
import { NotifDataSource } from './config/data-source';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const notificationsRoutes = require('./routes/mail-routes');

async function bootstrap() {
  try {
    await NotifDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());
    app.use('/api/notifications',  notificationsRoutes);

    app.listen(2009, () => {
      console.log('server started at http://localhost:2009');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();
