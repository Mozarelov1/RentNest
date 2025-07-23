import passport from "passport";
import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
  });

const authService = require("../services/auth/auth-service")

const jwt = require("jsonwebtoken");
const BearerStrategy = require('passport-http-bearer').Strategy;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = () => {
    passport.use(new BearerStrategy(
    async(token: any,done: any) =>{
        try{

            const payload = jwt.verify(token, JWT_SECRET);

            const user = await authService.findUserById(payload.sub);
            if(!user){
                return done(null, false);
            }

            return done(null, user, { scope: payload.scope });
        }catch(e){
            return done(null, false);
        }
    }
))


}
