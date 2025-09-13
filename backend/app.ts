import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { PUBLIC_SERVICES } from "./services";


const googlePassConfig = require("./service-auth/config/googlePassport");         // google config
const bearerTokPassConfig = require("./service-auth/config/bearerTokPassport");   // bearer-token config

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
    origin: process.env.CLIENT_URL
  })
);

app.use(cookieParser());

app.set('trust proxy', true);

    googlePassConfig();
    bearerTokPassConfig();
    app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/auth', createProxyMiddleware({ target: `${PUBLIC_SERVICES.auth}/api/auth`,changeOrigin: true }));
app.use('/api/user', createProxyMiddleware({ target: `${PUBLIC_SERVICES.auth}/api/user`,changeOrigin: true }));
app.use('/api/properties',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.property}/api/properties`,changeOrigin: true}));
app.use('/api/reservations',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.reservation}/api/reservations`, changeOrigin: true }));
app.use('/api/payments',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.payment}/api/payments`, changeOrigin: true }));
app.use('/api/reviews',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.review}/api/reviews`, changeOrigin: true }));
app.use('/api/favorites',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.favorite}/api/favorites`, changeOrigin: true }));
app.use('/api/messages',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.message}/api/messages`, changeOrigin: true }));
app.use('/api/search',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.search}/api/search`, changeOrigin: true }));
app.use('/api/notifications',passport.authenticate('bearer' , {session: false}), createProxyMiddleware({ target: `${PUBLIC_SERVICES.notification}/api/notifications`, changeOrigin: true }));



app.use(express.json());
const start = async () =>{
        try{
            await initKafka();

            const port : number = Number(process.env.PORT) || 2000;
            app.listen(port, () => console.log(`server started at http://localhost:${port}`));
        }catch(e){
            console.log(e)
        }
    }

start();

module.exports = app;
