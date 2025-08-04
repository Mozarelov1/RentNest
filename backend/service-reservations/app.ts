import express from 'express';
import { ReservationDataSource } from './config/data-source';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const reservationRoutes = require('./routes/reservation-routes');

async function bootstrap() {
  try {
    await ReservationDataSource.initialize();

    const app = express();
    app.use(helmet());
    app.use(express.json());
    app.use(cookieParser());

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());
    
    app.use('/api/reservations',  reservationRoutes);

    app.listen(2003, () => {
      console.log('server started at http://localhost:2003');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();