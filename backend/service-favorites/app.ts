import express from 'express';
import { FavoritesDataSource } from './config/data-source';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const favoritesRoutes = require('./routes/favorite-routes');

async function bootstrap() {
  try {
    await FavoritesDataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());
    
    app.use('/api/favorites',  favoritesRoutes);

    app.listen(2006, () => {
      console.log('server started at http://localhost:2006');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();


