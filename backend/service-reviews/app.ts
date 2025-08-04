import express from 'express';
import { ReviewDataSource } from './config/data-source';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const reviewRoutes = require('./routes/review-routes');

async function bootstrap() {
  try {
    await ReviewDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());

    app.use('/api/reviews',  reviewRoutes);

    app.listen(2005, () => {
      console.log('server started at http://localhost:2005');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();
