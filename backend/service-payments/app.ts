import express from 'express';
import { PaymentDataSource } from './config/data-source';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const paymentRoutes = require('./routes/payment-routes');

async function bootstrap() {
  try {
    await PaymentDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());

    app.use('/api/payments',  paymentRoutes);

    app.listen(2004, () => {
      console.log('server started at http://localhost:2004');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();

