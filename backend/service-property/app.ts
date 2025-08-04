import express from 'express';
import { PropertyDataSource } from './config/data-source';
import passport from 'passport';
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from 'cookie-parser';


dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

const propertyRoutes = require('./routes/property-routes');


const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

async function bootstrap() {
  try {
    await PropertyDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 
    app.use(
      cors({
        credentials: true,
        origin: true
      })
    );

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());

    app.use('/api/properties',  propertyRoutes);

    app.listen(2002, () => {
      console.log('server started at http://localhost:2002');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();
