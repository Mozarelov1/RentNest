import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";



import { AuthDataSource } from "./service-auth/config/data-source";
import { PropertyDataSource } from "./service-property/config/data-source";
import { ReservationDataSource } from "./service-reservations/config/data-source"

const googlePassConfig = require("./service-auth/config/googlePassport");         // google config
const bearerTokPassConfig = require("./service-auth/config/bearerTokPassport");   // bearer-token config

const authRoutes = require("./service-auth/routes/auth-routes");
const propertyRoutes = require("./service-property/routes/property-routes");
const reservationRoutes = require("./service-reservations/routes/reservation-routes")

import { initKafka } from "./service-notifications/config/kafka";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth',  authRoutes);
app.use('/api/properties',  propertyRoutes);
app.use('/api/reservation', reservationRoutes)

// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (req.body && typeof req.body.content === 'string') {
//     req.body.content = xss(req.body.content);
//   }
//   next();
// });


const start = async () =>{
        try{
            await AuthDataSource.initialize();
            await PropertyDataSource.initialize();
            await ReservationDataSource.initialize();
            
            await initKafka();

            const port : number = Number(process.env.PORT) || 2000;
            app.listen(port, () => console.log(`server started at http://localhost:${port}`));
        }catch(e){
            console.log(e)
        }
    }

start();

module.exports = app;
