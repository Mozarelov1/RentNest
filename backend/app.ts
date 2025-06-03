import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

dotenv.config({
    path: path.resolve(__dirname, '.env')
  });


const port : number = Number(process.env.PORT);

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (req.body && typeof req.body.content === 'string') {
//     req.body.content = xss(req.body.content);
//   }
//   next();
// });


const start = async () =>{
        try{
            app.listen(port, () => console.log(`server started at http://localhost:${port}`));
        }catch(e){
            console.log(e)
        }
    }

start();