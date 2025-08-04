import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';

const googlePassConfig = require("../service-auth/config/googlePassport");
const bearerTokPassConfig = require("../service-auth/config/bearerTokPassport");

const searchRoutes = require('./routes/search-routes');

async function bootstrap() {
  try {

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());
 
    app.use('/api/search',  searchRoutes);

    app.listen(2008, () => {
      console.log('server started at http://localhost:2008');
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

bootstrap();

