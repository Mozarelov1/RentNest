import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";

import {AppDataSource} from './service-auth/config/data-source'

const passportConfig = require('./service-auth/config/passport')

const authRoutes = require('./service-auth/routes/auth-routes')

const app = express();

dotenv.config({
    path: path.resolve(__dirname, '.env')
  });

app.use(helmet())
app.use(cors({
    credentials: true,
    origin: `${process.env.CLIENT_URL}` ,
    
}));

app.use(express.json());
app.use(cookieParser());

passportConfig();
app.use(passport.initialize());


app.use('/api/auth',authRoutes)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (req.body && typeof req.body.content === 'string') {
//     req.body.content = xss(req.body.content);
//   }
//   next();
// });


const start = async () =>{
        try{
            AppDataSource.initialize()
            const port : number = Number(process.env.PORT) || 2000;
            app.listen(port, () => console.log(`server started at http://localhost:${port}`));
        }catch(e){
            console.log(e)
        }
    }

start();

module.exports = app;
