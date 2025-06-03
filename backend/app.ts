import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import passport from "passport";
import { AppDataSource } from "./service-auth/config/data-source";
import passportConfig from "./service-auth/config/passport";
import authRoutes from "./service-auth/routes/auth-routes";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const app = express();

AppDataSource.initialize().catch((err) => {
  console.error("Error during Data Source initialization:", err);
});

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

passportConfig();
app.use(passport.initialize());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/auth", authRoutes);

const start = async () => {
  try {
    const port: number = Number(process.env.PORT) || 2000;
    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    );
  } catch (e) {
    console.error("Error on app start:", e);
  }
};

start();

export default app;
