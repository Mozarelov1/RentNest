import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";



import { AuthDataSource } from "./service-auth/config/data-source";
import { PropertyDataSource } from "./service-property/config/data-source";
import { ReservationDataSource } from "./service-reservations/config/data-source";
import { PaymentDataSource } from "./service-payments/config/data-source";
import { ReviewDataSource } from "./service-reviews/config/data-source";
import { FavoritesDataSource } from "./service-favorites/config/data-source";
import { ChatDataSource } from "./service-chat/config/data-source";
import { NotifDataSource } from "./service-notifications/config/data-source";

const googlePassConfig = require("./service-auth/config/googlePassport");         // google config
const bearerTokPassConfig = require("./service-auth/config/bearerTokPassport");   // bearer-token config

const authRoutes = require("./service-auth/routes/auth-routes");
const propertyRoutes = require("./service-property/routes/property-routes");
const reservationRoutes = require("./service-reservations/routes/reservation-routes");
const paymentsRoutes = require("./service-payments/routes/payment-routes");
const reviewsRoutes = require("./service-reviews/routes/review-routes");
const favoriteRoutes = require("./service-favorites/routes/favorite-routes");
const chatRoutes = require("./service-chat/routes/chat-routes");
const searchRoutes = require("./service-search/routes/search-routes");
const notifRoutes = require("./service-notifications/routes/mail-routes");
const adminRoutes = require("./service-admin/routes/admin-routes");
const authAdminRoutes = require("./service-auth/routes/admin-routes");
const propertyAdminRoutes = require("./service-property/routes/admin-routes");
const reviewAdminRoutes = require("./service-reviews/routes/admin-routes");
const reservationAdminRoutes = require("./service-reservations/routes/admin-routes")


import { initKafka } from "./service-chat/config/kafka";

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
app.set('trust proxy', true);

googlePassConfig();
bearerTokPassConfig();
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth',  authRoutes);
app.use('/api/properties',  propertyRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/messages', chatRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notifRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users/admin', authAdminRoutes);
app.use('/api/property/admin', propertyAdminRoutes);
app.use('/api/review/admin', reviewAdminRoutes);
app.use('/api/reservation/admin', reservationAdminRoutes);

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
            await PaymentDataSource.initialize();
            await ReviewDataSource.initialize();
            await FavoritesDataSource.initialize();
            await ChatDataSource.initialize();
            await NotifDataSource.initialize();

            await initKafka();

            const port : number = Number(process.env.PORT) || 2000;
            app.listen(port, () => console.log(`server started at http://localhost:${port}`));
        }catch(e){
            console.log(e)
        }
    }

start();

module.exports = app;
